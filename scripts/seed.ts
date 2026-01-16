import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseUrl || !serviceRole) {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL in env. Seed will not run.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRole)

const ADMIN_ID = 'a6244ea4-02b4-4f83-944e-6c348a7bfc07'

async function seed() {
  console.log('Seeding sample sections, venues, events, and admin profile...')

  // Create admin profile if the corresponding auth user exists
  try {
    const { data: users, error: usersError } = await supabase
      .from('auth.users')
      .select('id')
      .eq('id', ADMIN_ID)
      .limit(1)

    if (usersError) {
      console.warn('Could not query auth.users. Attempting to upsert profile anyway - FK may fail:', usersError.message)
    }

    if (users && users.length > 0) {
      const { error: upsertProfileError } = await supabase
        .from('profiles')
        .upsert({ id: ADMIN_ID, full_name: 'Site Admin', role: 'admin' }, { onConflict: ['id'] })

      if (upsertProfileError) {
        console.error('Failed to upsert admin profile:', upsertProfileError.message)
      } else {
        console.log('Admin profile upserted for id', ADMIN_ID)
      }
    } else {
      console.warn(`Auth user with id ${ADMIN_ID} not found in auth.users. Create the auth user first or insert profile manually.`)
    }
  } catch (err: any) {
    console.error('Error creating admin profile', err.message || err)
  }

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
    { id: 'e1', title: 'Pub Quiz at The Crown', starts_at: new Date().toISOString(), venue_id: 'v1', status: 'published', created_by: ADMIN_ID },
    { id: 'e2', title: 'Kids Storytime - Library', starts_at: new Date(Date.now() + 86400000).toISOString(), status: 'published', created_by: ADMIN_ID },
  ]

  for (const e of events) {
    await supabase.from('events').upsert(e, { onConflict: ['id'] })
  }

  // Create sample posts
  const posts = [
    { id: 'p1', title: 'Welcome to Local Events', slug: 'welcome', content: '<p>Welcome to our community events site.</p>', author_id: ADMIN_ID, status: 'published', published_at: new Date().toISOString() },
  ]

  for (const p of posts) {
    await supabase.from('posts').upsert(p, { onConflict: ['id'] })
  }

  console.log('Seed complete')
}

seed().catch((err) => console.error(err))