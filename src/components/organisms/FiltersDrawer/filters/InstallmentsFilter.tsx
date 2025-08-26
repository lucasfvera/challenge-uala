import { ProgramDepositIcon } from "@/components/atoms/Icons/ProgramDepositIcon";
import { useFilterContext } from "@/components/organisms/FiltersDrawer/filterContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const InstallmentsFilter = () => {
    const { activeFilters, switchHandler, valueFilterHandler } =
        useFilterContext();

    const isFilterSelected = (val: string) =>
        activeFilters.installments.value === val;

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between py-3 px-2">
                <div className="flex gap-2 items-center text-neutral-gray">
                    <ProgramDepositIcon />
                    <label
                        className={
                            "text-label-md font-bold text-neutral-hard-gray"
                        }
                        htmlFor="installments-filter-toggle"
                    >
                        Cuotas
                    </label>
                </div>
                <Switch
                    checked={activeFilters.installments.isActive}
                    onCheckedChange={switchHandler("installments")}
                    name="installments"
                    id="installments-filter-toggle"
                />
            </div>
            {activeFilters.installments.isActive && (
                <div className="flex gap-3 justify-center">
                    <Button
                        variant={"outline"}
                        onClick={() => valueFilterHandler("installments")("")}
                        className={
                            isFilterSelected("")
                                ? "bg-primary-blue-lighter"
                                : ""
                        }
                        disabled={isFilterSelected("")}
                    >
                        Todas
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() => valueFilterHandler("installments")("1")}
                        className={
                            isFilterSelected("1")
                                ? "bg-primary-blue-lighter"
                                : ""
                        }
                        disabled={isFilterSelected("1")}
                    >
                        1
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() => valueFilterHandler("installments")("2")}
                        className={
                            isFilterSelected("2")
                                ? "bg-primary-blue-lighter"
                                : ""
                        }
                        disabled={isFilterSelected("2")}
                    >
                        2
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() => valueFilterHandler("installments")("3")}
                        className={
                            isFilterSelected("3")
                                ? "bg-primary-blue-lighter"
                                : ""
                        }
                        disabled={isFilterSelected("3")}
                    >
                        3
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() => valueFilterHandler("installments")("6")}
                        className={
                            isFilterSelected("6")
                                ? "bg-primary-blue-lighter"
                                : ""
                        }
                        disabled={isFilterSelected("6")}
                    >
                        6
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() => valueFilterHandler("installments")("12")}
                        className={
                            isFilterSelected("12")
                                ? "bg-primary-blue-lighter"
                                : ""
                        }
                        disabled={isFilterSelected("12")}
                    >
                        12
                    </Button>
                </div>
            )}
        </div>
    );
};
