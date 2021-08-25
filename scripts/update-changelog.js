const path = require(`path`)
const fs = require(`fs`)
const childProcess = require(`child_process`)
const execa = require(`execa`)

async function run() {
  const { stdout } = await execa("git", ["ls-files", "-m"])
  console.log(`Changed files: `, String(stdout))

  const changelogPath = path.join(process.cwd(), `packages`, `my-test-package2`, `CHANGELOG.md`)
  const content = fs.readFileSync(changelogPath)
  fs.writeFileSync(changelogPath, `lalala` + String(content))

  await execa("git", ["add", changelogPath]);
}

run().catch(console.error)
