'use client'

import React, { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'

type Event = {
  id: string
  title: string
  starts_at: string
  venue?: string
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    fetch('/api/events')
      .then((r) => r.json())
      .then((data) => setEvents(data))
      .catch(() => setEvents([]))
  }, [])

  return (
    <div className="container mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Local Events</h1>
        <p className="text-gray-600">Pubs, Kids, Community and more</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Upcoming events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      <footer className="mt-12 text-sm text-gray-500">Built with ❤️ — scaffold</footer>
    </div>
  )
}