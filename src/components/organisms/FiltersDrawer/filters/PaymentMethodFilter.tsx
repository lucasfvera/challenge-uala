import { useFilterContext } from "@/components/organisms/FiltersDrawer/filterContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PaymentMethod } from "@/services/transactions/types";

export const PaymentMethodFilter = () => {
    const { activeFilters, switchHandler, valueFilterHandler } =
        useFilterContext();

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between">
                <label htmlFor="paymentMethod-filter-toggle">
                    Métodos de cobro
                </label>
                <Switch
                    checked={activeFilters.paymentMethod.isActive}
                    onCheckedChange={switchHandler("paymentMethod")}
                    name="paymentMethod"
                    id="paymentMethod-filter-toggle"
                />
            </div>
            {activeFilters.paymentMethod.isActive && (
                <div className="flex gap-3">
                    <Button
                        variant={"outline"}
                        onClick={() =>
                            valueFilterHandler("paymentMethod")("link")
                        }
                    >
                        {PaymentMethod.link}
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() =>
                            valueFilterHandler("paymentMethod")("qr")
                        }
                    >
                        {PaymentMethod.qr}
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() =>
                            valueFilterHandler("paymentMethod")("mpos")
                        }
                    >
                        {PaymentMethod.mpos}
                    </Button>
                    <Button
                        variant={"outline"}
                        onClick={() =>
                            valueFilterHandler("paymentMethod")("pospro")
                        }
                    >
                        {PaymentMethod.pospro}
                    </Button>
                </div>
            )}
        </div>
    );
};
