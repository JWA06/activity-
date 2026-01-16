import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseUrl || !serviceRole) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL in env. Seed will not run.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRole)

async function seed() {
  console.log('Seeding sample sections, venues and events...')

  // Create sample sections
  const sections = [
    { name: 'Pubs', slug: 'pubs' },
    { name: 'Kids', slug: 'kids' },
    { name: 'Community', slug: 'community' },
  ]

  for (const s of sections) {
    await supabase.from('sections').upsert(s, { onConflict: ['slug'] })
  }

  // Create sample venues
  await supabase.from('venues').upsert({ id: 'v1', name: 'The Crown', address: '1 High St' })

  // Create sample events
  const events = [
    { id: 'e1', title: 'Pub Quiz at The Crown', starts_at: new Date().toISOString(), venue_id: 'v1' },
    { id: 'e2', title: 'Kids Storytime - Library', starts_at: new Date(Date.now() + 86400000).toISOString() },
  ]

  for (const e of events) {
    await supabase.from('events').upsert(e, { onConflict: ['id'] })
  }

  console.log('Seed complete')
}

seed().catch((err) => console.error(err))