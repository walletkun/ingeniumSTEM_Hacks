"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./app/globals.css":
/*!*************************!*\
  !*** ./app/globals.css ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"cdc643fca6ba\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9nbG9iYWxzLmNzcyIsIm1hcHBpbmdzIjoiO0FBQUEsK0RBQWUsY0FBYztBQUM3QixJQUFJLElBQVUsSUFBSSxpQkFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2dsb2JhbHMuY3NzPzIxNTEiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCJjZGM2NDNmY2E2YmFcIlxuaWYgKG1vZHVsZS5ob3QpIHsgbW9kdWxlLmhvdC5hY2NlcHQoKSB9XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./components/ui/toaster.jsx":
/*!***********************************!*\
  !*** ./components/ui/toaster.jsx ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Toaster: function() { return /* binding */ Toaster; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _components_hooks_use_toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/hooks/use-toast */ \"(app-pages-browser)/./components/hooks/use-toast.js\");\n/* harmony import */ var _components_ui_toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ui/toast */ \"(app-pages-browser)/./components/ui/toast.jsx\");\n/* __next_internal_client_entry_do_not_use__ Toaster auto */ \nvar _s = $RefreshSig$();\n\n\nfunction Toaster() {\n    _s();\n    const { toasts } = (0,_components_hooks_use_toast__WEBPACK_IMPORTED_MODULE_1__.useToast)();\n    const [startToast, setToasts] = useState([]);\n    const addToast = (toast)=>{\n        setToasts((prevToasts)=>[\n                ...toasts,\n                toast\n            ]);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_toast__WEBPACK_IMPORTED_MODULE_2__.ToastProvider, {\n        children: [\n            toasts.map(function(param) {\n                let { id, title, description, action, ...props } = param;\n                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_toast__WEBPACK_IMPORTED_MODULE_2__.Toast, {\n                    ...props,\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"grid gap-1\",\n                            children: [\n                                title && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_toast__WEBPACK_IMPORTED_MODULE_2__.ToastTitle, {\n                                    children: title\n                                }, void 0, false, {\n                                    fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/ui/toaster.jsx\",\n                                    lineNumber: 26,\n                                    columnNumber: 25\n                                }, this),\n                                description && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_toast__WEBPACK_IMPORTED_MODULE_2__.ToastDescription, {\n                                    children: description\n                                }, void 0, false, {\n                                    fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/ui/toaster.jsx\",\n                                    lineNumber: 28,\n                                    columnNumber: 17\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/ui/toaster.jsx\",\n                            lineNumber: 25,\n                            columnNumber: 13\n                        }, this),\n                        action,\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_toast__WEBPACK_IMPORTED_MODULE_2__.ToastClose, {}, void 0, false, {\n                            fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/ui/toaster.jsx\",\n                            lineNumber: 32,\n                            columnNumber: 13\n                        }, this)\n                    ]\n                }, id, true, {\n                    fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/ui/toaster.jsx\",\n                    lineNumber: 24,\n                    columnNumber: 12\n                }, this);\n            }),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_toast__WEBPACK_IMPORTED_MODULE_2__.ToastViewport, {}, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/ui/toaster.jsx\",\n                lineNumber: 36,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/ui/toaster.jsx\",\n        lineNumber: 21,\n        columnNumber: 6\n    }, this);\n}\n_s(Toaster, \"0cKOos5wRF0hWoWKrf6MXd3Dznc=\", false, function() {\n    return [\n        _components_hooks_use_toast__WEBPACK_IMPORTED_MODULE_1__.useToast\n    ];\n});\n_c = Toaster;\nvar _c;\n$RefreshReg$(_c, \"Toaster\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvdWkvdG9hc3Rlci5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRThEO0FBUWhDO0FBRXZCLFNBQVNROztJQUNkLE1BQU0sRUFBRUMsTUFBTSxFQUFFLEdBQUdSLHFFQUFRQTtJQUMzQixNQUFNLENBQUNTLFlBQVlDLFVBQVUsR0FBR0MsU0FBUyxFQUFFO0lBRTNDLE1BQU1DLFdBQVcsQ0FBQ2I7UUFDaEJXLFVBQVUsQ0FBQ0csYUFBZTttQkFBSUw7Z0JBQVFUO2FBQU07SUFDOUM7SUFDQSxxQkFDRyw4REFBQ0ssK0RBQWFBOztZQUNaSSxPQUFPTSxHQUFHLENBQUMsU0FBVSxLQUE0QztvQkFBNUMsRUFBRUMsRUFBRSxFQUFFQyxLQUFLLEVBQUVDLFdBQVcsRUFBRUMsTUFBTSxFQUFFLEdBQUdDLE9BQU8sR0FBNUM7Z0JBQ3BCLHFCQUNHLDhEQUFDbEIsdURBQUtBO29CQUFXLEdBQUdrQixLQUFLOztzQ0FDeEIsOERBQUNDOzRCQUFJQyxXQUFVOztnQ0FDWkwsdUJBQVMsOERBQUNYLDREQUFVQTs4Q0FBRVc7Ozs7OztnQ0FDdEJDLDZCQUNDLDhEQUFDZCxrRUFBZ0JBOzhDQUFFYzs7Ozs7Ozs7Ozs7O3dCQUd0QkM7c0NBQ0QsOERBQUNoQiw0REFBVUE7Ozs7OzttQkFSQWE7Ozs7O1lBV2pCOzBCQUNBLDhEQUFDVCwrREFBYUE7Ozs7Ozs7Ozs7O0FBR3BCO0dBMUJnQkM7O1FBQ0tQLGlFQUFRQTs7O0tBRGJPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvdWkvdG9hc3Rlci5qc3g/OWY4ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIlxuXG5pbXBvcnQgeyB0b2FzdCwgdXNlVG9hc3QgfSBmcm9tIFwiQC9jb21wb25lbnRzL2hvb2tzL3VzZS10b2FzdFwiXG5pbXBvcnQge1xuICBUb2FzdCxcbiAgVG9hc3RDbG9zZSxcbiAgVG9hc3REZXNjcmlwdGlvbixcbiAgVG9hc3RQcm92aWRlcixcbiAgVG9hc3RUaXRsZSxcbiAgVG9hc3RWaWV3cG9ydCxcbn0gZnJvbSBcIkAvY29tcG9uZW50cy91aS90b2FzdFwiXG5cbmV4cG9ydCBmdW5jdGlvbiBUb2FzdGVyKCkge1xuICBjb25zdCB7IHRvYXN0cyB9ID0gdXNlVG9hc3QoKVxuICBjb25zdCBbc3RhcnRUb2FzdCwgc2V0VG9hc3RzXSA9IHVzZVN0YXRlKFtdKTtcblxuICBjb25zdCBhZGRUb2FzdCA9ICh0b2FzdCkgPT4ge1xuICAgIHNldFRvYXN0cygocHJldlRvYXN0cykgPT4gWy4uLnRvYXN0cywgdG9hc3RdKTtcbiAgfTtcbiAgcmV0dXJuIChcbiAgICAoPFRvYXN0UHJvdmlkZXI+XG4gICAgICB7dG9hc3RzLm1hcChmdW5jdGlvbiAoeyBpZCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBhY3Rpb24sIC4uLnByb3BzIH0pIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAoPFRvYXN0IGtleT17aWR9IHsuLi5wcm9wc30+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ2FwLTFcIj5cbiAgICAgICAgICAgICAge3RpdGxlICYmIDxUb2FzdFRpdGxlPnt0aXRsZX08L1RvYXN0VGl0bGU+fVxuICAgICAgICAgICAgICB7ZGVzY3JpcHRpb24gJiYgKFxuICAgICAgICAgICAgICAgIDxUb2FzdERlc2NyaXB0aW9uPntkZXNjcmlwdGlvbn08L1RvYXN0RGVzY3JpcHRpb24+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHthY3Rpb259XG4gICAgICAgICAgICA8VG9hc3RDbG9zZSAvPlxuICAgICAgICAgIDwvVG9hc3Q+KVxuICAgICAgICApO1xuICAgICAgfSl9XG4gICAgICA8VG9hc3RWaWV3cG9ydC8+XG4gICAgPC9Ub2FzdFByb3ZpZGVyPilcbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ0b2FzdCIsInVzZVRvYXN0IiwiVG9hc3QiLCJUb2FzdENsb3NlIiwiVG9hc3REZXNjcmlwdGlvbiIsIlRvYXN0UHJvdmlkZXIiLCJUb2FzdFRpdGxlIiwiVG9hc3RWaWV3cG9ydCIsIlRvYXN0ZXIiLCJ0b2FzdHMiLCJzdGFydFRvYXN0Iiwic2V0VG9hc3RzIiwidXNlU3RhdGUiLCJhZGRUb2FzdCIsInByZXZUb2FzdHMiLCJtYXAiLCJpZCIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJhY3Rpb24iLCJwcm9wcyIsImRpdiIsImNsYXNzTmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/ui/toaster.jsx\n"));

/***/ })

});