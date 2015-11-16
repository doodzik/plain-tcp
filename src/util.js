import assert from 'assert'

export function onerror (err) {
  console.log(err)
  assert(err instanceof Error, `non-error thrown: ${err}`)

  if (this.silent) return

  const msg = err.stack || err.toString()
  console.error()
  console.error(msg.replace(/^/gm, '  '))
  console.error()
}

