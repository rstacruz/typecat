import MockWord from './MockTextDisplay/MockWord'
import CSS from './MockTextDisplay/MockTextDisplay.module.css'

function MockTextDisplay() {
  const segment = [5, 2, 3, 5, 1, 8, 2, 5, 2, 1]
  const lengths = [...segment, ...segment, ...segment]

  return (
    <div className={CSS.root}>
      {lengths.map((length, index) => (
        <MockWord key={index} {...{ length, index }} />
      ))}
    </div>
  )
}

export default MockTextDisplay
