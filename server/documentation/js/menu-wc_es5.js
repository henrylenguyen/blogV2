'use strict'

function _typeof(o) {
  '@babel/helpers - typeof'
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (o) {
            return typeof o
          }
        : function (o) {
            return o && 'function' == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype
              ? 'symbol'
              : typeof o
          }),
    _typeof(o)
  )
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError('Cannot call a class as a function')
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t]
    ;(o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      'value' in o && (o.writable = !0),
      Object.defineProperty(e, _toPropertyKey(o.key), o)
  }
}
function _createClass(e, r, t) {
  return (
    r && _defineProperties(e.prototype, r),
    t && _defineProperties(e, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  )
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, 'string')
  return 'symbol' == _typeof(i) ? i : i + ''
}
function _toPrimitive(t, r) {
  if ('object' != _typeof(t) || !t) return t
  var e = t[Symbol.toPrimitive]
  if (void 0 !== e) {
    var i = e.call(t, r || 'default')
    if ('object' != _typeof(i)) return i
    throw new TypeError('@@toPrimitive must return a primitive value.')
  }
  return ('string' === r ? String : Number)(t)
}
function _callSuper(t, o, e) {
  return (
    (o = _getPrototypeOf(o)),
    _possibleConstructorReturn(
      t,
      _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)
    )
  )
}
function _possibleConstructorReturn(t, e) {
  if (e && ('object' == _typeof(e) || 'function' == typeof e)) return e
  if (void 0 !== e) throw new TypeError('Derived constructors may only return object or undefined')
  return _assertThisInitialized(t)
}
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
  return e
}
function _inherits(t, e) {
  if ('function' != typeof e && null !== e) throw new TypeError('Super expression must either be null or a function')
  ;(t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } })),
    Object.defineProperty(t, 'prototype', { writable: !1 }),
    e && _setPrototypeOf(t, e)
}
function _wrapNativeSuper(t) {
  var r = 'function' == typeof Map ? new Map() : void 0
  return (
    (_wrapNativeSuper = function _wrapNativeSuper(t) {
      if (null === t || !_isNativeFunction(t)) return t
      if ('function' != typeof t) throw new TypeError('Super expression must either be null or a function')
      if (void 0 !== r) {
        if (r.has(t)) return r.get(t)
        r.set(t, Wrapper)
      }
      function Wrapper() {
        return _construct(t, arguments, _getPrototypeOf(this).constructor)
      }
      return (
        (Wrapper.prototype = Object.create(t.prototype, {
          constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 }
        })),
        _setPrototypeOf(Wrapper, t)
      )
    }),
    _wrapNativeSuper(t)
  )
}
function _construct(t, e, r) {
  if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments)
  var o = [null]
  o.push.apply(o, e)
  var p = new (t.bind.apply(t, o))()
  return r && _setPrototypeOf(p, r.prototype), p
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}))
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t
  })()
}
function _isNativeFunction(t) {
  try {
    return -1 !== Function.toString.call(t).indexOf('[native code]')
  } catch (n) {
    return 'function' == typeof t
  }
}
function _setPrototypeOf(t, e) {
  return (
    (_setPrototypeOf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (t, e) {
          return (t.__proto__ = e), t
        }),
    _setPrototypeOf(t, e)
  )
}
function _getPrototypeOf(t) {
  return (
    (_getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t)
        }),
    _getPrototypeOf(t)
  )
}
customElements.define(
  'compodoc-menu',
  /*#__PURE__*/ (function (_HTMLElement) {
    function _class() {
      var _this
      _classCallCheck(this, _class)
      _this = _callSuper(this, _class)
      _this.isNormalMode = _this.getAttribute('mode') === 'normal'
      return _this
    }
    _inherits(_class, _HTMLElement)
    return _createClass(_class, [
      {
        key: 'connectedCallback',
        value: function connectedCallback() {
          this.render(this.isNormalMode)
        }
      },
      {
        key: 'render',
        value: function render(isNormalMode) {
          var tp = lithtml.html(
            '\n        <nav>\n            <ul class="list">\n                <li class="title">\n                    <a href="index.html" data-type="index-link">server documentation</a>\n                </li>\n\n                <li class="divider"></li>\n                '
              .concat(
                isNormalMode
                  ? '<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>'
                  : '',
                '\n                <li class="chapter">\n                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>\n                    <ul class="links">\n                        <li class="link">\n                            <a href="overview.html" data-type="chapter-link">\n                                <span class="icon ion-ios-keypad"></span>Overview\n                            </a>\n                        </li>\n                        <li class="link">\n                            <a href="index.html" data-type="chapter-link">\n                                <span class="icon ion-ios-paper"></span>README\n                            </a>\n                        </li>\n                                <li class="link">\n                                    <a href="dependencies.html" data-type="chapter-link">\n                                        <span class="icon ion-ios-list"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class="link">\n                                    <a href="properties.html" data-type="chapter-link">\n                                        <span class="icon ion-ios-apps"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class="chapter modules">\n                        <a data-type="chapter-link" href="modules.html">\n                            <div class="menu-toggler linked" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode ? 'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"',
                '>\n                                <span class="icon ion-ios-archive"></span>\n                                <span class="link-name">Modules</span>\n                                <span class="icon ion-ios-arrow-down"></span>\n                            </div>\n                        </a>\n                        <ul class="links collapse " '
              )
              .concat(
                isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"',
                '>\n                            <li class="link">\n                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>\n                            </li>\n                            <li class="link">\n                                <a href="modules/CarouselsModule.html" data-type="entity-link" >CarouselsModule</a>\n                                    <li class="chapter inner">\n                                        <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links-module-CarouselsModule-8fcfe1934804ecbba8408f395780e1b2a2b75070b18da524a850e75b5745ff7bad0c3987efc22d040403caa41ba1a6b294d620a49d8f8839094261de8878c184"'
                  : 'data-bs-target="#xs-controllers-links-module-CarouselsModule-8fcfe1934804ecbba8408f395780e1b2a2b75070b18da524a850e75b5745ff7bad0c3987efc22d040403caa41ba1a6b294d620a49d8f8839094261de8878c184"',
                '>\n                                            <span class="icon ion-md-swap"></span>\n                                            <span>Controllers</span>\n                                            <span class="icon ion-ios-arrow-down"></span>\n                                        </div>\n                                        <ul class="links collapse" '
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links-module-CarouselsModule-8fcfe1934804ecbba8408f395780e1b2a2b75070b18da524a850e75b5745ff7bad0c3987efc22d040403caa41ba1a6b294d620a49d8f8839094261de8878c184"'
                  : 'id="xs-controllers-links-module-CarouselsModule-8fcfe1934804ecbba8408f395780e1b2a2b75070b18da524a850e75b5745ff7bad0c3987efc22d040403caa41ba1a6b294d620a49d8f8839094261de8878c184"',
                '>\n                                            <li class="link">\n                                                <a href="controllers/CarouselsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarouselsController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-CarouselsModule-8fcfe1934804ecbba8408f395780e1b2a2b75070b18da524a850e75b5745ff7bad0c3987efc22d040403caa41ba1a6b294d620a49d8f8839094261de8878c184"'
                  : 'data-bs-target="#xs-injectables-links-module-CarouselsModule-8fcfe1934804ecbba8408f395780e1b2a2b75070b18da524a850e75b5745ff7bad0c3987efc22d040403caa41ba1a6b294d620a49d8f8839094261de8878c184"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" '
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-CarouselsModule-8fcfe1934804ecbba8408f395780e1b2a2b75070b18da524a850e75b5745ff7bad0c3987efc22d040403caa41ba1a6b294d620a49d8f8839094261de8878c184"'
                  : 'id="xs-injectables-links-module-CarouselsModule-8fcfe1934804ecbba8408f395780e1b2a2b75070b18da524a850e75b5745ff7bad0c3987efc22d040403caa41ba1a6b294d620a49d8f8839094261de8878c184"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/CarouselsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CarouselsService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/SharepointModule.html" data-type="entity-link" >SharepointModule</a>\n                                    <li class="chapter inner">\n                                        <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links-module-SharepointModule-cdfd28b94873df294e8164136b8598ee8c4311c9858d975745c57c79fd4ca7266da201bc61927816d8e35b373cd4e0adece14a7a5178e10570548cbd89a7c653"'
                  : 'data-bs-target="#xs-controllers-links-module-SharepointModule-cdfd28b94873df294e8164136b8598ee8c4311c9858d975745c57c79fd4ca7266da201bc61927816d8e35b373cd4e0adece14a7a5178e10570548cbd89a7c653"',
                '>\n                                            <span class="icon ion-md-swap"></span>\n                                            <span>Controllers</span>\n                                            <span class="icon ion-ios-arrow-down"></span>\n                                        </div>\n                                        <ul class="links collapse" '
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links-module-SharepointModule-cdfd28b94873df294e8164136b8598ee8c4311c9858d975745c57c79fd4ca7266da201bc61927816d8e35b373cd4e0adece14a7a5178e10570548cbd89a7c653"'
                  : 'id="xs-controllers-links-module-SharepointModule-cdfd28b94873df294e8164136b8598ee8c4311c9858d975745c57c79fd4ca7266da201bc61927816d8e35b373cd4e0adece14a7a5178e10570548cbd89a7c653"',
                '>\n                                            <li class="link">\n                                                <a href="controllers/SharepointController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SharepointController</a>\n                                            </li>\n                                            <li class="link">\n                                                <a href="controllers/UploadController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-SharepointModule-cdfd28b94873df294e8164136b8598ee8c4311c9858d975745c57c79fd4ca7266da201bc61927816d8e35b373cd4e0adece14a7a5178e10570548cbd89a7c653"'
                  : 'data-bs-target="#xs-injectables-links-module-SharepointModule-cdfd28b94873df294e8164136b8598ee8c4311c9858d975745c57c79fd4ca7266da201bc61927816d8e35b373cd4e0adece14a7a5178e10570548cbd89a7c653"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" '
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-SharepointModule-cdfd28b94873df294e8164136b8598ee8c4311c9858d975745c57c79fd4ca7266da201bc61927816d8e35b373cd4e0adece14a7a5178e10570548cbd89a7c653"'
                  : 'id="xs-injectables-links-module-SharepointModule-cdfd28b94873df294e8164136b8598ee8c4311c9858d975745c57c79fd4ca7266da201bc61927816d8e35b373cd4e0adece14a7a5178e10570548cbd89a7c653"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/SharepointService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SharepointService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/TelegramModule.html" data-type="entity-link" >TelegramModule</a>\n                                    <li class="chapter inner">\n                                        <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links-module-TelegramModule-68055d232671c5e7d0cbd7803813995bbd1b394f154aabbdf32125f1bfdb9dba4256a58a3221d6a6c8fb91f56e269cc142edba90a9f248e69b443d1c6b18e3c2"'
                  : 'data-bs-target="#xs-controllers-links-module-TelegramModule-68055d232671c5e7d0cbd7803813995bbd1b394f154aabbdf32125f1bfdb9dba4256a58a3221d6a6c8fb91f56e269cc142edba90a9f248e69b443d1c6b18e3c2"',
                '>\n                                            <span class="icon ion-md-swap"></span>\n                                            <span>Controllers</span>\n                                            <span class="icon ion-ios-arrow-down"></span>\n                                        </div>\n                                        <ul class="links collapse" '
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links-module-TelegramModule-68055d232671c5e7d0cbd7803813995bbd1b394f154aabbdf32125f1bfdb9dba4256a58a3221d6a6c8fb91f56e269cc142edba90a9f248e69b443d1c6b18e3c2"'
                  : 'id="xs-controllers-links-module-TelegramModule-68055d232671c5e7d0cbd7803813995bbd1b394f154aabbdf32125f1bfdb9dba4256a58a3221d6a6c8fb91f56e269cc142edba90a9f248e69b443d1c6b18e3c2"',
                '>\n                                            <li class="link">\n                                                <a href="controllers/TelegramController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TelegramController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-TelegramModule-68055d232671c5e7d0cbd7803813995bbd1b394f154aabbdf32125f1bfdb9dba4256a58a3221d6a6c8fb91f56e269cc142edba90a9f248e69b443d1c6b18e3c2"'
                  : 'data-bs-target="#xs-injectables-links-module-TelegramModule-68055d232671c5e7d0cbd7803813995bbd1b394f154aabbdf32125f1bfdb9dba4256a58a3221d6a6c8fb91f56e269cc142edba90a9f248e69b443d1c6b18e3c2"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" '
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-TelegramModule-68055d232671c5e7d0cbd7803813995bbd1b394f154aabbdf32125f1bfdb9dba4256a58a3221d6a6c8fb91f56e269cc142edba90a9f248e69b443d1c6b18e3c2"'
                  : 'id="xs-injectables-links-module-TelegramModule-68055d232671c5e7d0cbd7803813995bbd1b394f154aabbdf32125f1bfdb9dba4256a58a3221d6a6c8fb91f56e269cc142edba90a9f248e69b443d1c6b18e3c2"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/TelegramService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TelegramService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/UploadModule.html" data-type="entity-link" >UploadModule</a>\n                                    <li class="chapter inner">\n                                        <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links-module-UploadModule-cbca01376dbb28dfcebd45d2bc47d2307d266ef0af864643b5769ae2bc2e81a98fb48b815a5139e09ebb29cbd1a7d90c2c8013dac558ecba6e54b419c43e8025"'
                  : 'data-bs-target="#xs-controllers-links-module-UploadModule-cbca01376dbb28dfcebd45d2bc47d2307d266ef0af864643b5769ae2bc2e81a98fb48b815a5139e09ebb29cbd1a7d90c2c8013dac558ecba6e54b419c43e8025"',
                '>\n                                            <span class="icon ion-md-swap"></span>\n                                            <span>Controllers</span>\n                                            <span class="icon ion-ios-arrow-down"></span>\n                                        </div>\n                                        <ul class="links collapse" '
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links-module-UploadModule-cbca01376dbb28dfcebd45d2bc47d2307d266ef0af864643b5769ae2bc2e81a98fb48b815a5139e09ebb29cbd1a7d90c2c8013dac558ecba6e54b419c43e8025"'
                  : 'id="xs-controllers-links-module-UploadModule-cbca01376dbb28dfcebd45d2bc47d2307d266ef0af864643b5769ae2bc2e81a98fb48b815a5139e09ebb29cbd1a7d90c2c8013dac558ecba6e54b419c43e8025"',
                '>\n                                            <li class="link">\n                                                <a href="controllers/UploadController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-UploadModule-cbca01376dbb28dfcebd45d2bc47d2307d266ef0af864643b5769ae2bc2e81a98fb48b815a5139e09ebb29cbd1a7d90c2c8013dac558ecba6e54b419c43e8025"'
                  : 'data-bs-target="#xs-injectables-links-module-UploadModule-cbca01376dbb28dfcebd45d2bc47d2307d266ef0af864643b5769ae2bc2e81a98fb48b815a5139e09ebb29cbd1a7d90c2c8013dac558ecba6e54b419c43e8025"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" '
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-UploadModule-cbca01376dbb28dfcebd45d2bc47d2307d266ef0af864643b5769ae2bc2e81a98fb48b815a5139e09ebb29cbd1a7d90c2c8013dac558ecba6e54b419c43e8025"'
                  : 'id="xs-injectables-links-module-UploadModule-cbca01376dbb28dfcebd45d2bc47d2307d266ef0af864643b5769ae2bc2e81a98fb48b815a5139e09ebb29cbd1a7d90c2c8013dac558ecba6e54b419c43e8025"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/UploadService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UploadService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                </ul>\n                </li>\n                        <li class="chapter">\n                            <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode ? 'data-bs-target="#controllers-links"' : 'data-bs-target="#xs-controllers-links"',
                '>\n                                <span class="icon ion-md-swap"></span>\n                                <span>Controllers</span>\n                                <span class="icon ion-ios-arrow-down"></span>\n                            </div>\n                            <ul class="links collapse " '
              )
              .concat(
                isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"',
                '>\n                                <li class="link">\n                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>\n                                </li>\n                                <li class="link">\n                                    <a href="controllers/CarouselsController.html" data-type="entity-link" >CarouselsController</a>\n                                </li>\n                                <li class="link">\n                                    <a href="controllers/SharepointController.html" data-type="entity-link" >SharepointController</a>\n                                </li>\n                                <li class="link">\n                                    <a href="controllers/TelegramController.html" data-type="entity-link" >TelegramController</a>\n                                </li>\n                                <li class="link">\n                                    <a href="controllers/UploadController.html" data-type="entity-link" >UploadController</a>\n                                </li>\n                            </ul>\n                        </li>\n                        <li class="chapter">\n                            <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode ? 'data-bs-target="#entities-links"' : 'data-bs-target="#xs-entities-links"',
                '>\n                                <span class="icon ion-ios-apps"></span>\n                                <span>Entities</span>\n                                <span class="icon ion-ios-arrow-down"></span>\n                            </div>\n                            <ul class="links collapse " '
              )
              .concat(
                isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"',
                '>\n                                <li class="link">\n                                    <a href="entities/CarouselEntiy.html" data-type="entity-link" >CarouselEntiy</a>\n                                </li>\n                                <li class="link">\n                                    <a href="entities/DocumentLibraryEntity.html" data-type="entity-link" >DocumentLibraryEntity</a>\n                                </li>\n                                <li class="link">\n                                    <a href="entities/MediaSharepointEntity.html" data-type="entity-link" >MediaSharepointEntity</a>\n                                </li>\n                                <li class="link">\n                                    <a href="entities/SiteCollectionEntity.html" data-type="entity-link" >SiteCollectionEntity</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class="chapter">\n                        <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode ? 'data-bs-target="#classes-links"' : 'data-bs-target="#xs-classes-links"',
                '>\n                            <span class="icon ion-ios-paper"></span>\n                            <span>Classes</span>\n                            <span class="icon ion-ios-arrow-down"></span>\n                        </div>\n                        <ul class="links collapse " '
              )
              .concat(
                isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"',
                '>\n                            <li class="link">\n                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/BaseDeleteDTO.html" data-type="entity-link" >BaseDeleteDTO</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/BaseDTO.html" data-type="entity-link" >BaseDTO</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/BaseEntities.html" data-type="entity-link" >BaseEntities</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/BaseModels.html" data-type="entity-link" >BaseModels</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/BasePaginationDTO.html" data-type="entity-link" >BasePaginationDTO</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/BaseRepository.html" data-type="entity-link" >BaseRepository</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/BaseUpdateDTO.html" data-type="entity-link" >BaseUpdateDTO</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/CarouselDTO.html" data-type="entity-link" >CarouselDTO</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/Carousels.html" data-type="entity-link" >Carousels</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/DocumentLibrary.html" data-type="entity-link" >DocumentLibrary</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/DocumentLibraryRepository.html" data-type="entity-link" >DocumentLibraryRepository</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/MediaSharepoint.html" data-type="entity-link" >MediaSharepoint</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/MediaSharepointRepository.html" data-type="entity-link" >MediaSharepointRepository</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/ResponseData.html" data-type="entity-link" >ResponseData</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/ResponsePaginationData.html" data-type="entity-link" >ResponsePaginationData</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/SharepointCreateDocumentLibraryDTO.html" data-type="entity-link" >SharepointCreateDocumentLibraryDTO</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/SharepointDeleteDocumentLibraryDTO.html" data-type="entity-link" >SharepointDeleteDocumentLibraryDTO</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/SharepointDeleteFileDTO.html" data-type="entity-link" >SharepointDeleteFileDTO</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/SharepointDeleteSiteCollectionDTO.html" data-type="entity-link" >SharepointDeleteSiteCollectionDTO</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/SharepointDTO.html" data-type="entity-link" >SharepointDTO</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/SharepointFileByPaginationDTO.html" data-type="entity-link" >SharepointFileByPaginationDTO</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/SharepointFileDTO.html" data-type="entity-link" >SharepointFileDTO</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/SharepointGetImageDTO.html" data-type="entity-link" >SharepointGetImageDTO</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/SharepointSoftDeleteDocumentLibraryDTO.html" data-type="entity-link" >SharepointSoftDeleteDocumentLibraryDTO</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/SharepointUpdateDocumentLibraryDTO.html" data-type="entity-link" >SharepointUpdateDocumentLibraryDTO</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/SharepointUploadFileDTO.html" data-type="entity-link" >SharepointUploadFileDTO</a>\n                            </li>\n                            <li class="link">\n                                <a href="classes/SiteCollection.html" data-type="entity-link" >SiteCollection</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class="chapter">\n                            <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode ? 'data-bs-target="#injectables-links"' : 'data-bs-target="#xs-injectables-links"',
                '>\n                                <span class="icon ion-md-arrow-round-down"></span>\n                                <span>Injectables</span>\n                                <span class="icon ion-ios-arrow-down"></span>\n                            </div>\n                            <ul class="links collapse " '
              )
              .concat(
                isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"',
                '>\n                                <li class="link">\n                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/CarouselsRepository.html" data-type="entity-link" >CarouselsRepository</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/CarouselsService.html" data-type="entity-link" >CarouselsService</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/ParseFile.html" data-type="entity-link" >ParseFile</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/SharepointService.html" data-type="entity-link" >SharepointService</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/SiteCollectionRepository.html" data-type="entity-link" >SiteCollectionRepository</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/TelegramService.html" data-type="entity-link" >TelegramService</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/UploadService.html" data-type="entity-link" >UploadService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class="chapter">\n                        <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode ? 'data-bs-target="#interfaces-links"' : 'data-bs-target="#xs-interfaces-links"',
                '>\n                            <span class="icon ion-md-information-circle-outline"></span>\n                            <span>Interfaces</span>\n                            <span class="icon ion-ios-arrow-down"></span>\n                        </div>\n                        <ul class="links collapse " '
              )
              .concat(
                isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"',
                '>\n                            <li class="link">\n                                <a href="interfaces/AdditionalProperties.html" data-type="entity-link" >AdditionalProperties</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/BaseInterfaceRepository.html" data-type="entity-link" >BaseInterfaceRepository</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/ICarousels.html" data-type="entity-link" >ICarousels</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IDocumentLibrary.html" data-type="entity-link" >IDocumentLibrary</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IMediaSharepoint.html" data-type="entity-link" >IMediaSharepoint</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IReponsePaginationData.html" data-type="entity-link" >IReponsePaginationData</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IResponseData.html" data-type="entity-link" >IResponseData</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/ISiteCollection.html" data-type="entity-link" >ISiteCollection</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class="chapter">\n                        <div class="simple menu-toggler" data-bs-toggle="collapse" '
              )
              .concat(
                isNormalMode ? 'data-bs-target="#miscellaneous-links"' : 'data-bs-target="#xs-miscellaneous-links"',
                '>\n                            <span class="icon ion-ios-cube"></span>\n                            <span>Miscellaneous</span>\n                            <span class="icon ion-ios-arrow-down"></span>\n                        </div>\n                        <ul class="links collapse " '
              )
              .concat(
                isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"',
                '>\n                            <li class="link">\n                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>\n                            </li>\n                            <li class="link">\n                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>\n                            </li>\n                            <li class="link">\n                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>\n                            </li>\n                            <li class="link">\n                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class="chapter">\n                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>\n                    </li>\n                    <li class="divider"></li>\n                    <li class="copyright">\n                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">\n                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        '
              )
          )
          this.innerHTML = tp.strings
        }
      }
    ])
  })(/*#__PURE__*/ _wrapNativeSuper(HTMLElement))
)
