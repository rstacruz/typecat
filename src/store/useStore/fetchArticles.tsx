import { Article } from '../useStore'
/* import tokenize from './tokenize' */
/* import generateEnglish from './generateEnglish' */

export async function fetchArticles(count: number): Promise<Article[]> {
  const res = await fetch(
    `/api/articles?count=${count}&wordCount=10`
  ).then((res) => res.json())

  return res.articles
}

/* function getArticle(): Article { */
/*   const count = +(localStorage.wordcount || 20) */
/*   const tokens = tokenize( */
/*     generateEnglish(Math.round(Math.random() * 10), count) */
/*   ) */
/*   return { tokens } */
/* } */
