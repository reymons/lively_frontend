import { MessageHandlers } from "../worker-channel";
import { VideoRenderChannel, Messages, MessageType } from "./render-channel";

interface Renderer {
    configure(canvas: OffscreenCanvas): void;

    render(frame: VideoFrame): void;

    setSize(w: number, h: number): void;

    clearScreen(): void;
}

class Canvas2DRenderer implements Renderer {
    private ctx: OffscreenCanvasRenderingContext2D | null = null;

    render(frame: VideoFrame) {
        if (this.ctx) {
            this.ctx.drawImage(frame, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            frame.close();
        }
    }

    configure(canvas: OffscreenCanvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            this.ctx = ctx;
        }
    }

    setSize(w: number, h: number) {
        if (this.ctx) {
            this.ctx.canvas.width = w;
            this.ctx.canvas.height = h;
        }
    }

    clearScreen() {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        }
    }
}

class WebGLRenderer implements Renderer {
    static isSupported() {
        const canvas = new OffscreenCanvas(0, 0);
        return !!canvas.getContext("webgl2") || !!canvas.getContext("webgl");
    }

    private static vertexShaderSrc = `
        attribute vec2 a_position;
        varying vec2 v_texCoord;
        
        void main() {
            v_texCoord = (a_position + 1.0) * 0.5;
            gl_Position = vec4(a_position, 0, 1);
        }
    `;

    private static fragmentShaderSrc = `
        precision mediump float;
        uniform sampler2D u_texture;
        varying vec2 v_texCoord;
        
        void main() {
            gl_FragColor = texture2D(u_texture, v_texCoord);
        }
    `;

    private gl: WebGLRenderingContext | null = null;
    private tex: WebGLTexture | null = null;

    render(frame: VideoFrame): void {
        if (this.gl && this.tex) {
            const gl = this.gl;
            gl.bindTexture(gl.TEXTURE_2D, this.tex);
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, frame);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }

        frame.close();
    }

    private createShader(gl: WebGLRenderingContext, type: GLenum, src: string): WebGLShader | null {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        return shader;
    }

    configure(canvas: OffscreenCanvas) {
        const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
        if (!gl) throw new Error("WebGL is not supported");

        const vs = this.createShader(gl, gl.VERTEX_SHADER, WebGLRenderer.vertexShaderSrc);
        const fs = this.createShader(gl, gl.FRAGMENT_SHADER, WebGLRenderer.fragmentShaderSrc);
        if (!vs || !fs) return;

        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        gl.useProgram(program);
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
            gl.STATIC_DRAW
        );
        const positionLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

        this.tex = texture;
        this.gl = gl;
    }

    setSize(w: number, h: number) {
        if (this.gl) {
            this.gl.canvas.width = w;
            this.gl.canvas.height = h;
            this.gl.viewport(0, 0, w, h);
        }
    }

    clearScreen() {
        if (this.gl) {
            this.gl.clearColor(0, 0, 0, 0);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        }
    }
}

const renderer: Renderer = WebGLRenderer.isSupported()
    ? new WebGLRenderer()
    : new Canvas2DRenderer();

const handlers: MessageHandlers<Messages> = {
    [MessageType.Frame]: data => renderer.render(data.frame),
    [MessageType.Configure]: data => renderer.configure(data.canvas),
    [MessageType.MetaData]: data => renderer.setSize(data.width, data.height),
    [MessageType.ClearScreen]: () => renderer.clearScreen(),
};

new VideoRenderChannel({
    onMessage: mesg => handlers[mesg.type](mesg.data),
    onError: err => console.error(err),
});
