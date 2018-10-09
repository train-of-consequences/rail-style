import * as https from "https"
import * as fs from "fs"

console.log(`Downloading...`)
https.get(`https://www.gov.uk/bank-holidays.json`, response => {
  if (response.statusCode != 200) {
    throw new Error(`HTTP ${response.statusCode} - ${response.statusMessage}`)
  }
  let body = ``
  response.on(`data`, chunk => body += chunk)
  response.on(`end`, () => {
    console.log(`Writing...`)
    fs.writeFile(`index.json`, body, error => {
      if (error) {
        throw error
      }
    })
  })
}).on(`error`, error => { throw error })
