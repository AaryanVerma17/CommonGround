# CommonGround — Interest-Based Community Discovery

A responsive, interactive community-discovery website prototype for the AFFECIO HACKS '26 **Communities** track. It uses fictional demo profiles and seeded sample communities, events, and posts.

## Features

- Responsive dashboard and sidebar navigation
- Discover and filter communities by multiple interests, popularity, and membership
- User profile editing with multi-select interests
- Create a new community (automatically joins its creator)
- Join/leave communities and save/unsave communities
- Create posts, like posts, copy/share post text, and browse the sample community feed
- Member discovery, shared-interest indicators, profile detail views, and demo connection actions
- Sample events with a working RSVP toggle
- Browser `localStorage` persistence for profile, communities, and posts
- Toast feedback, notification popover, empty states, and mobile navigation

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build:

```bash
npm run build
npm run preview
```

## Deploy

This is a frontend prototype and can be deployed to Vercel, Netlify, or any static hosting service. Build command: `npm run build`; output directory: `dist`.

## Demo-data and production notes

- All users, posts, community counts, and events included by default are fictional sample data.
- User-created profile details, communities, and posts are saved in the current browser only.
- This prototype does not include production authentication, a hosted database, real messaging, server-side moderation, or live AI recommendations. These can be added as a next phase using Supabase/PostgreSQL and an AI API.
- Google Fonts are loaded from Google Fonts; the app itself does not require external image assets.
