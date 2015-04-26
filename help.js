! function() {
    function t(e, n) {
        e instanceof t ? (this.enc = e.enc, this.pos = e.pos) : (this.enc = e, this.pos = n)
    }

    function e(t, e, n, i, r) {
        this.stream = t, this.header = e, this.length = n, this.tag = i, this.sub = r
    }

    function n(t) {
        var e, n, i = "";
        for (e = 0; e + 3 <= t.length; e += 3) n = parseInt(t.substring(e, e + 3), 16), i += ee.charAt(n >> 6) + ee.charAt(63 & n);
        for (e + 1 == t.length ? (n = parseInt(t.substring(e, e + 1), 16), i += ee.charAt(n << 2)) : e + 2 == t.length && (n = parseInt(t.substring(e, e + 2), 16), i += ee.charAt(n >> 2) + ee.charAt((3 & n) << 4));
        (3 & i.length) > 0;) i += ne;
        return i
    }

    function i(t) {
        var e, n, i, r = "",
            o = 0;
        for (e = 0; e < t.length && t.charAt(e) != ne; ++e) i = ee.indexOf(t.charAt(e)), 0 > i || (0 == o ? (r += l(i >> 2), n = 3 & i, o = 1) : 1 == o ? (r += l(n << 2 | i >> 4), n = 15 & i, o = 2) : 2 == o ? (r += l(n), r += l(i >> 2), n = 3 & i, o = 3) : (r += l(n << 2 | i >> 4), r += l(15 & i), o = 0));
        return 1 == o && (r += l(n << 2)), r
    }

    function r(t) {
        var e, n = i(t),
            r = new Array;
        for (e = 0; 2 * e < n.length; ++e) r[e] = parseInt(n.substring(2 * e, 2 * e + 2), 16);
        return r
    }

    function o(t, e, n) {
        null != t && ("number" == typeof t ? this.fromNumber(t, e, n) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
    }

    function s() {
        return new o(null)
    }

    function a(t, e, n, i, r, o) {
        for (; --o >= 0;) {
            var s = e * this[t++] + n[i] + r;
            r = Math.floor(s / 67108864), n[i++] = 67108863 & s
        }
        return r
    }

    function u(t, e, n, i, r, o) {
        for (var s = 32767 & e, a = e >> 15; --o >= 0;) {
            var u = 32767 & this[t],
                c = this[t++] >> 15,
                l = a * u + c * s;
            u = s * u + ((32767 & l) << 15) + n[i] + (1073741823 & r), r = (u >>> 30) + (l >>> 15) + a * c + (r >>> 30), n[i++] = 1073741823 & u
        }
        return r
    }

    function c(t, e, n, i, r, o) {
        for (var s = 16383 & e, a = e >> 14; --o >= 0;) {
            var u = 16383 & this[t],
                c = this[t++] >> 14,
                l = a * u + c * s;
            u = s * u + ((16383 & l) << 14) + n[i] + r, r = (u >> 28) + (l >> 14) + a * c, n[i++] = 268435455 & u
        }
        return r
    }

    function l(t) {
        return ue.charAt(t)
    }

    function p(t, e) {
        var n = ce[t.charCodeAt(e)];
        return null == n ? -1 : n
    }

    function h(t) {
        for (var e = this.t - 1; e >= 0; --e) t[e] = this[e];
        t.t = this.t, t.s = this.s
    }

    function d(t) {
        this.t = 1, this.s = 0 > t ? -1 : 0, t > 0 ? this[0] = t : -1 > t ? this[0] = t + this.DV : this.t = 0
    }

    function f(t) {
        var e = s();
        return e.fromInt(t), e
    }

    function m(t, e) {
        var n;
        if (16 == e) n = 4;
        else if (8 == e) n = 3;
        else if (256 == e) n = 8;
        else if (2 == e) n = 1;
        else if (32 == e) n = 5;
        else {
            if (4 != e) return void this.fromRadix(t, e);
            n = 2
        }
        this.t = 0, this.s = 0;
        for (var i = t.length, r = !1, s = 0; --i >= 0;) {
            var a = 8 == n ? 255 & t[i] : p(t, i);
            0 > a ? "-" == t.charAt(i) && (r = !0) : (r = !1, 0 == s ? this[this.t++] = a : s + n > this.DB ? (this[this.t - 1] |= (a & (1 << this.DB - s) - 1) << s, this[this.t++] = a >> this.DB - s) : this[this.t - 1] |= a << s, s += n, s >= this.DB && (s -= this.DB))
        }
        8 == n && 0 != (128 & t[0]) && (this.s = -1, s > 0 && (this[this.t - 1] |= (1 << this.DB - s) - 1 << s)), this.clamp(), r && o.ZERO.subTo(this, this)
    }

    function y() {
        for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;) --this.t
    }

    function g(t) {
        if (this.s < 0) return "-" + this.negate().toString(t);
        var e;
        if (16 == t) e = 4;
        else if (8 == t) e = 3;
        else if (2 == t) e = 1;
        else if (32 == t) e = 5;
        else {
            if (4 != t) return this.toRadix(t);
            e = 2
        }
        var n, i = (1 << e) - 1,
            r = !1,
            o = "",
            s = this.t,
            a = this.DB - s * this.DB % e;
        if (s-- > 0)
            for (a < this.DB && (n = this[s] >> a) > 0 && (r = !0, o = l(n)); s >= 0;) e > a ? (n = (this[s] & (1 << a) - 1) << e - a, n |= this[--s] >> (a += this.DB - e)) : (n = this[s] >> (a -= e) & i, 0 >= a && (a += this.DB, --s)), n > 0 && (r = !0), r && (o += l(n));
        return r ? o : "0"
    }

    function b() {
        var t = s();
        return o.ZERO.subTo(this, t), t
    }

    function v() {
        return this.s < 0 ? this.negate() : this
    }

    function _(t) {
        var e = this.s - t.s;
        if (0 != e) return e;
        var n = this.t;
        if (e = n - t.t, 0 != e) return this.s < 0 ? -e : e;
        for (; --n >= 0;)
            if (0 != (e = this[n] - t[n])) return e;
        return 0
    }

    function E(t) {
        var e, n = 1;
        return 0 != (e = t >>> 16) && (t = e, n += 16), 0 != (e = t >> 8) && (t = e, n += 8), 0 != (e = t >> 4) && (t = e, n += 4), 0 != (e = t >> 2) && (t = e, n += 2), 0 != (e = t >> 1) && (t = e, n += 1), n
    }

    function w() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + E(this[this.t - 1] ^ this.s & this.DM)
    }

    function A(t, e) {
        var n;
        for (n = this.t - 1; n >= 0; --n) e[n + t] = this[n];
        for (n = t - 1; n >= 0; --n) e[n] = 0;
        e.t = this.t + t, e.s = this.s
    }

    function C(t, e) {
        for (var n = t; n < this.t; ++n) e[n - t] = this[n];
        e.t = Math.max(this.t - t, 0), e.s = this.s
    }

    function S(t, e) {
        var n, i = t % this.DB,
            r = this.DB - i,
            o = (1 << r) - 1,
            s = Math.floor(t / this.DB),
            a = this.s << i & this.DM;
        for (n = this.t - 1; n >= 0; --n) e[n + s + 1] = this[n] >> r | a, a = (this[n] & o) << i;
        for (n = s - 1; n >= 0; --n) e[n] = 0;
        e[s] = a, e.t = this.t + s + 1, e.s = this.s, e.clamp()
    }

    function T(t, e) {
        e.s = this.s;
        var n = Math.floor(t / this.DB);
        if (n >= this.t) return void(e.t = 0);
        var i = t % this.DB,
            r = this.DB - i,
            o = (1 << i) - 1;
        e[0] = this[n] >> i;
        for (var s = n + 1; s < this.t; ++s) e[s - n - 1] |= (this[s] & o) << r, e[s - n] = this[s] >> i;
        i > 0 && (e[this.t - n - 1] |= (this.s & o) << r), e.t = this.t - n, e.clamp()
    }

    function x(t, e) {
        for (var n = 0, i = 0, r = Math.min(t.t, this.t); r > n;) i += this[n] - t[n], e[n++] = i & this.DM, i >>= this.DB;
        if (t.t < this.t) {
            for (i -= t.s; n < this.t;) i += this[n], e[n++] = i & this.DM, i >>= this.DB;
            i += this.s
        } else {
            for (i += this.s; n < t.t;) i -= t[n], e[n++] = i & this.DM, i >>= this.DB;
            i -= t.s
        }
        e.s = 0 > i ? -1 : 0, -1 > i ? e[n++] = this.DV + i : i > 0 && (e[n++] = i), e.t = n, e.clamp()
    }

    function P(t, e) {
        var n = this.abs(),
            i = t.abs(),
            r = n.t;
        for (e.t = r + i.t; --r >= 0;) e[r] = 0;
        for (r = 0; r < i.t; ++r) e[r + n.t] = n.am(0, i[r], e, r, 0, n.t);
        e.s = 0, e.clamp(), this.s != t.s && o.ZERO.subTo(e, e)
    }

    function N(t) {
        for (var e = this.abs(), n = t.t = 2 * e.t; --n >= 0;) t[n] = 0;
        for (n = 0; n < e.t - 1; ++n) {
            var i = e.am(n, e[n], t, 2 * n, 0, 1);
            (t[n + e.t] += e.am(n + 1, 2 * e[n], t, 2 * n + 1, i, e.t - n - 1)) >= e.DV && (t[n + e.t] -= e.DV, t[n + e.t + 1] = 1)
        }
        t.t > 0 && (t[t.t - 1] += e.am(n, e[n], t, 2 * n, 0, 1)), t.s = 0, t.clamp()
    }

    function O(t, e, n) {
        var i = t.abs();
        if (!(i.t <= 0)) {
            var r = this.abs();
            if (r.t < i.t) return null != e && e.fromInt(0), void(null != n && this.copyTo(n));
            null == n && (n = s());
            var a = s(),
                u = this.s,
                c = t.s,
                l = this.DB - E(i[i.t - 1]);
            l > 0 ? (i.lShiftTo(l, a), r.lShiftTo(l, n)) : (i.copyTo(a), r.copyTo(n));
            var p = a.t,
                h = a[p - 1];
            if (0 != h) {
                var d = h * (1 << this.F1) + (p > 1 ? a[p - 2] >> this.F2 : 0),
                    f = this.FV / d,
                    m = (1 << this.F1) / d,
                    y = 1 << this.F2,
                    g = n.t,
                    b = g - p,
                    v = null == e ? s() : e;
                for (a.dlShiftTo(b, v), n.compareTo(v) >= 0 && (n[n.t++] = 1, n.subTo(v, n)), o.ONE.dlShiftTo(p, v), v.subTo(a, a); a.t < p;) a[a.t++] = 0;
                for (; --b >= 0;) {
                    var _ = n[--g] == h ? this.DM : Math.floor(n[g] * f + (n[g - 1] + y) * m);
                    if ((n[g] += a.am(0, _, n, b, 0, p)) < _)
                        for (a.dlShiftTo(b, v), n.subTo(v, n); n[g] < --_;) n.subTo(v, n)
                }
                null != e && (n.drShiftTo(p, e), u != c && o.ZERO.subTo(e, e)), n.t = p, n.clamp(), l > 0 && n.rShiftTo(l, n), 0 > u && o.ZERO.subTo(n, n)
            }
        }
    }

    function I(t) {
        var e = s();
        return this.abs().divRemTo(t, null, e), this.s < 0 && e.compareTo(o.ZERO) > 0 && t.subTo(e, e), e
    }

    function R(t) {
        this.m = t
    }

    function k(t) {
        return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
    }

    function D(t) {
        return t
    }

    function M(t) {
        t.divRemTo(this.m, null, t)
    }

    function U(t, e, n) {
        t.multiplyTo(e, n), this.reduce(n)
    }

    function F(t, e) {
        t.squareTo(e), this.reduce(e)
    }

    function L() {
        if (this.t < 1) return 0;
        var t = this[0];
        if (0 == (1 & t)) return 0;
        var e = 3 & t;
        return e = e * (2 - (15 & t) * e) & 15, e = e * (2 - (255 & t) * e) & 255, e = e * (2 - ((65535 & t) * e & 65535)) & 65535, e = e * (2 - t * e % this.DV) % this.DV, e > 0 ? this.DV - e : -e
    }

    function B(t) {
        this.m = t, this.mp = t.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t
    }

    function z(t) {
        var e = s();
        return t.abs().dlShiftTo(this.m.t, e), e.divRemTo(this.m, null, e), t.s < 0 && e.compareTo(o.ZERO) > 0 && this.m.subTo(e, e), e
    }

    function j(t) {
        var e = s();
        return t.copyTo(e), this.reduce(e), e
    }

    function V(t) {
        for (; t.t <= this.mt2;) t[t.t++] = 0;
        for (var e = 0; e < this.m.t; ++e) {
            var n = 32767 & t[e],
                i = n * this.mpl + ((n * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
            for (n = e + this.m.t, t[n] += this.m.am(0, i, t, e, 0, this.m.t); t[n] >= t.DV;) t[n] -= t.DV, t[++n]++
        }
        t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
    }

    function H(t, e) {
        t.squareTo(e), this.reduce(e)
    }

    function Y(t, e, n) {
        t.multiplyTo(e, n), this.reduce(n)
    }

    function q() {
        return 0 == (this.t > 0 ? 1 & this[0] : this.s)
    }

    function G(t, e) {
        if (t > 4294967295 || 1 > t) return o.ONE;
        var n = s(),
            i = s(),
            r = e.convert(this),
            a = E(t) - 1;
        for (r.copyTo(n); --a >= 0;)
            if (e.sqrTo(n, i), (t & 1 << a) > 0) e.mulTo(i, r, n);
            else {
                var u = n;
                n = i, i = u
            }
        return e.revert(n)
    }

    function W(t, e) {
        var n;
        return n = 256 > t || e.isEven() ? new R(e) : new B(e), this.exp(t, n)
    }

    function Q(t, e) {
        return new o(t, e)
    }

    function J(t, e) {
        if (e < t.length + 11) throw new Error("Message too long for RSA");
        for (var n = new Array, i = t.length - 1; i >= 0 && e > 0;) {
            var r = t.charCodeAt(i--);
            128 > r ? n[--e] = r : r > 127 && 2048 > r ? (n[--e] = 63 & r | 128, n[--e] = r >> 6 | 192) : (n[--e] = 63 & r | 128, n[--e] = r >> 6 & 63 | 128, n[--e] = r >> 12 | 224)
        }
        n[--e] = 0;
        for (var s = 0, a = 0, u = 0; e > 2;) 0 == u && (a = le.random.randomWords(1, 0)[0]), s = a >> u & 255, u = (u + 8) % 32, 0 != s && (n[--e] = s);
        return n[--e] = 2, n[--e] = 0, new o(n)
    }

    function Z() {
        this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null
    }

    function K(t, e) {
        if (!(null != t && null != e && t.length > 0 && e.length > 0)) throw new Error("Invalid RSA public key");
        this.n = Q(t, 16), this.e = parseInt(e, 16)
    }

    function X(t) {
        return t.modPowInt(this.e, this.n)
    }

    function $(t) {
        var e = J(t, this.n.bitLength() + 7 >> 3);
        if (null == e) return null;
        var n = this.doPublic(e);
        if (null == n) return null;
        var i = n.toString(16);
        return 0 == (1 & i.length) ? i : "0" + i
    }
    t.prototype.get = function(t) {
        if (void 0 == t && (t = this.pos++), t >= this.enc.length) throw "Requesting byte offset " + t + " on a stream of length " + this.enc.length;
        return this.enc[t]
    }, t.prototype.hexDigits = "0123456789ABCDEF", t.prototype.hexByte = function(t) {
        return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
    }, t.prototype.hexDump = function(t, e) {
        for (var n = "", i = t; e > i; ++i) switch (n += this.hexByte(this.get(i)), 15 & i) {
            case 7:
                n += "  ";
                break;
            case 15:
                n += "\n";
                break;
            default:
                n += " "
        }
        return n
    }, t.prototype.parseStringISO = function(t, e) {
        for (var n = "", i = t; e > i; ++i) n += String.fromCharCode(this.get(i));
        return n
    }, t.prototype.parseStringUTF = function(t, e) {
        for (var n = "", i = 0, r = t; e > r;) {
            var i = this.get(r++);
            n += String.fromCharCode(128 > i ? i : i > 191 && 224 > i ? (31 & i) << 6 | 63 & this.get(r++) : (15 & i) << 12 | (63 & this.get(r++)) << 6 | 63 & this.get(r++))
        }
        return n
    }, t.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, t.prototype.parseTime = function(t, e) {
        var n = this.parseStringISO(t, e),
            i = this.reTime.exec(n);
        return i ? (n = i[1] + "-" + i[2] + "-" + i[3] + " " + i[4], i[5] && (n += ":" + i[5], i[6] && (n += ":" + i[6], i[7] && (n += "." + i[7]))), i[8] && (n += " UTC", "Z" != i[8] && (n += i[8], i[9] && (n += ":" + i[9]))), n) : "Unrecognized time: " + n
    }, t.prototype.parseInteger = function(t, e) {
        var n = e - t;
        if (n > 4) {
            n <<= 3;
            var i = this.get(t);
            if (0 == i) n -= 8;
            else
                for (; 128 > i;) i <<= 1, --n;
            return "(" + n + " bit)"
        }
        for (var r = 0, o = t; e > o; ++o) r = r << 8 | this.get(o);
        return r
    }, t.prototype.parseBitString = function(t, e) {
        var n = this.get(t),
            i = (e - t - 1 << 3) - n,
            r = "(" + i + " bit)";
        if (20 >= i) {
            var o = n;
            r += " ";
            for (var s = e - 1; s > t; --s) {
                for (var a = this.get(s), u = o; 8 > u; ++u) r += a >> u & 1 ? "1" : "0";
                o = 0
            }
        }
        return r
    }, t.prototype.parseOctetString = function(t, e) {
        var n = e - t,
            i = "(" + n + " byte) ";
        n > 20 && (e = t + 20);
        for (var r = t; e > r; ++r) i += this.hexByte(this.get(r));
        return n > 20 && (i += String.fromCharCode(8230)), i
    }, t.prototype.parseOID = function(t, e) {
        for (var n, i = 0, r = 0, o = t; e > o; ++o) {
            var s = this.get(o);
            i = i << 7 | 127 & s, r += 7, 128 & s || (void 0 == n ? n = parseInt(i / 40) + "." + i % 40 : n += "." + (r >= 31 ? "bigint" : i), i = r = 0), n += String.fromCharCode()
        }
        return n
    }, e.prototype.typeName = function() {
        if (void 0 == this.tag) return "unknown";
        var t = this.tag >> 6,
            e = (this.tag >> 5 & 1, 31 & this.tag);
        switch (t) {
            case 0:
                switch (e) {
                    case 0:
                        return "EOC";
                    case 1:
                        return "BOOLEAN";
                    case 2:
                        return "INTEGER";
                    case 3:
                        return "BIT_STRING";
                    case 4:
                        return "OCTET_STRING";
                    case 5:
                        return "NULL";
                    case 6:
                        return "OBJECT_IDENTIFIER";
                    case 7:
                        return "ObjectDescriptor";
                    case 8:
                        return "EXTERNAL";
                    case 9:
                        return "REAL";
                    case 10:
                        return "ENUMERATED";
                    case 11:
                        return "EMBEDDED_PDV";
                    case 12:
                        return "UTF8String";
                    case 16:
                        return "SEQUENCE";
                    case 17:
                        return "SET";
                    case 18:
                        return "NumericString";
                    case 19:
                        return "PrintableString";
                    case 20:
                        return "TeletexString";
                    case 21:
                        return "VideotexString";
                    case 22:
                        return "IA5String";
                    case 23:
                        return "UTCTime";
                    case 24:
                        return "GeneralizedTime";
                    case 25:
                        return "GraphicString";
                    case 26:
                        return "VisibleString";
                    case 27:
                        return "GeneralString";
                    case 28:
                        return "UniversalString";
                    case 30:
                        return "BMPString";
                    default:
                        return "Universal_" + e.toString(16)
                }
            case 1:
                return "Application_" + e.toString(16);
            case 2:
                return "[" + e + "]";
            case 3:
                return "Private_" + e.toString(16)
        }
    }, e.prototype.content = function() {
        if (void 0 == this.tag) return null;
        var t = this.tag >> 6;
        if (0 != t) return null == this.sub ? null : "(" + this.sub.length + ")";
        var e = 31 & this.tag,
            n = this.posContent(),
            i = Math.abs(this.length);
        switch (e) {
            case 1:
                return 0 == this.stream.get(n) ? "false" : "true";
            case 2:
                return this.stream.parseInteger(n, n + i);
            case 3:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(n, n + i);
            case 4:
                return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(n, n + i);
            case 6:
                return this.stream.parseOID(n, n + i);
            case 16:
            case 17:
                return "(" + this.sub.length + " elem)";
            case 12:
                return this.stream.parseStringUTF(n, n + i);
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 26:
                return this.stream.parseStringISO(n, n + i);
            case 23:
            case 24:
                return this.stream.parseTime(n, n + i)
        }
        return null
    }, e.prototype.toString = function() {
        return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null == this.sub ? "null" : this.sub.length) + "]"
    }, e.prototype.print = function(t) {
        if (void 0 == t && (t = ""), document.writeln(t + this), null != this.sub) {
            t += "  ";
            for (var e = 0, n = this.sub.length; n > e; ++e) this.sub[e].print(t)
        }
    }, e.prototype.toPrettyString = function(t) {
        void 0 == t && (t = "");
        var e = t + this.typeName() + " @" + this.stream.pos;
        if (this.length >= 0 && (e += "+"), e += this.length, 32 & this.tag ? e += " (constructed)" : 3 != this.tag && 4 != this.tag || null == this.sub || (e += " (encapsulates)"), e += "\n", null != this.sub) {
            t += "  ";
            for (var n = 0, i = this.sub.length; i > n; ++n) e += this.sub[n].toPrettyString(t)
        }
        return e
    }, e.prototype.posStart = function() {
        return this.stream.pos
    }, e.prototype.posContent = function() {
        return this.stream.pos + this.header
    }, e.prototype.posEnd = function() {
        return this.stream.pos + this.header + Math.abs(this.length)
    }, e.decodeLength = function(t) {
        var e = t.get(),
            n = 127 & e;
        if (n == e) return n;
        if (n > 3) throw "Length over 24 bits not supported at position " + (t.pos - 1);
        if (0 == n) return -1;
        e = 0;
        for (var i = 0; n > i; ++i) e = e << 8 | t.get();
        return e
    }, e.hasContent = function(n, i, r) {
        if (32 & n) return !0;
        if (3 > n || n > 4) return !1;
        var o = new t(r);
        3 == n && o.get();
        var s = o.get();
        if (s >> 6 & 1) return !1;
        try {
            var a = e.decodeLength(o);
            return o.pos - r.pos + a == i
        } catch (u) {
            return !1
        }
    }, e.decode = function(n) {
        n instanceof t || (n = new t(n, 0));
        var i = new t(n),
            r = n.get(),
            o = e.decodeLength(n),
            s = n.pos - i.pos,
            a = null;
        if (e.hasContent(r, o, n)) {
            var u = n.pos;
            if (3 == r && n.get(), a = [], o >= 0) {
                for (var c = u + o; n.pos < c;) a[a.length] = e.decode(n);
                if (n.pos != c) throw "Content size is not correct for container starting at offset " + u
            } else try {
                for (;;) {
                    var l = e.decode(n);
                    if (0 == l.tag) break;
                    a[a.length] = l
                }
                o = u - n.pos
            } catch (p) {
                throw "Exception while decoding undefined length content: " + p
            }
        } else n.pos += o;
        return new e(i, s, o, r, a)
    };
    var te, ee = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        ne = "=",
        ie = 0xdeadbeefcafe,
        re = 15715070 == (16777215 & ie);
    re && "Microsoft Internet Explorer" == navigator.appName ? (o.prototype.am = u, te = 30) : re && "Netscape" != navigator.appName ? (o.prototype.am = a, te = 26) : (o.prototype.am = c, te = 28), o.prototype.DB = te, o.prototype.DM = (1 << te) - 1, o.prototype.DV = 1 << te;
    var oe = 52;
    o.prototype.FV = Math.pow(2, oe), o.prototype.F1 = oe - te, o.prototype.F2 = 2 * te - oe;
    var se, ae, ue = "0123456789abcdefghijklmnopqrstuvwxyz",
        ce = new Array;
    for (se = "0".charCodeAt(0), ae = 0; 9 >= ae; ++ae) ce[se++] = ae;
    for (se = "a".charCodeAt(0), ae = 10; 36 > ae; ++ae) ce[se++] = ae;
    for (se = "A".charCodeAt(0), ae = 10; 36 > ae; ++ae) ce[se++] = ae;
    R.prototype.convert = k, R.prototype.revert = D, R.prototype.reduce = M, R.prototype.mulTo = U, R.prototype.sqrTo = F, B.prototype.convert = z, B.prototype.revert = j, B.prototype.reduce = V, B.prototype.mulTo = Y, B.prototype.sqrTo = H, o.prototype.copyTo = h, o.prototype.fromInt = d, o.prototype.fromString = m, o.prototype.clamp = y, o.prototype.dlShiftTo = A, o.prototype.drShiftTo = C, o.prototype.lShiftTo = S, o.prototype.rShiftTo = T, o.prototype.subTo = x, o.prototype.multiplyTo = P, o.prototype.squareTo = N, o.prototype.divRemTo = O, o.prototype.invDigit = L, o.prototype.isEven = q, o.prototype.exp = G, o.prototype.toString = g, o.prototype.negate = b, o.prototype.abs = v, o.prototype.compareTo = _, o.prototype.bitLength = w, o.prototype.mod = I, o.prototype.modPowInt = W, o.ZERO = f(0), o.ONE = f(1), Z.prototype.doPublic = X, Z.prototype.setPublic = K, Z.prototype.encrypt = $;
    var le = {
        cipher: {},
        hash: {},
        keyexchange: {},
        mode: {},
        misc: {},
        codec: {},
        exception: {
            corrupt: function(t) {
                this.toString = function() {
                    return "CORRUPT: " + this.message
                }, this.message = t
            },
            invalid: function(t) {
                this.toString = function() {
                    return "INVALID: " + this.message
                }, this.message = t
            },
            bug: function(t) {
                this.toString = function() {
                    return "BUG: " + this.message
                }, this.message = t
            },
            notReady: function(t) {
                this.toString = function() {
                    return "NOT READY: " + this.message
                }, this.message = t
            }
        }
    };
    "undefined" != typeof module && module.exports && (module.exports = le), le.cipher.aes = function(t) {
        this._tables[0][0][0] || this._precompute();
        var e, n, i, r, o, s = this._tables[0][4],
            a = this._tables[1],
            u = t.length,
            c = 1;
        if (4 !== u && 6 !== u && 8 !== u) throw new le.exception.invalid("invalid aes key size");
        for (this._key = [r = t.slice(0), o = []], e = u; 4 * u + 28 > e; e++) i = r[e - 1], (e % u === 0 || 8 === u && e % u === 4) && (i = s[i >>> 24] << 24 ^ s[i >> 16 & 255] << 16 ^ s[i >> 8 & 255] << 8 ^ s[255 & i], e % u === 0 && (i = i << 8 ^ i >>> 24 ^ c << 24, c = c << 1 ^ 283 * (c >> 7))), r[e] = r[e - u] ^ i;
        for (n = 0; e; n++, e--) i = r[3 & n ? e : e - 4], o[n] = 4 >= e || 4 > n ? i : a[0][s[i >>> 24]] ^ a[1][s[i >> 16 & 255]] ^ a[2][s[i >> 8 & 255]] ^ a[3][s[255 & i]]
    }, le.cipher.aes.prototype = {
        encrypt: function(t) {
            return this._crypt(t, 0)
        },
        decrypt: function(t) {
            return this._crypt(t, 1)
        },
        _tables: [
            [
                [],
                [],
                [],
                [],
                []
            ],
            [
                [],
                [],
                [],
                [],
                []
            ]
        ],
        _precompute: function() {
            var t, e, n, i, r, o, s, a, u, c = this._tables[0],
                l = this._tables[1],
                p = c[4],
                h = l[4],
                d = [],
                f = [];
            for (t = 0; 256 > t; t++) f[(d[t] = t << 1 ^ 283 * (t >> 7)) ^ t] = t;
            for (e = n = 0; !p[e]; e ^= i || 1, n = f[n] || 1)
                for (s = n ^ n << 1 ^ n << 2 ^ n << 3 ^ n << 4, s = s >> 8 ^ 255 & s ^ 99, p[e] = s, h[s] = e, o = d[r = d[i = d[e]]], u = 16843009 * o ^ 65537 * r ^ 257 * i ^ 16843008 * e, a = 257 * d[s] ^ 16843008 * s, t = 0; 4 > t; t++) c[t][e] = a = a << 24 ^ a >>> 8, l[t][s] = u = u << 24 ^ u >>> 8;
            for (t = 0; 5 > t; t++) c[t] = c[t].slice(0), l[t] = l[t].slice(0)
        },
        _crypt: function(t, e) {
            if (4 !== t.length) throw new le.exception.invalid("invalid aes block size");
            var n, i, r, o, s = this._key[e],
                a = t[0] ^ s[0],
                u = t[e ? 3 : 1] ^ s[1],
                c = t[2] ^ s[2],
                l = t[e ? 1 : 3] ^ s[3],
                p = s.length / 4 - 2,
                h = 4,
                d = [0, 0, 0, 0],
                f = this._tables[e],
                m = f[0],
                y = f[1],
                g = f[2],
                b = f[3],
                v = f[4];
            for (o = 0; p > o; o++) n = m[a >>> 24] ^ y[u >> 16 & 255] ^ g[c >> 8 & 255] ^ b[255 & l] ^ s[h], i = m[u >>> 24] ^ y[c >> 16 & 255] ^ g[l >> 8 & 255] ^ b[255 & a] ^ s[h + 1], r = m[c >>> 24] ^ y[l >> 16 & 255] ^ g[a >> 8 & 255] ^ b[255 & u] ^ s[h + 2], l = m[l >>> 24] ^ y[a >> 16 & 255] ^ g[u >> 8 & 255] ^ b[255 & c] ^ s[h + 3], h += 4, a = n, u = i, c = r;
            for (o = 0; 4 > o; o++) d[e ? 3 & -o : o] = v[a >>> 24] << 24 ^ v[u >> 16 & 255] << 16 ^ v[c >> 8 & 255] << 8 ^ v[255 & l] ^ s[h++], n = a, a = u, u = c, c = l, l = n;
            return d
        }
    }, le.bitArray = {
        bitSlice: function(t, e, n) {
            return t = le.bitArray._shiftRight(t.slice(e / 32), 32 - (31 & e)).slice(1), void 0 === n ? t : le.bitArray.clamp(t, n - e)
        },
        extract: function(t, e, n) {
            var i, r = Math.floor(-e - n & 31);
            return i = -32 & (e + n - 1 ^ e) ? t[e / 32 | 0] << 32 - r ^ t[e / 32 + 1 | 0] >>> r : t[e / 32 | 0] >>> r, i & (1 << n) - 1
        },
        concat: function(t, e) {
            if (0 === t.length || 0 === e.length) return t.concat(e);
            var n = t[t.length - 1],
                i = le.bitArray.getPartial(n);
            return 32 === i ? t.concat(e) : le.bitArray._shiftRight(e, i, 0 | n, t.slice(0, t.length - 1))
        },
        bitLength: function(t) {
            var e, n = t.length;
            return 0 === n ? 0 : (e = t[n - 1], 32 * (n - 1) + le.bitArray.getPartial(e))
        },
        clamp: function(t, e) {
            if (32 * t.length < e) return t;
            t = t.slice(0, Math.ceil(e / 32));
            var n = t.length;
            return e = 31 & e, n > 0 && e && (t[n - 1] = le.bitArray.partial(e, t[n - 1] & 2147483648 >> e - 1, 1)), t
        },
        partial: function(t, e, n) {
            return 32 === t ? e : (n ? 0 | e : e << 32 - t) + 1099511627776 * t
        },
        getPartial: function(t) {
            return Math.round(t / 1099511627776) || 32
        },
        equal: function(t, e) {
            if (le.bitArray.bitLength(t) !== le.bitArray.bitLength(e)) return !1;
            var n, i = 0;
            for (n = 0; n < t.length; n++) i |= t[n] ^ e[n];
            return 0 === i
        },
        _shiftRight: function(t, e, n, i) {
            var r, o, s = 0;
            for (void 0 === i && (i = []); e >= 32; e -= 32) i.push(n), n = 0;
            if (0 === e) return i.concat(t);
            for (r = 0; r < t.length; r++) i.push(n | t[r] >>> e), n = t[r] << 32 - e;
            return s = t.length ? t[t.length - 1] : 0, o = le.bitArray.getPartial(s), i.push(le.bitArray.partial(e + o & 31, e + o > 32 ? n : i.pop(), 1)), i
        },
        _xor4: function(t, e) {
            return [t[0] ^ e[0], t[1] ^ e[1], t[2] ^ e[2], t[3] ^ e[3]]
        }
    }, le.codec.hex = {
        fromBits: function(t) {
            var e, n = "";
            for (e = 0; e < t.length; e++) n += ((0 | t[e]) + 0xf00000000000).toString(16).substr(4);
            return n.substr(0, le.bitArray.bitLength(t) / 4)
        },
        toBits: function(t) {
            var e, n, i = [];
            for (t = t.replace(/\s|0x/g, ""), n = t.length, t += "00000000", e = 0; e < t.length; e += 8) i.push(0 ^ parseInt(t.substr(e, 8), 16));
            return le.bitArray.clamp(i, 4 * n)
        }
    }, le.codec.utf8String = {
        fromBits: function(t) {
            var e, n, i = "",
                r = le.bitArray.bitLength(t);
            for (e = 0; r / 8 > e; e++) 0 === (3 & e) && (n = t[e / 4]), i += String.fromCharCode(n >>> 24), n <<= 8;
            return decodeURIComponent(escape(i))
        },
        toBits: function(t) {
            t = unescape(encodeURIComponent(t));
            var e, n = [],
                i = 0;
            for (e = 0; e < t.length; e++) i = i << 8 | t.charCodeAt(e), 3 === (3 & e) && (n.push(i), i = 0);
            return 3 & e && n.push(le.bitArray.partial(8 * (3 & e), i)), n
        }
    }, le.codec.base64 = {
        _chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        fromBits: function(t, e, n) {
            var i, r = "",
                o = 0,
                s = le.codec.base64._chars,
                a = 0,
                u = le.bitArray.bitLength(t);
            for (n && (s = s.substr(0, 62) + "-_"), i = 0; 6 * r.length < u;) r += s.charAt((a ^ t[i] >>> o) >>> 26), 6 > o ? (a = t[i] << 6 - o, o += 26, i++) : (a <<= 6, o -= 6);
            for (; 3 & r.length && !e;) r += "=";
            return r
        },
        toBits: function(t, e) {
            t = t.replace(/\s|=/g, "");
            var n, i, r = [],
                o = 0,
                s = le.codec.base64._chars,
                a = 0;
            for (e && (s = s.substr(0, 62) + "-_"), n = 0; n < t.length; n++) {
                if (i = s.indexOf(t.charAt(n)), 0 > i) throw new le.exception.invalid("this isn't base64!");
                o > 26 ? (o -= 26, r.push(a ^ i >>> o), a = i << 32 - o) : (o += 6, a ^= i << 32 - o)
            }
            return 56 & o && r.push(le.bitArray.partial(56 & o, a, 1)), r
        }
    }, le.codec.base64url = {
        fromBits: function(t) {
            return le.codec.base64.fromBits(t, 1, 1)
        },
        toBits: function(t) {
            return le.codec.base64.toBits(t, 1)
        }
    }, void 0 === le.beware && (le.beware = {}), le.beware["CBC mode is dangerous because it doesn't protect message integrity."] = function() {
        le.mode.cbc = {
            name: "cbc",
            encrypt: function(t, e, n, i) {
                if (i && i.length) throw new le.exception.invalid("cbc can't authenticate data");
                if (128 !== le.bitArray.bitLength(n)) throw new le.exception.invalid("cbc iv must be 128 bits");
                var r, o = le.bitArray,
                    s = o._xor4,
                    a = o.bitLength(e),
                    u = 0,
                    c = [];
                if (7 & a) throw new le.exception.invalid("pkcs#5 padding only works for multiples of a byte");
                for (r = 0; a >= u + 128; r += 4, u += 128) n = t.encrypt(s(n, e.slice(r, r + 4))), c.splice(r, 0, n[0], n[1], n[2], n[3]);
                return a = 16843009 * (16 - (a >> 3 & 15)), n = t.encrypt(s(n, o.concat(e, [a, a, a, a]).slice(r, r + 4))), c.splice(r, 0, n[0], n[1], n[2], n[3]), c
            },
            decrypt: function(t, e, n, i) {
                if (i && i.length) throw new le.exception.invalid("cbc can't authenticate data");
                if (128 !== le.bitArray.bitLength(n)) throw new le.exception.invalid("cbc iv must be 128 bits");
                if (127 & le.bitArray.bitLength(e) || !e.length) throw new le.exception.corrupt("cbc ciphertext must be a positive multiple of the block size");
                var r, o, s, a = le.bitArray,
                    u = a._xor4,
                    c = [];
                for (i = i || [], r = 0; r < e.length; r += 4) o = e.slice(r, r + 4), s = u(n, t.decrypt(o)), c.splice(r, 0, s[0], s[1], s[2], s[3]), n = o;
                if (o = 255 & c[r - 1], 0 == o || o > 16) throw new le.exception.corrupt("pkcs#5 padding corrupt");
                if (s = 16843009 * o, !a.equal(a.bitSlice([s, s, s, s], 0, 8 * o), a.bitSlice(c, 32 * c.length - 8 * o, 32 * c.length))) throw new le.exception.corrupt("pkcs#5 padding corrupt");
                return a.bitSlice(c, 0, 32 * c.length - 8 * o)
            }
        }
    }, le.misc.hmac = function(t, e) {
        this._hash = e = e || le.hash.sha256;
        var n, i = [
                [],
                []
            ],
            r = e.prototype.blockSize / 32;
        for (this._baseHash = [new e, new e], t.length > r && (t = e.hash(t)), n = 0; r > n; n++) i[0][n] = 909522486 ^ t[n], i[1][n] = 1549556828 ^ t[n];
        this._baseHash[0].update(i[0]), this._baseHash[1].update(i[1])
    }, le.misc.hmac.prototype.encrypt = le.misc.hmac.prototype.mac = function(t, e) {
        var n = new this._hash(this._baseHash[0]).update(t, e).finalize();
        return new this._hash(this._baseHash[1]).update(n).finalize()
    }, le.hash.sha256 = function(t) {
        this._key[0] || this._precompute(), t ? (this._h = t._h.slice(0), this._buffer = t._buffer.slice(0), this._length = t._length) : this.reset()
    }, le.hash.sha256.hash = function(t) {
        return (new le.hash.sha256).update(t).finalize()
    }, le.hash.sha256.prototype = {
        blockSize: 512,
        reset: function() {
            return this._h = this._init.slice(0), this._buffer = [], this._length = 0, this
        },
        update: function(t) {
            "string" == typeof t && (t = le.codec.utf8String.toBits(t));
            var e, n = this._buffer = le.bitArray.concat(this._buffer, t),
                i = this._length,
                r = this._length = i + le.bitArray.bitLength(t);
            for (e = 512 + i & -512; r >= e; e += 512) this._block(n.splice(0, 16));
            return this
        },
        finalize: function() {
            var t, e = this._buffer,
                n = this._h;
            for (e = le.bitArray.concat(e, [le.bitArray.partial(1, 1)]), t = e.length + 2; 15 & t; t++) e.push(0);
            for (e.push(Math.floor(this._length / 4294967296)), e.push(0 | this._length); e.length;) this._block(e.splice(0, 16));
            return this.reset(), n
        },
        _init: [],
        _key: [],
        _precompute: function() {
            function t(t) {
                return 4294967296 * (t - Math.floor(t)) | 0
            }
            var e, n = 0,
                i = 2;
            t: for (; 64 > n; i++) {
                for (e = 2; i >= e * e; e++)
                    if (i % e === 0) continue t;
                8 > n && (this._init[n] = t(Math.pow(i, .5))), this._key[n] = t(Math.pow(i, 1 / 3)), n++
            }
        },
        _block: function(t) {
            var e, n, i, r, o = t.slice(0),
                s = this._h,
                a = this._key,
                u = s[0],
                c = s[1],
                l = s[2],
                p = s[3],
                h = s[4],
                d = s[5],
                f = s[6],
                m = s[7];
            for (e = 0; 64 > e; e++) 16 > e ? n = o[e] : (i = o[e + 1 & 15], r = o[e + 14 & 15], n = o[15 & e] = (i >>> 7 ^ i >>> 18 ^ i >>> 3 ^ i << 25 ^ i << 14) + (r >>> 17 ^ r >>> 19 ^ r >>> 10 ^ r << 15 ^ r << 13) + o[15 & e] + o[e + 9 & 15] | 0), n = n + m + (h >>> 6 ^ h >>> 11 ^ h >>> 25 ^ h << 26 ^ h << 21 ^ h << 7) + (f ^ h & (d ^ f)) + a[e], m = f, f = d, d = h, h = p + n | 0, p = l, l = c, c = u, u = n + (c & l ^ p & (c ^ l)) + (c >>> 2 ^ c >>> 13 ^ c >>> 22 ^ c << 30 ^ c << 19 ^ c << 10) | 0;
            s[0] = s[0] + u | 0, s[1] = s[1] + c | 0, s[2] = s[2] + l | 0, s[3] = s[3] + p | 0, s[4] = s[4] + h | 0, s[5] = s[5] + d | 0, s[6] = s[6] + f | 0, s[7] = s[7] + m | 0
        }
    }, le.random = {
        randomWords: function(t, e) {
            var n, i, r = [],
                o = this.isReady(e);
            if (o === this._NOT_READY) throw new le.exception.notReady("generator isn't seeded");
            for (o & this._REQUIRES_RESEED && this._reseedFromPools(!(o & this._READY)), n = 0; t > n; n += 4)(n + 1) % this._MAX_WORDS_PER_BURST === 0 && this._gate(), i = this._gen4words(), r.push(i[0], i[1], i[2], i[3]);
            return this._gate(), r.slice(0, t)
        },
        setDefaultParanoia: function(t) {
            this._defaultParanoia = t
        },
        addEntropy: function(t, e, n) {
            n = n || "user";
            var i, r, o, s = (new Date).valueOf(),
                a = this._robins[n],
                u = this.isReady(),
                c = 0;
            switch (i = this._collectorIds[n], void 0 === i && (i = this._collectorIds[n] = this._collectorIdNext++), void 0 === a && (a = this._robins[n] = 0), this._robins[n] = (this._robins[n] + 1) % this._pools.length, typeof t) {
                case "number":
                    void 0 === e && (e = 1), this._pools[a].update([i, this._eventId++, 1, e, s, 1, 0 | t]);
                    break;
                case "object":
                    var l = Object.prototype.toString.call(t);
                    if ("[object Uint32Array]" === l) {
                        for (o = [], r = 0; r < t.length; r++) o.push(t[r]);
                        t = o
                    } else
                        for ("[object Array]" !== l && (c = 1), r = 0; r < t.length && !c; r++) "number" != typeof t[r] && (c = 1);
                    if (!c) {
                        if (void 0 === e)
                            for (e = 0, r = 0; r < t.length; r++)
                                for (o = t[r]; o > 0;) e++, o >>>= 1;
                        this._pools[a].update([i, this._eventId++, 2, e, s, t.length].concat(t))
                    }
                    break;
                case "string":
                    void 0 === e && (e = t.length), this._pools[a].update([i, this._eventId++, 3, e, s, t.length]), this._pools[a].update(t);
                    break;
                default:
                    c = 1
            }
            if (c) throw new le.exception.bug("random: addEntropy only supports number, array of numbers or string");
            this._poolEntropy[a] += e, this._poolStrength += e, u === this._NOT_READY && (this.isReady() !== this._NOT_READY && this._fireEvent("seeded", Math.max(this._strength, this._poolStrength)), this._fireEvent("progress", this.getProgress()))
        },
        isReady: function(t) {
            var e = this._PARANOIA_LEVELS[void 0 !== t ? t : this._defaultParanoia];
            return this._strength && this._strength >= e ? this._poolEntropy[0] > this._BITS_PER_RESEED && (new Date).valueOf() > this._nextReseed ? this._REQUIRES_RESEED | this._READY : this._READY : this._poolStrength >= e ? this._REQUIRES_RESEED | this._NOT_READY : this._NOT_READY
        },
        getProgress: function(t) {
            var e = this._PARANOIA_LEVELS[t ? t : this._defaultParanoia];
            return this._strength >= e ? 1 : this._poolStrength > e ? 1 : this._poolStrength / e
        },
        startCollectors: function() {
            if (!this._collectorsStarted) {
                if (window.addEventListener) window.addEventListener("load", this._loadTimeCollector, !1), window.addEventListener("mousemove", this._mouseCollector, !1);
                else {
                    if (!document.attachEvent) throw new le.exception.bug("can't attach event");
                    document.attachEvent("onload", this._loadTimeCollector), document.attachEvent("onmousemove", this._mouseCollector)
                }
                this._collectorsStarted = !0
            }
        },
        stopCollectors: function() {
            this._collectorsStarted && (window.removeEventListener ? (window.removeEventListener("load", this._loadTimeCollector, !1), window.removeEventListener("mousemove", this._mouseCollector, !1)) : window.detachEvent && (window.detachEvent("onload", this._loadTimeCollector), window.detachEvent("onmousemove", this._mouseCollector)), this._collectorsStarted = !1)
        },
        addEventListener: function(t, e) {
            this._callbacks[t][this._callbackI++] = e
        },
        removeEventListener: function(t, e) {
            var n, i, r = this._callbacks[t],
                o = [];
            for (i in r) r.hasOwnProperty(i) && r[i] === e && o.push(i);
            for (n = 0; n < o.length; n++) i = o[n], delete r[i]
        },
        _pools: [new le.hash.sha256],
        _poolEntropy: [0],
        _reseedCount: 0,
        _robins: {},
        _eventId: 0,
        _collectorIds: {},
        _collectorIdNext: 0,
        _strength: 0,
        _poolStrength: 0,
        _nextReseed: 0,
        _key: [0, 0, 0, 0, 0, 0, 0, 0],
        _counter: [0, 0, 0, 0],
        _cipher: void 0,
        _defaultParanoia: 6,
        _collectorsStarted: !1,
        _callbacks: {
            progress: {},
            seeded: {}
        },
        _callbackI: 0,
        _NOT_READY: 0,
        _READY: 1,
        _REQUIRES_RESEED: 2,
        _MAX_WORDS_PER_BURST: 65536,
        _PARANOIA_LEVELS: [0, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024],
        _MILLISECONDS_PER_RESEED: 3e4,
        _BITS_PER_RESEED: 80,
        _gen4words: function() {
            for (var t = 0; 4 > t && (this._counter[t] = this._counter[t] + 1 | 0, !this._counter[t]); t++);
            return this._cipher.encrypt(this._counter)
        },
        _gate: function() {
            this._key = this._gen4words().concat(this._gen4words()), this._cipher = new le.cipher.aes(this._key)
        },
        _reseed: function(t) {
            this._key = le.hash.sha256.hash(this._key.concat(t)), this._cipher = new le.cipher.aes(this._key);
            for (var e = 0; 4 > e && (this._counter[e] = this._counter[e] + 1 | 0, !this._counter[e]); e++);
        },
        _reseedFromPools: function(t) {
            var e, n = [],
                i = 0;
            for (this._nextReseed = n[0] = (new Date).valueOf() + this._MILLISECONDS_PER_RESEED, e = 0; 16 > e; e++) n.push(4294967296 * Math.random() | 0);
            for (e = 0; e < this._pools.length && (n = n.concat(this._pools[e].finalize()), i += this._poolEntropy[e], this._poolEntropy[e] = 0, t || !(this._reseedCount & 1 << e)); e++);
            this._reseedCount >= 1 << this._pools.length && (this._pools.push(new le.hash.sha256), this._poolEntropy.push(0)), this._poolStrength -= i, i > this._strength && (this._strength = i), this._reseedCount++, this._reseed(n)
        },
        _mouseCollector: function(t) {
            var e = t.x || t.clientX || t.offsetX || 0,
                n = t.y || t.clientY || t.offsetY || 0;
            le.random.addEntropy([e, n], 2, "mouse")
        },
        _loadTimeCollector: function() {
            le.random.addEntropy((new Date).valueOf(), 2, "loadtime")
        },
        _fireEvent: function(t, e) {
            var n, i = le.random._callbacks[t],
                r = [];
            for (n in i) i.hasOwnProperty(n) && r.push(i[n]);
            for (n = 0; n < r.length; n++) r[n](e)
        }
    },
        function() {
            try {
                var t = new Uint32Array(32);
                crypto.getRandomValues(t), le.random.addEntropy(t, 1024, "crypto.getRandomValues")
            } catch (e) {}
        }(),
        function() {
            for (var t in le.beware) le.beware.hasOwnProperty(t) && le.beware[t]()
        }();
    var pe = {
        sjcl: le,
        version: "1.3.10"
    };
    pe.generateAesKey = function() {
        return {
            key: le.random.randomWords(8, 0),
            encrypt: function(t) {
                return this.encryptWithIv(t, le.random.randomWords(4, 0))
            },
            encryptWithIv: function(t, e) {
                var n = new le.cipher.aes(this.key),
                    i = le.codec.utf8String.toBits(t),
                    r = le.mode.cbc.encrypt(n, i, e),
                    o = le.bitArray.concat(e, r);
                return le.codec.base64.fromBits(o)
            }
        }
    }, pe.create = function(t) {
        return new pe.EncryptionClient(t)
    }, pe.EncryptionClient = function(t) {
        var i = this,
            o = [];
        i.publicKey = t, i.version = pe.version;
        var s = function(t, e) {
                var n, i, r;
                n = document.createElement(t);
                for (i in e) e.hasOwnProperty(i) && (r = e[i], n.setAttribute(i, r));
                return n
            },
            a = function(t) {
                return window.jQuery && t instanceof jQuery ? t[0] : t.nodeType && 1 === t.nodeType ? t : document.getElementById(t)
            },
            u = function(t) {
                var e, n, i, r, o = [];
                if ("INTEGER" === t.typeName() && (e = t.posContent(), n = t.posEnd(), i = t.stream.hexDump(e, n).replace(/[ \n]/g, ""), o.push(i)), null !== t.sub)
                    for (r = 0; r < t.sub.length; r++) o = o.concat(u(t.sub[r]));
                return o
            },
            c = function(t) {
                var e, n, i = [],
                    r = t.children;
                for (n = 0; n < r.length; n++) e = r[n], 1 === e.nodeType && e.attributes["data-encrypted-name"] ? i.push(e) : e.children && e.children.length > 0 && (i = i.concat(c(e)));
                return i
            },
            l = function() {
                var n, i, o, s, a, c;
                try {
                    a = r(t), n = e.decode(a)
                } catch (l) {
                    throw "Invalid encryption key. Please use the key labeled 'Client-Side Encryption Key'"
                }
                if (o = u(n), 2 !== o.length) throw "Invalid encryption key. Please use the key labeled 'Client-Side Encryption Key'";
                return s = o[0], i = o[1], c = new Z, c.setPublic(s, i), c
            },
            p = function() {
                return {
                    key: le.random.randomWords(8, 0),
                    sign: function(t) {
                        var e = new le.misc.hmac(this.key, le.hash.sha256),
                            n = e.encrypt(t);
                        return le.codec.base64.fromBits(n)
                    }
                }
            };
        i.encrypt = function(t) {
            var e = l(),
                r = pe.generateAesKey(),
                o = p(),
                s = r.encrypt(t),
                a = o.sign(le.codec.base64.toBits(s)),
                u = le.bitArray.concat(r.key, o.key),
                c = le.codec.base64.fromBits(u),
                h = e.encrypt(c),
                d = "$bt4|javascript_" + i.version.replace(/\./g, "_") + "$",
                f = null;
            return h && (f = n(h)), d + f + "$" + s + "$" + a
        }, i.encryptForm = function(t) {
            var e, n, r, u, l, p;
            for (t = a(t), p = c(t); o.length > 0;) {
                try {
                    t.removeChild(o[0])
                } catch (h) {}
                o.splice(0, 1)
            }
            for (l = 0; l < p.length; l++) e = p[l], r = e.getAttribute("data-encrypted-name"), n = i.encrypt(e.value), e.removeAttribute("name"), u = s("input", {
                value: n,
                type: "hidden",
                name: r
            }), o.push(u), t.appendChild(u)
        }, i.onSubmitEncryptForm = function(t, e) {
            var n;
            t = a(t), n = function(n) {
                return i.encryptForm(t), e ? e(n) : n
            }, window.jQuery ? window.jQuery(t).submit(n) : t.addEventListener ? t.addEventListener("submit", n, !1) : t.attachEvent && t.attachEvent("onsubmit", n)
        }, i.formEncrypter = {
            encryptForm: i.encryptForm,
            extractForm: a,
            onSubmitEncryptForm: i.onSubmitEncryptForm
        }, le.random.startCollectors()
    }, window.Braintree = pe
}(), ! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        "undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.braintree = t()
    }
}(function() {
    var define, module, exports;
    return function t(e, n, i) {
        function r(s, a) {
            if (!n[s]) {
                if (!e[s]) {
                    var u = "function" == typeof require && require;
                    if (!a && u) return u(s, !0);
                    if (o) return o(s, !0);
                    var c = new Error("Cannot find module '" + s + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var l = n[s] = {
                    exports: {}
                };
                e[s][0].call(l.exports, function(t) {
                    var n = e[s][1][t];
                    return r(n ? n : t)
                }, l, l.exports, t, e, n, i)
            }
            return n[s].exports
        }
        for (var o = "function" == typeof require && require, s = 0; s < i.length; s++) r(i[s]);
        return r
    }({
        1: [function(t, e) {
            (function(n) {
                "use strict";

                function i() {}

                function r(t) {
                    if ("CONFIGURATION" === t.type || "IMMEDIATE" === t.type) throw new Error(t.message);
                    try {
                        console.error(JSON.stringify(t))
                    } catch (e) {}
                }

                function o(t, e, n) {
                    if (!(e in d)) throw new Error(e + " is an unsupported integration");
                    h.isFunction(n[m.ROOT_SUCCESS_CALLBACK]) && (b = function(t) {
                        n[m.ROOT_SUCCESS_CALLBACK](g(t))
                    }), h.isFunction(n[m.ROOT_ERROR_CALLBACK]) && (_ = n[m.ROOT_ERROR_CALLBACK]), h.isFunction(n[m.ROOT_READY_CALLBACK]) && (v = n[m.ROOT_READY_CALLBACK]), y(v), f.on(f.events.ERROR, _), f.on(f.events.PAYMENT_METHOD_RECEIVED, b), f.on(f.events.WARNING, function(t) {
                        try {
                            console.warn(t)
                        } catch (e) {}
                    }), u.getConfiguration(t, function(t, i) {
                        t ? f.emit(f.events.ERROR, {
                            message: t.errors
                        }) : s(i, e, n)
                    })
                }

                function s(t, e, i) {
                    t.sdkVersion = "braintree/web/" + a, t.merchantAppId = n.location.host, i.configuration = t, i.integration = e, f.on(f.events.CONFIGURATION_REQUEST, function(t) {
                        t(i)
                    }), f.emit(f.events.ASYNC_DEPENDENCY_INITIALIZING), d[e].initialize(t, i), f.emit(f.events.ASYNC_DEPENDENCY_READY)
                }
                var a = "2.7.1",
                    u = t("braintree-api"),
                    c = t("braintree-paypal"),
                    l = t("braintree-dropin"),
                    p = t("braintree-form"),
                    h = t("braintree-utilities"),
                    d = t("./integrations"),
                    f = t("braintree-bus"),
                    m = t("./constants"),
                    y = t("./lib/dependency-ready"),
                    g = t("./lib/sanitize-payload"),
                    b = i,
                    v = i,
                    _ = r;
                e.exports = {
                    api: u,
                    cse: n.Braintree,
                    paypal: c,
                    dropin: l,
                    Form: p,
                    setup: o,
                    VERSION: a
                }
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./constants": 269,
            "./integrations": 273,
            "./lib/dependency-ready": 275,
            "./lib/sanitize-payload": 276,
            "braintree-api": 16,
            "braintree-bus": 34,
            "braintree-dropin": 177,
            "braintree-form": 187,
            "braintree-paypal": 247,
            "braintree-utilities": 267
        }],
        2: [function(t, e) {
            (function(n) {
                "use strict";

                function i(t) {
                    var e = t.sdkVersion;
                    return e || (e = n.braintree && n.braintree.VERSION ? "braintree/web/" + n.braintree.VERSION : ""), e
                }

                function r(t) {
                    var e, r;
                    this.attrs = {}, t.hasOwnProperty("sharedCustomerIdentifier") && (this.attrs.sharedCustomerIdentifier = t.sharedCustomerIdentifier), e = a(t.clientToken), this.driver = t.driver || u, this.analyticsUrl = e.analytics ? e.analytics.url : void 0, this.clientApiUrl = e.clientApiUrl, this.customerId = t.customerId, this.challenges = e.challenges, this.integration = t.integration || "", this.sdkVersion = i(e), this.merchantAppId = e.merchantAppId || n.location.host, r = s.create(this, {
                        container: t.container,
                        clientToken: e
                    }), this.verify3DS = o.bind(r.verify, r), this.attrs.authorizationFingerprint = e.authorizationFingerprint, this.attrs.sharedCustomerIdentifierType = t.sharedCustomerIdentifierType, e.merchantAccountId && (this.attrs.merchantAccountId = e.merchantAccountId), this.requestTimeout = t.hasOwnProperty("timeout") ? t.timeout : 6e4
                }
                var o = t("braintree-utilities"),
                    s = t("braintree-3ds"),
                    a = t("./parse-client-token"),
                    u = t("./request-driver"),
                    c = t("./util"),
                    l = t("./sepa-mandate"),
                    p = t("./europe-bank-account"),
                    h = t("./credit-card"),
                    d = t("./coinbase-account"),
                    f = t("./paypal-account"),
                    m = t("./normalize-api-fields").normalizeCreditCardFields;
                r.prototype.getCreditCards = function(t) {
                    this.driver.get(c.joinUrlFragments([this.clientApiUrl, "v1", "payment_methods"]), this.attrs, function(t) {
                        var e = 0,
                            n = t.paymentMethods.length,
                            i = [];
                        for (e; n > e; e++) i.push(new h(t.paymentMethods[e]));
                        return i
                    }, t, this.requestTimeout)
                }, r.prototype.tokenizeCoinbase = function(t, e) {
                    t.options = {
                        validate: !1
                    }, this.addCoinbase(t, function(t, n) {
                        t ? e(t, null) : n && n.nonce ? e(t, n) : e("Unable to tokenize coinbase account.", null)
                    })
                }, r.prototype.tokenizePayPalAccount = function(t, e) {
                    t.options = {
                        validate: !1
                    }, this.addPayPalAccount(t, function(t, n) {
                        t ? e(t, null) : n && n.nonce ? e(null, n) : e("Unable to tokenize paypal account.", null)
                    })
                }, r.prototype.tokenizeCard = function(t, e) {
                    t.options = {
                        validate: !1
                    }, this.addCreditCard(t, function(t, n) {
                        n && n.nonce ? e(t, n.nonce, {
                            type: n.type,
                            details: n.details
                        }) : e("Unable to tokenize card.", null)
                    })
                }, r.prototype.lookup3DS = function(t, e) {
                    var n = c.joinUrlFragments([this.clientApiUrl, "v1/payment_methods", t.nonce, "three_d_secure/lookup"]),
                        i = c.mergeOptions(this.attrs, {
                            amount: t.amount
                        });
                    this.driver.post(n, i, function(t) {
                        return t
                    }, e, this.requestTimeout)
                }, r.prototype.createSEPAMandate = function(t, e) {
                    var n = c.mergeOptions(this.attrs, {
                        sepaMandate: t
                    });
                    this.driver.post(c.joinUrlFragments([this.clientApiUrl, "v1", "sepa_mandates.json"]), n, function(t) {
                        return {
                            sepaMandate: new l(t.europeBankAccounts[0].sepaMandates[0]),
                            sepaBankAccount: new p(t.europeBankAccounts[0])
                        }
                    }, e, this.requestTimeout)
                }, r.prototype.addCoinbase = function(t, e) {
                    var n;
                    delete t.share, n = c.mergeOptions(this.attrs, {
                        coinbaseAccount: t,
                        _meta: {
                            integration: this.integration || "custom",
                            source: "coinbase"
                        }
                    }), this.driver.post(c.joinUrlFragments([this.clientApiUrl, "v1", "payment_methods/coinbase_accounts"]), n, function(t) {
                        return new d(t.coinbaseAccounts[0])
                    }, e, this.requestTimeout)
                }, r.prototype.addPayPalAccount = function(t, e) {
                    var n;
                    delete t.share, n = c.mergeOptions(this.attrs, {
                        paypalAccount: t,
                        _meta: {
                            integration: this.integration || "paypal",
                            source: "paypal"
                        }
                    }), this.driver.post(c.joinUrlFragments([this.clientApiUrl, "v1", "payment_methods", "paypal_accounts"]), n, function(t) {
                        return new f(t.paypalAccounts[0])
                    }, e, this.requestTimeout)
                }, r.prototype.addCreditCard = function(t, e) {
                    var n, i, r = t.share;
                    delete t.share, i = m(t), n = c.mergeOptions(this.attrs, {
                        share: r,
                        creditCard: i,
                        _meta: {
                            integration: this.integration || "custom",
                            source: "form"
                        }
                    }), this.driver.post(c.joinUrlFragments([this.clientApiUrl, "v1", "payment_methods/credit_cards"]), n, function(t) {
                        return new h(t.creditCards[0])
                    }, e, this.requestTimeout)
                }, r.prototype.unlockCreditCard = function(t, e, n) {
                    var i = c.mergeOptions(this.attrs, {
                        challengeResponses: e
                    });
                    this.driver.put(c.joinUrlFragments([this.clientApiUrl, "v1", "payment_methods/", t.nonce]), i, function(t) {
                        return new h(t.paymentMethods[0])
                    }, n, this.requestTimeout)
                }, r.prototype.sendAnalyticsEvents = function(t, e) {
                    var i, r, o = this.analyticsUrl,
                        s = [];
                    if (t = c.isArray(t) ? t : [t], !o) return void(e && e.apply(null, [null, {}]));
                    for (r in t) t.hasOwnProperty(r) && s.push({
                        kind: t[r]
                    });
                    i = c.mergeOptions(this.attrs, {
                        braintree_library_version: this.sdkVersion,
                        analytics: s,
                        _meta: {
                            merchantAppId: this.merchantAppId,
                            platform: "web",
                            platformVersion: n.navigator.userAgent,
                            integrationType: this.integration,
                            sdkVersion: this.sdkVersion
                        }
                    }), this.driver.post(o, i, function(t) {
                        return t
                    }, e, this.requestTimeout)
                }, e.exports = r
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./coinbase-account": 3,
            "./credit-card": 4,
            "./europe-bank-account": 5,
            "./normalize-api-fields": 9,
            "./parse-client-token": 10,
            "./paypal-account": 11,
            "./request-driver": 13,
            "./sepa-mandate": 14,
            "./util": 15,
            "braintree-3ds": 24,
            "braintree-utilities": 33
        }],
        3: [function(t, e) {
            "use strict";

            function n(t) {
                var e, n;
                for (e = 0; e < i.length; e++) n = i[e], this[n] = t[n]
            }
            var i = ["nonce", "type", "description", "details"];
            e.exports = n
        }, {}],
        4: [function(t, e) {
            "use strict";

            function n(t) {
                var e, n;
                for (e = 0; e < i.length; e++) n = i[e], this[n] = t[n]
            }
            var i = ["billingAddress", "branding", "createdAt", "createdAtMerchant", "createdAtMerchantName", "details", "isLocked", "lastUsedAt", "lastUsedAtMerchant", "lastUsedAtMerchantName", "lastUsedByCurrentMerchant", "nonce", "securityQuestions", "type"];
            e.exports = n
        }, {}],
        5: [function(t, e) {
            "use strict";

            function n(t) {
                var e, n = ["bic", "maskedIBAN", "nonce", "accountHolderName"],
                    i = 0;
                for (i = 0; i < n.length; i++) e = n[i], this[e] = t[e]
            }
            e.exports = n
        }, {}],
        6: [function(t, e) {
            "use strict";

            function n(t, e, n) {
                var s = i(t),
                    a = {
                        authorizationFingerprint: s.authorizationFingerprint
                    };
                r.post(s.configUrl, a, function(t) {
                    return o.mergeOptions(s, t)
                }, e, n)
            }
            var i = t("./parse-client-token"),
                r = t("./request-driver"),
                o = t("./util");
            e.exports = n
        }, {
            "./parse-client-token": 10,
            "./request-driver": 13,
            "./util": 15
        }],
        7: [function(t, e) {
            "use strict";

            function n(t, e) {
                return t.status >= 400 ? [t, null] : [null, e(t)]
            }

            function i() {}

            function r(t, e, r, o, s, a) {
                var u;
                s = s || i, null == a && (a = 6e4), u = o(t, e, function(t, e) {
                    c[e] && (clearTimeout(c[e]), s.apply(null, n(t, function(t) {
                        return r(t)
                    })))
                }), "number" == typeof a ? c[u] = setTimeout(function() {
                    c[u] = null, s.apply(null, [{
                        errors: "Unknown error"
                    }, null])
                }, a) : s.apply(null, [{
                    errors: "Timeout must be a number"
                }, null])
            }

            function o(t, e, n, i, o) {
                e._method = "POST", r(t, e, n, u.get, i, o)
            }

            function s(t, e, n, i, o) {
                r(t, e, n, u.get, i, o)
            }

            function a(t, e, n, i, o) {
                e._method = "PUT", r(t, e, n, u.get, i, o)
            }
            var u = t("./jsonp"),
                c = [];
            e.exports = {
                get: s,
                post: o,
                put: a
            }
        }, {
            "./jsonp": 8
        }],
        8: [function(t, e) {
            (function(n) {
                "use strict";

                function i(t, e) {
                    var n = document.createElement("script"),
                        i = !1;
                    n.src = t, n.async = !0;
                    var r = e || l.error;
                    "function" == typeof r && (n.onerror = function(e) {
                        r({
                            url: t,
                            event: e
                        })
                    }), n.onload = n.onreadystatechange = function() {
                        i || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (i = !0, n.onload = n.onreadystatechange = null, n && n.parentNode && n.parentNode.removeChild(n))
                    }, a || (a = document.getElementsByTagName("head")[0]), a.appendChild(n)
                }

                function r(t, e) {
                    var n, i, o, s = [];
                    for (var o in t) t.hasOwnProperty(o) && (i = t[o], n = e ? u.isArray(t) ? e + "[]" : e + "[" + o + "]" : o, s.push("object" == typeof i ? r(i, n) : encodeURIComponent(n) + "=" + encodeURIComponent(i)));
                    return s.join("&")
                }

                function o(t, e, n, o) {
                    var s = -1 === (t || "").indexOf("?") ? "?" : "&";
                    o = o || l.callbackName || "callback";
                    var a = o + "_json" + u.generateUUID();
                    return s += r(e), c[a] = function(t) {
                        n(t, a);
                        try {
                            delete c[a]
                        } catch (e) {}
                        c[a] = null
                    }, i(t + s + "&" + o + "=" + a), a
                }

                function s(t) {
                    l = t
                }
                var a, u = t("./util"),
                    c = n,
                    l = {};
                e.exports = {
                    get: o,
                    init: s,
                    stringify: r
                }
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./util": 15
        }],
        9: [function(t, e) {
            "use strict";

            function n(t) {
                var e, n = {
                    billingAddress: t.billingAddress || {}
                };
                for (e in t)
                    if (t.hasOwnProperty(e)) switch (e.replace(/_/, "").toLowerCase()) {
                        case "postalcode":
                        case "countryname":
                        case "countrycodenumeric":
                        case "countrycodealpha2":
                        case "countrycodealpha3":
                        case "region":
                        case "extendedaddress":
                        case "locality":
                        case "firstname":
                        case "lastname":
                        case "company":
                        case "streetaddress":
                            n.billingAddress[e] = t[e];
                            break;
                        default:
                            n[e] = t[e]
                    }
                return n
            }
            e.exports = {
                normalizeCreditCardFields: n
            }
        }, {}],
        10: [function(t, e) {
            "use strict";

            function n(t) {
                var e;
                if (!t) throw new Error("Braintree API Client Misconfigured: clientToken required.");
                if ("object" == typeof t && null !== t) e = t;
                else {
                    try {
                        t = window.atob(t)
                    } catch (n) {}
                    try {
                        e = JSON.parse(t)
                    } catch (r) {
                        throw new Error("Braintree API Client Misconfigured: clientToken is invalid.")
                    }
                }
                if (!e.hasOwnProperty("clientApiUrl") || !i.isWhitelistedDomain(e.clientApiUrl)) throw new Error("Braintree API Client Misconfigured: clientToken is invalid.");
                return e
            }
            var i = t("braintree-utilities");
            t("./polyfill"), e.exports = n
        }, {
            "./polyfill": 12,
            "braintree-utilities": 33
        }],
        11: [function(t, e) {
            "use strict";

            function n(t) {
                var e, n;
                for (e = 0; e < i.length; e++) n = i[e], this[n] = t[n]
            }
            var i = ["nonce", "type", "description", "details"];
            e.exports = n
        }, {}],
        12: [function() {
            (function(t) {
                "use strict";
                t.atob = t.atob || function(t) {
                    var e = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$"),
                        n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                        i = "";
                    if (!e.test(t)) throw new Error("Braintree API Client Misconfigured: clientToken is invalid.");
                    var r = 0;
                    do {
                        var o = n.indexOf(t.charAt(r++)),
                            s = n.indexOf(t.charAt(r++)),
                            a = n.indexOf(t.charAt(r++)),
                            u = n.indexOf(t.charAt(r++)),
                            c = (63 & o) << 2 | s >> 4 & 3,
                            l = (15 & s) << 4 | a >> 2 & 15,
                            p = (3 & a) << 6 | 63 & u;
                        i += String.fromCharCode(c) + (l ? String.fromCharCode(l) : "") + (p ? String.fromCharCode(p) : "")
                    } while (r < t.length);
                    return i
                }
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        13: [function(t, e) {
            "use strict";
            var n = t("./jsonp-driver");
            e.exports = n
        }, {
            "./jsonp-driver": 7
        }],
        14: [function(t, e) {
            "use strict";

            function n(t) {
                var e, n = 0,
                    i = ["accountHolderName", "bic", "longFormURL", "mandateReferenceNumber", "maskedIBAN", "shortForm"];
                for (n = 0; n < i.length; n++) e = i[n], this[e] = t[e]
            }
            e.exports = n
        }, {}],
        15: [function(t, e) {
            "use strict";

            function n(t) {
                var e, n, i = [];
                for (n = 0; n < t.length; n++) e = t[n], "/" === e.charAt(e.length - 1) && (e = e.substring(0, e.length - 1)), "/" === e.charAt(0) && (e = e.substring(1)), i.push(e);
                return i.join("/")
            }

            function i(t) {
                return t && "object" == typeof t && "number" == typeof t.length && "[object Array]" === Object.prototype.toString.call(t) || !1
            }

            function r() {
                return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                    var e = Math.floor(16 * Math.random()),
                        n = "x" === t ? e : 3 & e | 8;
                    return n.toString(16)
                })
            }

            function o(t, e) {
                var n, i = {};
                for (n in t) t.hasOwnProperty(n) && (i[n] = t[n]);
                for (n in e) e.hasOwnProperty(n) && (i[n] = e[n]);
                return i
            }
            e.exports = {
                joinUrlFragments: n,
                isArray: i,
                generateUUID: r,
                mergeOptions: o
            }
        }, {}],
        16: [function(t, e) {
            "use strict";

            function n(t) {
                return new i(t)
            }
            var i = t("./lib/client"),
                r = t("./lib/jsonp"),
                o = t("./lib/jsonp-driver"),
                s = t("./lib/util"),
                a = t("./lib/parse-client-token"),
                u = t("./lib/get-configuration");
            e.exports = {
                Client: i,
                configure: n,
                util: s,
                JSONP: r,
                JSONPDriver: o,
                parseClientToken: a,
                getConfiguration: u
            }
        }, {
            "./lib/client": 2,
            "./lib/get-configuration": 6,
            "./lib/jsonp": 8,
            "./lib/jsonp-driver": 7,
            "./lib/parse-client-token": 10,
            "./lib/util": 15
        }],
        17: [function(t, e) {
            "use strict";

            function n(t, e) {
                if (e = e || "[" + t + "] is not a valid DOM Element", t && t.nodeType && 1 === t.nodeType) return t;
                if (t && window.jQuery && (t instanceof jQuery || "jquery" in Object(t)) && 0 !== t.length) return t[0];
                if ("string" == typeof t && document.getElementById(t)) return document.getElementById(t);
                throw new Error(e)
            }
            e.exports = {
                normalizeElement: n
            }
        }, {}],
        18: [function(t, e) {
            "use strict";

            function n(t, e, n, i) {
                t.addEventListener ? t.addEventListener(e, n, i) : t.attachEvent && t.attachEvent("on" + e, n)
            }

            function i(t, e, n, i) {
                t.removeEventListener ? t.removeEventListener(e, n, i) : t.detachEvent && t.detachEvent("on" + e, n)
            }
            e.exports = {
                addEventListener: n,
                removeEventListener: i
            }
        }, {}],
        19: [function(t, e) {
            "use strict";

            function n(t) {
                return "[object Function]" === r.call(t)
            }

            function i(t, e) {
                return function() {
                    t.apply(e, arguments)
                }
            }
            var r = Object.prototype.toString;
            e.exports = {
                bind: i,
                isFunction: n
            }
        }, {}],
        20: [function(t, e) {
            "use strict";

            function n() {
                return "https:" === window.location.protocol
            }

            function i(t) {
                switch (t) {
                    case null:
                    case void 0:
                        return "";
                    case !0:
                        return "1";
                    case !1:
                        return "0";
                    default:
                        return encodeURIComponent(t)
                }
            }

            function r(t, e) {
                var n, o, s = [];
                for (o in t)
                    if (t.hasOwnProperty(o)) {
                        var a = t[o];
                        n = e ? e + "[" + o + "]" : o, "object" == typeof a ? s.push(r(a, n)) : void 0 !== a && null !== a && s.push(i(n) + "=" + i(a))
                    }
                return s.join("&")
            }

            function o(t) {
                for (var e = {}, n = t.split("&"), i = 0; i < n.length; i++) {
                    var r = n[i].split("="),
                        o = r[0],
                        s = decodeURIComponent(r[1]);
                    e[o] = s
                }
                return e
            }

            function s(t) {
                var e = t.split("?");
                return 2 !== e.length ? {} : o(e[1])
            }
            e.exports = {
                isBrowserHttps: n,
                makeQueryString: r,
                decodeQueryString: o,
                getParams: s
            }
        }, {}],
        21: [function(t, e) {
            var n = t("./lib/dom"),
                i = t("./lib/url"),
                r = t("./lib/fn"),
                o = t("./lib/events");
            e.exports = {
                normalizeElement: n.normalizeElement,
                isBrowserHttps: i.isBrowserHttps,
                makeQueryString: i.makeQueryString,
                decodeQueryString: i.decodeQueryString,
                getParams: i.getParams,
                removeEventListener: o.removeEventListener,
                addEventListener: o.addEventListener,
                bind: r.bind,
                isFunction: r.isFunction
            }
        }, {
            "./lib/dom": 17,
            "./lib/events": 18,
            "./lib/fn": 19,
            "./lib/url": 20
        }],
        22: [function(t, e) {
            "use strict";

            function n(t, e) {
                var n = window.getComputedStyle ? getComputedStyle(t) : t.currentStyle;
                return n[e]
            }

            function i() {
                return {
                    html: {
                        height: o.style.height || "",
                        overflow: n(o, "overflow"),
                        position: n(o, "position")
                    },
                    body: {
                        height: s.style.height || "",
                        overflow: n(s, "overflow")
                    }
                }
            }

            function r(t, e) {
                this.assetsUrl = t, this.container = e || document.body, this.iframe = null, o = document.documentElement, s = document.body, this.merchantPageDefaultStyles = i()
            }
            var o, s, a = t("braintree-utilities"),
                u = t("../shared/receiver"),
                c = "1.2.0";
            r.prototype.get = function(t, e) {
                var n = this,
                    i = this.constructAuthorizationURL(t);
                this.container && a.isFunction(this.container) ? this.container(i + "&no_style=1") : this.insertIframe(i), new u(function(t) {
                    a.isFunction(n.container) || n.removeIframe(), e(t)
                })
            }, r.prototype.removeIframe = function() {
                this.container && this.container.nodeType && 1 === this.container.nodeType ? this.container.removeChild(this.iframe) : this.container && window.jQuery && this.container instanceof jQuery ? $(this.iframe, this.container).remove() : "string" == typeof this.container && document.getElementById(this.container).removeChild(this.iframe), this.unlockMerchantWindowSize()
            }, r.prototype.insertIframe = function(t) {
                var e = document.createElement("iframe");
                if (e.src = t, this.applyStyles(e), this.lockMerchantWindowSize(), this.container && this.container.nodeType && 1 === this.container.nodeType) this.container.appendChild(e);
                else if (this.container && window.jQuery && this.container instanceof jQuery && 0 !== this.container.length) this.container.append(e);
                else {
                    if ("string" != typeof this.container || !document.getElementById(this.container)) throw new Error("Unable to find valid container for iframe.");
                    document.getElementById(this.container).appendChild(e)
                }
                this.iframe = e
            }, r.prototype.applyStyles = function(t) {
                t.style.position = "fixed", t.style.top = "0", t.style.left = "0", t.style.height = "100%", t.style.width = "100%", t.setAttribute("frameborder", "0"), t.setAttribute("allowTransparency", "true"), t.style.border = "0", t.style.zIndex = "99999"
            }, r.prototype.lockMerchantWindowSize = function() {
                o.style.overflow = "hidden", s.style.overflow = "hidden", s.style.height = "100%"
            }, r.prototype.unlockMerchantWindowSize = function() {
                var t = this.merchantPageDefaultStyles;
                s.style.height = t.body.height, s.style.overflow = t.body.overflow, o.style.overflow = t.html.overflow
            }, r.prototype.constructAuthorizationURL = function(t) {
                var e, n = window.location.href;
                return n.indexOf("#") > -1 && (n = n.split("#")[0]), e = a.makeQueryString({
                    acsUrl: t.acsUrl,
                    pareq: t.pareq,
                    termUrl: t.termUrl + "&three_d_secure_version=" + c,
                    md: t.md,
                    parentUrl: n
                }), this.assetsUrl + "/3ds/" + c + "/html/style_frame?" + e
            }, e.exports = r
        }, {
            "../shared/receiver": 26,
            "braintree-utilities": 21
        }],
        23: [function(t, e) {
            "use strict";

            function n() {}

            function i(t, e) {
                e = e || {}, this.clientToken = e.clientToken, this.container = e.container, this.api = t, this.nonce = null, this._boundHandleUserClose = r.bind(this._handleUserClose, this)
            }
            var r = t("braintree-utilities"),
                o = t("./authorization_service");
            i.prototype.verify = function(t, e) {
                if (!r.isFunction(e)) throw this.api.sendAnalyticsEvents("3ds.web.no_callback"), new Error("No suitable callback argument was given");
                r.isFunction(t.onUserClose) && (this._onUserClose = t.onUserClose);
                var n = {
                        nonce: "",
                        amount: t.amount
                    },
                    i = t.creditCard;
                if ("string" == typeof i) n.nonce = i, this.api.sendAnalyticsEvents("3ds.web.verify.nonce"), this.startVerification(n, e);
                else {
                    var o = this,
                        s = function(t, i) {
                            return t ? e(t) : (n.nonce = i, void o.startVerification(n, e))
                        };
                    this.api.sendAnalyticsEvents("3ds.web.verify.credit_card"), this.api.tokenizeCard(i, s)
                }
            }, i.prototype.startVerification = function(t, e) {
                this.api.lookup3DS(t, r.bind(this.handleLookupResponse(e), this))
            }, i.prototype.handleLookupResponse = function(t) {
                var e = this;
                return function(n, i) {
                    var s;
                    n ? t(n.error) : i.lookup && i.lookup.acsUrl && i.lookup.acsUrl.length > 0 ? (e.nonce = i.paymentMethod.nonce, s = new o(this.clientToken.assetsUrl, this.container), s.get(i.lookup, r.bind(this.handleAuthenticationResponse(t), this)), this._detachListeners(), this._attachListeners()) : (e.nonce = i.paymentMethod.nonce, t(null, {
                        nonce: e.nonce,
                        verificationDetails: i.threeDSecureInfo
                    }))
                }
            }, i.prototype.handleAuthenticationResponse = function(t) {
                return function(e) {
                    var n, i = r.decodeQueryString(e);
                    i.user_closed || (n = JSON.parse(i.auth_response), n.success ? t(null, {
                        nonce: n.paymentMethod.nonce,
                        verificationDetails: n.threeDSecureInfo
                    }) : n.threeDSecureInfo && n.threeDSecureInfo.liabilityShiftPossible ? t(null, {
                        nonce: this.nonce,
                        verificationDetails: n.threeDSecureInfo
                    }) : t(n.error))
                }
            }, i.prototype._attachListeners = function() {
                r.addEventListener(window, "message", this._boundHandleUserClose)
            }, i.prototype._detachListeners = function() {
                r.removeEventListener(window, "message", this._boundHandleUserClose)
            }, i.prototype._handleUserClose = function(t) {
                "user_closed=true" === t.data && this._onUserClose()
            }, i.prototype._onUserClose = n, e.exports = i
        }, {
            "./authorization_service": 22,
            "braintree-utilities": 21
        }],
        24: [function(t, e) {
            "use strict";
            var n = t("./client");
            t("./vendor/json2"), e.exports = {
                create: function(t, e) {
                    var i = new n(t, e);
                    return i
                }
            }
        }, {
            "./client": 23,
            "./vendor/json2": 25
        }],
        25: [function(require, module, exports) {
            "object" != typeof JSON && (JSON = {}),
                function() {
                    "use strict";

                    function f(t) {
                        return 10 > t ? "0" + t : t
                    }

                    function quote(t) {
                        return escapable.lastIndex = 0, escapable.test(t) ? '"' + t.replace(escapable, function(t) {
                            var e = meta[t];
                            return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                        }) + '"' : '"' + t + '"'
                    }

                    function str(t, e) {
                        var n, i, r, o, s, a = gap,
                            u = e[t];
                        switch (u && "object" == typeof u && "function" == typeof u.toJSON && (u = u.toJSON(t)), "function" == typeof rep && (u = rep.call(e, t, u)), typeof u) {
                            case "string":
                                return quote(u);
                            case "number":
                                return isFinite(u) ? String(u) : "null";
                            case "boolean":
                            case "null":
                                return String(u);
                            case "object":
                                if (!u) return "null";
                                if (gap += indent, s = [], "[object Array]" === Object.prototype.toString.apply(u)) {
                                    for (o = u.length, n = 0; o > n; n += 1) s[n] = str(n, u) || "null";
                                    return r = 0 === s.length ? "[]" : gap ? "[\n" + gap + s.join(",\n" + gap) + "\n" + a + "]" : "[" + s.join(",") + "]", gap = a, r
                                }
                                if (rep && "object" == typeof rep)
                                    for (o = rep.length, n = 0; o > n; n += 1) "string" == typeof rep[n] && (i = rep[n], r = str(i, u), r && s.push(quote(i) + (gap ? ": " : ":") + r));
                                else
                                    for (i in u) Object.prototype.hasOwnProperty.call(u, i) && (r = str(i, u), r && s.push(quote(i) + (gap ? ": " : ":") + r));
                                return r = 0 === s.length ? "{}" : gap ? "{\n" + gap + s.join(",\n" + gap) + "\n" + a + "}" : "{" + s.join(",") + "}", gap = a, r
                        }
                    }
                    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
                        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
                    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
                        return this.valueOf()
                    });
                    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                        gap, indent, meta = {
                            "\b": "\\b",
                            "	": "\\t",
                            "\n": "\\n",
                            "\f": "\\f",
                            "\r": "\\r",
                            '"': '\\"',
                            "\\": "\\\\"
                        },
                        rep;
                    "function" != typeof JSON.stringify && (JSON.stringify = function(t, e, n) {
                        var i;
                        if (gap = "", indent = "", "number" == typeof n)
                            for (i = 0; n > i; i += 1) indent += " ";
                        else "string" == typeof n && (indent = n);
                        if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify");
                        return str("", {
                            "": t
                        })
                    }), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
                        function walk(t, e) {
                            var n, i, r = t[e];
                            if (r && "object" == typeof r)
                                for (n in r) Object.prototype.hasOwnProperty.call(r, n) && (i = walk(r, n), void 0 !== i ? r[n] = i : delete r[n]);
                            return reviver.call(t, e, r)
                        }
                        var j;
                        if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(t) {
                                return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                            })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                            "": j
                        }, "") : j;
                        throw new SyntaxError("JSON.parse")
                    })
                }()
        }, {}],
        26: [function(t, e) {
            "use strict";

            function n(t) {
                this.postMessageReceiver(t), this.hashChangeReceiver(t)
            }
            var i = t("braintree-utilities");
            n.prototype.postMessageReceiver = function(t) {
                var e = this;
                this.wrappedCallback = function(n) {
                    var i = n.data;
                    (/^(auth_response=)/.test(i) || "user_closed=true" === i) && (t(i), e.stopListening())
                }, i.addEventListener(window, "message", this.wrappedCallback)
            }, n.prototype.hashChangeReceiver = function(t) {
                var e, n = window.location.hash,
                    i = this;
                this.poll = setInterval(function() {
                    e = window.location.hash, e.length > 0 && e !== n && (i.stopListening(), e = e.substring(1, e.length), t(e), window.location.hash = n.length > 0 ? n : "")
                }, 10)
            }, n.prototype.stopListening = function() {
                clearTimeout(this.poll), i.removeEventListener(window, "message", this.wrappedCallback)
            }, e.exports = n
        }, {
            "braintree-utilities": 21
        }],
        27: [function(t, e) {
            "use strict";
            var n, i = Array.prototype.indexOf;
            n = i ? function(t, e) {
                return t.indexOf(e)
            } : function(t, e) {
                for (var n = 0, i = t.length; i > n; n++)
                    if (t[n] === e) return n;
                return -1
            }, e.exports = {
                indexOf: n
            }
        }, {}],
        28: [function(t, e, n) {
            arguments[4][17][0].apply(n, arguments)
        }, {
            dup: 17
        }],
        29: [function(t, e, n) {
            arguments[4][18][0].apply(n, arguments)
        }, {
            dup: 18
        }],
        30: [function(t, e, n) {
            arguments[4][19][0].apply(n, arguments)
        }, {
            dup: 19
        }],
        31: [function(t, e) {
            "use strict";

            function n(t) {
                var e, n, i, r, o = [{
                    min: 0,
                    max: 180,
                    chars: 7
                }, {
                    min: 181,
                    max: 620,
                    chars: 14
                }, {
                    min: 621,
                    max: 960,
                    chars: 22
                }];
                for (r = o.length, t = t || window.innerWidth, n = 0; r > n; n++) i = o[n], t >= i.min && t <= i.max && (e = i.chars);
                return e || 60
            }

            function i(t, e) {
                var n, i;
                return -1 === t.indexOf("@") ? t : (t = t.split("@"), n = t[0], i = t[1], n.length > e && (n = n.slice(0, e) + "..."), i.length > e && (i = "..." + i.slice(-e)), n + "@" + i)
            }
            e.exports = {
                truncateEmail: i,
                getMaxCharLength: n
            }
        }, {}],
        32: [function(t, e) {
            "use strict";

            function n() {
                return "https:" === window.location.protocol
            }

            function i(t) {
                switch (t) {
                    case null:
                    case void 0:
                        return "";
                    case !0:
                        return "1";
                    case !1:
                        return "0";
                    default:
                        return encodeURIComponent(t)
                }
            }

            function r(t, e) {
                var n, o, s = [];
                for (o in t)
                    if (t.hasOwnProperty(o)) {
                        var a = t[o];
                        n = e ? e + "[" + o + "]" : o, "object" == typeof a ? s.push(r(a, n)) : void 0 !== a && null !== a && s.push(i(n) + "=" + i(a))
                    }
                return s.join("&")
            }

            function o(t) {
                for (var e = {}, n = t.split("&"), i = 0; i < n.length; i++) {
                    var r = n[i].split("="),
                        o = r[0],
                        s = decodeURIComponent(r[1]);
                    e[o] = s
                }
                return e
            }

            function s(t) {
                var e = t.split("?");
                return 2 !== e.length ? {} : o(e[1])
            }

            function a(t) {
                if (t = t.toLowerCase(), !/^http/.test(t)) return !1;
                c.href = t;
                var e = c.hostname.split("."),
                    n = e.slice(-2).join(".");
                return -1 === u.indexOf(l, n) ? !1 : !0
            }
            var u = t("./array"),
                c = document.createElement("a"),
                l = ["paypal.com", "braintreepayments.com", "braintreegateway.com", "localhost"];
            e.exports = {
                isBrowserHttps: n,
                makeQueryString: r,
                decodeQueryString: o,
                getParams: s,
                isWhitelistedDomain: a
            }
        }, {
            "./array": 27
        }],
        33: [function(t, e) {
            var n = t("./lib/dom"),
                i = t("./lib/url"),
                r = t("./lib/fn"),
                o = t("./lib/events"),
                s = t("./lib/string"),
                a = t("./lib/array");
            e.exports = {
                string: s,
                array: a,
                normalizeElement: n.normalizeElement,
                isBrowserHttps: i.isBrowserHttps,
                makeQueryString: i.makeQueryString,
                decodeQueryString: i.decodeQueryString,
                getParams: i.getParams,
                isWhitelistedDomain: i.isWhitelistedDomain,
                removeEventListener: o.removeEventListener,
                addEventListener: o.addEventListener,
                bind: r.bind,
                isFunction: r.isFunction
            }
        }, {
            "./lib/array": 27,
            "./lib/dom": 28,
            "./lib/events": 29,
            "./lib/fn": 30,
            "./lib/string": 31,
            "./lib/url": 32
        }],
        34: [function(t, e) {
            "use strict";
            var n = t("framebus");
            n.events = t("./lib/events"), e.exports = n
        }, {
            "./lib/events": 35,
            framebus: 36
        }],
        35: [function(t, e) {
            "use strict";
            for (var n = ["PAYMENT_METHOD_REQUEST", "PAYMENT_METHOD_RECEIVED", "PAYMENT_METHOD_GENERATED", "PAYMENT_METHOD_NOT_GENERATED", "PAYMENT_METHOD_CANCELLED", "PAYMENT_METHOD_ERROR", "CONFIGURATION_REQUEST", "ROOT_METADATA_REQUEST", "ERROR", "WARNING", "UI_POPUP_DID_OPEN", "UI_POPUP_DID_CLOSE", "UI_POPUP_FORCE_CLOSE", "ASYNC_DEPENDENCY_INITIALIZING", "ASYNC_DEPENDENCY_READY"], i = {}, r = 0; r < n.length; r++) {
                var o = n[r];
                i[o] = o
            }
            e.exports = i
        }, {}],
        36: [function(t, e, n) {
            "use strict";
            ! function(t, i) {
                "object" == typeof n && "undefined" != typeof e ? e.exports = i() : "function" == typeof define && define.amd ? define([], i) : t.framebus = i()
            }(this, function() {
                function t(t, e, n) {
                    var r;
                    return n = n || "*", "string" != typeof t ? !1 : "string" != typeof n ? !1 : (r = i(t, e, n), r === !1 ? !1 : (c(h.top, r, n), !0))
                }

                function e(t, e, n) {
                    return n = n || "*", p(t, e, n) ? !1 : (d[n] = d[n] || {}, d[n][t] = d[n][t] || [], d[n][t].push(e), !0)
                }

                function n(t, e, n) {
                    var i, r;
                    if (n = n || "*", p(t, e, n)) return !1;
                    if (r = d[n] && d[n][t], !r) return !1;
                    for (i = 0; i < r.length; i++)
                        if (r[i] === e) return r.splice(i, 1), !0;
                    return !1
                }

                function i(t, e, n) {
                    var i = !1,
                        r = {
                            event: t
                        };
                    "function" == typeof e ? r.reply = l(e, n) : r.data = e;
                    try {
                        i = JSON.stringify(r)
                    } catch (o) {
                        throw new Error("Could not stringify event: " + o.message)
                    }
                    return i
                }

                function r(t) {
                    var e;
                    try {
                        e = JSON.parse(t.data)
                    } catch (n) {
                        return !1
                    }
                    return null == e.event ? !1 : (null != e.reply && (e.data = function(n) {
                        var r = i(e.reply, n, t.origin);
                        return r === !1 ? !1 : void t.source.postMessage(r, t.origin)
                    }), e)
                }

                function o(t) {
                    h || (h = t, h.addEventListener ? h.addEventListener("message", a, !1) : h.attachEvent ? h.attachEvent("onmessage", a) : null === h.onmessage ? h.onmessage = a : h = null)
                }

                function s() {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                        var e = 16 * Math.random() | 0,
                            n = "x" === t ? e : 3 & e | 8;
                        return n.toString(16)
                    })
                }

                function a(t) {
                    var e;
                    "string" == typeof t.data && (e = r(t), e && (u("*", e.event, e.data, t.origin), u(t.origin, e.event, e.data, t.origin)))
                }

                function u(t, e, n, i) {
                    var r;
                    if (d[t] && d[t][e])
                        for (r = 0; r < d[t][e].length; r++) d[t][e][r](n, i)
                }

                function c(t, e, n) {
                    var i;
                    for (t.postMessage(e, n), i = 0; i < t.frames.length; i++) c(t.frames[i], e, n)
                }

                function l(t, i) {
                    function r(e, s) {
                        t(e, s), n(o, r, i)
                    }
                    var o = s();
                    return e(o, r, i), o
                }

                function p(t, e, n) {
                    return "string" != typeof t ? !0 : "function" != typeof e ? !0 : "string" != typeof n ? !0 : !1
                }
                var h, d = {};
                return o(window), {
                    publish: t,
                    pub: t,
                    trigger: t,
                    emit: t,
                    subscribe: e,
                    sub: e,
                    on: e,
                    unsubscribe: n,
                    unsub: n,
                    off: n
                }
            })
        }, {}],
        37: [function(t, e) {
            "use strict";

            function n(t, e) {
                a.emit(a.events.ERROR, {
                    type: e,
                    message: t
                })
            }

            function i(t) {
                t = t || {};
                var e = t.coinbase;
                if (null == t.apiClient) n("settings.apiClient is required for coinbase", u);
                else if (t.configuration.coinbaseEnabled)
                    if (e && (e.container || e.button))
                        if (e.container && e.button) n("options.coinbase.container and options.coinbase.button are mutually exclusive", u);
                        else {
                            if (s.isSupportedBrowser()) return !0;
                            n("Coinbase is not supported by your browser. Please consider upgrading", "UNSUPPORTED_BROWSER")
                        } else n("Either options.coinbase.container or options.coinbase.button is required for Coinbase integrations", u);
                else n("Coinbase is not enabled for your merchant account", u);
                return !1
            }

            function r(t) {
                return i(t) ? new o(t) : void 0
            }
            var o = t("./lib/coinbase"),
                s = t("./lib/detector"),
                a = t("braintree-bus"),
                u = "CONFIGURATION";
            e.exports = {
                create: r
            }
        }, {
            "./lib/coinbase": 40,
            "./lib/detector": 42,
            "braintree-bus": 48
        }],
        38: [function(t, e) {
            (function(t) {
                "use strict";

                function n(e) {
                    return e = e || t.navigator.userAgent, /AppleWebKit\//.test(e) && /Mobile\//.test(e) ? e.replace(/.* OS ([0-9_]+) like Mac OS X.*/, "$1").replace(/_/g, ".") : null
                }

                function i(e) {
                    e = e || t.navigator.userAgent;
                    var n = null,
                        i = /MSIE.(\d+)/.exec(e);
                    return /Trident/.test(e) && (n = 11), i && (n = parseInt(i[1], 10)), n
                }

                function r(e) {
                    return e = e || t.navigator.userAgent, /Android/.test(e) ? e.replace(/^.* Android ([0-9\.]+).*$/, "$1") : null
                }
                e.exports = {
                    ieVersion: i,
                    iOSSafariVersion: n,
                    androidVersion: r
                }
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        39: [function(t, e) {
            "use strict";

            function n(t, e, n) {
                return t ? (i.emit(i.events.ERROR, t.error), void n._sendAnalyticsEvent("generate.nonce.failed")) : (i.emit(i.events.PAYMENT_METHOD_GENERATED, e), void n._sendAnalyticsEvent("generate.nonce.succeeded"))
            }
            var i = t("braintree-bus");
            e.exports = {
                tokenize: n
            }
        }, {
            "braintree-bus": 48
        }],
        40: [function(t, e) {
            (function(n) {
                "use strict";

                function i(t) {
                    return {
                        clientId: t.configuration.coinbase.clientId,
                        redirectUrl: t.configuration.coinbase.redirectUrl,
                        scopes: t.configuration.coinbase.scopes || c.SCOPES,
                        meta: {
                            authorizations_merchant_account: t.configuration.coinbase.merchantAccount || ""
                        }
                    }
                }

                function r(t) {
                    var e;
                    this.buttonId = t.coinbase.button || c.BUTTON_ID, this.apiClient = t.apiClient, this.assetsUrl = t.configuration.assetsUrl, this._onOAuthSuccess = o.bind(this._onOAuthSuccess, this), this._handleButtonClick = o.bind(this._handleButtonClick, this), this.popupParams = i(t), this.redirectDoneInterval = null, t.coinbase.container ? (e = o.normalizeElement(t.coinbase.container), this._insertFrame(e)) : (n.braintreeCoinbasePopupCallback = this._onOAuthSuccess, e = document.body, o.addEventListener(e, "click", this._handleButtonClick), this._sendAnalyticsEvent("initialized"))
                }
                var o = t("braintree-utilities"),
                    s = t("./dom/composer"),
                    a = t("./url-composer"),
                    u = t("./callbacks"),
                    c = t("./constants"),
                    l = t("./detector"),
                    p = t("braintree-bus");
                r.prototype._sendAnalyticsEvent = function(t) {
                    var e = this.apiClient.integration + ".web.coinbase.";
                    this.apiClient.sendAnalyticsEvents(e + t)
                }, r.prototype._insertFrame = function(t) {
                    var e = s.createFrame({
                        src: this.assetsUrl + "/coinbase/" + c.VERSION + "/coinbase-frame.html"
                    });
                    p.emit(p.events.ASYNC_DEPENDENCY_INITIALIZING), t.appendChild(e)
                }, r.prototype._onOAuthSuccess = function(t) {
                    return this._clearPollForRedirectDone(), t.code ? (p.emit("coinbase:view:navigate", "loading"), this._sendAnalyticsEvent("popup.authorized"), void this.apiClient.tokenizeCoinbase({
                        code: t.code,
                        query: a.getQueryString()
                    }, o.bind(function(t, e) {
                        u.tokenize.apply(null, [t, e, this])
                    }, this))) : void this._sendAnalyticsEvent("popup.denied")
                }, r.prototype._clearPollForRedirectDone = function() {
                    this.redirectDoneInterval && (clearInterval(this.redirectDoneInterval), this.redirectDoneInterval = null, p.emit(p.events.UI_POPUP_DID_CLOSE, {
                        source: c.INTEGRATION_NAME
                    }))
                }, r.prototype._pollForRedirectDone = function(t) {
                    this.redirectDoneInterval = setInterval(o.bind(function() {
                        var e;
                        if (null == t || t.closed) return this._sendAnalyticsEvent("popup.aborted"), void this._clearPollForRedirectDone();
                        try {
                            if ("about:blank" === t.location.href) throw new Error("Not finished loading");
                            e = o.decodeQueryString(t.location.search.replace(/^\?/, "")).code
                        } catch (n) {
                            return
                        }
                        this._onOAuthSuccess({
                            code: e
                        }), l.shouldCloseFromParent() && t.close()
                    }, this), 100)
                }, r.prototype._openPopup = function() {
                    var t;
                    this._sendAnalyticsEvent("popup.started"), t = s.createPopup(a.compose(this.popupParams)), t.focus(), this._pollForRedirectDone(t), p.trigger(p.events.UI_POPUP_DID_OPEN, {
                        source: c.INTEGRATION_NAME
                    }), p.on(p.events.UI_POPUP_FORCE_CLOSE, function(e) {
                        e.target === c.INTEGRATION_NAME && t.close()
                    })
                }, r.prototype._handleButtonClick = function(t) {
                    for (var e = t.target || t.srcElement;;) {
                        if (null == e) return;
                        if (e === t.currentTarget) return;
                        if (e.id === this.buttonId) break;
                        e = e.parentNode
                    }
                    t && t.preventDefault ? t.preventDefault() : t.returnValue = !1, this._openPopup()
                }, e.exports = r
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./callbacks": 39,
            "./constants": 41,
            "./detector": 42,
            "./dom/composer": 44,
            "./url-composer": 47,
            "braintree-bus": 48,
            "braintree-utilities": 57
        }],
        41: [function(t, e) {
            "use strict";
            e.exports = {
                BASE_URL: "https://coinbase.com",
                ORIGIN_URL: "https://www.coinbase.com",
                FRAME_NAME: "braintree-coinbase-frame",
                POPUP_NAME: "coinbase",
                BUTTON_ID: "bt-coinbase-button",
                SCOPES: "send",
                VERSION: "0.0.7",
                INTEGRATION_NAME: "Coinbase"
            }
        }, {}],
        42: [function(t, e) {
            "use strict";

            function n() {
                var t = s.ieVersion();
                return !t || t > 8
            }

            function i() {
                var t = s.androidVersion();
                return null == t ? !1 : /^5/.test(t)
            }

            function r() {
                return !(i() || o())
            }

            function o() {
                var t = s.iOSSafariVersion();
                return null == t ? !1 : /^8\.0/.test(t) || /^8\.1$/.test(t)
            }
            var s = t("./browser");
            e.exports = {
                isSupportedBrowser: n,
                shouldCloseFromParent: r,
                shouldDisplayIOSClose: o,
                shouldDisplayLollipopClose: i
            }
        }, {
            "./browser": 38
        }],
        43: [function(t, e) {
            "use strict";

            function n(t) {
                var e = document.createElement("button");
                return t = t || {}, e.id = t.id || "coinbase-button", e.style.backgroundColor = t.backgroundColor || "#EEE", e.style.color = t.color || "#4597C3", e.style.border = t.border || "0", e.style.borderRadius = t.borderRadius || "6px", e.style.padding = t.padding || "12px", e.innerHTML = t.innerHTML || "coinbase", e
            }
            e.exports = {
                create: n
            }
        }, {}],
        44: [function(t, e) {
            "use strict";
            var n = t("./popup"),
                i = t("./button"),
                r = t("./frame");
            e.exports = {
                createButton: i.create,
                createPopup: n.create,
                createFrame: r.create
            }
        }, {
            "./button": 43,
            "./frame": 45,
            "./popup": 46
        }],
        45: [function(t, e) {
            "use strict";

            function n(t) {
                var e = document.createElement("iframe");
                return e.src = t.src, e.id = i.FRAME_NAME, e.name = i.FRAME_NAME, e.allowTransparency = !0, e.height = "70px", e.width = "100%", e.frameBorder = 0, e.style.padding = 0, e.style.margin = 0, e.style.border = 0, e.style.outline = "none", e
            }
            var i = t("../constants");
            e.exports = {
                create: n
            }
        }, {
            "../constants": 41
        }],
        46: [function(t, e) {
            (function(n) {
                "use strict";

                function i(t) {
                    var e = [];
                    for (var n in t) t.hasOwnProperty(n) && e.push([n, t[n]].join("="));
                    return e.join(",")
                }

                function r() {
                    var t = 850,
                        e = 600;
                    return i({
                        width: t,
                        height: e,
                        left: (screen.width - t) / 2,
                        top: (screen.height - e) / 4
                    })
                }

                function o(t) {
                    return n.open(t, s.POPUP_NAME, r())
                }
                var s = t("../constants");
                e.exports = {
                    create: o
                }
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "../constants": 41
        }],
        47: [function(t, e) {
            "use strict";

            function n() {
                return "version=" + r.VERSION
            }

            function i(t) {
                var e = r.BASE_URL + "/oauth/authorize?response_type=code",
                    i = t.redirectUrl + "?" + n();
                if (e += "&redirect_uri=" + encodeURIComponent(i), e += "&client_id=" + t.clientId, t.scopes && (e += "&scope=" + encodeURIComponent(t.scopes)), t.meta)
                    for (var o in t.meta) t.meta.hasOwnProperty(o) && (e += "&meta[" + encodeURIComponent(o) + "]=" + encodeURIComponent(t.meta[o]));
                return e
            }
            var r = t("./constants");
            e.exports = {
                compose: i,
                getQueryString: n
            }
        }, {
            "./constants": 41
        }],
        48: [function(t, e, n) {
            arguments[4][34][0].apply(n, arguments)
        }, {
            "./lib/events": 49,
            dup: 34,
            framebus: 50
        }],
        49: [function(t, e, n) {
            arguments[4][35][0].apply(n, arguments)
        }, {
            dup: 35
        }],
        50: [function(t, e, n) {
            arguments[4][36][0].apply(n, arguments)
        }, {
            dup: 36
        }],
        51: [function(t, e, n) {
            arguments[4][27][0].apply(n, arguments)
        }, {
            dup: 27
        }],
        52: [function(t, e, n) {
            arguments[4][17][0].apply(n, arguments)
        }, {
            dup: 17
        }],
        53: [function(t, e, n) {
            arguments[4][18][0].apply(n, arguments)
        }, {
            dup: 18
        }],
        54: [function(t, e, n) {
            arguments[4][19][0].apply(n, arguments)
        }, {
            dup: 19
        }],
        55: [function(t, e, n) {
            arguments[4][31][0].apply(n, arguments)
        }, {
            dup: 31
        }],
        56: [function(t, e, n) {
            arguments[4][32][0].apply(n, arguments)
        }, {
            "./array": 51,
            dup: 32
        }],
        57: [function(t, e, n) {
            arguments[4][33][0].apply(n, arguments)
        }, {
            "./lib/array": 51,
            "./lib/dom": 52,
            "./lib/events": 53,
            "./lib/fn": 54,
            "./lib/string": 55,
            "./lib/url": 56,
            dup: 33
        }],
        58: [function(t, e, n) {
            arguments[4][2][0].apply(n, arguments)
        }, {
            "./coinbase-account": 59,
            "./credit-card": 60,
            "./europe-bank-account": 61,
            "./normalize-api-fields": 65,
            "./parse-client-token": 66,
            "./paypal-account": 67,
            "./request-driver": 69,
            "./sepa-mandate": 70,
            "./util": 71,
            "braintree-3ds": 80,
            "braintree-utilities": 89,
            dup: 2
        }],
        59: [function(t, e, n) {
            arguments[4][3][0].apply(n, arguments)
        }, {
            dup: 3
        }],
        60: [function(t, e, n) {
            arguments[4][4][0].apply(n, arguments)
        }, {
            dup: 4
        }],
        61: [function(t, e, n) {
            arguments[4][5][0].apply(n, arguments)
        }, {
            dup: 5
        }],
        62: [function(t, e, n) {
            arguments[4][6][0].apply(n, arguments)
        }, {
            "./parse-client-token": 66,
            "./request-driver": 69,
            "./util": 71,
            dup: 6
        }],
        63: [function(t, e, n) {
            arguments[4][7][0].apply(n, arguments)
        }, {
            "./jsonp": 64,
            dup: 7
        }],
        64: [function(t, e, n) {
            arguments[4][8][0].apply(n, arguments)
        }, {
            "./util": 71,
            dup: 8
        }],
        65: [function(t, e, n) {
            arguments[4][9][0].apply(n, arguments)
        }, {
            dup: 9
        }],
        66: [function(t, e, n) {
            arguments[4][10][0].apply(n, arguments)
        }, {
            "./polyfill": 68,
            "braintree-utilities": 89,
            dup: 10
        }],
        67: [function(t, e, n) {
            arguments[4][11][0].apply(n, arguments)
        }, {
            dup: 11
        }],
        68: [function(t, e, n) {
            arguments[4][12][0].apply(n, arguments)
        }, {
            dup: 12
        }],
        69: [function(t, e, n) {
            arguments[4][13][0].apply(n, arguments)
        }, {
            "./jsonp-driver": 63,
            dup: 13
        }],
        70: [function(t, e, n) {
            arguments[4][14][0].apply(n, arguments)
        }, {
            dup: 14
        }],
        71: [function(t, e, n) {
            arguments[4][15][0].apply(n, arguments)
        }, {
            dup: 15
        }],
        72: [function(t, e, n) {
            arguments[4][16][0].apply(n, arguments)
        }, {
            "./lib/client": 58,
            "./lib/get-configuration": 62,
            "./lib/jsonp": 64,
            "./lib/jsonp-driver": 63,
            "./lib/parse-client-token": 66,
            "./lib/util": 71,
            dup: 16
        }],
        73: [function(t, e, n) {
            arguments[4][17][0].apply(n, arguments)
        }, {
            dup: 17
        }],
        74: [function(t, e, n) {
            arguments[4][18][0].apply(n, arguments)
        }, {
            dup: 18
        }],
        75: [function(t, e, n) {
            arguments[4][19][0].apply(n, arguments)
        }, {
            dup: 19
        }],
        76: [function(t, e, n) {
            arguments[4][20][0].apply(n, arguments)
        }, {
            dup: 20
        }],
        77: [function(t, e, n) {
            arguments[4][21][0].apply(n, arguments)
        }, {
            "./lib/dom": 73,
            "./lib/events": 74,
            "./lib/fn": 75,
            "./lib/url": 76,
            dup: 21
        }],
        78: [function(t, e, n) {
            arguments[4][22][0].apply(n, arguments)
        }, {
            "../shared/receiver": 82,
            "braintree-utilities": 77,
            dup: 22
        }],
        79: [function(t, e, n) {
            arguments[4][23][0].apply(n, arguments)
        }, {
            "./authorization_service": 78,
            "braintree-utilities": 77,
            dup: 23
        }],
        80: [function(t, e, n) {
            arguments[4][24][0].apply(n, arguments)
        }, {
            "./client": 79,
            "./vendor/json2": 81,
            dup: 24
        }],
        81: [function(t, e, n) {
            arguments[4][25][0].apply(n, arguments)
        }, {
            dup: 25
        }],
        82: [function(t, e, n) {
            arguments[4][26][0].apply(n, arguments)
        }, {
            "braintree-utilities": 77,
            dup: 26
        }],
        83: [function(t, e, n) {
            arguments[4][27][0].apply(n, arguments)
        }, {
            dup: 27
        }],
        84: [function(t, e, n) {
            arguments[4][17][0].apply(n, arguments)
        }, {
            dup: 17
        }],
        85: [function(t, e, n) {
            arguments[4][18][0].apply(n, arguments)
        }, {
            dup: 18
        }],
        86: [function(t, e, n) {
            arguments[4][19][0].apply(n, arguments)
        }, {
            dup: 19
        }],
        87: [function(t, e, n) {
            arguments[4][31][0].apply(n, arguments)
        }, {
            dup: 31
        }],
        88: [function(t, e, n) {
            arguments[4][32][0].apply(n, arguments)
        }, {
            "./array": 83,
            dup: 32
        }],
        89: [function(t, e, n) {
            arguments[4][33][0].apply(n, arguments)
        }, {
            "./lib/array": 83,
            "./lib/dom": 84,
            "./lib/events": 85,
            "./lib/fn": 86,
            "./lib/string": 87,
            "./lib/url": 88,
            dup: 33
        }],
        90: [function(t, e, n) {
            arguments[4][34][0].apply(n, arguments)
        }, {
            "./lib/events": 91,
            dup: 34,
            framebus: 92
        }],
        91: [function(t, e, n) {
            arguments[4][35][0].apply(n, arguments)
        }, {
            dup: 35
        }],
        92: [function(t, e, n) {
            arguments[4][36][0].apply(n, arguments)
        }, {
            dup: 36
        }],
        93: [function(t, e, n) {
            arguments[4][2][0].apply(n, arguments)
        }, {
            "./coinbase-account": 94,
            "./credit-card": 95,
            "./europe-bank-account": 96,
            "./normalize-api-fields": 100,
            "./parse-client-token": 101,
            "./paypal-account": 102,
            "./request-driver": 104,
            "./sepa-mandate": 105,
            "./util": 106,
            "braintree-3ds": 115,
            "braintree-utilities": 124,
            dup: 2
        }],
        94: [function(t, e, n) {
            arguments[4][3][0].apply(n, arguments)
        }, {
            dup: 3
        }],
        95: [function(t, e, n) {
            arguments[4][4][0].apply(n, arguments)
        }, {
            dup: 4
        }],
        96: [function(t, e, n) {
            arguments[4][5][0].apply(n, arguments)
        }, {
            dup: 5
        }],
        97: [function(t, e, n) {
            arguments[4][6][0].apply(n, arguments)
        }, {
            "./parse-client-token": 101,
            "./request-driver": 104,
            "./util": 106,
            dup: 6
        }],
        98: [function(t, e, n) {
            arguments[4][7][0].apply(n, arguments)
        }, {
            "./jsonp": 99,
            dup: 7
        }],
        99: [function(t, e, n) {
            arguments[4][8][0].apply(n, arguments)
        }, {
            "./util": 106,
            dup: 8
        }],
        100: [function(t, e, n) {
            arguments[4][9][0].apply(n, arguments)
        }, {
            dup: 9
        }],
        101: [function(t, e, n) {
            arguments[4][10][0].apply(n, arguments)
        }, {
            "./polyfill": 103,
            "braintree-utilities": 124,
            dup: 10
        }],
        102: [function(t, e, n) {
            arguments[4][11][0].apply(n, arguments)
        }, {
            dup: 11
        }],
        103: [function(t, e, n) {
            arguments[4][12][0].apply(n, arguments)
        }, {
            dup: 12
        }],
        104: [function(t, e, n) {
            arguments[4][13][0].apply(n, arguments)
        }, {
            "./jsonp-driver": 98,
            dup: 13
        }],
        105: [function(t, e, n) {
            arguments[4][14][0].apply(n, arguments)
        }, {
            dup: 14
        }],
        106: [function(t, e, n) {
            arguments[4][15][0].apply(n, arguments)
        }, {
            dup: 15
        }],
        107: [function(t, e, n) {
            arguments[4][16][0].apply(n, arguments)
        }, {
            "./lib/client": 93,
            "./lib/get-configuration": 97,
            "./lib/jsonp": 99,
            "./lib/jsonp-driver": 98,
            "./lib/parse-client-token": 101,
            "./lib/util": 106,
            dup: 16
        }],
        108: [function(t, e, n) {
            arguments[4][17][0].apply(n, arguments)
        }, {
            dup: 17
        }],
        109: [function(t, e, n) {
            arguments[4][18][0].apply(n, arguments)
        }, {
            dup: 18
        }],
        110: [function(t, e, n) {
            arguments[4][19][0].apply(n, arguments)
        }, {
            dup: 19
        }],
        111: [function(t, e, n) {
            arguments[4][20][0].apply(n, arguments)
        }, {
            dup: 20
        }],
        112: [function(t, e, n) {
            arguments[4][21][0].apply(n, arguments)
        }, {
            "./lib/dom": 108,
            "./lib/events": 109,
            "./lib/fn": 110,
            "./lib/url": 111,
            dup: 21
        }],
        113: [function(t, e, n) {
            arguments[4][22][0].apply(n, arguments)
        }, {
            "../shared/receiver": 117,
            "braintree-utilities": 112,
            dup: 22
        }],
        114: [function(t, e, n) {
            arguments[4][23][0].apply(n, arguments)
        }, {
            "./authorization_service": 113,
            "braintree-utilities": 112,
            dup: 23
        }],
        115: [function(t, e, n) {
            arguments[4][24][0].apply(n, arguments)
        }, {
            "./client": 114,
            "./vendor/json2": 116,
            dup: 24
        }],
        116: [function(t, e, n) {
            arguments[4][25][0].apply(n, arguments)
        }, {
            dup: 25
        }],
        117: [function(t, e, n) {
            arguments[4][26][0].apply(n, arguments)
        }, {
            "braintree-utilities": 112,
            dup: 26
        }],
        118: [function(t, e, n) {
            arguments[4][27][0].apply(n, arguments)
        }, {
            dup: 27
        }],
        119: [function(t, e, n) {
            arguments[4][17][0].apply(n, arguments)
        }, {
            dup: 17
        }],
        120: [function(t, e, n) {
            arguments[4][18][0].apply(n, arguments)
        }, {
            dup: 18
        }],
        121: [function(t, e, n) {
            arguments[4][19][0].apply(n, arguments)
        }, {
            dup: 19
        }],
        122: [function(t, e, n) {
            arguments[4][31][0].apply(n, arguments)
        }, {
            dup: 31
        }],
        123: [function(t, e, n) {
            arguments[4][32][0].apply(n, arguments)
        }, {
            "./array": 118,
            dup: 32
        }],
        124: [function(t, e, n) {
            arguments[4][33][0].apply(n, arguments)
        }, {
            "./lib/array": 118,
            "./lib/dom": 119,
            "./lib/events": 120,
            "./lib/fn": 121,
            "./lib/string": 122,
            "./lib/url": 123,
            dup: 33
        }],
        125: [function(t, e) {
            "use strict";

            function n(t) {
                this.host = t || window, this.handlers = [], i.addEventListener(this.host, "message", i.bind(this.receive, this))
            }
            var i = t("braintree-utilities");
            n.prototype.receive = function(t) {
                var e, i, r, o;
                try {
                    r = JSON.parse(t.data)
                } catch (s) {
                    return
                }
                for (o = r.type, i = new n.Message(this, t.source, r.data), e = 0; e < this.handlers.length; e++) this.handlers[e].type === o && this.handlers[e].handler(i)
            }, n.prototype.send = function(t, e, n) {
                t.postMessage(JSON.stringify({
                    type: e,
                    data: n
                }), "*")
            }, n.prototype.register = function(t, e) {
                this.handlers.push({
                    type: t,
                    handler: e
                })
            }, n.prototype.unregister = function(t, e) {
                for (var n = this.handlers.length - 1; n >= 0; n--)
                    if (this.handlers[n].type === t && this.handlers[n].handler === e) return this.handlers.splice(n, 1)
            }, n.Message = function(t, e, n) {
                this.bus = t, this.source = e, this.content = n
            }, n.Message.prototype.reply = function(t, e) {
                this.bus.send(this.source, t, e)
            }, e.exports = n
        }, {
            "braintree-utilities": 135
        }],
        126: [function(t, e) {
            "use strict";

            function n(t, e) {
                this.bus = t, this.target = e, this.handlers = [], this.bus.register("publish", i.bind(this._handleMessage, this))
            }
            var i = t("braintree-utilities");
            n.prototype._handleMessage = function(t) {
                var e, n = t.content,
                    i = this.handlers[n.channel];
                if ("undefined" != typeof i)
                    for (e = 0; e < i.length; e++) i[e](n.data)
            }, n.prototype.publish = function(t, e) {
                this.bus.send(this.target, "publish", {
                    channel: t,
                    data: e
                })
            }, n.prototype.subscribe = function(t, e) {
                this.handlers[t] = this.handlers[t] || [], this.handlers[t].push(e)
            }, n.prototype.unsubscribe = function(t, e) {
                var n, i = this.handlers[t];
                if ("undefined" != typeof i)
                    for (n = 0; n < i.length; n++) i[n] === e && i.splice(n, 1)
            }, e.exports = n
        }, {
            "braintree-utilities": 135
        }],
        127: [function(t, e) {
            "use strict";

            function n(t) {
                this.bus = t, this.frames = [], this.handlers = []
            }
            n.prototype.subscribe = function(t, e) {
                this.handlers[t] = this.handlers[t] || [], this.handlers[t].push(e)
            }, n.prototype.registerFrame = function(t) {
                this.frames.push(t)
            }, n.prototype.unregisterFrame = function(t) {
                for (var e = 0; e < this.frames.length; e++) this.frames[e] === t && this.frames.splice(e, 1)
            }, n.prototype.publish = function(t, e) {
                var n, i = this.handlers[t];
                if ("undefined" != typeof i)
                    for (n = 0; n < i.length; n++) i[n](e);
                for (n = 0; n < this.frames.length; n++) this.bus.send(this.frames[n], "publish", {
                    channel: t,
                    data: e
                })
            }, n.prototype.unsubscribe = function(t, e) {
                var n, i = this.handlers[t];
                if ("undefined" != typeof i)
                    for (n = 0; n < i.length; n++) i[n] === e && i.splice(n, 1)
            }, e.exports = n
        }, {}],
        128: [function(t, e) {
            "use strict";

            function n(t, e) {
                this.bus = t, this.target = e || window.parent, this.counter = 0, this.callbacks = {}, this.bus.register("rpc_response", i.bind(this._handleResponse, this))
            }
            var i = t("braintree-utilities");
            n.prototype._handleResponse = function(t) {
                var e = t.content,
                    n = this.callbacks[e.id];
                "function" == typeof n && (n.apply(null, e.response), delete this.callbacks[e.id])
            }, n.prototype.invoke = function(t, e, n) {
                var i = this.counter++;
                this.callbacks[i] = n, this.bus.send(this.target, "rpc_request", {
                    id: i,
                    method: t,
                    args: e
                })
            }, e.exports = n
        }, {
            "braintree-utilities": 135
        }],
        129: [function(t, e) {
            "use strict";

            function n(t) {
                this.bus = t, this.methods = {}, this.bus.register("rpc_request", i.bind(this._handleRequest, this))
            }
            var i = t("braintree-utilities");
            n.prototype._handleRequest = function(t) {
                var e, n = t.content,
                    i = n.args || [],
                    r = this.methods[n.method];
                "function" == typeof r && (e = function() {
                    t.reply("rpc_response", {
                        id: n.id,
                        response: Array.prototype.slice.call(arguments)
                    })
                }, i.push(e), r.apply(null, i))
            }, n.prototype.define = function(t, e) {
                this.methods[t] = e
            }, e.exports = n
        }, {
            "braintree-utilities": 135
        }],
        130: [function(t, e) {
            var n = t("./lib/message-bus"),
                i = t("./lib/pubsub-client"),
                r = t("./lib/pubsub-server"),
                o = t("./lib/rpc-client"),
                s = t("./lib/rpc-server");
            e.exports = {
                MessageBus: n,
                PubsubClient: i,
                PubsubServer: r,
                RPCClient: o,
                RPCServer: s
            }
        }, {
            "./lib/message-bus": 125,
            "./lib/pubsub-client": 126,
            "./lib/pubsub-server": 127,
            "./lib/rpc-client": 128,
            "./lib/rpc-server": 129
        }],
        131: [function(t, e) {
            "use strict";

            function n(t, e) {
                if (e = e || "[" + t + "] is not a valid DOM Element", t && t.nodeType && 1 === t.nodeType) return t;
                if (t && window.jQuery && t instanceof jQuery && 0 !== t.length) return t[0];
                if ("string" == typeof t && document.getElementById(t)) return document.getElementById(t);
                throw new Error(e)
            }
            e.exports = {
                normalizeElement: n
            }
        }, {}],
        132: [function(t, e) {
            "use strict";

            function n(t, e, n) {
                t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent && t.attachEvent("on" + e, n)
            }

            function i(t, e, n) {
                t.removeEventListener ? t.removeEventListener(e, n, !1) : t.detachEvent && t.detachEvent("on" + e, n)
            }
            e.exports = {
                removeEventListener: i,
                addEventListener: n
            }
        }, {}],
        133: [function(t, e) {
            "use strict";

            function n(t) {
                return "[object Function]" === Object.prototype.toString.call(t)
            }

            function i(t, e) {
                return function() {
                    t.apply(e, arguments)
                }
            }
            e.exports = {
                bind: i,
                isFunction: n
            }
        }, {}],
        134: [function(t, e, n) {
            arguments[4][20][0].apply(n, arguments)
        }, {
            dup: 20
        }],
        135: [function(t, e, n) {
            arguments[4][21][0].apply(n, arguments)
        }, {
            "./lib/dom": 131,
            "./lib/events": 132,
            "./lib/fn": 133,
            "./lib/url": 134,
            dup: 21
        }],
        136: [function(t, e, n) {
            arguments[4][27][0].apply(n, arguments)
        }, {
            dup: 27
        }],
        137: [function(t, e, n) {
            arguments[4][17][0].apply(n, arguments)
        }, {
            dup: 17
        }],
        138: [function(t, e, n) {
            arguments[4][18][0].apply(n, arguments)
        }, {
            dup: 18
        }],
        139: [function(t, e, n) {
            arguments[4][19][0].apply(n, arguments)
        }, {
            dup: 19
        }],
        140: [function(t, e, n) {
            arguments[4][31][0].apply(n, arguments)
        }, {
            dup: 31
        }],
        141: [function(t, e, n) {
            arguments[4][32][0].apply(n, arguments)
        }, {
            "./array": 136,
            dup: 32
        }],
        142: [function(t, e, n) {
            arguments[4][33][0].apply(n, arguments)
        }, {
            "./lib/array": 136,
            "./lib/dom": 137,
            "./lib/events": 138,
            "./lib/fn": 139,
            "./lib/string": 140,
            "./lib/url": 141,
            dup: 33
        }],
        143: [function(t, e) {
            function n(t) {
                var e = window.getComputedStyle ? getComputedStyle(t) : t.currentStyle;
                return {
                    overflow: e.overflow || "",
                    height: t.style.height || ""
                }
            }

            function i() {
                return {
                    html: {
                        node: document.documentElement,
                        styles: n(document.documentElement)
                    },
                    body: {
                        node: document.body,
                        styles: n(document.body)
                    }
                }
            }

            function r(t, e) {
                if (!t) throw new Error('Parameter "clientToken" cannot be null');
                e = e || {}, this._clientToken = o.parseClientToken(t), this._clientOptions = e, this.container = e.container, this.merchantPageDefaultStyles = null, this.paymentMethodNonceInputField = e.paymentMethodNonceInputField, this.frame = null, this.popup = null, this.insertFrameFunction = e.insertFrame, this.onSuccess = e.onSuccess, this.onCancelled = e.onCancelled, this.onUnsupported = e.onUnsupported, this.loggedInView = null, this.loggedOutView = null, this.insertUI = !0
            }
            var o = t("braintree-api"),
                s = t("braintree-rpc"),
                a = t("braintree-utilities"),
                u = t("./logged-in-view"),
                c = t("./logged-out-view"),
                l = t("./overlay-view"),
                p = t("../shared/util/browser"),
                h = t("../shared/util/dom"),
                d = t("../shared/constants"),
                f = t("../shared/util/util"),
                m = t("../shared/get-locale");
            r.prototype.getViewerUrl = function() {
                var t = this._clientToken.paypal.assetsUrl;
                return t + "/pwpp/" + d.VERSION + "/html/braintree-frame.html"
            }, r.prototype.getProxyUrl = function() {
                var t = this._clientToken.paypal.assetsUrl;
                return t + "/pwpp/" + d.VERSION + "/html/proxy-frame.html"
            }, r.prototype.initialize = function() {
                if (!this._clientToken.paypalEnabled) return void("function" == typeof this.onUnsupported && this.onUnsupported(new Error("PayPal is not enabled")));
                if (!this._isBrowserSecure()) return void("function" == typeof this.onUnsupported && this.onUnsupported(new Error("unsupported protocol detected")));
                if (this._isAriesCapable()) {
                    if (!this._isAriesSupportedCurrency()) return void("function" == typeof this.onUnsupported && this.onUnsupported(new Error("This PayPal integration does not support this currency")));
                    if (!this._isAriesSupportedCountries()) return void("function" == typeof this.onUnsupported && this.onUnsupported(new Error("This PayPal integration does not support this locale")));
                    if (!this._isValidAmount()) return void("function" == typeof this.onUnsupported && this.onUnsupported(new Error("Amount must be a number")))
                }
                return this._isMisconfiguredUnvettedMerchant() ? void("function" == typeof this.onUnsupported && this.onUnsupported(new Error("Unvetted merchant client token does not include a payee email"))) : (this._overrideClientTokenProperties(), p.isProxyFrameRequired() && this._insertProxyFrame(), this._setupDomElements(), this._setupPaymentMethodNonceInputField(), this._setupViews(), void this._createRpcServer())
            }, r.prototype._isSupportedOption = function(t, e) {
                for (var n = e.length, i = !1, r = 0; n > r; r++) t.toLowerCase() === e[r].toLowerCase() && (i = !0);
                return i
            }, r.prototype._isAriesSupportedCurrency = function() {
                return this._isSupportedOption(this._clientOptions.currency, d.ARIES_SUPPORTED_CURRENCIES)
            }, r.prototype._isAriesSupportedCountries = function() {
                return this._isSupportedOption(m(this._clientOptions.locale).split("_")[1], d.ARIES_SUPPORTED_COUNTRIES)
            }, r.prototype._isValidAmount = function() {
                var t = parseFloat(this._clientOptions.amount);
                return "number" == typeof t && !isNaN(t) && t >= 0
            }, r.prototype._isMisconfiguredUnvettedMerchant = function() {
                return this._clientToken.paypal.unvettedMerchant && (!this._isAriesCapable() || !this._clientToken.paypal.payeeEmail)
            }, r.prototype._isBrowserSecure = function() {
                return a.isBrowserHttps() || p.isPopupSupported() || this._clientToken.paypal.allowHttp
            }, r.prototype._overrideClientTokenProperties = function() {
                this._clientOptions.displayName && (this._clientToken.paypal.displayName = this._clientOptions.displayName)
            }, r.prototype._setupDomElements = function() {
                this.insertUI && (this.container = a.normalizeElement(this.container))
            }, r.prototype._setupPaymentMethodNonceInputField = function() {
                if (this.insertUI) {
                    var t = this.paymentMethodNonceInputField;
                    a.isFunction(t) || (t = void 0 !== t ? a.normalizeElement(t) : this._createPaymentMethodNonceInputField(), this.paymentMethodNonceInputField = t)
                }
            }, r.prototype._setupViews = function() {
                var t = this._clientToken.paypal.assetsUrl;
                this.insertUI && (this.loggedInView = new u({
                    container: this.container,
                    assetsUrl: t
                }), this.loggedOutView = new c({
                    assetsUrl: t,
                    container: this.container,
                    isCheckout: this._isAriesCapable(),
                    locale: this._clientOptions.locale,
                    merchantId: "merchantId"
                }), a.addEventListener(this.loggedOutView.container, "click", a.bind(this._handleContainerClick, this)), a.addEventListener(this.loggedInView.logoutNode, "click", a.bind(this._handleLogout, this)))
            }, r.prototype._createRpcServer = function() {
                var t = new s.MessageBus(window),
                    e = new s.RPCServer(t, window);
                e.define("getClientToken", a.bind(this._handleGetClientToken, this)), e.define("getClientOptions", a.bind(this._handleGetClientOptions, this)), e.define("closePayPalModal", a.bind(this._handleCloseMessage, this)), e.define("receivePayPalData", a.bind(this._handleSuccessfulAuthentication, this))
            }, r.prototype._createPaymentMethodNonceInputField = function() {
                var t = document.createElement("input");
                return t.name = "payment_method_nonce", t.type = "hidden", this.container.appendChild(t)
            }, r.prototype._createFrame = function() {
                var t, e = document.createElement("iframe");
                return this._isAriesCapable() ? (t = d.ARIES_FRAME_NAME, e.style.background = "#FFFFFF") : t = d.FRAME_NAME, e.src = this.getViewerUrl(), e.id = t, e.name = t, e.allowTransparency = !0, e.height = "100%", e.width = "100%", e.frameBorder = 0, e.style.position = p.isMobile() ? "absolute" : "fixed", e.style.top = 0, e.style.left = 0, e.style.bottom = 0, e.style.zIndex = 20001, e.style.padding = 0, e.style.margin = 0, e.style.border = 0, e.style.outline = "none", e
            }, r.prototype._removeFrame = function(t) {
                t = t || document.body, this.frame && t.contains(this.frame) && (t.removeChild(this.frame), this._unlockMerchantWindowSize())
            }, r.prototype._insertFrame = function() {
                this.insertFrameFunction ? this.insertFrameFunction(this.getViewerUrl()) : (this.frame = this._createFrame(), document.body.appendChild(this.frame)), this._lockMerchantWindowSize()
            }, r.prototype._handleContainerClick = function(t) {
                function e(t) {
                    return t.className.match(/paypal-button(?!-widget)/) || "braintree-paypal-button" === t.id
                }
                var n = t.target || t.srcElement;
                (e(n) || e(n.parentNode)) && (t.preventDefault ? t.preventDefault() : t.returnValue = !1, this._open())
            }, r.prototype._setMerchantPageDefaultStyles = function() {
                this.merchantPageDefaultStyles = i()
            }, r.prototype._open = function() {
                this._isAriesCapable() && this._addCorrelationIdToClientToken(), p.isPopupSupported() ? this._openPopup() : this._openModal()
            }, r.prototype._close = function() {
                p.isPopupSupported() ? this._closePopup() : this._closeModal()
            }, r.prototype._openModal = function() {
                this._removeFrame(), this._insertFrame()
            }, r.prototype._isAriesCapable = function() {
                return !(!this._clientOptions.singleUse || !this._clientOptions.amount || !this._clientOptions.currency || this._clientOptions.demo)
            }, r.prototype._openPopup = function() {
                var t, e, n, i = [],
                    r = window.outerWidth || document.documentElement.clientWidth,
                    o = window.outerHeight || document.documentElement.clientHeight,
                    s = "undefined" == typeof window.screenY ? window.screenTop : window.screenY,
                    a = "undefined" == typeof window.screenX ? window.screenLeft : window.screenX;
                this._isAriesCapable() ? (t = d.ARIES_POPUP_NAME, n = d.ARIES_POPUP_HEIGHT, e = d.ARIES_POPUP_WIDTH) : (t = d.POPUP_NAME, n = d.POPUP_HEIGHT, e = d.POPUP_WIDTH);
                var u = (r - e) / 2 + a,
                    c = (o - n) / 2 + s;
                return i.push("height=" + n), i.push("width=" + e), i.push("top=" + c), i.push("left=" + u), i.push(d.POPUP_OPTIONS), this.popup = window.open(this.getViewerUrl(), t, i.join(",")), p.isOverlaySupported() && (this.overlayView = new l(this.popup, this._clientToken.paypal.assetsUrl), this.overlayView.render()), this.popup.focus(), this.popup
            }, r.prototype._addCorrelationIdToClientToken = function() {
                this._clientToken.correlationId = f.generateUid()
            }, r.prototype._createProxyFrame = function() {
                var t = document.createElement("iframe");
                return t.src = this.getProxyUrl(), t.id = d.BRIDGE_FRAME_NAME, t.name = d.BRIDGE_FRAME_NAME, t.allowTransparency = !0, t.height = 0, t.width = 0, t.frameBorder = 0, t.style.position = "static", t.style.padding = 0, t.style.margin = 0, t.style.border = 0, t.style.outline = "none", t
            }, r.prototype._insertProxyFrame = function() {
                this.proxyFrame = this._createProxyFrame(), document.body.appendChild(this.proxyFrame)
            }, r.prototype._closeModal = function() {
                this._removeFrame()
            }, r.prototype._closePopup = function() {
                this.popup && (this.popup.close(), this.popup = null), this.overlayView && p.isOverlaySupported() && this.overlayView.remove()
            }, r.prototype._clientTokenData = function() {
                return {
                    analyticsUrl: this._clientToken.analytics ? this._clientToken.analytics.url : void 0,
                    authorizationFingerprint: this._clientToken.authorizationFingerprint,
                    clientApiUrl: this._clientToken.clientApiUrl,
                    displayName: this._clientToken.paypal.displayName,
                    paypalBaseUrl: this._clientToken.paypal.assetsUrl,
                    paypalClientId: this._clientToken.paypal.clientId,
                    paypalPrivacyUrl: this._clientToken.paypal.privacyUrl,
                    paypalUserAgreementUrl: this._clientToken.paypal.userAgreementUrl,
                    unvettedMerchant: this._clientToken.paypal.unvettedMerchant,
                    payeeEmail: this._clientToken.paypal.payeeEmail,
                    correlationId: this._clientToken.correlationId,
                    offline: this._clientOptions.offline || this._clientToken.paypal.environmentNoNetwork,
                    sdkVersion: this._clientToken.sdkVersion,
                    merchantAppId: this._clientToken.merchantAppId
                }
            }, r.prototype._handleGetClientToken = function(t) {
                t(this._clientTokenData())
            }, r.prototype._clientOptionsData = function() {
                return {
                    demo: this._clientOptions.demo || !1,
                    locale: this._clientOptions.locale || "en_us",
                    onetime: this._clientOptions.singleUse || !1,
                    integration: this._clientOptions.integration || "paypal",
                    enableShippingAddress: this._clientOptions.enableShippingAddress || !1,
                    enableAries: this._isAriesCapable(),
                    amount: this._clientOptions.amount || null,
                    currency: this._clientOptions.currency || null,
                    shippingAddressOverride: this._clientOptions.shippingAddressOverride || null
                }
            }, r.prototype._handleGetClientOptions = function(t) {
                t(this._clientOptionsData())
            }, r.prototype._handleSuccessfulAuthentication = function(t) {
                this._close(), t.type = d.NONCE_TYPE, a.isFunction(this.paymentMethodNonceInputField) ? this.paymentMethodNonceInputField(t.nonce) : (this._showLoggedInContent(t.details.email), this._setNonceInputValue(t.nonce)), a.isFunction(this.onSuccess) && this.onSuccess(t)
            }, r.prototype._lockMerchantWindowSize = function() {
                this._setMerchantPageDefaultStyles(), document.documentElement.style.height = "100%", document.documentElement.style.overflow = "hidden", document.body.style.height = "100%", document.body.style.overflow = "hidden"
            }, r.prototype._unlockMerchantWindowSize = function() {
                this.merchantPageDefaultStyles && (document.documentElement.style.height = this.merchantPageDefaultStyles.html.styles.height, document.documentElement.style.overflow = this.merchantPageDefaultStyles.html.styles.overflow, document.body.style.height = this.merchantPageDefaultStyles.body.styles.height, document.body.style.overflow = this.merchantPageDefaultStyles.body.styles.overflow)
            }, r.prototype._handleCloseMessage = function() {
                this._removeFrame()
            }, r.prototype._showLoggedInContent = function(t) {
                this.loggedOutView.hide(), h.setTextContent(this.loggedInView.emailNode, t), this.loggedInView.show()
            }, r.prototype._handleLogout = function(t) {
                t.preventDefault ? t.preventDefault() : t.returnValue = !1, this.loggedInView.hide(), this.loggedOutView.show(), this._setNonceInputValue(""), a.isFunction(this.onCancelled) && this.onCancelled()
            }, r.prototype._setNonceInputValue = function(t) {
                this.paymentMethodNonceInputField.value = t
            }, e.exports = r
        }, {
            "../shared/constants": 147,
            "../shared/get-locale": 149,
            "../shared/util/browser": 154,
            "../shared/util/dom": 155,
            "../shared/util/util": 156,
            "./logged-in-view": 144,
            "./logged-out-view": 145,
            "./overlay-view": 146,
            "braintree-api": 107,
            "braintree-rpc": 130,
            "braintree-utilities": 142
        }],
        144: [function(t, e) {
            function n(t) {
                this.options = t, this.container = this.createViewContainer(), this.createPayPalName(), this.emailNode = this.createEmailNode(), this.logoutNode = this.createLogoutNode()
            }
            var i = t("../shared/constants");
            n.prototype.createViewContainer = function() {
                var t = document.createElement("div");
                t.id = "braintree-paypal-loggedin";
                var e = ["display: none", "max-width: 500px", "overflow: hidden", "padding: 16px", "background-image: url(" + this.options.assetsUrl + "/pwpp/" + i.VERSION + "/images/paypal-small.png)", "background-image: url(" + this.options.assetsUrl + "/pwpp/" + i.VERSION + "/images/paypal-small.svg), none", "background-position: 20px 50%", "background-repeat: no-repeat", "background-size: 13px 15px", "border-top: 1px solid #d1d4d6", "border-bottom: 1px solid #d1d4d6"].join(";");
                return t.style.cssText = e, this.options.container.appendChild(t), t
            }, n.prototype.createPayPalName = function() {
                var t = document.createElement("span");
                t.id = "bt-pp-name", t.innerHTML = "PayPal";
                var e = ["color: #283036", "font-size: 13px", "font-weight: 800", 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif', "margin-left: 36px", "-webkit-font-smoothing: antialiased", "-moz-font-smoothing: antialiased", "-ms-font-smoothing: antialiased", "font-smoothing: antialiased"].join(";");
                return t.style.cssText = e, this.container.appendChild(t)
            }, n.prototype.createEmailNode = function() {
                var t = document.createElement("span");
                t.id = "bt-pp-email";
                var e = ["color: #6e787f", "font-size: 13px", 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif', "margin-left: 5px", "-webkit-font-smoothing: antialiased", "-moz-font-smoothing: antialiased", "-ms-font-smoothing: antialiased", "font-smoothing: antialiased"].join(";");
                return t.style.cssText = e, this.container.appendChild(t)
            }, n.prototype.createLogoutNode = function() {
                var t = document.createElement("button");
                t.id = "bt-pp-cancel", t.innerHTML = "Cancel";
                var e = ["color: #3d95ce", "font-size: 11px", 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif', "line-height: 20px", "margin: 0 0 0 25px", "padding: 0", "background-color: transparent", "border: 0", "cursor: pointer", "text-decoration: underline", "float: right", "-webkit-font-smoothing: antialiased", "-moz-font-smoothing: antialiased", "-ms-font-smoothing: antialiased", "font-smoothing: antialiased"].join(";");
                return t.style.cssText = e, this.container.appendChild(t)
            }, n.prototype.show = function() {
                this.container.style.display = "block"
            }, n.prototype.hide = function() {
                this.container.style.display = "none"
            }, e.exports = n
        }, {
            "../shared/constants": 147
        }],
        145: [function(t, e) {
            function n(t) {
                this.options = t, this.assetsUrl = this.options.assetsUrl, this.container = this.createViewContainer(), this.options.isCheckout ? this.createCheckoutWithPayPalButton() : this.createPayWithPayPalButton()
            }
            var i = (t("braintree-utilities"), t("../shared/constants")),
                r = t("../shared/get-locale");
            n.prototype.createViewContainer = function() {
                var t = document.createElement("div");
                return t.id = "braintree-paypal-loggedout", this.options.container.appendChild(t), t
            }, n.prototype.createPayWithPayPalButton = function() {
                var t = document.createElement("a");
                t.id = "braintree-paypal-button", t.href = "#";
                var e = ["display: block", "width: 115px", "height: 44px", "overflow: hidden"].join(";");
                t.style.cssText = e;
                var n = new Image;
                n.src = this.assetsUrl + "/pwpp/" + i.VERSION + "/images/pay-with-paypal.png", n.setAttribute("alt", "Pay with PayPal");
                var r = ["max-width: 100%", "display: block", "width: 100%", "height: 100%", "outline: none", "border: 0"].join(";");
                n.style.cssText = r, t.appendChild(n), this.container.appendChild(t)
            }, n.prototype.createCheckoutWithPayPalButton = function() {
                var t = document.createElement("script");
                t.src = "//www.paypalobjects.com/api/button.js", t.async = !0, t.setAttribute("data-merchant", this.options.merchantId), t.setAttribute("data-button", "checkout"), t.setAttribute("data-type", "button"), t.setAttribute("data-width", "150"), t.setAttribute("data-height", "44"), t.setAttribute("data-lc", r(this.options.locale)), this.container.appendChild(t)
            }, n.prototype.show = function() {
                this.container.style.display = "block"
            }, n.prototype.hide = function() {
                this.container.style.display = "none"
            }, e.exports = n
        }, {
            "../shared/constants": 147,
            "../shared/get-locale": 149,
            "braintree-utilities": 142
        }],
        146: [function(t, e) {
            function n(t, e) {
                this.popup = t, this.assetsUrl = e, this.spriteSrc = this.assetsUrl + "/pwpp/" + r.VERSION + "/images/pp_overlay_sprite.png", this._create(), this._setupEvents(), this._pollForPopup()
            }
            var i = t("braintree-utilities"),
                r = t("../shared/constants");
            n.prototype.render = function() {
                document.body.contains(this.el) || document.body.appendChild(this.el)
            }, n.prototype.remove = function() {
                document.body.contains(this.el) && document.body.removeChild(this.el)
            }, n.prototype._create = function() {
                this.el = document.createElement("div"), this.el.className = "bt-overlay", this._setStyles(this.el, ["z-index: 20001", "position: fixed", "top: 0", "left: 0", "height: 100%", "width: 100%", "text-align: center", "background: #000", "background: rgba(0,0,0,0.7)", '-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=52)"']), this.el.appendChild(this._createCloseIcon()), this.el.appendChild(this._createMessage())
            }, n.prototype._createCloseIcon = function() {
                return this.closeIcon = document.createElement("div"), this.closeIcon.className = "bt-close-overlay", this._setStyles(this.closeIcon, ["position: absolute", "top: 10px", "right: 10px", "cursor: pointer", "background: url(" + this.spriteSrc + ") no-repeat 0 -67px", "height: 14px", "width: 14px"]), this.closeIcon
            }, n.prototype._createMessage = function() {
                var t = document.createElement("div");
                return this._setStyles(t, ["position: relative", "top: 50%", "max-width: 350px", 'font-family: "HelveticaNeue", "HelveticaNeue-Light", "Helvetica Neue Light", helvetica, arial, sans-serif', "font-size: 14px", "line-height: 20px", "margin: -70px auto 0"]), t.appendChild(this._createLogo()), t.appendChild(this._createExplanation()), t.appendChild(this._createFocusLink()), t
            }, n.prototype._createExplanation = function() {
                var t = document.createElement("div");
                return this._setStyles(t, ["color: #FFF", "margin-bottom: 20px"]), t.innerHTML = "Don't see the secure PayPal browser? We'll help you re-launch the window to complete your purchase.", t
            }, n.prototype._createLogo = function() {
                var t = document.createElement("div");
                return this._setStyles(t, ["background: url(" + this.spriteSrc + ") no-repeat 0 0", "width: 94px", "height: 25px", "margin: 0 auto 26px auto"]), t
            }, n.prototype._createFocusLink = function() {
                return this.focusLink = document.createElement("a"), this._setStyles(this.focusLink, ["color: #009be1", "cursor: pointer"]), this.focusLink.innerHTML = "Continue", this.focusLink
            }, n.prototype._setStyles = function(t, e) {
                var n = e.join(";");
                t.style.cssText = n
            }, n.prototype._setupEvents = function() {
                i.addEventListener(this.closeIcon, "click", i.bind(this._handleClose, this)), i.addEventListener(this.focusLink, "click", i.bind(this._handleFocus, this))
            }, n.prototype._handleClose = function(t) {
                t.preventDefault(), this.remove(), this.popup.close()
            }, n.prototype._handleFocus = function(t) {
                t.preventDefault(), this.popup.focus()
            }, n.prototype._pollForPopup = function() {
                var t = setInterval(i.bind(function() {
                    this.popup && this.popup.closed && (clearInterval(t), this.remove())
                }, this), 100)
            }, e.exports = n
        }, {
            "../shared/constants": 147,
            "braintree-utilities": 142
        }],
        147: [function(t, e, n) {
            var i = "1.3.5";
            n.VERSION = i, n.POPUP_NAME = "braintree_paypal_popup", n.ARIES_POPUP_NAME = "PPFrameRedirect", n.FRAME_NAME = "braintree-paypal-frame", n.ARIES_FRAME_NAME = "PPFrameRedirect", n.POPUP_PATH = "/pwpp/" + i + "/html/braintree-frame.html", n.POPUP_OPTIONS = "resizable,scrollbars", n.POPUP_HEIGHT = 470, n.POPUP_WIDTH = 410, n.ARIES_POPUP_HEIGHT = 535, n.ARIES_POPUP_WIDTH = 450, n.BRIDGE_FRAME_NAME = "bt-proxy-frame", n.ARIES_SUPPORTED_CURRENCIES = ["USD", "GBP", "EUR", "AUD", "CAD"], n.ARIES_SUPPORTED_COUNTRIES = ["US", "GB", "AU", "CA", "ES", "FR", "DE", "IT"], n.NONCE_TYPE = "PayPalAccount", n.ILLEGAL_XHR_ERROR = "Illegal XHR request attempted"
        }, {}],
        148: [function(t, e) {
            "use strict";
            e.exports = {
                us: "en_us",
                gb: "en_uk",
                uk: "en_uk",
                de: "de_de",
                fr: "fr_fr",
                it: "it_it",
                es: "es_es",
                ca: "en_ca",
                au: "en_au",
                at: "de_de",
                be: "en_us",
                ch: "de_de",
                dk: "da_dk",
                nl: "nl_nl",
                no: "no_no",
                pl: "pl_pl",
                se: "sv_se",
                tr: "tr_tr",
                bg: "en_us",
                cy: "en_us",
                hr: "en_us",
                is: "en_us",
                kh: "en_us",
                mt: "en_us",
                my: "en_us",
                ru: "ru_ru"
            }
        }, {}],
        149: [function(t, e) {
            "use strict";

            function n(t) {
                return -1 !== t.indexOf("_") && 5 === t.length
            }

            function i(t) {
                var e;
                for (var n in o) o.hasOwnProperty(n) && (n === t ? e = o[n] : o[n] === t && (e = o[n]));
                return e
            }

            function r(t) {
                var e;
                if (t = t ? t.toLowerCase() : "us", t = t.replace(/-/g, "_"), e = n(t) ? t : i(t)) {
                    var r = e.split("_");
                    return [r[0], r[1].toUpperCase()].join("_")
                }
                return "en_US"
            }
            var o = t("../shared/data/country-code-lookup");
            e.exports = r
        }, {
            "../shared/data/country-code-lookup": 148
        }],
        150: [function(t, e) {
            function n() {
                return c.matchUserAgent("Android") && !i()
            }

            function i() {
                return c.matchUserAgent("Chrome") || c.matchUserAgent("CriOS")
            }

            function r() {
                return c.matchUserAgent("Firefox")
            }

            function o() {
                return c.matchUserAgent("Trident") || c.matchUserAgent("MSIE")
            }

            function s() {
                return c.matchUserAgent("Opera") || c.matchUserAgent("OPR")
            }

            function a() {
                return s() && "[object OperaMini]" === l.call(window.operamini)
            }

            function u() {
                return c.matchUserAgent("Safari") && !i() && !n()
            }
            var c = t("./useragent"),
                l = Object.prototype.toString;
            e.exports = {
                isAndroid: n,
                isChrome: i,
                isFirefox: r,
                isIE: o,
                isOpera: s,
                isOperaMini: a,
                isSafari: u
            }
        }, {
            "./useragent": 153
        }],
        151: [function(t, e) {
            function n() {
                return !i() && (s.isAndroid() || s.isIpod() || s.isIphone() || o.matchUserAgent("IEMobile"))
            }

            function i() {
                return s.isIpad() || s.isAndroid() && !o.matchUserAgent("Mobile")
            }

            function r() {
                return !n() && !i()
            }
            var o = t("./useragent"),
                s = t("./platform");
            e.exports = {
                isMobile: n,
                isTablet: i,
                isDesktop: r
            }
        }, {
            "./platform": 152,
            "./useragent": 153
        }],
        152: [function(t, e) {
            function n() {
                return a.matchUserAgent("Android")
            }

            function i() {
                return a.matchUserAgent("iPad")
            }

            function r() {
                return a.matchUserAgent("iPod")
            }

            function o() {
                return a.matchUserAgent("iPhone") && !r()
            }

            function s() {
                return i() || r() || o()
            }
            var a = t("./useragent");
            e.exports = {
                isAndroid: n,
                isIpad: i,
                isIpod: r,
                isIphone: o,
                isIos: s
            }
        }, {
            "./useragent": 153
        }],
        153: [function(t, e, n) {
            function i() {
                return o
            }

            function r(t) {
                var e = n.getNativeUserAgent(),
                    i = e.match(t);
                return i ? !0 : !1
            }
            var o = window.navigator.userAgent;
            n.getNativeUserAgent = i, n.matchUserAgent = r
        }, {}],
        154: [function(t, e) {
            function n() {
                return i() && window.outerWidth < 600
            }

            function i() {
                return f.test(d)
            }

            function r() {
                return !!window.postMessage
            }

            function o() {
                if (c.isOperaMini()) return !1;
                if (l.isDesktop()) return !0;
                if (l.isMobile() || l.isTablet()) {
                    if (c.isIE()) return !1;
                    if (p.isAndroid()) return !0;
                    if (p.isIos()) return c.isSafari() && h.matchUserAgent(/OS (?:8_1|8_0|8)(?!_\d)/i) || c.isChrome() ? !1 : !0
                }
                return !1
            }

            function s() {
                if (c.isIE() && h.matchUserAgent(/MSIE 8\.0/)) return !1;
                try {
                    return window.self === window.top
                } catch (t) {
                    return !1
                }
            }

            function a() {
                return c.isIE() && !u()
            }

            function u() {
                var t = null,
                    e = "";
                try {
                    new ActiveXObject("")
                } catch (n) {
                    e = n.name
                }
                try {
                    t = !!new ActiveXObject("htmlfile")
                } catch (n) {
                    t = !1
                }
                return t = "ReferenceError" !== e && t === !1 ? !1 : !0, !t
            }
            var c = t("../useragent/browser"),
                l = t("../useragent/device"),
                p = t("../useragent/platform"),
                h = t("../useragent/useragent"),
                d = window.navigator.userAgent,
                f = /[Mm]obi|tablet|iOS|Android|IEMobile|Windows\sPhone/;
            e.exports = {
                isMobile: n,
                isMobileDevice: i,
                detectedPostMessage: r,
                isPopupSupported: o,
                isOverlaySupported: s,
                isProxyFrameRequired: a
            }
        }, {
            "../useragent/browser": 150,
            "../useragent/device": 151,
            "../useragent/platform": 152,
            "../useragent/useragent": 153
        }],
        155: [function(t, e) {
            function n(t, e) {
                var n = "innerText";
                document && document.body && "textContent" in document.body && (n = "textContent"), t[n] = e
            }
            e.exports = {
                setTextContent: n
            }
        }, {}],
        156: [function(t, e) {
            function n() {
                for (var t = "", e = 0; 32 > e; e++) {
                    var n = Math.floor(16 * Math.random());
                    t += n.toString(16)
                }
                return t
            }

            function i(t) {
                return /^(true|1)$/i.test(t)
            }

            function r(t) {
                return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&apos;")
            }

            function o(t) {
                var e = t.indexOf("?"),
                    n = {};
                if (e >= 0 && (t = t.substr(e + 1)), 0 !== t.length) {
                    for (var i = t.split("&"), r = 0, o = i.length; o > r; r++) {
                        var s = i[r],
                            a = s.indexOf("="),
                            u = s.substr(0, a),
                            c = s.substr(a + 1),
                            l = decodeURIComponent(c);
                        l = l.replace(/</g, "&lt;").replace(/>/g, "&gt;"), "false" === l && (l = !1), (void 0 === l || "true" === l) && (l = !0), n[u] = l
                    }
                    return n
                }
            }

            function s(t) {
                return t && "[object Function]" === Object.prototype.toString.call(t)
            }
            var a = "function" == typeof String.prototype.trim ? function(t) {
                    return t.trim()
                } : function(t) {
                    return t.replace(/^\s+|\s+$/, "")
                },
                u = "function" == typeof window.btoa ? function(t) {
                    return window.btoa(t)
                } : function(t) {
                    for (var e, n, i, r, o, s, a, u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", c = "", l = 0; l < t.length;) e = t.charCodeAt(l++), n = t.charCodeAt(l++), i = t.charCodeAt(l++), r = e >> 2, o = (3 & e) << 4 | n >> 4, s = (15 & n) << 2 | i >> 6, a = 63 & i, isNaN(n) ? s = a = 64 : isNaN(i) && (a = 64), c = c + u.charAt(r) + u.charAt(o) + u.charAt(s) + u.charAt(a);
                    return c
                };
            e.exports = {
                trim: a,
                btoa: u,
                generateUid: n,
                castToBoolean: i,
                htmlEscape: r,
                parseUrlParams: o,
                isFunction: s
            }
        }, {}],
        157: [function(t, e, n) {
            arguments[4][125][0].apply(n, arguments)
        }, {
            "braintree-utilities": 167,
            dup: 125
        }],
        158: [function(t, e, n) {
            arguments[4][126][0].apply(n, arguments)
        }, {
            "braintree-utilities": 167,
            dup: 126
        }],
        159: [function(t, e, n) {
            arguments[4][127][0].apply(n, arguments)
        }, {
            dup: 127
        }],
        160: [function(t, e, n) {
            arguments[4][128][0].apply(n, arguments)
        }, {
            "braintree-utilities": 167,
            dup: 128
        }],
        161: [function(t, e, n) {
            arguments[4][129][0].apply(n, arguments)
        }, {
            "braintree-utilities": 167,
            dup: 129
        }],
        162: [function(t, e, n) {
            arguments[4][130][0].apply(n, arguments)
        }, {
            "./lib/message-bus": 157,
            "./lib/pubsub-client": 158,
            "./lib/pubsub-server": 159,
            "./lib/rpc-client": 160,
            "./lib/rpc-server": 161,
            dup: 130
        }],
        163: [function(t, e, n) {
            arguments[4][131][0].apply(n, arguments)
        }, {
            dup: 131
        }],
        164: [function(t, e, n) {
            arguments[4][132][0].apply(n, arguments)
        }, {
            dup: 132
        }],
        165: [function(t, e, n) {
            arguments[4][133][0].apply(n, arguments)
        }, {
            dup: 133
        }],
        166: [function(t, e, n) {
            arguments[4][20][0].apply(n, arguments)
        }, {
            dup: 20
        }],
        167: [function(t, e, n) {
            arguments[4][21][0].apply(n, arguments)
        }, {
            "./lib/dom": 163,
            "./lib/events": 164,
            "./lib/fn": 165,
            "./lib/url": 166,
            dup: 21
        }],
        168: [function(t, e, n) {
            arguments[4][27][0].apply(n, arguments)
        }, {
            dup: 27
        }],
        169: [function(t, e, n) {
            arguments[4][17][0].apply(n, arguments)
        }, {
            dup: 17
        }],
        170: [function(t, e, n) {
            arguments[4][18][0].apply(n, arguments)
        }, {
            dup: 18
        }],
        171: [function(t, e, n) {
            arguments[4][19][0].apply(n, arguments)
        }, {
            dup: 19
        }],
        172: [function(t, e, n) {
            arguments[4][31][0].apply(n, arguments)
        }, {
            dup: 31
        }],
        173: [function(t, e, n) {
            arguments[4][32][0].apply(n, arguments)
        }, {
            "./array": 168,
            dup: 32
        }],
        174: [function(t, e, n) {
            arguments[4][33][0].apply(n, arguments)
        }, {
            "./lib/array": 168,
            "./lib/dom": 169,
            "./lib/events": 170,
            "./lib/fn": 171,
            "./lib/string": 172,
            "./lib/url": 173,
            dup: 33
        }],
        175: [function(t, e) {
            "use strict";

            function n(t) {
                this.apiClient = t
            }
            var i = ["getCreditCards", "unlockCreditCard", "sendAnalyticsEvents"];
            n.prototype.attach = function(t) {
                function e(e) {
                    t.define(e, function() {
                        n.apiClient[e].apply(n.apiClient, arguments)
                    })
                }
                var n = this,
                    r = 0,
                    o = i.length;
                for (r; o > r; r++) e(i[r])
            }, e.exports = n
        }, {}],
        176: [function(t, e) {
            "use strict";

            function n(t, e) {
                var n = window.getComputedStyle ? getComputedStyle(t) : t.currentStyle;
                return n[e]
            }

            function i() {
                return {
                    html: {
                        height: s.style.height || "",
                        overflow: n(s, "overflow"),
                        position: n(s, "position")
                    },
                    body: {
                        height: a.style.height || "",
                        overflow: n(a, "overflow")
                    }
                }
            }

            function r() {
                var t = /Android|iPhone|iPod|iPad/i.test(window.navigator.userAgent);
                return t
            }

            function o(t) {
                var e, n, i;
                this.encodedClientToken = t.clientToken, this.paypalOptions = t.paypal, this.container = null, this.merchantFormManager = null, this.root = t.root, this.configurationRequests = [], this.braintreeApiClient = u.configure({
                    clientToken: t.clientToken,
                    integration: "dropin"
                }), this.paymentMethodNonceReceivedCallback = t.paymentMethodNonceReceived, this.clientToken = u.parseClientToken(t.clientToken), this.bus = new l.MessageBus(this.root), this.rpcServer = new l.RPCServer(this.bus), this.apiProxyServer = new h(this.braintreeApiClient), this.apiProxyServer.attach(this.rpcServer), e = t.inlineFramePath || this.clientToken.assetsUrl + "/dropin/" + b + "/inline-frame.html", n = t.modalFramePath || this.clientToken.assetsUrl + "/dropin/" + b + "/modal-frame.html", s = document.documentElement, a = document.body, this.frames = {
                    inline: this._createFrame(e, y.INLINE_FRAME_NAME),
                    modal: this._createFrame(n, y.MODAL_FRAME_NAME)
                }, this.container = p.normalizeElement(t.container, "Unable to find valid container."), i = p.normalizeElement(t.form || this._findClosest(this.container, "form")), this.merchantFormManager = new d({
                    form: i,
                    frames: this.frames,
                    onSubmit: this.paymentMethodNonceReceivedCallback,
                    apiClient: this.braintreeApiClient
                }).initialize(), this.clientToken.paypalEnabled && this.clientToken.paypal && (p.isBrowserHttps() || this.clientToken.paypal.allowHttp) && this._configurePayPal(), this.braintreeApiClient.sendAnalyticsEvents("dropin.web.initialized")
            }
            var s, a, u = t("braintree-api"),
                c = t("braintree-bus"),
                l = t("braintree-rpc"),
                p = t("braintree-utilities"),
                h = t("./api-proxy-server"),
                d = t("./merchant-form-manager"),
                f = t("./frame-container"),
                m = t("../shared/paypal-service"),
                y = t("../shared/constants"),
                g = t("braintree-paypal/src/shared/util/browser"),
                b = "1.3.12";
            o.prototype.initialize = function() {
                var t, e = this;
                this._initializeModal(), c.emit(c.events.ASYNC_DEPENDENCY_INITIALIZING), this.container.appendChild(this.frames.inline.element), a.appendChild(this.frames.modal.element), this.rpcServer.define("receiveSharedCustomerIdentifier", function(n) {
                    for (e.braintreeApiClient.attrs.sharedCustomerIdentifier = n, e.braintreeApiClient.attrs.sharedCustomerIdentifierType = "browser_session_cookie_store", t = 0; t < e.configurationRequests.length; t++) e.configurationRequests[t](e.encodedClientToken);
                    e.configurationRequests = []
                }), c.on(c.events.PAYMENT_METHOD_GENERATED, p.bind(this._handleAltPayData, this)), this.rpcServer.define("getConfiguration", function(t) {
                    t({
                        clientToken: e.encodedClientToken,
                        merchantHttps: p.isBrowserHttps()
                    })
                }), this.rpcServer.define("getPayPalOptions", function(t) {
                    t(e.paypalOptions)
                }), this.rpcServer.define("selectPaymentMethod", function(t) {
                    e.frames.modal.rpcClient.invoke("selectPaymentMethod", [t]), e._showModal()
                }), this.rpcServer.define("sendAddedPaymentMethod", function(t) {
                    e.merchantFormManager.setNoncePayload(t), e.frames.inline.rpcClient.invoke("receiveNewPaymentMethod", [t])
                }), this.rpcServer.define("sendUsedPaymentMethod", function(t) {
                    e.frames.inline.rpcClient.invoke("selectPaymentMethod", [t])
                }), this.rpcServer.define("sendUnlockedNonce", function(t) {
                    e.merchantFormManager.setNoncePayload(t)
                }), this.rpcServer.define("clearNonce", function() {
                    e.merchantFormManager.clearNoncePayload()
                }), this.rpcServer.define("closeDropInModal", function() {
                    e._hideModal()
                }), this.rpcServer.define("setInlineFrameHeight", function(t) {
                    e.frames.inline.element.style.height = t + "px"
                }), this.bus.register("ready", function(t) {
                    t.source === e.frames.inline.element.contentWindow ? e.frames.inline.rpcClient = new l.RPCClient(e.bus, t.source) : t.source === e.frames.modal.element.contentWindow && (e.frames.modal.rpcClient = new l.RPCClient(e.bus, t.source))
                })
            }, o.prototype._createFrame = function(t, e) {
                return new f(t, e)
            }, o.prototype._initializeModal = function() {
                this.frames.modal.element.style.display = "none", this.frames.modal.element.style.position = r() ? "absolute" : "fixed", this.frames.modal.element.style.top = "0", this.frames.modal.element.style.left = "0", this.frames.modal.element.style.height = "100%", this.frames.modal.element.style.width = "100%"
            }, o.prototype._lockMerchantWindowSize = function() {
                setTimeout(function() {
                    s.style.overflow = "hidden", a.style.overflow = "hidden", a.style.height = "100%", r() && (s.style.position = "relative", s.style.height = window.innerHeight + "px")
                }, 160)
            }, o.prototype._unlockMerchantWindowSize = function() {
                var t = this.merchantPageDefaultStyles;
                a.style.height = t.body.height, a.style.overflow = t.body.overflow, s.style.overflow = t.html.overflow, r() && (s.style.height = t.html.height, s.style.position = t.html.position)
            }, o.prototype._showModal = function() {
                var t = this,
                    e = this.frames.modal.element;
                this.merchantPageDefaultStyles = i(), e.style.display = "block", this.frames.modal.rpcClient.invoke("open", [], function() {
                    setTimeout(function() {
                        t._lockMerchantWindowSize(), e.contentWindow.focus()
                    }, 200)
                })
            }, o.prototype._hideModal = function() {
                this._unlockMerchantWindowSize(), this.frames.modal.element.style.display = "none"
            }, o.prototype._configurePayPal = function() {
                g.isPopupSupported() || (this.ppClient = new m({
                    clientToken: this.clientToken,
                    paypal: this.paypalOptions
                }), this.rpcServer.define("openPayPalModal", p.bind(this.ppClient._openModal, this.ppClient))), this.rpcServer.define("receivePayPalData", p.bind(this._handleAltPayData, this))
            }, o.prototype._handleAltPayData = function(t) {
                this.merchantFormManager.setNoncePayload(t), this.frames.inline.rpcClient.invoke("receiveNewPaymentMethod", [t]), this.frames.modal.rpcClient.invoke("modalViewClose")
            }, o.prototype._findClosest = function(t, e) {
                e = e.toUpperCase();
                do
                    if (t.nodeName === e) return t;
                while (t = t.parentNode);
                throw "Unable to find a valid " + e
            }, e.exports = o
        }, {
            "../shared/constants": 180,
            "../shared/paypal-service": 181,
            "./api-proxy-server": 175,
            "./frame-container": 178,
            "./merchant-form-manager": 179,
            "braintree-api": 72,
            "braintree-bus": 90,
            "braintree-paypal/src/shared/util/browser": 154,
            "braintree-rpc": 162,
            "braintree-utilities": 174
        }],
        177: [function(t, e) {
            "use strict";

            function n(t, e) {
                var n;
                return e.clientToken = t, n = new i(e), n.initialize(), n
            }
            var i = t("./client"),
                r = "1.3.12";
            e.exports = {
                create: n,
                VERSION: r
            }
        }, {
            "./client": 176
        }],
        178: [function(t, e) {
            "use strict";

            function n() {
                var t, e = document.createElement("fakeelement");
                for (t in a)
                    if ("undefined" != typeof e.style[t]) return a[t];
                return null
            }

            function i(t) {
                function e(n) {
                    n.target === t && "height" === n.propertyName && (o.emit(o.events.ASYNC_DEPENDENCY_READY), t.removeEventListener(i, e))
                }
                var i = n();
                i ? t.addEventListener(i, e) : setTimeout(function() {
                    o.emit(o.events.ASYNC_DEPENDENCY_READY)
                }, 500)
            }

            function r(t, e) {
                this.element = document.createElement("iframe"), this.element.setAttribute("name", e), this.element.setAttribute("allowtransparency", "true"), this.element.setAttribute("width", "100%"), this.element.setAttribute("height", "68"), this.element.setAttribute("style", "-webkit-transition: height 210ms cubic-bezier(0.390, 0.575, 0.565, 1.000); -moz-transition: height 210ms cubic-bezier(0.390, 0.575, 0.565, 1.000); -ms-transition: height 210ms cubic-bezier(0.390, 0.575, 0.565, 1.000); -o-transition: height 210ms cubic-bezier(0.390, 0.575, 0.565, 1.000); transition: height 210ms cubic-bezier(0.390, 0.575, 0.565, 1.000);"), this.element.src = t, this.element.setAttribute("frameborder", "0"), this.element.setAttribute("allowtransparency", "true"), this.element.style.border = "0", this.element.style.zIndex = "9999", e === s.INLINE_FRAME_NAME && i(this.element)
            }
            var o = t("braintree-bus"),
                s = t("../shared/constants"),
                a = {
                    transition: "transitionend",
                    "-o-transition": "otransitionEnd",
                    "-moz-transition": "transitionend",
                    "-webkit-transition": "webkitTransitionEnd"
                };
            e.exports = r
        }, {
            "../shared/constants": 180,
            "braintree-bus": 90
        }],
        179: [function(t, e) {
            "use strict";

            function n(t) {
                this.form = t.form, this.frames = t.frames, this.onSubmit = t.onSubmit, this.apiClient = t.apiClient
            }
            var i = t("braintree-utilities");
            n.prototype.initialize = function() {
                return this._isSubmitBased() && this._setElements(), this._setEvents(), this
            }, n.prototype.setNoncePayload = function(t) {
                this.noncePayload = t
            }, n.prototype.clearNoncePayload = function() {
                this.noncePayload = null
            }, n.prototype._isSubmitBased = function() {
                return !this.onSubmit
            }, n.prototype._isCallbackBased = function() {
                return !!this.onSubmit
            }, n.prototype._setElements = function() {
                var t;
                this.form.payment_method_nonce || (t = document.createElement("input"), t.type = "hidden", t.name = "payment_method_nonce", this.form.appendChild(t)), this.nonceField = this.form.payment_method_nonce
            }, n.prototype._setEvents = function() {
                var t = this;
                i.addEventListener(this.form, "submit", function() {
                    t._handleFormSubmit.apply(t, arguments)
                })
            }, n.prototype._handleFormSubmit = function(t) {
                this._shouldSubmit() || (t && t.preventDefault ? t.preventDefault() : t.returnValue = !1, this.noncePayload && this.noncePayload.nonce ? this._handleNonceReply(t) : this.frames.inline.rpcClient.invoke("requestNonce", [], i.bind(function(e) {
                    this.setNoncePayload(e), this._handleNonceReply(t)
                }, this)))
            }, n.prototype._shouldSubmit = function() {
                return this._isCallbackBased() ? !1 : this.nonceField.value.length > 0
            }, n.prototype._handleNonceReply = function(t) {
                this._isCallbackBased() ? this.apiClient.sendAnalyticsEvents("dropin.web.end.callback", i.bind(function() {
                    var e = this.noncePayload;
                    e.originalEvent = t, this.onSubmit(e), setTimeout(i.bind(function() {
                        this.frames.inline.rpcClient.invoke("clearLoadingState")
                    }, this), 200)
                }, this)) : this._triggerFormSubmission()
            }, n.prototype._triggerFormSubmission = function() {
                this.nonceField.value = this.noncePayload.nonce, this.apiClient.sendAnalyticsEvents("dropin.web.end.auto-submit", i.bind(function() {
                    "function" == typeof this.form.submit ? this.form.submit() : this.form.querySelector('[type="submit"]').click()
                }, this))
            }, e.exports = n
        }, {
            "braintree-utilities": 174
        }],
        180: [function(t, e) {
            "use strict";
            e.exports = {
                PAYPAL_INTEGRATION_NAME: "PayPal",
                INLINE_FRAME_NAME: "braintree-dropin-frame",
                MODAL_FRAME_NAME: "braintree-dropin-modal-frame",
                PAYMENT_METHOD_TYPES: ["CoinbaseAccount", "PayPalAccount", "CreditCard"]
            }
        }, {}],
        181: [function(t, e) {
            "use strict";

            function n(t) {
                var e = t.clientToken,
                    n = t.paypal || {},
                    r = new i(e, {
                        container: document.createElement("div"),
                        displayName: n.displayName,
                        locale: n.locale,
                        singleUse: n.singleUse,
                        amount: n.amount,
                        currency: n.currency,
                        onSuccess: n.onSuccess,
                        enableShippingAddress: n.enableShippingAddress,
                        shippingAddressOverride: n.shippingAddressOverride
                    });
                return r.initialize(), r
            }
            var i = t("braintree-paypal/src/external/client");
            e.exports = n
        }, {
            "braintree-paypal/src/external/client": 143
        }],
        182: [function(t, e) {
            (function(t) {
                "use strict";

                function n(t, e) {
                    e = e || {};
                    var r, s, a = t.children;
                    for (s = 0; s < a.length; s++)
                        if (r = a[s], o(r)) {
                            var u = r.getAttribute("data-braintree-name");
                            "postal_code" === u ? e.billingAddress = {
                                postalCode: r.value
                            } : e[u] = r.value, i(r)
                        } else r.children && r.children.length > 0 && n(r, e);
                    return e
                }

                function i(t) {
                    try {
                        t.attributes.removeNamedItem("name")
                    } catch (e) {}
                }

                function r(t) {
                    n(t)
                }

                function o(t) {
                    return t.nodeType === s && t.attributes["data-braintree-name"]
                }
                var s = t.Node ? t.Node.ELEMENT_NODE : 1;
                e.exports = {
                    extractValues: n,
                    scrubAllAttributes: r,
                    scrubAttributes: i,
                    isBraintreeNode: o
                }
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        183: [function(t, e) {
            "use strict";

            function n(t, e, n, i) {
                this.client = t, this.htmlForm = e, this.isCreditCardForm = i === !1 ? !1 : !0, this.paymentMethodNonceInput = n, this.model = new s, this.setEvents()
            }
            var i = t("braintree-utilities"),
                r = t("./fields"),
                o = t("braintree-bus"),
                s = t("./models/payment-method-model"),
                a = {
                    message: "Unable to process payments at this time",
                    type: "IMMEDIATE"
                };
            n.prototype.setEvents = function() {
                this.onSubmitHandler = i.bind(this.handleSubmit, this), this.onExternalNonceReceived = i.bind(this.onExternalNonceReceived, this), this.clearExternalNonce = i.bind(this.clearExternalNonce, this), i.addEventListener(this.htmlForm, "submit", this.onSubmitHandler), o.on(o.events.PAYMENT_METHOD_GENERATED, this.onExternalNonceReceived), o.on(o.events.PAYMENT_METHOD_CANCELLED, this.clearExternalNonce)
            }, n.prototype.handleSubmit = function(t) {
                var e;
                return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this.isCreditCardForm ? (e = this.model.get("type"), e && "CreditCard" !== e ? (r.scrubAllAttributes(this.htmlForm), void this.onNonceReceived(null, this.model.attributes)) : void this.client.tokenizeCard(r.extractValues(this.htmlForm), i.bind(function(t, e, n) {
                    t ? this.onNonceReceived(a, null) : (this.model.set({
                        nonce: e,
                        type: n.type,
                        details: n.details
                    }), this.onNonceReceived(null, this.model.attributes))
                }, this))) : void this.onNonceReceived(null, this.model.attributes)
            }, n.prototype.writeNonceToDOM = function() {
                this.paymentMethodNonceInput.value = this.model.get("nonce")
            }, n.prototype.onExternalNonceReceived = function(t) {
                this.model.set(t), this.writeNonceToDOM()
            }, n.prototype.clearExternalNonce = function() {
                this.model.reset()
            }, n.prototype.onNonceReceived = function(t) {
                var e = this.htmlForm;
                return t ? void o.emit(o.events.ERROR, a) : (i.removeEventListener(e, "submit", this.onSubmitHandler), this.writeNonceToDOM(), void(e.submit && ("function" == typeof e.submit || e.submit.call) ? e.submit() : setTimeout(function() {
                    e.querySelector('[type="submit"]').click()
                }, 1)))
            }, e.exports = n
        }, {
            "./fields": 182,
            "./models/payment-method-model": 185,
            "braintree-bus": 188,
            "braintree-utilities": 195
        }],
        184: [function(t, e) {
            "use strict";
            e.exports = function(t) {
                var e;
                if ("object" == typeof t) return t;
                e = "payment_method_nonce", "string" == typeof t && (e = t);
                var n = document.createElement("input");
                return n.name = e, n.type = "hidden", n
            }
        }, {}],
        185: [function(t, e) {
            "use strict";

            function n() {
                this.reset()
            }
            n.prototype.get = function(t) {
                return this.attributes[t]
            }, n.prototype.set = function(t) {
                this.attributes = t || {}
            }, n.prototype.reset = function() {
                this.attributes = {}
            }, e.exports = n
        }, {}],
        186: [function(t, e) {
            "use strict";
            e.exports = function(t) {
                for (var e = t.getElementsByTagName("*"), n = {}, i = 0; i < e.length; i++) {
                    var r = e[i].getAttribute("data-braintree-name");
                    n[r] = !0
                }
                if (!n.number) throw new Error('Unable to find an input with data-braintree-name="number" in your form. Please add one.');
                if (n.expiration_date) {
                    if (n.expiration_month || n.expiration_year) throw new Error('You have inputs with data-braintree-name="expiration_date" AND data-braintree-name="expiration_(year|month)". Please use either "expiration_date" or "expiration_year" and "expiration_month".')
                } else {
                    if (!n.expiration_month && !n.expiration_year) throw new Error('Unable to find an input with data-braintree-name="expiration_date" in your form. Please add one.');
                    if (!n.expiration_month) throw new Error('Unable to find an input with data-braintree-name="expiration_month" in your form. Please add one.');
                    if (!n.expiration_year) throw new Error('Unable to find an input with data-braintree-name="expiration_year" in your form. Please add one.')
                }
            }
        }, {}],
        187: [function(t, e) {
            "use strict";

            function n(t, e) {
                var n, s, a = document.getElementById(e.id),
                    u = e && e.hasOwnProperty("useCreditCard") ? e.useCreditCard : !0;
                if (!a) throw new Error('Unable to find form with id: "' + e.id + '"');
                return u && r(a), n = o(e.paymentMethodNonceInputField), a.appendChild(n), s = new i(t, a, n, u)
            }
            var i = t("./lib/form"),
                r = t("./lib/validate-annotations"),
                o = t("./lib/get-nonce-input");
            e.exports = {
                setup: n
            }
        }, {
            "./lib/form": 183,
            "./lib/get-nonce-input": 184,
            "./lib/validate-annotations": 186
        }],
        188: [function(t, e, n) {
            arguments[4][34][0].apply(n, arguments)
        }, {
            "./lib/events": 189,
            dup: 34,
            framebus: 190
        }],
        189: [function(t, e, n) {
            arguments[4][35][0].apply(n, arguments)
        }, {
            dup: 35
        }],
        190: [function(t, e, n) {
            arguments[4][36][0].apply(n, arguments)
        }, {
            dup: 36
        }],
        191: [function(t, e, n) {
            arguments[4][17][0].apply(n, arguments)
        }, {
            dup: 17
        }],
        192: [function(t, e, n) {
            arguments[4][18][0].apply(n, arguments)
        }, {
            dup: 18
        }],
        193: [function(t, e, n) {
            arguments[4][19][0].apply(n, arguments)
        }, {
            dup: 19
        }],
        194: [function(t, e, n) {
            arguments[4][20][0].apply(n, arguments)
        }, {
            dup: 20
        }],
        195: [function(t, e, n) {
            arguments[4][21][0].apply(n, arguments)
        }, {
            "./lib/dom": 191,
            "./lib/events": 192,
            "./lib/fn": 193,
            "./lib/url": 194,
            dup: 21
        }],
        196: [function(t, e, n) {
            arguments[4][2][0].apply(n, arguments)
        }, {
            "./coinbase-account": 197,
            "./credit-card": 198,
            "./europe-bank-account": 199,
            "./normalize-api-fields": 203,
            "./parse-client-token": 204,
            "./paypal-account": 205,
            "./request-driver": 207,
            "./sepa-mandate": 208,
            "./util": 209,
            "braintree-3ds": 218,
            "braintree-utilities": 227,
            dup: 2
        }],
        197: [function(t, e, n) {
            arguments[4][3][0].apply(n, arguments)
        }, {
            dup: 3
        }],
        198: [function(t, e, n) {
            arguments[4][4][0].apply(n, arguments)
        }, {
            dup: 4
        }],
        199: [function(t, e, n) {
            arguments[4][5][0].apply(n, arguments)
        }, {
            dup: 5
        }],
        200: [function(t, e, n) {
            arguments[4][6][0].apply(n, arguments)
        }, {
            "./parse-client-token": 204,
            "./request-driver": 207,
            "./util": 209,
            dup: 6
        }],
        201: [function(t, e, n) {
            arguments[4][7][0].apply(n, arguments)
        }, {
            "./jsonp": 202,
            dup: 7
        }],
        202: [function(t, e, n) {
            arguments[4][8][0].apply(n, arguments)
        }, {
            "./util": 209,
            dup: 8
        }],
        203: [function(t, e, n) {
            arguments[4][9][0].apply(n, arguments)
        }, {
            dup: 9
        }],
        204: [function(t, e, n) {
            arguments[4][10][0].apply(n, arguments)
        }, {
            "./polyfill": 206,
            "braintree-utilities": 227,
            dup: 10
        }],
        205: [function(t, e, n) {
            arguments[4][11][0].apply(n, arguments)
        }, {
            dup: 11
        }],
        206: [function(t, e, n) {
            arguments[4][12][0].apply(n, arguments)
        }, {
            dup: 12
        }],
        207: [function(t, e, n) {
            arguments[4][13][0].apply(n, arguments)
        }, {
            "./jsonp-driver": 201,
            dup: 13
        }],
        208: [function(t, e, n) {
            arguments[4][14][0].apply(n, arguments)
        }, {
            dup: 14
        }],
        209: [function(t, e, n) {
            arguments[4][15][0].apply(n, arguments)
        }, {
            dup: 15
        }],
        210: [function(t, e, n) {
            arguments[4][16][0].apply(n, arguments)
        }, {
            "./lib/client": 196,
            "./lib/get-configuration": 200,
            "./lib/jsonp": 202,
            "./lib/jsonp-driver": 201,
            "./lib/parse-client-token": 204,
            "./lib/util": 209,
            dup: 16
        }],
        211: [function(t, e, n) {
            arguments[4][17][0].apply(n, arguments)
        }, {
            dup: 17
        }],
        212: [function(t, e, n) {
            arguments[4][18][0].apply(n, arguments)
        }, {
            dup: 18
        }],
        213: [function(t, e, n) {
            arguments[4][19][0].apply(n, arguments)
        }, {
            dup: 19
        }],
        214: [function(t, e, n) {
            arguments[4][20][0].apply(n, arguments)
        }, {
            dup: 20
        }],
        215: [function(t, e, n) {
            arguments[4][21][0].apply(n, arguments)
        }, {
            "./lib/dom": 211,
            "./lib/events": 212,
            "./lib/fn": 213,
            "./lib/url": 214,
            dup: 21
        }],
        216: [function(t, e, n) {
            arguments[4][22][0].apply(n, arguments)
        }, {
            "../shared/receiver": 220,
            "braintree-utilities": 215,
            dup: 22
        }],
        217: [function(t, e, n) {
            arguments[4][23][0].apply(n, arguments)
        }, {
            "./authorization_service": 216,
            "braintree-utilities": 215,
            dup: 23
        }],
        218: [function(t, e, n) {
            arguments[4][24][0].apply(n, arguments)
        }, {
            "./client": 217,
            "./vendor/json2": 219,
            dup: 24
        }],
        219: [function(t, e, n) {
            arguments[4][25][0].apply(n, arguments)
        }, {
            dup: 25
        }],
        220: [function(t, e, n) {
            arguments[4][26][0].apply(n, arguments)
        }, {
            "braintree-utilities": 215,
            dup: 26
        }],
        221: [function(t, e, n) {
            arguments[4][27][0].apply(n, arguments)
        }, {
            dup: 27
        }],
        222: [function(t, e, n) {
            arguments[4][17][0].apply(n, arguments)
        }, {
            dup: 17
        }],
        223: [function(t, e, n) {
            arguments[4][18][0].apply(n, arguments)
        }, {
            dup: 18
        }],
        224: [function(t, e, n) {
            arguments[4][19][0].apply(n, arguments)
        }, {
            dup: 19
        }],
        225: [function(t, e, n) {
            arguments[4][31][0].apply(n, arguments)
        }, {
            dup: 31
        }],
        226: [function(t, e, n) {
            arguments[4][32][0].apply(n, arguments)
        }, {
            "./array": 221,
            dup: 32
        }],
        227: [function(t, e, n) {
            arguments[4][33][0].apply(n, arguments)
        }, {
            "./lib/array": 221,
            "./lib/dom": 222,
            "./lib/events": 223,
            "./lib/fn": 224,
            "./lib/string": 225,
            "./lib/url": 226,
            dup: 33
        }],
        228: [function(t, e, n) {
            arguments[4][125][0].apply(n, arguments)
        }, {
            "braintree-utilities": 238,
            dup: 125
        }],
        229: [function(t, e, n) {
            arguments[4][126][0].apply(n, arguments)
        }, {
            "braintree-utilities": 238,
            dup: 126
        }],
        230: [function(t, e, n) {
            arguments[4][127][0].apply(n, arguments)
        }, {
            dup: 127
        }],
        231: [function(t, e, n) {
            arguments[4][128][0].apply(n, arguments)
        }, {
            "braintree-utilities": 238,
            dup: 128
        }],
        232: [function(t, e, n) {
            arguments[4][129][0].apply(n, arguments)
        }, {
            "braintree-utilities": 238,
            dup: 129
        }],
        233: [function(t, e, n) {
            arguments[4][130][0].apply(n, arguments)
        }, {
            "./lib/message-bus": 228,
            "./lib/pubsub-client": 229,
            "./lib/pubsub-server": 230,
            "./lib/rpc-client": 231,
            "./lib/rpc-server": 232,
            dup: 130
        }],
        234: [function(t, e, n) {
            arguments[4][131][0].apply(n, arguments)
        }, {
            dup: 131
        }],
        235: [function(t, e, n) {
            arguments[4][132][0].apply(n, arguments)
        }, {
            dup: 132
        }],
        236: [function(t, e, n) {
            arguments[4][133][0].apply(n, arguments)
        }, {
            dup: 133
        }],
        237: [function(t, e, n) {
            arguments[4][20][0].apply(n, arguments)
        }, {
            dup: 20
        }],
        238: [function(t, e, n) {
            arguments[4][21][0].apply(n, arguments)
        }, {
            "./lib/dom": 234,
            "./lib/events": 235,
            "./lib/fn": 236,
            "./lib/url": 237,
            dup: 21
        }],
        239: [function(t, e, n) {
            arguments[4][27][0].apply(n, arguments)
        }, {
            dup: 27
        }],
        240: [function(t, e, n) {
            arguments[4][17][0].apply(n, arguments)
        }, {
            dup: 17
        }],
        241: [function(t, e, n) {
            arguments[4][18][0].apply(n, arguments)
        }, {
            dup: 18
        }],
        242: [function(t, e, n) {
            arguments[4][19][0].apply(n, arguments)
        }, {
            dup: 19
        }],
        243: [function(t, e, n) {
            arguments[4][31][0].apply(n, arguments)
        }, {
            dup: 31
        }],
        244: [function(t, e, n) {
            arguments[4][32][0].apply(n, arguments)
        }, {
            "./array": 239,
            dup: 32
        }],
        245: [function(t, e, n) {
            arguments[4][33][0].apply(n, arguments)
        }, {
            "./lib/array": 239,
            "./lib/dom": 240,
            "./lib/events": 241,
            "./lib/fn": 242,
            "./lib/string": 243,
            "./lib/url": 244,
            dup: 33
        }],
        246: [function(t, e, n) {
            arguments[4][143][0].apply(n, arguments)
        }, {
            "../shared/constants": 251,
            "../shared/get-locale": 253,
            "../shared/util/browser": 258,
            "../shared/util/dom": 259,
            "../shared/util/util": 260,
            "./logged-in-view": 248,
            "./logged-out-view": 249,
            "./overlay-view": 250,
            "braintree-api": 210,
            "braintree-rpc": 233,
            "braintree-utilities": 245,
            dup: 143
        }],
        247: [function(t, e) {
            function n(t, e) {
                if (!r.detectedPostMessage()) return void("function" == typeof e.onUnsupported && e.onUnsupported(new Error("unsupported browser detected")));
                var n = new i(t, e);
                return n.initialize(), n
            }
            var i = t("./client"),
                r = t("../shared/util/browser"),
                o = "1.3.5";
            e.exports = {
                create: n,
                _browser: r,
                VERSION: o
            }
        }, {
            "../shared/util/browser": 258,
            "./client": 246
        }],
        248: [function(t, e, n) {
            arguments[4][144][0].apply(n, arguments)
        }, {
            "../shared/constants": 251,
            dup: 144
        }],
        249: [function(t, e, n) {
            arguments[4][145][0].apply(n, arguments)
        }, {
            "../shared/constants": 251,
            "../shared/get-locale": 253,
            "braintree-utilities": 245,
            dup: 145
        }],
        250: [function(t, e, n) {
            arguments[4][146][0].apply(n, arguments)
        }, {
            "../shared/constants": 251,
            "braintree-utilities": 245,
            dup: 146
        }],
        251: [function(t, e, n) {
            arguments[4][147][0].apply(n, arguments)
        }, {
            dup: 147
        }],
        252: [function(t, e, n) {
            arguments[4][148][0].apply(n, arguments)
        }, {
            dup: 148
        }],
        253: [function(t, e, n) {
            arguments[4][149][0].apply(n, arguments)
        }, {
            "../shared/data/country-code-lookup": 252,
            dup: 149
        }],
        254: [function(t, e, n) {
            arguments[4][150][0].apply(n, arguments)
        }, {
            "./useragent": 257,
            dup: 150
        }],
        255: [function(t, e, n) {
            arguments[4][151][0].apply(n, arguments)
        }, {
            "./platform": 256,
            "./useragent": 257,
            dup: 151
        }],
        256: [function(t, e, n) {
            arguments[4][152][0].apply(n, arguments)
        }, {
            "./useragent": 257,
            dup: 152
        }],
        257: [function(t, e, n) {
            arguments[4][153][0].apply(n, arguments)
        }, {
            dup: 153
        }],
        258: [function(t, e, n) {
            arguments[4][154][0].apply(n, arguments)
        }, {
            "../useragent/browser": 254,
            "../useragent/device": 255,
            "../useragent/platform": 256,
            "../useragent/useragent": 257,
            dup: 154
        }],
        259: [function(t, e, n) {
            arguments[4][155][0].apply(n, arguments)
        }, {
            dup: 155
        }],
        260: [function(t, e, n) {
            arguments[4][156][0].apply(n, arguments)
        }, {
            dup: 156
        }],
        261: [function(t, e, n) {
            arguments[4][27][0].apply(n, arguments)
        }, {
            dup: 27
        }],
        262: [function(t, e, n) {
            arguments[4][17][0].apply(n, arguments)
        }, {
            dup: 17
        }],
        263: [function(t, e, n) {
            arguments[4][18][0].apply(n, arguments)
        }, {
            dup: 18
        }],
        264: [function(t, e, n) {
            arguments[4][19][0].apply(n, arguments)
        }, {
            dup: 19
        }],
        265: [function(t, e, n) {
            arguments[4][31][0].apply(n, arguments)
        }, {
            dup: 31
        }],
        266: [function(t, e, n) {
            arguments[4][32][0].apply(n, arguments)
        }, {
            "./array": 261,
            dup: 32
        }],
        267: [function(t, e, n) {
            arguments[4][33][0].apply(n, arguments)
        }, {
            "./lib/array": 261,
            "./lib/dom": 262,
            "./lib/events": 263,
            "./lib/fn": 264,
            "./lib/string": 265,
            "./lib/url": 266,
            dup: 33
        }],
        268: [function(t, e) {
            "use strict";

            function n(t) {
                var e, n = {};
                if (t) {
                    for (e in t) t.hasOwnProperty(e) && (n[i(e)] = t[e]);
                    return n
                }
            }

            function i(t) {
                return t.replace(/([A-Z])/g, function(t) {
                    return "_" + t.toLowerCase()
                })
            }
            e.exports = {
                convertToLegacyShippingAddress: n
            }
        }, {}],
        269: [function(t, e) {
            "use strict";
            e.exports = {
                ROOT_SUCCESS_CALLBACK: "onPaymentMethodReceived",
                ROOT_ERROR_CALLBACK: "onError",
                ROOT_READY_CALLBACK: "onReady"
            }
        }, {}],
        270: [function(t, e) {
            "use strict";

            function n(t, e) {
                return o.on(o.events.PAYMENT_METHOD_GENERATED, function(t) {
                    o.emit(o.events.PAYMENT_METHOD_RECEIVED, t)
                }), e.coinbase = e.coinbase || {}, e.apiClient = new i.Client({
                    clientToken: t,
                    integration: "coinbase"
                }), r.create(e)
            }
            var i = t("braintree-api"),
                r = t("braintree-coinbase"),
                o = t("braintree-bus");
            e.exports = {
                initialize: n
            }
        }, {
            "braintree-api": 16,
            "braintree-bus": 34,
            "braintree-coinbase": 37
        }],
        271: [function(t, e) {
            "use strict";

            function n(t, e) {
                var n = new a.Client({
                    clientToken: t,
                    integration: "custom"
                });
                i(e, n), r(e, t), o(e, n)
            }

            function i(t, e) {
                var n;
                t.id ? (n = u.setup(e, t), p.isFunction(t[h.ROOT_SUCCESS_CALLBACK]) && (n.onNonceReceived = function(e, n) {
                    e ? d.emit(d.events.ERROR, e) : t[h.ROOT_SUCCESS_CALLBACK](n)
                })) : d.on(d.events.PAYMENT_METHOD_GENERATED, function(t) {
                    d.emit(d.events.PAYMENT_METHOD_RECEIVED, t)
                })
            }

            function r(t, e) {
                var n, i, r, o;
                t.paypal && (n = s(t, "paypal"), i = n("onSuccess"), r = n("onCancelled"), t.paypal.paymentMethodNonceInputField || (o = document.createElement("input"), o.id = "braintree-custom-integration-dummy-input", t.paypal.paymentMethodNonceInputField = o), t.paypal.onSuccess = function(t) {
                    d.emit(d.events.PAYMENT_METHOD_GENERATED, t), i.apply(null, [t.nonce, t.details.email, f(t.details.shippingAddress)])
                }, t.paypal.onCancelled = function() {
                    d.emit(d.events.PAYMENT_METHOD_CANCELLED), r()
                }, c.create(e, t.paypal))
            }

            function o(t, e) {
                t.coinbase && (t.apiClient = e, t.paypal && delete t.paypal, l.create(t))
            }

            function s(t, e) {
                return function(n) {
                    return e in t && p.isFunction(t[e][n]) ? t[e][n] : function() {}
                }
            }
            var a = t("braintree-api"),
                u = t("braintree-form"),
                c = t("braintree-paypal"),
                l = t("braintree-coinbase"),
                p = t("braintree-utilities"),
                h = t("../constants"),
                d = t("braintree-bus"),
                f = t("../compatibility").convertToLegacyShippingAddress;
            e.exports = {
                initialize: n
            }
        }, {
            "../compatibility": 268,
            "../constants": 269,
            "braintree-api": 16,
            "braintree-bus": 34,
            "braintree-coinbase": 37,
            "braintree-form": 187,
            "braintree-paypal": 247,
            "braintree-utilities": 267
        }],
        272: [function(t, e) {
            "use strict";

            function n(t) {
                return s.isFunction(t.paymentMethodNonceReceived) ? t.paymentMethodNonceReceived : null
            }

            function i(t) {
                return s.isFunction(t[u.ROOT_SUCCESS_CALLBACK])
            }

            function r(t, e) {
                var r = n(e),
                    s = i(e);
                return (r || s) && (e.paymentMethodNonceReceived = function(t) {
                    r && r.apply(null, [t.originalEvent, t.nonce]), delete t.originalEvent, a.emit(a.events.PAYMENT_METHOD_RECEIVED, c(t))
                }), o.create(t, e)
            }
            var o = t("braintree-dropin"),
                s = t("braintree-utilities"),
                a = t("braintree-bus"),
                u = t("../constants"),
                c = t("../lib/sanitize-payload");
            e.exports = {
                initialize: r
            }
        }, {
            "../constants": 269,
            "../lib/sanitize-payload": 276,
            "braintree-bus": 34,
            "braintree-dropin": 177,
            "braintree-utilities": 267
        }],
        273: [function(t, e) {
            "use strict";
            e.exports = {
                custom: t("./custom"),
                dropin: t("./dropin"),
                paypal: t("./paypal"),
                coinbase: t("./coinbase")
            }
        }, {
            "./coinbase": 270,
            "./custom": 271,
            "./dropin": 272,
            "./paypal": 274
        }],
        274: [function(t, e) {
            "use strict";

            function n(t) {
                return "onSuccess" in t && s.isFunction(t.onSuccess) ? t.onSuccess : "paypal" in t && s.isFunction(t.paypal.onSuccess) ? t.paypal.onSuccess : null
            }

            function i(t) {
                return s.isFunction(t[a.ROOT_SUCCESS_CALLBACK])
            }

            function r(t, e) {
                var r = n(e),
                    s = i(e);
                return (r || s) && (e.onSuccess = function(t) {
                    r && r.apply(null, [t.nonce, t.details.email, c(t.details.shippingAddress)]), u.emit(u.events.PAYMENT_METHOD_RECEIVED, t)
                }), o.create(t, e)
            }
            var o = t("braintree-paypal"),
                s = t("braintree-utilities"),
                a = t("../constants"),
                u = t("braintree-bus"),
                c = t("../compatibility").convertToLegacyShippingAddress;
            e.exports = {
                initialize: r
            }
        }, {
            "../compatibility": 268,
            "../constants": 269,
            "braintree-bus": 34,
            "braintree-paypal": 247,
            "braintree-utilities": 267
        }],
        275: [function(t, e) {
            "use strict";

            function n(t) {
                this.callback = t, this.counter = 0, this.attachEvents()
            }
            var i = t("braintree-bus"),
                r = t("braintree-utilities");
            n.prototype.attachEvents = function() {
                this.initHandler = r.bind(this.handleDependencyInitializing, this), this.readyHandler = r.bind(this.handleDependencyReady, this), i.on(i.events.ASYNC_DEPENDENCY_INITIALIZING, this.initHandler), i.on(i.events.ASYNC_DEPENDENCY_READY, this.readyHandler)
            }, n.prototype.handleDependencyInitializing = function() {
                this.counter++
            }, n.prototype.handleDependencyReady = function() {
                this.counter--, 0 === this.counter && (this.detachEvents(), this.callback())
            }, n.prototype.detachEvents = function() {
                i.off(i.events.ASYNC_DEPENDENCY_INITIALIZING, this.initHandler), i.off(i.events.ASYNC_DEPENDENCY_READY, this.readyHandler)
            }, e.exports = function(t) {
                return new n(t)
            }
        }, {
            "braintree-bus": 34,
            "braintree-utilities": 267
        }],
        276: [function(t, e) {
            "use strict";
            e.exports = function(t) {
                return {
                    nonce: t.nonce,
                    details: t.details,
                    type: t.type
                }
            }
        }, {}]
    }, {}, [1])(1)
});