"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { IconButton } from "@/components/atoms/IconButton";
import { DownloadIcon } from "@/components/atoms/Icons/DownloadIcon";
import { DateRange } from "react-day-picker";
import { CalendarIcon } from "@/components/atoms/Icons/CalendarIcon";
import { getTransactionsByDateRange } from "@/services/transactions/actions";
import { toast } from "sonner";

export function DatePickerDemo() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [dateRange, setDateRange] = React.useState<
        { from: Date; to?: Date } | undefined
    >();
    const [isPending, startTransition] = React.useTransition();

    const selectionHandler = (e: DateRange | undefined) => {
        if (!e || !e.from) return;
        setDateRange({ from: e.from, to: e.to });
    };

    const downloadHandler = () => {
        if (!dateRange) return;
        startTransition(async () => {
            console.log(dateRange);
            const transactions = await getTransactionsByDateRange(
                dateRange.from,
                dateRange?.to
            );
            console.log(transactions);
            if (transactions.length === 0)
                toast(
                    "No hay movimientos en las fechas seleccionadas para descargar"
                );
        });
        setIsOpen(false);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <IconButton className="text-primary-blue" icon={DownloadIcon} />
            </PopoverTrigger>
            <PopoverContent
                // alignOffset={-200}
                align="end"
                className="w-auto py-4 px-0"
            >
                <div className="flex mx-5 gap-3 max-w-[243px] items-center">
                    <CalendarIcon />
                    <h1 className="text-body-lg text-neutral-hard-gray font-semibold text-wrap max-w-[199px]">
                        Elegí las fechas que querés descargar
                    </h1>
                </div>
                <Calendar
                    mode="range"
                    defaultMonth={new Date()}
                    min={1}
                    selected={dateRange}
                    onSelect={selectionHandler}
                    className="m-auto"
                />
                <div className="flex w-full gap-4 items-center justify-center">
                    <Button
                        onClick={() => setIsOpen(false)}
                        variant={"outline"}
                    >
                        Cerrar
                    </Button>
                    <Button onClick={downloadHandler}>Descargar</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
