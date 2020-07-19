import MockWord from './MockWord'
import CSS from './MockTextDisplay.module.css'

function MockTextDisplay() {
  const lengths = [5, 2, 3, 5, 1, 8, 2, 5, 5, 2, 3, 1]
  return (
    <div className={CSS.root}>
      {lengths.map((length, index) => (
        <MockWord key={index} {...{ length, index }} />
      ))}
    </div>
  )
}

export default MockTextDisplay
