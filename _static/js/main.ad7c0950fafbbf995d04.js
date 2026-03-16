"use strict";
(self["webpackChunkonline_banking"] = self["webpackChunkonline_banking"] || []).push([[792],{

/***/ 525
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ getCurrentUser),
/* harmony export */   J: () => (/* binding */ getUserByUsername)
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

function getCurrentUser() {
    return _async_to_generator(function*() {
        return _lib_client_http__WEBPACK_IMPORTED_MODULE_0__/* .clientV1 */ .r.get("/users/current");
    })();
}
function getUserByUsername(username) {
    return _async_to_generator(function*() {
        return _lib_client_http__WEBPACK_IMPORTED_MODULE_0__/* .clientV1 */ .r.get(`/users/usernames/${username}`);
    })();
}


/***/ },

/***/ 2026
(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {


// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2615);
// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/index.js
var react = __webpack_require__(9471);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-dom@19.2.4_react@19.2.4/node_modules/react-dom/client.js
var client = __webpack_require__(9914);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-dom@19.2.4_react@19.2.4/node_modules/react-dom/index.js
var react_dom = __webpack_require__(8289);
;// ./src/lib/modal.tsx
/* unused harmony import specifier */ var _jsx;
/* unused harmony import specifier */ var createContext;
/* unused harmony import specifier */ var useContext;
/* unused harmony import specifier */ var useState;
/* unused harmony import specifier */ var useRef;
/* unused harmony import specifier */ var useMemo;
/* unused harmony import specifier */ var useEffect;
/* unused harmony import specifier */ var useImperativeHandle;
/* unused harmony import specifier */ var createPortal;
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



const ModalContext = /*#__PURE__*/ (/* unused pure expression or super */ null && (createContext(null)));
function useModalContext() {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error("Wrap your components in ModalContext");
    return ctx;
}
let modalRoot = null;
function setModalRoot(root) {
    modalRoot = root;
}
const Modal = ({ ref, defaultOpen = false, root = null, children, onClose })=>{
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const isOpenRef = useRef(isOpen);
    const isClosingRef = useRef(false);
    const closeHandlerRef = useRef(null);
    const isModalState = typeof ref === "function";
    root = root !== null && root !== void 0 ? root : modalRoot;
    const control = useMemo(()=>({
            open: ()=>{
                setIsOpen(true);
                isOpenRef.current = true;
            },
            close: ()=>{
                if (!isClosingRef.current) {
                    const finalize = ()=>{
                        isClosingRef.current = false;
                        isOpenRef.current = false;
                        setIsOpen(false);
                        onClose === null || onClose === void 0 ? void 0 : onClose();
                    };
                    isClosingRef.current = true;
                    const closeHandler = closeHandlerRef.current;
                    if (closeHandler) closeHandler(finalize);
                    else finalize();
                }
            },
            toggle: ()=>{
                if (isOpenRef.current) control.close();
                else control.open();
            }
        }), [
        onClose
    ]);
    useEffect(()=>{
        document.body.style.overflow = isOpen ? "hidden" : "visible";
        return ()=>{
            document.body.style.overflow = "visible";
        };
    }, [
        isOpen
    ]);
    useImperativeHandle(ref, ()=>_object_spread({
            isOpen
        }, control), // eslint-disable-next-line react-hooks/exhaustive-deps
    isModalState ? [
        isOpen,
        control
    ] : [
        control
    ]);
    if (!root) {
        throw new Error("Modal root is null. Set it via setModalRoot() or specify the `root` prop");
    }
    if (!isOpen) return null;
    return /*#__PURE__*/ createPortal(/*#__PURE__*/ _jsx(ModalContext, {
        value: {
            modal: control,
            setCloseHandler: (handler)=>{
                closeHandlerRef.current = handler;
            }
        },
        children: typeof children === "function" ? children(control) : children
    }), root);
};
function useModal() {
    const ref = useRef(null);
    return useState(()=>({
            ref,
            open: ()=>{
                var _ref_current;
                return (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.open();
            },
            close: ()=>{
                var _ref_current;
                return (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.close();
            },
            toggle: ()=>{
                var _ref_current;
                return (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.toggle();
            }
        }))[0];
}
function useModalState() {
    const [modal, setModal] = useState(null);
    return {
        ref: setModal,
        isOpen: !!(modal === null || modal === void 0 ? void 0 : modal.isOpen),
        open: ()=>modal === null || modal === void 0 ? void 0 : modal.open(),
        close: ()=>modal === null || modal === void 0 ? void 0 : modal.close(),
        toggle: ()=>modal === null || modal === void 0 ? void 0 : modal.toggle()
    };
}

// EXTERNAL MODULE: ./src/lib/client/ws-main/ws.ts + 3 modules
var ws = __webpack_require__(4193);
// EXTERNAL MODULE: ./node_modules/.pnpm/@tanstack+query-core@5.90.20/node_modules/@tanstack/query-core/build/modern/queryClient.js + 4 modules
var queryClient = __webpack_require__(2193);
// EXTERNAL MODULE: ./node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js
var QueryClientProvider = __webpack_require__(9890);
;// ./src/app/provider.tsx



const provider_queryClient = new queryClient/* QueryClient */.E();
function AppProvider({ children }) {
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(QueryClientProvider/* QueryClientProvider */.Ht, {
        client: provider_queryClient,
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(ws/* SocketProvider */.F, {
            children: children
        })
    });
}

// EXTERNAL MODULE: ./node_modules/.pnpm/react-router@7.13.1_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs
var chunk_LFPYN7LY = __webpack_require__(8693);
// EXTERNAL MODULE: ./src/config/paths.ts
var paths = __webpack_require__(7750);
;// ./src/comp/ui/loading-screen.tsx

function LoadingScreen() {
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        "aria-label": "Loading the page, please wait...",
        "aria-live": "polite",
        "aria-busy": true,
        style: {
            height: "100svh",
            backgroundColor: "var(--color-bg-primary)"
        },
        "data-testid": "loading-screen"
    });
}

// EXTERNAL MODULE: ./src/stores/user.ts
var stores_user = __webpack_require__(6487);
;// ./src/features/auth/comp/guest-only.tsx





function GuestOnly() {
    const { data: user, isFetched } = (0,stores_user/* useUser */.J)();
    const forceRenderRef = (0,react.useRef)(false);
    if (!isFetched) {
        return /*#__PURE__*/ (0,jsx_runtime.jsx)(jsx_runtime.Fragment, {});
    }
    if (user && !forceRenderRef.current) {
        return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_LFPYN7LY/* Navigate */.C5, {
            to: paths/* default */.A.stream.get(user.username),
            replace: true
        });
    }
    forceRenderRef.current = true;
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_LFPYN7LY/* Outlet */.sv, {});
}

;// ./src/app/router.tsx






const HomePage = /*#__PURE__*/ (0,react.lazy)(()=>Promise.all(/* import() */[__webpack_require__.e(500), __webpack_require__.e(308), __webpack_require__.e(502), __webpack_require__.e(349)]).then(__webpack_require__.bind(__webpack_require__, 349)));
const StreamPage = /*#__PURE__*/ (0,react.lazy)(()=>Promise.all(/* import() */[__webpack_require__.e(500), __webpack_require__.e(409), __webpack_require__.e(502), __webpack_require__.e(729)]).then(__webpack_require__.bind(__webpack_require__, 9729)));
const LoginPage = /*#__PURE__*/ (0,react.lazy)(()=>Promise.all(/* import() */[__webpack_require__.e(500), __webpack_require__.e(308), __webpack_require__.e(502), __webpack_require__.e(762)]).then(__webpack_require__.bind(__webpack_require__, 2762)));
const RegisterPage = /*#__PURE__*/ (0,react.lazy)(()=>Promise.all(/* import() */[__webpack_require__.e(500), __webpack_require__.e(308), __webpack_require__.e(502), __webpack_require__.e(751)]).then(__webpack_require__.bind(__webpack_require__, 1751)));
const MainLayout = /*#__PURE__*/ (0,react.lazy)(()=>Promise.all(/* import() */[__webpack_require__.e(500), __webpack_require__.e(319)]).then(__webpack_require__.bind(__webpack_require__, 5319)));
function AppRouter() {
    return /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_LFPYN7LY/* BrowserRouter */.Kd, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(react.Suspense, {
            fallback: /*#__PURE__*/ (0,jsx_runtime.jsx)(LoadingScreen, {}),
            children: /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_LFPYN7LY/* Routes */.BV, {
                children: /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_LFPYN7LY/* Route */.qh, {
                    path: paths/* default */.A.home.path,
                    Component: MainLayout,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_LFPYN7LY/* Route */.qh, {
                            index: true,
                            Component: HomePage
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_LFPYN7LY/* Route */.qh, {
                            path: "/:username",
                            Component: StreamPage
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsxs)(chunk_LFPYN7LY/* Route */.qh, {
                            Component: GuestOnly,
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_LFPYN7LY/* Route */.qh, {
                                    path: "/login",
                                    Component: LoginPage
                                }),
                                /*#__PURE__*/ (0,jsx_runtime.jsx)(chunk_LFPYN7LY/* Route */.qh, {
                                    path: "/register",
                                    Component: RegisterPage
                                })
                            ]
                        })
                    ]
                })
            })
        })
    });
}

;// ./src/app/styles/global.scss
// extracted by mini-css-extract-plugin

;// ./src/app/index.tsx







const app_modalRoot = document.getElementById("modal-root");
if (!app_modalRoot) throw new Error("No modal root");
setModalRoot(app_modalRoot);
const rootEl = document.getElementById("app");
if (!rootEl) throw new Error("No root element");
const root = (0,client.createRoot)(rootEl);
root.render(/*#__PURE__*/ (0,jsx_runtime.jsx)(react.StrictMode, {
    children: /*#__PURE__*/ (0,jsx_runtime.jsx)(AppProvider, {
        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(AppRouter, {})
    })
}));


/***/ },

/***/ 581
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bo: () => (/* binding */ HTTP_CLIENT_BASE_URL),
/* harmony export */   IP: () => (/* binding */ SOCKET_CLIENT_BASE_URL),
/* harmony export */   WW: () => (/* binding */ ACCESS_TOKEN_COOKIE),
/* harmony export */   WY: () => (/* binding */ RTMP_BASE_URL)
/* harmony export */ });
const ACCESS_TOKEN_COOKIE = "xAuthToken";
const HTTP_CLIENT_BASE_URL = "https://api.reymons.net";
const SOCKET_CLIENT_BASE_URL = "wss://api.reymons.net";
const RTMP_BASE_URL = "rtmp://stream.reymons.net:1935/live/";


/***/ },

/***/ 7750
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const paths = {
    home: {
        path: "/"
    },
    login: {
        path: "/login"
    },
    register: {
        path: "/register"
    },
    stream: {
        get: (username)=>`/${username}`
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (paths);


/***/ },

/***/ 4639
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ clientV1)
/* harmony export */ });
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8865);
/* harmony import */ var _config_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(581);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7554);



const clientV1 = axios__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A.create({
    baseURL: _config_env__WEBPACK_IMPORTED_MODULE_1__/* .HTTP_CLIENT_BASE_URL */ .Bo + "/api/v1"
});
clientV1.interceptors.request.use((cfg)=>{
    const token = js_cookie__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.get(_config_env__WEBPACK_IMPORTED_MODULE_1__/* .ACCESS_TOKEN_COOKIE */ .WW);
    if (token) {
        cfg.headers.set("Authorization", `Bearer ${token}`);
    }
    cfg.headers.set("Content-Type", "application/json");
    cfg.withCredentials = true;
    return cfg;
});
clientV1.interceptors.response.use((res)=>res, (err)=>{
    var _err_response;
    return Promise.reject(new Error((((_err_response = err.response) === null || _err_response === void 0 ? void 0 : _err_response.data) || err.message || "").trim() || "Unknown error has occurred"));
});


/***/ },

/***/ 4193
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  F: () => (/* binding */ SocketProvider),
  Y: () => (/* binding */ useSocket)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/index.js
var react = __webpack_require__(9471);
;// ./src/lib/client/socket/error.ts
class InvalidMessageError extends Error {
}
class SentError extends Error {
}

;// ./src/lib/client/socket/message.ts
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

class Message {
    constructor(type, data){
        _define_property(this, "type", void 0);
        _define_property(this, "data", void 0);
        this.type = type;
        this.data = data;
    }
}
function decodeMessage(mesg, data) {
    const parsed = JSON.parse(data);
    if (typeof parsed !== "object" || parsed == null) {
        throw new InvalidMessageError("Not an object");
    }
    if (!("type" in parsed) || typeof parsed.type !== "string") {
        throw new InvalidMessageError("Property 'type' is not a string");
    }
    if (!("data" in parsed) || typeof parsed.data !== "object" || parsed.data === null) {
        throw new InvalidMessageError("Property 'data' is not an object");
    }
    mesg.type = parsed.type;
    mesg.data = parsed.data;
}

;// ./src/lib/client/socket/ws.ts
function ws_define_property(obj, key, value) {
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
            ws_define_property(target, key, source[key]);
        });
    }
    return target;
}


const EvSubscribe = "subscribe";
const EvUnsubscribe = "unsubscribe";
class Socket {
    reportError(err) {
        var _this_onErrorHandler, _this;
        let e;
        if (err instanceof Error) {
            e = err;
        } else {
            e = new Error("Unknown error");
        }
        (_this_onErrorHandler = (_this = this).onErrorHandler) === null || _this_onErrorHandler === void 0 ? void 0 : _this_onErrorHandler.call(_this, e);
    }
    get isSocketOpen() {
        return !!this.ws && this.ws.readyState === WebSocket.OPEN;
    }
    off(ev, ln) {
        const set = this.listeners[ev];
        if (set) {
            set.delete(ln);
            if (set.size == 0) {
                delete this.listeners[ev];
            }
        }
    }
    on(ev, ln) {
        let set = this.listeners[ev];
        if (!set) {
            set = new Set();
            this.listeners[ev] = set;
        }
        set.add(ln);
        return ()=>this.off(ev, ln);
    }
    emit(ev, mesg) {
        var _this_listeners_ev;
        (_this_listeners_ev = this.listeners[ev]) === null || _this_listeners_ev === void 0 ? void 0 : _this_listeners_ev.forEach((ln)=>ln(mesg));
    }
    send(ev, data) {
        if (!this.isSocketOpen) return;
        try {
            const mesg = new Message(ev, data);
            this.ws.send(JSON.stringify(mesg));
        } catch (err) {
            this.reportError(err);
        }
    }
    sendSubMessage(ev, topic) {
        this.send(ev, {
            topic
        });
    }
    subscribe(ev, ln) {
        var _this_subCount_ev;
        const event = ev;
        const off = this.on(ev, ln);
        const count = (_this_subCount_ev = this.subCount[ev]) !== null && _this_subCount_ev !== void 0 ? _this_subCount_ev : 0;
        if (count === 0 && this.isSocketOpen) {
            this.sendSubMessage(EvSubscribe, event);
        }
        this.subCount[ev] = count + 1;
        return ()=>{
            var _this_subCount_ev;
            off();
            const count = Math.max(0, ((_this_subCount_ev = this.subCount[ev]) !== null && _this_subCount_ev !== void 0 ? _this_subCount_ev : 0) - 1);
            if (count === 0) {
                delete this.subCount[ev];
                this.sendSubMessage(EvUnsubscribe, event);
            } else {
                this.subCount[ev] = count;
            }
        };
    }
    onMessage(data) {
        try {
            const mesg = new Message("", {});
            decodeMessage(mesg, data);
            const validator = this.validators[mesg.type];
            validator === null || validator === void 0 ? void 0 : validator(mesg.data);
            this.emit(mesg.type, mesg);
        } catch (err) {
            this.reportError(err);
        }
    }
    onClose(url) {
        this.reconnectTimeoutId = setTimeout(()=>{
            this.reconnectTimeoutId = -1;
            this.connect(url);
        }, this.reconnectTimeout);
    }
    onOpen() {
        for(const event in this.subCount){
            if (this.subCount[event] > 0) {
                this.sendSubMessage(EvSubscribe, event);
            }
        }
    }
    connect(url) {
        if (this.ws && (this.ws.readyState === WebSocket.CONNECTING || this.ws.readyState === WebSocket.OPEN)) {
            console.warn("[SOCKET] An attempt to connect while connection is in progress or already established");
            return;
        }
        clearTimeout(this.reconnectTimeoutId);
        const ws = new WebSocket(url);
        this.ws = ws;
        ws.onmessage = (e)=>this.onMessage(e.data);
        ws.onopen = ()=>this.onOpen();
        const off = this.on("error", (mesg)=>{
            this.reportError(new SentError(mesg.data.message));
        });
        ws.onclose = ()=>{
            off();
            this.onClose(url);
        };
    }
    disconnect() {
        var _this_ws;
        (_this_ws = this.ws) === null || _this_ws === void 0 ? void 0 : _this_ws.close();
    }
    constructor(conf){
        ws_define_property(this, "ws", null);
        ws_define_property(this, "listeners", {});
        ws_define_property(this, "reconnectTimeout", void 0);
        ws_define_property(this, "reconnectTimeoutId", -1);
        ws_define_property(this, "validators", void 0);
        ws_define_property(this, "onErrorHandler", void 0);
        ws_define_property(this, "subCount", {});
        ws_define_property(this, "qsubs", {});
        this.onErrorHandler = conf.onError;
        this.reconnectTimeout = conf.reconnectTimeout || 2000;
        this.validators = conf.validators ? _object_spread({}, conf.validators) : {};
    }
}

// EXTERNAL MODULE: ./src/config/env.ts
var env = __webpack_require__(581);
;// ./src/lib/client/ws-main/ws.ts



const socket = new Socket({
    onError: (err)=>console.error(err)
});
socket.connect(`${env/* SOCKET_CLIENT_BASE_URL */.IP}/ws/main`);
const SocketContext = (0,react.createContext)(null);
function useSocket() {
    const ctx = (0,react.useContext)(SocketContext);
    if (!ctx) {
        throw new Error("No context. Wrap the application in SocketContext");
    }
    return ctx;
}
function SocketProvider({ children }) {
    return (0,react.createElement)(SocketContext, {
        value: socket
    }, children);
}


/***/ },

/***/ 6487
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ useUser),
/* harmony export */   r: () => (/* binding */ useMutateUser)
/* harmony export */ });
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7008);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9890);
/* harmony import */ var _api_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(525);


const queryKey = "/users/me";
function useUser(enabled = true) {
    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_0__/* .useQuery */ .I)({
        queryKey: [
            queryKey
        ],
        queryFn: ()=>(0,_api_user__WEBPACK_IMPORTED_MODULE_2__/* .getCurrentUser */ .H)().then((r)=>r.data),
        staleTime: Infinity,
        retry: false,
        retryOnMount: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled
    });
}
function useMutateUser() {
    const client = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__/* .useQueryClient */ .jE)();
    return (newUser)=>{
        client.setQueryData([
            queryKey
        ], newUser);
    };
}


/***/ }

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [644,412], () => (__webpack_exec__(2026)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);