const { forkPty } = require('fork-pty')
const { ReadStream } = require('tty')
const { performance } = require('perf_hooks')

for (let i = 0; i < 5; i++) {
  const s = performance.now()
  const fd = forkPty()
  const e = performance.now()
  console.log({ spawn: e - s })

  const readStream = new ReadStream(fd)
  readStream.on('data', (data) => {
    if (data.startsWith('\\x1B')) {
      const e2 = performance.now()
      console.log({ data: e2 - s })
    }
    console.log({ data: data.toString() })
  })
}

setTimeout(() => {
  process.exit(0)
}, 15000)
