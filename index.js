const yaml = require("js-yaml")
const jref = require("json-ref-lite")
const fs = require("fs")

function preprocessTree(tree) {
  // Make sure all schema items have their key inside them
  if (tree.components && tree.components.schemas) {
    Object.keys(tree.components.schemas).forEach(key => {
      const obj = tree.components.schemas[key]

      obj.key = key
    })
  }

  return tree
}

async function main() {
  const tree = jref.resolve(preprocessTree(yaml.safeLoad(fs.readFileSync("./bahkat-openapi.yaml", "utf8"))))
  console.dir(tree.paths['/index.json']
    .get.responses[200]
    .content['application/json'].schema)
  
}

main()
  .then(() => process.exit())
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })