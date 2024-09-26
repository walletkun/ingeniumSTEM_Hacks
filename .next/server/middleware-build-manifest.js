self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
<<<<<<< HEAD
    "static/chunks/fallback/react-refresh.js"
=======
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [
    "static/chunks/webpack.js",
    "static/chunks/main-app.js"
>>>>>>> db65762eb1cf53364a44633d57cf798be538e8cc
  ],
  "ampDevFiles": [
    "static/chunks/fallback/webpack.js",
    "static/chunks/fallback/amp.js"
  ],
  "lowPriorityFiles": [],
  "rootMainFiles": [],
  "pages": {
    "/_app": [
<<<<<<< HEAD
      "static/chunks/fallback/webpack.js",
      "static/chunks/fallback/main.js",
      "static/chunks/fallback/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/fallback/webpack.js",
      "static/chunks/fallback/main.js",
      "static/chunks/fallback/pages/_error.js"
=======
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
>>>>>>> db65762eb1cf53364a44633d57cf798be538e8cc
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];