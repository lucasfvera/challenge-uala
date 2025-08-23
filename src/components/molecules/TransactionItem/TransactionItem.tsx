import { StoreIcon } from "@/components/atoms/Icons/StoreIcon";
import { PaymentMethod, Transaction } from "@/services/transactions/types";

interface TransactionItemProps {
    transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
    return (
        <div className="flex gap-2 px-2 py-3">
            <StoreIcon />
            <div className="flex-1">
                <p className="text-label-md font-bold text-neutral-hard-gray">
                    {PaymentMethod[transaction.paymentMethod]}
                </p>
                <p className="text-label-md text-neutral-gray">Venta</p>
            </div>
            <div>
                <p className="text-label-md font-bold text-right text-dark-green">
                    + ${transaction.amount}
                </p>
                <p className="text-label-md text-right text-neutral-gray">
                    {formatDate(transaction.createdAt)}
                </p>
            </div>
        </div>
    );
};

/**
 * Simple method to format date from "YYYY-MM-DDT00:00:00Z" to "YYYY/MM/DD"
 * @param fullDate Date string formatted like YYYY-MM-DDT00:00:00Z
 * @returns The date formatted as YYYY/MM/DD
 */
function formatDate(fullDate: string) {
    const date = fullDate.split("T")[0].replace(/-/g, "/");
    return date;
}
