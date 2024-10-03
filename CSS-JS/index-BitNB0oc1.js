(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
    new MutationObserver((s) => {
        for (const o of s) if (o.type === "childList") for (const i of o.addedNodes) i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(s) {
        const o = {};
        return s.integrity && (o.integrity = s.integrity), s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? (o.credentials = "include") : s.crossOrigin === "anonymous" ? (o.credentials = "omit") : (o.credentials = "same-origin"), o;
    }
    function r(s) {
        if (s.ep) return;
        s.ep = !0;
        const o = n(s);
        fetch(s.href, o);
    }
})();
/*!#__NO_SIDE_EFFECTS__*/ function ur(e, t) {
    const n = new Set(e.split(","));
    return (r) => n.has(r);
}
const oe = {},
    At = [],
    Pe = () => {},
    Qo = () => !1,
    An = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
    dr = (e) => e.startsWith("onUpdate:"),
    ge = Object.assign,
    fr = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
    },
    ei = Object.prototype.hasOwnProperty,
    Y = (e, t) => ei.call(e, t),
    D = Array.isArray,
    kt = (e) => kn(e) === "[object Map]",
    Is = (e) => kn(e) === "[object Set]",
    U = (e) => typeof e == "function",
    de = (e) => typeof e == "string",
    yt = (e) => typeof e == "symbol",
    ie = (e) => e !== null && typeof e == "object",
    Es = (e) => (ie(e) || U(e)) && U(e.then) && U(e.catch),
    Ms = Object.prototype.toString,
    kn = (e) => Ms.call(e),
    ti = (e) => kn(e).slice(8, -1),
    Rs = (e) => kn(e) === "[object Object]",
    hr = (e) => de(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    Ft = ur(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    In = (e) => {
        const t = Object.create(null);
        return (n) => t[n] || (t[n] = e(n));
    },
    ni = /-(\w)/g,
    Ne = In((e) => e.replace(ni, (t, n) => (n ? n.toUpperCase() : ""))),
    ri = /\B([A-Z])/g,
    wt = In((e) => e.replace(ri, "-$1").toLowerCase()),
    En = In((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    hn = In((e) => (e ? `on${En(e)}` : "")),
    lt = (e, t) => !Object.is(e, t),
    pn = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t);
    },
    Os = (e, t, n, r = !1) => {
        Object.defineProperty(e, t, { configurable: !0, enumerable: !1, writable: r, value: n });
    },
    Xn = (e) => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t;
    };
let Fr;
const Ps = () => Fr || (Fr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Mn(e) {
    if (D(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n],
                s = de(r) ? li(r) : Mn(r);
            if (s) for (const o in s) t[o] = s[o];
        }
        return t;
    } else if (de(e) || ie(e)) return e;
}
const si = /;(?![^(]*\))/g,
    oi = /:([^]+)/,
    ii = /\/\*[^]*?\*\//g;
function li(e) {
    const t = {};
    return (
        e
            .replace(ii, "")
            .split(si)
            .forEach((n) => {
                if (n) {
                    const r = n.split(oi);
                    r.length > 1 && (t[r[0].trim()] = r[1].trim());
                }
            }),
        t
    );
}
function le(e) {
    let t = "";
    if (de(e)) t = e;
    else if (D(e))
        for (let n = 0; n < e.length; n++) {
            const r = le(e[n]);
            r && (t += r + " ");
        }
    else if (ie(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim();
}
function ai(e) {
    if (!e) return null;
    let { class: t, style: n } = e;
    return t && !de(t) && (e.class = le(t)), n && (e.style = Mn(n)), e;
}
const ci = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    ui = ur(ci);
function Ls(e) {
    return !!e || e === "";
}
const Be = (e) => (de(e) ? e : e == null ? "" : D(e) || (ie(e) && (e.toString === Ms || !U(e.toString))) ? JSON.stringify(e, Ns, 2) : String(e)),
    Ns = (e, t) => (t && t.__v_isRef ? Ns(e, t.value) : kt(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, s], o) => ((n[Bn(r, o) + " =>"] = s), n), {}) } : Is(t) ? { [`Set(${t.size})`]: [...t.values()].map((n) => Bn(n)) } : yt(t) ? Bn(t) : ie(t) && !D(t) && !Rs(t) ? String(t) : t),
    Bn = (e, t = "") => {
        var n;
        return yt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
    };
let je;
class Ds {
    constructor(t = !1) {
        (this.detached = t), (this._active = !0), (this.effects = []), (this.cleanups = []), (this.parent = je), !t && je && (this.index = (je.scopes || (je.scopes = [])).push(this) - 1);
    }
    get active() {
        return this._active;
    }
    run(t) {
        if (this._active) {
            const n = je;
            try {
                return (je = this), t();
            } finally {
                je = n;
            }
        }
    }
    on() {
        je = this;
    }
    off() {
        je = this.parent;
    }
    stop(t) {
        if (this._active) {
            let n, r;
            for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
            for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
            if (this.scopes) for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
            if (!this.detached && this.parent && !t) {
                const s = this.parent.scopes.pop();
                s && s !== this && ((this.parent.scopes[this.index] = s), (s.index = this.index));
            }
            (this.parent = void 0), (this._active = !1);
        }
    }
}
function di(e) {
    return new Ds(e);
}
function fi(e, t = je) {
    t && t.active && t.effects.push(e);
}
function hi() {
    return je;
}
let gt;
class pr {
    constructor(t, n, r, s) {
        (this.fn = t), (this.trigger = n), (this.scheduler = r), (this.active = !0), (this.deps = []), (this._dirtyLevel = 4), (this._trackId = 0), (this._runnings = 0), (this._shouldSchedule = !1), (this._depsLength = 0), fi(this, s);
    }
    get dirty() {
        if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
            (this._dirtyLevel = 1), at();
            for (let t = 0; t < this._depsLength; t++) {
                const n = this.deps[t];
                if (n.computed && (pi(n.computed), this._dirtyLevel >= 4)) break;
            }
            this._dirtyLevel === 1 && (this._dirtyLevel = 0), ct();
        }
        return this._dirtyLevel >= 4;
    }
    set dirty(t) {
        this._dirtyLevel = t ? 4 : 0;
    }
    run() {
        if (((this._dirtyLevel = 0), !this.active)) return this.fn();
        let t = ot,
            n = gt;
        try {
            return (ot = !0), (gt = this), this._runnings++, Br(this), this.fn();
        } finally {
            zr(this), this._runnings--, (gt = n), (ot = t);
        }
    }
    stop() {
        this.active && (Br(this), zr(this), this.onStop && this.onStop(), (this.active = !1));
    }
}
function pi(e) {
    return e.value;
}
function Br(e) {
    e._trackId++, (e._depsLength = 0);
}
function zr(e) {
    if (e.deps.length > e._depsLength) {
        for (let t = e._depsLength; t < e.deps.length; t++) js(e.deps[t], e);
        e.deps.length = e._depsLength;
    }
}
function js(e, t) {
    const n = e.get(t);
    n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let ot = !0,
    Jn = 0;
const $s = [];
function at() {
    $s.push(ot), (ot = !1);
}
function ct() {
    const e = $s.pop();
    ot = e === void 0 ? !0 : e;
}
function mr() {
    Jn++;
}
function gr() {
    for (Jn--; !Jn && Zn.length; ) Zn.shift()();
}
function Vs(e, t, n) {
    if (t.get(e) !== e._trackId) {
        t.set(e, e._trackId);
        const r = e.deps[e._depsLength];
        r !== t ? (r && js(r, e), (e.deps[e._depsLength++] = t)) : e._depsLength++;
    }
}
const Zn = [];
function Us(e, t, n) {
    mr();
    for (const r of e.keys()) {
        let s;
        r._dirtyLevel < t && (s ?? (s = e.get(r) === r._trackId)) && (r._shouldSchedule || (r._shouldSchedule = r._dirtyLevel === 0), (r._dirtyLevel = t)),
            r._shouldSchedule && (s ?? (s = e.get(r) === r._trackId)) && (r.trigger(), (!r._runnings || r.allowRecurse) && r._dirtyLevel !== 2 && ((r._shouldSchedule = !1), r.scheduler && Zn.push(r.scheduler)));
    }
    gr();
}
const Fs = (e, t) => {
        const n = new Map();
        return (n.cleanup = e), (n.computed = t), n;
    },
    _n = new WeakMap(),
    bt = Symbol(""),
    Qn = Symbol("");
function Ie(e, t, n) {
    if (ot && gt) {
        let r = _n.get(e);
        r || _n.set(e, (r = new Map()));
        let s = r.get(n);
        s || r.set(n, (s = Fs(() => r.delete(n)))), Vs(gt, s);
    }
}
function Xe(e, t, n, r, s, o) {
    const i = _n.get(e);
    if (!i) return;
    let l = [];
    if (t === "clear") l = [...i.values()];
    else if (n === "length" && D(e)) {
        const a = Number(r);
        i.forEach((u, f) => {
            (f === "length" || (!yt(f) && f >= a)) && l.push(u);
        });
    } else
        switch ((n !== void 0 && l.push(i.get(n)), t)) {
            case "add":
                D(e) ? hr(n) && l.push(i.get("length")) : (l.push(i.get(bt)), kt(e) && l.push(i.get(Qn)));
                break;
            case "delete":
                D(e) || (l.push(i.get(bt)), kt(e) && l.push(i.get(Qn)));
                break;
            case "set":
                kt(e) && l.push(i.get(bt));
                break;
        }
    mr();
    for (const a of l) a && Us(a, 4);
    gr();
}
function mi(e, t) {
    const n = _n.get(e);
    return n && n.get(t);
}
const gi = ur("__proto__,__v_isRef,__isVue"),
    Bs = new Set(
        Object.getOwnPropertyNames(Symbol)
            .filter((e) => e !== "arguments" && e !== "caller")
            .map((e) => Symbol[e])
            .filter(yt),
    ),
    Hr = bi();
function bi() {
    const e = {};
    return (
        ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
            e[t] = function (...n) {
                const r = X(this);
                for (let o = 0, i = this.length; o < i; o++) Ie(r, "get", o + "");
                const s = r[t](...n);
                return s === -1 || s === !1 ? r[t](...n.map(X)) : s;
            };
        }),
        ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
            e[t] = function (...n) {
                at(), mr();
                const r = X(this)[t].apply(this, n);
                return gr(), ct(), r;
            };
        }),
        e
    );
}
function vi(e) {
    yt(e) || (e = String(e));
    const t = X(this);
    return Ie(t, "has", e), t.hasOwnProperty(e);
}
class zs {
    constructor(t = !1, n = !1) {
        (this._isReadonly = t), (this._isShallow = n);
    }
    get(t, n, r) {
        const s = this._isReadonly,
            o = this._isShallow;
        if (n === "__v_isReactive") return !s;
        if (n === "__v_isReadonly") return s;
        if (n === "__v_isShallow") return o;
        if (n === "__v_raw") return r === (s ? (o ? Ri : Ks) : o ? Ws : Gs).get(t) || Object.getPrototypeOf(t) === Object.getPrototypeOf(r) ? t : void 0;
        const i = D(t);
        if (!s) {
            if (i && Y(Hr, n)) return Reflect.get(Hr, n, r);
            if (n === "hasOwnProperty") return vi;
        }
        const l = Reflect.get(t, n, r);
        return (yt(n) ? Bs.has(n) : gi(n)) || (s || Ie(t, "get", n), o) ? l : ye(l) ? (i && hr(n) ? l : l.value) : ie(l) ? (s ? qs(l) : On(l)) : l;
    }
}
class Hs extends zs {
    constructor(t = !1) {
        super(!1, t);
    }
    set(t, n, r, s) {
        let o = t[n];
        if (!this._isShallow) {
            const a = qt(o);
            if ((!yn(r) && !qt(r) && ((o = X(o)), (r = X(r))), !D(t) && ye(o) && !ye(r))) return a ? !1 : ((o.value = r), !0);
        }
        const i = D(t) && hr(n) ? Number(n) < t.length : Y(t, n),
            l = Reflect.set(t, n, r, s);
        return t === X(s) && (i ? lt(r, o) && Xe(t, "set", n, r) : Xe(t, "add", n, r)), l;
    }
    deleteProperty(t, n) {
        const r = Y(t, n);
        t[n];
        const s = Reflect.deleteProperty(t, n);
        return s && r && Xe(t, "delete", n, void 0), s;
    }
    has(t, n) {
        const r = Reflect.has(t, n);
        return (!yt(n) || !Bs.has(n)) && Ie(t, "has", n), r;
    }
    ownKeys(t) {
        return Ie(t, "iterate", D(t) ? "length" : bt), Reflect.ownKeys(t);
    }
}
class _i extends zs {
    constructor(t = !1) {
        super(!0, t);
    }
    set(t, n) {
        return !0;
    }
    deleteProperty(t, n) {
        return !0;
    }
}
const yi = new Hs(),
    wi = new _i(),
    xi = new Hs(!0);
const br = (e) => e,
    Rn = (e) => Reflect.getPrototypeOf(e);
function nn(e, t, n = !1, r = !1) {
    e = e.__v_raw;
    const s = X(e),
        o = X(t);
    n || (lt(t, o) && Ie(s, "get", t), Ie(s, "get", o));
    const { has: i } = Rn(s),
        l = r ? br : n ? yr : Yt;
    if (i.call(s, t)) return l(e.get(t));
    if (i.call(s, o)) return l(e.get(o));
    e !== s && e.get(t);
}
function rn(e, t = !1) {
    const n = this.__v_raw,
        r = X(n),
        s = X(e);
    return t || (lt(e, s) && Ie(r, "has", e), Ie(r, "has", s)), e === s ? n.has(e) : n.has(e) || n.has(s);
}
function sn(e, t = !1) {
    return (e = e.__v_raw), !t && Ie(X(e), "iterate", bt), Reflect.get(e, "size", e);
}
function Gr(e) {
    e = X(e);
    const t = X(this);
    return Rn(t).has.call(t, e) || (t.add(e), Xe(t, "add", e, e)), this;
}
function Wr(e, t) {
    t = X(t);
    const n = X(this),
        { has: r, get: s } = Rn(n);
    let o = r.call(n, e);
    o || ((e = X(e)), (o = r.call(n, e)));
    const i = s.call(n, e);
    return n.set(e, t), o ? lt(t, i) && Xe(n, "set", e, t) : Xe(n, "add", e, t), this;
}
function Kr(e) {
    const t = X(this),
        { has: n, get: r } = Rn(t);
    let s = n.call(t, e);
    s || ((e = X(e)), (s = n.call(t, e))), r && r.call(t, e);
    const o = t.delete(e);
    return s && Xe(t, "delete", e, void 0), o;
}
function qr() {
    const e = X(this),
        t = e.size !== 0,
        n = e.clear();
    return t && Xe(e, "clear", void 0, void 0), n;
}
function on(e, t) {
    return function (r, s) {
        const o = this,
            i = o.__v_raw,
            l = X(i),
            a = t ? br : e ? yr : Yt;
        return !e && Ie(l, "iterate", bt), i.forEach((u, f) => r.call(s, a(u), a(f), o));
    };
}
function ln(e, t, n) {
    return function (...r) {
        const s = this.__v_raw,
            o = X(s),
            i = kt(o),
            l = e === "entries" || (e === Symbol.iterator && i),
            a = e === "keys" && i,
            u = s[e](...r),
            f = n ? br : t ? yr : Yt;
        return (
            !t && Ie(o, "iterate", a ? Qn : bt),
            {
                next() {
                    const { value: h, done: m } = u.next();
                    return m ? { value: h, done: m } : { value: l ? [f(h[0]), f(h[1])] : f(h), done: m };
                },
                [Symbol.iterator]() {
                    return this;
                },
            }
        );
    };
}
function Qe(e) {
    return function (...t) {
        return e === "delete" ? !1 : e === "clear" ? void 0 : this;
    };
}
function Ci() {
    const e = {
            get(o) {
                return nn(this, o);
            },
            get size() {
                return sn(this);
            },
            has: rn,
            add: Gr,
            set: Wr,
            delete: Kr,
            clear: qr,
            forEach: on(!1, !1),
        },
        t = {
            get(o) {
                return nn(this, o, !1, !0);
            },
            get size() {
                return sn(this);
            },
            has: rn,
            add: Gr,
            set: Wr,
            delete: Kr,
            clear: qr,
            forEach: on(!1, !0),
        },
        n = {
            get(o) {
                return nn(this, o, !0);
            },
            get size() {
                return sn(this, !0);
            },
            has(o) {
                return rn.call(this, o, !0);
            },
            add: Qe("add"),
            set: Qe("set"),
            delete: Qe("delete"),
            clear: Qe("clear"),
            forEach: on(!0, !1),
        },
        r = {
            get(o) {
                return nn(this, o, !0, !0);
            },
            get size() {
                return sn(this, !0);
            },
            has(o) {
                return rn.call(this, o, !0);
            },
            add: Qe("add"),
            set: Qe("set"),
            delete: Qe("delete"),
            clear: Qe("clear"),
            forEach: on(!0, !0),
        };
    return (
        ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
            (e[o] = ln(o, !1, !1)), (n[o] = ln(o, !0, !1)), (t[o] = ln(o, !1, !0)), (r[o] = ln(o, !0, !0));
        }),
        [e, n, t, r]
    );
}
const [Si, Ti, Ai, ki] = Ci();
function vr(e, t) {
    const n = t ? (e ? ki : Ai) : e ? Ti : Si;
    return (r, s, o) => (s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? r : Reflect.get(Y(n, s) && s in r ? n : r, s, o));
}
const Ii = { get: vr(!1, !1) },
    Ei = { get: vr(!1, !0) },
    Mi = { get: vr(!0, !1) };
const Gs = new WeakMap(),
    Ws = new WeakMap(),
    Ks = new WeakMap(),
    Ri = new WeakMap();
function Oi(e) {
    switch (e) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0;
    }
}
function Pi(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Oi(ti(e));
}
function On(e) {
    return qt(e) ? e : _r(e, !1, yi, Ii, Gs);
}
function Li(e) {
    return _r(e, !1, xi, Ei, Ws);
}
function qs(e) {
    return _r(e, !0, wi, Mi, Ks);
}
function _r(e, t, n, r, s) {
    if (!ie(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
    const o = s.get(e);
    if (o) return o;
    const i = Pi(e);
    if (i === 0) return e;
    const l = new Proxy(e, i === 2 ? r : n);
    return s.set(e, l), l;
}
function Bt(e) {
    return qt(e) ? Bt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function qt(e) {
    return !!(e && e.__v_isReadonly);
}
function yn(e) {
    return !!(e && e.__v_isShallow);
}
function Ys(e) {
    return e ? !!e.__v_raw : !1;
}
function X(e) {
    const t = e && e.__v_raw;
    return t ? X(t) : e;
}
function Ni(e) {
    return Object.isExtensible(e) && Os(e, "__v_skip", !0), e;
}
const Yt = (e) => (ie(e) ? On(e) : e),
    yr = (e) => (ie(e) ? qs(e) : e);
class Xs {
    constructor(t, n, r, s) {
        (this.getter = t),
            (this._setter = n),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this.__v_isReadonly = !1),
            (this.effect = new pr(
                () => t(this._value),
                () => mn(this, this.effect._dirtyLevel === 2 ? 2 : 3),
            )),
            (this.effect.computed = this),
            (this.effect.active = this._cacheable = !s),
            (this.__v_isReadonly = r);
    }
    get value() {
        const t = X(this);
        return (!t._cacheable || t.effect.dirty) && lt(t._value, (t._value = t.effect.run())) && mn(t, 4), Js(t), t.effect._dirtyLevel >= 2 && mn(t, 2), t._value;
    }
    set value(t) {
        this._setter(t);
    }
    get _dirty() {
        return this.effect.dirty;
    }
    set _dirty(t) {
        this.effect.dirty = t;
    }
}
function Di(e, t, n = !1) {
    let r, s;
    const o = U(e);
    return o ? ((r = e), (s = Pe)) : ((r = e.get), (s = e.set)), new Xs(r, s, o || !s, n);
}
function Js(e) {
    var t;
    ot && gt && ((e = X(e)), Vs(gt, (t = e.dep) != null ? t : (e.dep = Fs(() => (e.dep = void 0), e instanceof Xs ? e : void 0))));
}
function mn(e, t = 4, n) {
    e = X(e);
    const r = e.dep;
    r && Us(r, t);
}
function ye(e) {
    return !!(e && e.__v_isRef === !0);
}
function ve(e) {
    return ji(e, !1);
}
function ji(e, t) {
    return ye(e) ? e : new $i(e, t);
}
class $i {
    constructor(t, n) {
        (this.__v_isShallow = n), (this.dep = void 0), (this.__v_isRef = !0), (this._rawValue = n ? t : X(t)), (this._value = n ? t : Yt(t));
    }
    get value() {
        return Js(this), this._value;
    }
    set value(t) {
        const n = this.__v_isShallow || yn(t) || qt(t);
        (t = n ? t : X(t)), lt(t, this._rawValue) && ((this._rawValue = t), (this._value = n ? t : Yt(t)), mn(this, 4));
    }
}
function T(e) {
    return ye(e) ? e.value : e;
}
const Vi = {
    get: (e, t, n) => T(Reflect.get(e, t, n)),
    set: (e, t, n, r) => {
        const s = e[t];
        return ye(s) && !ye(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, r);
    },
};
function Zs(e) {
    return Bt(e) ? e : new Proxy(e, Vi);
}
function Qs(e) {
    const t = D(e) ? new Array(e.length) : {};
    for (const n in e) t[n] = eo(e, n);
    return t;
}
class Ui {
    constructor(t, n, r) {
        (this._object = t), (this._key = n), (this._defaultValue = r), (this.__v_isRef = !0);
    }
    get value() {
        const t = this._object[this._key];
        return t === void 0 ? this._defaultValue : t;
    }
    set value(t) {
        this._object[this._key] = t;
    }
    get dep() {
        return mi(X(this._object), this._key);
    }
}
class Fi {
    constructor(t) {
        (this._getter = t), (this.__v_isRef = !0), (this.__v_isReadonly = !0);
    }
    get value() {
        return this._getter();
    }
}
function Bi(e, t, n) {
    return ye(e) ? e : U(e) ? new Fi(e) : ie(e) && arguments.length > 1 ? eo(e, t, n) : ve(e);
}
function eo(e, t, n) {
    const r = e[t];
    return ye(r) ? r : new Ui(e, t, n);
}
function it(e, t, n, r) {
    try {
        return r ? e(...r) : e();
    } catch (s) {
        Pn(s, t, n);
    }
}
function Ve(e, t, n, r) {
    if (U(e)) {
        const s = it(e, t, n, r);
        return (
            s &&
                Es(s) &&
                s.catch((o) => {
                    Pn(o, t, n);
                }),
            s
        );
    }
    if (D(e)) {
        const s = [];
        for (let o = 0; o < e.length; o++) s.push(Ve(e[o], t, n, r));
        return s;
    }
}
function Pn(e, t, n, r = !0) {
    const s = t ? t.vnode : null;
    if (t) {
        let o = t.parent;
        const i = t.proxy,
            l = `https://vuejs.org/error-reference/#runtime-${n}`;
        for (; o; ) {
            const u = o.ec;
            if (u) {
                for (let f = 0; f < u.length; f++) if (u[f](e, i, l) === !1) return;
            }
            o = o.parent;
        }
        const a = t.appContext.config.errorHandler;
        if (a) {
            at(), it(a, null, 10, [e, i, l]), ct();
            return;
        }
    }
    zi(e, n, s, r);
}
function zi(e, t, n, r = !0) {
    console.error(e);
}
let Xt = !1,
    er = !1;
const we = [];
let Ge = 0;
const It = [];
let nt = null,
    ht = 0;
const to = Promise.resolve();
let wr = null;
function Qt(e) {
    const t = wr || to;
    return e ? t.then(this ? e.bind(this) : e) : t;
}
function Hi(e) {
    let t = Ge + 1,
        n = we.length;
    for (; t < n; ) {
        const r = (t + n) >>> 1,
            s = we[r],
            o = Jt(s);
        o < e || (o === e && s.pre) ? (t = r + 1) : (n = r);
    }
    return t;
}
function xr(e) {
    (!we.length || !we.includes(e, Xt && e.allowRecurse ? Ge + 1 : Ge)) && (e.id == null ? we.push(e) : we.splice(Hi(e.id), 0, e), no());
}
function no() {
    !Xt && !er && ((er = !0), (wr = to.then(so)));
}
function Gi(e) {
    const t = we.indexOf(e);
    t > Ge && we.splice(t, 1);
}
function Wi(e) {
    D(e) ? It.push(...e) : (!nt || !nt.includes(e, e.allowRecurse ? ht + 1 : ht)) && It.push(e), no();
}
function Yr(e, t, n = Xt ? Ge + 1 : 0) {
    for (; n < we.length; n++) {
        const r = we[n];
        if (r && r.pre) {
            if (e && r.id !== e.uid) continue;
            we.splice(n, 1), n--, r();
        }
    }
}
function ro(e) {
    if (It.length) {
        const t = [...new Set(It)].sort((n, r) => Jt(n) - Jt(r));
        if (((It.length = 0), nt)) {
            nt.push(...t);
            return;
        }
        for (nt = t, ht = 0; ht < nt.length; ht++) nt[ht]();
        (nt = null), (ht = 0);
    }
}
const Jt = (e) => (e.id == null ? 1 / 0 : e.id),
    Ki = (e, t) => {
        const n = Jt(e) - Jt(t);
        if (n === 0) {
            if (e.pre && !t.pre) return -1;
            if (t.pre && !e.pre) return 1;
        }
        return n;
    };
function so(e) {
    (er = !1), (Xt = !0), we.sort(Ki);
    try {
        for (Ge = 0; Ge < we.length; Ge++) {
            const t = we[Ge];
            t && t.active !== !1 && it(t, null, 14);
        }
    } finally {
        (Ge = 0), (we.length = 0), ro(), (Xt = !1), (wr = null), (we.length || It.length) && so();
    }
}
function qi(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || oe;
    let s = n;
    const o = t.startsWith("update:"),
        i = o && t.slice(7);
    if (i && i in r) {
        const f = `${i === "modelValue" ? "model" : i}Modifiers`,
            { number: h, trim: m } = r[f] || oe;
        m && (s = n.map((v) => (de(v) ? v.trim() : v))), h && (s = n.map(Xn));
    }
    let l,
        a = r[(l = hn(t))] || r[(l = hn(Ne(t)))];
    !a && o && (a = r[(l = hn(wt(t)))]), a && Ve(a, e, 6, s);
    const u = r[l + "Once"];
    if (u) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[l]) return;
        (e.emitted[l] = !0), Ve(u, e, 6, s);
    }
}
function oo(e, t, n = !1) {
    const r = t.emitsCache,
        s = r.get(e);
    if (s !== void 0) return s;
    const o = e.emits;
    let i = {},
        l = !1;
    if (!U(e)) {
        const a = (u) => {
            const f = oo(u, t, !0);
            f && ((l = !0), ge(i, f));
        };
        !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
    }
    return !o && !l ? (ie(e) && r.set(e, null), null) : (D(o) ? o.forEach((a) => (i[a] = null)) : ge(i, o), ie(e) && r.set(e, i), i);
}
function Ln(e, t) {
    return !e || !An(t) ? !1 : ((t = t.slice(2).replace(/Once$/, "")), Y(e, t[0].toLowerCase() + t.slice(1)) || Y(e, wt(t)) || Y(e, t));
}
let he = null,
    io = null;
function wn(e) {
    const t = he;
    return (he = e), (io = (e && e.type.__scopeId) || null), t;
}
function I(e, t = he, n) {
    if (!t || e._n) return e;
    const r = (...s) => {
        r._d && is(-1);
        const o = wn(t);
        let i;
        try {
            i = e(...s);
        } finally {
            wn(o), r._d && is(1);
        }
        return i;
    };
    return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function zn(e) {
    const {
            type: t,
            vnode: n,
            proxy: r,
            withProxy: s,
            propsOptions: [o],
            slots: i,
            attrs: l,
            emit: a,
            render: u,
            renderCache: f,
            props: h,
            data: m,
            setupState: v,
            ctx: L,
            inheritAttrs: A,
        } = e,
        O = wn(e);
    let j, z;
    try {
        if (n.shapeFlag & 4) {
            const F = s || r,
                Q = F;
            (j = He(u.call(Q, F, f, h, v, m, L))), (z = l);
        } else {
            const F = t;
            (j = He(F.length > 1 ? F(h, { attrs: l, slots: i, emit: a }) : F(h, null))), (z = t.props ? l : Yi(l));
        }
    } catch (F) {
        (Kt.length = 0), Pn(F, e, 1), (j = C(Je));
    }
    let M = j;
    if (z && A !== !1) {
        const F = Object.keys(z),
            { shapeFlag: Q } = M;
        F.length && Q & 7 && (o && F.some(dr) && (z = Xi(z, o)), (M = _t(M, z, !1, !0)));
    }
    return n.dirs && ((M = _t(M, null, !1, !0)), (M.dirs = M.dirs ? M.dirs.concat(n.dirs) : n.dirs)), n.transition && (M.transition = n.transition), (j = M), wn(O), j;
}
const Yi = (e) => {
        let t;
        for (const n in e) (n === "class" || n === "style" || An(n)) && ((t || (t = {}))[n] = e[n]);
        return t;
    },
    Xi = (e, t) => {
        const n = {};
        for (const r in e) (!dr(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
        return n;
    };
function Ji(e, t, n) {
    const { props: r, children: s, component: o } = e,
        { props: i, children: l, patchFlag: a } = t,
        u = o.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && a >= 0) {
        if (a & 1024) return !0;
        if (a & 16) return r ? Xr(r, i, u) : !!i;
        if (a & 8) {
            const f = t.dynamicProps;
            for (let h = 0; h < f.length; h++) {
                const m = f[h];
                if (i[m] !== r[m] && !Ln(u, m)) return !0;
            }
        }
    } else return (s || l) && (!l || !l.$stable) ? !0 : r === i ? !1 : r ? (i ? Xr(r, i, u) : !0) : !!i;
    return !1;
}
function Xr(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let s = 0; s < r.length; s++) {
        const o = r[s];
        if (t[o] !== e[o] && !Ln(n, o)) return !0;
    }
    return !1;
}
function Zi({ vnode: e, parent: t }, n) {
    for (; t; ) {
        const r = t.subTree;
        if ((r.suspense && r.suspense.activeBranch === e && (r.el = e.el), r === e)) ((e = t.vnode).el = n), (t = t.parent);
        else break;
    }
}
const lo = "components";
function re(e, t) {
    return el(lo, e, !0, t) || e;
}
const Qi = Symbol.for("v-ndc");
function el(e, t, n = !0, r = !1) {
    const s = he || _e;
    if (s) {
        const o = s.type;
        if (e === lo) {
            const l = Hl(o, !1);
            if (l && (l === t || l === Ne(t) || l === En(Ne(t)))) return o;
        }
        const i = Jr(s[e] || o[e], t) || Jr(s.appContext[e], t);
        return !i && r ? o : i;
    }
}
function Jr(e, t) {
    return e && (e[t] || e[Ne(t)] || e[En(Ne(t))]);
}
const tl = (e) => e.__isSuspense;
function nl(e, t) {
    t && t.pendingBranch ? (D(e) ? t.effects.push(...e) : t.effects.push(e)) : Wi(e);
}
const rl = Symbol.for("v-scx"),
    sl = () => Wt(rl),
    an = {};
function Le(e, t, n) {
    return ao(e, t, n);
}
function ao(e, t, { immediate: n, deep: r, flush: s, once: o, onTrack: i, onTrigger: l } = oe) {
    if (t && o) {
        const $ = t;
        t = (...be) => {
            $(...be), Q();
        };
    }
    const a = _e,
        u = ($) => (r === !0 ? $ : pt($, r === !1 ? 1 : void 0));
    let f,
        h = !1,
        m = !1;
    if (
        (ye(e)
            ? ((f = () => e.value), (h = yn(e)))
            : Bt(e)
              ? ((f = () => u(e)), (h = !0))
              : D(e)
                ? ((m = !0),
                  (h = e.some(($) => Bt($) || yn($))),
                  (f = () =>
                      e.map(($) => {
                          if (ye($)) return $.value;
                          if (Bt($)) return u($);
                          if (U($)) return it($, a, 2);
                      })))
                : U(e)
                  ? t
                      ? (f = () => it(e, a, 2))
                      : (f = () => (v && v(), Ve(e, a, 3, [L])))
                  : (f = Pe),
        t && r)
    ) {
        const $ = f;
        f = () => pt($());
    }
    let v,
        L = ($) => {
            v = M.onStop = () => {
                it($, a, 4), (v = M.onStop = void 0);
            };
        },
        A;
    if (jn)
        if (((L = Pe), t ? n && Ve(t, a, 3, [f(), m ? [] : void 0, L]) : f(), s === "sync")) {
            const $ = sl();
            A = $.__watcherHandles || ($.__watcherHandles = []);
        } else return Pe;
    let O = m ? new Array(e.length).fill(an) : an;
    const j = () => {
        if (!(!M.active || !M.dirty))
            if (t) {
                const $ = M.run();
                (r || h || (m ? $.some((be, Ce) => lt(be, O[Ce])) : lt($, O))) && (v && v(), Ve(t, a, 3, [$, O === an ? void 0 : m && O[0] === an ? [] : O, L]), (O = $));
            } else M.run();
    };
    j.allowRecurse = !!t;
    let z;
    s === "sync" ? (z = j) : s === "post" ? (z = () => ke(j, a && a.suspense)) : ((j.pre = !0), a && (j.id = a.uid), (z = () => xr(j)));
    const M = new pr(f, Pe, z),
        F = hi(),
        Q = () => {
            M.stop(), F && fr(F.effects, M);
        };
    return t ? (n ? j() : (O = M.run())) : s === "post" ? ke(M.run.bind(M), a && a.suspense) : M.run(), A && A.push(Q), Q;
}
function ol(e, t, n) {
    const r = this.proxy,
        s = de(e) ? (e.includes(".") ? co(r, e) : () => r[e]) : e.bind(r, r);
    let o;
    U(t) ? (o = t) : ((o = t.handler), (n = t));
    const i = en(this),
        l = ao(s, o.bind(r), n);
    return i(), l;
}
function co(e, t) {
    const n = t.split(".");
    return () => {
        let r = e;
        for (let s = 0; s < n.length && r; s++) r = r[n[s]];
        return r;
    };
}
function pt(e, t = 1 / 0, n) {
    if (t <= 0 || !ie(e) || e.__v_skip || ((n = n || new Set()), n.has(e))) return e;
    if ((n.add(e), t--, ye(e))) pt(e.value, t, n);
    else if (D(e)) for (let r = 0; r < e.length; r++) pt(e[r], t, n);
    else if (Is(e) || kt(e))
        e.forEach((r) => {
            pt(r, t, n);
        });
    else if (Rs(e)) for (const r in e) pt(e[r], t, n);
    return e;
}
function uo(e, t) {
    if (he === null) return e;
    const n = $n(he) || he.proxy,
        r = e.dirs || (e.dirs = []);
    for (let s = 0; s < t.length; s++) {
        let [o, i, l, a = oe] = t[s];
        o && (U(o) && (o = { mounted: o, updated: o }), o.deep && pt(i), r.push({ dir: o, instance: n, value: i, oldValue: void 0, arg: l, modifiers: a }));
    }
    return e;
}
function dt(e, t, n, r) {
    const s = e.dirs,
        o = t && t.dirs;
    for (let i = 0; i < s.length; i++) {
        const l = s[i];
        o && (l.oldValue = o[i].value);
        let a = l.dir[r];
        a && (at(), Ve(a, n, 8, [e.el, l, e, t]), ct());
    }
}
/*!#__NO_SIDE_EFFECTS__*/ function K(e, t) {
    return U(e) ? ge({ name: e.name }, t, { setup: e }) : e;
}
const zt = (e) => !!e.type.__asyncLoader,
    fo = (e) => e.type.__isKeepAlive;
function il(e, t) {
    ho(e, "a", t);
}
function ll(e, t) {
    ho(e, "da", t);
}
function ho(e, t, n = _e) {
    const r =
        e.__wdc ||
        (e.__wdc = () => {
            let s = n;
            for (; s; ) {
                if (s.isDeactivated) return;
                s = s.parent;
            }
            return e();
        });
    if ((Nn(t, r, n), n)) {
        let s = n.parent;
        for (; s && s.parent; ) fo(s.parent.vnode) && al(r, t, n, s), (s = s.parent);
    }
}
function al(e, t, n, r) {
    const s = Nn(t, e, r, !0);
    Sr(() => {
        fr(r[t], s);
    }, n);
}
function Nn(e, t, n = _e, r = !1) {
    if (n) {
        const s = n[e] || (n[e] = []),
            o =
                t.__weh ||
                (t.__weh = (...i) => {
                    if (n.isUnmounted) return;
                    at();
                    const l = en(n),
                        a = Ve(t, n, e, i);
                    return l(), ct(), a;
                });
        return r ? s.unshift(o) : s.push(o), o;
    }
}
const Ze =
        (e) =>
        (t, n = _e) =>
            (!jn || e === "sp") && Nn(e, (...r) => t(...r), n),
    cl = Ze("bm"),
    Cr = Ze("m"),
    ul = Ze("bu"),
    dl = Ze("u"),
    fl = Ze("bum"),
    Sr = Ze("um"),
    hl = Ze("sp"),
    pl = Ze("rtg"),
    ml = Ze("rtc");
function gl(e, t = _e) {
    Nn("ec", e, t);
}
function Hn(e, t, n, r) {
    let s;
    const o = n;
    if (D(e) || de(e)) {
        s = new Array(e.length);
        for (let i = 0, l = e.length; i < l; i++) s[i] = t(e[i], i, void 0, o);
    } else if (typeof e == "number") {
        s = new Array(e);
        for (let i = 0; i < e; i++) s[i] = t(i + 1, i, void 0, o);
    } else if (ie(e))
        if (e[Symbol.iterator]) s = Array.from(e, (i, l) => t(i, l, void 0, o));
        else {
            const i = Object.keys(e);
            s = new Array(i.length);
            for (let l = 0, a = i.length; l < a; l++) {
                const u = i[l];
                s[l] = t(e[u], u, l, o);
            }
        }
    else s = [];
    return s;
}
function Z(e, t, n = {}, r, s) {
    if (he.isCE || (he.parent && zt(he.parent) && he.parent.isCE)) return t !== "default" && (n.name = t), C("slot", n, r && r());
    let o = e[t];
    o && o._c && (o._d = !1), R();
    const i = o && po(o(n)),
        l = xe(fe, { key: n.key || (i && i.key) || `_${t}` }, i || (r ? r() : []), i && e._ === 1 ? 64 : -2);
    return l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), o && o._c && (o._d = !0), l;
}
function po(e) {
    return e.some((t) => (Cn(t) ? !(t.type === Je || (t.type === fe && !po(t.children))) : !0)) ? e : null;
}
const tr = (e) => (e ? (Ro(e) ? $n(e) || e.proxy : tr(e.parent)) : null),
    Ht = ge(Object.create(null), {
        $: (e) => e,
        $el: (e) => e.vnode.el,
        $data: (e) => e.data,
        $props: (e) => e.props,
        $attrs: (e) => e.attrs,
        $slots: (e) => e.slots,
        $refs: (e) => e.refs,
        $parent: (e) => tr(e.parent),
        $root: (e) => tr(e.root),
        $emit: (e) => e.emit,
        $options: (e) => Tr(e),
        $forceUpdate: (e) =>
            e.f ||
            (e.f = () => {
                (e.effect.dirty = !0), xr(e.update);
            }),
        $nextTick: (e) => e.n || (e.n = Qt.bind(e.proxy)),
        $watch: (e) => ol.bind(e),
    }),
    Gn = (e, t) => e !== oe && !e.__isScriptSetup && Y(e, t),
    bl = {
        get({ _: e }, t) {
            if (t === "__v_skip") return !0;
            const { ctx: n, setupState: r, data: s, props: o, accessCache: i, type: l, appContext: a } = e;
            let u;
            if (t[0] !== "$") {
                const v = i[t];
                if (v !== void 0)
                    switch (v) {
                        case 1:
                            return r[t];
                        case 2:
                            return s[t];
                        case 4:
                            return n[t];
                        case 3:
                            return o[t];
                    }
                else {
                    if (Gn(r, t)) return (i[t] = 1), r[t];
                    if (s !== oe && Y(s, t)) return (i[t] = 2), s[t];
                    if ((u = e.propsOptions[0]) && Y(u, t)) return (i[t] = 3), o[t];
                    if (n !== oe && Y(n, t)) return (i[t] = 4), n[t];
                    nr && (i[t] = 0);
                }
            }
            const f = Ht[t];
            let h, m;
            if (f) return t === "$attrs" && Ie(e.attrs, "get", ""), f(e);
            if ((h = l.__cssModules) && (h = h[t])) return h;
            if (n !== oe && Y(n, t)) return (i[t] = 4), n[t];
            if (((m = a.config.globalProperties), Y(m, t))) return m[t];
        },
        set({ _: e }, t, n) {
            const { data: r, setupState: s, ctx: o } = e;
            return Gn(s, t) ? ((s[t] = n), !0) : r !== oe && Y(r, t) ? ((r[t] = n), !0) : Y(e.props, t) || (t[0] === "$" && t.slice(1) in e) ? !1 : ((o[t] = n), !0);
        },
        has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: s, propsOptions: o } }, i) {
            let l;
            return !!n[i] || (e !== oe && Y(e, i)) || Gn(t, i) || ((l = o[0]) && Y(l, i)) || Y(r, i) || Y(Ht, i) || Y(s.config.globalProperties, i);
        },
        defineProperty(e, t, n) {
            return n.get != null ? (e._.accessCache[t] = 0) : Y(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
        },
    };
function Zr(e) {
    return D(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let nr = !0;
function vl(e) {
    const t = Tr(e),
        n = e.proxy,
        r = e.ctx;
    (nr = !1), t.beforeCreate && Qr(t.beforeCreate, e, "bc");
    const {
        data: s,
        computed: o,
        methods: i,
        watch: l,
        provide: a,
        inject: u,
        created: f,
        beforeMount: h,
        mounted: m,
        beforeUpdate: v,
        updated: L,
        activated: A,
        deactivated: O,
        beforeDestroy: j,
        beforeUnmount: z,
        destroyed: M,
        unmounted: F,
        render: Q,
        renderTracked: $,
        renderTriggered: be,
        errorCaptured: Ce,
        serverPrefetch: We,
        expose: Se,
        inheritAttrs: Ee,
        components: q,
        directives: Ke,
        filters: Ue,
    } = t;
    if ((u && _l(u, r, null), i))
        for (const te in i) {
            const J = i[te];
            U(J) && (r[te] = J.bind(n));
        }
    if (s) {
        const te = s.call(n, n);
        ie(te) && (e.data = On(te));
    }
    if (((nr = !0), o))
        for (const te in o) {
            const J = o[te],
                Me = U(J) ? J.bind(n, n) : U(J.get) ? J.get.bind(n, n) : Pe,
                ut = !U(J) && U(J.set) ? J.set.bind(n) : Pe,
                Re = me({ get: Me, set: ut });
            Object.defineProperty(r, te, { enumerable: !0, configurable: !0, get: () => Re.value, set: (Te) => (Re.value = Te) });
        }
    if (l) for (const te in l) mo(l[te], r, n, te);
    if (a) {
        const te = U(a) ? a.call(n) : a;
        Reflect.ownKeys(te).forEach((J) => {
            bo(J, te[J]);
        });
    }
    f && Qr(f, e, "c");
    function ee(te, J) {
        D(J) ? J.forEach((Me) => te(Me.bind(n))) : J && te(J.bind(n));
    }
    if ((ee(cl, h), ee(Cr, m), ee(ul, v), ee(dl, L), ee(il, A), ee(ll, O), ee(gl, Ce), ee(ml, $), ee(pl, be), ee(fl, z), ee(Sr, F), ee(hl, We), D(Se)))
        if (Se.length) {
            const te = e.exposed || (e.exposed = {});
            Se.forEach((J) => {
                Object.defineProperty(te, J, { get: () => n[J], set: (Me) => (n[J] = Me) });
            });
        } else e.exposed || (e.exposed = {});
    Q && e.render === Pe && (e.render = Q), Ee != null && (e.inheritAttrs = Ee), q && (e.components = q), Ke && (e.directives = Ke);
}
function _l(e, t, n = Pe) {
    D(e) && (e = rr(e));
    for (const r in e) {
        const s = e[r];
        let o;
        ie(s) ? ("default" in s ? (o = Wt(s.from || r, s.default, !0)) : (o = Wt(s.from || r))) : (o = Wt(s)), ye(o) ? Object.defineProperty(t, r, { enumerable: !0, configurable: !0, get: () => o.value, set: (i) => (o.value = i) }) : (t[r] = o);
    }
}
function Qr(e, t, n) {
    Ve(D(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function mo(e, t, n, r) {
    const s = r.includes(".") ? co(n, r) : () => n[r];
    if (de(e)) {
        const o = t[e];
        U(o) && Le(s, o);
    } else if (U(e)) Le(s, e.bind(n));
    else if (ie(e))
        if (D(e)) e.forEach((o) => mo(o, t, n, r));
        else {
            const o = U(e.handler) ? e.handler.bind(n) : t[e.handler];
            U(o) && Le(s, o, e);
        }
}
function Tr(e) {
    const t = e.type,
        { mixins: n, extends: r } = t,
        {
            mixins: s,
            optionsCache: o,
            config: { optionMergeStrategies: i },
        } = e.appContext,
        l = o.get(t);
    let a;
    return l ? (a = l) : !s.length && !n && !r ? (a = t) : ((a = {}), s.length && s.forEach((u) => xn(a, u, i, !0)), xn(a, t, i)), ie(t) && o.set(t, a), a;
}
function xn(e, t, n, r = !1) {
    const { mixins: s, extends: o } = t;
    o && xn(e, o, n, !0), s && s.forEach((i) => xn(e, i, n, !0));
    for (const i in t)
        if (!(r && i === "expose")) {
            const l = yl[i] || (n && n[i]);
            e[i] = l ? l(e[i], t[i]) : t[i];
        }
    return e;
}
const yl = {
    data: es,
    props: ts,
    emits: ts,
    methods: Ut,
    computed: Ut,
    beforeCreate: Ae,
    created: Ae,
    beforeMount: Ae,
    mounted: Ae,
    beforeUpdate: Ae,
    updated: Ae,
    beforeDestroy: Ae,
    beforeUnmount: Ae,
    destroyed: Ae,
    unmounted: Ae,
    activated: Ae,
    deactivated: Ae,
    errorCaptured: Ae,
    serverPrefetch: Ae,
    components: Ut,
    directives: Ut,
    watch: xl,
    provide: es,
    inject: wl,
};
function es(e, t) {
    return t
        ? e
            ? function () {
                  return ge(U(e) ? e.call(this, this) : e, U(t) ? t.call(this, this) : t);
              }
            : t
        : e;
}
function wl(e, t) {
    return Ut(rr(e), rr(t));
}
function rr(e) {
    if (D(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t;
    }
    return e;
}
function Ae(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
}
function Ut(e, t) {
    return e ? ge(Object.create(null), e, t) : t;
}
function ts(e, t) {
    return e ? (D(e) && D(t) ? [...new Set([...e, ...t])] : ge(Object.create(null), Zr(e), Zr(t ?? {}))) : t;
}
function xl(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = ge(Object.create(null), e);
    for (const r in t) n[r] = Ae(e[r], t[r]);
    return n;
}
function go() {
    return {
        app: null,
        config: { isNativeTag: Qo, performance: !1, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap(),
        propsCache: new WeakMap(),
        emitsCache: new WeakMap(),
    };
}
let Cl = 0;
function Sl(e, t) {
    return function (r, s = null) {
        U(r) || (r = ge({}, r)), s != null && !ie(s) && (s = null);
        const o = go(),
            i = new WeakSet();
        let l = !1;
        const a = (o.app = {
            _uid: Cl++,
            _component: r,
            _props: s,
            _container: null,
            _context: o,
            _instance: null,
            version: Wl,
            get config() {
                return o.config;
            },
            set config(u) {},
            use(u, ...f) {
                return i.has(u) || (u && U(u.install) ? (i.add(u), u.install(a, ...f)) : U(u) && (i.add(u), u(a, ...f))), a;
            },
            mixin(u) {
                return o.mixins.includes(u) || o.mixins.push(u), a;
            },
            component(u, f) {
                return f ? ((o.components[u] = f), a) : o.components[u];
            },
            directive(u, f) {
                return f ? ((o.directives[u] = f), a) : o.directives[u];
            },
            mount(u, f, h) {
                if (!l) {
                    const m = C(r, s);
                    return (m.appContext = o), h === !0 ? (h = "svg") : h === !1 && (h = void 0), f && t ? t(m, u) : e(m, u, h), (l = !0), (a._container = u), (u.__vue_app__ = a), $n(m.component) || m.component.proxy;
                }
            },
            unmount() {
                l && (e(null, a._container), delete a._container.__vue_app__);
            },
            provide(u, f) {
                return (o.provides[u] = f), a;
            },
            runWithContext(u) {
                const f = Gt;
                Gt = a;
                try {
                    return u();
                } finally {
                    Gt = f;
                }
            },
        });
        return a;
    };
}
let Gt = null;
function bo(e, t) {
    if (_e) {
        let n = _e.provides;
        const r = _e.parent && _e.parent.provides;
        r === n && (n = _e.provides = Object.create(r)), (n[e] = t);
    }
}
function Wt(e, t, n = !1) {
    const r = _e || he;
    if (r || Gt) {
        const s = r ? (r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides) : Gt._context.provides;
        if (s && e in s) return s[e];
        if (arguments.length > 1) return n && U(t) ? t.call(r && r.proxy) : t;
    }
}
const vo = {},
    _o = () => Object.create(vo),
    yo = (e) => Object.getPrototypeOf(e) === vo;
function Tl(e, t, n, r = !1) {
    const s = {},
        o = _o();
    (e.propsDefaults = Object.create(null)), wo(e, t, s, o);
    for (const i in e.propsOptions[0]) i in s || (s[i] = void 0);
    n ? (e.props = r ? s : Li(s)) : e.type.props ? (e.props = s) : (e.props = o), (e.attrs = o);
}
function Al(e, t, n, r) {
    const {
            props: s,
            attrs: o,
            vnode: { patchFlag: i },
        } = e,
        l = X(s),
        [a] = e.propsOptions;
    let u = !1;
    if ((r || i > 0) && !(i & 16)) {
        if (i & 8) {
            const f = e.vnode.dynamicProps;
            for (let h = 0; h < f.length; h++) {
                let m = f[h];
                if (Ln(e.emitsOptions, m)) continue;
                const v = t[m];
                if (a)
                    if (Y(o, m)) v !== o[m] && ((o[m] = v), (u = !0));
                    else {
                        const L = Ne(m);
                        s[L] = sr(a, l, L, v, e, !1);
                    }
                else v !== o[m] && ((o[m] = v), (u = !0));
            }
        }
    } else {
        wo(e, t, s, o) && (u = !0);
        let f;
        for (const h in l) (!t || (!Y(t, h) && ((f = wt(h)) === h || !Y(t, f)))) && (a ? n && (n[h] !== void 0 || n[f] !== void 0) && (s[h] = sr(a, l, h, void 0, e, !0)) : delete s[h]);
        if (o !== l) for (const h in o) (!t || !Y(t, h)) && (delete o[h], (u = !0));
    }
    u && Xe(e.attrs, "set", "");
}
function wo(e, t, n, r) {
    const [s, o] = e.propsOptions;
    let i = !1,
        l;
    if (t)
        for (let a in t) {
            if (Ft(a)) continue;
            const u = t[a];
            let f;
            s && Y(s, (f = Ne(a))) ? (!o || !o.includes(f) ? (n[f] = u) : ((l || (l = {}))[f] = u)) : Ln(e.emitsOptions, a) || ((!(a in r) || u !== r[a]) && ((r[a] = u), (i = !0)));
        }
    if (o) {
        const a = X(n),
            u = l || oe;
        for (let f = 0; f < o.length; f++) {
            const h = o[f];
            n[h] = sr(s, a, h, u[h], e, !Y(u, h));
        }
    }
    return i;
}
function sr(e, t, n, r, s, o) {
    const i = e[n];
    if (i != null) {
        const l = Y(i, "default");
        if (l && r === void 0) {
            const a = i.default;
            if (i.type !== Function && !i.skipFactory && U(a)) {
                const { propsDefaults: u } = s;
                if (n in u) r = u[n];
                else {
                    const f = en(s);
                    (r = u[n] = a.call(null, t)), f();
                }
            } else r = a;
        }
        i[0] && (o && !l ? (r = !1) : i[1] && (r === "" || r === wt(n)) && (r = !0));
    }
    return r;
}
function xo(e, t, n = !1) {
    const r = t.propsCache,
        s = r.get(e);
    if (s) return s;
    const o = e.props,
        i = {},
        l = [];
    let a = !1;
    if (!U(e)) {
        const f = (h) => {
            a = !0;
            const [m, v] = xo(h, t, !0);
            ge(i, m), v && l.push(...v);
        };
        !n && t.mixins.length && t.mixins.forEach(f), e.extends && f(e.extends), e.mixins && e.mixins.forEach(f);
    }
    if (!o && !a) return ie(e) && r.set(e, At), At;
    if (D(o))
        for (let f = 0; f < o.length; f++) {
            const h = Ne(o[f]);
            ns(h) && (i[h] = oe);
        }
    else if (o)
        for (const f in o) {
            const h = Ne(f);
            if (ns(h)) {
                const m = o[f],
                    v = (i[h] = D(m) || U(m) ? { type: m } : ge({}, m));
                if (v) {
                    const L = os(Boolean, v.type),
                        A = os(String, v.type);
                    (v[0] = L > -1), (v[1] = A < 0 || L < A), (L > -1 || Y(v, "default")) && l.push(h);
                }
            }
        }
    const u = [i, l];
    return ie(e) && r.set(e, u), u;
}
function ns(e) {
    return e[0] !== "$" && !Ft(e);
}
function rs(e) {
    return e === null ? "null" : typeof e == "function" ? e.name || "" : (typeof e == "object" && e.constructor && e.constructor.name) || "";
}
function ss(e, t) {
    return rs(e) === rs(t);
}
function os(e, t) {
    return D(t) ? t.findIndex((n) => ss(n, e)) : U(t) && ss(t, e) ? 0 : -1;
}
const Co = (e) => e[0] === "_" || e === "$stable",
    Ar = (e) => (D(e) ? e.map(He) : [He(e)]),
    kl = (e, t, n) => {
        if (t._n) return t;
        const r = I((...s) => Ar(t(...s)), n);
        return (r._c = !1), r;
    },
    So = (e, t, n) => {
        const r = e._ctx;
        for (const s in e) {
            if (Co(s)) continue;
            const o = e[s];
            if (U(o)) t[s] = kl(s, o, r);
            else if (o != null) {
                const i = Ar(o);
                t[s] = () => i;
            }
        }
    },
    To = (e, t) => {
        const n = Ar(t);
        e.slots.default = () => n;
    },
    Il = (e, t) => {
        const n = (e.slots = _o());
        if (e.vnode.shapeFlag & 32) {
            const r = t._;
            r ? (ge(n, t), Os(n, "_", r, !0)) : So(t, n);
        } else t && To(e, t);
    },
    El = (e, t, n) => {
        const { vnode: r, slots: s } = e;
        let o = !0,
            i = oe;
        if (r.shapeFlag & 32) {
            const l = t._;
            l ? (n && l === 1 ? (o = !1) : (ge(s, t), !n && l === 1 && delete s._)) : ((o = !t.$stable), So(t, s)), (i = t);
        } else t && (To(e, t), (i = { default: 1 }));
        if (o) for (const l in s) !Co(l) && i[l] == null && delete s[l];
    };
function or(e, t, n, r, s = !1) {
    if (D(e)) {
        e.forEach((m, v) => or(m, t && (D(t) ? t[v] : t), n, r, s));
        return;
    }
    if (zt(r) && !s) return;
    const o = r.shapeFlag & 4 ? $n(r.component) || r.component.proxy : r.el,
        i = s ? null : o,
        { i: l, r: a } = e,
        u = t && t.r,
        f = l.refs === oe ? (l.refs = {}) : l.refs,
        h = l.setupState;
    if ((u != null && u !== a && (de(u) ? ((f[u] = null), Y(h, u) && (h[u] = null)) : ye(u) && (u.value = null)), U(a))) it(a, l, 12, [i, f]);
    else {
        const m = de(a),
            v = ye(a);
        if (m || v) {
            const L = () => {
                if (e.f) {
                    const A = m ? (Y(h, a) ? h[a] : f[a]) : a.value;
                    s ? D(A) && fr(A, o) : D(A) ? A.includes(o) || A.push(o) : m ? ((f[a] = [o]), Y(h, a) && (h[a] = f[a])) : ((a.value = [o]), e.k && (f[e.k] = a.value));
                } else m ? ((f[a] = i), Y(h, a) && (h[a] = i)) : v && ((a.value = i), e.k && (f[e.k] = i));
            };
            i ? ((L.id = -1), ke(L, n)) : L();
        }
    }
}
const ke = nl;
function Ml(e) {
    return Rl(e);
}
function Rl(e, t) {
    const n = Ps();
    n.__VUE__ = !0;
    const { insert: r, remove: s, patchProp: o, createElement: i, createText: l, createComment: a, setText: u, setElementText: f, parentNode: h, nextSibling: m, setScopeId: v = Pe, insertStaticContent: L } = e,
        A = (c, d, p, g = null, b = null, w = null, k = void 0, y = null, x = !!d.dynamicChildren) => {
            if (c === d) return;
            c && !Dt(c, d) && ((g = tn(c)), Te(c, b, w, !0), (c = null)), d.patchFlag === -2 && ((x = !1), (d.dynamicChildren = null));
            const { type: _, ref: E, shapeFlag: N } = d;
            switch (_) {
                case Dn:
                    O(c, d, p, g);
                    break;
                case Je:
                    j(c, d, p, g);
                    break;
                case gn:
                    c == null && z(d, p, g, k);
                    break;
                case fe:
                    q(c, d, p, g, b, w, k, y, x);
                    break;
                default:
                    N & 1 ? Q(c, d, p, g, b, w, k, y, x) : N & 6 ? Ke(c, d, p, g, b, w, k, y, x) : (N & 64 || N & 128) && _.process(c, d, p, g, b, w, k, y, x, Lt);
            }
            E != null && b && or(E, c && c.ref, w, d || c, !d);
        },
        O = (c, d, p, g) => {
            if (c == null) r((d.el = l(d.children)), p, g);
            else {
                const b = (d.el = c.el);
                d.children !== c.children && u(b, d.children);
            }
        },
        j = (c, d, p, g) => {
            c == null ? r((d.el = a(d.children || "")), p, g) : (d.el = c.el);
        },
        z = (c, d, p, g) => {
            [c.el, c.anchor] = L(c.children, d, p, g, c.el, c.anchor);
        },
        M = ({ el: c, anchor: d }, p, g) => {
            let b;
            for (; c && c !== d; ) (b = m(c)), r(c, p, g), (c = b);
            r(d, p, g);
        },
        F = ({ el: c, anchor: d }) => {
            let p;
            for (; c && c !== d; ) (p = m(c)), s(c), (c = p);
            s(d);
        },
        Q = (c, d, p, g, b, w, k, y, x) => {
            d.type === "svg" ? (k = "svg") : d.type === "math" && (k = "mathml"), c == null ? $(d, p, g, b, w, k, y, x) : We(c, d, b, w, k, y, x);
        },
        $ = (c, d, p, g, b, w, k, y) => {
            let x, _;
            const { props: E, shapeFlag: N, transition: P, dirs: V } = c;
            if (((x = c.el = i(c.type, w, E && E.is, E)), N & 8 ? f(x, c.children) : N & 16 && Ce(c.children, x, null, g, b, Wn(c, w), k, y), V && dt(c, null, g, "created"), be(x, c, c.scopeId, k, g), E)) {
                for (const ne in E) ne !== "value" && !Ft(ne) && o(x, ne, null, E[ne], w, c.children, g, b, qe);
                "value" in E && o(x, "value", null, E.value, w), (_ = E.onVnodeBeforeMount) && ze(_, g, c);
            }
            V && dt(c, null, g, "beforeMount");
            const W = Ol(b, P);
            W && P.beforeEnter(x),
                r(x, d, p),
                ((_ = E && E.onVnodeMounted) || W || V) &&
                    ke(() => {
                        _ && ze(_, g, c), W && P.enter(x), V && dt(c, null, g, "mounted");
                    }, b);
        },
        be = (c, d, p, g, b) => {
            if ((p && v(c, p), g)) for (let w = 0; w < g.length; w++) v(c, g[w]);
            if (b) {
                let w = b.subTree;
                if (d === w) {
                    const k = b.vnode;
                    be(c, k, k.scopeId, k.slotScopeIds, b.parent);
                }
            }
        },
        Ce = (c, d, p, g, b, w, k, y, x = 0) => {
            for (let _ = x; _ < c.length; _++) {
                const E = (c[_] = y ? rt(c[_]) : He(c[_]));
                A(null, E, d, p, g, b, w, k, y);
            }
        },
        We = (c, d, p, g, b, w, k) => {
            const y = (d.el = c.el);
            let { patchFlag: x, dynamicChildren: _, dirs: E } = d;
            x |= c.patchFlag & 16;
            const N = c.props || oe,
                P = d.props || oe;
            let V;
            if ((p && ft(p, !1), (V = P.onVnodeBeforeUpdate) && ze(V, p, d, c), E && dt(d, c, p, "beforeUpdate"), p && ft(p, !0), _ ? Se(c.dynamicChildren, _, y, p, g, Wn(d, b), w) : k || J(c, d, y, null, p, g, Wn(d, b), w, !1), x > 0)) {
                if (x & 16) Ee(y, d, N, P, p, g, b);
                else if ((x & 2 && N.class !== P.class && o(y, "class", null, P.class, b), x & 4 && o(y, "style", N.style, P.style, b), x & 8)) {
                    const W = d.dynamicProps;
                    for (let ne = 0; ne < W.length; ne++) {
                        const ae = W[ne],
                            pe = N[ae],
                            De = P[ae];
                        (De !== pe || ae === "value") && o(y, ae, pe, De, b, c.children, p, g, qe);
                    }
                }
                x & 1 && c.children !== d.children && f(y, d.children);
            } else !k && _ == null && Ee(y, d, N, P, p, g, b);
            ((V = P.onVnodeUpdated) || E) &&
                ke(() => {
                    V && ze(V, p, d, c), E && dt(d, c, p, "updated");
                }, g);
        },
        Se = (c, d, p, g, b, w, k) => {
            for (let y = 0; y < d.length; y++) {
                const x = c[y],
                    _ = d[y],
                    E = x.el && (x.type === fe || !Dt(x, _) || x.shapeFlag & 70) ? h(x.el) : p;
                A(x, _, E, null, g, b, w, k, !0);
            }
        },
        Ee = (c, d, p, g, b, w, k) => {
            if (p !== g) {
                if (p !== oe) for (const y in p) !Ft(y) && !(y in g) && o(c, y, p[y], null, k, d.children, b, w, qe);
                for (const y in g) {
                    if (Ft(y)) continue;
                    const x = g[y],
                        _ = p[y];
                    x !== _ && y !== "value" && o(c, y, _, x, k, d.children, b, w, qe);
                }
                "value" in g && o(c, "value", p.value, g.value, k);
            }
        },
        q = (c, d, p, g, b, w, k, y, x) => {
            const _ = (d.el = c ? c.el : l("")),
                E = (d.anchor = c ? c.anchor : l(""));
            let { patchFlag: N, dynamicChildren: P, slotScopeIds: V } = d;
            V && (y = y ? y.concat(V) : V), c == null ? (r(_, p, g), r(E, p, g), Ce(d.children || [], p, E, b, w, k, y, x)) : N > 0 && N & 64 && P && c.dynamicChildren ? (Se(c.dynamicChildren, P, p, b, w, k, y), (d.key != null || (b && d === b.subTree)) && Ao(c, d, !0)) : J(c, d, p, E, b, w, k, y, x);
        },
        Ke = (c, d, p, g, b, w, k, y, x) => {
            (d.slotScopeIds = y), c == null ? (d.shapeFlag & 512 ? b.ctx.activate(d, p, g, k, x) : Ue(d, p, g, b, w, k, x)) : ce(c, d, x);
        },
        Ue = (c, d, p, g, b, w, k) => {
            const y = (c.component = Vl(c, g, b));
            if ((fo(c) && (y.ctx.renderer = Lt), Ul(y), y.asyncDep)) {
                if ((b && b.registerDep(y, ee), !c.el)) {
                    const x = (y.subTree = C(Je));
                    j(null, x, d, p);
                }
            } else ee(y, c, d, p, b, w, k);
        },
        ce = (c, d, p) => {
            const g = (d.component = c.component);
            if (Ji(c, d, p))
                if (g.asyncDep && !g.asyncResolved) {
                    te(g, d, p);
                    return;
                } else (g.next = d), Gi(g.update), (g.effect.dirty = !0), g.update();
            else (d.el = c.el), (g.vnode = d);
        },
        ee = (c, d, p, g, b, w, k) => {
            const y = () => {
                    if (c.isMounted) {
                        let { next: E, bu: N, u: P, parent: V, vnode: W } = c;
                        {
                            const Ct = ko(c);
                            if (Ct) {
                                E && ((E.el = W.el), te(c, E, k)),
                                    Ct.asyncDep.then(() => {
                                        c.isUnmounted || y();
                                    });
                                return;
                            }
                        }
                        let ne = E,
                            ae;
                        ft(c, !1), E ? ((E.el = W.el), te(c, E, k)) : (E = W), N && pn(N), (ae = E.props && E.props.onVnodeBeforeUpdate) && ze(ae, V, E, W), ft(c, !0);
                        const pe = zn(c),
                            De = c.subTree;
                        (c.subTree = pe), A(De, pe, h(De.el), tn(De), c, b, w), (E.el = pe.el), ne === null && Zi(c, pe.el), P && ke(P, b), (ae = E.props && E.props.onVnodeUpdated) && ke(() => ze(ae, V, E, W), b);
                    } else {
                        let E;
                        const { el: N, props: P } = d,
                            { bm: V, m: W, parent: ne } = c,
                            ae = zt(d);
                        if ((ft(c, !1), V && pn(V), !ae && (E = P && P.onVnodeBeforeMount) && ze(E, ne, d), ft(c, !0), N && jr)) {
                            const pe = () => {
                                (c.subTree = zn(c)), jr(N, c.subTree, c, b, null);
                            };
                            ae ? d.type.__asyncLoader().then(() => !c.isUnmounted && pe()) : pe();
                        } else {
                            const pe = (c.subTree = zn(c));
                            A(null, pe, p, g, c, b, w), (d.el = pe.el);
                        }
                        if ((W && ke(W, b), !ae && (E = P && P.onVnodeMounted))) {
                            const pe = d;
                            ke(() => ze(E, ne, pe), b);
                        }
                        (d.shapeFlag & 256 || (ne && zt(ne.vnode) && ne.vnode.shapeFlag & 256)) && c.a && ke(c.a, b), (c.isMounted = !0), (d = p = g = null);
                    }
                },
                x = (c.effect = new pr(y, Pe, () => xr(_), c.scope)),
                _ = (c.update = () => {
                    x.dirty && x.run();
                });
            (_.id = c.uid), ft(c, !0), _();
        },
        te = (c, d, p) => {
            d.component = c;
            const g = c.vnode.props;
            (c.vnode = d), (c.next = null), Al(c, d.props, g, p), El(c, d.children, p), at(), Yr(c), ct();
        },
        J = (c, d, p, g, b, w, k, y, x = !1) => {
            const _ = c && c.children,
                E = c ? c.shapeFlag : 0,
                N = d.children,
                { patchFlag: P, shapeFlag: V } = d;
            if (P > 0) {
                if (P & 128) {
                    ut(_, N, p, g, b, w, k, y, x);
                    return;
                } else if (P & 256) {
                    Me(_, N, p, g, b, w, k, y, x);
                    return;
                }
            }
            V & 8 ? (E & 16 && qe(_, b, w), N !== _ && f(p, N)) : E & 16 ? (V & 16 ? ut(_, N, p, g, b, w, k, y, x) : qe(_, b, w, !0)) : (E & 8 && f(p, ""), V & 16 && Ce(N, p, g, b, w, k, y, x));
        },
        Me = (c, d, p, g, b, w, k, y, x) => {
            (c = c || At), (d = d || At);
            const _ = c.length,
                E = d.length,
                N = Math.min(_, E);
            let P;
            for (P = 0; P < N; P++) {
                const V = (d[P] = x ? rt(d[P]) : He(d[P]));
                A(c[P], V, p, null, b, w, k, y, x);
            }
            _ > E ? qe(c, b, w, !0, !1, N) : Ce(d, p, g, b, w, k, y, x, N);
        },
        ut = (c, d, p, g, b, w, k, y, x) => {
            let _ = 0;
            const E = d.length;
            let N = c.length - 1,
                P = E - 1;
            for (; _ <= N && _ <= P; ) {
                const V = c[_],
                    W = (d[_] = x ? rt(d[_]) : He(d[_]));
                if (Dt(V, W)) A(V, W, p, null, b, w, k, y, x);
                else break;
                _++;
            }
            for (; _ <= N && _ <= P; ) {
                const V = c[N],
                    W = (d[P] = x ? rt(d[P]) : He(d[P]));
                if (Dt(V, W)) A(V, W, p, null, b, w, k, y, x);
                else break;
                N--, P--;
            }
            if (_ > N) {
                if (_ <= P) {
                    const V = P + 1,
                        W = V < E ? d[V].el : g;
                    for (; _ <= P; ) A(null, (d[_] = x ? rt(d[_]) : He(d[_])), p, W, b, w, k, y, x), _++;
                }
            } else if (_ > P) for (; _ <= N; ) Te(c[_], b, w, !0), _++;
            else {
                const V = _,
                    W = _,
                    ne = new Map();
                for (_ = W; _ <= P; _++) {
                    const Oe = (d[_] = x ? rt(d[_]) : He(d[_]));
                    Oe.key != null && ne.set(Oe.key, _);
                }
                let ae,
                    pe = 0;
                const De = P - W + 1;
                let Ct = !1,
                    $r = 0;
                const Nt = new Array(De);
                for (_ = 0; _ < De; _++) Nt[_] = 0;
                for (_ = V; _ <= N; _++) {
                    const Oe = c[_];
                    if (pe >= De) {
                        Te(Oe, b, w, !0);
                        continue;
                    }
                    let Fe;
                    if (Oe.key != null) Fe = ne.get(Oe.key);
                    else
                        for (ae = W; ae <= P; ae++)
                            if (Nt[ae - W] === 0 && Dt(Oe, d[ae])) {
                                Fe = ae;
                                break;
                            }
                    Fe === void 0 ? Te(Oe, b, w, !0) : ((Nt[Fe - W] = _ + 1), Fe >= $r ? ($r = Fe) : (Ct = !0), A(Oe, d[Fe], p, null, b, w, k, y, x), pe++);
                }
                const Vr = Ct ? Pl(Nt) : At;
                for (ae = Vr.length - 1, _ = De - 1; _ >= 0; _--) {
                    const Oe = W + _,
                        Fe = d[Oe],
                        Ur = Oe + 1 < E ? d[Oe + 1].el : g;
                    Nt[_] === 0 ? A(null, Fe, p, Ur, b, w, k, y, x) : Ct && (ae < 0 || _ !== Vr[ae] ? Re(Fe, p, Ur, 2) : ae--);
                }
            }
        },
        Re = (c, d, p, g, b = null) => {
            const { el: w, type: k, transition: y, children: x, shapeFlag: _ } = c;
            if (_ & 6) {
                Re(c.component.subTree, d, p, g);
                return;
            }
            if (_ & 128) {
                c.suspense.move(d, p, g);
                return;
            }
            if (_ & 64) {
                k.move(c, d, p, Lt);
                return;
            }
            if (k === fe) {
                r(w, d, p);
                for (let N = 0; N < x.length; N++) Re(x[N], d, p, g);
                r(c.anchor, d, p);
                return;
            }
            if (k === gn) {
                M(c, d, p);
                return;
            }
            if (g !== 2 && _ & 1 && y)
                if (g === 0) y.beforeEnter(w), r(w, d, p), ke(() => y.enter(w), b);
                else {
                    const { leave: N, delayLeave: P, afterLeave: V } = y,
                        W = () => r(w, d, p),
                        ne = () => {
                            N(w, () => {
                                W(), V && V();
                            });
                        };
                    P ? P(w, W, ne) : ne();
                }
            else r(w, d, p);
        },
        Te = (c, d, p, g = !1, b = !1) => {
            const { type: w, props: k, ref: y, children: x, dynamicChildren: _, shapeFlag: E, patchFlag: N, dirs: P } = c;
            if ((y != null && or(y, null, p, c, !0), E & 256)) {
                d.ctx.deactivate(c);
                return;
            }
            const V = E & 1 && P,
                W = !zt(c);
            let ne;
            if ((W && (ne = k && k.onVnodeBeforeUnmount) && ze(ne, d, c), E & 6)) Zo(c.component, p, g);
            else {
                if (E & 128) {
                    c.suspense.unmount(p, g);
                    return;
                }
                V && dt(c, null, d, "beforeUnmount"), E & 64 ? c.type.remove(c, d, p, b, Lt, g) : _ && (w !== fe || (N > 0 && N & 64)) ? qe(_, d, p, !1, !0) : ((w === fe && N & 384) || (!b && E & 16)) && qe(x, d, p), g && Lr(c);
            }
            ((W && (ne = k && k.onVnodeUnmounted)) || V) &&
                ke(() => {
                    ne && ze(ne, d, c), V && dt(c, null, d, "unmounted");
                }, p);
        },
        Lr = (c) => {
            const { type: d, el: p, anchor: g, transition: b } = c;
            if (d === fe) {
                Jo(p, g);
                return;
            }
            if (d === gn) {
                F(c);
                return;
            }
            const w = () => {
                s(p), b && !b.persisted && b.afterLeave && b.afterLeave();
            };
            if (c.shapeFlag & 1 && b && !b.persisted) {
                const { leave: k, delayLeave: y } = b,
                    x = () => k(p, w);
                y ? y(c.el, w, x) : x();
            } else w();
        },
        Jo = (c, d) => {
            let p;
            for (; c !== d; ) (p = m(c)), s(c), (c = p);
            s(d);
        },
        Zo = (c, d, p) => {
            const { bum: g, scope: b, update: w, subTree: k, um: y } = c;
            g && pn(g),
                b.stop(),
                w && ((w.active = !1), Te(k, c, d, p)),
                y && ke(y, d),
                ke(() => {
                    c.isUnmounted = !0;
                }, d),
                d && d.pendingBranch && !d.isUnmounted && c.asyncDep && !c.asyncResolved && c.suspenseId === d.pendingId && (d.deps--, d.deps === 0 && d.resolve());
        },
        qe = (c, d, p, g = !1, b = !1, w = 0) => {
            for (let k = w; k < c.length; k++) Te(c[k], d, p, g, b);
        },
        tn = (c) => (c.shapeFlag & 6 ? tn(c.component.subTree) : c.shapeFlag & 128 ? c.suspense.next() : m(c.anchor || c.el));
    let Fn = !1;
    const Nr = (c, d, p) => {
            c == null ? d._vnode && Te(d._vnode, null, null, !0) : A(d._vnode || null, c, d, null, null, null, p), Fn || ((Fn = !0), Yr(), ro(), (Fn = !1)), (d._vnode = c);
        },
        Lt = { p: A, um: Te, m: Re, r: Lr, mt: Ue, mc: Ce, pc: J, pbc: Se, n: tn, o: e };
    let Dr, jr;
    return { render: Nr, hydrate: Dr, createApp: Sl(Nr, Dr) };
}
function Wn({ type: e, props: t }, n) {
    return (n === "svg" && e === "foreignObject") || (n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html")) ? void 0 : n;
}
function ft({ effect: e, update: t }, n) {
    e.allowRecurse = t.allowRecurse = n;
}
function Ol(e, t) {
    return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function Ao(e, t, n = !1) {
    const r = e.children,
        s = t.children;
    if (D(r) && D(s))
        for (let o = 0; o < r.length; o++) {
            const i = r[o];
            let l = s[o];
            l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && ((l = s[o] = rt(s[o])), (l.el = i.el)), n || Ao(i, l)), l.type === Dn && (l.el = i.el);
        }
}
function Pl(e) {
    const t = e.slice(),
        n = [0];
    let r, s, o, i, l;
    const a = e.length;
    for (r = 0; r < a; r++) {
        const u = e[r];
        if (u !== 0) {
            if (((s = n[n.length - 1]), e[s] < u)) {
                (t[r] = s), n.push(r);
                continue;
            }
            for (o = 0, i = n.length - 1; o < i; ) (l = (o + i) >> 1), e[n[l]] < u ? (o = l + 1) : (i = l);
            u < e[n[o]] && (o > 0 && (t[r] = n[o - 1]), (n[o] = r));
        }
    }
    for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
    return n;
}
function ko(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : ko(t);
}
const Ll = (e) => e.__isTeleport,
    fe = Symbol.for("v-fgt"),
    Dn = Symbol.for("v-txt"),
    Je = Symbol.for("v-cmt"),
    gn = Symbol.for("v-stc"),
    Kt = [];
let $e = null;
function R(e = !1) {
    Kt.push(($e = e ? null : []));
}
function Nl() {
    Kt.pop(), ($e = Kt[Kt.length - 1] || null);
}
let Zt = 1;
function is(e) {
    Zt += e;
}
function Io(e) {
    return (e.dynamicChildren = Zt > 0 ? $e || At : null), Nl(), Zt > 0 && $e && $e.push(e), e;
}
function H(e, t, n, r, s, o) {
    return Io(S(e, t, n, r, s, o, !0));
}
function xe(e, t, n, r, s) {
    return Io(C(e, t, n, r, s, !0));
}
function Cn(e) {
    return e ? e.__v_isVNode === !0 : !1;
}
function Dt(e, t) {
    return e.type === t.type && e.key === t.key;
}
const Eo = ({ key: e }) => e ?? null,
    bn = ({ ref: e, ref_key: t, ref_for: n }) => (typeof e == "number" && (e = "" + e), e != null ? (de(e) || ye(e) || U(e) ? { i: he, r: e, k: t, f: !!n } : e) : null);
function S(e, t = null, n = null, r = 0, s = null, o = e === fe ? 0 : 1, i = !1, l = !1) {
    const a = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && Eo(t),
        ref: t && bn(t),
        scopeId: io,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: o,
        patchFlag: r,
        dynamicProps: s,
        dynamicChildren: null,
        appContext: null,
        ctx: he,
    };
    return l ? (Ir(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= de(n) ? 8 : 16), Zt > 0 && !i && $e && (a.patchFlag > 0 || o & 6) && a.patchFlag !== 32 && $e.push(a), a;
}
const C = Dl;
function Dl(e, t = null, n = null, r = 0, s = null, o = !1) {
    if (((!e || e === Qi) && (e = Je), Cn(e))) {
        const l = _t(e, t, !0);
        return n && Ir(l, n), Zt > 0 && !o && $e && (l.shapeFlag & 6 ? ($e[$e.indexOf(e)] = l) : $e.push(l)), (l.patchFlag |= -2), l;
    }
    if ((Gl(e) && (e = e.__vccOpts), t)) {
        t = Mo(t);
        let { class: l, style: a } = t;
        l && !de(l) && (t.class = le(l)), ie(a) && (Ys(a) && !D(a) && (a = ge({}, a)), (t.style = Mn(a)));
    }
    const i = de(e) ? 1 : tl(e) ? 128 : Ll(e) ? 64 : ie(e) ? 4 : U(e) ? 2 : 0;
    return S(e, t, n, r, s, i, o, !0);
}
function Mo(e) {
    return e ? (Ys(e) || yo(e) ? ge({}, e) : e) : null;
}
function _t(e, t, n = !1, r = !1) {
    const { props: s, ref: o, patchFlag: i, children: l, transition: a } = e,
        u = t ? Mt(s || {}, t) : s,
        f = {
            __v_isVNode: !0,
            __v_skip: !0,
            type: e.type,
            props: u,
            key: u && Eo(u),
            ref: t && t.ref ? (n && o ? (D(o) ? o.concat(bn(t)) : [o, bn(t)]) : bn(t)) : o,
            scopeId: e.scopeId,
            slotScopeIds: e.slotScopeIds,
            children: l,
            target: e.target,
            targetAnchor: e.targetAnchor,
            staticCount: e.staticCount,
            shapeFlag: e.shapeFlag,
            patchFlag: t && e.type !== fe ? (i === -1 ? 16 : i | 16) : i,
            dynamicProps: e.dynamicProps,
            dynamicChildren: e.dynamicChildren,
            appContext: e.appContext,
            dirs: e.dirs,
            transition: a,
            component: e.component,
            suspense: e.suspense,
            ssContent: e.ssContent && _t(e.ssContent),
            ssFallback: e.ssFallback && _t(e.ssFallback),
            el: e.el,
            anchor: e.anchor,
            ctx: e.ctx,
            ce: e.ce,
        };
    return a && r && (f.transition = a.clone(f)), f;
}
function G(e = " ", t = 0) {
    return C(Dn, null, e, t);
}
function kr(e, t) {
    const n = C(gn, null, e);
    return (n.staticCount = t), n;
}
function St(e = "", t = !1) {
    return t ? (R(), xe(Je, null, e)) : C(Je, null, e);
}
function He(e) {
    return e == null || typeof e == "boolean" ? C(Je) : D(e) ? C(fe, null, e.slice()) : typeof e == "object" ? rt(e) : C(Dn, null, String(e));
}
function rt(e) {
    return (e.el === null && e.patchFlag !== -1) || e.memo ? e : _t(e);
}
function Ir(e, t) {
    let n = 0;
    const { shapeFlag: r } = e;
    if (t == null) t = null;
    else if (D(t)) n = 16;
    else if (typeof t == "object")
        if (r & 65) {
            const s = t.default;
            s && (s._c && (s._d = !1), Ir(e, s()), s._c && (s._d = !0));
            return;
        } else {
            n = 32;
            const s = t._;
            !s && !yo(t) ? (t._ctx = he) : s === 3 && he && (he.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
        }
    else U(t) ? ((t = { default: t, _ctx: he }), (n = 32)) : ((t = String(t)), r & 64 ? ((n = 16), (t = [G(t)])) : (n = 8));
    (e.children = t), (e.shapeFlag |= n);
}
function Mt(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        for (const s in r)
            if (s === "class") t.class !== r.class && (t.class = le([t.class, r.class]));
            else if (s === "style") t.style = Mn([t.style, r.style]);
            else if (An(s)) {
                const o = t[s],
                    i = r[s];
                i && o !== i && !(D(o) && o.includes(i)) && (t[s] = o ? [].concat(o, i) : i);
            } else s !== "" && (t[s] = r[s]);
    }
    return t;
}
function ze(e, t, n, r = null) {
    Ve(e, t, 7, [n, r]);
}
const jl = go();
let $l = 0;
function Vl(e, t, n) {
    const r = e.type,
        s = (t ? t.appContext : e.appContext) || jl,
        o = {
            uid: $l++,
            vnode: e,
            type: r,
            parent: t,
            appContext: s,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new Ds(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(s.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: xo(r, s),
            emitsOptions: oo(r, s),
            emit: null,
            emitted: null,
            propsDefaults: oe,
            inheritAttrs: r.inheritAttrs,
            ctx: oe,
            data: oe,
            props: oe,
            attrs: oe,
            slots: oe,
            refs: oe,
            setupState: oe,
            setupContext: null,
            attrsProxy: null,
            slotsProxy: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null,
        };
    return (o.ctx = { _: o }), (o.root = t ? t.root : o), (o.emit = qi.bind(null, o)), e.ce && e.ce(o), o;
}
let _e = null;
const Rt = () => _e || he;
let Sn, ir;
{
    const e = Ps(),
        t = (n, r) => {
            let s;
            return (
                (s = e[n]) || (s = e[n] = []),
                s.push(r),
                (o) => {
                    s.length > 1 ? s.forEach((i) => i(o)) : s[0](o);
                }
            );
        };
    (Sn = t("__VUE_INSTANCE_SETTERS__", (n) => (_e = n))), (ir = t("__VUE_SSR_SETTERS__", (n) => (jn = n)));
}
const en = (e) => {
        const t = _e;
        return (
            Sn(e),
            e.scope.on(),
            () => {
                e.scope.off(), Sn(t);
            }
        );
    },
    ls = () => {
        _e && _e.scope.off(), Sn(null);
    };
function Ro(e) {
    return e.vnode.shapeFlag & 4;
}
let jn = !1;
function Ul(e, t = !1) {
    t && ir(t);
    const { props: n, children: r } = e.vnode,
        s = Ro(e);
    Tl(e, n, s, t), Il(e, r);
    const o = s ? Fl(e, t) : void 0;
    return t && ir(!1), o;
}
function Fl(e, t) {
    const n = e.type;
    (e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, bl));
    const { setup: r } = n;
    if (r) {
        const s = (e.setupContext = r.length > 1 ? zl(e) : null),
            o = en(e);
        at();
        const i = it(r, e, 0, [e.props, s]);
        if ((ct(), o(), Es(i))) {
            if ((i.then(ls, ls), t))
                return i
                    .then((l) => {
                        as(e, l, t);
                    })
                    .catch((l) => {
                        Pn(l, e, 0);
                    });
            e.asyncDep = i;
        } else as(e, i, t);
    } else Oo(e, t);
}
function as(e, t, n) {
    U(t) ? (e.type.__ssrInlineRender ? (e.ssrRender = t) : (e.render = t)) : ie(t) && (e.setupState = Zs(t)), Oo(e, n);
}
let cs;
function Oo(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && cs && !r.render) {
            const s = r.template || Tr(e).template;
            if (s) {
                const { isCustomElement: o, compilerOptions: i } = e.appContext.config,
                    { delimiters: l, compilerOptions: a } = r,
                    u = ge(ge({ isCustomElement: o, delimiters: l }, i), a);
                r.render = cs(s, u);
            }
        }
        e.render = r.render || Pe;
    }
    {
        const s = en(e);
        at();
        try {
            vl(e);
        } finally {
            ct(), s();
        }
    }
}
const Bl = {
    get(e, t) {
        return Ie(e, "get", ""), e[t];
    },
};
function zl(e) {
    const t = (n) => {
        e.exposed = n || {};
    };
    return { attrs: new Proxy(e.attrs, Bl), slots: e.slots, emit: e.emit, expose: t };
}
function $n(e) {
    if (e.exposed)
        return (
            e.exposeProxy ||
            (e.exposeProxy = new Proxy(Zs(Ni(e.exposed)), {
                get(t, n) {
                    if (n in t) return t[n];
                    if (n in Ht) return Ht[n](e);
                },
                has(t, n) {
                    return n in t || n in Ht;
                },
            }))
        );
}
function Hl(e, t = !0) {
    return U(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Gl(e) {
    return U(e) && "__vccOpts" in e;
}
const me = (e, t) => Di(e, t, jn);
function vt(e, t, n) {
    const r = arguments.length;
    return r === 2 ? (ie(t) && !D(t) ? (Cn(t) ? C(e, null, [t]) : C(e, t)) : C(e, null, t)) : (r > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : r === 3 && Cn(n) && (n = [n]), C(e, t, n));
}
const Wl = "3.4.27";
const Kl = "http://www.w3.org/2000/svg",
    ql = "http://www.w3.org/1998/Math/MathML",
    st = typeof document < "u" ? document : null,
    us = st && st.createElement("template"),
    Yl = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null);
        },
        remove: (e) => {
            const t = e.parentNode;
            t && t.removeChild(e);
        },
        createElement: (e, t, n, r) => {
            const s = t === "svg" ? st.createElementNS(Kl, e) : t === "mathml" ? st.createElementNS(ql, e) : st.createElement(e, n ? { is: n } : void 0);
            return e === "select" && r && r.multiple != null && s.setAttribute("multiple", r.multiple), s;
        },
        createText: (e) => st.createTextNode(e),
        createComment: (e) => st.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t;
        },
        setElementText: (e, t) => {
            e.textContent = t;
        },
        parentNode: (e) => e.parentNode,
        nextSibling: (e) => e.nextSibling,
        querySelector: (e) => st.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "");
        },
        insertStaticContent(e, t, n, r, s, o) {
            const i = n ? n.previousSibling : t.lastChild;
            if (s && (s === o || s.nextSibling)) for (; t.insertBefore(s.cloneNode(!0), n), !(s === o || !(s = s.nextSibling)); );
            else {
                us.innerHTML = r === "svg" ? `<svg>${e}</svg>` : r === "mathml" ? `<math>${e}</math>` : e;
                const l = us.content;
                if (r === "svg" || r === "mathml") {
                    const a = l.firstChild;
                    for (; a.firstChild; ) l.appendChild(a.firstChild);
                    l.removeChild(a);
                }
                t.insertBefore(l, n);
            }
            return [i ? i.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
        },
    },
    Xl = Symbol("_vtc");
function Jl(e, t, n) {
    const r = e[Xl];
    r && (t = (t ? [t, ...r] : [...r]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : (e.className = t);
}
const Tn = Symbol("_vod"),
    Po = Symbol("_vsh"),
    Zl = {
        beforeMount(e, { value: t }, { transition: n }) {
            (e[Tn] = e.style.display === "none" ? "" : e.style.display), n && t ? n.beforeEnter(e) : jt(e, t);
        },
        mounted(e, { value: t }, { transition: n }) {
            n && t && n.enter(e);
        },
        updated(e, { value: t, oldValue: n }, { transition: r }) {
            !t != !n &&
                (r
                    ? t
                        ? (r.beforeEnter(e), jt(e, !0), r.enter(e))
                        : r.leave(e, () => {
                              jt(e, !1);
                          })
                    : jt(e, t));
        },
        beforeUnmount(e, { value: t }) {
            jt(e, t);
        },
    };
function jt(e, t) {
    (e.style.display = t ? e[Tn] : "none"), (e[Po] = !t);
}
const Ql = Symbol(""),
    ea = /(^|;)\s*display\s*:/;
function ta(e, t, n) {
    const r = e.style,
        s = de(n);
    let o = !1;
    if (n && !s) {
        if (t)
            if (de(t))
                for (const i of t.split(";")) {
                    const l = i.slice(0, i.indexOf(":")).trim();
                    n[l] == null && vn(r, l, "");
                }
            else for (const i in t) n[i] == null && vn(r, i, "");
        for (const i in n) i === "display" && (o = !0), vn(r, i, n[i]);
    } else if (s) {
        if (t !== n) {
            const i = r[Ql];
            i && (n += ";" + i), (r.cssText = n), (o = ea.test(n));
        }
    } else t && e.removeAttribute("style");
    Tn in e && ((e[Tn] = o ? r.display : ""), e[Po] && (r.display = "none"));
}
const ds = /\s*!important$/;
function vn(e, t, n) {
    if (D(n)) n.forEach((r) => vn(e, t, r));
    else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
    else {
        const r = na(e, t);
        ds.test(n) ? e.setProperty(wt(r), n.replace(ds, ""), "important") : (e[r] = n);
    }
}
const fs = ["Webkit", "Moz", "ms"],
    Kn = {};
function na(e, t) {
    const n = Kn[t];
    if (n) return n;
    let r = Ne(t);
    if (r !== "filter" && r in e) return (Kn[t] = r);
    r = En(r);
    for (let s = 0; s < fs.length; s++) {
        const o = fs[s] + r;
        if (o in e) return (Kn[t] = o);
    }
    return t;
}
const hs = "http://www.w3.org/1999/xlink";
function ra(e, t, n, r, s) {
    if (r && t.startsWith("xlink:")) n == null ? e.removeAttributeNS(hs, t.slice(6, t.length)) : e.setAttributeNS(hs, t, n);
    else {
        const o = ui(t);
        n == null || (o && !Ls(n)) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n);
    }
}
function sa(e, t, n, r, s, o, i) {
    if (t === "innerHTML" || t === "textContent") {
        r && i(r, s, o), (e[t] = n ?? "");
        return;
    }
    const l = e.tagName;
    if (t === "value" && l !== "PROGRESS" && !l.includes("-")) {
        const u = l === "OPTION" ? e.getAttribute("value") || "" : e.value,
            f = n ?? "";
        (u !== f || !("_value" in e)) && (e.value = f), n == null && e.removeAttribute(t), (e._value = n);
        return;
    }
    let a = !1;
    if (n === "" || n == null) {
        const u = typeof e[t];
        u === "boolean" ? (n = Ls(n)) : n == null && u === "string" ? ((n = ""), (a = !0)) : u === "number" && ((n = 0), (a = !0));
    }
    try {
        e[t] = n;
    } catch {}
    a && e.removeAttribute(t);
}
function Tt(e, t, n, r) {
    e.addEventListener(t, n, r);
}
function oa(e, t, n, r) {
    e.removeEventListener(t, n, r);
}
const ps = Symbol("_vei");
function ia(e, t, n, r, s = null) {
    const o = e[ps] || (e[ps] = {}),
        i = o[t];
    if (r && i) i.value = r;
    else {
        const [l, a] = la(t);
        if (r) {
            const u = (o[t] = ua(r, s));
            Tt(e, l, u, a);
        } else i && (oa(e, l, i, a), (o[t] = void 0));
    }
}
const ms = /(?:Once|Passive|Capture)$/;
function la(e) {
    let t;
    if (ms.test(e)) {
        t = {};
        let r;
        for (; (r = e.match(ms)); ) (e = e.slice(0, e.length - r[0].length)), (t[r[0].toLowerCase()] = !0);
    }
    return [e[2] === ":" ? e.slice(3) : wt(e.slice(2)), t];
}
let qn = 0;
const aa = Promise.resolve(),
    ca = () => qn || (aa.then(() => (qn = 0)), (qn = Date.now()));
function ua(e, t) {
    const n = (r) => {
        if (!r._vts) r._vts = Date.now();
        else if (r._vts <= n.attached) return;
        Ve(da(r, n.value), t, 5, [r]);
    };
    return (n.value = e), (n.attached = ca()), n;
}
function da(e, t) {
    if (D(t)) {
        const n = e.stopImmediatePropagation;
        return (
            (e.stopImmediatePropagation = () => {
                n.call(e), (e._stopped = !0);
            }),
            t.map((r) => (s) => !s._stopped && r && r(s))
        );
    } else return t;
}
const gs = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123,
    fa = (e, t, n, r, s, o, i, l, a) => {
        const u = s === "svg";
        t === "class" ? Jl(e, r, u) : t === "style" ? ta(e, n, r) : An(t) ? dr(t) || ia(e, t, n, r, i) : (t[0] === "." ? ((t = t.slice(1)), !0) : t[0] === "^" ? ((t = t.slice(1)), !1) : ha(e, t, r, u)) ? sa(e, t, r, o, i, l, a) : (t === "true-value" ? (e._trueValue = r) : t === "false-value" && (e._falseValue = r), ra(e, t, r, u));
    };
function ha(e, t, n, r) {
    if (r) return !!(t === "innerHTML" || t === "textContent" || (t in e && gs(t) && U(n)));
    if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || (t === "list" && e.tagName === "INPUT") || (t === "type" && e.tagName === "TEXTAREA")) return !1;
    if (t === "width" || t === "height") {
        const s = e.tagName;
        if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE") return !1;
    }
    return gs(t) && de(n) ? !1 : t in e;
}
const bs = (e) => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return D(t) ? (n) => pn(t, n) : t;
};
function pa(e) {
    e.target.composing = !0;
}
function vs(e) {
    const t = e.target;
    t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const Yn = Symbol("_assign"),
    ma = {
        created(e, { modifiers: { lazy: t, trim: n, number: r } }, s) {
            e[Yn] = bs(s);
            const o = r || (s.props && s.props.type === "number");
            Tt(e, t ? "change" : "input", (i) => {
                if (i.target.composing) return;
                let l = e.value;
                n && (l = l.trim()), o && (l = Xn(l)), e[Yn](l);
            }),
                n &&
                    Tt(e, "change", () => {
                        e.value = e.value.trim();
                    }),
                t || (Tt(e, "compositionstart", pa), Tt(e, "compositionend", vs), Tt(e, "change", vs));
        },
        mounted(e, { value: t }) {
            e.value = t ?? "";
        },
        beforeUpdate(e, { value: t, modifiers: { lazy: n, trim: r, number: s } }, o) {
            if (((e[Yn] = bs(o)), e.composing)) return;
            const i = (s || e.type === "number") && !/^0\d/.test(e.value) ? Xn(e.value) : e.value,
                l = t ?? "";
            i !== l && ((document.activeElement === e && e.type !== "range" && (n || (r && e.value.trim() === l))) || (e.value = l));
        },
    },
    ga = { esc: "escape", space: " ", up: "arrow-up", left: "arrow-left", right: "arrow-right", down: "arrow-down", delete: "backspace" },
    ba = (e, t) => {
        const n = e._withKeys || (e._withKeys = {}),
            r = t.join(".");
        return (
            n[r] ||
            (n[r] = (s) => {
                if (!("key" in s)) return;
                const o = wt(s.key);
                if (t.some((i) => i === o || ga[i] === o)) return e(s);
            })
        );
    },
    va = ge({ patchProp: fa }, Yl);
let _s;
function _a() {
    return _s || (_s = Ml(va));
}
const ya = (...e) => {
    const t = _a().createApp(...e),
        { mount: n } = t;
    return (
        (t.mount = (r) => {
            const s = xa(r);
            if (!s) return;
            const o = t._component;
            !U(o) && !o.render && !o.template && (o.template = s.innerHTML), (s.innerHTML = "");
            const i = n(s, !1, wa(s));
            return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), i;
        }),
        t
    );
};
function wa(e) {
    if (e instanceof SVGElement) return "svg";
    if (typeof MathMLElement == "function" && e instanceof MathMLElement) return "mathml";
}
function xa(e) {
    return de(e) ? document.querySelector(e) : e;
}
const Ca = { class: "fixed left-0 top-0 -z-50" },
    Sa = kr(
        '<div class="sticky left-0 top-0 h-screen w-screen overflow-hidden"><div class="bg-muted-foreground/20 absolute inset-0 z-[-1]"></div><div class="bg-gradient-radial from-muted-foreground/80 absolute left-[--x] top-[--y] z-[-1] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full from-0% to-transparent to-90% blur-md"></div><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><defs><pattern id="dotted-pattern" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="black"></circle></pattern><mask id="dots-mask"><rect width="100%" height="100%" fill="white"></rect><rect width="100%" height="100%" fill="url(#dotted-pattern)"></rect></mask></defs><rect width="100%" height="100%" fill="hsl(var(--background))" mask="url(#dots-mask)"></rect></svg></div>',
        1,
    ),
    Ta = [Sa],
    Aa = K({
        name: "DotGrid",
        __name: "DotGrid",
        setup(e) {
            return (t, n) => (R(), H("div", Ca, Ta));
        },
    }),
    ka = { key: 0, viewBox: "0 0 15 15", width: "1.2em", height: "1.2em", class: "w-5 h-5 text-foreground" },
    Ia = S(
        "path",
        {
            fill: "currentColor",
            "fill-rule": "evenodd",
            d: "M7.5 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2a.5.5 0 0 1 .5-.5M2.197 2.197a.5.5 0 0 1 .707 0L4.318 3.61a.5.5 0 0 1-.707.707L2.197 2.904a.5.5 0 0 1 0-.707M.5 7a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm1.697 5.803a.5.5 0 0 1 0-.707l1.414-1.414a.5.5 0 1 1 .707.707l-1.414 1.414a.5.5 0 0 1-.707 0M12.5 7a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm-1.818-2.682a.5.5 0 0 1 0-.707l1.414-1.414a.5.5 0 1 1 .707.707L11.39 4.318a.5.5 0 0 1-.707 0M8 12.5a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0zm2.682-1.818a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 1 1-.707.707l-1.414-1.414a.5.5 0 0 1 0-.707M5.5 7.5a2 2 0 1 1 4 0a2 2 0 0 1-4 0m2-3a3 3 0 1 0 0 6a3 3 0 0 0 0-6",
            "clip-rule": "evenodd",
        },
        null,
        -1,
    ),
    Ea = [Ia],
    Ma = { key: 1, viewBox: "0 0 15 15", width: "1.2em", height: "1.2em", class: "w-5 h-5 text-foreground" },
    Ra = S(
        "path",
        {
            fill: "currentColor",
            "fill-rule": "evenodd",
            d: "M2.9.5a.4.4 0 0 0-.8 0v.6h-.6a.4.4 0 1 0 0 .8h.6v.6a.4.4 0 1 0 .8 0v-.6h.6a.4.4 0 0 0 0-.8h-.6zm3 3a.4.4 0 1 0-.8 0v.6h-.6a.4.4 0 1 0 0 .8h.6v.6a.4.4 0 1 0 .8 0v-.6h.6a.4.4 0 0 0 0-.8h-.6zm-4 3a.4.4 0 1 0-.8 0v.6H.5a.4.4 0 1 0 0 .8h.6v.6a.4.4 0 0 0 .8 0v-.6h.6a.4.4 0 0 0 0-.8h-.6zM8.544.982l-.298-.04c-.213-.024-.34.224-.217.4A6.57 6.57 0 0 1 9.203 5.1a6.602 6.602 0 0 1-6.243 6.59c-.214.012-.333.264-.183.417a6.8 6.8 0 0 0 .21.206l.072.066l.26.226l.188.148l.121.09l.187.131l.176.115c.12.076.244.149.37.217l.264.135l.26.12l.303.122l.244.086a6.568 6.568 0 0 0 1.103.26l.317.04l.267.02a6.6 6.6 0 0 0 6.943-7.328l-.037-.277a6.557 6.557 0 0 0-.384-1.415l-.113-.268l-.077-.166l-.074-.148a6.602 6.602 0 0 0-.546-.883l-.153-.2l-.199-.24l-.163-.18l-.12-.124l-.16-.158l-.223-.2l-.32-.26l-.245-.177l-.292-.19l-.321-.186l-.328-.165l-.113-.052l-.24-.101l-.276-.104l-.252-.082l-.325-.09l-.265-.06zm1.86 4.318a7.578 7.578 0 0 0-.572-2.894a5.601 5.601 0 1 1-4.748 10.146a7.61 7.61 0 0 0 3.66-2.51a.749.749 0 0 0 1.355-.442a.75.75 0 0 0-.584-.732c.062-.116.122-.235.178-.355A1.25 1.25 0 1 0 10.35 6.2c.034-.295.052-.595.052-.9",
            "clip-rule": "evenodd",
        },
        null,
        -1,
    ),
    Oa = [Ra],
    Pa = K({
        name: "ToggleButton",
        __name: "ToggleButton",
        setup(e) {
            const t = ve(!1),
                n = () => {
                    (t.value = !t.value), t.value ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark"), window.localStorage.setItem("isDark", t.value.toString());
                };
            return (
                Cr(() => {
                    (window.localStorage.getItem("isDark") ?? "false") === "true" ? ((t.value = !0), document.documentElement.classList.add("dark")) : ((t.value = !1), document.documentElement.classList.remove("dark"));
                }),
                (r, s) => (
                    R(),
                    H(
                        "button",
                        {
                            class: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground w-9 h-9",
                            "aria-label": "Toggle dark mode",
                            onClick: n,
                        },
                        [t.value ? (R(), H("svg", ka, Ea)) : (R(), H("svg", Ma, Oa))],
                    )
                )
            );
        },
    });
function Vn(e, t) {
    const n = typeof e == "string" && !t ? `${e}Context` : t,
        r = Symbol(n);
    return [
        (s) => {
            const o = Wt(r, s);
            if (o || o === null) return o;
            throw new Error(`Injection \`${r.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(", ")}` : `\`${e}\``}`);
        },
        (s) => (bo(r, s), s),
    ];
}
function La(e) {
    let t = !1,
        n;
    const r = di(!0);
    return (...s) => (t || ((n = r.run(() => e(...s))), (t = !0)), n);
}
function Na(e) {
    return typeof e == "function" ? e() : T(e);
}
const Da = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const ja = (e) => typeof e < "u";
function Lo(e) {
    var t;
    const n = Na(e);
    return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
function $a(e) {
    return JSON.parse(JSON.stringify(e));
}
function lr(e, t, n, r = {}) {
    var s, o, i;
    const { clone: l = !1, passive: a = !1, eventName: u, deep: f = !1, defaultValue: h, shouldEmit: m } = r,
        v = Rt(),
        L = n || (v == null ? void 0 : v.emit) || ((s = v == null ? void 0 : v.$emit) == null ? void 0 : s.bind(v)) || ((i = (o = v == null ? void 0 : v.proxy) == null ? void 0 : o.$emit) == null ? void 0 : i.bind(v == null ? void 0 : v.proxy));
    let A = u;
    t || (t = "modelValue"), (A = A || `update:${t.toString()}`);
    const O = (M) => (l ? (typeof l == "function" ? l(M) : $a(M)) : M),
        j = () => (ja(e[t]) ? O(e[t]) : h),
        z = (M) => {
            m ? m(M) && L(A, M) : L(A, M);
        };
    if (a) {
        const M = j(),
            F = ve(M);
        let Q = !1;
        return (
            Le(
                () => e[t],
                ($) => {
                    Q || ((Q = !0), (F.value = O($)), Qt(() => (Q = !1)));
                },
            ),
            Le(
                F,
                ($) => {
                    !Q && ($ !== e[t] || f) && z($);
                },
                { deep: f },
            ),
            F
        );
    } else
        return me({
            get() {
                return j();
            },
            set(M) {
                z(M);
            },
        });
}
function Er(e) {
    return e ? e.flatMap((t) => (t.type === fe ? Er(t.children) : [t])) : [];
}
const Va = ["INPUT", "TEXTAREA"];
function Ua(e, t, n, r = {}) {
    if (!t || (r.enableIgnoredElement && Va.includes(t.nodeName))) return null;
    const { arrowKeyOptions: s = "both", attributeName: o = "[data-radix-vue-collection-item]", itemsArray: i = [], loop: l = !0, dir: a = "ltr", preventScroll: u = !0, focus: f = !1 } = r,
        [h, m, v, L, A, O] = [e.key === "ArrowRight", e.key === "ArrowLeft", e.key === "ArrowUp", e.key === "ArrowDown", e.key === "Home", e.key === "End"],
        j = v || L,
        z = h || m;
    if (!A && !O && ((!j && !z) || (s === "vertical" && z) || (s === "horizontal" && j))) return null;
    const M = n ? Array.from(n.querySelectorAll(o)) : i;
    if (!M.length) return null;
    u && e.preventDefault();
    let F = null;
    return z || j ? (F = No(M, t, { goForward: j ? L : a === "ltr" ? h : m, loop: l })) : A ? (F = M.at(0) || null) : O && (F = M.at(-1) || null), f && (F == null || F.focus()), F;
}
function No(e, t, n, r = e.length) {
    if (--r === 0) return null;
    const s = e.indexOf(t),
        o = n.goForward ? s + 1 : s - 1;
    if (!n.loop && (o < 0 || o >= e.length)) return null;
    const i = (o + e.length) % e.length,
        l = e[i];
    return l ? (l.hasAttribute("disabled") && l.getAttribute("disabled") !== "false" ? No(e, l, n, r) : l) : null;
}
const [Do, Gd] = Vn("ConfigProvider");
function Fa(e) {
    const t = Do({ dir: ve("ltr") });
    return me(() => {
        var n;
        return (e == null ? void 0 : e.value) || ((n = t.dir) == null ? void 0 : n.value) || "ltr";
    });
}
function Ba(e) {
    const t = Rt(),
        n = t == null ? void 0 : t.type.emits,
        r = {};
    return (
        (n != null && n.length) || console.warn(`No emitted event found. Please check component: ${t == null ? void 0 : t.type.__name}`),
        n == null ||
            n.forEach((s) => {
                r[hn(Ne(s))] = (...o) => e(s, ...o);
            }),
        r
    );
}
function jo(e) {
    const t = Rt(),
        n = Object.keys((t == null ? void 0 : t.type.props) ?? {}).reduce((s, o) => {
            const i = (t == null ? void 0 : t.type.props[o]).default;
            return i !== void 0 && (s[o] = i), s;
        }, {}),
        r = Bi(e);
    return me(() => {
        const s = {},
            o = (t == null ? void 0 : t.vnode.props) ?? {};
        return (
            Object.keys(o).forEach((i) => {
                s[Ne(i)] = o[i];
            }),
            Object.keys({ ...n, ...s }).reduce((i, l) => (r.value[l] !== void 0 && (i[l] = r.value[l]), i), {})
        );
    });
}
function za(e, t) {
    const n = jo(e),
        r = t ? Ba(t) : {};
    return me(() => ({ ...n.value, ...r }));
}
function xt() {
    const e = Rt(),
        t = ve(),
        n = me(() => {
            var i, l;
            return ["#text", "#comment"].includes((i = t.value) == null ? void 0 : i.$el.nodeName) ? ((l = t.value) == null ? void 0 : l.$el.nextElementSibling) : Lo(t);
        }),
        r = Object.assign({}, e.exposed),
        s = {};
    for (const i in e.props) Object.defineProperty(s, i, { enumerable: !0, configurable: !0, get: () => e.props[i] });
    if (Object.keys(r).length > 0) for (const i in r) Object.defineProperty(s, i, { enumerable: !0, configurable: !0, get: () => r[i] });
    Object.defineProperty(s, "$el", { enumerable: !0, configurable: !0, get: () => e.vnode.el }), (e.exposed = s);
    function o(i) {
        (t.value = i), !(i instanceof Element || !i) && (Object.defineProperty(s, "$el", { enumerable: !0, configurable: !0, get: () => i.$el }), (e.exposed = s));
    }
    return { forwardRef: o, currentRef: t, currentElement: n };
}
let Ha = 0;
function $o(e, t = "radix") {
    const { useId: n } = Do({ useId: void 0 });
    return n && typeof n == "function" ? `${t}-${n()}` : `${t}-${++Ha}`;
}
function Ga(e, t) {
    const n = ve(e);
    function r(s) {
        return t[n.value][s] ?? n.value;
    }
    return {
        state: n,
        dispatch: (s) => {
            n.value = r(s);
        },
    };
}
const Wa = K({
        name: "PrimitiveSlot",
        inheritAttrs: !1,
        setup(e, { attrs: t, slots: n }) {
            return () => {
                var r, s;
                if (!n.default) return null;
                const o = Er(n.default()),
                    i = o.findIndex((f) => f.type !== Je);
                if (i === -1) return o;
                const l = o[i];
                (r = l.props) == null || delete r.ref;
                const a = l.props ? Mt(t, l.props) : t;
                t.class && (s = l.props) != null && s.class && delete l.props.class;
                const u = _t(l, a);
                for (const f in a) f.startsWith("on") && (u.props || (u.props = {}), (u.props[f] = a[f]));
                return o.length === 1 ? u : ((o[i] = u), o);
            };
        },
    }),
    Ot = K({
        name: "Primitive",
        inheritAttrs: !1,
        props: { asChild: { type: Boolean, default: !1 }, as: { type: [String, Object], default: "div" } },
        setup(e, { attrs: t, slots: n }) {
            const r = e.asChild ? "template" : e.as;
            return typeof r == "string" && ["area", "img", "input"].includes(r) ? () => vt(r, t) : r !== "template" ? () => vt(e.as, t, { default: n.default }) : () => vt(Wa, t, { default: n.default });
        },
    }),
    [Vo, Ka] = Vn("CollapsibleRoot"),
    qa = K({
        __name: "CollapsibleRoot",
        props: { defaultOpen: { type: Boolean, default: !1 }, open: { type: Boolean, default: void 0 }, disabled: { type: Boolean }, asChild: { type: Boolean }, as: {} },
        emits: ["update:open"],
        setup(e, { expose: t, emit: n }) {
            const r = e,
                s = lr(r, "open", n, { defaultValue: r.defaultOpen, passive: r.open === void 0 }),
                o = lr(r, "disabled");
            return (
                Ka({
                    contentId: "",
                    disabled: o,
                    open: s,
                    onOpenToggle: () => {
                        s.value = !s.value;
                    },
                }),
                t({ open: s }),
                xt(),
                (i, l) => (R(), xe(T(Ot), { as: i.as, "as-child": r.asChild, "data-state": r.open ? "open" : "closed", "data-disabled": r.disabled ? "" : void 0 }, { default: I(() => [Z(i.$slots, "default", { open: T(s) })]), _: 3 }, 8, ["as", "as-child", "data-state", "data-disabled"]))
            );
        },
    }),
    Ya = K({
        __name: "CollapsibleTrigger",
        props: { asChild: { type: Boolean }, as: { default: "button" } },
        setup(e) {
            const t = e;
            xt();
            const n = Vo();
            return (r, s) => {
                var o, i;
                return (
                    R(),
                    xe(
                        T(Ot),
                        {
                            type: r.as === "button" ? "button" : void 0,
                            as: r.as,
                            "as-child": t.asChild,
                            "aria-controls": T(n).contentId,
                            "aria-expanded": T(n).open.value,
                            "data-state": T(n).open.value ? "open" : "closed",
                            "data-disabled": (o = T(n).disabled) != null && o.value ? "" : void 0,
                            disabled: (i = T(n).disabled) == null ? void 0 : i.value,
                            onClick: T(n).onOpenToggle,
                        },
                        { default: I(() => [Z(r.$slots, "default")]), _: 3 },
                        8,
                        ["type", "as", "as-child", "aria-controls", "aria-expanded", "data-state", "data-disabled", "disabled", "onClick"],
                    )
                );
            };
        },
    });
function Xa(e, t) {
    const n = ve({}),
        r = ve("none"),
        s = e.value ? "mounted" : "unmounted",
        { state: o, dispatch: i } = Ga(s, { mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" }, unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" }, unmounted: { MOUNT: "mounted" } }),
        l = (m) => {
            var v;
            if (Da) {
                const L = new CustomEvent(m, { bubbles: !1, cancelable: !1 });
                (v = t.value) == null || v.dispatchEvent(L);
            }
        };
    Le(
        e,
        async (m, v) => {
            var L;
            const A = v !== m;
            if ((await Qt(), A)) {
                const O = r.value,
                    j = cn(t.value);
                m ? (i("MOUNT"), l("enter"), j === "none" && l("after-enter")) : j === "none" || ((L = n.value) == null ? void 0 : L.display) === "none" ? (i("UNMOUNT"), l("leave"), l("after-leave")) : v && O !== j ? (i("ANIMATION_OUT"), l("leave")) : (i("UNMOUNT"), l("after-leave"));
            }
        },
        { immediate: !0 },
    );
    const a = (m) => {
            const v = cn(t.value),
                L = v.includes(m.animationName),
                A = o.value === "mounted" ? "enter" : "leave";
            m.target === t.value && L && (l(`after-${A}`), i("ANIMATION_END")), m.target === t.value && v === "none" && i("ANIMATION_END");
        },
        u = (m) => {
            m.target === t.value && (r.value = cn(t.value));
        },
        f = Le(
            t,
            (m, v) => {
                m
                    ? ((n.value = getComputedStyle(m)), m.addEventListener("animationstart", u), m.addEventListener("animationcancel", a), m.addEventListener("animationend", a))
                    : (i("ANIMATION_END"), v == null || v.removeEventListener("animationstart", u), v == null || v.removeEventListener("animationcancel", a), v == null || v.removeEventListener("animationend", a));
            },
            { immediate: !0 },
        ),
        h = Le(o, () => {
            const m = cn(t.value);
            r.value = o.value === "mounted" ? m : "none";
        });
    return (
        Sr(() => {
            f(), h();
        }),
        { isPresent: me(() => ["mounted", "unmountSuspended"].includes(o.value)) }
    );
}
function cn(e) {
    return (e && getComputedStyle(e).animationName) || "none";
}
const Ja = K({
        name: "Presence",
        props: { present: { type: Boolean, required: !0 }, forceMount: { type: Boolean } },
        slots: {},
        setup(e, { slots: t, expose: n }) {
            var r;
            const { present: s, forceMount: o } = Qs(e),
                i = ve(),
                { isPresent: l } = Xa(s, i);
            n({ present: l });
            let a = t.default({ present: l });
            a = Er(a || []);
            const u = Rt();
            if (a && (a == null ? void 0 : a.length) > 1) {
                const f = (r = u == null ? void 0 : u.parent) != null && r.type.name ? `<${u.parent.type.name} />` : "component";
                throw new Error(
                    [
                        `Detected an invalid children for \`${f}\` for  \`Presence\` component.`,
                        "",
                        "Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.",
                        "You can apply a few solutions:",
                        ["Provide a single child element so that `presence` directive attach correctly.", "Ensure the first child is an actual element instead of a raw text node or comment node."].map((h) => `  - ${h}`).join(`
`),
                    ].join(`
`),
                );
            }
            return () =>
                o.value || s.value || l.value
                    ? vt(t.default({ present: l })[0], {
                          ref: (f) => {
                              const h = Lo(f);
                              return typeof (h == null ? void 0 : h.hasAttribute) > "u" || (h != null && h.hasAttribute("data-radix-popper-content-wrapper") ? (i.value = h.firstElementChild) : (i.value = h)), h;
                          },
                      })
                    : null;
        },
    }),
    Za = K({
        inheritAttrs: !1,
        __name: "CollapsibleContent",
        props: { forceMount: { type: Boolean }, asChild: { type: Boolean }, as: {} },
        setup(e) {
            const t = e,
                n = Vo();
            n.contentId || (n.contentId = $o(void 0, "radix-vue-collapsible-content"));
            const r = ve(),
                { forwardRef: s, currentElement: o } = xt(),
                i = ve(0),
                l = ve(0),
                a = me(() => n.open.value),
                u = ve(a.value),
                f = ve();
            return (
                Le(
                    () => {
                        var h;
                        return [a.value, (h = r.value) == null ? void 0 : h.present];
                    },
                    async () => {
                        await Qt();
                        const h = o.value;
                        if (!h) return;
                        (f.value = f.value || { transitionDuration: h.style.transitionDuration, animationName: h.style.animationName }), (h.style.transitionDuration = "0s"), (h.style.animationName = "none");
                        const m = h.getBoundingClientRect();
                        (l.value = m.height), (i.value = m.width), u.value || ((h.style.transitionDuration = f.value.transitionDuration), (h.style.animationName = f.value.animationName));
                    },
                    { immediate: !0 },
                ),
                Cr(() => {
                    requestAnimationFrame(() => {
                        u.value = !1;
                    });
                }),
                (h, m) => (
                    R(),
                    xe(
                        T(Ja),
                        { ref_key: "presentRef", ref: r, present: h.forceMount || T(n).open.value, "force-mount": !0 },
                        {
                            default: I(() => {
                                var v, L;
                                return [
                                    C(
                                        T(Ot),
                                        Mt(h.$attrs, {
                                            id: T(n).contentId,
                                            ref: T(s),
                                            "as-child": t.asChild,
                                            as: h.as,
                                            "data-state": T(n).open.value ? "open" : "closed",
                                            "data-disabled": (v = T(n).disabled) != null && v.value ? "" : void 0,
                                            hidden: !((L = r.value) != null && L.present),
                                            style: { "--radix-collapsible-content-height": `${l.value}px`, "--radix-collapsible-content-width": `${i.value}px` },
                                        }),
                                        {
                                            default: I(() => {
                                                var A;
                                                return [(A = r.value) != null && A.present ? Z(h.$slots, "default", { key: 0 }) : St("", !0)];
                                            }),
                                            _: 3,
                                        },
                                        16,
                                        ["id", "as-child", "as", "data-state", "data-disabled", "hidden", "style"],
                                    ),
                                ];
                            }),
                            _: 3,
                        },
                        8,
                        ["present"],
                    )
                )
            );
        },
    });
function Uo({ type: e, defaultValue: t, modelValue: n }) {
    const r = n || t;
    if (!e && !n && !t) throw new Error("Either the `type` or the `value` or `default-value` prop must be defined.");
    if (n !== void 0 && t !== void 0 && typeof n != typeof t)
        throw new Error(`Invalid prop \`value\` of value \`${n}\` supplied, should be the same type as the \`defaultValue\` prop, which is \`${t}\`. The \`value\` prop must be:
  ${
      e === "single"
          ? "- a string"
          : e === "multiple"
            ? "- an array of strings"
            : `- a string
- an array of strings`
  }
  - \`undefined\``);
    const s = n !== void 0 || t !== void 0;
    if (e && s) {
        const o = Array.isArray(n) || Array.isArray(t),
            i = n !== void 0 ? "modelValue" : "defaultValue",
            l = i === "modelValue" ? typeof n : typeof t;
        if (e === "single" && o)
            return (
                console.error(`Invalid prop \`${i}\` of type ${l} supplied with type \`single\`. The \`modelValue\` prop must be a string or \`undefined\`.
You can remove the \`type\` prop to let the component infer the type from the ${i} prop.`),
                "multiple"
            );
        if (e === "multiple" && !o)
            return (
                console.error(`Invalid prop \`${i}\` of type ${l} supplied with type \`multiple\`. The \`modelValue\` prop must be an array of strings or \`undefined\`.
    You can remove the \`type\` prop to let the component infer the type from the ${i} prop.`),
                "single"
            );
    }
    return s ? (Array.isArray(r) ? "multiple" : "single") : e;
}
function Qa({ type: e, defaultValue: t, modelValue: n }) {
    return e || Uo({ type: e, defaultValue: t, modelValue: n });
}
function ec({ type: e, defaultValue: t }) {
    return t !== void 0 ? t : e === "single" ? void 0 : [];
}
function tc(e, t) {
    const n = ve(Qa(e)),
        r = lr(e, "modelValue", t, { defaultValue: ec(e), passive: e.modelValue === void 0 });
    Le(
        () => [e.type, e.modelValue, e.defaultValue],
        () => {
            const i = Uo(e);
            n.value !== i && (n.value = i);
        },
        { immediate: !0 },
    );
    function s(i) {
        if (n.value === "single") r.value = i === r.value ? void 0 : i;
        else {
            const l = r.value || [];
            if (l.includes(i)) {
                const a = l.findIndex((u) => u === i);
                l.splice(a, 1);
            } else l.push(i);
            (r.value = l), t("update:modelValue", r.value);
        }
    }
    const o = me(() => n.value === "single");
    return { modelValue: r, type: n, changeModelValue: s, isSingle: o };
}
const [Un, nc] = Vn("AccordionRoot"),
    rc = K({
        __name: "AccordionRoot",
        props: { collapsible: { type: Boolean, default: !1 }, disabled: { type: Boolean, default: !1 }, dir: {}, orientation: { default: "vertical" }, asChild: { type: Boolean }, as: {}, type: {}, modelValue: {}, defaultValue: {} },
        emits: ["update:modelValue"],
        setup(e, { emit: t }) {
            const n = e,
                r = t,
                { dir: s, disabled: o } = Qs(n),
                i = Fa(s),
                { modelValue: l, changeModelValue: a, isSingle: u } = tc(n, r),
                { forwardRef: f, currentElement: h } = xt();
            return (
                nc({ disabled: o, direction: i, orientation: n.orientation, parentElement: h, isSingle: u, collapsible: n.collapsible, modelValue: l, changeModelValue: a }),
                (m, v) => (R(), xe(T(Ot), { ref: T(f), "as-child": m.asChild, as: m.as }, { default: I(() => [Z(m.$slots, "default", { modelValue: T(l) })]), _: 3 }, 8, ["as-child", "as"]))
            );
        },
    }),
    [Mr, sc] = Vn("AccordionItem"),
    oc = K({
        __name: "AccordionItem",
        props: { disabled: { type: Boolean }, value: {}, asChild: { type: Boolean }, as: {} },
        setup(e, { expose: t }) {
            const n = e,
                r = Un(),
                s = me(() => (r.isSingle.value ? n.value === r.modelValue.value : Array.isArray(r.modelValue.value) && r.modelValue.value.includes(n.value))),
                o = me(() => r.disabled.value || n.disabled || (r.isSingle.value && s.value && !r.collapsible)),
                i = me(() => (o.value ? "" : void 0)),
                l = me(() => (s.value ? "open" : "closed"));
            t({ open: s, dataDisabled: i });
            const { currentRef: a, currentElement: u } = xt();
            sc({ open: s, dataState: l, disabled: o, dataDisabled: i, triggerId: "", currentRef: a, currentElement: u, value: me(() => n.value) });
            function f(h) {
                Ua(h, u.value, r.parentElement.value, { arrowKeyOptions: r.orientation, dir: r.direction.value, focus: !0 });
            }
            return (h, m) => (
                R(),
                xe(T(qa), { "data-orientation": T(r).orientation, "data-disabled": i.value, "data-state": l.value, disabled: o.value, open: s.value, as: n.as, "as-child": n.asChild, onKeydown: ba(f, ["up", "down", "left", "right", "home", "end"]) }, { default: I(() => [Z(h.$slots, "default", { open: s.value })]), _: 3 }, 8, [
                    "data-orientation",
                    "data-disabled",
                    "data-state",
                    "disabled",
                    "open",
                    "as",
                    "as-child",
                ])
            );
        },
    }),
    ic = K({
        __name: "AccordionContent",
        props: { asChild: { type: Boolean }, as: {} },
        setup(e) {
            const t = e,
                n = Un(),
                r = Mr();
            return (
                xt(),
                (s, o) => (
                    R(),
                    xe(
                        T(Za),
                        {
                            role: "region",
                            hidden: !T(r).open.value,
                            "as-child": t.asChild,
                            "aria-labelledby": T(r).triggerId,
                            "data-state": T(r).dataState.value,
                            "data-disabled": T(r).dataDisabled.value,
                            "data-orientation": T(n).orientation,
                            style: { "--radix-accordion-content-width": "var(--radix-collapsible-content-width)", "--radix-accordion-content-height": "var(--radix-collapsible-content-height)" },
                        },
                        { default: I(() => [Z(s.$slots, "default")]), _: 3 },
                        8,
                        ["hidden", "as-child", "aria-labelledby", "data-state", "data-disabled", "data-orientation"],
                    )
                )
            );
        },
    }),
    lc = K({
        __name: "AccordionHeader",
        props: { asChild: { type: Boolean }, as: { default: "h3" } },
        setup(e) {
            const t = e,
                n = Un(),
                r = Mr();
            return xt(), (s, o) => (R(), xe(T(Ot), { as: t.as, "as-child": t.asChild, "data-orientation": T(n).orientation, "data-state": T(r).dataState.value, "data-disabled": T(r).dataDisabled.value }, { default: I(() => [Z(s.$slots, "default")]), _: 3 }, 8, ["as", "as-child", "data-orientation", "data-state", "data-disabled"]));
        },
    }),
    ac = K({
        __name: "AccordionTrigger",
        props: { asChild: { type: Boolean }, as: {} },
        setup(e) {
            const t = e,
                n = Un(),
                r = Mr();
            r.triggerId || (r.triggerId = $o(void 0, "radix-vue-accordion-trigger"));
            function s() {
                r.disabled.value || n.changeModelValue(r.value.value);
            }
            return (o, i) => (
                R(),
                xe(
                    T(Ya),
                    {
                        id: T(r).triggerId,
                        ref: T(r).currentRef,
                        "data-radix-vue-collection-item": "",
                        as: t.as,
                        "as-child": t.asChild,
                        "aria-disabled": T(r).disabled.value || void 0,
                        "aria-expanded": T(r).open.value || !1,
                        "data-disabled": T(r).dataDisabled.value,
                        "data-orientation": T(n).orientation,
                        "data-state": T(r).dataState.value,
                        disabled: T(r).disabled.value,
                        onClick: s,
                    },
                    { default: I(() => [Z(o.$slots, "default")]), _: 3 },
                    8,
                    ["id", "as", "as-child", "aria-disabled", "aria-expanded", "data-disabled", "data-orientation", "data-state", "disabled"],
                )
            );
        },
    });
On({ layersRoot: new Set(), layersWithOutsidePointerEventsDisabled: new Set(), branches: new Set() });
La(() => ve([]));
function cc() {
    if (typeof matchMedia == "function") return matchMedia("(pointer:coarse)").matches ? "coarse" : "fine";
}
cc();
const uc = K({
    __name: "Accordion",
    props: { collapsible: { type: Boolean }, disabled: { type: Boolean }, dir: {}, orientation: {}, asChild: { type: Boolean }, as: {}, type: {}, modelValue: {}, defaultValue: {} },
    emits: ["update:modelValue"],
    setup(e, { emit: t }) {
        const s = za(e, t);
        return (o, i) => (R(), xe(T(rc), ai(Mo(T(s))), { default: I(() => [Z(o.$slots, "default")]), _: 3 }, 16));
    },
});
function Fo(e) {
    var t,
        n,
        r = "";
    if (typeof e == "string" || typeof e == "number") r += e;
    else if (typeof e == "object")
        if (Array.isArray(e)) {
            var s = e.length;
            for (t = 0; t < s; t++) e[t] && (n = Fo(e[t])) && (r && (r += " "), (r += n));
        } else for (n in e) e[n] && (r && (r += " "), (r += n));
    return r;
}
function dc() {
    for (var e, t, n = 0, r = "", s = arguments.length; n < s; n++) (e = arguments[n]) && (t = Fo(e)) && (r && (r += " "), (r += t));
    return r;
}
const Rr = "-";
function fc(e) {
    const t = pc(e),
        { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
    function s(i) {
        const l = i.split(Rr);
        return l[0] === "" && l.length !== 1 && l.shift(), Bo(l, t) || hc(i);
    }
    function o(i, l) {
        const a = n[i] || [];
        return l && r[i] ? [...a, ...r[i]] : a;
    }
    return { getClassGroupId: s, getConflictingClassGroupIds: o };
}
function Bo(e, t) {
    var i;
    if (e.length === 0) return t.classGroupId;
    const n = e[0],
        r = t.nextPart.get(n),
        s = r ? Bo(e.slice(1), r) : void 0;
    if (s) return s;
    if (t.validators.length === 0) return;
    const o = e.join(Rr);
    return (i = t.validators.find(({ validator: l }) => l(o))) == null ? void 0 : i.classGroupId;
}
const ys = /^\[(.+)\]$/;
function hc(e) {
    if (ys.test(e)) {
        const t = ys.exec(e)[1],
            n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
        if (n) return "arbitrary.." + n;
    }
}
function pc(e) {
    const { theme: t, prefix: n } = e,
        r = { nextPart: new Map(), validators: [] };
    return (
        gc(Object.entries(e.classGroups), n).forEach(([o, i]) => {
            ar(i, r, o, t);
        }),
        r
    );
}
function ar(e, t, n, r) {
    e.forEach((s) => {
        if (typeof s == "string") {
            const o = s === "" ? t : ws(t, s);
            o.classGroupId = n;
            return;
        }
        if (typeof s == "function") {
            if (mc(s)) {
                ar(s(r), t, n, r);
                return;
            }
            t.validators.push({ validator: s, classGroupId: n });
            return;
        }
        Object.entries(s).forEach(([o, i]) => {
            ar(i, ws(t, o), n, r);
        });
    });
}
function ws(e, t) {
    let n = e;
    return (
        t.split(Rr).forEach((r) => {
            n.nextPart.has(r) || n.nextPart.set(r, { nextPart: new Map(), validators: [] }), (n = n.nextPart.get(r));
        }),
        n
    );
}
function mc(e) {
    return e.isThemeGetter;
}
function gc(e, t) {
    return t
        ? e.map(([n, r]) => {
              const s = r.map((o) => (typeof o == "string" ? t + o : typeof o == "object" ? Object.fromEntries(Object.entries(o).map(([i, l]) => [t + i, l])) : o));
              return [n, s];
          })
        : e;
}
function bc(e) {
    if (e < 1) return { get: () => {}, set: () => {} };
    let t = 0,
        n = new Map(),
        r = new Map();
    function s(o, i) {
        n.set(o, i), t++, t > e && ((t = 0), (r = n), (n = new Map()));
    }
    return {
        get(o) {
            let i = n.get(o);
            if (i !== void 0) return i;
            if ((i = r.get(o)) !== void 0) return s(o, i), i;
        },
        set(o, i) {
            n.has(o) ? n.set(o, i) : s(o, i);
        },
    };
}
const zo = "!";
function vc(e) {
    const t = e.separator,
        n = t.length === 1,
        r = t[0],
        s = t.length;
    return function (i) {
        const l = [];
        let a = 0,
            u = 0,
            f;
        for (let A = 0; A < i.length; A++) {
            let O = i[A];
            if (a === 0) {
                if (O === r && (n || i.slice(A, A + s) === t)) {
                    l.push(i.slice(u, A)), (u = A + s);
                    continue;
                }
                if (O === "/") {
                    f = A;
                    continue;
                }
            }
            O === "[" ? a++ : O === "]" && a--;
        }
        const h = l.length === 0 ? i : i.substring(u),
            m = h.startsWith(zo),
            v = m ? h.substring(1) : h,
            L = f && f > u ? f - u : void 0;
        return { modifiers: l, hasImportantModifier: m, baseClassName: v, maybePostfixModifierPosition: L };
    };
}
function _c(e) {
    if (e.length <= 1) return e;
    const t = [];
    let n = [];
    return (
        e.forEach((r) => {
            r[0] === "[" ? (t.push(...n.sort(), r), (n = [])) : n.push(r);
        }),
        t.push(...n.sort()),
        t
    );
}
function yc(e) {
    return { cache: bc(e.cacheSize), splitModifiers: vc(e), ...fc(e) };
}
const wc = /\s+/;
function xc(e, t) {
    const { splitModifiers: n, getClassGroupId: r, getConflictingClassGroupIds: s } = t,
        o = new Set();
    return e
        .trim()
        .split(wc)
        .map((i) => {
            const { modifiers: l, hasImportantModifier: a, baseClassName: u, maybePostfixModifierPosition: f } = n(i);
            let h = r(f ? u.substring(0, f) : u),
                m = !!f;
            if (!h) {
                if (!f) return { isTailwindClass: !1, originalClassName: i };
                if (((h = r(u)), !h)) return { isTailwindClass: !1, originalClassName: i };
                m = !1;
            }
            const v = _c(l).join(":");
            return { isTailwindClass: !0, modifierId: a ? v + zo : v, classGroupId: h, originalClassName: i, hasPostfixModifier: m };
        })
        .reverse()
        .filter((i) => {
            if (!i.isTailwindClass) return !0;
            const { modifierId: l, classGroupId: a, hasPostfixModifier: u } = i,
                f = l + a;
            return o.has(f) ? !1 : (o.add(f), s(a, u).forEach((h) => o.add(l + h)), !0);
        })
        .reverse()
        .map((i) => i.originalClassName)
        .join(" ");
}
function Cc() {
    let e = 0,
        t,
        n,
        r = "";
    for (; e < arguments.length; ) (t = arguments[e++]) && (n = Ho(t)) && (r && (r += " "), (r += n));
    return r;
}
function Ho(e) {
    if (typeof e == "string") return e;
    let t,
        n = "";
    for (let r = 0; r < e.length; r++) e[r] && (t = Ho(e[r])) && (n && (n += " "), (n += t));
    return n;
}
function Sc(e, ...t) {
    let n,
        r,
        s,
        o = i;
    function i(a) {
        const u = t.reduce((f, h) => h(f), e());
        return (n = yc(u)), (r = n.cache.get), (s = n.cache.set), (o = l), l(a);
    }
    function l(a) {
        const u = r(a);
        if (u) return u;
        const f = xc(a, n);
        return s(a, f), f;
    }
    return function () {
        return o(Cc.apply(null, arguments));
    };
}
function se(e) {
    const t = (n) => n[e] || [];
    return (t.isThemeGetter = !0), t;
}
const Go = /^\[(?:([a-z-]+):)?(.+)\]$/i,
    Tc = /^\d+\/\d+$/,
    Ac = new Set(["px", "full", "screen"]),
    kc = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
    Ic = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
    Ec = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
    Mc = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
    Rc = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
function Ye(e) {
    return mt(e) || Ac.has(e) || Tc.test(e);
}
function et(e) {
    return Pt(e, "length", Vc);
}
function mt(e) {
    return !!e && !Number.isNaN(Number(e));
}
function un(e) {
    return Pt(e, "number", mt);
}
function $t(e) {
    return !!e && Number.isInteger(Number(e));
}
function Oc(e) {
    return e.endsWith("%") && mt(e.slice(0, -1));
}
function B(e) {
    return Go.test(e);
}
function tt(e) {
    return kc.test(e);
}
const Pc = new Set(["length", "size", "percentage"]);
function Lc(e) {
    return Pt(e, Pc, Wo);
}
function Nc(e) {
    return Pt(e, "position", Wo);
}
const Dc = new Set(["image", "url"]);
function jc(e) {
    return Pt(e, Dc, Fc);
}
function $c(e) {
    return Pt(e, "", Uc);
}
function Vt() {
    return !0;
}
function Pt(e, t, n) {
    const r = Go.exec(e);
    return r ? (r[1] ? (typeof t == "string" ? r[1] === t : t.has(r[1])) : n(r[2])) : !1;
}
function Vc(e) {
    return Ic.test(e) && !Ec.test(e);
}
function Wo() {
    return !1;
}
function Uc(e) {
    return Mc.test(e);
}
function Fc(e) {
    return Rc.test(e);
}
function Bc() {
    const e = se("colors"),
        t = se("spacing"),
        n = se("blur"),
        r = se("brightness"),
        s = se("borderColor"),
        o = se("borderRadius"),
        i = se("borderSpacing"),
        l = se("borderWidth"),
        a = se("contrast"),
        u = se("grayscale"),
        f = se("hueRotate"),
        h = se("invert"),
        m = se("gap"),
        v = se("gradientColorStops"),
        L = se("gradientColorStopPositions"),
        A = se("inset"),
        O = se("margin"),
        j = se("opacity"),
        z = se("padding"),
        M = se("saturate"),
        F = se("scale"),
        Q = se("sepia"),
        $ = se("skew"),
        be = se("space"),
        Ce = se("translate"),
        We = () => ["auto", "contain", "none"],
        Se = () => ["auto", "hidden", "clip", "visible", "scroll"],
        Ee = () => ["auto", B, t],
        q = () => [B, t],
        Ke = () => ["", Ye, et],
        Ue = () => ["auto", mt, B],
        ce = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"],
        ee = () => ["solid", "dashed", "dotted", "double", "none"],
        te = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"],
        J = () => ["start", "end", "center", "between", "around", "evenly", "stretch"],
        Me = () => ["", "0", B],
        ut = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
        Re = () => [mt, un],
        Te = () => [mt, B];
    return {
        cacheSize: 500,
        separator: ":",
        theme: {
            colors: [Vt],
            spacing: [Ye, et],
            blur: ["none", "", tt, B],
            brightness: Re(),
            borderColor: [e],
            borderRadius: ["none", "", "full", tt, B],
            borderSpacing: q(),
            borderWidth: Ke(),
            contrast: Re(),
            grayscale: Me(),
            hueRotate: Te(),
            invert: Me(),
            gap: q(),
            gradientColorStops: [e],
            gradientColorStopPositions: [Oc, et],
            inset: Ee(),
            margin: Ee(),
            opacity: Re(),
            padding: q(),
            saturate: Re(),
            scale: Re(),
            sepia: Me(),
            skew: Te(),
            space: q(),
            translate: q(),
        },
        classGroups: {
            aspect: [{ aspect: ["auto", "square", "video", B] }],
            container: ["container"],
            columns: [{ columns: [tt] }],
            "break-after": [{ "break-after": ut() }],
            "break-before": [{ "break-before": ut() }],
            "break-inside": [{ "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] }],
            "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
            box: [{ box: ["border", "content"] }],
            display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
            float: [{ float: ["right", "left", "none", "start", "end"] }],
            clear: [{ clear: ["left", "right", "both", "none", "start", "end"] }],
            isolation: ["isolate", "isolation-auto"],
            "object-fit": [{ object: ["contain", "cover", "fill", "none", "scale-down"] }],
            "object-position": [{ object: [...ce(), B] }],
            overflow: [{ overflow: Se() }],
            "overflow-x": [{ "overflow-x": Se() }],
            "overflow-y": [{ "overflow-y": Se() }],
            overscroll: [{ overscroll: We() }],
            "overscroll-x": [{ "overscroll-x": We() }],
            "overscroll-y": [{ "overscroll-y": We() }],
            position: ["static", "fixed", "absolute", "relative", "sticky"],
            inset: [{ inset: [A] }],
            "inset-x": [{ "inset-x": [A] }],
            "inset-y": [{ "inset-y": [A] }],
            start: [{ start: [A] }],
            end: [{ end: [A] }],
            top: [{ top: [A] }],
            right: [{ right: [A] }],
            bottom: [{ bottom: [A] }],
            left: [{ left: [A] }],
            visibility: ["visible", "invisible", "collapse"],
            z: [{ z: ["auto", $t, B] }],
            basis: [{ basis: Ee() }],
            "flex-direction": [{ flex: ["row", "row-reverse", "col", "col-reverse"] }],
            "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
            flex: [{ flex: ["1", "auto", "initial", "none", B] }],
            grow: [{ grow: Me() }],
            shrink: [{ shrink: Me() }],
            order: [{ order: ["first", "last", "none", $t, B] }],
            "grid-cols": [{ "grid-cols": [Vt] }],
            "col-start-end": [{ col: ["auto", { span: ["full", $t, B] }, B] }],
            "col-start": [{ "col-start": Ue() }],
            "col-end": [{ "col-end": Ue() }],
            "grid-rows": [{ "grid-rows": [Vt] }],
            "row-start-end": [{ row: ["auto", { span: [$t, B] }, B] }],
            "row-start": [{ "row-start": Ue() }],
            "row-end": [{ "row-end": Ue() }],
            "grid-flow": [{ "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] }],
            "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", B] }],
            "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", B] }],
            gap: [{ gap: [m] }],
            "gap-x": [{ "gap-x": [m] }],
            "gap-y": [{ "gap-y": [m] }],
            "justify-content": [{ justify: ["normal", ...J()] }],
            "justify-items": [{ "justify-items": ["start", "end", "center", "stretch"] }],
            "justify-self": [{ "justify-self": ["auto", "start", "end", "center", "stretch"] }],
            "align-content": [{ content: ["normal", ...J(), "baseline"] }],
            "align-items": [{ items: ["start", "end", "center", "baseline", "stretch"] }],
            "align-self": [{ self: ["auto", "start", "end", "center", "stretch", "baseline"] }],
            "place-content": [{ "place-content": [...J(), "baseline"] }],
            "place-items": [{ "place-items": ["start", "end", "center", "baseline", "stretch"] }],
            "place-self": [{ "place-self": ["auto", "start", "end", "center", "stretch"] }],
            p: [{ p: [z] }],
            px: [{ px: [z] }],
            py: [{ py: [z] }],
            ps: [{ ps: [z] }],
            pe: [{ pe: [z] }],
            pt: [{ pt: [z] }],
            pr: [{ pr: [z] }],
            pb: [{ pb: [z] }],
            pl: [{ pl: [z] }],
            m: [{ m: [O] }],
            mx: [{ mx: [O] }],
            my: [{ my: [O] }],
            ms: [{ ms: [O] }],
            me: [{ me: [O] }],
            mt: [{ mt: [O] }],
            mr: [{ mr: [O] }],
            mb: [{ mb: [O] }],
            ml: [{ ml: [O] }],
            "space-x": [{ "space-x": [be] }],
            "space-x-reverse": ["space-x-reverse"],
            "space-y": [{ "space-y": [be] }],
            "space-y-reverse": ["space-y-reverse"],
            w: [{ w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", B, t] }],
            "min-w": [{ "min-w": [B, t, "min", "max", "fit"] }],
            "max-w": [{ "max-w": [B, t, "none", "full", "min", "max", "fit", "prose", { screen: [tt] }, tt] }],
            h: [{ h: [B, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"] }],
            "min-h": [{ "min-h": [B, t, "min", "max", "fit", "svh", "lvh", "dvh"] }],
            "max-h": [{ "max-h": [B, t, "min", "max", "fit", "svh", "lvh", "dvh"] }],
            size: [{ size: [B, t, "auto", "min", "max", "fit"] }],
            "font-size": [{ text: ["base", tt, et] }],
            "font-smoothing": ["antialiased", "subpixel-antialiased"],
            "font-style": ["italic", "not-italic"],
            "font-weight": [{ font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", un] }],
            "font-family": [{ font: [Vt] }],
            "fvn-normal": ["normal-nums"],
            "fvn-ordinal": ["ordinal"],
            "fvn-slashed-zero": ["slashed-zero"],
            "fvn-figure": ["lining-nums", "oldstyle-nums"],
            "fvn-spacing": ["proportional-nums", "tabular-nums"],
            "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
            tracking: [{ tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", B] }],
            "line-clamp": [{ "line-clamp": ["none", mt, un] }],
            leading: [{ leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Ye, B] }],
            "list-image": [{ "list-image": ["none", B] }],
            "list-style-type": [{ list: ["none", "disc", "decimal", B] }],
            "list-style-position": [{ list: ["inside", "outside"] }],
            "placeholder-color": [{ placeholder: [e] }],
            "placeholder-opacity": [{ "placeholder-opacity": [j] }],
            "text-alignment": [{ text: ["left", "center", "right", "justify", "start", "end"] }],
            "text-color": [{ text: [e] }],
            "text-opacity": [{ "text-opacity": [j] }],
            "text-decoration": ["underline", "overline", "line-through", "no-underline"],
            "text-decoration-style": [{ decoration: [...ee(), "wavy"] }],
            "text-decoration-thickness": [{ decoration: ["auto", "from-font", Ye, et] }],
            "underline-offset": [{ "underline-offset": ["auto", Ye, B] }],
            "text-decoration-color": [{ decoration: [e] }],
            "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
            "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
            "text-wrap": [{ text: ["wrap", "nowrap", "balance", "pretty"] }],
            indent: [{ indent: q() }],
            "vertical-align": [{ align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", B] }],
            whitespace: [{ whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"] }],
            break: [{ break: ["normal", "words", "all", "keep"] }],
            hyphens: [{ hyphens: ["none", "manual", "auto"] }],
            content: [{ content: ["none", B] }],
            "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
            "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
            "bg-opacity": [{ "bg-opacity": [j] }],
            "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
            "bg-position": [{ bg: [...ce(), Nc] }],
            "bg-repeat": [{ bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] }],
            "bg-size": [{ bg: ["auto", "cover", "contain", Lc] }],
            "bg-image": [{ bg: ["none", { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] }, jc] }],
            "bg-color": [{ bg: [e] }],
            "gradient-from-pos": [{ from: [L] }],
            "gradient-via-pos": [{ via: [L] }],
            "gradient-to-pos": [{ to: [L] }],
            "gradient-from": [{ from: [v] }],
            "gradient-via": [{ via: [v] }],
            "gradient-to": [{ to: [v] }],
            rounded: [{ rounded: [o] }],
            "rounded-s": [{ "rounded-s": [o] }],
            "rounded-e": [{ "rounded-e": [o] }],
            "rounded-t": [{ "rounded-t": [o] }],
            "rounded-r": [{ "rounded-r": [o] }],
            "rounded-b": [{ "rounded-b": [o] }],
            "rounded-l": [{ "rounded-l": [o] }],
            "rounded-ss": [{ "rounded-ss": [o] }],
            "rounded-se": [{ "rounded-se": [o] }],
            "rounded-ee": [{ "rounded-ee": [o] }],
            "rounded-es": [{ "rounded-es": [o] }],
            "rounded-tl": [{ "rounded-tl": [o] }],
            "rounded-tr": [{ "rounded-tr": [o] }],
            "rounded-br": [{ "rounded-br": [o] }],
            "rounded-bl": [{ "rounded-bl": [o] }],
            "border-w": [{ border: [l] }],
            "border-w-x": [{ "border-x": [l] }],
            "border-w-y": [{ "border-y": [l] }],
            "border-w-s": [{ "border-s": [l] }],
            "border-w-e": [{ "border-e": [l] }],
            "border-w-t": [{ "border-t": [l] }],
            "border-w-r": [{ "border-r": [l] }],
            "border-w-b": [{ "border-b": [l] }],
            "border-w-l": [{ "border-l": [l] }],
            "border-opacity": [{ "border-opacity": [j] }],
            "border-style": [{ border: [...ee(), "hidden"] }],
            "divide-x": [{ "divide-x": [l] }],
            "divide-x-reverse": ["divide-x-reverse"],
            "divide-y": [{ "divide-y": [l] }],
            "divide-y-reverse": ["divide-y-reverse"],
            "divide-opacity": [{ "divide-opacity": [j] }],
            "divide-style": [{ divide: ee() }],
            "border-color": [{ border: [s] }],
            "border-color-x": [{ "border-x": [s] }],
            "border-color-y": [{ "border-y": [s] }],
            "border-color-t": [{ "border-t": [s] }],
            "border-color-r": [{ "border-r": [s] }],
            "border-color-b": [{ "border-b": [s] }],
            "border-color-l": [{ "border-l": [s] }],
            "divide-color": [{ divide: [s] }],
            "outline-style": [{ outline: ["", ...ee()] }],
            "outline-offset": [{ "outline-offset": [Ye, B] }],
            "outline-w": [{ outline: [Ye, et] }],
            "outline-color": [{ outline: [e] }],
            "ring-w": [{ ring: Ke() }],
            "ring-w-inset": ["ring-inset"],
            "ring-color": [{ ring: [e] }],
            "ring-opacity": [{ "ring-opacity": [j] }],
            "ring-offset-w": [{ "ring-offset": [Ye, et] }],
            "ring-offset-color": [{ "ring-offset": [e] }],
            shadow: [{ shadow: ["", "inner", "none", tt, $c] }],
            "shadow-color": [{ shadow: [Vt] }],
            opacity: [{ opacity: [j] }],
            "mix-blend": [{ "mix-blend": [...te(), "plus-lighter", "plus-darker"] }],
            "bg-blend": [{ "bg-blend": te() }],
            filter: [{ filter: ["", "none"] }],
            blur: [{ blur: [n] }],
            brightness: [{ brightness: [r] }],
            contrast: [{ contrast: [a] }],
            "drop-shadow": [{ "drop-shadow": ["", "none", tt, B] }],
            grayscale: [{ grayscale: [u] }],
            "hue-rotate": [{ "hue-rotate": [f] }],
            invert: [{ invert: [h] }],
            saturate: [{ saturate: [M] }],
            sepia: [{ sepia: [Q] }],
            "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
            "backdrop-blur": [{ "backdrop-blur": [n] }],
            "backdrop-brightness": [{ "backdrop-brightness": [r] }],
            "backdrop-contrast": [{ "backdrop-contrast": [a] }],
            "backdrop-grayscale": [{ "backdrop-grayscale": [u] }],
            "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [f] }],
            "backdrop-invert": [{ "backdrop-invert": [h] }],
            "backdrop-opacity": [{ "backdrop-opacity": [j] }],
            "backdrop-saturate": [{ "backdrop-saturate": [M] }],
            "backdrop-sepia": [{ "backdrop-sepia": [Q] }],
            "border-collapse": [{ border: ["collapse", "separate"] }],
            "border-spacing": [{ "border-spacing": [i] }],
            "border-spacing-x": [{ "border-spacing-x": [i] }],
            "border-spacing-y": [{ "border-spacing-y": [i] }],
            "table-layout": [{ table: ["auto", "fixed"] }],
            caption: [{ caption: ["top", "bottom"] }],
            transition: [{ transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", B] }],
            duration: [{ duration: Te() }],
            ease: [{ ease: ["linear", "in", "out", "in-out", B] }],
            delay: [{ delay: Te() }],
            animate: [{ animate: ["none", "spin", "ping", "pulse", "bounce", B] }],
            transform: [{ transform: ["", "gpu", "none"] }],
            scale: [{ scale: [F] }],
            "scale-x": [{ "scale-x": [F] }],
            "scale-y": [{ "scale-y": [F] }],
            rotate: [{ rotate: [$t, B] }],
            "translate-x": [{ "translate-x": [Ce] }],
            "translate-y": [{ "translate-y": [Ce] }],
            "skew-x": [{ "skew-x": [$] }],
            "skew-y": [{ "skew-y": [$] }],
            "transform-origin": [{ origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", B] }],
            accent: [{ accent: ["auto", e] }],
            appearance: [{ appearance: ["none", "auto"] }],
            cursor: [
                {
                    cursor: [
                        "auto",
                        "default",
                        "pointer",
                        "wait",
                        "text",
                        "move",
                        "help",
                        "not-allowed",
                        "none",
                        "context-menu",
                        "progress",
                        "cell",
                        "crosshair",
                        "vertical-text",
                        "alias",
                        "copy",
                        "no-drop",
                        "grab",
                        "grabbing",
                        "all-scroll",
                        "col-resize",
                        "row-resize",
                        "n-resize",
                        "e-resize",
                        "s-resize",
                        "w-resize",
                        "ne-resize",
                        "nw-resize",
                        "se-resize",
                        "sw-resize",
                        "ew-resize",
                        "ns-resize",
                        "nesw-resize",
                        "nwse-resize",
                        "zoom-in",
                        "zoom-out",
                        B,
                    ],
                },
            ],
            "caret-color": [{ caret: [e] }],
            "pointer-events": [{ "pointer-events": ["none", "auto"] }],
            resize: [{ resize: ["none", "y", "x", ""] }],
            "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
            "scroll-m": [{ "scroll-m": q() }],
            "scroll-mx": [{ "scroll-mx": q() }],
            "scroll-my": [{ "scroll-my": q() }],
            "scroll-ms": [{ "scroll-ms": q() }],
            "scroll-me": [{ "scroll-me": q() }],
            "scroll-mt": [{ "scroll-mt": q() }],
            "scroll-mr": [{ "scroll-mr": q() }],
            "scroll-mb": [{ "scroll-mb": q() }],
            "scroll-ml": [{ "scroll-ml": q() }],
            "scroll-p": [{ "scroll-p": q() }],
            "scroll-px": [{ "scroll-px": q() }],
            "scroll-py": [{ "scroll-py": q() }],
            "scroll-ps": [{ "scroll-ps": q() }],
            "scroll-pe": [{ "scroll-pe": q() }],
            "scroll-pt": [{ "scroll-pt": q() }],
            "scroll-pr": [{ "scroll-pr": q() }],
            "scroll-pb": [{ "scroll-pb": q() }],
            "scroll-pl": [{ "scroll-pl": q() }],
            "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
            "snap-stop": [{ snap: ["normal", "always"] }],
            "snap-type": [{ snap: ["none", "x", "y", "both"] }],
            "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
            touch: [{ touch: ["auto", "none", "manipulation"] }],
            "touch-x": [{ "touch-pan": ["x", "left", "right"] }],
            "touch-y": [{ "touch-pan": ["y", "up", "down"] }],
            "touch-pz": ["touch-pinch-zoom"],
            select: [{ select: ["none", "text", "all", "auto"] }],
            "will-change": [{ "will-change": ["auto", "scroll", "contents", "transform", B] }],
            fill: [{ fill: [e, "none"] }],
            "stroke-w": [{ stroke: [Ye, et, un] }],
            stroke: [{ stroke: [e, "none"] }],
            sr: ["sr-only", "not-sr-only"],
            "forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }],
        },
        conflictingClassGroups: {
            overflow: ["overflow-x", "overflow-y"],
            overscroll: ["overscroll-x", "overscroll-y"],
            inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
            "inset-x": ["right", "left"],
            "inset-y": ["top", "bottom"],
            flex: ["basis", "grow", "shrink"],
            gap: ["gap-x", "gap-y"],
            p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
            px: ["pr", "pl"],
            py: ["pt", "pb"],
            m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
            mx: ["mr", "ml"],
            my: ["mt", "mb"],
            size: ["w", "h"],
            "font-size": ["leading"],
            "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
            "fvn-ordinal": ["fvn-normal"],
            "fvn-slashed-zero": ["fvn-normal"],
            "fvn-figure": ["fvn-normal"],
            "fvn-spacing": ["fvn-normal"],
            "fvn-fraction": ["fvn-normal"],
            "line-clamp": ["display", "overflow"],
            rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
            "rounded-s": ["rounded-ss", "rounded-es"],
            "rounded-e": ["rounded-se", "rounded-ee"],
            "rounded-t": ["rounded-tl", "rounded-tr"],
            "rounded-r": ["rounded-tr", "rounded-br"],
            "rounded-b": ["rounded-br", "rounded-bl"],
            "rounded-l": ["rounded-tl", "rounded-bl"],
            "border-spacing": ["border-spacing-x", "border-spacing-y"],
            "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
            "border-w-x": ["border-w-r", "border-w-l"],
            "border-w-y": ["border-w-t", "border-w-b"],
            "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
            "border-color-x": ["border-color-r", "border-color-l"],
            "border-color-y": ["border-color-t", "border-color-b"],
            "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
            "scroll-mx": ["scroll-mr", "scroll-ml"],
            "scroll-my": ["scroll-mt", "scroll-mb"],
            "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
            "scroll-px": ["scroll-pr", "scroll-pl"],
            "scroll-py": ["scroll-pt", "scroll-pb"],
            touch: ["touch-x", "touch-y", "touch-pz"],
            "touch-x": ["touch"],
            "touch-y": ["touch"],
            "touch-pz": ["touch"],
        },
        conflictingClassGroupModifiers: { "font-size": ["leading"] },
    };
}
const zc = Sc(Bc);
function ue(...e) {
    return zc(dc(e));
}
const Hc = K({
        __name: "AccordionContent",
        props: { asChild: { type: Boolean }, as: {}, class: {} },
        setup(e) {
            const t = e,
                n = me(() => {
                    const { class: r, ...s } = t;
                    return s;
                });
            return (r, s) => (R(), xe(T(ic), Mt(n.value, { class: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" }), { default: I(() => [S("div", { class: le(T(ue)("pb-4 pt-0", t.class)) }, [Z(r.$slots, "default")], 2)]), _: 3 }, 16));
        },
    }),
    Gc = K({
        __name: "AccordionItem",
        props: { disabled: { type: Boolean }, value: {}, asChild: { type: Boolean }, as: {}, class: {} },
        setup(e) {
            const t = e,
                n = me(() => {
                    const { class: s, ...o } = t;
                    return o;
                }),
                r = jo(n);
            return (s, o) => (R(), xe(T(oc), Mt(T(r), { class: T(ue)("border-b", t.class) }), { default: I(() => [Z(s.$slots, "default")]), _: 3 }, 16, ["class"]));
        },
    });
function Wc(e, t) {
    return (
        R(),
        H("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, [
            S("path", {
                "fill-rule": "evenodd",
                "clip-rule": "evenodd",
                d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
                fill: "currentColor",
            }),
        ])
    );
}
const Kc = K({
    __name: "AccordionTrigger",
    props: { asChild: { type: Boolean }, as: {}, class: {} },
    setup(e) {
        const t = e,
            n = me(() => {
                const { class: r, ...s } = t;
                return s;
            });
        return (r, s) => (
            R(),
            xe(
                T(lc),
                { class: "flex" },
                {
                    default: I(() => [
                        C(
                            T(ac),
                            Mt(n.value, { class: T(ue)("flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180", t.class) }),
                            { default: I(() => [Z(r.$slots, "default"), Z(r.$slots, "icon", {}, () => [C(T(Wc), { class: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })])]), _: 3 },
                            16,
                            ["class"],
                        ),
                    ]),
                    _: 3,
                },
            )
        );
    },
});
function Ko(e) {
    var t,
        n,
        r = "";
    if (typeof e == "string" || typeof e == "number") r += e;
    else if (typeof e == "object")
        if (Array.isArray(e)) for (t = 0; t < e.length; t++) e[t] && (n = Ko(e[t])) && (r && (r += " "), (r += n));
        else for (t in e) e[t] && (r && (r += " "), (r += t));
    return r;
}
function qc() {
    for (var e, t, n = 0, r = ""; n < arguments.length; ) (e = arguments[n++]) && (t = Ko(e)) && (r && (r += " "), (r += t));
    return r;
}
const xs = (e) => (typeof e == "boolean" ? "".concat(e) : e === 0 ? "0" : e),
    Cs = qc,
    qo = (e, t) => (n) => {
        var r;
        if ((t == null ? void 0 : t.variants) == null) return Cs(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
        const { variants: s, defaultVariants: o } = t,
            i = Object.keys(s).map((u) => {
                const f = n == null ? void 0 : n[u],
                    h = o == null ? void 0 : o[u];
                if (f === null) return null;
                const m = xs(f) || xs(h);
                return s[u][m];
            }),
            l =
                n &&
                Object.entries(n).reduce((u, f) => {
                    let [h, m] = f;
                    return m === void 0 || (u[h] = m), u;
                }, {}),
            a =
                t == null || (r = t.compoundVariants) === null || r === void 0
                    ? void 0
                    : r.reduce((u, f) => {
                          let { class: h, className: m, ...v } = f;
                          return Object.entries(v).every((L) => {
                              let [A, O] = L;
                              return Array.isArray(O) ? O.includes({ ...o, ...l }[A]) : { ...o, ...l }[A] === O;
                          })
                              ? [...u, h, m]
                              : u;
                      }, []);
        return Cs(e, i, a, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
    },
    Yc = K({
        __name: "Alert",
        props: { class: {}, variant: {} },
        setup(e) {
            const t = e;
            return (n, r) => (R(), H("div", { class: le(T(ue)(T(Zc)({ variant: n.variant }), t.class)), role: "alert" }, [Z(n.$slots, "default")], 2));
        },
    }),
    Xc = K({
        __name: "AlertTitle",
        props: { class: {} },
        setup(e) {
            const t = e;
            return (n, r) => (R(), H("h5", { class: le(T(ue)("mb-1 font-medium leading-none tracking-tight", t.class)) }, [Z(n.$slots, "default")], 2));
        },
    }),
    Jc = K({
        __name: "AlertDescription",
        props: { class: {} },
        setup(e) {
            const t = e;
            return (n, r) => (R(), H("div", { class: le(T(ue)("text-sm [&_p]:leading-relaxed", t.class)) }, [Z(n.$slots, "default")], 2));
        },
    }),
    Zc = qo("relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7", {
        variants: { variant: { default: "bg-background text-foreground", destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive" } },
        defaultVariants: { variant: "default" },
    }),
    Qc = qo("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
                secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: { default: "h-9 px-4 py-2", xs: "h-7 rounded px-2", sm: "h-8 rounded-md px-3 text-xs", lg: "h-10 rounded-md px-8", icon: "h-9 w-9" },
        },
        defaultVariants: { variant: "default", size: "default" },
    }),
    eu = K({
        __name: "Button",
        props: { variant: {}, size: {}, class: {}, asChild: { type: Boolean }, as: { default: "button" } },
        setup(e) {
            const t = e;
            return (n, r) => (R(), xe(T(Ot), { as: n.as, "as-child": n.asChild, class: le(T(ue)(T(Qc)({ variant: n.variant, size: n.size }), t.class)) }, { default: I(() => [Z(n.$slots, "default")]), _: 3 }, 8, ["as", "as-child", "class"]));
        },
    }),
    tu = K({
        __name: "Card",
        props: { class: {} },
        setup(e) {
            const t = e;
            return (n, r) => (R(), H("div", { class: le(T(ue)("rounded-xl border bg-card text-card-foreground shadow", t.class)) }, [Z(n.$slots, "default")], 2));
        },
    }),
    nu = K({
        __name: "CardHeader",
        props: { class: {} },
        setup(e) {
            const t = e;
            return (n, r) => (R(), H("div", { class: le(T(ue)("flex flex-col gap-y-1.5 p-6", t.class)) }, [Z(n.$slots, "default")], 2));
        },
    }),
    ru = K({
        __name: "CardTitle",
        props: { class: {} },
        setup(e) {
            const t = e;
            return (n, r) => (R(), H("h3", { class: le(T(ue)("font-semibold leading-none tracking-tight", t.class)) }, [Z(n.$slots, "default")], 2));
        },
    }),
    su = K({
        __name: "CardDescription",
        props: { class: {} },
        setup(e) {
            const t = e;
            return (n, r) => (R(), H("p", { class: le(T(ue)("text-sm text-muted-foreground", t.class)) }, [Z(n.$slots, "default")], 2));
        },
    }),
    ou = K({
        __name: "CardContent",
        props: { class: {} },
        setup(e) {
            const t = e;
            return (n, r) => (R(), H("div", { class: le(T(ue)("p-6 pt-0", t.class)) }, [Z(n.$slots, "default")], 2));
        },
    }),
    iu = K({
        __name: "CardFooter",
        props: { class: {} },
        setup(e) {
            const t = e;
            return (n, r) => (R(), H("div", { class: le(T(ue)("flex items-center p-6 pt-0", t.class)) }, [Z(n.$slots, "default")], 2));
        },
    });
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const lu = (e) => typeof e < "u";
function au(e) {
    return JSON.parse(JSON.stringify(e));
}
function cu(e, t, n, r = {}) {
    var s, o, i;
    const { clone: l = !1, passive: a = !1, eventName: u, deep: f = !1, defaultValue: h, shouldEmit: m } = r,
        v = Rt(),
        L = n || (v == null ? void 0 : v.emit) || ((s = v == null ? void 0 : v.$emit) == null ? void 0 : s.bind(v)) || ((i = (o = v == null ? void 0 : v.proxy) == null ? void 0 : o.$emit) == null ? void 0 : i.bind(v == null ? void 0 : v.proxy));
    let A = u;
    A = A || `update:${t.toString()}`;
    const O = (M) => (l ? (typeof l == "function" ? l(M) : au(M)) : M),
        j = () => (lu(e[t]) ? O(e[t]) : h),
        z = (M) => {
            m ? m(M) && L(A, M) : L(A, M);
        };
    if (a) {
        const M = j(),
            F = ve(M);
        let Q = !1;
        return (
            Le(
                () => e[t],
                ($) => {
                    Q || ((Q = !0), (F.value = O($)), Qt(() => (Q = !1)));
                },
            ),
            Le(
                F,
                ($) => {
                    !Q && ($ !== e[t] || f) && z($);
                },
                { deep: f },
            ),
            F
        );
    } else
        return me({
            get() {
                return j();
            },
            set(M) {
                z(M);
            },
        });
}
const uu = K({
        __name: "Input",
        props: { defaultValue: {}, modelValue: {}, class: {} },
        emits: ["update:modelValue"],
        setup(e, { emit: t }) {
            const n = e,
                s = cu(n, "modelValue", t, { passive: !0, defaultValue: n.defaultValue });
            return (o, i) =>
                uo(
                    (R(),
                    H(
                        "input",
                        {
                            "onUpdate:modelValue": i[0] || (i[0] = (l) => (ye(s) ? (s.value = l) : null)),
                            class: le(
                                T(ue)(
                                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                                    n.class,
                                ),
                            ),
                        },
                        null,
                        2,
                    )),
                    [[ma, T(s)]],
                );
        },
    }),
    du = { class: "relative w-full overflow-auto" },
    fu = K({
        __name: "Table",
        props: { class: {} },
        setup(e) {
            const t = e;
            return (n, r) => (R(), H("div", du, [S("table", { class: le(T(ue)("w-full caption-bottom text-sm", t.class)) }, [Z(n.$slots, "default")], 2)]));
        },
    }),
    hu = K({
        __name: "TableBody",
        props: { class: {} },
        setup(e) {
            const t = e;
            return (n, r) => (R(), H("tbody", { class: le(T(ue)("[&_tr:last-child]:border-0", t.class)) }, [Z(n.$slots, "default")], 2));
        },
    }),
    pu = K({
        __name: "TableCell",
        props: { class: {} },
        setup(e) {
            const t = e;
            return (n, r) => (R(), H("td", { class: le(T(ue)("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5", t.class)) }, [Z(n.$slots, "default")], 2));
        },
    }),
    mu = K({
        __name: "TableHead",
        props: { class: {} },
        setup(e) {
            const t = e;
            return (n, r) => (R(), H("th", { class: le(T(ue)("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-0.5", t.class)) }, [Z(n.$slots, "default")], 2));
        },
    }),
    gu = K({
        __name: "TableHeader",
        props: { class: {} },
        setup(e) {
            const t = e;
            return (n, r) => (R(), H("thead", { class: le(T(ue)("[&_tr]:border-b", t.class)) }, [Z(n.$slots, "default")], 2));
        },
    }),
    bu = K({
        __name: "TableRow",
        props: { class: {} },
        setup(e) {
            const t = e;
            return (n, r) => (R(), H("tr", { class: le(T(ue)("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", t.class)) }, [Z(n.$slots, "default")], 2));
        },
    }),
    vu = K({
        __name: "TableCaption",
        props: { class: {} },
        setup(e) {
            const t = e;
            return (n, r) => (R(), H("caption", { class: le(T(ue)("mt-4 text-sm text-muted-foreground", t.class)) }, [Z(n.$slots, "default")], 2));
        },
    });
function _u(e, t) {
    let n = new URL(e);
    if (t.startsWith("/")) n.pathname = t;
    else {
        let r = n.pathname.split("/");
        r.pop(), r.push(t), (n.pathname = r.join("/"));
    }
    return n.toString();
}
const yu = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
var dn = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2, "stroke-linecap": "round", "stroke-linejoin": "round" };
const wu = ({ size: e, strokeWidth: t = 2, absoluteStrokeWidth: n, color: r, iconNode: s, name: o, class: i, ...l }, { slots: a }) =>
    vt("svg", { ...dn, width: e || dn.width, height: e || dn.height, stroke: r || dn.stroke, "stroke-width": n ? (Number(t) * 24) / Number(e) : t, class: ["lucide", `lucide-${yu(o ?? "icon")}`], ...l }, [...s.map((u) => vt(...u)), ...(a.default ? [a.default()] : [])]);
const Or =
    (e, t) =>
    (n, { slots: r }) =>
        vt(wu, { ...n, iconNode: t, name: e }, r);
const xu = Or("FileVideoIcon", [
    ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
    ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
    ["path", { d: "m10 11 5 3-5 3v-6Z", key: "7ntvm4" }],
]);
const Cu = Or("SettingsIcon", [
    [
        "path",
        {
            d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
            key: "1qme2f",
        },
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
]);
const Su = Or("XIcon", [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }],
]);
var Et = {};
Object.defineProperty(Et, "__esModule", { value: !0 });
Et.M3ULine = Et.Item = void 0;
const Tu = /#(?:-X-)?([^:]+):?(.*)$/,
    Au = /([^,="]+)((="[^"]+")|(=[^,]+))*/g,
    Ss = { number: (e) => parseFloat(e), integer: (e) => parseInt(e), date: (e) => new Date(e), string: (e) => String(e).trim(), stringArray: (e) => String(e).split(","), boolean: (e) => e.toUpperCase() !== "NO" },
    fn = {
        bandwidth: "integer",
        averageBandwidth: "integer",
        frameRate: "number",
        duration: "number",
        targetduration: "number",
        elapsedtime: "number",
        timeOffset: "number",
        codecs: "stringArray",
        default: "boolean",
        autoselect: "boolean",
        forced: "boolean",
        precise: "boolean",
        programDateTime: "date",
        publishedTime: "date",
        startDate: "date",
        endDate: "date",
        version: "integer",
        mediaSequence: "integer",
        discontinuitySequence: "integer",
        byterange: "string",
        key: "string",
        uri: "string",
        scte35Out: "string",
        id: "string",
        xAdId: "string",
        title: "string",
        playlistType: "string",
        method: "string",
        iv: "string",
        caid: "string",
        cue: "string",
        type: "string",
        groupId: "string",
        language: "string",
        closedCaptions: "string",
        subtitles: "string",
        audio: "string",
        video: "string",
        resolution: "string",
        instreamId: "string",
        name: "string",
        layout: "string",
        allowCache: "boolean",
        upid: "string",
        cueIn: "boolean",
        cueOut: "number",
        cueOutCont: "string",
        blackout: "boolean",
        time: "number",
        elapsed: "number",
        oatclsScte35: "string",
        scte35: "string",
        plannedDuration: "number",
        programId: "number",
        endOnNext: "boolean",
        class: "string",
        assocLanguage: "string",
        characteristics: "string",
        channels: "string",
        hdcpLevel: "string",
        dataId: "string",
        value: "string",
    },
    Ts = ["inf", "programDateTime", "key", "cueIn", "cueOut", "cueOutCont", "scte35", "daterange", "asset", "tiles", "byterange", "discontinuity", "map", "beacon", "gap", "partInf", "part", "skip"],
    As = ["streamInf"],
    ku = ["media", "iFrameStreamInf", "imageStreamInf"];
class cr {
    constructor(t, n) {
        (this.uri = t), (this.properties = n);
    }
    serialize() {
        const t = { uri: this.uri };
        return (
            this.properties.forEach((n) => {
                n.name && (t[n.name] = n.serialize());
            }),
            t
        );
    }
}
Et.Item = cr;
class Yo {
    constructor(t) {
        const n = Tu.exec(t);
        n ? ((this.tagName = n[1]), (this.name = Iu(n[1])), (this.content = t), (this.attributes = Mu(n[2], this.name)), (this.type = "TAG")) : ((this.type = "URI"), (this.tagName = "URI"), (this.name = "uri"), (this.content = t), (this.attributes = { value: t }));
    }
    serialize() {
        const t = Object.keys(this.attributes);
        return t.length === 0 ? !0 : t.length === 1 && t[0] === "value" ? this.attributes.value : this.attributes;
    }
    getAttribute(t) {
        return this.attributes[t];
    }
    setAttribute(t, n) {
        return (this.attributes[t] = n), this;
    }
    getUri() {
        return this.name === "uri" ? String(this.getAttribute("value")) : this.getAttribute("uri") ? String(this.getAttribute("uri")) : "";
    }
}
Et.M3ULine = Yo;
const Iu = (e) => (
        e.startsWith("EXT") && (e = e.substr(3)),
        Xo(
            e
                .split(/[- ]/)
                .filter((t) => t.length > 0)
                .filter((t, n) => !(t === "X" && n == 0))
                .join("-"),
        )
    ),
    Xo = (e) => e.split("-").reduce((t, n) => (t ? ((t += n.charAt(0) + n.slice(1).toLowerCase()), t) : ((t += n.toLowerCase()), t)), ""),
    Eu = (e) => new Yo(e),
    Mu = (e, t = "") => {
        const n = e.match(Au);
        return n === null
            ? {}
            : (() => {
                  var s;
                  if (t === "inf") {
                      const o = n[0].split(" ");
                      let i = [];
                      return o.length > 0 && o.splice(1).forEach((l) => i.push(ks(l, t))), [{ key: "duration", value: parseFloat(o[0]) }, { key: "title", value: (s = n[1]) === null || s === void 0 ? void 0 : s.trim() }, ...i];
                  }
                  return n.map((o) => ks(o, t));
              })().reduce((s, o) => (s[o.key] === void 0 && (s[o.key] = o.value), s), {});
    },
    ks = (e, t) => {
        const n = e.trim().replace("=", "|").split("|");
        if (n.length == 2) {
            let s = Xo(n[0]),
                o = n[1].replace(/("|')/g, "");
            return fn.hasOwnProperty(s) && (o = Ss[fn[s]](o)), { key: s, value: o };
        }
        return { key: "value", value: fn.hasOwnProperty(t) ? Ss[fn[t]](n[0]) : Number.isNaN(n[0]) ? n[0] : parseFloat(n[0]) };
    };
class Pr {
    constructor(t) {
        if (
            ((this.lines = []),
            (this.segments = []),
            (this.streamRenditions = []),
            (this.iFrameRenditions = []),
            (this.imageRenditions = []),
            (this.audioRenditions = []),
            (this.alternateVideoRenditions = []),
            (this.subtitlesRenditions = []),
            (this.closedCaptionsRenditions = []),
            (this.totalDuration = 0),
            (t = t.trim()),
            !t.startsWith("#EXTM3U"))
        )
            throw new Error("Invalid M3U8 maifest");
        (this.lines = t
            .split(/\r?\n/)
            .filter((n) => n.trim().length > 0)
            .map((n) => Eu(n))),
            (this.isMaster = this.lines.some((n) => n.name === "streamInf")),
            (this.isLive = !this.lines.some((n) => n.name === "endlist")),
            this.isMaster
                ? ((this.streamRenditions = this.accumulateItems(
                      (n) => n.type == "URI",
                      (n) => !!(n.type === "TAG" && n.name && As.includes(n.name)),
                  )),
                  (this.iFrameRenditions = this.getStreamItems((n) => n.name == "iFrameStreamInf")),
                  (this.imageRenditions = this.getStreamItems((n) => n.name == "imageStreamInf")),
                  (this.audioRenditions = this.getStreamItems((n) => n.name == "media" && String(n.getAttribute("type")).toLocaleLowerCase() == "audio")),
                  (this.alternateVideoRenditions = this.getStreamItems((n) => n.name == "media" && String(n.getAttribute("type")).toLocaleLowerCase() == "video")),
                  (this.subtitlesRenditions = this.getStreamItems((n) => n.name == "media" && String(n.getAttribute("type")).toLocaleLowerCase() == "subtitles")),
                  (this.closedCaptionsRenditions = this.getStreamItems((n) => n.name == "media" && String(n.getAttribute("type")).toLocaleLowerCase() == "closed-captions")))
                : ((this.segments = this.accumulateItems(
                      (n) => n.type == "URI",
                      (n) => !!(n.type === "TAG" && n.name && Ts.includes(n.name)),
                  )),
                  (this.totalDuration = this.segments.reduce((n, r) => {
                      const s = (() => {
                          var o;
                          const i = Number((o = r.properties.find((l) => l.name === "inf")) === null || o === void 0 ? void 0 : o.getAttribute("duration"));
                          return isNaN(i) ? 0 : i;
                      })();
                      return n + s;
                  }, 0)));
    }
    static parse(t) {
        return new Pr(t);
    }
    get type() {
        return this.isMaster ? "master" : this.isLive ? "live" : "vod";
    }
    get manifestProperties() {
        const t = {};
        return (
            this.lines
                .filter((n) => n.name && n.type !== "URI" && !Ts.includes(n.name) && !ku.includes(n.name) && !As.includes(n.name))
                .forEach((n) => {
                    n.name && (t[n.name] = n.serialize());
                }),
            t
        );
    }
    findAll(t) {
        return (
            (t = t.toLocaleLowerCase()),
            this.lines.filter((n) => {
                var r, s;
                return ((r = n.tagName) === null || r === void 0 ? void 0 : r.toLocaleLowerCase()) == t || ((s = n.name) === null || s === void 0 ? void 0 : s.toLocaleLowerCase()) == t;
            })
        );
    }
    find(t) {
        return (
            (t = t.toLocaleLowerCase()),
            this.lines.filter((n) => {
                var r, s;
                return ((r = n.tagName) === null || r === void 0 ? void 0 : r.toLocaleLowerCase()) == t || ((s = n.name) === null || s === void 0 ? void 0 : s.toLocaleLowerCase()) == t;
            })[0]
        );
    }
    serialize() {
        const t = { type: this.type };
        return (
            this.isMaster
                ? ((t.variants = this.streamRenditions.map((n) => n.serialize())),
                  (t.trickplay = { iframes: this.iFrameRenditions.map((n) => n.serialize()), images: this.imageRenditions.map((n) => n.serialize()) }),
                  (t.media = { audio: this.audioRenditions.map((n) => n.serialize()), video: this.alternateVideoRenditions.map((n) => n.serialize()), subtitles: this.subtitlesRenditions.map((n) => n.serialize()), closedCaptions: this.closedCaptionsRenditions.map((n) => n.serialize()) }))
                : ((t.segments = this.segments.map((n) => n.serialize())), (t.totalDuration = this.totalDuration)),
            Object.assign(Object.assign({}, t), this.manifestProperties)
        );
    }
    getStreamItems(t) {
        return this.lines.filter(t).map((n) => new cr(n.getUri(), [n]));
    }
    accumulateItems(t, n) {
        let r = [];
        return this.lines.reduce((s, o) => (t(o) ? (s.push(new cr(o.getUri(), r)), (r = [])) : n(o) && r.push(o), s), []);
    }
}
var Ru = (Et.default = Pr);
const Ou = (e, t) => {
        const n = e.__vccOpts || e;
        for (const [r, s] of t) n[r] = s;
        return n;
    },
    Pu = {
        name: "App",
        components: {
            Button: eu,
            DotGrid: Aa,
            ToggleButton: Pa,
            Input: uu,
            Card: tu,
            CardContent: ou,
            CardDescription: su,
            CardFooter: iu,
            CardHeader: nu,
            CardTitle: ru,
            FileVideo: xu,
            Table: fu,
            TableBody: hu,
            TableCaption: vu,
            TableCell: pu,
            TableHead: mu,
            TableHeader: gu,
            TableRow: bu,
            Accordion: uc,
            AccordionContent: Hc,
            AccordionItem: Gc,
            AccordionTrigger: Kc,
            Alert: Yc,
            AlertDescription: Jc,
            AlertTitle: Xc,
            X: Su,
            Settings: Cu,
        },
        computed: {
            year() {
                return new Date().getFullYear();
            },
        },
        async mounted() {
            try {
                this.news = {};
            } catch {
                this.news = {};
            }
            const e = window.localStorage.getItem("downloadThreads") || 6;
            this.downloadThreads = e;
        },
        data() {
            return {
                streamRenditions: [],
                downloadThreads: 6,
                open: !1,
                isComplete: !1,
                news: {},
                url: "",
                tips: "M3u8 Download Online",
                title: "",
                isPause: !1,
                isGetMP4: !1,
                durationSecond: 0,
                isShowRefer: !1,
                downloading: !1,
                beginTime: "",
                errorNum: 0,
                finishNum: 0,
                downloadIndex: 0,
                finishList: [],
                tsUrlList: [],
                mediaFileList: [],
                isSupperStreamWrite: window.streamSaver && !window.streamSaver.useBlobFallback,
                streamWriter: null,
                streamDownloadIndex: 0,
                rangeDownload: { isShowRange: !1, startSegment: "", endSegment: "", targetSegment: 1 },
                aesConf: {
                    method: "",
                    uri: "",
                    iv: "",
                    key: "",
                    decryptor: null,
                    stringToBuffer: function (e) {
                        return new TextEncoder().encode(e);
                    },
                },
            };
        },
        created() {},
        beforeDestroy() {},
        methods: {
            async downloadVideo(e = "ts") {
                (await this.parseM3U8()) || (e === "ts" ? this.getM3U8(!1) : this.getMP4());
            },
            async parseM3U8(e = !1) {
                try {
                    if (!this.url) return e && alert("Please enter the link"), !1;
                    const n = await (await fetch(this.url)).text(),
                        r = Ru.parse(n);
                    if (r.streamRenditions.length) {
                        const s = r.streamRenditions.map((o) => _u(this.url, o.uri));
                        return (this.streamRenditions = s), !0;
                    } else return (this.streamRenditions = []), e && alert("No data found"), !1;
                } catch {
                    return !1;
                }
            },
            getLocalFile(e) {
                const t = (r) => {
                        const s = new Blob([r], { type: "text/plain" }),
                            o = URL.createObjectURL(s);
                        (this.url = o), this.getM3U8();
                    },
                    n = e.target.files[0];
                if (n) {
                    const r = new FileReader();
                    (r.onload = (s) => {
                        t(s.target.result);
                    }),
                        r.readAsText(n);
                }
            },
            saveSettings() {
                (this.open = !1), window.localStorage.setItem("downloadThreads", this.downloadThreads);
            },
            openDialog() {
                this.open = !0;
            },
            checkOrPlay() {
                let e = `https://m3u8play.dev?url=${this.url}`;
                this.url || (e = "https://m3u8play.dev"), window.open(e, "_blank");
            },
            reDownload() {
                window.location.reload();
            },
            getSource() {
                let { href: e } = location;
                e.indexOf("?source=") > -1 && (this.url = e.split("?source=")[1]);
            },
            getDocumentTitle() {
                let e = document.title;
                try {
                    e = window.top.document.title;
                } catch (t) {
                    console.log(t);
                }
                return e;
            },
            onKeyup(e) {
                e.keyCode === 13 && this.getM3U8();
            },
            ajax(e) {
                (e = e || {}),
                    fetch(e.url, { method: "GET" })
                        .then(async (t) => {
                            t.status >= 200 && t.status < 300 ? e.success && e.success(e.type === "file" ? await t.arrayBuffer() : await t.text()) : e.fail && e.fail(t.status);
                        })
                        .catch((t) => {
                            e.fail && e.fail("");
                        });
            },
            applyURL(e, t) {
                if (((t = t || location.href), e.indexOf("http") === 0)) return location.href.indexOf("https") === 0 ? e.replace("http://", "https://") : e;
                if (e[0] === "/") {
                    let n = t.split("/");
                    return n[0] + "//" + n[2] + e;
                } else {
                    let n = t.split("/");
                    return n.pop(), n.join("/") + "/" + e;
                }
            },
            streamDownload(e) {
                this.isGetMP4 = e;
                let t = `m3u8.dev-${Date.now().toString()}`;
                (this.streamWriter = window.streamSaver.createWriteStream(`${t}.${e ? "mp4" : "ts"}`).getWriter()), this.getM3U8();
            },
            getMP4() {
                (this.isGetMP4 = !0), this.getM3U8();
            },
            getM3U8(e) {
                if (!this.url) {
                    alert("Please enter the link");
                    return;
                }
                if (this.url.toLowerCase().indexOf("m3u8") === -1) {
                    alert("The link is incorrect, please re-enter it");
                    return;
                }
                if (this.downloading) {
                    alert("Resource downloading, please wait");
                    return;
                }
                (this.title = `m3u8.dev-${Date.now().toString()}`),
                    (this.tips = "Downloading, please wait"),
                    (this.beginTime = new Date()),
                    this.ajax({
                        url: this.url,
                        success: (t) => {
                            if (
                                ((this.tsUrlList = []),
                                (this.finishList = []),
                                t
                                    .split(
                                        `
`,
                                    )
                                    .forEach((n) => {
                                        /^[^#]/.test(n) && (this.tsUrlList.push(this.applyURL(n, this.url)), this.finishList.push({ title: n, status: "" }));
                                    }),
                                e)
                            ) {
                                (this.rangeDownload.isShowRange = !0), (this.rangeDownload.endSegment = this.tsUrlList.length), (this.rangeDownload.targetSegment = this.tsUrlList.length);
                                return;
                            } else {
                                let n = Math.max(this.rangeDownload.startSegment || 1, 1),
                                    r = Math.max(this.rangeDownload.endSegment || this.tsUrlList.length, 1);
                                (n = Math.min(n, this.tsUrlList.length)),
                                    (r = Math.min(r, this.tsUrlList.length)),
                                    (this.rangeDownload.startSegment = Math.min(n, r)),
                                    (this.rangeDownload.endSegment = Math.max(n, r)),
                                    (this.rangeDownload.targetSegment = this.rangeDownload.endSegment - this.rangeDownload.startSegment + 1),
                                    (this.downloadIndex = this.rangeDownload.startSegment - 1),
                                    (this.downloading = !0);
                            }
                            if (this.isGetMP4) {
                                let n = 0;
                                t.split(
                                    `
`,
                                ).forEach((r) => {
                                    r.toUpperCase().indexOf("#EXTINF:") > -1 && (n++, this.rangeDownload.startSegment <= n && n <= this.rangeDownload.endSegment && (this.durationSecond += parseFloat(r.split("#EXTINF:")[1])));
                                });
                            }
                            t.indexOf("#EXT-X-KEY") > -1
                                ? ((this.aesConf.method = (t.match(/(.*METHOD=([^,\s]+))/) || ["", "", ""])[2]),
                                  (this.aesConf.uri = (t.match(/(.*URI="([^"]+))"/) || ["", "", ""])[2]),
                                  (this.aesConf.iv = (t.match(/(.*IV=([^,\s]+))/) || ["", "", ""])[2]),
                                  (this.aesConf.iv = this.aesConf.iv ? this.aesConf.stringToBuffer(this.aesConf.iv) : ""),
                                  (this.aesConf.uri = this.applyURL(this.aesConf.uri, this.url)),
                                  this.getAES())
                                : this.tsUrlList.length > 0
                                  ? this.downloadTS()
                                  : this.alertError("The resource is empty, please check whether the link is valid");
                        },
                        fail: () => {
                            this.alertError("The link is incorrect, please check if the link is valid");
                        },
                    });
            },
            getAES() {
                this.ajax({
                    type: "file",
                    url: this.aesConf.uri,
                    success: (e) => {
                        (this.aesConf.key = e), (this.aesConf.decryptor = new AESDecryptor()), this.aesConf.decryptor.constructor(), this.aesConf.decryptor.expandKey(this.aesConf.key), this.downloadTS();
                    },
                    fail: () => {
                        this.alertError("Video is encrypted and cannot be downloaded");
                    },
                });
            },
            aesDecrypt(e, t) {
                let n = this.aesConf.iv || new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, t]);
                return this.aesConf.decryptor.decrypt(e, 0, n.buffer || n, !0);
            },
            downloadTS() {
                this.tips = "TS video fragments are being downloaded, please wait.";
                let e = () => {
                    let t = this.isPause,
                        n = this.downloadIndex;
                    n >= this.rangeDownload.endSegment ||
                        (this.downloadIndex++,
                        this.finishList[n] && this.finishList[n].status === ""
                            ? ((this.finishList[n].status = "downloading"),
                              this.ajax({
                                  url: this.tsUrlList[n],
                                  type: "file",
                                  success: (r) => {
                                      this.dealTS(r, n, () => this.downloadIndex < this.rangeDownload.endSegment && !t && e());
                                  },
                                  fail: () => {
                                      this.errorNum++, (this.finishList[n].status = "error"), this.downloadIndex < this.rangeDownload.endSegment && !t && e();
                                  },
                              }))
                            : this.downloadIndex < this.rangeDownload.endSegment && !t && e());
                };
                for (let t = 0; t < Math.min(this.downloadThreads, this.rangeDownload.targetSegment - this.finishNum); t++) e();
            },
            dealTS(e, t, n) {
                const r = this.aesConf.uri ? this.aesDecrypt(e, t) : e;
                this.conversionMp4(r, t, (s) => {
                    if (((this.mediaFileList[t - this.rangeDownload.startSegment + 1] = s), (this.finishList[t].status = "finish"), this.finishNum++, this.streamWriter)) {
                        for (let o = this.streamDownloadIndex; o < this.mediaFileList.length && this.mediaFileList[o]; o++) this.streamWriter.write(new Uint8Array(this.mediaFileList[o])), (this.mediaFileList[o] = null), (this.streamDownloadIndex = o + 1);
                        this.streamDownloadIndex >= this.rangeDownload.targetSegment && this.streamWriter.close();
                    } else if (this.finishNum === this.rangeDownload.targetSegment) {
                        let o = `m3u8.dev-${Date.now().toString()}`;
                        this.downloadFile(this.mediaFileList, o);
                    }
                    n && n();
                });
            },
            conversionMp4(e, t, n) {
                if (this.isGetMP4) {
                    let r = new muxjs.Transmuxer({ keepOriginalTimestamps: !0, duration: parseInt(this.durationSecond) });
                    r.on("data", (s) => {
                        if (t === this.rangeDownload.startSegment - 1) {
                            let o = new Uint8Array(s.initSegment.byteLength + s.data.byteLength);
                            o.set(s.initSegment, 0), o.set(s.data, s.initSegment.byteLength), n(o.buffer);
                        } else n(s.data);
                    }),
                        r.push(new Uint8Array(e)),
                        r.flush();
                } else n(e);
            },
            togglePause() {
                (this.isPause = !this.isPause), !this.isPause && this.retryAll(!0);
            },
            retry(e) {
                this.finishList[e].status === "error" &&
                    ((this.finishList[e].status = ""),
                    this.ajax({
                        url: this.tsUrlList[e],
                        type: "file",
                        success: (t) => {
                            this.errorNum--, this.dealTS(t, e);
                        },
                        fail: () => {
                            this.finishList[e].status = "error";
                        },
                    }));
            },
            retryAll(e) {
                if (!this.finishList.length || this.isPause) return;
                let t = this.downloadIndex;
                this.finishList.forEach((n, r) => {
                    n.status === "error" && ((n.status = ""), (t = Math.min(t, r)));
                }),
                    (this.errorNum = 0),
                    this.downloadIndex >= this.rangeDownload.endSegment || e ? ((this.downloadIndex = t), this.downloadTS()) : (this.downloadIndex = t);
            },
            downloadFile(e, t) {
                this.tips = "TS fragmentation is being integrated, please pay attention to browser downloads";
                let n = null,
                    r = document.createElement("a");
                this.isGetMP4 ? ((n = new Blob(e, { type: "video/mp4" })), (r.download = t + ".mp4")) : ((n = new Blob(e, { type: "video/MP2T" })), (r.download = t + ".ts")), (r.href = URL.createObjectURL(n)), (r.style.display = "none"), document.body.appendChild(r), r.click(), r.remove(), (this.isComplete = !0);
            },
            formatTime(e, t) {
                const n = { Y: e.getFullYear(), M: e.getMonth() + 1, D: e.getDate(), h: e.getHours(), m: e.getMinutes(), s: e.getSeconds() };
                return t.replace(/Y+|M+|D+|h+|m+|s+/g, (r) => (new Array(r.length).join("0") + n[r[0]]).substr(-r.length));
            },
            forceDownload() {
                if (this.mediaFileList.length) {
                    let e = `m3u8.dev-${this.formatTime(this.beginTime, "YYYY_MM_DD hh_mm_ss")}`;
                    this.downloadFile(this.mediaFileList, e);
                } else alert("There are currently no downloaded clips");
            },
            alertError(e) {
                alert(e), (this.downloading = !1), (this.tips = "M3u8 Download Online");
            },
        },
    },
    Lu = { class: "flex flex-col pb-20" },
    Nu = { class: "sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border" },
    Du = { class: "container flex h-14 max-w-screen-2xl items-center" },
    ju = kr(
        '<div class="mr-4 md:mr-1 md:flex"><a href="#" class="mr-4 md:mr-2 lg:mr-6 flex items-center lg:space-x1 xl:space-x-2"><div class="font-bold text-base dark:text-foreground/60"> M3U8 Downloader </div></a><nav class="flex items-center max-lg:space-x-4 space-x-6 text-sm font-medium"><a href="https://chromewebstore.google.com/detail/m3u8-downloader/iflojgibfliebjepfhbbhaiaagdedoej" target="_blank" class="transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer">Chrome Extension</a><a href="https://beta.m3u8.dev/" target="_blank" class="transition-colors hover:text-foreground/80 text-foreground/60 cursor-pointer">Beta</a></nav></div>',
        1,
    ),
    $u = { class: "flex flex-1 items-center justify-end space-x-2" },
    Vu = { class: "flex items-center space-x-3" },
    Uu = S("div", { class: "my-6 w-[96%] lg:w-[1160px] bg-background dark:border dark:border-border shadow-lg rounded-l mx-auto box-border p-5 py-6" }, [S("div", { id: "container-6a981008087a0a519c722c43126e8e0b" })], -1),
    Fu = { class: "my-6 w-[96%] lg:w-[1160px] bg-background dark:border dark:border-border shadow-lg rounded-l mx-auto box-border p-5 py-6" },
    Bu = S(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round", class: "w-4 h-4" },
        [S("polyline", { points: "4 17 10 11 4 5" }), S("line", { x1: "12", x2: "20", y1: "19", y2: "19" })],
        -1,
    ),
    zu = S("div", { class: "text-base" }, " Download Video/Audio from YouTube, Twitter/X, Tiktok, Instagram, Loom, Reddit, Twitch and more. ", -1),
    Hu = S("div", { class: "space-y-1" }, [S("div", null, [S("a", { href: "https://download.m3u8.dev/", target: "_blank", class: "underline" }, "Video Download")])], -1),
    Gu = { class: "my-6 w-[96%] lg:w-[1160px] bg-background dark:border dark:border-border shadow-lg rounded-l mx-auto box-border p-5 py-6" },
    Wu = S(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round", class: "w-4 h-4" },
        [S("polyline", { points: "4 17 10 11 4 5" }), S("line", { x1: "12", x2: "20", y1: "19", y2: "19" })],
        -1,
    ),
    Ku = S("div", { class: "text-base" }, " If the download fails, you can use the following methods to download the video: ", -1),
    qu = S(
        "div",
        { class: "space-y-1" },
        [
            S("div", null, [G("Use the "), S("a", { href: "https://chromewebstore.google.com/detail/m3u8-downloader-pro-hls-d/agiifopjckffghgiggmfnpbdamhpejfi", target: "_blank", class: "underline" }, '"M3U8 Downloader Pro - HLS Downloader"'), G(" to download the video.")]),
            S("div", null, [G(" Use the "), S("a", { href: "https://record.m3u8.dev/", target: "_blank", class: "underline" }, '"Free Online Screen Recorder"'), G(" to record the video. ")]),
        ],
        -1,
    ),
    Yu = S("br", null, null, -1),
    Xu = { class: "flex flex-col" },
    Ju = { key: 0, class: "flex gap-4 mt-5 items-center justify-center" },
    Zu = { key: 1, class: "flex gap-4 mt-5 items-center justify-center lg:flex-row flex-col", style: { display: "flex" } },
    Qu = S("br", null, null, -1),
    ed = { key: 0, class: "grid grid-cols-1" },
    td = { class: "url ml-3 flex-1 overflow-hidden mx-2 mr-3 dark:text-foreground/60" },
    nd = { class: "" },
    rd = { key: 1, class: "w-full border-dashed border py-10 flex items-center justify-center" },
    sd = S("div", { class: "text-gray-500 text-lg" }, "No data", -1),
    od = [sd],
    id = S("br", null, null, -1),
    ld = { class: "flex items-center justify-end mb-4" },
    ad = { class: "flex gap-4" },
    cd = { key: 0 },
    ud = { class: "my-2" },
    dd = { class: "grid grid-cols-10 gap-1 grid-flow-row max-h-[396px] overflow-y-auto p-2" },
    fd = ["onClick"],
    hd = { key: 1 },
    pd = { class: "my-2" },
    md = { class: "grid grid-cols-10 gap-1 grid-flow-row max-h-[396px] overflow-y-auto p-2" },
    gd = ["onClick"],
    bd = { key: 1, class: "w-full border-dashed border py-10 flex items-center justify-center" },
    vd = S("div", { class: "text-gray-500 text-lg" }, "No data", -1),
    _d = [vd],
    yd = { class: "mt-4 w-[96%] lg:w-[1160px] bg-background dark:border dark:border-border shadow-lg rounded-l mx-auto box-border p-5 py-6" },
    wd = S("div", null, "You can get M3U8 URL using the Chrome Extension.", -1),
    xd = S("div", null, [S("a", { href: "https://chromewebstore.google.com/detail/m3u8-downloader-pro-hls-d/agiifopjckffghgiggmfnpbdamhpejfi", target: "_blank" }, "M3U8 Downloader Pro - HLS Downloader")], -1),
    Cd = S("div", null, [S("a", { href: "https://chromewebstore.google.com/detail/hls-downloader/mmcakcdpkfnjncggccdoegkjganfkbjo ", target: "_blank" }, "HLS Downloader")], -1),
    Sd = S("div", null, "You can download videos using the Chrome Extension.", -1),
    Td = S("div", null, [S("a", { href: "https://chromewebstore.google.com/detail/m3u8-downloader-pro-hls-d/agiifopjckffghgiggmfnpbdamhpejfi", target: "_blank" }, "M3U8 Downloader Pro - HLS Downloader")], -1),
    Ad = S("div", null, [S("a", { href: "https://chromewebstore.google.com/detail/hls-downloader/mmcakcdpkfnjncggccdoegkjganfkbjo ", target: "_blank" }, "HLS Downloader")], -1),
    kd = S("br", null, null, -1),
    Id = S("a", { href: "https://record.m3u8.dev/", target: "_blank" }, "https://record.m3u8.dev/ ", -1),
    Ed = { class: "fixed top-0 left-0 w-full h-full bg-black/60 z-[9999999999]", ref: "dialog" },
    Md = { class: "absolute left-1/2 top-[200px] transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-[480px] max-md:w-[90%] translate-x-[-50%] dark:bg-background dark:border" },
    Rd = { class: "text-center" },
    Od = S("div", { as: "h3", class: "text-base font-semibold leading-6 text-gray-900 mb-4 dark:text-foreground/60" }, " Settings ", -1),
    Pd = { class: "flex mb-3 justify-center items-center gap-4" },
    Ld = S("label", { for: "Threads", class: "block text-sm font-medium w-32 text-right text-muted-foreground" }, "Download Threads", -1),
    Nd = S("div", { class: "mt-2" }, [S("p", { class: "text-sm text-gray-500" })], -1),
    Dd = { class: "mt-5 sm:mt-6" },
    jd = { id: "footer", class: "bg-background w-full mt-10" },
    $d = { class: "mx-auto max-w-7xl py-5 px-6 md:flex md:items-center md:justify-between lg:px-8" },
    Vd = kr(
        '<div class="flex justify-center space-x-6 md:order-2"><a href="mailto:contact@m3u8.dev" class="text-gray-400 hover:text-gray-500"><span class="sr-only">Email</span><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg></a></div>',
        1,
    ),
    Ud = { class: "mt-8 md:order-1 md:mt-0" },
    Fd = { class: "text-center text-xs leading-5 text-gray-500" },
    Bd = S("a", { href: "https://m3u8.dev" }, "M3U8.Dev", -1);
function zd(e, t, n, r, s, o) {
    const i = re("ToggleButton"),
        l = re("Settings"),
        a = re("DotGrid"),
        u = re("AlertTitle"),
        f = re("AlertDescription"),
        h = re("Alert"),
        m = re("CardTitle"),
        v = re("CardDescription"),
        L = re("CardHeader"),
        A = re("Input"),
        O = re("Button"),
        j = re("CardContent"),
        z = re("Card"),
        M = re("FileVideo"),
        F = re("TableHead"),
        Q = re("TableRow"),
        $ = re("TableHeader"),
        be = re("TableCell"),
        Ce = re("TableBody"),
        We = re("Table"),
        Se = re("AccordionTrigger"),
        Ee = re("AccordionContent"),
        q = re("AccordionItem"),
        Ke = re("Accordion"),
        Ue = re("X");
    return (
        R(),
        H(
            fe,
            null,
            [
                S("div", Lu, [
                    S("header", Nu, [
                        S("div", Du, [
                            ju,
                            S("div", $u, [
                                S("nav", Vu, [
                                    C(i),
                                    S(
                                        "button",
                                        {
                                            class: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground w-9 h-9",
                                            "aria-label": "Open Settings",
                                            onClick: t[0] || (t[0] = (...ce) => o.openDialog && o.openDialog(...ce)),
                                        },
                                        [C(l, { strokeWidth: "1.5", class: "w-5 h-5 text-foreground" })],
                                    ),
                                ]),
                            ]),
                        ]),
                    ]),
                    C(a),
                    Uu,
                    S("div", Fu, [C(h, null, { default: I(() => [Bu, C(u, null, { default: I(() => [G("New Product:")]), _: 1 }), C(f, { class: "space-y-2" }, { default: I(() => [zu, Hu]), _: 1 })]), _: 1 })]),
                    S("div", Gu, [C(h, null, { default: I(() => [Wu, C(u, null, { default: I(() => [G("Tips:")]), _: 1 }), C(f, { class: "space-y-2" }, { default: I(() => [Ku, qu]), _: 1 })]), _: 1 })]),
                    C(
                        z,
                        { class: "my-6 w-[96%] lg:w-[1160px] mx-auto overflow-hidden" },
                        {
                            default: I(() => [
                                C(L, null, { default: I(() => [C(m, null, { default: I(() => [G("Download M3U8 Video")]), _: 1 }), C(v, null, { default: I(() => [G(" Transport Stream Download (Recommended)"), Yu]), _: 1 })]), _: 1 }),
                                C(j, null, {
                                    default: I(() => [
                                        S("div", Xu, [
                                            C(A, { placeholder: "Please enter the M3U8 URL", modelValue: s.url, "onUpdate:modelValue": t[1] || (t[1] = (ce) => (s.url = ce)), disabled: s.downloading }, null, 8, ["modelValue", "disabled"]),
                                            s.isComplete
                                                ? (R(), H("div", Ju, [C(O, { onClick: o.reDownload }, { default: I(() => [G(" Download Again ")]), _: 1 }, 8, ["onClick"])]))
                                                : (R(),
                                                  H("div", Zu, [
                                                      C(O, { class: "max-md:w-[100%]", onClick: t[2] || (t[2] = async () => await o.downloadVideo("ts")) }, { default: I(() => [G(" TS Download ")]), _: 1 }),
                                                      C(O, { class: "max-md:w-[100%]", onClick: t[3] || (t[3] = async () => await o.downloadVideo("mp4")) }, { default: I(() => [G(" MP4 Download ")]), _: 1 }),
                                                      C(O, { class: "max-md:w-[100%]", onClick: o.checkOrPlay }, { default: I(() => [G(" Check M3U8 ")]), _: 1 }, 8, ["onClick"]),
                                                      C(
                                                          O,
                                                          {
                                                              class: "max-md:w-[100%]",
                                                              onClick:
                                                                  t[4] ||
                                                                  (t[4] = async () => {
                                                                      await o.parseM3U8(!0);
                                                                  }),
                                                          },
                                                          { default: I(() => [G(" Parse M3U8 ")]), _: 1 },
                                                      ),
                                                  ])),
                                        ]),
                                    ]),
                                    _: 1,
                                }),
                            ]),
                            _: 1,
                        },
                    ),
                    s.streamRenditions.length
                        ? (R(),
                          xe(
                              z,
                              { key: 0, class: "my-6 w-[96%] lg:w-[1160px] mx-auto overflow-hidden" },
                              {
                                  default: I(() => [
                                      C(L, null, {
                                          default: I(() => [
                                              C(m, null, { default: I(() => [G("Parse M3U8 Data")]), _: 1 }),
                                              C(v, null, { default: I(() => [G(" Parse the M3U8 data and display the video information. "), Qu, G(' Select the video, then click the "TS Download" button or "MP4 Download" button to download the video. ')]), _: 1 }),
                                          ]),
                                          _: 1,
                                      }),
                                      C(j, null, {
                                          default: I(() => [
                                              s.streamRenditions.length
                                                  ? (R(),
                                                    H("div", ed, [
                                                        (R(!0),
                                                        H(
                                                            fe,
                                                            null,
                                                            Hn(
                                                                s.streamRenditions,
                                                                (ce, ee) => (
                                                                    R(),
                                                                    H("div", { key: ee, class: "py-3 flex items-center" }, [
                                                                        C(M, { class: "w-6 h-6 dark:text-foreground/60", "stroke-width": "1.5" }),
                                                                        S("div", td, Be(ce), 1),
                                                                        S("div", nd, [
                                                                            C(
                                                                                O,
                                                                                {
                                                                                    variant: "outline",
                                                                                    size: "xs",
                                                                                    onClick: () => {
                                                                                        s.url = ce;
                                                                                    },
                                                                                },
                                                                                { default: I(() => [G("Select")]), _: 2 },
                                                                                1032,
                                                                                ["onClick"],
                                                                            ),
                                                                        ]),
                                                                    ])
                                                                ),
                                                            ),
                                                            128,
                                                        )),
                                                    ]))
                                                  : (R(), H("div", rd, od)),
                                          ]),
                                          _: 1,
                                      }),
                                  ]),
                                  _: 1,
                              },
                          ))
                        : St("", !0),
                    C(
                        z,
                        { class: "my-6 w-[96%] lg:w-[1160px] mx-auto overflow-hidden" },
                        {
                            default: I(() => [
                                C(L, null, { default: I(() => [C(m, null, { default: I(() => [G("Download Info")]), _: 1 }), C(v, null, { default: I(() => [G(" Show the download information. "), id]), _: 1 })]), _: 1 }),
                                C(j, null, {
                                    default: I(() => [
                                        s.finishList.length
                                            ? (R(),
                                              H(
                                                  fe,
                                                  { key: 0 },
                                                  [
                                                      S("div", ld, [S("div", ad, [C(O, { onClick: o.forceDownload }, { default: I(() => [G("Forced Download")]), _: 1 }, 8, ["onClick"]), C(O, { variant: "outline", onClick: t[5] || (t[5] = (ce) => o.retryAll(!0)) }, { default: I(() => [G("Retry Errors")]), _: 1 })])]),
                                                      S("div", null, [
                                                          C(We, null, {
                                                              default: I(() => [
                                                                  C($, null, {
                                                                      default: I(() => [
                                                                          C(Q, null, {
                                                                              default: I(() => [
                                                                                  C(F, { class: "" }, { default: I(() => [G(" Total ")]), _: 1 }),
                                                                                  C(F, null, { default: I(() => [G("Failed")]), _: 1 }),
                                                                                  C(F, null, { default: I(() => [G("Downloaded")]), _: 1 }),
                                                                                  C(F, { class: "text-right" }, { default: I(() => [G(" Progress ")]), _: 1 }),
                                                                              ]),
                                                                              _: 1,
                                                                          }),
                                                                      ]),
                                                                      _: 1,
                                                                  }),
                                                                  C(Ce, null, {
                                                                      default: I(() => [
                                                                          C(Q, null, {
                                                                              default: I(() => [
                                                                                  C(be, { class: "font-medium" }, { default: I(() => [G(Be(s.tsUrlList.length), 1)]), _: 1 }),
                                                                                  C(be, null, { default: I(() => [G(Be(s.errorNum), 1)]), _: 1 }),
                                                                                  C(be, null, { default: I(() => [G(Be(s.finishNum), 1)]), _: 1 }),
                                                                                  C(be, { class: "text-right" }, { default: I(() => [G(Be(((s.finishNum / s.tsUrlList.length) * 100).toFixed(2)) + "% ", 1)]), _: 1 }),
                                                                              ]),
                                                                              _: 1,
                                                                          }),
                                                                      ]),
                                                                      _: 1,
                                                                  }),
                                                              ]),
                                                              _: 1,
                                                          }),
                                                      ]),
                                                      s.errorNum
                                                          ? (R(),
                                                            H("div", cd, [
                                                                S("div", ud, " Failed: " + Be(s.errorNum), 1),
                                                                S("div", dd, [
                                                                    (R(!0),
                                                                    H(
                                                                        fe,
                                                                        null,
                                                                        Hn(
                                                                            s.finishList,
                                                                            (ce, ee) => (
                                                                                R(),
                                                                                H(
                                                                                    fe,
                                                                                    null,
                                                                                    [
                                                                                        ce.status.trim() == "error"
                                                                                            ? (R(), H("div", { key: 0, class: le(["bg-gray-400 h-8 flex justify-center items-center text-white text-xs cursor-pointer", { "!bg-red-500": ce.status.trim() == "error" }]), onClick: (te) => o.retry(ee) }, Be(ee + 1), 11, fd))
                                                                                            : St("", !0),
                                                                                    ],
                                                                                    64,
                                                                                )
                                                                            ),
                                                                        ),
                                                                        256,
                                                                    )),
                                                                ]),
                                                            ]))
                                                          : St("", !0),
                                                      s.finishNum
                                                          ? (R(),
                                                            H("div", hd, [
                                                                S("div", pd, " Downloaded: " + Be(s.finishNum), 1),
                                                                S("div", md, [
                                                                    (R(!0),
                                                                    H(
                                                                        fe,
                                                                        null,
                                                                        Hn(
                                                                            s.finishList,
                                                                            (ce, ee) => (
                                                                                R(),
                                                                                H(
                                                                                    fe,
                                                                                    null,
                                                                                    [
                                                                                        ce.status.trim() == "finish"
                                                                                            ? (R(), H("div", { key: 0, class: le(["bg-gray-400 h-8 flex justify-center items-center text-white text-xs cursor-pointer", { "!bg-green-500": ce.status.trim() == "finish" }]), onClick: (te) => o.retry(ee) }, Be(ee + 1), 11, gd))
                                                                                            : St("", !0),
                                                                                    ],
                                                                                    64,
                                                                                )
                                                                            ),
                                                                        ),
                                                                        256,
                                                                    )),
                                                                ]),
                                                            ]))
                                                          : St("", !0),
                                                  ],
                                                  64,
                                              ))
                                            : (R(), H("div", bd, _d)),
                                    ]),
                                    _: 1,
                                }),
                            ]),
                            _: 1,
                        },
                    ),
                    S("div", yd, [
                        C(
                            Ke,
                            { type: "single", collapsible: "" },
                            {
                                default: I(() => [
                                    C(q, { value: "item-1" }, { default: I(() => [C(Se, null, { default: I(() => [G("How to get M3U8 URL")]), _: 1 }), C(Ee, { class: "space-y-3" }, { default: I(() => [wd, xd, Cd]), _: 1 })]), _: 1 }),
                                    C(q, { value: "item-2" }, { default: I(() => [C(Se, null, { default: I(() => [G("How to download M3U8 Video")]), _: 1 }), C(Ee, { class: "space-y-3" }, { default: I(() => [Sd, Td, Ad]), _: 1 })]), _: 1 }),
                                    C(q, { value: "item-3" }, { default: I(() => [C(Se, { class: "text-left" }, { default: I(() => [G(" Still can't download the video even after using a Chrome extension ")]), _: 1 }), C(Ee, { class: "space-y-3" }, { default: I(() => [G(" Free Online Screen Recorder "), kd, Id]), _: 1 })]), _: 1 }),
                                ]),
                                _: 1,
                            },
                        ),
                    ]),
                ]),
                uo(
                    S(
                        "div",
                        Ed,
                        [
                            S("div", Md, [
                                C(O, { variant: "outline", size: "icon", class: "absolute right-2 top-2", onClick: t[6] || (t[6] = (ce) => (s.open = !1)) }, { default: I(() => [C(Ue, { strokeWidth: "{1.5}", class: "w-4 h-4" })]), _: 1 }),
                                S("div", null, [S("div", Rd, [Od, S("div", Pd, [Ld, C(A, { modelValue: s.downloadThreads, "onUpdate:modelValue": t[7] || (t[7] = (ce) => (s.downloadThreads = ce)), class: "flex-1", type: "number", min: "1", max: "20", step: "1" }, null, 8, ["modelValue"])]), Nd])]),
                                S("div", Dd, [C(O, { class: "w-full", onClick: o.saveSettings }, { default: I(() => [G("Save")]), _: 1 }, 8, ["onClick"])]),
                            ]),
                        ],
                        512,
                    ),
                    [[Zl, s.open]],
                ),
                S("div", jd, [S("footer", null, [S("div", $d, [Vd, S("div", Ud, [S("p", Fd, [G(" © " + Be(o.year) + " ", 1), Bd, G(", Inc. All rights reserved. ")])])])])]),
            ],
            64,
        )
    );
}
const Hd = Ou(Pu, [["render", zd]]);
ya(Hd).mount("#app");
