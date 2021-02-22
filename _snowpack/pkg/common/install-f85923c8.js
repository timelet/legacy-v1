import { _ as __extends, B as ComponentModel, V as SINGLE_REFERRING, cl as fetchLayoutMode, aC as getLayoutParams, aE as mergeLayoutParam, W as getLayoutRect, I as Line, Z as ZRText, ag as createTextStyle, b as getECData, cm as remRadian, cn as isRadianAroundZero, M as Model, G as Group, H as makeInner, R as Rect, aq as groupTransition, y as graphic, aO as createIcon, u as updateProps$1, al as applyTransform$1, aN as normalizeCssArray, q as queryDataIndex, h as convertToColorString, co as getPaddingFromTooltipModel, cp as toCamelCase, av as throwError, cq as getTooltipRenderMode, A as createTooltipMarkup, cr as normalizeTooltipFormatResult, cs as buildTooltipMarkup, bR as format, ct as formatTpl, p as parsePercent$1, cu as TooltipMarkupStyleCreator, a8 as windowOpen } from './dataSelectAction-16288cd0.js';
import { A as AxisModelCommonMixin, a9 as OrdinalMeta, b as Axis, n as niceScaleExtent, aa as estimateLabelUnionRect, k as createScaleByModel, q as getDataDimensionsOnAxis, ab as ifAxisCrossZero, c as createSymbol, ac as shouldShowAllLabels, C as ComponentView, s as stop, j as createOrUpdate, ad as getAxisRawValue, u as use, ae as normalizeEvent, af as transformLocalCoord, ag as findEventDispatcher } from './Axis-08a3fd01.js';
import { s as mixin, r as merge, j as defaults, e as each$2, m as map, a2 as filter, J as invert, G as applyTransform, C as BoundingRect, N as retrieve, b as isObject, S as indexOf, a as extend, av as identity, w as rotate, aS as mul, k as curry, o as clone$1, i as isArray, A as createHashMap, q as bind$2, u as isString, W as isFunction, aw as getBoundingRect, y as translate, z as create, ax as env, ay as isDom, t as toHex, v as trim, ag as retrieve2 } from './IncrementalDisplayable-8ed2fa44.js';

var GridModel =
/** @class */
function (_super) {
  __extends(GridModel, _super);

  function GridModel() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  GridModel.type = 'grid';
  GridModel.dependencies = ['xAxis', 'yAxis'];
  GridModel.layoutMode = 'box';
  GridModel.defaultOption = {
    show: false,
    zlevel: 0,
    z: 0,
    left: '10%',
    top: 60,
    right: '10%',
    bottom: 70,
    // If grid size contain label
    containLabel: false,
    // width: {totalWidth} - left - right,
    // height: {totalHeight} - top - bottom,
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 1,
    borderColor: '#ccc'
  };
  return GridModel;
}(ComponentModel);

var CartesianAxisModel =
/** @class */
function (_super) {
  __extends(CartesianAxisModel, _super);

  function CartesianAxisModel() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  CartesianAxisModel.prototype.getCoordSysModel = function () {
    return this.getReferringComponents('grid', SINGLE_REFERRING).models[0];
  };

  CartesianAxisModel.type = 'cartesian2dAxis';
  return CartesianAxisModel;
}(ComponentModel);
mixin(CartesianAxisModel, AxisModelCommonMixin);

var defaultOption = {
  show: true,
  zlevel: 0,
  z: 0,
  // Inverse the axis.
  inverse: false,
  // Axis name displayed.
  name: '',
  // 'start' | 'middle' | 'end'
  nameLocation: 'end',
  // By degree. By default auto rotate by nameLocation.
  nameRotate: null,
  nameTruncate: {
    maxWidth: null,
    ellipsis: '...',
    placeholder: '.'
  },
  // Use global text style by default.
  nameTextStyle: {},
  // The gap between axisName and axisLine.
  nameGap: 15,
  // Default `false` to support tooltip.
  silent: false,
  // Default `false` to avoid legacy user event listener fail.
  triggerEvent: false,
  tooltip: {
    show: false
  },
  axisPointer: {},
  axisLine: {
    show: true,
    onZero: true,
    onZeroAxisIndex: null,
    lineStyle: {
      color: '#6E7079',
      width: 1,
      type: 'solid'
    },
    // The arrow at both ends the the axis.
    symbol: ['none', 'none'],
    symbolSize: [10, 15]
  },
  axisTick: {
    show: true,
    // Whether axisTick is inside the grid or outside the grid.
    inside: false,
    // The length of axisTick.
    length: 5,
    lineStyle: {
      width: 1
    }
  },
  axisLabel: {
    show: true,
    // Whether axisLabel is inside the grid or outside the grid.
    inside: false,
    rotate: 0,
    // true | false | null/undefined (auto)
    showMinLabel: null,
    // true | false | null/undefined (auto)
    showMaxLabel: null,
    margin: 8,
    // formatter: null,
    fontSize: 12
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: ['#E0E6F1'],
      width: 1,
      type: 'solid'
    }
  },
  splitArea: {
    show: false,
    areaStyle: {
      color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
    }
  }
};
var categoryAxis = merge({
  // The gap at both ends of the axis. For categoryAxis, boolean.
  boundaryGap: true,
  // Set false to faster category collection.
  deduplication: null,
  // splitArea: {
  // show: false
  // },
  splitLine: {
    show: false
  },
  axisTick: {
    // If tick is align with label when boundaryGap is true
    alignWithLabel: false,
    interval: 'auto'
  },
  axisLabel: {
    interval: 'auto'
  }
}, defaultOption);
var valueAxis = merge({
  boundaryGap: [0, 0],
  axisLine: {
    // Not shown when other axis is categoryAxis in cartesian
    show: 'auto'
  },
  axisTick: {
    // Not shown when other axis is categoryAxis in cartesian
    show: 'auto'
  },
  // TODO
  // min/max: [30, datamin, 60] or [20, datamin] or [datamin, 60]
  splitNumber: 5,
  minorTick: {
    // Minor tick, not available for cateogry axis.
    show: false,
    // Split number of minor ticks. The value should be in range of (0, 100)
    splitNumber: 5,
    // Lenght of minor tick
    length: 3,
    // Line style
    lineStyle: {// Default to be same with axisTick
    }
  },
  minorSplitLine: {
    show: false,
    lineStyle: {
      color: '#F4F7FD',
      width: 1
    }
  }
}, defaultOption);
var timeAxis = merge({
  scale: true,
  splitNumber: 6,
  axisLabel: {
    // To eliminate labels that are not nice
    showMinLabel: false,
    showMaxLabel: false,
    rich: {
      primary: {
        fontWeight: 'bold'
      }
    }
  },
  splitLine: {
    show: false
  }
}, valueAxis);
var logAxis = defaults({
  scale: true,
  logBase: 10
}, valueAxis);
var axisDefault = {
  category: categoryAxis,
  value: valueAxis,
  time: timeAxis,
  log: logAxis
};

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
var AXIS_TYPES = {
  value: 1,
  category: 1,
  time: 1,
  log: 1
};

/**
 * Generate sub axis model class
 * @param axisName 'x' 'y' 'radius' 'angle' 'parallel' ...
 */

function axisModelCreator(registers, axisName, BaseAxisModelClass, extraDefaultOption) {
  each$2(AXIS_TYPES, function (v, axisType) {
    var defaultOption = merge(merge({}, axisDefault[axisType], true), extraDefaultOption, true);

    var AxisModel =
    /** @class */
    function (_super) {
      __extends(AxisModel, _super);

      function AxisModel() {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        var _this = _super.apply(this, args) || this;

        _this.type = axisName + 'Axis.' + axisType;
        return _this;
      }

      AxisModel.prototype.mergeDefaultAndTheme = function (option, ecModel) {
        var layoutMode = fetchLayoutMode(this);
        var inputPositionParams = layoutMode ? getLayoutParams(option) : {};
        var themeModel = ecModel.getTheme();
        merge(option, themeModel.get(axisType + 'Axis'));
        merge(option, this.getDefaultOption());
        option.type = getAxisType(option);

        if (layoutMode) {
          mergeLayoutParam(option, inputPositionParams, layoutMode);
        }
      };

      AxisModel.prototype.optionUpdated = function () {
        var thisOption = this.option;

        if (thisOption.type === 'category') {
          this.__ordinalMeta = OrdinalMeta.createByAxisModel(this);
        }
      };
      /**
       * Should not be called before all of 'getInitailData' finished.
       * Because categories are collected during initializing data.
       */


      AxisModel.prototype.getCategories = function (rawData) {
        var option = this.option; // FIXME
        // warning if called before all of 'getInitailData' finished.

        if (option.type === 'category') {
          if (rawData) {
            return option.data;
          }

          return this.__ordinalMeta.categories;
        }
      };

      AxisModel.prototype.getOrdinalMeta = function () {
        return this.__ordinalMeta;
      };

      AxisModel.type = axisName + 'Axis.' + axisType;
      AxisModel.defaultOption = defaultOption;
      return AxisModel;
    }(BaseAxisModelClass);

    registers.registerComponentModel(AxisModel);
  });
  registers.registerSubTypeDefaulter(axisName + 'Axis', getAxisType);
}

function getAxisType(option) {
  // Default axis with data is category axis
  return option.type || (option.data ? 'category' : 'value');
}

var Cartesian =
/** @class */
function () {
  function Cartesian(name) {
    this.type = 'cartesian';
    this._dimList = [];
    this._axes = {};
    this.name = name || '';
  }

  Cartesian.prototype.getAxis = function (dim) {
    return this._axes[dim];
  };

  Cartesian.prototype.getAxes = function () {
    return map(this._dimList, function (dim) {
      return this._axes[dim];
    }, this);
  };

  Cartesian.prototype.getAxesByScale = function (scaleType) {
    scaleType = scaleType.toLowerCase();
    return filter(this.getAxes(), function (axis) {
      return axis.scale.type === scaleType;
    });
  };

  Cartesian.prototype.addAxis = function (axis) {
    var dim = axis.dim;
    this._axes[dim] = axis;

    this._dimList.push(dim);
  };

  return Cartesian;
}();

var cartesian2DDimensions = ['x', 'y'];

function canCalculateAffineTransform(scale) {
  return scale.type === 'interval' || scale.type === 'time';
}

var Cartesian2D =
/** @class */
function (_super) {
  __extends(Cartesian2D, _super);

  function Cartesian2D() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = 'cartesian2d';
    _this.dimensions = cartesian2DDimensions;
    return _this;
  }
  /**
   * Calculate an affine transform matrix if two axes are time or value.
   * It's mainly for accelartion on the large time series data.
   */


  Cartesian2D.prototype.calcAffineTransform = function () {
    this._transform = this._invTransform = null;
    var xAxisScale = this.getAxis('x').scale;
    var yAxisScale = this.getAxis('y').scale;

    if (!canCalculateAffineTransform(xAxisScale) || !canCalculateAffineTransform(yAxisScale)) {
      return;
    }

    var xScaleExtent = xAxisScale.getExtent();
    var yScaleExtent = yAxisScale.getExtent();
    var start = this.dataToPoint([xScaleExtent[0], yScaleExtent[0]]);
    var end = this.dataToPoint([xScaleExtent[1], yScaleExtent[1]]);
    var xScaleSpan = xScaleExtent[1] - xScaleExtent[0];
    var yScaleSpan = yScaleExtent[1] - yScaleExtent[0];

    if (!xScaleSpan || !yScaleSpan) {
      return;
    } // Accelerate data to point calculation on the special large time series data.


    var scaleX = (end[0] - start[0]) / xScaleSpan;
    var scaleY = (end[1] - start[1]) / yScaleSpan;
    var translateX = start[0] - xScaleExtent[0] * scaleX;
    var translateY = start[1] - yScaleExtent[0] * scaleY;
    var m = this._transform = [scaleX, 0, 0, scaleY, translateX, translateY];
    this._invTransform = invert([], m);
  };
  /**
   * Base axis will be used on stacking.
   */


  Cartesian2D.prototype.getBaseAxis = function () {
    return this.getAxesByScale('ordinal')[0] || this.getAxesByScale('time')[0] || this.getAxis('x');
  };

  Cartesian2D.prototype.containPoint = function (point) {
    var axisX = this.getAxis('x');
    var axisY = this.getAxis('y');
    return axisX.contain(axisX.toLocalCoord(point[0])) && axisY.contain(axisY.toLocalCoord(point[1]));
  };

  Cartesian2D.prototype.containData = function (data) {
    return this.getAxis('x').containData(data[0]) && this.getAxis('y').containData(data[1]);
  };

  Cartesian2D.prototype.dataToPoint = function (data, reserved, out) {
    out = out || [];
    var xVal = data[0];
    var yVal = data[1]; // Fast path

    if (this._transform // It's supported that if data is like `[Inifity, 123]`, where only Y pixel calculated.
    && xVal != null && isFinite(xVal) && yVal != null && isFinite(yVal)) {
      return applyTransform(out, data, this._transform);
    }

    var xAxis = this.getAxis('x');
    var yAxis = this.getAxis('y');
    out[0] = xAxis.toGlobalCoord(xAxis.dataToCoord(xVal));
    out[1] = yAxis.toGlobalCoord(yAxis.dataToCoord(yVal));
    return out;
  };

  Cartesian2D.prototype.clampData = function (data, out) {
    var xScale = this.getAxis('x').scale;
    var yScale = this.getAxis('y').scale;
    var xAxisExtent = xScale.getExtent();
    var yAxisExtent = yScale.getExtent();
    var x = xScale.parse(data[0]);
    var y = yScale.parse(data[1]);
    out = out || [];
    out[0] = Math.min(Math.max(Math.min(xAxisExtent[0], xAxisExtent[1]), x), Math.max(xAxisExtent[0], xAxisExtent[1]));
    out[1] = Math.min(Math.max(Math.min(yAxisExtent[0], yAxisExtent[1]), y), Math.max(yAxisExtent[0], yAxisExtent[1]));
    return out;
  };

  Cartesian2D.prototype.pointToData = function (point, out) {
    out = out || [];

    if (this._invTransform) {
      return applyTransform(out, point, this._invTransform);
    }

    var xAxis = this.getAxis('x');
    var yAxis = this.getAxis('y');
    out[0] = xAxis.coordToData(xAxis.toLocalCoord(point[0]));
    out[1] = yAxis.coordToData(yAxis.toLocalCoord(point[1]));
    return out;
  };

  Cartesian2D.prototype.getOtherAxis = function (axis) {
    return this.getAxis(axis.dim === 'x' ? 'y' : 'x');
  };
  /**
   * Get rect area of cartesian.
   * Area will have a contain function to determine if a point is in the coordinate system.
   */


  Cartesian2D.prototype.getArea = function () {
    var xExtent = this.getAxis('x').getGlobalExtent();
    var yExtent = this.getAxis('y').getGlobalExtent();
    var x = Math.min(xExtent[0], xExtent[1]);
    var y = Math.min(yExtent[0], yExtent[1]);
    var width = Math.max(xExtent[0], xExtent[1]) - x;
    var height = Math.max(yExtent[0], yExtent[1]) - y;
    return new BoundingRect(x, y, width, height);
  };

  return Cartesian2D;
}(Cartesian);

var Axis2D =
/** @class */
function (_super) {
  __extends(Axis2D, _super);

  function Axis2D(dim, scale, coordExtent, axisType, position) {
    var _this = _super.call(this, dim, scale, coordExtent) || this;
    /**
     * Index of axis, can be used as key
     * Injected outside.
     */


    _this.index = 0;
    _this.type = axisType || 'value';
    _this.position = position || 'bottom';
    return _this;
  }

  Axis2D.prototype.isHorizontal = function () {
    var position = this.position;
    return position === 'top' || position === 'bottom';
  };
  /**
   * Each item cooresponds to this.getExtent(), which
   * means globalExtent[0] may greater than globalExtent[1],
   * unless `asc` is input.
   *
   * @param {boolean} [asc]
   * @return {Array.<number>}
   */


  Axis2D.prototype.getGlobalExtent = function (asc) {
    var ret = this.getExtent();
    ret[0] = this.toGlobalCoord(ret[0]);
    ret[1] = this.toGlobalCoord(ret[1]);
    asc && ret[0] > ret[1] && ret.reverse();
    return ret;
  };

  Axis2D.prototype.pointToData = function (point, clamp) {
    return this.coordToData(this.toLocalCoord(point[this.dim === 'x' ? 0 : 1]), clamp);
  };
  /**
   * Set ordinalSortInfo
   * @param info new OrdinalSortInfo
   */


  Axis2D.prototype.setCategorySortInfo = function (info) {
    if (this.type !== 'category') {
      return false;
    }

    this.model.option.categorySortInfo = info;
    this.scale.setSortInfo(info);
  };

  return Axis2D;
}(Axis);

/**
 * Can only be called after coordinate system creation stage.
 * (Can be called before coordinate system update stage).
 */

function layout(gridModel, axisModel, opt) {
  opt = opt || {};
  var grid = gridModel.coordinateSystem;
  var axis = axisModel.axis;
  var layout = {};
  var otherAxisOnZeroOf = axis.getAxesOnZeroOf()[0];
  var rawAxisPosition = axis.position;
  var axisPosition = otherAxisOnZeroOf ? 'onZero' : rawAxisPosition;
  var axisDim = axis.dim;
  var rect = grid.getRect();
  var rectBound = [rect.x, rect.x + rect.width, rect.y, rect.y + rect.height];
  var idx = {
    left: 0,
    right: 1,
    top: 0,
    bottom: 1,
    onZero: 2
  };
  var axisOffset = axisModel.get('offset') || 0;
  var posBound = axisDim === 'x' ? [rectBound[2] - axisOffset, rectBound[3] + axisOffset] : [rectBound[0] - axisOffset, rectBound[1] + axisOffset];

  if (otherAxisOnZeroOf) {
    var onZeroCoord = otherAxisOnZeroOf.toGlobalCoord(otherAxisOnZeroOf.dataToCoord(0));
    posBound[idx.onZero] = Math.max(Math.min(onZeroCoord, posBound[1]), posBound[0]);
  } // Axis position


  layout.position = [axisDim === 'y' ? posBound[idx[axisPosition]] : rectBound[0], axisDim === 'x' ? posBound[idx[axisPosition]] : rectBound[3]]; // Axis rotation

  layout.rotation = Math.PI / 2 * (axisDim === 'x' ? 0 : 1); // Tick and label direction, x y is axisDim

  var dirMap = {
    top: -1,
    bottom: 1,
    left: -1,
    right: 1
  };
  layout.labelDirection = layout.tickDirection = layout.nameDirection = dirMap[rawAxisPosition];
  layout.labelOffset = otherAxisOnZeroOf ? posBound[idx[rawAxisPosition]] - posBound[idx.onZero] : 0;

  if (axisModel.get(['axisTick', 'inside'])) {
    layout.tickDirection = -layout.tickDirection;
  }

  if (retrieve(opt.labelInside, axisModel.get(['axisLabel', 'inside']))) {
    layout.labelDirection = -layout.labelDirection;
  } // Special label rotation


  var labelRotate = axisModel.get(['axisLabel', 'rotate']);
  layout.labelRotate = axisPosition === 'top' ? -labelRotate : labelRotate; // Over splitLine and splitArea

  layout.z2 = 1;
  return layout;
}
function isCartesian2DSeries(seriesModel) {
  return seriesModel.get('coordinateSystem') === 'cartesian2d';
}
function findAxisModels(seriesModel) {
  var axisModelMap = {
    xAxisModel: null,
    yAxisModel: null
  };
  each$2(axisModelMap, function (v, key) {
    var axisType = key.replace(/Model$/, '');
    var axisModel = seriesModel.getReferringComponents(axisType, SINGLE_REFERRING).models[0];

    axisModelMap[key] = axisModel;
  });
  return axisModelMap;
}

var Grid =
/** @class */
function () {
  function Grid(gridModel, ecModel, api) {
    // FIXME:TS where used (different from registered type 'cartesian2d')?
    this.type = 'grid';
    this._coordsMap = {};
    this._coordsList = [];
    this._axesMap = {};
    this._axesList = [];
    this.axisPointerEnabled = true;
    this.dimensions = cartesian2DDimensions;

    this._initCartesian(gridModel, ecModel, api);

    this.model = gridModel;
  }

  Grid.prototype.getRect = function () {
    return this._rect;
  };

  Grid.prototype.update = function (ecModel, api) {
    var axesMap = this._axesMap;

    this._updateScale(ecModel, this.model);

    each$2(axesMap.x, function (xAxis) {
      niceScaleExtent(xAxis.scale, xAxis.model);
    });
    each$2(axesMap.y, function (yAxis) {
      niceScaleExtent(yAxis.scale, yAxis.model);
    }); // Key: axisDim_axisIndex, value: boolean, whether onZero target.

    var onZeroRecords = {};
    each$2(axesMap.x, function (xAxis) {
      fixAxisOnZero(axesMap, 'y', xAxis, onZeroRecords);
    });
    each$2(axesMap.y, function (yAxis) {
      fixAxisOnZero(axesMap, 'x', yAxis, onZeroRecords);
    }); // Resize again if containLabel is enabled
    // FIXME It may cause getting wrong grid size in data processing stage

    this.resize(this.model, api);
  };
  /**
   * Resize the grid
   */


  Grid.prototype.resize = function (gridModel, api, ignoreContainLabel) {
    var boxLayoutParams = gridModel.getBoxLayoutParams();
    var isContainLabel = !ignoreContainLabel && gridModel.get('containLabel');
    var gridRect = getLayoutRect(boxLayoutParams, {
      width: api.getWidth(),
      height: api.getHeight()
    });
    this._rect = gridRect;
    var axesList = this._axesList;
    adjustAxes(); // Minus label size

    if (isContainLabel) {
      each$2(axesList, function (axis) {
        if (!axis.model.get(['axisLabel', 'inside'])) {
          var labelUnionRect = estimateLabelUnionRect(axis);

          if (labelUnionRect) {
            var dim = axis.isHorizontal() ? 'height' : 'width';
            var margin = axis.model.get(['axisLabel', 'margin']);
            gridRect[dim] -= labelUnionRect[dim] + margin;

            if (axis.position === 'top') {
              gridRect.y += labelUnionRect.height + margin;
            } else if (axis.position === 'left') {
              gridRect.x += labelUnionRect.width + margin;
            }
          }
        }
      });
      adjustAxes();
    }

    each$2(this._coordsList, function (coord) {
      // Calculate affine matrix to accelerate the data to point transform.
      // If all the axes scales are time or value.
      coord.calcAffineTransform();
    });

    function adjustAxes() {
      each$2(axesList, function (axis) {
        var isHorizontal = axis.isHorizontal();
        var extent = isHorizontal ? [0, gridRect.width] : [0, gridRect.height];
        var idx = axis.inverse ? 1 : 0;
        axis.setExtent(extent[idx], extent[1 - idx]);
        updateAxisTransform(axis, isHorizontal ? gridRect.x : gridRect.y);
      });
    }
  };

  Grid.prototype.getAxis = function (dim, axisIndex) {
    var axesMapOnDim = this._axesMap[dim];

    if (axesMapOnDim != null) {
      return axesMapOnDim[axisIndex || 0]; // if (axisIndex == null) {
      //     Find first axis
      //     for (let name in axesMapOnDim) {
      //         if (axesMapOnDim.hasOwnProperty(name)) {
      //             return axesMapOnDim[name];
      //         }
      //     }
      // }
      // return axesMapOnDim[axisIndex];
    }
  };

  Grid.prototype.getAxes = function () {
    return this._axesList.slice();
  };

  Grid.prototype.getCartesian = function (xAxisIndex, yAxisIndex) {
    if (xAxisIndex != null && yAxisIndex != null) {
      var key = 'x' + xAxisIndex + 'y' + yAxisIndex;
      return this._coordsMap[key];
    }

    if (isObject(xAxisIndex)) {
      yAxisIndex = xAxisIndex.yAxisIndex;
      xAxisIndex = xAxisIndex.xAxisIndex;
    }

    for (var i = 0, coordList = this._coordsList; i < coordList.length; i++) {
      if (coordList[i].getAxis('x').index === xAxisIndex || coordList[i].getAxis('y').index === yAxisIndex) {
        return coordList[i];
      }
    }
  };

  Grid.prototype.getCartesians = function () {
    return this._coordsList.slice();
  };
  /**
   * @implements
   */


  Grid.prototype.convertToPixel = function (ecModel, finder, value) {
    var target = this._findConvertTarget(finder);

    return target.cartesian ? target.cartesian.dataToPoint(value) : target.axis ? target.axis.toGlobalCoord(target.axis.dataToCoord(value)) : null;
  };
  /**
   * @implements
   */


  Grid.prototype.convertFromPixel = function (ecModel, finder, value) {
    var target = this._findConvertTarget(finder);

    return target.cartesian ? target.cartesian.pointToData(value) : target.axis ? target.axis.coordToData(target.axis.toLocalCoord(value)) : null;
  };

  Grid.prototype._findConvertTarget = function (finder) {
    var seriesModel = finder.seriesModel;
    var xAxisModel = finder.xAxisModel || seriesModel && seriesModel.getReferringComponents('xAxis', SINGLE_REFERRING).models[0];
    var yAxisModel = finder.yAxisModel || seriesModel && seriesModel.getReferringComponents('yAxis', SINGLE_REFERRING).models[0];
    var gridModel = finder.gridModel;
    var coordsList = this._coordsList;
    var cartesian;
    var axis;

    if (seriesModel) {
      cartesian = seriesModel.coordinateSystem;
      indexOf(coordsList, cartesian) < 0 && (cartesian = null);
    } else if (xAxisModel && yAxisModel) {
      cartesian = this.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex);
    } else if (xAxisModel) {
      axis = this.getAxis('x', xAxisModel.componentIndex);
    } else if (yAxisModel) {
      axis = this.getAxis('y', yAxisModel.componentIndex);
    } // Lowest priority.
    else if (gridModel) {
        var grid = gridModel.coordinateSystem;

        if (grid === this) {
          cartesian = this._coordsList[0];
        }
      }

    return {
      cartesian: cartesian,
      axis: axis
    };
  };
  /**
   * @implements
   */


  Grid.prototype.containPoint = function (point) {
    var coord = this._coordsList[0];

    if (coord) {
      return coord.containPoint(point);
    }
  };
  /**
   * Initialize cartesian coordinate systems
   */


  Grid.prototype._initCartesian = function (gridModel, ecModel, api) {
    var _this = this;

    var grid = this;
    var axisPositionUsed = {
      left: false,
      right: false,
      top: false,
      bottom: false
    };
    var axesMap = {
      x: {},
      y: {}
    };
    var axesCount = {
      x: 0,
      y: 0
    }; /// Create axis

    ecModel.eachComponent('xAxis', createAxisCreator('x'), this);
    ecModel.eachComponent('yAxis', createAxisCreator('y'), this);

    if (!axesCount.x || !axesCount.y) {
      // Roll back when there no either x or y axis
      this._axesMap = {};
      this._axesList = [];
      return;
    }

    this._axesMap = axesMap; /// Create cartesian2d

    each$2(axesMap.x, function (xAxis, xAxisIndex) {
      each$2(axesMap.y, function (yAxis, yAxisIndex) {
        var key = 'x' + xAxisIndex + 'y' + yAxisIndex;
        var cartesian = new Cartesian2D(key);
        cartesian.master = _this;
        cartesian.model = gridModel;
        _this._coordsMap[key] = cartesian;

        _this._coordsList.push(cartesian);

        cartesian.addAxis(xAxis);
        cartesian.addAxis(yAxis);
      });
    });

    function createAxisCreator(dimName) {
      return function (axisModel, idx) {
        if (!isAxisUsedInTheGrid(axisModel, gridModel)) {
          return;
        }

        var axisPosition = axisModel.get('position');

        if (dimName === 'x') {
          // Fix position
          if (axisPosition !== 'top' && axisPosition !== 'bottom') {
            // Default bottom of X
            axisPosition = axisPositionUsed.bottom ? 'top' : 'bottom';
          }
        } else {
          // Fix position
          if (axisPosition !== 'left' && axisPosition !== 'right') {
            // Default left of Y
            axisPosition = axisPositionUsed.left ? 'right' : 'left';
          }
        }

        axisPositionUsed[axisPosition] = true;
        var axis = new Axis2D(dimName, createScaleByModel(axisModel), [0, 0], axisModel.get('type'), axisPosition);
        var isCategory = axis.type === 'category';
        axis.onBand = isCategory && axisModel.get('boundaryGap');
        axis.inverse = axisModel.get('inverse'); // Inject axis into axisModel

        axisModel.axis = axis; // Inject axisModel into axis

        axis.model = axisModel; // Inject grid info axis

        axis.grid = grid; // Index of axis, can be used as key

        axis.index = idx;

        grid._axesList.push(axis);

        axesMap[dimName][idx] = axis;
        axesCount[dimName]++;
      };
    }
  };
  /**
   * Update cartesian properties from series.
   */


  Grid.prototype._updateScale = function (ecModel, gridModel) {
    // Reset scale
    each$2(this._axesList, function (axis) {
      axis.scale.setExtent(Infinity, -Infinity);

      if (axis.type === 'category') {
        var categorySortInfo = axis.model.get('categorySortInfo');
        axis.scale.setSortInfo(categorySortInfo);
      }
    });
    ecModel.eachSeries(function (seriesModel) {
      if (isCartesian2DSeries(seriesModel)) {
        var axesModelMap = findAxisModels(seriesModel);
        var xAxisModel = axesModelMap.xAxisModel;
        var yAxisModel = axesModelMap.yAxisModel;

        if (!isAxisUsedInTheGrid(xAxisModel, gridModel) || !isAxisUsedInTheGrid(yAxisModel, gridModel)) {
          return;
        }

        var cartesian = this.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex);
        var data = seriesModel.getData();
        var xAxis = cartesian.getAxis('x');
        var yAxis = cartesian.getAxis('y');

        if (data.type === 'list') {
          unionExtent(data, xAxis);
          unionExtent(data, yAxis);
        }
      }
    }, this);

    function unionExtent(data, axis) {
      each$2(getDataDimensionsOnAxis(data, axis.dim), function (dim) {
        axis.scale.unionExtentFromData(data, dim);
      });
    }
  };
  /**
   * @param dim 'x' or 'y' or 'auto' or null/undefined
   */


  Grid.prototype.getTooltipAxes = function (dim) {
    var baseAxes = [];
    var otherAxes = [];
    each$2(this.getCartesians(), function (cartesian) {
      var baseAxis = dim != null && dim !== 'auto' ? cartesian.getAxis(dim) : cartesian.getBaseAxis();
      var otherAxis = cartesian.getOtherAxis(baseAxis);
      indexOf(baseAxes, baseAxis) < 0 && baseAxes.push(baseAxis);
      indexOf(otherAxes, otherAxis) < 0 && otherAxes.push(otherAxis);
    });
    return {
      baseAxes: baseAxes,
      otherAxes: otherAxes
    };
  };

  Grid.create = function (ecModel, api) {
    var grids = [];
    ecModel.eachComponent('grid', function (gridModel, idx) {
      var grid = new Grid(gridModel, ecModel, api);
      grid.name = 'grid_' + idx; // dataSampling requires axis extent, so resize
      // should be performed in create stage.

      grid.resize(gridModel, api, true);
      gridModel.coordinateSystem = grid;
      grids.push(grid);
    }); // Inject the coordinateSystems into seriesModel

    ecModel.eachSeries(function (seriesModel) {
      if (!isCartesian2DSeries(seriesModel)) {
        return;
      }

      var axesModelMap = findAxisModels(seriesModel);
      var xAxisModel = axesModelMap.xAxisModel;
      var yAxisModel = axesModelMap.yAxisModel;
      var gridModel = xAxisModel.getCoordSysModel();

      var grid = gridModel.coordinateSystem;
      seriesModel.coordinateSystem = grid.getCartesian(xAxisModel.componentIndex, yAxisModel.componentIndex);
    });
    return grids;
  }; // For deciding which dimensions to use when creating list data


  Grid.dimensions = cartesian2DDimensions;
  return Grid;
}();
/**
 * Check if the axis is used in the specified grid.
 */


function isAxisUsedInTheGrid(axisModel, gridModel) {
  return axisModel.getCoordSysModel() === gridModel;
}

function fixAxisOnZero(axesMap, otherAxisDim, axis, // Key: see `getOnZeroRecordKey`
onZeroRecords) {
  axis.getAxesOnZeroOf = function () {
    // TODO: onZero of multiple axes.
    return otherAxisOnZeroOf ? [otherAxisOnZeroOf] : [];
  }; // onZero can not be enabled in these two situations:
  // 1. When any other axis is a category axis.
  // 2. When no axis is cross 0 point.


  var otherAxes = axesMap[otherAxisDim];
  var otherAxisOnZeroOf;
  var axisModel = axis.model;
  var onZero = axisModel.get(['axisLine', 'onZero']);
  var onZeroAxisIndex = axisModel.get(['axisLine', 'onZeroAxisIndex']);

  if (!onZero) {
    return;
  } // If target axis is specified.


  if (onZeroAxisIndex != null) {
    if (canOnZeroToAxis(otherAxes[onZeroAxisIndex])) {
      otherAxisOnZeroOf = otherAxes[onZeroAxisIndex];
    }
  } else {
    // Find the first available other axis.
    for (var idx in otherAxes) {
      if (otherAxes.hasOwnProperty(idx) && canOnZeroToAxis(otherAxes[idx]) // Consider that two Y axes on one value axis,
      // if both onZero, the two Y axes overlap.
      && !onZeroRecords[getOnZeroRecordKey(otherAxes[idx])]) {
        otherAxisOnZeroOf = otherAxes[idx];
        break;
      }
    }
  }

  if (otherAxisOnZeroOf) {
    onZeroRecords[getOnZeroRecordKey(otherAxisOnZeroOf)] = true;
  }

  function getOnZeroRecordKey(axis) {
    return axis.dim + '_' + axis.index;
  }
}

function canOnZeroToAxis(axis) {
  return axis && axis.type !== 'category' && axis.type !== 'time' && ifAxisCrossZero(axis);
}

function updateAxisTransform(axis, coordBase) {
  var axisExtent = axis.getExtent();
  var axisExtentSum = axisExtent[0] + axisExtent[1]; // Fast transform

  axis.toGlobalCoord = axis.dim === 'x' ? function (coord) {
    return coord + coordBase;
  } : function (coord) {
    return axisExtentSum - coord + coordBase;
  };
  axis.toLocalCoord = axis.dim === 'x' ? function (coord) {
    return coord - coordBase;
  } : function (coord) {
    return axisExtentSum - coord + coordBase;
  };
}

var PI = Math.PI;
/**
 * A final axis is translated and rotated from a "standard axis".
 * So opt.position and opt.rotation is required.
 *
 * A standard axis is and axis from [0, 0] to [0, axisExtent[1]],
 * for example: (0, 0) ------------> (0, 50)
 *
 * nameDirection or tickDirection or labelDirection is 1 means tick
 * or label is below the standard axis, whereas is -1 means above
 * the standard axis. labelOffset means offset between label and axis,
 * which is useful when 'onZero', where axisLabel is in the grid and
 * label in outside grid.
 *
 * Tips: like always,
 * positive rotation represents anticlockwise, and negative rotation
 * represents clockwise.
 * The direction of position coordinate is the same as the direction
 * of screen coordinate.
 *
 * Do not need to consider axis 'inverse', which is auto processed by
 * axis extent.
 */

var AxisBuilder =
/** @class */
function () {
  function AxisBuilder(axisModel, opt) {
    this.group = new Group();
    this.opt = opt;
    this.axisModel = axisModel; // Default value

    defaults(opt, {
      labelOffset: 0,
      nameDirection: 1,
      tickDirection: 1,
      labelDirection: 1,
      silent: true,
      handleAutoShown: function () {
        return true;
      }
    }); // FIXME Not use a seperate text group?

    var transformGroup = new Group({
      x: opt.position[0],
      y: opt.position[1],
      rotation: opt.rotation
    }); // this.group.add(transformGroup);
    // this._transformGroup = transformGroup;

    transformGroup.updateTransform();
    this._transformGroup = transformGroup;
  }

  AxisBuilder.prototype.hasBuilder = function (name) {
    return !!builders[name];
  };

  AxisBuilder.prototype.add = function (name) {
    builders[name](this.opt, this.axisModel, this.group, this._transformGroup);
  };

  AxisBuilder.prototype.getGroup = function () {
    return this.group;
  };

  AxisBuilder.innerTextLayout = function (axisRotation, textRotation, direction) {
    var rotationDiff = remRadian(textRotation - axisRotation);
    var textAlign;
    var textVerticalAlign;

    if (isRadianAroundZero(rotationDiff)) {
      // Label is parallel with axis line.
      textVerticalAlign = direction > 0 ? 'top' : 'bottom';
      textAlign = 'center';
    } else if (isRadianAroundZero(rotationDiff - PI)) {
      // Label is inverse parallel with axis line.
      textVerticalAlign = direction > 0 ? 'bottom' : 'top';
      textAlign = 'center';
    } else {
      textVerticalAlign = 'middle';

      if (rotationDiff > 0 && rotationDiff < PI) {
        textAlign = direction > 0 ? 'right' : 'left';
      } else {
        textAlign = direction > 0 ? 'left' : 'right';
      }
    }

    return {
      rotation: rotationDiff,
      textAlign: textAlign,
      textVerticalAlign: textVerticalAlign
    };
  };

  AxisBuilder.makeAxisEventDataBase = function (axisModel) {
    var eventData = {
      componentType: axisModel.mainType,
      componentIndex: axisModel.componentIndex
    };
    eventData[axisModel.mainType + 'Index'] = axisModel.componentIndex;
    return eventData;
  };

  AxisBuilder.isLabelSilent = function (axisModel) {
    var tooltipOpt = axisModel.get('tooltip');
    return axisModel.get('silent') // Consider mouse cursor, add these restrictions.
    || !(axisModel.get('triggerEvent') || tooltipOpt && tooltipOpt.show);
  };

  return AxisBuilder;
}();
var builders = {
  axisLine: function (opt, axisModel, group, transformGroup) {
    var shown = axisModel.get(['axisLine', 'show']);

    if (shown === 'auto' && opt.handleAutoShown) {
      shown = opt.handleAutoShown('axisLine');
    }

    if (!shown) {
      return;
    }

    var extent = axisModel.axis.getExtent();
    var matrix = transformGroup.transform;
    var pt1 = [extent[0], 0];
    var pt2 = [extent[1], 0];

    if (matrix) {
      applyTransform(pt1, pt1, matrix);
      applyTransform(pt2, pt2, matrix);
    }

    var lineStyle = extend({
      lineCap: 'round'
    }, axisModel.getModel(['axisLine', 'lineStyle']).getLineStyle());
    var line = new Line({
      // Id for animation
      subPixelOptimize: true,
      shape: {
        x1: pt1[0],
        y1: pt1[1],
        x2: pt2[0],
        y2: pt2[1]
      },
      style: lineStyle,
      strokeContainThreshold: opt.strokeContainThreshold || 5,
      silent: true,
      z2: 1
    });
    line.anid = 'line';
    group.add(line);
    var arrows = axisModel.get(['axisLine', 'symbol']);
    var arrowSize = axisModel.get(['axisLine', 'symbolSize']);
    var arrowOffset = axisModel.get(['axisLine', 'symbolOffset']) || 0;

    if (typeof arrowOffset === 'number') {
      arrowOffset = [arrowOffset, arrowOffset];
    }

    if (arrows != null) {
      if (typeof arrows === 'string') {
        // Use the same arrow for start and end point
        arrows = [arrows, arrows];
      }

      if (typeof arrowSize === 'string' || typeof arrowSize === 'number') {
        // Use the same size for width and height
        arrowSize = [arrowSize, arrowSize];
      }

      var symbolWidth_1 = arrowSize[0];
      var symbolHeight_1 = arrowSize[1];
      each$2([{
        rotate: opt.rotation + Math.PI / 2,
        offset: arrowOffset[0],
        r: 0
      }, {
        rotate: opt.rotation - Math.PI / 2,
        offset: arrowOffset[1],
        r: Math.sqrt((pt1[0] - pt2[0]) * (pt1[0] - pt2[0]) + (pt1[1] - pt2[1]) * (pt1[1] - pt2[1]))
      }], function (point, index) {
        if (arrows[index] !== 'none' && arrows[index] != null) {
          var symbol = createSymbol(arrows[index], -symbolWidth_1 / 2, -symbolHeight_1 / 2, symbolWidth_1, symbolHeight_1, lineStyle.stroke, true); // Calculate arrow position with offset

          var r = point.r + point.offset;
          symbol.attr({
            rotation: point.rotate,
            x: pt1[0] + r * Math.cos(opt.rotation),
            y: pt1[1] - r * Math.sin(opt.rotation),
            silent: true,
            z2: 11
          });
          group.add(symbol);
        }
      });
    }
  },
  axisTickLabel: function (opt, axisModel, group, transformGroup) {
    var ticksEls = buildAxisMajorTicks(group, transformGroup, axisModel, opt);
    var labelEls = buildAxisLabel(group, transformGroup, axisModel, opt);
    fixMinMaxLabelShow(axisModel, labelEls, ticksEls);
    buildAxisMinorTicks(group, transformGroup, axisModel, opt.tickDirection);
  },
  axisName: function (opt, axisModel, group, transformGroup) {
    var name = retrieve(opt.axisName, axisModel.get('name'));

    if (!name) {
      return;
    }

    var nameLocation = axisModel.get('nameLocation');
    var nameDirection = opt.nameDirection;
    var textStyleModel = axisModel.getModel('nameTextStyle');
    var gap = axisModel.get('nameGap') || 0;
    var extent = axisModel.axis.getExtent();
    var gapSignal = extent[0] > extent[1] ? -1 : 1;
    var pos = [nameLocation === 'start' ? extent[0] - gapSignal * gap : nameLocation === 'end' ? extent[1] + gapSignal * gap : (extent[0] + extent[1]) / 2, // Reuse labelOffset.
    isNameLocationCenter(nameLocation) ? opt.labelOffset + nameDirection * gap : 0];
    var labelLayout;
    var nameRotation = axisModel.get('nameRotate');

    if (nameRotation != null) {
      nameRotation = nameRotation * PI / 180; // To radian.
    }

    var axisNameAvailableWidth;

    if (isNameLocationCenter(nameLocation)) {
      labelLayout = AxisBuilder.innerTextLayout(opt.rotation, nameRotation != null ? nameRotation : opt.rotation, // Adapt to axis.
      nameDirection);
    } else {
      labelLayout = endTextLayout(opt.rotation, nameLocation, nameRotation || 0, extent);
      axisNameAvailableWidth = opt.axisNameAvailableWidth;

      if (axisNameAvailableWidth != null) {
        axisNameAvailableWidth = Math.abs(axisNameAvailableWidth / Math.sin(labelLayout.rotation));
        !isFinite(axisNameAvailableWidth) && (axisNameAvailableWidth = null);
      }
    }

    var textFont = textStyleModel.getFont();
    var truncateOpt = axisModel.get('nameTruncate', true) || {};
    var ellipsis = truncateOpt.ellipsis;
    var maxWidth = retrieve(opt.nameTruncateMaxWidth, truncateOpt.maxWidth, axisNameAvailableWidth);
    var tooltipOpt = axisModel.get('tooltip', true);
    var mainType = axisModel.mainType;
    var formatterParams = {
      componentType: mainType,
      name: name,
      $vars: ['name']
    };
    formatterParams[mainType + 'Index'] = axisModel.componentIndex;
    var textEl = new ZRText({
      x: pos[0],
      y: pos[1],
      rotation: labelLayout.rotation,
      silent: AxisBuilder.isLabelSilent(axisModel),
      style: createTextStyle(textStyleModel, {
        text: name,
        font: textFont,
        overflow: 'truncate',
        width: maxWidth,
        ellipsis: ellipsis,
        fill: textStyleModel.getTextColor() || axisModel.get(['axisLine', 'lineStyle', 'color']),
        align: textStyleModel.get('align') || labelLayout.textAlign,
        verticalAlign: textStyleModel.get('verticalAlign') || labelLayout.textVerticalAlign
      }),
      z2: 1
    });
    textEl.tooltip = tooltipOpt && tooltipOpt.show ? extend({
      content: name,
      formatter: function () {
        return name;
      },
      formatterParams: formatterParams
    }, tooltipOpt) : null;
    textEl.__fullText = name; // Id for animation

    textEl.anid = 'name';

    if (axisModel.get('triggerEvent')) {
      var eventData = AxisBuilder.makeAxisEventDataBase(axisModel);
      eventData.targetType = 'axisName';
      eventData.name = name;
      getECData(textEl).eventData = eventData;
    } // FIXME


    transformGroup.add(textEl);
    textEl.updateTransform();
    group.add(textEl);
    textEl.decomposeTransform();
  }
};

function endTextLayout(rotation, textPosition, textRotate, extent) {
  var rotationDiff = remRadian(textRotate - rotation);
  var textAlign;
  var textVerticalAlign;
  var inverse = extent[0] > extent[1];
  var onLeft = textPosition === 'start' && !inverse || textPosition !== 'start' && inverse;

  if (isRadianAroundZero(rotationDiff - PI / 2)) {
    textVerticalAlign = onLeft ? 'bottom' : 'top';
    textAlign = 'center';
  } else if (isRadianAroundZero(rotationDiff - PI * 1.5)) {
    textVerticalAlign = onLeft ? 'top' : 'bottom';
    textAlign = 'center';
  } else {
    textVerticalAlign = 'middle';

    if (rotationDiff < PI * 1.5 && rotationDiff > PI / 2) {
      textAlign = onLeft ? 'left' : 'right';
    } else {
      textAlign = onLeft ? 'right' : 'left';
    }
  }

  return {
    rotation: rotationDiff,
    textAlign: textAlign,
    textVerticalAlign: textVerticalAlign
  };
}

function fixMinMaxLabelShow(axisModel, labelEls, tickEls) {
  if (shouldShowAllLabels(axisModel.axis)) {
    return;
  } // If min or max are user set, we need to check
  // If the tick on min(max) are overlap on their neighbour tick
  // If they are overlapped, we need to hide the min(max) tick label


  var showMinLabel = axisModel.get(['axisLabel', 'showMinLabel']);
  var showMaxLabel = axisModel.get(['axisLabel', 'showMaxLabel']); // FIXME
  // Have not consider onBand yet, where tick els is more than label els.

  labelEls = labelEls || [];
  tickEls = tickEls || [];
  var firstLabel = labelEls[0];
  var nextLabel = labelEls[1];
  var lastLabel = labelEls[labelEls.length - 1];
  var prevLabel = labelEls[labelEls.length - 2];
  var firstTick = tickEls[0];
  var nextTick = tickEls[1];
  var lastTick = tickEls[tickEls.length - 1];
  var prevTick = tickEls[tickEls.length - 2];

  if (showMinLabel === false) {
    ignoreEl(firstLabel);
    ignoreEl(firstTick);
  } else if (isTwoLabelOverlapped(firstLabel, nextLabel)) {
    if (showMinLabel) {
      ignoreEl(nextLabel);
      ignoreEl(nextTick);
    } else {
      ignoreEl(firstLabel);
      ignoreEl(firstTick);
    }
  }

  if (showMaxLabel === false) {
    ignoreEl(lastLabel);
    ignoreEl(lastTick);
  } else if (isTwoLabelOverlapped(prevLabel, lastLabel)) {
    if (showMaxLabel) {
      ignoreEl(prevLabel);
      ignoreEl(prevTick);
    } else {
      ignoreEl(lastLabel);
      ignoreEl(lastTick);
    }
  }
}

function ignoreEl(el) {
  el && (el.ignore = true);
}

function isTwoLabelOverlapped(current, next) {
  // current and next has the same rotation.
  var firstRect = current && current.getBoundingRect().clone();
  var nextRect = next && next.getBoundingRect().clone();

  if (!firstRect || !nextRect) {
    return;
  } // When checking intersect of two rotated labels, we use mRotationBack
  // to avoid that boundingRect is enlarge when using `boundingRect.applyTransform`.


  var mRotationBack = identity([]);
  rotate(mRotationBack, mRotationBack, -current.rotation);
  firstRect.applyTransform(mul([], mRotationBack, current.getLocalTransform()));
  nextRect.applyTransform(mul([], mRotationBack, next.getLocalTransform()));
  return firstRect.intersect(nextRect);
}

function isNameLocationCenter(nameLocation) {
  return nameLocation === 'middle' || nameLocation === 'center';
}

function createTicks(ticksCoords, tickTransform, tickEndCoord, tickLineStyle, anidPrefix) {
  var tickEls = [];
  var pt1 = [];
  var pt2 = [];

  for (var i = 0; i < ticksCoords.length; i++) {
    var tickCoord = ticksCoords[i].coord;
    pt1[0] = tickCoord;
    pt1[1] = 0;
    pt2[0] = tickCoord;
    pt2[1] = tickEndCoord;

    if (tickTransform) {
      applyTransform(pt1, pt1, tickTransform);
      applyTransform(pt2, pt2, tickTransform);
    } // Tick line, Not use group transform to have better line draw


    var tickEl = new Line({
      subPixelOptimize: true,
      shape: {
        x1: pt1[0],
        y1: pt1[1],
        x2: pt2[0],
        y2: pt2[1]
      },
      style: tickLineStyle,
      z2: 2,
      autoBatch: true,
      silent: true
    });
    tickEl.anid = anidPrefix + '_' + ticksCoords[i].tickValue;
    tickEls.push(tickEl);
  }

  return tickEls;
}

function buildAxisMajorTicks(group, transformGroup, axisModel, opt) {
  var axis = axisModel.axis;
  var tickModel = axisModel.getModel('axisTick');
  var shown = tickModel.get('show');

  if (shown === 'auto' && opt.handleAutoShown) {
    shown = opt.handleAutoShown('axisTick');
  }

  if (!shown || axis.scale.isBlank()) {
    return;
  }

  var lineStyleModel = tickModel.getModel('lineStyle');
  var tickEndCoord = opt.tickDirection * tickModel.get('length');
  var ticksCoords = axis.getTicksCoords();
  var ticksEls = createTicks(ticksCoords, transformGroup.transform, tickEndCoord, defaults(lineStyleModel.getLineStyle(), {
    stroke: axisModel.get(['axisLine', 'lineStyle', 'color'])
  }), 'ticks');

  for (var i = 0; i < ticksEls.length; i++) {
    group.add(ticksEls[i]);
  }

  return ticksEls;
}

function buildAxisMinorTicks(group, transformGroup, axisModel, tickDirection) {
  var axis = axisModel.axis;
  var minorTickModel = axisModel.getModel('minorTick');

  if (!minorTickModel.get('show') || axis.scale.isBlank()) {
    return;
  }

  var minorTicksCoords = axis.getMinorTicksCoords();

  if (!minorTicksCoords.length) {
    return;
  }

  var lineStyleModel = minorTickModel.getModel('lineStyle');
  var tickEndCoord = tickDirection * minorTickModel.get('length');
  var minorTickLineStyle = defaults(lineStyleModel.getLineStyle(), defaults(axisModel.getModel('axisTick').getLineStyle(), {
    stroke: axisModel.get(['axisLine', 'lineStyle', 'color'])
  }));

  for (var i = 0; i < minorTicksCoords.length; i++) {
    var minorTicksEls = createTicks(minorTicksCoords[i], transformGroup.transform, tickEndCoord, minorTickLineStyle, 'minorticks_' + i);

    for (var k = 0; k < minorTicksEls.length; k++) {
      group.add(minorTicksEls[k]);
    }
  }
}

function buildAxisLabel(group, transformGroup, axisModel, opt) {
  var axis = axisModel.axis;
  var show = retrieve(opt.axisLabelShow, axisModel.get(['axisLabel', 'show']));

  if (!show || axis.scale.isBlank()) {
    return;
  }

  var labelModel = axisModel.getModel('axisLabel');
  var labelMargin = labelModel.get('margin');
  var labels = axis.getViewLabels(); // Special label rotate.

  var labelRotation = (retrieve(opt.labelRotate, labelModel.get('rotate')) || 0) * PI / 180;
  var labelLayout = AxisBuilder.innerTextLayout(opt.rotation, labelRotation, opt.labelDirection);
  var rawCategoryData = axisModel.getCategories && axisModel.getCategories(true);
  var labelEls = [];
  var silent = AxisBuilder.isLabelSilent(axisModel);
  var triggerEvent = axisModel.get('triggerEvent');
  each$2(labels, function (labelItem, index) {
    var tickValue = axis.scale.type === 'ordinal' ? axis.scale.getRawOrdinalNumber(labelItem.tickValue) : labelItem.tickValue;
    var formattedLabel = labelItem.formattedLabel;
    var rawLabel = labelItem.rawLabel;
    var itemLabelModel = labelModel;

    if (rawCategoryData && rawCategoryData[tickValue]) {
      var rawCategoryItem = rawCategoryData[tickValue];

      if (isObject(rawCategoryItem) && rawCategoryItem.textStyle) {
        itemLabelModel = new Model(rawCategoryItem.textStyle, labelModel, axisModel.ecModel);
      }
    }

    var textColor = itemLabelModel.getTextColor() || axisModel.get(['axisLine', 'lineStyle', 'color']);
    var tickCoord = axis.dataToCoord(tickValue);
    var textEl = new ZRText({
      x: tickCoord,
      y: opt.labelOffset + opt.labelDirection * labelMargin,
      rotation: labelLayout.rotation,
      silent: silent,
      z2: 10,
      style: createTextStyle(itemLabelModel, {
        text: formattedLabel,
        align: itemLabelModel.getShallow('align', true) || labelLayout.textAlign,
        verticalAlign: itemLabelModel.getShallow('verticalAlign', true) || itemLabelModel.getShallow('baseline', true) || labelLayout.textVerticalAlign,
        fill: typeof textColor === 'function' ? textColor( // (1) In category axis with data zoom, tick is not the original
        // index of axis.data. So tick should not be exposed to user
        // in category axis.
        // (2) Compatible with previous version, which always use formatted label as
        // input. But in interval scale the formatted label is like '223,445', which
        // maked user repalce ','. So we modify it to return original val but remain
        // it as 'string' to avoid error in replacing.
        axis.type === 'category' ? rawLabel : axis.type === 'value' ? tickValue + '' : tickValue, index) : textColor
      })
    });
    textEl.anid = 'label_' + tickValue; // Pack data for mouse event

    if (triggerEvent) {
      var eventData = AxisBuilder.makeAxisEventDataBase(axisModel);
      eventData.targetType = 'axisLabel';
      eventData.value = rawLabel;
      getECData(textEl).eventData = eventData;
    } // FIXME


    transformGroup.add(textEl);
    textEl.updateTransform();
    labelEls.push(textEl);
    group.add(textEl);
    textEl.decomposeTransform();
  });
  return labelEls;
}

// allAxesInfo should be updated when setOption performed.

function collect(ecModel, api) {
  var result = {
    /**
     * key: makeKey(axis.model)
     * value: {
     *      axis,
     *      coordSys,
     *      axisPointerModel,
     *      triggerTooltip,
     *      involveSeries,
     *      snap,
     *      seriesModels,
     *      seriesDataCount
     * }
     */
    axesInfo: {},
    seriesInvolved: false,

    /**
     * key: makeKey(coordSys.model)
     * value: Object: key makeKey(axis.model), value: axisInfo
     */
    coordSysAxesInfo: {},
    coordSysMap: {}
  };
  collectAxesInfo(result, ecModel, api); // Check seriesInvolved for performance, in case too many series in some chart.

  result.seriesInvolved && collectSeriesInfo(result, ecModel);
  return result;
}

function collectAxesInfo(result, ecModel, api) {
  var globalTooltipModel = ecModel.getComponent('tooltip');
  var globalAxisPointerModel = ecModel.getComponent('axisPointer'); // links can only be set on global.

  var linksOption = globalAxisPointerModel.get('link', true) || [];
  var linkGroups = []; // Collect axes info.

  each$2(api.getCoordinateSystems(), function (coordSys) {
    // Some coordinate system do not support axes, like geo.
    if (!coordSys.axisPointerEnabled) {
      return;
    }

    var coordSysKey = makeKey(coordSys.model);
    var axesInfoInCoordSys = result.coordSysAxesInfo[coordSysKey] = {};
    result.coordSysMap[coordSysKey] = coordSys; // Set tooltip (like 'cross') is a convienent way to show axisPointer
    // for user. So we enable seting tooltip on coordSys model.

    var coordSysModel = coordSys.model;
    var baseTooltipModel = coordSysModel.getModel('tooltip', globalTooltipModel);
    each$2(coordSys.getAxes(), curry(saveTooltipAxisInfo, false, null)); // If axis tooltip used, choose tooltip axis for each coordSys.
    // Notice this case: coordSys is `grid` but not `cartesian2D` here.

    if (coordSys.getTooltipAxes && globalTooltipModel // If tooltip.showContent is set as false, tooltip will not
    // show but axisPointer will show as normal.
    && baseTooltipModel.get('show')) {
      // Compatible with previous logic. But series.tooltip.trigger: 'axis'
      // or series.data[n].tooltip.trigger: 'axis' are not support any more.
      var triggerAxis = baseTooltipModel.get('trigger') === 'axis';
      var cross = baseTooltipModel.get(['axisPointer', 'type']) === 'cross';
      var tooltipAxes = coordSys.getTooltipAxes(baseTooltipModel.get(['axisPointer', 'axis']));

      if (triggerAxis || cross) {
        each$2(tooltipAxes.baseAxes, curry(saveTooltipAxisInfo, cross ? 'cross' : true, triggerAxis));
      }

      if (cross) {
        each$2(tooltipAxes.otherAxes, curry(saveTooltipAxisInfo, 'cross', false));
      }
    } // fromTooltip: true | false | 'cross'
    // triggerTooltip: true | false | null


    function saveTooltipAxisInfo(fromTooltip, triggerTooltip, axis) {
      var axisPointerModel = axis.model.getModel('axisPointer', globalAxisPointerModel);
      var axisPointerShow = axisPointerModel.get('show');

      if (!axisPointerShow || axisPointerShow === 'auto' && !fromTooltip && !isHandleTrigger(axisPointerModel)) {
        return;
      }

      if (triggerTooltip == null) {
        triggerTooltip = axisPointerModel.get('triggerTooltip');
      }

      axisPointerModel = fromTooltip ? makeAxisPointerModel(axis, baseTooltipModel, globalAxisPointerModel, ecModel, fromTooltip, triggerTooltip) : axisPointerModel;
      var snap = axisPointerModel.get('snap');
      var axisKey = makeKey(axis.model);
      var involveSeries = triggerTooltip || snap || axis.type === 'category'; // If result.axesInfo[key] exist, override it (tooltip has higher priority).

      var axisInfo = result.axesInfo[axisKey] = {
        key: axisKey,
        axis: axis,
        coordSys: coordSys,
        axisPointerModel: axisPointerModel,
        triggerTooltip: triggerTooltip,
        involveSeries: involveSeries,
        snap: snap,
        useHandle: isHandleTrigger(axisPointerModel),
        seriesModels: [],
        linkGroup: null
      };
      axesInfoInCoordSys[axisKey] = axisInfo;
      result.seriesInvolved = result.seriesInvolved || involveSeries;
      var groupIndex = getLinkGroupIndex(linksOption, axis);

      if (groupIndex != null) {
        var linkGroup = linkGroups[groupIndex] || (linkGroups[groupIndex] = {
          axesInfo: {}
        });
        linkGroup.axesInfo[axisKey] = axisInfo;
        linkGroup.mapper = linksOption[groupIndex].mapper;
        axisInfo.linkGroup = linkGroup;
      }
    }
  });
}

function makeAxisPointerModel(axis, baseTooltipModel, globalAxisPointerModel, ecModel, fromTooltip, triggerTooltip) {
  var tooltipAxisPointerModel = baseTooltipModel.getModel('axisPointer');
  var fields = ['type', 'snap', 'lineStyle', 'shadowStyle', 'label', 'animation', 'animationDurationUpdate', 'animationEasingUpdate', 'z'];
  var volatileOption = {};
  each$2(fields, function (field) {
    volatileOption[field] = clone$1(tooltipAxisPointerModel.get(field));
  }); // category axis do not auto snap, otherwise some tick that do not
  // has value can not be hovered. value/time/log axis default snap if
  // triggered from tooltip and trigger tooltip.

  volatileOption.snap = axis.type !== 'category' && !!triggerTooltip; // Compatibel with previous behavior, tooltip axis do not show label by default.
  // Only these properties can be overrided from tooltip to axisPointer.

  if (tooltipAxisPointerModel.get('type') === 'cross') {
    volatileOption.type = 'line';
  }

  var labelOption = volatileOption.label || (volatileOption.label = {}); // Follow the convention, do not show label when triggered by tooltip by default.

  labelOption.show == null && (labelOption.show = false);

  if (fromTooltip === 'cross') {
    // When 'cross', both axes show labels.
    var tooltipAxisPointerLabelShow = tooltipAxisPointerModel.get(['label', 'show']);
    labelOption.show = tooltipAxisPointerLabelShow != null ? tooltipAxisPointerLabelShow : true; // If triggerTooltip, this is a base axis, which should better not use cross style
    // (cross style is dashed by default)

    if (!triggerTooltip) {
      var crossStyle = volatileOption.lineStyle = tooltipAxisPointerModel.get('crossStyle');
      crossStyle && defaults(labelOption, crossStyle.textStyle);
    }
  }

  return axis.model.getModel('axisPointer', new Model(volatileOption, globalAxisPointerModel, ecModel));
}

function collectSeriesInfo(result, ecModel) {
  // Prepare data for axis trigger
  ecModel.eachSeries(function (seriesModel) {
    // Notice this case: this coordSys is `cartesian2D` but not `grid`.
    var coordSys = seriesModel.coordinateSystem;
    var seriesTooltipTrigger = seriesModel.get(['tooltip', 'trigger'], true);
    var seriesTooltipShow = seriesModel.get(['tooltip', 'show'], true);

    if (!coordSys || seriesTooltipTrigger === 'none' || seriesTooltipTrigger === false || seriesTooltipTrigger === 'item' || seriesTooltipShow === false || seriesModel.get(['axisPointer', 'show'], true) === false) {
      return;
    }

    each$2(result.coordSysAxesInfo[makeKey(coordSys.model)], function (axisInfo) {
      var axis = axisInfo.axis;

      if (coordSys.getAxis(axis.dim) === axis) {
        axisInfo.seriesModels.push(seriesModel);
        axisInfo.seriesDataCount == null && (axisInfo.seriesDataCount = 0);
        axisInfo.seriesDataCount += seriesModel.getData().count();
      }
    });
  });
}
/**
 * For example:
 * {
 *     axisPointer: {
 *         links: [{
 *             xAxisIndex: [2, 4],
 *             yAxisIndex: 'all'
 *         }, {
 *             xAxisId: ['a5', 'a7'],
 *             xAxisName: 'xxx'
 *         }]
 *     }
 * }
 */


function getLinkGroupIndex(linksOption, axis) {
  var axisModel = axis.model;
  var dim = axis.dim;

  for (var i = 0; i < linksOption.length; i++) {
    var linkOption = linksOption[i] || {};

    if (checkPropInLink(linkOption[dim + 'AxisId'], axisModel.id) || checkPropInLink(linkOption[dim + 'AxisIndex'], axisModel.componentIndex) || checkPropInLink(linkOption[dim + 'AxisName'], axisModel.name)) {
      return i;
    }
  }
}

function checkPropInLink(linkPropValue, axisPropValue) {
  return linkPropValue === 'all' || isArray(linkPropValue) && indexOf(linkPropValue, axisPropValue) >= 0 || linkPropValue === axisPropValue;
}

function fixValue(axisModel) {
  var axisInfo = getAxisInfo(axisModel);

  if (!axisInfo) {
    return;
  }

  var axisPointerModel = axisInfo.axisPointerModel;
  var scale = axisInfo.axis.scale;
  var option = axisPointerModel.option;
  var status = axisPointerModel.get('status');
  var value = axisPointerModel.get('value'); // Parse init value for category and time axis.

  if (value != null) {
    value = scale.parse(value);
  }

  var useHandle = isHandleTrigger(axisPointerModel); // If `handle` used, `axisPointer` will always be displayed, so value
  // and status should be initialized.

  if (status == null) {
    option.status = useHandle ? 'show' : 'hide';
  }

  var extent = scale.getExtent().slice();
  extent[0] > extent[1] && extent.reverse();

  if ( // Pick a value on axis when initializing.
  value == null // If both `handle` and `dataZoom` are used, value may be out of axis extent,
  // where we should re-pick a value to keep `handle` displaying normally.
  || value > extent[1]) {
    // Make handle displayed on the end of the axis when init, which looks better.
    value = extent[1];
  }

  if (value < extent[0]) {
    value = extent[0];
  }

  option.value = value;

  if (useHandle) {
    option.status = axisInfo.axis.scale.isBlank() ? 'hide' : 'show';
  }
}
function getAxisInfo(axisModel) {
  var coordSysAxesInfo = (axisModel.ecModel.getComponent('axisPointer') || {}).coordSysAxesInfo;
  return coordSysAxesInfo && coordSysAxesInfo.axesInfo[makeKey(axisModel)];
}
function getAxisPointerModel(axisModel) {
  var axisInfo = getAxisInfo(axisModel);
  return axisInfo && axisInfo.axisPointerModel;
}

function isHandleTrigger(axisPointerModel) {
  return !!axisPointerModel.get(['handle', 'show']);
}
/**
 * @param {module:echarts/model/Model} model
 * @return {string} unique key
 */


function makeKey(model) {
  return model.type + '||' + model.id;
}

var axisPointerClazz = {};
/**
 * Base class of AxisView.
 */

var AxisView =
/** @class */
function (_super) {
  __extends(AxisView, _super);

  function AxisView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = AxisView.type;
    return _this;
  }
  /**
   * @override
   */


  AxisView.prototype.render = function (axisModel, ecModel, api, payload) {
    // FIXME
    // This process should proformed after coordinate systems updated
    // (axis scale updated), and should be performed each time update.
    // So put it here temporarily, although it is not appropriate to
    // put a model-writing procedure in `view`.
    this.axisPointerClass && fixValue(axisModel);

    _super.prototype.render.apply(this, arguments);

    this._doUpdateAxisPointerClass(axisModel, api, true);
  };
  /**
   * Action handler.
   */


  AxisView.prototype.updateAxisPointer = function (axisModel, ecModel, api, payload) {
    this._doUpdateAxisPointerClass(axisModel, api, false);
  };
  /**
   * @override
   */


  AxisView.prototype.remove = function (ecModel, api) {
    var axisPointer = this._axisPointer;
    axisPointer && axisPointer.remove(api);
  };
  /**
   * @override
   */


  AxisView.prototype.dispose = function (ecModel, api) {
    this._disposeAxisPointer(api);

    _super.prototype.dispose.apply(this, arguments);
  };

  AxisView.prototype._doUpdateAxisPointerClass = function (axisModel, api, forceRender) {
    var Clazz = AxisView.getAxisPointerClass(this.axisPointerClass);

    if (!Clazz) {
      return;
    }

    var axisPointerModel = getAxisPointerModel(axisModel);
    axisPointerModel ? (this._axisPointer || (this._axisPointer = new Clazz())).render(axisModel, axisPointerModel, api, forceRender) : this._disposeAxisPointer(api);
  };

  AxisView.prototype._disposeAxisPointer = function (api) {
    this._axisPointer && this._axisPointer.dispose(api);
    this._axisPointer = null;
  };

  AxisView.registerAxisPointerClass = function (type, clazz) {

    axisPointerClazz[type] = clazz;
  };

  AxisView.getAxisPointerClass = function (type) {
    return type && axisPointerClazz[type];
  };
  AxisView.type = 'axis';
  return AxisView;
}(ComponentView);

var inner = makeInner();
function rectCoordAxisBuildSplitArea(axisView, axisGroup, axisModel, gridModel) {
  var axis = axisModel.axis;

  if (axis.scale.isBlank()) {
    return;
  } // TODO: TYPE


  var splitAreaModel = axisModel.getModel('splitArea');
  var areaStyleModel = splitAreaModel.getModel('areaStyle');
  var areaColors = areaStyleModel.get('color');
  var gridRect = gridModel.coordinateSystem.getRect();
  var ticksCoords = axis.getTicksCoords({
    tickModel: splitAreaModel,
    clamp: true
  });

  if (!ticksCoords.length) {
    return;
  } // For Making appropriate splitArea animation, the color and anid
  // should be corresponding to previous one if possible.


  var areaColorsLen = areaColors.length;
  var lastSplitAreaColors = inner(axisView).splitAreaColors;
  var newSplitAreaColors = createHashMap();
  var colorIndex = 0;

  if (lastSplitAreaColors) {
    for (var i = 0; i < ticksCoords.length; i++) {
      var cIndex = lastSplitAreaColors.get(ticksCoords[i].tickValue);

      if (cIndex != null) {
        colorIndex = (cIndex + (areaColorsLen - 1) * i) % areaColorsLen;
        break;
      }
    }
  }

  var prev = axis.toGlobalCoord(ticksCoords[0].coord);
  var areaStyle = areaStyleModel.getAreaStyle();
  areaColors = isArray(areaColors) ? areaColors : [areaColors];

  for (var i = 1; i < ticksCoords.length; i++) {
    var tickCoord = axis.toGlobalCoord(ticksCoords[i].coord);
    var x = void 0;
    var y = void 0;
    var width = void 0;
    var height = void 0;

    if (axis.isHorizontal()) {
      x = prev;
      y = gridRect.y;
      width = tickCoord - x;
      height = gridRect.height;
      prev = x + width;
    } else {
      x = gridRect.x;
      y = prev;
      width = gridRect.width;
      height = tickCoord - y;
      prev = y + height;
    }

    var tickValue = ticksCoords[i - 1].tickValue;
    tickValue != null && newSplitAreaColors.set(tickValue, colorIndex);
    axisGroup.add(new Rect({
      anid: tickValue != null ? 'area_' + tickValue : null,
      shape: {
        x: x,
        y: y,
        width: width,
        height: height
      },
      style: defaults({
        fill: areaColors[colorIndex]
      }, areaStyle),
      autoBatch: true,
      silent: true
    }));
    colorIndex = (colorIndex + 1) % areaColorsLen;
  }

  inner(axisView).splitAreaColors = newSplitAreaColors;
}
function rectCoordAxisHandleRemove(axisView) {
  inner(axisView).splitAreaColors = null;
}

var axisBuilderAttrs = ['axisLine', 'axisTickLabel', 'axisName'];
var selfBuilderAttrs = ['splitArea', 'splitLine', 'minorSplitLine'];

var CartesianAxisView =
/** @class */
function (_super) {
  __extends(CartesianAxisView, _super);

  function CartesianAxisView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = CartesianAxisView.type;
    _this.axisPointerClass = 'CartesianAxisPointer';
    return _this;
  }
  /**
   * @override
   */


  CartesianAxisView.prototype.render = function (axisModel, ecModel, api, payload) {
    this.group.removeAll();
    var oldAxisGroup = this._axisGroup;
    this._axisGroup = new Group();
    this.group.add(this._axisGroup);

    if (!axisModel.get('show')) {
      return;
    }

    var gridModel = axisModel.getCoordSysModel();
    var layout$1 = layout(gridModel, axisModel);
    var axisBuilder = new AxisBuilder(axisModel, extend({
      handleAutoShown: function (elementType) {
        var cartesians = gridModel.coordinateSystem.getCartesians();

        for (var i = 0; i < cartesians.length; i++) {
          var otherAxisType = cartesians[i].getOtherAxis(axisModel.axis).type;

          if (otherAxisType === 'value' || otherAxisType === 'log') {
            // Still show axis tick or axisLine if other axis is value / log
            return true;
          }
        } // Not show axisTick or axisLine if other axis is category / time


        return false;
      }
    }, layout$1));
    each$2(axisBuilderAttrs, axisBuilder.add, axisBuilder);

    this._axisGroup.add(axisBuilder.getGroup());

    each$2(selfBuilderAttrs, function (name) {
      if (axisModel.get([name, 'show'])) {
        axisElementBuilders[name](this, this._axisGroup, axisModel, gridModel);
      }
    }, this);
    groupTransition(oldAxisGroup, this._axisGroup, axisModel);

    _super.prototype.render.call(this, axisModel, ecModel, api, payload);
  };

  CartesianAxisView.prototype.remove = function () {
    rectCoordAxisHandleRemove(this);
  };

  CartesianAxisView.type = 'cartesianAxis';
  return CartesianAxisView;
}(AxisView);

var axisElementBuilders = {
  splitLine: function (axisView, axisGroup, axisModel, gridModel) {
    var axis = axisModel.axis;

    if (axis.scale.isBlank()) {
      return;
    }

    var splitLineModel = axisModel.getModel('splitLine');
    var lineStyleModel = splitLineModel.getModel('lineStyle');
    var lineColors = lineStyleModel.get('color');
    lineColors = isArray(lineColors) ? lineColors : [lineColors];
    var gridRect = gridModel.coordinateSystem.getRect();
    var isHorizontal = axis.isHorizontal();
    var lineCount = 0;
    var ticksCoords = axis.getTicksCoords({
      tickModel: splitLineModel
    });
    var p1 = [];
    var p2 = [];
    var lineStyle = lineStyleModel.getLineStyle();

    for (var i = 0; i < ticksCoords.length; i++) {
      var tickCoord = axis.toGlobalCoord(ticksCoords[i].coord);

      if (isHorizontal) {
        p1[0] = tickCoord;
        p1[1] = gridRect.y;
        p2[0] = tickCoord;
        p2[1] = gridRect.y + gridRect.height;
      } else {
        p1[0] = gridRect.x;
        p1[1] = tickCoord;
        p2[0] = gridRect.x + gridRect.width;
        p2[1] = tickCoord;
      }

      var colorIndex = lineCount++ % lineColors.length;
      var tickValue = ticksCoords[i].tickValue;
      axisGroup.add(new Line({
        anid: tickValue != null ? 'line_' + ticksCoords[i].tickValue : null,
        subPixelOptimize: true,
        autoBatch: true,
        shape: {
          x1: p1[0],
          y1: p1[1],
          x2: p2[0],
          y2: p2[1]
        },
        style: defaults({
          stroke: lineColors[colorIndex]
        }, lineStyle),
        silent: true
      }));
    }
  },
  minorSplitLine: function (axisView, axisGroup, axisModel, gridModel) {
    var axis = axisModel.axis;
    var minorSplitLineModel = axisModel.getModel('minorSplitLine');
    var lineStyleModel = minorSplitLineModel.getModel('lineStyle');
    var gridRect = gridModel.coordinateSystem.getRect();
    var isHorizontal = axis.isHorizontal();
    var minorTicksCoords = axis.getMinorTicksCoords();

    if (!minorTicksCoords.length) {
      return;
    }

    var p1 = [];
    var p2 = [];
    var lineStyle = lineStyleModel.getLineStyle();

    for (var i = 0; i < minorTicksCoords.length; i++) {
      for (var k = 0; k < minorTicksCoords[i].length; k++) {
        var tickCoord = axis.toGlobalCoord(minorTicksCoords[i][k].coord);

        if (isHorizontal) {
          p1[0] = tickCoord;
          p1[1] = gridRect.y;
          p2[0] = tickCoord;
          p2[1] = gridRect.y + gridRect.height;
        } else {
          p1[0] = gridRect.x;
          p1[1] = tickCoord;
          p2[0] = gridRect.x + gridRect.width;
          p2[1] = tickCoord;
        }

        axisGroup.add(new Line({
          anid: 'minor_line_' + minorTicksCoords[i][k].tickValue,
          subPixelOptimize: true,
          autoBatch: true,
          shape: {
            x1: p1[0],
            y1: p1[1],
            x2: p2[0],
            y2: p2[1]
          },
          style: lineStyle,
          silent: true
        }));
      }
    }
  },
  splitArea: function (axisView, axisGroup, axisModel, gridModel) {
    rectCoordAxisBuildSplitArea(axisView, axisGroup, axisModel, gridModel);
  }
};

var CartesianXAxisView =
/** @class */
function (_super) {
  __extends(CartesianXAxisView, _super);

  function CartesianXAxisView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = CartesianXAxisView.type;
    return _this;
  }

  CartesianXAxisView.type = 'xAxis';
  return CartesianXAxisView;
}(CartesianAxisView);

var CartesianYAxisView =
/** @class */
function (_super) {
  __extends(CartesianYAxisView, _super);

  function CartesianYAxisView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = CartesianXAxisView.type;
    return _this;
  }

  CartesianYAxisView.type = 'yAxis';
  return CartesianYAxisView;
}(CartesianAxisView);

var GridView =
/** @class */
function (_super) {
  __extends(GridView, _super);

  function GridView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = 'grid';
    return _this;
  }

  GridView.prototype.render = function (gridModel, ecModel) {
    this.group.removeAll();

    if (gridModel.get('show')) {
      this.group.add(new Rect({
        shape: gridModel.coordinateSystem.getRect(),
        style: defaults({
          fill: gridModel.get('backgroundColor')
        }, gridModel.getItemStyle()),
        silent: true,
        z2: -1
      }));
    }
  };

  GridView.type = 'grid';
  return GridView;
}(ComponentView);

var extraOption = {
  // gridIndex: 0,
  // gridId: '',
  offset: 0
};
function install(registers) {
  registers.registerComponentView(GridView);
  registers.registerComponentModel(GridModel);
  registers.registerCoordinateSystem('cartesian2d', Grid);
  axisModelCreator(registers, 'x', CartesianAxisModel, extraOption);
  axisModelCreator(registers, 'y', CartesianAxisModel, extraOption);
  registers.registerComponentView(CartesianXAxisView);
  registers.registerComponentView(CartesianYAxisView);
  registers.registerPreprocessor(function (option) {
    // Only create grid when need
    if (option.xAxis && option.yAxis && !option.grid) {
      option.grid = {};
    }
  });
}

var inner$1 = makeInner();
var clone = clone$1;
var bind = bind$2;
/**
 * Base axis pointer class in 2D.
 */

var BaseAxisPointer =
/** @class */
function () {
  function BaseAxisPointer() {
    this._dragging = false;
    /**
     * In px, arbitrary value. Do not set too small,
     * no animation is ok for most cases.
     */

    this.animationThreshold = 15;
  }
  /**
   * @implement
   */


  BaseAxisPointer.prototype.render = function (axisModel, axisPointerModel, api, forceRender) {
    var value = axisPointerModel.get('value');
    var status = axisPointerModel.get('status'); // Bind them to `this`, not in closure, otherwise they will not
    // be replaced when user calling setOption in not merge mode.

    this._axisModel = axisModel;
    this._axisPointerModel = axisPointerModel;
    this._api = api; // Optimize: `render` will be called repeatly during mouse move.
    // So it is power consuming if performing `render` each time,
    // especially on mobile device.

    if (!forceRender && this._lastValue === value && this._lastStatus === status) {
      return;
    }

    this._lastValue = value;
    this._lastStatus = status;
    var group = this._group;
    var handle = this._handle;

    if (!status || status === 'hide') {
      // Do not clear here, for animation better.
      group && group.hide();
      handle && handle.hide();
      return;
    }

    group && group.show();
    handle && handle.show(); // Otherwise status is 'show'

    var elOption = {};
    this.makeElOption(elOption, value, axisModel, axisPointerModel, api); // Enable change axis pointer type.

    var graphicKey = elOption.graphicKey;

    if (graphicKey !== this._lastGraphicKey) {
      this.clear(api);
    }

    this._lastGraphicKey = graphicKey;
    var moveAnimation = this._moveAnimation = this.determineAnimation(axisModel, axisPointerModel);

    if (!group) {
      group = this._group = new Group();
      this.createPointerEl(group, elOption, axisModel, axisPointerModel);
      this.createLabelEl(group, elOption, axisModel, axisPointerModel);
      api.getZr().add(group);
    } else {
      var doUpdateProps = curry(updateProps, axisPointerModel, moveAnimation);
      this.updatePointerEl(group, elOption, doUpdateProps);
      this.updateLabelEl(group, elOption, doUpdateProps, axisPointerModel);
    }

    updateMandatoryProps(group, axisPointerModel, true);

    this._renderHandle(value);
  };
  /**
   * @implement
   */


  BaseAxisPointer.prototype.remove = function (api) {
    this.clear(api);
  };
  /**
   * @implement
   */


  BaseAxisPointer.prototype.dispose = function (api) {
    this.clear(api);
  };
  /**
   * @protected
   */


  BaseAxisPointer.prototype.determineAnimation = function (axisModel, axisPointerModel) {
    var animation = axisPointerModel.get('animation');
    var axis = axisModel.axis;
    var isCategoryAxis = axis.type === 'category';
    var useSnap = axisPointerModel.get('snap'); // Value axis without snap always do not snap.

    if (!useSnap && !isCategoryAxis) {
      return false;
    }

    if (animation === 'auto' || animation == null) {
      var animationThreshold = this.animationThreshold;

      if (isCategoryAxis && axis.getBandWidth() > animationThreshold) {
        return true;
      } // It is important to auto animation when snap used. Consider if there is
      // a dataZoom, animation will be disabled when too many points exist, while
      // it will be enabled for better visual effect when little points exist.


      if (useSnap) {
        var seriesDataCount = getAxisInfo(axisModel).seriesDataCount;
        var axisExtent = axis.getExtent(); // Approximate band width

        return Math.abs(axisExtent[0] - axisExtent[1]) / seriesDataCount > animationThreshold;
      }

      return false;
    }

    return animation === true;
  };
  /**
   * add {pointer, label, graphicKey} to elOption
   * @protected
   */


  BaseAxisPointer.prototype.makeElOption = function (elOption, value, axisModel, axisPointerModel, api) {// Shoule be implemenented by sub-class.
  };
  /**
   * @protected
   */


  BaseAxisPointer.prototype.createPointerEl = function (group, elOption, axisModel, axisPointerModel) {
    var pointerOption = elOption.pointer;

    if (pointerOption) {
      var pointerEl = inner$1(group).pointerEl = new graphic[pointerOption.type](clone(elOption.pointer));
      group.add(pointerEl);
    }
  };
  /**
   * @protected
   */


  BaseAxisPointer.prototype.createLabelEl = function (group, elOption, axisModel, axisPointerModel) {
    if (elOption.label) {
      var labelEl = inner$1(group).labelEl = new ZRText(clone(elOption.label));
      group.add(labelEl);
      updateLabelShowHide(labelEl, axisPointerModel);
    }
  };
  /**
   * @protected
   */


  BaseAxisPointer.prototype.updatePointerEl = function (group, elOption, updateProps) {
    var pointerEl = inner$1(group).pointerEl;

    if (pointerEl && elOption.pointer) {
      pointerEl.setStyle(elOption.pointer.style);
      updateProps(pointerEl, {
        shape: elOption.pointer.shape
      });
    }
  };
  /**
   * @protected
   */


  BaseAxisPointer.prototype.updateLabelEl = function (group, elOption, updateProps, axisPointerModel) {
    var labelEl = inner$1(group).labelEl;

    if (labelEl) {
      labelEl.setStyle(elOption.label.style);
      updateProps(labelEl, {
        // Consider text length change in vertical axis, animation should
        // be used on shape, otherwise the effect will be weird.
        // TODOTODO
        // shape: elOption.label.shape,
        x: elOption.label.x,
        y: elOption.label.y
      });
      updateLabelShowHide(labelEl, axisPointerModel);
    }
  };
  /**
   * @private
   */


  BaseAxisPointer.prototype._renderHandle = function (value) {
    if (this._dragging || !this.updateHandleTransform) {
      return;
    }

    var axisPointerModel = this._axisPointerModel;

    var zr = this._api.getZr();

    var handle = this._handle;
    var handleModel = axisPointerModel.getModel('handle');
    var status = axisPointerModel.get('status');

    if (!handleModel.get('show') || !status || status === 'hide') {
      handle && zr.remove(handle);
      this._handle = null;
      return;
    }

    var isInit;

    if (!this._handle) {
      isInit = true;
      handle = this._handle = createIcon(handleModel.get('icon'), {
        cursor: 'move',
        draggable: true,
        onmousemove: function (e) {
          // Fot mobile devicem, prevent screen slider on the button.
          stop(e.event);
        },
        onmousedown: bind(this._onHandleDragMove, this, 0, 0),
        drift: bind(this._onHandleDragMove, this),
        ondragend: bind(this._onHandleDragEnd, this)
      });
      zr.add(handle);
    }

    updateMandatoryProps(handle, axisPointerModel, false); // update style

    handle.setStyle(handleModel.getItemStyle(null, ['color', 'borderColor', 'borderWidth', 'opacity', 'shadowColor', 'shadowBlur', 'shadowOffsetX', 'shadowOffsetY'])); // update position

    var handleSize = handleModel.get('size');

    if (!isArray(handleSize)) {
      handleSize = [handleSize, handleSize];
    }

    handle.scaleX = handleSize[0] / 2;
    handle.scaleY = handleSize[1] / 2;
    createOrUpdate(this, '_doDispatchAxisPointer', handleModel.get('throttle') || 0, 'fixRate');

    this._moveHandleToValue(value, isInit);
  };

  BaseAxisPointer.prototype._moveHandleToValue = function (value, isInit) {
    updateProps(this._axisPointerModel, !isInit && this._moveAnimation, this._handle, getHandleTransProps(this.getHandleTransform(value, this._axisModel, this._axisPointerModel)));
  };

  BaseAxisPointer.prototype._onHandleDragMove = function (dx, dy) {
    var handle = this._handle;

    if (!handle) {
      return;
    }

    this._dragging = true; // Persistent for throttle.

    var trans = this.updateHandleTransform(getHandleTransProps(handle), [dx, dy], this._axisModel, this._axisPointerModel);
    this._payloadInfo = trans;
    handle.stopAnimation();
    handle.attr(getHandleTransProps(trans));
    inner$1(handle).lastProp = null;

    this._doDispatchAxisPointer();
  };
  /**
   * Throttled method.
   */


  BaseAxisPointer.prototype._doDispatchAxisPointer = function () {
    var handle = this._handle;

    if (!handle) {
      return;
    }

    var payloadInfo = this._payloadInfo;
    var axisModel = this._axisModel;

    this._api.dispatchAction({
      type: 'updateAxisPointer',
      x: payloadInfo.cursorPoint[0],
      y: payloadInfo.cursorPoint[1],
      tooltipOption: payloadInfo.tooltipOption,
      axesInfo: [{
        axisDim: axisModel.axis.dim,
        axisIndex: axisModel.componentIndex
      }]
    });
  };

  BaseAxisPointer.prototype._onHandleDragEnd = function () {
    this._dragging = false;
    var handle = this._handle;

    if (!handle) {
      return;
    }

    var value = this._axisPointerModel.get('value'); // Consider snap or categroy axis, handle may be not consistent with
    // axisPointer. So move handle to align the exact value position when
    // drag ended.


    this._moveHandleToValue(value); // For the effect: tooltip will be shown when finger holding on handle
    // button, and will be hidden after finger left handle button.


    this._api.dispatchAction({
      type: 'hideTip'
    });
  };
  /**
   * @private
   */


  BaseAxisPointer.prototype.clear = function (api) {
    this._lastValue = null;
    this._lastStatus = null;
    var zr = api.getZr();
    var group = this._group;
    var handle = this._handle;

    if (zr && group) {
      this._lastGraphicKey = null;
      group && zr.remove(group);
      handle && zr.remove(handle);
      this._group = null;
      this._handle = null;
      this._payloadInfo = null;
    }
  };
  /**
   * @protected
   */


  BaseAxisPointer.prototype.doClear = function () {// Implemented by sub-class if necessary.
  };

  BaseAxisPointer.prototype.buildLabel = function (xy, wh, xDimIndex) {
    xDimIndex = xDimIndex || 0;
    return {
      x: xy[xDimIndex],
      y: xy[1 - xDimIndex],
      width: wh[xDimIndex],
      height: wh[1 - xDimIndex]
    };
  };

  return BaseAxisPointer;
}();

function updateProps(animationModel, moveAnimation, el, props) {
  // Animation optimize.
  if (!propsEqual(inner$1(el).lastProp, props)) {
    inner$1(el).lastProp = props;
    moveAnimation ? updateProps$1(el, props, animationModel) : (el.stopAnimation(), el.attr(props));
  }
}

function propsEqual(lastProps, newProps) {
  if (isObject(lastProps) && isObject(newProps)) {
    var equals_1 = true;
    each$2(newProps, function (item, key) {
      equals_1 = equals_1 && propsEqual(lastProps[key], item);
    });
    return !!equals_1;
  } else {
    return lastProps === newProps;
  }
}

function updateLabelShowHide(labelEl, axisPointerModel) {
  labelEl[axisPointerModel.get(['label', 'show']) ? 'show' : 'hide']();
}

function getHandleTransProps(trans) {
  return {
    x: trans.x || 0,
    y: trans.y || 0,
    rotation: trans.rotation || 0
  };
}

function updateMandatoryProps(group, axisPointerModel, silent) {
  var z = axisPointerModel.get('z');
  var zlevel = axisPointerModel.get('zlevel');
  group && group.traverse(function (el) {
    if (el.type !== 'group') {
      z != null && (el.z = z);
      zlevel != null && (el.zlevel = zlevel);
      el.silent = silent;
    }
  });
}

function buildElStyle(axisPointerModel) {
  var axisPointerType = axisPointerModel.get('type');
  var styleModel = axisPointerModel.getModel(axisPointerType + 'Style');
  var style;

  if (axisPointerType === 'line') {
    style = styleModel.getLineStyle();
    style.fill = null;
  } else if (axisPointerType === 'shadow') {
    style = styleModel.getAreaStyle();
    style.stroke = null;
  }

  return style;
}
/**
 * @param {Function} labelPos {align, verticalAlign, position}
 */

function buildLabelElOption(elOption, axisModel, axisPointerModel, api, labelPos) {
  var value = axisPointerModel.get('value');
  var text = getValueLabel(value, axisModel.axis, axisModel.ecModel, axisPointerModel.get('seriesDataIndices'), {
    precision: axisPointerModel.get(['label', 'precision']),
    formatter: axisPointerModel.get(['label', 'formatter'])
  });
  var labelModel = axisPointerModel.getModel('label');
  var paddings = normalizeCssArray(labelModel.get('padding') || 0);
  var font = labelModel.getFont();
  var textRect = getBoundingRect(text, font);
  var position = labelPos.position;
  var width = textRect.width + paddings[1] + paddings[3];
  var height = textRect.height + paddings[0] + paddings[2]; // Adjust by align.

  var align = labelPos.align;
  align === 'right' && (position[0] -= width);
  align === 'center' && (position[0] -= width / 2);
  var verticalAlign = labelPos.verticalAlign;
  verticalAlign === 'bottom' && (position[1] -= height);
  verticalAlign === 'middle' && (position[1] -= height / 2); // Not overflow ec container

  confineInContainer(position, width, height, api);
  var bgColor = labelModel.get('backgroundColor');

  if (!bgColor || bgColor === 'auto') {
    bgColor = axisModel.get(['axisLine', 'lineStyle', 'color']);
  }

  elOption.label = {
    // shape: {x: 0, y: 0, width: width, height: height, r: labelModel.get('borderRadius')},
    x: position[0],
    y: position[1],
    style: createTextStyle(labelModel, {
      text: text,
      font: font,
      fill: labelModel.getTextColor(),
      padding: paddings,
      backgroundColor: bgColor
    }),
    // Lable should be over axisPointer.
    z2: 10
  };
} // Do not overflow ec container

function confineInContainer(position, width, height, api) {
  var viewWidth = api.getWidth();
  var viewHeight = api.getHeight();
  position[0] = Math.min(position[0] + width, viewWidth) - width;
  position[1] = Math.min(position[1] + height, viewHeight) - height;
  position[0] = Math.max(position[0], 0);
  position[1] = Math.max(position[1], 0);
}

function getValueLabel(value, axis, ecModel, seriesDataIndices, opt) {
  value = axis.scale.parse(value);
  var text = axis.scale.getLabel({
    value: value
  }, {
    // If `precision` is set, width can be fixed (like '12.00500'), which
    // helps to debounce when when moving label.
    precision: opt.precision
  });
  var formatter = opt.formatter;

  if (formatter) {
    var params_1 = {
      value: getAxisRawValue(axis, {
        value: value
      }),
      axisDimension: axis.dim,
      axisIndex: axis.index,
      seriesData: []
    };
    each$2(seriesDataIndices, function (idxItem) {
      var series = ecModel.getSeriesByIndex(idxItem.seriesIndex);
      var dataIndex = idxItem.dataIndexInside;
      var dataParams = series && series.getDataParams(dataIndex);
      dataParams && params_1.seriesData.push(dataParams);
    });

    if (isString(formatter)) {
      text = formatter.replace('{value}', text);
    } else if (isFunction(formatter)) {
      text = formatter(params_1);
    }
  }

  return text;
}
function getTransformedPosition(axis, value, layoutInfo) {
  var transform = create();
  rotate(transform, transform, layoutInfo.rotation);
  translate(transform, transform, layoutInfo.position);
  return applyTransform$1([axis.dataToCoord(value), (layoutInfo.labelOffset || 0) + (layoutInfo.labelDirection || 1) * (layoutInfo.labelMargin || 0)], transform);
}
function buildCartesianSingleLabelElOption(value, elOption, layoutInfo, axisModel, axisPointerModel, api) {
  // @ts-ignore
  var textLayout = AxisBuilder.innerTextLayout(layoutInfo.rotation, 0, layoutInfo.labelDirection);
  layoutInfo.labelMargin = axisPointerModel.get(['label', 'margin']);
  buildLabelElOption(elOption, axisModel, axisPointerModel, api, {
    position: getTransformedPosition(axisModel.axis, value, layoutInfo),
    align: textLayout.textAlign,
    verticalAlign: textLayout.textVerticalAlign
  });
}
function makeLineShape(p1, p2, xDimIndex) {
  xDimIndex = xDimIndex || 0;
  return {
    x1: p1[xDimIndex],
    y1: p1[1 - xDimIndex],
    x2: p2[xDimIndex],
    y2: p2[1 - xDimIndex]
  };
}
function makeRectShape(xy, wh, xDimIndex) {
  xDimIndex = xDimIndex || 0;
  return {
    x: xy[xDimIndex],
    y: xy[1 - xDimIndex],
    width: wh[xDimIndex],
    height: wh[1 - xDimIndex]
  };
}
function makeSectorShape(cx, cy, r0, r, startAngle, endAngle) {
  return {
    cx: cx,
    cy: cy,
    r0: r0,
    r: r,
    startAngle: startAngle,
    endAngle: endAngle,
    clockwise: true
  };
}

var CartesianAxisPointer =
/** @class */
function (_super) {
  __extends(CartesianAxisPointer, _super);

  function CartesianAxisPointer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * @override
   */


  CartesianAxisPointer.prototype.makeElOption = function (elOption, value, axisModel, axisPointerModel, api) {
    var axis = axisModel.axis;
    var grid = axis.grid;
    var axisPointerType = axisPointerModel.get('type');
    var otherExtent = getCartesian(grid, axis).getOtherAxis(axis).getGlobalExtent();
    var pixelValue = axis.toGlobalCoord(axis.dataToCoord(value, true));

    if (axisPointerType && axisPointerType !== 'none') {
      var elStyle = buildElStyle(axisPointerModel);
      var pointerOption = pointerShapeBuilder[axisPointerType](axis, pixelValue, otherExtent);
      pointerOption.style = elStyle;
      elOption.graphicKey = pointerOption.type;
      elOption.pointer = pointerOption;
    }

    var layoutInfo = layout(grid.model, axisModel);
    buildCartesianSingleLabelElOption( // @ts-ignore
    value, elOption, layoutInfo, axisModel, axisPointerModel, api);
  };
  /**
   * @override
   */


  CartesianAxisPointer.prototype.getHandleTransform = function (value, axisModel, axisPointerModel) {
    var layoutInfo = layout(axisModel.axis.grid.model, axisModel, {
      labelInside: false
    }); // @ts-ignore

    layoutInfo.labelMargin = axisPointerModel.get(['handle', 'margin']);
    var pos = getTransformedPosition(axisModel.axis, value, layoutInfo);
    return {
      x: pos[0],
      y: pos[1],
      rotation: layoutInfo.rotation + (layoutInfo.labelDirection < 0 ? Math.PI : 0)
    };
  };
  /**
   * @override
   */


  CartesianAxisPointer.prototype.updateHandleTransform = function (transform, delta, axisModel, axisPointerModel) {
    var axis = axisModel.axis;
    var grid = axis.grid;
    var axisExtent = axis.getGlobalExtent(true);
    var otherExtent = getCartesian(grid, axis).getOtherAxis(axis).getGlobalExtent();
    var dimIndex = axis.dim === 'x' ? 0 : 1;
    var currPosition = [transform.x, transform.y];
    currPosition[dimIndex] += delta[dimIndex];
    currPosition[dimIndex] = Math.min(axisExtent[1], currPosition[dimIndex]);
    currPosition[dimIndex] = Math.max(axisExtent[0], currPosition[dimIndex]);
    var cursorOtherValue = (otherExtent[1] + otherExtent[0]) / 2;
    var cursorPoint = [cursorOtherValue, cursorOtherValue];
    cursorPoint[dimIndex] = currPosition[dimIndex]; // Make tooltip do not overlap axisPointer and in the middle of the grid.

    var tooltipOptions = [{
      verticalAlign: 'middle'
    }, {
      align: 'center'
    }];
    return {
      x: currPosition[0],
      y: currPosition[1],
      rotation: transform.rotation,
      cursorPoint: cursorPoint,
      tooltipOption: tooltipOptions[dimIndex]
    };
  };

  return CartesianAxisPointer;
}(BaseAxisPointer);

function getCartesian(grid, axis) {
  var opt = {};
  opt[axis.dim + 'AxisIndex'] = axis.index;
  return grid.getCartesian(opt);
}

var pointerShapeBuilder = {
  line: function (axis, pixelValue, otherExtent) {
    var targetShape = makeLineShape([pixelValue, otherExtent[0]], [pixelValue, otherExtent[1]], getAxisDimIndex(axis));
    return {
      type: 'Line',
      subPixelOptimize: true,
      shape: targetShape
    };
  },
  shadow: function (axis, pixelValue, otherExtent) {
    var bandWidth = Math.max(1, axis.getBandWidth());
    var span = otherExtent[1] - otherExtent[0];
    return {
      type: 'Rect',
      shape: makeRectShape([pixelValue - bandWidth / 2, otherExtent[0]], [bandWidth, span], getAxisDimIndex(axis))
    };
  }
};

function getAxisDimIndex(axis) {
  return axis.dim === 'x' ? 0 : 1;
}

var AxisPointerModel =
/** @class */
function (_super) {
  __extends(AxisPointerModel, _super);

  function AxisPointerModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = AxisPointerModel.type;
    return _this;
  }

  AxisPointerModel.type = 'axisPointer';
  AxisPointerModel.defaultOption = {
    // 'auto' means that show when triggered by tooltip or handle.
    show: 'auto',
    zlevel: 0,
    z: 50,
    type: 'line',
    // axispointer triggered by tootip determine snap automatically,
    // see `modelHelper`.
    snap: false,
    triggerTooltip: true,
    value: null,
    status: null,
    link: [],
    // Do not set 'auto' here, otherwise global animation: false
    // will not effect at this axispointer.
    animation: null,
    animationDurationUpdate: 200,
    lineStyle: {
      color: '#B9BEC9',
      width: 1,
      type: 'dashed'
    },
    shadowStyle: {
      color: 'rgba(210,219,238,0.2)'
    },
    label: {
      show: true,
      formatter: null,
      precision: 'auto',
      margin: 3,
      color: '#fff',
      padding: [5, 7, 5, 7],
      backgroundColor: 'auto',
      borderColor: null,
      borderWidth: 0,
      borderRadius: 3
    },
    handle: {
      show: false,
      // eslint-disable-next-line
      icon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z',
      size: 45,
      // handle margin is from symbol center to axis, which is stable when circular move.
      margin: 50,
      // color: '#1b8bbd'
      // color: '#2f4554'
      color: '#333',
      shadowBlur: 3,
      shadowColor: '#aaa',
      shadowOffsetX: 0,
      shadowOffsetY: 2,
      // For mobile performance
      throttle: 40
    }
  };
  return AxisPointerModel;
}(ComponentModel);

var inner$2 = makeInner();
var each = each$2;
/**
 * @param {string} key
 * @param {module:echarts/ExtensionAPI} api
 * @param {Function} handler
 *      param: {string} currTrigger
 *      param: {Array.<number>} point
 */

function register(key, api, handler) {
  if (env.node) {
    return;
  }

  var zr = api.getZr();
  inner$2(zr).records || (inner$2(zr).records = {});
  initGlobalListeners(zr, api);
  var record = inner$2(zr).records[key] || (inner$2(zr).records[key] = {});
  record.handler = handler;
}

function initGlobalListeners(zr, api) {
  if (inner$2(zr).initialized) {
    return;
  }

  inner$2(zr).initialized = true;
  useHandler('click', curry(doEnter, 'click'));
  useHandler('mousemove', curry(doEnter, 'mousemove')); // useHandler('mouseout', onLeave);

  useHandler('globalout', onLeave);

  function useHandler(eventType, cb) {
    zr.on(eventType, function (e) {
      var dis = makeDispatchAction(api);
      each(inner$2(zr).records, function (record) {
        record && cb(record, e, dis.dispatchAction);
      });
      dispatchTooltipFinally(dis.pendings, api);
    });
  }
}

function dispatchTooltipFinally(pendings, api) {
  var showLen = pendings.showTip.length;
  var hideLen = pendings.hideTip.length;
  var actuallyPayload;

  if (showLen) {
    actuallyPayload = pendings.showTip[showLen - 1];
  } else if (hideLen) {
    actuallyPayload = pendings.hideTip[hideLen - 1];
  }

  if (actuallyPayload) {
    actuallyPayload.dispatchAction = null;
    api.dispatchAction(actuallyPayload);
  }
}

function onLeave(record, e, dispatchAction) {
  record.handler('leave', null, dispatchAction);
}

function doEnter(currTrigger, record, e, dispatchAction) {
  record.handler(currTrigger, e, dispatchAction);
}

function makeDispatchAction(api) {
  var pendings = {
    showTip: [],
    hideTip: []
  }; // FIXME
  // better approach?
  // 'showTip' and 'hideTip' can be triggered by axisPointer and tooltip,
  // which may be conflict, (axisPointer call showTip but tooltip call hideTip);
  // So we have to add "final stage" to merge those dispatched actions.

  var dispatchAction = function (payload) {
    var pendingList = pendings[payload.type];

    if (pendingList) {
      pendingList.push(payload);
    } else {
      payload.dispatchAction = dispatchAction;
      api.dispatchAction(payload);
    }
  };

  return {
    dispatchAction: dispatchAction,
    pendings: pendings
  };
}

function unregister(key, api) {
  if (env.node) {
    return;
  }

  var zr = api.getZr();
  var record = (inner$2(zr).records || {})[key];

  if (record) {
    inner$2(zr).records[key] = null;
  }
}

var AxisPointerView =
/** @class */
function (_super) {
  __extends(AxisPointerView, _super);

  function AxisPointerView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = AxisPointerView.type;
    return _this;
  }

  AxisPointerView.prototype.render = function (globalAxisPointerModel, ecModel, api) {
    var globalTooltipModel = ecModel.getComponent('tooltip');
    var triggerOn = globalAxisPointerModel.get('triggerOn') || globalTooltipModel && globalTooltipModel.get('triggerOn') || 'mousemove|click'; // Register global listener in AxisPointerView to enable
    // AxisPointerView to be independent to Tooltip.

    register('axisPointer', api, function (currTrigger, e, dispatchAction) {
      // If 'none', it is not controlled by mouse totally.
      if (triggerOn !== 'none' && (currTrigger === 'leave' || triggerOn.indexOf(currTrigger) >= 0)) {
        dispatchAction({
          type: 'updateAxisPointer',
          currTrigger: currTrigger,
          x: e && e.offsetX,
          y: e && e.offsetY
        });
      }
    });
  };

  AxisPointerView.prototype.remove = function (ecModel, api) {
    unregister('axisPointer', api);
  };

  AxisPointerView.prototype.dispose = function (ecModel, api) {
    unregister('axisPointer', api);
  };

  AxisPointerView.type = 'axisPointer';
  return AxisPointerView;
}(ComponentView);

/**
 * @param finder contains {seriesIndex, dataIndex, dataIndexInside}
 * @param ecModel
 * @return  {point: [x, y], el: ...} point Will not be null.
 */

function findPointFromSeries(finder, ecModel) {
  var point = [];
  var seriesIndex = finder.seriesIndex;
  var seriesModel;

  if (seriesIndex == null || !(seriesModel = ecModel.getSeriesByIndex(seriesIndex))) {
    return {
      point: []
    };
  }

  var data = seriesModel.getData();
  var dataIndex = queryDataIndex(data, finder);

  if (dataIndex == null || dataIndex < 0 || isArray(dataIndex)) {
    return {
      point: []
    };
  }

  var el = data.getItemGraphicEl(dataIndex);
  var coordSys = seriesModel.coordinateSystem;

  if (seriesModel.getTooltipPosition) {
    point = seriesModel.getTooltipPosition(dataIndex) || [];
  } else if (coordSys && coordSys.dataToPoint) {
    if (finder.isStacked) {
      var baseAxis = coordSys.getBaseAxis();
      var valueAxis = coordSys.getOtherAxis(baseAxis);
      var valueAxisDim = valueAxis.dim;
      var baseAxisDim = baseAxis.dim;
      var baseDataOffset = valueAxisDim === 'x' || valueAxisDim === 'radius' ? 1 : 0;
      var baseDim = data.mapDimension(baseAxisDim);
      var stackedData = [];
      stackedData[baseDataOffset] = data.get(baseDim, dataIndex);
      stackedData[1 - baseDataOffset] = data.get(data.getCalculationInfo('stackResultDimension'), dataIndex);
      point = coordSys.dataToPoint(stackedData) || [];
    } else {
      point = coordSys.dataToPoint(data.getValues(map(coordSys.dimensions, function (dim) {
        return data.mapDimension(dim);
      }), dataIndex)) || [];
    }
  } else if (el) {
    // Use graphic bounding rect
    var rect = el.getBoundingRect().clone();
    rect.applyTransform(el.transform);
    point = [rect.x + rect.width / 2, rect.y + rect.height / 2];
  }

  return {
    point: point,
    el: el
  };
}

var inner$3 = makeInner();
/**
 * Basic logic: check all axis, if they do not demand show/highlight,
 * then hide/downplay them.
 *
 * @return content of event obj for echarts.connect.
 */

function axisTrigger(payload, ecModel, api) {
  var currTrigger = payload.currTrigger;
  var point = [payload.x, payload.y];
  var finder = payload;
  var dispatchAction = payload.dispatchAction || bind$2(api.dispatchAction, api);
  var coordSysAxesInfo = ecModel.getComponent('axisPointer').coordSysAxesInfo; // Pending
  // See #6121. But we are not able to reproduce it yet.

  if (!coordSysAxesInfo) {
    return;
  }

  if (illegalPoint(point)) {
    // Used in the default behavior of `connection`: use the sample seriesIndex
    // and dataIndex. And also used in the tooltipView trigger.
    point = findPointFromSeries({
      seriesIndex: finder.seriesIndex,
      // Do not use dataIndexInside from other ec instance.
      // FIXME: auto detect it?
      dataIndex: finder.dataIndex
    }, ecModel).point;
  }

  var isIllegalPoint = illegalPoint(point); // Axis and value can be specified when calling dispatchAction({type: 'updateAxisPointer'}).
  // Notice: In this case, it is difficult to get the `point` (which is necessary to show
  // tooltip, so if point is not given, we just use the point found by sample seriesIndex
  // and dataIndex.

  var inputAxesInfo = finder.axesInfo;
  var axesInfo = coordSysAxesInfo.axesInfo;
  var shouldHide = currTrigger === 'leave' || illegalPoint(point);
  var outputPayload = {};
  var showValueMap = {};
  var dataByCoordSys = {
    list: [],
    map: {}
  };
  var updaters = {
    showPointer: curry(showPointer, showValueMap),
    showTooltip: curry(showTooltip, dataByCoordSys)
  }; // Process for triggered axes.

  each$2(coordSysAxesInfo.coordSysMap, function (coordSys, coordSysKey) {
    // If a point given, it must be contained by the coordinate system.
    var coordSysContainsPoint = isIllegalPoint || coordSys.containPoint(point);
    each$2(coordSysAxesInfo.coordSysAxesInfo[coordSysKey], function (axisInfo, key) {
      var axis = axisInfo.axis;
      var inputAxisInfo = findInputAxisInfo(inputAxesInfo, axisInfo); // If no inputAxesInfo, no axis is restricted.

      if (!shouldHide && coordSysContainsPoint && (!inputAxesInfo || inputAxisInfo)) {
        var val = inputAxisInfo && inputAxisInfo.value;

        if (val == null && !isIllegalPoint) {
          val = axis.pointToData(point);
        }

        val != null && processOnAxis(axisInfo, val, updaters, false, outputPayload);
      }
    });
  }); // Process for linked axes.

  var linkTriggers = {};
  each$2(axesInfo, function (tarAxisInfo, tarKey) {
    var linkGroup = tarAxisInfo.linkGroup; // If axis has been triggered in the previous stage, it should not be triggered by link.

    if (linkGroup && !showValueMap[tarKey]) {
      each$2(linkGroup.axesInfo, function (srcAxisInfo, srcKey) {
        var srcValItem = showValueMap[srcKey]; // If srcValItem exist, source axis is triggered, so link to target axis.

        if (srcAxisInfo !== tarAxisInfo && srcValItem) {
          var val = srcValItem.value;
          linkGroup.mapper && (val = tarAxisInfo.axis.scale.parse(linkGroup.mapper(val, makeMapperParam(srcAxisInfo), makeMapperParam(tarAxisInfo))));
          linkTriggers[tarAxisInfo.key] = val;
        }
      });
    }
  });
  each$2(linkTriggers, function (val, tarKey) {
    processOnAxis(axesInfo[tarKey], val, updaters, true, outputPayload);
  });
  updateModelActually(showValueMap, axesInfo, outputPayload);
  dispatchTooltipActually(dataByCoordSys, point, payload, dispatchAction);
  dispatchHighDownActually(axesInfo, dispatchAction, api);
  return outputPayload;
}

function processOnAxis(axisInfo, newValue, updaters, noSnap, outputFinder) {
  var axis = axisInfo.axis;

  if (axis.scale.isBlank() || !axis.containData(newValue)) {
    return;
  }

  if (!axisInfo.involveSeries) {
    updaters.showPointer(axisInfo, newValue);
    return;
  } // Heavy calculation. So put it after axis.containData checking.


  var payloadInfo = buildPayloadsBySeries(newValue, axisInfo);
  var payloadBatch = payloadInfo.payloadBatch;
  var snapToValue = payloadInfo.snapToValue; // Fill content of event obj for echarts.connect.
  // By default use the first involved series data as a sample to connect.

  if (payloadBatch[0] && outputFinder.seriesIndex == null) {
    extend(outputFinder, payloadBatch[0]);
  } // If no linkSource input, this process is for collecting link
  // target, where snap should not be accepted.


  if (!noSnap && axisInfo.snap) {
    if (axis.containData(snapToValue) && snapToValue != null) {
      newValue = snapToValue;
    }
  }

  updaters.showPointer(axisInfo, newValue, payloadBatch); // Tooltip should always be snapToValue, otherwise there will be
  // incorrect "axis value ~ series value" mapping displayed in tooltip.

  updaters.showTooltip(axisInfo, payloadInfo, snapToValue);
}

function buildPayloadsBySeries(value, axisInfo) {
  var axis = axisInfo.axis;
  var dim = axis.dim;
  var snapToValue = value;
  var payloadBatch = [];
  var minDist = Number.MAX_VALUE;
  var minDiff = -1;
  each$2(axisInfo.seriesModels, function (series, idx) {
    var dataDim = series.getData().mapDimensionsAll(dim);
    var seriesNestestValue;
    var dataIndices;

    if (series.getAxisTooltipData) {
      var result = series.getAxisTooltipData(dataDim, value, axis);
      dataIndices = result.dataIndices;
      seriesNestestValue = result.nestestValue;
    } else {
      dataIndices = series.getData().indicesOfNearest(dataDim[0], value, // Add a threshold to avoid find the wrong dataIndex
      // when data length is not same.
      // false,
      axis.type === 'category' ? 0.5 : null);

      if (!dataIndices.length) {
        return;
      }

      seriesNestestValue = series.getData().get(dataDim[0], dataIndices[0]);
    }

    if (seriesNestestValue == null || !isFinite(seriesNestestValue)) {
      return;
    }

    var diff = value - seriesNestestValue;
    var dist = Math.abs(diff); // Consider category case

    if (dist <= minDist) {
      if (dist < minDist || diff >= 0 && minDiff < 0) {
        minDist = dist;
        minDiff = diff;
        snapToValue = seriesNestestValue;
        payloadBatch.length = 0;
      }

      each$2(dataIndices, function (dataIndex) {
        payloadBatch.push({
          seriesIndex: series.seriesIndex,
          dataIndexInside: dataIndex,
          dataIndex: series.getData().getRawIndex(dataIndex)
        });
      });
    }
  });
  return {
    payloadBatch: payloadBatch,
    snapToValue: snapToValue
  };
}

function showPointer(showValueMap, axisInfo, value, payloadBatch) {
  showValueMap[axisInfo.key] = {
    value: value,
    payloadBatch: payloadBatch
  };
}

function showTooltip(dataByCoordSys, axisInfo, payloadInfo, value) {
  var payloadBatch = payloadInfo.payloadBatch;
  var axis = axisInfo.axis;
  var axisModel = axis.model;
  var axisPointerModel = axisInfo.axisPointerModel; // If no data, do not create anything in dataByCoordSys,
  // whose length will be used to judge whether dispatch action.

  if (!axisInfo.triggerTooltip || !payloadBatch.length) {
    return;
  }

  var coordSysModel = axisInfo.coordSys.model;
  var coordSysKey = makeKey(coordSysModel);
  var coordSysItem = dataByCoordSys.map[coordSysKey];

  if (!coordSysItem) {
    coordSysItem = dataByCoordSys.map[coordSysKey] = {
      coordSysId: coordSysModel.id,
      coordSysIndex: coordSysModel.componentIndex,
      coordSysType: coordSysModel.type,
      coordSysMainType: coordSysModel.mainType,
      dataByAxis: []
    };
    dataByCoordSys.list.push(coordSysItem);
  }

  coordSysItem.dataByAxis.push({
    axisDim: axis.dim,
    axisIndex: axisModel.componentIndex,
    axisType: axisModel.type,
    axisId: axisModel.id,
    value: value,
    // Caustion: viewHelper.getValueLabel is actually on "view stage", which
    // depends that all models have been updated. So it should not be performed
    // here. Considering axisPointerModel used here is volatile, which is hard
    // to be retrieve in TooltipView, we prepare parameters here.
    valueLabelOpt: {
      precision: axisPointerModel.get(['label', 'precision']),
      formatter: axisPointerModel.get(['label', 'formatter'])
    },
    seriesDataIndices: payloadBatch.slice()
  });
}

function updateModelActually(showValueMap, axesInfo, outputPayload) {
  var outputAxesInfo = outputPayload.axesInfo = []; // Basic logic: If no 'show' required, 'hide' this axisPointer.

  each$2(axesInfo, function (axisInfo, key) {
    var option = axisInfo.axisPointerModel.option;
    var valItem = showValueMap[key];

    if (valItem) {
      !axisInfo.useHandle && (option.status = 'show');
      option.value = valItem.value; // For label formatter param and highlight.

      option.seriesDataIndices = (valItem.payloadBatch || []).slice();
    } // When always show (e.g., handle used), remain
    // original value and status.
    else {
        // If hide, value still need to be set, consider
        // click legend to toggle axis blank.
        !axisInfo.useHandle && (option.status = 'hide');
      } // If status is 'hide', should be no info in payload.


    option.status === 'show' && outputAxesInfo.push({
      axisDim: axisInfo.axis.dim,
      axisIndex: axisInfo.axis.model.componentIndex,
      value: option.value
    });
  });
}

function dispatchTooltipActually(dataByCoordSys, point, payload, dispatchAction) {
  // Basic logic: If no showTip required, hideTip will be dispatched.
  if (illegalPoint(point) || !dataByCoordSys.list.length) {
    dispatchAction({
      type: 'hideTip'
    });
    return;
  } // In most case only one axis (or event one series is used). It is
  // convinient to fetch payload.seriesIndex and payload.dataIndex
  // dirtectly. So put the first seriesIndex and dataIndex of the first
  // axis on the payload.


  var sampleItem = ((dataByCoordSys.list[0].dataByAxis[0] || {}).seriesDataIndices || [])[0] || {};
  dispatchAction({
    type: 'showTip',
    escapeConnect: true,
    x: point[0],
    y: point[1],
    tooltipOption: payload.tooltipOption,
    position: payload.position,
    dataIndexInside: sampleItem.dataIndexInside,
    dataIndex: sampleItem.dataIndex,
    seriesIndex: sampleItem.seriesIndex,
    dataByCoordSys: dataByCoordSys.list
  });
}

function dispatchHighDownActually(axesInfo, dispatchAction, api) {
  // FIXME
  // highlight status modification shoule be a stage of main process?
  // (Consider confilct (e.g., legend and axisPointer) and setOption)
  var zr = api.getZr();
  var highDownKey = 'axisPointerLastHighlights';
  var lastHighlights = inner$3(zr)[highDownKey] || {};
  var newHighlights = inner$3(zr)[highDownKey] = {}; // Update highlight/downplay status according to axisPointer model.
  // Build hash map and remove duplicate incidentally.

  each$2(axesInfo, function (axisInfo, key) {
    var option = axisInfo.axisPointerModel.option;
    option.status === 'show' && each$2(option.seriesDataIndices, function (batchItem) {
      var key = batchItem.seriesIndex + ' | ' + batchItem.dataIndex;
      newHighlights[key] = batchItem;
    });
  }); // Diff.

  var toHighlight = [];
  var toDownplay = [];
  each$2(lastHighlights, function (batchItem, key) {
    !newHighlights[key] && toDownplay.push(batchItem);
  });
  each$2(newHighlights, function (batchItem, key) {
    !lastHighlights[key] && toHighlight.push(batchItem);
  });
  toDownplay.length && api.dispatchAction({
    type: 'downplay',
    escapeConnect: true,
    // Not blur others when highlight in axisPointer.
    notBlur: true,
    batch: toDownplay
  });
  toHighlight.length && api.dispatchAction({
    type: 'highlight',
    escapeConnect: true,
    // Not blur others when highlight in axisPointer.
    notBlur: true,
    batch: toHighlight
  });
}

function findInputAxisInfo(inputAxesInfo, axisInfo) {
  for (var i = 0; i < (inputAxesInfo || []).length; i++) {
    var inputAxisInfo = inputAxesInfo[i];

    if (axisInfo.axis.dim === inputAxisInfo.axisDim && axisInfo.axis.model.componentIndex === inputAxisInfo.axisIndex) {
      return inputAxisInfo;
    }
  }
}

function makeMapperParam(axisInfo) {
  var axisModel = axisInfo.axis.model;
  var item = {};
  var dim = item.axisDim = axisInfo.axis.dim;
  item.axisIndex = item[dim + 'AxisIndex'] = axisModel.componentIndex;
  item.axisName = item[dim + 'AxisName'] = axisModel.name;
  item.axisId = item[dim + 'AxisId'] = axisModel.id;
  return item;
}

function illegalPoint(point) {
  return !point || point[0] == null || isNaN(point[0]) || point[1] == null || isNaN(point[1]);
}

function install$1(registers) {
  // CartesianAxisPointer is not supposed to be required here. But consider
  // echarts.simple.js and online build tooltip, which only require gridSimple,
  // CartesianAxisPointer should be able to required somewhere.
  AxisView.registerAxisPointerClass('CartesianAxisPointer', CartesianAxisPointer);
  registers.registerComponentModel(AxisPointerModel);
  registers.registerComponentView(AxisPointerView);
  registers.registerPreprocessor(function (option) {
    // Always has a global axisPointerModel for default setting.
    if (option) {
      (!option.axisPointer || option.axisPointer.length === 0) && (option.axisPointer = {});
      var link = option.axisPointer.link; // Normalize to array to avoid object mergin. But if link
      // is not set, remain null/undefined, otherwise it will
      // override existent link setting.

      if (link && !isArray(link)) {
        option.axisPointer.link = [link];
      }
    }
  }); // This process should proformed after coordinate systems created
  // and series data processed. So put it on statistic processing stage.

  registers.registerProcessor(registers.PRIORITY.PROCESSOR.STATISTIC, function (ecModel, api) {
    // Build axisPointerModel, mergin tooltip.axisPointer model for each axis.
    // allAxesInfo should be updated when setOption performed.
    ecModel.getComponent('axisPointer').coordSysAxesInfo = collect(ecModel, api);
  }); // Broadcast to all views.

  registers.registerAction({
    type: 'updateAxisPointer',
    event: 'updateAxisPointer',
    update: ':updateAxisPointer'
  }, axisTrigger);
}

function install$2(registers) {
  use(install);
  use(install$1);
}

var TooltipModel =
/** @class */
function (_super) {
  __extends(TooltipModel, _super);

  function TooltipModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = TooltipModel.type;
    return _this;
  }

  TooltipModel.type = 'tooltip';
  TooltipModel.dependencies = ['axisPointer'];
  TooltipModel.defaultOption = {
    zlevel: 0,
    z: 60,
    show: true,
    // tooltip main content
    showContent: true,
    // 'trigger' only works on coordinate system.
    // 'item' | 'axis' | 'none'
    trigger: 'item',
    // 'click' | 'mousemove' | 'none'
    triggerOn: 'mousemove|click',
    alwaysShowContent: false,
    displayMode: 'single',
    renderMode: 'auto',
    // whether restraint content inside viewRect.
    // If renderMode: 'richText', default true.
    // If renderMode: 'html', defaut false (for backward compat).
    confine: null,
    showDelay: 0,
    hideDelay: 100,
    // Animation transition time, unit is second
    transitionDuration: 0.4,
    enterable: false,
    backgroundColor: '#fff',
    // box shadow
    shadowBlur: 10,
    shadowColor: 'rgba(0, 0, 0, .2)',
    shadowOffsetX: 1,
    shadowOffsetY: 2,
    // tooltip border radius, unit is px, default is 4
    borderRadius: 4,
    // tooltip border width, unit is px, default is 0 (no border)
    borderWidth: 1,
    // Tooltip inside padding, default is 5 for all direction
    // Array is allowed to set up, right, bottom, left, same with css
    // The default value: See `tooltip/tooltipMarkup.ts#getPaddingFromTooltipModel`.
    padding: null,
    // Extra css text
    extraCssText: '',
    // axis indicator, trigger by axis
    axisPointer: {
      // default is line
      // legal values: 'line' | 'shadow' | 'cross'
      type: 'line',
      // Valid when type is line, appoint tooltip line locate on which line. Optional
      // legal values: 'x' | 'y' | 'angle' | 'radius' | 'auto'
      // default is 'auto', chose the axis which type is category.
      // for multiply y axis, cartesian coord chose x axis, polar chose angle axis
      axis: 'auto',
      animation: 'auto',
      animationDurationUpdate: 200,
      animationEasingUpdate: 'exponentialOut',
      crossStyle: {
        color: '#999',
        width: 1,
        type: 'dashed',
        // TODO formatter
        textStyle: {}
      } // lineStyle and shadowStyle should not be specified here,
      // otherwise it will always override those styles on option.axisPointer.

    },
    textStyle: {
      color: '#666',
      fontSize: 14
    }
  };
  return TooltipModel;
}(ComponentModel);

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/
function shouldTooltipConfine(tooltipModel) {
  var confineOption = tooltipModel.get('confine');
  return confineOption != null ? !!confineOption // In richText mode, the outside part can not be visible.
  : tooltipModel.get('renderMode') === 'richText';
}

var vendors = ['-ms-', '-moz-', '-o-', '-webkit-', ''];
var gCssText = 'position:absolute;display:block;border-style:solid;white-space:nowrap;z-index:9999999;';

function mirrorPos(pos) {
  pos = pos === 'left' ? 'right' : pos === 'right' ? 'left' : pos === 'top' ? 'bottom' : 'top';
  return pos;
}

function assembleArrow(backgroundColor, borderColor, arrowPosition) {
  if (!isString(arrowPosition) || arrowPosition === 'inside') {
    return '';
  }

  borderColor = convertToColorString(borderColor);
  var arrowPos = mirrorPos(arrowPosition);
  var positionStyle = '';
  var transformStyle = '';

  if (indexOf(['left', 'right'], arrowPos) > -1) {
    positionStyle = arrowPos + ":-6px;top:50%;";
    transformStyle = "translateY(-50%) rotate(" + (arrowPos === 'left' ? -225 : -45) + "deg)";
  } else {
    positionStyle = arrowPos + ":-6px;left:50%;";
    transformStyle = "translateX(-50%) rotate(" + (arrowPos === 'top' ? 225 : 45) + "deg)";
  }

  transformStyle = map(vendors, function (vendorPrefix) {
    return vendorPrefix + 'transform:' + transformStyle;
  }).join(';');
  var styleCss = ['position:absolute;width:10px;height:10px;', "" + positionStyle + transformStyle + ";", "border-bottom: " + borderColor + " solid 1px;", "border-right: " + borderColor + " solid 1px;", "background-color: " + backgroundColor + ";", 'box-shadow: 8px 8px 16px -3px #000;'];
  return "<div style=\"" + styleCss.join('') + "\"></div>";
}

function assembleTransition(duration, onlyFade) {
  var transitionCurve = 'cubic-bezier(0.23, 1, 0.32, 1)';
  var transitionText = 'opacity ' + duration / 2 + 's ' + transitionCurve + ',' + 'visibility ' + duration / 2 + 's ' + transitionCurve;

  if (!onlyFade) {
    transitionText += ',left ' + duration + 's ' + transitionCurve + ',top ' + duration + 's ' + transitionCurve;
  }

  return map(vendors, function (vendorPrefix) {
    return vendorPrefix + 'transition:' + transitionText;
  }).join(';');
}
/**
 * @param {Object} textStyle
 * @return {string}
 * @inner
 */


function assembleFont(textStyleModel) {
  var cssText = [];
  var fontSize = textStyleModel.get('fontSize');
  var color = textStyleModel.getTextColor();
  color && cssText.push('color:' + color);
  cssText.push('font:' + textStyleModel.getFont());
  fontSize // @ts-ignore, leave it to the tooltip refactor.
  && cssText.push('line-height:' + Math.round(fontSize * 3 / 2) + 'px');
  var shadowColor = textStyleModel.get('textShadowColor');
  var shadowBlur = textStyleModel.get('textShadowBlur') || 0;
  var shadowOffsetX = textStyleModel.get('textShadowOffsetX') || 0;
  var shadowOffsetY = textStyleModel.get('textShadowOffsetY') || 0;
  shadowColor && shadowBlur && cssText.push('text-shadow:' + shadowOffsetX + 'px ' + shadowOffsetY + 'px ' + shadowBlur + 'px ' + shadowColor);
  each$2(['decoration', 'align'], function (name) {
    var val = textStyleModel.get(name);
    val && cssText.push('text-' + name + ':' + val);
  });
  return cssText.join(';');
}

function assembleCssText(tooltipModel, enableTransition, onlyFade) {
  var cssText = [];
  var transitionDuration = tooltipModel.get('transitionDuration');
  var backgroundColor = tooltipModel.get('backgroundColor');
  var shadowBlur = tooltipModel.get('shadowBlur');
  var shadowColor = tooltipModel.get('shadowColor');
  var shadowOffsetX = tooltipModel.get('shadowOffsetX');
  var shadowOffsetY = tooltipModel.get('shadowOffsetY');
  var textStyleModel = tooltipModel.getModel('textStyle');
  var padding = getPaddingFromTooltipModel(tooltipModel, 'html');
  var boxShadow = shadowOffsetX + "px " + shadowOffsetY + "px " + shadowBlur + "px " + shadowColor;
  cssText.push('box-shadow:' + boxShadow); // Animation transition. Do not animate when transitionDuration is 0.

  enableTransition && transitionDuration && cssText.push(assembleTransition(transitionDuration, onlyFade));

  if (backgroundColor) {
    if (env.canvasSupported) {
      cssText.push('background-Color:' + backgroundColor);
    } else {
      // for ie
      cssText.push('background-Color:#' + toHex(backgroundColor));
      cssText.push('filter:alpha(opacity=70)');
    }
  } // Border style


  each$2(['width', 'color', 'radius'], function (name) {
    var borderName = 'border-' + name;
    var camelCase = toCamelCase(borderName);
    var val = tooltipModel.get(camelCase);
    val != null && cssText.push(borderName + ':' + val + (name === 'color' ? '' : 'px'));
  }); // Text style

  cssText.push(assembleFont(textStyleModel)); // Padding

  if (padding != null) {
    cssText.push('padding:' + normalizeCssArray(padding).join('px ') + 'px');
  }

  return cssText.join(';') + ';';
} // If not able to make, do not modify the input `out`.


function makeStyleCoord(out, zr, appendToBody, zrX, zrY) {
  var zrPainter = zr && zr.painter;

  if (appendToBody) {
    var zrViewportRoot = zrPainter && zrPainter.getViewportRoot();

    if (zrViewportRoot) {
      // Some APPs might use scale on body, so we support CSS transform here.
      transformLocalCoord(out, zrViewportRoot, document.body, zrX, zrY);
    }
  } else {
    out[0] = zrX;
    out[1] = zrY; // xy should be based on canvas root. But tooltipContent is
    // the sibling of canvas root. So padding of ec container
    // should be considered here.

    var viewportRootOffset = zrPainter && zrPainter.getViewportRootOffset();

    if (viewportRootOffset) {
      out[0] += viewportRootOffset.offsetLeft;
      out[1] += viewportRootOffset.offsetTop;
    }
  }

  out[2] = out[0] / zr.getWidth();
  out[3] = out[1] / zr.getHeight();
}

var TooltipHTMLContent =
/** @class */
function () {
  function TooltipHTMLContent(container, api, opt) {
    this._show = false;
    this._styleCoord = [0, 0, 0, 0];
    this._enterable = true;
    this._firstShow = true;
    this._longHide = true;

    if (env.wxa) {
      return null;
    }

    var el = document.createElement('div'); // TODO: TYPE

    el.domBelongToZr = true;
    this.el = el;
    var zr = this._zr = api.getZr();
    var appendToBody = this._appendToBody = opt && opt.appendToBody;
    makeStyleCoord(this._styleCoord, zr, appendToBody, api.getWidth() / 2, api.getHeight() / 2);

    if (appendToBody) {
      document.body.appendChild(el);
    } else {
      container.appendChild(el);
    }

    this._container = container; // FIXME
    // Is it needed to trigger zr event manually if
    // the browser do not support `pointer-events: none`.

    var self = this;

    el.onmouseenter = function () {
      // clear the timeout in hideLater and keep showing tooltip
      if (self._enterable) {
        clearTimeout(self._hideTimeout);
        self._show = true;
      }

      self._inContent = true;
    };

    el.onmousemove = function (e) {
      e = e || window.event;

      if (!self._enterable) {
        // `pointer-events: none` is set to tooltip content div
        // if `enterable` is set as `false`, and `el.onmousemove`
        // can not be triggered. But in browser that do not
        // support `pointer-events`, we need to do this:
        // Try trigger zrender event to avoid mouse
        // in and out shape too frequently
        var handler = zr.handler;
        var zrViewportRoot = zr.painter.getViewportRoot();
        normalizeEvent(zrViewportRoot, e, true);
        handler.dispatch('mousemove', e);
      }
    };

    el.onmouseleave = function () {
      // set `_inContent` to `false` before `hideLater`
      self._inContent = false;

      if (self._enterable) {
        if (self._show) {
          self.hideLater(self._hideDelay);
        }
      }
    };
  }
  /**
   * Update when tooltip is rendered
   */


  TooltipHTMLContent.prototype.update = function (tooltipModel) {
    // FIXME
    // Move this logic to ec main?
    var container = this._container;
    var stl = container.currentStyle || document.defaultView.getComputedStyle(container);
    var domStyle = container.style;

    if (domStyle.position !== 'absolute' && stl.position !== 'absolute') {
      domStyle.position = 'relative';
    } // move tooltip if chart resized


    var alwaysShowContent = tooltipModel.get('alwaysShowContent');
    alwaysShowContent && this._moveIfResized(); // update className

    this.el.className = tooltipModel.get('className') || ''; // Hide the tooltip
    // PENDING
    // this.hide();
  };

  TooltipHTMLContent.prototype.show = function (tooltipModel, nearPointColor) {
    clearTimeout(this._hideTimeout);
    clearTimeout(this._longHideTimeout);
    var el = this.el;
    var styleCoord = this._styleCoord;
    var offset = el.offsetHeight / 2;
    nearPointColor = convertToColorString(nearPointColor);
    el.style.cssText = gCssText + assembleCssText(tooltipModel, !this._firstShow, this._longHide) // Because of the reason described in:
    // http://stackoverflow.com/questions/21125587/css3-transition-not-working-in-chrome-anymore
    // we should set initial value to `left` and `top`.
    + ';left:' + styleCoord[0] + 'px;top:' + (styleCoord[1] - offset) + 'px;' + ("border-color: " + nearPointColor + ";") + (tooltipModel.get('extraCssText') || '');
    el.style.display = el.innerHTML ? 'block' : 'none'; // If mouse occasionally move over the tooltip, a mouseout event will be
    // triggered by canvas, and cause some unexpectable result like dragging
    // stop, "unfocusAdjacency". Here `pointer-events: none` is used to solve
    // it. Although it is not supported by IE8~IE10, fortunately it is a rare
    // scenario.

    el.style.pointerEvents = this._enterable ? 'auto' : 'none';
    this._show = true;
    this._firstShow = false;
    this._longHide = false;
  };

  TooltipHTMLContent.prototype.setContent = function (content, markers, tooltipModel, borderColor, arrowPosition) {
    if (content == null) {
      return;
    }

    var el = this.el;

    if (isString(arrowPosition) && tooltipModel.get('trigger') === 'item' && !shouldTooltipConfine(tooltipModel)) {
      content += assembleArrow(tooltipModel.get('backgroundColor'), borderColor, arrowPosition);
    }

    if (isString(content)) {
      el.innerHTML = content;
    } else if (content) {
      // Clear previous
      el.innerHTML = '';

      if (!isArray(content)) {
        content = [content];
      }

      for (var i = 0; i < content.length; i++) {
        if (isDom(content[i]) && content[i].parentNode !== el) {
          el.appendChild(content[i]);
        }
      }
    }
  };

  TooltipHTMLContent.prototype.setEnterable = function (enterable) {
    this._enterable = enterable;
  };

  TooltipHTMLContent.prototype.getSize = function () {
    var el = this.el;
    return [el.clientWidth, el.clientHeight];
  };

  TooltipHTMLContent.prototype.moveTo = function (zrX, zrY) {
    var styleCoord = this._styleCoord;
    makeStyleCoord(styleCoord, this._zr, this._appendToBody, zrX, zrY);

    if (styleCoord[0] != null && styleCoord[1] != null) {
      var style = this.el.style; // If using float on style, the final width of the dom might
      // keep changing slightly while mouse move. So `toFixed(0)` them.

      style.left = styleCoord[0].toFixed(0) + 'px';
      style.top = styleCoord[1].toFixed(0) + 'px';
    }
  };
  /**
   * when `alwaysShowContent` is true,
   * move the tooltip after chart resized
   */


  TooltipHTMLContent.prototype._moveIfResized = function () {
    // The ratio of left to width
    var ratioX = this._styleCoord[2]; // The ratio of top to height

    var ratioY = this._styleCoord[3];
    this.moveTo(ratioX * this._zr.getWidth(), ratioY * this._zr.getHeight());
  };

  TooltipHTMLContent.prototype.hide = function () {
    var _this = this;

    this.el.style.visibility = 'hidden';
    this.el.style.opacity = '0';
    this._show = false;
    this._longHideTimeout = setTimeout(function () {
      return _this._longHide = true;
    }, 500);
  };

  TooltipHTMLContent.prototype.hideLater = function (time) {
    if (this._show && !(this._inContent && this._enterable)) {
      if (time) {
        this._hideDelay = time; // Set show false to avoid invoke hideLater multiple times

        this._show = false;
        this._hideTimeout = setTimeout(bind$2(this.hide, this), time);
      } else {
        this.hide();
      }
    }
  };

  TooltipHTMLContent.prototype.isShow = function () {
    return this._show;
  };

  TooltipHTMLContent.prototype.dispose = function () {
    this.el.parentNode.removeChild(this.el);
  };

  TooltipHTMLContent.prototype.getOuterSize = function () {
    var width = this.el.clientWidth;
    var height = this.el.clientHeight; // Consider browser compatibility.
    // IE8 does not support getComputedStyle.

    if (document.defaultView && document.defaultView.getComputedStyle) {
      var stl = document.defaultView.getComputedStyle(this.el);

      if (stl) {
        width += parseInt(stl.borderLeftWidth, 10) + parseInt(stl.borderRightWidth, 10);
        height += parseInt(stl.borderTopWidth, 10) + parseInt(stl.borderBottomWidth, 10);
      }
    }

    return {
      width: width,
      height: height
    };
  };

  return TooltipHTMLContent;
}();

var TooltipRichContent =
/** @class */
function () {
  function TooltipRichContent(api) {
    this._show = false;
    this._styleCoord = [0, 0, 0, 0];
    this._enterable = true;
    this._zr = api.getZr();
    makeStyleCoord$1(this._styleCoord, this._zr, api.getWidth() / 2, api.getHeight() / 2);
  }
  /**
   * Update when tooltip is rendered
   */


  TooltipRichContent.prototype.update = function (tooltipModel) {
    var alwaysShowContent = tooltipModel.get('alwaysShowContent');
    alwaysShowContent && this._moveIfResized();
  };

  TooltipRichContent.prototype.show = function () {
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
    }

    this.el.show();
    this._show = true;
  };
  /**
   * Set tooltip content
   */


  TooltipRichContent.prototype.setContent = function (content, markupStyleCreator, tooltipModel, borderColor, arrowPosition) {
    if (isObject(content)) {
      throwError('');
    }

    if (this.el) {
      this._zr.remove(this.el);
    }

    var textStyleModel = tooltipModel.getModel('textStyle');
    this.el = new ZRText({
      style: {
        rich: markupStyleCreator.richTextStyles,
        text: content,
        lineHeight: 22,
        backgroundColor: tooltipModel.get('backgroundColor'),
        borderRadius: tooltipModel.get('borderRadius'),
        borderWidth: 1,
        borderColor: borderColor,
        shadowColor: tooltipModel.get('shadowColor'),
        shadowBlur: tooltipModel.get('shadowBlur'),
        shadowOffsetX: tooltipModel.get('shadowOffsetX'),
        shadowOffsetY: tooltipModel.get('shadowOffsetY'),
        textShadowColor: textStyleModel.get('textShadowColor'),
        textShadowBlur: textStyleModel.get('textShadowBlur') || 0,
        textShadowOffsetX: textStyleModel.get('textShadowOffsetX') || 0,
        textShadowOffsetY: textStyleModel.get('textShadowOffsetY') || 0,
        fill: tooltipModel.get(['textStyle', 'color']),
        padding: getPaddingFromTooltipModel(tooltipModel, 'richText'),
        verticalAlign: 'top',
        align: 'left'
      },
      z: tooltipModel.get('z')
    });

    this._zr.add(this.el);

    var self = this;
    this.el.on('mouseover', function () {
      // clear the timeout in hideLater and keep showing tooltip
      if (self._enterable) {
        clearTimeout(self._hideTimeout);
        self._show = true;
      }

      self._inContent = true;
    });
    this.el.on('mouseout', function () {
      if (self._enterable) {
        if (self._show) {
          self.hideLater(self._hideDelay);
        }
      }

      self._inContent = false;
    });
  };

  TooltipRichContent.prototype.setEnterable = function (enterable) {
    this._enterable = enterable;
  };

  TooltipRichContent.prototype.getSize = function () {
    var el = this.el;
    var bounding = this.el.getBoundingRect(); // bounding rect does not include shadow. For renderMode richText,
    // if overflow, it will be cut. So calculate them accurately.

    var shadowOuterSize = calcShadowOuterSize(el.style);
    return [bounding.width + shadowOuterSize.left + shadowOuterSize.right, bounding.height + shadowOuterSize.top + shadowOuterSize.bottom];
  };

  TooltipRichContent.prototype.moveTo = function (x, y) {
    var el = this.el;

    if (el) {
      var styleCoord = this._styleCoord;
      makeStyleCoord$1(styleCoord, this._zr, x, y);
      x = styleCoord[0];
      y = styleCoord[1];
      var style = el.style;
      var borderWidth = mathMaxWith0(style.borderWidth || 0);
      var shadowOuterSize = calcShadowOuterSize(style); // rich text x, y do not include border.

      el.x = x + borderWidth + shadowOuterSize.left;
      el.y = y + borderWidth + shadowOuterSize.top;
      el.markRedraw();
    }
  };
  /**
   * when `alwaysShowContent` is true,
   * move the tooltip after chart resized
   */


  TooltipRichContent.prototype._moveIfResized = function () {
    // The ratio of left to width
    var ratioX = this._styleCoord[2]; // The ratio of top to height

    var ratioY = this._styleCoord[3];
    this.moveTo(ratioX * this._zr.getWidth(), ratioY * this._zr.getHeight());
  };

  TooltipRichContent.prototype.hide = function () {
    if (this.el) {
      this.el.hide();
    }

    this._show = false;
  };

  TooltipRichContent.prototype.hideLater = function (time) {
    if (this._show && !(this._inContent && this._enterable)) {
      if (time) {
        this._hideDelay = time; // Set show false to avoid invoke hideLater multiple times

        this._show = false;
        this._hideTimeout = setTimeout(bind$2(this.hide, this), time);
      } else {
        this.hide();
      }
    }
  };

  TooltipRichContent.prototype.isShow = function () {
    return this._show;
  };

  TooltipRichContent.prototype.getOuterSize = function () {
    var size = this.getSize();
    return {
      width: size[0],
      height: size[1]
    };
  };

  TooltipRichContent.prototype.dispose = function () {
    this._zr.remove(this.el);
  };

  return TooltipRichContent;
}();

function mathMaxWith0(val) {
  return Math.max(0, val);
}

function calcShadowOuterSize(style) {
  var shadowBlur = mathMaxWith0(style.shadowBlur || 0);
  var shadowOffsetX = mathMaxWith0(style.shadowOffsetX || 0);
  var shadowOffsetY = mathMaxWith0(style.shadowOffsetY || 0);
  return {
    left: mathMaxWith0(shadowBlur - shadowOffsetX),
    right: mathMaxWith0(shadowBlur + shadowOffsetX),
    top: mathMaxWith0(shadowBlur - shadowOffsetY),
    bottom: mathMaxWith0(shadowBlur + shadowOffsetY)
  };
}

function makeStyleCoord$1(out, zr, zrX, zrY) {
  out[0] = zrX;
  out[1] = zrY;
  out[2] = out[0] / zr.getWidth();
  out[3] = out[1] / zr.getHeight();
}

var bind$1 = bind$2;
var each$1 = each$2;
var parsePercent = parsePercent$1;
var proxyRect = new Rect({
  shape: {
    x: -1,
    y: -1,
    width: 2,
    height: 2
  }
});

var TooltipView =
/** @class */
function (_super) {
  __extends(TooltipView, _super);

  function TooltipView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = TooltipView.type;
    return _this;
  }

  TooltipView.prototype.init = function (ecModel, api) {
    if (env.node) {
      return;
    }

    var tooltipModel = ecModel.getComponent('tooltip');
    var renderMode = tooltipModel.get('renderMode');
    this._renderMode = getTooltipRenderMode(renderMode);
    this._tooltipContent = this._renderMode === 'richText' ? new TooltipRichContent(api) : new TooltipHTMLContent(api.getDom(), api, {
      appendToBody: tooltipModel.get('appendToBody', true)
    });
  };

  TooltipView.prototype.render = function (tooltipModel, ecModel, api) {
    if (env.node) {
      return;
    } // Reset


    this.group.removeAll();
    this._tooltipModel = tooltipModel;
    this._ecModel = ecModel;
    this._api = api;
    /**
     * @private
     * @type {boolean}
     */

    this._alwaysShowContent = tooltipModel.get('alwaysShowContent');
    var tooltipContent = this._tooltipContent;
    tooltipContent.update(tooltipModel);
    tooltipContent.setEnterable(tooltipModel.get('enterable'));

    this._initGlobalListener();

    this._keepShow();
  };

  TooltipView.prototype._initGlobalListener = function () {
    var tooltipModel = this._tooltipModel;
    var triggerOn = tooltipModel.get('triggerOn');
    register('itemTooltip', this._api, bind$1(function (currTrigger, e, dispatchAction) {
      // If 'none', it is not controlled by mouse totally.
      if (triggerOn !== 'none') {
        if (triggerOn.indexOf(currTrigger) >= 0) {
          this._tryShow(e, dispatchAction);
        } else if (currTrigger === 'leave') {
          this._hide(dispatchAction);
        }
      }
    }, this));
  };

  TooltipView.prototype._keepShow = function () {
    var tooltipModel = this._tooltipModel;
    var ecModel = this._ecModel;
    var api = this._api; // Try to keep the tooltip show when refreshing

    if (this._lastX != null && this._lastY != null // When user is willing to control tooltip totally using API,
    // self.manuallyShowTip({x, y}) might cause tooltip hide,
    // which is not expected.
    && tooltipModel.get('triggerOn') !== 'none') {
      var self_1 = this;
      clearTimeout(this._refreshUpdateTimeout);
      this._refreshUpdateTimeout = setTimeout(function () {
        // Show tip next tick after other charts are rendered
        // In case highlight action has wrong result
        // FIXME
        !api.isDisposed() && self_1.manuallyShowTip(tooltipModel, ecModel, api, {
          x: self_1._lastX,
          y: self_1._lastY,
          dataByCoordSys: self_1._lastDataByCoordSys
        });
      });
    }
  };
  /**
   * Show tip manually by
   * dispatchAction({
   *     type: 'showTip',
   *     x: 10,
   *     y: 10
   * });
   * Or
   * dispatchAction({
   *      type: 'showTip',
   *      seriesIndex: 0,
   *      dataIndex or dataIndexInside or name
   * });
   *
   *  TODO Batch
   */


  TooltipView.prototype.manuallyShowTip = function (tooltipModel, ecModel, api, payload) {
    if (payload.from === this.uid || env.node) {
      return;
    }

    var dispatchAction = makeDispatchAction$1(payload, api); // Reset ticket

    this._ticket = ''; // When triggered from axisPointer.

    var dataByCoordSys = payload.dataByCoordSys;

    if (payload.tooltip && payload.x != null && payload.y != null) {
      var el = proxyRect;
      el.x = payload.x;
      el.y = payload.y;
      el.update();
      el.tooltip = payload.tooltip; // Manually show tooltip while view is not using zrender elements.

      this._tryShow({
        offsetX: payload.x,
        offsetY: payload.y,
        target: el
      }, dispatchAction);
    } else if (dataByCoordSys) {
      this._tryShow({
        offsetX: payload.x,
        offsetY: payload.y,
        position: payload.position,
        dataByCoordSys: dataByCoordSys,
        tooltipOption: payload.tooltipOption
      }, dispatchAction);
    } else if (payload.seriesIndex != null) {
      if (this._manuallyAxisShowTip(tooltipModel, ecModel, api, payload)) {
        return;
      }

      var pointInfo = findPointFromSeries(payload, ecModel);
      var cx = pointInfo.point[0];
      var cy = pointInfo.point[1];

      if (cx != null && cy != null) {
        this._tryShow({
          offsetX: cx,
          offsetY: cy,
          position: payload.position,
          target: pointInfo.el
        }, dispatchAction);
      }
    } else if (payload.x != null && payload.y != null) {
      // FIXME
      // should wrap dispatchAction like `axisPointer/globalListener` ?
      api.dispatchAction({
        type: 'updateAxisPointer',
        x: payload.x,
        y: payload.y
      });

      this._tryShow({
        offsetX: payload.x,
        offsetY: payload.y,
        position: payload.position,
        target: api.getZr().findHover(payload.x, payload.y).target
      }, dispatchAction);
    }
  };

  TooltipView.prototype.manuallyHideTip = function (tooltipModel, ecModel, api, payload) {
    var tooltipContent = this._tooltipContent;

    if (!this._alwaysShowContent && this._tooltipModel) {
      tooltipContent.hideLater(this._tooltipModel.get('hideDelay'));
    }

    this._lastX = this._lastY = this._lastDataByCoordSys = null;

    if (payload.from !== this.uid) {
      this._hide(makeDispatchAction$1(payload, api));
    }
  }; // Be compatible with previous design, that is, when tooltip.type is 'axis' and
  // dispatchAction 'showTip' with seriesIndex and dataIndex will trigger axis pointer
  // and tooltip.


  TooltipView.prototype._manuallyAxisShowTip = function (tooltipModel, ecModel, api, payload) {
    var seriesIndex = payload.seriesIndex;
    var dataIndex = payload.dataIndex; // @ts-ignore

    var coordSysAxesInfo = ecModel.getComponent('axisPointer').coordSysAxesInfo;

    if (seriesIndex == null || dataIndex == null || coordSysAxesInfo == null) {
      return;
    }

    var seriesModel = ecModel.getSeriesByIndex(seriesIndex);

    if (!seriesModel) {
      return;
    }

    var data = seriesModel.getData();
    var tooltipCascadedModel = buildTooltipModel([data.getItemModel(dataIndex), seriesModel, (seriesModel.coordinateSystem || {}).model, tooltipModel]);

    if (tooltipCascadedModel.get('trigger') !== 'axis') {
      return;
    }

    api.dispatchAction({
      type: 'updateAxisPointer',
      seriesIndex: seriesIndex,
      dataIndex: dataIndex,
      position: payload.position
    });
    return true;
  };

  TooltipView.prototype._tryShow = function (e, dispatchAction) {
    var el = e.target;
    var tooltipModel = this._tooltipModel;

    if (!tooltipModel) {
      return;
    } // Save mouse x, mouse y. So we can try to keep showing the tip if chart is refreshed


    this._lastX = e.offsetX;
    this._lastY = e.offsetY;
    var dataByCoordSys = e.dataByCoordSys;

    if (dataByCoordSys && dataByCoordSys.length) {
      this._showAxisTooltip(dataByCoordSys, e);
    } // Always show item tooltip if mouse is on the element with dataIndex
    else if (el && findEventDispatcher(el, function (target) {
        return getECData(target).dataIndex != null;
      }, true)) {
        this._lastDataByCoordSys = null;

        this._showSeriesItemTooltip(e, el, dispatchAction);
      } // Tooltip provided directly. Like legend.
      else if (el && el.tooltip) {
          this._lastDataByCoordSys = null;

          this._showComponentItemTooltip(e, el, dispatchAction);
        } else {
          this._lastDataByCoordSys = null;

          this._hide(dispatchAction);
        }
  };

  TooltipView.prototype._showOrMove = function (tooltipModel, cb) {
    // showDelay is used in this case: tooltip.enterable is set
    // as true. User intent to move mouse into tooltip and click
    // something. `showDelay` makes it easier to enter the content
    // but tooltip do not move immediately.
    var delay = tooltipModel.get('showDelay');
    cb = bind$2(cb, this);
    clearTimeout(this._showTimout);
    delay > 0 ? this._showTimout = setTimeout(cb, delay) : cb();
  };

  TooltipView.prototype._showAxisTooltip = function (dataByCoordSys, e) {
    var ecModel = this._ecModel;
    var globalTooltipModel = this._tooltipModel;
    var point = [e.offsetX, e.offsetY];
    var singleTooltipModel = buildTooltipModel([e.tooltipOption, globalTooltipModel]);
    var renderMode = this._renderMode;
    var cbParamsList = [];
    var articleMarkup = createTooltipMarkup('section', {
      blocks: [],
      noHeader: true
    }); // Only for legacy: `Serise['formatTooltip']` returns a string.

    var markupTextArrLegacy = [];
    var markupStyleCreator = new TooltipMarkupStyleCreator();
    each$1(dataByCoordSys, function (itemCoordSys) {
      each$1(itemCoordSys.dataByAxis, function (axisItem) {
        var axisModel = ecModel.getComponent(axisItem.axisDim + 'Axis', axisItem.axisIndex);
        var axisValue = axisItem.value;

        if (!axisModel || axisValue == null) {
          return;
        }

        var axisValueLabel = getValueLabel(axisValue, axisModel.axis, ecModel, axisItem.seriesDataIndices, axisItem.valueLabelOpt);
        var axisSectionMarkup = createTooltipMarkup('section', {
          header: axisValueLabel,
          noHeader: !trim(axisValueLabel),
          sortBlocks: true,
          blocks: []
        });
        articleMarkup.blocks.push(axisSectionMarkup);
        each$2(axisItem.seriesDataIndices, function (idxItem) {
          var series = ecModel.getSeriesByIndex(idxItem.seriesIndex);
          var dataIndex = idxItem.dataIndexInside;
          var cbParams = series.getDataParams(dataIndex);
          cbParams.axisDim = axisItem.axisDim;
          cbParams.axisIndex = axisItem.axisIndex;
          cbParams.axisType = axisItem.axisType;
          cbParams.axisId = axisItem.axisId;
          cbParams.axisValue = getAxisRawValue(axisModel.axis, {
            value: axisValue
          });
          cbParams.axisValueLabel = axisValueLabel; // Pre-create marker style for makers. Users can assemble richText
          // text in `formatter` callback and use those markers style.

          cbParams.marker = markupStyleCreator.makeTooltipMarker('item', convertToColorString(cbParams.color), renderMode);
          var seriesTooltipResult = normalizeTooltipFormatResult(series.formatTooltip(dataIndex, true, null));

          if (seriesTooltipResult.markupFragment) {
            axisSectionMarkup.blocks.push(seriesTooltipResult.markupFragment);
          }

          if (seriesTooltipResult.markupText) {
            markupTextArrLegacy.push(seriesTooltipResult.markupText);
          }

          cbParamsList.push(cbParams);
        });
      });
    }); // In most cases, the second axis is displays upper on the first one.
    // So we reverse it to look better.

    articleMarkup.blocks.reverse();
    markupTextArrLegacy.reverse();
    var positionExpr = e.position;
    var orderMode = singleTooltipModel.get('order');
    var builtMarkupText = buildTooltipMarkup(articleMarkup, markupStyleCreator, renderMode, orderMode, ecModel.get('useUTC'), singleTooltipModel.get('textStyle'));
    builtMarkupText && markupTextArrLegacy.unshift(builtMarkupText);
    var blockBreak = renderMode === 'richText' ? '\n\n' : '<br/>';
    var allMarkupText = markupTextArrLegacy.join(blockBreak);

    this._showOrMove(singleTooltipModel, function () {
      if (this._updateContentNotChangedOnAxis(dataByCoordSys)) {
        this._updatePosition(singleTooltipModel, positionExpr, point[0], point[1], this._tooltipContent, cbParamsList);
      } else {
        this._showTooltipContent(singleTooltipModel, allMarkupText, cbParamsList, Math.random() + '', point[0], point[1], positionExpr, null, markupStyleCreator);
      }
    }); // Do not trigger events here, because this branch only be entered
    // from dispatchAction.

  };

  TooltipView.prototype._showSeriesItemTooltip = function (e, el, dispatchAction) {
    var dispatcher = findEventDispatcher(el, function (target) {
      return getECData(target).dataIndex != null;
    }, true);
    var ecModel = this._ecModel;
    var ecData = getECData(dispatcher); // Use dataModel in element if possible
    // Used when mouseover on a element like markPoint or edge
    // In which case, the data is not main data in series.

    var seriesIndex = ecData.seriesIndex;
    var seriesModel = ecModel.getSeriesByIndex(seriesIndex); // For example, graph link.

    var dataModel = ecData.dataModel || seriesModel;
    var dataIndex = ecData.dataIndex;
    var dataType = ecData.dataType;
    var data = dataModel.getData(dataType);
    var renderMode = this._renderMode;
    var tooltipModel = buildTooltipModel([data.getItemModel(dataIndex), dataModel, seriesModel && (seriesModel.coordinateSystem || {}).model, this._tooltipModel]);
    var tooltipTrigger = tooltipModel.get('trigger');

    if (tooltipTrigger != null && tooltipTrigger !== 'item') {
      return;
    }

    var params = dataModel.getDataParams(dataIndex, dataType);
    var markupStyleCreator = new TooltipMarkupStyleCreator(); // Pre-create marker style for makers. Users can assemble richText
    // text in `formatter` callback and use those markers style.

    params.marker = markupStyleCreator.makeTooltipMarker('item', convertToColorString(params.color), renderMode);
    var seriesTooltipResult = normalizeTooltipFormatResult(dataModel.formatTooltip(dataIndex, false, dataType));
    var orderMode = tooltipModel.get('order');
    var markupText = seriesTooltipResult.markupFragment ? buildTooltipMarkup(seriesTooltipResult.markupFragment, markupStyleCreator, renderMode, orderMode, ecModel.get('useUTC'), tooltipModel.get('textStyle')) : seriesTooltipResult.markupText;
    var asyncTicket = 'item_' + dataModel.name + '_' + dataIndex;

    this._showOrMove(tooltipModel, function () {
      this._showTooltipContent(tooltipModel, markupText, params, asyncTicket, e.offsetX, e.offsetY, e.position, e.target, markupStyleCreator);
    }); // FIXME
    // duplicated showtip if manuallyShowTip is called from dispatchAction.


    dispatchAction({
      type: 'showTip',
      dataIndexInside: dataIndex,
      dataIndex: data.getRawIndex(dataIndex),
      seriesIndex: seriesIndex,
      from: this.uid
    });
  };

  TooltipView.prototype._showComponentItemTooltip = function (e, el, dispatchAction) {
    var tooltipOpt = el.tooltip;

    if (isString(tooltipOpt)) {
      var content = tooltipOpt;
      tooltipOpt = {
        content: content,
        // Fixed formatter
        formatter: content
      };
    }

    var subTooltipModel = new Model(tooltipOpt, this._tooltipModel, this._ecModel);
    var defaultHtml = subTooltipModel.get('content');
    var asyncTicket = Math.random() + ''; // PENDING: this case do not support richText style yet.

    var markupStyleCreator = new TooltipMarkupStyleCreator(); // Do not check whether `trigger` is 'none' here, because `trigger`
    // only works on coordinate system. In fact, we have not found case
    // that requires setting `trigger` nothing on component yet.

    this._showOrMove(subTooltipModel, function () {
      this._showTooltipContent( // Use formatterParams from element defined in component
      subTooltipModel, defaultHtml, subTooltipModel.get('formatterParams') || {}, asyncTicket, e.offsetX, e.offsetY, e.position, el, markupStyleCreator);
    }); // If not dispatch showTip, tip may be hide triggered by axis.


    dispatchAction({
      type: 'showTip',
      from: this.uid
    });
  };

  TooltipView.prototype._showTooltipContent = function ( // Use Model<TooltipOption> insteadof TooltipModel because this model may be from series or other options.
  // Instead of top level tooltip.
  tooltipModel, defaultHtml, params, asyncTicket, x, y, positionExpr, el, markupStyleCreator) {
    // Reset ticket
    this._ticket = '';

    if (!tooltipModel.get('showContent') || !tooltipModel.get('show')) {
      return;
    }

    var tooltipContent = this._tooltipContent;
    var formatter = tooltipModel.get('formatter');
    positionExpr = positionExpr || tooltipModel.get('position');
    var html = defaultHtml;

    var nearPoint = this._getNearestPoint([x, y], params, tooltipModel.get('trigger'), tooltipModel.get('borderColor'));

    if (formatter && isString(formatter)) {
      var useUTC = tooltipModel.ecModel.get('useUTC');
      var params0 = isArray(params) ? params[0] : params;
      var isTimeAxis = params0 && params0.axisType && params0.axisType.indexOf('time') >= 0;
      html = formatter;

      if (isTimeAxis) {
        html = format(params0.axisValue, html, useUTC);
      }

      html = formatTpl(html, params, true);
    } else if (isFunction(formatter)) {
      var callback = bind$1(function (cbTicket, html) {
        if (cbTicket === this._ticket) {
          tooltipContent.setContent(html, markupStyleCreator, tooltipModel, nearPoint.color, positionExpr);

          this._updatePosition(tooltipModel, positionExpr, x, y, tooltipContent, params, el);
        }
      }, this);
      this._ticket = asyncTicket;
      html = formatter(params, asyncTicket, callback);
    }

    tooltipContent.setContent(html, markupStyleCreator, tooltipModel, nearPoint.color, positionExpr);
    tooltipContent.show(tooltipModel, nearPoint.color);

    this._updatePosition(tooltipModel, positionExpr, x, y, tooltipContent, params, el);
  };

  TooltipView.prototype._getNearestPoint = function (point, tooltipDataParams, trigger, borderColor) {
    if (trigger === 'axis' || isArray(tooltipDataParams)) {
      return {
        color: borderColor || (this._renderMode === 'html' ? '#fff' : 'none')
      };
    }

    if (!isArray(tooltipDataParams)) {
      return {
        color: borderColor || tooltipDataParams.color || tooltipDataParams.borderColor
      };
    }
  };

  TooltipView.prototype._updatePosition = function (tooltipModel, positionExpr, x, // Mouse x
  y, // Mouse y
  content, params, el) {
    var viewWidth = this._api.getWidth();

    var viewHeight = this._api.getHeight();

    positionExpr = positionExpr || tooltipModel.get('position');
    var contentSize = content.getSize();
    var align = tooltipModel.get('align');
    var vAlign = tooltipModel.get('verticalAlign');
    var rect = el && el.getBoundingRect().clone();
    el && rect.applyTransform(el.transform);

    if (isFunction(positionExpr)) {
      // Callback of position can be an array or a string specify the position
      positionExpr = positionExpr([x, y], params, content.el, rect, {
        viewSize: [viewWidth, viewHeight],
        contentSize: contentSize.slice()
      });
    }

    if (isArray(positionExpr)) {
      x = parsePercent(positionExpr[0], viewWidth);
      y = parsePercent(positionExpr[1], viewHeight);
    } else if (isObject(positionExpr)) {
      var boxLayoutPosition = positionExpr;
      boxLayoutPosition.width = contentSize[0];
      boxLayoutPosition.height = contentSize[1];
      var layoutRect = getLayoutRect(boxLayoutPosition, {
        width: viewWidth,
        height: viewHeight
      });
      x = layoutRect.x;
      y = layoutRect.y;
      align = null; // When positionExpr is left/top/right/bottom,
      // align and verticalAlign will not work.

      vAlign = null;
    } // Specify tooltip position by string 'top' 'bottom' 'left' 'right' around graphic element
    else if (isString(positionExpr) && el) {
        var pos = calcTooltipPosition(positionExpr, rect, contentSize);
        x = pos[0];
        y = pos[1];
      } else {
        var pos = refixTooltipPosition(x, y, content, viewWidth, viewHeight, align ? null : 20, vAlign ? null : 20);
        x = pos[0];
        y = pos[1];
      }

    align && (x -= isCenterAlign(align) ? contentSize[0] / 2 : align === 'right' ? contentSize[0] : 0);
    vAlign && (y -= isCenterAlign(vAlign) ? contentSize[1] / 2 : vAlign === 'bottom' ? contentSize[1] : 0);

    if (shouldTooltipConfine(tooltipModel)) {
      var pos = confineTooltipPosition(x, y, content, viewWidth, viewHeight);
      x = pos[0];
      y = pos[1];
    }

    content.moveTo(x, y);
  }; // FIXME
  // Should we remove this but leave this to user?


  TooltipView.prototype._updateContentNotChangedOnAxis = function (dataByCoordSys) {
    var lastCoordSys = this._lastDataByCoordSys;
    var contentNotChanged = !!lastCoordSys && lastCoordSys.length === dataByCoordSys.length;
    contentNotChanged && each$1(lastCoordSys, function (lastItemCoordSys, indexCoordSys) {
      var lastDataByAxis = lastItemCoordSys.dataByAxis || [];
      var thisItemCoordSys = dataByCoordSys[indexCoordSys] || {};
      var thisDataByAxis = thisItemCoordSys.dataByAxis || [];
      contentNotChanged = contentNotChanged && lastDataByAxis.length === thisDataByAxis.length;
      contentNotChanged && each$1(lastDataByAxis, function (lastItem, indexAxis) {
        var thisItem = thisDataByAxis[indexAxis] || {};
        var lastIndices = lastItem.seriesDataIndices || [];
        var newIndices = thisItem.seriesDataIndices || [];
        contentNotChanged = contentNotChanged && lastItem.value === thisItem.value && lastItem.axisType === thisItem.axisType && lastItem.axisId === thisItem.axisId && lastIndices.length === newIndices.length;
        contentNotChanged && each$1(lastIndices, function (lastIdxItem, j) {
          var newIdxItem = newIndices[j];
          contentNotChanged = contentNotChanged && lastIdxItem.seriesIndex === newIdxItem.seriesIndex && lastIdxItem.dataIndex === newIdxItem.dataIndex;
        });
      });
    });
    this._lastDataByCoordSys = dataByCoordSys;
    return !!contentNotChanged;
  };

  TooltipView.prototype._hide = function (dispatchAction) {
    // Do not directly hideLater here, because this behavior may be prevented
    // in dispatchAction when showTip is dispatched.
    // FIXME
    // duplicated hideTip if manuallyHideTip is called from dispatchAction.
    this._lastDataByCoordSys = null;
    dispatchAction({
      type: 'hideTip',
      from: this.uid
    });
  };

  TooltipView.prototype.dispose = function (ecModel, api) {
    if (env.node) {
      return;
    }

    this._tooltipContent.dispose();

    unregister('itemTooltip', api);
  };

  TooltipView.type = 'tooltip';
  return TooltipView;
}(ComponentView);
/**
 * From top to bottom. (the last one should be globalTooltipModel);
 */


function buildTooltipModel(modelCascade) {
  // Last is always tooltip model.
  var resultModel = modelCascade.pop();

  while (modelCascade.length) {
    var tooltipOpt = modelCascade.pop();

    if (tooltipOpt) {
      if (tooltipOpt instanceof Model) {
        tooltipOpt = tooltipOpt.get('tooltip', true);
      } // In each data item tooltip can be simply write:
      // {
      //  value: 10,
      //  tooltip: 'Something you need to know'
      // }


      if (isString(tooltipOpt)) {
        tooltipOpt = {
          formatter: tooltipOpt
        };
      }

      resultModel = new Model(tooltipOpt, resultModel, resultModel.ecModel);
    }
  }

  return resultModel;
}

function makeDispatchAction$1(payload, api) {
  return payload.dispatchAction || bind$2(api.dispatchAction, api);
}

function refixTooltipPosition(x, y, content, viewWidth, viewHeight, gapH, gapV) {
  var size = content.getOuterSize();
  var width = size.width;
  var height = size.height;

  if (gapH != null) {
    // Add extra 2 pixels for this case:
    // At present the "values" in defaut tooltip are using CSS `float: right`.
    // When the right edge of the tooltip box is on the right side of the
    // viewport, the `float` layout might push the "values" to the second line.
    if (x + width + gapH + 2 > viewWidth) {
      x -= width + gapH;
    } else {
      x += gapH;
    }
  }

  if (gapV != null) {
    if (y + height + gapV > viewHeight) {
      y -= height + gapV;
    } else {
      y += gapV;
    }
  }

  return [x, y];
}

function confineTooltipPosition(x, y, content, viewWidth, viewHeight) {
  var size = content.getOuterSize();
  var width = size.width;
  var height = size.height;
  x = Math.min(x + width, viewWidth) - width;
  y = Math.min(y + height, viewHeight) - height;
  x = Math.max(x, 0);
  y = Math.max(y, 0);
  return [x, y];
}

function calcTooltipPosition(position, rect, contentSize) {
  var domWidth = contentSize[0];
  var domHeight = contentSize[1];
  var gap = 10;
  var offset = 5;
  var x = 0;
  var y = 0;
  var rectWidth = rect.width;
  var rectHeight = rect.height;

  switch (position) {
    case 'inside':
      x = rect.x + rectWidth / 2 - domWidth / 2;
      y = rect.y + rectHeight / 2 - domHeight / 2;
      break;

    case 'top':
      x = rect.x + rectWidth / 2 - domWidth / 2;
      y = rect.y - domHeight - gap;
      break;

    case 'bottom':
      x = rect.x + rectWidth / 2 - domWidth / 2;
      y = rect.y + rectHeight + gap;
      break;

    case 'left':
      x = rect.x - domWidth - gap - offset;
      y = rect.y + rectHeight / 2 - domHeight / 2;
      break;

    case 'right':
      x = rect.x + rectWidth + gap + offset;
      y = rect.y + rectHeight / 2 - domHeight / 2;
  }

  return [x, y];
}

function isCenterAlign(align) {
  return align === 'center' || align === 'middle';
}

function install$3(registers) {
  use(install$1);
  registers.registerComponentModel(TooltipModel);
  registers.registerComponentView(TooltipView);
  /**
   * @action
   * @property {string} type
   * @property {number} seriesIndex
   * @property {number} dataIndex
   * @property {number} [x]
   * @property {number} [y]
   */

  registers.registerAction({
    type: 'showTip',
    event: 'showTip',
    update: 'tooltip:manuallyShowTip'
  }, // noop
  function () {});
  registers.registerAction({
    type: 'hideTip',
    event: 'hideTip',
    update: 'tooltip:manuallyHideTip'
  }, // noop
  function () {});
}

var TitleModel =
/** @class */
function (_super) {
  __extends(TitleModel, _super);

  function TitleModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = TitleModel.type;
    _this.layoutMode = {
      type: 'box',
      ignoreSize: true
    };
    return _this;
  }

  TitleModel.type = 'title';
  TitleModel.defaultOption = {
    zlevel: 0,
    z: 6,
    show: true,
    text: '',
    target: 'blank',
    subtext: '',
    subtarget: 'blank',
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: '#ccc',
    borderWidth: 0,
    padding: 5,
    itemGap: 10,
    textStyle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#464646'
    },
    subtextStyle: {
      fontSize: 12,
      color: '#6E7079'
    }
  };
  return TitleModel;
}(ComponentModel); // View


var TitleView =
/** @class */
function (_super) {
  __extends(TitleView, _super);

  function TitleView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.type = TitleView.type;
    return _this;
  }

  TitleView.prototype.render = function (titleModel, ecModel, api) {
    this.group.removeAll();

    if (!titleModel.get('show')) {
      return;
    }

    var group = this.group;
    var textStyleModel = titleModel.getModel('textStyle');
    var subtextStyleModel = titleModel.getModel('subtextStyle');
    var textAlign = titleModel.get('textAlign');
    var textVerticalAlign = retrieve2(titleModel.get('textBaseline'), titleModel.get('textVerticalAlign'));
    var textEl = new ZRText({
      style: createTextStyle(textStyleModel, {
        text: titleModel.get('text'),
        fill: textStyleModel.getTextColor()
      }, {
        disableBox: true
      }),
      z2: 10
    });
    var textRect = textEl.getBoundingRect();
    var subText = titleModel.get('subtext');
    var subTextEl = new ZRText({
      style: createTextStyle(subtextStyleModel, {
        text: subText,
        fill: subtextStyleModel.getTextColor(),
        y: textRect.height + titleModel.get('itemGap'),
        verticalAlign: 'top'
      }, {
        disableBox: true
      }),
      z2: 10
    });
    var link = titleModel.get('link');
    var sublink = titleModel.get('sublink');
    var triggerEvent = titleModel.get('triggerEvent', true);
    textEl.silent = !link && !triggerEvent;
    subTextEl.silent = !sublink && !triggerEvent;

    if (link) {
      textEl.on('click', function () {
        windowOpen(link, '_' + titleModel.get('target'));
      });
    }

    if (sublink) {
      subTextEl.on('click', function () {
        windowOpen(sublink, '_' + titleModel.get('subtarget'));
      });
    }

    getECData(textEl).eventData = getECData(subTextEl).eventData = triggerEvent ? {
      componentType: 'title',
      componentIndex: titleModel.componentIndex
    } : null;
    group.add(textEl);
    subText && group.add(subTextEl); // If no subText, but add subTextEl, there will be an empty line.

    var groupRect = group.getBoundingRect();
    var layoutOption = titleModel.getBoxLayoutParams();
    layoutOption.width = groupRect.width;
    layoutOption.height = groupRect.height;
    var layoutRect = getLayoutRect(layoutOption, {
      width: api.getWidth(),
      height: api.getHeight()
    }, titleModel.get('padding')); // Adjust text align based on position

    if (!textAlign) {
      // Align left if title is on the left. center and right is same
      textAlign = titleModel.get('left') || titleModel.get('right'); // @ts-ignore

      if (textAlign === 'middle') {
        textAlign = 'center';
      } // Adjust layout by text align


      if (textAlign === 'right') {
        layoutRect.x += layoutRect.width;
      } else if (textAlign === 'center') {
        layoutRect.x += layoutRect.width / 2;
      }
    }

    if (!textVerticalAlign) {
      textVerticalAlign = titleModel.get('top') || titleModel.get('bottom'); // @ts-ignore

      if (textVerticalAlign === 'center') {
        textVerticalAlign = 'middle';
      }

      if (textVerticalAlign === 'bottom') {
        layoutRect.y += layoutRect.height;
      } else if (textVerticalAlign === 'middle') {
        layoutRect.y += layoutRect.height / 2;
      }

      textVerticalAlign = textVerticalAlign || 'top';
    }

    group.x = layoutRect.x;
    group.y = layoutRect.y;
    group.markRedraw();
    var alignStyle = {
      align: textAlign,
      verticalAlign: textVerticalAlign
    };
    textEl.setStyle(alignStyle);
    subTextEl.setStyle(alignStyle); // Render background
    // Get groupRect again because textAlign has been changed

    groupRect = group.getBoundingRect();
    var padding = layoutRect.margin;
    var style = titleModel.getItemStyle(['color', 'opacity']);
    style.fill = titleModel.get('backgroundColor');
    var rect = new Rect({
      shape: {
        x: groupRect.x - padding[3],
        y: groupRect.y - padding[0],
        width: groupRect.width + padding[1] + padding[3],
        height: groupRect.height + padding[0] + padding[2],
        r: titleModel.get('borderRadius')
      },
      style: style,
      subPixelOptimize: true,
      silent: true
    });
    group.add(rect);
  };

  TitleView.type = 'title';
  return TitleView;
}(ComponentView);

function install$4(registers) {
  registers.registerComponentModel(TitleModel);
  registers.registerComponentView(TitleView);
}

export { AxisBuilder as A, BaseAxisPointer as B, axisDefault as a, axisModelCreator as b, buildElStyle as c, buildLabelElOption as d, makeSectorShape as e, AxisView as f, install$1 as g, rectCoordAxisBuildSplitArea as h, install as i, buildCartesianSingleLabelElOption as j, getTransformedPosition as k, makeRectShape as l, makeLineShape as m, install$2 as n, install$3 as o, install$4 as p, rectCoordAxisHandleRemove as r };
