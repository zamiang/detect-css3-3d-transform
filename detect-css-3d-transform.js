(function() {
  var IS_IOS, IS_IPAD, IS_IPHONE, IS_LT_IOS6, add3dTransform, addNo3dTransform, browser, browsers, docElement, match, uaMatch, uagent, _i, _len;
  docElement = document.documentElement;
  uagent = navigator.userAgent.toLowerCase();
  browsers = [['webkit', 530], ['chrome', 12], ['mozilla', 10], ['opera', Infinity], ['msie', Infinity]];
  uaMatch = function(ua) {
    var match, _ref;
    match = /(chrome)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
    return {
      browser: match[1] || "",
      version: ((_ref = match[2]) != null ? _ref.split('.')[0] : void 0) || 0
    };
  };
  addNo3dTransform = function() {
    docElement.className = docElement.className.replace('csstransforms3d', '');
    return docElement.className += ' no-csstransforms3d';
  };
  add3dTransform = function() {
    docElement.className = docElement.className.replace('no-csstransforms3d', '');
    return docElement.className += ' csstransforms3d';
  };
  addNo3dTransform();
  match = uaMatch(uagent);
  for (_i = 0, _len = browsers.length; _i < _len; _i++) {
    browser = browsers[_i];
    if (browser[0] === match.browser) {
      if (match.version >= browser[1]) {
        add3dTransform();
      } else {
        addNo3dTransform();
      }
      break;
    }
  }
  IS_IPHONE = uagent.search('iphone') > -1 || uagent.search('ipod') > -1;
  IS_IPAD = uagent.search('ipad') > -1;
  IS_IOS = IS_IPHONE || IS_IPAD;
  match = /\os ([0-9]+)/.exec(uagent);
  IS_LT_IOS6 = match && match[1] && Number(match[1]) < 6;
  if (IS_IPHONE) {
    return addNo3dTransform();
  } else if (IS_IPAD && IS_LT_IOS6) {
    return addNo3dTransform();
  } else if (navigator.userAgent.search('Safari') > -1 && navigator.userAgent.search('Windows') > -1 && navigator.userAgent.indexOf('Chrome') === -1) {
    return addNo3dTransform();
  }
})();
