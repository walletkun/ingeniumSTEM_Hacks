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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_ui_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/ui/card */ \"(app-pages-browser)/./components/ui/card.jsx\");\n/* harmony import */ var _components_ui_input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/ui/input */ \"(app-pages-browser)/./components/ui/input.jsx\");\n/* harmony import */ var _components_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/ui/button */ \"(app-pages-browser)/./components/ui/button.jsx\");\n/* harmony import */ var _components_ui_scroll_area__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/ui/scroll-area */ \"(app-pages-browser)/./components/ui/scroll-area.jsx\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase/auth */ \"(app-pages-browser)/./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var _firebase__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/firebase */ \"(app-pages-browser)/./firebase.js\");\n/* harmony import */ var firebase_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! firebase/storage */ \"(app-pages-browser)/./node_modules/firebase/storage/dist/esm/index.esm.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\nfunction Home() {\n    _s();\n    const [messages, setMessages] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([\n        {\n            role: \"system\",\n            content: \"Welcome to the College Tutor Chatbot! How can I help you today?\"\n        }\n    ]);\n    const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [userId, setUserId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [workspace, setWorkspace] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [workspaceTitle, setWorkspaceTitle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [files, setFiles] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]); // New state for file uploads <- stores in an array of files\n    const authInstance = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_6__.getAuth)();\n    const messagesEndRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);\n    const storage = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_8__.getStorage)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        var _messagesEndRef_current;\n        (_messagesEndRef_current = messagesEndRef.current) === null || _messagesEndRef_current === void 0 ? void 0 : _messagesEndRef_current.scrollIntoView({\n            behavior: \"smooth\"\n        });\n    }, [\n        messages\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_6__.onAuthStateChanged)(_firebase__WEBPACK_IMPORTED_MODULE_7__.auth, (user)=>{\n            if (user) setUserId(user.uid);\n            else setUserId(null);\n        });\n        return ()=>unsubscribe();\n    }, []);\n    const uploadFile = async (file)=>{\n        const fileRef = (0,firebase_storage__WEBPACK_IMPORTED_MODULE_8__.ref)(storage, \"uploads/\".concat(file.name)); // Create a reference to the file location\n        try {\n            // Upload the file\n            await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_8__.uploadBytes)(fileRef, file);\n            // Get the download URL\n            const downloadURL = await (0,firebase_storage__WEBPACK_IMPORTED_MODULE_8__.getDownloadURL)(fileRef);\n            return downloadURL; // Return the download URL\n        } catch (error) {\n            console.error(\"Error uploading file:\", error);\n            throw new Error(\"File upload failed\");\n        }\n    };\n    const sendMessage = async ()=>{\n        if (!message.trim() || isLoading) return;\n        const userMessage = {\n            role: \"user\",\n            content: message\n        };\n        setMessage(\"\");\n        setIsLoading(true);\n        setMessages((prevMessages)=>[\n                ...prevMessages,\n                userMessage\n            ]);\n        try {\n            const response = await fetch(\"/api/chats\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify([\n                    ...messages,\n                    userMessage\n                ])\n            });\n            if (!response.ok) throw new Error(\"Network response was not ok\");\n            const reader = response.body.getReader();\n            const decoder = new TextDecoder();\n            let result = \"\";\n            while(true){\n                const { done, value } = await reader.read();\n                if (done) break;\n                result += decoder.decode(value, {\n                    stream: true\n                });\n            }\n            setMessages((prevMessages)=>[\n                    ...prevMessages,\n                    {\n                        role: \"system\",\n                        content: result\n                    }\n                ]);\n        } catch (error) {\n            console.error(\"Error fetching data:\", error);\n        }\n        setIsLoading(false);\n    };\n    const handleGetWorkspace = async ()=>{\n        if (!userId) {\n            console.error(\"User is not authenticated.\");\n            return;\n        }\n        try {\n            const token = await authInstance.currentUser.getIdToken();\n            const workspace = await fetch(\"/api/getWorkspace?title=\".concat(encodeURIComponent(workspaceTitle)), {\n                method: \"GET\",\n                headers: {\n                    \"Content-Type\": \"application\",\n                    Authorization: \"Bearer \".concat(token)\n                }\n            });\n            if (!workspace.ok) {\n                const errorData = await workspace.json();\n                throw new Error(\"HTTP error! status: \".concat(workspace.status, \", message: \").concat(errorData.message || \"Unknown error\"));\n            }\n            const workspaceData = await workspace.json();\n            setWorkspace(workspaceData);\n            if (workspaceData) {\n                setMessages(workspaceData.messages);\n                setFiles(workspaceData.fileContent.map((url)=>({\n                        name: url.split(\"/\").pop(),\n                        url\n                    })));\n            } else {\n                console.log(\"No workspace found\");\n                setWorkspace(null);\n            }\n        } catch (e) {\n            console.error(\"Error fetching workspace:\", e);\n            setWorkspace(null);\n        }\n    };\n    const handleSaveWorkspace = async ()=>{\n        if (!userId) {\n            console.error(\"User is not authenticated.\");\n            return;\n        }\n        try {\n            const token = await authInstance.currentUser.getIdToken();\n            const fileUrls = await Promise.all(files.map((file)=>uploadFile(file)));\n            if (!workspaceTitle || messages.length === 0) {\n                throw new Error(\"Invalid workspace data\");\n            }\n            const workspaceData = {\n                title: workspaceTitle || \"Workspace \".concat(Date.now()),\n                messages: messages.map((message)=>({\n                        role: message.role,\n                        content: message.content\n                    })),\n                fileContent: fileUrls\n            };\n            const response = await fetch(\"/api/saveWorkspace\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\",\n                    Authorization: \"Bearer \".concat(token)\n                },\n                body: JSON.stringify({\n                    data: workspaceData\n                })\n            });\n            if (!response.ok) {\n                const errorData = await response.json();\n                console.error(\"Error saving workspace:\", errorData);\n                throw new Error(\"Failed to save workspace: \".concat(JSON.stringify(errorData)));\n            }\n            const result = await response.json();\n            console.log(\"Workspace saved successfully\", result);\n        } catch (error) {\n            console.error(\"Error saving workspace:\", error);\n        }\n    };\n    // Function to handle file selection\n    const handleFileChange = (event)=>{\n        const allowedFileTypes = [\n            \"application/pdf\"\n        ];\n        const maxSize = 10 * 1024 * 1024; // 10 MB\n        const selectedFiles = Array.from(event.target.files);\n        selectedFiles.forEach((file)=>{\n            if (!allowedFileTypes.includes(file.type) || file.size > maxSize) {\n                console.error(\"File type \".concat(file.type, \" or size \").concat(file.size, \" is not allowed.\"));\n            }\n        });\n        setFiles(selectedFiles);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_card__WEBPACK_IMPORTED_MODULE_2__.Card, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_scroll_area__WEBPACK_IMPORTED_MODULE_5__.ScrollArea, {\n                children: [\n                    messages.map((message, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                children: message.content || \"Start conversation...\"\n                            }, void 0, false, {\n                                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                                lineNumber: 213,\n                                columnNumber: 13\n                            }, this)\n                        }, index, false, {\n                            fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                            lineNumber: 212,\n                            columnNumber: 11\n                        }, this)),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        ref: messagesEndRef\n                    }, void 0, false, {\n                        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                        lineNumber: 216,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 210,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {\n                value: message,\n                onChange: (e)=>setMessage(e.target.value),\n                placeholder: \"Type your message...\",\n                disabled: isLoading\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 218,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                onClick: sendMessage,\n                disabled: isLoading,\n                children: isLoading ? \"Sending...\" : \"Send\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 224,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_input__WEBPACK_IMPORTED_MODULE_3__.Input, {\n                value: workspaceTitle,\n                onChange: (e)=>setWorkspaceTitle(e.target.value),\n                placeholder: \"Search Workspace...\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 229,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                onClick: handleGetWorkspace,\n                children: \"Get Workspace\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 234,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ui_button__WEBPACK_IMPORTED_MODULE_4__.Button, {\n                onClick: handleSaveWorkspace,\n                children: \"Save Workspace\"\n            }, void 0, false, {\n                fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n                lineNumber: 237,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/ceo/Desktop/hackathon_2024/ai-tutor/app/mainScreen/chatPage/page.jsx\",\n        lineNumber: 209,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"zhBzNkOsobrLEc6OYWtIWoWCtX0=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9tYWluU2NyZWVuL2NoYXRQYWdlL3BhZ2UuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFb0Q7QUFDUjtBQUNFO0FBQ0U7QUFDUztBQUNHO0FBQzFCO0FBQzhDO0FBRWpFLFNBQVNjOztJQUN0QixNQUFNLENBQUNDLFVBQVVDLFlBQVksR0FBR2hCLCtDQUFRQSxDQUFDO1FBQ3ZDO1lBQ0VpQixNQUFNO1lBQ05DLFNBQ0U7UUFDSjtLQUNEO0lBQ0QsTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUdwQiwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNLENBQUNxQixXQUFXQyxhQUFhLEdBQUd0QiwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNLENBQUN1QixRQUFRQyxVQUFVLEdBQUd4QiwrQ0FBUUEsQ0FBQztJQUNyQyxNQUFNLENBQUN5QixXQUFXQyxhQUFhLEdBQUcxQiwrQ0FBUUEsQ0FBQztJQUMzQyxNQUFNLENBQUMyQixnQkFBZ0JDLGtCQUFrQixHQUFHNUIsK0NBQVFBLENBQUM7SUFDckQsTUFBTSxDQUFDNkIsT0FBT0MsU0FBUyxHQUFHOUIsK0NBQVFBLENBQUMsRUFBRSxHQUFHLDREQUE0RDtJQUNwRyxNQUFNK0IsZUFBZXhCLHNEQUFPQTtJQUM1QixNQUFNeUIsaUJBQWlCOUIsNkNBQU1BLENBQUM7SUFDOUIsTUFBTStCLFVBQVV2Qiw0REFBVUE7SUFFMUJULGdEQUFTQSxDQUFDO1lBQ1IrQjtTQUFBQSwwQkFBQUEsZUFBZUUsT0FBTyxjQUF0QkYsOENBQUFBLHdCQUF3QkcsY0FBYyxDQUFDO1lBQUVDLFVBQVU7UUFBUztJQUM5RCxHQUFHO1FBQUNyQjtLQUFTO0lBRWJkLGdEQUFTQSxDQUFDO1FBQ1IsTUFBTW9DLGNBQWM3QixpRUFBa0JBLENBQUNDLDJDQUFJQSxFQUFFLENBQUM2QjtZQUM1QyxJQUFJQSxNQUFNZCxVQUFVYyxLQUFLQyxHQUFHO2lCQUN2QmYsVUFBVTtRQUNqQjtRQUNBLE9BQU8sSUFBTWE7SUFDZixHQUFHLEVBQUU7SUFFTCxNQUFNRyxhQUFhLE9BQU9DO1FBQ3hCLE1BQU1DLFVBQVUvQixxREFBR0EsQ0FBQ3NCLFNBQVMsV0FBcUIsT0FBVlEsS0FBS0UsSUFBSSxJQUFLLDBDQUEwQztRQUVoRyxJQUFJO1lBQ0Ysa0JBQWtCO1lBQ2xCLE1BQU0vQiw2REFBV0EsQ0FBQzhCLFNBQVNEO1lBRTNCLHVCQUF1QjtZQUN2QixNQUFNRyxjQUFjLE1BQU0vQixnRUFBY0EsQ0FBQzZCO1lBQ3pDLE9BQU9FLGFBQWEsMEJBQTBCO1FBQ2hELEVBQUUsT0FBT0MsT0FBTztZQUNkQyxRQUFRRCxLQUFLLENBQUMseUJBQXlCQTtZQUN2QyxNQUFNLElBQUlFLE1BQU07UUFDbEI7SUFDRjtJQUVBLE1BQU1DLGNBQWM7UUFDbEIsSUFBSSxDQUFDN0IsUUFBUThCLElBQUksTUFBTTVCLFdBQVc7UUFDbEMsTUFBTTZCLGNBQWM7WUFBRWpDLE1BQU07WUFBUUMsU0FBU0M7UUFBUTtRQUNyREMsV0FBVztRQUNYRSxhQUFhO1FBQ2JOLFlBQVksQ0FBQ21DLGVBQWlCO21CQUFJQTtnQkFBY0Q7YUFBWTtRQUU1RCxJQUFJO1lBQ0YsTUFBTUUsV0FBVyxNQUFNQyxNQUFNLGNBQWM7Z0JBQ3pDQyxRQUFRO2dCQUNSQyxTQUFTO29CQUFFLGdCQUFnQjtnQkFBbUI7Z0JBQzlDQyxNQUFNQyxLQUFLQyxTQUFTLENBQUM7dUJBQUkzQztvQkFBVW1DO2lCQUFZO1lBQ2pEO1lBRUEsSUFBSSxDQUFDRSxTQUFTTyxFQUFFLEVBQUUsTUFBTSxJQUFJWixNQUFNO1lBRWxDLE1BQU1hLFNBQVNSLFNBQVNJLElBQUksQ0FBQ0ssU0FBUztZQUN0QyxNQUFNQyxVQUFVLElBQUlDO1lBQ3BCLElBQUlDLFNBQVM7WUFFYixNQUFPLEtBQU07Z0JBQ1gsTUFBTSxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRSxHQUFHLE1BQU1OLE9BQU9PLElBQUk7Z0JBQ3pDLElBQUlGLE1BQU07Z0JBQ1ZELFVBQVVGLFFBQVFNLE1BQU0sQ0FBQ0YsT0FBTztvQkFBRUcsUUFBUTtnQkFBSztZQUNqRDtZQUVBckQsWUFBWSxDQUFDbUMsZUFBaUI7dUJBQ3pCQTtvQkFDSDt3QkFBRWxDLE1BQU07d0JBQVVDLFNBQVM4QztvQkFBTztpQkFDbkM7UUFDSCxFQUFFLE9BQU9uQixPQUFPO1lBQ2RDLFFBQVFELEtBQUssQ0FBQyx3QkFBd0JBO1FBQ3hDO1FBRUF2QixhQUFhO0lBQ2Y7SUFFQSxNQUFNZ0QscUJBQXFCO1FBQ3pCLElBQUksQ0FBQy9DLFFBQVE7WUFDWHVCLFFBQVFELEtBQUssQ0FBQztZQUNkO1FBQ0Y7UUFFQSxJQUFJO1lBQ0YsTUFBTTBCLFFBQVEsTUFBTXhDLGFBQWF5QyxXQUFXLENBQUNDLFVBQVU7WUFDdkQsTUFBTWhELFlBQVksTUFBTTRCLE1BQ3RCLDJCQUE4RCxPQUFuQ3FCLG1CQUFtQi9DLGtCQUM5QztnQkFDRTJCLFFBQVE7Z0JBQ1JDLFNBQVM7b0JBQ1AsZ0JBQWdCO29CQUNoQm9CLGVBQWUsVUFBZ0IsT0FBTko7Z0JBQzNCO1lBQ0Y7WUFHRixJQUFJLENBQUM5QyxVQUFVa0MsRUFBRSxFQUFFO2dCQUNqQixNQUFNaUIsWUFBWSxNQUFNbkQsVUFBVW9ELElBQUk7Z0JBQ3RDLE1BQU0sSUFBSTlCLE1BQ1IsdUJBQ0U2QixPQURxQm5ELFVBQVVxRCxNQUFNLEVBQUMsZUFFdkMsT0FEQ0YsVUFBVXpELE9BQU8sSUFBSTtZQUczQjtZQUVBLE1BQU00RCxnQkFBZ0IsTUFBTXRELFVBQVVvRCxJQUFJO1lBQzFDbkQsYUFBYXFEO1lBRWIsSUFBSUEsZUFBZTtnQkFDakIvRCxZQUFZK0QsY0FBY2hFLFFBQVE7Z0JBQ2xDZSxTQUNFaUQsY0FBY0MsV0FBVyxDQUFDQyxHQUFHLENBQUMsQ0FBQ0MsTUFBUzt3QkFDdEN2QyxNQUFNdUMsSUFBSUMsS0FBSyxDQUFDLEtBQUtDLEdBQUc7d0JBQ3hCRjtvQkFDRjtZQUVKLE9BQU87Z0JBQ0xwQyxRQUFRdUMsR0FBRyxDQUFDO2dCQUNaM0QsYUFBYTtZQUNmO1FBQ0YsRUFBRSxPQUFPNEQsR0FBRztZQUNWeEMsUUFBUUQsS0FBSyxDQUFDLDZCQUE2QnlDO1lBQzNDNUQsYUFBYTtRQUNmO0lBQ0Y7SUFFQSxNQUFNNkQsc0JBQXNCO1FBQzFCLElBQUksQ0FBQ2hFLFFBQVE7WUFDWHVCLFFBQVFELEtBQUssQ0FBQztZQUNkO1FBQ0Y7UUFFQSxJQUFJO1lBQ0YsTUFBTTBCLFFBQVEsTUFBTXhDLGFBQWF5QyxXQUFXLENBQUNDLFVBQVU7WUFDdkQsTUFBTWUsV0FBVyxNQUFNQyxRQUFRQyxHQUFHLENBQUM3RCxNQUFNb0QsR0FBRyxDQUFDLENBQUN4QyxPQUFTRCxXQUFXQztZQUVsRSxJQUFJLENBQUNkLGtCQUFrQlosU0FBUzRFLE1BQU0sS0FBSyxHQUFHO2dCQUM1QyxNQUFNLElBQUk1QyxNQUFNO1lBQ2xCO1lBRUEsTUFBTWdDLGdCQUFnQjtnQkFDcEJhLE9BQU9qRSxrQkFBa0IsYUFBd0IsT0FBWGtFLEtBQUtDLEdBQUc7Z0JBQzlDL0UsVUFBVUEsU0FBU2tFLEdBQUcsQ0FBQyxDQUFDOUQsVUFBYTt3QkFDbkNGLE1BQU1FLFFBQVFGLElBQUk7d0JBQ2xCQyxTQUFTQyxRQUFRRCxPQUFPO29CQUMxQjtnQkFDQThELGFBQWFRO1lBQ2Y7WUFFQSxNQUFNcEMsV0FBVyxNQUFNQyxNQUFNLHNCQUFzQjtnQkFDakRDLFFBQVE7Z0JBQ1JDLFNBQVM7b0JBQ1AsZ0JBQWdCO29CQUNoQm9CLGVBQWUsVUFBZ0IsT0FBTko7Z0JBQzNCO2dCQUNBZixNQUFNQyxLQUFLQyxTQUFTLENBQUM7b0JBQUVxQyxNQUFNaEI7Z0JBQWM7WUFDN0M7WUFFQSxJQUFJLENBQUMzQixTQUFTTyxFQUFFLEVBQUU7Z0JBQ2hCLE1BQU1pQixZQUFZLE1BQU14QixTQUFTeUIsSUFBSTtnQkFDckMvQixRQUFRRCxLQUFLLENBQUMsMkJBQTJCK0I7Z0JBQ3pDLE1BQU0sSUFBSTdCLE1BQ1IsNkJBQXVELE9BQTFCVSxLQUFLQyxTQUFTLENBQUNrQjtZQUVoRDtZQUVBLE1BQU1aLFNBQVMsTUFBTVosU0FBU3lCLElBQUk7WUFDbEMvQixRQUFRdUMsR0FBRyxDQUFDLGdDQUFnQ3JCO1FBQzlDLEVBQUUsT0FBT25CLE9BQU87WUFDZEMsUUFBUUQsS0FBSyxDQUFDLDJCQUEyQkE7UUFDM0M7SUFDRjtJQUVBLG9DQUFvQztJQUNwQyxNQUFNbUQsbUJBQW1CLENBQUNDO1FBQ3hCLE1BQU1DLG1CQUFtQjtZQUFDO1NBQWtCO1FBQzVDLE1BQU1DLFVBQVUsS0FBSyxPQUFPLE1BQU0sUUFBUTtRQUUxQyxNQUFNQyxnQkFBZ0JDLE1BQU1DLElBQUksQ0FBQ0wsTUFBTU0sTUFBTSxDQUFDMUUsS0FBSztRQUVuRHVFLGNBQWNJLE9BQU8sQ0FBQyxDQUFDL0Q7WUFDckIsSUFBSSxDQUFDeUQsaUJBQWlCTyxRQUFRLENBQUNoRSxLQUFLaUUsSUFBSSxLQUFLakUsS0FBS2tFLElBQUksR0FBR1IsU0FBUztnQkFDaEVyRCxRQUFRRCxLQUFLLENBQ1gsYUFBa0NKLE9BQXJCQSxLQUFLaUUsSUFBSSxFQUFDLGFBQXFCLE9BQVZqRSxLQUFLa0UsSUFBSSxFQUFDO1lBRWhEO1FBQ0Y7UUFDQTdFLFNBQVNzRTtJQUNYO0lBRUEscUJBQ0UsOERBQUNqRyxxREFBSUE7OzBCQUNILDhEQUFDRyxrRUFBVUE7O29CQUNSUyxTQUFTa0UsR0FBRyxDQUFDLENBQUM5RCxTQUFTeUYsc0JBQ3RCLDhEQUFDQztzQ0FDQyw0RUFBQ0M7MENBQUczRixRQUFRRCxPQUFPLElBQUk7Ozs7OzsyQkFEZjBGOzs7OztrQ0FJWiw4REFBQ0M7d0JBQUlsRyxLQUFLcUI7Ozs7Ozs7Ozs7OzswQkFFWiw4REFBQzVCLHVEQUFLQTtnQkFDSjhELE9BQU8vQztnQkFDUDRGLFVBQVUsQ0FBQ3pCLElBQU1sRSxXQUFXa0UsRUFBRWlCLE1BQU0sQ0FBQ3JDLEtBQUs7Z0JBQzFDOEMsYUFBWTtnQkFDWkMsVUFBVTVGOzs7Ozs7MEJBRVosOERBQUNoQix5REFBTUE7Z0JBQUM2RyxTQUFTbEU7Z0JBQWFpRSxVQUFVNUY7MEJBQ3JDQSxZQUFZLGVBQWU7Ozs7OzswQkFJOUIsOERBQUNqQix1REFBS0E7Z0JBQ0o4RCxPQUFPdkM7Z0JBQ1BvRixVQUFVLENBQUN6QixJQUFNMUQsa0JBQWtCMEQsRUFBRWlCLE1BQU0sQ0FBQ3JDLEtBQUs7Z0JBQ2pEOEMsYUFBWTs7Ozs7OzBCQUVkLDhEQUFDM0cseURBQU1BO2dCQUFDNkcsU0FBUzVDOzBCQUFvQjs7Ozs7OzBCQUdyQyw4REFBQ2pFLHlEQUFNQTtnQkFBQzZHLFNBQVMzQjswQkFBcUI7Ozs7Ozs7Ozs7OztBQUc1QztHQXBPd0J6RTtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvbWFpblNjcmVlbi9jaGF0UGFnZS9wYWdlLmpzeD8zM2I2Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuXG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IENhcmQgfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL2NhcmRcIjtcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9pbnB1dFwiO1xuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcIkAvY29tcG9uZW50cy91aS9idXR0b25cIjtcbmltcG9ydCB7IFNjcm9sbEFyZWEgfSBmcm9tIFwiQC9jb21wb25lbnRzL3VpL3Njcm9sbC1hcmVhXCI7XG5pbXBvcnQgeyBnZXRBdXRoLCBvbkF1dGhTdGF0ZUNoYW5nZWQgfSBmcm9tIFwiZmlyZWJhc2UvYXV0aFwiO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gXCJAL2ZpcmViYXNlXCI7XG5pbXBvcnQgeyBnZXRTdG9yYWdlLCByZWYsIHVwbG9hZEJ5dGVzLCBnZXREb3dubG9hZFVSTCB9IGZyb20gXCJmaXJlYmFzZS9zdG9yYWdlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIGNvbnN0IFttZXNzYWdlcywgc2V0TWVzc2FnZXNdID0gdXNlU3RhdGUoW1xuICAgIHtcbiAgICAgIHJvbGU6IFwic3lzdGVtXCIsXG4gICAgICBjb250ZW50OlxuICAgICAgICBcIldlbGNvbWUgdG8gdGhlIENvbGxlZ2UgVHV0b3IgQ2hhdGJvdCEgSG93IGNhbiBJIGhlbHAgeW91IHRvZGF5P1wiLFxuICAgIH0sXG4gIF0pO1xuICBjb25zdCBbbWVzc2FnZSwgc2V0TWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3VzZXJJZCwgc2V0VXNlcklkXSA9IHVzZVN0YXRlKG51bGwpO1xuICBjb25zdCBbd29ya3NwYWNlLCBzZXRXb3Jrc3BhY2VdID0gdXNlU3RhdGUobnVsbCk7XG4gIGNvbnN0IFt3b3Jrc3BhY2VUaXRsZSwgc2V0V29ya3NwYWNlVGl0bGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtmaWxlcywgc2V0RmlsZXNdID0gdXNlU3RhdGUoW10pOyAvLyBOZXcgc3RhdGUgZm9yIGZpbGUgdXBsb2FkcyA8LSBzdG9yZXMgaW4gYW4gYXJyYXkgb2YgZmlsZXNcbiAgY29uc3QgYXV0aEluc3RhbmNlID0gZ2V0QXV0aCgpO1xuICBjb25zdCBtZXNzYWdlc0VuZFJlZiA9IHVzZVJlZihudWxsKTtcbiAgY29uc3Qgc3RvcmFnZSA9IGdldFN0b3JhZ2UoKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG1lc3NhZ2VzRW5kUmVmLmN1cnJlbnQ/LnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIgfSk7XG4gIH0sIFttZXNzYWdlc10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSBvbkF1dGhTdGF0ZUNoYW5nZWQoYXV0aCwgKHVzZXIpID0+IHtcbiAgICAgIGlmICh1c2VyKSBzZXRVc2VySWQodXNlci51aWQpO1xuICAgICAgZWxzZSBzZXRVc2VySWQobnVsbCk7XG4gICAgfSk7XG4gICAgcmV0dXJuICgpID0+IHVuc3Vic2NyaWJlKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCB1cGxvYWRGaWxlID0gYXN5bmMgKGZpbGUpID0+IHtcbiAgICBjb25zdCBmaWxlUmVmID0gcmVmKHN0b3JhZ2UsIGB1cGxvYWRzLyR7ZmlsZS5uYW1lfWApOyAvLyBDcmVhdGUgYSByZWZlcmVuY2UgdG8gdGhlIGZpbGUgbG9jYXRpb25cblxuICAgIHRyeSB7XG4gICAgICAvLyBVcGxvYWQgdGhlIGZpbGVcbiAgICAgIGF3YWl0IHVwbG9hZEJ5dGVzKGZpbGVSZWYsIGZpbGUpO1xuXG4gICAgICAvLyBHZXQgdGhlIGRvd25sb2FkIFVSTFxuICAgICAgY29uc3QgZG93bmxvYWRVUkwgPSBhd2FpdCBnZXREb3dubG9hZFVSTChmaWxlUmVmKTtcbiAgICAgIHJldHVybiBkb3dubG9hZFVSTDsgLy8gUmV0dXJuIHRoZSBkb3dubG9hZCBVUkxcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIHVwbG9hZGluZyBmaWxlOlwiLCBlcnJvcik7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGaWxlIHVwbG9hZCBmYWlsZWRcIik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHNlbmRNZXNzYWdlID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghbWVzc2FnZS50cmltKCkgfHwgaXNMb2FkaW5nKSByZXR1cm47XG4gICAgY29uc3QgdXNlck1lc3NhZ2UgPSB7IHJvbGU6IFwidXNlclwiLCBjb250ZW50OiBtZXNzYWdlIH07XG4gICAgc2V0TWVzc2FnZShcIlwiKTtcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgc2V0TWVzc2FnZXMoKHByZXZNZXNzYWdlcykgPT4gWy4uLnByZXZNZXNzYWdlcywgdXNlck1lc3NhZ2VdKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9jaGF0c1wiLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoWy4uLm1lc3NhZ2VzLCB1c2VyTWVzc2FnZV0pLFxuICAgICAgfSk7XG5cbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihcIk5ldHdvcmsgcmVzcG9uc2Ugd2FzIG5vdCBva1wiKTtcblxuICAgICAgY29uc3QgcmVhZGVyID0gcmVzcG9uc2UuYm9keS5nZXRSZWFkZXIoKTtcbiAgICAgIGNvbnN0IGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoKTtcbiAgICAgIGxldCByZXN1bHQgPSBcIlwiO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCB7IGRvbmUsIHZhbHVlIH0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuICAgICAgICBpZiAoZG9uZSkgYnJlYWs7XG4gICAgICAgIHJlc3VsdCArPSBkZWNvZGVyLmRlY29kZSh2YWx1ZSwgeyBzdHJlYW06IHRydWUgfSk7XG4gICAgICB9XG5cbiAgICAgIHNldE1lc3NhZ2VzKChwcmV2TWVzc2FnZXMpID0+IFtcbiAgICAgICAgLi4ucHJldk1lc3NhZ2VzLFxuICAgICAgICB7IHJvbGU6IFwic3lzdGVtXCIsIGNvbnRlbnQ6IHJlc3VsdCB9LFxuICAgICAgXSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBkYXRhOlwiLCBlcnJvcik7XG4gICAgfVxuXG4gICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVHZXRXb3Jrc3BhY2UgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCF1c2VySWQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJVc2VyIGlzIG5vdCBhdXRoZW50aWNhdGVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCBhdXRoSW5zdGFuY2UuY3VycmVudFVzZXIuZ2V0SWRUb2tlbigpO1xuICAgICAgY29uc3Qgd29ya3NwYWNlID0gYXdhaXQgZmV0Y2goXG4gICAgICAgIGAvYXBpL2dldFdvcmtzcGFjZT90aXRsZT0ke2VuY29kZVVSSUNvbXBvbmVudCh3b3Jrc3BhY2VUaXRsZSl9YCxcbiAgICAgICAge1xuICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uXCIsXG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7dG9rZW59YCxcbiAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICBpZiAoIXdvcmtzcGFjZS5vaykge1xuICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCB3b3Jrc3BhY2UuanNvbigpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYEhUVFAgZXJyb3IhIHN0YXR1czogJHt3b3Jrc3BhY2Uuc3RhdHVzfSwgbWVzc2FnZTogJHtcbiAgICAgICAgICAgIGVycm9yRGF0YS5tZXNzYWdlIHx8IFwiVW5rbm93biBlcnJvclwiXG4gICAgICAgICAgfWBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgd29ya3NwYWNlRGF0YSA9IGF3YWl0IHdvcmtzcGFjZS5qc29uKCk7XG4gICAgICBzZXRXb3Jrc3BhY2Uod29ya3NwYWNlRGF0YSk7XG5cbiAgICAgIGlmICh3b3Jrc3BhY2VEYXRhKSB7XG4gICAgICAgIHNldE1lc3NhZ2VzKHdvcmtzcGFjZURhdGEubWVzc2FnZXMpO1xuICAgICAgICBzZXRGaWxlcyhcbiAgICAgICAgICB3b3Jrc3BhY2VEYXRhLmZpbGVDb250ZW50Lm1hcCgodXJsKSA9PiAoe1xuICAgICAgICAgICAgbmFtZTogdXJsLnNwbGl0KFwiL1wiKS5wb3AoKSxcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICB9KSlcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gd29ya3NwYWNlIGZvdW5kXCIpO1xuICAgICAgICBzZXRXb3Jrc3BhY2UobnVsbCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIHdvcmtzcGFjZTpcIiwgZSk7XG4gICAgICBzZXRXb3Jrc3BhY2UobnVsbCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNhdmVXb3Jrc3BhY2UgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCF1c2VySWQpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJVc2VyIGlzIG5vdCBhdXRoZW50aWNhdGVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdG9rZW4gPSBhd2FpdCBhdXRoSW5zdGFuY2UuY3VycmVudFVzZXIuZ2V0SWRUb2tlbigpO1xuICAgICAgY29uc3QgZmlsZVVybHMgPSBhd2FpdCBQcm9taXNlLmFsbChmaWxlcy5tYXAoKGZpbGUpID0+IHVwbG9hZEZpbGUoZmlsZSkpKTtcblxuICAgICAgaWYgKCF3b3Jrc3BhY2VUaXRsZSB8fCBtZXNzYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB3b3Jrc3BhY2UgZGF0YVwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgd29ya3NwYWNlRGF0YSA9IHtcbiAgICAgICAgdGl0bGU6IHdvcmtzcGFjZVRpdGxlIHx8IGBXb3Jrc3BhY2UgJHtEYXRlLm5vdygpfWAsXG4gICAgICAgIG1lc3NhZ2VzOiBtZXNzYWdlcy5tYXAoKG1lc3NhZ2UpID0+ICh7XG4gICAgICAgICAgcm9sZTogbWVzc2FnZS5yb2xlLFxuICAgICAgICAgIGNvbnRlbnQ6IG1lc3NhZ2UuY29udGVudCxcbiAgICAgICAgfSkpLFxuICAgICAgICBmaWxlQ29udGVudDogZmlsZVVybHMsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9zYXZlV29ya3NwYWNlXCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHt0b2tlbn1gLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGRhdGE6IHdvcmtzcGFjZURhdGEgfSksXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzYXZpbmcgd29ya3NwYWNlOlwiLCBlcnJvckRhdGEpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYEZhaWxlZCB0byBzYXZlIHdvcmtzcGFjZTogJHtKU09OLnN0cmluZ2lmeShlcnJvckRhdGEpfWBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgY29uc29sZS5sb2coXCJXb3Jrc3BhY2Ugc2F2ZWQgc3VjY2Vzc2Z1bGx5XCIsIHJlc3VsdCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBzYXZpbmcgd29ya3NwYWNlOlwiLCBlcnJvcik7XG4gICAgfVxuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIHRvIGhhbmRsZSBmaWxlIHNlbGVjdGlvblxuICBjb25zdCBoYW5kbGVGaWxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgYWxsb3dlZEZpbGVUeXBlcyA9IFtcImFwcGxpY2F0aW9uL3BkZlwiXTtcbiAgICBjb25zdCBtYXhTaXplID0gMTAgKiAxMDI0ICogMTAyNDsgLy8gMTAgTUJcblxuICAgIGNvbnN0IHNlbGVjdGVkRmlsZXMgPSBBcnJheS5mcm9tKGV2ZW50LnRhcmdldC5maWxlcyk7XG5cbiAgICBzZWxlY3RlZEZpbGVzLmZvckVhY2goKGZpbGUpID0+IHtcbiAgICAgIGlmICghYWxsb3dlZEZpbGVUeXBlcy5pbmNsdWRlcyhmaWxlLnR5cGUpIHx8IGZpbGUuc2l6ZSA+IG1heFNpemUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBgRmlsZSB0eXBlICR7ZmlsZS50eXBlfSBvciBzaXplICR7ZmlsZS5zaXplfSBpcyBub3QgYWxsb3dlZC5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgc2V0RmlsZXMoc2VsZWN0ZWRGaWxlcyk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8Q2FyZD5cbiAgICAgIDxTY3JvbGxBcmVhPlxuICAgICAgICB7bWVzc2FnZXMubWFwKChtZXNzYWdlLCBpbmRleCkgPT4gKFxuICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0+XG4gICAgICAgICAgICA8cD57bWVzc2FnZS5jb250ZW50IHx8IFwiU3RhcnQgY29udmVyc2F0aW9uLi4uXCJ9PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgICAgPGRpdiByZWY9e21lc3NhZ2VzRW5kUmVmfSAvPlxuICAgICAgPC9TY3JvbGxBcmVhPlxuICAgICAgPElucHV0XG4gICAgICAgIHZhbHVlPXttZXNzYWdlfVxuICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE1lc3NhZ2UoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICBwbGFjZWhvbGRlcj1cIlR5cGUgeW91ciBtZXNzYWdlLi4uXCJcbiAgICAgICAgZGlzYWJsZWQ9e2lzTG9hZGluZ31cbiAgICAgIC8+XG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e3NlbmRNZXNzYWdlfSBkaXNhYmxlZD17aXNMb2FkaW5nfT5cbiAgICAgICAge2lzTG9hZGluZyA/IFwiU2VuZGluZy4uLlwiIDogXCJTZW5kXCJ9XG4gICAgICA8L0J1dHRvbj5cblxuICAgICAgey8qIFNlYXJjaCBmb3IgV29ya3NwYWNlICovfVxuICAgICAgPElucHV0XG4gICAgICAgIHZhbHVlPXt3b3Jrc3BhY2VUaXRsZX1cbiAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRXb3Jrc3BhY2VUaXRsZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIFdvcmtzcGFjZS4uLlwiXG4gICAgICAvPlxuICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVHZXRXb3Jrc3BhY2V9PkdldCBXb3Jrc3BhY2U8L0J1dHRvbj5cblxuICAgICAgey8qIFNhdmUgV29ya3NwYWNlICovfVxuICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtoYW5kbGVTYXZlV29ya3NwYWNlfT5TYXZlIFdvcmtzcGFjZTwvQnV0dG9uPlxuICAgIDwvQ2FyZD5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsIkNhcmQiLCJJbnB1dCIsIkJ1dHRvbiIsIlNjcm9sbEFyZWEiLCJnZXRBdXRoIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwiYXV0aCIsImdldFN0b3JhZ2UiLCJyZWYiLCJ1cGxvYWRCeXRlcyIsImdldERvd25sb2FkVVJMIiwiSG9tZSIsIm1lc3NhZ2VzIiwic2V0TWVzc2FnZXMiLCJyb2xlIiwiY29udGVudCIsIm1lc3NhZ2UiLCJzZXRNZXNzYWdlIiwiaXNMb2FkaW5nIiwic2V0SXNMb2FkaW5nIiwidXNlcklkIiwic2V0VXNlcklkIiwid29ya3NwYWNlIiwic2V0V29ya3NwYWNlIiwid29ya3NwYWNlVGl0bGUiLCJzZXRXb3Jrc3BhY2VUaXRsZSIsImZpbGVzIiwic2V0RmlsZXMiLCJhdXRoSW5zdGFuY2UiLCJtZXNzYWdlc0VuZFJlZiIsInN0b3JhZ2UiLCJjdXJyZW50Iiwic2Nyb2xsSW50b1ZpZXciLCJiZWhhdmlvciIsInVuc3Vic2NyaWJlIiwidXNlciIsInVpZCIsInVwbG9hZEZpbGUiLCJmaWxlIiwiZmlsZVJlZiIsIm5hbWUiLCJkb3dubG9hZFVSTCIsImVycm9yIiwiY29uc29sZSIsIkVycm9yIiwic2VuZE1lc3NhZ2UiLCJ0cmltIiwidXNlck1lc3NhZ2UiLCJwcmV2TWVzc2FnZXMiLCJyZXNwb25zZSIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5Iiwib2siLCJyZWFkZXIiLCJnZXRSZWFkZXIiLCJkZWNvZGVyIiwiVGV4dERlY29kZXIiLCJyZXN1bHQiLCJkb25lIiwidmFsdWUiLCJyZWFkIiwiZGVjb2RlIiwic3RyZWFtIiwiaGFuZGxlR2V0V29ya3NwYWNlIiwidG9rZW4iLCJjdXJyZW50VXNlciIsImdldElkVG9rZW4iLCJlbmNvZGVVUklDb21wb25lbnQiLCJBdXRob3JpemF0aW9uIiwiZXJyb3JEYXRhIiwianNvbiIsInN0YXR1cyIsIndvcmtzcGFjZURhdGEiLCJmaWxlQ29udGVudCIsIm1hcCIsInVybCIsInNwbGl0IiwicG9wIiwibG9nIiwiZSIsImhhbmRsZVNhdmVXb3Jrc3BhY2UiLCJmaWxlVXJscyIsIlByb21pc2UiLCJhbGwiLCJsZW5ndGgiLCJ0aXRsZSIsIkRhdGUiLCJub3ciLCJkYXRhIiwiaGFuZGxlRmlsZUNoYW5nZSIsImV2ZW50IiwiYWxsb3dlZEZpbGVUeXBlcyIsIm1heFNpemUiLCJzZWxlY3RlZEZpbGVzIiwiQXJyYXkiLCJmcm9tIiwidGFyZ2V0IiwiZm9yRWFjaCIsImluY2x1ZGVzIiwidHlwZSIsInNpemUiLCJpbmRleCIsImRpdiIsInAiLCJvbkNoYW5nZSIsInBsYWNlaG9sZGVyIiwiZGlzYWJsZWQiLCJvbkNsaWNrIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/mainScreen/chatPage/page.jsx\n"));

/***/ })

});