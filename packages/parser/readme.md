# rail-style/parser

"SAX-like" streaming parsing of fixed-width text files.

It uses a schema created by chaining
[fragments](https://www.npmjs.com/package/@rail-style/fragments), which can then
be assigned callbacks which are executed when those chains are matched.

Handling of lines/fragments is opt-in, and lines/fragments which are part of the
schema but have no handler will be ignored.

```js
import * as fragments from "@rail-style/fragments"
import parser from "@rail-style/parser"

const schema = {
  ignoredLineA: [
    { header: fragments.constantRequired(`IGNORED A`) },
    { space: fragments.stringOptional(11) }
  ],
  stringLine: [
    { header: fragments.constantRequired(`STRING: `) },
    { string: fragments.stringRequired(12) }
  ],
  ignoredLineB: [
    { header: fragments.constantRequired(`IGNORED B`) },
    { space: fragments.stringOptional(11) }
  ],
  complexLine: [
    { header: fragments.constantRequired(`COMPLEX: `) },
    { ignoredA: fragments.unsignedRequired(3) },
    { usedA: fragments.unsignedRequired(3) },
    { ignoredB: fragments.unsignedRequired(3) },
    { usedB: fragments.unsignedRequired(2) },
  ]
}

const handlers = {
  stringLine: {
    fragments: [`string`],
    callback: (context, string) => console.log(`Found string with context ${context}: ${string}`)
  },
  complexLine: {
    fragments: [`usedA`, `usedB`],
    callback: (context, usedA, usedB) => console.log(`Found complex with context ${context}: ${usedA} ${usedB}`)
  }
}

const instance = parser(
  schema,
  `Example Context`,
  handlers,
  (context, line) => console.log(`Found unknown with context ${context}: ${line}`)
)

instance(`STRING: Hello, world`)
instance(`UNKNOWN A           `)
instance(``)
instance(`IGNORED A W/ PADDING`)
instance(`                    `)
instance(`COMPLEX: 12345678901`)
instance(`UNKNOWN B           `)
instance(`IGNORED B W/ PADDING`)
```

```
Found string with context Example Context: Hello, world
Found unknown with context Example Context: UNKNOWN A
Found complex with context Example Context: 456 01
Found unknown with context Example Context: UNKNOWN B
```
