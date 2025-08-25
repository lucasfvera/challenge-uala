import { IconButton } from "@/components/atoms/IconButton";
import { FilterIcon } from "@/components/atoms/Icons/FilterIcon";
import { TransactionListSkeleton } from "@/components/atoms/LoadingSkeletons/TransactionListSkeleton";
import { TransactionList } from "@/components/organisms/TransactionList/TransactionList";
import { DatePickerDemo } from "@/components/ui/datePicker";
import { getTransactions } from "@/services/transactions/actions";
import { tryCatch } from "@/utils/tryCatch";
import { Suspense } from "react";

export const TransactionHistory = () => {
    const asyncTransactions = tryCatch(
        getTransactions({
            filters: {
                card: "mastercard",
                // installments: 3,
                // paymentMethod: "qr",
                // amount: { from: 600, to: 3000 },
                date: { from: new Date(2025, 1, 1), to: new Date(2025, 1, 27) },
            },
        })
    );

    return (
        <div className="grid grid-rows-[auto_1fr] gap-2 flex-1 min-h-0">
            <div className="flex items-center">
                <h2 className="text-label-md font-bold flex-1">
                    Historial de transacciones
                </h2>

                <IconButton className="text-primary-blue" icon={FilterIcon} />
                <DatePickerDemo />
            </div>
            <Suspense fallback={<TransactionListSkeleton />}>
                <TransactionList asyncTransactions={asyncTransactions} />
            </Suspense>
        </div>
    );
};
