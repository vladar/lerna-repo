const path = require(`path`)
const fs = require(`fs`)
const childProcess = require(`child_process`)
const execa = require(`execa`)

function toPackageName(path) {
  const parts = path.split(/[\\/]/)
  return parts[parts.length - 1] === `package.json` && parts[parts.length - 3] === `packages`
    ? parts[parts.length - 2]
    : undefined
}

async function run() {
  const { stdout } = await execa("git", ["ls-files", "-m"])
  // 88cc97089cbabb0edce0383fe6132ef79aaeaa69

  const changedPackages = String(stdout)
    .split(`\n`)
    .map(toPackageName)
    .filter(Boolean)

  if (!changedPackages.length) {

  }

  console.log(`Changed packages: `, changedPackages)

  for (const packageName of changedPackages) {
    const changelogPath = path.join(process.cwd(), `packages`, packageName, `CHANGELOG.md`)
    const content = fs.readFileSync(changelogPath)
    fs.writeFileSync(changelogPath, `lalala` + String(content))
  }




  await execa("git", ["add", changelogPath]);
}

run().catch(console.error)
