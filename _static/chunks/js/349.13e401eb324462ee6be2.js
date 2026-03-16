"use strict";
(self["webpackChunkonline_banking"] = self["webpackChunkonline_banking"] || []).push([[349],{

/***/ 349
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ HomePage)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2615);
// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/index.js
var react = __webpack_require__(9471);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-router@7.13.1_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs
var chunk_LFPYN7LY = __webpack_require__(8693);
// EXTERNAL MODULE: ./node_modules/.pnpm/yup@1.7.1/node_modules/yup/index.esm.js
var index_esm = __webpack_require__(8895);
// EXTERNAL MODULE: ./node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js
var classnames = __webpack_require__(7500);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./src/comp/ui/form/form.tsx + 1 modules
var form_form = __webpack_require__(8629);
// EXTERNAL MODULE: ./src/comp/ui/form/input.tsx + 3 modules
var input = __webpack_require__(9477);
// EXTERNAL MODULE: ./src/comp/ui/form/submit-button.tsx
var submit_button = __webpack_require__(2442);
// EXTERNAL MODULE: ./src/config/paths.ts
var paths = __webpack_require__(7750);
// EXTERNAL MODULE: ./src/comp/ui/button.tsx + 1 modules
var ui_button = __webpack_require__(5571);
// EXTERNAL MODULE: ./src/comp/ui/heading.tsx + 1 modules
var heading = __webpack_require__(310);
// EXTERNAL MODULE: ./src/comp/layout/page.tsx
var page = __webpack_require__(4301);
;// ./src/app/pages/home.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const home_module = ({"wrapper":"U6NRe","formWrapper":"ETfh3","btns":"TQUwd"});
;// ./src/app/pages/home.tsx
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}











function HomePage() {
    const [watchStream, setWatchStream] = (0,react.useState)(false);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(page/* default */.A, {
        title: "Home",
        description: "",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("main", {
            className: classnames_default()(home_module.wrapper, "cnt"),
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)(heading/* default */.A, {
                    withReturn: watchStream,
                    onReturn: ()=>setWatchStream(false),
                    children: watchStream ? "What is the streamer's name?" : "What would you like to do?"
                }),
                !watchStream && /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: home_module.btns,
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_button/* default */.A, {
                                onClick: ()=>setWatchStream(true),
                                children: "Watch a stream"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_button/* default */.A, {
                                asLink: true,
                                to: paths/* default */.A.login.path,
                                children: "Stream"
                            })
                        ]
                    })
                }),
                watchStream && /*#__PURE__*/ (0,jsx_runtime.jsx)(WatchStreamFlow, {})
            ]
        })
    });
}
function WatchStreamFlow() {
    const navigate = (0,chunk_LFPYN7LY/* useNavigate */.Zp)();
    const schema = index_esm/* object */.Ik({
        username: index_esm/* string */.Yj().required().label("Username")
    });
    const handleSubmit = (data)=>_async_to_generator(function*() {
            navigate(paths/* default */.A.stream.get(data.username));
        })();
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: home_module.formWrapper,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(form_form/* Form */.l, {
            schema: schema,
            defaultValues: {
                username: ""
            },
            onSubmit: handleSubmit,
            children: ({ register, formState })=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(input/* Input */.p, {
                            reg: register("username"),
                            label: "Username",
                            error: formState.errors.username,
                            placeholder: "Enter here",
                            autoComplete: "off"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(submit_button/* SubmitButton */.b, {
                            children: "Watch"
                        })
                    ]
                })
        })
    });
}


/***/ }

}]);