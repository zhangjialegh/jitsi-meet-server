!(function(e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.JitsiMeetExternalAPI = t())
    : (e.JitsiMeetExternalAPI = t());
})(window, function() {
  return (function(e) {
    var t = {};
    function n(s) {
      if (t[s]) return t[s].exports;
      var i = (t[s] = { i: s, l: !1, exports: {} });
      return e[s].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function(e, t, s) {
        n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: s });
      }),
      (n.r = function(e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (n.t = function(e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var s = Object.create(null);
        if (
          (n.r(s),
          Object.defineProperty(s, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
        )
          for (var i in e)
            n.d(
              s,
              i,
              function(t) {
                return e[t];
              }.bind(null, i)
            );
        return s;
      }),
      (n.n = function(e) {
        var t =
          e && e.__esModule
            ? function() {
                return e.default;
              }
            : function() {
                return e;
              };
        return n.d(t, "a", t), t;
      }),
      (n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = "/libs/"),
      n((n.s = 10))
    );
  })([
    function(e, t, n) {
      "use strict";
      (function(e) {
        n.d(t, "a", function() {
          return r;
        }),
          n.d(t, "b", function() {
            return o;
          }),
          n.d(t, "c", function() {
            return a;
          }),
          n.d(t, "d", function() {
            return c;
          }),
          n.d(t, "e", function() {
            return l;
          }),
          n.d(t, "f", function() {
            return u;
          }),
          n.d(t, "g", function() {
            return h;
          }),
          n.d(t, "h", function() {
            return p;
          });
        var s = n(1);
        const i = n.n(s).a.getLogger(e);
        function r(e) {
          return e
            .sendRequest({ type: "devices", name: "getAvailableDevices" })
            .catch(e => (i.error(e), {}));
        }
        function o(e) {
          return e
            .sendRequest({ type: "devices", name: "getCurrentDevices" })
            .catch(e => (i.error(e), {}));
        }
        function a(e, t) {
          return e.sendRequest({
            deviceType: t,
            type: "devices",
            name: "isDeviceChangeAvailable"
          });
        }
        function c(e) {
          return e.sendRequest({
            type: "devices",
            name: "isDeviceListAvailable"
          });
        }
        function l(e) {
          return e.sendRequest({
            type: "devices",
            name: "isMultipleAudioInputSupported"
          });
        }
        function u(e, t, n) {
          return d(e, { id: n, kind: "audioinput", label: t });
        }
        function h(e, t, n) {
          return d(e, { id: n, kind: "audiooutput", label: t });
        }
        function d(e, t) {
          return e.sendRequest({
            type: "devices",
            name: "setDevice",
            device: t
          });
        }
        function p(e, t, n) {
          return d(e, { id: n, kind: "videoinput", label: t });
        }
      }.call(this, "modules/API/external/functions.js"));
    },
    function(e, t, n) {
      var s = n(4),
        i = n(12),
        r = {},
        o = [],
        a = s.levels.TRACE;
      e.exports = {
        addGlobalTransport: function(e) {
          s.addGlobalTransport(e);
        },
        removeGlobalTransport: function(e) {
          s.removeGlobalTransport(e);
        },
        getLogger: function(e, t, n) {
          var i = new s(a, e, t, n);
          return e ? ((r[e] = r[e] || []), r[e].push(i)) : o.push(i), i;
        },
        setLogLevelById: function(e, t) {
          for (var n = t ? r[t] || [] : o, s = 0; s < n.length; s++)
            n[s].setLevel(e);
        },
        setLogLevel: function(e) {
          a = e;
          for (var t = 0; t < o.length; t++) o[t].setLevel(e);
          for (var n in r) {
            var s = r[n] || [];
            for (t = 0; t < s.length; t++) s[t].setLevel(e);
          }
        },
        levels: s.levels,
        LogCollector: i
      };
    },
    function(e, t, n) {
      "use strict";
      (function(e) {
        n.d(t, "a", function() {
          return d;
        });
        const s = n(1).getLogger(e),
          i = "org.jitsi.meet:",
          r = "(//[^/?#]+)",
          o = "([^?#]*)",
          a = "^([a-z][a-z0-9\\.\\+-]*:)";
        function c(e) {
          const t = new RegExp(`${a}+`, "gi"),
            n = t.exec(e);
          if (n) {
            let s = n[n.length - 1].toLowerCase();
            "http:" !== s && "https:" !== s && (s = "https:"),
              (e = e.substring(t.lastIndex)).startsWith("//") && (e = s + e);
          }
          return e;
        }
        function l(e = {}) {
          const t = [];
          for (const n in e)
            try {
              t.push(`${n}=${encodeURIComponent(JSON.stringify(e[n]))}`);
            } catch (e) {
              s.warn(`Error encoding ${n}: ${e}`);
            }
          return t;
        }
        function u(e) {
          const t = { toString: h };
          let n, s, i;
          if (
            ((e = e.replace(/\s/g, "")),
            (s = (n = new RegExp(a, "gi")).exec(e)) &&
              ((t.protocol = s[1].toLowerCase()),
              (e = e.substring(n.lastIndex))),
            (s = (n = new RegExp(`^${r}`, "gi")).exec(e)))
          ) {
            let i = s[1].substring(2);
            e = e.substring(n.lastIndex);
            const r = i.indexOf("@");
            -1 !== r && (i = i.substring(r + 1)), (t.host = i);
            const o = i.lastIndexOf(":");
            -1 !== o &&
              ((t.port = i.substring(o + 1)), (i = i.substring(0, o))),
              (t.hostname = i);
          }
          if (
            ((s = (n = new RegExp(`^${o}`, "gi")).exec(e)) &&
              ((i = s[1]), (e = e.substring(n.lastIndex))),
            i ? i.startsWith("/") || (i = `/${i}`) : (i = "/"),
            (t.pathname = i),
            e.startsWith("?"))
          ) {
            let n = e.indexOf("#", 1);
            -1 === n && (n = e.length),
              (t.search = e.substring(0, n)),
              (e = e.substring(n));
          } else t.search = "";
          return (t.hash = e.startsWith("#") ? e : ""), t;
        }
        function h(e) {
          const { hash: t, host: n, pathname: s, protocol: i, search: r } =
            e || this;
          let o = "";
          return (
            i && (o += i),
            n && (o += `//${n}`),
            (o += s || "/"),
            r && (o += r),
            t && (o += t),
            o
          );
        }
        function d(e) {
          let t;
          const n = u(
            c(
              (t =
                e.serverURL && e.room
                  ? new URL(e.room, e.serverURL).toString()
                  : e.room
                  ? e.room
                  : e.url || "")
            )
          );
          if (!n.protocol) {
            let t = e.protocol || e.scheme;
            t && (t.endsWith(":") || (t += ":"), (n.protocol = t));
          }
          let { pathname: s } = n;
          if (!n.host) {
            const t = e.domain || e.host || e.hostname;
            if (t) {
              const { host: e, hostname: r, pathname: o, port: a } = u(
                c(`${i}//${t}`)
              );
              e && ((n.host = e), (n.hostname = r), (n.port = a)),
                "/" === s && "/" !== o && (s = o);
            }
          }
          const r = e.roomName || e.room;
          !r ||
            (!n.pathname.endsWith("/") && n.pathname.endsWith(`/${r}`)) ||
            (s.endsWith("/") || (s += "/"), (s += r)),
            (n.pathname = s);
          const { jwt: o } = e;
          if (o) {
            let { search: e } = n;
            -1 === e.indexOf("?jwt=") &&
              -1 === e.indexOf("&jwt=") &&
              (e.startsWith("?") || (e = `?${e}`),
              1 === e.length || (e += "&"),
              (e += `jwt=${o}`),
              (n.search = e));
          }
          let { hash: a } = n;
          for (const t of ["config", "interfaceConfig", "devices"]) {
            const n = l(e[`${t}Overwrite`] || e[t] || e[`${t}Override`]);
            if (n.length) {
              let e = `${t}.${n.join(`&${t}.`)}`;
              a.length ? (e = `&${e}`) : (a = "#"), (a += e);
            }
          }
          return (n.hash = a), n.toString() || void 0;
        }
      }.call(this, "react/features/base/util/uri.js"));
    },
    function(e, t, n) {
      "use strict";
      var s = n(5);
      n(6);
      n(2);
      const i = (function(e, t = !1, n = "hash") {
        const i = "search" === n ? e.search : e.hash,
          r = {},
          o = (i && i.substr(1).split("&")) || [];
        if ("hash" === n && 1 === o.length) {
          const e = o[0];
          if (e.startsWith("/") && 1 === e.split("&").length) return r;
        }
        return (
          o.forEach(e => {
            const n = e.split("="),
              i = n[0];
            if (!i) return;
            let o;
            try {
              (o = n[1]),
                t ||
                  (o = JSON.parse(decodeURIComponent(o).replace(/\\&/, "&")));
            } catch (e) {
              return void Object(s.b)(
                e,
                `Failed to parse URL parameter value: ${String(o)}`
              );
            }
            r[i] = o;
          }),
          r
        );
      })(window.location).jitsi_meet_external_api_id;
      var r = n(8),
        o = n.n(r);
      function a(e, t) {
        if (null == e) return {};
        var n,
          s,
          i = (function(e, t) {
            if (null == e) return {};
            var n,
              s,
              i = {},
              r = Object.keys(e);
            for (s = 0; s < r.length; s++)
              (n = r[s]), t.indexOf(n) >= 0 || (i[n] = e[n]);
            return i;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          for (s = 0; s < r.length; s++)
            (n = r[s]),
              t.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) &&
                  (i[n] = e[n]));
        }
        return i;
      }
      function c(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
            : (e[t] = n),
          e
        );
      }
      const l = { window: window.opener || window.parent },
        u = [
          "avatar-url",
          "display-name",
          "email",
          "toggle-audio",
          "toggle-chat",
          "toggle-film-strip",
          "toggle-share-screen",
          "toggle-video",
          "video-hangup"
        ],
        h = [
          "display-name-change",
          "incoming-message",
          "outgoing-message",
          "participant-joined",
          "participant-left",
          "video-conference-joined",
          "video-conference-left",
          "video-ready-to-close"
        ],
        d = "message";
      class p {
        constructor({ enableLegacyFormat: e, postisOptions: t } = {}) {
          (this.postis = o()(
            (function(e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {},
                  s = Object.keys(n);
                "function" == typeof Object.getOwnPropertySymbols &&
                  (s = s.concat(
                    Object.getOwnPropertySymbols(n).filter(function(e) {
                      return Object.getOwnPropertyDescriptor(n, e).enumerable;
                    })
                  )),
                  s.forEach(function(t) {
                    c(e, t, n[t]);
                  });
              }
              return e;
            })({}, l, t)
          )),
            (this._enableLegacyFormat = e),
            this._enableLegacyFormat &&
              u.forEach(e =>
                this.postis.listen(e, t =>
                  this._legacyMessageReceivedCallback(e, t)
                )
              ),
            (this._receiveCallback = () => {}),
            this.postis.listen(d, e => this._receiveCallback(e));
        }
        _legacyMessageReceivedCallback(e, t = {}) {
          this._receiveCallback({ data: { name: e, data: t } });
        }
        _sendLegacyMessage(e) {
          let { name: t } = e,
            n = a(e, ["name"]);
          t &&
            -1 !== h.indexOf(t) &&
            this.postis.send({ method: t, params: n });
        }
        dispose() {
          this.postis.destroy();
        }
        send(e) {
          this.postis.send({ method: d, params: e }),
            this._enableLegacyFormat && this._sendLegacyMessage(e.data || {});
        }
        setReceiveCallback(e) {
          this._receiveCallback = e;
        }
      }
      const f = "event",
        g = "request",
        m = "response";
      class v {
        constructor({ backend: e } = {}) {
          (this._listeners = new Map()),
            (this._requestID = 0),
            (this._responseHandlers = new Map()),
            (this._unprocessedMessages = new Set()),
            (this.addListener = this.on),
            e && this.setBackend(e);
        }
        _disposeBackend() {
          this._backend && (this._backend.dispose(), (this._backend = null));
        }
        _onMessageReceived(e) {
          if (e.type === m) {
            const t = this._responseHandlers.get(e.id);
            t && (t(e), this._responseHandlers.delete(e.id));
          } else
            e.type === g
              ? this.emit("request", e.data, (t, n) => {
                  this._backend.send({
                    type: m,
                    error: n,
                    id: e.id,
                    result: t
                  });
                })
              : this.emit("event", e.data);
        }
        dispose() {
          this._responseHandlers.clear(),
            this._unprocessedMessages.clear(),
            this.removeAllListeners(),
            this._disposeBackend();
        }
        emit(e, ...t) {
          const n = this._listeners.get(e);
          let s = !1;
          return (
            n &&
              n.size &&
              n.forEach(e => {
                s = e(...t) || s;
              }),
            s || this._unprocessedMessages.add(t),
            s
          );
        }
        on(e, t) {
          let n = this._listeners.get(e);
          return (
            n || ((n = new Set()), this._listeners.set(e, n)),
            n.add(t),
            this._unprocessedMessages.forEach(e => {
              t(...e) && this._unprocessedMessages.delete(e);
            }),
            this
          );
        }
        removeAllListeners(e) {
          return e ? this._listeners.delete(e) : this._listeners.clear(), this;
        }
        removeListener(e, t) {
          const n = this._listeners.get(e);
          return n && n.delete(t), this;
        }
        sendEvent(e = {}) {
          this._backend && this._backend.send({ type: f, data: e });
        }
        sendRequest(e) {
          if (!this._backend)
            return Promise.reject(new Error("No transport backend defined!"));
          this._requestID++;
          const t = this._requestID;
          return new Promise((n, s) => {
            this._responseHandlers.set(t, ({ error: e, result: t }) => {
              void 0 !== t
                ? n(t)
                : s(
                    void 0 !== e ? e : new Error("Unexpected response format!")
                  );
            }),
              this._backend.send({ type: g, data: e, id: t });
          });
        }
        setBackend(e) {
          this._disposeBackend(),
            (this._backend = e),
            this._backend.setReceiveCallback(
              this._onMessageReceived.bind(this)
            );
        }
      }
      n.d(t, "a", function() {
        return p;
      }),
        n.d(t, "b", function() {
          return v;
        });
      const _ = {};
      let b;
      "number" == typeof i && (_.scope = `jitsi_meet_external_api_${i}`),
        (Object(s.a)().setExternalTransportBackend = e => b.setBackend(e));
    },
    function(e, t) {
      var n = { trace: 0, debug: 1, info: 2, log: 3, warn: 4, error: 5 };
      r.consoleTransport = console;
      var s = [r.consoleTransport];
      function i() {
        var e = arguments[0],
          t = arguments[1],
          i = Array.prototype.slice.call(arguments, 2);
        if (!(n[t] < e.level))
          for (
            var r = (function() {
                var e = {
                    methodName: "",
                    fileLocation: "",
                    line: null,
                    column: null
                  },
                  t = new Error(),
                  n = t.stack ? t.stack.split("\n") : [];
                if (!n || n.length < 1) return e;
                var s = null;
                return (
                  n[3] &&
                    (s = n[3].match(
                      /\s*at\s*(.+?)\s*\((\S*)\s*:(\d*)\s*:(\d*)\)/
                    )),
                  !s || s.length <= 4
                    ? (0 === n[2].indexOf("log@")
                        ? (e.methodName = n[3].substr(0, n[3].indexOf("@")))
                        : (e.methodName = n[2].substr(0, n[2].indexOf("@"))),
                      e)
                    : ((e.methodName = s[1]),
                      (e.fileLocation = s[2]),
                      (e.line = s[3]),
                      (e.column = s[4]),
                      e)
                );
              })(),
              o = s.concat(e.transports),
              a = 0;
            a < o.length;
            a++
          ) {
            var c = o[a],
              l = c[t];
            l &&
              "function" == typeof l &&
              l
                .bind(
                  c,
                  e.id ? "[" + e.id + "]" : "",
                  "<" + r.methodName + ">: "
                )
                .apply(c, i);
          }
      }
      function r(e, t, s, r) {
        (this.id = t),
          (this.format = r),
          (this.transports = s),
          this.transports || (this.transports = []),
          (this.level = n[e]);
        for (var o = Object.keys(n), a = 0; a < o.length; a++)
          this[o[a]] = i.bind(null, this, o[a]);
      }
      (r.addGlobalTransport = function(e) {
        -1 === s.indexOf(e) && s.push(e);
      }),
        (r.removeGlobalTransport = function(e) {
          var t = s.indexOf(e);
          -1 !== t && s.splice(t, 1);
        }),
        (r.prototype.setLevel = function(e) {
          this.level = n[e];
        }),
        (e.exports = r),
        (r.levels = {
          TRACE: "trace",
          DEBUG: "debug",
          INFO: "info",
          LOG: "log",
          WARN: "warn",
          ERROR: "error"
        });
    },
    function(e, t, n) {
      "use strict";
      (function(e) {
        n.d(t, "a", function() {
          return i;
        }),
          n.d(t, "b", function() {
            return r;
          });
        const s = n(1).getLogger(e);
        function i() {
          return (
            window.JitsiMeetJS || (window.JitsiMeetJS = {}),
            window.JitsiMeetJS.app || (window.JitsiMeetJS.app = {}),
            window.JitsiMeetJS.app
          );
        }
        function r(e, t = "") {
          s.error(t, e),
            window.onerror && window.onerror(t, null, null, null, e);
        }
      }.call(this, "react/features/base/util/helpers.js"));
    },
    function(e, t, n) {
      "use strict";
      (function(e) {
        n(1).getLogger(e);
      }.call(this, "react/features/base/util/httpUtils.js"));
    },
    function(e, t) {
      function n() {
        (this._events = this._events || {}),
          (this._maxListeners = this._maxListeners || void 0);
      }
      function s(e) {
        return "function" == typeof e;
      }
      function i(e) {
        return "object" == typeof e && null !== e;
      }
      function r(e) {
        return void 0 === e;
      }
      (e.exports = n),
        (n.EventEmitter = n),
        (n.prototype._events = void 0),
        (n.prototype._maxListeners = void 0),
        (n.defaultMaxListeners = 10),
        (n.prototype.setMaxListeners = function(e) {
          if ("number" != typeof e || e < 0 || isNaN(e))
            throw TypeError("n must be a positive number");
          return (this._maxListeners = e), this;
        }),
        (n.prototype.emit = function(e) {
          var t, n, o, a, c, l;
          if (
            (this._events || (this._events = {}),
            "error" === e &&
              (!this._events.error ||
                (i(this._events.error) && !this._events.error.length)))
          ) {
            if ((t = arguments[1]) instanceof Error) throw t;
            var u = new Error(
              'Uncaught, unspecified "error" event. (' + t + ")"
            );
            throw ((u.context = t), u);
          }
          if (r((n = this._events[e]))) return !1;
          if (s(n))
            switch (arguments.length) {
              case 1:
                n.call(this);
                break;
              case 2:
                n.call(this, arguments[1]);
                break;
              case 3:
                n.call(this, arguments[1], arguments[2]);
                break;
              default:
                (a = Array.prototype.slice.call(arguments, 1)),
                  n.apply(this, a);
            }
          else if (i(n))
            for (
              a = Array.prototype.slice.call(arguments, 1),
                o = (l = n.slice()).length,
                c = 0;
              c < o;
              c++
            )
              l[c].apply(this, a);
          return !0;
        }),
        (n.prototype.addListener = function(e, t) {
          var o;
          if (!s(t)) throw TypeError("listener must be a function");
          return (
            this._events || (this._events = {}),
            this._events.newListener &&
              this.emit("newListener", e, s(t.listener) ? t.listener : t),
            this._events[e]
              ? i(this._events[e])
                ? this._events[e].push(t)
                : (this._events[e] = [this._events[e], t])
              : (this._events[e] = t),
            i(this._events[e]) &&
              !this._events[e].warned &&
              (o = r(this._maxListeners)
                ? n.defaultMaxListeners
                : this._maxListeners) &&
              o > 0 &&
              this._events[e].length > o &&
              ((this._events[e].warned = !0),
              console.error(
                "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
                this._events[e].length
              ),
              "function" == typeof console.trace && console.trace()),
            this
          );
        }),
        (n.prototype.on = n.prototype.addListener),
        (n.prototype.once = function(e, t) {
          if (!s(t)) throw TypeError("listener must be a function");
          var n = !1;
          function i() {
            this.removeListener(e, i),
              n || ((n = !0), t.apply(this, arguments));
          }
          return (i.listener = t), this.on(e, i), this;
        }),
        (n.prototype.removeListener = function(e, t) {
          var n, r, o, a;
          if (!s(t)) throw TypeError("listener must be a function");
          if (!this._events || !this._events[e]) return this;
          if (
            ((o = (n = this._events[e]).length),
            (r = -1),
            n === t || (s(n.listener) && n.listener === t))
          )
            delete this._events[e],
              this._events.removeListener && this.emit("removeListener", e, t);
          else if (i(n)) {
            for (a = o; a-- > 0; )
              if (n[a] === t || (n[a].listener && n[a].listener === t)) {
                r = a;
                break;
              }
            if (r < 0) return this;
            1 === n.length
              ? ((n.length = 0), delete this._events[e])
              : n.splice(r, 1),
              this._events.removeListener && this.emit("removeListener", e, t);
          }
          return this;
        }),
        (n.prototype.removeAllListeners = function(e) {
          var t, n;
          if (!this._events) return this;
          if (!this._events.removeListener)
            return (
              0 === arguments.length
                ? (this._events = {})
                : this._events[e] && delete this._events[e],
              this
            );
          if (0 === arguments.length) {
            for (t in this._events)
              "removeListener" !== t && this.removeAllListeners(t);
            return (
              this.removeAllListeners("removeListener"),
              (this._events = {}),
              this
            );
          }
          if (s((n = this._events[e]))) this.removeListener(e, n);
          else if (n)
            for (; n.length; ) this.removeListener(e, n[n.length - 1]);
          return delete this._events[e], this;
        }),
        (n.prototype.listeners = function(e) {
          return this._events && this._events[e]
            ? s(this._events[e])
              ? [this._events[e]]
              : this._events[e].slice()
            : [];
        }),
        (n.prototype.listenerCount = function(e) {
          if (this._events) {
            var t = this._events[e];
            if (s(t)) return 1;
            if (t) return t.length;
          }
          return 0;
        }),
        (n.listenerCount = function(e, t) {
          return e.listenerCount(t);
        });
    },
    function(e, t) {
      e.exports = function(e) {
        var t,
          n = e.scope,
          s = e.window,
          i = e.windowForEventListening || window,
          r = {},
          o = [],
          a = {},
          c = !1,
          l = function(e) {
            var t;
            try {
              t = JSON.parse(e.data);
            } catch (e) {
              return;
            }
            if (t.postis && t.scope === n) {
              var s = r[t.method];
              if (s)
                for (var i = 0; i < s.length; i++) s[i].call(null, t.params);
              else
                (a[t.method] = a[t.method] || []), a[t.method].push(t.params);
            }
          };
        i.addEventListener("message", l, !1);
        var u = {
            listen: function(e, t) {
              (r[e] = r[e] || []), r[e].push(t);
              var n = a[e];
              if (n)
                for (var s = r[e], i = 0; i < s.length; i++)
                  for (var o = 0; o < n.length; o++) s[i].call(null, n[o]);
              delete a[e];
            },
            send: function(e) {
              var t = e.method;
              (c || "__ready__" === e.method) &&
              s &&
              "function" == typeof s.postMessage
                ? s.postMessage(
                    JSON.stringify({
                      postis: !0,
                      scope: n,
                      method: t,
                      params: e.params
                    }),
                    "*"
                  )
                : o.push(e);
            },
            ready: function(e) {
              c
                ? e()
                : setTimeout(function() {
                    u.ready(e);
                  }, 50);
            },
            destroy: function(e) {
              clearInterval(t),
                (c = !1),
                i &&
                  "function" == typeof i.removeEventListener &&
                  i.removeEventListener("message", l),
                e && e();
            }
          },
          h = +new Date() + Math.random() + "";
        return (
          (t = setInterval(function() {
            u.send({ method: "__ready__", params: h });
          }, 50)),
          u.listen("__ready__", function(e) {
            if (e === h) {
              clearInterval(t), (c = !0);
              for (var n = 0; n < o.length; n++) u.send(o[n]);
              o = [];
            } else u.send({ method: "__ready__", params: e });
          }),
          u
        );
      };
    },
    function(e) {
      e.exports = {
        "google-auth": {
          matchPatterns: { url: "accounts.google.com" },
          target: "electron"
        },
        "dropbox-auth": {
          matchPatterns: { url: "dropbox.com/oauth2/authorize" },
          target: "electron"
        }
      };
    },
    function(e, t, n) {
      e.exports = n(11).default;
    },
    function(e, t, n) {
      "use strict";
      n.r(t),
        function(e) {
          n.d(t, "default", function() {
            return b;
          });
          var s = n(7),
            i = n.n(s),
            r = n(2),
            o = n(3),
            a = n(9),
            c = n(0);
          function l(e, t) {
            if (null == e) return {};
            var n,
              s,
              i = (function(e, t) {
                if (null == e) return {};
                var n,
                  s,
                  i = {},
                  r = Object.keys(e);
                for (s = 0; s < r.length; s++)
                  (n = r[s]), t.indexOf(n) >= 0 || (i[n] = e[n]);
                return i;
              })(e, t);
            if (Object.getOwnPropertySymbols) {
              var r = Object.getOwnPropertySymbols(e);
              for (s = 0; s < r.length; s++)
                (n = r[s]),
                  t.indexOf(n) >= 0 ||
                    (Object.prototype.propertyIsEnumerable.call(e, n) &&
                      (i[n] = e[n]));
            }
            return i;
          }
          function u(e, t, n) {
            return (
              t in e
                ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                  })
                : (e[t] = n),
              e
            );
          }
          const h = n(1).getLogger(e),
            d = ["css/all.css", "libs/alwaysontop.min.js"],
            p = {
              avatarUrl: "avatar-url",
              displayName: "display-name",
              email: "email",
              hangup: "video-hangup",
              password: "password",
              subject: "subject",
              submitFeedback: "submit-feedback",
              toggleAudio: "toggle-audio",
              toggleChat: "toggle-chat",
              toggleFilmStrip: "toggle-film-strip",
              toggleShareScreen: "toggle-share-screen",
              toggleTileView: "toggle-tile-view",
              toggleVideo: "toggle-video"
            },
            f = {
              "avatar-changed": "avatarChanged",
              "audio-availability-changed": "audioAvailabilityChanged",
              "audio-mute-status-changed": "audioMuteStatusChanged",
              "camera-error": "cameraError",
              "device-list-changed": "deviceListChanged",
              "display-name-change": "displayNameChange",
              "email-change": "emailChange",
              "feedback-submitted": "feedbackSubmitted",
              "feedback-prompt-displayed": "feedbackPromptDisplayed",
              "filmstrip-display-changed": "filmstripDisplayChanged",
              "incoming-message": "incomingMessage",
              "mic-error": "micError",
              "outgoing-message": "outgoingMessage",
              "participant-joined": "participantJoined",
              "participant-left": "participantLeft",
              "password-required": "passwordRequired",
              "proxy-connection-event": "proxyConnectionEvent",
              "video-ready-to-close": "readyToClose",
              "video-conference-joined": "videoConferenceJoined",
              "video-conference-left": "videoConferenceLeft",
              "video-availability-changed": "videoAvailabilityChanged",
              "video-mute-status-changed": "videoMuteStatusChanged",
              "screen-sharing-status-changed": "screenSharingStatusChanged",
              "subject-change": "subjectChange",
              "tile-view-changed": "tileViewChanged"
            };
          let g = 0;
          function m(e, t) {
            e._numberOfParticipants += t;
          }
          function v(e, t = {}) {
            return Object(r.a)(
              (function(e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = null != arguments[t] ? arguments[t] : {},
                    s = Object.keys(n);
                  "function" == typeof Object.getOwnPropertySymbols &&
                    (s = s.concat(
                      Object.getOwnPropertySymbols(n).filter(function(e) {
                        return Object.getOwnPropertyDescriptor(n, e).enumerable;
                      })
                    )),
                    s.forEach(function(t) {
                      u(e, t, n[t]);
                    });
                }
                return e;
              })({}, t, {
                url: `${
                  t.noSSL ? "http" : "https"
                }://${e}/#jitsi_meet_external_api_id=${g}`
              })
            );
          }
          function _(e) {
            let t;
            return (
              "string" == typeof e &&
              null !== String(e).match(/([0-9]*\.?[0-9]+)(em|pt|px|%)$/)
                ? (t = e)
                : "number" == typeof e && (t = `${e}px`),
              t
            );
          }
          class b extends i.a {
            constructor(e, ...t) {
              super();
              const {
                roomName: n = "",
                width: s = "100%",
                height: i = "100%",
                parentNode: r = document.body,
                configOverwrite: a = {},
                interfaceConfigOverwrite: c = {},
                noSSL: l = !1,
                jwt: u,
                onload: h,
                invitees: d,
                devices: p
              } = (function(e) {
                if (!e.length) return {};
                switch (typeof e[0]) {
                  case "string":
                  case void 0: {
                    const [t, n, s, i, r, o, a, c, l] = e;
                    return {
                      roomName: t,
                      width: n,
                      height: s,
                      parentNode: i,
                      configOverwrite: r,
                      interfaceConfigOverwrite: o,
                      noSSL: a,
                      jwt: c,
                      onload: l
                    };
                  }
                  case "object":
                    return e[0];
                  default:
                    throw new Error("Can't parse the arguments!");
                }
              })(t);
              (this._parentNode = r),
                (this._url = v(e, {
                  configOverwrite: a,
                  interfaceConfigOverwrite: c,
                  jwt: u,
                  noSSL: l,
                  roomName: n,
                  devices: p
                })),
                this._createIFrame(i, s, h),
                (this._transport = new o.b({
                  backend: new o.a({
                    postisOptions: {
                      scope: `jitsi_meet_external_api_${g}`,
                      window: this._frame.contentWindow
                    }
                  })
                })),
                Array.isArray(d) && d.length > 0 && this.invite(d),
                (this._isLargeVideoVisible = !0),
                (this._numberOfParticipants = 0),
                (this._participants = {}),
                (this._myUserID = void 0),
                (this._onStageParticipant = void 0),
                this._setupListeners(),
                g++;
            }
            _createIFrame(e, t, n) {
              const s = `jitsiConferenceFrame${g}`;
              (this._frame = document.createElement("iframe")),
                (this._frame.allow = "camera; microphone"),
                (this._frame.src = this._url),
                (this._frame.name = s),
                (this._frame.id = s),
                this._setSize(e, t),
                this._frame.setAttribute("allowFullScreen", "true"),
                (this._frame.style.border = 0),
                n && (this._frame.onload = n),
                (this._frame = this._parentNode.appendChild(this._frame));
            }
            _getAlwaysOnTopResources() {
              const e = this._frame.contentWindow,
                t = e.document;
              let n = "";
              const s = t.querySelector("base");
              if (s && s.href) n = s.href;
              else {
                const { protocol: t, host: s } = e.location;
                n = `${t}//${s}`;
              }
              return d.map(e => new URL(e, n).href);
            }
            _getOnStageParticipant() {
              return this._onStageParticipant;
            }
            _getLargeVideo() {
              const e = this.getIFrame();
              if (
                this._isLargeVideoVisible &&
                e &&
                e.contentWindow &&
                e.contentWindow.document
              )
                return e.contentWindow.document.getElementById("largeVideo");
            }
            _setSize(e, t) {
              const n = _(e),
                s = _(t);
              void 0 !== n && (this._frame.style.height = n),
                void 0 !== s && (this._frame.style.width = s);
            }
            _setupListeners() {
              this._transport.on("event", e => {
                let { name: t } = e,
                  n = l(e, ["name"]);
                const s = n.id;
                switch (t) {
                  case "video-conference-joined":
                    (this._myUserID = s),
                      (this._participants[s] = { avatarURL: n.avatarURL });
                  case "participant-joined":
                    (this._participants[s] = this._participants[s] || {}),
                      (this._participants[s].displayName = n.displayName),
                      (this._participants[s].formattedDisplayName =
                        n.formattedDisplayName),
                      m(this, 1);
                    break;
                  case "participant-left":
                    m(this, -1), delete this._participants[s];
                    break;
                  case "display-name-change": {
                    const e = this._participants[s];
                    e &&
                      ((e.displayName = n.displayname),
                      (e.formattedDisplayName = n.formattedDisplayName));
                    break;
                  }
                  case "email-change": {
                    const e = this._participants[s];
                    e && (e.email = n.email);
                    break;
                  }
                  case "avatar-changed": {
                    const e = this._participants[s];
                    e && (e.avatarURL = n.avatarURL);
                    break;
                  }
                  case "on-stage-participant-changed":
                    (this._onStageParticipant = s),
                      this.emit("largeVideoChanged");
                    break;
                  case "large-video-visibility-changed":
                    (this._isLargeVideoVisible = n.isVisible),
                      this.emit("largeVideoChanged");
                    break;
                  case "video-conference-left":
                    m(this, -1), delete this._participants[this._myUserID];
                }
                const i = f[t];
                return !!i && (this.emit(i, n), !0);
              });
            }
            addEventListener(e, t) {
              this.on(e, t);
            }
            addEventListeners(e) {
              for (const t in e) this.addEventListener(t, e[t]);
            }
            dispose() {
              this.emit("_willDispose"),
                this._transport.dispose(),
                this.removeAllListeners(),
                this._frame && this._frame.parentNode.removeChild(this._frame);
            }
            executeCommand(e, ...t) {
              e in p
                ? this._transport.sendEvent({ data: t, name: p[e] })
                : h.error("Not supported command name.");
            }
            executeCommands(e) {
              for (const t in e) this.executeCommand(t, e[t]);
            }
            getAvailableDevices() {
              return Object(c.a)(this._transport);
            }
            getCurrentDevices() {
              return Object(c.b)(this._transport);
            }
            isAudioAvailable() {
              return this._transport.sendRequest({
                name: "is-audio-available"
              });
            }
            isDeviceChangeAvailable(e) {
              return Object(c.c)(this._transport, e);
            }
            isDeviceListAvailable() {
              return Object(c.d)(this._transport);
            }
            isMultipleAudioInputSupported() {
              return Object(c.e)(this._transport);
            }
            invite(e) {
              return Array.isArray(e) && 0 !== e.length
                ? this._transport.sendRequest({ name: "invite", invitees: e })
                : Promise.reject(new TypeError("Invalid Argument"));
            }
            isAudioMuted() {
              return this._transport.sendRequest({ name: "is-audio-muted" });
            }
            getAvatarURL(e) {
              const { avatarURL: t } = this._participants[e] || {};
              return t;
            }
            getDisplayName(e) {
              const { displayName: t } = this._participants[e] || {};
              return t;
            }
            getEmail(e) {
              const { email: t } = this._participants[e] || {};
              return t;
            }
            _getFormattedDisplayName(e) {
              const { formattedDisplayName: t } = this._participants[e] || {};
              return t;
            }
            getIFrame() {
              return this._frame;
            }
            getNumberOfParticipants() {
              return this._numberOfParticipants;
            }
            isVideoAvailable() {
              return this._transport.sendRequest({
                name: "is-video-available"
              });
            }
            isVideoMuted() {
              return this._transport.sendRequest({ name: "is-video-muted" });
            }
            removeEventListener(e) {
              this.removeAllListeners(e);
            }
            removeEventListeners(e) {
              e.forEach(e => this.removeEventListener(e));
            }
            sendProxyConnectionEvent(e) {
              this._transport.sendEvent({
                data: [e],
                name: "proxy-connection-event"
              });
            }
            setAudioInputDevice(e, t) {
              return Object(c.f)(this._transport, e, t);
            }
            setAudioOutputDevice(e, t) {
              return Object(c.g)(this._transport, e, t);
            }
            setVideoInputDevice(e, t) {
              return Object(c.h)(this._transport, e, t);
            }
            _getElectronPopupsConfig() {
              return Promise.resolve(a);
            }
          }
        }.call(this, "modules/API/external/external_api.js");
    },
    function(e, t, n) {
      var s = n(4);
      function i(e, t) {
        (this.logStorage = e),
          (this.stringifyObjects =
            !(!t || !t.stringifyObjects) && t.stringifyObjects),
          (this.storeInterval = t && t.storeInterval ? t.storeInterval : 3e4),
          (this.maxEntryLength =
            t && t.maxEntryLength ? t.maxEntryLength : 1e4),
          Object.keys(s.levels).forEach(
            function(e) {
              this[s.levels[e]] = function(e) {
                this._log.apply(this, arguments);
              }.bind(this, e);
            }.bind(this)
          ),
          (this.storeLogsIntervalID = null),
          (this.queue = []),
          (this.totalLen = 0),
          (this.outputCache = []);
      }
      (i.prototype.stringify = function(e) {
        try {
          return JSON.stringify(e);
        } catch (e) {
          return "[object with circular refs?]";
        }
      }),
        (i.prototype.formatLogMessage = function(e) {
          for (var t = "", n = 1, i = arguments.length; n < i; n++) {
            var r = arguments[n];
            (!this.stringifyObjects && e !== s.levels.ERROR) ||
              "object" != typeof r ||
              (r = this.stringify(r)),
              (t += r),
              n != i - 1 && (t += " ");
          }
          return t.length ? t : null;
        }),
        (i.prototype._log = function() {
          var e = this.formatLogMessage.apply(this, arguments);
          if (e) {
            var t = this.queue.length
              ? this.queue[this.queue.length - 1]
              : void 0;
            ("object" == typeof t ? t.text : t) == e
              ? "object" == typeof t
                ? (t.count += 1)
                : (this.queue[this.queue.length - 1] = { text: e, count: 2 })
              : (this.queue.push(e), (this.totalLen += e.length));
          }
          this.totalLen >= this.maxEntryLength && this._flush(!0, !0);
        }),
        (i.prototype.start = function() {
          this._reschedulePublishInterval();
        }),
        (i.prototype._reschedulePublishInterval = function() {
          this.storeLogsIntervalID &&
            (window.clearTimeout(this.storeLogsIntervalID),
            (this.storeLogsIntervalID = null)),
            (this.storeLogsIntervalID = window.setTimeout(
              this._flush.bind(this, !1, !0),
              this.storeInterval
            ));
        }),
        (i.prototype.flush = function() {
          this._flush(!1, !0);
        }),
        (i.prototype._flush = function(e, t) {
          this.totalLen > 0 &&
            (this.logStorage.isReady() || e) &&
            (this.logStorage.isReady()
              ? (this.outputCache.length &&
                  (this.outputCache.forEach(
                    function(e) {
                      this.logStorage.storeLogs(e);
                    }.bind(this)
                  ),
                  (this.outputCache = [])),
                this.logStorage.storeLogs(this.queue))
              : this.outputCache.push(this.queue),
            (this.queue = []),
            (this.totalLen = 0)),
            t && this._reschedulePublishInterval();
        }),
        (i.prototype.stop = function() {
          this._flush(!1, !1);
        }),
        (e.exports = i);
    }
  ]);
});
//# sourceMappingURL=external_api.min.map
