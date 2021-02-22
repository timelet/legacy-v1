import { _ as __extends, b as isObject, C as BoundingRect, aF as Element, e as each, E as Eventful, ao as createCanvas, aP as devicePixelRatio, aQ as isGradientObject, aR as isPatternObject, ax as env, r as merge, l as logError, S as indexOf, Z as ZRImage, a as extend } from './IncrementalDisplayable-8ed2fa44.js';
import { g as getCanvasGradient, c as createCanvasPattern, a as brush, b as brushSingle, r as requestAnimationFrame } from './graphic-72874899.js';

function returnFalse() {
    return false;
}
function createDom(id, painter, dpr) {
    var newDom = createCanvas();
    var width = painter.getWidth();
    var height = painter.getHeight();
    var newDomStyle = newDom.style;
    if (newDomStyle) {
        newDomStyle.position = 'absolute';
        newDomStyle.left = '0';
        newDomStyle.top = '0';
        newDomStyle.width = width + 'px';
        newDomStyle.height = height + 'px';
        newDom.setAttribute('data-zr-dom-id', id);
    }
    newDom.width = width * dpr;
    newDom.height = height * dpr;
    return newDom;
}
var Layer = (function (_super) {
    __extends(Layer, _super);
    function Layer(id, painter, dpr) {
        var _this = _super.call(this) || this;
        _this.motionBlur = false;
        _this.lastFrameAlpha = 0.7;
        _this.dpr = 1;
        _this.virtual = false;
        _this.config = {};
        _this.incremental = false;
        _this.zlevel = 0;
        _this.maxRepaintRectCount = 5;
        _this.__dirty = true;
        _this.__firstTimePaint = true;
        _this.__used = false;
        _this.__drawIndex = 0;
        _this.__startIndex = 0;
        _this.__endIndex = 0;
        _this.__prevStartIndex = null;
        _this.__prevEndIndex = null;
        var dom;
        dpr = dpr || devicePixelRatio;
        if (typeof id === 'string') {
            dom = createDom(id, painter, dpr);
        }
        else if (isObject(id)) {
            dom = id;
            id = dom.id;
        }
        _this.id = id;
        _this.dom = dom;
        var domStyle = dom.style;
        if (domStyle) {
            dom.onselectstart = returnFalse;
            domStyle.webkitUserSelect = 'none';
            domStyle.userSelect = 'none';
            domStyle.webkitTapHighlightColor = 'rgba(0,0,0,0)';
            domStyle['-webkit-touch-callout'] = 'none';
            domStyle.padding = '0';
            domStyle.margin = '0';
            domStyle.borderWidth = '0';
        }
        _this.domBack = null;
        _this.ctxBack = null;
        _this.painter = painter;
        _this.config = null;
        _this.dpr = dpr;
        return _this;
    }
    Layer.prototype.getElementCount = function () {
        return this.__endIndex - this.__startIndex;
    };
    Layer.prototype.afterBrush = function () {
        this.__prevStartIndex = this.__startIndex;
        this.__prevEndIndex = this.__endIndex;
    };
    Layer.prototype.initContext = function () {
        this.ctx = this.dom.getContext('2d');
        this.ctx.dpr = this.dpr;
    };
    Layer.prototype.setUnpainted = function () {
        this.__firstTimePaint = true;
    };
    Layer.prototype.createBackBuffer = function () {
        var dpr = this.dpr;
        this.domBack = createDom('back-' + this.id, this.painter, dpr);
        this.ctxBack = this.domBack.getContext('2d');
        if (dpr !== 1) {
            this.ctxBack.scale(dpr, dpr);
        }
    };
    Layer.prototype.createRepaintRects = function (displayList, prevList, viewWidth, viewHeight) {
        if (this.__firstTimePaint) {
            this.__firstTimePaint = false;
            return null;
        }
        var mergedRepaintRects = [];
        var maxRepaintRectCount = this.maxRepaintRectCount;
        var full = false;
        var pendingRect = new BoundingRect(0, 0, 0, 0);
        function addRectToMergePool(rect) {
            if (!rect.isFinite() || rect.isZero()) {
                return;
            }
            if (mergedRepaintRects.length === 0) {
                var boundingRect = new BoundingRect(0, 0, 0, 0);
                boundingRect.copy(rect);
                mergedRepaintRects.push(boundingRect);
            }
            else {
                var isMerged = false;
                var minDeltaArea = Infinity;
                var bestRectToMergeIdx = 0;
                for (var i = 0; i < mergedRepaintRects.length; ++i) {
                    var mergedRect = mergedRepaintRects[i];
                    if (mergedRect.intersect(rect)) {
                        var pendingRect_1 = new BoundingRect(0, 0, 0, 0);
                        pendingRect_1.copy(mergedRect);
                        pendingRect_1.union(rect);
                        mergedRepaintRects[i] = pendingRect_1;
                        isMerged = true;
                        break;
                    }
                    else if (full) {
                        pendingRect.copy(rect);
                        pendingRect.union(mergedRect);
                        var aArea = rect.width * rect.height;
                        var bArea = mergedRect.width * mergedRect.height;
                        var pendingArea = pendingRect.width * pendingRect.height;
                        var deltaArea = pendingArea - aArea - bArea;
                        if (deltaArea < minDeltaArea) {
                            minDeltaArea = deltaArea;
                            bestRectToMergeIdx = i;
                        }
                    }
                }
                if (full) {
                    mergedRepaintRects[bestRectToMergeIdx].union(rect);
                    isMerged = true;
                }
                if (!isMerged) {
                    var boundingRect = new BoundingRect(0, 0, 0, 0);
                    boundingRect.copy(rect);
                    mergedRepaintRects.push(boundingRect);
                }
                if (!full) {
                    full = mergedRepaintRects.length >= maxRepaintRectCount;
                }
            }
        }
        for (var i = this.__startIndex; i < this.__endIndex; ++i) {
            var el = displayList[i];
            if (el) {
                var shouldPaint = el.shouldBePainted(viewWidth, viewHeight, true, true);
                var prevRect = el.__isRendered && ((el.__dirty & Element.REDARAW_BIT) || !shouldPaint)
                    ? el.getPrevPaintRect()
                    : null;
                if (prevRect) {
                    addRectToMergePool(prevRect);
                }
                var curRect = shouldPaint && ((el.__dirty & Element.REDARAW_BIT) || !el.__isRendered)
                    ? el.getPaintRect()
                    : null;
                if (curRect) {
                    addRectToMergePool(curRect);
                }
            }
        }
        for (var i = this.__prevStartIndex; i < this.__prevEndIndex; ++i) {
            var el = prevList[i];
            var shouldPaint = el.shouldBePainted(viewWidth, viewHeight, true, true);
            if (el && (!shouldPaint || !el.__zr) && el.__isRendered) {
                var prevRect = el.getPrevPaintRect();
                if (prevRect) {
                    addRectToMergePool(prevRect);
                }
            }
        }
        var hasIntersections;
        do {
            hasIntersections = false;
            for (var i = 0; i < mergedRepaintRects.length;) {
                if (mergedRepaintRects[i].isZero()) {
                    mergedRepaintRects.splice(i, 1);
                    continue;
                }
                for (var j = i + 1; j < mergedRepaintRects.length;) {
                    if (mergedRepaintRects[i].intersect(mergedRepaintRects[j])) {
                        hasIntersections = true;
                        mergedRepaintRects[i].union(mergedRepaintRects[j]);
                        mergedRepaintRects.splice(j, 1);
                    }
                    else {
                        j++;
                    }
                }
                i++;
            }
        } while (hasIntersections);
        this._paintRects = mergedRepaintRects;
        return mergedRepaintRects;
    };
    Layer.prototype.debugGetPaintRects = function () {
        return (this._paintRects || []).slice();
    };
    Layer.prototype.resize = function (width, height) {
        var dpr = this.dpr;
        var dom = this.dom;
        var domStyle = dom.style;
        var domBack = this.domBack;
        if (domStyle) {
            domStyle.width = width + 'px';
            domStyle.height = height + 'px';
        }
        dom.width = width * dpr;
        dom.height = height * dpr;
        if (domBack) {
            domBack.width = width * dpr;
            domBack.height = height * dpr;
            if (dpr !== 1) {
                this.ctxBack.scale(dpr, dpr);
            }
        }
    };
    Layer.prototype.clear = function (clearAll, clearColor, repaintRects) {
        var dom = this.dom;
        var ctx = this.ctx;
        var width = dom.width;
        var height = dom.height;
        clearColor = clearColor || this.clearColor;
        var haveMotionBLur = this.motionBlur && !clearAll;
        var lastFrameAlpha = this.lastFrameAlpha;
        var dpr = this.dpr;
        var self = this;
        if (haveMotionBLur) {
            if (!this.domBack) {
                this.createBackBuffer();
            }
            this.ctxBack.globalCompositeOperation = 'copy';
            this.ctxBack.drawImage(dom, 0, 0, width / dpr, height / dpr);
        }
        var domBack = this.domBack;
        function doClear(x, y, width, height) {
            ctx.clearRect(x, y, width, height);
            if (clearColor && clearColor !== 'transparent') {
                var clearColorGradientOrPattern = void 0;
                if (isGradientObject(clearColor)) {
                    clearColorGradientOrPattern = clearColor.__canvasGradient
                        || getCanvasGradient(ctx, clearColor, {
                            x: 0,
                            y: 0,
                            width: width,
                            height: height
                        });
                    clearColor.__canvasGradient = clearColorGradientOrPattern;
                }
                else if (isPatternObject(clearColor)) {
                    clearColorGradientOrPattern = createCanvasPattern(ctx, clearColor, {
                        dirty: function () {
                            self.setUnpainted();
                            self.__painter.refresh();
                        }
                    });
                }
                ctx.save();
                ctx.fillStyle = clearColorGradientOrPattern || clearColor;
                ctx.fillRect(x, y, width, height);
                ctx.restore();
            }
            if (haveMotionBLur) {
                ctx.save();
                ctx.globalAlpha = lastFrameAlpha;
                ctx.drawImage(domBack, x, y, width, height);
                ctx.restore();
            }
        }
        if (!repaintRects || haveMotionBLur) {
            doClear(0, 0, width, height);
        }
        else if (repaintRects.length) {
            each(repaintRects, function (rect) {
                doClear(rect.x * dpr, rect.y * dpr, rect.width * dpr, rect.height * dpr);
            });
        }
    };
    return Layer;
}(Eventful));

var HOVER_LAYER_ZLEVEL = 1e5;
var CANVAS_ZLEVEL = 314159;
var EL_AFTER_INCREMENTAL_INC = 0.01;
var INCREMENTAL_INC = 0.001;
function parseInt10(val) {
    return parseInt(val, 10);
}
function isLayerValid(layer) {
    if (!layer) {
        return false;
    }
    if (layer.__builtin__) {
        return true;
    }
    if (typeof (layer.resize) !== 'function'
        || typeof (layer.refresh) !== 'function') {
        return false;
    }
    return true;
}
function createRoot(width, height) {
    var domRoot = document.createElement('div');
    domRoot.style.cssText = [
        'position:relative',
        'width:' + width + 'px',
        'height:' + height + 'px',
        'padding:0',
        'margin:0',
        'border-width:0'
    ].join(';') + ';';
    return domRoot;
}
var CanvasPainter = (function () {
    function CanvasPainter(root, storage, opts, id) {
        this.type = 'canvas';
        this._zlevelList = [];
        this._prevDisplayList = [];
        this._layers = {};
        this._layerConfig = {};
        this._needsManuallyCompositing = false;
        this.type = 'canvas';
        var singleCanvas = !root.nodeName
            || root.nodeName.toUpperCase() === 'CANVAS';
        this._opts = opts = extend({}, opts || {});
        this.dpr = opts.devicePixelRatio || devicePixelRatio;
        this._singleCanvas = singleCanvas;
        this.root = root;
        var rootStyle = root.style;
        if (rootStyle) {
            rootStyle.webkitTapHighlightColor = 'transparent';
            rootStyle.webkitUserSelect = 'none';
            rootStyle.userSelect = 'none';
            rootStyle['-webkit-touch-callout'] = 'none';
            root.innerHTML = '';
        }
        this.storage = storage;
        var zlevelList = this._zlevelList;
        this._prevDisplayList = [];
        var layers = this._layers;
        if (!singleCanvas) {
            this._width = this._getSize(0);
            this._height = this._getSize(1);
            var domRoot = this._domRoot = createRoot(this._width, this._height);
            root.appendChild(domRoot);
        }
        else {
            var rootCanvas = root;
            var width = rootCanvas.width;
            var height = rootCanvas.height;
            if (opts.width != null) {
                width = opts.width;
            }
            if (opts.height != null) {
                height = opts.height;
            }
            this.dpr = opts.devicePixelRatio || 1;
            rootCanvas.width = width * this.dpr;
            rootCanvas.height = height * this.dpr;
            this._width = width;
            this._height = height;
            var mainLayer = new Layer(rootCanvas, this, this.dpr);
            mainLayer.__builtin__ = true;
            mainLayer.initContext();
            layers[CANVAS_ZLEVEL] = mainLayer;
            mainLayer.zlevel = CANVAS_ZLEVEL;
            zlevelList.push(CANVAS_ZLEVEL);
            this._domRoot = root;
        }
    }
    CanvasPainter.prototype.getType = function () {
        return 'canvas';
    };
    CanvasPainter.prototype.isSingleCanvas = function () {
        return this._singleCanvas;
    };
    CanvasPainter.prototype.getViewportRoot = function () {
        return this._domRoot;
    };
    CanvasPainter.prototype.getViewportRootOffset = function () {
        var viewportRoot = this.getViewportRoot();
        if (viewportRoot) {
            return {
                offsetLeft: viewportRoot.offsetLeft || 0,
                offsetTop: viewportRoot.offsetTop || 0
            };
        }
    };
    CanvasPainter.prototype.refresh = function (paintAll) {
        var list = this.storage.getDisplayList(true);
        var prevList = this._prevDisplayList;
        var zlevelList = this._zlevelList;
        this._redrawId = Math.random();
        this._paintList(list, prevList, paintAll, this._redrawId);
        for (var i = 0; i < zlevelList.length; i++) {
            var z = zlevelList[i];
            var layer = this._layers[z];
            if (!layer.__builtin__ && layer.refresh) {
                var clearColor = i === 0 ? this._backgroundColor : null;
                layer.refresh(clearColor);
            }
        }
        if (this._opts.useDirtyRect) {
            this._prevDisplayList = list.slice();
        }
        return this;
    };
    CanvasPainter.prototype.refreshHover = function () {
        this._paintHoverList(this.storage.getDisplayList(false));
    };
    CanvasPainter.prototype._paintHoverList = function (list) {
        var len = list.length;
        var hoverLayer = this._hoverlayer;
        hoverLayer && hoverLayer.clear();
        if (!len) {
            return;
        }
        var scope = {
            inHover: true,
            viewWidth: this._width,
            viewHeight: this._height
        };
        var ctx;
        for (var i = 0; i < len; i++) {
            var el = list[i];
            if (el.__inHover) {
                if (!hoverLayer) {
                    hoverLayer = this._hoverlayer = this.getLayer(HOVER_LAYER_ZLEVEL);
                }
                if (!ctx) {
                    ctx = hoverLayer.ctx;
                    ctx.save();
                }
                brush(ctx, el, scope, i === len - 1);
            }
        }
        if (ctx) {
            ctx.restore();
        }
    };
    CanvasPainter.prototype.getHoverLayer = function () {
        return this.getLayer(HOVER_LAYER_ZLEVEL);
    };
    CanvasPainter.prototype.paintOne = function (ctx, el) {
        brushSingle(ctx, el);
    };
    CanvasPainter.prototype._paintList = function (list, prevList, paintAll, redrawId) {
        if (this._redrawId !== redrawId) {
            return;
        }
        paintAll = paintAll || false;
        this._updateLayerStatus(list);
        var _a = this._doPaintList(list, prevList, paintAll), finished = _a.finished, needsRefreshHover = _a.needsRefreshHover;
        if (this._needsManuallyCompositing) {
            this._compositeManually();
        }
        if (needsRefreshHover) {
            this._paintHoverList(list);
        }
        if (!finished) {
            var self_1 = this;
            requestAnimationFrame(function () {
                self_1._paintList(list, prevList, paintAll, redrawId);
            });
        }
        else {
            this.eachLayer(function (layer) {
                layer.afterBrush && layer.afterBrush();
            });
        }
    };
    CanvasPainter.prototype._compositeManually = function () {
        var ctx = this.getLayer(CANVAS_ZLEVEL).ctx;
        var width = this._domRoot.width;
        var height = this._domRoot.height;
        ctx.clearRect(0, 0, width, height);
        this.eachBuiltinLayer(function (layer) {
            if (layer.virtual) {
                ctx.drawImage(layer.dom, 0, 0, width, height);
            }
        });
    };
    CanvasPainter.prototype._doPaintList = function (list, prevList, paintAll) {
        var _this = this;
        var layerList = [];
        var useDirtyRect = this._opts.useDirtyRect;
        for (var zi = 0; zi < this._zlevelList.length; zi++) {
            var zlevel = this._zlevelList[zi];
            var layer = this._layers[zlevel];
            if (layer.__builtin__
                && layer !== this._hoverlayer
                && (layer.__dirty || paintAll)) {
                layerList.push(layer);
            }
        }
        var finished = true;
        var needsRefreshHover = false;
        var _loop_1 = function (k) {
            var layer = layerList[k];
            var ctx = layer.ctx;
            var repaintRects = useDirtyRect
                && layer.createRepaintRects(list, prevList, this_1._width, this_1._height);
            ctx.save();
            var start = paintAll ? layer.__startIndex : layer.__drawIndex;
            var useTimer = !paintAll && layer.incremental && Date.now;
            var startTime = useTimer && Date.now();
            var clearColor = layer.zlevel === this_1._zlevelList[0]
                ? this_1._backgroundColor : null;
            if (layer.__startIndex === layer.__endIndex) {
                layer.clear(false, clearColor, repaintRects);
            }
            else if (start === layer.__startIndex) {
                var firstEl = list[start];
                if (!firstEl.incremental || !firstEl.notClear || paintAll) {
                    layer.clear(false, clearColor, repaintRects);
                }
            }
            if (start === -1) {
                console.error('For some unknown reason. drawIndex is -1');
                start = layer.__startIndex;
            }
            var i;
            var repaint = function (repaintRect) {
                var scope = {
                    inHover: false,
                    allClipped: false,
                    prevEl: null,
                    viewWidth: _this._width,
                    viewHeight: _this._height
                };
                for (i = start; i < layer.__endIndex; i++) {
                    var el = list[i];
                    if (el.__inHover) {
                        needsRefreshHover = true;
                    }
                    _this._doPaintEl(el, layer, useDirtyRect, repaintRect, scope, i === layer.__endIndex - 1);
                    if (useTimer) {
                        var dTime = Date.now() - startTime;
                        if (dTime > 15) {
                            break;
                        }
                    }
                }
                if (scope.prevElClipPaths) {
                    ctx.restore();
                }
            };
            if (repaintRects) {
                if (repaintRects.length === 0) {
                    i = layer.__endIndex;
                }
                else {
                    var dpr = this_1.dpr;
                    for (var r = 0; r < repaintRects.length; ++r) {
                        var rect = repaintRects[r];
                        ctx.save();
                        ctx.beginPath();
                        ctx.rect(rect.x * dpr, rect.y * dpr, rect.width * dpr, rect.height * dpr);
                        ctx.clip();
                        repaint(rect);
                        ctx.restore();
                    }
                }
            }
            else {
                ctx.save();
                repaint();
                ctx.restore();
            }
            layer.__drawIndex = i;
            if (layer.__drawIndex < layer.__endIndex) {
                finished = false;
            }
        };
        var this_1 = this;
        for (var k = 0; k < layerList.length; k++) {
            _loop_1(k);
        }
        if (env.wxa) {
            each(this._layers, function (layer) {
                if (layer && layer.ctx && layer.ctx.draw) {
                    layer.ctx.draw();
                }
            });
        }
        return {
            finished: finished,
            needsRefreshHover: needsRefreshHover
        };
    };
    CanvasPainter.prototype._doPaintEl = function (el, currentLayer, useDirtyRect, repaintRect, scope, isLast) {
        var ctx = currentLayer.ctx;
        if (useDirtyRect) {
            var paintRect = el.getPaintRect();
            if (!repaintRect || paintRect && paintRect.intersect(repaintRect)) {
                brush(ctx, el, scope, isLast);
                el.setPrevPaintRect(paintRect);
            }
        }
        else {
            brush(ctx, el, scope, isLast);
        }
    };
    CanvasPainter.prototype.getLayer = function (zlevel, virtual) {
        if (this._singleCanvas && !this._needsManuallyCompositing) {
            zlevel = CANVAS_ZLEVEL;
        }
        var layer = this._layers[zlevel];
        if (!layer) {
            layer = new Layer('zr_' + zlevel, this, this.dpr);
            layer.zlevel = zlevel;
            layer.__builtin__ = true;
            if (this._layerConfig[zlevel]) {
                merge(layer, this._layerConfig[zlevel], true);
            }
            else if (this._layerConfig[zlevel - EL_AFTER_INCREMENTAL_INC]) {
                merge(layer, this._layerConfig[zlevel - EL_AFTER_INCREMENTAL_INC], true);
            }
            if (virtual) {
                layer.virtual = virtual;
            }
            this.insertLayer(zlevel, layer);
            layer.initContext();
        }
        return layer;
    };
    CanvasPainter.prototype.insertLayer = function (zlevel, layer) {
        var layersMap = this._layers;
        var zlevelList = this._zlevelList;
        var len = zlevelList.length;
        var domRoot = this._domRoot;
        var prevLayer = null;
        var i = -1;
        if (layersMap[zlevel]) {
            logError('ZLevel ' + zlevel + ' has been used already');
            return;
        }
        if (!isLayerValid(layer)) {
            logError('Layer of zlevel ' + zlevel + ' is not valid');
            return;
        }
        if (len > 0 && zlevel > zlevelList[0]) {
            for (i = 0; i < len - 1; i++) {
                if (zlevelList[i] < zlevel
                    && zlevelList[i + 1] > zlevel) {
                    break;
                }
            }
            prevLayer = layersMap[zlevelList[i]];
        }
        zlevelList.splice(i + 1, 0, zlevel);
        layersMap[zlevel] = layer;
        if (!layer.virtual) {
            if (prevLayer) {
                var prevDom = prevLayer.dom;
                if (prevDom.nextSibling) {
                    domRoot.insertBefore(layer.dom, prevDom.nextSibling);
                }
                else {
                    domRoot.appendChild(layer.dom);
                }
            }
            else {
                if (domRoot.firstChild) {
                    domRoot.insertBefore(layer.dom, domRoot.firstChild);
                }
                else {
                    domRoot.appendChild(layer.dom);
                }
            }
        }
        layer.__painter = this;
    };
    CanvasPainter.prototype.eachLayer = function (cb, context) {
        var zlevelList = this._zlevelList;
        for (var i = 0; i < zlevelList.length; i++) {
            var z = zlevelList[i];
            cb.call(context, this._layers[z], z);
        }
    };
    CanvasPainter.prototype.eachBuiltinLayer = function (cb, context) {
        var zlevelList = this._zlevelList;
        for (var i = 0; i < zlevelList.length; i++) {
            var z = zlevelList[i];
            var layer = this._layers[z];
            if (layer.__builtin__) {
                cb.call(context, layer, z);
            }
        }
    };
    CanvasPainter.prototype.eachOtherLayer = function (cb, context) {
        var zlevelList = this._zlevelList;
        for (var i = 0; i < zlevelList.length; i++) {
            var z = zlevelList[i];
            var layer = this._layers[z];
            if (!layer.__builtin__) {
                cb.call(context, layer, z);
            }
        }
    };
    CanvasPainter.prototype.getLayers = function () {
        return this._layers;
    };
    CanvasPainter.prototype._updateLayerStatus = function (list) {
        this.eachBuiltinLayer(function (layer, z) {
            layer.__dirty = layer.__used = false;
        });
        function updatePrevLayer(idx) {
            if (prevLayer) {
                if (prevLayer.__endIndex !== idx) {
                    prevLayer.__dirty = true;
                }
                prevLayer.__endIndex = idx;
            }
        }
        if (this._singleCanvas) {
            for (var i_1 = 1; i_1 < list.length; i_1++) {
                var el = list[i_1];
                if (el.zlevel !== list[i_1 - 1].zlevel || el.incremental) {
                    this._needsManuallyCompositing = true;
                    break;
                }
            }
        }
        var prevLayer = null;
        var incrementalLayerCount = 0;
        var prevZlevel;
        var i;
        for (i = 0; i < list.length; i++) {
            var el = list[i];
            var zlevel = el.zlevel;
            var layer = void 0;
            if (prevZlevel !== zlevel) {
                prevZlevel = zlevel;
                incrementalLayerCount = 0;
            }
            if (el.incremental) {
                layer = this.getLayer(zlevel + INCREMENTAL_INC, this._needsManuallyCompositing);
                layer.incremental = true;
                incrementalLayerCount = 1;
            }
            else {
                layer = this.getLayer(zlevel + (incrementalLayerCount > 0 ? EL_AFTER_INCREMENTAL_INC : 0), this._needsManuallyCompositing);
            }
            if (!layer.__builtin__) {
                logError('ZLevel ' + zlevel + ' has been used by unkown layer ' + layer.id);
            }
            if (layer !== prevLayer) {
                layer.__used = true;
                if (layer.__startIndex !== i) {
                    layer.__dirty = true;
                }
                layer.__startIndex = i;
                if (!layer.incremental) {
                    layer.__drawIndex = i;
                }
                else {
                    layer.__drawIndex = -1;
                }
                updatePrevLayer(i);
                prevLayer = layer;
            }
            if ((el.__dirty & Element.REDARAW_BIT) && !el.__inHover) {
                layer.__dirty = true;
                if (layer.incremental && layer.__drawIndex < 0) {
                    layer.__drawIndex = i;
                }
            }
        }
        updatePrevLayer(i);
        this.eachBuiltinLayer(function (layer, z) {
            if (!layer.__used && layer.getElementCount() > 0) {
                layer.__dirty = true;
                layer.__startIndex = layer.__endIndex = layer.__drawIndex = 0;
            }
            if (layer.__dirty && layer.__drawIndex < 0) {
                layer.__drawIndex = layer.__startIndex;
            }
        });
    };
    CanvasPainter.prototype.clear = function () {
        this.eachBuiltinLayer(this._clearLayer);
        return this;
    };
    CanvasPainter.prototype._clearLayer = function (layer) {
        layer.clear();
    };
    CanvasPainter.prototype.setBackgroundColor = function (backgroundColor) {
        this._backgroundColor = backgroundColor;
        each(this._layers, function (layer) {
            layer.setUnpainted();
        });
    };
    CanvasPainter.prototype.configLayer = function (zlevel, config) {
        if (config) {
            var layerConfig = this._layerConfig;
            if (!layerConfig[zlevel]) {
                layerConfig[zlevel] = config;
            }
            else {
                merge(layerConfig[zlevel], config, true);
            }
            for (var i = 0; i < this._zlevelList.length; i++) {
                var _zlevel = this._zlevelList[i];
                if (_zlevel === zlevel || _zlevel === zlevel + EL_AFTER_INCREMENTAL_INC) {
                    var layer = this._layers[_zlevel];
                    merge(layer, layerConfig[zlevel], true);
                }
            }
        }
    };
    CanvasPainter.prototype.delLayer = function (zlevel) {
        var layers = this._layers;
        var zlevelList = this._zlevelList;
        var layer = layers[zlevel];
        if (!layer) {
            return;
        }
        layer.dom.parentNode.removeChild(layer.dom);
        delete layers[zlevel];
        zlevelList.splice(indexOf(zlevelList, zlevel), 1);
    };
    CanvasPainter.prototype.resize = function (width, height) {
        if (!this._domRoot.style) {
            if (width == null || height == null) {
                return;
            }
            this._width = width;
            this._height = height;
            this.getLayer(CANVAS_ZLEVEL).resize(width, height);
        }
        else {
            var domRoot = this._domRoot;
            domRoot.style.display = 'none';
            var opts = this._opts;
            width != null && (opts.width = width);
            height != null && (opts.height = height);
            width = this._getSize(0);
            height = this._getSize(1);
            domRoot.style.display = '';
            if (this._width !== width || height !== this._height) {
                domRoot.style.width = width + 'px';
                domRoot.style.height = height + 'px';
                for (var id in this._layers) {
                    if (this._layers.hasOwnProperty(id)) {
                        this._layers[id].resize(width, height);
                    }
                }
                this.refresh(true);
            }
            this._width = width;
            this._height = height;
        }
        return this;
    };
    CanvasPainter.prototype.clearLayer = function (zlevel) {
        var layer = this._layers[zlevel];
        if (layer) {
            layer.clear();
        }
    };
    CanvasPainter.prototype.dispose = function () {
        this.root.innerHTML = '';
        this.root =
            this.storage =
                this._domRoot =
                    this._layers = null;
    };
    CanvasPainter.prototype.getRenderedCanvas = function (opts) {
        opts = opts || {};
        if (this._singleCanvas && !this._compositeManually) {
            return this._layers[CANVAS_ZLEVEL].dom;
        }
        var imageLayer = new Layer('image', this, opts.pixelRatio || this.dpr);
        imageLayer.initContext();
        imageLayer.clear(false, opts.backgroundColor || this._backgroundColor);
        var ctx = imageLayer.ctx;
        if (opts.pixelRatio <= this.dpr) {
            this.refresh();
            var width_1 = imageLayer.dom.width;
            var height_1 = imageLayer.dom.height;
            this.eachLayer(function (layer) {
                if (layer.__builtin__) {
                    ctx.drawImage(layer.dom, 0, 0, width_1, height_1);
                }
                else if (layer.renderToCanvas) {
                    ctx.save();
                    layer.renderToCanvas(ctx);
                    ctx.restore();
                }
            });
        }
        else {
            var scope = {
                inHover: false,
                viewWidth: this._width,
                viewHeight: this._height
            };
            var displayList = this.storage.getDisplayList(true);
            for (var i = 0, len = displayList.length; i < len; i++) {
                var el = displayList[i];
                brush(ctx, el, scope, i === len - 1);
            }
        }
        return imageLayer.dom;
    };
    CanvasPainter.prototype.getWidth = function () {
        return this._width;
    };
    CanvasPainter.prototype.getHeight = function () {
        return this._height;
    };
    CanvasPainter.prototype._getSize = function (whIdx) {
        var opts = this._opts;
        var wh = ['width', 'height'][whIdx];
        var cwh = ['clientWidth', 'clientHeight'][whIdx];
        var plt = ['paddingLeft', 'paddingTop'][whIdx];
        var prb = ['paddingRight', 'paddingBottom'][whIdx];
        if (opts[wh] != null && opts[wh] !== 'auto') {
            return parseFloat(opts[wh]);
        }
        var root = this.root;
        var stl = document.defaultView.getComputedStyle(root);
        return ((root[cwh] || parseInt10(stl[wh]) || parseInt10(root.style[wh]))
            - (parseInt10(stl[plt]) || 0)
            - (parseInt10(stl[prb]) || 0)) | 0;
    };
    CanvasPainter.prototype.pathToImage = function (path, dpr) {
        dpr = dpr || this.dpr;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var rect = path.getBoundingRect();
        var style = path.style;
        var shadowBlurSize = style.shadowBlur * dpr;
        var shadowOffsetX = style.shadowOffsetX * dpr;
        var shadowOffsetY = style.shadowOffsetY * dpr;
        var lineWidth = path.hasStroke() ? style.lineWidth : 0;
        var leftMargin = Math.max(lineWidth / 2, -shadowOffsetX + shadowBlurSize);
        var rightMargin = Math.max(lineWidth / 2, shadowOffsetX + shadowBlurSize);
        var topMargin = Math.max(lineWidth / 2, -shadowOffsetY + shadowBlurSize);
        var bottomMargin = Math.max(lineWidth / 2, shadowOffsetY + shadowBlurSize);
        var width = rect.width + leftMargin + rightMargin;
        var height = rect.height + topMargin + bottomMargin;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, width, height);
        ctx.dpr = dpr;
        var pathTransform = {
            x: path.x,
            y: path.y,
            scaleX: path.scaleX,
            scaleY: path.scaleY,
            rotation: path.rotation,
            originX: path.originX,
            originY: path.originY
        };
        path.x = leftMargin - rect.x;
        path.y = topMargin - rect.y;
        path.rotation = 0;
        path.scaleX = 1;
        path.scaleY = 1;
        path.updateTransform();
        if (path) {
            brush(ctx, path, {
                inHover: false,
                viewWidth: this._width,
                viewHeight: this._height
            }, true);
        }
        var imgShape = new ZRImage({
            style: {
                x: 0,
                y: 0,
                image: canvas
            }
        });
        extend(path, pathTransform);
        return imgShape;
    };
    return CanvasPainter;
}());

function install(registers) {
  registers.registerPainter('canvas', CanvasPainter);
}

export { install as i };
