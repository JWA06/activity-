# Local Events (MVP scaffold)

This repository contains an initial scaffold for a local events website (Next.js + TypeScript + Tailwind + Supabase).

What is included
- Next.js (App Router) scaffold
- Tailwind CSS configuration
- Supabase client helper (no keys committed)
- Simple public homepage and API route for events
- Admin placeholder pages (protected via Supabase Auth — see setup)
- Seed script to populate sample events/posts (uses SUPABASE_SERVICE_ROLE_KEY)

Quick start (local)
1. Install dependencies
   npm install

2. Create a Supabase project: https://app.supabase.com
   - Create a database and a storage bucket (optional)
   - Enable Email auth (or other providers you prefer)
   - Get the project URL and anon/public key
   - Get the service_role key for running the seed script (keep this secret)

3. Copy `.env.example` to `.env.local` and fill in the values:
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=

4. Run the dev server
   npm run dev

5. (Optional) Seed the database with sample data
   npm run seed

Admin
- An admin UI scaffold is available at `/admin` (requires proper Supabase auth setup).
- The README includes instructions for creating users via Supabase if needed.

Notes
- No secrets are committed. Add secrets to Vercel / your deployment platform when ready.
- The WYSIWYG blog editor is scaffolded as a placeholder — replace with Tiptap or your preferred editor as needed.
