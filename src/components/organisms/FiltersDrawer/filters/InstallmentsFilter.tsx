import { useFilterContext } from "@/components/organisms/FiltersDrawer/filterContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const InstallmentsFilter = () => {
    const { activeFilters, switchHandler, valueFilterHandler } =
        useFilterContext();

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between">
                <label htmlFor="installments-filter-toggle">Cuotas</label>
                <Switch
                    checked={activeFilters.installments.isActive}
                    onCheckedChange={switchHandler("installments")}
                    name="installments"
                    id="installments-filter-toggle"
                />
            </div>
            <div className="flex gap-3">
                {activeFilters.installments.isActive && (
                    <div className="flex gap-3">
                        <Button variant={"outline"}>Todas</Button>
                        <Button
                            variant={"outline"}
                            onClick={() =>
                                valueFilterHandler("installments")("1")
                            }
                        >
                            1
                        </Button>
                        <Button
                            variant={"outline"}
                            onClick={() =>
                                valueFilterHandler("installments")("2")
                            }
                        >
                            2
                        </Button>
                        <Button
                            variant={"outline"}
                            onClick={() =>
                                valueFilterHandler("installments")("3")
                            }
                        >
                            3
                        </Button>
                        <Button
                            variant={"outline"}
                            onClick={() =>
                                valueFilterHandler("installments")("6")
                            }
                        >
                            6
                        </Button>
                        <Button
                            variant={"outline"}
                            onClick={() =>
                                valueFilterHandler("installments")("12")
                            }
                        >
                            12
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
