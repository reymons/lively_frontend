"use strict";
(self["webpackChunkonline_banking"] = self["webpackChunkonline_banking"] || []).push([[729],{

/***/ 9729
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ StreamPage)
});

// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(2615);
// EXTERNAL MODULE: ./node_modules/.pnpm/react-router@7.13.1_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs
var chunk_LFPYN7LY = __webpack_require__(8693);
// EXTERNAL MODULE: ./node_modules/.pnpm/classnames@2.5.1/node_modules/classnames/index.js
var classnames = __webpack_require__(7500);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
// EXTERNAL MODULE: ./node_modules/.pnpm/jotai@2.18.1_@babel+core@7.29.0_@babel+template@7.28.6_@types+react@19.2.14_react@19.2.4/node_modules/jotai/esm/react.mjs
var react = __webpack_require__(2409);
// EXTERNAL MODULE: ./src/stores/stream-key.ts
var stream_key = __webpack_require__(8914);
// EXTERNAL MODULE: ./src/stores/user.ts
var stores_user = __webpack_require__(6487);
// EXTERNAL MODULE: ./node_modules/.pnpm/react@19.2.4/node_modules/react/index.js
var node_modules_react = __webpack_require__(9471);
// EXTERNAL MODULE: ./src/lib/client/ws-main/ws.ts + 3 modules
var ws = __webpack_require__(4193);
;// ./src/lib/client/ws-media/packet.ts
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
const PacketType = Object.freeze({
    VideoFrame: 0,
    VideoSeqHdr: 1,
    AudioFrame: 2,
    AudioSeqHdr: 3,
    MetaData: 4
});
class MetaData {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    decode(data) {}
}
class Packet {
    get type() {
        return this._type;
    }
    get timestamp() {
        return this._timestamp;
    }
    get data() {
        var _this__data;
        return (_this__data = this._data) !== null && _this__data !== void 0 ? _this__data : new Uint8Array();
    }
    get isKeyFrame() {
        return this._isKeyFrame;
    }
    decode(data) {
        const view = new DataView(data.buffer);
        const flags = view.getUint8(0);
        this._type = (flags & 0b11111110) >> 1;
        this._isKeyFrame = Boolean(flags & 0b00000001);
        this._timestamp = view.getUint32(1);
        this._data = data.subarray(5);
    }
    constructor(){
        _define_property(this, "_type", 0);
        _define_property(this, "_timestamp", 0);
        _define_property(this, "_data", null);
        _define_property(this, "_isKeyFrame", false);
    }
}

;// ./src/lib/client/ws-media/ws.ts
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

class WSMedia {
    get isOpen() {
        return !!this.ws && this.ws.readyState === WebSocket.OPEN;
    }
    get isClosed() {
        return !this.ws || this.ws.readyState === WebSocket.CLOSED;
    }
    connect(url) {
        var _this_conf_onConnecting, _this_conf;
        if (this.ws && (this.ws.readyState === WebSocket.CONNECTING || this.ws.readyState === WebSocket.OPEN)) {
            return;
        }
        const ws = new WebSocket(url);
        ws.binaryType = "arraybuffer";
        this.ws = ws;
        (_this_conf_onConnecting = (_this_conf = this.conf).onConnecting) === null || _this_conf_onConnecting === void 0 ? void 0 : _this_conf_onConnecting.call(_this_conf);
        ws.onopen = ()=>{
            var _this_conf_onConnect, _this_conf;
            (_this_conf_onConnect = (_this_conf = this.conf).onConnect) === null || _this_conf_onConnect === void 0 ? void 0 : _this_conf_onConnect.call(_this_conf);
        };
        ws.onmessage = (e)=>{
            const packet = new Packet();
            packet.decode(new Uint8Array(e.data));
            this.conf.onPacket(packet);
        };
        ws.onclose = (e)=>{
            if (!e.wasClean) {
                var _this_conf_onError, _this_conf;
                const err = new Error(`WebSocket connection closed. Reason: ${e.reason}. Code: ${e.code}`);
                (_this_conf_onError = (_this_conf = this.conf).onError) === null || _this_conf_onError === void 0 ? void 0 : _this_conf_onError.call(_this_conf, err);
            }
            // make sure there's no new connection
            if (this.isClosed) {
                var _this_conf_onDisconnect, _this_conf1;
                (_this_conf_onDisconnect = (_this_conf1 = this.conf).onDisconnect) === null || _this_conf_onDisconnect === void 0 ? void 0 : _this_conf_onDisconnect.call(_this_conf1);
            }
        };
    }
    disconnect() {
        var _this_ws;
        (_this_ws = this.ws) === null || _this_ws === void 0 ? void 0 : _this_ws.close();
    }
    constructor(conf){
        ws_define_property(this, "ws", null);
        ws_define_property(this, "conf", void 0);
        this.conf = _object_spread({}, conf);
    }
}

;// ./src/features/streaming/lib/streaming.ts
function streaming_define_property(obj, key, value) {
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
function streaming_object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            streaming_define_property(target, key, source[key]);
        });
    }
    return target;
}

class WSStreaming {
    onDisconnect() {
        var _this_conf_onDisconnect, _this_conf;
        this.gotAudioFrame = false;
        this.gotVideoFrame = false;
        this.onConnectCalled = false;
        (_this_conf_onDisconnect = (_this_conf = this.conf).onDisconnect) === null || _this_conf_onDisconnect === void 0 ? void 0 : _this_conf_onDisconnect.call(_this_conf);
    }
    bytesToHex(bytes) {
        return bytes.reduce((str, byte)=>str + byte.toString(16).padStart(2, "0"), "");
    }
    createVideoDecoder() {
        return new VideoDecoder({
            output: (frame)=>{
                if (this.ws.isOpen) this.conf.onVideoFrame(frame);
                frame.close();
            },
            error: (e)=>{
                console.error(e);
                this.disconnect();
            }
        });
    }
    createAudioDecoder() {
        return new AudioDecoder({
            output: (data)=>{
                if (this.ws.isOpen) this.conf.onAudioData(data);
                data.close();
            },
            error: (e)=>{
                console.error(e);
                this.disconnect();
            }
        });
    }
    onVideoFrame(packet) {
        if (this.videoDecoder) {
            const chunk = new EncodedVideoChunk({
                timestamp: packet.timestamp * 1000,
                type: packet.isKeyFrame ? "key" : "delta",
                data: packet.data
            });
            this.videoDecoder.decode(chunk);
        }
    }
    onVideoSeqHdr(packet) {
        const codec = `avc1.${this.bytesToHex(packet.data.subarray(1, 4))}`;
        console.log({
            videoCodec: codec
        });
        this.videoDecoder = this.createVideoDecoder();
        this.videoDecoder.configure({
            codec,
            description: packet.data
        });
    }
    onAudioFrame(packet) {
        if (this.audioDecoder) {
            const chunk = new EncodedAudioChunk({
                data: packet.data,
                timestamp: packet.timestamp * 1000,
                type: "key"
            });
            this.audioDecoder.decode(chunk);
        }
    }
    onAudioSeqHdr(packet) {
        const objType = (packet.data[0] & 0b11111000) >> 3;
        const codec = `mp4a.40.${objType}`;
        console.log({
            audioCodec: codec
        });
        this.audioDecoder = this.createAudioDecoder();
        this.audioDecoder.configure({
            codec,
            description: packet.data,
            numberOfChannels: 2,
            sampleRate: 48000
        });
    }
    onPacket(packet) {
        switch(packet.type){
            case PacketType.VideoFrame:
                this.gotVideoFrame = true;
                this.onVideoFrame(packet);
                break;
            case PacketType.VideoSeqHdr:
                this.onVideoSeqHdr(packet);
                break;
            case PacketType.AudioFrame:
                this.gotAudioFrame = true;
                this.onAudioFrame(packet);
                break;
            case PacketType.AudioSeqHdr:
                this.onAudioSeqHdr(packet);
                break;
        }
        if (this.gotVideoFrame && !this.onConnectCalled) {
            var _this_conf_onConnect, _this_conf;
            this.onConnectCalled = true;
            (_this_conf_onConnect = (_this_conf = this.conf).onConnect) === null || _this_conf_onConnect === void 0 ? void 0 : _this_conf_onConnect.call(_this_conf);
        }
    }
    connect(url) {
        this.ws.connect(url);
    }
    disconnect() {
        this.ws.disconnect();
    }
    constructor(conf){
        streaming_define_property(this, "ws", void 0);
        streaming_define_property(this, "conf", void 0);
        streaming_define_property(this, "videoDecoder", null);
        streaming_define_property(this, "audioDecoder", null);
        streaming_define_property(this, "metaData", new MetaData());
        streaming_define_property(this, "gotAudioFrame", false);
        streaming_define_property(this, "gotVideoFrame", false);
        streaming_define_property(this, "onConnectCalled", false);
        this.conf = streaming_object_spread({}, conf);
        this.ws = new WSMedia({
            onConnecting: this.conf.onConnecting,
            onError: this.conf.onError,
            onDisconnect: ()=>this.onDisconnect(),
            onPacket: (p)=>this.onPacket(p)
        });
    }
}

// EXTERNAL MODULE: ./node_modules/.pnpm/jotai@2.18.1_@babel+core@7.29.0_@babel+template@7.28.6_@types+react@19.2.14_react@19.2.4/node_modules/jotai/esm/vanilla.mjs
var vanilla = __webpack_require__(2257);
;// ./src/features/streaming/store.ts

const streamStatus = (0,vanilla/* atom */.eU)("idle");

// EXTERNAL MODULE: ./src/config/env.ts
var env = __webpack_require__(581);
;// ./src/features/streaming/hooks/use-stream.ts





function useCanvasStream(canvasRef) {
    const store = (0,react/* useStore */.Pj)();
    const setStatus = (0,react/* useSetAtom */.Xr)(streamStatus);
    const [ctx] = (0,node_modules_react.useState)(()=>{
        const offscreen = new OffscreenCanvas(0, 0);
        return {
            audioCtx: null,
            offscreen,
            offscreenCtx: offscreen.getContext("2d"),
            canvasCtx: null
        };
    });
    const onAudioData = (data)=>{
        if (!ctx.audioCtx) {
            ctx.audioCtx = new AudioContext();
        }
        const audioBuf = ctx.audioCtx.createBuffer(data.numberOfChannels, data.numberOfFrames, data.sampleRate);
        for(let i = 0; i < data.numberOfChannels; i++){
            const channel = new Float32Array(data.numberOfFrames);
            data.copyTo(channel, {
                planeIndex: i
            });
            audioBuf.copyToChannel(channel, i);
        }
        const audioSrc = ctx.audioCtx.createBufferSource();
        audioSrc.buffer = audioBuf;
        audioSrc.connect(ctx.audioCtx.destination);
        audioSrc.start();
        data.close();
    };
    const onVideoFrame = (frame)=>{
        const canvas = canvasRef.current;
        if (!ctx.offscreenCtx || !ctx.canvasCtx || !canvas || !ctx.offscreen) return;
        ctx.offscreenCtx.drawImage(frame, 0, 0, canvas.width, canvas.height);
        const bitmap = ctx.offscreen.transferToImageBitmap();
        ctx.canvasCtx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        bitmap.close();
    };
    const unmountedRef = (0,node_modules_react.useRef)(false);
    (0,node_modules_react.useEffect)(()=>{
        unmountedRef.current = false;
        return ()=>{
            unmountedRef.current = true;
        };
    }, []);
    const [streaming] = (0,node_modules_react.useState)(()=>{
        return new WSStreaming({
            onVideoFrame,
            onAudioData,
            onConnect: ()=>setStatus("connected"),
            onDisconnect: ()=>setStatus(unmountedRef.current ? "idle" : "disconnected"),
            onConnecting: ()=>setStatus("connecting")
        });
    });
    (0,node_modules_react.useEffect)(()=>{
        return store.sub(streamStatus, ()=>{
            const status = store.get(streamStatus);
            if (status === "disconnected" && canvasRef.current) {
                var _ctx_canvasCtx;
                (_ctx_canvasCtx = ctx.canvasCtx) === null || _ctx_canvasCtx === void 0 ? void 0 : _ctx_canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        });
    }, [
        store,
        ctx,
        canvasRef
    ]);
    (0,node_modules_react.useLayoutEffect)(()=>{
        var _ref;
        const canvas = canvasRef.current;
        ctx.canvasCtx = (_ref = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d")) !== null && _ref !== void 0 ? _ref : null;
        if (!canvas) return;
        canvas.width = 1920;
        canvas.height = 1080;
        ctx.offscreen.width = canvas.width;
        ctx.offscreen.height = canvas.height;
    }, [
        canvasRef,
        ctx
    ]);
    const connect = (0,node_modules_react.useCallback)((userId)=>streaming.connect(`${env/* SOCKET_CLIENT_BASE_URL */.IP}/ws/streams/${userId}`), [
        streaming
    ]);
    const disconnect = (0,node_modules_react.useCallback)(()=>streaming.disconnect(), [
        streaming
    ]);
    return {
        connect,
        disconnect
    };
}

// EXTERNAL MODULE: ./src/comp/ui/flat-icon.tsx + 1 modules
var flat_icon = __webpack_require__(2794);
;// ./src/features/streaming/comp/control-panel.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const control_panel_module = ({"wrapper":"Fvf-9","panel":"EAkBu","left":"C8lQl","right":"vJe1z"});
;// ./src/features/streaming/comp/control-panel.tsx
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



function ControlPanel({ canvasRef }) {
    const enterFullScreen = ()=>_async_to_generator(function*() {
            const canvas = canvasRef.current;
            if (!canvas) return;
            if (document.fullscreenElement) {
                yield document.exitFullscreen();
            }
            try {
                yield canvas.requestFullscreen();
            } catch (err) {
                console.error(err);
            }
        })();
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
        className: control_panel_module.wrapper,
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: control_panel_module.panel,
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    className: control_panel_module.left
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                    className: control_panel_module.right,
                    children: /*#__PURE__*/ (0,jsx_runtime.jsx)("button", {
                        className: "icon-btn",
                        type: "button",
                        onClick: enterFullScreen,
                        children: /*#__PURE__*/ (0,jsx_runtime.jsx)(flat_icon/* default */.A, {
                            type: "arrow-scale",
                            color: "white"
                        })
                    })
                })
            ]
        })
    });
}

// EXTERNAL MODULE: ./src/comp/ui/preloader.tsx
var preloader = __webpack_require__(536);
;// ./src/features/streaming/comp/stream-display.tsx








function StreamDisplay({ userId }) {
    const canvasRef = (0,node_modules_react.useRef)(null);
    const status = (0,react/* useAtomValue */.md)(streamStatus);
    const { connect, disconnect } = useCanvasStream(canvasRef);
    const socket = (0,ws/* useSocket */.Y)();
    (0,node_modules_react.useEffect)(()=>{
        if (!userId) return;
        const unsub = socket.subscribe(`stream.${userId}.started`, ()=>connect(userId));
        connect(userId);
        return ()=>{
            disconnect();
            unsub();
        };
    }, [
        userId,
        connect,
        disconnect,
        socket
    ]);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        style: {
            aspectRatio: "16 / 9",
            position: "relative",
            overflow: "hidden",
            borderRadius: "10px"
        },
        children: [
            status !== "connected" && /*#__PURE__*/ (0,jsx_runtime.jsx)("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgb(255 255 255 / 12.5%)"
                },
                children: (status === "idle" || status === "connecting") && /*#__PURE__*/ (0,jsx_runtime.jsx)(preloader/* default */.A, {
                    color: "secondary"
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)("canvas", {
                style: {
                    width: "100%",
                    height: "100%"
                },
                ref: canvasRef
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(ControlPanel, {
                canvasRef: canvasRef
            })
        ]
    });
}

;// ./src/features/streaming/hooks/use-viewers.ts


function useViewers(userID) {
    const socket = (0,ws/* useSocket */.Y)();
    const [viewers, setViewers] = (0,node_modules_react.useState)(0);
    (0,node_modules_react.useEffect)(()=>{
        if (!userID) return;
        return socket.subscribe(`stream.${userID}.viewers`, (mesg)=>{
            setViewers(mesg.data.viewers);
        });
    }, [
        socket,
        userID
    ]);
    return viewers;
}

;// ./src/features/streaming/lib/helpers.ts
function numToKs(n) {
    if (n < 1000) return n.toString();
    if (n < 1000000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
}

// EXTERNAL MODULE: ./node_modules/.pnpm/@tanstack+react-query@5.90.21_react@19.2.4/node_modules/@tanstack/react-query/build/modern/useQuery.js + 6 modules
var useQuery = __webpack_require__(7008);
// EXTERNAL MODULE: ./src/api/user.ts
var user = __webpack_require__(525);
;// ./src/stores/public-user.ts


function usePublicUser({ username }) {
    return (0,useQuery/* useQuery */.I)({
        queryKey: [
            "/users/usernames",
            username
        ],
        queryFn: ()=>(0,user/* getUserByUsername */.J)(username !== null && username !== void 0 ? username : "").then((r)=>r.data),
        staleTime: Infinity,
        retryOnMount: false,
        retry: false
    });
}

// EXTERNAL MODULE: ./src/comp/ui/secret-display.tsx + 4 modules
var secret_display = __webpack_require__(4858);
;// ./src/app/pages/stream.module.scss
// extracted by mini-css-extract-plugin
/* harmony default export */ const stream_module = ({"main":"_--2GV","header":"Ye8to","heading":"zZX1d","live":"_5KOEh","pulse":"gGiQU","sk":"t9Jre","viewers":"Bv-47"});
;// ./src/app/pages/stream.tsx












function StreamPage() {
    const params = (0,chunk_LFPYN7LY/* useParams */.g)();
    const username = params.username || "";
    const { data: sk } = (0,stream_key/* useStreamKey */.p)();
    const { data: user } = (0,stores_user/* useUser */.J)();
    const { data: publicUser } = usePublicUser({
        username
    });
    return /*#__PURE__*/ (0,jsx_runtime.jsx)("main", {
        className: "cnt",
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: stream_module.main,
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: stream_module.header,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(Heading, {
                            username: username
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(Viewers, {
                            userID: publicUser === null || publicUser === void 0 ? void 0 : publicUser.id
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsx)(StreamDisplay, {
                    userId: publicUser === null || publicUser === void 0 ? void 0 : publicUser.id
                }),
                !!sk && (user === null || user === void 0 ? void 0 : user.username) === username && /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                    className: stream_module.sk,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime.jsx)("p", {
                            className: "fs-lg fsm-sm",
                            children: "Your streaming URL"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime.jsx)(secret_display/* default */.A, {
                            base: env/* RTMP_BASE_URL */.WY,
                            secret: sk.stream_key,
                            visibleStart: 6,
                            visibleEnd: 5
                        })
                    ]
                })
            ]
        })
    });
}
function Heading({ username }) {
    const status = (0,react/* useAtomValue */.md)(streamStatus);
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("h1", {
        className: classnames_default()("fs-2xl fsm-md", stream_module.heading),
        children: [
            username,
            " ",
            status === "connected" ? /*#__PURE__*/ (0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
                children: [
                    "is live",
                    /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                        className: stream_module.live
                    })
                ]
            }) : "is offline"
        ]
    });
}
function Viewers({ userID }) {
    const viewers = useViewers(userID);
    const status = (0,react/* useAtomValue */.md)(streamStatus);
    if (status !== "connected") return null;
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        className: stream_module.viewers,
        title: "Viewer count",
        children: [
            /*#__PURE__*/ (0,jsx_runtime.jsx)("span", {
                className: "fs-lg fsm-md",
                children: numToKs(viewers)
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsx)(flat_icon/* default */.A, {
                type: "eye-target",
                color: "var(--color-bg-secondary)"
            })
        ]
    });
}


/***/ }

}]);