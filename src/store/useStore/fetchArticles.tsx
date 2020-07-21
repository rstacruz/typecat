import { Article } from '../useStore'
import tokenize from './tokenize'
import generateEnglish from './generateEnglish'

export async function fetchArticles(count: number): Promise<Article[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Array.from(Array(count), () => getArticle()))
    }, 300)
  })
}

function getArticle(): Article {
  const count = +(localStorage.wordcount || 20)
  const tokens = tokenize(
    generateEnglish(Math.round(Math.random() * 10), count)
  )
  return { tokens }
}
