# akkharlabs.com — Deployment Runbook

How the Akkhar Labs research site is built and served from the production VPS.
This replaces the earlier Brud server runbook that lived in this repository; that
document described a different service (`brud-server`, `api.brudcode.com`) and is
superseded here.

The site is a **static Astro build**. There is no application server, no database,
and no service to restart — nginx serves files from a directory on disk. A deploy is
build, sync, verify.

## Critical Deployment Rules

1. **A failed build is a failed deploy.** If `npm run build` exits non-zero, stop. Never
   sync a stale `dist/`.
2. **Always build on the workstation, never on the VPS.** The VPS has Node.js for other
   projects, but this site's dependencies are only installed locally.
3. **Sync with `--delete`** so pages removed from the build do not linger on the server.
4. **Never overwrite `/var/www/brud-admin` or other project roots.** The shared nginx
   default vhost `admin.brudcode.com` has no `default_server` flag and will answer any
   `Host` that has no matching `server_name`, so a missing vhost silently serves the
   wrong site.
5. **`launched: true` in `src/site.config.ts` is what makes pages indexable.** If it is
   `false`, every page carries `noindex` regardless of the server.
6. **Check the domain is actually pointing at this VPS before announcing a deploy.** A
   parking page or origin error at Cloudflare looks like a server fault but is not one
   (see Troubleshooting).

## Overview

| Attribute         | Value                                                        |
|-------------------|--------------------------------------------------------------|
| Public URL        | `https://akkharlabs.com` (Cloudflare-proxied)                |
| Alt URL           | `https://www.akkharlabs.com` (**record does not exist yet** — see DNS) |
| Origin            | `217.216.110.6` (VPS `vmi3274488`, Ubuntu 24.04)             |
| Web server        | nginx 1.24, one vhost for this site                          |
| Web root          | `/var/www/akkharlabs`                                        |
| nginx config      | `/etc/nginx/sites-available/akkharlabs.com` (symlinked into `sites-enabled/`) |
| TLS to origin     | Self-signed origin certificate, Cloudflare **Full** mode     |
| Origin cert files | `/etc/nginx/ssl/akkharlabs.com.crt`, `.key`                  |
| Tech stack        | Astro 7 static build, ~6.7 MB, 53 pages per build            |
| Process manager   | None (static files)                                          |
| Database          | None                                                         |
| Build output      | `dist/` (git-ignored)                                        |
| Repo remote       | `https://github.com/rahihasan3004/akkharvai.git`             |

Other vhosts on the same VPS (do not disturb): `brudcode.com`, `brud.akkharlabs.com`,
`admin.brudcode.com`, `api.brudcode.com`, `softgrower.co`, `truckpai.com`,
`deshoj.shop`, plus Cloudflared-tunnel services on ports 8081–8085 and 3000/3001.

## SSH Access

```bash
ssh rahathasan@217.216.110.6
# workstation alias: ssh truck-pai
```

Key-based, no password. The user is `rahathasan`; `sudo` is passwordless for this user.

## Standard Deploy

Run from the repository root on the workstation:

```bash
cd /media/rahathasan/ubuntu-dev1/Dev/Akkhar-Labs/akkharlabs

# 1. Build (blocking)
npm run build

# 2. Sync the build to the VPS
rsync -az --delete dist/ truck-pai:/var/www/akkharlabs/

# 3. Verify through nginx on the VPS
ssh truck-pai 'curl -sS -o /dev/null -w "%{http_code}\n" -H "Host: akkharlabs.com" http://127.0.0.1/'

# 4. Verify publicly (see Health Checks)
curl -sS -o /dev/null -w "%{http_code}\n" https://akkharlabs.com/

# 5. Tell search engines (once per deploy)
npm run indexnow
```

Nginx does not need a reload for content changes — only when the vhost itself changes.

### First-time setup on a new VPS

```bash
ssh truck-pai 'mkdir -p /var/www/akkharlabs'
rsync -az --delete dist/ truck-pai:/var/www/akkharlabs/
# then install the vhost below, symlink, nginx -t, systemctl reload nginx
```

## Discovery / SEO Step

```bash
npm run build && npm run indexnow
```

`scripts/indexnow.mjs` reads the 32-hex key file in `public/`, submits every URL in
`dist/sitemap-0.xml` plus `/llms.txt` and `/llms-full.txt` to `api.indexnow.org`.
`202 Accepted` is success; `>= 400` fails the script.

The build produces for every deploy:

| Path | Purpose |
|------|---------|
| `sitemap-index.xml`, `sitemap-0.xml` | Sitemaps (specimen excluded) |
| `llms.txt`, `llms-full.txt` | Plain-text summaries for AI assistants |
| `<32-hex>.txt` | IndexNow key file (currently `b40fb9630f213fed6d164b4e18909b78.txt`) |
| `robots.txt` | Allows search and named AI crawlers, disallows `/specimen/` |
| `og/` | 1200×630 share images |

Cloudflare-side requirements (check in the dashboard, not on the server):

- Security → Bots: **Block AI bots** and **Manage robots.txt** must be **off**.
- The edge must not override `robots.txt`; the file above is authoritative.

After adding or renaming pages, run `npm run build && npm run og` to regenerate share
images, then deploy.

## nginx Virtual Host

File: `/etc/nginx/sites-available/akkharlabs.com`

```nginx
server {
    listen 80;
    listen 443 ssl;
    server_name akkharlabs.com;

    ssl_certificate /etc/nginx/ssl/akkharlabs.com.crt;
    ssl_certificate_key /etc/nginx/ssl/akkharlabs.com.key;

    root /var/www/akkharlabs;
    index index.html;
    charset utf-8;
    absolute_redirect off;

    # Hashed build assets and fonts: immutable
    location /_astro/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
        try_files $uri =404;
    }

    # Share images and papers change rarely
    location ~* ^/(og|papers|brand)/ {
        expires 30d;
        add_header Cache-Control "public";
        try_files $uri =404;
    }

    # Feeds, discovery files and sitemaps: always revalidate
    location ~* ^/(llms.*\.txt|robots\.txt|b40fb9630f213fed6d164b4e18909b78\.txt|sitemap.*\.xml|rss\.xml|feed\.xml)$ {
        add_header Cache-Control "public, max-age=0, must-revalidate";
        try_files $uri =404;
    }

    location / {
        add_header Cache-Control "public, max-age=0, must-revalidate";
        try_files $uri $uri.html $uri/ $uri/index.html =404;
    }

    error_page 404 /404.html;
    location = /404.html {
        internal;
    }

    location ~ /\. {
        deny all;
    }

    gzip on;
    gzip_types text/css application/javascript application/json application/xml text/plain image/svg+xml;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_min_length 256;
}
```

Notes:

- Astro builds with `trailingSlash: 'always'` and `format: 'directory'`, so the
  `try_files $uri $uri.html $uri/ $uri/index.html` chain covers every route.
- The IndexNow key file is matched literally in the cache regex. nginx's PCRE rejects
  the `{32}` quantifier in a `location` regex ("missing closing parenthesis"), so a new
  key means updating that line. Test with `nginx -t` either way.
- When the IndexNow key is rotated, update both the filename in `public/` and the regex.

### Install or update the vhost

```bash
sudo cp /etc/nginx/sites-available/akkharlabs.com.mine /etc/nginx/sites-available/akkharlabs.com
sudo ln -sf /etc/nginx/sites-available/akkharlabs.com /etc/nginx/sites-enabled/akkharlabs.com
sudo nginx -t && sudo systemctl reload nginx
```

Initialize new configs with:

```bash
sudo mkdir -p /var/www/akkharlabs
ssh truck-pai 'sudo chown -R rahathasan:rahathasan /var/www/akkharlabs'
```

### TLS to origin (Cloudflare Full mode)

The origin certificate is self-signed; Cloudflare Full mode does not verify it. It must
cover the apex because Cloudflare connects with SNI `akkharlabs.com`:

```bash
sudo openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/akkharlabs.com.key \
  -out /etc/nginx/ssl/akkharlabs.com.crt \
  -subj "/CN=akkharlabs.com" \
  -addext "subjectAltName=DNS:akkharlabs.com,DNS:www.akkharlabs.com"
sudo chmod 600 /etc/nginx/ssl/akkharlabs.com.key
```

Do not switch the zone to **Full (strict)** with this certificate: it will fail the
handshake with a 526. Use a Cloudflare Origin CA certificate first if strict mode is
wanted.

## DNS and Cloudflare

| Record | Zone nameservers | Purpose |
|--------|------------------|---------|
| `akkharlabs.com` A (proxied) | `arturo.ns.cloudflare.com`, `shaz.ns.cloudflare.com` | Site apex |
| `www.akkharlabs.com` | — | **Missing.** Create a proxied CNAME `www` → `akkharlabs.com` (or an A record) when the `www` hostname should resolve |

The zone also carries `brud`, `cluster`, `igauto` subdomains used by other services.
`www` currently does not resolve, so `https://www.akkharlabs.com` is NXDOMAIN even
though the origin certificate covers it.

NS delegation lives at **Spaceship**, not Cloudflare. Parking records at the registrar
must not be present once Cloudflare is authoritative.

## Health Checks

Run on the VPS (bypasses Cloudflare):

```bash
for p in / /bn/ /about/ /llms.txt /robots.txt /sitemap-index.xml \
         /b40fb9630f213fed6d164b4e18909b78.txt /nonexistent-xyz/; do
  printf '%-44s ' "$p"
  curl -sS -o /dev/null -w '%{http_code}\n' -H 'Host: akkharlabs.com' "http://127.0.0.1$p"
done
```

Expected: `200` for every real route, `404` for the bogus one.

Verify the origin over TLS the way Cloudflare does:

```bash
curl -sSk -o /dev/null -w '%{http_code}\n' \
  --resolve akkharlabs.com:443:217.216.110.6 https://akkharlabs.com/
```

Public checks:

```bash
curl -sS -o /dev/null -w '%{http_code}\n' https://akkharlabs.com/
curl -sSI https://akkharlabs.com/ | grep -iE 'server|cf-cache-status'
```

The page title must be the site title, not `Parking Page`. `server: cloudflare` is
expected.

## Rollback

The previous build is not kept server-side by default. To roll back, check out the
previous commit and redeploy:

```bash
git checkout <previous-commit> -- .   # or: git revert HEAD
npm run build
rsync -az --delete dist/ truck-pai:/var/www/akkharlabs/
```

If you want a safety net before a risky deploy, snapshot the current build first:

```bash
ssh truck-pai 'cp -a /var/www/akkharlabs /var/www/akkharlabs.bak-$(date +%Y%m%d-%H%M%S)'
# restore:
ssh truck-pai 'rm -rf /var/www/akkharlabs && mv /var/www/akkharlabs.bak-<stamp> /var/www/akkharlabs'
```

Old snapshots consume disk; remove them once a deploy is confirmed.

## Troubleshooting

### `nginx -t` fails with `pcre2_compile() failed: missing closing parenthesis`

A `{n}` quantifier is used inside a `location ~*` regex. nginx's PCRE rejects it.
Replace it with a literal pattern (see the IndexNow key line). Fix the file in
`sites-available`, re-test, then reload.

### The wrong site appears for `Host: akkharlabs.com`

The request fell through to the **first** `listen 80` server, which is
`admin.brudcode.com` (root `/var/www/brud-admin`, no `default_server`). Confirmed by:

```bash
curl -sS -H 'Host: akkharlabs.com' http://127.0.0.1/ | grep -o '<title>[^<]*</title>'
# <title>Brud Code — Operational Admin Panel</title>   <- wrong
```

Fix: the akkharlabs vhost must exist in `sites-enabled` with `server_name akkharlabs.com`.

### Public site shows a Spaceship "Parking Page"

The domain is not reaching this VPS. Evidence:

```bash
curl -sSI http://akkharlabs.com/ | grep -iE 'x-amz-version-id|cf-cache-status'
# x-amz-version-id + cf-cache-status: DYNAMIC  <- origin is object storage, not nginx
curl -sS http://akkharlabs.com/ | grep -o '<title>[^<]*</title>'   # Parking Page
```

Meanwhile the VPS serves the correct site locally and over TLS. This is a
Cloudflare/registrar-side pointing problem, not a server fault. Compare with a
subdomain that does work (`brud.akkharlabs.com`), check the apex A record in the
Cloudflare dashboard, and clear any cached/parked record at Spaceship.

### `Error 521` / `522` / `523`

Cloudflare cannot reach `217.216.110.6:80/443`. Check `systemctl is-active nginx`,
the vhost, and that nothing else occupies the ports (`sudo ss -ltnp`).

### `Error 526` (invalid SSL certificate)

The zone is in **Full (strict)** and the origin cert is the self-signed one. Either
switch to **Full**, or install a Cloudflare Origin CA certificate in
`/etc/nginx/ssl/` and point the vhost at it.

### `https://` times out but `http://` answers

The 443 vhost is missing or its `server_name` does not match, so the TLS handshake
falls through to another vhost and the request hangs. Verify with
`curl -sSk --resolve akkharlabs.com:443:217.216.110.6 https://akkharlabs.com/`.

### IndexNow returns 4xx

Check that `https://akkharlabs.com/<key>.txt` is publicly reachable and returns the key
string, that the key file name matches the regex in the nginx vhost, and that
`dist/sitemap-0.xml` exists (run `npm run build` first).

### Pages still show `noindex` after launch

`launched` in `src/site.config.ts` is `false`, or the deploy did not sync. Rebuild,
re-sync, and confirm the meta tag in the served HTML.

## Useful Commands

```bash
# Status
ssh truck-pai 'systemctl is-active nginx'

# Config test then reload
ssh truck-pai 'sudo nginx -t && sudo systemctl reload nginx'

# What is in the web root
ssh truck-pai 'ls -la /var/www/akkharlabs && du -sh /var/www/akkharlabs'

# Which vhost owns a request
ssh truck-pai 'curl -sS -H "Host: akkharlabs.com" http://127.0.0.1/ | grep -o "<title>[^<]*</title>"'

# Port check
ssh truck-pai 'sudo ss -ltnp | grep -E ":(80|443)\b"'

# nginx errors
ssh truck-pai 'sudo tail -n 50 /var/log/nginx/error.log'

# Rebuild share images after page changes
npm run build && npm run og
```
