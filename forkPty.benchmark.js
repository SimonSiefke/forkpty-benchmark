const { forkPtyAndExeclp } = require('fork-pty')
const { ReadStream } = require('tty')
const { performance } = require('perf_hooks')

;(async () => {
  for (let i = 0; i < 15; i++) {
    await new Promise((r) => {
      const s = performance.now()
      const fd = forkPtyAndExeclp('bash', '-i')
      let j = 0
      const readStream = new ReadStream(fd)
      readStream.on('data', (data) => {
        console.log({ data: data.toString() })
        if (++j == 2) {
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
