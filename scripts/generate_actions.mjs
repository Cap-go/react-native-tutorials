import { spawnSync } from 'child_process'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import search from 'libnpmsearch'
import { join } from 'path'
import { exit } from 'process'
import { actions as existingActions } from './action.mjs'

const searchKeywords = ['react-native', 'plugin']
const PAGE_SIZE = 100
const MAX_RESULTS = 1000

async function fetchPackages() {
  let count = 0
  let totalLimit = MAX_RESULTS
  try {
    if (!isNaN(parseInt(process.argv[2]))) totalLimit = Math.min(parseInt(process.argv[2]), MAX_RESULTS)
  } catch (e) {
    totalLimit = MAX_RESULTS
  }
  try {
    const resultArray = []
    const numPages = Math.ceil(totalLimit / PAGE_SIZE)
    for (let page = 0; page < numPages; page++) {
      const packageData = await search(searchKeywords.join(' '), {
        limit: PAGE_SIZE,
        from: page * PAGE_SIZE,
      })
      if (!packageData.length) break
      const packagesWithKeywords = packageData.filter((pkg) => {
        const packageKeywords = pkg.keywords || []
        return searchKeywords.every((keyword) => packageKeywords.includes(keyword))
      })
      const newPackages = packagesWithKeywords.filter((pkg) => !existingActions.some((existing) => existing.name === pkg.name))
      resultArray.push(
        ...newPackages.map((pkg) => ({
          name: pkg.name,
          href: pkg.links?.repository || '',
          title: pkg.name.split('/').pop(),
          description: pkg.description || '',
          author: pkg.maintainers?.[0]?.username || '',
        })),
      )
      count += newPackages.length
      if (resultArray.length >= totalLimit) {
        resultArray.length = totalLimit
        break
      }
    }
    const combinedActions = [...existingActions, ...resultArray]
    console.table({
      'Existing Packages': existingActions.length,
      'New Packages': resultArray.length,
      'Total Packages': combinedActions.length,
    })
    console.log(`Writing to scripts/action.mjs...`)
    if (!existsSync(join(process.cwd(), 'scripts'))) mkdirSync(join(process.cwd(), 'scripts'))
    writeFileSync(join(process.cwd(), 'scripts', 'action.mjs'), `export const actions = [${combinedActions.map((i) => JSON.stringify(i))}]`)
    console.log(`Writing to src/config/plugins.ts...`)
    if (!existsSync(join(process.cwd(), 'src', 'config'))) {
      mkdirSync(join(process.cwd(), 'src'))
      mkdirSync(join(process.cwd(), 'src', 'config'))
    }
    writeFileSync(
      join(process.cwd(), 'src', 'config', 'plugins.ts'),
      `export interface Action {
        icon?: any
        href: string
        title: string
        name?: string
        author: string
        description: string
        iconForeground?: string
        iconBackground?: string
      }
      export interface Plugin extends Action {
        npmDownloads?: number
        githubStars?: number
        readme?: string
        datePublished?: string
        dateModified?: string
        tutorial?: string
      }
      export const actions = [${combinedActions.map((i) => JSON.stringify(i))}]`,
    )
    console.log(`Running prettier...`)
    spawnSync('pnpm', ['fmt'])
    console.log(`Done!`)
    exit()
  } catch (error) {
    console.error(error)
  }
}

fetchPackages()
