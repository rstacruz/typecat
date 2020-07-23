import { renderHook, HookResult } from '@testing-library/react-hooks'
import { createStore, Store } from './../useStore'

export function setupStoreTest() {
  let result: HookResult<Store>

  beforeEach(() => {
    const [useStore] = createStore()
    result = renderHook(() => useStore()).result
  })

  const actions = () => result.current.actions
  const state = () => result.current.state
  const getResult = () => result

  return { state, actions, result: getResult }
}
