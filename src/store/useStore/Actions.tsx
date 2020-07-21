import { State, Result, Token } from '.'
import tokenize from './tokenize'
import generateEnglish from './generateEnglish'

class Actions {
  update: any

  constructor(update: any) {
    this.update = update
  }

  startNewSession = (): void => {
    this.update(({ state }) => resetSession(state))

    setTimeout(() => {
      this.update(({ state }) => loadNewSession(state))
    }, 300)
  }

  setInputValue = (value: string): void => {
    this.update(({ state }) => setInputValue(state, value))
  }

  inputWhitespace = (): void => {
    this.update(({ state }) => inputWhitespace(state))
  }
}

export function inputWhitespace(state: State): void {
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
    generateResults(state)
    resetSession(state)
    loadNewSession(state)
  } else {
    // TODO: Skip over any whitespace nodes
    state.currentInput.tokenIndex = nextIndex
    state.currentInput.charIndex = 0
    state.currentInput.value = ''
    state.currentInput.isAccurate = true
  }
}

/**
 * Generates results.
 */

export function generateResults(state: State): void {
  const wpm = Math.round(60 + 30 * Math.random())
  const result: Result = { wpm, accuracy: 0.98 }
  state.results.push(result)
}

/**
 * Resets the current session.
 */

export function resetSession(state: State): void {
  state.session = { status: 'pending' }

  state.currentInput = {
    tokenIndex: 0,
    charIndex: 0,
    value: '',
    isAccurate: true,
    finishedTokens: [],
  }

  state.article.tokens = []
}

export function loadNewSession(state: State): void {
  state.session = { status: 'ready' }

  state.currentInput = {
    tokenIndex: 0,
    charIndex: 0,
    value: '',
    isAccurate: true,
    finishedTokens: [],
  }

  state.article.tokens = tokenize(
    generateEnglish(Math.round(Math.random() * 10))
  )
}

/**
 * Returns the current token.
 */

function getCurrentToken(state: State): Token {
  return state.article.tokens[state.currentInput.tokenIndex]
}

/**
 * Updates an input value.
 */

export function setInputValue(state: State, value: string) {
  const token = getCurrentToken(state)

  // Start if not started
  if (state.session.status === 'ready') {
    state.session = { status: 'ongoing', startedAt: new Date() }
  }

  if (token && token.value && token.value.substr(0, value.length) !== value) {
    state.currentInput.isAccurate = false
  } else {
    state.currentInput.isAccurate = true
  }

  state.currentInput.value = value
  state.currentInput.charIndex = value.length
}

export default Actions
