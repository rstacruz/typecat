import { NextApiResponse, NextApiRequest } from 'next'
import { generateEnglish } from '../../src/article-generator'
import { tokenize } from '../../src/article-generator'
import * as Joi from '@hapi/joi'
import 'joi-extract-type'

const QuerySchema = Joi.object({
  count: Joi.number().min(1).max(5).default(1),
  type: Joi.string().valid('word').default('word'),
  language: Joi.string().valid('english').default('english'),
  wordCount: Joi.number().min(1).max(200).default(50),
})

type Query = Joi.extractType<typeof QuerySchema>

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { value, error } = QuerySchema.validate<Query>(req.query)
  if (error) return res.status(400).json({ errors: error.details })

  const { count, wordCount } = value

  const articles = Array.from(Array(count), () => {
    const str = generateEnglish({ wordCount })
    const tokens = tokenize(str)
    const article = { tokens }
    return article
  })

  res.status(200).json({ articles })
}
