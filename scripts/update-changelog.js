const path = require(`path`)
const fs = require(`fs`)

const changelogPath = path.join(process.cwd(), `packages`, `my-test-package2`, `CHANGELOG.md`)
const content = fs.readFileSync(changelogPath)
fs.writeFileSync(changelogPath, `lalala` + String(content))
