"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTrackFromDatabase = exports.insertTrackIntoDatabase = exports.incrementPlaysOneTrackFromDatabase = exports.getOneTrackByIdFromDatabase = exports.getCommentsByTrackIdFromDataBase = exports.getAllTracksFromDatabase = exports.getAllTracksByUserIdFromDatabase = exports.deleteOneTrackFromDatabase = exports.createLikeIntoDatabase = exports.createCommentIntoDatabase = exports.checkIfUserHasCommentedOneTrackFromDatabase = exports.checkIfLikeExistsIntoDatabase = void 0;
var _connection = _interopRequireDefault(require("../database/connection.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } /*///////// IMPORTACIONES ////////*/
/*///////// MODELOS ////////*/
/*////////////////////////////////*/

_connection["default"].on('connect', function () {
  return console.log('Base de datos conectada con éxito');
});
_connection["default"].on('error', function (err) {
  return console.log('Error de conexión a la base de datos:', err);
});

/*------ OBTENER TODOS LOS TRACKS DE LA BASE DE DATOS ------*/
var getAllTracksFromDatabase = exports.getAllTracksFromDatabase = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    var client, _yield$client$query, rows;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log(process.env.DATABASE_URL);
          _context.next = 3;
          return _connection["default"].connect();
        case 3:
          client = _context.sent;
          console.log("Conectando.");
          _context.prev = 5;
          _context.next = 8;
          return client.query("\n            SELECT \n                tracks.*, \n                users.nickname,\n                COALESCE(l.like_count, 0) AS like_count,\n                COALESCE(c.comment_count, 0) AS comment_count,\n                (tracks.plays + COALESCE(l.like_count, 0) * 5 + COALESCE(c.comment_count, 0) * 10) AS ranking\n            FROM \n                tracks\n            JOIN \n                users ON tracks.user_id = users.id\n            LEFT JOIN \n                (SELECT track_id, COUNT(*) AS like_count FROM likes GROUP BY track_id) l ON l.track_id = tracks.id\n            LEFT JOIN \n                (SELECT track_id, COUNT(*) AS comment_count FROM comments GROUP BY track_id) c ON c.track_id = tracks.id\n        ");
        case 8:
          _yield$client$query = _context.sent;
          rows = _yield$client$query.rows;
          //COALESCE garantiza que si no hay likes ni comentarios el conteo sea 0 en lugar de null
          //LEFT JOIN para garantizar que incluso los tracks sin likes sean incluidos en los resultados
          console.log('Tracks recibidos' + rows);
          return _context.abrupt("return", rows);
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](5);
          console.error('Error al obtener los tracks en la BD:', _context.t0);
          throw _context.t0;
        case 18:
          _context.prev = 18;
          client.release(); // Para liberar el cliente
          return _context.finish(18);
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 14, 18, 21]]);
  }));
  return function getAllTracksFromDatabase() {
    return _ref.apply(this, arguments);
  };
}();

/*------ OBTENER LOS DATOS DE LOS TRACKS DE UN USUARIO POR SU ID ------*/
var getAllTracksByUserIdFromDatabase = exports.getAllTracksByUserIdFromDatabase = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(user_id) {
    var client, _yield$client$query2, rows;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _connection["default"].connect();
        case 2:
          client = _context2.sent;
          _context2.prev = 3;
          _context2.next = 6;
          return client.query("\n            SELECT\n                tracks.*, \n                users.nickname,\n                COALESCE(l.like_count, 0) AS like_count,\n                COALESCE(c.comment_count, 0) AS comment_count,\n                (tracks.plays + COALESCE(l.like_count, 0) * 5 + COALESCE(c.comment_count, 0) * 10) AS ranking\n            FROM \n                tracks\n            JOIN \n                users ON tracks.user_id = users.id\n            LEFT JOIN \n                (SELECT track_id, COUNT(*) AS like_count FROM likes GROUP BY track_id) l ON l.track_id = tracks.id\n            LEFT JOIN \n                (SELECT track_id, COUNT(*) AS comment_count FROM comments GROUP BY track_id) c ON c.track_id = tracks.id\n            WHERE \n                tracks.user_id = $1\n        ", [user_id]);
        case 6:
          _yield$client$query2 = _context2.sent;
          rows = _yield$client$query2.rows;
          console.log(rows);
          return _context2.abrupt("return", rows);
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](3);
          console.error('Error al obtener todos los tracks en la BD:', _context2.t0);
          throw _context2.t0;
        case 16:
          _context2.prev = 16;
          client.release();
          return _context2.finish(16);
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 12, 16, 19]]);
  }));
  return function getAllTracksByUserIdFromDatabase(_x) {
    return _ref2.apply(this, arguments);
  };
}();

/*------ OBTENER LOS DATOS DE UN TRACK POR SU ID ------*/
var getOneTrackByIdFromDatabase = exports.getOneTrackByIdFromDatabase = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(track_id) {
    var client, _yield$client$query3, rows;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          console.log(track_id);
          _context3.next = 3;
          return _connection["default"].connect();
        case 3:
          client = _context3.sent;
          _context3.prev = 4;
          _context3.next = 7;
          return client.query("\n            SELECT \n                tracks.*,\n                users.nickname,\n                COALESCE(l.like_count, 0) AS like_count,\n                COALESCE(c.comment_count, 0) AS comment_count\n            FROM \n                tracks\n            JOIN \n                users ON tracks.user_id = users.id\n            LEFT JOIN \n                (SELECT track_id, COUNT(*) AS like_count FROM likes GROUP BY track_id) l ON l.track_id = tracks.id\n            LEFT JOIN \n                (SELECT track_id, COUNT(*) AS comment_count FROM comments GROUP BY track_id) c ON c.track_id = tracks.id\n            WHERE \n                tracks.id = $1;\n        ", [track_id]);
        case 7:
          _yield$client$query3 = _context3.sent;
          rows = _yield$client$query3.rows;
          return _context3.abrupt("return", rows[0]);
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](4);
          console.error('Error al obtener un track en la BD:', _context3.t0);
          throw _context3.t0;
        case 16:
          _context3.prev = 16;
          client.release();
          return _context3.finish(16);
        case 19:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[4, 12, 16, 19]]);
  }));
  return function getOneTrackByIdFromDatabase(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

/*------ INSERTAR UN TRACK EN LA BASE DE DATOS ------*/
var insertTrackIntoDatabase = exports.insertTrackIntoDatabase = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(track) {
    var client, id, user_id, title, genre, upload_date, audio_url, cover_url, description, _yield$client$query4, rows;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _connection["default"].connect();
        case 2:
          client = _context4.sent;
          _context4.prev = 3;
          id = track.id, user_id = track.user_id, title = track.title, genre = track.genre, upload_date = track.upload_date, audio_url = track.audio_url, cover_url = track.cover_url, description = track.description;
          console.log('Track ' + title + ' preparando para insertar');
          _context4.next = 8;
          return client.query("\n            INSERT INTO tracks (id, user_id, title, genre, upload_date, audio_url, cover_url, description) \n            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)\n            ", [id, user_id, title, genre, upload_date, audio_url, cover_url, description]);
        case 8:
          console.log('Track ' + title + ' insertado en BD');
          _context4.next = 11;
          return client.query('SELECT * FROM tracks WHERE id = $1', [id]);
        case 11:
          _yield$client$query4 = _context4.sent;
          rows = _yield$client$query4.rows;
          return _context4.abrupt("return", rows[0]);
        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](3);
          console.error('Error al insertar track en la BD:', _context4.t0);
          throw _context4.t0;
        case 20:
          _context4.prev = 20;
          client.release();
          return _context4.finish(20);
        case 23:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 16, 20, 23]]);
  }));
  return function insertTrackIntoDatabase(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

/*------ ELIMINAR UN TRACK DE LA BASE DE DATOS POR SU ID ------*/
var deleteOneTrackFromDatabase = exports.deleteOneTrackFromDatabase = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(track_id) {
    var client;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _connection["default"].connect();
        case 2:
          client = _context5.sent;
          _context5.prev = 3;
          _context5.next = 6;
          return client.query("DELETE FROM tracks WHERE id = $1", [track_id]);
        case 6:
          _context5.next = 12;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](3);
          console.error('Error al eliminar un track en la BD:', _context5.t0);
          throw _context5.t0;
        case 12:
          _context5.prev = 12;
          client.release();
          return _context5.finish(12);
        case 15:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[3, 8, 12, 15]]);
  }));
  return function deleteOneTrackFromDatabase(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

/*------ ACTUALIZAR UN TRACK DE LA BASE DE DATOS POR SU ID ------*/
var updateTrackFromDatabase = exports.updateTrackFromDatabase = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(track_id, updatedTrackData) {
    var client, title, genre, cover_url, description;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _connection["default"].connect();
        case 2:
          client = _context6.sent;
          _context6.prev = 3;
          title = updatedTrackData.title, genre = updatedTrackData.genre, cover_url = updatedTrackData.cover_url, description = updatedTrackData.description;
          _context6.next = 7;
          return client.query("UPDATE tracks SET title = $2, genre = $3, cover_url = $4, description = $5 WHERE id = $1", [track_id, title, genre, cover_url, description]);
        case 7:
          _context6.next = 13;
          break;
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](3);
          console.error('Error al actualizar un track en la BD:', _context6.t0);
          throw _context6.t0;
        case 13:
          _context6.prev = 13;
          client.release();
          return _context6.finish(13);
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[3, 9, 13, 16]]);
  }));
  return function updateTrackFromDatabase(_x5, _x6) {
    return _ref6.apply(this, arguments);
  };
}();

/*------ INCREMNETAR PLAYS DE UN TRACK DE LA BASE DE DATOS POR SU ID ------*/
var incrementPlaysOneTrackFromDatabase = exports.incrementPlaysOneTrackFromDatabase = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(track_id) {
    var client;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return _connection["default"].connect();
        case 2:
          client = _context7.sent;
          _context7.prev = 3;
          _context7.next = 6;
          return client.query("UPDATE tracks SET plays = plays + 1 WHERE id = $1", [track_id]);
        case 6:
          _context7.next = 12;
          break;
        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](3);
          console.error('Error al incrementar los plays de un track en la BD:', _context7.t0);
          throw _context7.t0;
        case 12:
          _context7.prev = 12;
          client.release();
          return _context7.finish(12);
        case 15:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[3, 8, 12, 15]]);
  }));
  return function incrementPlaysOneTrackFromDatabase(_x7) {
    return _ref7.apply(this, arguments);
  };
}();

/*------ INSERTAR UN LIKE EN LA BASE DE DATOS ------*/
var createLikeIntoDatabase = exports.createLikeIntoDatabase = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(likeData) {
    var client, id, track_id, user_id;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _connection["default"].connect();
        case 2:
          client = _context8.sent;
          _context8.prev = 3;
          id = likeData.id, track_id = likeData.track_id, user_id = likeData.user_id;
          _context8.next = 7;
          return client.query("INSERT INTO likes (id, track_id, user_id)\n            VALUES ($1, $2, $3)", [id, track_id, user_id]);
        case 7:
          _context8.next = 13;
          break;
        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](3);
          console.error('Error al añadir un like en la BD:', _context8.t0);
          throw _context8.t0;
        case 13:
          _context8.prev = 13;
          client.release();
          return _context8.finish(13);
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[3, 9, 13, 16]]);
  }));
  return function createLikeIntoDatabase(_x8) {
    return _ref8.apply(this, arguments);
  };
}();

/*------ INSERTAR UN COMENTARIO EN LA BASE DE DATOS ------*/
var createCommentIntoDatabase = exports.createCommentIntoDatabase = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(newCommentData) {
    var client, id, track_id, user_id, comment;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return _connection["default"].connect();
        case 2:
          client = _context9.sent;
          _context9.prev = 3;
          id = newCommentData.id, track_id = newCommentData.track_id, user_id = newCommentData.user_id, comment = newCommentData.comment;
          console.log(newCommentData);
          _context9.next = 8;
          return client.query("INSERT INTO comments (id, track_id, user_id, comment)\n            VALUES ($1, $2, $3, $4)", [id, track_id, user_id, comment]);
        case 8:
          _context9.next = 10;
          return getCommentsByTrackIdFromDataBase(track_id);
        case 10:
          return _context9.abrupt("return", _context9.sent);
        case 13:
          _context9.prev = 13;
          _context9.t0 = _context9["catch"](3);
          console.error('Error al añadir un comentario en la BD:', _context9.t0);
          throw _context9.t0;
        case 17:
          _context9.prev = 17;
          client.release();
          return _context9.finish(17);
        case 20:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[3, 13, 17, 20]]);
  }));
  return function createCommentIntoDatabase(_x9) {
    return _ref9.apply(this, arguments);
  };
}();

/*------ OBTENER LOS COMENTARIOS UN TRACK EN LA BASE DE DATOS ------*/
var getCommentsByTrackIdFromDataBase = exports.getCommentsByTrackIdFromDataBase = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(track_id) {
    var client, _yield$client$query5, rows;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return _connection["default"].connect();
        case 2:
          client = _context10.sent;
          _context10.prev = 3;
          _context10.next = 6;
          return client.query("\n            SELECT \n            comments.id,\n            comments.comment,\n            users.nickname,\n            users.photo_url\n            FROM \n                COMMENTS\n            JOIN \n                USERS ON COMMENTS.user_id = USERS.id\n            WHERE \n                COMMENTS.track_id = $1;\n        ", [track_id]);
        case 6:
          _yield$client$query5 = _context10.sent;
          rows = _yield$client$query5.rows;
          return _context10.abrupt("return", rows);
        case 11:
          _context10.prev = 11;
          _context10.t0 = _context10["catch"](3);
          console.error('Error al añadir un comentario en la BD:', _context10.t0);
          throw _context10.t0;
        case 15:
          _context10.prev = 15;
          client.release();
          return _context10.finish(15);
        case 18:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[3, 11, 15, 18]]);
  }));
  return function getCommentsByTrackIdFromDataBase(_x10) {
    return _ref10.apply(this, arguments);
  };
}();

/*------ COMPROBAR SI EXISTE UN LIKE EN LA BASE DE DATOS ------*/
var checkIfLikeExistsIntoDatabase = exports.checkIfLikeExistsIntoDatabase = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(likeData) {
    var client, track_id, user_id, result;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return _connection["default"].connect();
        case 2:
          client = _context11.sent;
          _context11.prev = 3;
          track_id = likeData.track_id, user_id = likeData.user_id;
          _context11.next = 7;
          return client.query("SELECT 1 FROM likes WHERE track_id = $1 AND user_id = $2", [track_id, user_id]);
        case 7:
          result = _context11.sent;
          return _context11.abrupt("return", result.rowCount > 0);
        case 11:
          _context11.prev = 11;
          _context11.t0 = _context11["catch"](3);
          console.error('Error al comprobar si existe un like en la BD:', _context11.t0);
          throw _context11.t0;
        case 15:
          _context11.prev = 15;
          client.release();
          return _context11.finish(15);
        case 18:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[3, 11, 15, 18]]);
  }));
  return function checkIfLikeExistsIntoDatabase(_x11) {
    return _ref11.apply(this, arguments);
  };
}();

/*------ OBTENER LOS COMENTARIOS UN TRACK EN LA BASE DE DATOS ------*/
var checkIfUserHasCommentedOneTrackFromDatabase = exports.checkIfUserHasCommentedOneTrackFromDatabase = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(commentData) {
    var client, track_id, user_id, result;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return _connection["default"].connect();
        case 2:
          client = _context12.sent;
          _context12.prev = 3;
          track_id = commentData.track_id, user_id = commentData.user_id;
          _context12.next = 7;
          return client.query("SELECT 1 FROM comments WHERE track_id = $1 AND user_id = $2", [track_id, user_id]);
        case 7:
          result = _context12.sent;
          return _context12.abrupt("return", result.rowCount > 0);
        case 11:
          _context12.prev = 11;
          _context12.t0 = _context12["catch"](3);
          console.error('Error al comprobar si un usuario ha comentado en la BD:', _context12.t0);
          throw _context12.t0;
        case 15:
          _context12.prev = 15;
          client.release();
          return _context12.finish(15);
        case 18:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[3, 11, 15, 18]]);
  }));
  return function checkIfUserHasCommentedOneTrackFromDatabase(_x12) {
    return _ref12.apply(this, arguments);
  };
}();

/*///////// EXPORTACIONES ////////*/