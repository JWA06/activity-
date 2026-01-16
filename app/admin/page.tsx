'use client'
import React from 'react'

export default function AdminHome() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Admin</h1>
      <p className="mt-4">This is an admin scaffold. Connect Supabase Auth and replace the placeholder pages with the full Posts/Events/Sections management UI.</p>

      <nav className="mt-6 space-x-4">
        <a className="text-blue-600 underline" href="/admin/posts">Posts</a>
        <a className="text-blue-600 underline" href="/admin/events">Events</a>
        <a className="text-blue-600 underline" href="/admin/sections">Sections</a>
      </nav>
    </div>
  )
}