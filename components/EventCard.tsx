import React from 'react'

export default function EventCard({ event }: { event: any }) {
  return (
    <article className="p-4 border rounded bg-white shadow-sm">
      <h3 className="font-semibold">{event.title}</h3>
      <div className="text-sm text-gray-600">{new Date(event.starts_at).toLocaleString()}</div>
      {event.venue && <div className="text-sm">Venue: {event.venue}</div>}
    </article>
  )
}