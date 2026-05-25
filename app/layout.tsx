export const metadata = {
  title: 'Grey Parliament',
  description: 'Your voice. Your vote. Counts.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
