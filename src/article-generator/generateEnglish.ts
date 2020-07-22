function generateEnglish({ wordCount }: { wordCount: number }) {
  const offset = Math.round(Math.random() * 20)

  const words = `before early if up present right very from these however both of look also new can off head few no show good should move right seem school play he many each there each here plan under another go great because order over old end be keep in know become early before early if up present right very from these however both of look also new can off head few no show good should move right seem school play he many each there each here plan under another go great because order over old end be keep in know become early`.split(
    ' '
  )

  return words.slice(offset, offset + wordCount).join(' ')
}

export { generateEnglish }
