const yaml = require("js-yaml")
const jref = require("json-ref-lite")
const fs = require("fs")

async function main() {
  const tree = jref.resolve(yaml.safeLoad(fs.readFileSync("./bahkat-openapi.yaml", "utf8")))
  console.dir(tree.paths['/index.json'].get.responses[200].content['application/json'].schema)
}

main()
  .then(() => process.exit())
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })