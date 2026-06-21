// Reperimento dati struttura da OpenStreetMap — gratis, senza API key.
// Nominatim: geocoding (indirizzo, coordinate, contatti se presenti).
// Overpass: luoghi di interesse vicini.
// Nessun dato inventato: se OSM non trova nulla, ritorniamo null/[] e si usa il boilerplate.

const UA = 'saluti-dal-web/1.0 (info@salutidalweb.it)';

export type GeoResult = {
  lat: number;
  lon: number;
  address: string;
  city?: string;
  phone?: string;
  website?: string;
  name?: string;
};

export type NearbyPlace = {
  nome: string;
  categoria: string;     // etichetta leggibile (es. "Spiaggia", "Ristorante")
  distanza: string;      // es. "5 min a piedi"
  metri: number;
};

async function fetchJson(url: string, init?: RequestInit): Promise<any | null> {
  try {
    const res = await fetch(url, {
      ...init,
      headers: { 'User-Agent': UA, 'Accept': 'application/json', ...(init?.headers || {}) },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Cerca la struttura su Nominatim (per nome+città, o per il link/nome "dove").
export async function geocode(query: string): Promise<GeoResult | null> {
  const q = query.trim();
  if (!q) return null;
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&limit=1`;
  const data = await fetchJson(url);
  if (!Array.isArray(data) || data.length === 0) return null;
  const r = data[0];
  const a = r.address || {};
  const ex = r.extratags || {};
  const city = a.city || a.town || a.village || a.municipality || a.county;
  return {
    lat: parseFloat(r.lat),
    lon: parseFloat(r.lon),
    address: r.display_name || '',
    city,
    phone: ex.phone || ex['contact:phone'] || undefined,
    website: ex.website || ex['contact:website'] || undefined,
    name: r.name || (r.namedetails && r.namedetails.name) || undefined,
  };
}

// Foto reali vicine alle coordinate da Wikimedia Commons (gratis, CC, niente key).
// Solo JPG orizzontali di buona dimensione; thumbnail a 1600px per non pesare.
export async function placePhotos(lat: number, lon: number, max = 6): Promise<string[]> {
  const geo = await fetchJson(
    `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&list=geosearch&gsnamespace=6&gsradius=10000&gslimit=40&gscoord=${lat}%7C${lon}`,
  );
  const titles: string[] = (geo?.query?.geosearch || []).map((g: any) => g.title).slice(0, 40);
  if (titles.length === 0) return [];
  const info = await fetchJson(
    `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&iiprop=url%7Csize%7Cmime&iiurlwidth=1600&titles=${encodeURIComponent(titles.join('|'))}`,
  );
  const pages = info?.query?.pages || {};
  const out: string[] = [];
  for (const k of Object.keys(pages)) {
    const ii = pages[k]?.imageinfo?.[0];
    if (!ii) continue;
    const name = String(pages[k].title || '').toLowerCase();
    const isPhoto = ii.mime === 'image/jpeg' && ii.width > ii.height && ii.width >= 1100;
    const skip = /map|mappa|stemma|coat|flag|bandiera|logo|diagram|plan/.test(name);
    if (isPhoto && !skip) out.push(ii.thumburl || ii.url);
  }
  return out.slice(0, max);
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

function distanceLabel(metri: number): string {
  const minWalk = Math.max(1, Math.round(metri / 80)); // ~80 m/min a piedi
  if (metri <= 1200) return `${minWalk} min a piedi`;
  const km = (metri / 1000).toFixed(metri < 10000 ? 1 : 0);
  return `${km} km`;
}

const CATEGORIE: Record<string, string> = {
  beach: 'Spiaggia',
  attraction: 'Attrazione',
  museum: 'Museo',
  viewpoint: 'Punto panoramico',
  artwork: "Opera d'arte",
  restaurant: 'Ristorante',
  cafe: 'Caffè',
  bar: 'Bar',
  castle: 'Castello',
  monument: 'Monumento',
  ruins: 'Sito storico',
  archaeological_site: 'Sito archeologico',
  church: 'Chiesa',
  park: 'Parco',
};

// Luoghi di interesse vicini (Overpass), ordinati per distanza, deduplicati per nome.
export async function nearbyPlaces(lat: number, lon: number, max = 5): Promise<NearbyPlace[]> {
  const radius = 1500;
  const q = `[out:json][timeout:25];(` +
    `node(around:${radius},${lat},${lon})[tourism~"attraction|museum|viewpoint|artwork"][name];` +
    `node(around:${radius},${lat},${lon})[natural=beach][name];` +
    `node(around:${radius},${lat},${lon})[historic][name];` +
    `node(around:${radius},${lat},${lon})[leisure=park][name];` +
    `node(around:${radius},${lat},${lon})[amenity~"restaurant|cafe|bar"][name];` +
    `);out body 60;`;
  const data = await fetchJson('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'data=' + encodeURIComponent(q),
  });
  const els: any[] = (data && data.elements) || [];
  const seen = new Set<string>();
  const out: NearbyPlace[] = [];
  for (const el of els) {
    const t = el.tags || {};
    const nome = t.name;
    if (!nome || seen.has(nome.toLowerCase())) continue;
    seen.add(nome.toLowerCase());
    const key = t.natural || t.tourism || t.historic || t.leisure || t.amenity || '';
    const categoria = CATEGORIE[key] || CATEGORIE[t.historic] || 'Da vedere';
    const metri = Math.round(haversine(lat, lon, el.lat, el.lon));
    out.push({ nome, categoria, distanza: distanceLabel(metri), metri });
  }
  // priorità: prima attrazioni/spiagge/storico, poi ristorazione; entro gruppo per distanza
  const rank = (c: string) => (c === 'Ristorante' || c === 'Caffè' || c === 'Bar' ? 1 : 0);
  out.sort((a, b) => rank(a.categoria) - rank(b.categoria) || a.metri - b.metri);
  return out.slice(0, max);
}
