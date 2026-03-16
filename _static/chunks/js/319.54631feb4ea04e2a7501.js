"use strict";
(self["webpackChunkonline_banking"] = self["webpackChunkonline_banking"] || []).push([[319],{

/***/ 5319
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ MainLayout)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2615);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-router@7.13.1_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs
var chunk_LFPYN7LY = __webpack_require__(8693);
// EXTERNAL MODULE: ./src/config/paths.ts
var paths = __webpack_require__(7750);
// EXTERNAL MODULE: ./node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js
var classnames = __webpack_require__(7500);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./src/stores/user.ts
var stores_user = __webpack_require__(6487);
;// ./src/comp/layout/main-layout.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const main_layout_module = ({"wrapper":"FCUrG","header":"ysM94","logo":"-L3EL","userProfile":"EFaIb"});
;// ./src/comp/layout/main-layout.tsx






function MainLayout() {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: main_layout_module.wrapper,
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("header", {
                className: classnames_default()(main_layout_module.header, "cnt"),
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_LFPYN7LY/* Link */.N_, {
                        className: main_layout_module.logo,
                        to: paths/* default */.A.home.path,
                        children: "LIVELY"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(UserProfile, {})
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_LFPYN7LY/* Outlet */.sv, {})
        ]
    });
}
function UserProfile() {
    const { data: user } = (0,stores_user/* useUser */.J)();
    if (!user) return null;
    const png = __webpack_require__(3934);
    const webp2x = __webpack_require__(8242);
    const avif2x = __webpack_require__(8127);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_LFPYN7LY/* Link */.N_, {
        to: paths/* default */.A.stream.get(user.username),
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
            className: main_layout_module.userProfile,
            children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("picture", {
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("source", {
                        srcSet: avif2x,
                        type: "image/avif"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("source", {
                        srcSet: webp2x,
                        type: "image/webp"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("img", {
                        srcSet: png,
                        width: 36,
                        height: 36,
                        alt: "user profile"
                    })
                ]
            })
        })
    });
}


/***/ },

/***/ 3934
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/avatar/10053731cdbf50c1fb45.png";

/***/ },

/***/ 8127
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/avatar/4127214063f8f1dd518d.avif";

/***/ },

/***/ 8242
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/avatar/dd942e1098429ff01ae6.webp";

/***/ }

}]);