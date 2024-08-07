import {
  require_react
} from "./chunk-4SFRHSJ3.js";
import {
  __commonJS,
  __toESM
} from "./chunk-EQCVQC35.js";

// node_modules/classnames/index.js
var require_classnames = __commonJS({
  "node_modules/classnames/index.js"(exports, module) {
    (function() {
      "use strict";
      var hasOwn = {}.hasOwnProperty;
      function classNames() {
        var classes = "";
        for (var i2 = 0; i2 < arguments.length; i2++) {
          var arg = arguments[i2];
          if (arg) {
            classes = appendClass(classes, parseValue(arg));
          }
        }
        return classes;
      }
      function parseValue(arg) {
        if (typeof arg === "string" || typeof arg === "number") {
          return arg;
        }
        if (typeof arg !== "object") {
          return "";
        }
        if (Array.isArray(arg)) {
          return classNames.apply(null, arg);
        }
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
          return arg.toString();
        }
        var classes = "";
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes = appendClass(classes, key);
          }
        }
        return classes;
      }
      function appendClass(value, newClass) {
        if (!newClass) {
          return value;
        }
        if (value) {
          return value + " " + newClass;
        }
        return value + newClass;
      }
      if (typeof module !== "undefined" && module.exports) {
        classNames.default = classNames;
        module.exports = classNames;
      } else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
        define("classnames", [], function() {
          return classNames;
        });
      } else {
        window.classNames = classNames;
      }
    })();
  }
});

// node_modules/react-tooltip/dist/react-tooltip.min.mjs
var import_react = __toESM(require_react(), 1);

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var sides = ["top", "right", "bottom", "left"];
var alignments = ["start", "end"];
var placements = sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
  x: v,
  y: v
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
var oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x: x2,
    y: y2,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y2,
    left: x2,
    right: x2 + width,
    bottom: y2 + height,
    x: x2,
    y: y2
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x: x2,
    y: y2
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i2 = 0; i2 < validMiddleware.length; i2++) {
    const {
      name,
      fn
    } = validMiddleware[i2];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x: x2,
      y: y2,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x2 = nextX != null ? nextX : x2;
    y2 = nextY != null ? nextY : y2;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x: x2,
          y: y2
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i2 = -1;
    }
  }
  return {
    x: x2,
    y: y2,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x2,
    y: y2,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x: x2,
    y: y2,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x: x2,
      y: y2,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x: x2,
      y: y2
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset3 = clamp(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset3 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset3,
        centerOffset: center - offset3 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a2, b2) => a2.overflows[1] - b2.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a2, b2) => a2[1] - b2[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x: x2,
        y: y2,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x2 + diffCoords.x,
        y: y2 + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x: x2,
        y: y2,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x3,
              y: y3
            } = _ref;
            return {
              x: x3,
              y: y3
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x: x2,
        y: y2
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x2,
          y: limitedCoords.y - y2
        }
      };
    }
  };
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e2) {
      return false;
    }
  });
}
function isContainingBlock(element) {
  const webkit = isWebKit();
  const css = getComputedStyle2(element);
  return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isTopLayer(currentNode)) {
      return null;
    }
    if (isContainingBlock(currentNode)) {
      return currentNode;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $: $2
  } = getCssDimensions(domElement);
  let x2 = ($2 ? round(rect.width) : rect.width) / width;
  let y2 = ($2 ? round(rect.height) : rect.height) / height;
  if (!x2 || !Number.isFinite(x2)) {
    x2 = 1;
  }
  if (!y2 || !Number.isFinite(y2)) {
    y2 = 1;
  }
  return {
    x: x2,
    y: y2
  };
}
var noOffsets = createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x2 = (clientRect.left + visualOffsets.x) / scale.x;
  let y2 = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = currentWin.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x2 *= iframeScale.x;
      y2 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x2 += left;
      y2 += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = currentWin.frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x: x2,
    y: y2
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x2 = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y2 = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x2 += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x2 = 0;
  let y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x2 = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x2 = left * scale.x;
  const y2 = top * scale.y;
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x2 = rect.left + scroll.scrollLeft - offsets.x;
  const y2 = rect.top + scroll.scrollTop - offsets.y;
  return {
    x: x2,
    y: y2,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e2) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var arrow2 = arrow;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/react-tooltip/dist/react-tooltip.min.mjs
var import_classnames = __toESM(require_classnames(), 1);
var h = "react-tooltip-core-styles";
var w = "react-tooltip-base-styles";
var b = { core: false, base: false };
function S({ css: e2, id: t2 = w, type: o2 = "base", ref: r2 }) {
  var l2, n2;
  if (!e2 || "undefined" == typeof document || b[o2]) return;
  if ("core" === o2 && "undefined" != typeof process && (null === (l2 = null === process || void 0 === process ? void 0 : process.env) || void 0 === l2 ? void 0 : l2.REACT_TOOLTIP_DISABLE_CORE_STYLES)) return;
  if ("base" !== o2 && "undefined" != typeof process && (null === (n2 = null === process || void 0 === process ? void 0 : process.env) || void 0 === n2 ? void 0 : n2.REACT_TOOLTIP_DISABLE_BASE_STYLES)) return;
  "core" === o2 && (t2 = h), r2 || (r2 = {});
  const { insertAt: c2 } = r2;
  if (document.getElementById(t2)) return void console.warn(`[react-tooltip] Element with id '${t2}' already exists. Call \`removeStyle()\` first`);
  const i2 = document.head || document.getElementsByTagName("head")[0], s2 = document.createElement("style");
  s2.id = t2, s2.type = "text/css", "top" === c2 && i2.firstChild ? i2.insertBefore(s2, i2.firstChild) : i2.appendChild(s2), s2.styleSheet ? s2.styleSheet.cssText = e2 : s2.appendChild(document.createTextNode(e2)), b[o2] = true;
}
function g({ type: e2 = "base", id: t2 = w } = {}) {
  if (!b[e2]) return;
  "core" === e2 && (t2 = h);
  const o2 = document.getElementById(t2);
  "style" === (null == o2 ? void 0 : o2.tagName) ? null == o2 || o2.remove() : console.warn(`[react-tooltip] Failed to remove 'style' element with id '${t2}'. Call \`injectStyle()\` first`), b[e2] = false;
}
var E = async ({ elementReference: e2 = null, tooltipReference: t2 = null, tooltipArrowReference: o2 = null, place: r2 = "top", offset: l2 = 10, strategy: n2 = "absolute", middlewares: c2 = [offset2(Number(l2)), flip2({ fallbackAxisSideDirection: "start" }), shift2({ padding: 5 })], border: i2 }) => {
  if (!e2) return { tooltipStyles: {}, tooltipArrowStyles: {}, place: r2 };
  if (null === t2) return { tooltipStyles: {}, tooltipArrowStyles: {}, place: r2 };
  const s2 = c2;
  return o2 ? (s2.push(arrow2({ element: o2, padding: 5 })), computePosition2(e2, t2, { placement: r2, strategy: n2, middleware: s2 }).then(({ x: e3, y: t3, placement: o3, middlewareData: r3 }) => {
    var l3, n3;
    const c3 = { left: `${e3}px`, top: `${t3}px`, border: i2 }, { x: s3, y: a2 } = null !== (l3 = r3.arrow) && void 0 !== l3 ? l3 : { x: 0, y: 0 }, u = null !== (n3 = { top: "bottom", right: "left", bottom: "top", left: "right" }[o3.split("-")[0]]) && void 0 !== n3 ? n3 : "bottom", d = i2 && { borderBottom: i2, borderRight: i2 };
    let p = 0;
    if (i2) {
      const e4 = `${i2}`.match(/(\d+)px/);
      p = (null == e4 ? void 0 : e4[1]) ? Number(e4[1]) : 1;
    }
    return { tooltipStyles: c3, tooltipArrowStyles: { left: null != s3 ? `${s3}px` : "", top: null != a2 ? `${a2}px` : "", right: "", bottom: "", ...d, [u]: `-${4 + p}px` }, place: o3 };
  })) : computePosition2(e2, t2, { placement: "bottom", strategy: n2, middleware: s2 }).then(({ x: e3, y: t3, placement: o3 }) => ({ tooltipStyles: { left: `${e3}px`, top: `${t3}px` }, tooltipArrowStyles: {}, place: o3 }));
};
var A = (e2, t2) => !("CSS" in window && "supports" in window.CSS) || window.CSS.supports(e2, t2);
var _ = (e2, t2, o2) => {
  let r2 = null;
  const l2 = function(...l3) {
    const n2 = () => {
      r2 = null, o2 || e2.apply(this, l3);
    };
    o2 && !r2 && (e2.apply(this, l3), r2 = setTimeout(n2, t2)), o2 || (r2 && clearTimeout(r2), r2 = setTimeout(n2, t2));
  };
  return l2.cancel = () => {
    r2 && (clearTimeout(r2), r2 = null);
  }, l2;
};
var O = (e2) => null !== e2 && !Array.isArray(e2) && "object" == typeof e2;
var T = (e2, t2) => {
  if (e2 === t2) return true;
  if (Array.isArray(e2) && Array.isArray(t2)) return e2.length === t2.length && e2.every((e3, o3) => T(e3, t2[o3]));
  if (Array.isArray(e2) !== Array.isArray(t2)) return false;
  if (!O(e2) || !O(t2)) return e2 === t2;
  const o2 = Object.keys(e2), r2 = Object.keys(t2);
  return o2.length === r2.length && o2.every((o3) => T(e2[o3], t2[o3]));
};
var k = (e2) => {
  if (!(e2 instanceof HTMLElement || e2 instanceof SVGElement)) return false;
  const t2 = getComputedStyle(e2);
  return ["overflow", "overflow-x", "overflow-y"].some((e3) => {
    const o2 = t2.getPropertyValue(e3);
    return "auto" === o2 || "scroll" === o2;
  });
};
var C = (e2) => {
  if (!e2) return null;
  let t2 = e2.parentElement;
  for (; t2; ) {
    if (k(t2)) return t2;
    t2 = t2.parentElement;
  }
  return document.scrollingElement || document.documentElement;
};
var L = "undefined" != typeof window ? import_react.useLayoutEffect : import_react.useEffect;
var R = "DEFAULT_TOOLTIP_ID";
var x = { anchorRefs: /* @__PURE__ */ new Set(), activeAnchor: { current: null }, attach: () => {
}, detach: () => {
}, setActiveAnchor: () => {
} };
var N = (0, import_react.createContext)({ getTooltipData: () => x });
var $ = ({ children: t2 }) => {
  const [o2, r2] = (0, import_react.useState)({ [R]: /* @__PURE__ */ new Set() }), [i2, s2] = (0, import_react.useState)({ [R]: { current: null } }), a2 = (e2, ...t3) => {
    r2((o3) => {
      var r3;
      const l2 = null !== (r3 = o3[e2]) && void 0 !== r3 ? r3 : /* @__PURE__ */ new Set();
      return t3.forEach((e3) => l2.add(e3)), { ...o3, [e2]: new Set(l2) };
    });
  }, u = (e2, ...t3) => {
    r2((o3) => {
      const r3 = o3[e2];
      return r3 ? (t3.forEach((e3) => r3.delete(e3)), { ...o3 }) : o3;
    });
  }, d = (0, import_react.useCallback)((e2 = R) => {
    var t3, r3;
    return { anchorRefs: null !== (t3 = o2[e2]) && void 0 !== t3 ? t3 : /* @__PURE__ */ new Set(), activeAnchor: null !== (r3 = i2[e2]) && void 0 !== r3 ? r3 : { current: null }, attach: (...t4) => a2(e2, ...t4), detach: (...t4) => u(e2, ...t4), setActiveAnchor: (t4) => ((e3, t5) => {
      s2((o3) => {
        var r4;
        return (null === (r4 = o3[e3]) || void 0 === r4 ? void 0 : r4.current) === t5.current ? o3 : { ...o3, [e3]: t5 };
      });
    })(e2, t4) };
  }, [o2, i2, a2, u]), p = (0, import_react.useMemo)(() => ({ getTooltipData: d }), [d]);
  return import_react.default.createElement(N.Provider, { value: p }, t2);
};
function I(e2 = R) {
  return (0, import_react.useContext)(N).getTooltipData(e2);
}
var j = ({ tooltipId: t2, children: r2, className: l2, place: n2, content: c2, html: i2, variant: a2, offset: u, wrapper: d, events: p, positionStrategy: v, delayShow: m, delayHide: f }) => {
  const { attach: h2, detach: w2 } = I(t2), b2 = (0, import_react.useRef)(null);
  return (0, import_react.useEffect)(() => (h2(b2), () => {
    w2(b2);
  }), []), import_react.default.createElement("span", { ref: b2, className: (0, import_classnames.default)("react-tooltip-wrapper", l2), "data-tooltip-place": n2, "data-tooltip-content": c2, "data-tooltip-html": i2, "data-tooltip-variant": a2, "data-tooltip-offset": u, "data-tooltip-wrapper": d, "data-tooltip-events": p, "data-tooltip-position-strategy": v, "data-tooltip-delay-show": m, "data-tooltip-delay-hide": f }, r2);
};
var B = { tooltip: "core-styles-module_tooltip__3vRRp", fixed: "core-styles-module_fixed__pcSol", arrow: "core-styles-module_arrow__cvMwQ", noArrow: "core-styles-module_noArrow__xock6", clickable: "core-styles-module_clickable__ZuTTB", show: "core-styles-module_show__Nt9eE", closing: "core-styles-module_closing__sGnxF" };
var z = { tooltip: "styles-module_tooltip__mnnfp", arrow: "styles-module_arrow__K0L3T", dark: "styles-module_dark__xNqje", light: "styles-module_light__Z6W-X", success: "styles-module_success__A2AKt", warning: "styles-module_warning__SCK0X", error: "styles-module_error__JvumD", info: "styles-module_info__BWdHW" };
var D = ({ forwardRef: t2, id: r2, className: c2, classNameArrow: i2, variant: u = "dark", anchorId: d, anchorSelect: p, place: v = "top", offset: m = 10, events: h2 = ["hover"], openOnClick: w2 = false, positionStrategy: b2 = "absolute", middlewares: S2, wrapper: g2, delayShow: A2 = 0, delayHide: O2 = 0, float: k2 = false, hidden: R2 = false, noArrow: x2 = false, clickable: N2 = false, closeOnEsc: $2 = false, closeOnScroll: j2 = false, closeOnResize: D2 = false, openEvents: q2, closeEvents: H2, globalCloseEvents: M, imperativeModeOnly: W, style: P, position: V, afterShow: F, afterHide: K, content: U, contentWrapperRef: X, isOpen: Y, defaultIsOpen: G = false, setIsOpen: Z, activeAnchor: J, setActiveAnchor: Q, border: ee, opacity: te, arrowColor: oe, role: re = "tooltip" }) => {
  var le;
  const ne = (0, import_react.useRef)(null), ce = (0, import_react.useRef)(null), ie = (0, import_react.useRef)(null), se = (0, import_react.useRef)(null), ae = (0, import_react.useRef)(null), [ue, de] = (0, import_react.useState)({ tooltipStyles: {}, tooltipArrowStyles: {}, place: v }), [pe, ve] = (0, import_react.useState)(false), [me, fe] = (0, import_react.useState)(false), [ye, he] = (0, import_react.useState)(null), we = (0, import_react.useRef)(false), be = (0, import_react.useRef)(null), { anchorRefs: Se, setActiveAnchor: ge } = I(r2), Ee = (0, import_react.useRef)(false), [Ae, _e] = (0, import_react.useState)([]), Oe = (0, import_react.useRef)(false), Te = w2 || h2.includes("click"), ke = Te || (null == q2 ? void 0 : q2.click) || (null == q2 ? void 0 : q2.dblclick) || (null == q2 ? void 0 : q2.mousedown), Ce = q2 ? { ...q2 } : { mouseover: true, focus: true, mouseenter: false, click: false, dblclick: false, mousedown: false };
  !q2 && Te && Object.assign(Ce, { mouseenter: false, focus: false, mouseover: false, click: true });
  const Le = H2 ? { ...H2 } : { mouseout: true, blur: true, mouseleave: false, click: false, dblclick: false, mouseup: false };
  !H2 && Te && Object.assign(Le, { mouseleave: false, blur: false, mouseout: false });
  const Re = M ? { ...M } : { escape: $2 || false, scroll: j2 || false, resize: D2 || false, clickOutsideAnchor: ke || false };
  W && (Object.assign(Ce, { mouseenter: false, focus: false, click: false, dblclick: false, mousedown: false }), Object.assign(Le, { mouseleave: false, blur: false, click: false, dblclick: false, mouseup: false }), Object.assign(Re, { escape: false, scroll: false, resize: false, clickOutsideAnchor: false })), L(() => (Oe.current = true, () => {
    Oe.current = false;
  }), []);
  const xe = (e2) => {
    Oe.current && (e2 && fe(true), setTimeout(() => {
      Oe.current && (null == Z || Z(e2), void 0 === Y && ve(e2));
    }, 10));
  };
  (0, import_react.useEffect)(() => {
    if (void 0 === Y) return () => null;
    Y && fe(true);
    const e2 = setTimeout(() => {
      ve(Y);
    }, 10);
    return () => {
      clearTimeout(e2);
    };
  }, [Y]), (0, import_react.useEffect)(() => {
    if (pe !== we.current) if (ae.current && clearTimeout(ae.current), we.current = pe, pe) null == F || F();
    else {
      const e2 = ((e3) => {
        const t3 = e3.match(/^([\d.]+)(ms|s)$/);
        if (!t3) return 0;
        const [, o2, r3] = t3;
        return Number(o2) * ("ms" === r3 ? 1 : 1e3);
      })(getComputedStyle(document.body).getPropertyValue("--rt-transition-show-delay"));
      ae.current = setTimeout(() => {
        fe(false), he(null), null == K || K();
      }, e2 + 25);
    }
  }, [pe]);
  const Ne = (e2) => {
    de((t3) => T(t3, e2) ? t3 : e2);
  }, $e = (e2 = A2) => {
    ie.current && clearTimeout(ie.current), me ? xe(true) : ie.current = setTimeout(() => {
      xe(true);
    }, e2);
  }, Ie = (e2 = O2) => {
    se.current && clearTimeout(se.current), se.current = setTimeout(() => {
      Ee.current || xe(false);
    }, e2);
  }, je = (e2) => {
    var t3;
    if (!e2) return;
    const o2 = null !== (t3 = e2.currentTarget) && void 0 !== t3 ? t3 : e2.target;
    if (!(null == o2 ? void 0 : o2.isConnected)) return Q(null), void ge({ current: null });
    A2 ? $e() : xe(true), Q(o2), ge({ current: o2 }), se.current && clearTimeout(se.current);
  }, Be = () => {
    N2 ? Ie(O2 || 100) : O2 ? Ie() : xe(false), ie.current && clearTimeout(ie.current);
  }, ze = ({ x: e2, y: t3 }) => {
    var o2;
    const r3 = { getBoundingClientRect: () => ({ x: e2, y: t3, width: 0, height: 0, top: t3, left: e2, right: e2, bottom: t3 }) };
    E({ place: null !== (o2 = null == ye ? void 0 : ye.place) && void 0 !== o2 ? o2 : v, offset: m, elementReference: r3, tooltipReference: ne.current, tooltipArrowReference: ce.current, strategy: b2, middlewares: S2, border: ee }).then((e3) => {
      Ne(e3);
    });
  }, De = (e2) => {
    if (!e2) return;
    const t3 = e2, o2 = { x: t3.clientX, y: t3.clientY };
    ze(o2), be.current = o2;
  }, qe = (e2) => {
    var t3;
    if (!pe) return;
    const o2 = e2.target;
    if (!o2.isConnected) return;
    if (null === (t3 = ne.current) || void 0 === t3 ? void 0 : t3.contains(o2)) return;
    [document.querySelector(`[id='${d}']`), ...Ae].some((e3) => null == e3 ? void 0 : e3.contains(o2)) || (xe(false), ie.current && clearTimeout(ie.current));
  }, He = _(je, 50, true), Me = _(Be, 50, true), We = (e2) => {
    Me.cancel(), He(e2);
  }, Pe = () => {
    He.cancel(), Me();
  }, Ve = (0, import_react.useCallback)(() => {
    var e2, t3;
    const o2 = null !== (e2 = null == ye ? void 0 : ye.position) && void 0 !== e2 ? e2 : V;
    o2 ? ze(o2) : k2 ? be.current && ze(be.current) : (null == J ? void 0 : J.isConnected) && E({ place: null !== (t3 = null == ye ? void 0 : ye.place) && void 0 !== t3 ? t3 : v, offset: m, elementReference: J, tooltipReference: ne.current, tooltipArrowReference: ce.current, strategy: b2, middlewares: S2, border: ee }).then((e3) => {
      Oe.current && Ne(e3);
    });
  }, [pe, J, U, P, v, null == ye ? void 0 : ye.place, m, b2, V, null == ye ? void 0 : ye.position, k2]);
  (0, import_react.useEffect)(() => {
    var e2, t3;
    const o2 = new Set(Se);
    Ae.forEach((e3) => {
      o2.add({ current: e3 });
    });
    const r3 = document.querySelector(`[id='${d}']`);
    r3 && o2.add({ current: r3 });
    const l2 = () => {
      xe(false);
    }, n2 = C(J), c3 = C(ne.current);
    Re.scroll && (window.addEventListener("scroll", l2), null == n2 || n2.addEventListener("scroll", l2), null == c3 || c3.addEventListener("scroll", l2));
    let i3 = null;
    Re.resize ? window.addEventListener("resize", l2) : J && ne.current && (i3 = autoUpdate(J, ne.current, Ve, { ancestorResize: true, elementResize: true, layoutShift: true }));
    const s2 = (e3) => {
      "Escape" === e3.key && xe(false);
    };
    Re.escape && window.addEventListener("keydown", s2), Re.clickOutsideAnchor && window.addEventListener("click", qe);
    const a2 = [], u2 = (e3) => {
      pe && (null == e3 ? void 0 : e3.target) === J || je(e3);
    }, p2 = (e3) => {
      pe && (null == e3 ? void 0 : e3.target) === J && Be();
    }, v2 = ["mouseover", "mouseout", "mouseenter", "mouseleave", "focus", "blur"], m2 = ["click", "dblclick", "mousedown", "mouseup"];
    Object.entries(Ce).forEach(([e3, t4]) => {
      t4 && (v2.includes(e3) ? a2.push({ event: e3, listener: We }) : m2.includes(e3) && a2.push({ event: e3, listener: u2 }));
    }), Object.entries(Le).forEach(([e3, t4]) => {
      t4 && (v2.includes(e3) ? a2.push({ event: e3, listener: Pe }) : m2.includes(e3) && a2.push({ event: e3, listener: p2 }));
    }), k2 && a2.push({ event: "pointermove", listener: De });
    const y2 = () => {
      Ee.current = true;
    }, h3 = () => {
      Ee.current = false, Be();
    };
    return N2 && !ke && (null === (e2 = ne.current) || void 0 === e2 || e2.addEventListener("mouseenter", y2), null === (t3 = ne.current) || void 0 === t3 || t3.addEventListener("mouseleave", h3)), a2.forEach(({ event: e3, listener: t4 }) => {
      o2.forEach((o3) => {
        var r4;
        null === (r4 = o3.current) || void 0 === r4 || r4.addEventListener(e3, t4);
      });
    }), () => {
      var e3, t4;
      Re.scroll && (window.removeEventListener("scroll", l2), null == n2 || n2.removeEventListener("scroll", l2), null == c3 || c3.removeEventListener("scroll", l2)), Re.resize ? window.removeEventListener("resize", l2) : null == i3 || i3(), Re.clickOutsideAnchor && window.removeEventListener("click", qe), Re.escape && window.removeEventListener("keydown", s2), N2 && !ke && (null === (e3 = ne.current) || void 0 === e3 || e3.removeEventListener("mouseenter", y2), null === (t4 = ne.current) || void 0 === t4 || t4.removeEventListener("mouseleave", h3)), a2.forEach(({ event: e4, listener: t5 }) => {
        o2.forEach((o3) => {
          var r4;
          null === (r4 = o3.current) || void 0 === r4 || r4.removeEventListener(e4, t5);
        });
      });
    };
  }, [J, Ve, me, Se, Ae, q2, H2, M, Te, A2, O2]), (0, import_react.useEffect)(() => {
    var e2, t3;
    let o2 = null !== (t3 = null !== (e2 = null == ye ? void 0 : ye.anchorSelect) && void 0 !== e2 ? e2 : p) && void 0 !== t3 ? t3 : "";
    !o2 && r2 && (o2 = `[data-tooltip-id='${r2.replace(/'/g, "\\'")}']`);
    const l2 = new MutationObserver((e3) => {
      const t4 = [], l3 = [];
      e3.forEach((e4) => {
        if ("attributes" === e4.type && "data-tooltip-id" === e4.attributeName) {
          e4.target.getAttribute("data-tooltip-id") === r2 ? t4.push(e4.target) : e4.oldValue === r2 && l3.push(e4.target);
        }
        if ("childList" === e4.type) {
          if (J) {
            const t5 = [...e4.removedNodes].filter((e5) => 1 === e5.nodeType);
            if (o2) try {
              l3.push(...t5.filter((e5) => e5.matches(o2))), l3.push(...t5.flatMap((e5) => [...e5.querySelectorAll(o2)]));
            } catch (e5) {
            }
            t5.some((e5) => {
              var t6;
              return !!(null === (t6 = null == e5 ? void 0 : e5.contains) || void 0 === t6 ? void 0 : t6.call(e5, J)) && (fe(false), xe(false), Q(null), ie.current && clearTimeout(ie.current), se.current && clearTimeout(se.current), true);
            });
          }
          if (o2) try {
            const r3 = [...e4.addedNodes].filter((e5) => 1 === e5.nodeType);
            t4.push(...r3.filter((e5) => e5.matches(o2))), t4.push(...r3.flatMap((e5) => [...e5.querySelectorAll(o2)]));
          } catch (e5) {
          }
        }
      }), (t4.length || l3.length) && _e((e4) => [...e4.filter((e5) => !l3.includes(e5)), ...t4]);
    });
    return l2.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-tooltip-id"], attributeOldValue: true }), () => {
      l2.disconnect();
    };
  }, [r2, p, null == ye ? void 0 : ye.anchorSelect, J]), (0, import_react.useEffect)(() => {
    Ve();
  }, [Ve]), (0, import_react.useEffect)(() => {
    if (!(null == X ? void 0 : X.current)) return () => null;
    const e2 = new ResizeObserver(() => {
      setTimeout(() => Ve());
    });
    return e2.observe(X.current), () => {
      e2.disconnect();
    };
  }, [U, null == X ? void 0 : X.current]), (0, import_react.useEffect)(() => {
    var e2;
    const t3 = document.querySelector(`[id='${d}']`), o2 = [...Ae, t3];
    J && o2.includes(J) || Q(null !== (e2 = Ae[0]) && void 0 !== e2 ? e2 : t3);
  }, [d, Ae, J]), (0, import_react.useEffect)(() => (G && xe(true), () => {
    ie.current && clearTimeout(ie.current), se.current && clearTimeout(se.current);
  }), []), (0, import_react.useEffect)(() => {
    var e2;
    let t3 = null !== (e2 = null == ye ? void 0 : ye.anchorSelect) && void 0 !== e2 ? e2 : p;
    if (!t3 && r2 && (t3 = `[data-tooltip-id='${r2.replace(/'/g, "\\'")}']`), t3) try {
      const e3 = Array.from(document.querySelectorAll(t3));
      _e(e3);
    } catch (e3) {
      _e([]);
    }
  }, [r2, p, null == ye ? void 0 : ye.anchorSelect]), (0, import_react.useEffect)(() => {
    ie.current && (clearTimeout(ie.current), $e(A2));
  }, [A2]);
  const Fe = null !== (le = null == ye ? void 0 : ye.content) && void 0 !== le ? le : U, Ke = pe && Object.keys(ue.tooltipStyles).length > 0;
  return (0, import_react.useImperativeHandle)(t2, () => ({ open: (e2) => {
    if (null == e2 ? void 0 : e2.anchorSelect) try {
      document.querySelector(e2.anchorSelect);
    } catch (t3) {
      return void console.warn(`[react-tooltip] "${e2.anchorSelect}" is not a valid CSS selector`);
    }
    he(null != e2 ? e2 : null), (null == e2 ? void 0 : e2.delay) ? $e(e2.delay) : xe(true);
  }, close: (e2) => {
    (null == e2 ? void 0 : e2.delay) ? Ie(e2.delay) : xe(false);
  }, activeAnchor: J, place: ue.place, isOpen: Boolean(me && !R2 && Fe && Ke) })), me && !R2 && Fe ? import_react.default.createElement(g2, { id: r2, role: re, className: (0, import_classnames.default)("react-tooltip", B.tooltip, z.tooltip, z[u], c2, `react-tooltip__place-${ue.place}`, B[Ke ? "show" : "closing"], Ke ? "react-tooltip__show" : "react-tooltip__closing", "fixed" === b2 && B.fixed, N2 && B.clickable), onTransitionEnd: (e2) => {
    ae.current && clearTimeout(ae.current), pe || "opacity" !== e2.propertyName || (fe(false), he(null), null == K || K());
  }, style: { ...P, ...ue.tooltipStyles, opacity: void 0 !== te && Ke ? te : void 0 }, ref: ne }, Fe, import_react.default.createElement(g2, { className: (0, import_classnames.default)("react-tooltip-arrow", B.arrow, z.arrow, i2, x2 && B.noArrow), style: { ...ue.tooltipArrowStyles, background: oe ? `linear-gradient(to right bottom, transparent 50%, ${oe} 50%)` : void 0 }, ref: ce })) : null;
};
var q = ({ content: t2 }) => import_react.default.createElement("span", { dangerouslySetInnerHTML: { __html: t2 } });
var H = import_react.default.forwardRef(({ id: t2, anchorId: r2, anchorSelect: n2, content: c2, html: i2, render: a2, className: u, classNameArrow: d, variant: p = "dark", place: v = "top", offset: m = 10, wrapper: f = "div", children: h2 = null, events: w2 = ["hover"], openOnClick: b2 = false, positionStrategy: S2 = "absolute", middlewares: g2, delayShow: E2 = 0, delayHide: _2 = 0, float: O2 = false, hidden: T2 = false, noArrow: k2 = false, clickable: C2 = false, closeOnEsc: L2 = false, closeOnScroll: R2 = false, closeOnResize: x2 = false, openEvents: N2, closeEvents: $2, globalCloseEvents: j2, imperativeModeOnly: B2 = false, style: z2, position: H2, isOpen: M, defaultIsOpen: W = false, disableStyleInjection: P = false, border: V, opacity: F, arrowColor: K, setIsOpen: U, afterShow: X, afterHide: Y, role: G = "tooltip" }, Z) => {
  const [J, Q] = (0, import_react.useState)(c2), [ee, te] = (0, import_react.useState)(i2), [oe, re] = (0, import_react.useState)(v), [le, ne] = (0, import_react.useState)(p), [ce, ie] = (0, import_react.useState)(m), [se, ae] = (0, import_react.useState)(E2), [ue, de] = (0, import_react.useState)(_2), [pe, ve] = (0, import_react.useState)(O2), [me, fe] = (0, import_react.useState)(T2), [ye, he] = (0, import_react.useState)(f), [we, be] = (0, import_react.useState)(w2), [Se, ge] = (0, import_react.useState)(S2), [Ee, Ae] = (0, import_react.useState)(null), [_e, Oe] = (0, import_react.useState)(null), Te = (0, import_react.useRef)(P), { anchorRefs: ke, activeAnchor: Ce } = I(t2), Le = (e2) => null == e2 ? void 0 : e2.getAttributeNames().reduce((t3, o2) => {
    var r3;
    if (o2.startsWith("data-tooltip-")) {
      t3[o2.replace(/^data-tooltip-/, "")] = null !== (r3 = null == e2 ? void 0 : e2.getAttribute(o2)) && void 0 !== r3 ? r3 : null;
    }
    return t3;
  }, {}), Re = (e2) => {
    const t3 = { place: (e3) => {
      var t4;
      re(null !== (t4 = e3) && void 0 !== t4 ? t4 : v);
    }, content: (e3) => {
      Q(null != e3 ? e3 : c2);
    }, html: (e3) => {
      te(null != e3 ? e3 : i2);
    }, variant: (e3) => {
      var t4;
      ne(null !== (t4 = e3) && void 0 !== t4 ? t4 : p);
    }, offset: (e3) => {
      ie(null === e3 ? m : Number(e3));
    }, wrapper: (e3) => {
      var t4;
      he(null !== (t4 = e3) && void 0 !== t4 ? t4 : f);
    }, events: (e3) => {
      const t4 = null == e3 ? void 0 : e3.split(" ");
      be(null != t4 ? t4 : w2);
    }, "position-strategy": (e3) => {
      var t4;
      ge(null !== (t4 = e3) && void 0 !== t4 ? t4 : S2);
    }, "delay-show": (e3) => {
      ae(null === e3 ? E2 : Number(e3));
    }, "delay-hide": (e3) => {
      de(null === e3 ? _2 : Number(e3));
    }, float: (e3) => {
      ve(null === e3 ? O2 : "true" === e3);
    }, hidden: (e3) => {
      fe(null === e3 ? T2 : "true" === e3);
    }, "class-name": (e3) => {
      Ae(e3);
    } };
    Object.values(t3).forEach((e3) => e3(null)), Object.entries(e2).forEach(([e3, o2]) => {
      var r3;
      null === (r3 = t3[e3]) || void 0 === r3 || r3.call(t3, o2);
    });
  };
  (0, import_react.useEffect)(() => {
    Q(c2);
  }, [c2]), (0, import_react.useEffect)(() => {
    te(i2);
  }, [i2]), (0, import_react.useEffect)(() => {
    re(v);
  }, [v]), (0, import_react.useEffect)(() => {
    ne(p);
  }, [p]), (0, import_react.useEffect)(() => {
    ie(m);
  }, [m]), (0, import_react.useEffect)(() => {
    ae(E2);
  }, [E2]), (0, import_react.useEffect)(() => {
    de(_2);
  }, [_2]), (0, import_react.useEffect)(() => {
    ve(O2);
  }, [O2]), (0, import_react.useEffect)(() => {
    fe(T2);
  }, [T2]), (0, import_react.useEffect)(() => {
    ge(S2);
  }, [S2]), (0, import_react.useEffect)(() => {
    Te.current !== P && console.warn("[react-tooltip] Do not change `disableStyleInjection` dynamically.");
  }, [P]), (0, import_react.useEffect)(() => {
    "undefined" != typeof window && window.dispatchEvent(new CustomEvent("react-tooltip-inject-styles", { detail: { disableCore: "core" === P, disableBase: P } }));
  }, []), (0, import_react.useEffect)(() => {
    var e2;
    const o2 = new Set(ke);
    let l2 = n2;
    if (!l2 && t2 && (l2 = `[data-tooltip-id='${t2.replace(/'/g, "\\'")}']`), l2) try {
      document.querySelectorAll(l2).forEach((e3) => {
        o2.add({ current: e3 });
      });
    } catch (e3) {
      console.warn(`[react-tooltip] "${l2}" is not a valid CSS selector`);
    }
    const c3 = document.querySelector(`[id='${r2}']`);
    if (c3 && o2.add({ current: c3 }), !o2.size) return () => null;
    const i3 = null !== (e2 = null != _e ? _e : c3) && void 0 !== e2 ? e2 : Ce.current, s2 = new MutationObserver((e3) => {
      e3.forEach((e4) => {
        var t3;
        if (!i3 || "attributes" !== e4.type || !(null === (t3 = e4.attributeName) || void 0 === t3 ? void 0 : t3.startsWith("data-tooltip-"))) return;
        const o3 = Le(i3);
        Re(o3);
      });
    }), a3 = { attributes: true, childList: false, subtree: false };
    if (i3) {
      const e3 = Le(i3);
      Re(e3), s2.observe(i3, a3);
    }
    return () => {
      s2.disconnect();
    };
  }, [ke, Ce, _e, r2, n2]), (0, import_react.useEffect)(() => {
    (null == z2 ? void 0 : z2.border) && console.warn("[react-tooltip] Do not set `style.border`. Use `border` prop instead."), V && !A("border", `${V}`) && console.warn(`[react-tooltip] "${V}" is not a valid \`border\`.`), (null == z2 ? void 0 : z2.opacity) && console.warn("[react-tooltip] Do not set `style.opacity`. Use `opacity` prop instead."), F && !A("opacity", `${F}`) && console.warn(`[react-tooltip] "${F}" is not a valid \`opacity\`.`);
  }, []);
  let xe = h2;
  const Ne = (0, import_react.useRef)(null);
  if (a2) {
    const t3 = a2({ content: (null == _e ? void 0 : _e.getAttribute("data-tooltip-content")) || J || null, activeAnchor: _e });
    xe = t3 ? import_react.default.createElement("div", { ref: Ne, className: "react-tooltip-content-wrapper" }, t3) : null;
  } else J && (xe = J);
  ee && (xe = import_react.default.createElement(q, { content: ee }));
  const $e = { forwardRef: Z, id: t2, anchorId: r2, anchorSelect: n2, className: (0, import_classnames.default)(u, Ee), classNameArrow: d, content: xe, contentWrapperRef: Ne, place: oe, variant: le, offset: ce, wrapper: ye, events: we, openOnClick: b2, positionStrategy: Se, middlewares: g2, delayShow: se, delayHide: ue, float: pe, hidden: me, noArrow: k2, clickable: C2, closeOnEsc: L2, closeOnScroll: R2, closeOnResize: x2, openEvents: N2, closeEvents: $2, globalCloseEvents: j2, imperativeModeOnly: B2, style: z2, position: H2, isOpen: M, defaultIsOpen: W, border: V, opacity: F, arrowColor: K, setIsOpen: U, afterShow: X, afterHide: Y, activeAnchor: _e, setActiveAnchor: (e2) => Oe(e2), role: G };
  return import_react.default.createElement(D, { ...$e });
});
"undefined" != typeof window && window.addEventListener("react-tooltip-inject-styles", (e2) => {
  e2.detail.disableCore || S({ css: `:root{--rt-color-white:#fff;--rt-color-dark:#222;--rt-color-success:#8dc572;--rt-color-error:#be6464;--rt-color-warning:#f0ad4e;--rt-color-info:#337ab7;--rt-opacity:0.9;--rt-transition-show-delay:0.15s;--rt-transition-closing-delay:0.15s}.core-styles-module_tooltip__3vRRp{position:absolute;top:0;left:0;pointer-events:none;opacity:0;will-change:opacity}.core-styles-module_fixed__pcSol{position:fixed}.core-styles-module_arrow__cvMwQ{position:absolute;background:inherit}.core-styles-module_noArrow__xock6{display:none}.core-styles-module_clickable__ZuTTB{pointer-events:auto}.core-styles-module_show__Nt9eE{opacity:var(--rt-opacity);transition:opacity var(--rt-transition-show-delay)ease-out}.core-styles-module_closing__sGnxF{opacity:0;transition:opacity var(--rt-transition-closing-delay)ease-in}`, type: "core" }), e2.detail.disableBase || S({ css: `
.styles-module_tooltip__mnnfp{padding:8px 16px;border-radius:3px;font-size:90%;width:max-content}.styles-module_arrow__K0L3T{width:8px;height:8px}[class*='react-tooltip__place-top']>.styles-module_arrow__K0L3T{transform:rotate(45deg)}[class*='react-tooltip__place-right']>.styles-module_arrow__K0L3T{transform:rotate(135deg)}[class*='react-tooltip__place-bottom']>.styles-module_arrow__K0L3T{transform:rotate(225deg)}[class*='react-tooltip__place-left']>.styles-module_arrow__K0L3T{transform:rotate(315deg)}.styles-module_dark__xNqje{background:var(--rt-color-dark);color:var(--rt-color-white)}.styles-module_light__Z6W-X{background-color:var(--rt-color-white);color:var(--rt-color-dark)}.styles-module_success__A2AKt{background-color:var(--rt-color-success);color:var(--rt-color-white)}.styles-module_warning__SCK0X{background-color:var(--rt-color-warning);color:var(--rt-color-white)}.styles-module_error__JvumD{background-color:var(--rt-color-error);color:var(--rt-color-white)}.styles-module_info__BWdHW{background-color:var(--rt-color-info);color:var(--rt-color-white)}`, type: "base" });
});
export {
  H as Tooltip,
  $ as TooltipProvider,
  j as TooltipWrapper,
  g as removeStyle
};
/*! Bundled license information:

classnames/index.js:
  (*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  *)

react-tooltip/dist/react-tooltip.min.mjs:
  (*
  * React Tooltip
  * {@link https://github.com/ReactTooltip/react-tooltip}
  * @copyright ReactTooltip Team
  * @license MIT
  *)
*/
//# sourceMappingURL=react-tooltip.js.map
