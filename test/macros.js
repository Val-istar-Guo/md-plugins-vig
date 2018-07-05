export const parse = (t, input, expected) => {
  t.is(t.context.parse(input).toHTML(), expected)
}

parse.title = (providedTitle, input, expected) => {
  if (providedTitle) return providedTitle
  else return `parse "${input}" to ${expected}`
}
