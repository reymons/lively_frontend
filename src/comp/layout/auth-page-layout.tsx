import cn from "classnames";
import { Link } from "react-router";
import Heading from "@ui/heading";
import sl from "./auth-page-layout.module.scss";

type Props = {
    heading: string;
    form: React.ReactNode;
    hint: {
        text: string;
        link: {
            href: string;
            text: string;
        };
    };
    children: React.ReactNode;
};

export default function AuthPageLayout({ children, heading, hint, form }: Props) {
    return (
        <main className={cn(sl.wrapper, "cnt")}>
            <Heading>{heading}</Heading>
            {!!form && (
                <div className={sl.formWrapper}>
                    {form}
                    <div className={sl.hint}>
                        {hint.text} <Link to={hint.link.href}>{hint.link.text}</Link>
                    </div>
                </div>
            )}
            {children}
        </main>
    );
}
