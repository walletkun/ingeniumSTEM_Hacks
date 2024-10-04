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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ui/card */ \"(app-pages-browser)/./components/ui/card.jsx\");\n/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/input */ \"(app-pages-browser)/./components/ui/input.jsx\");\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./components/ui/button.jsx\");\n/* harmony import */ var _components_ui_scroll_area__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/ui/scroll-area */ \"(app-pages-browser)/./components/ui/scroll-area.jsx\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase/auth */ \"(app-pages-browser)/./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/firebase */ \"(app-pages-browser)/./firebase.js\");\n/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! firebase/storage */ \"(app-pages-browser)/./node_modules/firebase/storage/dist/esm/index.esm.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\nfunction Home() {\n    _s();\n    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([\n        {\n            role: \"system\",\n            content: \"Welcome to the College Tutor Chatbot! How can I help you today?\"\n        }\n    ]);\n    const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [userId, setUserId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [workspaceTitle, setWorkspaceTitle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [files, setFiles] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // New state for file uploads <- stores in an array of files\n    const authInstance = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_6__.getAuth)();\n    const messagesEndRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const storage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_8__.getStorage)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        var _messagesEndRef_current;\n        (_messagesEndRef_current = messagesEndRef.current) === null || _messagesEndRef_current === void 0 ? void 0 : _messagesEndRef_current.scrollIntoView({\n            behavior: \"smooth\"\n        });\n    }, [\n        messages\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_6__.onAuthStateChanged)(_firebase__WEBPACK_IMPORTED_MODULE_7__.auth, (user)=>{\n            if (user) setUserId(user.uid);\n            else setUserId(null);\n        });\n        return ()=>unsubscribe();\n    }, []);\n    const uploadFile = async (file)=>{\n        const fileRef = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_8__.ref)(storage, \"uploads/\".concat(file.name)); // Create a reference to the file location\n        try {\n            // Upload the file\n            await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_8__.uploadBytes)(fileRef, file);\n            // Get the download URL\n            const downloadURL = await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_8__.getDownloadURL)(fileRef);\n            return downloadURL; // Return the download URL\n        } catch (error) {\n            console.error(\"Error uploading file:\", error);\n            throw new Error(\"File upload failed\");\n        }\n    };\n    const sendMessage = async ()=>{\n        if (!message.trim() || isLoading) return;\n        const userMessage = {\n            role: \"user\",\n            content: message\n        };\n        setMessage(\"\");\n        setIsLoading(true);\n        setMessages((prevMessages)=>[\n                ...prevMessages,\n                userMessage\n            ]);\n        try {\n            const response = await fetch(\"/api/chats\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify([\n                    ...messages,\n                    userMessage\n                ])\n            });\n            if (!response.ok) throw new Error(\"Network response was not ok\");\n            const reader = response.body.getReader();\n            const decoder = new TextDecoder();\n            let result = \"\";\n            while(true){\n                const { done, value } = await reader.read();\n                if (done) break;\n                result += decoder.decode(value, {\n                    stream: true\n                });\n            }\n            setMessages((prevMessages)=>[\n                    ...prevMessages,\n                    {\n                        role: \"system\",\n                        content: result\n                    }\n                ]);\n        } catch (error) {\n            console.error(\"Error fetching data:\", error);\n        }\n        setIsLoading(false);\n    };\n    const handleGetWorkspace = async ()=>{\n        if (!userId) {\n            console.error(\"User is not authenticated.\");\n            return;\n        }\n        try {\n            const token = await authInstance.currentUser.getIdToken();\n            const response = await fetch(\"/api/getWorkspace\", {\n                method: \"GET\",\n                headers: {\n                    \"Content-Type\": \"application\",\n                    \"Authorization\": \"Bearer \".concat(token)\n                }\n            });\n            const workspaceData = await response.json();\n        } catch (e) {\n            console.error(\"Error fetching workspace:\", e);\n        }\n    };\n    const handleSaveWorkspace = async ()=>{\n        if (!userId) {\n            console.error(\"User is not authenticated.\");\n            return;\n        }\n        try {\n            const token = await authInstance.currentUser.getIdToken();\n            const fileUrls = await Promise.all(files.map((file)=>uploadFile(file)));\n            if (!workspaceTitle || messages.length === 0) {\n                throw new Error(\"Invalid workspace data\");\n            }\n            const workspaceData = {\n                title: workspaceTitle || \"Workspace \".concat(Date.now()),\n                messages: messages.map((message)=>({\n                        role: message.role,\n                        content: message.content\n                    })),\n                fileContent: fileUrls\n            };\n            const response = await fetch(\"/api/saveWorkspace\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\",\n                    \"Authorization\": \"Bearer \".concat(token)\n                },\n                body: JSON.stringify({\n                    data: workspaceData\n                })\n            });\n            if (!response.ok) {\n                const errorData = await response.json();\n                console.error(\"Error saving workspace:\", errorData);\n                throw new Error(\"Failed to save workspace: \".concat(JSON.stringify(errorData)));\n            }\n            const result = await response.json();\n            console.log(\"Workspace saved successfully\", result);\n        } catch (error) {\n            console.error(\"Error saving workspace:\", error);\n        }\n    };\n    // Function to handle file selection\n    const handleFileChange = (event)=>{\n        const allowedFileTypes = [\n            \"application/pdf\"\n        ];\n        const maxSize = 10 * 1024 * 1024; // 10 MB\n        const selectedFiles = Array.from(event.target.files);\n        selectedFiles.forEach((file)=>{\n            if (!allowedFileTypes.includes(file.type) || file.size > maxSize) {\n                console.error(\"File type \".concat(file.type, \" or size \").concat(file.size, \" is not allowed.\"));\n            }\n        });\n        setFiles(selectedFiles);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_2__.Card, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_scroll_area__WEBPACK_IMPORTED_MODULE_5__.ScrollArea, {\n                children: [\n                    messages.map((message, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: message.content || \"Start conversation...\"\n                            }, void 0, false, {\n                                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                                lineNumber: 185,\n                                columnNumber: 13\n                            }, this)\n                        }, index, false, {\n                            fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                            lineNumber: 184,\n                            columnNumber: 11\n                        }, this)),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        ref: messagesEndRef\n                    }, void 0, false, {\n                        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                        lineNumber: 188,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 182,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {\n                value: message,\n                onChange: (e)=>setMessage(e.target.value),\n                placeholder: \"Enter your message\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 190,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                onClick: sendMessage,\n                disabled: isLoading,\n                children: \"Send\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 195,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {\n                value: workspaceTitle,\n                onChange: (e)=>setWorkspaceTitle(e.target.value),\n                placeholder: \"Enter workspace title\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 198,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {\n                type: \"file\" // Change input type to file for uploading files\n                ,\n                onChange: handleFileChange,\n                multiple: true\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 203,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                onClick: handleSaveWorkspace,\n                children: \"Save Workspace\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 208,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                onClick: handleGetWorkspace,\n                children: \"Get Workspace\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 210,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n        lineNumber: 181,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"uyuGs3ojStq7H4EUQ6p5oXCuyFE=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9tYWluU2NyZWVuL2NoYXRQYWdlL3BhZ2UuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFb0Q7QUFDUjtBQUNFO0FBQ0U7QUFDUztBQUNHO0FBQzdCO0FBQ2lEO0FBRWpFLFNBQVNjOztJQUN0QixNQUFNLENBQUNDLFVBQVVDLFlBQVksR0FBR2hCLCtDQUFRQSxDQUFDO1FBQ3ZDO1lBQ0VpQixNQUFNO1lBQ05DLFNBQ0U7UUFDSjtLQUNEO0lBQ0QsTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUdwQiwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNLENBQUNxQixXQUFXQyxhQUFhLEdBQUd0QiwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNLENBQUN1QixRQUFRQyxVQUFVLEdBQUd4QiwrQ0FBUUEsQ0FBQztJQUNyQyxNQUFNLENBQUN5QixnQkFBZ0JDLGtCQUFrQixHQUFHMUIsK0NBQVFBLENBQUM7SUFDckQsTUFBTSxDQUFDMkIsT0FBT0MsU0FBUyxHQUFHNUIsK0NBQVFBLENBQUMsRUFBRSxHQUFHLDREQUE0RDtJQUNwRyxNQUFNNkIsZUFBZXRCLHNEQUFPQTtJQUM1QixNQUFNdUIsaUJBQWlCNUIsNkNBQU1BLENBQUM7SUFDOUIsTUFBTTZCLFVBQVVyQiw0REFBVUE7SUFFMUJULGdEQUFTQSxDQUFDO1lBQ1I2QjtTQUFBQSwwQkFBQUEsZUFBZUUsT0FBTyxjQUF0QkYsOENBQUFBLHdCQUF3QkcsY0FBYyxDQUFDO1lBQUVDLFVBQVU7UUFBUztJQUM5RCxHQUFHO1FBQUNuQjtLQUFTO0lBRWJkLGdEQUFTQSxDQUFDO1FBQ1IsTUFBTWtDLGNBQWMzQixpRUFBa0JBLENBQUNDLDJDQUFJQSxFQUFFLENBQUMyQjtZQUM1QyxJQUFJQSxNQUFNWixVQUFVWSxLQUFLQyxHQUFHO2lCQUN2QmIsVUFBVTtRQUNqQjtRQUNBLE9BQU8sSUFBTVc7SUFDZixHQUFHLEVBQUU7SUFFTCxNQUFNRyxhQUFhLE9BQU9DO1FBQ3hCLE1B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Q1g7SUFFQSxxQkFDRSw4REFBQ3pGLHFEQUFJQTs7MEJBQ0gsOERBQUNHLGtFQUFVQTs7b0JBQ1JTLFNBQVNnRSxHQUFHLENBQUMsQ0FBQzVELFNBQVNpRixzQkFDdEIsOERBQUNDO3NDQUNDLDRFQUFDQzswQ0FBR25GLFFBQVFELE9BQU8sSUFBSTs7Ozs7OzJCQURma0Y7Ozs7O2tDQUlaLDhEQUFDQzt3QkFBSTFGLEtBQUttQjs7Ozs7Ozs7Ozs7OzBCQUVaLDhEQUFDMUIsdURBQUtBO2dCQUNKNEQsT0FBTzdDO2dCQUNQb0YsVUFBVSxDQUFDN0IsSUFBTXRELFdBQVdzRCxFQUFFcUIsTUFBTSxDQUFDL0IsS0FBSztnQkFDMUN3QyxhQUFZOzs7Ozs7MEJBRWQsOERBQUNuRyx5REFBTUE7Z0JBQUNvRyxTQUFTM0Q7Z0JBQWE0RCxVQUFVckY7MEJBQVc7Ozs7OzswQkFHbkQsOERBQUNqQix1REFBS0E7Z0JBQ0o0RCxPQUFPdkM7Z0JBQ1A4RSxVQUFVLENBQUM3QixJQUFNaEQsa0JBQWtCZ0QsRUFBRXFCLE1BQU0sQ0FBQy9CLEtBQUs7Z0JBQ2pEd0MsYUFBWTs7Ozs7OzBCQUVkLDhEQUFDcEcsdURBQUtBO2dCQUNKOEYsTUFBSyxPQUFPLGdEQUFnRDs7Z0JBQzVESyxVQUFVZjtnQkFDVm1CLFFBQVE7Ozs7OzswQkFFViw4REFBQ3RHLHlEQUFNQTtnQkFBQ29HLFNBQVM5QjswQkFBcUI7Ozs7OzswQkFFdEMsOERBQUN0RSx5REFBTUE7Z0JBQUNvRyxTQUFTckM7MEJBQW9COzs7Ozs7Ozs7Ozs7QUFHM0M7R0F6TXdCdEQ7S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL21haW5TY3JlZW4vY2hhdFBhZ2UvcGFnZS5qc3g/MzNiNiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIjtcblxuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBDYXJkIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9jYXJkXCI7XG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvaW5wdXRcIjtcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJAL2NvbXBvbmVudHMvdWkvYnV0dG9uXCI7XG5pbXBvcnQgeyBTY3JvbGxBcmVhIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9zY3JvbGwtYXJlYVwiO1xuaW1wb3J0IHsgZ2V0QXV0aCwgb25BdXRoU3RhdGVDaGFuZ2VkIH0gZnJvbSBcImZpcmViYXNlL2F1dGhcIjtcbmltcG9ydCB7YXV0aH0gZnJvbSAnQC9maXJlYmFzZSdcbmltcG9ydCB7IGdldFN0b3JhZ2UsIHJlZiwgdXBsb2FkQnl0ZXMsIGdldERvd25sb2FkVVJMIH0gZnJvbSBcImZpcmViYXNlL3N0b3JhZ2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgW21lc3NhZ2VzLCBzZXRNZXNzYWdlc10gPSB1c2VTdGF0ZShbXG4gICAge1xuICAgICAgcm9sZTogXCJzeXN0ZW1cIixcbiAgICAgIGNvbnRlbnQ6XG4gICAgICAgIFwiV2VsY29tZSB0byB0aGUgQ29sbGVnZSBUdXRvciBDaGF0Ym90ISBIb3cgY2FuIEkgaGVscCB5b3UgdG9kYXk/XCIsXG4gICAgfSxcbiAgXSk7XG4gIGNvbnN0IFttZXNzYWdlLCBzZXRNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbdXNlcklkLCBzZXRVc2VySWRdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFt3b3Jrc3BhY2VUaXRsZSwgc2V0V29ya3NwYWNlVGl0bGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtmaWxlcywgc2V0RmlsZXNdID0gdXNlU3RhdGUoW10pOyAvLyBOZXcgc3RhdGUgZm9yIGZpbGUgdXBsb2FkcyA8LSBzdG9yZXMgaW4gYW4gYXJyYXkgb2YgZmlsZXNcbiAgY29uc3QgYXV0aEluc3RhbmNlID0gZ2V0QXV0aCgpO1xuICBjb25zdCBtZXNzYWdlc0VuZFJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3Qgc3RvcmFnZSA9IGdldFN0b3JhZ2UoKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG1lc3NhZ2VzRW5kUmVmLmN1cnJlbnQ/LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gIH0sIFttZXNzYWdlc10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSBvbkF1dGhTdGF0ZUNoYW5nZWQoYXV0aCwgKHVzZXIpID0+IHtcbiAgICAgIGlmICh1c2VyKSBzZXRVc2VySWQodXNlci51aWQpO1xuICAgICAgZWxzZSBzZXRVc2VySWQobnVsbCk7XG4gICAgfSk7XG4gICAgcmV0dXJuICgpID0+IHVuc3Vic2NyaWJlKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCB1cGxvYWRGaWxlID0gYXN5bmMgKGZpbGUpID0+IHtcbiAgICBjb25zdCBmaWxlUmVmID0gcmVmKHN0b3JhZ2UsIGB1cGxvYWRzLyR7ZmlsZS5uYW1lfWApOyAvLyBDcmVhdGUgYSByZWZlcmVuY2UgdG8gdGhlIGZpbGUgbG9jYXRpb25cblxuICAgIHRyeSB7XG4gICAgICAvLyBVcGxvYWQgdGhlIGZpbGVcbiAgICAgIGF3YWl0IHVwbG9hZEJ5dGVzKGZpbGVSZWYsIGZpbGUpO1xuXG4gICAgICAvLyBHZXQgdGhlIGRvd25sb2FkIFVSTFxuICAgICAgY29uc3QgZG93bmxvYWRVUkwgPSBhd2FpdCBnZXREb3dubG9hZFVSTChmaWxlUmVmKTtcbiAgICAgIHJldHVybiBkb3dubG9hZFVSTDsgLy8gUmV0dXJuIHRoZSBkb3dubG9hZCBVUkxcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHVwbG9hZGluZyBmaWxlOlwiLCBlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGaWxlIHVwbG9hZCBmYWlsZWRcIik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNlbmRNZXNzYWdlID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghbWVzc2FnZS50cmltKCkgfHwgaXNMb2FkaW5nKSByZXR1cm47XG4gICAgY29uc3QgdXNlck1lc3NhZ2UgPSB7IHJvbGU6IFwidXNlclwiLCBjb250ZW50OiBtZXNzYWdlIH07XG4gICAgc2V0TWVzc2FnZShcIlwiKTtcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgc2V0TWVzc2FnZXMoKHByZXZNZXNzYWdlcykgPT4gWy4uLnByZXZNZXNzYWdlcywgdXNlck1lc3NhZ2VdKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9jaGF0c1wiLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoWy4uLm1lc3NhZ2VzLCB1c2VyTWVzc2FnZV0pLFxuICAgICAgfSk7XG5cbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihcIk5ldHdvcmsgcmVzcG9uc2Ugd2FzIG5vdCBva1wiKTtcblxuICAgICAgY29uc3QgcmVhZGVyID0gcmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKTtcbiAgICAgIGNvbnN0IGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoKTtcbiAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCB7IGRvbmUsIHZhbHVlIH0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuICAgICAgICBpZiAoZG9uZSkgYnJlYWs7XG4gICAgICAgIHJlc3VsdCArPSBkZWNvZGVyLmRlY29kZSh2YWx1ZSwgeyBzdHJlYW06IHRydWUgfSk7XG4gICAgICB9XG5cbiAgICAgIHNldE1lc3NhZ2VzKChwcmV2TWVzc2FnZXMpID0+IFtcbiAgICAgICAgLi4ucHJldk1lc3NhZ2VzLFxuICAgICAgICB7IHJvbGU6IFwic3lzdGVtXCIsIGNvbnRlbnQ6IHJlc3VsdCB9LFxuICAgICAgXSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBkYXRhOlwiLCBlcnJvcik7XG4gICAgfVxuXG4gICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVHZXRXb3Jrc3BhY2UgPSBhc3luYyAoKSA9PiB7IFxuICAgIGlmKCF1c2VySWQpe1xuICAgICAgY29uc29sZS5lcnJvcihcIlVzZXIgaXMgbm90IGF1dGhlbnRpY2F0ZWQuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeXtcbiAgICAgIGNvbnN0IHRva2VuID0gYXdhaXQgYXV0aEluc3RhbmNlLmN1cnJlbnRVc2VyLmdldElkVG9rZW4oKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvYXBpL2dldFdvcmtzcGFjZVwiLCB7XG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb25cIixcbiAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgY29uc3Qgd29ya3NwYWNlRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBcblxuICB9Y2F0Y2goZSl7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHdvcmtzcGFjZTpcIiwgZSk7XG4gIH1cbn1cblxuICBjb25zdCBoYW5kbGVTYXZlV29ya3NwYWNlID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghdXNlcklkKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiVXNlciBpcyBub3QgYXV0aGVudGljYXRlZC5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICBcbiAgICB0cnkge1xuICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCBhdXRoSW5zdGFuY2UuY3VycmVudFVzZXIuZ2V0SWRUb2tlbigpO1xuICAgICAgY29uc3QgZmlsZVVybHMgPSBhd2FpdCBQcm9taXNlLmFsbChmaWxlcy5tYXAoKGZpbGUpID0+IHVwbG9hZEZpbGUoZmlsZSkpKTtcbiAgXG4gICAgICBpZiAoIXdvcmtzcGFjZVRpdGxlIHx8IG1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHdvcmtzcGFjZSBkYXRhXCIpO1xuICAgICAgfVxuICBcbiAgICAgIGNvbnN0IHdvcmtzcGFjZURhdGEgPSB7XG4gICAgICAgIHRpdGxlOiB3b3Jrc3BhY2VUaXRsZSB8fCBgV29ya3NwYWNlICR7RGF0ZS5ub3coKX1gLFxuICAgICAgICBtZXNzYWdlczogbWVzc2FnZXMubWFwKChtZXNzYWdlKSA9PiAoe1xuICAgICAgICAgIHJvbGU6IG1lc3NhZ2Uucm9sZSxcbiAgICAgICAgICBjb250ZW50OiBtZXNzYWdlLmNvbnRlbnQsXG4gICAgICAgIH0pKSxcbiAgICAgICAgZmlsZUNvbnRlbnQ6IGZpbGVVcmxzLFxuICAgICAgfTtcbiAgXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9zYXZlV29ya3NwYWNlXCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZGF0YTogd29ya3NwYWNlRGF0YSB9KSxcbiAgICAgIH0pO1xuICBcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgY29uc3QgZXJyb3JEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2F2aW5nIHdvcmtzcGFjZTpcIiwgZXJyb3JEYXRhKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gc2F2ZSB3b3Jrc3BhY2U6ICR7SlNPTi5zdHJpbmdpZnkoZXJyb3JEYXRhKX1gKTtcbiAgICAgIH1cbiAgXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBjb25zb2xlLmxvZyhcIldvcmtzcGFjZSBzYXZlZCBzdWNjZXNzZnVsbHlcIiwgcmVzdWx0KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNhdmluZyB3b3Jrc3BhY2U6XCIsIGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gRnVuY3Rpb24gdG8gaGFuZGxlIGZpbGUgc2VsZWN0aW9uXG4gIGNvbnN0IGhhbmRsZUZpbGVDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBhbGxvd2VkRmlsZVR5cGVzID0gW1wiYXBwbGljYXRpb24vcGRmXCJdO1xuICAgIGNvbnN0IG1heFNpemUgPSAxMCAqIDEwMjQgKiAxMDI0OyAvLyAxMCBNQlxuXG4gICAgY29uc3Qgc2VsZWN0ZWRGaWxlcyA9IEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LmZpbGVzKTtcblxuICAgIHNlbGVjdGVkRmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xuICAgICAgaWYgKCFhbGxvd2VkRmlsZVR5cGVzLmluY2x1ZGVzKGZpbGUudHlwZSkgfHwgZmlsZS5zaXplID4gbWF4U2l6ZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIGBGaWxlIHR5cGUgJHtmaWxlLnR5cGV9IG9yIHNpemUgJHtmaWxlLnNpemV9IGlzIG5vdCBhbGxvd2VkLmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBzZXRGaWxlcyhzZWxlY3RlZEZpbGVzKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxDYXJkPlxuICAgICAgPFNjcm9sbEFyZWE+XG4gICAgICAgIHttZXNzYWdlcy5tYXAoKG1lc3NhZ2UsIGluZGV4KSA9PiAoXG4gICAgICAgICAgPGRpdiBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgIDxwPnttZXNzYWdlLmNvbnRlbnQgfHwgXCJTdGFydCBjb252ZXJzYXRpb24uLi5cIn08L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgICA8ZGl2IHJlZj17bWVzc2FnZXNFbmRSZWZ9IC8+XG4gICAgICA8L1Njcm9sbEFyZWE+XG4gICAgICA8SW5wdXRcbiAgICAgICAgdmFsdWU9e21lc3NhZ2V9XG4gICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TWVzc2FnZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBtZXNzYWdlXCJcbiAgICAgIC8+XG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e3NlbmRNZXNzYWdlfSBkaXNhYmxlZD17aXNMb2FkaW5nfT5cbiAgICAgICAgU2VuZFxuICAgICAgPC9CdXR0b24+XG4gICAgICA8SW5wdXRcbiAgICAgICAgdmFsdWU9e3dvcmtzcGFjZVRpdGxlfVxuICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFdvcmtzcGFjZVRpdGxlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB3b3Jrc3BhY2UgdGl0bGVcIlxuICAgICAgLz5cbiAgICAgIDxJbnB1dFxuICAgICAgICB0eXBlPVwiZmlsZVwiIC8vIENoYW5nZSBpbnB1dCB0eXBlIHRvIGZpbGUgZm9yIHVwbG9hZGluZyBmaWxlc1xuICAgICAgICBvbkNoYW5nZT17aGFuZGxlRmlsZUNoYW5nZX1cbiAgICAgICAgbXVsdGlwbGUgLy8gQWxsb3cgbXVsdGlwbGUgZmlsZSB1cGxvYWRzXG4gICAgICAvPlxuICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVTYXZlV29ya3NwYWNlfT5TYXZlIFdvcmtzcGFjZTwvQnV0dG9uPlxuXG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUdldFdvcmtzcGFjZX0+R2V0IFdvcmtzcGFjZTwvQnV0dG9uPlxuICAgIDwvQ2FyZD5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsIkNhcmQiLCJJbnB1dCIsIkJ1dHRvbiIsIlNjcm9sbEFyZWEiLCJnZXRBdXRoIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwiYXV0aCIsImdldFN0b3JhZ2UiLCJyZWYiLCJ1cGxvYWRCeXRlcyIsImdldERvd25sb2FkVVJMIiwiSG9tZSIsIm1lc3NhZ2VzIiwic2V0TWVzc2FnZXMiLCJyb2xlIiwiY29udGVudCIsIm1lc3NhZ2UiLCJzZXRNZXNzYWdlIiwiaXNMb2FkaW5nIiwic2V0SXNMb2FkaW5nIiwidXNlcklkIiwic2V0VXNlcklkIiwid29ya3NwYWNlVGl0bGUiLCJzZXRXb3Jrc3BhY2VUaXRsZSIsImZpbGVzIiwic2V0RmlsZXMiLCJhdXRoSW5zdGFuY2UiLCJtZXNzYWdlc0VuZFJlZiIsInN0b3JhZ2UiLCJjdXJyZW50Iiwic2Nyb2xsSW50b1ZpZXciLCJiZWhhdmlvciIsInVuc3Vic2NyaWJlIiwidXNlciIsInVpZCIsInVwbG9hZEZpbGUiLCJmaWxlIiwiZmlsZVJlZiIsIm5hbWUiLCJkb3dubG9hZFVSTCIsImVycm9yIiwiY29uc29sZSIsIkVycm9yIiwic2VuZE1lc3NhZ2UiLCJ0cmltIiwidXNlck1lc3NhZ2UiLCJwcmV2TWVzc2FnZXMiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5Iiwib2siLCJyZWFkZXIiLCJnZXRSZWFkZXIiLCJkZWNvZGVyIiwiVGV4dERlY29kZXIiLCJyZXN1bHQiLCJkb25lIiwidmFsdWUiLCJyZWFkIiwiZGVjb2RlIiwic3RyZWFtIiwiaGFuZGxlR2V0V29ya3NwYWNlIiwidG9rZW4iLCJjdXJyZW50VXNlciIsImdldElkVG9rZW4iLCJ3b3Jrc3BhY2VEYXRhIiwianNvbiIsImUiLCJoYW5kbGVTYXZlV29ya3NwYWNlIiwiZmlsZVVybHMiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwibGVuZ3RoIiwidGl0bGUiLCJEYXRlIiwibm93IiwiZmlsZUNvbnRlbnQiLCJkYXRhIiwiZXJyb3JEYXRhIiwibG9nIiwiaGFuZGxlRmlsZUNoYW5nZSIsImV2ZW50IiwiYWxsb3dlZEZpbGVUeXBlcyIsIm1heFNpemUiLCJzZWxlY3RlZEZpbGVzIiwiQXJyYXkiLCJmcm9tIiwidGFyZ2V0IiwiZm9yRWFjaCIsImluY2x1ZGVzIiwidHlwZSIsInNpemUiLCJpbmRleCIsImRpdiIsInAiLCJvbkNoYW5nZSIsInBsYWNlaG9sZGVyIiwib25DbGljayIsImRpc2FibGVkIiwibXVsdGlwbGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/mainScreen/chatPage/page.jsx\n"));

/***/ })

});