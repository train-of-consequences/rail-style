import * as path from "path"
import * as fs from "fs"

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

      const forObject = object => {
        for (const key in object) {
          if (!/^@rail-style\/.*$/i.test(key)) {
            continue
          }

          object[key] = version
        }
      }

      forObject(json.dependencies)
      forObject(json.devDependencies)
      forObject(json.peerDependencies)

      fs.writeFile(path.join(`..`, `packages`, file, `package.json`), JSON.stringify(json, null, 2) + `\n`, error => {
        if (error) {
          throw error
        }
      })
    })
  }))
})
