"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/auth/login/page",{

/***/ "(app-pages-browser)/./components/hooks/use-toast.js":
/*!***************************************!*\
  !*** ./components/hooks/use-toast.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   reducer: function() { return /* binding */ reducer; },\n/* harmony export */   toast: function() { return /* binding */ toast; },\n/* harmony export */   useToast: function() { return /* binding */ useToast; }\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* __next_internal_client_entry_do_not_use__ reducer,useToast,toast auto */ var _s = $RefreshSig$();\n// Inspired by react-hot-toast library\n\nconst TOAST_LIMIT = 1;\nconst TOAST_REMOVE_DELAY = 1000000;\nconst actionTypes = {\n    ADD_TOAST: \"ADD_TOAST\",\n    UPDATE_TOAST: \"UPDATE_TOAST\",\n    DISMISS_TOAST: \"DISMISS_TOAST\",\n    REMOVE_TOAST: \"REMOVE_TOAST\"\n};\nlet count = 0;\nfunction genId() {\n    count = (count + 1) % Number.MAX_SAFE_INTEGER;\n    return count.toString();\n}\nconst toastTimeouts = new Map();\nconst addToRemoveQueue = (toastId)=>{\n    if (toastTimeouts.has(toastId)) {\n        return;\n    }\n    const timeout = setTimeout(()=>{\n        toastTimeouts.delete(toastId);\n        dispatch({\n            type: \"REMOVE_TOAST\",\n            toastId: toastId\n        });\n    }, TOAST_REMOVE_DELAY);\n    toastTimeouts.set(toastId, timeout);\n};\nconst reducer = (state, action)=>{\n    switch(action.type){\n        case \"ADD_TOAST\":\n            return {\n                ...state,\n                toasts: [\n                    action.toast,\n                    ...state.toasts\n                ].slice(0, TOAST_LIMIT)\n            };\n        case \"UPDATE_TOAST\":\n            return {\n                ...state,\n                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {\n                        ...t,\n                        ...action.toast\n                    } : t)\n            };\n        case \"DISMISS_TOAST\":\n            {\n                const { toastId } = action;\n                // ! Side effects ! - This could be extracted into a dismissToast() action,\n                // but I'll keep it here for simplicity\n                if (toastId) {\n                    addToRemoveQueue(toastId);\n                } else {\n                    state.toasts.forEach((toast)=>{\n                        addToRemoveQueue(toast.id);\n                    });\n                }\n                return {\n                    ...state,\n                    toasts: state.toasts.map((t)=>t.id === toastId || toastId === undefined ? {\n                            ...t,\n                            open: false\n                        } : t)\n                };\n            }\n        case \"REMOVE_TOAST\":\n            if (action.toastId === undefined) {\n                return {\n                    ...state,\n                    toasts: []\n                };\n            }\n            return {\n                ...state,\n                toasts: state.toasts.filter((t)=>t.id !== action.toastId)\n            };\n    }\n};\nconst listeners = [];\nlet memoryState = {\n    toasts: []\n};\nfunction dispatch(action) {\n    memoryState = reducer(memoryState, action);\n    listeners.forEach((listener)=>{\n        listener(memoryState);\n    });\n}\nfunction toast(param) {\n    let { timeout = 3000, ...props } = param;\n    const id = genId();\n    const update = (props)=>dispatch({\n            type: \"UPDATE_TOAST\",\n            toast: {\n                ...props,\n                id\n            }\n        });\n    const dismiss = ()=>dispatch({\n            type: \"DISMISS_TOAST\",\n            toastId: id\n        });\n    dispatch({\n        type: \"ADD_TOAST\",\n        toast: {\n            ...props,\n            id,\n            open: true,\n            onOpenChange: (open)=>{\n                if (!open) dismiss();\n            }\n        }\n    });\n    if (timeout) {\n        setTimeout(()=>dismiss(), timeout);\n    }\n    return {\n        id: id,\n        dismiss,\n        update\n    };\n}\nfunction useToast() {\n    _s();\n    const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState(memoryState);\n    react__WEBPACK_IMPORTED_MODULE_0__.useEffect(()=>{\n        listeners.push(setState);\n        return ()=>{\n            const index = listeners.indexOf(setState);\n            if (index > -1) {\n                listeners.splice(index, 1);\n            }\n        };\n    }, [\n        state\n    ]);\n    return {\n        ...state,\n        toast,\n        dismiss: (toastId)=>dispatch({\n                type: \"DISMISS_TOAST\",\n                toastId\n            })\n    };\n}\n_s(useToast, \"SPWE98mLGnlsnNfIwu/IAKTSZtk=\");\n\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvaG9va3MvdXNlLXRvYXN0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLHNDQUFzQztBQUNSO0FBRTlCLE1BQU1DLGNBQWM7QUFDcEIsTUFBTUMscUJBQXFCO0FBRTNCLE1BQU1DLGNBQWM7SUFDbEJDLFdBQVc7SUFDWEMsY0FBYztJQUNkQyxlQUFlO0lBQ2ZDLGNBQWM7QUFDaEI7QUFFQSxJQUFJQyxRQUFRO0FBRVosU0FBU0M7SUFDUEQsUUFBUSxDQUFDQSxRQUFRLEtBQUtFLE9BQU9DLGdCQUFnQjtJQUM3QyxPQUFPSCxNQUFNSSxRQUFRO0FBQ3ZCO0FBRUEsTUFBTUMsZ0JBQWdCLElBQUlDO0FBRTFCLE1BQU1DLG1CQUFtQixDQUFDQztJQUN4QixJQUFJSCxjQUFjSSxHQUFHLENBQUNELFVBQVU7UUFDOUI7SUFDRjtJQUVBLE1BQU1FLFVBQVVDLFdBQVc7UUFDekJOLGNBQWNPLE1BQU0sQ0FBQ0o7UUFDckJLLFNBQVM7WUFDUEMsTUFBTTtZQUNOTixTQUFTQTtRQUNYO0lBQ0YsR0FBR2Q7SUFFSFcsY0FBY1UsR0FBRyxDQUFDUCxTQUFTRTtBQUM3QjtBQUVPLE1BQU1NLFVBQVUsQ0FBQ0MsT0FBT0M7SUFDN0IsT0FBUUEsT0FBT0osSUFBSTtRQUNqQixLQUFLO1lBQ0gsT0FBTztnQkFDTCxHQUFHRyxLQUFLO2dCQUNSRSxRQUFRO29CQUFDRCxPQUFPRSxLQUFLO3VCQUFLSCxNQUFNRSxNQUFNO2lCQUFDLENBQUNFLEtBQUssQ0FBQyxHQUFHNUI7WUFDbkQ7UUFFRixLQUFLO1lBQ0gsT0FBTztnQkFDTCxHQUFHd0IsS0FBSztnQkFDUkUsUUFBUUYsTUFBTUUsTUFBTSxDQUFDRyxHQUFHLENBQUMsQ0FBQ0MsSUFDeEJBLEVBQUVDLEVBQUUsS0FBS04sT0FBT0UsS0FBSyxDQUFDSSxFQUFFLEdBQUc7d0JBQUUsR0FBR0QsQ0FBQzt3QkFBRSxHQUFHTCxPQUFPRSxLQUFLO29CQUFDLElBQUlHO1lBQzNEO1FBRUYsS0FBSztZQUFpQjtnQkFDcEIsTUFBTSxFQUFFZixPQUFPLEVBQUUsR0FBR1U7Z0JBRXBCLDJFQUEyRTtnQkFDM0UsdUNBQXVDO2dCQUN2QyxJQUFJVixTQUFTO29CQUNYRCxpQkFBaUJDO2dCQUNuQixPQUFPO29CQUNMUyxNQUFNRSxNQUFNLENBQUNNLE9BQU8sQ0FBQyxDQUFDTDt3QkFDcEJiLGlCQUFpQmEsTUFBTUksRUFBRTtvQkFDM0I7Z0JBQ0Y7Z0JBRUEsT0FBTztvQkFDTCxHQUFHUCxLQUFLO29CQUNSRSxRQUFRRixNQUFNRSxNQUFNLENBQUNHLEdBQUcsQ0FBQyxDQUFDQyxJQUN4QkEsRUFBRUMsRUFBRSxLQUFLaEIsV0FBV0EsWUFBWWtCLFlBQzVCOzRCQUNFLEdBQUdILENBQUM7NEJBQ0pJLE1BQU07d0JBQ1IsSUFDQUo7Z0JBQ1I7WUFDRjtRQUNBLEtBQUs7WUFDSCxJQUFJTCxPQUFPVixPQUFPLEtBQUtrQixXQUFXO2dCQUNoQyxPQUFPO29CQUNMLEdBQUdULEtBQUs7b0JBQ1JFLFFBQVEsRUFBRTtnQkFDWjtZQUNGO1lBQ0EsT0FBTztnQkFDTCxHQUFHRixLQUFLO2dCQUNSRSxRQUFRRixNQUFNRSxNQUFNLENBQUNTLE1BQU0sQ0FBQyxDQUFDTCxJQUFNQSxFQUFFQyxFQUFFLEtBQUtOLE9BQU9WLE9BQU87WUFDNUQ7SUFDSjtBQUNGLEVBQUM7QUFFRCxNQUFNcUIsWUFBWSxFQUFFO0FBRXBCLElBQUlDLGNBQWM7SUFBRVgsUUFBUSxFQUFFO0FBQUM7QUFFL0IsU0FBU04sU0FBU0ssTUFBTTtJQUN0QlksY0FBY2QsUUFBUWMsYUFBYVo7SUFDbkNXLFVBQVVKLE9BQU8sQ0FBQyxDQUFDTTtRQUNqQkEsU0FBU0Q7SUFDWDtBQUNGO0FBRUEsU0FBU1YsTUFBTSxLQUdkO1FBSGMsRUFDYlYsVUFBVSxJQUFJLEVBQ2QsR0FBR3NCLE9BQ0osR0FIYztJQUliLE1BQU1SLEtBQUt2QjtJQUVYLE1BQU1nQyxTQUFTLENBQUNELFFBQ2RuQixTQUFTO1lBQ1BDLE1BQU07WUFDTk0sT0FBTztnQkFBRSxHQUFHWSxLQUFLO2dCQUFFUjtZQUFHO1FBQ3hCO0lBQ0YsTUFBTVUsVUFBVSxJQUFNckIsU0FBUztZQUFFQyxNQUFNO1lBQWlCTixTQUFTZ0I7UUFBRztJQUVwRVgsU0FBUztRQUNQQyxNQUFNO1FBQ05NLE9BQU87WUFDTCxHQUFHWSxLQUFLO1lBQ1JSO1lBQ0FHLE1BQU07WUFDTlEsY0FBYyxDQUFDUjtnQkFDYixJQUFJLENBQUNBLE1BQU1PO1lBQ2I7UUFDRjtJQUNGO0lBRUEsSUFBSXhCLFNBQVM7UUFDWEMsV0FBVyxJQUFNdUIsV0FBV3hCO0lBQzlCO0lBRUEsT0FBTztRQUNMYyxJQUFJQTtRQUNKVTtRQUNBRDtJQUNGO0FBQ0Y7QUFFQSxTQUFTRzs7SUFDUCxNQUFNLENBQUNuQixPQUFPb0IsU0FBUyxHQUFHN0MsMkNBQWMsQ0FBQ3NDO0lBRXpDdEMsNENBQWUsQ0FBQztRQUNkcUMsVUFBVVcsSUFBSSxDQUFDSDtRQUNmLE9BQU87WUFDTCxNQUFNSSxRQUFRWixVQUFVYSxPQUFPLENBQUNMO1lBQ2hDLElBQUlJLFFBQVEsQ0FBQyxHQUFHO2dCQUNkWixVQUFVYyxNQUFNLENBQUNGLE9BQU87WUFDMUI7UUFDRjtJQUNGLEdBQUc7UUFBQ3hCO0tBQU07SUFFVixPQUFPO1FBQ0wsR0FBR0EsS0FBSztRQUNSRztRQUNBYyxTQUFTLENBQUMxQixVQUFZSyxTQUFTO2dCQUFFQyxNQUFNO2dCQUFpQk47WUFBUTtJQUNsRTtBQUNGO0dBbEJTNEI7QUFvQmlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvaG9va3MvdXNlLXRvYXN0LmpzP2MyMTgiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG4vLyBJbnNwaXJlZCBieSByZWFjdC1ob3QtdG9hc3QgbGlicmFyeVxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCJcblxuY29uc3QgVE9BU1RfTElNSVQgPSAxXG5jb25zdCBUT0FTVF9SRU1PVkVfREVMQVkgPSAxMDAwMDAwXG5cbmNvbnN0IGFjdGlvblR5cGVzID0ge1xuICBBRERfVE9BU1Q6IFwiQUREX1RPQVNUXCIsXG4gIFVQREFURV9UT0FTVDogXCJVUERBVEVfVE9BU1RcIixcbiAgRElTTUlTU19UT0FTVDogXCJESVNNSVNTX1RPQVNUXCIsXG4gIFJFTU9WRV9UT0FTVDogXCJSRU1PVkVfVE9BU1RcIlxufVxuXG5sZXQgY291bnQgPSAwXG5cbmZ1bmN0aW9uIGdlbklkKCkge1xuICBjb3VudCA9IChjb3VudCArIDEpICUgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJcbiAgcmV0dXJuIGNvdW50LnRvU3RyaW5nKCk7XG59XG5cbmNvbnN0IHRvYXN0VGltZW91dHMgPSBuZXcgTWFwKClcblxuY29uc3QgYWRkVG9SZW1vdmVRdWV1ZSA9ICh0b2FzdElkKSA9PiB7XG4gIGlmICh0b2FzdFRpbWVvdXRzLmhhcyh0b2FzdElkKSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHRvYXN0VGltZW91dHMuZGVsZXRlKHRvYXN0SWQpXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogXCJSRU1PVkVfVE9BU1RcIixcbiAgICAgIHRvYXN0SWQ6IHRvYXN0SWQsXG4gICAgfSlcbiAgfSwgVE9BU1RfUkVNT1ZFX0RFTEFZKVxuXG4gIHRvYXN0VGltZW91dHMuc2V0KHRvYXN0SWQsIHRpbWVvdXQpXG59XG5cbmV4cG9ydCBjb25zdCByZWR1Y2VyID0gKHN0YXRlLCBhY3Rpb24pID0+IHtcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xuICAgIGNhc2UgXCJBRERfVE9BU1RcIjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICB0b2FzdHM6IFthY3Rpb24udG9hc3QsIC4uLnN0YXRlLnRvYXN0c10uc2xpY2UoMCwgVE9BU1RfTElNSVQpLFxuICAgICAgfTtcblxuICAgIGNhc2UgXCJVUERBVEVfVE9BU1RcIjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICB0b2FzdHM6IHN0YXRlLnRvYXN0cy5tYXAoKHQpID0+XG4gICAgICAgICAgdC5pZCA9PT0gYWN0aW9uLnRvYXN0LmlkID8geyAuLi50LCAuLi5hY3Rpb24udG9hc3QgfSA6IHQpLFxuICAgICAgfTtcblxuICAgIGNhc2UgXCJESVNNSVNTX1RPQVNUXCI6IHtcbiAgICAgIGNvbnN0IHsgdG9hc3RJZCB9ID0gYWN0aW9uXG5cbiAgICAgIC8vICEgU2lkZSBlZmZlY3RzICEgLSBUaGlzIGNvdWxkIGJlIGV4dHJhY3RlZCBpbnRvIGEgZGlzbWlzc1RvYXN0KCkgYWN0aW9uLFxuICAgICAgLy8gYnV0IEknbGwga2VlcCBpdCBoZXJlIGZvciBzaW1wbGljaXR5XG4gICAgICBpZiAodG9hc3RJZCkge1xuICAgICAgICBhZGRUb1JlbW92ZVF1ZXVlKHRvYXN0SWQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0ZS50b2FzdHMuZm9yRWFjaCgodG9hc3QpID0+IHtcbiAgICAgICAgICBhZGRUb1JlbW92ZVF1ZXVlKHRvYXN0LmlkKVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgdG9hc3RzOiBzdGF0ZS50b2FzdHMubWFwKCh0KSA9PlxuICAgICAgICAgIHQuaWQgPT09IHRvYXN0SWQgfHwgdG9hc3RJZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAuLi50LFxuICAgICAgICAgICAgICAgIG9wZW46IGZhbHNlLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHQpLFxuICAgICAgfTtcbiAgICB9XG4gICAgY2FzZSBcIlJFTU9WRV9UT0FTVFwiOlxuICAgICAgaWYgKGFjdGlvbi50b2FzdElkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICB0b2FzdHM6IFtdLFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgdG9hc3RzOiBzdGF0ZS50b2FzdHMuZmlsdGVyKCh0KSA9PiB0LmlkICE9PSBhY3Rpb24udG9hc3RJZCksXG4gICAgICB9O1xuICB9XG59XG5cbmNvbnN0IGxpc3RlbmVycyA9IFtdXG5cbmxldCBtZW1vcnlTdGF0ZSA9IHsgdG9hc3RzOiBbXSB9XG5cbmZ1bmN0aW9uIGRpc3BhdGNoKGFjdGlvbikge1xuICBtZW1vcnlTdGF0ZSA9IHJlZHVjZXIobWVtb3J5U3RhdGUsIGFjdGlvbilcbiAgbGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiB7XG4gICAgbGlzdGVuZXIobWVtb3J5U3RhdGUpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHRvYXN0KHtcbiAgdGltZW91dCA9IDMwMDAsXG4gIC4uLnByb3BzXG59KSB7XG4gIGNvbnN0IGlkID0gZ2VuSWQoKVxuXG4gIGNvbnN0IHVwZGF0ZSA9IChwcm9wcykgPT5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBcIlVQREFURV9UT0FTVFwiLFxuICAgICAgdG9hc3Q6IHsgLi4ucHJvcHMsIGlkIH0sXG4gICAgfSlcbiAgY29uc3QgZGlzbWlzcyA9ICgpID0+IGRpc3BhdGNoKHsgdHlwZTogXCJESVNNSVNTX1RPQVNUXCIsIHRvYXN0SWQ6IGlkIH0pXG5cbiAgZGlzcGF0Y2goe1xuICAgIHR5cGU6IFwiQUREX1RPQVNUXCIsXG4gICAgdG9hc3Q6IHtcbiAgICAgIC4uLnByb3BzLFxuICAgICAgaWQsXG4gICAgICBvcGVuOiB0cnVlLFxuICAgICAgb25PcGVuQ2hhbmdlOiAob3BlbikgPT4ge1xuICAgICAgICBpZiAoIW9wZW4pIGRpc21pc3MoKVxuICAgICAgfSxcbiAgICB9LFxuICB9KVxuXG4gIGlmICh0aW1lb3V0KSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiBkaXNtaXNzKCksIHRpbWVvdXQpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpZDogaWQsXG4gICAgZGlzbWlzcyxcbiAgICB1cGRhdGUsXG4gIH1cbn1cblxuZnVuY3Rpb24gdXNlVG9hc3QoKSB7XG4gIGNvbnN0IFtzdGF0ZSwgc2V0U3RhdGVdID0gUmVhY3QudXNlU3RhdGUobWVtb3J5U3RhdGUpXG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBsaXN0ZW5lcnMucHVzaChzZXRTdGF0ZSlcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSBsaXN0ZW5lcnMuaW5kZXhPZihzZXRTdGF0ZSlcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICB9XG4gICAgfTtcbiAgfSwgW3N0YXRlXSlcblxuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLFxuICAgIHRvYXN0LFxuICAgIGRpc21pc3M6ICh0b2FzdElkKSA9PiBkaXNwYXRjaCh7IHR5cGU6IFwiRElTTUlTU19UT0FTVFwiLCB0b2FzdElkIH0pLFxuICB9O1xufVxuXG5leHBvcnQgeyB1c2VUb2FzdCwgdG9hc3QgfVxuIl0sIm5hbWVzIjpbIlJlYWN0IiwiVE9BU1RfTElNSVQiLCJUT0FTVF9SRU1PVkVfREVMQVkiLCJhY3Rpb25UeXBlcyIsIkFERF9UT0FTVCIsIlVQREFURV9UT0FTVCIsIkRJU01JU1NfVE9BU1QiLCJSRU1PVkVfVE9BU1QiLCJjb3VudCIsImdlbklkIiwiTnVtYmVyIiwiTUFYX1NBRkVfSU5URUdFUiIsInRvU3RyaW5nIiwidG9hc3RUaW1lb3V0cyIsIk1hcCIsImFkZFRvUmVtb3ZlUXVldWUiLCJ0b2FzdElkIiwiaGFzIiwidGltZW91dCIsInNldFRpbWVvdXQiLCJkZWxldGUiLCJkaXNwYXRjaCIsInR5cGUiLCJzZXQiLCJyZWR1Y2VyIiwic3RhdGUiLCJhY3Rpb24iLCJ0b2FzdHMiLCJ0b2FzdCIsInNsaWNlIiwibWFwIiwidCIsImlkIiwiZm9yRWFjaCIsInVuZGVmaW5lZCIsIm9wZW4iLCJmaWx0ZXIiLCJsaXN0ZW5lcnMiLCJtZW1vcnlTdGF0ZSIsImxpc3RlbmVyIiwicHJvcHMiLCJ1cGRhdGUiLCJkaXNtaXNzIiwib25PcGVuQ2hhbmdlIiwidXNlVG9hc3QiLCJzZXRTdGF0ZSIsInVzZVN0YXRlIiwidXNlRWZmZWN0IiwicHVzaCIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/hooks/use-toast.js\n"));

/***/ })

});