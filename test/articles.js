import fs from 'fs'
import { join, basename } from 'path'
import md from 'md-core'
import test from 'ava'
import { vigMdPlugins } from '../src'



test.before(t => {
  const parse = md()
    .use(vigMdPlugins())
    .parse

  const createPrivew = body => `<html><head><link rel="stylesheet" type="text/css" href='./style.css' /></head><body>${body}</body></html>`

  const articlePath = join(__dirname, 'articles')
  let fileNames = fs.readdirSync(articlePath).filter(fileName => !fileName.includes('.todo.'))
  const onlyFileNames = fileNames.filter(fileName => fileName.includes('.only.'))
  if (onlyFileNames.length) fileNames = onlyFileNames

  const files = fileNames.map(fileName => fs.readFileSync(join(articlePath, fileName), 'utf8'))

  fileNames = fileNames
    .map(fileName => `${basename(fileName, '.md')}.html`)
    .map(fileName => fileName.replace('.only.', '.'))

  fileNames
    .forEach((fileName, i) => {
      const astTree = parse(files[i])

      fs.writeFile(
        join(__dirname, 'preview', fileName),
        createPrivew(astTree.toHTML({ separator: '\n' })),
        err => err && console.log(err),
      )
    })

  const catalogue = fileNames
    .map(fileName => `<li><a href="./${fileName}">${fileName}</a></li>`)
    .join('')

  fs.writeFile(
    join(__dirname, 'preview', 'index.html'),
    createPrivew(catalogue),
    // `<html><body>${catalogue}</body></html>`,
    err => err && console.log(err),
  )

  t.context.parse = parse
  t.context.files = files
})

test('# articles', t => {
  t.context.files.map(file => {
    t.snapshot(t.context.parse(file).toHTML())
  })
})
