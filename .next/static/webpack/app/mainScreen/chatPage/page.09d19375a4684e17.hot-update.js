"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/mainScreen/chatPage/page",{

/***/ "(app-pages-browser)/./app/mainScreen/chatPage/page.jsx":
/*!******************************************!*\
  !*** ./app/mainScreen/chatPage/page.jsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ui/card */ \"(app-pages-browser)/./components/ui/card.jsx\");\n/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/input */ \"(app-pages-browser)/./components/ui/input.jsx\");\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./components/ui/button.jsx\");\n/* harmony import */ var _components_ui_scroll_area__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/ui/scroll-area */ \"(app-pages-browser)/./components/ui/scroll-area.jsx\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase/auth */ \"(app-pages-browser)/./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/firebase */ \"(app-pages-browser)/./firebase.js\");\n/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! firebase/storage */ \"(app-pages-browser)/./node_modules/firebase/storage/dist/esm/index.esm.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\nfunction Home() {\n    _s();\n    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([\n        {\n            role: \"system\",\n            content: \"Welcome to the College Tutor Chatbot! How can I help you today?\"\n        }\n    ]);\n    const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [userId, setUserId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [workspace, setWorkspace] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [workspaceTitle, setWorkspaceTitle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [files, setFiles] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // New state for file uploads <- stores in an array of files\n    const authInstance = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_6__.getAuth)();\n    const messagesEndRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const storage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_8__.getStorage)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        var _messagesEndRef_current;\n        (_messagesEndRef_current = messagesEndRef.current) === null || _messagesEndRef_current === void 0 ? void 0 : _messagesEndRef_current.scrollIntoView({\n            behavior: \"smooth\"\n        });\n    }, [\n        messages\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_6__.onAuthStateChanged)(_firebase__WEBPACK_IMPORTED_MODULE_7__.auth, (user)=>{\n            if (user) setUserId(user.uid);\n            else setUserId(null);\n        });\n        return ()=>unsubscribe();\n    }, []);\n    const uploadFile = async (file)=>{\n        const fileRef = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_8__.ref)(storage, \"uploads/\".concat(file.name)); // Create a reference to the file location\n        try {\n            // Upload the file\n            await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_8__.uploadBytes)(fileRef, file);\n            // Get the download URL\n            const downloadURL = await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_8__.getDownloadURL)(fileRef);\n            return downloadURL; // Return the download URL\n        } catch (error) {\n            console.error(\"Error uploading file:\", error);\n            throw new Error(\"File upload failed\");\n        }\n    };\n    const sendMessage = async ()=>{\n        if (!message.trim() || isLoading) return;\n        const userMessage = {\n            role: \"user\",\n            content: message\n        };\n        setMessage(\"\");\n        setIsLoading(true);\n        setMessages((prevMessages)=>[\n                ...prevMessages,\n                userMessage\n            ]);\n        try {\n            const response = await fetch(\"/api/chats\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify([\n                    ...messages,\n                    userMessage\n                ])\n            });\n            if (!response.ok) throw new Error(\"Network response was not ok\");\n            const reader = response.body.getReader();\n            const decoder = new TextDecoder();\n            let result = \"\";\n            while(true){\n                const { done, value } = await reader.read();\n                if (done) break;\n                result += decoder.decode(value, {\n                    stream: true\n                });\n            }\n            setMessages((prevMessages)=>[\n                    ...prevMessages,\n                    {\n                        role: \"system\",\n                        content: result\n                    }\n                ]);\n        } catch (error) {\n            console.error(\"Error fetching data:\", error);\n        }\n        setIsLoading(false);\n    };\n    const handleGetWorkspace = async ()=>{\n        if (!userId) {\n            console.error(\"User is not authenticated.\");\n            return;\n        }\n        try {\n            const token = await authInstance.currentUser.getIdToken();\n            const response = await fetch(\"/api/getWorkspace\", {\n                method: \"GET\",\n                headers: {\n                    \"Content-Type\": \"application\",\n                    \"Authorization\": \"Bearer \".concat(token)\n                }\n            });\n            const workspaceData = await response.json();\n            console.log(\"Workspace data:\", workspaceData);\n        } catch (e) {\n            console.error(\"Error fetching workspace:\", e);\n        }\n    };\n    const handleSaveWorkspace = async ()=>{\n        if (!userId) {\n            console.error(\"User is not authenticated.\");\n            return;\n        }\n        try {\n            const token = await authInstance.currentUser.getIdToken();\n            const fileUrls = await Promise.all(files.map((file)=>uploadFile(file)));\n            if (!workspaceTitle || messages.length === 0) {\n                throw new Error(\"Invalid workspace data\");\n            }\n            const workspaceData = {\n                title: workspaceTitle || \"Workspace \".concat(Date.now()),\n                messages: messages.map((message)=>({\n                        role: message.role,\n                        content: message.content\n                    })),\n                fileContent: fileUrls\n            };\n            const response = await fetch(\"/api/saveWorkspace\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\",\n                    \"Authorization\": \"Bearer \".concat(token)\n                },\n                body: JSON.stringify({\n                    data: workspaceData\n                })\n            });\n            if (!response.ok) {\n                const errorData = await response.json();\n                console.error(\"Error saving workspace:\", errorData);\n                throw new Error(\"Failed to save workspace: \".concat(JSON.stringify(errorData)));\n            }\n            const result = await response.json();\n            console.log(\"Workspace saved successfully\", result);\n        } catch (error) {\n            console.error(\"Error saving workspace:\", error);\n        }\n    };\n    // Function to handle file selection\n    const handleFileChange = (event)=>{\n        const allowedFileTypes = [\n            \"application/pdf\"\n        ];\n        const maxSize = 10 * 1024 * 1024; // 10 MB\n        const selectedFiles = Array.from(event.target.files);\n        selectedFiles.forEach((file)=>{\n            if (!allowedFileTypes.includes(file.type) || file.size > maxSize) {\n                console.error(\"File type \".concat(file.type, \" or size \").concat(file.size, \" is not allowed.\"));\n            }\n        });\n        setFiles(selectedFiles);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_2__.Card, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_scroll_area__WEBPACK_IMPORTED_MODULE_5__.ScrollArea, {\n                children: [\n                    messages.map((message, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: message.content || \"Start conversation...\"\n                            }, void 0, false, {\n                                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                                lineNumber: 185,\n                                columnNumber: 13\n                            }, this)\n                        }, index, false, {\n                            fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                            lineNumber: 184,\n                            columnNumber: 11\n                        }, this)),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        ref: messagesEndRef\n                    }, void 0, false, {\n                        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                        lineNumber: 188,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 182,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {\n                value: message,\n                onChange: (e)=>setMessage(e.target.value),\n                placeholder: \"Enter your message\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 190,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                onClick: sendMessage,\n                disabled: isLoading,\n                children: \"Send\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 195,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {\n                value: workspaceTitle,\n                onChange: (e)=>setWorkspaceTitle(e.target.value),\n                placeholder: \"Enter workspace title\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 198,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {\n                type: \"file\" // Change input type to file for uploading files\n                ,\n                onChange: handleFileChange,\n                multiple: true\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 203,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                onClick: handleSaveWorkspace,\n                children: \"Save Workspace\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 208,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                onClick: handleGetWorkspace,\n                children: \"Get Workspace\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 210,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n        lineNumber: 181,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"zhBzNkOsobrLEc6OYWtIWoWCtX0=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9tYWluU2NyZWVuL2NoYXRQYWdlL3BhZ2UuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFb0Q7QUFDUjtBQUNFO0FBQ0U7QUFDUztBQUNHO0FBQzdCO0FBQ2lEO0FBRWpFLFNBQVNjOztJQUN0QixNQUFNLENBQUNDLFVBQVVDLFlBQVksR0FBR2hCLCtDQUFRQSxDQUFDO1FBQ3ZDO1lBQ0VpQixNQUFNO1lBQ05DLFNBQ0U7UUFDSjtLQUNEO0lBQ0QsTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUdwQiwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNLENBQUNxQixXQUFXQyxhQUFhLEdBQUd0QiwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNLENBQUN1QixRQUFRQyxVQUFVLEdBQUd4QiwrQ0FBUUEsQ0FBQztJQUNyQyxNQUFNLENBQUN5QixXQUFXQyxhQUFhLEdBQUcxQiwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNLENBQUMyQixnQkFBZ0JDLGtCQUFrQixHQUFHNUIsK0NBQVFBLENBQUM7SUFDckQsTUFBTSxDQUFDNkIsT0FBT0MsU0FBUyxHQUFHOUIsK0NBQVFBLENBQUMsRUFBRSxHQUFHLDREQUE0RDtJQUNwRyxNQUFNK0IsZUFBZXhCLHNEQUFPQTtJQUM1QixNQUFNeUIsaUJBQWlCOUIsNkNBQU1BLENBQUM7SUFDOUIsTUFBTStCLFVBQVV2Qiw0REFBVUE7SUFFMUJULGdEQUFTQSxDQUFDO1lBQ1IrQjtTQUFBQSwwQkFBQUEsZUFBZUUsT0FBTyxjQUF0QkYsOENBQUFBLHdCQUF3QkcsY0FBYyxDQUFDO1lBQUVDLFVBQVU7UUFBUztJQUM5RCxHQUFHO1FBQUNyQjtLQUFTO0lBRWJkLGdEQUFTQSxDQUFDO1FBQ1IsTUFBTW9DLGNBQWM3QixpRUFBa0JBLENBQUNDLDJDQUFJQSxFQUFFLENBQUM2QjtZQUM1QyxJQUFJQSxNQUFNZCxVQUFVYyxLQUFLQyxHQUFHO2lCQUN2QmYsVUFBVTtRQUNqQjtRQUNBLE9BQU8sSUFB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QUFyQkEsS0FBSzJELElBQUksRUFBQyxhQUFxQixPQUFWM0QsS0FBSzRELElBQUksRUFBQztZQUVoRDtRQUNGO1FBQ0F2RSxTQUFTZ0U7SUFDWDtJQUVBLHFCQUNFLDhEQUFDM0YscURBQUlBOzswQkFDSCw4REFBQ0csa0VBQVVBOztvQkFDUlMsU0FBU21FLEdBQUcsQ0FBQyxDQUFDL0QsU0FBU21GLHNCQUN0Qiw4REFBQ0M7c0NBQ0MsNEVBQUNDOzBDQUFHckYsUUFBUUQsT0FBTyxJQUFJOzs7Ozs7MkJBRGZvRjs7Ozs7a0NBSVosOERBQUNDO3dCQUFJNUYsS0FBS3FCOzs7Ozs7Ozs7Ozs7MEJBRVosOERBQUM1Qix1REFBS0E7Z0JBQ0o4RCxPQUFPL0M7Z0JBQ1BzRixVQUFVLENBQUM1QixJQUFNekQsV0FBV3lELEVBQUVvQixNQUFNLENBQUMvQixLQUFLO2dCQUMxQ3dDLGFBQVk7Ozs7OzswQkFFZCw4REFBQ3JHLHlEQUFNQTtnQkFBQ3NHLFNBQVMzRDtnQkFBYTRELFVBQVV2RjswQkFBVzs7Ozs7OzBCQUduRCw4REFBQ2pCLHVEQUFLQTtnQkFDSjhELE9BQU92QztnQkFDUDhFLFVBQVUsQ0FBQzVCLElBQU1qRCxrQkFBa0JpRCxFQUFFb0IsTUFBTSxDQUFDL0IsS0FBSztnQkFDakR3QyxhQUFZOzs7Ozs7MEJBRWQsOERBQUN0Ryx1REFBS0E7Z0JBQ0pnRyxNQUFLLE9BQU8sZ0RBQWdEOztnQkFDNURLLFVBQVVmO2dCQUNWbUIsUUFBUTs7Ozs7OzBCQUVWLDhEQUFDeEcseURBQU1BO2dCQUFDc0csU0FBUzdCOzBCQUFxQjs7Ozs7OzBCQUV0Qyw4REFBQ3pFLHlEQUFNQTtnQkFBQ3NHLFNBQVNyQzswQkFBb0I7Ozs7Ozs7Ozs7OztBQUczQztHQXpNd0J4RDtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvbWFpblNjcmVlbi9jaGF0UGFnZS9wYWdlLmpzeD8zM2I2Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IENhcmQgfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2NhcmRcIjtcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9pbnB1dFwiO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9idXR0b25cIjtcbmltcG9ydCB7IFNjcm9sbEFyZWEgfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL3Njcm9sbC1hcmVhXCI7XG5pbXBvcnQgeyBnZXRBdXRoLCBvbkF1dGhTdGF0ZUNoYW5nZWQgfSBmcm9tIFwiZmlyZWJhc2UvYXV0aFwiO1xuaW1wb3J0IHthdXRofSBmcm9tICdAL2ZpcmViYXNlJ1xuaW1wb3J0IHsgZ2V0U3RvcmFnZSwgcmVmLCB1cGxvYWRCeXRlcywgZ2V0RG93bmxvYWRVUkwgfSBmcm9tIFwiZmlyZWJhc2Uvc3RvcmFnZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICBjb25zdCBbbWVzc2FnZXMsIHNldE1lc3NhZ2VzXSA9IHVzZVN0YXRlKFtcbiAgICB7XG4gICAgICByb2xlOiBcInN5c3RlbVwiLFxuICAgICAgY29udGVudDpcbiAgICAgICAgXCJXZWxjb21lIHRvIHRoZSBDb2xsZWdlIFR1dG9yIENoYXRib3QhIEhvdyBjYW4gSSBoZWxwIHlvdSB0b2RheT9cIixcbiAgICB9LFxuICBdKTtcbiAgY29uc3QgW21lc3NhZ2UsIHNldE1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt1c2VySWQsIHNldFVzZXJJZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3dvcmtzcGFjZSwgc2V0V29ya3NwYWNlXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbd29ya3NwYWNlVGl0bGUsIHNldFdvcmtzcGFjZVRpdGxlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZmlsZXMsIHNldEZpbGVzXSA9IHVzZVN0YXRlKFtdKTsgLy8gTmV3IHN0YXRlIGZvciBmaWxlIHVwbG9hZHMgPC0gc3RvcmVzIGluIGFuIGFycmF5IG9mIGZpbGVzXG4gIGNvbnN0IGF1dGhJbnN0YW5jZSA9IGdldEF1dGgoKTtcbiAgY29uc3QgbWVzc2FnZXNFbmRSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IHN0b3JhZ2UgPSBnZXRTdG9yYWdlKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBtZXNzYWdlc0VuZFJlZi5jdXJyZW50Py5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xuICB9LCBbbWVzc2FnZXNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gb25BdXRoU3RhdGVDaGFuZ2VkKGF1dGgsICh1c2VyKSA9PiB7XG4gICAgICBpZiAodXNlcikgc2V0VXNlcklkKHVzZXIudWlkKTtcbiAgICAgIGVsc2Ugc2V0VXNlcklkKG51bGwpO1xuICAgIH0pO1xuICAgIHJldHVybiAoKSA9PiB1bnN1YnNjcmliZSgpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgdXBsb2FkRmlsZSA9IGFzeW5jIChmaWxlKSA9PiB7XG4gICAgY29uc3QgZmlsZVJlZiA9IHJlZihzdG9yYWdlLCBgdXBsb2Fkcy8ke2ZpbGUubmFtZX1gKTsgLy8gQ3JlYXRlIGEgcmVmZXJlbmNlIHRvIHRoZSBmaWxlIGxvY2F0aW9uXG5cbiAgICB0cnkge1xuICAgICAgLy8gVXBsb2FkIHRoZSBmaWxlXG4gICAgICBhd2FpdCB1cGxvYWRCeXRlcyhmaWxlUmVmLCBmaWxlKTtcblxuICAgICAgLy8gR2V0IHRoZSBkb3dubG9hZCBVUkxcbiAgICAgIGNvbnN0IGRvd25sb2FkVVJMID0gYXdhaXQgZ2V0RG93bmxvYWRVUkwoZmlsZVJlZik7XG4gICAgICByZXR1cm4gZG93bmxvYWRVUkw7IC8vIFJldHVybiB0aGUgZG93bmxvYWQgVVJMXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB1cGxvYWRpbmcgZmlsZTpcIiwgZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmlsZSB1cGxvYWQgZmFpbGVkXCIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZW5kTWVzc2FnZSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIW1lc3NhZ2UudHJpbSgpIHx8IGlzTG9hZGluZykgcmV0dXJuO1xuICAgIGNvbnN0IHVzZXJNZXNzYWdlID0geyByb2xlOiBcInVzZXJcIiwgY29udGVudDogbWVzc2FnZSB9O1xuICAgIHNldE1lc3NhZ2UoXCJcIik7XG4gICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgIHNldE1lc3NhZ2VzKChwcmV2TWVzc2FnZXMpID0+IFsuLi5wcmV2TWVzc2FnZXMsIHVzZXJNZXNzYWdlXSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi9hcGkvY2hhdHNcIiwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KFsuLi5tZXNzYWdlcywgdXNlck1lc3NhZ2VdKSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoXCJOZXR3b3JrIHJlc3BvbnNlIHdhcyBub3Qgb2tcIik7XG5cbiAgICAgIGNvbnN0IHJlYWRlciA9IHJlc3BvbnNlLmJvZHkuZ2V0UmVhZGVyKCk7XG4gICAgICBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG4gICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcbiAgICAgICAgaWYgKGRvbmUpIGJyZWFrO1xuICAgICAgICByZXN1bHQgKz0gZGVjb2Rlci5kZWNvZGUodmFsdWUsIHsgc3RyZWFtOiB0cnVlIH0pO1xuICAgICAgfVxuXG4gICAgICBzZXRNZXNzYWdlcygocHJldk1lc3NhZ2VzKSA9PiBbXG4gICAgICAgIC4uLnByZXZNZXNzYWdlcyxcbiAgICAgICAgeyByb2xlOiBcInN5c3RlbVwiLCBjb250ZW50OiByZXN1bHQgfSxcbiAgICAgIF0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGF0YTpcIiwgZXJyb3IpO1xuICAgIH1cblxuICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlR2V0V29ya3NwYWNlID0gYXN5bmMgKCkgPT4geyBcbiAgICBpZighdXNlcklkKXtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJVc2VyIGlzIG5vdCBhdXRoZW50aWNhdGVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnl7XG4gICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGF1dGhJbnN0YW5jZS5jdXJyZW50VXNlci5nZXRJZFRva2VuKCk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9nZXRXb3Jrc3BhY2VcIiwge1xuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uXCIsXG4gICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IHdvcmtzcGFjZURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgY29uc29sZS5sb2coXCJXb3Jrc3BhY2UgZGF0YTpcIiwgd29ya3NwYWNlRGF0YSk7XG4gIH1jYXRjaChlKXtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgd29ya3NwYWNlOlwiLCBlKTtcbiAgfVxufVxuXG4gIGNvbnN0IGhhbmRsZVNhdmVXb3Jrc3BhY2UgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCF1c2VySWQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJVc2VyIGlzIG5vdCBhdXRoZW50aWNhdGVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIFxuICAgIHRyeSB7XG4gICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGF1dGhJbnN0YW5jZS5jdXJyZW50VXNlci5nZXRJZFRva2VuKCk7XG4gICAgICBjb25zdCBmaWxlVXJscyA9IGF3YWl0IFByb21pc2UuYWxsKGZpbGVzLm1hcCgoZmlsZSkgPT4gdXBsb2FkRmlsZShmaWxlKSkpO1xuICBcbiAgICAgIGlmICghd29ya3NwYWNlVGl0bGUgfHwgbWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgd29ya3NwYWNlIGRhdGFcIik7XG4gICAgICB9XG4gIFxuICAgICAgY29uc3Qgd29ya3NwYWNlRGF0YSA9IHtcbiAgICAgICAgdGl0bGU6IHdvcmtzcGFjZVRpdGxlIHx8IGBXb3Jrc3BhY2UgJHtEYXRlLm5vdygpfWAsXG4gICAgICAgIG1lc3NhZ2VzOiBtZXNzYWdlcy5tYXAoKG1lc3NhZ2UpID0+ICh7XG4gICAgICAgICAgcm9sZTogbWVzc2FnZS5yb2xlLFxuICAgICAgICAgIGNvbnRlbnQ6IG1lc3NhZ2UuY29udGVudCxcbiAgICAgICAgfSkpLFxuICAgICAgICBmaWxlQ29udGVudDogZmlsZVVybHMsXG4gICAgICB9O1xuICBcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvYXBpL3NhdmVXb3Jrc3BhY2VcIiwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBkYXRhOiB3b3Jrc3BhY2VEYXRhIH0pLFxuICAgICAgfSk7XG4gIFxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzYXZpbmcgd29ya3NwYWNlOlwiLCBlcnJvckRhdGEpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBzYXZlIHdvcmtzcGFjZTogJHtKU09OLnN0cmluZ2lmeShlcnJvckRhdGEpfWApO1xuICAgICAgfVxuICBcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiV29ya3NwYWNlIHNhdmVkIHN1Y2Nlc3NmdWxseVwiLCByZXN1bHQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2F2aW5nIHdvcmtzcGFjZTpcIiwgZXJyb3IpO1xuICAgIH1cbiAgfTtcblxuICAvLyBGdW5jdGlvbiB0byBoYW5kbGUgZmlsZSBzZWxlY3Rpb25cbiAgY29uc3QgaGFuZGxlRmlsZUNoYW5nZSA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGFsbG93ZWRGaWxlVHlwZXMgPSBbXCJhcHBsaWNhdGlvbi9wZGZcIl07XG4gICAgY29uc3QgbWF4U2l6ZSA9IDEwICogMTAyNCAqIDEwMjQ7IC8vIDEwIE1CXG5cbiAgICBjb25zdCBzZWxlY3RlZEZpbGVzID0gQXJyYXkuZnJvbShldmVudC50YXJnZXQuZmlsZXMpO1xuXG4gICAgc2VsZWN0ZWRGaWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICBpZiAoIWFsbG93ZWRGaWxlVHlwZXMuaW5jbHVkZXMoZmlsZS50eXBlKSB8fCBmaWxlLnNpemUgPiBtYXhTaXplKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgYEZpbGUgdHlwZSAke2ZpbGUudHlwZX0gb3Igc2l6ZSAke2ZpbGUuc2l6ZX0gaXMgbm90IGFsbG93ZWQuYFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHNldEZpbGVzKHNlbGVjdGVkRmlsZXMpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPENhcmQ+XG4gICAgICA8U2Nyb2xsQXJlYT5cbiAgICAgICAge21lc3NhZ2VzLm1hcCgobWVzc2FnZSwgaW5kZXgpID0+IChcbiAgICAgICAgICA8ZGl2IGtleT17aW5kZXh9PlxuICAgICAgICAgICAgPHA+e21lc3NhZ2UuY29udGVudCB8fCBcIlN0YXJ0IGNvbnZlcnNhdGlvbi4uLlwifTwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSl9XG4gICAgICAgIDxkaXYgcmVmPXttZXNzYWdlc0VuZFJlZn0gLz5cbiAgICAgIDwvU2Nyb2xsQXJlYT5cbiAgICAgIDxJbnB1dFxuICAgICAgICB2YWx1ZT17bWVzc2FnZX1cbiAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRNZXNzYWdlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB5b3VyIG1lc3NhZ2VcIlxuICAgICAgLz5cbiAgICAgIDxCdXR0b24gb25DbGljaz17c2VuZE1lc3NhZ2V9IGRpc2FibGVkPXtpc0xvYWRpbmd9PlxuICAgICAgICBTZW5kXG4gICAgICA8L0J1dHRvbj5cbiAgICAgIDxJbnB1dFxuICAgICAgICB2YWx1ZT17d29ya3NwYWNlVGl0bGV9XG4gICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0V29ya3NwYWNlVGl0bGUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHdvcmtzcGFjZSB0aXRsZVwiXG4gICAgICAvPlxuICAgICAgPElucHV0XG4gICAgICAgIHR5cGU9XCJmaWxlXCIgLy8gQ2hhbmdlIGlucHV0IHR5cGUgdG8gZmlsZSBmb3IgdXBsb2FkaW5nIGZpbGVzXG4gICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVGaWxlQ2hhbmdlfVxuICAgICAgICBtdWx0aXBsZSAvLyBBbGxvdyBtdWx0aXBsZSBmaWxlIHVwbG9hZHNcbiAgICAgIC8+XG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e2hhbmRsZVNhdmVXb3Jrc3BhY2V9PlNhdmUgV29ya3NwYWNlPC9CdXR0b24+XG5cbiAgICAgIDxCdXR0b24gb25DbGljaz17aGFuZGxlR2V0V29ya3NwYWNlfT5HZXQgV29ya3NwYWNlPC9CdXR0b24+XG4gICAgPC9DYXJkPlxuICApO1xufVxuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0IiwidXNlUmVmIiwiQ2FyZCIsIklucHV0IiwiQnV0dG9uIiwiU2Nyb2xsQXJlYSIsImdldEF1dGgiLCJvbkF1dGhTdGF0ZUNoYW5nZWQiLCJhdXRoIiwiZ2V0U3RvcmFnZSIsInJlZiIsInVwbG9hZEJ5dGVzIiwiZ2V0RG93bmxvYWRVUkwiLCJIb21lIiwibWVzc2FnZXMiLCJzZXRNZXNzYWdlcyIsInJvbGUiLCJjb250ZW50IiwibWVzc2FnZSIsInNldE1lc3NhZ2UiLCJpc0xvYWRpbmciLCJzZXRJc0xvYWRpbmciLCJ1c2VySWQiLCJzZXRVc2VySWQiLCJ3b3Jrc3BhY2UiLCJzZXRXb3Jrc3BhY2UiLCJ3b3Jrc3BhY2VUaXRsZSIsInNldFdvcmtzcGFjZVRpdGxlIiwiZmlsZXMiLCJzZXRGaWxlcyIsImF1dGhJbnN0YW5jZSIsIm1lc3NhZ2VzRW5kUmVmIiwic3RvcmFnZSIsImN1cnJlbnQiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwidW5zdWJzY3JpYmUiLCJ1c2VyIiwidWlkIiwidXBsb2FkRmlsZSIsImZpbGUiLCJmaWxlUmVmIiwibmFtZSIsImRvd25sb2FkVVJMIiwiZXJyb3IiLCJjb25zb2xlIiwiRXJyb3IiLCJzZW5kTWVzc2FnZSIsInRyaW0iLCJ1c2VyTWVzc2FnZSIsInByZXZNZXNzYWdlcyIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJvayIsInJlYWRlciIsImdldFJlYWRlciIsImRlY29kZXIiLCJUZXh0RGVjb2RlciIsInJlc3VsdCIsImRvbmUiLCJ2YWx1ZSIsInJlYWQiLCJkZWNvZGUiLCJzdHJlYW0iLCJoYW5kbGVHZXRXb3Jrc3BhY2UiLCJ0b2tlbiIsImN1cnJlbnRVc2VyIiwiZ2V0SWRUb2tlbiIsIndvcmtzcGFjZURhdGEiLCJqc29uIiwibG9nIiwiZSIsImhhbmRsZVNhdmVXb3Jrc3BhY2UiLCJmaWxlVXJscyIsIlByb21pc2UiLCJhbGwiLCJtYXAiLCJsZW5ndGgiLCJ0aXRsZSIsIkRhdGUiLCJub3ciLCJmaWxlQ29udGVudCIsImRhdGEiLCJlcnJvckRhdGEiLCJoYW5kbGVGaWxlQ2hhbmdlIiwiZXZlbnQiLCJhbGxvd2VkRmlsZVR5cGVzIiwibWF4U2l6ZSIsInNlbGVjdGVkRmlsZXMiLCJBcnJheSIsImZyb20iLCJ0YXJnZXQiLCJmb3JFYWNoIiwiaW5jbHVkZXMiLCJ0eXBlIiwic2l6ZSIsImluZGV4IiwiZGl2IiwicCIsIm9uQ2hhbmdlIiwicGxhY2Vob2xkZXIiLCJvbkNsaWNrIiwiZGlzYWJsZWQiLCJtdWx0aXBsZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/mainScreen/chatPage/page.jsx\n"));

/***/ })

});