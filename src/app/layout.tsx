import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
    variable: "--font-public-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Ualá Transactions Board",
    description: "Browse your transactions in Ualá",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className="h-full" lang="en">
            <body
                className={`w-full h-full ${publicSans.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
