import { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ComponentType;
}

export const IconButton = ({
    icon: Icon,
    className,
    children,
    ...props
}: IconButtonProps) => {
    return (
        // TODO: Replace class concat with cva
        <button className={className + " cursor-pointer p-3"} {...props}>
            <Icon />
            {children}
        </button>
    );
};
