const { spawn } = require('node-pty')
const { performance } = require('perf_hooks')

;(async () => {
  let total = 0
  for (let i = 0; i < 100; i++) {
    const s = performance.now()
    await new Promise((r) => {
      const term = spawn('ls', ['-l'], {})
      term.onData((data) => {
        const e = performance.now()
        total += e - s
        term.kill()
        r()
      })
    })
  }
  console.log({ average: total / 100 })
  process.exit(0)
})()

setTimeout(() => {
  console.error('something went wrong')
  process.exit(1)
}, 15000)
