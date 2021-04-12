(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e.Popper = t());
})(this, function () {
  "use strict";
  function e(e) {
    return e && "[object Function]" === {}.toString.call(e);
  }
  function t(e, t) {
    if (1 !== e.nodeType) return [];
    var o = getComputedStyle(e, null);
    return t ? o[t] : o;
  }
  function o(e) {
    return "HTML" === e.nodeName ? e : e.parentNode || e.host;
  }
  function n(e) {
    if (!e) return document.body;
    switch (e.nodeName) {
      case "HTML":
      case "BODY":
        return e.ownerDocument.body;
      case "#document":
        return e.body;
    }
    var i = t(e),
      r = i.overflow,
      p = i.overflowX,
      s = i.overflowY;
    return /(auto|scroll|overlay)/.test(r + s + p) ? e : n(o(e));
  }
  function r(e) {
    return 11 === e ? re : 10 === e ? pe : re || pe;
  }
  function p(e) {
    if (!e) return document.documentElement;
    for (
      var o = r(10) ? document.body : null, n = e.offsetParent;
      n === o && e.nextElementSibling;

    )
      n = (e = e.nextElementSibling).offsetParent;
    var i = n && n.nodeName;
    return i && "BODY" !== i && "HTML" !== i
      ? -1 !== ["TD", "TABLE"].indexOf(n.nodeName) &&
        "static" === t(n, "position")
        ? p(n)
        : n
      : e
      ? e.ownerDocument.documentElement
      : document.documentElement;
  }
  function s(e) {
    var t = e.nodeName;
    return "BODY" !== t && ("HTML" === t || p(e.firstElementChild) === e);
  }
  function d(e) {
    return null === e.parentNode ? e : d(e.parentNode);
  }
  function a(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
    var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
      n = o ? e : t,
      i = o ? t : e,
      r = document.createRange();
    r.setStart(n, 0), r.setEnd(i, 0);
    var l = r.commonAncestorContainer;
    if ((e !== l && t !== l) || n.contains(i)) return s(l) ? l : p(l);
    var f = d(e);
    return f.host ? a(f.host, t) : a(e, d(t).host);
  }
  function l(e) {
    var t =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
      o = "top" === t ? "scrollTop" : "scrollLeft",
      n = e.nodeName;
    if ("BODY" === n || "HTML" === n) {
      var i = e.ownerDocument.documentElement,
        r = e.ownerDocument.scrollingElement || i;
      return r[o];
    }
    return e[o];
  }
  function f(e, t) {
    var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
      n = l(t, "top"),
      i = l(t, "left"),
      r = o ? -1 : 1;
    return (
      (e.top += n * r),
      (e.bottom += n * r),
      (e.left += i * r),
      (e.right += i * r),
      e
    );
  }
  function m(e, t) {
    var o = "x" === t ? "Left" : "Top",
      n = "Left" == o ? "Right" : "Bottom";
    return (
      parseFloat(e["border" + o + "Width"], 10) +
      parseFloat(e["border" + n + "Width"], 10)
    );
  }
  function h(e, t, o, n) {
    return $(
      t["offset" + e],
      t["scroll" + e],
      o["client" + e],
      o["offset" + e],
      o["scroll" + e],
      r(10)
        ? o["offset" + e] +
            n["margin" + ("Height" === e ? "Top" : "Left")] +
            n["margin" + ("Height" === e ? "Bottom" : "Right")]
        : 0
    );
  }
  function c() {
    var e = document.body,
      t = document.documentElement,
      o = r(10) && getComputedStyle(t);
    return { height: h("Height", e, t, o), width: h("Width", e, t, o) };
  }
  function g(e) {
    return le({}, e, { right: e.left + e.width, bottom: e.top + e.height });
  }
  function u(e) {
    var o = {};
    try {
      if (r(10)) {
        o = e.getBoundingClientRect();
        var n = l(e, "top"),
          i = l(e, "left");
        (o.top += n), (o.left += i), (o.bottom += n), (o.right += i);
      } else o = e.getBoundingClientRect();
    } catch (t) {}
    var p = {
        left: o.left,
        top: o.top,
        width: o.right - o.left,
        height: o.bottom - o.top,
      },
      s = "HTML" === e.nodeName ? c() : {},
      d = s.width || e.clientWidth || p.right - p.left,
      a = s.height || e.clientHeight || p.bottom - p.top,
      f = e.offsetWidth - d,
      h = e.offsetHeight - a;
    if (f || h) {
      var u = t(e);
      (f -= m(u, "x")), (h -= m(u, "y")), (p.width -= f), (p.height -= h);
    }
    return g(p);
  }
  function b(e, o) {
    var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
      p = r(10),
      s = "HTML" === o.nodeName,
      d = u(e),
      a = u(o),
      l = n(e),
      m = t(o),
      h = parseFloat(m.borderTopWidth, 10),
      c = parseFloat(m.borderLeftWidth, 10);
    i &&
      "HTML" === o.nodeName &&
      ((a.top = $(a.top, 0)), (a.left = $(a.left, 0)));
    var b = g({
      top: d.top - a.top - h,
      left: d.left - a.left - c,
      width: d.width,
      height: d.height,
    });
    if (((b.marginTop = 0), (b.marginLeft = 0), !p && s)) {
      var y = parseFloat(m.marginTop, 10),
        w = parseFloat(m.marginLeft, 10);
      (b.top -= h - y),
        (b.bottom -= h - y),
        (b.left -= c - w),
        (b.right -= c - w),
        (b.marginTop = y),
        (b.marginLeft = w);
    }
    return (
      (p && !i ? o.contains(l) : o === l && "BODY" !== l.nodeName) &&
        (b = f(b, o)),
      b
    );
  }
  function y(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
      o = e.ownerDocument.documentElement,
      n = b(e, o),
      i = $(o.clientWidth, window.innerWidth || 0),
      r = $(o.clientHeight, window.innerHeight || 0),
      p = t ? 0 : l(o),
      s = t ? 0 : l(o, "left"),
      d = {
        top: p - n.top + n.marginTop,
        left: s - n.left + n.marginLeft,
        width: i,
        height: r,
      };
    return g(d);
  }
  function w(e) {
    var n = e.nodeName;
    return "BODY" === n || "HTML" === n
      ? !1
      : "fixed" === t(e, "position") || w(o(e));
  }
  function E(e) {
    if (!e || !e.parentElement || r()) return document.documentElement;
    for (var o = e.parentElement; o && "none" === t(o, "transform"); )
      o = o.parentElement;
    return o || document.documentElement;
  }
  function v(e, t, i, r) {
    var p = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
      s = { top: 0, left: 0 },
      d = p ? E(e) : a(e, t);
    if ("viewport" === r) s = y(d, p);
    else {
      var l;
      "scrollParent" === r
        ? ((l = n(o(t))),
          "BODY" === l.nodeName && (l = e.ownerDocument.documentElement))
        : "window" === r
        ? (l = e.ownerDocument.documentElement)
        : (l = r);
      var f = b(l, d, p);
      if ("HTML" === l.nodeName && !w(d)) {
        var m = c(),
          h = m.height,
          g = m.width;
        (s.top += f.top - f.marginTop),
          (s.bottom = h + f.top),
          (s.left += f.left - f.marginLeft),
          (s.right = g + f.left);
      } else s = f;
    }
    return (s.left += i), (s.top += i), (s.right -= i), (s.bottom -= i), s;
  }
  function x(e) {
    var t = e.width,
      o = e.height;
    return t * o;
  }
  function O(e, t, o, n, i) {
    var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === e.indexOf("auto")) return e;
    var p = v(o, n, r, i),
      s = {
        top: { width: p.width, height: t.top - p.top },
        right: { width: p.right - t.right, height: p.height },
        bottom: { width: p.width, height: p.bottom - t.bottom },
        left: { width: t.left - p.left, height: p.height },
      },
      d = Object.keys(s)
        .map(function (e) {
          return le({ key: e }, s[e], { area: x(s[e]) });
        })
        .sort(function (e, t) {
          return t.area - e.area;
        }),
      a = d.filter(function (e) {
        var t = e.width,
          n = e.height;
        return t >= o.clientWidth && n >= o.clientHeight;
      }),
      l = 0 < a.length ? a[0].key : d[0].key,
      f = e.split("-")[1];
    return l + (f ? "-" + f : "");
  }
  function L(e, t, o) {
    var n =
        3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
      i = n ? E(t) : a(t, o);
    return b(o, i, n);
  }
  function S(e) {
    var t = getComputedStyle(e),
      o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
      n = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
      i = { width: e.offsetWidth + n, height: e.offsetHeight + o };
    return i;
  }
  function T(e) {
    var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
    return e.replace(/left|right|bottom|top/g, function (e) {
      return t[e];
    });
  }
  function C(e, t, o) {
    o = o.split("-")[0];
    var n = S(e),
      i = { width: n.width, height: n.height },
      r = -1 !== ["right", "left"].indexOf(o),
      p = r ? "top" : "left",
      s = r ? "left" : "top",
      d = r ? "height" : "width",
      a = r ? "width" : "height";
    return (
      (i[p] = t[p] + t[d] / 2 - n[d] / 2),
      (i[s] = o === s ? t[s] - n[a] : t[T(s)]),
      i
    );
  }
  function D(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0];
  }
  function N(e, t, o) {
    if (Array.prototype.findIndex)
      return e.findIndex(function (e) {
        return e[t] === o;
      });
    var n = D(e, function (e) {
      return e[t] === o;
    });
    return e.indexOf(n);
  }
  function P(t, o, n) {
    var i = void 0 === n ? t : t.slice(0, N(t, "name", n));
    return (
      i.forEach(function (t) {
        t["function"] &&
          console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
        var n = t["function"] || t.fn;
        t.enabled &&
          e(n) &&
          ((o.offsets.popper = g(o.offsets.popper)),
          (o.offsets.reference = g(o.offsets.reference)),
          (o = n(o, t)));
      }),
      o
    );
  }
  function k() {
    if (!this.state.isDestroyed) {
      var e = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {},
      };
      (e.offsets.reference = L(
        this.state,
        this.popper,
        this.reference,
        this.options.positionFixed
      )),
        (e.placement = O(
          this.options.placement,
          e.offsets.reference,
          this.popper,
          this.reference,
          this.options.modifiers.flip.boundariesElement,
          this.options.modifiers.flip.padding
        )),
        (e.originalPlacement = e.placement),
        (e.positionFixed = this.options.positionFixed),
        (e.offsets.popper = C(this.popper, e.offsets.reference, e.placement)),
        (e.offsets.popper.position = this.options.positionFixed
          ? "fixed"
          : "absolute"),
        (e = P(this.modifiers, e)),
        this.state.isCreated
          ? this.options.onUpdate(e)
          : ((this.state.isCreated = !0), this.options.onCreate(e));
    }
  }
  function W(e, t) {
    return e.some(function (e) {
      var o = e.name,
        n = e.enabled;
      return n && o === t;
    });
  }
  function B(e) {
    for (
      var t = [!1, "ms", "Webkit", "Moz", "O"],
        o = e.charAt(0).toUpperCase() + e.slice(1),
        n = 0;
      n < t.length;
      n++
    ) {
      var i = t[n],
        r = i ? "" + i + o : e;
      if ("undefined" != typeof document.body.style[r]) return r;
    }
    return null;
  }
  function H() {
    return (
      (this.state.isDestroyed = !0),
      W(this.modifiers, "applyStyle") &&
        (this.popper.removeAttribute("x-placement"),
        (this.popper.style.position = ""),
        (this.popper.style.top = ""),
        (this.popper.style.left = ""),
        (this.popper.style.right = ""),
        (this.popper.style.bottom = ""),
        (this.popper.style.willChange = ""),
        (this.popper.style[B("transform")] = "")),
      this.disableEventListeners(),
      this.options.removeOnDestroy &&
        this.popper.parentNode.removeChild(this.popper),
      this
    );
  }
  function A(e) {
    var t = e.ownerDocument;
    return t ? t.defaultView : window;
  }
  function M(e, t, o, i) {
    var r = "BODY" === e.nodeName,
      p = r ? e.ownerDocument.defaultView : e;
    p.addEventListener(t, o, { passive: !0 }),
      r || M(n(p.parentNode), t, o, i),
      i.push(p);
  }
  function I(e, t, o, i) {
    (o.updateBound = i),
      A(e).addEventListener("resize", o.updateBound, { passive: !0 });
    var r = n(e);
    return (
      M(r, "scroll", o.updateBound, o.scrollParents),
      (o.scrollElement = r),
      (o.eventsEnabled = !0),
      o
    );
  }
  function F() {
    this.state.eventsEnabled ||
      (this.state = I(
        this.reference,
        this.options,
        this.state,
        this.scheduleUpdate
      ));
  }
  function R(e, t) {
    return (
      A(e).removeEventListener("resize", t.updateBound),
      t.scrollParents.forEach(function (e) {
        e.removeEventListener("scroll", t.updateBound);
      }),
      (t.updateBound = null),
      (t.scrollParents = []),
      (t.scrollElement = null),
      (t.eventsEnabled = !1),
      t
    );
  }
  function U() {
    this.state.eventsEnabled &&
      (cancelAnimationFrame(this.scheduleUpdate),
      (this.state = R(this.reference, this.state)));
  }
  function Y(e) {
    return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
  }
  function j(e, t) {
    Object.keys(t).forEach(function (o) {
      var n = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(o) &&
        Y(t[o]) &&
        (n = "px"),
        (e.style[o] = t[o] + n);
    });
  }
  function K(e, t) {
    Object.keys(t).forEach(function (o) {
      var n = t[o];
      !1 === n ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
    });
  }
  function q(e, t, o) {
    var n = D(e, function (e) {
        var o = e.name;
        return o === t;
      }),
      i =
        !!n &&
        e.some(function (e) {
          return e.name === o && e.enabled && e.order < n.order;
        });
    if (!i) {
      var r = "`" + t + "`";
      console.warn(
        "`" +
          o +
          "`" +
          " modifier is required by " +
          r +
          " modifier in order to work, be sure to include it before " +
          r +
          "!"
      );
    }
    return i;
  }
  function G(e) {
    return "end" === e ? "start" : "start" === e ? "end" : e;
  }
  function z(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
      o = me.indexOf(e),
      n = me.slice(o + 1).concat(me.slice(0, o));
    return t ? n.reverse() : n;
  }
  function V(e, t, o, n) {
    var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
      r = +i[1],
      p = i[2];
    if (!r) return e;
    if (0 === p.indexOf("%")) {
      var s;
      switch (p) {
        case "%p":
          s = o;
          break;
        case "%":
        case "%r":
        default:
          s = n;
      }
      var d = g(s);
      return (d[t] / 100) * r;
    }
    if ("vh" === p || "vw" === p) {
      var a;
      return (
        (a =
          "vh" === p
            ? $(document.documentElement.clientHeight, window.innerHeight || 0)
            : $(document.documentElement.clientWidth, window.innerWidth || 0)),
        (a / 100) * r
      );
    }
    return r;
  }
  function _(e, t, o, n) {
    var i = [0, 0],
      r = -1 !== ["right", "left"].indexOf(n),
      p = e.split(/(\+|\-)/).map(function (e) {
        return e.trim();
      }),
      s = p.indexOf(
        D(p, function (e) {
          return -1 !== e.search(/,|\s/);
        })
      );
    p[s] &&
      -1 === p[s].indexOf(",") &&
      console.warn(
        "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
      );
    var d = /\s*,\s*|\s+/,
      a =
        -1 === s
          ? [p]
          : [
              p.slice(0, s).concat([p[s].split(d)[0]]),
              [p[s].split(d)[1]].concat(p.slice(s + 1)),
            ];
    return (
      (a = a.map(function (e, n) {
        var i = (1 === n ? !r : r) ? "height" : "width",
          p = !1;
        return e
          .reduce(function (e, t) {
            return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t)
              ? ((e[e.length - 1] = t), (p = !0), e)
              : p
              ? ((e[e.length - 1] += t), (p = !1), e)
              : e.concat(t);
          }, [])
          .map(function (e) {
            return V(e, i, t, o);
          });
      })),
      a.forEach(function (e, t) {
        e.forEach(function (o, n) {
          Y(o) && (i[t] += o * ("-" === e[n - 1] ? -1 : 1));
        });
      }),
      i
    );
  }
  function X(e, t) {
    var o,
      n = t.offset,
      i = e.placement,
      r = e.offsets,
      p = r.popper,
      s = r.reference,
      d = i.split("-")[0];
    return (
      (o = Y(+n) ? [+n, 0] : _(n, p, s, d)),
      "left" === d
        ? ((p.top += o[0]), (p.left -= o[1]))
        : "right" === d
        ? ((p.top += o[0]), (p.left += o[1]))
        : "top" === d
        ? ((p.left += o[0]), (p.top -= o[1]))
        : "bottom" === d && ((p.left += o[0]), (p.top += o[1])),
      (e.popper = p),
      e
    );
  }
  for (
    var J = Math.min,
      Q = Math.round,
      Z = Math.floor,
      $ = Math.max,
      ee = "undefined" != typeof window && "undefined" != typeof document,
      te = ["Edge", "Trident", "Firefox"],
      oe = 0,
      ne = 0;
    ne < te.length;
    ne += 1
  )
    if (ee && 0 <= navigator.userAgent.indexOf(te[ne])) {
      oe = 1;
      break;
    }
  var i = ee && window.Promise,
    ie = i
      ? function (e) {
          var t = !1;
          return function () {
            t ||
              ((t = !0),
              window.Promise.resolve().then(function () {
                (t = !1), e();
              }));
          };
        }
      : function (e) {
          var t = !1;
          return function () {
            t ||
              ((t = !0),
              setTimeout(function () {
                (t = !1), e();
              }, oe));
          };
        },
    re = ee && !!(window.MSInputMethodContext && document.documentMode),
    pe = ee && /MSIE 10/.test(navigator.userAgent),
    se = function (e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    },
    de = (function () {
      function e(e, t) {
        for (var o, n = 0; n < t.length; n++)
          (o = t[n]),
            (o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            "value" in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o);
      }
      return function (t, o, n) {
        return o && e(t.prototype, o), n && e(t, n), t;
      };
    })(),
    ae = function (e, t, o) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: o,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = o),
        e
      );
    },
    le =
      Object.assign ||
      function (e) {
        for (var t, o = 1; o < arguments.length; o++)
          for (var n in ((t = arguments[o]), t))
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e;
      },
    fe = [
      "auto-start",
      "auto",
      "auto-end",
      "top-start",
      "top",
      "top-end",
      "right-start",
      "right",
      "right-end",
      "bottom-end",
      "bottom",
      "bottom-start",
      "left-end",
      "left",
      "left-start",
    ],
    me = fe.slice(3),
    he = {
      FLIP: "flip",
      CLOCKWISE: "clockwise",
      COUNTERCLOCKWISE: "counterclockwise",
    },
    ce = (function () {
      function t(o, n) {
        var i = this,
          r =
            2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        se(this, t),
          (this.scheduleUpdate = function () {
            return requestAnimationFrame(i.update);
          }),
          (this.update = ie(this.update.bind(this))),
          (this.options = le({}, t.Defaults, r)),
          (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
          (this.reference = o && o.jquery ? o[0] : o),
          (this.popper = n && n.jquery ? n[0] : n),
          (this.options.modifiers = {}),
          Object.keys(le({}, t.Defaults.modifiers, r.modifiers)).forEach(
            function (e) {
              i.options.modifiers[e] = le(
                {},
                t.Defaults.modifiers[e] || {},
                r.modifiers ? r.modifiers[e] : {}
              );
            }
          ),
          (this.modifiers = Object.keys(this.options.modifiers)
            .map(function (e) {
              return le({ name: e }, i.options.modifiers[e]);
            })
            .sort(function (e, t) {
              return e.order - t.order;
            })),
          this.modifiers.forEach(function (t) {
            t.enabled &&
              e(t.onLoad) &&
              t.onLoad(i.reference, i.popper, i.options, t, i.state);
          }),
          this.update();
        var p = this.options.eventsEnabled;
        p && this.enableEventListeners(), (this.state.eventsEnabled = p);
      }
      return (
        de(t, [
          {
            key: "update",
            value: function () {
              return k.call(this);
            },
          },
          {
            key: "destroy",
            value: function () {
              return H.call(this);
            },
          },
          {
            key: "enableEventListeners",
            value: function () {
              return F.call(this);
            },
          },
          {
            key: "disableEventListeners",
            value: function () {
              return U.call(this);
            },
          },
        ]),
        t
      );
    })();
  return (
    (ce.Utils = ("undefined" == typeof window ? global : window).PopperUtils),
    (ce.placements = fe),
    (ce.Defaults = {
      placement: "bottom",
      positionFixed: !1,
      eventsEnabled: !0,
      removeOnDestroy: !1,
      onCreate: function () {},
      onUpdate: function () {},
      modifiers: {
        shift: {
          order: 100,
          enabled: !0,
          fn: function (e) {
            var t = e.placement,
              o = t.split("-")[0],
              n = t.split("-")[1];
            if (n) {
              var i = e.offsets,
                r = i.reference,
                p = i.popper,
                s = -1 !== ["bottom", "top"].indexOf(o),
                d = s ? "left" : "top",
                a = s ? "width" : "height",
                l = {
                  start: ae({}, d, r[d]),
                  end: ae({}, d, r[d] + r[a] - p[a]),
                };
              e.offsets.popper = le({}, p, l[n]);
            }
            return e;
          },
        },
        offset: { order: 200, enabled: !0, fn: X, offset: 0 },
        preventOverflow: {
          order: 300,
          enabled: !0,
          fn: function (e, t) {
            var o = t.boundariesElement || p(e.instance.popper);
            e.instance.reference === o && (o = p(o));
            var n = B("transform"),
              i = e.instance.popper.style,
              r = i.top,
              s = i.left,
              d = i[n];
            (i.top = ""), (i.left = ""), (i[n] = "");
            var a = v(
              e.instance.popper,
              e.instance.reference,
              t.padding,
              o,
              e.positionFixed
            );
            (i.top = r), (i.left = s), (i[n] = d), (t.boundaries = a);
            var l = t.priority,
              f = e.offsets.popper,
              m = {
                primary: function (e) {
                  var o = f[e];
                  return (
                    f[e] < a[e] &&
                      !t.escapeWithReference &&
                      (o = $(f[e], a[e])),
                    ae({}, e, o)
                  );
                },
                secondary: function (e) {
                  var o = "right" === e ? "left" : "top",
                    n = f[o];
                  return (
                    f[e] > a[e] &&
                      !t.escapeWithReference &&
                      (n = J(
                        f[o],
                        a[e] - ("right" === e ? f.width : f.height)
                      )),
                    ae({}, o, n)
                  );
                },
              };
            return (
              l.forEach(function (e) {
                var t =
                  -1 === ["left", "top"].indexOf(e) ? "secondary" : "primary";
                f = le({}, f, m[t](e));
              }),
              (e.offsets.popper = f),
              e
            );
          },
          priority: ["left", "right", "top", "bottom"],
          padding: 5,
          boundariesElement: "scrollParent",
        },
        keepTogether: {
          order: 400,
          enabled: !0,
          fn: function (e) {
            var t = e.offsets,
              o = t.popper,
              n = t.reference,
              i = e.placement.split("-")[0],
              r = Z,
              p = -1 !== ["top", "bottom"].indexOf(i),
              s = p ? "right" : "bottom",
              d = p ? "left" : "top",
              a = p ? "width" : "height";
            return (
              o[s] < r(n[d]) && (e.offsets.popper[d] = r(n[d]) - o[a]),
              o[d] > r(n[s]) && (e.offsets.popper[d] = r(n[s])),
              e
            );
          },
        },
        arrow: {
          order: 500,
          enabled: !0,
          fn: function (e, o) {
            var n;
            if (!q(e.instance.modifiers, "arrow", "keepTogether")) return e;
            var i = o.element;
            if ("string" == typeof i) {
              if (((i = e.instance.popper.querySelector(i)), !i)) return e;
            } else if (!e.instance.popper.contains(i))
              return (
                console.warn(
                  "WARNING: `arrow.element` must be child of its popper element!"
                ),
                e
              );
            var r = e.placement.split("-")[0],
              p = e.offsets,
              s = p.popper,
              d = p.reference,
              a = -1 !== ["left", "right"].indexOf(r),
              l = a ? "height" : "width",
              f = a ? "Top" : "Left",
              m = f.toLowerCase(),
              h = a ? "left" : "top",
              c = a ? "bottom" : "right",
              u = S(i)[l];
            d[c] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[c] - u)),
              d[m] + u > s[c] && (e.offsets.popper[m] += d[m] + u - s[c]),
              (e.offsets.popper = g(e.offsets.popper));
            var b = d[m] + d[l] / 2 - u / 2,
              y = t(e.instance.popper),
              w = parseFloat(y["margin" + f], 10),
              E = parseFloat(y["border" + f + "Width"], 10),
              v = b - e.offsets.popper[m] - w - E;
            return (
              (v = $(J(s[l] - u, v), 0)),
              (e.arrowElement = i),
              (e.offsets.arrow = ((n = {}), ae(n, m, Q(v)), ae(n, h, ""), n)),
              e
            );
          },
          element: "[x-arrow]",
        },
        flip: {
          order: 600,
          enabled: !0,
          fn: function (e, t) {
            if (W(e.instance.modifiers, "inner")) return e;
            if (e.flipped && e.placement === e.originalPlacement) return e;
            var o = v(
                e.instance.popper,
                e.instance.reference,
                t.padding,
                t.boundariesElement,
                e.positionFixed
              ),
              n = e.placement.split("-")[0],
              i = T(n),
              r = e.placement.split("-")[1] || "",
              p = [];
            switch (t.behavior) {
              case he.FLIP:
                p = [n, i];
                break;
              case he.CLOCKWISE:
                p = z(n);
                break;
              case he.COUNTERCLOCKWISE:
                p = z(n, !0);
                break;
              default:
                p = t.behavior;
            }
            return (
              p.forEach(function (s, d) {
                if (n !== s || p.length === d + 1) return e;
                (n = e.placement.split("-")[0]), (i = T(n));
                var a = e.offsets.popper,
                  l = e.offsets.reference,
                  f = Z,
                  m =
                    ("left" === n && f(a.right) > f(l.left)) ||
                    ("right" === n && f(a.left) < f(l.right)) ||
                    ("top" === n && f(a.bottom) > f(l.top)) ||
                    ("bottom" === n && f(a.top) < f(l.bottom)),
                  h = f(a.left) < f(o.left),
                  c = f(a.right) > f(o.right),
                  g = f(a.top) < f(o.top),
                  u = f(a.bottom) > f(o.bottom),
                  b =
                    ("left" === n && h) ||
                    ("right" === n && c) ||
                    ("top" === n && g) ||
                    ("bottom" === n && u),
                  y = -1 !== ["top", "bottom"].indexOf(n),
                  w =
                    !!t.flipVariations &&
                    ((y && "start" === r && h) ||
                      (y && "end" === r && c) ||
                      (!y && "start" === r && g) ||
                      (!y && "end" === r && u));
                (m || b || w) &&
                  ((e.flipped = !0),
                  (m || b) && (n = p[d + 1]),
                  w && (r = G(r)),
                  (e.placement = n + (r ? "-" + r : "")),
                  (e.offsets.popper = le(
                    {},
                    e.offsets.popper,
                    C(e.instance.popper, e.offsets.reference, e.placement)
                  )),
                  (e = P(e.instance.modifiers, e, "flip")));
              }),
              e
            );
          },
          behavior: "flip",
          padding: 5,
          boundariesElement: "viewport",
        },
        inner: {
          order: 700,
          enabled: !1,
          fn: function (e) {
            var t = e.placement,
              o = t.split("-")[0],
              n = e.offsets,
              i = n.popper,
              r = n.reference,
              p = -1 !== ["left", "right"].indexOf(o),
              s = -1 === ["top", "left"].indexOf(o);
            return (
              (i[p ? "left" : "top"] =
                r[o] - (s ? i[p ? "width" : "height"] : 0)),
              (e.placement = T(t)),
              (e.offsets.popper = g(i)),
              e
            );
          },
        },
        hide: {
          order: 800,
          enabled: !0,
          fn: function (e) {
            if (!q(e.instance.modifiers, "hide", "preventOverflow")) return e;
            var t = e.offsets.reference,
              o = D(e.instance.modifiers, function (e) {
                return "preventOverflow" === e.name;
              }).boundaries;
            if (
              t.bottom < o.top ||
              t.left > o.right ||
              t.top > o.bottom ||
              t.right < o.left
            ) {
              if (!0 === e.hide) return e;
              (e.hide = !0), (e.attributes["x-out-of-boundaries"] = "");
            } else {
              if (!1 === e.hide) return e;
              (e.hide = !1), (e.attributes["x-out-of-boundaries"] = !1);
            }
            return e;
          },
        },
        computeStyle: {
          order: 850,
          enabled: !0,
          fn: function (e, t) {
            var o = t.x,
              n = t.y,
              i = e.offsets.popper,
              r = D(e.instance.modifiers, function (e) {
                return "applyStyle" === e.name;
              }).gpuAcceleration;
            void 0 !== r &&
              console.warn(
                "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
              );
            var s,
              d,
              a = void 0 === r ? t.gpuAcceleration : r,
              l = p(e.instance.popper),
              f = u(l),
              m = { position: i.position },
              h = {
                left: Z(i.left),
                top: Q(i.top),
                bottom: Q(i.bottom),
                right: Z(i.right),
              },
              c = "bottom" === o ? "top" : "bottom",
              g = "right" === n ? "left" : "right",
              b = B("transform");
            if (
              ((d = "bottom" == c ? -f.height + h.bottom : h.top),
              (s = "right" == g ? -f.width + h.right : h.left),
              a && b)
            )
              (m[b] = "translate3d(" + s + "px, " + d + "px, 0)"),
                (m[c] = 0),
                (m[g] = 0),
                (m.willChange = "transform");
            else {
              var y = "bottom" == c ? -1 : 1,
                w = "right" == g ? -1 : 1;
              (m[c] = d * y), (m[g] = s * w), (m.willChange = c + ", " + g);
            }
            var E = { "x-placement": e.placement };
            return (
              (e.attributes = le({}, E, e.attributes)),
              (e.styles = le({}, m, e.styles)),
              (e.arrowStyles = le({}, e.offsets.arrow, e.arrowStyles)),
              e
            );
          },
          gpuAcceleration: !0,
          x: "bottom",
          y: "right",
        },
        applyStyle: {
          order: 900,
          enabled: !0,
          fn: function (e) {
            return (
              j(e.instance.popper, e.styles),
              K(e.instance.popper, e.attributes),
              e.arrowElement &&
                Object.keys(e.arrowStyles).length &&
                j(e.arrowElement, e.arrowStyles),
              e
            );
          },
          onLoad: function (e, t, o, n, i) {
            var r = L(i, t, e, o.positionFixed),
              p = O(
                o.placement,
                r,
                t,
                e,
                o.modifiers.flip.boundariesElement,
                o.modifiers.flip.padding
              );
            return (
              t.setAttribute("x-placement", p),
              j(t, { position: o.positionFixed ? "fixed" : "absolute" }),
              o
            );
          },
          gpuAcceleration: void 0,
        },
      },
    }),
    ce
  );
});
/*!
 * Bootstrap v4.1.1 (https://getbootstrap.com/)
 * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */ !(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports, require("jquery"), require("popper.js"))
    : "function" == typeof define && define.amd
    ? define(["exports", "jquery", "popper.js"], e)
    : e((t.bootstrap = {}), t.jQuery, t.Popper);
})(this, function (t, e, c) {
  "use strict";
  function i(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(t, i.key, i);
    }
  }
  function o(t, e, n) {
    return e && i(t.prototype, e), n && i(t, n), t;
  }
  function h(r) {
    for (var t = 1; t < arguments.length; t++) {
      var s = null != arguments[t] ? arguments[t] : {},
        e = Object.keys(s);
      "function" == typeof Object.getOwnPropertySymbols &&
        (e = e.concat(
          Object.getOwnPropertySymbols(s).filter(function (t) {
            return Object.getOwnPropertyDescriptor(s, t).enumerable;
          })
        )),
        e.forEach(function (t) {
          var e, n, i;
          (e = r),
            (i = s[(n = t)]),
            n in e
              ? Object.defineProperty(e, n, {
                  value: i,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[n] = i);
        });
    }
    return r;
  }
  (e = e && e.hasOwnProperty("default") ? e.default : e),
    (c = c && c.hasOwnProperty("default") ? c.default : c);
  var r,
    n,
    s,
    a,
    l,
    u,
    f,
    d,
    _,
    g,
    m,
    p,
    v,
    E,
    y,
    T,
    C,
    I,
    A,
    D,
    b,
    S,
    w,
    N,
    O,
    k,
    P,
    L,
    j,
    R,
    H,
    W,
    M,
    x,
    U,
    K,
    F,
    V,
    Q,
    B,
    Y,
    G,
    q,
    z,
    X,
    J,
    Z,
    $,
    tt,
    et,
    nt,
    it,
    rt,
    st,
    ot,
    at,
    lt,
    ht,
    ct,
    ut,
    ft,
    dt,
    _t,
    gt,
    mt,
    pt,
    vt,
    Et,
    yt,
    Tt,
    Ct,
    It,
    At,
    Dt,
    bt,
    St,
    wt,
    Nt,
    Ot,
    kt,
    Pt,
    Lt,
    jt,
    Rt,
    Ht,
    Wt,
    Mt,
    xt,
    Ut,
    Kt,
    Ft,
    Vt,
    Qt,
    Bt,
    Yt,
    Gt,
    qt,
    zt,
    Xt,
    Jt,
    Zt,
    $t,
    te,
    ee,
    ne,
    ie,
    re,
    se,
    oe,
    ae,
    le,
    he,
    ce,
    ue,
    fe,
    de,
    _e,
    ge,
    me,
    pe,
    ve,
    Ee,
    ye,
    Te,
    Ce,
    Ie,
    Ae,
    De,
    be,
    Se,
    we,
    Ne,
    Oe,
    ke,
    Pe,
    Le,
    je,
    Re,
    He,
    We,
    Me,
    xe,
    Ue,
    Ke,
    Fe,
    Ve,
    Qe,
    Be,
    Ye,
    Ge,
    qe,
    ze,
    Xe,
    Je,
    Ze,
    $e,
    tn,
    en,
    nn,
    rn,
    sn,
    on,
    an,
    ln,
    hn,
    cn,
    un,
    fn,
    dn,
    _n,
    gn,
    mn,
    pn,
    vn,
    En,
    yn,
    Tn,
    Cn = (function (i) {
      var e = "transitionend";
      function t(t) {
        var e = this,
          n = !1;
        return (
          i(this).one(l.TRANSITION_END, function () {
            n = !0;
          }),
          setTimeout(function () {
            n || l.triggerTransitionEnd(e);
          }, t),
          this
        );
      }
      var l = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function (t) {
          for (; (t += ~~(1e6 * Math.random())), document.getElementById(t); );
          return t;
        },
        getSelectorFromElement: function (t) {
          var e = t.getAttribute("data-target");
          (e && "#" !== e) || (e = t.getAttribute("href") || "");
          try {
            return 0 < i(document).find(e).length ? e : null;
          } catch (t) {
            return null;
          }
        },
        getTransitionDurationFromElement: function (t) {
          if (!t) return 0;
          var e = i(t).css("transition-duration");
          return parseFloat(e)
            ? ((e = e.split(",")[0]), 1e3 * parseFloat(e))
            : 0;
        },
        reflow: function (t) {
          return t.offsetHeight;
        },
        triggerTransitionEnd: function (t) {
          i(t).trigger(e);
        },
        supportsTransitionEnd: function () {
          return Boolean(e);
        },
        isElement: function (t) {
          return (t[0] || t).nodeType;
        },
        typeCheckConfig: function (t, e, n) {
          for (var i in n)
            if (Object.prototype.hasOwnProperty.call(n, i)) {
              var r = n[i],
                s = e[i],
                o =
                  s && l.isElement(s)
                    ? "element"
                    : ((a = s),
                      {}.toString
                        .call(a)
                        .match(/\s([a-z]+)/i)[1]
                        .toLowerCase());
              if (!new RegExp(r).test(o))
                throw new Error(
                  t.toUpperCase() +
                    ': Option "' +
                    i +
                    '" provided type "' +
                    o +
                    '" but expected type "' +
                    r +
                    '".'
                );
            }
          var a;
        },
      };
      return (
        (i.fn.emulateTransitionEnd = t),
        (i.event.special[l.TRANSITION_END] = {
          bindType: e,
          delegateType: e,
          handle: function (t) {
            if (i(t.target).is(this))
              return t.handleObj.handler.apply(this, arguments);
          },
        }),
        l
      );
    })(e),
    In =
      ((n = "alert"),
      (a = "." + (s = "bs.alert")),
      (l = (r = e).fn[n]),
      (u = {
        CLOSE: "close" + a,
        CLOSED: "closed" + a,
        CLICK_DATA_API: "click" + a + ".data-api",
      }),
      (f = "alert"),
      (d = "fade"),
      (_ = "show"),
      (g = (function () {
        function i(t) {
          this._element = t;
        }
        var t = i.prototype;
        return (
          (t.close = function (t) {
            var e = this._element;
            t && (e = this._getRootElement(t)),
              this._triggerCloseEvent(e).isDefaultPrevented() ||
                this._removeElement(e);
          }),
          (t.dispose = function () {
            r.removeData(this._element, s), (this._element = null);
          }),
          (t._getRootElement = function (t) {
            var e = Cn.getSelectorFromElement(t),
              n = !1;
            return e && (n = r(e)[0]), n || (n = r(t).closest("." + f)[0]), n;
          }),
          (t._triggerCloseEvent = function (t) {
            var e = r.Event(u.CLOSE);
            return r(t).trigger(e), e;
          }),
          (t._removeElement = function (e) {
            var n = this;
            if ((r(e).removeClass(_), r(e).hasClass(d))) {
              var t = Cn.getTransitionDurationFromElement(e);
              r(e)
                .one(Cn.TRANSITION_END, function (t) {
                  return n._destroyElement(e, t);
                })
                .emulateTransitionEnd(t);
            } else this._destroyElement(e);
          }),
          (t._destroyElement = function (t) {
            r(t).detach().trigger(u.CLOSED).remove();
          }),
          (i._jQueryInterface = function (n) {
            return this.each(function () {
              var t = r(this),
                e = t.data(s);
              e || ((e = new i(this)), t.data(s, e)),
                "close" === n && e[n](this);
            });
          }),
          (i._handleDismiss = function (e) {
            return function (t) {
              t && t.preventDefault(), e.close(this);
            };
          }),
          o(i, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.1";
              },
            },
          ]),
          i
        );
      })()),
      r(document).on(
        u.CLICK_DATA_API,
        '[data-dismiss="alert"]',
        g._handleDismiss(new g())
      ),
      (r.fn[n] = g._jQueryInterface),
      (r.fn[n].Constructor = g),
      (r.fn[n].noConflict = function () {
        return (r.fn[n] = l), g._jQueryInterface;
      }),
      g),
    An =
      ((p = "button"),
      (E = "." + (v = "bs.button")),
      (y = ".data-api"),
      (T = (m = e).fn[p]),
      (C = "active"),
      (I = "btn"),
      (D = '[data-toggle^="button"]'),
      (b = '[data-toggle="buttons"]'),
      (S = "input"),
      (w = ".active"),
      (N = ".btn"),
      (O = {
        CLICK_DATA_API: "click" + E + y,
        FOCUS_BLUR_DATA_API: (A = "focus") + E + y + " blur" + E + y,
      }),
      (k = (function () {
        function n(t) {
          this._element = t;
        }
        var t = n.prototype;
        return (
          (t.toggle = function () {
            var t = !0,
              e = !0,
              n = m(this._element).closest(b)[0];
            if (n) {
              var i = m(this._element).find(S)[0];
              if (i) {
                if ("radio" === i.type)
                  if (i.checked && m(this._element).hasClass(C)) t = !1;
                  else {
                    var r = m(n).find(w)[0];
                    r && m(r).removeClass(C);
                  }
                if (t) {
                  if (
                    i.hasAttribute("disabled") ||
                    n.hasAttribute("disabled") ||
                    i.classList.contains("disabled") ||
                    n.classList.contains("disabled")
                  )
                    return;
                  (i.checked = !m(this._element).hasClass(C)),
                    m(i).trigger("change");
                }
                i.focus(), (e = !1);
              }
            }
            e &&
              this._element.setAttribute(
                "aria-pressed",
                !m(this._element).hasClass(C)
              ),
              t && m(this._element).toggleClass(C);
          }),
          (t.dispose = function () {
            m.removeData(this._element, v), (this._element = null);
          }),
          (n._jQueryInterface = function (e) {
            return this.each(function () {
              var t = m(this).data(v);
              t || ((t = new n(this)), m(this).data(v, t)),
                "toggle" === e && t[e]();
            });
          }),
          o(n, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.1";
              },
            },
          ]),
          n
        );
      })()),
      m(document)
        .on(O.CLICK_DATA_API, D, function (t) {
          t.preventDefault();
          var e = t.target;
          m(e).hasClass(I) || (e = m(e).closest(N)),
            k._jQueryInterface.call(m(e), "toggle");
        })
        .on(O.FOCUS_BLUR_DATA_API, D, function (t) {
          var e = m(t.target).closest(N)[0];
          m(e).toggleClass(A, /^focus(in)?$/.test(t.type));
        }),
      (m.fn[p] = k._jQueryInterface),
      (m.fn[p].Constructor = k),
      (m.fn[p].noConflict = function () {
        return (m.fn[p] = T), k._jQueryInterface;
      }),
      k),
    Dn =
      ((L = "carousel"),
      (R = "." + (j = "bs.carousel")),
      (H = ".data-api"),
      (W = (P = e).fn[L]),
      (M = {
        interval: 5e3,
        keyboard: !0,
        slide: !1,
        pause: "hover",
        wrap: !0,
      }),
      (x = {
        interval: "(number|boolean)",
        keyboard: "boolean",
        slide: "(boolean|string)",
        pause: "(string|boolean)",
        wrap: "boolean",
      }),
      (U = "next"),
      (K = "prev"),
      (F = "left"),
      (V = "right"),
      (Q = {
        SLIDE: "slide" + R,
        SLID: "slid" + R,
        KEYDOWN: "keydown" + R,
        MOUSEENTER: "mouseenter" + R,
        MOUSELEAVE: "mouseleave" + R,
        TOUCHEND: "touchend" + R,
        LOAD_DATA_API: "load" + R + H,
        CLICK_DATA_API: "click" + R + H,
      }),
      (B = "carousel"),
      (Y = "active"),
      (G = "slide"),
      (q = "carousel-item-right"),
      (z = "carousel-item-left"),
      (X = "carousel-item-next"),
      (J = "carousel-item-prev"),
      (Z = {
        ACTIVE: ".active",
        ACTIVE_ITEM: ".active.carousel-item",
        ITEM: ".carousel-item",
        NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
        INDICATORS: ".carousel-indicators",
        DATA_SLIDE: "[data-slide], [data-slide-to]",
        DATA_RIDE: '[data-ride="carousel"]',
      }),
      ($ = (function () {
        function s(t, e) {
          (this._items = null),
            (this._interval = null),
            (this._activeElement = null),
            (this._isPaused = !1),
            (this._isSliding = !1),
            (this.touchTimeout = null),
            (this._config = this._getConfig(e)),
            (this._element = P(t)[0]),
            (this._indicatorsElement = P(this._element).find(Z.INDICATORS)[0]),
            this._addEventListeners();
        }
        var t = s.prototype;
        return (
          (t.next = function () {
            this._isSliding || this._slide(U);
          }),
          (t.nextWhenVisible = function () {
            !document.hidden &&
              P(this._element).is(":visible") &&
              "hidden" !== P(this._element).css("visibility") &&
              this.next();
          }),
          (t.prev = function () {
            this._isSliding || this._slide(K);
          }),
          (t.pause = function (t) {
            t || (this._isPaused = !0),
              P(this._element).find(Z.NEXT_PREV)[0] &&
                (Cn.triggerTransitionEnd(this._element), this.cycle(!0)),
              clearInterval(this._interval),
              (this._interval = null);
          }),
          (t.cycle = function (t) {
            t || (this._isPaused = !1),
              this._interval &&
                (clearInterval(this._interval), (this._interval = null)),
              this._config.interval &&
                !this._isPaused &&
                (this._interval = setInterval(
                  (document.visibilityState
                    ? this.nextWhenVisible
                    : this.next
                  ).bind(this),
                  this._config.interval
                ));
          }),
          (t.to = function (t) {
            var e = this;
            this._activeElement = P(this._element).find(Z.ACTIVE_ITEM)[0];
            var n = this._getItemIndex(this._activeElement);
            if (!(t > this._items.length - 1 || t < 0))
              if (this._isSliding)
                P(this._element).one(Q.SLID, function () {
                  return e.to(t);
                });
              else {
                if (n === t) return this.pause(), void this.cycle();
                var i = n < t ? U : K;
                this._slide(i, this._items[t]);
              }
          }),
          (t.dispose = function () {
            P(this._element).off(R),
              P.removeData(this._element, j),
              (this._items = null),
              (this._config = null),
              (this._element = null),
              (this._interval = null),
              (this._isPaused = null),
              (this._isSliding = null),
              (this._activeElement = null),
              (this._indicatorsElement = null);
          }),
          (t._getConfig = function (t) {
            return (t = h({}, M, t)), Cn.typeCheckConfig(L, t, x), t;
          }),
          (t._addEventListeners = function () {
            var e = this;
            this._config.keyboard &&
              P(this._element).on(Q.KEYDOWN, function (t) {
                return e._keydown(t);
              }),
              "hover" === this._config.pause &&
                (P(this._element)
                  .on(Q.MOUSEENTER, function (t) {
                    return e.pause(t);
                  })
                  .on(Q.MOUSELEAVE, function (t) {
                    return e.cycle(t);
                  }),
                "ontouchstart" in document.documentElement &&
                  P(this._element).on(Q.TOUCHEND, function () {
                    e.pause(),
                      e.touchTimeout && clearTimeout(e.touchTimeout),
                      (e.touchTimeout = setTimeout(function (t) {
                        return e.cycle(t);
                      }, 500 + e._config.interval));
                  }));
          }),
          (t._keydown = function (t) {
            if (!/input|textarea/i.test(t.target.tagName))
              switch (t.which) {
                case 37:
                  t.preventDefault(), this.prev();
                  break;
                case 39:
                  t.preventDefault(), this.next();
              }
          }),
          (t._getItemIndex = function (t) {
            return (
              (this._items = P.makeArray(P(t).parent().find(Z.ITEM))),
              this._items.indexOf(t)
            );
          }),
          (t._getItemByDirection = function (t, e) {
            var n = t === U,
              i = t === K,
              r = this._getItemIndex(e),
              s = this._items.length - 1;
            if (((i && 0 === r) || (n && r === s)) && !this._config.wrap)
              return e;
            var o = (r + (t === K ? -1 : 1)) % this._items.length;
            return -1 === o
              ? this._items[this._items.length - 1]
              : this._items[o];
          }),
          (t._triggerSlideEvent = function (t, e) {
            var n = this._getItemIndex(t),
              i = this._getItemIndex(P(this._element).find(Z.ACTIVE_ITEM)[0]),
              r = P.Event(Q.SLIDE, {
                relatedTarget: t,
                direction: e,
                from: i,
                to: n,
              });
            return P(this._element).trigger(r), r;
          }),
          (t._setActiveIndicatorElement = function (t) {
            if (this._indicatorsElement) {
              P(this._indicatorsElement).find(Z.ACTIVE).removeClass(Y);
              var e = this._indicatorsElement.children[this._getItemIndex(t)];
              e && P(e).addClass(Y);
            }
          }),
          (t._slide = function (t, e) {
            var n,
              i,
              r,
              s = this,
              o = P(this._element).find(Z.ACTIVE_ITEM)[0],
              a = this._getItemIndex(o),
              l = e || (o && this._getItemByDirection(t, o)),
              h = this._getItemIndex(l),
              c = Boolean(this._interval);
            if (
              (t === U
                ? ((n = z), (i = X), (r = F))
                : ((n = q), (i = J), (r = V)),
              l && P(l).hasClass(Y))
            )
              this._isSliding = !1;
            else if (
              !this._triggerSlideEvent(l, r).isDefaultPrevented() &&
              o &&
              l
            ) {
              (this._isSliding = !0),
                c && this.pause(),
                this._setActiveIndicatorElement(l);
              var u = P.Event(Q.SLID, {
                relatedTarget: l,
                direction: r,
                from: a,
                to: h,
              });
              if (P(this._element).hasClass(G)) {
                P(l).addClass(i),
                  Cn.reflow(l),
                  P(o).addClass(n),
                  P(l).addClass(n);
                var f = Cn.getTransitionDurationFromElement(o);
                P(o)
                  .one(Cn.TRANSITION_END, function () {
                    P(l)
                      .removeClass(n + " " + i)
                      .addClass(Y),
                      P(o).removeClass(Y + " " + i + " " + n),
                      (s._isSliding = !1),
                      setTimeout(function () {
                        return P(s._element).trigger(u);
                      }, 0);
                  })
                  .emulateTransitionEnd(f);
              } else
                P(o).removeClass(Y),
                  P(l).addClass(Y),
                  (this._isSliding = !1),
                  P(this._element).trigger(u);
              c && this.cycle();
            }
          }),
          (s._jQueryInterface = function (i) {
            return this.each(function () {
              var t = P(this).data(j),
                e = h({}, M, P(this).data());
              "object" == typeof i && (e = h({}, e, i));
              var n = "string" == typeof i ? i : e.slide;
              if (
                (t || ((t = new s(this, e)), P(this).data(j, t)),
                "number" == typeof i)
              )
                t.to(i);
              else if ("string" == typeof n) {
                if ("undefined" == typeof t[n])
                  throw new TypeError('No method named "' + n + '"');
                t[n]();
              } else e.interval && (t.pause(), t.cycle());
            });
          }),
          (s._dataApiClickHandler = function (t) {
            var e = Cn.getSelectorFromElement(this);
            if (e) {
              var n = P(e)[0];
              if (n && P(n).hasClass(B)) {
                var i = h({}, P(n).data(), P(this).data()),
                  r = this.getAttribute("data-slide-to");
                r && (i.interval = !1),
                  s._jQueryInterface.call(P(n), i),
                  r && P(n).data(j).to(r),
                  t.preventDefault();
              }
            }
          }),
          o(s, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.1";
              },
            },
            {
              key: "Default",
              get: function () {
                return M;
              },
            },
          ]),
          s
        );
      })()),
      P(document).on(Q.CLICK_DATA_API, Z.DATA_SLIDE, $._dataApiClickHandler),
      P(window).on(Q.LOAD_DATA_API, function () {
        P(Z.DATA_RIDE).each(function () {
          var t = P(this);
          $._jQueryInterface.call(t, t.data());
        });
      }),
      (P.fn[L] = $._jQueryInterface),
      (P.fn[L].Constructor = $),
      (P.fn[L].noConflict = function () {
        return (P.fn[L] = W), $._jQueryInterface;
      }),
      $),
    bn =
      ((et = "collapse"),
      (it = "." + (nt = "bs.collapse")),
      (rt = (tt = e).fn[et]),
      (st = { toggle: !0, parent: "" }),
      (ot = { toggle: "boolean", parent: "(string|element)" }),
      (at = {
        SHOW: "show" + it,
        SHOWN: "shown" + it,
        HIDE: "hide" + it,
        HIDDEN: "hidden" + it,
        CLICK_DATA_API: "click" + it + ".data-api",
      }),
      (lt = "show"),
      (ht = "collapse"),
      (ct = "collapsing"),
      (ut = "collapsed"),
      (ft = "width"),
      (dt = "height"),
      (_t = {
        ACTIVES: ".show, .collapsing",
        DATA_TOGGLE: '[data-toggle="collapse"]',
      }),
      (gt = (function () {
        function a(t, e) {
          (this._isTransitioning = !1),
            (this._element = t),
            (this._config = this._getConfig(e)),
            (this._triggerArray = tt.makeArray(
              tt(
                '[data-toggle="collapse"][href="#' +
                  t.id +
                  '"],[data-toggle="collapse"][data-target="#' +
                  t.id +
                  '"]'
              )
            ));
          for (var n = tt(_t.DATA_TOGGLE), i = 0; i < n.length; i++) {
            var r = n[i],
              s = Cn.getSelectorFromElement(r);
            null !== s &&
              0 < tt(s).filter(t).length &&
              ((this._selector = s), this._triggerArray.push(r));
          }
          (this._parent = this._config.parent ? this._getParent() : null),
            this._config.parent ||
              this._addAriaAndCollapsedClass(this._element, this._triggerArray),
            this._config.toggle && this.toggle();
        }
        var t = a.prototype;
        return (
          (t.toggle = function () {
            tt(this._element).hasClass(lt) ? this.hide() : this.show();
          }),
          (t.show = function () {
            var t,
              e,
              n = this;
            if (
              !this._isTransitioning &&
              !tt(this._element).hasClass(lt) &&
              (this._parent &&
                0 ===
                  (t = tt.makeArray(
                    tt(this._parent)
                      .find(_t.ACTIVES)
                      .filter('[data-parent="' + this._config.parent + '"]')
                  )).length &&
                (t = null),
              !(
                t &&
                (e = tt(t).not(this._selector).data(nt)) &&
                e._isTransitioning
              ))
            ) {
              var i = tt.Event(at.SHOW);
              if ((tt(this._element).trigger(i), !i.isDefaultPrevented())) {
                t &&
                  (a._jQueryInterface.call(tt(t).not(this._selector), "hide"),
                  e || tt(t).data(nt, null));
                var r = this._getDimension();
                tt(this._element).removeClass(ht).addClass(ct),
                  (this._element.style[r] = 0) < this._triggerArray.length &&
                    tt(this._triggerArray)
                      .removeClass(ut)
                      .attr("aria-expanded", !0),
                  this.setTransitioning(!0);
                var s = "scroll" + (r[0].toUpperCase() + r.slice(1)),
                  o = Cn.getTransitionDurationFromElement(this._element);
                tt(this._element)
                  .one(Cn.TRANSITION_END, function () {
                    tt(n._element).removeClass(ct).addClass(ht).addClass(lt),
                      (n._element.style[r] = ""),
                      n.setTransitioning(!1),
                      tt(n._element).trigger(at.SHOWN);
                  })
                  .emulateTransitionEnd(o),
                  (this._element.style[r] = this._element[s] + "px");
              }
            }
          }),
          (t.hide = function () {
            var t = this;
            if (!this._isTransitioning && tt(this._element).hasClass(lt)) {
              var e = tt.Event(at.HIDE);
              if ((tt(this._element).trigger(e), !e.isDefaultPrevented())) {
                var n = this._getDimension();
                if (
                  ((this._element.style[n] =
                    this._element.getBoundingClientRect()[n] + "px"),
                  Cn.reflow(this._element),
                  tt(this._element)
                    .addClass(ct)
                    .removeClass(ht)
                    .removeClass(lt),
                  0 < this._triggerArray.length)
                )
                  for (var i = 0; i < this._triggerArray.length; i++) {
                    var r = this._triggerArray[i],
                      s = Cn.getSelectorFromElement(r);
                    if (null !== s)
                      tt(s).hasClass(lt) ||
                        tt(r).addClass(ut).attr("aria-expanded", !1);
                  }
                this.setTransitioning(!0);
                this._element.style[n] = "";
                var o = Cn.getTransitionDurationFromElement(this._element);
                tt(this._element)
                  .one(Cn.TRANSITION_END, function () {
                    t.setTransitioning(!1),
                      tt(t._element)
                        .removeClass(ct)
                        .addClass(ht)
                        .trigger(at.HIDDEN);
                  })
                  .emulateTransitionEnd(o);
              }
            }
          }),
          (t.setTransitioning = function (t) {
            this._isTransitioning = t;
          }),
          (t.dispose = function () {
            tt.removeData(this._element, nt),
              (this._config = null),
              (this._parent = null),
              (this._element = null),
              (this._triggerArray = null),
              (this._isTransitioning = null);
          }),
          (t._getConfig = function (t) {
            return (
              ((t = h({}, st, t)).toggle = Boolean(t.toggle)),
              Cn.typeCheckConfig(et, t, ot),
              t
            );
          }),
          (t._getDimension = function () {
            return tt(this._element).hasClass(ft) ? ft : dt;
          }),
          (t._getParent = function () {
            var n = this,
              t = null;
            Cn.isElement(this._config.parent)
              ? ((t = this._config.parent),
                "undefined" != typeof this._config.parent.jquery &&
                  (t = this._config.parent[0]))
              : (t = tt(this._config.parent)[0]);
            var e =
              '[data-toggle="collapse"][data-parent="' +
              this._config.parent +
              '"]';
            return (
              tt(t)
                .find(e)
                .each(function (t, e) {
                  n._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e]);
                }),
              t
            );
          }),
          (t._addAriaAndCollapsedClass = function (t, e) {
            if (t) {
              var n = tt(t).hasClass(lt);
              0 < e.length &&
                tt(e).toggleClass(ut, !n).attr("aria-expanded", n);
            }
          }),
          (a._getTargetFromElement = function (t) {
            var e = Cn.getSelectorFromElement(t);
            return e ? tt(e)[0] : null;
          }),
          (a._jQueryInterface = function (i) {
            return this.each(function () {
              var t = tt(this),
                e = t.data(nt),
                n = h({}, st, t.data(), "object" == typeof i && i ? i : {});
              if (
                (!e && n.toggle && /show|hide/.test(i) && (n.toggle = !1),
                e || ((e = new a(this, n)), t.data(nt, e)),
                "string" == typeof i)
              ) {
                if ("undefined" == typeof e[i])
                  throw new TypeError('No method named "' + i + '"');
                e[i]();
              }
            });
          }),
          o(a, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.1";
              },
            },
            {
              key: "Default",
              get: function () {
                return st;
              },
            },
          ]),
          a
        );
      })()),
      tt(document).on(at.CLICK_DATA_API, _t.DATA_TOGGLE, function (t) {
        "A" === t.currentTarget.tagName && t.preventDefault();
        var n = tt(this),
          e = Cn.getSelectorFromElement(this);
        tt(e).each(function () {
          var t = tt(this),
            e = t.data(nt) ? "toggle" : n.data();
          gt._jQueryInterface.call(t, e);
        });
      }),
      (tt.fn[et] = gt._jQueryInterface),
      (tt.fn[et].Constructor = gt),
      (tt.fn[et].noConflict = function () {
        return (tt.fn[et] = rt), gt._jQueryInterface;
      }),
      gt),
    Sn =
      ((pt = "dropdown"),
      (Et = "." + (vt = "bs.dropdown")),
      (yt = ".data-api"),
      (Tt = (mt = e).fn[pt]),
      (Ct = new RegExp("38|40|27")),
      (It = {
        HIDE: "hide" + Et,
        HIDDEN: "hidden" + Et,
        SHOW: "show" + Et,
        SHOWN: "shown" + Et,
        CLICK: "click" + Et,
        CLICK_DATA_API: "click" + Et + yt,
        KEYDOWN_DATA_API: "keydown" + Et + yt,
        KEYUP_DATA_API: "keyup" + Et + yt,
      }),
      (At = "disabled"),
      (Dt = "show"),
      (bt = "dropup"),
      (St = "dropright"),
      (wt = "dropleft"),
      (Nt = "dropdown-menu-right"),
      (Ot = "position-static"),
      (kt = '[data-toggle="dropdown"]'),
      (Pt = ".dropdown form"),
      (Lt = ".dropdown-menu"),
      (jt = ".navbar-nav"),
      (Rt = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)"),
      (Ht = "top-start"),
      (Wt = "top-end"),
      (Mt = "bottom-start"),
      (xt = "bottom-end"),
      (Ut = "right-start"),
      (Kt = "left-start"),
      (Ft = {
        offset: 0,
        flip: !0,
        boundary: "scrollParent",
        reference: "toggle",
        display: "dynamic",
      }),
      (Vt = {
        offset: "(number|string|function)",
        flip: "boolean",
        boundary: "(string|element)",
        reference: "(string|element)",
        display: "string",
      }),
      (Qt = (function () {
        function l(t, e) {
          (this._element = t),
            (this._popper = null),
            (this._config = this._getConfig(e)),
            (this._menu = this._getMenuElement()),
            (this._inNavbar = this._detectNavbar()),
            this._addEventListeners();
        }
        var t = l.prototype;
        return (
          (t.toggle = function () {
            if (!this._element.disabled && !mt(this._element).hasClass(At)) {
              var t = l._getParentFromElement(this._element),
                e = mt(this._menu).hasClass(Dt);
              if ((l._clearMenus(), !e)) {
                var n = { relatedTarget: this._element },
                  i = mt.Event(It.SHOW, n);
                if ((mt(t).trigger(i), !i.isDefaultPrevented())) {
                  if (!this._inNavbar) {
                    if ("undefined" == typeof c)
                      throw new TypeError(
                        "Bootstrap dropdown require Popper.js (https://popper.js.org)"
                      );
                    var r = this._element;
                    "parent" === this._config.reference
                      ? (r = t)
                      : Cn.isElement(this._config.reference) &&
                        ((r = this._config.reference),
                        "undefined" != typeof this._config.reference.jquery &&
                          (r = this._config.reference[0])),
                      "scrollParent" !== this._config.boundary &&
                        mt(t).addClass(Ot),
                      (this._popper = new c(
                        r,
                        this._menu,
                        this._getPopperConfig()
                      ));
                  }
                  "ontouchstart" in document.documentElement &&
                    0 === mt(t).closest(jt).length &&
                    mt(document.body).children().on("mouseover", null, mt.noop),
                    this._element.focus(),
                    this._element.setAttribute("aria-expanded", !0),
                    mt(this._menu).toggleClass(Dt),
                    mt(t).toggleClass(Dt).trigger(mt.Event(It.SHOWN, n));
                }
              }
            }
          }),
          (t.dispose = function () {
            mt.removeData(this._element, vt),
              mt(this._element).off(Et),
              (this._element = null),
              (this._menu = null) !== this._popper &&
                (this._popper.destroy(), (this._popper = null));
          }),
          (t.update = function () {
            (this._inNavbar = this._detectNavbar()),
              null !== this._popper && this._popper.scheduleUpdate();
          }),
          (t._addEventListeners = function () {
            var e = this;
            mt(this._element).on(It.CLICK, function (t) {
              t.preventDefault(), t.stopPropagation(), e.toggle();
            });
          }),
          (t._getConfig = function (t) {
            return (
              (t = h(
                {},
                this.constructor.Default,
                mt(this._element).data(),
                t
              )),
              Cn.typeCheckConfig(pt, t, this.constructor.DefaultType),
              t
            );
          }),
          (t._getMenuElement = function () {
            if (!this._menu) {
              var t = l._getParentFromElement(this._element);
              this._menu = mt(t).find(Lt)[0];
            }
            return this._menu;
          }),
          (t._getPlacement = function () {
            var t = mt(this._element).parent(),
              e = Mt;
            return (
              t.hasClass(bt)
                ? ((e = Ht), mt(this._menu).hasClass(Nt) && (e = Wt))
                : t.hasClass(St)
                ? (e = Ut)
                : t.hasClass(wt)
                ? (e = Kt)
                : mt(this._menu).hasClass(Nt) && (e = xt),
              e
            );
          }),
          (t._detectNavbar = function () {
            return 0 < mt(this._element).closest(".navbar").length;
          }),
          (t._getPopperConfig = function () {
            var e = this,
              t = {};
            "function" == typeof this._config.offset
              ? (t.fn = function (t) {
                  return (
                    (t.offsets = h(
                      {},
                      t.offsets,
                      e._config.offset(t.offsets) || {}
                    )),
                    t
                  );
                })
              : (t.offset = this._config.offset);
            var n = {
              placement: this._getPlacement(),
              modifiers: {
                offset: t,
                flip: { enabled: this._config.flip },
                preventOverflow: { boundariesElement: this._config.boundary },
              },
            };
            return (
              "static" === this._config.display &&
                (n.modifiers.applyStyle = { enabled: !1 }),
              n
            );
          }),
          (l._jQueryInterface = function (e) {
            return this.each(function () {
              var t = mt(this).data(vt);
              if (
                (t ||
                  ((t = new l(this, "object" == typeof e ? e : null)),
                  mt(this).data(vt, t)),
                "string" == typeof e)
              ) {
                if ("undefined" == typeof t[e])
                  throw new TypeError('No method named "' + e + '"');
                t[e]();
              }
            });
          }),
          (l._clearMenus = function (t) {
            if (!t || (3 !== t.which && ("keyup" !== t.type || 9 === t.which)))
              for (var e = mt.makeArray(mt(kt)), n = 0; n < e.length; n++) {
                var i = l._getParentFromElement(e[n]),
                  r = mt(e[n]).data(vt),
                  s = { relatedTarget: e[n] };
                if (r) {
                  var o = r._menu;
                  if (
                    mt(i).hasClass(Dt) &&
                    !(
                      t &&
                      (("click" === t.type &&
                        /input|textarea/i.test(t.target.tagName)) ||
                        ("keyup" === t.type && 9 === t.which)) &&
                      mt.contains(i, t.target)
                    )
                  ) {
                    var a = mt.Event(It.HIDE, s);
                    mt(i).trigger(a),
                      a.isDefaultPrevented() ||
                        ("ontouchstart" in document.documentElement &&
                          mt(document.body)
                            .children()
                            .off("mouseover", null, mt.noop),
                        e[n].setAttribute("aria-expanded", "false"),
                        mt(o).removeClass(Dt),
                        mt(i).removeClass(Dt).trigger(mt.Event(It.HIDDEN, s)));
                  }
                }
              }
          }),
          (l._getParentFromElement = function (t) {
            var e,
              n = Cn.getSelectorFromElement(t);
            return n && (e = mt(n)[0]), e || t.parentNode;
          }),
          (l._dataApiKeydownHandler = function (t) {
            if (
              (/input|textarea/i.test(t.target.tagName)
                ? !(
                    32 === t.which ||
                    (27 !== t.which &&
                      ((40 !== t.which && 38 !== t.which) ||
                        mt(t.target).closest(Lt).length))
                  )
                : Ct.test(t.which)) &&
              (t.preventDefault(),
              t.stopPropagation(),
              !this.disabled && !mt(this).hasClass(At))
            ) {
              var e = l._getParentFromElement(this),
                n = mt(e).hasClass(Dt);
              if (
                (n || (27 === t.which && 32 === t.which)) &&
                (!n || (27 !== t.which && 32 !== t.which))
              ) {
                var i = mt(e).find(Rt).get();
                if (0 !== i.length) {
                  var r = i.indexOf(t.target);
                  38 === t.which && 0 < r && r--,
                    40 === t.which && r < i.length - 1 && r++,
                    r < 0 && (r = 0),
                    i[r].focus();
                }
              } else {
                if (27 === t.which) {
                  var s = mt(e).find(kt)[0];
                  mt(s).trigger("focus");
                }
                mt(this).trigger("click");
              }
            }
          }),
          o(l, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.1";
              },
            },
            {
              key: "Default",
              get: function () {
                return Ft;
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return Vt;
              },
            },
          ]),
          l
        );
      })()),
      mt(document)
        .on(It.KEYDOWN_DATA_API, kt, Qt._dataApiKeydownHandler)
        .on(It.KEYDOWN_DATA_API, Lt, Qt._dataApiKeydownHandler)
        .on(It.CLICK_DATA_API + " " + It.KEYUP_DATA_API, Qt._clearMenus)
        .on(It.CLICK_DATA_API, kt, function (t) {
          t.preventDefault(),
            t.stopPropagation(),
            Qt._jQueryInterface.call(mt(this), "toggle");
        })
        .on(It.CLICK_DATA_API, Pt, function (t) {
          t.stopPropagation();
        }),
      (mt.fn[pt] = Qt._jQueryInterface),
      (mt.fn[pt].Constructor = Qt),
      (mt.fn[pt].noConflict = function () {
        return (mt.fn[pt] = Tt), Qt._jQueryInterface;
      }),
      Qt),
    wn =
      ((Yt = "modal"),
      (qt = "." + (Gt = "bs.modal")),
      (zt = (Bt = e).fn[Yt]),
      (Xt = { backdrop: !0, keyboard: !0, focus: !0, show: !0 }),
      (Jt = {
        backdrop: "(boolean|string)",
        keyboard: "boolean",
        focus: "boolean",
        show: "boolean",
      }),
      (Zt = {
        HIDE: "hide" + qt,
        HIDDEN: "hidden" + qt,
        SHOW: "show" + qt,
        SHOWN: "shown" + qt,
        FOCUSIN: "focusin" + qt,
        RESIZE: "resize" + qt,
        CLICK_DISMISS: "click.dismiss" + qt,
        KEYDOWN_DISMISS: "keydown.dismiss" + qt,
        MOUSEUP_DISMISS: "mouseup.dismiss" + qt,
        MOUSEDOWN_DISMISS: "mousedown.dismiss" + qt,
        CLICK_DATA_API: "click" + qt + ".data-api",
      }),
      ($t = "modal-scrollbar-measure"),
      (te = "modal-backdrop"),
      (ee = "modal-open"),
      (ne = "fade"),
      (ie = "show"),
      (re = {
        DIALOG: ".modal-dialog",
        DATA_TOGGLE: '[data-toggle="modal"]',
        DATA_DISMISS: '[data-dismiss="modal"]',
        FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        STICKY_CONTENT: ".sticky-top",
        NAVBAR_TOGGLER: ".navbar-toggler",
      }),
      (se = (function () {
        function r(t, e) {
          (this._config = this._getConfig(e)),
            (this._element = t),
            (this._dialog = Bt(t).find(re.DIALOG)[0]),
            (this._backdrop = null),
            (this._isShown = !1),
            (this._isBodyOverflowing = !1),
            (this._ignoreBackdropClick = !1),
            (this._scrollbarWidth = 0);
        }
        var t = r.prototype;
        return (
          (t.toggle = function (t) {
            return this._isShown ? this.hide() : this.show(t);
          }),
          (t.show = function (t) {
            var e = this;
            if (!this._isTransitioning && !this._isShown) {
              Bt(this._element).hasClass(ne) && (this._isTransitioning = !0);
              var n = Bt.Event(Zt.SHOW, { relatedTarget: t });
              Bt(this._element).trigger(n),
                this._isShown ||
                  n.isDefaultPrevented() ||
                  ((this._isShown = !0),
                  this._checkScrollbar(),
                  this._setScrollbar(),
                  this._adjustDialog(),
                  Bt(document.body).addClass(ee),
                  this._setEscapeEvent(),
                  this._setResizeEvent(),
                  Bt(this._element).on(
                    Zt.CLICK_DISMISS,
                    re.DATA_DISMISS,
                    function (t) {
                      return e.hide(t);
                    }
                  ),
                  Bt(this._dialog).on(Zt.MOUSEDOWN_DISMISS, function () {
                    Bt(e._element).one(Zt.MOUSEUP_DISMISS, function (t) {
                      Bt(t.target).is(e._element) &&
                        (e._ignoreBackdropClick = !0);
                    });
                  }),
                  this._showBackdrop(function () {
                    return e._showElement(t);
                  }));
            }
          }),
          (t.hide = function (t) {
            var e = this;
            if (
              (t && t.preventDefault(), !this._isTransitioning && this._isShown)
            ) {
              var n = Bt.Event(Zt.HIDE);
              if (
                (Bt(this._element).trigger(n),
                this._isShown && !n.isDefaultPrevented())
              ) {
                this._isShown = !1;
                var i = Bt(this._element).hasClass(ne);
                if (
                  (i && (this._isTransitioning = !0),
                  this._setEscapeEvent(),
                  this._setResizeEvent(),
                  Bt(document).off(Zt.FOCUSIN),
                  Bt(this._element).removeClass(ie),
                  Bt(this._element).off(Zt.CLICK_DISMISS),
                  Bt(this._dialog).off(Zt.MOUSEDOWN_DISMISS),
                  i)
                ) {
                  var r = Cn.getTransitionDurationFromElement(this._element);
                  Bt(this._element)
                    .one(Cn.TRANSITION_END, function (t) {
                      return e._hideModal(t);
                    })
                    .emulateTransitionEnd(r);
                } else this._hideModal();
              }
            }
          }),
          (t.dispose = function () {
            Bt.removeData(this._element, Gt),
              Bt(window, document, this._element, this._backdrop).off(qt),
              (this._config = null),
              (this._element = null),
              (this._dialog = null),
              (this._backdrop = null),
              (this._isShown = null),
              (this._isBodyOverflowing = null),
              (this._ignoreBackdropClick = null),
              (this._scrollbarWidth = null);
          }),
          (t.handleUpdate = function () {
            this._adjustDialog();
          }),
          (t._getConfig = function (t) {
            return (t = h({}, Xt, t)), Cn.typeCheckConfig(Yt, t, Jt), t;
          }),
          (t._showElement = function (t) {
            var e = this,
              n = Bt(this._element).hasClass(ne);
            (this._element.parentNode &&
              this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
              document.body.appendChild(this._element),
              (this._element.style.display = "block"),
              this._element.removeAttribute("aria-hidden"),
              (this._element.scrollTop = 0),
              n && Cn.reflow(this._element),
              Bt(this._element).addClass(ie),
              this._config.focus && this._enforceFocus();
            var i = Bt.Event(Zt.SHOWN, { relatedTarget: t }),
              r = function () {
                e._config.focus && e._element.focus(),
                  (e._isTransitioning = !1),
                  Bt(e._element).trigger(i);
              };
            if (n) {
              var s = Cn.getTransitionDurationFromElement(this._element);
              Bt(this._dialog)
                .one(Cn.TRANSITION_END, r)
                .emulateTransitionEnd(s);
            } else r();
          }),
          (t._enforceFocus = function () {
            var e = this;
            Bt(document)
              .off(Zt.FOCUSIN)
              .on(Zt.FOCUSIN, function (t) {
                document !== t.target &&
                  e._element !== t.target &&
                  0 === Bt(e._element).has(t.target).length &&
                  e._element.focus();
              });
          }),
          (t._setEscapeEvent = function () {
            var e = this;
            this._isShown && this._config.keyboard
              ? Bt(this._element).on(Zt.KEYDOWN_DISMISS, function (t) {
                  27 === t.which && (t.preventDefault(), e.hide());
                })
              : this._isShown || Bt(this._element).off(Zt.KEYDOWN_DISMISS);
          }),
          (t._setResizeEvent = function () {
            var e = this;
            this._isShown
              ? Bt(window).on(Zt.RESIZE, function (t) {
                  return e.handleUpdate(t);
                })
              : Bt(window).off(Zt.RESIZE);
          }),
          (t._hideModal = function () {
            var t = this;
            (this._element.style.display = "none"),
              this._element.setAttribute("aria-hidden", !0),
              (this._isTransitioning = !1),
              this._showBackdrop(function () {
                Bt(document.body).removeClass(ee),
                  t._resetAdjustments(),
                  t._resetScrollbar(),
                  Bt(t._element).trigger(Zt.HIDDEN);
              });
          }),
          (t._removeBackdrop = function () {
            this._backdrop &&
              (Bt(this._backdrop).remove(), (this._backdrop = null));
          }),
          (t._showBackdrop = function (t) {
            var e = this,
              n = Bt(this._element).hasClass(ne) ? ne : "";
            if (this._isShown && this._config.backdrop) {
              if (
                ((this._backdrop = document.createElement("div")),
                (this._backdrop.className = te),
                n && Bt(this._backdrop).addClass(n),
                Bt(this._backdrop).appendTo(document.body),
                Bt(this._element).on(Zt.CLICK_DISMISS, function (t) {
                  e._ignoreBackdropClick
                    ? (e._ignoreBackdropClick = !1)
                    : t.target === t.currentTarget &&
                      ("static" === e._config.backdrop
                        ? e._element.focus()
                        : e.hide());
                }),
                n && Cn.reflow(this._backdrop),
                Bt(this._backdrop).addClass(ie),
                !t)
              )
                return;
              if (!n) return void t();
              var i = Cn.getTransitionDurationFromElement(this._backdrop);
              Bt(this._backdrop)
                .one(Cn.TRANSITION_END, t)
                .emulateTransitionEnd(i);
            } else if (!this._isShown && this._backdrop) {
              Bt(this._backdrop).removeClass(ie);
              var r = function () {
                e._removeBackdrop(), t && t();
              };
              if (Bt(this._element).hasClass(ne)) {
                var s = Cn.getTransitionDurationFromElement(this._backdrop);
                Bt(this._backdrop)
                  .one(Cn.TRANSITION_END, r)
                  .emulateTransitionEnd(s);
              } else r();
            } else t && t();
          }),
          (t._adjustDialog = function () {
            var t =
              this._element.scrollHeight >
              document.documentElement.clientHeight;
            !this._isBodyOverflowing &&
              t &&
              (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
              this._isBodyOverflowing &&
                !t &&
                (this._element.style.paddingRight =
                  this._scrollbarWidth + "px");
          }),
          (t._resetAdjustments = function () {
            (this._element.style.paddingLeft = ""),
              (this._element.style.paddingRight = "");
          }),
          (t._checkScrollbar = function () {
            var t = document.body.getBoundingClientRect();
            (this._isBodyOverflowing = t.left + t.right < window.innerWidth),
              (this._scrollbarWidth = this._getScrollbarWidth());
          }),
          (t._setScrollbar = function () {
            var r = this;
            if (this._isBodyOverflowing) {
              Bt(re.FIXED_CONTENT).each(function (t, e) {
                var n = Bt(e)[0].style.paddingRight,
                  i = Bt(e).css("padding-right");
                Bt(e)
                  .data("padding-right", n)
                  .css(
                    "padding-right",
                    parseFloat(i) + r._scrollbarWidth + "px"
                  );
              }),
                Bt(re.STICKY_CONTENT).each(function (t, e) {
                  var n = Bt(e)[0].style.marginRight,
                    i = Bt(e).css("margin-right");
                  Bt(e)
                    .data("margin-right", n)
                    .css(
                      "margin-right",
                      parseFloat(i) - r._scrollbarWidth + "px"
                    );
                }),
                Bt(re.NAVBAR_TOGGLER).each(function (t, e) {
                  var n = Bt(e)[0].style.marginRight,
                    i = Bt(e).css("margin-right");
                  Bt(e)
                    .data("margin-right", n)
                    .css(
                      "margin-right",
                      parseFloat(i) + r._scrollbarWidth + "px"
                    );
                });
              var t = document.body.style.paddingRight,
                e = Bt(document.body).css("padding-right");
              Bt(document.body)
                .data("padding-right", t)
                .css(
                  "padding-right",
                  parseFloat(e) + this._scrollbarWidth + "px"
                );
            }
          }),
          (t._resetScrollbar = function () {
            Bt(re.FIXED_CONTENT).each(function (t, e) {
              var n = Bt(e).data("padding-right");
              "undefined" != typeof n &&
                Bt(e).css("padding-right", n).removeData("padding-right");
            }),
              Bt(re.STICKY_CONTENT + ", " + re.NAVBAR_TOGGLER).each(function (
                t,
                e
              ) {
                var n = Bt(e).data("margin-right");
                "undefined" != typeof n &&
                  Bt(e).css("margin-right", n).removeData("margin-right");
              });
            var t = Bt(document.body).data("padding-right");
            "undefined" != typeof t &&
              Bt(document.body)
                .css("padding-right", t)
                .removeData("padding-right");
          }),
          (t._getScrollbarWidth = function () {
            var t = document.createElement("div");
            (t.className = $t), document.body.appendChild(t);
            var e = t.getBoundingClientRect().width - t.clientWidth;
            return document.body.removeChild(t), e;
          }),
          (r._jQueryInterface = function (n, i) {
            return this.each(function () {
              var t = Bt(this).data(Gt),
                e = h(
                  {},
                  Xt,
                  Bt(this).data(),
                  "object" == typeof n && n ? n : {}
                );
              if (
                (t || ((t = new r(this, e)), Bt(this).data(Gt, t)),
                "string" == typeof n)
              ) {
                if ("undefined" == typeof t[n])
                  throw new TypeError('No method named "' + n + '"');
                t[n](i);
              } else e.show && t.show(i);
            });
          }),
          o(r, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.1";
              },
            },
            {
              key: "Default",
              get: function () {
                return Xt;
              },
            },
          ]),
          r
        );
      })()),
      Bt(document).on(Zt.CLICK_DATA_API, re.DATA_TOGGLE, function (t) {
        var e,
          n = this,
          i = Cn.getSelectorFromElement(this);
        i && (e = Bt(i)[0]);
        var r = Bt(e).data(Gt)
          ? "toggle"
          : h({}, Bt(e).data(), Bt(this).data());
        ("A" !== this.tagName && "AREA" !== this.tagName) || t.preventDefault();
        var s = Bt(e).one(Zt.SHOW, function (t) {
          t.isDefaultPrevented() ||
            s.one(Zt.HIDDEN, function () {
              Bt(n).is(":visible") && n.focus();
            });
        });
        se._jQueryInterface.call(Bt(e), r, this);
      }),
      (Bt.fn[Yt] = se._jQueryInterface),
      (Bt.fn[Yt].Constructor = se),
      (Bt.fn[Yt].noConflict = function () {
        return (Bt.fn[Yt] = zt), se._jQueryInterface;
      }),
      se),
    Nn =
      ((ae = "tooltip"),
      (he = "." + (le = "bs.tooltip")),
      (ce = (oe = e).fn[ae]),
      (ue = "bs-tooltip"),
      (fe = new RegExp("(^|\\s)" + ue + "\\S+", "g")),
      (ge = {
        animation: !0,
        template:
          '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !(_e = {
          AUTO: "auto",
          TOP: "top",
          RIGHT: "right",
          BOTTOM: "bottom",
          LEFT: "left",
        }),
        selector: !(de = {
          animation: "boolean",
          template: "string",
          title: "(string|element|function)",
          trigger: "string",
          delay: "(number|object)",
          html: "boolean",
          selector: "(string|boolean)",
          placement: "(string|function)",
          offset: "(number|string)",
          container: "(string|element|boolean)",
          fallbackPlacement: "(string|array)",
          boundary: "(string|element)",
        }),
        placement: "top",
        offset: 0,
        container: !1,
        fallbackPlacement: "flip",
        boundary: "scrollParent",
      }),
      (pe = "out"),
      (ve = {
        HIDE: "hide" + he,
        HIDDEN: "hidden" + he,
        SHOW: (me = "show") + he,
        SHOWN: "shown" + he,
        INSERTED: "inserted" + he,
        CLICK: "click" + he,
        FOCUSIN: "focusin" + he,
        FOCUSOUT: "focusout" + he,
        MOUSEENTER: "mouseenter" + he,
        MOUSELEAVE: "mouseleave" + he,
      }),
      (Ee = "fade"),
      (ye = "show"),
      (Te = ".tooltip-inner"),
      (Ce = ".arrow"),
      (Ie = "hover"),
      (Ae = "focus"),
      (De = "click"),
      (be = "manual"),
      (Se = (function () {
        function i(t, e) {
          if ("undefined" == typeof c)
            throw new TypeError(
              "Bootstrap tooltips require Popper.js (https://popper.js.org)"
            );
          (this._isEnabled = !0),
            (this._timeout = 0),
            (this._hoverState = ""),
            (this._activeTrigger = {}),
            (this._popper = null),
            (this.element = t),
            (this.config = this._getConfig(e)),
            (this.tip = null),
            this._setListeners();
        }
        var t = i.prototype;
        return (
          (t.enable = function () {
            this._isEnabled = !0;
          }),
          (t.disable = function () {
            this._isEnabled = !1;
          }),
          (t.toggleEnabled = function () {
            this._isEnabled = !this._isEnabled;
          }),
          (t.toggle = function (t) {
            if (this._isEnabled)
              if (t) {
                var e = this.constructor.DATA_KEY,
                  n = oe(t.currentTarget).data(e);
                n ||
                  ((n = new this.constructor(
                    t.currentTarget,
                    this._getDelegateConfig()
                  )),
                  oe(t.currentTarget).data(e, n)),
                  (n._activeTrigger.click = !n._activeTrigger.click),
                  n._isWithActiveTrigger()
                    ? n._enter(null, n)
                    : n._leave(null, n);
              } else {
                if (oe(this.getTipElement()).hasClass(ye))
                  return void this._leave(null, this);
                this._enter(null, this);
              }
          }),
          (t.dispose = function () {
            clearTimeout(this._timeout),
              oe.removeData(this.element, this.constructor.DATA_KEY),
              oe(this.element).off(this.constructor.EVENT_KEY),
              oe(this.element).closest(".modal").off("hide.bs.modal"),
              this.tip && oe(this.tip).remove(),
              (this._isEnabled = null),
              (this._timeout = null),
              (this._hoverState = null),
              (this._activeTrigger = null) !== this._popper &&
                this._popper.destroy(),
              (this._popper = null),
              (this.element = null),
              (this.config = null),
              (this.tip = null);
          }),
          (t.show = function () {
            var e = this;
            if ("none" === oe(this.element).css("display"))
              throw new Error("Please use show on visible elements");
            var t = oe.Event(this.constructor.Event.SHOW);
            if (this.isWithContent() && this._isEnabled) {
              oe(this.element).trigger(t);
              var n = oe.contains(
                this.element.ownerDocument.documentElement,
                this.element
              );
              if (t.isDefaultPrevented() || !n) return;
              var i = this.getTipElement(),
                r = Cn.getUID(this.constructor.NAME);
              i.setAttribute("id", r),
                this.element.setAttribute("aria-describedby", r),
                this.setContent(),
                this.config.animation && oe(i).addClass(Ee);
              var s =
                  "function" == typeof this.config.placement
                    ? this.config.placement.call(this, i, this.element)
                    : this.config.placement,
                o = this._getAttachment(s);
              this.addAttachmentClass(o);
              var a =
                !1 === this.config.container
                  ? document.body
                  : oe(this.config.container);
              oe(i).data(this.constructor.DATA_KEY, this),
                oe.contains(
                  this.element.ownerDocument.documentElement,
                  this.tip
                ) || oe(i).appendTo(a),
                oe(this.element).trigger(this.constructor.Event.INSERTED),
                (this._popper = new c(this.element, i, {
                  placement: o,
                  modifiers: {
                    offset: { offset: this.config.offset },
                    flip: { behavior: this.config.fallbackPlacement },
                    arrow: { element: Ce },
                    preventOverflow: {
                      boundariesElement: this.config.boundary,
                    },
                  },
                  onCreate: function (t) {
                    t.originalPlacement !== t.placement &&
                      e._handlePopperPlacementChange(t);
                  },
                  onUpdate: function (t) {
                    e._handlePopperPlacementChange(t);
                  },
                })),
                oe(i).addClass(ye),
                "ontouchstart" in document.documentElement &&
                  oe(document.body).children().on("mouseover", null, oe.noop);
              var l = function () {
                e.config.animation && e._fixTransition();
                var t = e._hoverState;
                (e._hoverState = null),
                  oe(e.element).trigger(e.constructor.Event.SHOWN),
                  t === pe && e._leave(null, e);
              };
              if (oe(this.tip).hasClass(Ee)) {
                var h = Cn.getTransitionDurationFromElement(this.tip);
                oe(this.tip).one(Cn.TRANSITION_END, l).emulateTransitionEnd(h);
              } else l();
            }
          }),
          (t.hide = function (t) {
            var e = this,
              n = this.getTipElement(),
              i = oe.Event(this.constructor.Event.HIDE),
              r = function () {
                e._hoverState !== me &&
                  n.parentNode &&
                  n.parentNode.removeChild(n),
                  e._cleanTipClass(),
                  e.element.removeAttribute("aria-describedby"),
                  oe(e.element).trigger(e.constructor.Event.HIDDEN),
                  null !== e._popper && e._popper.destroy(),
                  t && t();
              };
            if ((oe(this.element).trigger(i), !i.isDefaultPrevented())) {
              if (
                (oe(n).removeClass(ye),
                "ontouchstart" in document.documentElement &&
                  oe(document.body).children().off("mouseover", null, oe.noop),
                (this._activeTrigger[De] = !1),
                (this._activeTrigger[Ae] = !1),
                (this._activeTrigger[Ie] = !1),
                oe(this.tip).hasClass(Ee))
              ) {
                var s = Cn.getTransitionDurationFromElement(n);
                oe(n).one(Cn.TRANSITION_END, r).emulateTransitionEnd(s);
              } else r();
              this._hoverState = "";
            }
          }),
          (t.update = function () {
            null !== this._popper && this._popper.scheduleUpdate();
          }),
          (t.isWithContent = function () {
            return Boolean(this.getTitle());
          }),
          (t.addAttachmentClass = function (t) {
            oe(this.getTipElement()).addClass(ue + "-" + t);
          }),
          (t.getTipElement = function () {
            return (
              (this.tip = this.tip || oe(this.config.template)[0]), this.tip
            );
          }),
          (t.setContent = function () {
            var t = oe(this.getTipElement());
            this.setElementContent(t.find(Te), this.getTitle()),
              t.removeClass(Ee + " " + ye);
          }),
          (t.setElementContent = function (t, e) {
            var n = this.config.html;
            "object" == typeof e && (e.nodeType || e.jquery)
              ? n
                ? oe(e).parent().is(t) || t.empty().append(e)
                : t.text(oe(e).text())
              : t[n ? "html" : "text"](e);
          }),
          (t.getTitle = function () {
            var t = this.element.getAttribute("data-original-title");
            return (
              t ||
                (t =
                  "function" == typeof this.config.title
                    ? this.config.title.call(this.element)
                    : this.config.title),
              t
            );
          }),
          (t._getAttachment = function (t) {
            return _e[t.toUpperCase()];
          }),
          (t._setListeners = function () {
            var i = this;
            this.config.trigger.split(" ").forEach(function (t) {
              if ("click" === t)
                oe(i.element).on(
                  i.constructor.Event.CLICK,
                  i.config.selector,
                  function (t) {
                    return i.toggle(t);
                  }
                );
              else if (t !== be) {
                var e =
                    t === Ie
                      ? i.constructor.Event.MOUSEENTER
                      : i.constructor.Event.FOCUSIN,
                  n =
                    t === Ie
                      ? i.constructor.Event.MOUSELEAVE
                      : i.constructor.Event.FOCUSOUT;
                oe(i.element)
                  .on(e, i.config.selector, function (t) {
                    return i._enter(t);
                  })
                  .on(n, i.config.selector, function (t) {
                    return i._leave(t);
                  });
              }
              oe(i.element)
                .closest(".modal")
                .on("hide.bs.modal", function () {
                  return i.hide();
                });
            }),
              this.config.selector
                ? (this.config = h({}, this.config, {
                    trigger: "manual",
                    selector: "",
                  }))
                : this._fixTitle();
          }),
          (t._fixTitle = function () {
            var t = typeof this.element.getAttribute("data-original-title");
            (this.element.getAttribute("title") || "string" !== t) &&
              (this.element.setAttribute(
                "data-original-title",
                this.element.getAttribute("title") || ""
              ),
              this.element.setAttribute("title", ""));
          }),
          (t._enter = function (t, e) {
            var n = this.constructor.DATA_KEY;
            (e = e || oe(t.currentTarget).data(n)) ||
              ((e = new this.constructor(
                t.currentTarget,
                this._getDelegateConfig()
              )),
              oe(t.currentTarget).data(n, e)),
              t && (e._activeTrigger["focusin" === t.type ? Ae : Ie] = !0),
              oe(e.getTipElement()).hasClass(ye) || e._hoverState === me
                ? (e._hoverState = me)
                : (clearTimeout(e._timeout),
                  (e._hoverState = me),
                  e.config.delay && e.config.delay.show
                    ? (e._timeout = setTimeout(function () {
                        e._hoverState === me && e.show();
                      }, e.config.delay.show))
                    : e.show());
          }),
          (t._leave = function (t, e) {
            var n = this.constructor.DATA_KEY;
            (e = e || oe(t.currentTarget).data(n)) ||
              ((e = new this.constructor(
                t.currentTarget,
                this._getDelegateConfig()
              )),
              oe(t.currentTarget).data(n, e)),
              t && (e._activeTrigger["focusout" === t.type ? Ae : Ie] = !1),
              e._isWithActiveTrigger() ||
                (clearTimeout(e._timeout),
                (e._hoverState = pe),
                e.config.delay && e.config.delay.hide
                  ? (e._timeout = setTimeout(function () {
                      e._hoverState === pe && e.hide();
                    }, e.config.delay.hide))
                  : e.hide());
          }),
          (t._isWithActiveTrigger = function () {
            for (var t in this._activeTrigger)
              if (this._activeTrigger[t]) return !0;
            return !1;
          }),
          (t._getConfig = function (t) {
            return (
              "number" ==
                typeof (t = h(
                  {},
                  this.constructor.Default,
                  oe(this.element).data(),
                  "object" == typeof t && t ? t : {}
                )).delay && (t.delay = { show: t.delay, hide: t.delay }),
              "number" == typeof t.title && (t.title = t.title.toString()),
              "number" == typeof t.content &&
                (t.content = t.content.toString()),
              Cn.typeCheckConfig(ae, t, this.constructor.DefaultType),
              t
            );
          }),
          (t._getDelegateConfig = function () {
            var t = {};
            if (this.config)
              for (var e in this.config)
                this.constructor.Default[e] !== this.config[e] &&
                  (t[e] = this.config[e]);
            return t;
          }),
          (t._cleanTipClass = function () {
            var t = oe(this.getTipElement()),
              e = t.attr("class").match(fe);
            null !== e && 0 < e.length && t.removeClass(e.join(""));
          }),
          (t._handlePopperPlacementChange = function (t) {
            this._cleanTipClass(),
              this.addAttachmentClass(this._getAttachment(t.placement));
          }),
          (t._fixTransition = function () {
            var t = this.getTipElement(),
              e = this.config.animation;
            null === t.getAttribute("x-placement") &&
              (oe(t).removeClass(Ee),
              (this.config.animation = !1),
              this.hide(),
              this.show(),
              (this.config.animation = e));
          }),
          (i._jQueryInterface = function (n) {
            return this.each(function () {
              var t = oe(this).data(le),
                e = "object" == typeof n && n;
              if (
                (t || !/dispose|hide/.test(n)) &&
                (t || ((t = new i(this, e)), oe(this).data(le, t)),
                "string" == typeof n)
              ) {
                if ("undefined" == typeof t[n])
                  throw new TypeError('No method named "' + n + '"');
                t[n]();
              }
            });
          }),
          o(i, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.1";
              },
            },
            {
              key: "Default",
              get: function () {
                return ge;
              },
            },
            {
              key: "NAME",
              get: function () {
                return ae;
              },
            },
            {
              key: "DATA_KEY",
              get: function () {
                return le;
              },
            },
            {
              key: "Event",
              get: function () {
                return ve;
              },
            },
            {
              key: "EVENT_KEY",
              get: function () {
                return he;
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return de;
              },
            },
          ]),
          i
        );
      })()),
      (oe.fn[ae] = Se._jQueryInterface),
      (oe.fn[ae].Constructor = Se),
      (oe.fn[ae].noConflict = function () {
        return (oe.fn[ae] = ce), Se._jQueryInterface;
      }),
      Se),
    On =
      ((Ne = "popover"),
      (ke = "." + (Oe = "bs.popover")),
      (Pe = (we = e).fn[Ne]),
      (Le = "bs-popover"),
      (je = new RegExp("(^|\\s)" + Le + "\\S+", "g")),
      (Re = h({}, Nn.Default, {
        placement: "right",
        trigger: "click",
        content: "",
        template:
          '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
      })),
      (He = h({}, Nn.DefaultType, { content: "(string|element|function)" })),
      (We = "fade"),
      (xe = ".popover-header"),
      (Ue = ".popover-body"),
      (Ke = {
        HIDE: "hide" + ke,
        HIDDEN: "hidden" + ke,
        SHOW: (Me = "show") + ke,
        SHOWN: "shown" + ke,
        INSERTED: "inserted" + ke,
        CLICK: "click" + ke,
        FOCUSIN: "focusin" + ke,
        FOCUSOUT: "focusout" + ke,
        MOUSEENTER: "mouseenter" + ke,
        MOUSELEAVE: "mouseleave" + ke,
      }),
      (Fe = (function (t) {
        var e, n;
        function i() {
          return t.apply(this, arguments) || this;
        }
        (n = t),
          ((e = i).prototype = Object.create(n.prototype)),
          ((e.prototype.constructor = e).__proto__ = n);
        var r = i.prototype;
        return (
          (r.isWithContent = function () {
            return this.getTitle() || this._getContent();
          }),
          (r.addAttachmentClass = function (t) {
            we(this.getTipElement()).addClass(Le + "-" + t);
          }),
          (r.getTipElement = function () {
            return (
              (this.tip = this.tip || we(this.config.template)[0]), this.tip
            );
          }),
          (r.setContent = function () {
            var t = we(this.getTipElement());
            this.setElementContent(t.find(xe), this.getTitle());
            var e = this._getContent();
            "function" == typeof e && (e = e.call(this.element)),
              this.setElementContent(t.find(Ue), e),
              t.removeClass(We + " " + Me);
          }),
          (r._getContent = function () {
            return (
              this.element.getAttribute("data-content") || this.config.content
            );
          }),
          (r._cleanTipClass = function () {
            var t = we(this.getTipElement()),
              e = t.attr("class").match(je);
            null !== e && 0 < e.length && t.removeClass(e.join(""));
          }),
          (i._jQueryInterface = function (n) {
            return this.each(function () {
              var t = we(this).data(Oe),
                e = "object" == typeof n ? n : null;
              if (
                (t || !/destroy|hide/.test(n)) &&
                (t || ((t = new i(this, e)), we(this).data(Oe, t)),
                "string" == typeof n)
              ) {
                if ("undefined" == typeof t[n])
                  throw new TypeError('No method named "' + n + '"');
                t[n]();
              }
            });
          }),
          o(i, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.1";
              },
            },
            {
              key: "Default",
              get: function () {
                return Re;
              },
            },
            {
              key: "NAME",
              get: function () {
                return Ne;
              },
            },
            {
              key: "DATA_KEY",
              get: function () {
                return Oe;
              },
            },
            {
              key: "Event",
              get: function () {
                return Ke;
              },
            },
            {
              key: "EVENT_KEY",
              get: function () {
                return ke;
              },
            },
            {
              key: "DefaultType",
              get: function () {
                return He;
              },
            },
          ]),
          i
        );
      })(Nn)),
      (we.fn[Ne] = Fe._jQueryInterface),
      (we.fn[Ne].Constructor = Fe),
      (we.fn[Ne].noConflict = function () {
        return (we.fn[Ne] = Pe), Fe._jQueryInterface;
      }),
      Fe),
    kn =
      ((Qe = "scrollspy"),
      (Ye = "." + (Be = "bs.scrollspy")),
      (Ge = (Ve = e).fn[Qe]),
      (qe = { offset: 10, method: "auto", target: "" }),
      (ze = { offset: "number", method: "string", target: "(string|element)" }),
      (Xe = {
        ACTIVATE: "activate" + Ye,
        SCROLL: "scroll" + Ye,
        LOAD_DATA_API: "load" + Ye + ".data-api",
      }),
      (Je = "dropdown-item"),
      (Ze = "active"),
      ($e = {
        DATA_SPY: '[data-spy="scroll"]',
        ACTIVE: ".active",
        NAV_LIST_GROUP: ".nav, .list-group",
        NAV_LINKS: ".nav-link",
        NAV_ITEMS: ".nav-item",
        LIST_ITEMS: ".list-group-item",
        DROPDOWN: ".dropdown",
        DROPDOWN_ITEMS: ".dropdown-item",
        DROPDOWN_TOGGLE: ".dropdown-toggle",
      }),
      (tn = "offset"),
      (en = "position"),
      (nn = (function () {
        function n(t, e) {
          var n = this;
          (this._element = t),
            (this._scrollElement = "BODY" === t.tagName ? window : t),
            (this._config = this._getConfig(e)),
            (this._selector =
              this._config.target +
              " " +
              $e.NAV_LINKS +
              "," +
              this._config.target +
              " " +
              $e.LIST_ITEMS +
              "," +
              this._config.target +
              " " +
              $e.DROPDOWN_ITEMS),
            (this._offsets = []),
            (this._targets = []),
            (this._activeTarget = null),
            (this._scrollHeight = 0),
            Ve(this._scrollElement).on(Xe.SCROLL, function (t) {
              return n._process(t);
            }),
            this.refresh(),
            this._process();
        }
        var t = n.prototype;
        return (
          (t.refresh = function () {
            var e = this,
              t = this._scrollElement === this._scrollElement.window ? tn : en,
              r = "auto" === this._config.method ? t : this._config.method,
              s = r === en ? this._getScrollTop() : 0;
            (this._offsets = []),
              (this._targets = []),
              (this._scrollHeight = this._getScrollHeight()),
              Ve.makeArray(Ve(this._selector))
                .map(function (t) {
                  var e,
                    n = Cn.getSelectorFromElement(t);
                  if ((n && (e = Ve(n)[0]), e)) {
                    var i = e.getBoundingClientRect();
                    if (i.width || i.height) return [Ve(e)[r]().top + s, n];
                  }
                  return null;
                })
                .filter(function (t) {
                  return t;
                })
                .sort(function (t, e) {
                  return t[0] - e[0];
                })
                .forEach(function (t) {
                  e._offsets.push(t[0]), e._targets.push(t[1]);
                });
          }),
          (t.dispose = function () {
            Ve.removeData(this._element, Be),
              Ve(this._scrollElement).off(Ye),
              (this._element = null),
              (this._scrollElement = null),
              (this._config = null),
              (this._selector = null),
              (this._offsets = null),
              (this._targets = null),
              (this._activeTarget = null),
              (this._scrollHeight = null);
          }),
          (t._getConfig = function (t) {
            if (
              "string" !=
              typeof (t = h({}, qe, "object" == typeof t && t ? t : {})).target
            ) {
              var e = Ve(t.target).attr("id");
              e || ((e = Cn.getUID(Qe)), Ve(t.target).attr("id", e)),
                (t.target = "#" + e);
            }
            return Cn.typeCheckConfig(Qe, t, ze), t;
          }),
          (t._getScrollTop = function () {
            return this._scrollElement === window
              ? this._scrollElement.pageYOffset
              : this._scrollElement.scrollTop;
          }),
          (t._getScrollHeight = function () {
            return (
              this._scrollElement.scrollHeight ||
              Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
              )
            );
          }),
          (t._getOffsetHeight = function () {
            return this._scrollElement === window
              ? window.innerHeight
              : this._scrollElement.getBoundingClientRect().height;
          }),
          (t._process = function () {
            var t = this._getScrollTop() + this._config.offset,
              e = this._getScrollHeight(),
              n = this._config.offset + e - this._getOffsetHeight();
            if ((this._scrollHeight !== e && this.refresh(), n <= t)) {
              var i = this._targets[this._targets.length - 1];
              this._activeTarget !== i && this._activate(i);
            } else {
              if (
                this._activeTarget &&
                t < this._offsets[0] &&
                0 < this._offsets[0]
              )
                return (this._activeTarget = null), void this._clear();
              for (var r = this._offsets.length; r--; ) {
                this._activeTarget !== this._targets[r] &&
                  t >= this._offsets[r] &&
                  ("undefined" == typeof this._offsets[r + 1] ||
                    t < this._offsets[r + 1]) &&
                  this._activate(this._targets[r]);
              }
            }
          }),
          (t._activate = function (e) {
            (this._activeTarget = e), this._clear();
            var t = this._selector.split(",");
            t = t.map(function (t) {
              return (
                t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
              );
            });
            var n = Ve(t.join(","));
            n.hasClass(Je)
              ? (n.closest($e.DROPDOWN).find($e.DROPDOWN_TOGGLE).addClass(Ze),
                n.addClass(Ze))
              : (n.addClass(Ze),
                n
                  .parents($e.NAV_LIST_GROUP)
                  .prev($e.NAV_LINKS + ", " + $e.LIST_ITEMS)
                  .addClass(Ze),
                n
                  .parents($e.NAV_LIST_GROUP)
                  .prev($e.NAV_ITEMS)
                  .children($e.NAV_LINKS)
                  .addClass(Ze)),
              Ve(this._scrollElement).trigger(Xe.ACTIVATE, {
                relatedTarget: e,
              });
          }),
          (t._clear = function () {
            Ve(this._selector).filter($e.ACTIVE).removeClass(Ze);
          }),
          (n._jQueryInterface = function (e) {
            return this.each(function () {
              var t = Ve(this).data(Be);
              if (
                (t ||
                  ((t = new n(this, "object" == typeof e && e)),
                  Ve(this).data(Be, t)),
                "string" == typeof e)
              ) {
                if ("undefined" == typeof t[e])
                  throw new TypeError('No method named "' + e + '"');
                t[e]();
              }
            });
          }),
          o(n, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.1";
              },
            },
            {
              key: "Default",
              get: function () {
                return qe;
              },
            },
          ]),
          n
        );
      })()),
      Ve(window).on(Xe.LOAD_DATA_API, function () {
        for (var t = Ve.makeArray(Ve($e.DATA_SPY)), e = t.length; e--; ) {
          var n = Ve(t[e]);
          nn._jQueryInterface.call(n, n.data());
        }
      }),
      (Ve.fn[Qe] = nn._jQueryInterface),
      (Ve.fn[Qe].Constructor = nn),
      (Ve.fn[Qe].noConflict = function () {
        return (Ve.fn[Qe] = Ge), nn._jQueryInterface;
      }),
      nn),
    Pn =
      ((on = "." + (sn = "bs.tab")),
      (an = (rn = e).fn.tab),
      (ln = {
        HIDE: "hide" + on,
        HIDDEN: "hidden" + on,
        SHOW: "show" + on,
        SHOWN: "shown" + on,
        CLICK_DATA_API: "click" + on + ".data-api",
      }),
      (hn = "dropdown-menu"),
      (cn = "active"),
      (un = "disabled"),
      (fn = "fade"),
      (dn = "show"),
      (_n = ".dropdown"),
      (gn = ".nav, .list-group"),
      (mn = ".active"),
      (pn = "> li > .active"),
      (vn = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]'),
      (En = ".dropdown-toggle"),
      (yn = "> .dropdown-menu .active"),
      (Tn = (function () {
        function i(t) {
          this._element = t;
        }
        var t = i.prototype;
        return (
          (t.show = function () {
            var n = this;
            if (
              !(
                (this._element.parentNode &&
                  this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                  rn(this._element).hasClass(cn)) ||
                rn(this._element).hasClass(un)
              )
            ) {
              var t,
                i,
                e = rn(this._element).closest(gn)[0],
                r = Cn.getSelectorFromElement(this._element);
              if (e) {
                var s = "UL" === e.nodeName ? pn : mn;
                i = (i = rn.makeArray(rn(e).find(s)))[i.length - 1];
              }
              var o = rn.Event(ln.HIDE, { relatedTarget: this._element }),
                a = rn.Event(ln.SHOW, { relatedTarget: i });
              if (
                (i && rn(i).trigger(o),
                rn(this._element).trigger(a),
                !a.isDefaultPrevented() && !o.isDefaultPrevented())
              ) {
                r && (t = rn(r)[0]), this._activate(this._element, e);
                var l = function () {
                  var t = rn.Event(ln.HIDDEN, { relatedTarget: n._element }),
                    e = rn.Event(ln.SHOWN, { relatedTarget: i });
                  rn(i).trigger(t), rn(n._element).trigger(e);
                };
                t ? this._activate(t, t.parentNode, l) : l();
              }
            }
          }),
          (t.dispose = function () {
            rn.removeData(this._element, sn), (this._element = null);
          }),
          (t._activate = function (t, e, n) {
            var i = this,
              r = ("UL" === e.nodeName
                ? rn(e).find(pn)
                : rn(e).children(mn))[0],
              s = n && r && rn(r).hasClass(fn),
              o = function () {
                return i._transitionComplete(t, r, n);
              };
            if (r && s) {
              var a = Cn.getTransitionDurationFromElement(r);
              rn(r).one(Cn.TRANSITION_END, o).emulateTransitionEnd(a);
            } else o();
          }),
          (t._transitionComplete = function (t, e, n) {
            if (e) {
              rn(e).removeClass(dn + " " + cn);
              var i = rn(e.parentNode).find(yn)[0];
              i && rn(i).removeClass(cn),
                "tab" === e.getAttribute("role") &&
                  e.setAttribute("aria-selected", !1);
            }
            if (
              (rn(t).addClass(cn),
              "tab" === t.getAttribute("role") &&
                t.setAttribute("aria-selected", !0),
              Cn.reflow(t),
              rn(t).addClass(dn),
              t.parentNode && rn(t.parentNode).hasClass(hn))
            ) {
              var r = rn(t).closest(_n)[0];
              r && rn(r).find(En).addClass(cn),
                t.setAttribute("aria-expanded", !0);
            }
            n && n();
          }),
          (i._jQueryInterface = function (n) {
            return this.each(function () {
              var t = rn(this),
                e = t.data(sn);
              if (
                (e || ((e = new i(this)), t.data(sn, e)), "string" == typeof n)
              ) {
                if ("undefined" == typeof e[n])
                  throw new TypeError('No method named "' + n + '"');
                e[n]();
              }
            });
          }),
          o(i, null, [
            {
              key: "VERSION",
              get: function () {
                return "4.1.1";
              },
            },
          ]),
          i
        );
      })()),
      rn(document).on(ln.CLICK_DATA_API, vn, function (t) {
        t.preventDefault(), Tn._jQueryInterface.call(rn(this), "show");
      }),
      (rn.fn.tab = Tn._jQueryInterface),
      (rn.fn.tab.Constructor = Tn),
      (rn.fn.tab.noConflict = function () {
        return (rn.fn.tab = an), Tn._jQueryInterface;
      }),
      Tn);
  !(function (t) {
    if ("undefined" == typeof t)
      throw new TypeError(
        "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
      );
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (
      (e[0] < 2 && e[1] < 9) ||
      (1 === e[0] && 9 === e[1] && e[2] < 1) ||
      4 <= e[0]
    )
      throw new Error(
        "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
      );
  })(e),
    (t.Util = Cn),
    (t.Alert = In),
    (t.Button = An),
    (t.Carousel = Dn),
    (t.Collapse = bn),
    (t.Dropdown = Sn),
    (t.Modal = wn),
    (t.Popover = On),
    (t.Scrollspy = kn),
    (t.Tab = Pn),
    (t.Tooltip = Nn),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
!(function (a, b, c, d) {
  function e(b, c) {
    (this.settings = null),
      (this.options = a.extend({}, e.Defaults, c)),
      (this.$element = a(b)),
      (this._handlers = {}),
      (this._plugins = {}),
      (this._supress = {}),
      (this._current = null),
      (this._speed = null),
      (this._coordinates = []),
      (this._breakpoint = null),
      (this._width = null),
      (this._items = []),
      (this._clones = []),
      (this._mergers = []),
      (this._widths = []),
      (this._invalidated = {}),
      (this._pipe = []),
      (this._drag = {
        time: null,
        target: null,
        pointer: null,
        stage: { start: null, current: null },
        direction: null,
      }),
      (this._states = {
        current: {},
        tags: {
          initializing: ["busy"],
          animating: ["busy"],
          dragging: ["interacting"],
        },
      }),
      a.each(
        ["onResize", "onThrottledResize"],
        a.proxy(function (b, c) {
          this._handlers[c] = a.proxy(this[c], this);
        }, this)
      ),
      a.each(
        e.Plugins,
        a.proxy(function (a, b) {
          this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this);
        }, this)
      ),
      a.each(
        e.Workers,
        a.proxy(function (b, c) {
          this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) });
        }, this)
      ),
      this.setup(),
      this.initialize();
  }
  (e.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    checkVisibility: !0,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: b,
    fallbackEasing: "swing",
    slideTransition: "",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab",
  }),
    (e.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
    (e.Type = { Event: "event", State: "state" }),
    (e.Plugins = {}),
    (e.Workers = [
      {
        filter: ["width", "settings"],
        run: function () {
          this._width = this.$element.width();
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          a.current = this._items && this._items[this.relative(this._current)];
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          this.$stage.children(".cloned").remove();
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var b = this.settings.margin || "",
            c = !this.settings.autoWidth,
            d = this.settings.rtl,
            e = {
              width: "auto",
              "margin-left": d ? b : "",
              "margin-right": d ? "" : b,
            };
          !c && this.$stage.children().css(e), (a.css = e);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var b =
              (this.width() / this.settings.items).toFixed(3) -
              this.settings.margin,
            c = null,
            d = this._items.length,
            e = !this.settings.autoWidth,
            f = [];
          for (a.items = { merge: !1, width: b }; d--; )
            (c = this._mergers[d]),
              (c =
                (this.settings.mergeFit && Math.min(c, this.settings.items)) ||
                c),
              (a.items.merge = c > 1 || a.items.merge),
              (f[d] = e ? b * c : this._items[d].width());
          this._widths = f;
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          var b = [],
            c = this._items,
            d = this.settings,
            e = Math.max(2 * d.items, 4),
            f = 2 * Math.ceil(c.length / 2),
            g = d.loop && c.length ? (d.rewind ? e : Math.max(e, f)) : 0,
            h = "",
            i = "";
          for (g /= 2; g > 0; )
            b.push(this.normalize(b.length / 2, !0)),
              (h += c[b[b.length - 1]][0].outerHTML),
              b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)),
              (i = c[b[b.length - 1]][0].outerHTML + i),
              (g -= 1);
          (this._clones = b),
            a(h).addClass("cloned").appendTo(this.$stage),
            a(i).addClass("cloned").prependTo(this.$stage);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          for (
            var a = this.settings.rtl ? 1 : -1,
              b = this._clones.length + this._items.length,
              c = -1,
              d = 0,
              e = 0,
              f = [];
            ++c < b;

          )
            (d = f[c - 1] || 0),
              (e = this._widths[this.relative(c)] + this.settings.margin),
              f.push(d + e * a);
          this._coordinates = f;
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          var a = this.settings.stagePadding,
            b = this._coordinates,
            c = {
              width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
              "padding-left": a || "",
              "padding-right": a || "",
            };
          this.$stage.css(c);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var b = this._coordinates.length,
            c = !this.settings.autoWidth,
            d = this.$stage.children();
          if (c && a.items.merge)
            for (; b--; )
              (a.css.width = this._widths[this.relative(b)]),
                d.eq(b).css(a.css);
          else c && ((a.css.width = a.items.width), d.css(a.css));
        },
      },
      {
        filter: ["items"],
        run: function () {
          this._coordinates.length < 1 && this.$stage.removeAttr("style");
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          (a.current = a.current ? this.$stage.children().index(a.current) : 0),
            (a.current = Math.max(
              this.minimum(),
              Math.min(this.maximum(), a.current)
            )),
            this.reset(a.current);
        },
      },
      {
        filter: ["position"],
        run: function () {
          this.animate(this.coordinates(this._current));
        },
      },
      {
        filter: ["width", "position", "items", "settings"],
        run: function () {
          var a,
            b,
            c,
            d,
            e = this.settings.rtl ? 1 : -1,
            f = 2 * this.settings.stagePadding,
            g = this.coordinates(this.current()) + f,
            h = g + this.width() * e,
            i = [];
          for (c = 0, d = this._coordinates.length; c < d; c++)
            (a = this._coordinates[c - 1] || 0),
              (b = Math.abs(this._coordinates[c]) + f * e),
              ((this.op(a, "<=", g) && this.op(a, ">", h)) ||
                (this.op(b, "<", g) && this.op(b, ">", h))) &&
                i.push(c);
          this.$stage.children(".active").removeClass("active"),
            this.$stage
              .children(":eq(" + i.join("), :eq(") + ")")
              .addClass("active"),
            this.$stage.children(".center").removeClass("center"),
            this.settings.center &&
              this.$stage.children().eq(this.current()).addClass("center");
        },
      },
    ]),
    (e.prototype.initializeStage = function () {
      (this.$stage = this.$element.find("." + this.settings.stageClass)),
        this.$stage.length ||
          (this.$element.addClass(this.options.loadingClass),
          (this.$stage = a("<" + this.settings.stageElement + ">", {
            class: this.settings.stageClass,
          }).wrap(a("<div/>", { class: this.settings.stageOuterClass }))),
          this.$element.append(this.$stage.parent()));
    }),
    (e.prototype.initializeItems = function () {
      var b = this.$element.find(".owl-item");
      if (b.length)
        return (
          (this._items = b.get().map(function (b) {
            return a(b);
          })),
          (this._mergers = this._items.map(function () {
            return 1;
          })),
          void this.refresh()
        );
      this.replace(this.$element.children().not(this.$stage.parent())),
        this.isVisible() ? this.refresh() : this.invalidate("width"),
        this.$element
          .removeClass(this.options.loadingClass)
          .addClass(this.options.loadedClass);
    }),
    (e.prototype.initialize = function () {
      if (
        (this.enter("initializing"),
        this.trigger("initialize"),
        this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
        this.settings.autoWidth && !this.is("pre-loading"))
      ) {
        var a, b, c;
        (a = this.$element.find("img")),
          (b = this.settings.nestedItemSelector
            ? "." + this.settings.nestedItemSelector
            : d),
          (c = this.$element.children(b).width()),
          a.length && c <= 0 && this.preloadAutoWidthImages(a);
      }
      this.initializeStage(),
        this.initializeItems(),
        this.registerEventHandlers(),
        this.leave("initializing"),
        this.trigger("initialized");
    }),
    (e.prototype.isVisible = function () {
      return !this.settings.checkVisibility || this.$element.is(":visible");
    }),
    (e.prototype.setup = function () {
      var b = this.viewport(),
        c = this.options.responsive,
        d = -1,
        e = null;
      c
        ? (a.each(c, function (a) {
            a <= b && a > d && (d = Number(a));
          }),
          (e = a.extend({}, this.options, c[d])),
          "function" == typeof e.stagePadding &&
            (e.stagePadding = e.stagePadding()),
          delete e.responsive,
          e.responsiveClass &&
            this.$element.attr(
              "class",
              this.$element
                .attr("class")
                .replace(
                  new RegExp(
                    "(" + this.options.responsiveClass + "-)\\S+\\s",
                    "g"
                  ),
                  "$1" + d
                )
            ))
        : (e = a.extend({}, this.options)),
        this.trigger("change", { property: { name: "settings", value: e } }),
        (this._breakpoint = d),
        (this.settings = e),
        this.invalidate("settings"),
        this.trigger("changed", {
          property: { name: "settings", value: this.settings },
        });
    }),
    (e.prototype.optionsLogic = function () {
      this.settings.autoWidth &&
        ((this.settings.stagePadding = !1), (this.settings.merge = !1));
    }),
    (e.prototype.prepare = function (b) {
      var c = this.trigger("prepare", { content: b });
      return (
        c.data ||
          (c.data = a("<" + this.settings.itemElement + "/>")
            .addClass(this.options.itemClass)
            .append(b)),
        this.trigger("prepared", { content: c.data }),
        c.data
      );
    }),
    (e.prototype.update = function () {
      for (
        var b = 0,
          c = this._pipe.length,
          d = a.proxy(function (a) {
            return this[a];
          }, this._invalidated),
          e = {};
        b < c;

      )
        (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) &&
          this._pipe[b].run(e),
          b++;
      (this._invalidated = {}), !this.is("valid") && this.enter("valid");
    }),
    (e.prototype.width = function (a) {
      switch ((a = a || e.Width.Default)) {
        case e.Width.Inner:
        case e.Width.Outer:
          return this._width;
        default:
          return (
            this._width - 2 * this.settings.stagePadding + this.settings.margin
          );
      }
    }),
    (e.prototype.refresh = function () {
      this.enter("refreshing"),
        this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$element.addClass(this.options.refreshClass),
        this.update(),
        this.$element.removeClass(this.options.refreshClass),
        this.leave("refreshing"),
        this.trigger("refreshed");
    }),
    (e.prototype.onThrottledResize = function () {
      b.clearTimeout(this.resizeTimer),
        (this.resizeTimer = b.setTimeout(
          this._handlers.onResize,
          this.settings.responsiveRefreshRate
        ));
    }),
    (e.prototype.onResize = function () {
      return (
        !!this._items.length &&
        this._width !== this.$element.width() &&
        !!this.isVisible() &&
        (this.enter("resizing"),
        this.trigger("resize").isDefaultPrevented()
          ? (this.leave("resizing"), !1)
          : (this.invalidate("width"),
            this.refresh(),
            this.leave("resizing"),
            void this.trigger("resized")))
      );
    }),
    (e.prototype.registerEventHandlers = function () {
      a.support.transition &&
        this.$stage.on(
          a.support.transition.end + ".owl.core",
          a.proxy(this.onTransitionEnd, this)
        ),
        !1 !== this.settings.responsive &&
          this.on(b, "resize", this._handlers.onThrottledResize),
        this.settings.mouseDrag &&
          (this.$element.addClass(this.options.dragClass),
          this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)),
          this.$stage.on(
            "dragstart.owl.core selectstart.owl.core",
            function () {
              return !1;
            }
          )),
        this.settings.touchDrag &&
          (this.$stage.on(
            "touchstart.owl.core",
            a.proxy(this.onDragStart, this)
          ),
          this.$stage.on(
            "touchcancel.owl.core",
            a.proxy(this.onDragEnd, this)
          ));
    }),
    (e.prototype.onDragStart = function (b) {
      var d = null;
      3 !== b.which &&
        (a.support.transform
          ? ((d = this.$stage
              .css("transform")
              .replace(/.*\(|\)| /g, "")
              .split(",")),
            (d = {
              x: d[16 === d.length ? 12 : 4],
              y: d[16 === d.length ? 13 : 5],
            }))
          : ((d = this.$stage.position()),
            (d = {
              x: this.settings.rtl
                ? d.left +
                  this.$stage.width() -
                  this.width() +
                  this.settings.margin
                : d.left,
              y: d.top,
            })),
        this.is("animating") &&
          (a.support.transform ? this.animate(d.x) : this.$stage.stop(),
          this.invalidate("position")),
        this.$element.toggleClass(
          this.options.grabClass,
          "mousedown" === b.type
        ),
        this.speed(0),
        (this._drag.time = new Date().getTime()),
        (this._drag.target = a(b.target)),
        (this._drag.stage.start = d),
        (this._drag.stage.current = d),
        (this._drag.pointer = this.pointer(b)),
        a(c).on(
          "mouseup.owl.core touchend.owl.core",
          a.proxy(this.onDragEnd, this)
        ),
        a(c).one(
          "mousemove.owl.core touchmove.owl.core",
          a.proxy(function (b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on(
              "mousemove.owl.core touchmove.owl.core",
              a.proxy(this.onDragMove, this)
            ),
              (Math.abs(d.x) < Math.abs(d.y) && this.is("valid")) ||
                (b.preventDefault(),
                this.enter("dragging"),
                this.trigger("drag"));
          }, this)
        ));
    }),
    (e.prototype.onDragMove = function (a) {
      var b = null,
        c = null,
        d = null,
        e = this.difference(this._drag.pointer, this.pointer(a)),
        f = this.difference(this._drag.stage.start, e);
      this.is("dragging") &&
        (a.preventDefault(),
        this.settings.loop
          ? ((b = this.coordinates(this.minimum())),
            (c = this.coordinates(this.maximum() + 1) - b),
            (f.x = ((((f.x - b) % c) + c) % c) + b))
          : ((b = this.settings.rtl
              ? this.coordinates(this.maximum())
              : this.coordinates(this.minimum())),
            (c = this.settings.rtl
              ? this.coordinates(this.minimum())
              : this.coordinates(this.maximum())),
            (d = this.settings.pullDrag ? (-1 * e.x) / 5 : 0),
            (f.x = Math.max(Math.min(f.x, b + d), c + d))),
        (this._drag.stage.current = f),
        this.animate(f.x));
    }),
    (e.prototype.onDragEnd = function (b) {
      var d = this.difference(this._drag.pointer, this.pointer(b)),
        e = this._drag.stage.current,
        f = (d.x > 0) ^ this.settings.rtl ? "left" : "right";
      a(c).off(".owl.core"),
        this.$element.removeClass(this.options.grabClass),
        ((0 !== d.x && this.is("dragging")) || !this.is("valid")) &&
          (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
          this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)),
          this.invalidate("position"),
          this.update(),
          (this._drag.direction = f),
          (Math.abs(d.x) > 3 || new Date().getTime() - this._drag.time > 300) &&
            this._drag.target.one("click.owl.core", function () {
              return !1;
            })),
        this.is("dragging") &&
          (this.leave("dragging"), this.trigger("dragged"));
    }),
    (e.prototype.closest = function (b, c) {
      var e = -1,
        f = 30,
        g = this.width(),
        h = this.coordinates();
      return (
        this.settings.freeDrag ||
          a.each(
            h,
            a.proxy(function (a, i) {
              return (
                "left" === c && b > i - f && b < i + f
                  ? (e = a)
                  : "right" === c && b > i - g - f && b < i - g + f
                  ? (e = a + 1)
                  : this.op(b, "<", i) &&
                    this.op(b, ">", h[a + 1] !== d ? h[a + 1] : i - g) &&
                    (e = "left" === c ? a + 1 : a),
                -1 === e
              );
            }, this)
          ),
        this.settings.loop ||
          (this.op(b, ">", h[this.minimum()])
            ? (e = b = this.minimum())
            : this.op(b, "<", h[this.maximum()]) && (e = b = this.maximum())),
        e
      );
    }),
    (e.prototype.animate = function (b) {
      var c = this.speed() > 0;
      this.is("animating") && this.onTransitionEnd(),
        c && (this.enter("animating"), this.trigger("translate")),
        a.support.transform3d && a.support.transition
          ? this.$stage.css({
              transform: "translate3d(" + b + "px,0px,0px)",
              transition:
                this.speed() / 1e3 +
                "s" +
                (this.settings.slideTransition
                  ? " " + this.settings.slideTransition
                  : ""),
            })
          : c
          ? this.$stage.animate(
              { left: b + "px" },
              this.speed(),
              this.settings.fallbackEasing,
              a.proxy(this.onTransitionEnd, this)
            )
          : this.$stage.css({ left: b + "px" });
    }),
    (e.prototype.is = function (a) {
      return this._states.current[a] && this._states.current[a] > 0;
    }),
    (e.prototype.current = function (a) {
      if (a === d) return this._current;
      if (0 === this._items.length) return d;
      if (((a = this.normalize(a)), this._current !== a)) {
        var b = this.trigger("change", {
          property: { name: "position", value: a },
        });
        b.data !== d && (a = this.normalize(b.data)),
          (this._current = a),
          this.invalidate("position"),
          this.trigger("changed", {
            property: { name: "position", value: this._current },
          });
      }
      return this._current;
    }),
    (e.prototype.invalidate = function (b) {
      return (
        "string" === a.type(b) &&
          ((this._invalidated[b] = !0),
          this.is("valid") && this.leave("valid")),
        a.map(this._invalidated, function (a, b) {
          return b;
        })
      );
    }),
    (e.prototype.reset = function (a) {
      (a = this.normalize(a)) !== d &&
        ((this._speed = 0),
        (this._current = a),
        this.suppress(["translate", "translated"]),
        this.animate(this.coordinates(a)),
        this.release(["translate", "translated"]));
    }),
    (e.prototype.normalize = function (a, b) {
      var c = this._items.length,
        e = b ? 0 : this._clones.length;
      return (
        !this.isNumeric(a) || c < 1
          ? (a = d)
          : (a < 0 || a >= c + e) &&
            (a = ((((a - e / 2) % c) + c) % c) + e / 2),
        a
      );
    }),
    (e.prototype.relative = function (a) {
      return (a -= this._clones.length / 2), this.normalize(a, !0);
    }),
    (e.prototype.maximum = function (a) {
      var b,
        c,
        d,
        e = this.settings,
        f = this._coordinates.length;
      if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
      else if (e.autoWidth || e.merge) {
        if ((b = this._items.length))
          for (
            c = this._items[--b].width(), d = this.$element.width();
            b-- && !((c += this._items[b].width() + this.settings.margin) > d);

          );
        f = b + 1;
      } else
        f = e.center ? this._items.length - 1 : this._items.length - e.items;
      return a && (f -= this._clones.length / 2), Math.max(f, 0);
    }),
    (e.prototype.minimum = function (a) {
      return a ? 0 : this._clones.length / 2;
    }),
    (e.prototype.items = function (a) {
      return a === d
        ? this._items.slice()
        : ((a = this.normalize(a, !0)), this._items[a]);
    }),
    (e.prototype.mergers = function (a) {
      return a === d
        ? this._mergers.slice()
        : ((a = this.normalize(a, !0)), this._mergers[a]);
    }),
    (e.prototype.clones = function (b) {
      var c = this._clones.length / 2,
        e = c + this._items.length,
        f = function (a) {
          return a % 2 == 0 ? e + a / 2 : c - (a + 1) / 2;
        };
      return b === d
        ? a.map(this._clones, function (a, b) {
            return f(b);
          })
        : a.map(this._clones, function (a, c) {
            return a === b ? f(c) : null;
          });
    }),
    (e.prototype.speed = function (a) {
      return a !== d && (this._speed = a), this._speed;
    }),
    (e.prototype.coordinates = function (b) {
      var c,
        e = 1,
        f = b - 1;
      return b === d
        ? a.map(
            this._coordinates,
            a.proxy(function (a, b) {
              return this.coordinates(b);
            }, this)
          )
        : (this.settings.center
            ? (this.settings.rtl && ((e = -1), (f = b + 1)),
              (c = this._coordinates[b]),
              (c += ((this.width() - c + (this._coordinates[f] || 0)) / 2) * e))
            : (c = this._coordinates[f] || 0),
          (c = Math.ceil(c)));
    }),
    (e.prototype.duration = function (a, b, c) {
      return 0 === c
        ? 0
        : Math.min(Math.max(Math.abs(b - a), 1), 6) *
            Math.abs(c || this.settings.smartSpeed);
    }),
    (e.prototype.to = function (a, b) {
      var c = this.current(),
        d = null,
        e = a - this.relative(c),
        f = (e > 0) - (e < 0),
        g = this._items.length,
        h = this.minimum(),
        i = this.maximum();
      this.settings.loop
        ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g),
          (a = c + e),
          (d = ((((a - h) % g) + g) % g) + h) !== a &&
            d - e <= i &&
            d - e > 0 &&
            ((c = d - e), (a = d), this.reset(c)))
        : this.settings.rewind
        ? ((i += 1), (a = ((a % i) + i) % i))
        : (a = Math.max(h, Math.min(i, a))),
        this.speed(this.duration(c, a, b)),
        this.current(a),
        this.isVisible() && this.update();
    }),
    (e.prototype.next = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) + 1, a);
    }),
    (e.prototype.prev = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) - 1, a);
    }),
    (e.prototype.onTransitionEnd = function (a) {
      if (
        a !== d &&
        (a.stopPropagation(),
        (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))
      )
        return !1;
      this.leave("animating"), this.trigger("translated");
    }),
    (e.prototype.viewport = function () {
      var d;
      return (
        this.options.responsiveBaseElement !== b
          ? (d = a(this.options.responsiveBaseElement).width())
          : b.innerWidth
          ? (d = b.innerWidth)
          : c.documentElement && c.documentElement.clientWidth
          ? (d = c.documentElement.clientWidth)
          : console.warn("Can not detect viewport width."),
        d
      );
    }),
    (e.prototype.replace = function (b) {
      this.$stage.empty(),
        (this._items = []),
        b && (b = b instanceof jQuery ? b : a(b)),
        this.settings.nestedItemSelector &&
          (b = b.find("." + this.settings.nestedItemSelector)),
        b
          .filter(function () {
            return 1 === this.nodeType;
          })
          .each(
            a.proxy(function (a, b) {
              (b = this.prepare(b)),
                this.$stage.append(b),
                this._items.push(b),
                this._mergers.push(
                  1 *
                    b
                      .find("[data-merge]")
                      .addBack("[data-merge]")
                      .attr("data-merge") || 1
                );
            }, this)
          ),
        this.reset(
          this.isNumeric(this.settings.startPosition)
            ? this.settings.startPosition
            : 0
        ),
        this.invalidate("items");
    }),
    (e.prototype.add = function (b, c) {
      var e = this.relative(this._current);
      (c = c === d ? this._items.length : this.normalize(c, !0)),
        (b = b instanceof jQuery ? b : a(b)),
        this.trigger("add", { content: b, position: c }),
        (b = this.prepare(b)),
        0 === this._items.length || c === this._items.length
          ? (0 === this._items.length && this.$stage.append(b),
            0 !== this._items.length && this._items[c - 1].after(b),
            this._items.push(b),
            this._mergers.push(
              1 *
                b
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            ))
          : (this._items[c].before(b),
            this._items.splice(c, 0, b),
            this._mergers.splice(
              c,
              0,
              1 *
                b
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            )),
        this._items[e] && this.reset(this._items[e].index()),
        this.invalidate("items"),
        this.trigger("added", { content: b, position: c });
    }),
    (e.prototype.remove = function (a) {
      (a = this.normalize(a, !0)) !== d &&
        (this.trigger("remove", { content: this._items[a], position: a }),
        this._items[a].remove(),
        this._items.splice(a, 1),
        this._mergers.splice(a, 1),
        this.invalidate("items"),
        this.trigger("removed", { content: null, position: a }));
    }),
    (e.prototype.preloadAutoWidthImages = function (b) {
      b.each(
        a.proxy(function (b, c) {
          this.enter("pre-loading"),
            (c = a(c)),
            a(new Image())
              .one(
                "load",
                a.proxy(function (a) {
                  c.attr("src", a.target.src),
                    c.css("opacity", 1),
                    this.leave("pre-loading"),
                    !this.is("pre-loading") &&
                      !this.is("initializing") &&
                      this.refresh();
                }, this)
              )
              .attr(
                "src",
                c.attr("src") || c.attr("data-src") || c.attr("data-src-retina")
              );
        }, this)
      );
    }),
    (e.prototype.destroy = function () {
      this.$element.off(".owl.core"),
        this.$stage.off(".owl.core"),
        a(c).off(".owl.core"),
        !1 !== this.settings.responsive &&
          (b.clearTimeout(this.resizeTimer),
          this.off(b, "resize", this._handlers.onThrottledResize));
      for (var d in this._plugins) this._plugins[d].destroy();
      this.$stage.children(".cloned").remove(),
        this.$stage.unwrap(),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$stage.remove(),
        this.$element
          .removeClass(this.options.refreshClass)
          .removeClass(this.options.loadingClass)
          .removeClass(this.options.loadedClass)
          .removeClass(this.options.rtlClass)
          .removeClass(this.options.dragClass)
          .removeClass(this.options.grabClass)
          .attr(
            "class",
            this.$element
              .attr("class")
              .replace(
                new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"),
                ""
              )
          )
          .removeData("owl.carousel");
    }),
    (e.prototype.op = function (a, b, c) {
      var d = this.settings.rtl;
      switch (b) {
        case "<":
          return d ? a > c : a < c;
        case ">":
          return d ? a < c : a > c;
        case ">=":
          return d ? a <= c : a >= c;
        case "<=":
          return d ? a >= c : a <= c;
      }
    }),
    (e.prototype.on = function (a, b, c, d) {
      a.addEventListener
        ? a.addEventListener(b, c, d)
        : a.attachEvent && a.attachEvent("on" + b, c);
    }),
    (e.prototype.off = function (a, b, c, d) {
      a.removeEventListener
        ? a.removeEventListener(b, c, d)
        : a.detachEvent && a.detachEvent("on" + b, c);
    }),
    (e.prototype.trigger = function (b, c, d, f, g) {
      var h = { item: { count: this._items.length, index: this.current() } },
        i = a.camelCase(
          a
            .grep(["on", b, d], function (a) {
              return a;
            })
            .join("-")
            .toLowerCase()
        ),
        j = a.Event(
          [b, "owl", d || "carousel"].join(".").toLowerCase(),
          a.extend({ relatedTarget: this }, h, c)
        );
      return (
        this._supress[b] ||
          (a.each(this._plugins, function (a, b) {
            b.onTrigger && b.onTrigger(j);
          }),
          this.register({ type: e.Type.Event, name: b }),
          this.$element.trigger(j),
          this.settings &&
            "function" == typeof this.settings[i] &&
            this.settings[i].call(this, j)),
        j
      );
    }),
    (e.prototype.enter = function (b) {
      a.each(
        [b].concat(this._states.tags[b] || []),
        a.proxy(function (a, b) {
          this._states.current[b] === d && (this._states.current[b] = 0),
            this._states.current[b]++;
        }, this)
      );
    }),
    (e.prototype.leave = function (b) {
      a.each(
        [b].concat(this._states.tags[b] || []),
        a.proxy(function (a, b) {
          this._states.current[b]--;
        }, this)
      );
    }),
    (e.prototype.register = function (b) {
      if (b.type === e.Type.Event) {
        if (
          (a.event.special[b.name] || (a.event.special[b.name] = {}),
          !a.event.special[b.name].owl)
        ) {
          var c = a.event.special[b.name]._default;
          (a.event.special[b.name]._default = function (a) {
            return !c ||
              !c.apply ||
              (a.namespace && -1 !== a.namespace.indexOf("owl"))
              ? a.namespace && a.namespace.indexOf("owl") > -1
              : c.apply(this, arguments);
          }),
            (a.event.special[b.name].owl = !0);
        }
      } else
        b.type === e.Type.State &&
          (this._states.tags[b.name]
            ? (this._states.tags[b.name] = this._states.tags[b.name].concat(
                b.tags
              ))
            : (this._states.tags[b.name] = b.tags),
          (this._states.tags[b.name] = a.grep(
            this._states.tags[b.name],
            a.proxy(function (c, d) {
              return a.inArray(c, this._states.tags[b.name]) === d;
            }, this)
          )));
    }),
    (e.prototype.suppress = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          this._supress[b] = !0;
        }, this)
      );
    }),
    (e.prototype.release = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          delete this._supress[b];
        }, this)
      );
    }),
    (e.prototype.pointer = function (a) {
      var c = { x: null, y: null };
      return (
        (a = a.originalEvent || a || b.event),
        (a =
          a.touches && a.touches.length
            ? a.touches[0]
            : a.changedTouches && a.changedTouches.length
            ? a.changedTouches[0]
            : a),
        a.pageX
          ? ((c.x = a.pageX), (c.y = a.pageY))
          : ((c.x = a.clientX), (c.y = a.clientY)),
        c
      );
    }),
    (e.prototype.isNumeric = function (a) {
      return !isNaN(parseFloat(a));
    }),
    (e.prototype.difference = function (a, b) {
      return { x: a.x - b.x, y: a.y - b.y };
    }),
    (a.fn.owlCarousel = function (b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        var d = a(this),
          f = d.data("owl.carousel");
        f ||
          ((f = new e(this, "object" == typeof b && b)),
          d.data("owl.carousel", f),
          a.each(
            [
              "next",
              "prev",
              "to",
              "destroy",
              "refresh",
              "replace",
              "add",
              "remove",
            ],
            function (b, c) {
              f.register({ type: e.Type.Event, name: c }),
                f.$element.on(
                  c + ".owl.carousel.core",
                  a.proxy(function (a) {
                    a.namespace &&
                      a.relatedTarget !== this &&
                      (this.suppress([c]),
                      f[c].apply(this, [].slice.call(arguments, 1)),
                      this.release([c]));
                  }, f)
                );
            }
          )),
          "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c);
      });
    }),
    (a.fn.owlCarousel.Constructor = e);
})(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._interval = null),
        (this._visible = null),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace && this._core.settings.autoRefresh && this.watch();
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
      (e.prototype.watch = function () {
        this._interval ||
          ((this._visible = this._core.isVisible()),
          (this._interval = b.setInterval(
            a.proxy(this.refresh, this),
            this._core.settings.autoRefreshInterval
          )));
      }),
      (e.prototype.refresh = function () {
        this._core.isVisible() !== this._visible &&
          ((this._visible = !this._visible),
          this._core.$element.toggleClass("owl-hidden", !this._visible),
          this._visible &&
            this._core.invalidate("width") &&
            this._core.refresh());
      }),
      (e.prototype.destroy = function () {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._loaded = []),
        (this._handlers = {
          "initialized.owl.carousel change.owl.carousel resized.owl.carousel": a.proxy(
            function (b) {
              if (
                b.namespace &&
                this._core.settings &&
                this._core.settings.lazyLoad &&
                ((b.property && "position" == b.property.name) ||
                  "initialized" == b.type)
              ) {
                var c = this._core.settings,
                  e = (c.center && Math.ceil(c.items / 2)) || c.items,
                  f = (c.center && -1 * e) || 0,
                  g =
                    (b.property && b.property.value !== d
                      ? b.property.value
                      : this._core.current()) + f,
                  h = this._core.clones().length,
                  i = a.proxy(function (a, b) {
                    this.load(b);
                  }, this);
                for (
                  c.lazyLoadEager > 0 &&
                  ((e += c.lazyLoadEager),
                  c.loop && ((g -= c.lazyLoadEager), e++));
                  f++ < e;

                )
                  this.load(h / 2 + this._core.relative(g)),
                    h && a.each(this._core.clones(this._core.relative(g)), i),
                    g++;
              }
            },
            this
          ),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { lazyLoad: !1, lazyLoadEager: 0 }),
      (e.prototype.load = function (c) {
        var d = this._core.$stage.children().eq(c),
          e = d && d.find(".owl-lazy");
        !e ||
          a.inArray(d.get(0), this._loaded) > -1 ||
          (e.each(
            a.proxy(function (c, d) {
              var e,
                f = a(d),
                g =
                  (b.devicePixelRatio > 1 && f.attr("data-src-retina")) ||
                  f.attr("data-src") ||
                  f.attr("data-srcset");
              this._core.trigger("load", { element: f, url: g }, "lazy"),
                f.is("img")
                  ? f
                      .one(
                        "load.owl.lazy",
                        a.proxy(function () {
                          f.css("opacity", 1),
                            this._core.trigger(
                              "loaded",
                              { element: f, url: g },
                              "lazy"
                            );
                        }, this)
                      )
                      .attr("src", g)
                  : f.is("source")
                  ? f
                      .one(
                        "load.owl.lazy",
                        a.proxy(function () {
                          this._core.trigger(
                            "loaded",
                            { element: f, url: g },
                            "lazy"
                          );
                        }, this)
                      )
                      .attr("srcset", g)
                  : ((e = new Image()),
                    (e.onload = a.proxy(function () {
                      f.css({
                        "background-image": 'url("' + g + '")',
                        opacity: "1",
                      }),
                        this._core.trigger(
                          "loaded",
                          { element: f, url: g },
                          "lazy"
                        );
                    }, this)),
                    (e.src = g));
            }, this)
          ),
          this._loaded.push(d.get(0)));
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Lazy = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (c) {
      (this._core = c),
        (this._previousHeight = null),
        (this._handlers = {
          "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (
            a
          ) {
            a.namespace && this._core.settings.autoHeight && this.update();
          },
          this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              "position" === a.property.name &&
              this.update();
          }, this),
          "loaded.owl.lazy": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              a.element.closest("." + this._core.settings.itemClass).index() ===
                this._core.current() &&
              this.update();
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        (this._intervalId = null);
      var d = this;
      a(b).on("load", function () {
        d._core.settings.autoHeight && d.update();
      }),
        a(b).resize(function () {
          d._core.settings.autoHeight &&
            (null != d._intervalId && clearTimeout(d._intervalId),
            (d._intervalId = setTimeout(function () {
              d.update();
            }, 250)));
        });
    };
    (e.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
      (e.prototype.update = function () {
        var b = this._core._current,
          c = b + this._core.settings.items,
          d = this._core.settings.lazyLoad,
          e = this._core.$stage.children().toArray().slice(b, c),
          f = [],
          g = 0;
        a.each(e, function (b, c) {
          f.push(a(c).height());
        }),
          (g = Math.max.apply(null, f)),
          g <= 1 && d && this._previousHeight && (g = this._previousHeight),
          (this._previousHeight = g),
          this._core.$stage
            .parent()
            .height(g)
            .addClass(this._core.settings.autoHeightClass);
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._videos = {}),
        (this._playing = null),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.register({
                type: "state",
                name: "playing",
                tags: ["interacting"],
              });
          }, this),
          "resize.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.video &&
              this.isInFullScreen() &&
              a.preventDefault();
          }, this),
          "refreshed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.is("resizing") &&
              this._core.$stage.find(".cloned .owl-video-frame").remove();
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              "position" === a.property.name &&
              this._playing &&
              this.stop();
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            if (b.namespace) {
              var c = a(b.content).find(".owl-video");
              c.length &&
                (c.css("display", "none"), this.fetch(c, a(b.content)));
            }
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          "click.owl.video",
          ".owl-video-play-icon",
          a.proxy(function (a) {
            this.play(a);
          }, this)
        );
    };
    (e.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
      (e.prototype.fetch = function (a, b) {
        var c = (function () {
            return a.attr("data-vimeo-id")
              ? "vimeo"
              : a.attr("data-vzaar-id")
              ? "vzaar"
              : "youtube";
          })(),
          d =
            a.attr("data-vimeo-id") ||
            a.attr("data-youtube-id") ||
            a.attr("data-vzaar-id"),
          e = a.attr("data-width") || this._core.settings.videoWidth,
          f = a.attr("data-height") || this._core.settings.videoHeight,
          g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (
          ((d = g.match(
            /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
          )),
          d[3].indexOf("youtu") > -1)
        )
          c = "youtube";
        else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
        else {
          if (!(d[3].indexOf("vzaar") > -1))
            throw new Error("Video URL not supported.");
          c = "vzaar";
        }
        (d = d[6]),
          (this._videos[g] = { type: c, id: d, width: e, height: f }),
          b.attr("data-video", g),
          this.thumbnail(a, this._videos[g]);
      }),
      (e.prototype.thumbnail = function (b, c) {
        var d,
          e,
          f,
          g =
            c.width && c.height
              ? "width:" + c.width + "px;height:" + c.height + "px;"
              : "",
          h = b.find("img"),
          i = "src",
          j = "",
          k = this._core.settings,
          l = function (c) {
            (e = '<div class="owl-video-play-icon"></div>'),
              (d = k.lazyLoad
                ? a("<div/>", { class: "owl-video-tn " + j, srcType: c })
                : a("<div/>", {
                    class: "owl-video-tn",
                    style: "opacity:1;background-image:url(" + c + ")",
                  })),
              b.after(d),
              b.after(e);
          };
        if (
          (b.wrap(a("<div/>", { class: "owl-video-wrapper", style: g })),
          this._core.settings.lazyLoad && ((i = "data-src"), (j = "owl-lazy")),
          h.length)
        )
          return l(h.attr(i)), h.remove(), !1;
        "youtube" === c.type
          ? ((f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg"), l(f))
          : "vimeo" === c.type
          ? a.ajax({
              type: "GET",
              url: "//vimeo.com/api/v2/video/" + c.id + ".json",
              jsonp: "callback",
              dataType: "jsonp",
              success: function (a) {
                (f = a[0].thumbnail_large), l(f);
              },
            })
          : "vzaar" === c.type &&
            a.ajax({
              type: "GET",
              url: "//vzaar.com/api/videos/" + c.id + ".json",
              jsonp: "callback",
              dataType: "jsonp",
              success: function (a) {
                (f = a.framegrab_url), l(f);
              },
            });
      }),
      (e.prototype.stop = function () {
        this._core.trigger("stop", null, "video"),
          this._playing.find(".owl-video-frame").remove(),
          this._playing.removeClass("owl-video-playing"),
          (this._playing = null),
          this._core.leave("playing"),
          this._core.trigger("stopped", null, "video");
      }),
      (e.prototype.play = function (b) {
        var c,
          d = a(b.target),
          e = d.closest("." + this._core.settings.itemClass),
          f = this._videos[e.attr("data-video")],
          g = f.width || "100%",
          h = f.height || this._core.$stage.height();
        this._playing ||
          (this._core.enter("playing"),
          this._core.trigger("play", null, "video"),
          (e = this._core.items(this._core.relative(e.index()))),
          this._core.reset(e.index()),
          (c = a(
            '<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'
          )),
          c.attr("height", h),
          c.attr("width", g),
          "youtube" === f.type
            ? c.attr(
                "src",
                "//www.youtube.com/embed/" +
                  f.id +
                  "?autoplay=1&rel=0&v=" +
                  f.id
              )
            : "vimeo" === f.type
            ? c.attr("src", "//player.vimeo.com/video/" + f.id + "?autoplay=1")
            : "vzaar" === f.type &&
              c.attr(
                "src",
                "//view.vzaar.com/" + f.id + "/player?autoplay=true"
              ),
          a(c)
            .wrap('<div class="owl-video-frame" />')
            .insertAfter(e.find(".owl-video")),
          (this._playing = e.addClass("owl-video-playing")));
      }),
      (e.prototype.isInFullScreen = function () {
        var b =
          c.fullscreenElement ||
          c.mozFullScreenElement ||
          c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame");
      }),
      (e.prototype.destroy = function () {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Video = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this.core = b),
        (this.core.options = a.extend({}, e.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = d),
        (this.next = d),
        (this.handlers = {
          "change.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              "position" == a.property.name &&
              ((this.previous = this.core.current()),
              (this.next = a.property.value));
          }, this),
          "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(
            function (a) {
              a.namespace && (this.swapping = "translated" == a.type);
            },
            this
          ),
          "translate.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this.swapping &&
              (this.core.options.animateOut || this.core.options.animateIn) &&
              this.swap();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (e.Defaults = { animateOut: !1, animateIn: !1 }),
      (e.prototype.swap = function () {
        if (
          1 === this.core.settings.items &&
          a.support.animation &&
          a.support.transition
        ) {
          this.core.speed(0);
          var b,
            c = a.proxy(this.clear, this),
            d = this.core.$stage.children().eq(this.previous),
            e = this.core.$stage.children().eq(this.next),
            f = this.core.settings.animateIn,
            g = this.core.settings.animateOut;
          this.core.current() !== this.previous &&
            (g &&
              ((b =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
              d
                .one(a.support.animation.end, c)
                .css({ left: b + "px" })
                .addClass("animated owl-animated-out")
                .addClass(g)),
            f &&
              e
                .one(a.support.animation.end, c)
                .addClass("animated owl-animated-in")
                .addClass(f));
        }
      }),
      (e.prototype.clear = function (b) {
        a(b.target)
          .css({ left: "" })
          .removeClass("animated owl-animated-out owl-animated-in")
          .removeClass(this.core.settings.animateIn)
          .removeClass(this.core.settings.animateOut),
          this.core.onTransitionEnd();
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Animate = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._call = null),
        (this._time = 0),
        (this._timeout = 0),
        (this._paused = !0),
        (this._handlers = {
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace && "settings" === a.property.name
              ? this._core.settings.autoplay
                ? this.play()
                : this.stop()
              : a.namespace &&
                "position" === a.property.name &&
                this._paused &&
                (this._time = 0);
          }, this),
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace && this._core.settings.autoplay && this.play();
          }, this),
          "play.owl.autoplay": a.proxy(function (a, b, c) {
            a.namespace && this.play(b, c);
          }, this),
          "stop.owl.autoplay": a.proxy(function (a) {
            a.namespace && this.stop();
          }, this),
          "mouseover.owl.autoplay": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "mouseleave.owl.autoplay": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.play();
          }, this),
          "touchstart.owl.core": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "touchend.owl.core": a.proxy(function () {
            this._core.settings.autoplayHoverPause && this.play();
          }, this),
        }),
        this._core.$element.on(this._handlers),
        (this._core.options = a.extend({}, e.Defaults, this._core.options));
    };
    (e.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1,
    }),
      (e.prototype._next = function (d) {
        (this._call = b.setTimeout(
          a.proxy(this._next, this, d),
          this._timeout * (Math.round(this.read() / this._timeout) + 1) -
            this.read()
        )),
          this._core.is("interacting") ||
            c.hidden ||
            this._core.next(d || this._core.settings.autoplaySpeed);
      }),
      (e.prototype.read = function () {
        return new Date().getTime() - this._time;
      }),
      (e.prototype.play = function (c, d) {
        var e;
        this._core.is("rotating") || this._core.enter("rotating"),
          (c = c || this._core.settings.autoplayTimeout),
          (e = Math.min(this._time % (this._timeout || c), c)),
          this._paused
            ? ((this._time = this.read()), (this._paused = !1))
            : b.clearTimeout(this._call),
          (this._time += (this.read() % c) - e),
          (this._timeout = c),
          (this._call = b.setTimeout(a.proxy(this._next, this, d), c - e));
      }),
      (e.prototype.stop = function () {
        this._core.is("rotating") &&
          ((this._time = 0),
          (this._paused = !0),
          b.clearTimeout(this._call),
          this._core.leave("rotating"));
      }),
      (e.prototype.pause = function () {
        this._core.is("rotating") &&
          !this._paused &&
          ((this._time = this.read()),
          (this._paused = !0),
          b.clearTimeout(this._call));
      }),
      (e.prototype.destroy = function () {
        var a, b;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.autoplay = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    "use strict";
    var e = function (b) {
      (this._core = b),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to,
        }),
        (this._handlers = {
          "prepared.owl.carousel": a.proxy(function (b) {
            b.namespace &&
              this._core.settings.dotsData &&
              this._templates.push(
                '<div class="' +
                  this._core.settings.dotClass +
                  '">' +
                  a(b.content)
                    .find("[data-dot]")
                    .addBack("[data-dot]")
                    .attr("data-dot") +
                  "</div>"
              );
          }, this),
          "added.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 0, this._templates.pop());
          }, this),
          "remove.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 1);
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace && "position" == a.property.name && this.draw();
          }, this),
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              !this._initialized &&
              (this._core.trigger("initialize", null, "navigation"),
              this.initialize(),
              this.update(),
              this.draw(),
              (this._initialized = !0),
              this._core.trigger("initialized", null, "navigation"));
          }, this),
          "refreshed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._initialized &&
              (this._core.trigger("refresh", null, "navigation"),
              this.update(),
              this.draw(),
              this._core.trigger("refreshed", null, "navigation"));
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers);
    };
    (e.Defaults = {
      nav: !1,
      navText: [
        '<span aria-label="Previous">&#x2039;</span>',
        '<span aria-label="Next">&#x203a;</span>',
      ],
      navSpeed: !1,
      navElement: 'button type="button" role="presentation"',
      navContainer: !1,
      navContainerClass: "owl-nav",
      navClass: ["owl-prev", "owl-next"],
      slideBy: 1,
      dotClass: "owl-dot",
      dotsClass: "owl-dots",
      dots: !0,
      dotsEach: !1,
      dotsData: !1,
      dotsSpeed: !1,
      dotsContainer: !1,
    }),
      (e.prototype.initialize = function () {
        var b,
          c = this._core.settings;
        (this._controls.$relative = (c.navContainer
          ? a(c.navContainer)
          : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)
        ).addClass("disabled")),
          (this._controls.$previous = a("<" + c.navElement + ">")
            .addClass(c.navClass[0])
            .html(c.navText[0])
            .prependTo(this._controls.$relative)
            .on(
              "click",
              a.proxy(function (a) {
                this.prev(c.navSpeed);
              }, this)
            )),
          (this._controls.$next = a("<" + c.navElement + ">")
            .addClass(c.navClass[1])
            .html(c.navText[1])
            .appendTo(this._controls.$relative)
            .on(
              "click",
              a.proxy(function (a) {
                this.next(c.navSpeed);
              }, this)
            )),
          c.dotsData ||
            (this._templates = [
              a('<button role="button">')
                .addClass(c.dotClass)
                .append(a("<span>"))
                .prop("outerHTML"),
            ]),
          (this._controls.$absolute = (c.dotsContainer
            ? a(c.dotsContainer)
            : a("<div>").addClass(c.dotsClass).appendTo(this.$element)
          ).addClass("disabled")),
          this._controls.$absolute.on(
            "click",
            "button",
            a.proxy(function (b) {
              var d = a(b.target).parent().is(this._controls.$absolute)
                ? a(b.target).index()
                : a(b.target).parent().index();
              b.preventDefault(), this.to(d, c.dotsSpeed);
            }, this)
          );
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this);
      }),
      (e.prototype.destroy = function () {
        var a, b, c, d, e;
        e = this._core.settings;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls)
          "$relative" === b && e.navContainer
            ? this._controls[b].html("")
            : this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (e.prototype.update = function () {
        var a,
          b,
          c,
          d = this._core.clones().length / 2,
          e = d + this._core.items().length,
          f = this._core.maximum(!0),
          g = this._core.settings,
          h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if (
          ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)),
          g.dots || "page" == g.slideBy)
        )
          for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
            if (b >= h || 0 === b) {
              if (
                (this._pages.push({
                  start: Math.min(f, a - d),
                  end: a - d + h - 1,
                }),
                Math.min(f, a - d) === f)
              )
                break;
              (b = 0), ++c;
            }
            b += this._core.mergers(this._core.relative(a));
          }
      }),
      (e.prototype.draw = function () {
        var b,
          c = this._core.settings,
          d = this._core.items().length <= c.items,
          e = this._core.relative(this._core.current()),
          f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d),
          c.nav &&
            (this._controls.$previous.toggleClass(
              "disabled",
              !f && e <= this._core.minimum(!0)
            ),
            this._controls.$next.toggleClass(
              "disabled",
              !f && e >= this._core.maximum(!0)
            )),
          this._controls.$absolute.toggleClass("disabled", !c.dots || d),
          c.dots &&
            ((b =
              this._pages.length - this._controls.$absolute.children().length),
            c.dotsData && 0 !== b
              ? this._controls.$absolute.html(this._templates.join(""))
              : b > 0
              ? this._controls.$absolute.append(
                  new Array(b + 1).join(this._templates[0])
                )
              : b < 0 && this._controls.$absolute.children().slice(b).remove(),
            this._controls.$absolute.find(".active").removeClass("active"),
            this._controls.$absolute
              .children()
              .eq(a.inArray(this.current(), this._pages))
              .addClass("active"));
      }),
      (e.prototype.onTrigger = function (b) {
        var c = this._core.settings;
        b.page = {
          index: a.inArray(this.current(), this._pages),
          count: this._pages.length,
          size:
            c &&
            (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items),
        };
      }),
      (e.prototype.current = function () {
        var b = this._core.relative(this._core.current());
        return a
          .grep(
            this._pages,
            a.proxy(function (a, c) {
              return a.start <= b && a.end >= b;
            }, this)
          )
          .pop();
      }),
      (e.prototype.getPosition = function (b) {
        var c,
          d,
          e = this._core.settings;
        return (
          "page" == e.slideBy
            ? ((c = a.inArray(this.current(), this._pages)),
              (d = this._pages.length),
              b ? ++c : --c,
              (c = this._pages[((c % d) + d) % d].start))
            : ((c = this._core.relative(this._core.current())),
              (d = this._core.items().length),
              b ? (c += e.slideBy) : (c -= e.slideBy)),
          c
        );
      }),
      (e.prototype.next = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
      }),
      (e.prototype.prev = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
      }),
      (e.prototype.to = function (b, c, d) {
        var e;
        !d && this._pages.length
          ? ((e = this._pages.length),
            a.proxy(this._overrides.to, this._core)(
              this._pages[((b % e) + e) % e].start,
              c
            ))
          : a.proxy(this._overrides.to, this._core)(b, c);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Navigation = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    "use strict";
    var e = function (c) {
      (this._core = c),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (c) {
            c.namespace &&
              "URLHash" === this._core.settings.startPosition &&
              a(b).trigger("hashchange.owl.navigation");
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            if (b.namespace) {
              var c = a(b.content)
                .find("[data-hash]")
                .addBack("[data-hash]")
                .attr("data-hash");
              if (!c) return;
              this._hashes[c] = b.content;
            }
          }, this),
          "changed.owl.carousel": a.proxy(function (c) {
            if (c.namespace && "position" === c.property.name) {
              var d = this._core.items(
                  this._core.relative(this._core.current())
                ),
                e = a
                  .map(this._hashes, function (a, b) {
                    return a === d ? b : null;
                  })
                  .join();
              if (!e || b.location.hash.slice(1) === e) return;
              b.location.hash = e;
            }
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        a(b).on(
          "hashchange.owl.navigation",
          a.proxy(function (a) {
            var c = b.location.hash.substring(1),
              e = this._core.$stage.children(),
              f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d &&
              f !== this._core.current() &&
              this._core.to(this._core.relative(f), !1, !0);
          }, this)
        );
    };
    (e.Defaults = { URLhashListener: !1 }),
      (e.prototype.destroy = function () {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this))
          "function" != typeof this[d] && (this[d] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Hash = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    function e(b, c) {
      var e = !1,
        f = b.charAt(0).toUpperCase() + b.slice(1);
      return (
        a.each((b + " " + h.join(f + " ") + f).split(" "), function (a, b) {
          if (g[b] !== d) return (e = !c || b), !1;
        }),
        e
      );
    }
    function f(a) {
      return e(a, !0);
    }
    var g = a("<support>").get(0).style,
      h = "Webkit Moz O ms".split(" "),
      i = {
        transition: {
          end: {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            transition: "transitionend",
          },
        },
        animation: {
          end: {
            WebkitAnimation: "webkitAnimationEnd",
            MozAnimation: "animationend",
            OAnimation: "oAnimationEnd",
            animation: "animationend",
          },
        },
      },
      j = {
        csstransforms: function () {
          return !!e("transform");
        },
        csstransforms3d: function () {
          return !!e("perspective");
        },
        csstransitions: function () {
          return !!e("transition");
        },
        cssanimations: function () {
          return !!e("animation");
        },
      };
    j.csstransitions() &&
      ((a.support.transition = new String(f("transition"))),
      (a.support.transition.end = i.transition.end[a.support.transition])),
      j.cssanimations() &&
        ((a.support.animation = new String(f("animation"))),
        (a.support.animation.end = i.animation.end[a.support.animation])),
      j.csstransforms() &&
        ((a.support.transform = new String(f("transform"))),
        (a.support.transform3d = j.csstransforms3d()));
  })(window.Zepto || window.jQuery, window, document);
