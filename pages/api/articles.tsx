import { NextApiResponse, NextApiRequest } from 'next'
import { generateEnglish } from '../../src/article-generator'
import { tokenize } from '../../src/article-generator/tokenize'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const count = clamp(+(req.query.count || 1), 1, 5)
  const wordCount = clamp(+(req.query.wordCount || 20), 1, 100)

  const articles = Array.from(Array(count), () => {
    const str = generateEnglish({ wordCount })
    const tokens = tokenize(str)
    const article = { tokens }
    return article
  })

  res.status(200).json({ articles })
}

function clamp(number: number, min: number, max: number) {
  return Math.min(Math.max(number, min), max)
}
