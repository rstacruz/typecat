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
    }
    session: { startedAt: Date | null }
    currentInput: {
      value: string
      /** Index of the current token */
      currentToken: number
      /** -1 if the next is to be ignored */
      currentChar: number
    }
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
    },
    session: {
      startedAt: null,
    },
    currentInput: {
      value: '',
      currentToken: 0,
      currentChar: 0,
      /* currentAccuracy: true, */
      /* finished: [ { accurate: true }, { accurate: false }], */
    },
  }

  const actions: Store['actions'] = {
    setInputValue: (value) => {
      update(({ state }) => {
        // Start if not startedd
        if (!state.session.startedAt) {
          state.session.startedAt = new Date()
        }

        // Just pressed whitespace, ignore the whitespace that was presed
        if (state.currentInput.currentChar === -1) {
          state.currentInput.currentChar = 0
          return
        }

        // TODO: check accuracy
        state.currentInput.value = value
        state.currentInput.currentChar = value.length
      })
    },

    inputWhitespace: () => {
      update(({ state }) => {
        // TODO: Skip over any whitespace nodes
        // TODO: check accuracy
        // TODO: check if done
        state.currentInput.currentToken += 2
        state.currentInput.currentChar = -1
        state.currentInput.value = ''
      })
    },
  }

  return { state, actions }
})

export default useStore
