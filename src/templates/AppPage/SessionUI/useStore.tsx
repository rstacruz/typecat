import create from 'zustand'
import produce from 'immer'
import tokenize from './tokenize'

export type Token = {
  type: string
  value: string
}

export type TokenStatus = {
  isAccurate: boolean
}

export type Store = {
  state: {
    article: {
      /** We'll allow null to catch any possible OOB checks */
      tokens: (Token | null)[]
    }
    session: { startedAt: Date | null }
    currentInput: {
      value: string
      /** Index of the current token */
      tokenIndex: number
      /** -1 if the next is to be ignored */
      charIndex: number
      isAccurate: boolean
      finishedTokens: (TokenStatus | null | void)[]
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
      tokens: tokenize(
        'whenever I see girls and boys, selling lanterns on the street...'
      ),
    },
    session: {
      startedAt: null,
    },
    currentInput: {
      value: '',
      tokenIndex: 0,
      charIndex: 0,
      isAccurate: true,
      finishedTokens: [],
      /* finished: [ { accurate: true }, { accurate: false }], */
    },
  }

  const actions: Store['actions'] = {
    setInputValue: (value) => {
      update(({ state }) => {
        const token = state.article.tokens[state.currentInput.tokenIndex]

        // Start if not startedd
        if (!state.session.startedAt) {
          state.session.startedAt = new Date()
        }

        // Just pressed whitespace, ignore the whitespace that was presed
        if (state.currentInput.charIndex === -1) {
          state.currentInput.charIndex = 0
          return
        }

        if (
          token &&
          token.value &&
          token.value.substr(0, value.length) !== value
        ) {
          state.currentInput.isAccurate = false
        } else {
          state.currentInput.isAccurate = true
        }

        state.currentInput.value = value
        state.currentInput.charIndex = value.length
      })
    },

    inputWhitespace: () => {
      update(({ state }) => {
        const index = state.currentInput.tokenIndex
        const token = state.article.tokens[index]

        // Check for accuracy
        let isAccurate = token && state.currentInput.value === token.value

        // Mark as done
        state.currentInput.finishedTokens[index] = {
          isAccurate: !!isAccurate,
        }

        // TODO: Skip over any whitespace nodes
        state.currentInput.tokenIndex += 2
        state.currentInput.charIndex = -1
        state.currentInput.value = ''
        state.currentInput.isAccurate = true
      })
    },
  }

  return { state, actions }
})

export default useStore
