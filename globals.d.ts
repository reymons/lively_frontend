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
