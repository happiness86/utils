import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { defineBuildConfig } from 'unbuild'

function getEntries(): string[] {
  const files = fs.readdirSync('./src', { encoding: 'utf8' })

  const result = files.map((item) => {
    return path.resolve(process.cwd(), './src', item)
  })
  return result
}

export default defineBuildConfig({
  entries: [
    './src/index',
    ...getEntries(),
  ],
  outDir: 'dist',
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
    output: {
      dir: 'dist',
    },
  },
})
