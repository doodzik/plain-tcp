import net         from 'net'
import Middleware  from 'frp-middleware'

class Client extends Middleware {
  constructor() {
    super()
    this.args = arguments
  }

  emit(message, fn = x => x) {
    const middleware = super.emit()
    var socket = new net.Socket()

    socket.connect(...this.args, () => {
      socket.write(middleware(message))
    })

    socket.on('data', data => {
      fn(data.toString())
    })
  }
}

export default Client
