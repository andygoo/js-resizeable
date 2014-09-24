/**
 * Resizeable 原生JS实现resizeable拖动改变层大小
 * @author richard chen
 * @update 2014-09-24
 * @version 1.0
 * @参数
 *     obj: 要添加resizeable的元素
 */
function Resizeable(obj) {
    return new Resizeable.prototype.init(obj);
}
Resizeable.prototype = {
    createElement: function () {
        var oE = document.createElement("div"),
            oN = document.createElement("div"),
            oNW = document.createElement("div");

        oE.className = "resizable-east";
        oN.className = "resizable-north";
        oNW.className = "resizable-north-west";

        this.obj.appendChild(oE);
        this.obj.appendChild(oN);
        this.obj.appendChild(oNW);

        this.oE = oE;
        this.oN = oN;
        this.oNW = oNW;
    },
    bindEvent: function () {
        var _this = this;

        this.oE.onmousedown = function(e) {
            var event = e || window.event;
            _this.mouseMove(event, "east");
        };
        this.oN.onmousedown = function(e) {
            var event = e || window.event;
            _this.mouseMove(event, "north");
        };
        this.oNW.onmousedown = function(e) {
            var event = e || window.event;
            _this.mouseMove(event, "north-west");
        };
    },
    mouseMove: function (event, type) {
        var x1 = event.clientX,
            y1 = event.clientY,
            disX,
            disY,
            w = parseInt(this.getStyle(this.obj, "width")),
            h = parseInt(this.getStyle(this.obj, "height"))
            _this = this;

        document.onmousemove = function(e) {
            var event = e || window.event;
            var w2, h2;

            disX = event.clientX - x1;
            disY = event.clientY - y1;

            w2 = w + disX;
            h2 = h + disY;

            w2 = w2 < 0 ? 0 : w2;
            h2 = h2 < 0 ? 0 : h2;

            switch(type) {
                case "east":
                    _this.obj.style.width = w2 + "px";
                    break;
                case "north":
                    _this.obj.style.height = h2 + "px";
                    break;
                case "north-west":
                    _this.obj.style.width = w2 + "px";
                    _this.obj.style.height = h2 + "px";
                    break;
            }
            event.preventDefault && event.preventDefault();
            return false;
        }
        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        }
    },
    getStyle: function (obj, attr) {
        if(obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, false)[attr];
        }
    }
};
Resizeable.prototype.init = function(obj) {
    this.obj = obj;

    this.createElement();
    this.bindEvent();
};
Resizeable.prototype.init.prototype = Resizeable.prototype;