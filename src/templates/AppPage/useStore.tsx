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
      currentToken: 0
    }
    session: { startedAt: Date | null }
    input: { value: string }
  }
  actions: {
    setInputValue: (value: string) => void
  }
}

const [useStore] = create<Store>((set) => {
  const update = (fn: (store: Store) => any) => set(produce(fn))
  const state: Store['state'] = {
    article: {
      tokens: [
        { type: 'text', value: 'hello' },
        { type: 'whitespace', value: ' ' },
        { type: 'text', value: 'there,' },
        { type: 'whitespace', value: ' ' },
        { type: 'text', value: 'world' },
      ],
      currentToken: 0,
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

        state.input.value = value
      })
    },
  }

  return { state, actions }
})

export default useStore
