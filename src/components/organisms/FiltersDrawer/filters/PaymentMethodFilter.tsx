import { CategoriesIcon } from "@/components/atoms/Icons/CategoriesIcon";
import { useFilterContext } from "@/components/organisms/FiltersDrawer/filterContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PaymentMethod } from "@/services/transactions/types";

export const PaymentMethodFilter = () => {
    const { activeFilters, switchHandler, valueFilterHandler } =
        useFilterContext();

    const isFilterSelected = (val: string) =>
        activeFilters.paymentMethod.value === val;

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between py-3 px-2">
                <div className="flex gap-2 items-center text-neutral-gray">
                    <CategoriesIcon />
                    <label
                        className={
                            "text-label-md font-bold text-neutral-hard-gray"
                        }
                        htmlFor="paymentMethod-filter-toggle"
                    >
                        Métodos de cobro
                    </label>
                </div>
                <Switch
                    checked={activeFilters.paymentMethod.isActive}
                    onCheckedChange={switchHandler("paymentMethod")}
                    name="paymentMethod"
                    id="paymentMethod-filter-toggle"
                />
            </div>
            {activeFilters.paymentMethod.isActive && (
                <div className="flex gap-3 justify-center">
                    <Button
                        variant={"outline"}
                        onClick={() =>
                            valueFilterHandler("paymentMethod")("link")
                        }
                        className={
                            isFilterSelected("link")
                                ? "bg-primary-blue-lighter"
                                : ""
                        }
                        disabled={isFilterSelected("link")}
                    >
                        {PaymentMethod.link}
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() =>
                            valueFilterHandler("paymentMethod")("qr")
                        }
                        className={
                            isFilterSelected("qr")
                                ? "bg-primary-blue-lighter"
                                : ""
                        }
                        disabled={isFilterSelected("qr")}
                    >
                        {PaymentMethod.qr}
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() =>
                            valueFilterHandler("paymentMethod")("mpos")
                        }
                        className={
                            isFilterSelected("mpos")
                                ? "bg-primary-blue-lighter"
                                : ""
                        }
                        disabled={isFilterSelected("mpos")}
                    >
                        {PaymentMethod.mpos}
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() =>
                            valueFilterHandler("paymentMethod")("pospro")
                        }
                        className={
                            isFilterSelected("pospro")
                                ? "bg-primary-blue-lighter"
                                : ""
                        }
                        disabled={isFilterSelected("pospro")}
                    >
                        {PaymentMethod.pospro}
                    </Button>
                </div>
            )}
        </div>
    );
};
