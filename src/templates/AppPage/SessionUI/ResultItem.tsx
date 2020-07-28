import React from 'react'
import { Result } from '../../../store/useStore'
import CSS from './ResultItem.module.css'
import cn from 'classnames'

export function ResultItem(props: { result: Result; latest?: boolean }) {
  const { result } = props
  const accuracy =
    result.accuracy === 1
      ? 100
      : Math.min(Math.round(result.accuracy * 100), 99)

  const wpm = Math.round(result.wpm)

  return (
    <div className={cn(CSS.root, { [CSS.isLatest]: props.latest })}>
      <span className={CSS.badge}>
        <span className={CSS.wpm}>{wpm}</span>{' '}
        <span className={CSS.label}>WPM</span>
      </span>

      <span
        className={CSS.accuracy}
        title={
          result.mistakeCount === 0
            ? 'Perfect accuracy'
            : `${result.mistakeCount} characters mistyped`
        }
      >
        {accuracy}% ACC
      </span>
    </div>
  )
}
