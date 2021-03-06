export default (schema, context, handlers, onUnknown) => {
  let output = line => {
    if (line.trim()) {
      onUnknown(context, line)
    }
  }
  Object
    .keys(schema)
    .forEach(schemaKey => {
      const schemaFragments = schema[schemaKey]
      const previousOutput = output
      if (Object.keys(handlers).includes(schemaKey)) {
        const handler = handlers[schemaKey]
        let pattern = `^`
        const remapping = [() => context]
        let matches = 1
        schemaFragments.forEach(fragment => {
          const key = Object.keys(fragment)[0]
          const value = fragment[key]
          const index = handler.fragments.indexOf(key)
          if (index == -1) {
            pattern += `(?:${value.regex})`
          } else {
            pattern += `(${value.regex})`
            const matchesCopy = matches
            const parse = value.parse
            remapping[index + 1] = match => parse(match[matchesCopy])
            matches++
          }
        })
        pattern += `$`
        const regex = new RegExp(pattern)
        const callback = handler.callback
        output = line => {
          const match = regex.exec(line)
          if (match) {
            callback.apply(null, remapping.map(mapper => mapper(match)))
          } else {
            previousOutput(line)
          }
        }
      } else {
        const regex = new RegExp(`^${schemaFragments.map(fragment => `(?:${fragment[Object.keys(fragment)[0]].regex})`).join(``)}$`)
        output = line => {
          if (!regex.test(line)) {
            previousOutput(line)
          }
        }
      }
    })
  return output
}
