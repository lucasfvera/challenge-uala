import {
    ActiveFilterState,
    RangeFilters,
    ValueFilters,
} from "@/components/organisms/FiltersDrawer/FiltersDrawer";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export const FilterContext = createContext<{
    activeFilters: ActiveFilterState;
    setActiveFilters: Dispatch<SetStateAction<ActiveFilterState>>;
    switchHandler: (target: keyof ActiveFilterState) => (e: boolean) => void;
    valueFilterHandler: (target: ValueFilters) => (value: string) => void;
    rangeFilterHandler: (
        target: RangeFilters
    ) => (value: { from: string; to: string }) => void;
} | null>(null);

export const useFilterContext = () => {
    const ctx = useContext(FilterContext);
    if (ctx === null) throw new Error("Filter context not initialized");
    return ctx;
};
