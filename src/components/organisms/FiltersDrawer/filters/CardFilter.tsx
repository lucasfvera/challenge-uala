import { useFilterContext } from "@/components/organisms/FiltersDrawer/filterContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const CardFilter = () => {
    const { activeFilters, switchHandler, valueFilterHandler } =
        useFilterContext();

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between">
                <label htmlFor="card-filter-toggle">Tarjeta</label>
                <Switch
                    checked={activeFilters.card.isActive}
                    onCheckedChange={switchHandler("card")}
                    name="card"
                    id="card-filter-toggle"
                />
            </div>
            {activeFilters.card.isActive && (
                <div className="flex gap-3">
                    <Button variant={"outline"}>Todas</Button>
                    <Button
                        variant={"outline"}
                        onClick={() => valueFilterHandler("card")("visa")}
                    >
                        Visa
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() => valueFilterHandler("card")("mastercard")}
                    >
                        Mastercard
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() => valueFilterHandler("card")("amex")}
                    >
                        Amex
                    </Button>
                </div>
            )}
        </div>
    );
};
