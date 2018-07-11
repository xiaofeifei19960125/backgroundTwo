var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _class2, _temp, _initialiseProps, _class9, _temp2, _initialiseProps2;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Point
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Point = function () {
    function Point(x, y) {
        _classCallCheck(this, Point);

        this.x = x;
        this.y = y;
    }

    _createClass(Point, [{
        key: 'clone',
        value: function clone() {
            return new Point(this.x, this.y);
        }
    }, {
        key: 'delta',
        value: function delta(point) {
            return [this.x - point.x, this.y - point.y];
        }
    }, {
        key: 'distance',
        value: function distance(point) {
            var dx = point.x - this.x;
            var dy = point.y - this.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }, {
        key: 'moveTo',
        value: function moveTo(x, y) {
            this.x = x;
            this.y = y;
            return this;
        }
    }, {
        key: 'move',
        value: function move(x, y) {
            this.x += x;
            this.y += y;
            return this;
        }
    }, {
        key: 'moveAtAngle',
        value: function moveAtAngle(angle, distance) {
            this.x += Math.cos(angle) * distance;
            this.y += Math.sin(angle) * distance;
            return this;
        }
    }, {
        key: 'applyVelocity',
        value: function applyVelocity(velocity) {
            this.x += velocity.vx;
            this.y += velocity.vy;
            return this;
        }
    }, {
        key: 'angleRadians',
        value: function angleRadians(point) {
            // radians = atan2(deltaY, deltaX)
            var y = point.y - this.y;
            var x = point.x - this.x;
            return Math.atan2(y, x);
        }
    }, {
        key: 'angleDeg',
        value: function angleDeg(point) {
            // degrees = atan2(deltaY, deltaX) * (180 / PI)
            var y = point.y - this.y;
            var x = point.x - this.x;
            return Math.atan2(y, x) * (180 / Math.PI);
        }
    }, {
        key: 'rotate',
        value: function rotate(origin, radians) {
            // rotate the point around a given origin point
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            this.x = cos * (this.x - origin.x) + sin * (this.y - origin.y) + origin.x;
            this.y = cos * (this.y - origin.y) - sin * (this.x - origin.x) + origin.y;
            return this;
        }
    }, {
        key: 'position',
        get: function get() {
            return [this.x, this.y];
        }
    }]);

    return Point;
}();

var Entity = function Entity() {
    var _this = this;

    _classCallCheck(this, Entity);

    this.dpr = window.devicePixelRatio || 1;

    this.toValue = function (value) {
        return value * _this.dpr;
    };

    this.draw = function () {};

    this.update = function () {};
};

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Spring
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Spring = (_temp = _class2 = function (_Point) {
    _inherits(Spring, _Point);

    function Spring(_ref) {
        var x = _ref.x,
            y = _ref.y,
            isFixed = _ref.isFixed,
            _ref$mass = _ref.mass,
            mass = _ref$mass === undefined ? 10 : _ref$mass,
            _ref$elasticity = _ref.elasticity,
            elasticity = _ref$elasticity === undefined ? 0.4 : _ref$elasticity,
            _ref$damping = _ref.damping,
            damping = _ref$damping === undefined ? 0.05 : _ref$damping;

        _classCallCheck(this, Spring);

        var _this2 = _possibleConstructorReturn(this, (Spring.__proto__ || Object.getPrototypeOf(Spring)).call(this, x, y));

        _initialiseProps.call(_this2);

        _this2.ox = x; // original origin x, never changes
        _this2.oy = y; // original origin y, never changes
        _this2.vx = 0; // velocity x
        _this2.vy = 0; // velocity y
        _this2.fx = 0; // force x
        _this2.fy = 0; // force y

        _this2.isFixed = isFixed; // indeicates whether this point can be moved

        // spring constants
        _this2.mass = mass;
        _this2.elasticity = elasticity;
        _this2.damping = damping;
        return _this2;
    }

    _createClass(Spring, [{
        key: 'applyForce',
        value: function applyForce(x, y) {
            this.fx += x;
            this.fy += y;
        }
    }, {
        key: 'addAttractor',
        // just testing

        value: function addAttractor(point) {
            this.attractors = [].concat(_toConsumableArray(this.attractors), [point]);
        }
    }, {
        key: 'setAdjacentForces',
        value: function setAdjacentForces() {
            var _this3 = this;

            // currently unused, was testing out an
            this.attractors.forEach(function (point, i) {
                var x = point.x,
                    y = point.y;


                var force = { x: 0, y: 0 }; // prev point force
                var x1 = point.x,
                    y1 = point.y;
                var x2 = _this3.x,
                    y2 = _this3.y;


                force.x = x1 - x2;
                force.y = y1 - y2;

                // apply adjacent forces to current spring
                _this3.applyForce(force.x, force.y);
            });
        }
    }, {
        key: 'setSpringForce',
        value: function setSpringForce() {
            // force to origin, difference multiplied by elasticity constant
            var fx = (this.ox - this.x) * this.elasticity;
            var fy = (this.oy - this.y) * this.elasticity;

            // sum forces
            this.fx += fx;
            this.fy += fy;
        }
    }, {
        key: 'solveVelocity',
        value: function solveVelocity() {
            if (this.fx === 0 && this.fy === 0) return;

            // acceleration = force / mass;
            var ax = this.fx / this.mass;
            var ay = this.fy / this.mass;

            // velocity, apply damping then ad acceleration
            this.vx = this.damping * this.vx + ax;
            this.vy = this.damping * this.vy + ay;

            // add velocity to center and top/left
            this.x += this.vx;
            this.y += this.vy;

            // reset any applied forces
            this.fx = 0;
            this.fy = 0;
        }
    }]);

    return Spring;
}(Point), _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this.attractors = [];

    this.update = function (_ref2) {
        var pointer = _ref2.pointer;

        if (_this4.isFixed) return;
        _this4.setSpringForce();
        _this4.setAdjacentForces();
        _this4.solveVelocity();
    };

    this.draw = function (_ref3) {
        var ctx = _ref3.ctx;

        // temporary, just to see what's happening
        var x = _this4.x,
            y = _this4.y;

        ctx.fillStyle = 'white';
        ctx.lineWidth = 5;
        ctx.fillRect(x - 2, y - 2, 4, 4);
    };
}, _temp);

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Link
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

// defaults and constants

var DPR = window.devicePixelRatio || 1;
var MOUSE_STRENGTH = 0.7; // 0 - 1
var MOUSE_RADIUS = 100 * DPR;

var Link = function (_Point2) {
    _inherits(Link, _Point2);

    function Link(_ref4) {
        var x = _ref4.x,
            y = _ref4.y,
            isFixed = _ref4.isFixed,
            _ref4$mass = _ref4.mass,
            mass = _ref4$mass === undefined ? 2.8 : _ref4$mass;

        _classCallCheck(this, Link);

        var _this5 = _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this, x, y));

        _this5.update = function (_ref5) {
            var pointer = _ref5.pointer,
                tick = _ref5.tick;

            if (_this5.isFixed) return;
            _this5.applyForceFromMouse(pointer);
            _this5.solveLinks();
            _this5.solveVelocity(tick);
        };

        _this5.draw = function (_ref6) {
            // temporary, just to see what's happening

            var ctx = _ref6.ctx;
        };

        _this5.vx = 0; // velocity x
        _this5.vy = 0; // velocity y
        _this5.fx = 0; // force x
        _this5.fy = 0; // force y
        _this5.mass = mass;
        _this5.links = [];
        _this5.restingDist = null;
        _this5.isFixed = isFixed; // indicates whether this point can be moved
        _this5.iterations = Array(10).fill(null); // more solutions, more accurate
        return _this5;
    }

    _createClass(Link, [{
        key: 'applyForce',
        value: function applyForce(x, y) {
            this.fx += x;
            this.fy += y;
        }
    }, {
        key: 'addLink',
        value: function addLink(point) {
            var _this6 = this;

            this.links = [].concat(_toConsumableArray(this.links), [point]);
            this.links = this.links.map(function (link) {
                if (link.restingDist) return link;
                link.restingDist = link.distance(_this6);
                return link;
            });
        }
    }, {
        key: 'solveLinks',
        value: function solveLinks() {
            var _this7 = this;

            // verlet relax constraints solution
            // solve multiple time for accuracy
            this.iterations.forEach(function () {
                _this7.links.forEach(function (link, i) {
                    var restingDist = link.restingDist;

                    var currentDist = link.distance(_this7);

                    var _link$delta = link.delta(_this7),
                        _link$delta2 = _slicedToArray(_link$delta, 2),
                        diffX = _link$delta2[0],
                        diffY = _link$delta2[1];

                    // difference scalar


                    var diff = (restingDist - currentDist) / currentDist;

                    // translation for each axis
                    // pushed 1/2 the required distance to match their resting distances.
                    var translateX = diffX * 0.5 * diff;
                    var translateY = diffY * 0.5 * diff;

                    !_this7.isFixed && _this7.move(-translateX, -translateY);
                    !link.isFixed && link.move(translateX, translateY);

                    !_this7.isFixed && _this7.applyForce(-translateX, -translateY);
                    !link.isFixed && link.applyForce(translateX, translateY);
                });
            });
        }
    }, {
        key: 'applyForceFromMouse',
        value: function applyForceFromMouse(pointer) {
            var _pointer$position = pointer.position,
                x = _pointer$position.x,
                y = _pointer$position.y;


            var distance = this.distance(pointer.position);

            if (distance < MOUSE_RADIUS) {
                var _pointer$delta = pointer.delta(),
                    _pointer$delta2 = _slicedToArray(_pointer$delta, 2),
                    dx = _pointer$delta2[0],
                    dy = _pointer$delta2[1];

                var power = (1 - distance / MOUSE_RADIUS) * MOUSE_STRENGTH;

                this.applyForce(dx * power, dy * power);
            }
        }
    }, {
        key: 'solveVelocity',
        value: function solveVelocity(tick) {
            if (this.fx === 0 && this.fy === 0 || this.isFixed) return;

            // acceleration = force / mass;
            var ax = this.fx / this.mass;
            var ay = this.fy / this.mass;

            // velocity + acceleration
            this.vx = this.vx + ax;
            this.vy = this.vy + ay;

            // add velocity to center and top/left
            this.x += this.vx;
            this.y += this.vy;

            // reset any applied forces
            this.fx = 0;
            this.fy = 0;

            // baseline
            var maxY = DPR * window.innerHeight;
            if (this.y > maxY) {
                this.y = maxY;
                this.vy = 0;
                this.vx = this.vx / 2; // fake horizontal friction
            }
        }
    }]);

    return Link;
}(Point);

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Body
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Body = function (_Entity) {
    _inherits(Body, _Entity);

    function Body(_ref7) {
        var width = _ref7.width,
            height = _ref7.height,
            position = _ref7.position,
            resolution = _ref7.resolution,
            color = _ref7.color;

        _classCallCheck(this, Body);

        var _this8 = _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this));

        _this8.draw = function (_ref8) {
            var ctx = _ref8.ctx;

            // base
            ctx.fillStyle = _this8.color;
            ctx.beginPath();
            ctx.arc(_this8.position.x, _this8.position.y, _this8.width / 2, 0, Math.PI, true);
            ctx.closePath();
            ctx.fill();

            // spine
            ctx.beginPath();
            _this8.spine.forEach(function (point) {
                ctx.lineTo(point.x, point.y);
            });
            ctx.strokeStyle = _this8.color;
            ctx.lineWidth = _this8.width;
            ctx.lineCap = 'butt';
            ctx.lineJoin = 'round';
            ctx.stroke();
        };

        _this8.update = function (context) {
            var fy = Math.abs(Math.sin(context.tick / 40)) * -1 - 1;

            _this8.spine.forEach(function (point) {
                point.applyForce(Math.sin(context.tick / 100) * 0.1, fy);
                point.update(context);
            });
        };

        _this8.width = width;
        _this8.color = color;
        _this8.height = height;
        _this8.position = position;
        _this8.resolution = resolution;
        _this8.spine = [];

        _this8.constructSpine();
        _this8.setLinks(_this8.spine);
        return _this8;
    }

    _createClass(Body, [{
        key: 'constructSpine',
        value: function constructSpine() {
            var amount = this.height / this.resolution;
            var pointAmt = Math.round(amount);
            var offY = this.height / pointAmt;
            var x = this.position.x;

            for (var i = 0; i <= pointAmt; i++) {
                var y = this.position.y - offY * i;
                var point = new Link({
                    x: x,
                    y: y,
                    isFixed: i === 0
                });
                this.spine.push(point);
            }
        }
    }, {
        key: 'setLinks',
        value: function setLinks(points) {
            points.forEach(function (point, i) {
                var isLast = i === points.length - 1;
                var isFirst = i === 0;
                if (isLast) {
                    var prevPoint = points[i - 1];
                    point.addLink(prevPoint);
                } else if (isFirst) {
                    var nextPoint = points[i + 1];
                    point.addLink(nextPoint);
                } else {
                    var _prevPoint = points[i - 1];
                    var _nextPoint = points[i + 1];
                    point.addLink(_prevPoint);
                    point.addLink(_nextPoint);
                }
            });
        }
    }]);

    return Body;
}(Entity);

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Arm
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Arm = function (_Entity2) {
    _inherits(Arm, _Entity2);

    function Arm(_ref9) {
        var joint = _ref9.joint,
            length = _ref9.length,
            resolution = _ref9.resolution,
            color = _ref9.color,
            mass = _ref9.mass,
            width = _ref9.width;

        _classCallCheck(this, Arm);

        var _this9 = _possibleConstructorReturn(this, (Arm.__proto__ || Object.getPrototypeOf(Arm)).call(this));

        _this9.draw = function (_ref10) {
            var ctx = _ref10.ctx;

            // base
            ctx.fillStyle = _this9.color;
            ctx.beginPath();
            ctx.arc(_this9.joint.x, _this9.joint.y, _this9.width / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();

            ctx.strokeStyle = _this9.color;
            ctx.beginPath();
            _this9.points.forEach(function (point) {
                ctx.lineTo(point.x, point.y);
            });
            ctx.lineWidth = _this9.width;
            ctx.stroke();
        };

        _this9.joint = joint;
        _this9.length = length;
        _this9.width = width;
        _this9.resolution = resolution;
        _this9.color = color;
        _this9.points = [_this9.joint];
        _this9.mass = mass;

        _this9.constructArm();
        _this9.setLinks(_this9.points);
        return _this9;
    }

    _createClass(Arm, [{
        key: 'constructArm',
        value: function constructArm() {
            var pointAmt = Math.round(this.length / this.resolution);
            var offY = this.length / pointAmt;
            var x = this.joint.x;
            var armPoints = Math.round(this.length / this.resolution);

            for (var i = 0; i <= armPoints; i++) {
                var y = this.joint.y - offY * i;
                var isFirst = i === 0;
                var point = new Link({
                    x: x,
                    y: y,
                    mass: this.mass
                });

                if (isFirst) {
                    point.addLink(this.joint);
                }

                this.points.push(point);
            }
        }
    }, {
        key: 'setLinks',
        value: function setLinks(points) {
            points.forEach(function (point, i) {
                var isLast = i === points.length - 1;
                var isFirst = i === 0;
                if (isLast) {
                    var prevPoint = points[i - 1];
                    point.addLink(prevPoint);
                } else if (isFirst) {
                    var nextPoint = points[i + 1];
                    point.addLink(nextPoint);
                } else {
                    var _prevPoint2 = points[i - 1];
                    var _nextPoint2 = points[i + 1];
                    point.addLink(_prevPoint2);
                    point.addLink(_nextPoint2);
                }
            });
        }
    }]);

    return Arm;
}(Entity);

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Arms
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Arms = function Arms(_ref11) {
    var _this10 = this;

    var p1 = _ref11.p1,
        p2 = _ref11.p2,
        shoulderWidth = _ref11.shoulderWidth,
        length = _ref11.length,
        width = _ref11.width,
        resolution = _ref11.resolution,
        color = _ref11.color;

    _classCallCheck(this, Arms);

    this.draw = function (_ref12) {
        var ctx = _ref12.ctx;

        _this10.la.draw({ ctx: ctx });
        _this10.ra.draw({ ctx: ctx });
    };

    this.update = function (context) {
        var fy = Math.abs(Math.sin(context.tick / 40)) * -1 - 1;

        var sin = Math.sin(context.tick / 100);

        _this10.tan.update();

        _this10.la.points.forEach(function (point) {
            point.applyForce(sin * 0.1 - 1, fy);
            point.update(context);
            // context.ctx.fillStyle = 'white';
            // context.ctx.fillRect(point.x, point.y, 10, 10);
        });

        _this10.ra.points.forEach(function (point) {
            point.applyForce(sin * 0.1 + 1, fy);
            point.update(context);
        });
    };

    this.tan = new Tangent({ p1: p1, p2: p2, width: shoulderWidth });

    var config = {
        length: length,
        width: width,
        resolution: resolution,
        color: color
    };

    this.la = new Arm(_extends({}, config, {
        joint: this.tan.t1
    }));

    this.ra = new Arm(_extends({}, config, {
        joint: this.tan.t2
    }));
};

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Tangent
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Tangent = function () {
    function Tangent(_ref13) {
        var _this11 = this;

        var p1 = _ref13.p1,
            p2 = _ref13.p2,
            width = _ref13.width;

        _classCallCheck(this, Tangent);

        this.draw = function () {};

        this.update = function () {
            _this11.setCenter();
            _this11.setAngle();
            _this11.moveTangentPoints();
        };

        this.p1 = p1;
        this.p2 = p2;
        this.width = width;
        this.hw = width / 2;
        this.theta = 0;
        this.deltaTheta = 0;
        this.pi2 = Math.PI / 2;

        this.setCenter();
        this.createTangentPoints();
        this.setAngle();
        this.moveTangentPoints();
    }

    _createClass(Tangent, [{
        key: 'setCenter',
        value: function setCenter() {
            var _p1$position = _slicedToArray(this.p1.position, 2),
                x = _p1$position[0],
                y = _p1$position[1];

            var _p1$delta = this.p1.delta(this.p2),
                _p1$delta2 = _slicedToArray(_p1$delta, 2),
                dx = _p1$delta2[0],
                dy = _p1$delta2[1];

            var cx = x - dx / 2;
            var cy = y - dy / 2;
            if (this.center) {
                this.center.moveTo(cx, cy);
            } else {
                this.center = new Point(cx, cy);
            }
        }
    }, {
        key: 'createTangentPoints',
        value: function createTangentPoints() {
            this.t1 = new Link({
                x: this.center.x,
                y: this.center.y,
                isFixed: true
            });
            this.t2 = new Link({
                x: this.center.x,
                y: this.center.y,
                isFixed: true
            });
            this.t1.moveAtAngle(this.theta, -this.hw);
            this.t2.moveAtAngle(this.theta, this.hw);
        }
    }, {
        key: 'moveTangentPoints',
        value: function moveTangentPoints() {
            this.t1.moveTo(this.center.x, this.center.y).moveAtAngle(this.theta + this.pi2, -this.hw);
            this.t2.moveTo(this.center.x, this.center.y).moveAtAngle(this.theta + this.pi2, this.hw);
        }
    }, {
        key: 'setAngle',
        value: function setAngle() {
            var theta = this.p1.angleRadians(this.p2);
            this.deltaTheta = theta - this.theta;
            this.theta = theta;
        }
    }]);

    return Tangent;
}();

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Cursor
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Cursor = function (_Entity3) {
    _inherits(Cursor, _Entity3);

    function Cursor(_ref14) {
        var color = _ref14.color,
            radius = _ref14.radius;

        _classCallCheck(this, Cursor);

        var _this12 = _possibleConstructorReturn(this, (Cursor.__proto__ || Object.getPrototypeOf(Cursor)).call(this));

        _this12.draw = function (_ref15) {
            var ctx = _ref15.ctx,
                pointer = _ref15.pointer;

            ctx.strokeStyle = _this12.strokeStyle;
            ctx.lineWidth = _this12.lineWidth;
            ctx.beginPath();
            ctx.arc(pointer.position.x, pointer.position.y, _this12.radius, 0, _this12.pi2, true);
            ctx.closePath();
            ctx.stroke();
        };

        _this12.radius = _this12.toValue(radius);
        _this12.pi2 = Math.PI * 2;
        _this12.lineWidth = _this12.toValue(2);
        _this12.strokeStyle = color;
        return _this12;
    }

    return Cursor;
}(Entity);

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Eye
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Eye = (_temp2 = _class9 = function () {
    function Eye(_ref16) {
        var size = _ref16.size,
            position = _ref16.position,
            theta = _ref16.theta,
            color = _ref16.color,
            pupilColor = _ref16.pupilColor;

        _classCallCheck(this, Eye);

        _initialiseProps2.call(this);

        this.color = color;
        this.pupilColor = pupilColor;
        this.size = size;
        this.setTheta(theta);
        this.position = position;
        this.pupil = new Spring({
            x: 0,
            y: 0,
            elasticity: 0.5,
            damping: 0.3,
            mass: 30
        });
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvas.height = this.size;
        this.ctx = this.canvas.getContext('2d');
        this.drawLocal();
    }

    _createClass(Eye, [{
        key: 'setTheta',
        value: function setTheta(theta) {
            this.theta = theta + Math.PI / 2;
        }
    }, {
        key: 'drawLocal',
        value: function drawLocal() {
            this.ctx.clearRect(0, 0, this.size, this.size);
            this.ctx.save();
            this.ctx.translate(this.size / 2, this.size / 2);
            this.ctx.rotate(this.theta);

            // Create a circular clipping path
            this.ctx.beginPath();
            this.ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2, true);
            this.ctx.clip();

            // whites
            this.ctx.fillStyle = 'white';
            this.ctx.beginPath();
            this.ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.fill();

            // pupil
            this.ctx.fillStyle = this.pupilColor;
            this.ctx.beginPath();
            this.ctx.arc(this.pupil.x, this.pupil.y, this.size / 4, 0, Math.PI * 2, true);
            this.ctx.closePath();
            this.ctx.fill();

            // lid
            this.ctx.translate(-this.size / 2, -this.size / 2);
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(0, 0, this.size, this.size / 3);

            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            this.ctx.fillRect(0, 0, this.size, this.size / 3);

            this.ctx.restore();
        }
    }]);

    return Eye;
}(), _initialiseProps2 = function _initialiseProps2() {
    var _this13 = this;

    this.draw = function (_ref17) {
        var ctx = _ref17.ctx;

        _this13.drawLocal();
        ctx.drawImage(_this13.canvas, _this13.position.x - _this13.size / 2, _this13.position.y - _this13.size / 2, _this13.size, _this13.size);
    };

    this.update = function (_ref18) {
        var theta = _ref18.theta;

        _this13.setTheta(theta);
        _this13.pupil.update({});
    };
}, _temp2);

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Eyes
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Eyes = function () {
    function Eyes(_ref19) {
        var _this14 = this;

        var p1 = _ref19.p1,
            p2 = _ref19.p2,
            width = _ref19.width,
            size = _ref19.size,
            color = _ref19.color,
            pupilColor = _ref19.pupilColor;

        _classCallCheck(this, Eyes);

        this.draw = function (_ref20) {
            var ctx = _ref20.ctx;

            _this14.li.draw({ ctx: ctx });
            _this14.ri.draw({ ctx: ctx });
        };

        this.update = function (context) {
            var theta = _this14.tan.theta;


            _this14.ct1 = _this14.tan.t1.clone();
            _this14.ct2 = _this14.tan.t2.clone();

            _this14.tan.update();
            _this14.setVelocity();

            _this14.li.update(_extends({
                theta: theta
            }, context));
            _this14.ri.update(_extends({
                theta: theta
            }, context));
        };

        this.tan = new Tangent({
            p1: p1,
            p2: p2,
            width: width
        });

        this.li = new Eye({
            size: size,
            color: color,
            pupilColor: pupilColor,
            position: this.tan.t1,
            theta: this.tan.theta
        });

        this.ri = new Eye({
            size: size,
            color: color,
            pupilColor: pupilColor,
            position: this.tan.t2,
            theta: this.tan.theta
        });
    }

    _createClass(Eyes, [{
        key: 'setVelocity',
        value: function setVelocity() {
            var _tan$t1$delta = this.tan.t1.delta(this.ct1),
                _tan$t1$delta2 = _slicedToArray(_tan$t1$delta, 2),
                ldx = _tan$t1$delta2[0],
                ldy = _tan$t1$delta2[1];

            var _tan$t2$delta = this.tan.t2.delta(this.ct2),
                _tan$t2$delta2 = _slicedToArray(_tan$t2$delta, 2),
                rdx = _tan$t2$delta2[0],
                rdy = _tan$t2$delta2[1];

            this.li.pupil.applyForce(-ldx, -ldy);
            this.ri.pupil.applyForce(-rdx, -rdy);
        }
    }]);

    return Eyes;
}();

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Mouth
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Mouth = function () {
    function Mouth(_ref21) {
        var _this15 = this;

        var p1 = _ref21.p1,
            p2 = _ref21.p2,
            size = _ref21.size,
            position = _ref21.position,
            lipColor = _ref21.lipColor,
            lipWidth = _ref21.lipWidth,
            mouthColor = _ref21.mouthColor;

        _classCallCheck(this, Mouth);

        this.draw = function (_ref22) {
            var ctx = _ref22.ctx;

            _this15.drawLocal();

            ctx.drawImage(_this15.canvas, _this15.tan.center.x - _this15.size / 2, _this15.tan.center.y - _this15.size / 2, _this15.size, _this15.size);
        };

        this.update = function (_ref23) {
            var theta = _ref23.theta;

            _this15.ct = _this15.tan.center.clone();
            _this15.tan.update();
            _this15.setVelocity();
            _this15.lip.update({});
        };

        this.tan = new Tangent({ p1: p1, p2: p2, size: size });
        this.lipColor = lipColor;
        this.lipWidth = lipWidth;
        this.mouthColor = mouthColor;
        this.pad = size * 2;
        this.pad2 = size * 4;
        this.size = size + this.pad2;
        this.width = size * 1.5;
        this.center = new Point(this.size / 2, this.size / 2);
        this.position = position;
        this.hs = this.width / 2;
        // offset to account for center translation
        var off = -this.hs;

        this.lip = new Spring({
            x: this.hs + off,
            y: this.width + off,
            elasticity: 0.6,
            damping: 0.1,
            mass: 15
        });

        this.mouthLeft = new Point(off, this.hs + off);
        this.mouthRight = new Point(this.width + off, this.hs + off);

        // local canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvas.height = this.size;
        this.ctx = this.canvas.getContext('2d');
        this.drawLocal();
    }

    _createClass(Mouth, [{
        key: 'drawLocal',
        value: function drawLocal() {
            var _ctx;

            this.ctx.clearRect(0, 0, this.size, this.size);

            // save and rotate
            this.ctx.save();
            this.ctx.translate(this.size / 2, this.size / 2);
            this.ctx.rotate(this.tan.theta - Math.PI / 2);

            this.ctx.beginPath();
            (_ctx = this.ctx).moveTo.apply(_ctx, _toConsumableArray(this.mouthLeft.position));

            // control points
            var cpx1 = (this.mouthRight.x + this.lip.x) / 2;
            var cpy1 = (this.mouthRight.y + this.lip.y) / 2;
            var cpx2 = (this.lip.x + this.mouthRight.x) / 2;
            var cpy2 = (this.lip.y + this.mouthRight.y) / 2;

            // curves
            this.ctx.quadraticCurveTo(this.mouthLeft.x, this.mouthLeft.y + this.lip.y, this.lip.x, this.lip.y);
            this.ctx.quadraticCurveTo(this.mouthRight.x, this.mouthRight.y + this.lip.y, this.mouthRight.x, this.mouthRight.y);

            this.ctx.closePath();

            // drawing
            this.ctx.strokeStyle = this.lipColor;
            this.ctx.lineWidth = this.lipWidth;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';

            // mouth
            this.ctx.fillStyle = this.mouthColor;
            this.ctx.fill();
            // teeth
            this.ctx.clip();
            this.ctx.fillStyle = 'white';
            this.ctx.fillRect(this.mouthLeft.x, this.mouthLeft.y, this.width * 2, this.width / 7);
            // lips
            // this.ctx.stroke();
            this.ctx.restore();
        }
    }, {
        key: 'setVelocity',
        value: function setVelocity() {
            var _tan$center$delta = this.tan.center.delta(this.ct),
                _tan$center$delta2 = _slicedToArray(_tan$center$delta, 2),
                dx = _tan$center$delta2[0],
                dy = _tan$center$delta2[1];

            this.lip.applyForce(0, -dy * 2);
        }
    }]);

    return Mouth;
}();

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// TubeDude
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var TubeDude = function (_Entity4) {
    _inherits(TubeDude, _Entity4);

    function TubeDude(_ref24) {
        var position = _ref24.position,
            width = _ref24.width,
            height = _ref24.height,
            color = _ref24.color,
            mouthColor = _ref24.mouthColor,
            pupilColor = _ref24.pupilColor;

        _classCallCheck(this, TubeDude);

        var _this16 = _possibleConstructorReturn(this, (TubeDude.__proto__ || Object.getPrototypeOf(TubeDude)).call(this));

        _this16.draw = function (_ref25) {
            var ctx = _ref25.ctx,
                bounds = _ref25.bounds;

            _this16.body.draw({ ctx: ctx });
            _this16.eyes.draw({ ctx: ctx });
            _this16.mouth.draw({ ctx: ctx });
            _this16.arms.draw({ ctx: ctx });
        };

        _this16.update = function (context) {
            _this16.body.update(context);
            _this16.arms.update(context);
            _this16.mouth.update(context);
            _this16.eyes.update();
        };

        _this16.position = position;
        _this16.height = height;
        _this16.width = width;
        _this16.color = color;
        _this16.pupilColor = pupilColor;
        _this16.mouthColor = mouthColor;
        _this16.resolution = _this16.toValue(window.innerHeight / 30);
        _this16.buildBody();
        return _this16;
    }

    _createClass(TubeDude, [{
        key: 'buildBody',
        value: function buildBody() {
            var color = this.color,
                width = this.width,
                height = this.height,
                position = this.position,
                resolution = this.resolution,
                mouthColor = this.mouthColor,
                pupilColor = this.pupilColor;

            var pointAmt = Math.round(this.height / this.resolution);

            this.body = new Body({
                color: color,
                width: width,
                height: height,
                position: position,
                resolution: resolution
            });

            this.arms = new Arms({
                p1: this.body.spine[Math.round(pointAmt * 0.6)],
                p2: this.body.spine[Math.round(pointAmt * 0.6) + 1],
                shoulderWidth: width / 1.4,
                length: height * 0.5,
                width: width / 4,
                resolution: resolution,
                color: color
            });

            this.eyes = new Eyes({
                p1: this.body.spine[Math.round(pointAmt * 0.8)],
                p2: this.body.spine[Math.round(pointAmt * 0.8) + 1],
                color: color,
                pupilColor: pupilColor,
                size: width / 3.5,
                width: width / 2
            });

            this.mouth = new Mouth({
                p1: this.body.spine[Math.round(pointAmt * 0.8)],
                p2: this.body.spine[Math.round(pointAmt * 0.8) - 1],
                size: width / 3.5,
                lipColor: '#d16060',
                lipWidth: width / 15,
                mouthColor: mouthColor
            });
        }
    }]);

    return TubeDude;
}(Entity);

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Pointer
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Pointer = function () {
    function Pointer() {
        var _this17 = this;

        _classCallCheck(this, Pointer);

        this.update = function (_ref26) {
            var tick = _ref26.tick;

            _this17.modifier && _this17.modifier(_this17, tick);
        };

        this.dpr = window.devicePixelRatio || 1;
        this.delta;
        this.lastPosition = null;
        this.position = new Point(null, null);
        this.addListeners();
    }

    _createClass(Pointer, [{
        key: 'delta',
        value: function delta() {
            return this.position.delta(this.lastPosition);
        }
    }, {
        key: 'addListeners',
        value: function addListeners() {
            var _this18 = this;

            ['mousemove', 'touchmove'].forEach(function (event, touch) {
                window.addEventListener(event, function (e) {
                    // move previous point
                    var _position = _this18.position,
                        px = _position.x,
                        py = _position.y;

                    // disable the demo modifier if it's been added

                    if (_this18.modifier) {
                        _this18.modifier = null;
                    }

                    if (touch) {
                        e.preventDefault();
                        var x = e.targetTouches[0].clientX * _this18.dpr;
                        var y = e.targetTouches[0].clientY * _this18.dpr;
                        if (!_this18.lastPosition) {
                            _this18.lastPosition = new Point(x, y);
                        } else {
                            _this18.lastPosition.moveTo(px, py);
                        }
                        _this18.position.moveTo(x, y);
                    } else {
                        var _x = e.clientX * _this18.dpr;
                        var _y = e.clientY * _this18.dpr;
                        if (!_this18.lastPosition) {
                            _this18.lastPosition = new Point(_x, _y);
                        } else {
                            _this18.lastPosition.moveTo(px, py);
                        }
                        _this18.position.moveTo(_x, _y);
                    }
                }, false);
            });
        }
    }, {
        key: 'addPointerModifier',
        value: function addPointerModifier(modifier) {
            this.modifier = modifier;
        }
    }]);

    return Pointer;
}();

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Bounds
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Bounds = function () {
    function Bounds(x, y, w, h) {
        _classCallCheck(this, Bounds);

        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        var hw = w / 2;
        var hh = h / 2;
        this.center = new Point(hw, hh);
        this.position = new Point(x, y);
    }

    _createClass(Bounds, [{
        key: 'offsetOuter',
        value: function offsetOuter(offset) {
            var _params = _slicedToArray(this.params, 4),
                x = _params[0],
                y = _params[1],
                w = _params[2],
                h = _params[3];

            return new Bounds(x - offset, y - offset, w + offset * 2, h + offset * 2);
        }
    }, {
        key: 'offsetInner',
        value: function offsetInner(offset) {
            var _params2 = _slicedToArray(this.params, 4),
                x = _params2[0],
                y = _params2[1],
                w = _params2[2],
                h = _params2[3];

            return new Bounds(x + offset, y + offset, w - offset * 2, h - offset * 2);
        }
    }, {
        key: 'params',
        get: function get() {
            return [this.x, this.y, this.w, this.h];
        }
    }]);

    return Bounds;
}();

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Background
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Background = function (_Entity5) {
    _inherits(Background, _Entity5);

    function Background(_ref27) {
        var color = _ref27.color;

        _classCallCheck(this, Background);

        var _this19 = _possibleConstructorReturn(this, (Background.__proto__ || Object.getPrototypeOf(Background)).call(this));

        _this19.draw = function (context) {
            _this19.drawBg(context);
        };

        _this19.color = color;
        return _this19;
    }

    _createClass(Background, [{
        key: 'drawBg',
        value: function drawBg(_ref28) {
            var ctx = _ref28.ctx,
                canvas = _ref28.canvas,
                bounds = _ref28.bounds;

            ctx.fillStyle = this.color;
            ctx.fillRect.apply(ctx, _toConsumableArray(bounds.params));
        }
    }]);

    return Background;
}(Entity);

//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡/
// Canvas
//*‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡‡*/

var Canvas = function () {
    function Canvas(_ref29) {
        var _this20 = this;

        var canvas = _ref29.canvas,
            _ref29$entities = _ref29.entities,
            entities = _ref29$entities === undefined ? [] : _ref29$entities,
            pointer = _ref29.pointer;

        _classCallCheck(this, Canvas);

        this.setCanvasSize = function () {
            var _window = window,
                w = _window.innerWidth,
                h = _window.innerHeight;

            var w2 = w * _this20.dpr;
            var h2 = h * _this20.dpr;
            _this20.canvas.width = w2;
            _this20.canvas.height = h2;
            _this20.canvas.style.width = w + 'px';
            _this20.canvas.style.height = h + 'px';
            _this20.bounds = new Bounds(0, 0, w2, h2);
        };

        this.addEntity = function (newEntity) {
            _this20.entities = [].concat(_toConsumableArray(_this20.entities), [newEntity]);
            return _this20.entities.length - 1;
        };

        this.render = function () {
            // Main loop

            // Draw and Update items here.
            _this20.entities.forEach(function (_ref30) {
                var draw = _ref30.draw,
                    update = _ref30.update;

                draw(_this20);
                update(_this20);
            });

            ++_this20.tick;
            window.requestAnimationFrame(_this20.render);
        };

        // setup a canvas
        this.canvas = canvas;
        this.dpr = window.devicePixelRatio || 1;
        this.ctx = canvas.getContext('2d');
        this.ctx.scale(this.dpr, this.dpr);

        // tick counter
        this.tick = 0;

        // entities to be drawn on the canvas
        this.entities = entities;

        // track mouse/touch movement
        this.pointer = pointer || null;

        // setup and run
        this.setCanvasSize();
        this.setupListeners();
        this.render();
    }

    _createClass(Canvas, [{
        key: 'setupListeners',
        value: function setupListeners() {
            window.addEventListener('resize', this.setCanvasSize);
        }
    }, {
        key: 'removeEntity',
        value: function removeEntity(deleteIndex) {
            this.entities = this.entities.filter(function (el, i) {
                return i !== deleteIndex;
            });
            return this.entities;
        }
    }]);

    return Canvas;
}();

var bottomCenter = new Point(window.innerWidth / 2 * DPR, window.innerHeight * DPR);

var width = Math.max(window.innerWidth, window.innerHeight) / 15 * DPR;

var color = {
    bg: '#F4F3EE',
    dude1: '#E59090',
    dude2: '#E0D67A',
    dude3: '#8385D7',
    pupilColor: '#31343B',
    mouthColor: '#60464E',
    cursor: '#31343B'
};

// Kick off
new Canvas({
    canvas: document.getElementById('canvas'),
    pointer: new Pointer(),
    entities: [new Background({ color: color.bg }), new TubeDude({
        position: bottomCenter.clone().move(window.innerWidth / 6 * DPR, 0),
        color: color.dude1,
        width: width,
        height: window.innerHeight * 0.5 * DPR,
        mouthColor: color.mouthColor,
        pupilColor: color.pupilColor
    }), new TubeDude({
        position: bottomCenter.clone().move(-window.innerWidth / 6 * DPR, 0),
        color: color.dude2,
        width: width,
        height: window.innerHeight * 0.55 * DPR,
        mouthColor: color.mouthColor,
        pupilColor: color.pupilColor
    }), new TubeDude({
        position: bottomCenter,
        color: color.dude3,
        width: width,
        height: window.innerHeight * 0.6 * DPR,
        mouthColor: color.mouthColor,
        pupilColor: color.pupilColor
    }), new Cursor({ color: color.cursor, radius: 10 })]
});

function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}