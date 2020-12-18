const { spawn } = require('node-pty')
const { performance } = require('perf_hooks')

;(async () => {
  for (let i = 0; i < 15; i++) {
    await new Promise((r) => {
      const s = performance.now()
      const term = spawn('bash', ['-i'], {})
      let j = 0
      term.onData((data) => {
        console.log({ data: data.toString() })
        if (++j === 2) {
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
