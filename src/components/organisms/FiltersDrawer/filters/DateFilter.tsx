import { CalendarRowIcon } from "@/components/atoms/Icons/CalendarRowIcon";
import { useFilterContext } from "@/components/organisms/FiltersDrawer/filterContext";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { DateRange } from "react-day-picker";

export const DateFilter = () => {
    const { activeFilters, switchHandler, rangeFilterHandler } =
        useFilterContext();

    const selectedFromDate = activeFilters.date.value.from
        ? new Date(activeFilters.date.value.from)
        : undefined;
    const selectedToDate = activeFilters.date.value.to
        ? new Date(activeFilters.date.value.to)
        : undefined;

    const handleSelect = (dateRange: DateRange | undefined) => {
        const rangeFrom = dateRange?.from ? format(dateRange.from, "P") : "";
        const rangeTo = dateRange?.to ? format(dateRange.to, "P") : "";
        rangeFilterHandler("date")({
            from: rangeFrom || "",
            to: rangeTo || "",
        });
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between py-3 px-2">
                <div className="flex gap-2 items-center text-neutral-gray">
                    <CalendarRowIcon />
                    <label
                        className={
                            "text-label-md font-bold text-neutral-hard-gray"
                        }
                        htmlFor="date-filter-toggle"
                    >
                        Fecha
                    </label>
                </div>
                <Switch
                    checked={activeFilters.date.isActive}
                    onCheckedChange={switchHandler("date")}
                    name="date"
                    id="date-filter-toggle"
                />
            </div>
            {activeFilters.date.isActive && (
                <Calendar
                    locale={es}
                    mode="range"
                    defaultMonth={new Date()}
                    min={1}
                    selected={{
                        from: selectedFromDate,
                        to: selectedToDate,
                    }}
                    onSelect={handleSelect}
                    className="m-auto"
                />
            )}
        </div>
    );
};
