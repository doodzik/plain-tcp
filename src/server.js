import net         from 'net'
import Middleware  from 'frp-middleware'

class Server extends Middleware {
  constructor() {
    super()
    this.args = arguments
  }

  subscribe() {
    const  middleware = super.subscribe()
    const  server = net.createServer(this.callback(middleware))
    return server.listen.apply(server, this.args)
  }

  callback(middleware) {
    return socket => {
      socket.on('error', console.error)
      socket.on('data',  data => {
        const message = middleware(data.toString())
        if(typeof(message) !== 'undefined' || message !== null)
          socket.write(message)
      })
    }
  }
}

export default Server
