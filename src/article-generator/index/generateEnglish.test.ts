import { generateEnglish } from './generateEnglish'

it('generates words', () => {
  let output = generateEnglish({ wordCount: 10 })
  let words = output.split(' ')

  expect(words.length).toEqual(10)
  for (let word of words) {
    expect(typeof word).toEqual('string')
    expect(word.length).toBeGreaterThan(0)
  }
})
