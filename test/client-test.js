import assert from 'assert'
import net    from 'net'
import Client from '../src/client'

describe('Client', () => {
  it('sends messenges', done => {
    var server = net.createServer(socket => {
      socket.on('data', data =>{
        assert(data == 'foo')
        done()
      })
    })

    server.listen(1337, '127.0.0.1')

    var client = new Client(1337, '127.0.0.1')
    client.emit('foo')
  })

  it('receives respond', done => {
    var server = net.createServer(socket => {
      socket.on('data', data => socket.write('bar'))
    })

    server.listen(1338)

    new Client(1338).emit('foo', data => {
      data = data.toString()
      assert(data == 'bar')
      done()
    })
  })
})
