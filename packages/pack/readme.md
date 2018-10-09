# rail-style/pack

A set of helper functions which pack common rail data formats into unsigned
integer formats which are compact and easily persisted in binary files.

A zero value can be taken to mean "null".

| Function | Limit          | Bits required |
|----------|----------------|---------------|
| tiploc   | 10,460,353,204 | 34            |
| crs      | 46,657         | 16            |
| trainUid | 2,600,001      | 22            |
