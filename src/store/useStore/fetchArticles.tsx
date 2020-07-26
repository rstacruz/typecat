import * as Query from 'query-string'
import { Article, GeneratorConfig } from '../useStore'

export async function fetchArticles(
  count: number,
  generator: GeneratorConfig
): Promise<Article[]> {
  const url = Query.stringifyUrl(
    {
      url: '/api/articles',
      query: {
        count: `${count}`,
        type: generator.type,
        language: generator.language,
        wordCount: toString(generator.wordCount),
      },
    },
    {
      skipNull: true,
    }
  )

  const res = await fetch(url).then((res) => res.json())

  return res.articles
}

/**
 * Coerce to string. Writing this out as a function lets the parameters be
 * type-checked in TypeScript.
 */

function toString(num: number): string {
  return `${num}`
}
