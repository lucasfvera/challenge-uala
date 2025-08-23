"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface TabProps {
    children: string;
    isActive?: boolean;
    param: string;
}

export const Tab = ({ children, isActive, param }: TabProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        if (isActive) return;

        startTransition(() => {
            const params = new URLSearchParams(searchParams);
            params.set("period", param);
            // Reset page when changing period
            params.delete("page");

            router.replace(`?${params.toString()}`, { scroll: false });
        });
    };

    const activeClass = isActive
        ? "font-bold"
        : "hover:bg-gray-50 cursor-pointer";
    const pendingClass = isPending ? "opacity-50 cursor-not-allowed" : "";

    return (
        <button
            onClick={handleClick}
            disabled={isPending}
            className={`text-label-md py-3.5 px-7.5 text-light-gray ${activeClass} ${pendingClass}`}
        >
            {children}
            {isActive && (
                <span className="block w-2 h-2 rounded-2xl bg-primary-blue mt-3 mx-auto"></span>
            )}
        </button>
    );
};
