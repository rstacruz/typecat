import fetch from 'cross-fetch'
import { Article } from '../useStore'

export async function fetchArticles(count: number): Promise<Article[]> {
  const wordCount = +(localStorage.wordCount || 20)

  const res = await fetch(
    `/api/articles?count=${count}&wordCount=${wordCount}`
  ).then((res) => res.json())

  return res.articles
}
