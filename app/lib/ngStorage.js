/*! ngstorage 0.3.10 | Copyright (c) 2015 Gias Kay Lee | MIT License */
!function (a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define(["angular"], b) : a.hasOwnProperty("angular") ? b(a.angular) : "object" == typeof exports && (module.exports = b(require("angular")))
}(this, function (a) {
    "use strict";
    function b(b) {
        return function () {
            var c = "ngStorage-";
            this.setKeyPrefix = function (a) {
                if ("string" != typeof a)throw new TypeError("[ngStorage] - " + b + "Provider.setKeyPrefix() expects a String.");
                c = a
            };
            var d = a.toJson, e = a.fromJson;
            this.setSerializer = function (a) {
                if ("function" != typeof a)throw new TypeError("[ngStorage] - " + b + "Provider.setSerializer expects a function.");
                d = a
            }, this.setDeserializer = function (a) {
                if ("function" != typeof a)throw new TypeError("[ngStorage] - " + b + "Provider.setDeserializer expects a function.");
                e = a
            }, this.get = function (a) {
                return e(window[b].getItem(c + a))
            }, this.set = function (a, e) {
                return window[b].setItem(c + a, d(e))
            }, this.$get = ["$rootScope", "$window", "$log", "$timeout", "$document", function (f, g, h, i, j) {
                function k(a) {
                    var b;
                    try {
                        b = g[a]
                    } catch (c) {
                        b = !1
                    }
                    if (b && "localStorage" === a) {
                        var d = "__" + Math.round(1e7 * Math.random());
                        try {
                            localStorage.setItem(d, d), localStorage.removeItem(d)
                        } catch (c) {
                            b = !1
                        }
                    }
                    return b
                }

                var l, m, n = c.length, o = k(b) || (h.warn("This browser does not support Web Storage!"), {
                        setItem: a.noop,
                        getItem: a.noop,
                        removeItem: a.noop
                    }), p = {
                    $default: function (b) {
                        for (var c in b)a.isDefined(p[c]) || (p[c] = a.copy(b[c]));
                        return p.$sync(), p
                    }, $reset: function (a) {
                        for (var b in p)"$" === b[0] || delete p[b] && o.removeItem(c + b);
                        return p.$default(a)
                    }, $sync: function () {
                        for (var a, b = 0, d = o.length; d > b; b++)(a = o.key(b)) && c === a.slice(0, n) && (p[a.slice(n)] = e(o.getItem(a)))
                    }, $apply: function () {
                        var b;
                        if (m = null, !a.equals(p, l)) {
                            b = a.copy(l), a.forEach(p, function (e, f) {
                                a.isDefined(e) && "$" !== f[0] && (o.setItem(c + f, d(e)), delete b[f])
                            });
                            for (var e in b)o.removeItem(c + e);
                            l = a.copy(p)
                        }
                    }
                };
                return p.$sync(), l = a.copy(p), f.$watch(function () {
                    m || (m = i(p.$apply, 100, !1))
                }), g.addEventListener && g.addEventListener("storage", function (b) {
                    if (b.key) {
                        var d = j[0];
                        d.hasFocus && d.hasFocus() || c !== b.key.slice(0, n) || (b.newValue ? p[b.key.slice(n)] = e(b.newValue) : delete p[b.key.slice(n)], l = a.copy(p), f.$apply())
                    }
                }), g.addEventListener && g.addEventListener("beforeunload", function () {
                    p.$apply()
                }), p
            }]
        }
    }

    return a = a && a.module ? a : window.angular, a.module("ngStorage", []).provider("$localStorage", b("localStorage")).provider("$sessionStorage", b("sessionStorage"))
});