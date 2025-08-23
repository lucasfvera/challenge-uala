import { TransactionItemSkeleton } from "@/components/atoms/LoadingSkeletons/TransactionItemSkeleton";

export const TransactionListSkeleton = () => (
    <div className="overflow-y-auto">
        <div className="flex flex-col">
            {Array.from(Array(10).keys()).map((el) => (
                <TransactionItemSkeleton key={el} />
            ))}
        </div>
    </div>
);
