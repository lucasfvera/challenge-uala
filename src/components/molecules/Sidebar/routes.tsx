import { HomeIcon } from "@/components/atoms/HomeIcon";
import Image from "next/image";

export interface Route {
    path: string;
    icon?: React.ReactNode;
    label: string;
}

export const PATHS = {
    home: "/transactions/home",
    metrics: "/transactions/metrics",
};

export const routes: Route[] = [
    {
        label: "Inicio",
        icon: <HomeIcon />,
        path: PATHS.home,
    },
    {
        label: "Métricas",
        icon: <HomeIcon />,
        path: PATHS.metrics,
    },
] as const;
