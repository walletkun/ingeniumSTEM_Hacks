"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/auth/login/username/page",{

/***/ "(app-pages-browser)/./components/auth/LoginFormUsername.jsx":
/*!***********************************************!*\
  !*** ./components/auth/LoginFormUsername.jsx ***!
  \***********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-hook-form */ \"(app-pages-browser)/./node_modules/react-hook-form/dist/index.esm.mjs\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! zod */ \"(app-pages-browser)/./node_modules/zod/lib/index.mjs\");\n/* harmony import */ var _hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @hookform/resolvers/zod */ \"(app-pages-browser)/./node_modules/@hookform/resolvers/zod/dist/zod.mjs\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _components_auth_card_wrapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/auth/card-wrapper */ \"(app-pages-browser)/./components/auth/card-wrapper.jsx\");\n/* harmony import */ var _components_ui_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/ui/form */ \"(app-pages-browser)/./components/ui/form.jsx\");\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./components/ui/button.jsx\");\n/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/components/ui/input */ \"(app-pages-browser)/./components/ui/input.jsx\");\n/* harmony import */ var _hooks_use_toast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../hooks/use-toast */ \"(app-pages-browser)/./components/hooks/use-toast.js\");\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @/firebase */ \"(app-pages-browser)/./firebase.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! firebase/auth */ \"(app-pages-browser)/./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! firebase/firestore */ \"(app-pages-browser)/./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst loginSchema = zod__WEBPACK_IMPORTED_MODULE_12__.z.object({\n    username: zod__WEBPACK_IMPORTED_MODULE_12__.z.string().min(1, \"Username is required\"),\n    password: zod__WEBPACK_IMPORTED_MODULE_12__.z.string().min(8, \"Password must be at least 8 characters\")\n});\nconst LoginFormUsername = ()=>{\n    _s();\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const { toast } = (0,_hooks_use_toast__WEBPACK_IMPORTED_MODULE_8__.useToast)();\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    const form = react_hook_form__WEBPACK_IMPORTED_MODULE_13__.useForm({\n        resolver: (0,_hookform_resolvers_zod__WEBPACK_IMPORTED_MODULE_2__.zodResolver)(loginSchema),\n        mode: \"onBlur\",\n        defaultValues: {\n            username: \"\",\n            password: \"\"\n        }\n    });\n    const onSubmit = async (data)=>{\n        setIsLoading(true);\n        try {\n            // Query Firestore to get the user document by username\n            const usersRef = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_11__.collection)(_firebase__WEBPACK_IMPORTED_MODULE_9__.db, \"users\");\n            const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_11__.query)(usersRef, (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_11__.where)(\"username\", \"==\", data.username));\n            const querySnapshot = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_11__.getDocs)(q);\n            if (querySnapshot.empty) {\n                toast({\n                    title: \"Login failed\",\n                    description: \"User not found. Please check your username.\"\n                });\n                setIsLoading(false);\n                return;\n            }\n            const userDoc = querySnapshot.docs[0];\n            if (!userDoc) {\n                toast({\n                    title: \"Login failed\",\n                    description: \"User not found. Please check your username.\"\n                });\n                return;\n            }\n            const userData = userDoc.data();\n            //Get the user UID from the userDocument\n            const userUID = userDoc.id;\n            // Sign in with email and password\n            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_10__.signInWithEmailAndPassword)(_firebase__WEBPACK_IMPORTED_MODULE_9__.auth, userData.email, data.password).then((userCredential)=>{\n                const signedInUserUID = userCredential.user.uid;\n                if (signedInUserUID !== userUID) {\n                    toast({\n                        title: \"Login failed\",\n                        timeout: 1200,\n                        description: \"Invalid username or password\"\n                    });\n                    form.reset();\n                    setTimeout(()=>{}, 1200);\n                }\n            });\n            toast({\n                title: \"Login successful\",\n                duration: 1200\n            });\n            form.reset();\n            setTimeout(()=>{\n                router.push(\"/mainScreen\");\n            }, 2000);\n        } catch (error) {\n            console.error(error);\n            if (error.code === \"auth/user-not-found\" || error.message === \"User not found\") {\n                toast({\n                    title: \"Login failed\",\n                    description: \"User not found. Please check your username.\",\n                    variant: \"destructive\",\n                    duration: 1200\n                });\n            } else if (error.code === \"auth/wrong-password\") {\n                toast({\n                    title: \"Login failed\",\n                    description: \"Invalid username or password\",\n                    variant: \"destructive\",\n                    duration: 1200\n                });\n            } else {\n                toast({\n                    title: \"Login failed\",\n                    description: errorMessage,\n                    variant: \"destructive\",\n                    duration: 3000\n                });\n            }\n        } finally{\n            setIsLoading(false);\n        }\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_auth_card_wrapper__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n        label: \"Login\",\n        title: \"Welcome Back!\",\n        backButtonHref: \"/auth/register\",\n        backButtonLabel: \"Don't have an account? Sign up Here.\",\n        usernameLoginHref: \"/auth/login/email\",\n        usernameLoginLabel: \"Login with email\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.Form, {\n            ...form,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                onSubmit: form.handleSubmit(onSubmit),\n                className: \"space-y-6 flex flex-col\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormField, {\n                        control: form.control,\n                        name: \"username\",\n                        render: (param)=>{\n                            let { field } = param;\n                            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormItem, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormLabel, {\n                                        children: \"Username\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/auth/LoginFormUsername.jsx\",\n                                        lineNumber: 146,\n                                        columnNumber: 17\n                                    }, void 0),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormControl, {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_7__.Input, {\n                                            placeholder: \"Enter your username\",\n                                            ...field\n                                        }, void 0, false, {\n                                            fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/auth/LoginFormUsername.jsx\",\n                                            lineNumber: 148,\n                                            columnNumber: 19\n                                        }, void 0)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/auth/LoginFormUsername.jsx\",\n                                        lineNumber: 147,\n                                        columnNumber: 17\n                                    }, void 0),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormMessage, {\n                                        className: \"error-message\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/auth/LoginFormUsername.jsx\",\n                                        lineNumber: 150,\n                                        columnNumber: 17\n                                    }, void 0)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/auth/LoginFormUsername.jsx\",\n                                lineNumber: 145,\n                                columnNumber: 15\n                            }, void 0);\n                        }\n                    }, void 0, false, {\n                        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/auth/LoginFormUsername.jsx\",\n                        lineNumber: 141,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormField, {\n                        control: form.control,\n                        name: \"password\",\n                        render: (param)=>{\n                            let { field } = param;\n                            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormItem, {\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormLabel, {\n                                        children: \"Password\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/auth/LoginFormUsername.jsx\",\n                                        lineNumber: 159,\n                                        columnNumber: 17\n                                    }, void 0),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormControl, {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_7__.Input, {\n                                            type: \"password\",\n                                            placeholder: \"Enter your password\",\n                                            ...field\n                                        }, void 0, false, {\n                                            fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/auth/LoginFormUsername.jsx\",\n                                            lineNumber: 161,\n                                            columnNumber: 19\n                                        }, void 0)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/auth/LoginFormUsername.jsx\",\n                                        lineNumber: 160,\n                                        columnNumber: 17\n                                    }, void 0),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_form__WEBPACK_IMPORTED_MODULE_5__.FormMessage, {\n                                        className: \"error-message\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/auth/LoginFormUsername.jsx\",\n                                        lineNumber: 163,\n                                        columnNumber: 17\n                                    }, void 0)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/auth/LoginFormUsername.jsx\",\n                                lineNumber: 158,\n                                columnNumber: 15\n                            }, void 0);\n                        }\n                    }, void 0, false, {\n                        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/auth/LoginFormUsername.jsx\",\n                        lineNumber: 154,\n                        columnNumber: 11\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_6__.Button, {\n                        type: \"submit\",\n                        className: \"w-full\",\n                        disabled: isLoading,\n                        children: isLoading ? \"Loading...\" : \"Login\"\n                    }, void 0, false, {\n                        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/auth/LoginFormUsername.jsx\",\n                        lineNumber: 167,\n                        columnNumber: 11\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/auth/LoginFormUsername.jsx\",\n                lineNumber: 140,\n                columnNumber: 9\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/auth/LoginFormUsername.jsx\",\n            lineNumber: 139,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/components/auth/LoginFormUsername.jsx\",\n        lineNumber: 131,\n        columnNumber: 5\n    }, undefined);\n};\n_s(LoginFormUsername, \"fUhqugOuTf7O4N6zql7xPrNb+i8=\", false, function() {\n    return [\n        _hooks_use_toast__WEBPACK_IMPORTED_MODULE_8__.useToast,\n        next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter,\n        react_hook_form__WEBPACK_IMPORTED_MODULE_13__.useForm\n    ];\n});\n_c = LoginFormUsername;\n/* harmony default export */ __webpack_exports__[\"default\"] = (LoginFormUsername);\nvar _c;\n$RefreshReg$(_c, \"LoginFormUsername\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvYXV0aC9Mb2dpbkZvcm1Vc2VybmFtZS5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWlEO0FBQ2hCO0FBQ1Q7QUFDOEI7QUFDVjtBQUNhO0FBUTNCO0FBQ2tCO0FBQ0Y7QUFDQTtBQUVSO0FBQ3FCO0FBQ1k7QUFFdkUsTUFBTXNCLGNBQWNwQixtQ0FBQ0EsQ0FBQ3FCLE1BQU0sQ0FBQztJQUMzQkMsVUFBVXRCLG1DQUFDQSxDQUFDdUIsTUFBTSxHQUFHQyxHQUFHLENBQUMsR0FBRztJQUM1QkMsVUFBVXpCLG1DQUFDQSxDQUFDdUIsTUFBTSxHQUFHQyxHQUFHLENBQUMsR0FBRztBQUM5QjtBQUVBLE1BQU1FLG9CQUFvQjs7SUFDeEIsTUFBTSxDQUFDQyxXQUFXQyxhQUFhLEdBQUc3QiwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNLEVBQUU4QixLQUFLLEVBQUUsR0FBR2pCLDBEQUFRQTtJQUMxQixNQUFNa0IsU0FBUzVCLDBEQUFTQTtJQUV4QixNQUFNNkIsT0FBT2pDLHFEQUFxQixDQUFDO1FBQ2pDbUMsVUFBVWhDLG9FQUFXQSxDQUFDbUI7UUFDdEJjLE1BQU07UUFDTkMsZUFBZTtZQUNiYixVQUFVO1lBQ1ZHLFVBQVU7UUFDWjtJQUNGO0lBRUEsTUFBTVcsV0FBVyxPQUFPQztRQUN0QlQsYUFBYTtRQUNiLElBQUk7WUFDRix1REFBdUQ7WUFDdkQsTUFBTVUsV0FBV3RCLCtEQUFVQSxDQUFDRix5Q0FBRUEsRUFBRTtZQUNoQyxNQUFNeUIsSUFBSXRCLDBEQUFLQSxDQUFDcUIsVUFBVXBCLDBEQUFLQSxDQUFDLFlBQVksTUFBTW1CLEtBQUtmLFFBQVE7WUFDL0QsTUFBTWtCLGdCQUFnQixNQUFNckIsNERBQU9BLENBQUNvQjtZQUVwQyxJQUFJQyxjQUFjQyxLQUFLLEVBQUU7Z0JBQ3ZCWixNQUFNO29CQUNKYSxPQUFPO29CQUNQQyxhQUFhO2dCQUNmO2dCQUNBZixhQUFhO2dCQUNiO1lBQ0Y7WUFFQSxNQUFNZ0IsVUFBVUosY0FBY0ssSUFBSSxDQUFDLEVBQUU7WUFFckMsSUFBRyxDQUFDRCxTQUFRO2dCQUNWZixNQUFNO29CQUNKYSxPQUFPO29CQUNQQyxhQUFhO2dCQUNmO2dCQUNBO1lBQ0Y7WUFDQSxNQUFNRyxXQUFXRixRQUFRUCxJQUFJO1lBRTdCLHdDQUF3QztZQUN4QyxNQUFNVSxVQUFVSCxRQUFRSSxFQUFFO1lBRTFCLGtDQUFrQztZQUNsQyxNQUFNakMsMEVBQTBCQSxDQUFDRiwyQ0FBSUEsRUFBRWlDLFNBQVNHLEtBQUssRUFBRVosS0FBS1osUUFBUSxFQUFFeUIsSUFBSSxDQUFDLENBQUNDO2dCQUMxRSxNQUFNQyxrQkFBa0JELGVBQWVFLElBQUksQ0FBQ0MsR0FBRztnQkFFL0MsSUFBSUYsb0JBQW9CTCxTQUFTO29CQUMvQmxCLE1BQU07d0JBQ0phLE9BQU87d0JBQ1BhLFNBQVM7d0JBQ1RaLGFBQWE7b0JBQ2Y7b0JBQ0FaLEtBQUt5QixLQUFLO29CQUNWQyxXQUFXLEtBRVgsR0FBRTtnQkFDSjtZQUNKO1lBRUU1QixNQUFNO2dCQUNKYSxPQUFPO2dCQUNQZ0IsVUFBVTtZQUNaO1lBQ0EzQixLQUFLeUIsS0FBSztZQUNWQyxXQUFXO2dCQUNUM0IsT0FBTzZCLElBQUksQ0FBQztZQUNkLEdBQUc7UUFDTCxFQUFFLE9BQU9DLE9BQU87WUFDZEMsUUFBUUQsS0FBSyxDQUFDQTtZQUNkLElBQUlBLE1BQU1FLElBQUksS0FBSyx5QkFBeUJGLE1BQU1HLE9BQU8sS0FBSyxrQkFBa0I7Z0JBQzlFbEMsTUFBTTtvQkFDSmEsT0FBTztvQkFDUEMsYUFBYTtvQkFDYnFCLFNBQVM7b0JBQ1ROLFVBQVU7Z0JBQ1o7WUFDRixPQUFPLElBQUlFLE1BQU1FLElBQUksS0FBSyx1QkFBdUI7Z0JBQy9DakMsTUFBTTtvQkFDSmEsT0FBTztvQkFDUEMsYUFBYTtvQkFDYnFCLFNBQVM7b0JBQ1ROLFVBQVU7Z0JBQ1o7WUFDRixPQUNJO2dCQUNGN0IsTUFBTTtvQkFDSmEsT0FBTztvQkFDUEMsYUFBYXNCO29CQUNiRCxTQUFTO29CQUNUTixVQUFVO2dCQUNaO1lBQ0Y7UUFDRixTQUFVO1lBQ1I5QixhQUFhO1FBQ2Y7SUFDRjtJQUVBLHFCQUNFLDhEQUFDekIscUVBQVdBO1FBQ1YrRCxPQUFNO1FBQ054QixPQUFNO1FBQ055QixnQkFBZTtRQUNmQyxpQkFBZ0I7UUFDaEJDLG1CQUFrQjtRQUNsQkMsb0JBQW1CO2tCQUVuQiw0RUFBQ2xFLHFEQUFJQTtZQUFFLEdBQUcyQixJQUFJO3NCQUNaLDRFQUFDQTtnQkFBS0ssVUFBVUwsS0FBS3dDLFlBQVksQ0FBQ25DO2dCQUFXb0MsV0FBVTs7a0NBQ3JELDhEQUFDL0QsMERBQVNBO3dCQUNSZ0UsU0FBUzFDLEtBQUswQyxPQUFPO3dCQUNyQkMsTUFBSzt3QkFDTEMsUUFBUTtnQ0FBQyxFQUFFQyxLQUFLLEVBQUU7aURBQ2hCLDhEQUFDdkUseURBQVFBOztrREFDUCw4REFBQ0MsMERBQVNBO2tEQUFDOzs7Ozs7a0RBQ1gsOERBQUNDLDREQUFXQTtrREFDViw0RUFBQ0ksdURBQUtBOzRDQUFDa0UsYUFBWTs0Q0FBdUIsR0FBR0QsS0FBSzs7Ozs7Ozs7Ozs7a0RBRXBELDhEQUFDcEUsNERBQVdBO3dDQUFDZ0UsV0FBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQUk3Qiw4REFBQy9ELDBEQUFTQTt3QkFDUmdFLFNBQVMxQyxLQUFLMEMsT0FBTzt3QkFDckJDLE1BQUs7d0JBQ0xDLFFBQVE7Z0NBQUMsRUFBRUMsS0FBSyxFQUFFO2lEQUNoQiw4REFBQ3ZFLHlEQUFRQTs7a0RBQ1AsOERBQUNDLDBEQUFTQTtrREFBQzs7Ozs7O2tEQUNYLDhEQUFDQyw0REFBV0E7a0RBQ1YsNEVBQUNJLHVEQUFLQTs0Q0FBQ21FLE1BQUs7NENBQVdELGFBQVk7NENBQXVCLEdBQUdELEtBQUs7Ozs7Ozs7Ozs7O2tEQUVwRSw4REFBQ3BFLDREQUFXQTt3Q0FBQ2dFLFdBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0FJN0IsOERBQUM5RCx5REFBTUE7d0JBQUNvRSxNQUFLO3dCQUFTTixXQUFVO3dCQUFTTyxVQUFVcEQ7a0NBQ2hEQSxZQUFZLGVBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNeEM7R0FoSk1EOztRQUVjZCxzREFBUUE7UUFDWFYsc0RBQVNBO1FBRVhKLHFEQUFxQmtDOzs7S0FMOUJOO0FBa0pOLCtEQUFlQSxpQkFBaUJBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9hdXRoL0xvZ2luRm9ybVVzZXJuYW1lLmpzeD9kYzFiIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgKiBhcyBSZWFjdEhvb2tGb3JtIGZyb20gJ3JlYWN0LWhvb2stZm9ybSc7XG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHogfSBmcm9tIFwiem9kXCI7XG5pbXBvcnQgeyB6b2RSZXNvbHZlciB9IGZyb20gXCJAaG9va2Zvcm0vcmVzb2x2ZXJzL3pvZFwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJztcbmltcG9ydCBDYXJkV3JhcHBlciBmcm9tIFwiQC9jb21wb25lbnRzL2F1dGgvY2FyZC13cmFwcGVyXCI7XG5pbXBvcnQge1xuICBGb3JtLFxuICBGb3JtSXRlbSxcbiAgRm9ybUxhYmVsLFxuICBGb3JtQ29udHJvbCxcbiAgRm9ybU1lc3NhZ2UsXG4gIEZvcm1GaWVsZCxcbn0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9mb3JtXCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2J1dHRvblwiO1xuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2lucHV0XCI7XG5pbXBvcnQgeyB1c2VUb2FzdCB9IGZyb20gJy4uL2hvb2tzL3VzZS10b2FzdCc7XG5cbmltcG9ydCB7IGF1dGgsIGRiIH0gZnJvbSAnQC9maXJlYmFzZSc7XG5pbXBvcnQgeyBzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCB9IGZyb20gJ2ZpcmViYXNlL2F1dGgnO1xuaW1wb3J0IHsgY29sbGVjdGlvbiwgcXVlcnksIHdoZXJlLCBnZXREb2NzIH0gZnJvbSAnZmlyZWJhc2UvZmlyZXN0b3JlJztcblxuY29uc3QgbG9naW5TY2hlbWEgPSB6Lm9iamVjdCh7XG4gIHVzZXJuYW1lOiB6LnN0cmluZygpLm1pbigxLCBcIlVzZXJuYW1lIGlzIHJlcXVpcmVkXCIpLFxuICBwYXNzd29yZDogei5zdHJpbmcoKS5taW4oOCwgXCJQYXNzd29yZCBtdXN0IGJlIGF0IGxlYXN0IDggY2hhcmFjdGVyc1wiKSxcbn0pO1xuXG5jb25zdCBMb2dpbkZvcm1Vc2VybmFtZSA9ICgpID0+IHtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgeyB0b2FzdCB9ID0gdXNlVG9hc3QoKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgY29uc3QgZm9ybSA9IFJlYWN0SG9va0Zvcm0udXNlRm9ybSh7XG4gICAgcmVzb2x2ZXI6IHpvZFJlc29sdmVyKGxvZ2luU2NoZW1hKSxcbiAgICBtb2RlOiBcIm9uQmx1clwiLFxuICAgIGRlZmF1bHRWYWx1ZXM6IHtcbiAgICAgIHVzZXJuYW1lOiBcIlwiLFxuICAgICAgcGFzc3dvcmQ6IFwiXCIsXG4gICAgfSxcbiAgfSk7XG5cbiAgY29uc3Qgb25TdWJtaXQgPSBhc3luYyAoZGF0YSkgPT4ge1xuICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgLy8gUXVlcnkgRmlyZXN0b3JlIHRvIGdldCB0aGUgdXNlciBkb2N1bWVudCBieSB1c2VybmFtZVxuICAgICAgY29uc3QgdXNlcnNSZWYgPSBjb2xsZWN0aW9uKGRiLCAndXNlcnMnKTtcbiAgICAgIGNvbnN0IHEgPSBxdWVyeSh1c2Vyc1JlZiwgd2hlcmUoXCJ1c2VybmFtZVwiLCBcIj09XCIsIGRhdGEudXNlcm5hbWUpKTtcbiAgICAgIGNvbnN0IHF1ZXJ5U25hcHNob3QgPSBhd2FpdCBnZXREb2NzKHEpO1xuXG4gICAgICBpZiAocXVlcnlTbmFwc2hvdC5lbXB0eSkge1xuICAgICAgICB0b2FzdCh7XG4gICAgICAgICAgdGl0bGU6IFwiTG9naW4gZmFpbGVkXCIsXG4gICAgICAgICAgZGVzY3JpcHRpb246IFwiVXNlciBub3QgZm91bmQuIFBsZWFzZSBjaGVjayB5b3VyIHVzZXJuYW1lLlwiLFxuICAgICAgICB9KTtcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB1c2VyRG9jID0gcXVlcnlTbmFwc2hvdC5kb2NzWzBdO1xuXG4gICAgICBpZighdXNlckRvYyl7XG4gICAgICAgIHRvYXN0KHtcbiAgICAgICAgICB0aXRsZTogXCJMb2dpbiBmYWlsZWRcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJVc2VyIG5vdCBmb3VuZC4gUGxlYXNlIGNoZWNrIHlvdXIgdXNlcm5hbWUuXCIsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCB1c2VyRGF0YSA9IHVzZXJEb2MuZGF0YSgpO1xuXG4gICAgICAvL0dldCB0aGUgdXNlciBVSUQgZnJvbSB0aGUgdXNlckRvY3VtZW50XG4gICAgICBjb25zdCB1c2VyVUlEID0gdXNlckRvYy5pZDtcblxuICAgICAgLy8gU2lnbiBpbiB3aXRoIGVtYWlsIGFuZCBwYXNzd29yZFxuICAgICAgYXdhaXQgc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoYXV0aCwgdXNlckRhdGEuZW1haWwsIGRhdGEucGFzc3dvcmQpLnRoZW4oKHVzZXJDcmVkZW50aWFsKSA9PiB7XG4gICAgICAgIGNvbnN0IHNpZ25lZEluVXNlclVJRCA9IHVzZXJDcmVkZW50aWFsLnVzZXIudWlkO1xuICAgICAgICBcbiAgICAgICAgaWYgKHNpZ25lZEluVXNlclVJRCAhPT0gdXNlclVJRCkge1xuICAgICAgICAgIHRvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkxvZ2luIGZhaWxlZFwiLFxuICAgICAgICAgICAgdGltZW91dDogMTIwMCxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludmFsaWQgdXNlcm5hbWUgb3IgcGFzc3dvcmRcIixcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBmb3JtLnJlc2V0KCk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICB9LDEyMDApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAgIHRvYXN0KHtcbiAgICAgICAgdGl0bGU6IFwiTG9naW4gc3VjY2Vzc2Z1bFwiLFxuICAgICAgICBkdXJhdGlvbjogMTIwMCxcbiAgICAgIH0pO1xuICAgICAgZm9ybS5yZXNldCgpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJvdXRlci5wdXNoKFwiL21haW5TY3JlZW5cIik7XG4gICAgICB9LCAyMDAwKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ2F1dGgvdXNlci1ub3QtZm91bmQnIHx8IGVycm9yLm1lc3NhZ2UgPT09ICdVc2VyIG5vdCBmb3VuZCcpIHtcbiAgICAgICAgdG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiBcIkxvZ2luIGZhaWxlZFwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlVzZXIgbm90IGZvdW5kLiBQbGVhc2UgY2hlY2sgeW91ciB1c2VybmFtZS5cIixcbiAgICAgICAgICB2YXJpYW50OiAnZGVzdHJ1Y3RpdmUnLFxuICAgICAgICAgIGR1cmF0aW9uOiAxMjAwLFxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmIChlcnJvci5jb2RlID09PSAnYXV0aC93cm9uZy1wYXNzd29yZCcpIHtcbiAgICAgICAgdG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiBcIkxvZ2luIGZhaWxlZFwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludmFsaWQgdXNlcm5hbWUgb3IgcGFzc3dvcmRcIixcbiAgICAgICAgICB2YXJpYW50OiAnZGVzdHJ1Y3RpdmUnLFxuICAgICAgICAgIGR1cmF0aW9uOiAxMjAwLFxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgdG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiBcIkxvZ2luIGZhaWxlZFwiLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgdmFyaWFudDogJ2Rlc3RydWN0aXZlJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPENhcmRXcmFwcGVyXG4gICAgICBsYWJlbD1cIkxvZ2luXCJcbiAgICAgIHRpdGxlPVwiV2VsY29tZSBCYWNrIVwiXG4gICAgICBiYWNrQnV0dG9uSHJlZj1cIi9hdXRoL3JlZ2lzdGVyXCJcbiAgICAgIGJhY2tCdXR0b25MYWJlbD1cIkRvbid0IGhhdmUgYW4gYWNjb3VudD8gU2lnbiB1cCBIZXJlLlwiXG4gICAgICB1c2VybmFtZUxvZ2luSHJlZj1cIi9hdXRoL2xvZ2luL2VtYWlsXCJcbiAgICAgIHVzZXJuYW1lTG9naW5MYWJlbD1cIkxvZ2luIHdpdGggZW1haWxcIlxuICAgID5cbiAgICAgIDxGb3JtIHsuLi5mb3JtfT5cbiAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2Zvcm0uaGFuZGxlU3VibWl0KG9uU3VibWl0KX0gY2xhc3NOYW1lPVwic3BhY2UteS02IGZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICA8Rm9ybUZpZWxkXG4gICAgICAgICAgICBjb250cm9sPXtmb3JtLmNvbnRyb2x9XG4gICAgICAgICAgICBuYW1lPVwidXNlcm5hbWVcIlxuICAgICAgICAgICAgcmVuZGVyPXsoeyBmaWVsZCB9KSA9PiAoXG4gICAgICAgICAgICAgIDxGb3JtSXRlbT5cbiAgICAgICAgICAgICAgICA8Rm9ybUxhYmVsPlVzZXJuYW1lPC9Gb3JtTGFiZWw+XG4gICAgICAgICAgICAgICAgPEZvcm1Db250cm9sPlxuICAgICAgICAgICAgICAgICAgPElucHV0IHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciB1c2VybmFtZVwiIHsuLi5maWVsZH0gLz5cbiAgICAgICAgICAgICAgICA8L0Zvcm1Db250cm9sPlxuICAgICAgICAgICAgICAgIDxGb3JtTWVzc2FnZSBjbGFzc05hbWU9J2Vycm9yLW1lc3NhZ2UnLz5cbiAgICAgICAgICAgICAgPC9Gb3JtSXRlbT5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8Rm9ybUZpZWxkXG4gICAgICAgICAgICBjb250cm9sPXtmb3JtLmNvbnRyb2x9XG4gICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgcmVuZGVyPXsoeyBmaWVsZCB9KSA9PiAoXG4gICAgICAgICAgICAgIDxGb3JtSXRlbT5cbiAgICAgICAgICAgICAgICA8Rm9ybUxhYmVsPlBhc3N3b3JkPC9Gb3JtTGFiZWw+XG4gICAgICAgICAgICAgICAgPEZvcm1Db250cm9sPlxuICAgICAgICAgICAgICAgICAgPElucHV0IHR5cGU9XCJwYXNzd29yZFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBwYXNzd29yZFwiIHsuLi5maWVsZH0gLz5cbiAgICAgICAgICAgICAgICA8L0Zvcm1Db250cm9sPlxuICAgICAgICAgICAgICAgIDxGb3JtTWVzc2FnZSBjbGFzc05hbWU9J2Vycm9yLW1lc3NhZ2UnLz5cbiAgICAgICAgICAgICAgPC9Gb3JtSXRlbT5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzc05hbWU9J3ctZnVsbCcgZGlzYWJsZWQ9e2lzTG9hZGluZ30+XG4gICAgICAgICAgICB7aXNMb2FkaW5nID8gXCJMb2FkaW5nLi4uXCIgOiBcIkxvZ2luXCJ9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvZm9ybT5cbiAgICAgIDwvRm9ybT5cbiAgICA8L0NhcmRXcmFwcGVyPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgTG9naW5Gb3JtVXNlcm5hbWU7Il0sIm5hbWVzIjpbIlJlYWN0SG9va0Zvcm0iLCJ1c2VTdGF0ZSIsInoiLCJ6b2RSZXNvbHZlciIsInVzZVJvdXRlciIsIkNhcmRXcmFwcGVyIiwiRm9ybSIsIkZvcm1JdGVtIiwiRm9ybUxhYmVsIiwiRm9ybUNvbnRyb2wiLCJGb3JtTWVzc2FnZSIsIkZvcm1GaWVsZCIsIkJ1dHRvbiIsIklucHV0IiwidXNlVG9hc3QiLCJhdXRoIiwiZGIiLCJzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCIsImNvbGxlY3Rpb24iLCJxdWVyeSIsIndoZXJlIiwiZ2V0RG9jcyIsImxvZ2luU2NoZW1hIiwib2JqZWN0IiwidXNlcm5hbWUiLCJzdHJpbmciLCJtaW4iLCJwYXNzd29yZCIsIkxvZ2luRm9ybVVzZXJuYW1lIiwiaXNMb2FkaW5nIiwic2V0SXNMb2FkaW5nIiwidG9hc3QiLCJyb3V0ZXIiLCJmb3JtIiwidXNlRm9ybSIsInJlc29sdmVyIiwibW9kZSIsImRlZmF1bHRWYWx1ZXMiLCJvblN1Ym1pdCIsImRhdGEiLCJ1c2Vyc1JlZiIsInEiLCJxdWVyeVNuYXBzaG90IiwiZW1wdHkiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwidXNlckRvYyIsImRvY3MiLCJ1c2VyRGF0YSIsInVzZXJVSUQiLCJpZCIsImVtYWlsIiwidGhlbiIsInVzZXJDcmVkZW50aWFsIiwic2lnbmVkSW5Vc2VyVUlEIiwidXNlciIsInVpZCIsInRpbWVvdXQiLCJyZXNldCIsInNldFRpbWVvdXQiLCJkdXJhdGlvbiIsInB1c2giLCJlcnJvciIsImNvbnNvbGUiLCJjb2RlIiwibWVzc2FnZSIsInZhcmlhbnQiLCJlcnJvck1lc3NhZ2UiLCJsYWJlbCIsImJhY2tCdXR0b25IcmVmIiwiYmFja0J1dHRvbkxhYmVsIiwidXNlcm5hbWVMb2dpbkhyZWYiLCJ1c2VybmFtZUxvZ2luTGFiZWwiLCJoYW5kbGVTdWJtaXQiLCJjbGFzc05hbWUiLCJjb250cm9sIiwibmFtZSIsInJlbmRlciIsImZpZWxkIiwicGxhY2Vob2xkZXIiLCJ0eXBlIiwiZGlzYWJsZWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/auth/LoginFormUsername.jsx\n"));

/***/ })

});