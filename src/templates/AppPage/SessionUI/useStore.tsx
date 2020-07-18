import create from 'zustand'
import produce from 'immer'

export type Token = {
  type: string
  value: string
}

export type Store = {
  state: {
    article: {
      tokens: Token[]
      currentToken: number
      /** -1 if the next is to be ignored */
      currentChar: number
    }
    session: { startedAt: Date | null }
    input: { value: string }
  }
  actions: {
    setInputValue: (value: string) => void
    inputWhitespace: () => void
  }
}

const [useStore] = create<Store>((set) => {
  const update = (fn: (store: Store) => any) => set(produce(fn))
  const state: Store['state'] = {
    article: {
      tokens: [
        { type: 'text', value: 'after' },
        { type: 'whitespace', value: ' ' },
        { type: 'text', value: 'a' },
        { type: 'whitespace', value: ' ' },
        { type: 'text', value: 'long' },
        { type: 'whitespace', value: ' ' },
        { type: 'text', value: 'time' },
        { type: 'whitespace', value: ' ' },
        { type: 'text', value: 'ago' },
        { type: 'whitespace', value: ' ' },
        { type: 'text', value: 'in' },
        { type: 'whitespace', value: ' ' },
        { type: 'text', value: 'a' },
        { type: 'whitespace', value: ' ' },
        { type: 'text', value: 'galaxy' },
        { type: 'whitespace', value: ' ' },
        { type: 'text', value: 'far' },
        { type: 'whitespace', value: ' ' },
        { type: 'text', value: 'way...' },
      ],
      currentToken: 0,
      currentChar: 0,
    },
    session: {
      startedAt: null,
    },
    input: { value: '' },
  }

  const actions: Store['actions'] = {
    setInputValue: (value) => {
      update(({ state }) => {
        if (!state.session.startedAt) {
          state.session.startedAt = new Date()
        }

        // Just pressed whitespace, ignore the whitespace that was presed
        if (state.article.currentChar === -1) {
          state.article.currentChar = 0
        } else {
          state.input.value = value
          state.article.currentChar = value.length
        }
      })
    },

    inputWhitespace: () => {
      update(({ state }) => {
        // Skip over any whitespace nodes
        state.article.currentToken += 2
        state.article.currentChar = -1
        state.input.value = ''
      })
    },
  }

  return { state, actions }
})

export default useStore
