import create from 'zustand'
import Actions from './useStore/Actions'

export type Token = {
  type: string
  value: string
}

export type TokenStatus = {
  isAccurate: boolean
  /** What was typed as part of the token */
  value?: string
}

export type Result = {
  wpm: number
  accuracy: number
}

export type Article = {
  /** We'll allow null to catch any possible OOB checks */
  tokens: (Token | null)[]
}

export type State = {
  /** The current article being typed */
  article: Article

  /** The next articles to be loaded after finishing the current one */
  articleQueue: Article[]

  /** A list of wpm/accuracy results */
  results: (Result | null)[]

  /** The current status of the session */
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

  /** The current input state */
  currentInput: {
    /** The value displayed in the input box */
    value: string

    /** Index of the current token in `article.tokens` */
    tokenIndex: number

    /** Describes where the cursor is on the current token */
    charIndex: number

    /** `true` if no errors on the current token */
    isAccurate: boolean

    /** Tokens that have been typed */
    finishedTokens: (TokenStatus | null | void)[]
  }
}

export type Store = {
  state: State
  actions: Actions
}

const [useStore] = createStore()

export function createStore() {
  return create<Store>((set, get) => {
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

    const actions = new Actions(set, get)

    return { state, actions }
  })
}

export default useStore
