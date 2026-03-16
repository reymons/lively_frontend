"use strict";
(self["webpackChunkonline_banking"] = self["webpackChunkonline_banking"] || []).push([[762],{

/***/ 2762
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ LoginPage)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2615);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-router@7.13.1_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs
var chunk_LFPYN7LY = __webpack_require__(8693);
// EXTERNAL MODULE: ./src/config/paths.ts
var paths = __webpack_require__(7750);
// EXTERNAL MODULE: ./src/comp/layout/page.tsx
var page = __webpack_require__(4301);
// EXTERNAL MODULE: ./src/comp/layout/auth-page-layout.tsx + 1 modules
var auth_page_layout = __webpack_require__(1176);
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
;// ./src/features/auth/comp/login-form.tsx
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
    username: index_esm/* string */.Yj().required().label("Username"),
    password: index_esm/* string */.Yj().required().label("Password")
});
function LoginForm({ onSuccess }) {
    const loginUser = (0,auth/* useLogin */.v)();
    const handleSubmit = (data)=>_async_to_generator(function*() {
            yield loginUser(data);
            onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
        })();
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(form_form/* Form */.l, {
            schema: schema,
            defaultValues: {
                username: "",
                password: ""
            },
            onSubmit: handleSubmit,
            children: ({ register, formState })=>/*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(input/* Input */.p, {
                            reg: register("username"),
                            label: "Username",
                            placeholder: "Enter your username here",
                            error: formState.errors.username,
                            autoComplete: "none"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(password_input/* PasswordInput */.y, {
                            reg: register("password"),
                            label: "Password",
                            placeholder: "Enter your password here",
                            error: formState.errors.password,
                            autoComplete: "current-password"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(form_error/* FormError */.j, {}),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(submit_button/* SubmitButton */.b, {
                            children: "Log in"
                        })
                    ]
                })
        })
    });
}

// EXTERNAL MODULE: ./src/stores/user.ts
var stores_user = __webpack_require__(6487);
;// ./src/app/pages/login.tsx







function LoginPage() {
    const { data: user } = (0,stores_user/* useUser */.J)(false);
    if (user) {
        return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_LFPYN7LY/* Navigate */.C5, {
            to: paths/* default */.A.stream.get(user.username)
        });
    }
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(page/* default */.A, {
        title: "Log in",
        description: "",
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(auth_page_layout/* default */.A, {
            heading: "Log in",
            hint: {
                text: "Don't have an account?",
                link: {
                    text: "Register",
                    href: paths/* default */.A.register.path
                }
            },
            form: /*#__PURE__*/ (0,jsx_runtime.jsx)(LoginForm, {})
        })
    });
}


/***/ }

}]);