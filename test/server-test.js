import assert from 'assert'
import net    from 'net'
import Server from '../src/server'

describe('Server', () => {
  it('receives messenges', done => {
    new Server(5442)
    .map(data => { 
      assert(data === 'hello world')
      done()
    })
    .subscribe()

    var client = new net.Socket();
    client.connect(5442, '127.0.0.1', () => client.write('hello world'))
  })

  it('response with return value', done => {
    new Server(5443)
    .map(data => 'data')
    .subscribe()

    var client = new net.Socket();
    client.connect(5443, '127.0.0.1', () => client.write('foo'))
    client.on('data', data => {
      data = data.toString() 
      assert(data === 'data')
      client.end()
      done()
    })
  })
})
