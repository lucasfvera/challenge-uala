import MetricsEmptyIcon from "@/assets/icons/metrics-empty.svg";
import Image from "next/image";

export const MetricsEmptyState = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-4 max-w-[320px] m-auto h-full sm:my-8">
            <Image src={MetricsEmptyIcon} alt="" />
            <p className="text-title-md text-neutral-gray text-center">
                Estamos construyendo las métricas. Pronto tendrás acceso a
                análisis detallados de tus transacciones.
            </p>
        </div>
    );
};
