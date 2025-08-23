import SearchGlass from "@/assets/icons/small-empty-busqueda.svg";
import Image from "next/image";

export const TransactionListEmptyState = () => {
    return (
        <div className="flex flex-col justify-center items-center gap-4 max-w-[320px] m-auto my-6 sm:my-8">
            <Image src={SearchGlass} alt="" />
            <p className="text-body-md text-neutral-gray text-center">
                No hay resultados que mostrar. Podés probar usando los filtros.
            </p>
        </div>
    );
};
