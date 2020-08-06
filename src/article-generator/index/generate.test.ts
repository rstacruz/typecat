import { generate } from './generate'
import { LanguageName } from '../../store/useStore'

let LANGUAGES: LanguageName[] = ['english', 'filipino']

for (let language of LANGUAGES) {
  it('generates words', () => {
    Array.from(Array(100), () => {
      let output = generate({ wordCount: 10, language })
      if (!output) throw new Error('No output')
      let words = output.split(' ')

      expect(words.length).toBeGreaterThanOrEqual(10)

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
}
