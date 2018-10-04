# rail-style/fragments

Fragments which can be used to describe a fixed-width format.

| Export                            | Example        | Type                 | Value                     |
|-----------------------------------|----------------|----------------------|---------------------------|
| constantOptional("abc")           | `abc`          | String               | `abc`                     |
| constantOptional("abc")           | `   `          | null                 | null                      |
| constantRequired("abc")           | `abc`          | String               | `abc`                     |
| enumOptional("abc", "def", "ghi") | `def`          | String               | `def`                     |
| enumOptional("abc", "def", "ghi") | `   `          | null                 | null                      |
| enumRequired("abc", "def", "ghi") | `def`          | String               | `def`                     |
| stringOptional(4)                 | `abcd`         | String               | `abcd`                    |
| stringOptional(4)                 | `ab  `         | String               | `ab`                      |
| stringOptional(4)                 | `    `         | null                 | null                      |
| stringRequired(4)                 | `abcd`         | String               | `abcd`                    |
| stringRequired(4)                 | `ab  `         | String               | `ab`                      |
| unsignedOptional(4)               | `1234`         | Number               | 1234                      |
| unsignedOptional(4)               | `12  `         | Number               | 12                        |
| unsignedOptional(4)               | `    `         | null                 | null                      |
| unsignedRequired(4)               | `1234`         | Number               | 1234                      |
| unsignedRequired(4)               | `12  `         | Number               | 12                        |
| alphanumericOptional(4)           | `D4X8`         | String               | `D4X8`                    |
| alphanumericOptional(4)           | `    `         | null                 | null                      |
| alphanumericRequired(4)           | `D4X8`         | String               | `D4X8`                    |
| ddmmyyOptional                    | `251023`       | Moment.js (UK-local) | 2023-10-25T00:00:00+01:00 |
| -                                 | `      `       | null                 | null                      |
| ddmmyyRequired                    | `251023`       | Moment.js (UK-local) | 2023-10-25T00:00:00+01:00 |
| ddmmyyyyOptional                  | `25102023`     | Moment.js (UK-local) | 2023-10-25T00:00:00+01:00 |
| -                                 | `        `     | null                 | null                      |
| ddmmyyyyRequired                  | `25102023`     | Moment.js (UK-local) | 2023-10-25T00:00:00+01:00 |
| yymmddOptional                    | `231025`       | Moment.js (UK-local) | 2023-10-25T00:00:00+01:00 |
| -                                 | `      `       | null                 | null                      |
| yymmddRequired                    | `231025`       | Moment.js (UK-local) | 2023-10-25T00:00:00+01:00 |
| yyyymmddOptional                  | `20231025`     | Moment.js (UK-local) | 2023-10-25T00:00:00+01:00 |
| -                                 | `        `     | null                 | null                      |
| yyyymmddRequired                  | `20231025`     | Moment.js (UK-local) | 2023-10-25T00:00:00+01:00 |
| ddmmyyhhmmOptional                | `2510231637`   | Moment.js (UK-local) | 2023-10-25T16:37:00+01:00 |
| -                                 | `      `       | null                 | null                      |
| ddmmyyhhmmRequired                | `2510231637`   | Moment.js (UK-local) | 2023-10-25T16:37:00+01:00 |
| ddmmyyyyhhmmOptional              | `251020231637` | Moment.js (UK-local) | 2023-10-25T16:37:00+01:00 |
| -                                 | `        `     | null                 | null                      |
| ddmmyyyyhhmmRequired              | `251020231637` | Moment.js (UK-local) | 2023-10-25T16:37:00+01:00 |
| yymmddhhmmOptional                | `2310251637`   | Moment.js (UK-local) | 2023-10-25T16:37:00+01:00 |
| -                                 | `      `       | null                 | null                      |
| yymmddhhmmRequired                | `2310251637`   | Moment.js (UK-local) | 2023-10-25T16:37:00+01:00 |
| yyyymmddhhmmOptional              | `202310251637` | Moment.js (UK-local) | 2023-10-25T16:37:00+01:00 |
| -                                 | `        `     | null                 | null                      |
| yyyymmddhhmmRequired              | `202310251637` | Moment.js (UK-local) | 2023-10-25T16:37:00+01:00 |
