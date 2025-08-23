interface HeaderProps {
    children: string;
}

// Tus cobros
export const Header = ({ children }: HeaderProps) => (
    <h1 className="text-body-lg font-semibold pt-8 px-7.5 sm:px-14 text-neutral-hard-gray">
        {children}
    </h1>
);
