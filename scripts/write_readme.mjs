import '@dotenvx/dotenvx/config'
import { Octokit } from '@octokit/rest'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { actions } from './action.mjs'

const auth = process.env.PERSONAL_ACCESS_TOKEN
if (!auth) throw new Error(`process.env.PERSONAL_ACCESS_TOKEN not found.`)

const appDir = process.cwd()
const octokit = new Octokit({ auth })

let readmeCodes = {}
let readmeFailed = 0

async function fetchReadme(owner, repo) {
  try {
    const response = await octokit.repos.getReadme({
      owner,
      repo,
      mediaType: {
        format: 'raw',
      },
    })
    return response.data
  } catch (error) {
    readmeFailed += 1
    if (error.status) {
      readmeCodes[error.status] = readmeCodes[error.status] ? readmeCodes[error.status] + 1 : 1
    } else {
      console.error(`Error fetching ${owner}/${repo}: ${error.message}`)
    }
  }
}

async function loadREADMEs(list) {
  try {
    const executeAsyncOperation = (element) => {
      return new Promise(async (resolve) => {
        try {
          const contentDir = join(appDir, 'openai-readmes')
          if (!existsSync(contentDir)) mkdirSync(contentDir)
          const filePath = join(contentDir, `${element[3]}_${element[4]}.md`)
          if (!existsSync(filePath)) {
            const data = await fetchReadme(element[3], element[4].replace('.git', ''))
            if (data) writeFileSync(filePath, data)
          }
        } catch (e) {
          console.log(e)
          console.log('Failed to fetch:', element)
        } finally {
          resolve()
        }
      })
    }
    await Promise.all(list.map((element) => executeAsyncOperation(element)))
    console.log('Total readme', list.length)
    console.log('Failed readme', readmeFailed)
    console.log(readmeCodes)
  } catch (error) {
    console.log(error.message || error.toString())
  }
}

// Parse command-line arguments for start and end limits
const startLimit = parseInt(process.argv[2]) || 0
const endLimit = parseInt(process.argv[3]) || actions.length

loadREADMEs(
  actions
    .slice(startLimit, endLimit)
    .filter((i) => i.href.length > 0)
    .map((i) => i.href.split('/')),
)
