import Link from "next/link";

export default function TransactionsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link href={"/transactions/home"}>Home</Link>
                    </li>
                    <li>
                        <Link href={"/transactions/metrics"}>Metrics</Link>
                    </li>
                </ul>
            </nav>
            {children}
        </div>
    );
}
