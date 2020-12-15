const { spawn } = require('node-pty')
const { performance } = require('perf_hooks')

for (let i = 0; i < 5; i++) {
  const s = performance.now()
  const term = spawn('/bin/bash', ['-i'])
  const e = performance.now()
  console.log({ spawn: e - s })

  term.onData((data) => {
    if (data.toString().startsWith('\x1B')) {
      const e2 = performance.now()
      console.log({ data: e2 - s })
    }
    console.log({ data: data.toString() })
  })
}

setTimeout(() => {
  process.exit(0)
}, 15000)
