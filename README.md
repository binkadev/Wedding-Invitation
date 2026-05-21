# Wedding Invitation

A modern online wedding invitation platform built with **Next.js**, **Supabase**, and **Vercel**. The project allows couples to create a personalized digital invitation, manage event information, display wedding photos, receive RSVP responses, collect guest wishes, show gift/bank transfer information, and play background music on the invitation page.

> This project was customized as a real-world digital wedding invitation with manual photo layout control, responsive mobile presentation, Supabase-backed content management, and Vercel deployment.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Supabase Setup](#supabase-setup)
- [Run Locally](#run-locally)
- [Run with Docker](#run-with-docker)
- [Deploy to Vercel](#deploy-to-vercel)
- [Important Routes](#important-routes)
- [Image and Music Notes](#image-and-music-notes)
- [Security Notes](#security-notes)
- [Author](#author)

---

## Overview

Wedding Invitation is a full-stack web application for creating and sharing elegant online wedding invitations. Instead of sending static images or PDF cards, the invitation is delivered as a live web page that can include:

- Couple information
- Wedding date and time
- Bride-side and groom-side event locations
- Google Maps embeds
- Photo gallery
- RSVP form
- Guest wishes
- Gift and bank transfer section
- Background music
- Mobile-friendly design

The project is designed for a realistic deployment flow:

```text
GitHub Repository → Vercel Deployment → Supabase Database / Storage
```

Local development can be done with Node.js 22 or Docker.

---

## Key Features

### Invitation Page

- Beautiful hero section with couple names, invitation message, wedding date, and background image.
- Manual hero image crop control for desktop and mobile.
- Responsive design optimized for desktop and mobile screens.
- Elegant typography and soft wedding-themed visual style.

### Photo Gallery

- Manual local wedding image setup through `public/wedding`.
- Per-photo crop control through `objectPosition`.
- Lightbox-style preview for gallery images.
- Supports future integration with Supabase Storage uploads.

### RSVP

- Guests can confirm attendance.
- Guests can select bride side or groom side.
- RSVP data is stored in Supabase.
- Bride/groom selection cards support manual image crop positioning.

### Guest Wishes

- Guests can submit messages and wishes.
- Wishes are loaded from Supabase and displayed on the invitation page.

### Gift Section

- Optional gift/bank transfer section.
- Supports groom-side and bride-side bank information.
- Supports QR image URLs for transfer information.

### Background Music

- Manage music URL, delay, volume, and autoplay setting.
- Uses browser-safe audio behavior.
- Includes a visible play button because modern browsers may block audio autoplay until the user interacts with the page.

### Management Page

- A management route is available for editing invitation-related content.
- Supports music setting updates, image upload workflows, RSVP overview, and content management.

---

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| Backend / Database | Supabase |
| Storage | Supabase Storage |
| Deployment | Vercel |
| Local Container Runtime | Docker |
| Runtime | Node.js 22 |

---

## Architecture

```text
app/
├── create/                 # Invitation creation page
├── [slug]/                 # Public invitation page
│   ├── components/         # Invitation UI components
│   ├── manage/             # Management page and tools
│   └── templates/          # Wedding templates
├── api/                    # API routes
├── components/             # Shared app components
├── lib/                    # Supabase client and utilities
└── public/wedding/         # Manual local wedding images
```

Main data flow:

```text
Create / Manage Page
        ↓
Supabase tables: couples, locations, gallery, wishes, rsvp, wedding_gifts
        ↓
Public invitation route: /[slug]
        ↓
Guests view invitation, send RSVP, and leave wishes
```

---

## Project Structure

Important files and folders:

```text
app/create/page.tsx
```

Invitation creation form.

```text
app/[slug]/page.tsx
```

Public invitation route. Loads the couple data from Supabase and renders the selected template.

```text
app/[slug]/templates/ClassicTemplate.tsx
```

Main classic wedding template currently customized for manual image control.

```text
app/[slug]/components/Hero.tsx
```

Hero section with responsive background crop control.

```text
app/[slug]/components/Gallery.tsx
```

Wedding photo gallery with manual object-position support.

```text
app/[slug]/components/RsvpSection.tsx
```

Guest RSVP section.

```text
app/[slug]/components/AudioPlayer.tsx
```

Background music player.

```text
app/[slug]/components/Footer.tsx
```

Footer credit section.

```text
public/wedding/
```

Manual wedding photos used by the customized template.

---

## Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SUPABASE_BUCKET=wedding-images
```

### Important

- Never commit `.env.local` to GitHub.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be exposed to the browser when Row Level Security policies are configured correctly.
- `SUPABASE_SERVICE_ROLE_KEY` is sensitive and must never be exposed publicly.
- Rotate Supabase keys immediately if they were shared publicly by mistake.

---

## Supabase Setup

The app expects these main tables:

```text
couples
locations
gallery
wishes
rsvp
wedding_gifts
```

Recommended setup files in this repository:

```text
database-setup.sql
migration-locations.sql
migration-gift-box.sql
```

Minimum expected data responsibilities:

| Table | Purpose |
| --- | --- |
| `couples` | Main wedding invitation information |
| `locations` | Bride-side and groom-side event location details |
| `gallery` | Uploaded photo URLs and order |
| `wishes` | Guest wishes and messages |
| `rsvp` | Attendance confirmations |
| `wedding_gifts` | Gift and bank transfer information |

For public invitation features, configure Supabase Row Level Security carefully. Read access is generally needed for invitation data, while insert access is needed for RSVP and wishes.

---

## Run Locally

This project requires Node.js 22.

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Create page:

```text
http://localhost:3000/create?theme=classic
```

Invitation page example:

```text
http://localhost:3000/your-wedding-slug
```

If your local machine has an older Node.js version, use Docker instead.

---

## Run with Docker

Build the image:

```bash
docker build --progress=plain \
  --build-arg NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co" \
  --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key" \
  -t thiep-cuoi-online .
```

Run the container:

```bash
docker run --name thiep-cuoi-online \
  -p 3000:3000 \
  --env-file .env.local \
  thiep-cuoi-online
```

Open:

```text
http://localhost:3000
```

Restart after code changes:

```bash
docker rm -f thiep-cuoi-online
docker image rm -f thiep-cuoi-online
```

Then build and run again.

---

## Deploy to Vercel

Recommended deployment flow:

```text
GitHub master branch → Vercel project → Supabase backend
```

Steps:

1. Push the latest code to GitHub.
2. Import the repository into Vercel.
3. Select `Next.js` as the framework preset.
4. Use root directory `./`.
5. Add the required environment variables.
6. Deploy.

Required Vercel environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SUPABASE_BUCKET=wedding-images
```

After deployment, the invitation URL will look like:

```text
https://your-vercel-domain.vercel.app/your-wedding-slug
```

---

## Important Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/create?theme=classic` | Create a new wedding invitation |
| `/[slug]` | Public invitation page |
| `/[slug]/manage` | Manage invitation content |

Example:

```text
https://your-domain.vercel.app/hoang-thi-thu-hang-nguyen-tien-ngoc
```

---

## Image and Music Notes

### Images

The customized classic template currently uses local images from:

```text
public/wedding/
```

Important paths:

```text
/wedding/4.jpg  # Hero image
/wedding/1.jpg  # Bride RSVP image
/wedding/3.jpg  # Groom RSVP image
```

To adjust crop positions, edit:

```text
app/[slug]/templates/ClassicTemplate.tsx
```

To adjust rendering behavior, edit:

```text
app/[slug]/components/Hero.tsx
app/[slug]/components/Gallery.tsx
app/[slug]/components/RsvpSection.tsx
```

### Music

Music settings are stored in the `couples` table:

```text
music_url
music_delay
music_volume
music_autoplay
```

Modern browsers often block autoplay with sound until the user interacts with the page. Because of that, the invitation includes a music play button. This is expected browser behavior, not a deployment issue.

---

## Security Notes

- Do not expose `SUPABASE_SERVICE_ROLE_KEY` in client code.
- Do not commit `.env.local`.
- Configure Supabase Row Level Security before sharing the project publicly.
- Avoid leaving `/create` and `/manage` publicly writable for production use unless protected by authentication or an admin-only workflow.
- Rotate API keys if they were ever posted publicly.

---

## Current Status

The project is functional for:

- Creating an invitation
- Viewing a public invitation by slug
- Displaying manually controlled wedding photos
- Saving and showing RSVP data
- Saving and showing wishes
- Managing background music
- Deploying to Vercel

Recommended future improvements:

- Add authentication for `/manage`
- Add stronger admin protection for `/create`
- Add drag-and-drop gallery reordering
- Add per-photo crop controls in the UI
- Add custom domain support
- Add Open Graph preview image generation

---

## Author

Designed and developed by **Hoàng Hải**.

```text
© 2026 Designed & Developed by Hoàng Hải
```
