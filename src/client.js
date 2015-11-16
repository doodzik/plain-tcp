import net         from 'net'
import Middleware  from 'frp-middleware'

class Client extends Middleware {
  constructor() {
    super()
    this.socket = new net.Socket();
    this.args   = arguments
  }

  emit(message, fn = x => x) {
    const middleware = super.emit()
    this.socket.connect(...this.args, () => this.socket.write(middleware(message)))
    this.socket.on('data',  data => fn(data.toString()))
  }
}

export default Client
