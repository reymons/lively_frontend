type Props = {
    children: React.ReactNode;
    title: string;
    description: string;
};

// Page container
// Use it to wrap your pages to provide some meta info
export const Page = ({ children, title, description }: Props) => {
    return (
        <>
            <title>{`Open Banking | ${title}`}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {children}
        </>
    );
};
