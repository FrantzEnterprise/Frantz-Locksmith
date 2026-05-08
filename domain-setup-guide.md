# How to Point frantzlocksmithservice.com to Your New Website
## GitHub Pages Setup Guide — Step by Step

---

**Your live site:** https://frantzenterprise.github.io/Frantz-Locksmith/
**Your domain:** frantzlocksmithservice.com (GoDaddy)
**Time needed:** 30 minutes + up to 48 hours for DNS to spread

---

## What We're Doing

Right now your website lives at `frantzenterprise.github.io/Frantz-Locksmith/`. We're going to make it show up when someone types `frantzlocksmithservice.com`. This is a big deal for SEO — Google ranks custom domains much higher than GitHub Pages subdomains.

You only need to do **Step 1** (GoDaddy DNS) and **Step 2** (GitHub). I handle the code changes in Step 3.

---

## STEP 1 — GoDaddy DNS Settings

1. **Log into** [GoDaddy.com](https://www.godaddy.com) with your account

2. **Go to "My Products"** (top of page) → find your domain: **frantzlocksmithservice.com**

3. Click the **DNS** button (or "Manage DNS" — blue button next to the domain)

4. You'll see a list of existing DNS records. We need to **add one new record** and **change one existing.** Here's exactly what to do:

### Delete the old A record (if any)
- Look for a row where **Type** = **A** and **Name** = **@** or blank
- Click the **trash can icon** on the right to delete it
- Don't worry — we're replacing it with the correct one

### Add a new A record (tells the internet where to find your site)
- Click the blue **"Add"** or **"Add Record"** button
- Fill in these EXACT values:
  - **Type:** A
  - **Name:** @ (this means "the root domain" — frantzlocksmithservice.com)
  - **Value (points to):** `185.199.108.153`
  - **TTL:** 1 Hour (or 3600 if it shows seconds)
- Click **Save**

### Add three more A records for reliability:
Repeat the "Add Record" step three more times, each time with the same settings except use these IP addresses (one per record):

| # | Type | Name | Value |
|---|------|------|-------|
| 2 | A | @ | `185.199.109.153` |
| 3 | A | @ | `185.199.110.153` |
| 4 | A | @ | `185.199.111.153` |

### Add a CNAME record (makes www. work too)
- Click **Add Record**
- Fill in:
  - **Type:** CNAME
  - **Name:** www
  - **Value (points to):** `frantzenterprise.github.io.` **(include the dot at the end!)**
  - **TTL:** 1 Hour
- Click **Save**

### ✅ GoDaddy Done
Close the GoDaddy tab. The DNS changes take 5 minutes to 48 hours to spread (usually 1-2 hours).

---

## STEP 2 — Tell GitHub About Your Domain

1. Go to **https://github.com/FrantzEnterprise/Frantz-Locksmith** (logged in)

2. Click the **Settings** tab (toward the right, near the top)

3. On the left sidebar, click **Pages** (under "Code and automation")

4. In the "Custom domain" box, type: **`frantzlocksmithservice.com`**

5. Click **Save**

6. ✅ **Check the box** that says **"Enforce HTTPS"** — this is important for security and SEO
   - *Note: It may take a few minutes for HTTPS to provision. If it doesn't work immediately, wait an hour and try again.*

### ✅ GitHub Done

---

## STEP 3 — Code Changes (I Do This)

Once I know the domain is pointing correctly, I'll update the following in your website files:

1. ✅ Canonical URLs → change from your old domain to the new real one
2. ✅ Create `robots.txt` for search engines
3. ✅ Add Open Graph tags for social sharing
4. ✅ Add XML sitemap for Google

These go in the next commit after you confirm DNS works.

---

## How to Check If It's Working

**Method 1 — Quick ping (2 minutes after GoDaddy):**
- Open Command Prompt (Windows) or Terminal (Mac)
- Type: `ping frantzlocksmithservice.com` and press Enter
- If you see IPs starting with `185.199`, it's working

**Method 2 — Wait and visit (most reliable):**
- Wait 2-4 hours (sometimes overnight for GoDaddy)
- Open a NEW browser window (or incognito/private mode)
- Type: **https://frantzlocksmithservice.com**
- If you see your website, it worked!

**Method 3 — DNS Checker (free online tool):**
- Go to: https://dnschecker.org
- Type: `frantzlocksmithservice.com`
- Select: A record
- When it shows `185.199.108.153` (or any 185.199.x.x) on most check marks, you're live

---

## Troubleshooting

| Problem | Likely Fix |
|---------|------------|
| "Site not found" after 4 hours | Double-check GoDaddy A records have the exact IPs above |
| HTTPS certificate not enabling | GitHub may take up to 30 min to auto-provision. Uncheck "Enforce HTTPS", save, re-check it |
| www. doesn't work | Make sure the CNAME record value has **the dot at the end:** `frantzenterprise.github.io.` |
| Old GoDaddy website still showing | Delete all old A records that point to different IPs. Only keep the four 185.199.x.x A records |

---

## After This Works — Next SEO Steps

1. I fix the canonical URLs site-wide ✅
2. I create a sitemap.xml for Google ✅
3. I add Open Graph tags ✅
4. You claim/update your **Google Business Profile** (biggest local ranking factor)

---

*Created for Robert Frantz — Frantz Locksmith Service — May 2026*
