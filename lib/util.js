'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onerror = onerror;

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onerror(err) {
  console.log(err);
  (0, _assert2.default)(err instanceof Error, 'non-error thrown: ' + err);

  if (this.silent) return;

  var msg = err.stack || err.toString();
  console.error();
  console.error(msg.replace(/^/gm, '  '));
  console.error();
}
//# sourceMappingURL=util.js.map
