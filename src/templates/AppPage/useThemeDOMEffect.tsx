import React from 'react'
import useStore from '../../store/useStore'

export function useThemeDOMEffect() {
  const { state } = useStore()

  React.useEffect(() => {
    if (state.preferences.themeStyle === 'night') {
      document.documentElement.classList.add('theme-night')
    } else {
      document.documentElement.classList.remove('theme-night')
    }
  }, [state.preferences.themeStyle])
}
