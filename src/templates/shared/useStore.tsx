import create from 'zustand'
import produce from 'immer'
import tokenize from '../AppPage/SessionUI/TextDisplay/useStore/tokenize'
import generateEnglish from '../AppPage/SessionUI/TextDisplay/useStore/generateEnglish'
import Actions from './Actions'

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

export type Store = {
  state: {
    article: {
      /** We'll allow null to catch any possible OOB checks */
      tokens: (Token | null)[]
    }
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
