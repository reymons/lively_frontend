import cn from "classnames";
import { useId } from "react";
import { type UseFormRegisterReturn } from "react-hook-form";
import { FormField, FormFieldExtProps } from "./form-field";
import sl from "./input.module.scss";

type InputProps = React.JSX.IntrinsicElements["input"];

type RawProps = {
    type?: InputProps["type"];
    autoComplete?: InputProps["autoComplete"];
    placeholder: string;
    beforeEnd?: React.ReactNode;
    reg: UseFormRegisterReturn;
    style?: React.CSSProperties;
    invalid?: boolean;
    "aria-labelledby"?: string;
};

type Props = FormFieldExtProps & Omit<RawProps, "aria-labelledby" | "invalid">;

export const InputRaw = ({
    type,
    autoComplete,
    placeholder,
    beforeEnd,
    invalid,
    reg,
    style,
    ...rest
}: RawProps) => {
    return (
        <div className={cn(sl.wrapper, invalid && sl.error)}>
            <input
                style={style}
                type={type}
                placeholder={placeholder}
                aria-invalid={invalid}
                autoComplete={autoComplete}
                {...rest}
                {...reg}
            />
            {beforeEnd}
        </div>
    );
};

export const Input = ({ error, label, ...rest }: Props) => {
    const labelId = useId();

    return (
        <FormField error={error} label={label} labelId={labelId}>
            <InputRaw {...rest} aria-labelledby={labelId} invalid={!!error} />
        </FormField>
    );
};

type WithSideContentProps = Omit<Props, "beforeEnd"> & {
    pr: number | string;
    side: React.ReactNode;
};

const WithSideContent: React.FC<WithSideContentProps> = ({ pr, style, side, ...rest }) => {
    return (
        <Input
            {...rest}
            style={{ ...style, paddingRight: pr }}
            beforeEnd={<div className={sl.sideContent}>{side}</div>}
        />
    );
};

WithSideContent.displayName = "Input.WithSideContent";

Input.WithSideContent = WithSideContent;
