import { Sidebar } from "@/components/molecules/Sidebar/Sidebar";

export default function TransactionsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col md:flex-row h-full relative">
            <Sidebar />
            <div className="flex-1 w-full bg-[#fafafa] pt-(--top-navigation-height) md:pt-0">
                {children}
            </div>
        </div>
    );
}
