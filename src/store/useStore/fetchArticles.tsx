import { Article, State } from '../useStore'
import * as Query from 'query-string'

export async function fetchArticles(
  count: number,
  articleParams: State['articleParams']
): Promise<Article[]> {
  const { wordCount } = articleParams

  const url = Query.stringifyUrl({
    url: '/api/articles',
    query: { count: `${count}`, wordCount: `${wordCount || 4}` },
  })

  const res = await fetch(url).then((res) => res.json())

  return res.articles
}
