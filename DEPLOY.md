# Deploy — contentmug · hotel (Hetzner)

Server: **204.168.182.198** (CX33, Ubuntu 24.04). **Condiviso**: ci girano già un nginx di
sistema sulla :80 e molti altri container (Aurora, hub-api, wordpress, magento, prestashop, beszel…).

➡️ Perciò l'app NON usa la porta 80, ma una **porta pubblica dedicata: 8081**.

**Live ora:** http://204.168.182.198:8081  ·  admin: http://204.168.182.198:8081/admin

---

## Deploy / aggiornamento (dal tuo Mac)

Dalla cartella del progetto:

```bash
./deploy.sh
```

Cosa fa, in modo **isolato** (solo il progetto `contentmug`, non tocca gli altri container):
1. sincronizza i sorgenti su `/opt/contentmug` (via rsync);
2. copia `.env.local` come `.env` sul server (i segreti **non** entrano nell'immagine);
3. `docker compose up -d --build` del solo servizio app.

Cambiare porta: `CM_PORT=9000 ./deploy.sh` (poi l'app è su `:9000`).

---

## Variabili d'ambiente sul server (`/opt/contentmug/.env`)

```
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_PASSWORD=...            # CAMBIALA
ADMIN_SESSION_SECRET=...      # openssl rand -hex 32
```

`deploy.sh` la genera dal tuo `.env.local`. Per modificarla:
edita `/opt/contentmug/.env` sul server e `docker compose up -d` per riavviare.

---

## ⚠️ Sicurezza: niente HTTPS finché non c'è il dominio

Su IP+porta in chiaro la **password admin viaggia non cifrata**. Per il pre-lancio va bene, ma:
- prendi un dominio presto e attiva HTTPS (sotto);
- usa una `ADMIN_PASSWORD` forte; cambiare `ADMIN_SESSION_SECRET` invalida tutte le sessioni.

---

## Passare a HTTPS quando avrai il dominio

Il server ha **già un nginx di sistema** sulla 80/443: l'integrazione corretta è aggiungere un
**vhost a quell'nginx** (NON il Caddy in `docker-compose.caddy.yml`, che entrerebbe in conflitto
con l'nginx esistente).

1. Punta un record **A** del dominio (es. `hotel.contentmug.it`) → `204.168.182.198`.
2. Aggiungi un file nginx sul server, es. `/etc/nginx/sites-available/contentmug`:

   ```nginx
   server {
       server_name hotel.contentmug.it;
       location / {
           proxy_pass http://127.0.0.1:8081;
           proxy_set_header Host $host;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_set_header X-Forwarded-For $remote_addr;
       }
   }
   ```
3. Abilita e ricarica:
   ```bash
   ln -s /etc/nginx/sites-available/contentmug /etc/nginx/sites-enabled/
   nginx -t && systemctl reload nginx
   certbot --nginx -d hotel.contentmug.it   # HTTPS automatico Let's Encrypt
   ```

> NB: per usare il vhost cambia il binding del container a `127.0.0.1:8081` (in `docker-compose.yml`
> metti `"127.0.0.1:8081:3000"`) così l'app è raggiungibile solo via nginx e non più sulla porta pubblica.

I file `Caddyfile` / `docker-compose.caddy.yml` restano solo per un eventuale server **dedicato**
senza nginx di sistema.

---

## Comandi utili (sul server, in /opt/contentmug)

```bash
docker compose ps
docker compose logs -f app
docker compose up -d --build      # ridistribuisci
docker compose down               # ferma SOLO contentmug
```
