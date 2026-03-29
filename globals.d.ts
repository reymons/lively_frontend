declare module "*.svg" {
    export default React.FC<React.SVGAttributes<React.ReactSVGElement>>;
}

declare module "*.module.scss" {
    const styles: Record<string, string | undefined>;
    export default styles;
}

declare module "*.png" {
    const url: string;
    export default url;
}

type PartialBy<T extends Record<any, any>, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface AudioWorkletProcessor {
    readonly port: MessagePort;
    process(
        inputs: Float32Array[][],
        outputs: Float32Array[][],
        parameters: Record<string, Float32Array>
    ): boolean;
}

declare var AudioWorkletProcessor: {
    prototype: AudioWorkletProcessor;

    new (options?: AudioWorkletNodeOptions): AudioWorkletProcessor;
};

declare function registerProcessor(
    name: string,
    processorCtor: new (options?: AudioWorkletNodeOptions) => AudioWorkletProcessor
): void;
