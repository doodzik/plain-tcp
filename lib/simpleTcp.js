'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _server = require('./simpleTcp/server');

Object.defineProperty(exports, 'Server', {
  enumerable: true,
  get: function get() {
    return _server.default;
  }
});

var _client = require('./simpleTcp/client');

Object.defineProperty(exports, 'Client', {
  enumerable: true,
  get: function get() {
    return _client.default;
  }
});
//# sourceMappingURL=simpleTcp.js.map
