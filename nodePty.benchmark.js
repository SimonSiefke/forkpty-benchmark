const { spawn } = require('node-pty')
const { performance } = require('perf_hooks')

const terminators = ['$ ', '$ \x1B[0m']

;(async () => {
  for (let i = 0; i < 15; i++) {
    await new Promise((r) => {
      const s = performance.now()
      const term = spawn('bash', ['-i'], {})
      term.onData((data) => {
        console.log({ data: data.toString() })
        if (terminators.some((t) => data.toString().endsWith(t))) {
          const e2 = performance.now()
          console.log({ data: e2 - s })
          r()
        }
      })
    })
  }
  process.exit(0)
})()

setTimeout(() => {
  console.error('something went wrong')
  process.exit(1)
}, 15000)
