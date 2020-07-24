import useStore, { State } from '../../../store/useStore'

function ProgressIndicator() {
  const { state } = useStore()
  if (state.session.status !== 'ongoing') return null

  const { percent } = getProgressStats(state)

  return <div>{Math.round(percent)}%</div>
}

function getProgressStats(state: State) {
  const done = state.currentInput.finishedTokens.length
  const total = state.article.tokens.length
  const percent = done / total

  return { done, total, percent }
}

export { ProgressIndicator }
