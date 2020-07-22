import { generateEnglish } from './generateEnglish'

it('generates words', () => {
  Array.from(Array(100), () => {
    let output = generateEnglish({ wordCount: 10 })
    let words = output.split(' ')

    expect(words.length).toEqual(10)

    // No empty words
    for (let word of words) {
      expect(typeof word).toEqual('string')
      expect(word.length).toBeGreaterThan(0)
    }

    // No duplicate words
    for (let i = 1; i < words.length; i++) {
      expect(words[i]).not.toEqual(words[i - 1])
    }
  })
})
