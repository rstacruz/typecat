import React from 'react'
import useStore, { TokenStatus } from '../../../store/useStore'
import CSS from './AddTooltip.module.css'
import cn from 'classnames'

function AddTooltip(props: {
  children: React.ReactNode
  finishedToken: TokenStatus
}) {
  const wpm = useWpm()
  if (!wpm) return <>{props.children}</>

  const { finishedToken } = props
  const isAccurate = finishedToken.mistakes === 0

  return (
    <span className={CSS.root}>
      <span className={CSS.tooltip}>
        <span className={cn(CSS.tooltipText, !isAccurate && CSS.isMistake)}>
          {wpm}
        </span>
      </span>
      <span className={CSS.token}>{props.children}</span>
    </span>
  )
}

function useWpm(): number | null {
  const { state } = useStore()
  const { interimResult } = state

  const isEnoughTime = interimResult && interimResult.durationMs > 2500
  if (!isEnoughTime) return null

  const wpm = interimResult ? Math.round(interimResult.wpm) : null
  return wpm
}

export default AddTooltip
