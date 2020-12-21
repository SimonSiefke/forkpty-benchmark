const { spawn } = require('node-pty')
const { performance } = require('perf_hooks')

const RUNS = 15

;(async () => {
  let total = 0
  for (let i = 0; i < RUNS; i++) {
    const s = performance.now()
    await new Promise((r) => {
      const term = spawn('bash', ['-i'])
      term.write('ls -lR .\n')
      term.onData((data) => {
        if (data.toString().includes('node-pty.d.ts')) {
          const e = performance.now()
          const time = e - s
          console.log({ time })
          total += time
          r()
        }
      })
    })
  }
  console.log({ average: total / RUNS })
  process.exit(0)
})()

setTimeout(() => {
  console.error('something went wrong')
  process.exit(1)
}, 15000)
