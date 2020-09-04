/*TECH.MEITUAN.COM*/
!function(t, i) {
    if ("object" == typeof exports && "object" == typeof module)
        module.exports = i(require("Zepto"));
    else if ("function" == typeof define && define.amd)
        define(["Zepto"], i);
    else {
        var e = i("object" == typeof exports ? require("Zepto") : t.Zepto);
        for (var n in e)
            ("object" == typeof exports ? exports : t)[n] = e[n]
    }
}("undefined" != typeof self ? self : this, function(t) {
    return webpackJsonp([1], {
        0: function(i, e) {
            i.exports = t
        },
        42: function(t, i, e) {
            t.exports = {
                default: e(90),
                __esModule: !0
            }
        },
        85: function(t, i, e) {
            "use strict";
            e(1),
            e(86);
            var n = e(87)
              , s = e(89);
            e(32).isIosDevice() ? n.init(".maze-static-container", 10) : s.init(".maze-game-container", {
                level_size: [60, 32]
            })
        },
        86: function(t, i) {},
        87: function(t, i, e) {
            "use strict";
            function n(t, i) {
                return parseInt(Math.random() * (i - t) + t)
            }
            function s() {
                this.size = [40, 40],
                this.star = [n(1, 39), n(1, 39)],
                this.inited = !1,
                this.init = function() {
                    this.nodes = [];
                    for (var t = 0; t < this.size[1]; t++) {
                        this.nodes[t] = [];
                        for (var i = 0; i < this.size[0]; i++)
                            this.nodes[t][i] = new o(this,i,t)
                    }
                    this.inited = !0
                }
                ,
                this.get_node = function(t, i) {
                    return this.inited && t >= 0 && t < this.size[0] && i >= 0 && i < this.size[1] && this.nodes[i][t]
                }
                ,
                this.create = function() {
                    function t(t, i) {
                        var e = .5 * i.branches_count() + 10 * i[t]().branches_count();
                        return Math.pow(.4, e)
                    }
                    this.inited || this.init();
                    var i, e = 0, n = [], s = this.nodes[0][0], o = 0;
                    for (n.push(this.nodes[0][0]); n.length > 0; ) {
                        var r = function(i) {
                            if (i.inited)
                                return [];
                            for (var e, n = [], s = ["top", "left", "bottom", "right"], o = 0; o < s.length && (e = s[o]); o++)
                                i[e]() && !i.dir[e] && Math.random() < t(e, i) && (i.open(e),
                                n.push(i[e]()));
                            return i.inited = !0,
                            n
                        }(i = n.pop());
                        i.x >= s.x && i.y >= s.y && (s = i);
                        for (var h = 0; h < r.length; h++)
                            n.unshift(r[h]);
                        o < n.length && (o = n.length),
                        0 === n.length && !this.nodes[this.size[1] - 1][this.size[0] - 1].inited && ++e < 1e3 && (s.inited = !1,
                        n.push(s))
                    }
                }
                ,
                this.toHTMLObject = function() {
                    var t = document.createElement("div");
                    t.className = "maze-wrap",
                    this.inited || this.init();
                    for (var i = 0; i < this.size[1]; i++)
                        for (var e = 0; e < this.size[0]; e++) {
                            var n = document.createElement("div");
                            n.className = "maze-item",
                            n.x = e,
                            n.y = i,
                            n.style.left = 9 * e + "px",
                            n.style.top = 9 * i + "px";
                            for (var s in this.nodes[i][e].dir)
                                this.nodes[i][e].dir.hasOwnProperty(s) && (n.className = n.className + " maze-has-" + s.toLowerCase() + "-border");
                            this.star[0] === i && this.star[1] === e && (n.className = n.className + " maze-bingo"),
                            t.appendChild(n)
                        }
                    return t
                }
            }
            function o(t, i, e) {
                this.maze = t,
                this.x = i || 0,
                this.y = e || 0,
                this.dir = {},
                this.inited = !1,
                this.left = function() {
                    return this.maze.get_node(i - 1, e)
                }
                ,
                this.right = function() {
                    return this.maze.get_node(i + 1, e)
                }
                ,
                this.top = function() {
                    return this.maze.get_node(i, e - 1)
                }
                ,
                this.bottom = function() {
                    return this.maze.get_node(i, e + 1)
                }
                ,
                this.open = function(t) {
                    switch (t) {
                    case "top":
                        this.dir.top = this.top().dir.bottom = !0;
                        break;
                    case "bottom":
                        this.dir.bottom = this.bottom().dir.top = !0;
                        break;
                    case "left":
                        this.dir.left = this.left().dir.right = !0;
                        break;
                    case "right":
                        this.dir.right = this.right().dir.left = !0
                    }
                }
                ,
                this.branches_count = function() {
                    var t = 0;
                    for (var i in this.dir)
                        this.dir.hasOwnProperty(i) && t++;
                    return t
                }
            }
            function r(t) {
                var i = new s;
                i.create(),
                h(t).append(i.toHTMLObject())
            }
            e(88);
            var h = e(0);
            t.exports = {
                init: r
            }
        },
        88: function(t, i) {},
        89: function(t, i, e) {
            "use strict";
            function n(t, i) {
                var e, n = {
                    onGameEnd: function(t) {},
                    onStart: function() {}
                };
                n = (0,
                o.default)(n, i);
                var s = $(t);
                s.addClass("enable-game"),
                e = new r(s.find(".maze-content").get(0),n),
                s.trigger("focus"),
                $(window).on("keydown", function(t) {
                    var i = t.keyCode || t.which
                      , n = {
                        37: "left",
                        38: "up",
                        39: "right",
                        40: "down",
                        65: "left",
                        87: "up",
                        68: "right",
                        83: "down"
                    };
                    if (null !== n[i] && void 0 !== n[i])
                        return e.move(n[i]),
                        !1
                })
            }
            var s = e(42)
              , o = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(s);
            e(93);
            var r = e(94);
            t.exports = {
                init: n
            }
        },
        90: function(t, i, e) {
            e(91),
            t.exports = e(3).Object.assign
        },
        91: function(t, i, e) {
            var n = e(11);
            n(n.S + n.F, "Object", {
                assign: e(92)
            })
        },
        92: function(t, i, e) {
            "use strict";
            var n = e(13)
              , s = e(31)
              , o = e(18)
              , r = e(28)
              , h = e(39)
              , a = Object.assign;
            t.exports = !a || e(8)(function() {
                var t = {}
                  , i = {}
                  , e = Symbol()
                  , n = "abcdefghijklmnopqrst";
                return t[e] = 7,
                n.split("").forEach(function(t) {
                    i[t] = t
                }),
                7 != a({}, t)[e] || Object.keys(a({}, i)).join("") != n
            }) ? function(t, i) {
                for (var e = r(t), a = arguments.length, c = 1, f = s.f, u = o.f; a > c; )
                    for (var l, d = h(arguments[c++]), g = f ? n(d).concat(f(d)) : n(d), p = g.length, x = 0; p > x; )
                        u.call(d, l = g[x++]) && (e[l] = d[l]);
                return e
            }
            : a
        },
        93: function(t, i) {},
        94: function(t, i, e) {
            "use strict";
            function n(t, i) {
                function e(t, i) {
                    this.visited = !1,
                    this.up = !0,
                    this.right = !0,
                    this.down = !0,
                    this.left = !0,
                    this.x = t,
                    this.y = i
                }
                function n() {
                    this.randomInt = function(t) {
                        return Math.floor(Math.random() * t)
                    }
                    ,
                    this.pickRand = function(t) {
                        return t[this.randomInt(t.length)]
                    }
                }
                function s(t, n) {
                    this.m = [],
                    this.width = t,
                    this.height = n,
                    this.start = i.starting_position,
                    this.end = {
                        x: this.width - 1,
                        y: this.height - 1
                    },
                    this.c,
                    this.nextC,
                    this.stack = [],
                    this.initMaze = function() {
                        for (var i = 0; i < n; i++) {
                            this.m.push([]);
                            for (var s = 0; s < t; s++)
                                this.m[i].push(new e(s,i))
                        }
                    }
                    ,
                    this.getNeighbors = function(i, e) {
                        var s = [];
                        this.getCell(i, e);
                        return 0 != e && s.push(this.getCell(i, e - 1)),
                        e != n - 1 && s.push(this.getCell(i, e + 1)),
                        0 != i && s.push(this.getCell(i - 1, e)),
                        i != t - 1 && s.push(this.getCell(i + 1, e)),
                        s
                    }
                    ,
                    this.availableNeighbors = function(t, i) {
                        for (var e = [], n = this.getNeighbors(t, i), s = 0; s < n.length; s++)
                            n[s].visited || e.push(n[s]);
                        return e
                    }
                    ,
                    this.randomNeighbor = function(t, i) {
                        return w.pickRand(this.availableNeighbors(t, i))
                    }
                    ,
                    this.breakWall = function(t, i) {
                        t.x == i.x ? (t.y < i.y && (t.down = !1,
                        i.up = !1),
                        t.y > i.y && (t.up = !1,
                        i.down = !1)) : t.y == i.y && (t.x < i.x && (t.right = !1,
                        i.left = !1),
                        t.x > i.x && (t.left = !1,
                        i.right = !1))
                    }
                    ,
                    this.getCell = function(t, i) {
                        return this.m[i][t]
                    }
                    ,
                    this.inBounds = function(t, i) {
                        return t >= 0 && t < this.width && i >= 0 && i < this.height
                    }
                    ,
                    this.isDeadEnd = function(t, i) {
                        for (var e = this.getNeighbors(t, i), n = 0; n < e.length; n++)
                            if (!e[n].visited)
                                return !1;
                        return !0
                    }
                    ,
                    this.isStart = function(t, i) {
                        return this.start.x === t && this.start.y === i
                    }
                    ,
                    this.isEnd = function(t, i) {
                        return this.end.x === t && this.end.y === i
                    }
                    ,
                    this.generateMaze = function() {
                        for (this.c = this.getCell(w.randomInt(this.width), w.randomInt(this.height)),
                        this.c.visited = !0,
                        this.mazeDo(); 0 !== this.stack.length; )
                            this.isDeadEnd(this.c.x, this.c.y) || this.isEnd(this.c.x, this.c.y) || this.isStart(this.c.x, this.c.y) ? (this.nextC = this.stack.pop(),
                            this.c = this.nextC) : this.mazeDo()
                    }
                    ,
                    this.mazeDo = function() {
                        this.nextC = this.randomNeighbor(this.c.x, this.c.y),
                        this.nextC.visited = !0,
                        this.breakWall(this.c, this.nextC),
                        this.stack.push(this.c),
                        this.c = this.nextC
                    }
                    ,
                    this.initMaze(),
                    this.generateMaze()
                }
                function r(e, n) {
                    v = new s(e,n),
                    x = i.starting_position,
                    m = [],
                    m.push(x),
                    t.width = v.width * i.scale + 3,
                    t.height = v.height * i.scale + 3,
                    a()
                }
                function h() {
                    y = !0,
                    i.onStart()
                }
                function a() {
                    p.clearRect(0, 0, t.width, t.height),
                    c(),
                    f()
                }
                function c() {
                    p.lineWidth = i.user_path_width,
                    p.strokeStyle = i.colors.visited_block,
                    p.beginPath(),
                    p.moveTo(i.offset.x + .5 * i.scale, 0);
                    for (var t = 0; t < m.length - 1; t++)
                        p.lineTo(i.offset.x + (m[t].x + .5) * i.scale, i.offset.y + (m[t].y + .5) * i.scale);
                    p.lineTo(i.offset.x + (x.x + .5) * i.scale, i.offset.y + (x.y + .5) * i.scale),
                    p.stroke(),
                    d(x.x, x.y, i.colors.current_position)
                }
                function f() {
                    d(v.end.x, v.end.y, i.colors.finish);
                    for (var t = 0; t < v.height; t++)
                        for (var e = 0; e < v.width; e++)
                            u(e, t)
                }
                function u(t, e) {
                    var n = v.getCell(t, e)
                      , s = t * i.scale
                      , o = e * i.scale;
                    n.up && !v.isStart(n.x, n.y) && l(s, o, s + i.scale, o),
                    n.down && !v.isEnd(n.x, n.y) && l(s, o + i.scale, s + i.scale, o + i.scale),
                    n.right && l(s + i.scale, o, s + i.scale, o + i.scale),
                    n.left && l(s, o, s, o + i.scale)
                }
                function l(t, e, n, s) {
                    p.beginPath(),
                    p.strokeStyle = i.colors.walls,
                    p.lineWidth = 2,
                    p.moveTo(i.offset.x + t + 1, i.offset.y + e + 1),
                    p.lineTo(i.offset.x + n + 1, i.offset.y + s + 1),
                    p.stroke()
                }
                function d(t, e, n) {
                    p.fillStyle = n,
                    p.beginPath(),
                    p.arc(i.offset.x + (t + .5) * i.scale, i.offset.y + (e + .5) * i.scale, i.user_diameter, 0, 2 * Math.PI, !0),
                    p.closePath(),
                    p.fill()
                }
                var g = {
                    colors: {
                        walls: "#E95420",
                        current_position: "#67b9e8",
                        finish: "#65c644",
                        visited_block: "#d7edff"
                    },
                    starting_position: {
                        x: 0,
                        y: 0
                    },
                    level_size: [60, 32],
                    offset: {
                        x: 0,
                        y: 0
                    },
                    scale: 26,
                    user_diameter: 4,
                    user_path_width: 8,
                    onStart: function() {},
                    onGameEnd: function() {},
                    onMove: function() {}
                };
                i = (0,
                o.default)({}, g, i);
                var p, x, v, m, y, b = {
                    left: {
                        x: -1,
                        y: 0
                    },
                    up: {
                        x: 0,
                        y: -1
                    },
                    right: {
                        x: 1,
                        y: 0
                    },
                    down: {
                        x: 0,
                        y: 1
                    }
                }, w = new n;
                this.init = function() {
                    t.getContext && (p = t.getContext("2d"),
                    r(i.level_size[0], i.level_size[1]),
                    h())
                }
                ,
                this.init(),
                this.move = function(t) {
                    var e = {
                        x: x.x + b[t].x,
                        y: x.y + b[t].y
                    };
                    y && v.inBounds(e.x, e.y) && !1 === v.getCell(x.x, x.y)[t] && (m.push(e),
                    x = e,
                    a(),
                    v.isEnd(e.x, e.y) && (y = !1,
                    i.onGameEnd(!0)))
                }
                ,
                this.getSteps = function() {
                    return m.length - 1
                }
            }
            var s = e(42)
              , o = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                }
            }(s);
            t.exports = n
        }
    }, [85])
});
