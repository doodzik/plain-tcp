import assert from 'assert'
import net    from 'net'
import Client from '../src/client'

describe('Client', () => {
  it('sends messenge', done => {
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

  it('sends multiple messenges', done => {
    var counter = 0
    var server  = net.createServer(socket => {
      socket.on('data', data => {
        assert(data == 'foo')
        if(counter == 2)
          done()
        counter++
      })
    })

    server.listen(1338, '127.0.0.1')

    var client = new Client(1338, '127.0.0.1')
    client.emit('foo')
    client.emit('foo')
    client.emit('foo')
  })

  it('receives respond', done => {
    var server = net.createServer(socket => {
      socket.on('data', data => socket.write('bar'))
    })

    server.listen(1339)

    new Client(1339).emit('foo', data => {
      data = data.toString()
      assert(data == 'bar')
      done()
    })
  })
})
