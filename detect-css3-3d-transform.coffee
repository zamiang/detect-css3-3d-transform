(->
  docElement = document.documentElement
  uagent = navigator.userAgent.toLowerCase()

  browsers = [
    ['webkit',  530]        # not well supported in Safari 4, Safari 5 webkit version is 530.17
    ['chrome',  12]
    ['mozilla', 10]
    ['opera',   Infinity]   # not supported
    ['msie',    Infinity] ] # not supported

  # From: http://api.jquery.com/jQuery.browser
  uaMatch = (ua) ->
    match =
      /(chrome)[ \/]([\w.]+)/.exec(ua) or
      /(webkit)[ \/]([\w.]+)/.exec(ua) or
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) or
      /(msie) ([\w.]+)/.exec(ua) or
      ua.indexOf("compatible") < 0 and /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) or
      []
    { browser: (match[ 1 ] or ""), version: (match[2]?.split('.')[0] or 0) }

  addNo3dTransform = ->
    docElement.className = docElement.className.replace 'csstransforms3d', ''
    docElement.className += ' no-csstransforms3d'

  add3dTransform = ->
    docElement.className = docElement.className.replace 'no-csstransforms3d', ''
    docElement.className += ' csstransforms3d'

  # default to no CSS3 3d transform support
  addNo3dTransform()

  match = uaMatch uagent
  for browser in browsers
    if browser[0] == match.browser
      if match.version >= browser[1]
        add3dTransform()
      else
        addNo3dTransform()
      break

  IS_IPHONE = uagent.search('iphone') > -1 or uagent.search('ipod') > -1
  IS_IPAD = uagent.search('ipad') > -1
  IS_IOS = IS_IPHONE or IS_IPAD

  # iOS 6 is our support cut off for iPad
  match = /\os ([0-9]+)/.exec uagent
  IS_LT_IOS6 = match and match[1] and Number(match[1]) < 6

  # 3d transfors are supported but do not work well on iPhone
  if IS_IPHONE
    addNo3dTransform()

  # disable 3d transform for older versions of Safari on iPad
  else if IS_IPAD and IS_LT_IOS6
    addNo3dTransform()

  # deactivate 3d transform for Safari on Windows
  else if navigator.userAgent.search('Safari') > -1 and navigator.userAgent.search('Windows') > -1 and navigator.userAgent.indexOf('Chrome') === -1
    addNo3dTransform()
)()
