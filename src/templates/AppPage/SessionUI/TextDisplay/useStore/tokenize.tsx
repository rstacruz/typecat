function tokenize(input: string) {
  return input.split(/(\s+)/).map((value, index) => {
    if (index % 2 === 0) {
      return { type: 'text', value }
    } else {
      return { type: 'whitespace', value }
    }
  })
}

export default tokenize
