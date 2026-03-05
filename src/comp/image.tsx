type Props = {
    className?: string;
    src: string;
    alt: string;
    w?: string | number;
    h?: string | number;
    objectFit?: React.CSSProperties["objectFit"];
    loading?: "lazy" | "eager";
    srcSet?: string;
    sizes?: string;
    "aria-hidden"?: boolean;
};

export default function Img({
    className,
    src,
    alt,
    w,
    h,
    objectFit,
    loading = "lazy",
    ...rest
}: Props) {
    return (
        <img
            className={className}
            width={w}
            height={h}
            src={src}
            alt={alt}
            style={{ objectFit }}
            loading={loading}
            {...rest}
        />
    );
}
