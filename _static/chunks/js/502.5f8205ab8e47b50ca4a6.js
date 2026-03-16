"use strict";
(self["webpackChunkonline_banking"] = self["webpackChunkonline_banking"] || []).push([[502],{

/***/ 5380
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ getCurrentStreamKey)
/* harmony export */ });
/* harmony import */ var _lib_client_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4639);
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

function getCurrentStreamKey() {
    return _async_to_generator(function*() {
        return _lib_client_http__WEBPACK_IMPORTED_MODULE_0__/* .clientV1 */ .r.get("/stream-keys/current");
    })();
}


/***/ },

/***/ 1176
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ AuthPageLayout)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2615);
// EXTERNAL MODULE: ./node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js
var classnames = __webpack_require__(7500);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-router@7.13.1_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs
var chunk_LFPYN7LY = __webpack_require__(8693);
// EXTERNAL MODULE: ./src/comp/ui/heading.tsx + 1 modules
var ui_heading = __webpack_require__(310);
;// ./src/comp/layout/auth-page-layout.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const auth_page_layout_module = ({"wrapper":"vG40i","formWrapper":"A9CdM","hint":"Wfi7V"});
;// ./src/comp/layout/auth-page-layout.tsx





function AuthPageLayout({ children, heading, hint, form }) {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("main", {
        className: classnames_default()(auth_page_layout_module.wrapper, "cnt"),
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)(ui_heading/* default */.A, {
                children: heading
            }),
            !!form && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: auth_page_layout_module.formWrapper,
                children: [
                    form,
                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: auth_page_layout_module.hint,
                        children: [
                            hint.text,
                            " ",
                            /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_LFPYN7LY/* Link */.N_, {
                                to: hint.link.href,
                                children: hint.link.text
                            })
                        ]
                    })
                ]
            }),
            children
        ]
    });
}


/***/ },

/***/ 4301
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Page)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2615);

// Page container
// Use it to wrap your pages to provide some meta info
function Page({ children, title, description }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("title", {
                children: `Lively | ${title}`
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meta", {
                name: "description",
                content: description
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meta", {
                property: "og:title",
                content: title
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("meta", {
                property: "og:description",
                content: description
            }),
            children
        ]
    });
}


/***/ },

/***/ 5571
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ Button)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2615);
// EXTERNAL MODULE: ./node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js
var classnames = __webpack_require__(7500);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-router@7.13.1_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs
var chunk_LFPYN7LY = __webpack_require__(8693);
// EXTERNAL MODULE: ./src/comp/ui/preloader.tsx
var preloader = __webpack_require__(536);
;// ./src/comp/ui/button.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const button_module = ({"button":"IZafq","stretch":"evY0B"});
;// ./src/comp/ui/button.tsx
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = {}, sourceKeys, key, i;
    if (typeof Reflect !== "undefined" && Reflect.ownKeys) {
        sourceKeys = Reflect.ownKeys(Object(source));
        for(i = 0; i < sourceKeys.length; i++){
            key = sourceKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
        return target;
    }
    target = _object_without_properties_loose(source, excluded);
    if (Object.getOwnPropertySymbols) {
        sourceKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceKeys.length; i++){
            key = sourceKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {}, sourceKeys = Object.getOwnPropertyNames(source), key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
    }
    return target;
}





// These props are used when extending from the Button component
// type ExtProps = Omit<ButtonProps, "beforeEnd">;
function Button(_0) {
    let { children, kind = "primary", size = "md", loading, beforeEnd, stretch, asLink, type, className } = _0, rest = _object_without_properties(_0, [
        "children",
        "kind",
        "size",
        "loading",
        "beforeEnd",
        "stretch",
        "asLink",
        "type",
        "className"
    ]);
    const Element = asLink ? chunk_LFPYN7LY/* Link */.N_ : "button";
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(Element, _object_spread_props(_object_spread({
        className: classnames_default()(className, button_module.button, stretch && button_module.stretch),
        "data-kind": kind,
        "data-size": size,
        "aria-busy": loading,
        type: asLink ? type : type !== null && type !== void 0 ? type : "button"
    }, rest), {
        children: loading ? /*#__PURE__*/ (0,jsx_runtime.jsx)(preloader/* default */.A, {}) : /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
                children,
                beforeEnd
            ]
        })
    }));
}


/***/ },

/***/ 2794
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ FlatIcon)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2615);
;// ./src/comp/ui/flat-icon.scss
// extracted by mini-css-extract-plugin

;// ./src/comp/ui/flat-icon.tsx
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}


function FlatIcon({ type, color, style }) {
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("svg", {
        className: "flat-icon",
        style: _object_spread({}, style, color ? {
            "--color-flat-icon": color
        } : undefined),
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("use", {
            href: `${__webpack_require__(418)}#${type}`
        })
    });
}


/***/ },

/***/ 8486
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  y: () => (/* binding */ PasswordInput)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2615);
// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/index.js
var react = __webpack_require__(9471);
// EXTERNAL MODULE: ./node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js
var classnames = __webpack_require__(7500);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
;// ./src/lib/css.ts
function px2rem(px, base = 16) {
    return px / base;
}

// EXTERNAL MODULE: ./src/comp/ui/flat-icon.tsx + 1 modules
var flat_icon = __webpack_require__(2794);
// EXTERNAL MODULE: ./src/comp/ui/form/input.tsx + 3 modules
var input = __webpack_require__(9477);
;// ./src/comp/ui/form/derived/password-input.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const password_input_module = ({"recoverBtn":"d6VeP"});
;// ./src/comp/ui/form/derived/password-input.tsx
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = {}, sourceKeys, key, i;
    if (typeof Reflect !== "undefined" && Reflect.ownKeys) {
        sourceKeys = Reflect.ownKeys(Object(source));
        for(i = 0; i < sourceKeys.length; i++){
            key = sourceKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
        return target;
    }
    target = _object_without_properties_loose(source, excluded);
    if (Object.getOwnPropertySymbols) {
        sourceKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceKeys.length; i++){
            key = sourceKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {}, sourceKeys = Object.getOwnPropertyNames(source), key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
    }
    return target;
}







const PasswordInput = (_0)=>{
    let { side, pr } = _0, rest = _object_without_properties(_0, [
        "side",
        "pr"
    ]);
    const [visible, setVisible] = (0,react.useState)(false);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(input/* Input */.p.WithSideContent, _object_spread_props(_object_spread({}, rest), {
        pr: pr !== null && pr !== void 0 ? pr : `${px2rem(54)}rem`,
        type: visible ? "text" : "password",
        side: /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
            children: [
                side,
                /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                    className: "icon-btn",
                    type: "button",
                    "aria-pressed": visible,
                    "aria-label": visible ? "Hide password" : "Show password",
                    onClick: ()=>setVisible((f)=>!f),
                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(flat_icon/* default */.A, {
                        type: visible ? "lock-unlocked" : "lock"
                    })
                })
            ]
        })
    }));
};
const WithRecover = (_0)=>{
    let { onRecover } = _0, rest = _object_without_properties(_0, [
        "onRecover"
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(PasswordInput, _object_spread_props(_object_spread({}, rest), {
        pr: `${px2rem(120)}rem`,
        side: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                    className: "text-hint",
                    children: "|"
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                    className: classnames_default()("inline-clickable", password_input_module.recoverBtn),
                    type: "button",
                    onClick: onRecover,
                    "aria-label": "Recover password",
                    children: "Forgot?"
                })
            ]
        })
    }));
};
WithRecover.displayName = "PasswordInput.WithRecover";
PasswordInput.WithRecover = WithRecover;


/***/ },

/***/ 3641
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  j: () => (/* binding */ FormError)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2615);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-hook-form@7.71.2_react@19.2.4/node_modules/react-hook-form/dist/index.esm.mjs
var index_esm = __webpack_require__(2218);
// EXTERNAL MODULE: ./node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js
var classnames = __webpack_require__(7500);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
;// ./src/comp/ui/form/form-error.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const form_error_module = ({"error":"eOBsO"});
;// ./src/comp/ui/form/form-error.tsx




const FormError = ()=>{
    const { errors } = (0,index_esm/* useFormState */.lN)();
    return errors.root ? /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: classnames_default()(form_error_module.error, "fsm-sm"),
        children: errors.root.message
    }) : null;
};


/***/ },

/***/ 8629
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  l: () => (/* binding */ Form)
});

// UNUSED EXPORTS: DEFAULT_ERROR_MESSAGE

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2615);
// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/index.js
var react = __webpack_require__(9471);
// EXTERNAL MODULE: ./node_modules/.pnpm/@hookform+resolvers@5.2.2_react-hook-form@7.71.2_react@19.2.4_/node_modules/@hookform/resolvers/yup/dist/yup.mjs + 1 modules
var yup = __webpack_require__(8702);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-hook-form@7.71.2_react@19.2.4/node_modules/react-hook-form/dist/index.esm.mjs
var index_esm = __webpack_require__(2218);
;// ./src/comp/ui/form/form.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const form_module = ({"form":"YqHad"});
;// ./src/comp/ui/form/form.tsx
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
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}





const DEFAULT_ERROR_MESSAGE = "Something went wrong";
const Form = ({ defaultValues, schema, onSubmit, children, options })=>{
    const formRef = (0,react.useRef)(null);
    const form = (0,index_esm/* useForm */.mN)(_object_spread({
        defaultValues,
        resolver: (0,yup/* yupResolver */.t)(schema)
    }, options));
    const handleSubmit = (data)=>_async_to_generator(function*() {
            try {
                yield onSubmit(data);
            } catch (err) {
                form.setError("root", {
                    message: err instanceof Error ? err.message : DEFAULT_ERROR_MESSAGE
                });
            }
        })();
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(index_esm/* FormProvider */.Op, _object_spread_props(_object_spread({}, form), {
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)("form", {
            className: form_module.form,
            onSubmit: form.handleSubmit(handleSubmit),
            ref: formRef,
            children: children(_object_spread_props(_object_spread({}, form), {
                formRef
            }))
        })
    }));
};


/***/ },

/***/ 9477
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  p: () => (/* binding */ Input)
});

// UNUSED EXPORTS: InputRaw

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2615);
// EXTERNAL MODULE: ./node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js
var classnames = __webpack_require__(7500);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/index.js
var react = __webpack_require__(9471);
;// ./src/comp/ui/form/form-field.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const form_field_module = ({"label":"z-cxY","error":"tMUu4"});
;// ./src/comp/ui/form/form-field.tsx



const FormField = ({ label, labelId, children, error })=>{
    const hasError = !!error;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                className: classnames_default()(form_field_module.label, hasError && form_field_module.error),
                id: labelId,
                "aria-live": "polite",
                children: hasError ? error.message : label
            }),
            children
        ]
    });
};

;// ./src/comp/ui/form/input.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const input_module = ({"wrapper":"_5OHgl","error":"G7cKd","sideContent":"BBIVB"});
;// ./src/comp/ui/form/input.tsx
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = {}, sourceKeys, key, i;
    if (typeof Reflect !== "undefined" && Reflect.ownKeys) {
        sourceKeys = Reflect.ownKeys(Object(source));
        for(i = 0; i < sourceKeys.length; i++){
            key = sourceKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
        return target;
    }
    target = _object_without_properties_loose(source, excluded);
    if (Object.getOwnPropertySymbols) {
        sourceKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceKeys.length; i++){
            key = sourceKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {}, sourceKeys = Object.getOwnPropertyNames(source), key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
    }
    return target;
}





const InputRaw = (_0)=>{
    let { type, autoComplete, placeholder, beforeEnd, invalid, reg, style } = _0, rest = _object_without_properties(_0, [
        "type",
        "autoComplete",
        "placeholder",
        "beforeEnd",
        "invalid",
        "reg",
        "style"
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: classnames_default()(input_module.wrapper, invalid && input_module.error),
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("input", _object_spread({
                style: style,
                type: type,
                placeholder: placeholder,
                "aria-invalid": invalid,
                autoComplete: autoComplete
            }, rest, reg)),
            beforeEnd
        ]
    });
};
const Input = (_0)=>{
    let { error, label } = _0, rest = _object_without_properties(_0, [
        "error",
        "label"
    ]);
    const labelId = (0,react.useId)();
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(FormField, {
        error: error,
        label: label,
        labelId: labelId,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(InputRaw, _object_spread_props(_object_spread({}, rest), {
            "aria-labelledby": labelId,
            invalid: !!error
        }))
    });
};
const WithSideContent = (_0)=>{
    let { pr, style, side } = _0, rest = _object_without_properties(_0, [
        "pr",
        "style",
        "side"
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(Input, _object_spread_props(_object_spread({}, rest), {
        style: _object_spread_props(_object_spread({}, style), {
            paddingRight: pr
        }),
        beforeEnd: /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
            className: input_module.sideContent,
            children: side
        })
    }));
};
WithSideContent.displayName = "Input.WithSideContent";
Input.WithSideContent = WithSideContent;


/***/ },

/***/ 2442
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ SubmitButton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2615);
/* harmony import */ var _ui_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5571);
/* harmony import */ var react_hook_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2218);
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}



const SubmitButton = (props)=>{
    const { formState } = (0,react_hook_form__WEBPACK_IMPORTED_MODULE_2__/* .useFormContext */ .xW)();
    const { isSubmitting, isSubmitSuccessful } = formState;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_ui_button__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A, _object_spread_props(_object_spread({
        stretch: true
    }, props), {
        loading: isSubmitting,
        disabled: isSubmitSuccessful,
        type: "submit"
    }));
};


/***/ },

/***/ 310
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ Heading)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2615);
// EXTERNAL MODULE: ./src/comp/ui/flat-icon.tsx + 1 modules
var flat_icon = __webpack_require__(2794);
;// ./src/comp/ui/heading.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const heading_module = ({"title":"-OAyh"});
;// ./src/comp/ui/heading.tsx



function Heading({ children, withReturn, onReturn }) {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: heading_module.title,
        children: [
            withReturn && /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                className: "icon-btn",
                type: "button",
                onClick: ()=>onReturn === null || onReturn === void 0 ? void 0 : onReturn(),
                children: /*#__PURE__*/ (0,jsx_runtime.jsx)(flat_icon/* default */.A, {
                    type: "arrow-left",
                    color: "var(--color-bg-secondary)"
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("h1", {
                children: children
            })
        ]
    });
}


/***/ },

/***/ 536
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Preloader)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2615);

function Preloader({ color = "primary" }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 30,
        height: 30,
        viewBox: "0 0 200 200",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("radialGradient", {
                id: "a8",
                cx: ".66",
                fx: ".66",
                cy: ".3125",
                fy: ".3125",
                gradientTransform: "scale(1.5)",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                        offset: "0",
                        stopColor: "#FFFFFF"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                        offset: ".3",
                        stopColor: "#FFFFFF",
                        stopOpacity: ".9"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                        offset: ".6",
                        stopColor: "#FFFFFF",
                        stopOpacity: ".6"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                        offset: ".8",
                        stopColor: "#FFFFFF",
                        stopOpacity: ".3"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
                        offset: "1",
                        stopColor: "#FFFFFF",
                        stopOpacity: "0"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                // @ts-expect-error: 'transformOrigin' exists for circle element
                transformOrigin: "center",
                fill: "none",
                stroke: `var(--color-bg-${color})`,
                strokeWidth: "15",
                strokeLinecap: "round",
                strokeDasharray: "200 1000",
                strokeDashoffset: "0",
                cx: "100",
                cy: "100",
                r: "70",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("animateTransform", {
                    type: "rotate",
                    attributeName: "transform",
                    calcMode: "spline",
                    dur: "2",
                    values: "360;0",
                    keyTimes: "0;1",
                    keySplines: "0 0 1 1",
                    repeatCount: "indefinite"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("circle", {
                // @ts-expect-error: 'transformOrigin' exists for circle element
                transformOrigin: "center",
                fill: "none",
                opacity: ".2",
                stroke: "var(--color-bg-primary)",
                strokeWidth: "15",
                strokeLinecap: "round",
                cx: "100",
                cy: "100",
                r: "70"
            })
        ]
    });
}


/***/ },

/***/ 4858
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ SecretDisplay)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2615);
// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/index.js
var react = __webpack_require__(9471);
// EXTERNAL MODULE: ./node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js
var classnames = __webpack_require__(7500);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
;// ./src/lib/string.ts
function obscure(str, startSize, endSize) {
    if (str.length < startSize + endSize) return "*".repeat(str.length);
    return str.substring(0, startSize) + "******" + str.substring(str.length - endSize, str.length);
}

// EXTERNAL MODULE: ./src/comp/ui/flat-icon.tsx + 1 modules
var flat_icon = __webpack_require__(2794);
;// ./src/lib/hooks/use-timeout-callback.ts

function useTimeoutCallback(cb, timeout) {
    const [disabled, setDisabled] = (0,react.useState)(false);
    const timeoutIdRef = (0,react.useRef)(-1);
    const timeoutCb = (...args)=>{
        if (disabled) return;
        setDisabled(true);
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(()=>{
            setDisabled(false);
        }, timeout);
        cb(...args);
    };
    (0,react.useEffect)(()=>{
        return ()=>{
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = -1;
        };
    }, []);
    return [
        timeoutCb,
        disabled
    ];
}

;// ./src/comp/ui/copy-button.tsx



function CopyButton({ text }) {
    const [copy, disabled] = useTimeoutCallback(()=>{
        navigator.clipboard.writeText(text);
    }, 1000);
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
        className: "icon-btn",
        disabled: disabled,
        onClick: copy,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(flat_icon/* default */.A, {
            type: "copy",
            color: disabled ? "var(--color-success)" : "var(--color-bg-secondary)"
        })
    });
}

;// ./src/comp/ui/secret-display.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const secret_display_module = ({"wrapper":"_7onaT","value":"aphYY","icons":"lT-4n"});
;// ./src/comp/ui/secret-display.tsx







function SecretDisplay({ base, secret, visibleStart, visibleEnd }) {
    const [secretVisible, setSecretVisible] = (0,react.useState)(false);
    const obscuredSecret = (0,react.useMemo)(()=>obscure(secret, visibleStart, visibleEnd), [
        secret,
        visibleStart,
        visibleEnd
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: classnames_default()(secret_display_module.wrapper, "fsm-sm"),
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: secret_display_module.value,
                children: [
                    base,
                    secretVisible ? secret : obscuredSecret
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                className: secret_display_module.icons,
                children: [
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                        className: "icon-btn",
                        onClick: ()=>setSecretVisible((p)=>!p),
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(flat_icon/* default */.A, {
                            type: secretVisible ? "eye-crossed" : "eye",
                            color: "var(--color-bg-secondary)"
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime.jsx)(CopyButton, {
                        text: base + secret
                    })
                ]
            })
        ]
    });
}


/***/ },

/***/ 4164
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  v: () => (/* binding */ useLogin),
  L: () => (/* binding */ useRegister)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/js-cookie@3.0.5/node_modules/js-cookie/dist/js.cookie.mjs
var js_cookie = __webpack_require__(8865);
// EXTERNAL MODULE: ./src/lib/client/http.ts
var http = __webpack_require__(4639);
;// ./src/api/auth.ts

function login(data) {
    return http/* clientV1 */.r.post("/auth/sign-in", data);
}
function register(data) {
    return http/* clientV1 */.r.post("/auth/sign-up", data);
}

// EXTERNAL MODULE: ./src/api/user.ts
var user = __webpack_require__(525);
// EXTERNAL MODULE: ./src/api/stream-key.ts
var stream_key = __webpack_require__(5380);
// EXTERNAL MODULE: ./src/stores/user.ts
var stores_user = __webpack_require__(6487);
// EXTERNAL MODULE: ./src/stores/stream-key.ts
var stores_stream_key = __webpack_require__(8914);
// EXTERNAL MODULE: ./src/config/env.ts
var env = __webpack_require__(581);
;// ./src/features/auth/api/auth.ts
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







function useAuth() {
    const mutateUser = (0,stores_user/* useMutateUser */.r)();
    const mutateStreamKey = (0,stores_stream_key/* useMutateStreamKey */.N)();
    return (token)=>_async_to_generator(function*() {
            js_cookie/* default */.A.set(env/* ACCESS_TOKEN_COOKIE */.WW, token);
            const [userRes, skRes] = yield Promise.all([
                (0,user/* getCurrentUser */.H)(),
                (0,stream_key/* getCurrentStreamKey */.Z)()
            ]);
            mutateUser(userRes.data);
            mutateStreamKey(skRes.data);
            return {
                user: userRes.data,
                streamKey: skRes.data
            };
        })();
}
function useLogin() {
    const handleAuth = useAuth();
    return (data)=>_async_to_generator(function*() {
            const res = yield login(data);
            return handleAuth(res.data.access_token);
        })();
}
function useRegister() {
    const handleAuth = useAuth();
    return (data)=>_async_to_generator(function*() {
            const res = yield register(data);
            return handleAuth(res.data.access_token);
        })();
}


/***/ },

/***/ 8914
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   N: () => (/* binding */ useMutateStreamKey),
/* harmony export */   p: () => (/* binding */ useStreamKey)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7008);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9890);
/* harmony import */ var _api_stream_key__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5380);


const queryKey = "/stream-keys/current";
function useStreamKey(enabled = true) {
    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__/* .useQuery */ .I)({
        queryKey: [
            queryKey
        ],
        queryFn: ()=>(0,_api_stream_key__WEBPACK_IMPORTED_MODULE_2__/* .getCurrentStreamKey */ .Z)().then((r)=>r.data),
        staleTime: Infinity,
        retry: false,
        retryOnMount: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        enabled
    });
}
function useMutateStreamKey() {
    const client = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__/* .useQueryClient */ .jE)();
    return (sk)=>{
        client.setQueryData([
            queryKey
        ], sk);
    };
}


/***/ },

/***/ 418
(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/flat/6504a05c731928011184.svg";

/***/ }

}]);