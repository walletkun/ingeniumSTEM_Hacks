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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ui/card */ \"(app-pages-browser)/./components/ui/card.jsx\");\n/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/input */ \"(app-pages-browser)/./components/ui/input.jsx\");\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./components/ui/button.jsx\");\n/* harmony import */ var _components_ui_scroll_area__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/ui/scroll-area */ \"(app-pages-browser)/./components/ui/scroll-area.jsx\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase/auth */ \"(app-pages-browser)/./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/firebase */ \"(app-pages-browser)/./firebase.js\");\n/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! firebase/storage */ \"(app-pages-browser)/./node_modules/firebase/storage/dist/esm/index.esm.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\nfunction Home() {\n    _s();\n    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([\n        {\n            role: \"system\",\n            content: \"Welcome to the College Tutor Chatbot! How can I help you today?\"\n        }\n    ]);\n    const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [userId, setUserId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [workspace, setWorkspace] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [workspaceTitle, setWorkspaceTitle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [files, setFiles] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // New state for file uploads <- stores in an array of files\n    const [searchWorkspaceTitle, setSearchWorkspaceTitle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const authInstance = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_6__.getAuth)();\n    const messagesEndRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const storage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_8__.getStorage)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        var _messagesEndRef_current;\n        (_messagesEndRef_current = messagesEndRef.current) === null || _messagesEndRef_current === void 0 ? void 0 : _messagesEndRef_current.scrollIntoView({\n            behavior: \"smooth\"\n        });\n    }, [\n        messages\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_6__.onAuthStateChanged)(_firebase__WEBPACK_IMPORTED_MODULE_7__.auth, (user)=>{\n            if (user) setUserId(user.uid);\n            else setUserId(null);\n        });\n        return ()=>unsubscribe();\n    }, []);\n    const uploadFile = async (file)=>{\n        const fileRef = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_8__.ref)(storage, \"uploads/\".concat(file.name)); // Create a reference to the file location\n        try {\n            // Upload the file\n            await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_8__.uploadBytes)(fileRef, file);\n            // Get the download URL\n            const downloadURL = await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_8__.getDownloadURL)(fileRef);\n            return downloadURL; // Return the download URL\n        } catch (error) {\n            console.error(\"Error uploading file:\", error);\n            throw new Error(\"File upload failed\");\n        }\n    };\n    const sendMessage = async ()=>{\n        if (!message.trim() || isLoading) return;\n        const userMessage = {\n            role: \"user\",\n            content: message\n        };\n        setMessage(\"\");\n        setIsLoading(true);\n        setMessages((prevMessages)=>[\n                ...prevMessages,\n                userMessage\n            ]);\n        try {\n            const response = await fetch(\"/api/chats\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify([\n                    ...messages,\n                    userMessage\n                ])\n            });\n            if (!response.ok) throw new Error(\"Network response was not ok\");\n            const reader = response.body.getReader();\n            const decoder = new TextDecoder();\n            let result = \"\";\n            while(true){\n                const { done, value } = await reader.read();\n                if (done) break;\n                result += decoder.decode(value, {\n                    stream: true\n                });\n            }\n            setMessages((prevMessages)=>[\n                    ...prevMessages,\n                    {\n                        role: \"system\",\n                        content: result\n                    }\n                ]);\n        } catch (error) {\n            console.error(\"Error fetching data:\", error);\n        }\n        setIsLoading(false);\n    };\n    const handleGetWorkspace = async ()=>{\n        if (!userId) {\n            console.error(\"User is not authenticated.\");\n            return;\n        }\n        try {\n            const token = await authInstance.currentUser.getIdToken();\n            const workspace = await fetch(\"/api/getWorkspace\", {\n                method: \"GET\",\n                headers: {\n                    \"Content-Type\": \"application\",\n                    \"Authorization\": \"Bearer \".concat(token)\n                }\n            });\n            const workspaceData = await workspace.json();\n            setWorkspace(workspaceData);\n            if (workspaceData) {\n                setWorkspaceTitle(workspaceData.title);\n                setMessages(workspaceData.messages);\n                setFiles(workspaceData.fileContent.map((url)=>({\n                        name: url.split(\"/\").pop(),\n                        url\n                    })));\n            }\n        } catch (e) {\n            console.error(\"Error fetching workspace:\", e);\n        }\n    };\n    const handleSaveWorkspace = async ()=>{\n        if (!userId) {\n            console.error(\"User is not authenticated.\");\n            return;\n        }\n        try {\n            const token = await authInstance.currentUser.getIdToken();\n            const fileUrls = await Promise.all(files.map((file)=>uploadFile(file)));\n            if (!workspaceTitle || messages.length === 0) {\n                throw new Error(\"Invalid workspace data\");\n            }\n            const workspaceData = {\n                title: workspaceTitle || \"Workspace \".concat(Date.now()),\n                messages: messages.map((message)=>({\n                        role: message.role,\n                        content: message.content\n                    })),\n                fileContent: fileUrls\n            };\n            const response = await fetch(\"/api/saveWorkspace\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\",\n                    \"Authorization\": \"Bearer \".concat(token)\n                },\n                body: JSON.stringify({\n                    data: workspaceData\n                })\n            });\n            if (!response.ok) {\n                const errorData = await response.json();\n                console.error(\"Error saving workspace:\", errorData);\n                throw new Error(\"Failed to save workspace: \".concat(JSON.stringify(errorData)));\n            }\n            const result = await response.json();\n            console.log(\"Workspace saved successfully\", result);\n        } catch (error) {\n            console.error(\"Error saving workspace:\", error);\n        }\n    };\n    // Function to handle file selection\n    const handleFileChange = (event)=>{\n        const allowedFileTypes = [\n            \"application/pdf\"\n        ];\n        const maxSize = 10 * 1024 * 1024; // 10 MB\n        const selectedFiles = Array.from(event.target.files);\n        selectedFiles.forEach((file)=>{\n            if (!allowedFileTypes.includes(file.type) || file.size > maxSize) {\n                console.error(\"File type \".concat(file.type, \" or size \").concat(file.size, \" is not allowed.\"));\n            }\n        });\n        setFiles(selectedFiles);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_2__.Card, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_scroll_area__WEBPACK_IMPORTED_MODULE_5__.ScrollArea, {\n                children: [\n                    messages.map((message, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: message.content || \"Start conversation...\"\n                            }, void 0, false, {\n                                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                                lineNumber: 194,\n                                columnNumber: 13\n                            }, this)\n                        }, index, false, {\n                            fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                            lineNumber: 193,\n                            columnNumber: 11\n                        }, this)),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        ref: messagesEndRef\n                    }, void 0, false, {\n                        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                        lineNumber: 197,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 191,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {\n                value: message,\n                onChange: (e)=>setMessage(e.target.value),\n                placeholder: \"Enter your message\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 199,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                onClick: sendMessage,\n                disabled: isLoading,\n                children: \"Send\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 204,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {\n                value: workspaceTitle,\n                onChange: (e)=>setWorkspaceTitle(e.target.value),\n                placeholder: \"Enter workspace title\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 207,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {\n                type: \"file\" // Change input type to file for uploading files\n                ,\n                onChange: handleFileChange,\n                multiple: true\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 212,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                onClick: handleSaveWorkspace,\n                children: \"Save Workspace\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 217,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                onClick: handleGetWorkspace,\n                children: \"Get Workspace\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 219,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n        lineNumber: 190,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"PoMr5NWsoUtHburVJIUaHz4HqVU=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9tYWluU2NyZWVuL2NoYXRQYWdlL3BhZ2UuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFb0Q7QUFDUjtBQUNFO0FBQ0U7QUFDUztBQUNHO0FBQzdCO0FBQ2lEO0FBRWpFLFNBQVNjOztJQUN0QixNQUFNLENBQUNDLFVBQVVDLFlBQVksR0FBR2hCLCtDQUFRQSxDQUFDO1FBQ3ZDO1lBQ0VpQixNQUFNO1lBQ05DLFNBQ0U7UUFDSjtLQUNEO0lBQ0QsTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUdwQiwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNLENBQUNxQixXQUFXQyxhQUFhLEdBQUd0QiwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNLENBQUN1QixRQUFRQyxVQUFVLEdBQUd4QiwrQ0FBUUEsQ0FBQztJQUNyQyxNQUFNLENBQUN5QixXQUFXQyxhQUFhLEdBQUcxQiwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNLENBQUMyQixnQkFBZ0JDLGtCQUFrQixHQUFHNUIsK0NBQVFBLENBQUM7SUFDckQsTUFBTSxDQUFDNkIsT0FBT0MsU0FBUyxHQUFHOUIsK0NBQVFBLENBQUMsRUFBRSxHQUFHLDREQUE0RDtJQUNwRyxNQUFNLENBQUMrQixzQkFBc0JDLHdCQUF3QixHQUFHaEMsK0NBQVFBLENBQUM7SUFDakUsTUFBTWlDLGVBQWUxQixzREFBT0E7SUFDNUIsTUFBTTJCLGlCQUFpQmhDLDZDQUFNQSxDQUFDO0lBQzlCLE1BQU1pQyxVQUFVekIsNERBQVVBO0lBRTFCVCxnREFBU0EsQ0FBQztZQUNSaUM7U0FBQUEsMEJBQUFBLGVBQWVFLE9BQU8sY0FBdEJGLDhDQUFBQSx3QkFBd0JHLGNBQWMsQ0FBQztZQUFFQyxVQUFVO1FBQVM7SUFDOUQsR0FBRztRQUFDdkI7S0FBUztJQUViZCxnREFBU0EsQ0FBQztRQUNSLE1BQU1zQyxjQUFjL0IsaUVBQWtCQSxDQUFDQywyQ0FBSUEsRUFBRSxDQUFDK0I7WUFDNUMsSUFBSUEsTUFB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MkcsU0FBUzNCOzBCQUFxQjs7Ozs7OzBCQUV0Qyw4REFBQ2hGLHlEQUFNQTtnQkFBQzJHLFNBQVN4QzswQkFBb0I7Ozs7Ozs7Ozs7OztBQUczQztHQWxOd0IxRDtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvbWFpblNjcmVlbi9jaGF0UGFnZS9wYWdlLmpzeD8zM2I2Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IENhcmQgfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2NhcmRcIjtcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9pbnB1dFwiO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9idXR0b25cIjtcbmltcG9ydCB7IFNjcm9sbEFyZWEgfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL3Njcm9sbC1hcmVhXCI7XG5pbXBvcnQgeyBnZXRBdXRoLCBvbkF1dGhTdGF0ZUNoYW5nZWQgfSBmcm9tIFwiZmlyZWJhc2UvYXV0aFwiO1xuaW1wb3J0IHthdXRofSBmcm9tICdAL2ZpcmViYXNlJ1xuaW1wb3J0IHsgZ2V0U3RvcmFnZSwgcmVmLCB1cGxvYWRCeXRlcywgZ2V0RG93bmxvYWRVUkwgfSBmcm9tIFwiZmlyZWJhc2Uvc3RvcmFnZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICBjb25zdCBbbWVzc2FnZXMsIHNldE1lc3NhZ2VzXSA9IHVzZVN0YXRlKFtcbiAgICB7XG4gICAgICByb2xlOiBcInN5c3RlbVwiLFxuICAgICAgY29udGVudDpcbiAgICAgICAgXCJXZWxjb21lIHRvIHRoZSBDb2xsZWdlIFR1dG9yIENoYXRib3QhIEhvdyBjYW4gSSBoZWxwIHlvdSB0b2RheT9cIixcbiAgICB9LFxuICBdKTtcbiAgY29uc3QgW21lc3NhZ2UsIHNldE1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt1c2VySWQsIHNldFVzZXJJZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgY29uc3QgW3dvcmtzcGFjZSwgc2V0V29ya3NwYWNlXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbd29ya3NwYWNlVGl0bGUsIHNldFdvcmtzcGFjZVRpdGxlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZmlsZXMsIHNldEZpbGVzXSA9IHVzZVN0YXRlKFtdKTsgLy8gTmV3IHN0YXRlIGZvciBmaWxlIHVwbG9hZHMgPC0gc3RvcmVzIGluIGFuIGFycmF5IG9mIGZpbGVzXG4gIGNvbnN0IFtzZWFyY2hXb3Jrc3BhY2VUaXRsZSwgc2V0U2VhcmNoV29ya3NwYWNlVGl0bGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IGF1dGhJbnN0YW5jZSA9IGdldEF1dGgoKTtcbiAgY29uc3QgbWVzc2FnZXNFbmRSZWYgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IHN0b3JhZ2UgPSBnZXRTdG9yYWdlKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBtZXNzYWdlc0VuZFJlZi5jdXJyZW50Py5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xuICB9LCBbbWVzc2FnZXNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gb25BdXRoU3RhdGVDaGFuZ2VkKGF1dGgsICh1c2VyKSA9PiB7XG4gICAgICBpZiAodXNlcikgc2V0VXNlcklkKHVzZXIudWlkKTtcbiAgICAgIGVsc2Ugc2V0VXNlcklkKG51bGwpO1xuICAgIH0pO1xuICAgIHJldHVybiAoKSA9PiB1bnN1YnNjcmliZSgpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgdXBsb2FkRmlsZSA9IGFzeW5jIChmaWxlKSA9PiB7XG4gICAgY29uc3QgZmlsZVJlZiA9IHJlZihzdG9yYWdlLCBgdXBsb2Fkcy8ke2ZpbGUubmFtZX1gKTsgLy8gQ3JlYXRlIGEgcmVmZXJlbmNlIHRvIHRoZSBmaWxlIGxvY2F0aW9uXG5cbiAgICB0cnkge1xuICAgICAgLy8gVXBsb2FkIHRoZSBmaWxlXG4gICAgICBhd2FpdCB1cGxvYWRCeXRlcyhmaWxlUmVmLCBmaWxlKTtcblxuICAgICAgLy8gR2V0IHRoZSBkb3dubG9hZCBVUkxcbiAgICAgIGNvbnN0IGRvd25sb2FkVVJMID0gYXdhaXQgZ2V0RG93bmxvYWRVUkwoZmlsZVJlZik7XG4gICAgICByZXR1cm4gZG93bmxvYWRVUkw7IC8vIFJldHVybiB0aGUgZG93bmxvYWQgVVJMXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciB1cGxvYWRpbmcgZmlsZTpcIiwgZXJyb3IpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmlsZSB1cGxvYWQgZmFpbGVkXCIpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZW5kTWVzc2FnZSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIW1lc3NhZ2UudHJpbSgpIHx8IGlzTG9hZGluZykgcmV0dXJuO1xuICAgIGNvbnN0IHVzZXJNZXNzYWdlID0geyByb2xlOiBcInVzZXJcIiwgY29udGVudDogbWVzc2FnZSB9O1xuICAgIHNldE1lc3NhZ2UoXCJcIik7XG4gICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgIHNldE1lc3NhZ2VzKChwcmV2TWVzc2FnZXMpID0+IFsuLi5wcmV2TWVzc2FnZXMsIHVzZXJNZXNzYWdlXSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi9hcGkvY2hhdHNcIiwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KFsuLi5tZXNzYWdlcywgdXNlck1lc3NhZ2VdKSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoXCJOZXR3b3JrIHJlc3BvbnNlIHdhcyBub3Qgb2tcIik7XG5cbiAgICAgIGNvbnN0IHJlYWRlciA9IHJlc3BvbnNlLmJvZHkuZ2V0UmVhZGVyKCk7XG4gICAgICBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG4gICAgICBsZXQgcmVzdWx0ID0gXCJcIjtcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcbiAgICAgICAgaWYgKGRvbmUpIGJyZWFrO1xuICAgICAgICByZXN1bHQgKz0gZGVjb2Rlci5kZWNvZGUodmFsdWUsIHsgc3RyZWFtOiB0cnVlIH0pO1xuICAgICAgfVxuXG4gICAgICBzZXRNZXNzYWdlcygocHJldk1lc3NhZ2VzKSA9PiBbXG4gICAgICAgIC4uLnByZXZNZXNzYWdlcyxcbiAgICAgICAgeyByb2xlOiBcInN5c3RlbVwiLCBjb250ZW50OiByZXN1bHQgfSxcbiAgICAgIF0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGF0YTpcIiwgZXJyb3IpO1xuICAgIH1cblxuICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlR2V0V29ya3NwYWNlID0gYXN5bmMgKCkgPT4geyBcbiAgICBpZighdXNlcklkKXtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJVc2VyIGlzIG5vdCBhdXRoZW50aWNhdGVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnl7XG4gICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGF1dGhJbnN0YW5jZS5jdXJyZW50VXNlci5nZXRJZFRva2VuKCk7XG4gICAgICBjb25zdCB3b3Jrc3BhY2UgPSBhd2FpdCBmZXRjaChcIi9hcGkvZ2V0V29ya3NwYWNlXCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvblwiLFxuICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCB3b3Jrc3BhY2VEYXRhID0gYXdhaXQgd29ya3NwYWNlLmpzb24oKTtcbiAgICBzZXRXb3Jrc3BhY2Uod29ya3NwYWNlRGF0YSk7XG5cbiAgICBpZih3b3Jrc3BhY2VEYXRhKXtcbiAgICAgIHNldFdvcmtzcGFjZVRpdGxlKHdvcmtzcGFjZURhdGEudGl0bGUpO1xuICAgICAgc2V0TWVzc2FnZXMod29ya3NwYWNlRGF0YS5tZXNzYWdlcyk7XG4gICAgICBzZXRGaWxlcyh3b3Jrc3BhY2VEYXRhLmZpbGVDb250ZW50Lm1hcCh1cmwgPT4gKHtcbiAgICAgICAgbmFtZTogdXJsLnNwbGl0KCcvJykucG9wKCksXG4gICAgICAgIHVybCxcbiAgICAgIH0pKSk7XG4gICAgfVxuICB9Y2F0Y2goZSl7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHdvcmtzcGFjZTpcIiwgZSk7XG4gIH1cbn1cblxuICBjb25zdCBoYW5kbGVTYXZlV29ya3NwYWNlID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghdXNlcklkKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiVXNlciBpcyBub3QgYXV0aGVudGljYXRlZC5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICBcbiAgICB0cnkge1xuICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCBhdXRoSW5zdGFuY2UuY3VycmVudFVzZXIuZ2V0SWRUb2tlbigpO1xuICAgICAgY29uc3QgZmlsZVVybHMgPSBhd2FpdCBQcm9taXNlLmFsbChmaWxlcy5tYXAoKGZpbGUpID0+IHVwbG9hZEZpbGUoZmlsZSkpKTtcbiAgXG4gICAgICBpZiAoIXdvcmtzcGFjZVRpdGxlIHx8IG1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHdvcmtzcGFjZSBkYXRhXCIpO1xuICAgICAgfVxuICBcbiAgICAgIGNvbnN0IHdvcmtzcGFjZURhdGEgPSB7XG4gICAgICAgIHRpdGxlOiB3b3Jrc3BhY2VUaXRsZSB8fCBgV29ya3NwYWNlICR7RGF0ZS5ub3coKX1gLFxuICAgICAgICBtZXNzYWdlczogbWVzc2FnZXMubWFwKChtZXNzYWdlKSA9PiAoe1xuICAgICAgICAgIHJvbGU6IG1lc3NhZ2Uucm9sZSxcbiAgICAgICAgICBjb250ZW50OiBtZXNzYWdlLmNvbnRlbnQsXG4gICAgICAgIH0pKSxcbiAgICAgICAgZmlsZUNvbnRlbnQ6IGZpbGVVcmxzLFxuICAgICAgfTtcbiAgXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9zYXZlV29ya3NwYWNlXCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3Rva2VufWAsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZGF0YTogd29ya3NwYWNlRGF0YSB9KSxcbiAgICAgIH0pO1xuICBcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgY29uc3QgZXJyb3JEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igc2F2aW5nIHdvcmtzcGFjZTpcIiwgZXJyb3JEYXRhKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gc2F2ZSB3b3Jrc3BhY2U6ICR7SlNPTi5zdHJpbmdpZnkoZXJyb3JEYXRhKX1gKTtcbiAgICAgIH1cbiAgXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBjb25zb2xlLmxvZyhcIldvcmtzcGFjZSBzYXZlZCBzdWNjZXNzZnVsbHlcIiwgcmVzdWx0KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHNhdmluZyB3b3Jrc3BhY2U6XCIsIGVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gRnVuY3Rpb24gdG8gaGFuZGxlIGZpbGUgc2VsZWN0aW9uXG4gIGNvbnN0IGhhbmRsZUZpbGVDaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBhbGxvd2VkRmlsZVR5cGVzID0gW1wiYXBwbGljYXRpb24vcGRmXCJdO1xuICAgIGNvbnN0IG1heFNpemUgPSAxMCAqIDEwMjQgKiAxMDI0OyAvLyAxMCBNQlxuXG4gICAgY29uc3Qgc2VsZWN0ZWRGaWxlcyA9IEFycmF5LmZyb20oZXZlbnQudGFyZ2V0LmZpbGVzKTtcblxuICAgIHNlbGVjdGVkRmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xuICAgICAgaWYgKCFhbGxvd2VkRmlsZVR5cGVzLmluY2x1ZGVzKGZpbGUudHlwZSkgfHwgZmlsZS5zaXplID4gbWF4U2l6ZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIGBGaWxlIHR5cGUgJHtmaWxlLnR5cGV9IG9yIHNpemUgJHtmaWxlLnNpemV9IGlzIG5vdCBhbGxvd2VkLmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBzZXRGaWxlcyhzZWxlY3RlZEZpbGVzKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxDYXJkPlxuICAgICAgPFNjcm9sbEFyZWE+XG4gICAgICAgIHttZXNzYWdlcy5tYXAoKG1lc3NhZ2UsIGluZGV4KSA9PiAoXG4gICAgICAgICAgPGRpdiBrZXk9e2luZGV4fT5cbiAgICAgICAgICAgIDxwPnttZXNzYWdlLmNvbnRlbnQgfHwgXCJTdGFydCBjb252ZXJzYXRpb24uLi5cIn08L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgICA8ZGl2IHJlZj17bWVzc2FnZXNFbmRSZWZ9IC8+XG4gICAgICA8L1Njcm9sbEFyZWE+XG4gICAgICA8SW5wdXRcbiAgICAgICAgdmFsdWU9e21lc3NhZ2V9XG4gICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TWVzc2FnZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBtZXNzYWdlXCJcbiAgICAgIC8+XG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e3NlbmRNZXNzYWdlfSBkaXNhYmxlZD17aXNMb2FkaW5nfT5cbiAgICAgICAgU2VuZFxuICAgICAgPC9CdXR0b24+XG4gICAgICA8SW5wdXRcbiAgICAgICAgdmFsdWU9e3dvcmtzcGFjZVRpdGxlfVxuICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFdvcmtzcGFjZVRpdGxlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgcGxhY2Vob2xkZXI9XCJFbnRlciB3b3Jrc3BhY2UgdGl0bGVcIlxuICAgICAgLz5cbiAgICAgIDxJbnB1dFxuICAgICAgICB0eXBlPVwiZmlsZVwiIC8vIENoYW5nZSBpbnB1dCB0eXBlIHRvIGZpbGUgZm9yIHVwbG9hZGluZyBmaWxlc1xuICAgICAgICBvbkNoYW5nZT17aGFuZGxlRmlsZUNoYW5nZX1cbiAgICAgICAgbXVsdGlwbGUgLy8gQWxsb3cgbXVsdGlwbGUgZmlsZSB1cGxvYWRzXG4gICAgICAvPlxuICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVTYXZlV29ya3NwYWNlfT5TYXZlIFdvcmtzcGFjZTwvQnV0dG9uPlxuXG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e2hhbmRsZUdldFdvcmtzcGFjZX0+R2V0IFdvcmtzcGFjZTwvQnV0dG9uPlxuICAgIDwvQ2FyZD5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsIkNhcmQiLCJJbnB1dCIsIkJ1dHRvbiIsIlNjcm9sbEFyZWEiLCJnZXRBdXRoIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwiYXV0aCIsImdldFN0b3JhZ2UiLCJyZWYiLCJ1cGxvYWRCeXRlcyIsImdldERvd25sb2FkVVJMIiwiSG9tZSIsIm1lc3NhZ2VzIiwic2V0TWVzc2FnZXMiLCJyb2xlIiwiY29udGVudCIsIm1lc3NhZ2UiLCJzZXRNZXNzYWdlIiwiaXNMb2FkaW5nIiwic2V0SXNMb2FkaW5nIiwidXNlcklkIiwic2V0VXNlcklkIiwid29ya3NwYWNlIiwic2V0V29ya3NwYWNlIiwid29ya3NwYWNlVGl0bGUiLCJzZXRXb3Jrc3BhY2VUaXRsZSIsImZpbGVzIiwic2V0RmlsZXMiLCJzZWFyY2hXb3Jrc3BhY2VUaXRsZSIsInNldFNlYXJjaFdvcmtzcGFjZVRpdGxlIiwiYXV0aEluc3RhbmNlIiwibWVzc2FnZXNFbmRSZWYiLCJzdG9yYWdlIiwiY3VycmVudCIsInNjcm9sbEludG9WaWV3IiwiYmVoYXZpb3IiLCJ1bnN1YnNjcmliZSIsInVzZXIiLCJ1aWQiLCJ1cGxvYWRGaWxlIiwiZmlsZSIsImZpbGVSZWYiLCJuYW1lIiwiZG93bmxvYWRVUkwiLCJlcnJvciIsImNvbnNvbGUiLCJFcnJvciIsInNlbmRNZXNzYWdlIiwidHJpbSIsInVzZXJNZXNzYWdlIiwicHJldk1lc3NhZ2VzIiwicmVzcG9uc2UiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsIm9rIiwicmVhZGVyIiwiZ2V0UmVhZGVyIiwiZGVjb2RlciIsIlRleHREZWNvZGVyIiwicmVzdWx0IiwiZG9uZSIsInZhbHVlIiwicmVhZCIsImRlY29kZSIsInN0cmVhbSIsImhhbmRsZUdldFdvcmtzcGFjZSIsInRva2VuIiwiY3VycmVudFVzZXIiLCJnZXRJZFRva2VuIiwid29ya3NwYWNlRGF0YSIsImpzb24iLCJ0aXRsZSIsImZpbGVDb250ZW50IiwibWFwIiwidXJsIiwic3BsaXQiLCJwb3AiLCJlIiwiaGFuZGxlU2F2ZVdvcmtzcGFjZSIsImZpbGVVcmxzIiwiUHJvbWlzZSIsImFsbCIsImxlbmd0aCIsIkRhdGUiLCJub3ciLCJkYXRhIiwiZXJyb3JEYXRhIiwibG9nIiwiaGFuZGxlRmlsZUNoYW5nZSIsImV2ZW50IiwiYWxsb3dlZEZpbGVUeXBlcyIsIm1heFNpemUiLCJzZWxlY3RlZEZpbGVzIiwiQXJyYXkiLCJmcm9tIiwidGFyZ2V0IiwiZm9yRWFjaCIsImluY2x1ZGVzIiwidHlwZSIsInNpemUiLCJpbmRleCIsImRpdiIsInAiLCJvbkNoYW5nZSIsInBsYWNlaG9sZGVyIiwib25DbGljayIsImRpc2FibGVkIiwibXVsdGlwbGUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/mainScreen/chatPage/page.jsx\n"));

/***/ })

});