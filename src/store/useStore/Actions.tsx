import { State, Token, Article, Store } from '../useStore'
import { fetchArticles } from './fetchArticles'
import { buildResult } from './buildResult'
import produce from 'immer'
import { PartialState } from 'zustand'

class Actions {
  set: (state: PartialState<Store>) => void
  get: () => Store

  constructor(set: (state: PartialState<Store>) => void, get: () => Store) {
    this.set = set
    this.get = get
  }

  update = (fn: (store: Store) => any): void => {
    return this.set(produce(fn))
  }

  startNewSession = (): void => {
    this.update(({ state }) => {
      // Clear the session and start over.
      resetSession(state)

      // If there is a queued article, load it in.
      popArticleQueue(state)

      // Replenish the queue by fetching remotely.
      const needed = 2 - state.articleQueue.length
      fetchArticles(needed).then((articles) => {
        this.receiveArticles(articles)
      })
    })
  }

  receiveArticles = (articles: Article[]) => {
    this.update(({ state }) => {
      if (hasArticle(state)) {
        // There's already an article loaded, so just queue the rest up
        state.articleQueue = articles
      } else {
        // Its waiting for an article, so load it
        const [article, ...tail] = articles
        state.articleQueue = tail
        loadArticle(state, article)
      }
    })
  }

  setInputValue = (value: string): void => {
    this.update(({ state }) => setInputValue(state, value))
  }

  inputWhitespace = (): void => {
    let action: ReturnType<typeof inputWhitespace>

    this.update(({ state }) => {
      action = inputWhitespace(state)
    })

    if (action?.done) {
      this.update(({ state }) => generateResults(state))
      this.startNewSession()
    }
  }
}

/**
 * Inputs a whitespace; check if done afterwards
 */

export function inputWhitespace(state: State): { done: true } | undefined {
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

  // TODO: Skip over any whitespace nodes
  const nextIndex = state.currentInput.tokenIndex + 2

  // Check if done.
  if (nextIndex > state.article.tokens.length) {
    return { done: true }
  } else {
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
  const result = buildResult()
  state.results.push(result)
}

/**
 * Resets the current session to the 'pending' state.
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

  if (token?.value?.substr(0, value.length) !== value) {
    state.currentInput.isAccurate = false
  } else {
    state.currentInput.isAccurate = true
  }

  state.currentInput.value = value
  state.currentInput.charIndex = value.length
}

/**
 * Pick an article from the queue, if there are any queued.
 */

export function popArticleQueue(state: State): void {
  // Only work in pending mode, and if there's an article queued up.
  if (!state.articleQueue.length) return
  if (state.session.status !== 'pending') return

  // Get the first article in the queue and promote it as the next one
  const article = state.articleQueue.shift()
  loadArticle(state, article)
}

/**
 * Load an article as the current one
 */

function loadArticle(state: State, article: Article): void {
  resetSession(state)
  state.session = { status: 'ready' }
  state.article = article
}

function hasArticle(state: State): boolean {
  return Boolean(state.article?.tokens?.length)
}

export default Actions