# About Wedding Invitation

**Wedding Invitation** is a modern full-stack digital wedding invitation platform built with Next.js, Supabase, and Vercel. It turns a traditional wedding card into an interactive web experience where guests can view event details, browse the photo gallery, listen to background music, send wishes, and confirm attendance online.

---

## Purpose

This project was created to provide a polished, shareable, mobile-friendly wedding invitation page that can be deployed publicly and sent to guests as a single link.

Instead of using a static image or PDF invitation, the app provides a live web page with dynamic data backed by Supabase.

---

## What the App Does

- Creates a personalized wedding invitation by slug.
- Displays bride and groom information.
- Shows wedding date, time, event details, and location information.
- Supports a manually controlled wedding photo gallery.
- Provides RSVP submission for guests.
- Allows guests to leave wishes and messages.
- Displays optional gift and bank transfer information.
- Plays background music with browser-safe audio behavior.
- Provides a management page for editing invitation-related content.

---

## Technical Highlights

- Built with Next.js App Router.
- Uses React and TypeScript for maintainable frontend logic.
- Uses Supabase for database, storage, and content persistence.
- Uses Vercel for production deployment.
- Supports Docker for local testing on machines that do not have a compatible Node.js version.
- Includes manual image crop controls for hero, gallery, and RSVP sections.
- Optimized for responsive desktop and mobile viewing.

---

## Core Stack

```text
Next.js 16
React 19
TypeScript
Tailwind CSS 4
Framer Motion
Supabase
Vercel
Docker
Node.js 22
```

---

## Deployment Model

```text
GitHub Repository
      ↓
Vercel Deployment
      ↓
Supabase Database / Storage
      ↓
Public Wedding Invitation Link
```

Example public route:

```text
https://your-domain.vercel.app/your-wedding-slug
```

---

## Current Project Status

The project currently supports the main production flow:

```text
Create invitation → Manage content → Deploy → Share public link
```

It is suitable as a real-world portfolio project and as a foundation for a small online wedding invitation product.

---

## Recommended Future Improvements

- Add authentication for the management page.
- Add admin-only access control for invitation creation.
- Add UI-based crop controls for uploaded photos.
- Add drag-and-drop gallery sorting.
- Add custom Open Graph image generation for social sharing.
- Add custom domain setup.
- Add better analytics for RSVP and guest interactions.

---

## Credit

Designed and developed by **Hoàng Hải**.

```text
© 2026 Designed & Developed by Hoàng Hải
```
