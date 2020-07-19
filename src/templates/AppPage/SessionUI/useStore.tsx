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
    session:
      | {
          status: 'ongoing'
          startedAt: Date | null
        }
      | {
          status: 'idle'
        }
      | {
          status: 'finished'
          startedAt: Date | null
        }
    currentInput: {
      value: string
      /** Index of the current token */
      tokenIndex: number
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

/* const STRING = `whenever I see girls and boys, selling lanterns on the street. I remember the child, in the manger as he sleeps` */
const STRING = `before early if up present right very from these however both of look also new can off head few no show good should move right seem school play he many each there each here plan under another go great because order over old end be keep in know become early before early if up present right very from these however both of look also new can off head few no show good should move right seem school play he many each there each here plan under another go great because order over old end be keep in know become early`

/* const STRING = `import React from 'react'; */

/* function SpanComponent(props: { */
/*   children?: React.ReactNode */
/* }) { */
/*   return <span>{props.children || null}</span>; */
/* }` */

const [useStore] = create<Store>((set) => {
  const update = (fn: (store: Store) => any) => set(produce(fn))

  const state: Store['state'] = {
    article: {
      tokens: tokenize(STRING),
    },
    session: {
      status: 'idle',
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

        // Start if not started
        if (state.session.status === 'idle') {
          state.session = { status: 'ongoing', startedAt: new Date() }
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
        // Only if a session's started
        if (state.session.status !== 'ongoing') return

        const index = state.currentInput.tokenIndex
        const token = state.article.tokens[index]
        const currentValue = state.currentInput.value

        // Double enter
        if (currentValue === '') {
          state.currentInput.charIndex = 0
          return
        }

        // Check for accuracy
        let isAccurate = token && token.value === currentValue

        // Mark as done
        state.currentInput.finishedTokens[index] = {
          isAccurate: !!isAccurate,
        }

        // Are we done?
        const nextIndex = state.currentInput.tokenIndex + 2
        if (nextIndex > state.article.tokens.length) {
          state.session = {
            status: 'finished',
            startedAt: state.session.startedAt,
          }
        }

        // TODO: Skip over any whitespace nodes
        state.currentInput.tokenIndex = nextIndex
        state.currentInput.charIndex = 0
        state.currentInput.value = ''
        state.currentInput.isAccurate = true
      })
    },
  }

  return { state, actions }
})

export default useStore
