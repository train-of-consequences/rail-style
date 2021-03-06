import * as path from "path"
import * as fs from "fs"
import * as childProcess from "child_process"

let version

fs.readdir(path.join(`..`, `packages`), (error, files) => {
  if (error) {
    throw error
  }

  files.forEach(file => fs.stat(path.join(`..`, `packages`, file), (error, stats) => {
    if (error) {
      throw error
    }

    if (!stats.isDirectory()) {
      return
    }

    fs.readFile(path.join(`..`, `packages`, file, `package.json`), { encoding: `utf8` }, (error, data) => {
      if (error) {
        throw error
      }

      const json = JSON.parse(data)

      if (!version) {
        const fragments = json.version.split(`.`)
        fragments[fragments.length - 1] = (parseInt(fragments[fragments.length - 1]) + 1).toString()
        version = fragments.join(`.`)
      }

      json.version = version

      fs.writeFile(path.join(`..`, `packages`, file, `package.json`), JSON.stringify(json, null, 2) + `\n`, error => {
        if (error) {
          throw error
        }
        childProcess.exec(`cd ${path.join(`..`, `packages`, file)} && npm install`, (error, stdout, stderr) => {
          if (error) {
            throw `${error} - ${stderr}`
          }
        })
      })
    })
  }))
})
