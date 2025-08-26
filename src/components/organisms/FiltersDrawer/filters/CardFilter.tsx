import { CardAltIcon } from "@/components/atoms/Icons/CardAltIcon";
import { useFilterContext } from "@/components/organisms/FiltersDrawer/filterContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const CardFilter = () => {
    const { activeFilters, switchHandler, valueFilterHandler } =
        useFilterContext();

    const isFilterSelected = (val: string) => activeFilters.card.value === val;

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between py-3 px-2">
                <div className="flex gap-2 items-center text-neutral-gray">
                    <CardAltIcon />
                    <label
                        className={
                            "text-label-md font-bold text-neutral-hard-gray"
                        }
                        htmlFor="card-filter-toggle"
                    >
                        Tarjeta
                    </label>
                </div>
                <Switch
                    checked={activeFilters.card.isActive}
                    onCheckedChange={switchHandler("card")}
                    name="card"
                    id="card-filter-toggle"
                />
            </div>
            {activeFilters.card.isActive && (
                <div className="flex gap-3 justify-center">
                    <Button
                        variant={"outline"}
                        onClick={() => valueFilterHandler("card")("")}
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
                        onClick={() => valueFilterHandler("card")("visa")}
                        className={
                            isFilterSelected("visa")
                                ? "bg-primary-blue-lighter"
                                : ""
                        }
                        disabled={isFilterSelected("visa")}
                    >
                        Visa
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() => valueFilterHandler("card")("mastercard")}
                        className={
                            isFilterSelected("mastercard")
                                ? "bg-primary-blue-lighter"
                                : ""
                        }
                        disabled={isFilterSelected("mastercard")}
                    >
                        Mastercard
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() => valueFilterHandler("card")("amex")}
                        className={
                            isFilterSelected("amex")
                                ? "bg-primary-blue-lighter"
                                : ""
                        }
                        disabled={isFilterSelected("amex")}
                    >
                        Amex
                    </Button>
                </div>
            )}
        </div>
    );
};
