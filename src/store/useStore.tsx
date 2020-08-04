import create from 'zustand'
import Actions from './useStore/Actions'

/**
 * List of all available languages
 */

export const LANGUAGES = [
  'english',
  'filipino',
  'codewords',
  'css',
  'articles',
] as const

export type Token = {
  type: string
  value: string
}

export type TokenStatus = {
  /** What was typed as part of the token */
  value: string

  /** Number of mistyped characters */
  mistakes: number
}

export type Result = {
  wpm: number
  accuracy: number
  mistakeCount: number
  durationMs: number
}

export type Article = {
  /** We'll allow null to catch any possible OOB checks */
  tokens: (Token | null)[]
}

export type CursorStyle = 'block' | 'line' | 'invisible'
export type ThemeStyle = 'day' | 'night'

export type Preferences = {
  cursorStyle: CursorStyle
  themeStyle: ThemeStyle
}

export type LanguageName = typeof LANGUAGES[number]

export type GeneratorConfig = {
  type: 'word'
  language: LanguageName
  wordCount: number
}

export type State = {
  /** The current article being typed */
  article: Article

  generator: GeneratorConfig

  /** The next articles to be loaded after finishing the current one */
  articleQueue: Article[]

  /** A list of wpm/accuracy results */
  results: (Result | null)[]

  /** The last known result */
  interimResult: Result | null

  preferences: Preferences

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
    finishedTokens: (TokenStatus | null)[]
  }
}

export type Store = {
  state: State
  actions: Actions
}

const [useStore] = createStore()

export function getDefaults(): State {
  return {
    preferences: {
      cursorStyle: 'block',
      themeStyle: 'day',
    },
    article: {
      tokens: [],
    },
    generator: {
      type: 'word',
      language: 'english',
      wordCount: 50,
    },
    articleQueue: [],
    results: [],
    interimResult: null,
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
}

/**
 * Creates a zustand store.
 */

export function createStore() {
  return create<Store>((set, get) => {
    const state: State = getDefaults()
    const actions = new Actions(set, get)
    return { state, actions }
  })
}

export default useStore
