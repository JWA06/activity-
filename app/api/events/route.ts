import { NextResponse } from 'next/server'

// Simple events API: returns seed/sample events if SUPABASE not configured yet
export async function GET() {
  const sample = [
    { id: '1', title: 'Pub Quiz at The Crown', starts_at: new Date().toISOString(), venue: 'The Crown' },
    { id: '2', title: 'Kids Storytime - Library', starts_at: new Date(Date.now() + 86400000).toISOString(), venue: 'Town Library' },
    { id: '3', title: 'Community Yoga in the Park', starts_at: new Date(Date.now() + 2 * 86400000).toISOString(), venue: 'Central Park' },
  ]

  // If Supabase environment is configured, server-side code can query the DB.
  // For now return sample data to get the UI working immediately.
  return NextResponse.json(sample)
}