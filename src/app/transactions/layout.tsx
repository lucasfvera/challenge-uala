import { Sidebar } from "@/components/molecules/Sidebar/Sidebar";

export default function TransactionsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Sidebar />
            {children}
        </>
    );
}
