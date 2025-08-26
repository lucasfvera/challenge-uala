"use client";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { FilterIcon } from "@/components/atoms/Icons/FilterIcon";
import { IconButton } from "@/components/atoms/IconButton";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FilterContext } from "@/components/organisms/FiltersDrawer/filterContext";
import { CardFilter } from "@/components/organisms/FiltersDrawer/filters/CardFilter";
import { InstallmentsFilter } from "@/components/organisms/FiltersDrawer/filters/InstallmentsFilter";
import { AmountFilter } from "@/components/organisms/FiltersDrawer/filters/AmountFilter";
import { PaymentMethodFilter } from "@/components/organisms/FiltersDrawer/filters/PaymentMethodFilter";
import { DateFilter } from "@/components/organisms/FiltersDrawer/filters/DateFilter";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { buildFiltersFromQueryParams } from "@/components/organisms/FiltersDrawer/buildFilters";
import { FiltersType } from "@/services/transactions/actions";
import { LeftIcon } from "@/components/atoms/Icons/LeftIcon";

export type RangeFilters = "date" | "amount";
export type ValueFilters = "card" | "installments" | "paymentMethod";
type Filters = RangeFilters | ValueFilters;

export type ActiveFilterState = {
    [K in Filters]: K extends RangeFilters
        ? {
              isActive: boolean;
              value: { from?: string; to?: string };
          }
        : {
              isActive: boolean;
              value: string;
          };
};

const INITIAL_STATE = {
    date: {
        isActive: false,
        value: {
            from: undefined,
            to: undefined,
        },
    },
    card: {
        isActive: false,
        value: "",
    },
    installments: {
        isActive: false,
        value: "",
    },
    amount: {
        isActive: false,
        value: {
            from: undefined,
            to: undefined,
        },
    },
    paymentMethod: {
        isActive: false,
        value: "",
    },
};

export function FiltersDrawer() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeFilters, setActiveFilters] =
        useState<ActiveFilterState>(INITIAL_STATE);
    const [open, setOpen] = useState(false);
    const hasFilterApplied = Object.keys(activeFilters).some(
        (key) => activeFilters[key as keyof typeof activeFilters].isActive
    );

    useEffect(() => {
        const jsonParams = {};
        for (const [key, value] of searchParams) {
            // @ts-expect-error False positive since we are adding an attribute to an empty object
            jsonParams[key] = value;
        }
        const filters = buildFiltersFromQueryParams(jsonParams);
        const activeFilters: Partial<ActiveFilterState> = {};
        for (const key in filters) {
            activeFilters[key as keyof ActiveFilterState] = {
                isActive: true,
                //@ts-expect-error We know that the value from filters fits the type since we built it manually from the builder fn
                value: filters[key as keyof FiltersType],
            };
        }
        setActiveFilters((prev) => ({ ...prev, ...activeFilters }));
    }, []);

    const switchHandler = (target: keyof ActiveFilterState) => (e: boolean) => {
        setActiveFilters((prev) => ({
            ...prev,
            [target]: {
                ...prev[target],
                isActive: e,
            },
        }));
    };
    const valueFilterHandler = (target: ValueFilters) => (value: string) =>
        setActiveFilters((prev) => ({
            ...prev,
            [target]: {
                ...prev[target],
                value: value,
            },
        }));
    const rangeFilterHandler =
        (target: RangeFilters) => (value: { from?: string; to?: string }) =>
            setActiveFilters((prev) => ({
                ...prev,
                [target]: {
                    ...prev[target],
                    value: { from: value.from, to: value.to },
                },
            }));
    const clearFilters = () => {
        setActiveFilters(INITIAL_STATE);
        const params = new URLSearchParams(searchParams);

        for (const key in activeFilters) {
            const typedKey = key as keyof typeof activeFilters;
            if (typedKey === "date" || typedKey === "amount") {
                params.delete(`${typedKey}From`);
                params.delete(`${typedKey}To`);
            } else {
                params.delete(typedKey);
            }
        }
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    const handleApplyFilters = () => {
        const params = new URLSearchParams(searchParams);
        for (const key in activeFilters) {
            const typedKey = key as keyof typeof activeFilters;
            if (activeFilters[typedKey].isActive) {
                const filterValue = activeFilters[typedKey].value;
                if (typeof filterValue === "string") {
                    // Quick fix for submitting "all" filter
                    if (!filterValue) {
                        params.delete(key);
                        continue;
                    }
                    params.set(key, filterValue);
                } else {
                    const from = filterValue.from;
                    const to = filterValue.to;
                    from && params.set(`${key}From`, from);
                    to && params.set(`${key}To`, to);
                }
            } else {
                if (key === "date" || key === "amount") {
                    params.delete(`${key}From`);
                    params.delete(`${key}To`);
                } else {
                    params.delete(key);
                }
            }
        }
        // TODO: Reset page when changing period
        // params.delete("page");
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    return (
        <FilterContext
            value={{
                activeFilters,
                setActiveFilters,
                switchHandler,
                valueFilterHandler,
                rangeFilterHandler,
            }}
        >
            <Drawer direction={"right"} open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <IconButton
                        className="text-primary-blue"
                        icon={FilterIcon}
                    />
                </DrawerTrigger>
                <DrawerContent className="p-12 pb-0">
                    <DrawerHeader className="text-left p-0">
                        <DrawerTitle className="text-primary-blue p-0">
                            <Button
                                variant="link"
                                onClick={() => setOpen(false)}
                                className="w-max p-0"
                            >
                                <LeftIcon />
                                <p className="shrink-1 text-body-lg font-semibold text-neutral-light-gray">
                                    Filtros
                                </p>
                            </Button>
                            {/* <LeftIcon />
                            <p className="text-body-lg font-semibold text-neutral-light-gray">
                                Filtros
                            </p> */}
                        </DrawerTitle>
                    </DrawerHeader>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between py-3.5">
                            <p className="text-body-lg font-semibold">
                                Todos los filtros
                            </p>
                            <Button
                                className="text-button-lg text-primary-blue"
                                onClick={clearFilters}
                                variant={"link"}
                                disabled={!hasFilterApplied}
                            >
                                Limpiar
                            </Button>
                        </div>

                        <div>
                            <DateFilter />
                            <CardFilter />
                            <InstallmentsFilter />
                            <AmountFilter />
                            <PaymentMethodFilter />
                        </div>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button
                                onClick={handleApplyFilters}
                                disabled={!hasFilterApplied}
                                size={"lg"}
                            >
                                Aplicar filtros
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </FilterContext>
    );
}
