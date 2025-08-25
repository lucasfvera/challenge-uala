import { TransactionItemSkeleton } from "@/components/atoms/LoadingSkeletons/TransactionItemSkeleton";
import { TransactionItem } from "@/components/molecules/TransactionItem/TransactionItem";
import { TransactionListEmptyState } from "@/components/organisms/TransactionList/TransactionListEmptyState";
import { Transaction } from "@/services/transactions/types";
import { tryCatch } from "@/utils/tryCatch";
import { Fragment, use } from "react";

interface TransactionListProps {
    asyncTransactions: ReturnType<typeof tryCatch<Transaction[]>>;
}

export const TransactionList = ({
    asyncTransactions,
}: TransactionListProps) => {
    const { data, error } = use(asyncTransactions);

    console.log(data);
    return (
        <div className="overflow-y-auto">
            {data ? (
                data.length > 0 ? (
                    <div className="flex flex-col">
                        {data.map((transaction) => (
                            <Fragment key={transaction.id}>
                                <TransactionItem transaction={transaction} />
                                <div className="w-full border-b border-neutral-border last:hidden"></div>
                            </Fragment>
                        ))}
                    </div>
                ) : (
                    <TransactionListEmptyState />
                )
            ) : (
                <div>{error.message}</div>
            )}
        </div>
    );
};
