import React from 'react'
import Link from 'next/link'
import CSS from './VariantLinks.module.css'
import { LanguageName } from '../../../store/useStore'

export function VariantLinks() {
  const wordCounts = [25, 50, 100]
  const language: LanguageName = 'english'

  return (
    <nav className={CSS.root}>
      {wordCounts.map((wordCount) => (
        <span key={wordCount} className={CSS.item}>
          <Link
            href='/[language]/[wordCount]'
            as={`/${language}/${wordCount}`}
            replace
          >
            <a>{wordCount}</a>
          </Link>{' '}
        </span>
      ))}

      <span className={CSS.separator} />

      <span className={CSS.item}>
        <Link href='/[language]' as={'/articles'}>
          <a>Articles</a>
        </Link>
      </span>
    </nav>
  )
}
