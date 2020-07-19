import CSS from './MockWord.module.css'

export function MockWord(props: { length: number; index: number }) {
  const width = `${1 * props.length}em`
  const animationDelay = `${15 * props.index}ms`

  return <span className={CSS.root} style={{ width, animationDelay }} />
}

export default MockWord
