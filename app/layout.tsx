import './globals.css'
import React from 'react'

export const metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || 'Local Events',
  description: 'Local area events and community listings',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-gray-50 text-gray-900">{children}</main>
      </body>
    </html>
  )
}