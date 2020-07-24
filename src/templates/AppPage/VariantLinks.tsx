import React from 'react'
import Link from 'next/link'

export function VariantLinks() {
  const wordCounts = [25, 50, 100]
  return (
    <nav>
      {wordCounts.map((wordCount) => (
        <span key={wordCount}>
          <Link href='/english/[wordCount]' as={`/english/${wordCount}`}>
            <a>{wordCount}</a>
          </Link>{' '}
        </span>
      ))}
    </nav>
  )
}
