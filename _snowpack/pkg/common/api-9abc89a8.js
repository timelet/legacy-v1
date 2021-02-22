import { e as each, A as createHashMap, m as map, W as isFunction, k as curry, i as isArray, s as mixin, bb as windingLine, Q as fromPoints, b2 as min, b3 as max, C as BoundingRect, G as applyTransform, a2 as filter, Z as ZRImage, I as IncrementalDisplayable, S as indexOf, ah as inherits, O as reduce, q as bind, u as isString, b as isObject, a as extend, j as defaults, o as clone, r as merge } from './IncrementalDisplayable-8ed2fa44.js';
import { c as createDimensions, L as List, g as getDimensionTypeByAxis } from './createDimensions-312ead42.js';
import { Z as ZRText, V as SINGLE_REFERRING, cv as isSourceInstance, cw as createSourceFromSeriesDataOption, as as makeSeriesEncodeForAxisCoordSys, cx as SOURCE_FORMAT_ORIGINAL, aS as getDataItemValue, ag as createTextStyle$1, M as Model, W as getLayoutRect, b as getECData, a as enableHoverEmphasis, ac as linearMap, d as round, am as asc, aU as getPrecision, bO as getPrecisionSafe, aL as getPixelPrecision, ck as getPercentWithPrecision, ad as MAX_SAFE_INTEGER, cm as remRadian, cn as isRadianAroundZero, aG as parseDate, cg as quantity, cy as quantityExponent, bP as nice, at as quantile, aY as reformIntervals, ax as isNumeric, ak as numericToNumber, bR as format$1, cz as extendShape, cA as extendPath, aA as makePath, bn as makeImage, F as mergePath, cB as resizePath, aO as createIcon, u as updateProps, i as initProps, ao as getTransform, ap as clipPointsByRect, cC as clipRectByRect, cD as registerShape, aB as getShapeClass, G as Group, D as Circle, J as Ellipse, f as Sector, E as Ring, P as Polygon, x as Polyline, R as Rect, I as Line, a0 as BezierCurve, be as Arc, O as CompoundPath, L as LinearGradient, cE as RadialGradient, bQ as addCommas, cp as toCamelCase, aN as normalizeCssArray, cF as encodeHTML, ct as formatTpl, cG as getTooltipMarker, cH as formatTime, cI as capitalFirst, cJ as truncateText, B as ComponentModel, S as SeriesModel, C as ChartView } from './dataSelectAction-16288cd0.js';
import { h as CoordinateSystemManager, ah as enableDataStack, i as isDimensionStacked, E as getStackedDimension, k as createScaleByModel, n as niceScaleExtent, A as AxisModelCommonMixin, c as createSymbol, C as ComponentView } from './Axis-08a3fd01.js';

function getTextRect(text, font, align, verticalAlign, padding, rich, truncate, lineHeight) {
  var textEl = new ZRText({
    style: {
      text: text,
      font: font,
      align: align,
      verticalAlign: verticalAlign,
      padding: padding,
      rich: rich,
      overflow: truncate ? 'truncate' : null,
      lineHeight: lineHeight
    }
  });
  return textEl.getBoundingRect();
}

/**
 * @class
 * For example:
 * {
 *     coordSysName: 'cartesian2d',
 *     coordSysDims: ['x', 'y', ...],
 *     axisMap: HashMap({
 *         x: xAxisModel,
 *         y: yAxisModel
 *     }),
 *     categoryAxisMap: HashMap({
 *         x: xAxisModel,
 *         y: undefined
 *     }),
 *     // The index of the first category axis in `coordSysDims`.
 *     // `null/undefined` means no category axis exists.
 *     firstCategoryDimIndex: 1,
 *     // To replace user specified encode.
 * }
 */

var CoordSysInfo =
/** @class */
function () {
  function CoordSysInfo(coordSysName) {
    this.coordSysDims = [];
    this.axisMap = createHashMap();
    this.categoryAxisMap = createHashMap();
    this.coordSysName = coordSysName;
  }

  return CoordSysInfo;
}();

function getCoordSysInfoBySeries(seriesModel) {
  var coordSysName = seriesModel.get('coordinateSystem');
  var result = new CoordSysInfo(coordSysName);
  var fetch = fetchers[coordSysName];

  if (fetch) {
    fetch(seriesModel, result, result.axisMap, result.categoryAxisMap);
    return result;
  }
}
var fetchers = {
  cartesian2d: function (seriesModel, result, axisMap, categoryAxisMap) {
    var xAxisModel = seriesModel.getReferringComponents('xAxis', SINGLE_REFERRING).models[0];
    var yAxisModel = seriesModel.getReferringComponents('yAxis', SINGLE_REFERRING).models[0];

    result.coordSysDims = ['x', 'y'];
    axisMap.set('x', xAxisModel);
    axisMap.set('y', yAxisModel);

    if (isCategory(xAxisModel)) {
      categoryAxisMap.set('x', xAxisModel);
      result.firstCategoryDimIndex = 0;
    }

    if (isCategory(yAxisModel)) {
      categoryAxisMap.set('y', yAxisModel);
      result.firstCategoryDimIndex == null && (result.firstCategoryDimIndex = 1);
    }
  },
  singleAxis: function (seriesModel, result, axisMap, categoryAxisMap) {
    var singleAxisModel = seriesModel.getReferringComponents('singleAxis', SINGLE_REFERRING).models[0];

    result.coordSysDims = ['single'];
    axisMap.set('single', singleAxisModel);

    if (isCategory(singleAxisModel)) {
      categoryAxisMap.set('single', singleAxisModel);
      result.firstCategoryDimIndex = 0;
    }
  },
  polar: function (seriesModel, result, axisMap, categoryAxisMap) {
    var polarModel = seriesModel.getReferringComponents('polar', SINGLE_REFERRING).models[0];
    var radiusAxisModel = polarModel.findAxisModel('radiusAxis');
    var angleAxisModel = polarModel.findAxisModel('angleAxis');

    result.coordSysDims = ['radius', 'angle'];
    axisMap.set('radius', radiusAxisModel);
    axisMap.set('angle', angleAxisModel);

    if (isCategory(radiusAxisModel)) {
      categoryAxisMap.set('radius', radiusAxisModel);
      result.firstCategoryDimIndex = 0;
    }

    if (isCategory(angleAxisModel)) {
      categoryAxisMap.set('angle', angleAxisModel);
      result.firstCategoryDimIndex == null && (result.firstCategoryDimIndex = 1);
    }
  },
  geo: function (seriesModel, result, axisMap, categoryAxisMap) {
    result.coordSysDims = ['lng', 'lat'];
  },
  parallel: function (seriesModel, result, axisMap, categoryAxisMap) {
    var ecModel = seriesModel.ecModel;
    var parallelModel = ecModel.getComponent('parallel', seriesModel.get('parallelIndex'));
    var coordSysDims = result.coordSysDims = parallelModel.dimensions.slice();
    each(parallelModel.parallelAxisIndex, function (axisIndex, index) {
      var axisModel = ecModel.getComponent('parallelAxis', axisIndex);
      var axisDim = coordSysDims[index];
      axisMap.set(axisDim, axisModel);

      if (isCategory(axisModel)) {
        categoryAxisMap.set(axisDim, axisModel);

        if (result.firstCategoryDimIndex == null) {
          result.firstCategoryDimIndex = index;
        }
      }
    });
  }
};

function isCategory(axisModel) {
  return axisModel.get('type') === 'category';
}

function createListFromArray(source, seriesModel, opt) {
  opt = opt || {};

  if (!isSourceInstance(source)) {
    source = createSourceFromSeriesDataOption(source);
  }

  var coordSysName = seriesModel.get('coordinateSystem');
  var registeredCoordSys = CoordinateSystemManager.get(coordSysName);
  var coordSysInfo = getCoordSysInfoBySeries(seriesModel);
  var coordSysDimDefs;

  if (coordSysInfo && coordSysInfo.coordSysDims) {
    coordSysDimDefs = map(coordSysInfo.coordSysDims, function (dim) {
      var dimInfo = {
        name: dim
      };
      var axisModel = coordSysInfo.axisMap.get(dim);

      if (axisModel) {
        var axisType = axisModel.get('type');
        dimInfo.type = getDimensionTypeByAxis(axisType); // dimInfo.stackable = isStackable(axisType);
      }

      return dimInfo;
    });
  }

  if (!coordSysDimDefs) {
    // Get dimensions from registered coordinate system
    coordSysDimDefs = registeredCoordSys && (registeredCoordSys.getDimensionsInfo ? registeredCoordSys.getDimensionsInfo() : registeredCoordSys.dimensions.slice()) || ['x', 'y'];
  }

  var useEncodeDefaulter = opt.useEncodeDefaulter;
  var dimInfoList = createDimensions(source, {
    coordDimensions: coordSysDimDefs,
    generateCoord: opt.generateCoord,
    encodeDefaulter: isFunction(useEncodeDefaulter) ? useEncodeDefaulter : useEncodeDefaulter ? curry(makeSeriesEncodeForAxisCoordSys, coordSysDimDefs, seriesModel) : null
  });
  var firstCategoryDimIndex;
  var hasNameEncode;
  coordSysInfo && each(dimInfoList, function (dimInfo, dimIndex) {
    var coordDim = dimInfo.coordDim;
    var categoryAxisModel = coordSysInfo.categoryAxisMap.get(coordDim);

    if (categoryAxisModel) {
      if (firstCategoryDimIndex == null) {
        firstCategoryDimIndex = dimIndex;
      }

      dimInfo.ordinalMeta = categoryAxisModel.getOrdinalMeta();

      if (opt.createInvertedIndices) {
        dimInfo.createInvertedIndices = true;
      }
    }

    if (dimInfo.otherDims.itemName != null) {
      hasNameEncode = true;
    }
  });

  if (!hasNameEncode && firstCategoryDimIndex != null) {
    dimInfoList[firstCategoryDimIndex].otherDims.itemName = 0;
  }

  var stackCalculationInfo = enableDataStack(seriesModel, dimInfoList);
  var list = new List(dimInfoList, seriesModel);
  list.setCalculationInfo(stackCalculationInfo);
  var dimValueGetter = firstCategoryDimIndex != null && isNeedCompleteOrdinalData(source) ? function (itemOpt, dimName, dataIndex, dimIndex) {
    // Use dataIndex as ordinal value in categoryAxis
    return dimIndex === firstCategoryDimIndex ? dataIndex : this.defaultDimValueGetter(itemOpt, dimName, dataIndex, dimIndex);
  } : null;
  list.hasItemOption = false;
  list.initData(source, null, dimValueGetter);
  return list;
}

function isNeedCompleteOrdinalData(source) {
  if (source.sourceFormat === SOURCE_FORMAT_ORIGINAL) {
    var sampleItem = firstDataNotNull(source.data || []);
    return sampleItem != null && !isArray(getDataItemValue(sampleItem));
  }
}

function firstDataNotNull(data) {
  var i = 0;

  while (i < data.length && data[i] == null) {
    i++;
  }

  return data[i];
}

/**
 * Create a muti dimension List structure from seriesModel.
 */

function createList(seriesModel) {
  return createListFromArray(seriesModel.getSource(), seriesModel);
} // export function createGraph(seriesModel) {
var dataStack = {
  isDimensionStacked: isDimensionStacked,
  enableDataStack: enableDataStack,
  getStackedDimension: getStackedDimension
};
/**
 * Create scale
 * @param {Array.<number>} dataExtent
 * @param {Object|module:echarts/Model} option If `optoin.type`
 *        is secified, it can only be `'value'` currently.
 */

function createScale(dataExtent, option) {
  var axisModel = option;

  if (!(option instanceof Model)) {
    axisModel = new Model(option); // FIXME
    // Currently AxisModelCommonMixin has nothing to do with the
    // the requirements of `axisHelper.createScaleByModel`. For
    // example the method `getCategories` and `getOrdinalMeta`
    // are required for `'category'` axis, and ecModel are required
    // for `'time'` axis. But occationally echarts-gl happened
    // to only use `'value'` axis.
    // zrUtil.mixin(axisModel, AxisModelCommonMixin);
  }

  var scale = createScaleByModel(axisModel);
  scale.setExtent(dataExtent[0], dataExtent[1]);
  niceScaleExtent(scale, axisModel);
  return scale;
}
/**
 * Mixin common methods to axis model,
 *
 * Inlcude methods
 * `getFormattedLabels() => Array.<string>`
 * `getCategories() => Array.<string>`
 * `getMin(origin: boolean) => number`
 * `getMax(origin: boolean) => number`
 * `getNeedCrossZero() => boolean`
 */

function mixinAxisModelCommonMethods(Model) {
  mixin(Model, AxisModelCommonMixin);
}
function createTextStyle(textStyleModel, opts) {
  opts = opts || {};
  return createTextStyle$1(textStyleModel, null, null, opts.state !== 'normal');
}

var helper = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createList: createList,
  getLayoutRect: getLayoutRect,
  dataStack: dataStack,
  createScale: createScale,
  mixinAxisModelCommonMethods: mixinAxisModelCommonMethods,
  getECData: getECData,
  createTextStyle: createTextStyle,
  createDimensions: createDimensions,
  createSymbol: createSymbol,
  enableHoverEmphasis: enableHoverEmphasis
});

var EPSILON = 1e-8;
function isAroundEqual(a, b) {
    return Math.abs(a - b) < EPSILON;
}
function contain(points, x, y) {
    var w = 0;
    var p = points[0];
    if (!p) {
        return false;
    }
    for (var i = 1; i < points.length; i++) {
        var p2 = points[i];
        w += windingLine(p[0], p[1], p2[0], p2[1], x, y);
        p = p2;
    }
    var p0 = points[0];
    if (!isAroundEqual(p[0], p0[0]) || !isAroundEqual(p[1], p0[1])) {
        w += windingLine(p[0], p[1], p0[0], p0[1], x, y);
    }
    return w !== 0;
}

var Region =
/** @class */
function () {
  function Region(name, geometries, cp) {
    this.name = name;
    this.geometries = geometries;

    if (!cp) {
      var rect = this.getBoundingRect();
      cp = [rect.x + rect.width / 2, rect.y + rect.height / 2];
    } else {
      cp = [cp[0], cp[1]];
    }

    this.center = cp;
  }

  Region.prototype.getBoundingRect = function () {
    var rect = this._rect;

    if (rect) {
      return rect;
    }

    var MAX_NUMBER = Number.MAX_VALUE;
    var min$1 = [MAX_NUMBER, MAX_NUMBER];
    var max$1 = [-MAX_NUMBER, -MAX_NUMBER];
    var min2 = [];
    var max2 = [];
    var geometries = this.geometries;
    var i = 0;

    for (; i < geometries.length; i++) {
      // Only support polygon
      if (geometries[i].type !== 'polygon') {
        continue;
      } // Doesn't consider hole


      var exterior = geometries[i].exterior;
      fromPoints(exterior, min2, max2);
      min(min$1, min$1, min2);
      max(max$1, max$1, max2);
    } // No data


    if (i === 0) {
      min$1[0] = min$1[1] = max$1[0] = max$1[1] = 0;
    }

    return this._rect = new BoundingRect(min$1[0], min$1[1], max$1[0] - min$1[0], max$1[1] - min$1[1]);
  };

  Region.prototype.contain = function (coord) {
    var rect = this.getBoundingRect();
    var geometries = this.geometries;

    if (!rect.contain(coord[0], coord[1])) {
      return false;
    }

    loopGeo: for (var i = 0, len = geometries.length; i < len; i++) {
      // Only support polygon.
      if (geometries[i].type !== 'polygon') {
        continue;
      }

      var exterior = geometries[i].exterior;
      var interiors = geometries[i].interiors;

      if (contain(exterior, coord[0], coord[1])) {
        // Not in the region if point is in the hole.
        for (var k = 0; k < (interiors ? interiors.length : 0); k++) {
          if (contain(interiors[k], coord[0], coord[1])) {
            continue loopGeo;
          }
        }

        return true;
      }
    }

    return false;
  };

  Region.prototype.transformTo = function (x, y, width, height) {
    var rect = this.getBoundingRect();
    var aspect = rect.width / rect.height;

    if (!width) {
      width = aspect * height;
    } else if (!height) {
      height = width / aspect;
    }

    var target = new BoundingRect(x, y, width, height);
    var transform = rect.calculateTransform(target);
    var geometries = this.geometries;

    for (var i = 0; i < geometries.length; i++) {
      // Only support polygon.
      if (geometries[i].type !== 'polygon') {
        continue;
      }

      var exterior = geometries[i].exterior;
      var interiors = geometries[i].interiors;

      for (var p = 0; p < exterior.length; p++) {
        applyTransform(exterior[p], exterior[p], transform);
      }

      for (var h = 0; h < (interiors ? interiors.length : 0); h++) {
        for (var p = 0; p < interiors[h].length; p++) {
          applyTransform(interiors[h][p], interiors[h][p], transform);
        }
      }
    }

    rect = this._rect;
    rect.copy(target); // Update center

    this.center = [rect.x + rect.width / 2, rect.y + rect.height / 2];
  };

  Region.prototype.cloneShallow = function (name) {
    name == null && (name = this.name);
    var newRegion = new Region(name, this.geometries, this.center);
    newRegion._rect = this._rect;
    newRegion.transformTo = null; // Simply avoid to be called.

    return newRegion;
  };

  return Region;
}();

function decode(json) {
  if (!json.UTF8Encoding) {
    return json;
  }

  var jsonCompressed = json;
  var encodeScale = jsonCompressed.UTF8Scale;

  if (encodeScale == null) {
    encodeScale = 1024;
  }

  var features = jsonCompressed.features;

  for (var f = 0; f < features.length; f++) {
    var feature = features[f];
    var geometry = feature.geometry;

    if (geometry.type === 'Polygon') {
      var coordinates = geometry.coordinates;

      for (var c = 0; c < coordinates.length; c++) {
        coordinates[c] = decodePolygon(coordinates[c], geometry.encodeOffsets[c], encodeScale);
      }
    } else if (geometry.type === 'MultiPolygon') {
      var coordinates = geometry.coordinates;

      for (var c = 0; c < coordinates.length; c++) {
        var coordinate = coordinates[c];

        for (var c2 = 0; c2 < coordinate.length; c2++) {
          coordinate[c2] = decodePolygon(coordinate[c2], geometry.encodeOffsets[c][c2], encodeScale);
        }
      }
    }
  } // Has been decoded


  jsonCompressed.UTF8Encoding = false;
  return jsonCompressed;
}

function decodePolygon(coordinate, encodeOffsets, encodeScale) {
  var result = [];
  var prevX = encodeOffsets[0];
  var prevY = encodeOffsets[1];

  for (var i = 0; i < coordinate.length; i += 2) {
    var x = coordinate.charCodeAt(i) - 64;
    var y = coordinate.charCodeAt(i + 1) - 64; // ZigZag decoding

    x = x >> 1 ^ -(x & 1);
    y = y >> 1 ^ -(y & 1); // Delta deocding

    x += prevX;
    y += prevY;
    prevX = x;
    prevY = y; // Dequantize

    result.push([x / encodeScale, y / encodeScale]);
  }

  return result;
}

function parseGeoJSON(geoJson, nameProperty) {
  geoJson = decode(geoJson);
  return map(filter(geoJson.features, function (featureObj) {
    // Output of mapshaper may have geometry null
    return featureObj.geometry && featureObj.properties && featureObj.geometry.coordinates.length > 0;
  }), function (featureObj) {
    var properties = featureObj.properties;
    var geo = featureObj.geometry;
    var geometries = [];

    if (geo.type === 'Polygon') {
      var coordinates = geo.coordinates;
      geometries.push({
        type: 'polygon',
        // According to the GeoJSON specification.
        // First must be exterior, and the rest are all interior(holes).
        exterior: coordinates[0],
        interiors: coordinates.slice(1)
      });
    }

    if (geo.type === 'MultiPolygon') {
      var coordinates = geo.coordinates;
      each(coordinates, function (item) {
        if (item[0]) {
          geometries.push({
            type: 'polygon',
            exterior: item[0],
            interiors: item.slice(1)
          });
        }
      });
    }

    var region = new Region(properties[nameProperty || 'name'], geometries, properties.cp);
    region.properties = properties;
    return region;
  });
}

var number = /*#__PURE__*/Object.freeze({
  __proto__: null,
  linearMap: linearMap,
  round: round,
  asc: asc,
  getPrecision: getPrecision,
  getPrecisionSafe: getPrecisionSafe,
  getPixelPrecision: getPixelPrecision,
  getPercentWithPrecision: getPercentWithPrecision,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
  remRadian: remRadian,
  isRadianAroundZero: isRadianAroundZero,
  parseDate: parseDate,
  quantity: quantity,
  quantityExponent: quantityExponent,
  nice: nice,
  quantile: quantile,
  reformIntervals: reformIntervals,
  isNumeric: isNumeric,
  numericToNumber: numericToNumber
});

var time = /*#__PURE__*/Object.freeze({
  __proto__: null,
  parse: parseDate,
  format: format$1
});

var graphic = /*#__PURE__*/Object.freeze({
  __proto__: null,
  extendShape: extendShape,
  extendPath: extendPath,
  makePath: makePath,
  makeImage: makeImage,
  mergePath: mergePath,
  resizePath: resizePath,
  createIcon: createIcon,
  updateProps: updateProps,
  initProps: initProps,
  getTransform: getTransform,
  clipPointsByRect: clipPointsByRect,
  clipRectByRect: clipRectByRect,
  registerShape: registerShape,
  getShapeClass: getShapeClass,
  Group: Group,
  Image: ZRImage,
  Text: ZRText,
  Circle: Circle,
  Ellipse: Ellipse,
  Sector: Sector,
  Ring: Ring,
  Polygon: Polygon,
  Polyline: Polyline,
  Rect: Rect,
  Line: Line,
  BezierCurve: BezierCurve,
  Arc: Arc,
  IncrementalDisplayable: IncrementalDisplayable,
  CompoundPath: CompoundPath,
  LinearGradient: LinearGradient,
  RadialGradient: RadialGradient,
  BoundingRect: BoundingRect
});

var format = /*#__PURE__*/Object.freeze({
  __proto__: null,
  addCommas: addCommas,
  toCamelCase: toCamelCase,
  normalizeCssArray: normalizeCssArray,
  encodeHTML: encodeHTML,
  formatTpl: formatTpl,
  getTooltipMarker: getTooltipMarker,
  formatTime: formatTime,
  capitalFirst: capitalFirst,
  truncateText: truncateText,
  getTextRect: getTextRect
});

var util = /*#__PURE__*/Object.freeze({
  __proto__: null,
  map: map,
  each: each,
  indexOf: indexOf,
  inherits: inherits,
  reduce: reduce,
  filter: filter,
  bind: bind,
  curry: curry,
  isArray: isArray,
  isString: isString,
  isObject: isObject,
  isFunction: isFunction,
  extend: extend,
  defaults: defaults,
  clone: clone,
  merge: merge
});

// Should use `ComponentModel.extend` or `class XXXX extend ComponentModel` to create class.
// Then use `registerComponentModel` in `install` parameter when `use` this extension. For example:
// class Bar3DModel extends ComponentModel {}
// export function install(registers) { regsiters.registerComponentModel(Bar3DModel); }
// echarts.use(install);

function extendComponentModel(proto) {
  var Model = ComponentModel.extend(proto);
  ComponentModel.registerClass(Model);
  return Model;
}
function extendComponentView(proto) {
  var View = ComponentView.extend(proto);
  ComponentView.registerClass(View);
  return View;
}
function extendSeriesModel(proto) {
  var Model = SeriesModel.extend(proto);
  SeriesModel.registerClass(Model);
  return Model;
}
function extendChartView(proto) {
  var View = ChartView.extend(proto);
  ChartView.registerClass(View);
  return View;
}

export { Region as R, contain as a, extendComponentView as b, createListFromArray as c, extendSeriesModel as d, extendComponentModel as e, format as f, graphic as g, helper as h, extendChartView as i, number as n, parseGeoJSON as p, time as t, util as u };
