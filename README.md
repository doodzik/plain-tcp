# plain-tcp
[![Build Status](https://travis-ci.org/doodzik/plain-tcp.svg?branch=master)](https://travis-ci.org/doodzik/plain-tcp)

A very simple tcp server and client build with frp-middleware

Check out the full API over at the [frp-middleware](http://github.com/doodzik/frp-middleware) repo.

# Installation

```bash
$ npm install plain-tcp --save
```
# Usage

```javascript
import assert             from 'assert'
import { Server, Client } from 'plain-tcp'

let server = new Server(5442)
server
.map(data => { 
  assert(data === 'hello')
  return 'world'
})
.subscribe()

let client = new Client(5442) 
client.emit('hello', data => {  
  assert(data === 'world') 
}) 
```

# API

### \#emit(String) 
Sends a message to the Server. Without handling the response.

### \#emit(String, function)
Sends a message to the Server and calls the provided function with the response.

### \#subscribe()
Starts listening on the port.
If a map returns an empty value the server doesn't respond to the client.
