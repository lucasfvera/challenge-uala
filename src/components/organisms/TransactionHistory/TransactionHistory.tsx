import { IconButton } from "@/components/atoms/IconButton";
import { DownloadIcon } from "@/components/atoms/Icons/DownloadIcon";
import { FilterIcon } from "@/components/atoms/Icons/FilterIcon";
import { TransactionList } from "@/components/organisms/TransactionList/TransactionList";
import { getTransactions } from "@/services/transactions/actions";
import { tryCatch } from "@/utils/tryCatch";
import { Suspense } from "react";

export const TransactionHistory = () => {
    const asyncTransactions = tryCatch(getTransactions());

    return (
        <div className="grid grid-rows-[auto_1fr] gap-2 flex-1 min-h-0">
            <div className="flex items-center">
                <h2 className="text-label-md font-bold flex-1">
                    Historial de transacciones
                </h2>
                <IconButton className="text-primary-blue" icon={FilterIcon} />
                <IconButton className="text-primary-blue" icon={DownloadIcon} />
            </div>
            <Suspense fallback={"Loading..."}>
                <TransactionList asyncTransactions={asyncTransactions} />
            </Suspense>
        </div>
    );
};
