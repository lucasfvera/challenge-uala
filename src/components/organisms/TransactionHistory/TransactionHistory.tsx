import { TransactionListSkeleton } from "@/components/atoms/LoadingSkeletons/TransactionListSkeleton";
import { buildFiltersFromQueryParams } from "@/components/organisms/FiltersDrawer/buildFilters";
import { FiltersDrawer } from "@/components/organisms/FiltersDrawer/FiltersDrawer";
import { TransactionList } from "@/components/organisms/TransactionList/TransactionList";
import { DatePicker } from "@/components/ui/datePicker";
import { getTransactions } from "@/services/transactions/actions";
import { tryCatch } from "@/utils/tryCatch";
import { Suspense } from "react";

export const TransactionHistory = ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) => {
    const filters = buildFiltersFromQueryParams(searchParams);
    const asyncTransactions = tryCatch(getTransactions({ filters }));
    return (
        <div className="grid grid-rows-[auto_1fr] gap-2 flex-1 min-h-0">
            <div className="flex items-center">
                <h2 className="text-label-md font-bold flex-1">
                    Historial de transacciones
                </h2>
                <FiltersDrawer />
                <DatePicker />
            </div>
            <Suspense fallback={<TransactionListSkeleton />}>
                <TransactionList asyncTransactions={asyncTransactions} />
            </Suspense>
        </div>
    );
};
