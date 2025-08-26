import { Header } from "@/components/atoms/Header";
import { AnalyzeIcon } from "@/components/atoms/Icons/AnalyzeIcon";
import { PaymentSummary } from "@/components/organisms/PaymentSummary/PaymentSummary";
import { TransactionHistory } from "@/components/organisms/TransactionHistory/TransactionHistory";
import { getValidPeriod } from "@/services/transactions/validation";
import Link from "next/link";

export default async function TransactionsHome({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    // TODO: When implementing pagination, pass down the page to the action
    // const pageParam = (await searchParams).page ?? "";
    // const page = isNaN(parseInt(pageParam)) ? 1 : parseInt(pageParam);
    // const asyncTransactions = tryCatch(getTransactions());
    const resolvedParams = await searchParams;
    const period = getValidPeriod(resolvedParams.period || null, "week");
    return (
        <div className="flex flex-col gap-6 h-full max-h-full overflow-hidden max-w-[440px] mx-auto">
            <Header>Tus cobros</Header>
            <div className="flex flex-col items-center gap-4 ">
                <PaymentSummary period={period} />
                <Link
                    href={"/transactions/metrics"}
                    className="flex gap-1 px-4 py-3 text-primary-blue"
                >
                    <AnalyzeIcon /> Ver métricas
                </Link>
            </div>
            <TransactionHistory searchParams={resolvedParams} />
        </div>
    );
}
