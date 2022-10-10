// 移动端适配
/* eslint-disable */
;(function (win, lib = {}) {
  var doc = win.document;
  var docEl = doc.documentElement;
  var metaEl = doc.querySelector('meta[name="viewport"]');
  var flexibleEl = doc.querySelector('meta[name="flexible"]');
  var dpr = 0;
  var scale = 0;
  // @ts-ignore
  var tid;
  // @ts-ignore
  var flexible = lib.flexible || (lib.flexible = {});
  if (metaEl) {
    // @ts-ignore
    var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
    if (match) {
      scale = parseFloat(match[1]);
      dpr = parseInt(String(1 / scale));
    }
  } else if (flexibleEl) {
    var content = flexibleEl.getAttribute('content');
    if (content) {
      var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
      var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
      if (initialDpr) {
        dpr = parseFloat(initialDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
      if (maximumDpr) {
        dpr = parseFloat(maximumDpr[1]);
        scale = parseFloat((1 / dpr).toFixed(2));
      }
    }
  }
  if (!dpr && !scale) {
    // var isAndroid = win.navigator.appVersion.match(/android/gi);
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    if (isIPhone) {
      // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
      if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
        dpr = 3;
      } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
        dpr = 2;
      } else {
        dpr = 1;
      }
    } else {
      // 其他设备下，仍旧使用1倍的方案
      dpr = 1;
    }
    scale = 1 / dpr;
  }
  docEl.setAttribute('data-dpr', String(dpr));
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(metaEl);
    } else {
      var wrap = doc.createElement('div');
      wrap.appendChild(metaEl);
      doc.write(wrap.innerHTML);
    }
  }
  function refreshRem() {
    var width = docEl.getBoundingClientRect().width;
    if (width / dpr > 750) {
      width = 750 * dpr;
    }
    var rem = width / 7.5;
    docEl.style.fontSize = rem + 'px';
    var realitySize = parseInt(window.getComputedStyle(document.documentElement).fontSize);
    if (rem !== realitySize) {
      rem = rem * rem / realitySize;
      docEl.style.fontSize = rem + 'px';
    }
    // @ts-ignore
    flexible.rem = win.rem = rem;
  }
  win.addEventListener('resize', function () {
    // @ts-ignore
    clearTimeout(tid);
    tid = setTimeout(refreshRem, 300);
  }, false);
  win.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      // @ts-ignore
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }
  }, false);
  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = 12 * dpr + 'px';
  } else {
    doc.addEventListener('DOMContentLoaded', function (e) {
      doc.body.style.fontSize = 12 * dpr + 'px';
    }, false);
  }
  refreshRem();
  // @ts-ignore
  flexible.dpr = win.dpr = dpr;
  flexible.refreshRem = refreshRem;
  // @ts-ignore
  flexible.rem2px = function (d) {
    var val = parseFloat(d) * this.rem;
    if (typeof d === 'string' && d.match(/rem$/)) {
      // @ts-ignore
      val += 'px';
    }
    return val;
  }
  // @ts-ignore
  flexible.px2rem = function (d) {
    var val = parseFloat(d) / this.rem;
    if (typeof d === 'string' && d.match(/px$/)) {
      // @ts-ignore
      val += 'rem';
    }
    return val;
  }
  // iphone 缩放问题
  try {
    // 禁用双击缩放
    document.addEventListener("touchstart", function(event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    });
    var lastTouchEnd = 0;
    document.addEventListener(
      "touchend",
      function(event) {
        var now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      },
      false
    );
    // 禁用双指手势操作
    document.addEventListener("gesturestart", function(event) {
      event.preventDefault();
    });
  } catch (error) {}
})(window);