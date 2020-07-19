function generateEnglish(offset: number = 0) {
  const words = `before early if up present right very from these however both of look also new can off head few no show good should move right seem school play he many each there each here plan under another go great because order over old end be keep in know become early before early if up present right very from these however both of look also new can off head few no show good should move right seem school play he many each there each here plan under another go great because order over old end be keep in know become early`.split(
    ' '
  )

  const count = 20

  return words.slice(offset, offset + count).join(' ')
}

export default generateEnglish

/* const STRING = `import React from 'react'; */

/* function SpanComponent(props: { */
/*   children?: React.ReactNode */
/* }) { */
/*   return <span>{props.children || null}</span>; */
/* }` */

