export const metadata = {
  title: 'LifeGuide Book',
  description: 'Personal website, blog, and portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
