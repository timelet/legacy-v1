import { W as getLayoutRect, p as parsePercent, ac as linearMap, ch as limitTurnAngle, ci as limitSurfaceAngle, bk as shiftLayoutOnY, _ as __extends, x as Polyline, Z as ZRText, i as initProps, u as updateProps, j as setStatesStylesFromModel, cj as __assign, a as enableHoverEmphasis, s as setLabelStyle, g as getLabelStatesModels, ai as setLabelLineStyle, aj as getLabelLineStatesModels, f as Sector, G as Group, v as removeElementWithFadeOut, C as ChartView, U as makeSeriesEncodeForNameBased, ck as getPercentWithPrecision, X as defaultEmphasis, S as SeriesModel, Y as createLegacyDataSelectAction } from './dataSelectAction-16288cd0.js';
import { i as isArray, e as each, ae as Point, az as parsePercent$1, a as extend, a3 as retrieve3, q as bind, k as curry } from './IncrementalDisplayable-8ed2fa44.js';
import { c as createDimensions, L as List } from './createDimensions-312ead42.js';

var PI2 = Math.PI * 2;
var RADIAN = Math.PI / 180;

function getViewRect(seriesModel, api) {
  return getLayoutRect(seriesModel.getBoxLayoutParams(), {
    width: api.getWidth(),
    height: api.getHeight()
  });
}

function pieLayout(seriesType, ecModel, api) {
  ecModel.eachSeriesByType(seriesType, function (seriesModel) {
    var data = seriesModel.getData();
    var valueDim = data.mapDimension('value');
    var viewRect = getViewRect(seriesModel, api);
    var center = seriesModel.get('center');
    var radius = seriesModel.get('radius');

    if (!isArray(radius)) {
      radius = [0, radius];
    }

    if (!isArray(center)) {
      center = [center, center];
    }

    var width = parsePercent(viewRect.width, api.getWidth());
    var height = parsePercent(viewRect.height, api.getHeight());
    var size = Math.min(width, height);
    var cx = parsePercent(center[0], width) + viewRect.x;
    var cy = parsePercent(center[1], height) + viewRect.y;
    var r0 = parsePercent(radius[0], size / 2);
    var r = parsePercent(radius[1], size / 2);
    var startAngle = -seriesModel.get('startAngle') * RADIAN;
    var minAngle = seriesModel.get('minAngle') * RADIAN;
    var validDataCount = 0;
    data.each(valueDim, function (value) {
      !isNaN(value) && validDataCount++;
    });
    var sum = data.getSum(valueDim); // Sum may be 0

    var unitRadian = Math.PI / (sum || validDataCount) * 2;
    var clockwise = seriesModel.get('clockwise');
    var roseType = seriesModel.get('roseType');
    var stillShowZeroSum = seriesModel.get('stillShowZeroSum'); // [0...max]

    var extent = data.getDataExtent(valueDim);
    extent[0] = 0; // In the case some sector angle is smaller than minAngle

    var restAngle = PI2;
    var valueSumLargerThanMinAngle = 0;
    var currentAngle = startAngle;
    var dir = clockwise ? 1 : -1;
    data.setLayout({
      viewRect: viewRect,
      r: r
    });
    data.each(valueDim, function (value, idx) {
      var angle;

      if (isNaN(value)) {
        data.setItemLayout(idx, {
          angle: NaN,
          startAngle: NaN,
          endAngle: NaN,
          clockwise: clockwise,
          cx: cx,
          cy: cy,
          r0: r0,
          r: roseType ? NaN : r
        });
        return;
      } // FIXME 兼容 2.0 但是 roseType 是 area 的时候才是这样？


      if (roseType !== 'area') {
        angle = sum === 0 && stillShowZeroSum ? unitRadian : value * unitRadian;
      } else {
        angle = PI2 / validDataCount;
      }

      if (angle < minAngle) {
        angle = minAngle;
        restAngle -= minAngle;
      } else {
        valueSumLargerThanMinAngle += value;
      }

      var endAngle = currentAngle + dir * angle;
      data.setItemLayout(idx, {
        angle: angle,
        startAngle: currentAngle,
        endAngle: endAngle,
        clockwise: clockwise,
        cx: cx,
        cy: cy,
        r0: r0,
        r: roseType ? linearMap(value, extent, [r0, r]) : r
      });
      currentAngle = endAngle;
    }); // Some sector is constrained by minAngle
    // Rest sectors needs recalculate angle

    if (restAngle < PI2 && validDataCount) {
      // Average the angle if rest angle is not enough after all angles is
      // Constrained by minAngle
      if (restAngle <= 1e-3) {
        var angle_1 = PI2 / validDataCount;
        data.each(valueDim, function (value, idx) {
          if (!isNaN(value)) {
            var layout_1 = data.getItemLayout(idx);
            layout_1.angle = angle_1;
            layout_1.startAngle = startAngle + dir * idx * angle_1;
            layout_1.endAngle = startAngle + dir * (idx + 1) * angle_1;
          }
        });
      } else {
        unitRadian = restAngle / valueSumLargerThanMinAngle;
        currentAngle = startAngle;
        data.each(valueDim, function (value, idx) {
          if (!isNaN(value)) {
            var layout_2 = data.getItemLayout(idx);
            var angle = layout_2.angle === minAngle ? minAngle : value * unitRadian;
            layout_2.startAngle = currentAngle;
            layout_2.endAngle = currentAngle + dir * angle;
            currentAngle += dir * angle;
          }
        });
      }
    }
  });
}

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
function dataFilter(seriesType) {
  return {
    seriesType: seriesType,
    reset: function (seriesModel, ecModel) {
      var legendModels = ecModel.findComponents({
        mainType: 'legend'
      });

      if (!legendModels || !legendModels.length) {
        return;
      }

      var data = seriesModel.getData();
      data.filterSelf(function (idx) {
        var name = data.getName(idx); // If in any legend component the status is not selected.

        for (var i = 0; i < legendModels.length; i++) {
          // @ts-ignore FIXME: LegendModel
          if (!legendModels[i].isSelected(name)) {
            return false;
          }
        }

        return true;
      });
    }
  };
}

var RADIAN$1 = Math.PI / 180;

function adjustSingleSide(list, cx, cy, r, dir, viewWidth, viewHeight, viewLeft, viewTop, farthestX) {
  if (list.length < 2) {
    return;
  }

  function recalculateXOnSemiToAlignOnEllipseCurve(semi) {
    var rB = semi.rB;
    var rB2 = rB * rB;

    for (var i = 0; i < semi.list.length; i++) {
      var item = semi.list[i];
      var dy = Math.abs(item.label.y - cy); // horizontal r is always same with original r because x is not changed.

      var rA = r + item.len;
      var rA2 = rA * rA; // Use ellipse implicit function to calculate x

      var dx = Math.sqrt((1 - Math.abs(dy * dy / rB2)) * rA2);
      item.label.x = cx + (dx + item.len2) * dir;
    }
  } // Adjust X based on the shifted y. Make tight labels aligned on an ellipse curve.


  function recalculateX(items) {
    // Extremes of
    var topSemi = {
      list: [],
      maxY: 0
    };
    var bottomSemi = {
      list: [],
      maxY: 0
    };

    for (var i = 0; i < items.length; i++) {
      if (items[i].labelAlignTo !== 'none') {
        continue;
      }

      var item = items[i];
      var semi = item.label.y > cy ? bottomSemi : topSemi;
      var dy = Math.abs(item.label.y - cy);

      if (dy > semi.maxY) {
        var dx = item.label.x - cx - item.len2 * dir; // horizontal r is always same with original r because x is not changed.

        var rA = r + item.len; // Canculate rB based on the topest / bottemest label.

        var rB = Math.abs(dx) < rA ? Math.sqrt(dy * dy / (1 - dx * dx / rA / rA)) : rA;
        semi.rB = rB;
        semi.maxY = dy;
      }

      semi.list.push(item);
    }

    recalculateXOnSemiToAlignOnEllipseCurve(topSemi);
    recalculateXOnSemiToAlignOnEllipseCurve(bottomSemi);
  }

  var len = list.length;

  for (var i = 0; i < len; i++) {
    if (list[i].position === 'outer' && list[i].labelAlignTo === 'labelLine') {
      var dx = list[i].label.x - farthestX;
      list[i].linePoints[1][0] += dx;
      list[i].label.x = farthestX;
    }
  }

  if (shiftLayoutOnY(list, viewTop, viewTop + viewHeight)) {
    recalculateX(list);
  }
}

function avoidOverlap(labelLayoutList, cx, cy, r, viewWidth, viewHeight, viewLeft, viewTop) {
  var leftList = [];
  var rightList = [];
  var leftmostX = Number.MAX_VALUE;
  var rightmostX = -Number.MAX_VALUE;

  for (var i = 0; i < labelLayoutList.length; i++) {
    var label = labelLayoutList[i].label;

    if (isPositionCenter(labelLayoutList[i])) {
      continue;
    }

    if (label.x < cx) {
      leftmostX = Math.min(leftmostX, label.x);
      leftList.push(labelLayoutList[i]);
    } else {
      rightmostX = Math.max(rightmostX, label.x);
      rightList.push(labelLayoutList[i]);
    }
  }

  adjustSingleSide(rightList, cx, cy, r, 1, viewWidth, viewHeight, viewLeft, viewTop, rightmostX);
  adjustSingleSide(leftList, cx, cy, r, -1, viewWidth, viewHeight, viewLeft, viewTop, leftmostX);

  for (var i = 0; i < labelLayoutList.length; i++) {
    var layout = labelLayoutList[i];
    var label = layout.label;

    if (isPositionCenter(layout)) {
      continue;
    }

    var linePoints = layout.linePoints;

    if (linePoints) {
      var isAlignToEdge = layout.labelAlignTo === 'edge';
      var realTextWidth = layout.rect.width;
      var targetTextWidth = void 0;

      if (isAlignToEdge) {
        if (label.x < cx) {
          targetTextWidth = linePoints[2][0] - layout.labelDistance - viewLeft - layout.edgeDistance;
        } else {
          targetTextWidth = viewLeft + viewWidth - layout.edgeDistance - linePoints[2][0] - layout.labelDistance;
        }
      } else {
        if (label.x < cx) {
          targetTextWidth = label.x - viewLeft - layout.bleedMargin;
        } else {
          targetTextWidth = viewLeft + viewWidth - label.x - layout.bleedMargin;
        }
      }

      if (targetTextWidth < layout.rect.width) {
        // TODOTODO
        // layout.text = textContain.truncateText(layout.text, targetTextWidth, layout.font);
        layout.label.style.width = targetTextWidth;

        if (layout.labelAlignTo === 'edge') {
          realTextWidth = targetTextWidth; // realTextWidth = textContain.getWidth(layout.text, layout.font);
        }
      }

      var dist = linePoints[1][0] - linePoints[2][0];

      if (isAlignToEdge) {
        if (label.x < cx) {
          linePoints[2][0] = viewLeft + layout.edgeDistance + realTextWidth + layout.labelDistance;
        } else {
          linePoints[2][0] = viewLeft + viewWidth - layout.edgeDistance - realTextWidth - layout.labelDistance;
        }
      } else {
        if (label.x < cx) {
          linePoints[2][0] = label.x + layout.labelDistance;
        } else {
          linePoints[2][0] = label.x - layout.labelDistance;
        }

        linePoints[1][0] = linePoints[2][0] + dist;
      }

      linePoints[1][1] = linePoints[2][1] = label.y;
    }
  }
}

function isPositionCenter(sectorShape) {
  // Not change x for center label
  return sectorShape.position === 'center';
}

function pieLabelLayout(seriesModel) {
  var data = seriesModel.getData();
  var labelLayoutList = [];
  var cx;
  var cy;
  var hasLabelRotate = false;
  var minShowLabelRadian = (seriesModel.get('minShowLabelAngle') || 0) * RADIAN$1;
  var viewRect = data.getLayout('viewRect');
  var r = data.getLayout('r');
  var viewWidth = viewRect.width;
  var viewLeft = viewRect.x;
  var viewTop = viewRect.y;
  var viewHeight = viewRect.height;

  function setNotShow(el) {
    el.ignore = true;
  }

  function isLabelShown(label) {
    if (!label.ignore) {
      return true;
    }

    for (var key in label.states) {
      if (label.states[key].ignore === false) {
        return true;
      }
    }

    return false;
  }

  data.each(function (idx) {
    var sector = data.getItemGraphicEl(idx);
    var sectorShape = sector.shape;
    var label = sector.getTextContent();
    var labelLine = sector.getTextGuideLine();
    var itemModel = data.getItemModel(idx);
    var labelModel = itemModel.getModel('label'); // Use position in normal or emphasis

    var labelPosition = labelModel.get('position') || itemModel.get(['emphasis', 'label', 'position']);
    var labelDistance = labelModel.get('distanceToLabelLine');
    var labelAlignTo = labelModel.get('alignTo');
    var edgeDistance = parsePercent(labelModel.get('edgeDistance'), viewWidth);
    var bleedMargin = labelModel.get('bleedMargin');
    var labelLineModel = itemModel.getModel('labelLine');
    var labelLineLen = labelLineModel.get('length');
    labelLineLen = parsePercent(labelLineLen, viewWidth);
    var labelLineLen2 = labelLineModel.get('length2');
    labelLineLen2 = parsePercent(labelLineLen2, viewWidth);

    if (Math.abs(sectorShape.endAngle - sectorShape.startAngle) < minShowLabelRadian) {
      each(label.states, setNotShow);
      label.ignore = true;
      return;
    }

    if (!isLabelShown(label)) {
      return;
    }

    var midAngle = (sectorShape.startAngle + sectorShape.endAngle) / 2;
    var nx = Math.cos(midAngle);
    var ny = Math.sin(midAngle);
    var textX;
    var textY;
    var linePoints;
    var textAlign;
    cx = sectorShape.cx;
    cy = sectorShape.cy;
    var isLabelInside = labelPosition === 'inside' || labelPosition === 'inner';

    if (labelPosition === 'center') {
      textX = sectorShape.cx;
      textY = sectorShape.cy;
      textAlign = 'center';
    } else {
      var x1 = (isLabelInside ? (sectorShape.r + sectorShape.r0) / 2 * nx : sectorShape.r * nx) + cx;
      var y1 = (isLabelInside ? (sectorShape.r + sectorShape.r0) / 2 * ny : sectorShape.r * ny) + cy;
      textX = x1 + nx * 3;
      textY = y1 + ny * 3;

      if (!isLabelInside) {
        // For roseType
        var x2 = x1 + nx * (labelLineLen + r - sectorShape.r);
        var y2 = y1 + ny * (labelLineLen + r - sectorShape.r);
        var x3 = x2 + (nx < 0 ? -1 : 1) * labelLineLen2;
        var y3 = y2;

        if (labelAlignTo === 'edge') {
          // Adjust textX because text align of edge is opposite
          textX = nx < 0 ? viewLeft + edgeDistance : viewLeft + viewWidth - edgeDistance;
        } else {
          textX = x3 + (nx < 0 ? -labelDistance : labelDistance);
        }

        textY = y3;
        linePoints = [[x1, y1], [x2, y2], [x3, y3]];
      }

      textAlign = isLabelInside ? 'center' : labelAlignTo === 'edge' ? nx > 0 ? 'right' : 'left' : nx > 0 ? 'left' : 'right';
    }

    var labelRotate;
    var rotate = labelModel.get('rotate');

    if (typeof rotate === 'number') {
      labelRotate = rotate * (Math.PI / 180);
    } else {
      labelRotate = rotate ? nx < 0 ? -midAngle + Math.PI : -midAngle : 0;
    }

    hasLabelRotate = !!labelRotate;
    label.x = textX;
    label.y = textY;
    label.rotation = labelRotate;
    label.setStyle({
      verticalAlign: 'middle'
    }); // Not sectorShape the inside label

    if (!isLabelInside) {
      var textRect = label.getBoundingRect().clone();
      textRect.applyTransform(label.getComputedTransform()); // Text has a default 1px stroke. Exclude this.

      var margin = (label.style.margin || 0) + 2.1;
      textRect.y -= margin / 2;
      textRect.height += margin;
      labelLayoutList.push({
        label: label,
        labelLine: labelLine,
        position: labelPosition,
        len: labelLineLen,
        len2: labelLineLen2,
        minTurnAngle: labelLineModel.get('minTurnAngle'),
        maxSurfaceAngle: labelLineModel.get('maxSurfaceAngle'),
        surfaceNormal: new Point(nx, ny),
        linePoints: linePoints,
        textAlign: textAlign,
        labelDistance: labelDistance,
        labelAlignTo: labelAlignTo,
        edgeDistance: edgeDistance,
        bleedMargin: bleedMargin,
        rect: textRect
      });
    } else {
      label.setStyle({
        align: textAlign
      });
      var selectState = label.states.select;

      if (selectState) {
        selectState.x += label.x;
        selectState.y += label.y;
      }
    }

    sector.setTextConfig({
      inside: isLabelInside
    });
  });

  if (!hasLabelRotate && seriesModel.get('avoidLabelOverlap')) {
    avoidOverlap(labelLayoutList, cx, cy, r, viewWidth, viewHeight, viewLeft, viewTop);
  }

  for (var i = 0; i < labelLayoutList.length; i++) {
    var layout = labelLayoutList[i];
    var label = layout.label;
    var labelLine = layout.labelLine;
    var notShowLabel = isNaN(label.x) || isNaN(label.y);

    if (label) {
      label.setStyle({
        align: layout.textAlign
      });

      if (notShowLabel) {
        each(label.states, setNotShow);
        label.ignore = true;
      }

      var selectState = label.states.select;

      if (selectState) {
        selectState.x += label.x;
        selectState.y += label.y;
      }
    }

    if (labelLine) {
      var linePoints = layout.linePoints;

      if (notShowLabel || !linePoints) {
        each(labelLine.states, setNotShow);
        labelLine.ignore = true;
      } else {
        limitTurnAngle(linePoints, layout.minTurnAngle);
        limitSurfaceAngle(linePoints, layout.surfaceNormal, layout.maxSurfaceAngle);
        labelLine.setShape({
          points: linePoints
        }); // Set the anchor to the midpoint of sector

        label.__hostTarget.textGuideLineConfig = {
          anchor: new Point(linePoints[0][0], linePoints[0][1])
        };
      }
    }
  }
}

function getSectorCornerRadius(model, shape) {
  var cornerRadius = model.get('borderRadius');

  if (cornerRadius == null) {
    return null;
  }

  if (!isArray(cornerRadius)) {
    cornerRadius = [cornerRadius, cornerRadius];
  }

  return {
    innerCornerRadius: parsePercent$1(cornerRadius[0], shape.r0),
    cornerRadius: parsePercent$1(cornerRadius[1], shape.r)
  };
}

/**
 * Piece of pie including Sector, Label, LabelLine
 */

var PiePiece =
/** @class */
function (_super) {
  __extends(PiePiece, _super);

  function PiePiece(data, idx, startAngle) {
    var _this = _super.call(this) || this;

    _this.z2 = 2;
    var polyline = new Polyline();
    var text = new ZRText();

    _this.setTextGuideLine(polyline);

    _this.setTextContent(text);

    _this.updateData(data, idx, startAngle, true);

    return _this;
  }

  PiePiece.prototype.updateData = function (data, idx, startAngle, firstCreate) {
    var sector = this;
    var seriesModel = data.hostModel;
    var itemModel = data.getItemModel(idx);
    var emphasisModel = itemModel.getModel('emphasis');
    var layout = data.getItemLayout(idx);
    var sectorShape = extend(getSectorCornerRadius(itemModel.getModel('itemStyle'), layout) || {}, layout);

    if (firstCreate) {
      sector.setShape(sectorShape);
      var animationType = seriesModel.getShallow('animationType');

      if (animationType === 'scale') {
        sector.shape.r = layout.r0;
        initProps(sector, {
          shape: {
            r: layout.r
          }
        }, seriesModel, idx);
      } // Expansion
      else {
          if (startAngle != null) {
            sector.setShape({
              startAngle: startAngle,
              endAngle: startAngle
            });
            initProps(sector, {
              shape: {
                startAngle: layout.startAngle,
                endAngle: layout.endAngle
              }
            }, seriesModel, idx);
          } else {
            sector.shape.endAngle = layout.startAngle;
            updateProps(sector, {
              shape: {
                endAngle: layout.endAngle
              }
            }, seriesModel, idx);
          }
        }
    } else {
      // Transition animation from the old shape
      updateProps(sector, {
        shape: sectorShape
      }, seriesModel, idx);
    }

    sector.useStyle(data.getItemVisual(idx, 'style'));
    setStatesStylesFromModel(sector, itemModel);
    var midAngle = (layout.startAngle + layout.endAngle) / 2;
    var offset = seriesModel.get('selectedOffset');
    var dx = Math.cos(midAngle) * offset;
    var dy = Math.sin(midAngle) * offset;
    var cursorStyle = itemModel.getShallow('cursor');
    cursorStyle && sector.attr('cursor', cursorStyle);

    this._updateLabel(seriesModel, data, idx);

    sector.ensureState('emphasis').shape = __assign({
      r: layout.r + (emphasisModel.get('scale') ? emphasisModel.get('scaleSize') || 0 : 0)
    }, getSectorCornerRadius(emphasisModel.getModel('itemStyle'), layout));
    extend(sector.ensureState('select'), {
      x: dx,
      y: dy,
      shape: getSectorCornerRadius(itemModel.getModel(['select', 'itemStyle']), layout)
    });
    extend(sector.ensureState('blur'), {
      shape: getSectorCornerRadius(itemModel.getModel(['blur', 'itemStyle']), layout)
    });
    var labelLine = sector.getTextGuideLine();
    var labelText = sector.getTextContent();
    labelLine && extend(labelLine.ensureState('select'), {
      x: dx,
      y: dy
    }); // TODO: needs dx, dy in zrender?

    extend(labelText.ensureState('select'), {
      x: dx,
      y: dy
    });
    enableHoverEmphasis(this, emphasisModel.get('focus'), emphasisModel.get('blurScope'));
  };

  PiePiece.prototype._updateLabel = function (seriesModel, data, idx) {
    var _a;

    var sector = this;
    var itemModel = data.getItemModel(idx);
    var labelLineModel = itemModel.getModel('labelLine');
    var style = data.getItemVisual(idx, 'style');
    var visualColor = style && style.fill;
    var visualOpacity = style && style.opacity;
    setLabelStyle(sector, getLabelStatesModels(itemModel), {
      labelFetcher: data.hostModel,
      labelDataIndex: idx,
      inheritColor: visualColor,
      defaultOpacity: visualOpacity,
      defaultText: seriesModel.getFormattedLabel(idx, 'normal') || data.getName(idx)
    });
    var labelText = sector.getTextContent(); // Set textConfig on sector.

    sector.setTextConfig({
      // reset position, rotation
      position: null,
      rotation: null
    }); // Make sure update style on labelText after setLabelStyle.
    // Because setLabelStyle will replace a new style on it.

    labelText.attr({
      z2: 10
    });
    var labelPosition = seriesModel.get(['label', 'position']);

    if (labelPosition !== 'outside' && labelPosition !== 'outer') {
      (_a = sector.getTextGuideLine()) === null || _a === void 0 ? void 0 : _a.hide();
      return;
    } // Default use item visual color


    setLabelLineStyle(this, getLabelLineStatesModels(itemModel), {
      stroke: visualColor,
      opacity: retrieve3(labelLineModel.get(['lineStyle', 'opacity']), visualOpacity, 1)
    });
  };

  return PiePiece;
}(Sector); // Pie view


var PieView =
/** @class */
function (_super) {
  __extends(PieView, _super);

  function PieView() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.ignoreLabelLineUpdate = true;
    return _this;
  }

  PieView.prototype.init = function () {
    var sectorGroup = new Group();
    this._sectorGroup = sectorGroup;
  };

  PieView.prototype.render = function (seriesModel, ecModel, api, payload) {
    var data = seriesModel.getData();
    var oldData = this._data;
    var group = this.group;
    var startAngle; // First render

    if (!oldData && data.count() > 0) {
      var shape = data.getItemLayout(0);

      for (var s = 1; isNaN(shape && shape.startAngle) && s < data.count(); ++s) {
        shape = data.getItemLayout(s);
      }

      if (shape) {
        startAngle = shape.startAngle;
      }
    }

    data.diff(oldData).add(function (idx) {
      var piePiece = new PiePiece(data, idx, startAngle);
      data.setItemGraphicEl(idx, piePiece);
      group.add(piePiece);
    }).update(function (newIdx, oldIdx) {
      var piePiece = oldData.getItemGraphicEl(oldIdx);
      piePiece.updateData(data, newIdx, startAngle);
      piePiece.off('click');
      group.add(piePiece);
      data.setItemGraphicEl(newIdx, piePiece);
    }).remove(function (idx) {
      var piePiece = oldData.getItemGraphicEl(idx);
      removeElementWithFadeOut(piePiece, seriesModel, idx);
    }).execute();
    pieLabelLayout(seriesModel); // Always use initial animation.

    if (seriesModel.get('animationTypeUpdate') !== 'expansion') {
      this._data = data;
    }
  };

  PieView.prototype.dispose = function () {};

  PieView.prototype.containPoint = function (point, seriesModel) {
    var data = seriesModel.getData();
    var itemLayout = data.getItemLayout(0);

    if (itemLayout) {
      var dx = point[0] - itemLayout.cx;
      var dy = point[1] - itemLayout.cy;
      var radius = Math.sqrt(dx * dx + dy * dy);
      return radius <= itemLayout.r && radius >= itemLayout.r0;
    }
  };

  PieView.type = 'pie';
  return PieView;
}(ChartView);

/**
 * [Usage]:
 * (1)
 * createListSimply(seriesModel, ['value']);
 * (2)
 * createListSimply(seriesModel, {
 *     coordDimensions: ['value'],
 *     dimensionsCount: 5
 * });
 */

function createListSimply(seriesModel, opt, nameList) {
  opt = isArray(opt) && {
    coordDimensions: opt
  } || extend({}, opt);
  var source = seriesModel.getSource();
  var dimensionsInfo = createDimensions(source, opt);
  var list = new List(dimensionsInfo, seriesModel);
  list.initData(source, nameList);
  return list;
}

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

/**
 * LegendVisualProvider is an bridge that pick encoded color from data and
 * provide to the legend component.
 */
var LegendVisualProvider =
/** @class */
function () {
  function LegendVisualProvider( // Function to get data after filtered. It stores all the encoding info
  getDataWithEncodedVisual, // Function to get raw data before filtered.
  getRawData) {
    this._getDataWithEncodedVisual = getDataWithEncodedVisual;
    this._getRawData = getRawData;
  }

  LegendVisualProvider.prototype.getAllNames = function () {
    var rawData = this._getRawData(); // We find the name from the raw data. In case it's filtered by the legend component.
    // Normally, the name can be found in rawData, but can't be found in filtered data will display as gray.


    return rawData.mapArray(rawData.getName);
  };

  LegendVisualProvider.prototype.containName = function (name) {
    var rawData = this._getRawData();

    return rawData.indexOfName(name) >= 0;
  };

  LegendVisualProvider.prototype.indexOfName = function (name) {
    // Only get data when necessary.
    // Because LegendVisualProvider constructor may be new in the stage that data is not prepared yet.
    // Invoking Series#getData immediately will throw an error.
    var dataWithEncodedVisual = this._getDataWithEncodedVisual();

    return dataWithEncodedVisual.indexOfName(name);
  };

  LegendVisualProvider.prototype.getItemVisual = function (dataIndex, key) {
    // Get encoded visual properties from final filtered data.
    var dataWithEncodedVisual = this._getDataWithEncodedVisual();

    return dataWithEncodedVisual.getItemVisual(dataIndex, key);
  };

  return LegendVisualProvider;
}();

var PieSeriesModel =
/** @class */
function (_super) {
  __extends(PieSeriesModel, _super);

  function PieSeriesModel() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.useColorPaletteOnData = true;
    return _this;
  }
  /**
   * @overwrite
   */


  PieSeriesModel.prototype.init = function (option) {
    _super.prototype.init.apply(this, arguments); // Enable legend selection for each data item
    // Use a function instead of direct access because data reference may changed


    this.legendVisualProvider = new LegendVisualProvider(bind(this.getData, this), bind(this.getRawData, this));

    this._defaultLabelLine(option);
  };
  /**
   * @overwrite
   */


  PieSeriesModel.prototype.mergeOption = function () {
    _super.prototype.mergeOption.apply(this, arguments);
  };
  /**
   * @overwrite
   */


  PieSeriesModel.prototype.getInitialData = function () {
    return createListSimply(this, {
      coordDimensions: ['value'],
      encodeDefaulter: curry(makeSeriesEncodeForNameBased, this)
    });
  };
  /**
   * @overwrite
   */


  PieSeriesModel.prototype.getDataParams = function (dataIndex) {
    var data = this.getData();

    var params = _super.prototype.getDataParams.call(this, dataIndex); // FIXME toFixed?


    var valueList = [];
    data.each(data.mapDimension('value'), function (value) {
      valueList.push(value);
    });
    params.percent = getPercentWithPrecision(valueList, dataIndex, data.hostModel.get('percentPrecision'));
    params.$vars.push('percent');
    return params;
  };

  PieSeriesModel.prototype._defaultLabelLine = function (option) {
    // Extend labelLine emphasis
    defaultEmphasis(option, 'labelLine', ['show']);
    var labelLineNormalOpt = option.labelLine;
    var labelLineEmphasisOpt = option.emphasis.labelLine; // Not show label line if `label.normal.show = false`

    labelLineNormalOpt.show = labelLineNormalOpt.show && option.label.show;
    labelLineEmphasisOpt.show = labelLineEmphasisOpt.show && option.emphasis.label.show;
  };

  PieSeriesModel.type = 'series.pie';
  PieSeriesModel.defaultOption = {
    zlevel: 0,
    z: 2,
    legendHoverLink: true,
    // 默认全局居中
    center: ['50%', '50%'],
    radius: [0, '75%'],
    // 默认顺时针
    clockwise: true,
    startAngle: 90,
    // 最小角度改为0
    minAngle: 0,
    // If the angle of a sector less than `minShowLabelAngle`,
    // the label will not be displayed.
    minShowLabelAngle: 0,
    // 选中时扇区偏移量
    selectedOffset: 10,
    // 选择模式，默认关闭，可选single，multiple
    // selectedMode: false,
    // 南丁格尔玫瑰图模式，'radius'（半径） | 'area'（面积）
    // roseType: null,
    percentPrecision: 2,
    // If still show when all data zero.
    stillShowZeroSum: true,
    // cursor: null,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: null,
    height: null,
    label: {
      // color: 'inherit',
      // If rotate around circle
      rotate: 0,
      show: true,
      overflow: 'truncate',
      // 'outer', 'inside', 'center'
      position: 'outer',
      // 'none', 'labelLine', 'edge'. Works only when position is 'outer'
      alignTo: 'none',
      // Closest distance between label and chart edge.
      // Works only position is 'outer' and alignTo is 'edge'.
      edgeDistance: '25%',
      // Works only position is 'outer' and alignTo is not 'edge'.
      bleedMargin: 10,
      // Distance between text and label line.
      distanceToLabelLine: 5 // formatter: 标签文本格式器，同Tooltip.formatter，不支持异步回调
      // 默认使用全局文本样式，详见TEXTSTYLE
      // distance: 当position为inner时有效，为label位置到圆心的距离与圆半径(环状图为内外半径和)的比例系数

    },
    // Enabled when label.normal.position is 'outer'
    labelLine: {
      show: true,
      // 引导线两段中的第一段长度
      length: 15,
      // 引导线两段中的第二段长度
      length2: 15,
      smooth: false,
      minTurnAngle: 90,
      maxSurfaceAngle: 90,
      lineStyle: {
        // color: 各异,
        width: 1,
        type: 'solid'
      }
    },
    itemStyle: {
      borderWidth: 1
    },
    labelLayout: {
      // Hide the overlapped label.
      hideOverlap: true
    },
    emphasis: {
      scale: true,
      scaleSize: 5
    },
    // If use strategy to avoid label overlapping
    avoidLabelOverlap: true,
    // Animation type. Valid values: expansion, scale
    animationType: 'expansion',
    animationDuration: 1000,
    // Animation type when update. Valid values: transition, expansion
    animationTypeUpdate: 'transition',
    animationEasingUpdate: 'cubicInOut',
    animationDurationUpdate: 500,
    animationEasing: 'cubicInOut'
  };
  return PieSeriesModel;
}(SeriesModel);

function install(registers) {
  registers.registerChartView(PieView);
  registers.registerSeriesModel(PieSeriesModel);
  createLegacyDataSelectAction('pie', registers.registerAction);
  registers.registerLayout(curry(pieLayout, 'pie'));
  registers.registerProcessor(dataFilter('pie'));
}

export { LegendVisualProvider as L, createListSimply as c, dataFilter as d, getSectorCornerRadius as g, install as i };
