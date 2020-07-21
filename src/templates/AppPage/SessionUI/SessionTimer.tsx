import React from 'react'

function SessionTimer(props: { startedAt: Date | null }) {
  const { startedAt } = props
  const [now, setNow] = React.useState<Date>(new Date())

  if (!startedAt) return null

  React.useEffect(() => {
    let timerId: number

    function tick() {
      requestAnimationFrame(() => {
        setNow(new Date())
        timerId = window.setTimeout(tick, 1000)
      })
    }

    tick()

    return () => {
      if (timerId) window.clearTimeout(timerId)
    }
  }, [startedAt])

  const delta = Math.floor((+now - +startedAt) / 1000)
  return <span>{formatSeconds(delta)}</span>
}

/**
 * Formats seconds
 * @example
 *     formatSeconds(62) // => '1m 2s'
 */

function formatSeconds(delta: number) {
  if (delta < 60) return `${delta}s`

  let secs = delta
  let mins = Math.floor(secs / 60)
  secs -= mins * 60
  return `${mins}m ${secs}s`
}

export default SessionTimer
