"use strict";
(self["webpackChunkonline_banking"] = self["webpackChunkonline_banking"] || []).push([[751],{

/***/ 1751
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RegisterPage)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2615);
// EXTERNAL MODULE: ./src/config/paths.ts
var paths = __webpack_require__(7750);
// EXTERNAL MODULE: ./node_modules/.pnpm/yup@1.7.1/node_modules/yup/index.esm.js
var index_esm = __webpack_require__(8895);
// EXTERNAL MODULE: ./src/comp/ui/form/form.tsx + 1 modules
var form_form = __webpack_require__(8629);
// EXTERNAL MODULE: ./src/comp/ui/form/input.tsx + 3 modules
var input = __webpack_require__(9477);
// EXTERNAL MODULE: ./src/comp/ui/form/derived/password-input.tsx + 2 modules
var password_input = __webpack_require__(8486);
// EXTERNAL MODULE: ./src/comp/ui/form/form-error.tsx + 1 modules
var form_error = __webpack_require__(3641);
// EXTERNAL MODULE: ./src/comp/ui/form/submit-button.tsx
var submit_button = __webpack_require__(2442);
// EXTERNAL MODULE: ./src/features/auth/api/auth.ts + 1 modules
var auth = __webpack_require__(4164);
;// ./src/features/auth/comp/register-form.tsx
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




const schema = index_esm/* object */.Ik({
    username: index_esm/* string */.Yj().required().min(6).max(40).label("Username"),
    password: index_esm/* string */.Yj().required().min(6).max(100).label("Password"),
    cpassword: index_esm/* string */.Yj().required().oneOf([
        index_esm/* ref */.KR("password")
    ], "Passwords do not match").label("Confirm password")
});
function RegisterForm({ onSuccess }) {
    const registerUser = (0,auth/* useRegister */.L)();
    const handleSubmit = (data)=>_async_to_generator(function*() {
            yield registerUser(data);
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
        })();
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(form_form/* Form */.l, {
            schema: schema,
            defaultValues: {
                username: "",
                password: "",
                cpassword: ""
            },
            onSubmit: handleSubmit,
            children: ({ register, formState })=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(input/* Input */.p, {
                            reg: register("username"),
                            label: "Username",
                            placeholder: "Enter your username here",
                            error: formState.errors.username,
                            autoComplete: "off"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(password_input/* PasswordInput */.y, {
                            reg: register("password"),
                            label: "Password",
                            placeholder: "Enter your password here",
                            error: formState.errors.password,
                            autoComplete: "off"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(password_input/* PasswordInput */.y, {
                            reg: register("cpassword"),
                            label: "Confirm password",
                            placeholder: "Enter your password here again",
                            autoComplete: "off",
                            error: formState.errors.cpassword
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(form_error/* FormError */.j, {}),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(submit_button/* SubmitButton */.b, {
                            children: "Register"
                        })
                    ]
                })
        })
    });
}

// EXTERNAL MODULE: ./src/stores/stream-key.ts
var stream_key = __webpack_require__(8914);
// EXTERNAL MODULE: ./src/stores/user.ts
var stores_user = __webpack_require__(6487);
// EXTERNAL MODULE: ./src/config/env.ts
var env = __webpack_require__(581);
// EXTERNAL MODULE: ./src/comp/layout/page.tsx
var page = __webpack_require__(4301);
// EXTERNAL MODULE: ./src/comp/layout/auth-page-layout.tsx + 1 modules
var auth_page_layout = __webpack_require__(1176);
// EXTERNAL MODULE: ./src/comp/ui/button.tsx + 1 modules
var ui_button = __webpack_require__(5571);
// EXTERNAL MODULE: ./src/comp/ui/secret-display.tsx + 4 modules
var secret_display = __webpack_require__(4858);
;// ./src/app/pages/register.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const register_module = ({"usernameInfo":"AGpxN","streamBtn":"LXeip"});
;// ./src/app/pages/register.tsx











function RegisterPage() {
    var _ref;
    const { data: user } = (0,stores_user/* useUser */.J)(false);
    const { data: streamKey } = (0,stream_key/* useStreamKey */.p)(false);
    const registered = !!user;
    const sk = (_ref = streamKey === null || streamKey === void 0 ? void 0 : streamKey.stream_key) !== null && _ref !== void 0 ? _ref : "";
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(page/* default */.A, {
        title: "Register",
        description: "",
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(auth_page_layout/* default */.A, {
            heading: registered ? "Stream set-up" : "Create an account",
            form: registered ? null : /*#__PURE__*/ (0,jsx_runtime.jsx)(RegisterForm, {}),
            hint: {
                text: "Already have an account?",
                link: {
                    text: "Log in",
                    href: paths/* default */.A.login.path
                }
            },
            children: registered && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: register_module.usernameInfo,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                        className: "fsm-sm",
                        children: "Specify the provided URL in your streaming application. After that, you can start streaming. Do not share this URL with anybody"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(secret_display/* default */.A, {
                        base: env/* RTMP_BASE_URL */.WY,
                        secret: sk,
                        visibleStart: 6,
                        visibleEnd: 5
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_button/* default */.A, {
                        className: register_module.streamBtn,
                        asLink: true,
                        to: paths/* default */.A.stream.get(user === null || user === void 0 ? void 0 : user.username),
                        children: "Go to my stream"
                    })
                ]
            })
        })
    });
}


/***/ }

}]);