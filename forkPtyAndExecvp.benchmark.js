const { forkPtyAndExecvp } = require('fork-pty')
const { ReadStream } = require('tty')
const { performance } = require('perf_hooks')

;(async () => {
  let total = 0
  for (let i = 0; i < 30; i++) {
    const s = performance.now()
    await new Promise((r) => {
      const fd = forkPtyAndExecvp('ls', ['-l'])
      const readStream = new ReadStream(fd)
      readStream.on('data', (data) => {
        const e = performance.now()
        total += e - s
        readStream.destroy()
        r()
      })
    })
  }
  console.log({ average: total / 30 })
  process.exit(0)
})()

setTimeout(() => {
  console.error('something went wrong')
  process.exit(1)
}, 15000)
