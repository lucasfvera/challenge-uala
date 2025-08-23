import { Tab } from "@/components/molecules/Tab/Tab";
import { SummaryValue } from "@/components/organisms/PaymentSummary/SummaryValue";
import { getTransactionsByPeriod } from "@/services/transactions/actions";
import { Period } from "@/services/transactions/validation";
import { tryCatch } from "@/utils/tryCatch";
import { Suspense } from "react";

export const PaymentSummary = ({ period }: { period: Period }) => {
    // const searchParams = useSearchParams();
    // const period = searchParams.get('period') as "day" | "week" | "month"
    // if(period !== "day" || period !== "week" || period !== "month")
    const asyncTransactions = tryCatch(
        getTransactionsByPeriod(period || "week")
    );

    return (
        <>
            <div className="flex items-center w-full justify-evenly">
                <Tab param="day" isActive={period === "day"}>
                    Diario
                </Tab>
                <Tab param="week" isActive={period === "week"}>
                    Semanal
                </Tab>
                <Tab param="month" isActive={period === "month"}>
                    Mensual
                </Tab>
            </div>
            <Suspense fallback={"Loading value..."}>
                <SummaryValue
                    key={period}
                    asyncTransactions={asyncTransactions}
                />
            </Suspense>
        </>
    );
};
