(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const Skroll = function(opt) {
  this.settings = opt || {};
  this.settings.mobile = this.settings.mobile === void 0 ? false : this.settings.mobile;
  this.referenceElement = this.settings.reference === void 0 ? window : this.get(this.settings.reference)[0];
  this.elements = [];
  this.data = {};
  this.animations = {
    zoomIn: {
      start: function(el) {
        el.style["transform"] = "scale(.1,.1)";
        el.style["opacity"] = 0;
      },
      end: function(el) {
        el.style["transform"] = "scale(1,1)";
        el.style["opacity"] = 1;
      }
    },
    fadeInLeft: {
      start: function(el) {
        el.style["transform"] = "translate(-50%,0)";
        el.style["opacity"] = 0;
      },
      end: function(el) {
        el.style["transform"] = "translate(0%,0)";
        el.style["opacity"] = 1;
      }
    },
    fadeInRight: {
      start: function(el) {
        el.style["transform"] = "translate(50%,0)";
        el.style["opacity"] = 0;
      },
      end: function(el) {
        el.style["transform"] = "translate(0%,0)";
        el.style["opacity"] = 1;
      }
    },
    fadeInLeftBig: {
      start: function(el) {
        el.style["transform"] = "translate(-100%,0)";
        el.style["opacity"] = 0;
      },
      end: function(el) {
        el.style["transform"] = "translate(0%,0)";
        el.style["opacity"] = 1;
      }
    },
    fadeInRightBig: {
      start: function(el) {
        el.style["transform"] = "translate(100%,0)";
        el.style["opacity"] = 0;
      },
      end: function(el) {
        el.style["transform"] = "translate(0%,0)";
        el.style["opacity"] = 1;
      }
    },
    fadeInUp: {
      start: function(el) {
        el.style["transform"] = "translate(0,50%)";
        el.style["opacity"] = 0;
      },
      end: function(el) {
        el.style["transform"] = "translate(0,0%)";
        el.style["opacity"] = 1;
      }
    },
    fadeInDown: {
      start: function(el) {
        el.style["transform"] = "translate(0,-50%)";
        el.style["opacity"] = 0;
      },
      end: function(el) {
        el.style["transform"] = "translate(0,0%)";
        el.style["opacity"] = 1;
      }
    },
    slideInLeft: {
      start: function(el) {
        el.style["transform"] = "translate(-50%,0) scale(.8,.8)";
        el.style["opacity"] = 0;
      },
      end: function(el) {
        el.style["transform"] = "translate(0%,0) scale(1,1)";
        el.style["opacity"] = 1;
      }
    },
    slideInLeftBig: {
      start: function(el) {
        el.style["transform"] = "translate(-100%,0) scale(.8,.8)";
        el.style["opacity"] = 0;
      },
      end: function(el) {
        el.style["transform"] = "translate(0%,0) scale(1,1)";
        el.style["opacity"] = 1;
      }
    },
    slideInRight: {
      start: function(el) {
        el.style["transform"] = "translate(50%,0) scale(.8,.8)";
        el.style["opacity"] = 0;
      },
      end: function(el) {
        el.style["transform"] = "translate(0%,0) scale(1,1)";
        el.style["opacity"] = 1;
      }
    },
    slideInRightBig: {
      start: function(el) {
        el.style["transform"] = "translate(-100%,0) scale(.8,.8)";
        el.style["opacity"] = 0;
      },
      end: function(el) {
        el.style["transform"] = "translate(0%,0) scale(1,1)";
        el.style["opacity"] = 1;
      }
    },
    flipInX: {
      start: function(el) {
        el.style["transform"] = "rotateX(90deg)";
        el.style["opacity"] = 0;
      },
      end: function(el) {
        el.style["transform"] = "rotateX(0deg)";
        el.style["opacity"] = 1;
      }
    },
    flipInY: {
      start: function(el) {
        el.style["transform"] = "rotateY(90deg)";
        el.style["opacity"] = 0;
      },
      end: function(el) {
        el.style["transform"] = "rotateY(0deg)";
        el.style["opacity"] = 1;
      }
    },
    rotateRightIn: {
      start: function(el) {
        el.style["transform"] = "rotate(45deg)";
        el.style["transform-origin"] = "0 100%";
        el.style["opacity"] = 0;
      },
      end: function(el) {
        el.style["transform"] = "rotate(0deg)";
        el.style["opacity"] = 1;
      }
    },
    rotateLeftIn: {
      start: function(el) {
        el.style["transform"] = "rotate(-45deg)";
        el.style["transform-origin"] = "0 100%";
        el.style["opacity"] = 0;
      },
      end: function(el) {
        el.style["transform"] = "rotate(0deg)";
        el.style["opacity"] = 1;
      }
    },
    growInLeft: {
      start: function(el) {
        el.style["transform"] = "translate(-100%,0) scale(.1,.1)";
        el.style["opacity"] = 0;
      },
      end: function(el) {
        el.style["transform"] = "translate(0%,0) scale(1,1)";
        el.style["opacity"] = 1;
      }
    },
    growInRight: {
      start: function(el) {
        el.style["transform"] = "translate(100%,0) scale(.1,.1)";
        el.style["opacity"] = 0;
      },
      end: function(el) {
        el.style["transform"] = "translate(0%,0) scale(1,1)";
        el.style["opacity"] = 1;
      }
    }
  };
};
Skroll.prototype.get = function(el) {
  return document.querySelectorAll(el);
};
Skroll.prototype.inViewport = function(elem, settings) {
  var scrollTop, elementTop, elementBottom, viewportTop, viewportBottom;
  if (this.referenceElement == window) {
    scrollTop = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
    elementTop = this.data[elem.getAttribute("data-skroll-id")].top;
    elementBottom = elementTop + elem.offsetHeight;
    viewportTop = scrollTop + screen.availHeight * settings.triggerTop;
    viewportBottom = scrollTop + screen.availHeight * settings.triggerBottom;
  } else {
    var re = this.referenceElement;
    scrollTop = re.scrollTop;
    elementTop = this.data[elem.getAttribute("data-skroll-id")].top;
    elementBottom = elementTop + elem.offsetHeight;
    viewportTop = scrollTop + re.offsetHeight * settings.triggerTop;
    viewportBottom = scrollTop + re.offsetHeight * settings.triggerBottom;
  }
  return elementBottom > viewportTop && elementTop < viewportBottom;
};
Skroll.prototype.getScrollStatus = function(elem, settings) {
  if (this.inViewport(elem, settings)) {
    this.data[elem.getAttribute("data-skroll-id")].inView = true;
    return { action: "enter", data: { shown: this.data[elem.getAttribute("data-skroll-id")].shown } };
  } else {
    if (this.data[elem.getAttribute("data-skroll-id")].inView) {
      this.data[elem.getAttribute("data-skroll-id")].inView = false;
      return { action: "leave", data: { shown: this.data[elem.getAttribute("data-skroll-id")].shown } };
    }
    return { action: "idle", data: { shown: this.data[elem.getAttribute("data-skroll-id")].shown } };
  }
};
Skroll.prototype.add = function(el, options = {}) {
  var settings = {
    triggerTop: options.triggerTop || 0.2,
    triggerBottom: options.triggerBottom || 0.8,
    delay: options.delay || 0,
    duration: options.duration || 500,
    animation: options.animation || "zoomIn",
    easing: options.easing || "ease",
    wait: options.delay || 0,
    repeat: options.repeat || false,
    onEnter: options.onEnter || false,
    onLeave: options.onLeave || false
  };
  this.elements.push({
    element: el,
    settings
  });
  return this;
};
Skroll.prototype.recalcPosition = function() {
  var _this = this;
  this.elements.forEach(function(val, key) {
    _this.get(val.element).forEach(function(e, i) {
      var t = e.style.transform;
      e.style["transform"] = "none";
      setTimeout(function() {
        var offset = e.getBoundingClientRect();
        var top2 = _this.referenceElement == window ? offset.top + _this.referenceElement.scrollY : offset.top + _this.referenceElement.scrollTop;
        _this.data[e.getAttribute("data-skroll-id")].top = top2;
        e.style["transform"] = t;
      }, 50);
    });
  });
};
Skroll.prototype.throttle = function(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last, deferTimer;
  return function() {
    var context = scope || this;
    var now = +/* @__PURE__ */ new Date(), args = arguments;
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function() {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};
Skroll.prototype.addAnimation = function(name, property) {
  this.animations[name] = property;
  return this;
};
Skroll.prototype.init = function() {
  var _this = this;
  if (!this.settings.mobile && screen.width < 600) return this;
  var id = 0;
  this.elements.forEach(function(val, key) {
    _this.get(val.element).forEach(function(e, i) {
      e.setAttribute("data-skroll-id", id);
      var offset = e.getBoundingClientRect();
      var top2 = _this.referenceElement == window ? offset.top + _this.referenceElement.scrollY : offset.top + _this.referenceElement.scrollTop;
      _this.data[e.getAttribute("data-skroll-id")] = {};
      _this.data[e.getAttribute("data-skroll-id")].inView = false;
      _this.data[e.getAttribute("data-skroll-id")].shown = false;
      _this.data[e.getAttribute("data-skroll-id")].top = top2;
      _this.data[e.getAttribute("data-skroll-id")].oef = false;
      _this.data[e.getAttribute("data-skroll-id")].olf = false;
      if (typeof val.settings.animation == "string" && val.settings.animation != "none") {
        if (!_this.animations[val.settings.animation]) {
          val.settings.animation = "zoomIn";
        }
        _this.animations[val.settings.animation].start(e);
      } else if (typeof val.settings.animation == "object") {
        if (val.settings.animation.start != void 0) {
          val.settings.animation.start(e);
        }
      }
      id++;
    });
  });
  ["scroll", "resize"].forEach(function(event) {
    _this.referenceElement.addEventListener(event, _this.throttle(function() {
      _this.elements.forEach(function(val, key) {
        var tDelay = val.settings.wait;
        _this.get(val.element).forEach(function(e, i) {
          var sStat = _this.getScrollStatus(e, val.settings);
          if (sStat.action == "idle") return;
          if (sStat.action == "enter" && !sStat.data.shown) {
            if (typeof val.settings.animation == "string" && val.settings.animation != "none") {
              e.style["transition"] = "all " + val.settings.duration + "ms " + val.settings.easing;
              setTimeout(function() {
                _this.animations[val.settings.animation].end(e);
                _this.data[e.getAttribute("data-skroll-id")].shown = true;
                tDelay += val.settings.delay * i;
              }, tDelay);
            } else if (typeof val.settings.animation == "object") {
              if (val.settings.animation.end != void 0) {
                e.style["transition"] = "all " + val.settings.duration + "ms " + val.settings.easing;
                setTimeout(function() {
                  val.settings.animation.end(e);
                  _this.data[e.getAttribute("data-skroll-id")].shown = true;
                  tDelay += val.settings.delay * i;
                }, tDelay);
              }
            }
            tDelay += val.settings.delay;
          } else if (sStat.action == "leave" && sStat.data.shown) {
            if (val.settings.repeat) {
              if (typeof val.settings.animation == "string" && val.settings.animation != "none") {
                if (_this.animations[val.settings.animation]) {
                  e.style["transition"] = "all " + val.settings.duration + "ms " + val.settings.easing;
                  setTimeout(function() {
                    _this.animations[val.settings.animation].end(e);
                    _this.data[e.getAttribute("data-skroll-id")].shown = false;
                    tDelay += val.settings.delay * i;
                  }, tDelay);
                }
              } else if (typeof val.settings.animation == "object") {
                if (val.settings.animation.end != void 0) {
                  e.style["transition"] = "all " + val.settings.duration + "ms " + val.settings.easing;
                  setTimeout(function() {
                    val.settings.animation.end(e);
                    _this.data[e.getAttribute("data-skroll-id")].shown = false;
                    tDelay += val.settings.delay * i;
                  }, tDelay);
                }
              }
              tDelay += val.settings.delay;
            }
          }
          if (sStat.action == "enter") {
            if (!_this.data[e.getAttribute("data-skroll-id")].oef) {
              if (val.settings.onEnter) {
                val.settings.onEnter(i, e);
                _this.data[e.getAttribute("data-skroll-id")].oef = true;
              }
            }
          } else if (sStat.action == "leave") {
            if (!_this.data[e.getAttribute("data-skroll-id")].olf) {
              if (val.settings.onLeave) {
                val.settings.onLeave(i, e);
                _this.data[e.getAttribute("data-skroll-id")].olf = true;
              }
            }
          }
        });
      });
      if (event == "resize") _this.recalcPosition();
    }, 150));
  });
  if (window.dispatchEvent) {
    _this.referenceElement.dispatchEvent(new Event("scroll"));
  } else {
    _this.referenceElement.fireEvent("scroll");
  }
  return _this;
};
function scrollAnimationInit() {
  new Skroll({
    mobile: true
  }).add(".cards__item", {
    animation: "fadeInUp",
    delay: 120,
    duration: 600,
    wait: 250
  }).add(".about-section__text.text > *", {
    animation: "growInRight",
    delay: 80,
    duration: 500,
    easing: "cubic-bezier(0.37, 0.27, 0.24, 1.26)"
  }).add(".hero-section__btn", {
    animation: "fadeInDown",
    delay: 200,
    duration: 700,
    triggerBottom: 1,
    easing: "cubic-bezier(0.37, 0.27, 0.24, 1.26)"
  }).add(".chart__value, .accordion__item", {
    animation: "growInLeft",
    delay: 80,
    duration: 500,
    easing: "cubic-bezier(0.37, 0.27, 0.24, 1.26)"
  }).add(".review__text", {
    animation: "growInRight",
    delay: 100,
    duration: 1e3,
    easing: "cubic-bezier(0.37, 0.27, 0.24, 1.26)"
  }).add(".chart-section__title, .roadmap-section__title, .contacts-section__title, .faq-section__title", {
    animation: "zoomIn",
    duration: 600
  }).init();
}
function scrollTrigger() {
  const elements = document.querySelectorAll(".an1t");
  function checkVisibility() {
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight - 100 && rect.bottom > 100) {
        element.classList.add("an1t--visible");
      }
    });
  }
  window.addEventListener("scroll", checkVisibility);
  window.addEventListener("resize", checkVisibility);
  checkVisibility();
}
function dataCounter() {
  const counters = document.querySelectorAll("[data-counter]");
  function formatNumber(number) {
    return number.toLocaleString("en-US");
  }
  function startCounting(element) {
    let target = parseInt(element.getAttribute("data-counter").replace(/,/g, ""), 10);
    let count = 0;
    let duration = 2500;
    let intervalTime = 20;
    let steps = duration / intervalTime;
    let step = target / steps;
    let interval = setInterval(() => {
      count += step;
      element.textContent = formatNumber(Math.floor(count));
      if (count >= target) {
        element.textContent = formatNumber(target);
        clearInterval(interval);
      }
    }, intervalTime);
  }
  function checkVisibility() {
    counters.forEach((counter) => {
      const rect = counter.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight - 100 && rect.bottom > 100) {
        if (!counter.classList.contains("counting-started")) {
          counter.classList.add("counting-started");
          startCounting(counter);
        }
      }
    });
  }
  window.addEventListener("scroll", checkVisibility);
  window.addEventListener("resize", checkVisibility);
  checkVisibility();
}
function anchorScroll() {
  const links = document.querySelectorAll("a[href^='#']");
  links.forEach((link) => {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth"
        });
      }
    });
  });
}
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var SmoothScroll$1 = { exports: {} };
var hasRequiredSmoothScroll;
function requireSmoothScroll() {
  if (hasRequiredSmoothScroll) return SmoothScroll$1.exports;
  hasRequiredSmoothScroll = 1;
  (function(module, exports) {
    (function() {
      var defaultOptions = {
        // Scrolling Core
        frameRate: 150,
        // [Hz]
        animationTime: 400,
        // [ms]
        stepSize: 100,
        // [px]
        // Pulse (less tweakable)
        // ratio of "tail" to "acceleration"
        pulseAlgorithm: true,
        pulseScale: 4,
        pulseNormalize: 1,
        // Acceleration
        accelerationDelta: 50,
        // 50
        accelerationMax: 3,
        // 3
        // Keyboard Settings
        keyboardSupport: true,
        // option
        arrowScroll: 50,
        // [px]
        // Other
        fixedBackground: true,
        excluded: ""
      };
      var options = defaultOptions;
      var isFrame = false;
      var direction = { x: 0, y: 0 };
      var initDone = false;
      var root = document.documentElement;
      var activeElement;
      var observer;
      var refreshSize;
      var deltaBuffer = [];
      var deltaBufferTimer;
      var isMac = /^Mac/.test(navigator.platform);
      function initTest() {
        if (options.keyboardSupport) {
          addEvent("keydown", keydown);
        }
      }
      function init() {
        if (initDone || !document.body) return;
        initDone = true;
        var body = document.body;
        var html = document.documentElement;
        var windowHeight = window.innerHeight;
        var scrollHeight = body.scrollHeight;
        root = document.compatMode.indexOf("CSS") >= 0 ? html : body;
        activeElement = body;
        initTest();
        if (top != self) {
          isFrame = true;
        } else if (isOldSafari && scrollHeight > windowHeight && (body.offsetHeight <= windowHeight || html.offsetHeight <= windowHeight)) {
          var fullPageElem = document.createElement("div");
          fullPageElem.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + root.scrollHeight + "px";
          document.body.appendChild(fullPageElem);
          var pendingRefresh;
          refreshSize = function() {
            if (pendingRefresh) return;
            pendingRefresh = setTimeout(function() {
              fullPageElem.style.height = "0";
              fullPageElem.style.height = root.scrollHeight + "px";
              pendingRefresh = null;
            }, 500);
          };
          setTimeout(refreshSize, 10);
          addEvent("resize", refreshSize);
          var config = {
            attributes: true,
            childList: true,
            characterData: false
            // subtree: true
          };
          observer = new MutationObserver2(refreshSize);
          observer.observe(body, config);
          if (root.offsetHeight <= windowHeight) {
            var clearfix = document.createElement("div");
            clearfix.style.clear = "both";
            body.appendChild(clearfix);
          }
        }
        if (!options.fixedBackground && true) {
          body.style.backgroundAttachment = "scroll";
          html.style.backgroundAttachment = "scroll";
        }
      }
      function cleanup() {
        observer && observer.disconnect();
        removeEvent(wheelEvent, wheel);
        removeEvent("mousedown", mousedown);
        removeEvent("keydown", keydown);
        removeEvent("resize", refreshSize);
        removeEvent("load", init);
      }
      var que = [];
      var pending = false;
      var lastScroll = Date.now();
      function scrollArray(elem, left, top2) {
        directionCheck(left, top2);
        if (options.accelerationMax != 1) {
          var now = Date.now();
          var elapsed = now - lastScroll;
          if (elapsed < options.accelerationDelta) {
            var factor = (1 + 50 / elapsed) / 2;
            if (factor > 1) {
              factor = Math.min(factor, options.accelerationMax);
              left *= factor;
              top2 *= factor;
            }
          }
          lastScroll = Date.now();
        }
        que.push({
          x: left,
          y: top2,
          lastX: left < 0 ? 0.99 : -0.99,
          lastY: top2 < 0 ? 0.99 : -0.99,
          start: Date.now()
        });
        if (pending) {
          return;
        }
        var scrollRoot = getScrollRoot();
        var isWindowScroll = elem === scrollRoot || elem === document.body;
        if (elem.$scrollBehavior == null && isScrollBehaviorSmooth(elem)) {
          elem.$scrollBehavior = elem.style.scrollBehavior;
          elem.style.scrollBehavior = "auto";
        }
        var step = function(time) {
          var now2 = Date.now();
          var scrollX = 0;
          var scrollY = 0;
          for (var i = 0; i < que.length; i++) {
            var item = que[i];
            var elapsed2 = now2 - item.start;
            var finished = elapsed2 >= options.animationTime;
            var position = finished ? 1 : elapsed2 / options.animationTime;
            if (options.pulseAlgorithm) {
              position = pulse(position);
            }
            var x = item.x * position - item.lastX >> 0;
            var y = item.y * position - item.lastY >> 0;
            scrollX += x;
            scrollY += y;
            item.lastX += x;
            item.lastY += y;
            if (finished) {
              que.splice(i, 1);
              i--;
            }
          }
          if (isWindowScroll) {
            window.scrollBy(scrollX, scrollY);
          } else {
            if (scrollX) elem.scrollLeft += scrollX;
            if (scrollY) elem.scrollTop += scrollY;
          }
          if (!left && !top2) {
            que = [];
          }
          if (que.length) {
            requestFrame(step, elem, 1e3 / options.frameRate + 1);
          } else {
            pending = false;
            if (elem.$scrollBehavior != null) {
              elem.style.scrollBehavior = elem.$scrollBehavior;
              elem.$scrollBehavior = null;
            }
          }
        };
        requestFrame(step, elem, 0);
        pending = true;
      }
      function wheel(event) {
        if (!initDone) {
          init();
        }
        var target = getEventTargetDeep(event);
        if (event.defaultPrevented || event.ctrlKey) {
          return true;
        }
        if (isNodeName(activeElement, "embed") || isNodeName(target, "embed") && /\.pdf/i.test(target.src) || isNodeName(activeElement, "object")) {
          return true;
        }
        var deltaX = -event.wheelDeltaX || event.deltaX || 0;
        var deltaY = -event.wheelDeltaY || event.deltaY || 0;
        if (isMac) {
          if (event.wheelDeltaX && isDivisible(event.wheelDeltaX, 120)) {
            deltaX = -120 * (event.wheelDeltaX / Math.abs(event.wheelDeltaX));
          }
          if (event.wheelDeltaY && isDivisible(event.wheelDeltaY, 120)) {
            deltaY = -120 * (event.wheelDeltaY / Math.abs(event.wheelDeltaY));
          }
        }
        if (!deltaX && !deltaY) {
          deltaY = -event.wheelDelta || 0;
        }
        if (event.deltaMode === 1) {
          deltaX *= 40;
          deltaY *= 40;
        }
        var overflowing = overflowingAncestor(target);
        if (!overflowing) {
          if (isFrame && isChrome) {
            Object.defineProperty(event, "target", { value: window.frameElement });
            return parent.wheel(event);
          }
          return true;
        }
        if (isTouchpad(deltaY)) {
          return true;
        }
        if (Math.abs(deltaX) > 1.2) {
          deltaX *= options.stepSize / 120;
        }
        if (Math.abs(deltaY) > 1.2) {
          deltaY *= options.stepSize / 120;
        }
        scrollArray(overflowing, deltaX, deltaY);
        event.preventDefault();
        scheduleClearCache();
      }
      function keydown(event) {
        var target = getEventTargetDeep(event);
        var modifier = event.ctrlKey || event.altKey || event.metaKey || event.shiftKey && event.code !== "Space";
        if (!document.body.contains(activeElement)) {
          activeElement = document.activeElement;
        }
        var inputNodeNames = /^(textarea|select|embed|object)$/i;
        var buttonTypes = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (event.defaultPrevented || inputNodeNames.test(target.nodeName) || isNodeName(target, "input") && !buttonTypes.test(target.type) || isNodeName(activeElement, "video") || isInsideYoutubeVideo(event) || target.isContentEditable || modifier) {
          return true;
        }
        if ((isNodeName(target, "button") || isNodeName(target, "input") && buttonTypes.test(target.type)) && event.code === "Space") {
          return true;
        }
        if (isNodeName(target, "input") && target.type == "radio" && (event.code === "ArrowUp" || event.code === "ArrowDown" || event.code === "ArrowLeft" || event.code === "ArrowRight")) {
          return true;
        }
        var shift, x = 0, y = 0;
        var overflowing = overflowingAncestor(activeElement);
        if (!overflowing) {
          return isFrame && isChrome ? parent.keydown(event) : true;
        }
        var clientHeight = overflowing.clientHeight;
        if (overflowing == document.body) {
          clientHeight = window.innerHeight;
        }
        switch (event.code) {
          case "ArrowUp":
            y = -options.arrowScroll;
            break;
          case "ArrowDown":
            y = options.arrowScroll;
            break;
          case "Space":
            shift = event.shiftKey ? 1 : -1;
            y = -shift * clientHeight * 0.9;
            break;
          case "PageUp":
            y = -clientHeight * 0.9;
            break;
          case "PageDown":
            y = clientHeight * 0.9;
            break;
          case "Home":
            if (overflowing == document.body && document.scrollingElement)
              overflowing = document.scrollingElement;
            y = -overflowing.scrollTop;
            break;
          case "End":
            var scroll = overflowing.scrollHeight - overflowing.scrollTop;
            var scrollRemaining = scroll - clientHeight;
            y = scrollRemaining > 0 ? scrollRemaining + 10 : 0;
            break;
          case "ArrowLeft":
            x = -options.arrowScroll;
            break;
          case "ArrowRight":
            x = options.arrowScroll;
            break;
          default:
            return true;
        }
        scrollArray(overflowing, x, y);
        event.preventDefault();
        scheduleClearCache();
      }
      function mousedown(event) {
        activeElement = getEventTargetDeep(event);
      }
      function getEventTargetDeep(event) {
        return event.composedPath ? event.composedPath()[0] : event.target;
      }
      var uniqueID = /* @__PURE__ */ function() {
        var i = 0;
        return function(el) {
          return el.uniqueID || (el.uniqueID = i++);
        };
      }();
      var cacheY = {};
      var clearCacheTimer;
      var smoothBehaviorForElement = {};
      function scheduleClearCache() {
        clearTimeout(clearCacheTimer);
        clearCacheTimer = setInterval(function() {
          cacheY = smoothBehaviorForElement = {};
        }, 1 * 1e3);
      }
      function setCache(elems, overflowing, x) {
        var cache = cacheY;
        for (var i = elems.length; i--; )
          cache[uniqueID(elems[i])] = overflowing;
        return overflowing;
      }
      function getCache(el, x) {
        return cacheY[uniqueID(el)];
      }
      function overflowingAncestor(el) {
        var elems = [];
        var body = document.body;
        var rootScrollHeight = root.scrollHeight;
        while (el) {
          var cached = getCache(el);
          if (cached) {
            return setCache(elems, cached);
          }
          elems.push(el);
          if (rootScrollHeight === el.scrollHeight) {
            var topOverflowsNotHidden = overflowNotHidden(root) && overflowNotHidden(body);
            var isOverflowCSS = topOverflowsNotHidden || overflowAutoOrScroll(root);
            if (isFrame && isContentOverflowing(root) || !isFrame && isOverflowCSS) {
              return setCache(elems, getScrollRoot());
            }
          } else if (isContentOverflowing(el) && overflowAutoOrScroll(el)) {
            return setCache(elems, el);
          }
          el = el.parentElement || el.getRootNode && el.getRootNode().host;
        }
      }
      function isContentOverflowing(el) {
        return el.clientHeight + 10 < el.scrollHeight;
      }
      function overflowNotHidden(el) {
        var overflow = getComputedStyle(el, "").getPropertyValue("overflow-y");
        return overflow !== "hidden";
      }
      function overflowAutoOrScroll(el) {
        var overflow = getComputedStyle(el, "").getPropertyValue("overflow-y");
        return overflow === "scroll" || overflow === "auto";
      }
      function isScrollBehaviorSmooth(el) {
        var id = uniqueID(el);
        if (smoothBehaviorForElement[id] == null) {
          var scrollBehavior = getComputedStyle(el, "")["scroll-behavior"];
          smoothBehaviorForElement[id] = "smooth" == scrollBehavior;
        }
        return smoothBehaviorForElement[id];
      }
      function addEvent(type, fn, arg) {
        window.addEventListener(type, fn, arg || false);
      }
      function removeEvent(type, fn, arg) {
        window.removeEventListener(type, fn, false);
      }
      function isNodeName(el, tag) {
        return el && (el.nodeName || "").toLowerCase() === tag.toLowerCase();
      }
      function directionCheck(x, y) {
        x = x > 0 ? 1 : -1;
        y = y > 0 ? 1 : -1;
        if (direction.x !== x || direction.y !== y) {
          direction.x = x;
          direction.y = y;
          que = [];
          lastScroll = 0;
        }
      }
      try {
        if (localStorage.SS_deltaBuffer) {
          deltaBuffer = localStorage.SS_deltaBuffer.split(",");
        }
      } catch (e) {
      }
      function isTouchpad(deltaY) {
        if (!deltaY) return;
        if (!deltaBuffer.length) {
          deltaBuffer = [deltaY, deltaY, deltaY];
        }
        deltaY = Math.abs(deltaY);
        deltaBuffer.push(deltaY);
        deltaBuffer.shift();
        clearTimeout(deltaBufferTimer);
        deltaBufferTimer = setTimeout(function() {
          try {
            localStorage.SS_deltaBuffer = deltaBuffer.join(",");
          } catch (e) {
          }
        }, 1e3);
        var dpiScaledWheelDelta = deltaY > 120 && allDeltasDivisableBy(deltaY);
        var tp = !allDeltasDivisableBy(120) && !allDeltasDivisableBy(100) && !dpiScaledWheelDelta;
        if (deltaY < 50) return true;
        return tp;
      }
      function isDivisible(n, divisor) {
        return Math.floor(n / divisor) == n / divisor;
      }
      function allDeltasDivisableBy(divisor) {
        return isDivisible(deltaBuffer[0], divisor) && isDivisible(deltaBuffer[1], divisor) && isDivisible(deltaBuffer[2], divisor);
      }
      function isInsideYoutubeVideo(event) {
        var elem = getEventTargetDeep(event);
        var isControl = false;
        if (document.URL.indexOf("www.youtube.com/watch") != -1) {
          do {
            isControl = elem.classList && elem.classList.contains("html5-video-controls");
            if (isControl) break;
          } while (elem = elem.parentNode);
        }
        return isControl;
      }
      var requestFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback, element, delay) {
          window.setTimeout(callback, delay || 1e3 / 60);
        };
      }();
      var MutationObserver2 = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
      var getScrollRoot = function() {
        var SCROLL_ROOT = document.scrollingElement;
        return function() {
          if (!SCROLL_ROOT) {
            var dummy = document.createElement("div");
            dummy.style.cssText = "height:10000px;width:1px;";
            document.body.appendChild(dummy);
            var bodyScrollTop = document.body.scrollTop;
            document.documentElement.scrollTop;
            window.scrollBy(0, 3);
            if (document.body.scrollTop != bodyScrollTop)
              SCROLL_ROOT = document.body;
            else
              SCROLL_ROOT = document.documentElement;
            window.scrollBy(0, -3);
            document.body.removeChild(dummy);
          }
          return SCROLL_ROOT;
        };
      }();
      function pulse_(x) {
        var val, start, expx;
        x = x * options.pulseScale;
        if (x < 1) {
          val = x - (1 - Math.exp(-x));
        } else {
          start = Math.exp(-1);
          x -= 1;
          expx = 1 - Math.exp(-x);
          val = start + expx * (1 - start);
        }
        return val * options.pulseNormalize;
      }
      function pulse(x) {
        if (x >= 1) return 1;
        if (x <= 0) return 0;
        if (options.pulseNormalize == 1) {
          options.pulseNormalize /= pulse_(1);
        }
        return pulse_(x);
      }
      var userAgent = window.navigator.userAgent;
      var isEdge = /Edge/.test(userAgent);
      var isChrome = /chrome/i.test(userAgent) && !isEdge;
      var isSafari = /safari/i.test(userAgent) && !isEdge;
      var isMobile = /mobile/i.test(userAgent);
      var isIEWin7 = /Windows NT 6.1/i.test(userAgent) && /rv:11/i.test(userAgent);
      var isOldSafari = isSafari && (/Version\/8/i.test(userAgent) || /Version\/9/i.test(userAgent));
      var isEnabledForBrowser = (isChrome || isSafari || isIEWin7) && !isMobile;
      var supportsPassive = false;
      try {
        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get: function() {
            supportsPassive = true;
          }
        }));
      } catch (e) {
      }
      var wheelOpt = supportsPassive ? { passive: false } : false;
      var wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
      if (wheelEvent && isEnabledForBrowser) {
        addEvent(wheelEvent, wheel, wheelOpt);
        addEvent("mousedown", mousedown);
        addEvent("load", init);
      }
      function SmoothScroll2(optionsToSet) {
        for (var key in optionsToSet)
          if (defaultOptions.hasOwnProperty(key))
            options[key] = optionsToSet[key];
      }
      SmoothScroll2.destroy = cleanup;
      if (window.SmoothScrollOptions)
        SmoothScroll2(window.SmoothScrollOptions);
      module.exports = SmoothScroll2;
    })();
  })(SmoothScroll$1);
  return SmoothScroll$1.exports;
}
var SmoothScrollExports = requireSmoothScroll();
const SmoothScroll = /* @__PURE__ */ getDefaultExportFromCjs(SmoothScrollExports);
function smoothScroll() {
  SmoothScroll({
    animationTime: 1e3,
    // Увеличение времени анимации
    stepSize: 100
    // Меньший шаг прокрутки
  });
}
document.addEventListener("DOMContentLoaded", function() {
  scrollAnimationInit();
  scrollTrigger();
  dataCounter();
  anchorScroll();
  smoothScroll();
});
