# rail-style/fragments

Fragments which can be used to describe a fixed-width format.

| Export                                         | Example        | Type                 | Value                     |
|------------------------------------------------|----------------|----------------------|---------------------------|
| constantOptional("abc")                        | `abc`          | String               | `abc`                     |
| -                                              | `   `          | null                 | null                      |
| constantRequired("abc")                        | `abc`          | String               | `abc`                     |
| enumOptional({ abc: 123, def: 456, ghi: 789 }) | `def`          | Any                  | 456                       |
| -                                              | `   `          | null                 | null                      |
| enumRequired({ abc: 123, def: 456, ghi: 789 }) | `def`          | Any                  | 456                       |
| flags(4, { a: 1, b: 2, c: 3, d: 4 })           | `cb  `         | Array of Any         | [3, 2]                    |
| -                                              | `    `         | Array of Any         | []                        |
| stringOptional(4)                              | `abcd`         | String               | `abcd`                    |
| -                                              | `ab  `         | String               | `ab`                      |
| -                                              | `    `         | null                 | null                      |
| stringRequired(4)                              | `abcd`         | String               | `abcd`                    |
| -                                              | `ab  `         | String               | `ab`                      |
| unsignedOptional(4)                            | `1234`         | Number               | 1234                      |
| -                                              | `12  `         | Number               | 12                        |
| -                                              | `  12`         | Number               | 12                        |
| -                                              | `    `         | null                 | null                      |
| unsignedRequired(4)                            | `1234`         | Number               | 1234                      |
| -                                              | `12  `         | Number               | 12                        |
| -                                              | `  12`         | Number               | 12                        |
| alphanumericOptional(4)                        | `D4X8`         | String               | `D4X8`                    |
| -                                              | `    `         | null                 | null                      |
| alphanumericRequired(4)                        | `D4X8`         | String               | `D4X8`                    |
| ddmmyyOptional                                 | `251023`       | Moment.js (UK-local) | 2023-10-25T00:00:00+01:00 |
| -                                              | `      `       | null                 | null                      |
| ddmmyyRequired                                 | `251023`       | Moment.js (UK-local) | 2023-10-25T00:00:00+01:00 |
| ddmmyyyyOptional                               | `25102023`     | Moment.js (UK-local) | 2023-10-25T00:00:00+01:00 |
| -                                              | `        `     | null                 | null                      |
| ddmmyyyyRequired                               | `25102023`     | Moment.js (UK-local) | 2023-10-25T00:00:00+01:00 |
| yymmddOptional                                 | `231025`       | Moment.js (UK-local) | 2023-10-25T00:00:00+01:00 |
| -                                              | `      `       | null                 | null                      |
| yymmddRequired                                 | `231025`       | Moment.js (UK-local) | 2023-10-25T00:00:00+01:00 |
| yyyymmddOptional                               | `20231025`     | Moment.js (UK-local) | 2023-10-25T00:00:00+01:00 |
| -                                              | `        `     | null                 | null                      |
| yyyymmddRequired                               | `20231025`     | Moment.js (UK-local) | 2023-10-25T00:00:00+01:00 |
| ddmmyyhhmmOptional                             | `2510231637`   | Moment.js (UK-local) | 2023-10-25T16:37:00+01:00 |
| -                                              | `          `   | null                 | null                      |
| ddmmyyhhmmRequired                             | `2510231637`   | Moment.js (UK-local) | 2023-10-25T16:37:00+01:00 |
| ddmmyyyyhhmmOptional                           | `251020231637` | Moment.js (UK-local) | 2023-10-25T16:37:00+01:00 |
| -                                              | `            ` | null                 | null                      |
| ddmmyyyyhhmmRequired                           | `251020231637` | Moment.js (UK-local) | 2023-10-25T16:37:00+01:00 |
| yymmddhhmmOptional                             | `2310251637`   | Moment.js (UK-local) | 2023-10-25T16:37:00+01:00 |
| -                                              | `          `   | null                 | null                      |
| yymmddhhmmRequired                             | `2310251637`   | Moment.js (UK-local) | 2023-10-25T16:37:00+01:00 |
| yyyymmddhhmmOptional                           | `202310251637` | Moment.js (UK-local) | 2023-10-25T16:37:00+01:00 |
| -                                              | `            ` | null                 | null                      |
| yyyymmddhhmmRequired                           | `202310251637` | Moment.js (UK-local) | 2023-10-25T16:37:00+01:00 |
| hhmmOptional                                   | `1637`         | Moment.js (UK-local) | 0001-01-01T16:37:00+01:00 |
| -                                              | `    `         | null                 | null                      |
| hhmmRequired                                   | `1637`         | Moment.js (UK-local) | 0001-01-01T16:37:00+01:00 |
| hhmmhOptional                                  | `1637 `        | Moment.js (UK-local) | 0001-01-01T16:37:00+01:00 |
| -                                              | `1637H`        | Moment.js (UK-local) | 0001-01-01T16:37:30+01:00 |
| -                                              | `     `        | null                 | null                      |
| hhmmhRequired                                  | `1637 `        | Moment.js (UK-local) | 0001-01-01T16:37:00+01:00 |
| -                                              | `1637H`        | Moment.js (UK-local) | 0001-01-01T16:37:30+01:00 |
| dayFlags                                       | 0000000        | Array of String      | []                        |
| -                                              | 1000000        | Array of String      | [`monday`]                |
| -                                              | 0100000        | Array of String      | [`tuesday`]               |
| -                                              | 0010000        | Array of String      | [`wednesday`]             |
| -                                              | 0001000        | Array of String      | [`thursday`]              |
| -                                              | 0000100        | Array of String      | [`friday`]                |
| -                                              | 0000010        | Array of String      | [`saturday`]              |
| -                                              | 0000001        | Array of String      | [`sunday`]                |
