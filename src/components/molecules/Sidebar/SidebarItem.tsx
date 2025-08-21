"use client";

import Link from "next/link";
import type { Route } from "@/components/molecules/Sidebar/routes";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
    route: Route;
}

export const SidebarLink = ({ route }: SidebarItemProps) => {
    const path = usePathname();
    const isActive = path === route.path;
    const itemColor = isActive ? "text-blue-500" : "text-inherit";

    return (
        <li className={`hover:bg-gray-50 ${itemColor}`}>
            <Link
                className="py-3 px-5 flex gap-4 text-current text-label-md items-center"
                href={route.path}
            >
                {route.icon && route.icon}
                {route.label}
            </Link>
        </li>
    );
};
