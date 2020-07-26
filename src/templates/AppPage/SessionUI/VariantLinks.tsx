import React from 'react'
import Link from 'next/link'
import CSS from './VariantLinks.module.css'

export function VariantLinks() {
  const wordCounts = [25, 50, 100]
  return (
    <nav className={CSS.root}>
      {wordCounts.map((wordCount) => (
        <span key={wordCount} className={CSS.item}>
          <Link href='/english/[wordCount]' as={`/english/${wordCount}`}>
            <a>{wordCount}</a>
          </Link>{' '}
        </span>
      ))}
    </nav>
  )
}
