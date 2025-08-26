import { CommissionIcon } from "@/components/atoms/Icons/CommissionIcon";
import { useFilterContext } from "@/components/organisms/FiltersDrawer/filterContext";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export const AmountFilter = () => {
    const { activeFilters, switchHandler, rangeFilterHandler } =
        useFilterContext();

    const startValueRaw = parseInt(activeFilters.amount.value.from || "0");
    const startValue = !isNaN(startValueRaw) ? startValueRaw : 0;
    const endValueRaw = parseInt(activeFilters.amount.value.to || "1000");
    const endValue = !isNaN(endValueRaw) ? endValueRaw : 1000;

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between py-3 px-2">
                <div className="flex gap-2 items-center text-neutral-gray">
                    <CommissionIcon />
                    <label
                        className={
                            "text-label-md font-bold text-neutral-hard-gray"
                        }
                        htmlFor="amount-filter-toggle"
                    >
                        Monto
                    </label>
                </div>
                <Switch
                    checked={activeFilters.amount.isActive}
                    onCheckedChange={(val) => {
                        switchHandler("amount")(val);
                        // Quick fix for initial/default state when no values where selected
                        if (
                            (val && !activeFilters.amount.value.from) ||
                            !activeFilters.amount.value.to
                        ) {
                            rangeFilterHandler("amount")({
                                from: startValue.toString(),
                                to: endValue.toString(),
                            });
                        }
                    }}
                    name="amount"
                    id="amount-filter-toggle"
                />
            </div>
            <div className="flex gap-3">
                {activeFilters.amount.isActive && (
                    <div className="flex flex-col gap-2 w-full px-16">
                        <Slider
                            value={[startValue, endValue]}
                            onValueChange={(val) =>
                                rangeFilterHandler("amount")({
                                    from: val[0].toString(),
                                    to: val[1].toString(),
                                })
                            }
                            min={0}
                            max={2000}
                            step={1}
                            onPointerDown={(e) => {
                                e.stopPropagation();
                            }}
                        />
                        <div className="flex justify-between">
                            <div className="relative">
                                <Input
                                    type="number"
                                    className="h-[38px] w-[100px] z-10 pb-0"
                                    value={
                                        activeFilters.amount.value.from ||
                                        startValue
                                    }
                                    onChange={(e) =>
                                        rangeFilterHandler("amount")({
                                            from: e.target.value,
                                            to: activeFilters.amount.value.to,
                                        })
                                    }
                                />
                                <span className="absolute left-[14px] top-0 text-label-xs w-fit h-fit">
                                    Monto mínimo
                                </span>
                            </div>
                            <div className="relative">
                                <Input
                                    type="number"
                                    className="h-[38px] w-[100px] z-10 pb-0"
                                    value={
                                        activeFilters.amount.value.to ||
                                        endValue
                                    }
                                    onChange={(e) =>
                                        rangeFilterHandler("amount")({
                                            from: activeFilters.amount.value
                                                .from,
                                            to: e.target.value,
                                        })
                                    }
                                />
                                <span className="absolute left-[14px] top-0 text-label-xs w-fit h-fit">
                                    Monto máximo
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
