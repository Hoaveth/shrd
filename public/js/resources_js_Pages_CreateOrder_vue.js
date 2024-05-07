"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_Pages_CreateOrder_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CreateOrder.vue?vue&type=script&lang=js":
/*!************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CreateOrder.vue?vue&type=script&lang=js ***!
  \************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @inertiajs/inertia */ "./node_modules/@inertiajs/inertia/dist/index.js");
/* harmony import */ var primevue_inputnumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primevue/inputnumber */ "./node_modules/primevue/inputnumber/inputnumber.esm.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  data: function data() {
    return {
      products: this.products,
      customerId: this.customer.id,
      customer: this.customer,
      customerFullName: '',
      cartItems: [],
      taxRate: 0.0,
      // Sample tax rate
      selectedFinancialStatus: "pending",
      selectedFulfillmentStatus: "unfulfilled"
    };
  },
  mounted: function mounted() {
    this.getCustomerFullName();
  },
  computed: {
    totalItems: function totalItems() {
      return this.cartItems.reduce(function (total, item) {
        return total + item.quantity;
      }, 0);
    }
  },
  props: {
    products: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    customer: Object
  },
  methods: {
    getCustomerFullName: function getCustomerFullName() {
      if (this.customer) {
        var fullName = '';
        if (this.customer.first_name) {
          fullName += this.customer.first_name;
        }
        if (this.customer.last_name) {
          if (fullName.length > 0) {
            fullName += ' '; // Add a space if first name is also there
          }

          fullName += this.customer.last_name;
        }
        this.customerFullName = fullName;
      }
      return '';
    },
    addToCart: function addToCart(product) {
      var _this = this;
      var existingItem = this.cartItems.find(function (item) {
        return _this.isEqualProduct(item, product);
      });
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cartItems.push(_objectSpread(_objectSpread({}, product), {}, {
          quantity: 1
        }));
      }
    },
    isEqualProduct: function isEqualProduct(product1, product2) {
      // Compare all properties that determine the equality of products
      return product1.id === product2.id /* Add other comparison conditions if necessary */;
    },
    prepareOrderData: function prepareOrderData() {
      var lineItems = this.cartItems.map(function (item) {
        return {
          variant_id: item.id,
          quantity: item.quantity,
          price: item.price
        };
      });
      var customer = {
        id: this.customerId
      };
      return {
        order: {
          line_items: lineItems,
          customer: customer,
          financial_status: this.selectedFinancialStatus,
          email: this.customer.email,
          fulfillment_status: this.selectedFulfillmentStatus
        }
      };
    },
    removeFromCart: function removeFromCart(itemToRemove) {
      var index = this.cartItems.findIndex(function (item) {
        return item === itemToRemove;
      });
      if (index !== -1) {
        this.cartItems.splice(index, 1);
      }
    },
    calculateSubtotal: function calculateSubtotal() {
      return this.cartItems.reduce(function (total, item) {
        return total + item.price * item.quantity;
      }, 0);
    },
    calculateTax: function calculateTax() {
      return (this.calculateSubtotal() * this.taxRate).toFixed(2);
    },
    calculateTotal: function calculateTotal() {
      return this.calculateSubtotal() + parseFloat(this.calculateTax());
    },
    fetchProducts: function fetchProducts() {
      var _this2 = this;
      this.showLoadingAlert();
      var shopId = localStorage.getItem('selectedStore');
      var url = '/products/' + shopId;
      // Make an API call to fetch Shopify products
      // You can use Axios or Vue Resource here
      _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0__.Inertia.get(url).then(function (response) {
        _this2.products = response.data;
      })["catch"](function (error) {
        console.error('Error fetching Shopify products:', error);
      });
      this.closeLoadingAlert();
    },
    submitOrderData: function submitOrderData() {
      var _this3 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var orderData, shopId, url;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this3.showLoadingAlert();
              orderData = _this3.prepareOrderData();
              shopId = localStorage.getItem('selectedStore');
              console.log(orderData);
              url = '/order/create/' + shopId + '/' + _this3.customerId;
              _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0__.Inertia.post(url, orderData, {
                onSuccess: function onSuccess(page) {
                  _this3.closeLoadingAlert();
                  _this3.successMessage = page.props.onSuccess;
                  _this3.cartItems = [];
                  sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().fire({
                    icon: 'success',
                    title: 'Success',
                    text: _this3.successMessage // Assuming your response contains a success message
                  });
                },

                onError: function onError(error) {
                  _this3.closeLoadingAlert;
                  // Handle errors here
                  // If validation errors exist, set them to the errors object
                  // this.errors = errors.response;
                  console.error('Error registering store:', error);
                }
              });
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }))();
    },
    showLoadingAlert: function showLoadingAlert() {
      sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().fire({
        title: 'Please wait...',
        html: 'Data is being processed.',
        allowOutsideClick: false,
        didOpen: function didOpen() {
          sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().showLoading();
        }
      });
    },
    closeLoadingAlert: function closeLoadingAlert() {
      sweetalert2__WEBPACK_IMPORTED_MODULE_2___default().close();
    },
    gotoAllCustomers: function gotoAllCustomers() {
      var _this4 = this;
      this.navigateWithInertiaEvents('/customers', {
        onStart: function onStart() {
          _this4.showLoadingAlert();
        },
        onFinish: function onFinish() {
          _this4.closeLoadingAlert();
        }
      });
    },
    goToCustomerPage: function goToCustomerPage(customerId) {
      var _this5 = this;
      var shopId = localStorage.getItem('selectedStore');
      this.navigateWithInertiaEvents("/customer/".concat(customerId, "/").concat(shopId), {
        onStart: function onStart() {
          _this5.showLoadingAlert();
        },
        onFinish: function onFinish() {
          _this5.closeLoadingAlert();
        }
      });
    },
    navigateWithInertiaEvents: function navigateWithInertiaEvents(url) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$onStart = _ref.onStart,
        onStart = _ref$onStart === void 0 ? function () {} : _ref$onStart,
        _ref$onFinish = _ref.onFinish,
        onFinish = _ref$onFinish === void 0 ? function () {} : _ref$onFinish;
      var startHandler = function startHandler() {
        onStart();
        _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0__.Inertia.off('start', startHandler);
      };
      var finishHandler = function finishHandler(event) {
        if (event.detail.visit.completed) {
          onFinish();
          _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0__.Inertia.off('finish', finishHandler);
        }
      };
      _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0__.Inertia.on('start', startHandler);
      _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0__.Inertia.on('finish', finishHandler);
      _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0__.Inertia.visit(url);
    },
    gotoAllOrders: function gotoAllOrders() {
      var _this6 = this;
      var shopId = localStorage.getItem('selectedStore');
      console.log('1234');
      this.navigateWithInertiaEventsWithShop("/orders", shopId, {
        onStart: function onStart() {
          _this6.showLoadingAlert();
        },
        onFinish: function onFinish() {
          _this6.closeLoadingAlert();
        }
      });
    },
    navigateWithInertiaEventsWithShop: function navigateWithInertiaEventsWithShop(url, shop_id) {
      var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref2$onStart = _ref2.onStart,
        onStart = _ref2$onStart === void 0 ? function () {} : _ref2$onStart,
        _ref2$onFinish = _ref2.onFinish,
        onFinish = _ref2$onFinish === void 0 ? function () {} : _ref2$onFinish;
      var startHandler = function startHandler() {
        onStart();
        _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0__.Inertia.off('start', startHandler);
      };
      var finishHandler = function finishHandler(event) {
        if (event.detail.visit.completed) {
          onFinish();
          _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0__.Inertia.off('finish', finishHandler);
        }
      };
      _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0__.Inertia.on('start', startHandler);
      _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0__.Inertia.on('finish', finishHandler);

      // var fullUrl = url+'?shop='+shop_id;
      var fullUrl = url + '/' + shop_id;
      _inertiajs_inertia__WEBPACK_IMPORTED_MODULE_0__.Inertia.visit(fullUrl);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CreateOrder.vue?vue&type=template&id=484c38ce&scoped=true":
/*!****************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CreateOrder.vue?vue&type=template&id=484c38ce&scoped=true ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _withScopeId = function _withScopeId(n) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.pushScopeId)("data-v-484c38ce"), n = n(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.popScopeId)(), n;
};
var _hoisted_1 = {
  "class": "nk-content"
};
var _hoisted_2 = {
  "class": "container"
};
var _hoisted_3 = {
  "class": "nk-content-inner"
};
var _hoisted_4 = {
  "class": "nk-content-body"
};
var _hoisted_5 = {
  "class": "nk-block-head nk-block-head-sm"
};
var _hoisted_6 = {
  "class": "nk-block-between g-3"
};
var _hoisted_7 = {
  "class": "nk-block-head-content"
};
var _hoisted_8 = {
  "class": "breadcrumb breadcrumb-arrow"
};
var _hoisted_9 = {
  "class": "breadcrumb-item"
};
var _hoisted_10 = {
  "class": "breadcrumb-item"
};
var _hoisted_11 = {
  "class": "breadcrumb-item"
};
var _hoisted_12 = {
  "class": "breadcrumb-item"
};
var _hoisted_13 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", {
    "class": "breadcrumb-item active"
  }, "Create Order", -1 /* HOISTED */);
});
var _hoisted_14 = {
  "class": "nk-block"
};
var _hoisted_15 = {
  "class": "row g-gs"
};
var _hoisted_16 = {
  "class": "col-lg-4 col-xl-4 col-xxl-3"
};
var _hoisted_17 = {
  "class": "card card-bordered"
};
var _hoisted_18 = {
  "class": "card-inner-group"
};
var _hoisted_19 = {
  "class": "card-inner position-relative card-tools-toggle min-height-550"
};
var _hoisted_20 = {
  "class": "container"
};
var _hoisted_21 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "overline-title-alt mb-2 mt-2"
  }, "Select Products", -1 /* HOISTED */);
});
var _hoisted_22 = {
  "class": "product-browsing"
};
var _hoisted_23 = {
  "class": "product-list"
};
var _hoisted_24 = ["onClick"];
var _hoisted_25 = ["src", "alt"];
var _hoisted_26 = {
  "class": "product-details"
};
var _hoisted_27 = {
  "class": "col-lg-8 col-xl-8 col-xxl-9"
};
var _hoisted_28 = {
  "class": "card card-bordered"
};
var _hoisted_29 = {
  "class": "card-inner-group"
};
var _hoisted_30 = {
  "class": "card-inner position-relative card-tools-toogle min-height-550 x-scroll"
};
var _hoisted_31 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "nk-block-des text-soft"
  }, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Selected Items:.")], -1 /* HOISTED */);
});
var _hoisted_32 = {
  "class": "card-inner p-0"
};
var _hoisted_33 = {
  "class": "shopping-cart"
};
var _hoisted_34 = {
  "class": "cart-items"
};
var _hoisted_35 = {
  key: 0
};
var _hoisted_36 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "No items selected", -1 /* HOISTED */);
});
var _hoisted_37 = [_hoisted_36];
var _hoisted_38 = {
  "class": "user-card"
};
var _hoisted_39 = {
  "class": "tb-product"
};
var _hoisted_40 = ["src", "alt"];
var _hoisted_41 = ["onClick"];
var _hoisted_42 = {
  "class": "row"
};
var _hoisted_43 = {
  "class": "col-md-6"
};
var _hoisted_44 = {
  key: 0,
  "class": "cart-summary"
};
var _hoisted_45 = {
  "class": "col-md-6"
};
var _hoisted_46 = {
  key: 0,
  "class": "cart-summary"
};
var _hoisted_47 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "financial-status"
  }, "Financial Status:", -1 /* HOISTED */);
});
var _hoisted_48 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "pending"
  }, "Pending", -1 /* HOISTED */);
});
var _hoisted_49 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "paid"
  }, "Paid", -1 /* HOISTED */);
});
var _hoisted_50 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "partially_paid"
  }, "Partially Paid", -1 /* HOISTED */);
});
var _hoisted_51 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
    "for": "fulfillment-status"
  }, "Fulfillment Status:", -1 /* HOISTED */);
});
var _hoisted_52 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "unfulfilled"
  }, "Unfulfilled", -1 /* HOISTED */);
});
var _hoisted_53 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "partial"
  }, "Partial", -1 /* HOISTED */);
});
var _hoisted_54 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
    value: "fulfilled"
  }, "Fulfilled", -1 /* HOISTED */);
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this;
  var _component_Column = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Column");
  var _component_DataTable = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DataTable");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("nav", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#",
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return $options.gotoAllCustomers();
    })
  }, "Home")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_10, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#",
    onClick: _cache[1] || (_cache[1] = function ($event) {
      return $options.gotoAllCustomers();
    })
  }, "Customers")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#",
    onClick: _cache[2] || (_cache[2] = function ($event) {
      return $options.goToCustomerPage(_this.customer.id);
    })
  }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.customerFullName || "Customer Details"), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    href: "#",
    onClick: _cache[3] || (_cache[3] = function ($event) {
      return $options.gotoAllOrders();
    })
  }, " Orders ")]), _hoisted_13])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [_hoisted_21, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Sample product cards "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($props.products, function (product) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      "class": "product-card",
      key: product.id,
      onClick: function onClick($event) {
        return $options.addToCart(product);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
      src: product.image_src,
      alt: product.title
    }, null, 8 /* PROPS */, _hoisted_25), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(product.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(product.price), 1 /* TEXT */)])], 8 /* PROPS */, _hoisted_24);
  }), 128 /* KEYED_FRAGMENT */))])])])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_30, [_hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_34, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Display items added to cart "), $data.cartItems.length === 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_35, _hoisted_37)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $data.cartItems.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_DataTable, {
    key: 1,
    value: $data.cartItems
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        header: "Image"
      }, {
        body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
            src: slotProps.data.image_src,
            alt: slotProps.data.title,
            style: {
              "max-width": "50px",
              "max-height": "50px"
            }
          }, null, 8 /* PROPS */, _hoisted_40)])])];
        }),
        _: 1 /* STABLE */
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "title",
        header: "Title"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "price",
        header: "Price"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, {
        field: "quantity",
        header: "Quantity"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Column, null, {
        body: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function (slotProps) {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
            "class": "badge bg-danger",
            onClick: function onClick($event) {
              return $options.removeFromCart(slotProps.data);
            }
          }, "Remove", 8 /* PROPS */, _hoisted_41)];
        }),
        _: 1 /* STABLE */
      })];
    }),

    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["value"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" <div class=\"cart-item\" v-for=\"(item, index) in cartItems\" :key=\"index\">\r\n                                <img :src=\"item.image_src\" :alt=\"item.title\">\r\n                                <div class=\"item-details\">\r\n                                  <h5>{{ item.title }}</h5>\r\n                                  <p>{{ item.price }} x {{ item.quantity }}</p>\r\n                                </div>\r\n                                <button class=\"btn btn-danger\" @click=\"removeFromCart(index)\">Remove</button>\r\n                              </div> ")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [$data.cartItems.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_44, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Total Items: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.totalItems), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Subtotal: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.calculateSubtotal()), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Tax: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.calculateTax()), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Total: " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.calculateTotal()), 1 /* TEXT */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    "class": "btn btn-primary",
    onClick: _cache[4] || (_cache[4] = function ($event) {
      return $options.submitOrderData();
    })
  }, "Submit Order")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [$data.cartItems.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_46, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_47, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "financial-status",
    "class": "form-select",
    "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
      return $data.selectedFinancialStatus = $event;
    })
  }, [_hoisted_48, _hoisted_49, _hoisted_50, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Add more options as needed ")], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedFinancialStatus]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_51, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    id: "fulfillment-status",
    "class": "form-select",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
      return $data.selectedFulfillmentStatus = $event;
    })
  }, [_hoisted_52, _hoisted_53, _hoisted_54, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Add more options as needed ")], 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.selectedFulfillmentStatus]])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])])])])])])])])])])])])]);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CreateOrder.vue?vue&type=style&index=0&id=484c38ce&scoped=true&lang=css":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CreateOrder.vue?vue&type=style&index=0&id=484c38ce&scoped=true&lang=css ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\r\n  /* Styles for order container */\n.order-container[data-v-484c38ce] {\r\n    display: flex;\n}\r\n  \r\n  /* Styles for product browsing section */\n.product-browsing[data-v-484c38ce] {\r\n    flex: 1;\r\n    padding: 20px;\r\n    height: 600px;\r\n    overflow-y: scroll;\n}\r\n  \r\n  /* Styles for shopping cart section */\n.shopping-cart[data-v-484c38ce] {\r\n    flex: 1;\r\n    padding: 20px;\n}\n.product-card[data-v-484c38ce] {\r\n    display: flex;\r\n    align-items: center;\r\n    border: 1px solid #ccc;\r\n    border-radius: 5px;\r\n    padding: 10px;\r\n    margin-bottom: 10px;\r\n    cursor: pointer;\n}\n.product-card img[data-v-484c38ce] {\r\n    width: 50px; /* Adjust image width as needed */\r\n    height: auto;\r\n    margin-right: 10px;\n}\n.product-details[data-v-484c38ce] {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr; /* Title above the price */\r\n    gap: 5px; /* Gap between title and price */\r\n    flex: 1; /* Take remaining space */\n}\r\n\r\n  /* Styles for product title */\n.product-card h3[data-v-484c38ce] {\r\n    margin: 0;\r\n    font-size: 16px;\r\n    font-weight: bold;\n}\r\n\r\n  /* Styles for product price */\n.product-card p[data-v-484c38ce] {\r\n    margin: 0;\r\n    font-size: 14px;\n}\n.cart-items[data-v-484c38ce] {\r\n    max-height: 400px;\r\n    overflow-y: scroll;\n}\r\n  /* Styles for cart items */\n.cart-item[data-v-484c38ce] {\r\n    display: flex;\r\n    align-items: flex-start; /* Align items to the start */\r\n    border-bottom: 1px solid #ccc;\r\n    padding: 10px 0;\n}\n.cart-item img[data-v-484c38ce] {\r\n    width: 70px;\r\n    height: 50px;\r\n    margin-right: 10px;\n}\r\n\r\n  /* Styles for item details */\n.item-details[data-v-484c38ce] {\r\n    flex: 1; /* Occupy remaining space */\n}\r\n  \r\n  /* Styles for cart summary */\n.cart-summary[data-v-484c38ce] {\r\n    margin-top: 20px;\n}\n.min-height-550[data-v-484c38ce] {\r\n    height: 685.2px;\n}\n.remove-button[data-v-484c38ce] {\r\n    width: 50px; /* Fixed width */\r\n    background-color: red; /* Change button background color to red */\r\n    color: white; /* Change button text color to white */\r\n    border: none; /* Remove button border */\r\n    cursor: pointer; /* Change cursor to pointer */\n}\r\n\r\n  /* Styles for submit button */\n.submit-button[data-v-484c38ce] {\r\n    background-color: blue; /* Change button background color to blue */\r\n    color: white; /* Change button text color to white */\r\n    border: none; /* Remove button border */\r\n    cursor: pointer; /* Change cursor to pointer */\n}\r\n  \r\n  /* Add your component-specific styles here */\r\n  ", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CreateOrder.vue?vue&type=style&index=0&id=484c38ce&scoped=true&lang=css":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CreateOrder.vue?vue&type=style&index=0&id=484c38ce&scoped=true&lang=css ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateOrder_vue_vue_type_style_index_0_id_484c38ce_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CreateOrder.vue?vue&type=style&index=0&id=484c38ce&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CreateOrder.vue?vue&type=style&index=0&id=484c38ce&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateOrder_vue_vue_type_style_index_0_id_484c38ce_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateOrder_vue_vue_type_style_index_0_id_484c38ce_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/Pages/CreateOrder.vue":
/*!********************************************!*\
  !*** ./resources/js/Pages/CreateOrder.vue ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _CreateOrder_vue_vue_type_template_id_484c38ce_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateOrder.vue?vue&type=template&id=484c38ce&scoped=true */ "./resources/js/Pages/CreateOrder.vue?vue&type=template&id=484c38ce&scoped=true");
/* harmony import */ var _CreateOrder_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CreateOrder.vue?vue&type=script&lang=js */ "./resources/js/Pages/CreateOrder.vue?vue&type=script&lang=js");
/* harmony import */ var _CreateOrder_vue_vue_type_style_index_0_id_484c38ce_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CreateOrder.vue?vue&type=style&index=0&id=484c38ce&scoped=true&lang=css */ "./resources/js/Pages/CreateOrder.vue?vue&type=style&index=0&id=484c38ce&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_CreateOrder_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_CreateOrder_vue_vue_type_template_id_484c38ce_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-484c38ce"],['__file',"resources/js/Pages/CreateOrder.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/Pages/CreateOrder.vue?vue&type=script&lang=js":
/*!********************************************************************!*\
  !*** ./resources/js/Pages/CreateOrder.vue?vue&type=script&lang=js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateOrder_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateOrder_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CreateOrder.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CreateOrder.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/Pages/CreateOrder.vue?vue&type=template&id=484c38ce&scoped=true":
/*!**************************************************************************************!*\
  !*** ./resources/js/Pages/CreateOrder.vue?vue&type=template&id=484c38ce&scoped=true ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateOrder_vue_vue_type_template_id_484c38ce_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateOrder_vue_vue_type_template_id_484c38ce_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CreateOrder.vue?vue&type=template&id=484c38ce&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CreateOrder.vue?vue&type=template&id=484c38ce&scoped=true");


/***/ }),

/***/ "./resources/js/Pages/CreateOrder.vue?vue&type=style&index=0&id=484c38ce&scoped=true&lang=css":
/*!****************************************************************************************************!*\
  !*** ./resources/js/Pages/CreateOrder.vue?vue&type=style&index=0&id=484c38ce&scoped=true&lang=css ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_CreateOrder_vue_vue_type_style_index_0_id_484c38ce_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./CreateOrder.vue?vue&type=style&index=0&id=484c38ce&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/Pages/CreateOrder.vue?vue&type=style&index=0&id=484c38ce&scoped=true&lang=css");


/***/ })

}]);