'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _frpMiddleware = require('frp-middleware');

var _frpMiddleware2 = _interopRequireDefault(_frpMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Server = (function (_Middleware) {
  _inherits(Server, _Middleware);

  function Server() {
    _classCallCheck(this, Server);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Server).call(this));

    _this.args = arguments;
    return _this;
  }

  _createClass(Server, [{
    key: 'subscribe',
    value: function subscribe() {
      var middleware = _get(Object.getPrototypeOf(Server.prototype), 'subscribe', this).call(this);
      var server = _net2.default.createServer(this.callback(middleware));
      return server.listen.apply(server, this.args);
    }
  }, {
    key: 'callback',
    value: function callback(middleware) {
      return function (socket) {
        socket.on('error', console.error);
        socket.on('close', function () {
          return console.log('Connection closed');
        });
        socket.on('data', function (data) {
          var message = middleware(data.toString());
          if (typeof message !== 'undefined' || message !== null) socket.write(message);
        });
      };
    }
  }]);

  return Server;
})(_frpMiddleware2.default);

exports.default = Server;
//# sourceMappingURL=server.js.map
