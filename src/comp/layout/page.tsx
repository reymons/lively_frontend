type Props = {
    children: React.ReactNode;
    title: string;
    description: string;
};

// Page container
// Use it to wrap your pages to provide some meta info
export default function Page({ children, title, description }: Props) {
    return (
        <>
            <title>{`Lively | ${title}`}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {children}
        </>
    );
}
