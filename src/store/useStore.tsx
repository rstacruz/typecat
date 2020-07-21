import create from 'zustand'
import produce from 'immer'
import Actions from './useStore/Actions'

export type Token = {
  type: string
  value: string
}

export type TokenStatus = {
  isAccurate: boolean
}

export type Result = {
  wpm: number
  accuracy: number
}

export type Article = {
  /** We'll allow null to catch any possible OOB checks */
  tokens: (Token | null)[]
}

export type Store = {
  state: {
    article: Article
    articleQueue: Article[]
    results: (Result | null)[]
    session:
      | {
          status: 'ongoing'
          startedAt: Date | null
        }
      | {
          status: 'pending'
        }
      | {
          status: 'ready'
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
  actions: Actions
}

export type State = Store['state']

const [useStore] = create<Store>((set) => {
  const update = (fn: (store: Store) => any) => set(produce(fn))

  const state: State = {
    article: {
      tokens: [],
    },

    articleQueue: [],

    results: [],

    session: {
      status: 'pending',
    },

    currentInput: {
      value: '',
      tokenIndex: 0,
      charIndex: 0,
      isAccurate: true,
      finishedTokens: [],
    },
  }

  const actions = new Actions(update)

  return { state, actions }
})

export default useStore
