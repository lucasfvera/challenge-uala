"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
}

export const PaginationControls = ({
    currentPage,
    totalPages,
}: PaginationControlsProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handlePageChange = (page: number) => {
        if (page === currentPage || page < 1 || page > totalPages) return;

        startTransition(() => {
            // Create new URLSearchParams to preserve other query parameters
            const params = new URLSearchParams(searchParams);
            params.set("page", page.toString());

            // Update URL without full page reload
            router.replace(`?${params.toString()}`, { scroll: false });
        });
    };

    return (
        <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-4xl transition-colors ${
                        page === currentPage
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isPending}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};
