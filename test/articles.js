import fs from 'fs'
import { join, basename } from 'path'
import md from 'md-core'
import test from 'ava'
import { vigMdPlugins } from '../src'



test.before(t => {
  const parse = md()
    .use(vigMdPlugins())
    .parse

  const createPrivew = body => `<html><body>${body}</body></html>`

  const articlePath = join(__dirname, 'articles')
  const fileNames = fs.readdirSync(articlePath).filter(fileName => !fileName.includes('todo'))
  const files = fileNames.map(fileName => fs.readFileSync(join(articlePath, fileName), 'utf8'))

  fileNames
    .map(fileName => `${basename(fileName, '.md')}.html`)
    .forEach((fileName, i) => {
      const astTree = parse(files[i])
      console.log('astTree')
      console.log(astTree)

      fs.writeFile(
        join(__dirname, 'preview', fileName),
        createPrivew(astTree.toHTML({ separator: '\n' })),
        err => console.log(err),
      )
    })

  fileNames.map((fileName, i) => {
    console.log('fileName => ', fileName)
    console.log(parse(files[i]).toHTML())
  })

  t.context.parse = parse
  t.context.files = files
})

test('# articles', t => {
  t.context.files.map(file => {
    t.snapshot(t.context.parse(file).toHTML())
  })
})
