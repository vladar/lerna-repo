const path = require(`path`)
const fs = require(`fs`)
const execa = require(`execa`)

function toPackageName(path) {
  const parts = path.split(/[\\/]/)
  return parts[parts.length - 1] === `package.json` && parts[parts.length - 3] === `packages`
    ? parts[parts.length - 2]
    : undefined
}

function resolvePackageVersion(packageName) {
  const changelogPath = path.join(`packages`, packageName, `package.json`)
  return JSON.parse(fs.readFileSync(changelogPath)).version
}

async function run() {
  const { stdout } = await execa("git", ["ls-files", "-m"])
  // 88cc97089cbabb0edce0383fe6132ef79aaeaa69

  const packages = String(stdout)
    .split(`\n`)
    .map(toPackageName)
    .filter(Boolean)
    .map(pkg => [pkg, resolvePackageVersion(pkg)])

  for (const [packageName, version] of packages) {
    const changelogPath = path.join(process.cwd(), `packages`, packageName, `CHANGELOG.md`)
    const content = fs.readFileSync(changelogPath)
    fs.writeFileSync(changelogPath, `${packageName}: ${version}\n\n` + String(content))
    await execa("git", ["add", changelogPath]);
  }
}

run().catch(console.error)
