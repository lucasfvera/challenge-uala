"use client";

import { BurgerMenuIcon } from "@/components/atoms/Icons/BurgerMenuIcon";
import { IconButton } from "@/components/atoms/IconButton";
import { SidebarContent } from "@/components/molecules/Sidebar/SidebarContent";
import { SidebarFooter } from "@/components/molecules/Sidebar/SidebarFooter";
import { SidebarHeader } from "@/components/molecules/Sidebar/SidebarHeader";
import Image from "next/image";
import UalaLogo from "@/assets/uala-tipo.svg";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const path = usePathname();
    const sidebarRef = useRef<HTMLElement>(null);
    const openClass = isOpen ? "-left-[0]" : `-left-(--sidebar-width)`;

    // TODO: Review this useEffect, we might be able to extract it into its own hook
    // Check if we need to migrate this to a Context
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                // md breakpoint
                setIsOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isOpen) {
            closeSidebar();
        }
    }, [path, isOpen]);

    const closeSidebar = () => setIsOpen(false);
    const openSidebar = () => setIsOpen(true);

    return (
        <>
            <div className="flex absolute left-0 top-0 w-full md:hidden py-1 px-2 shadow-top-nav-bar items-center rounded-bl-4xl bg-(--shadow-top-nav-bar-bg-color)">
                <span
                    className="absolute right-0 -bottom-0 border-t-1 border-(--shadow-top-nav-bar-color) translate-y-full w-8 h-16 rounded-tr-4xl shadow-top-nav-bar-corner"
                    aria-hidden="true"
                ></span>
                <IconButton icon={BurgerMenuIcon} onClick={openSidebar} />
                <div className="flex-1 flex justify-center">
                    <Image src={UalaLogo} alt="" />
                </div>
            </div>
            {isOpen && (
                <div
                    className="absolute bg-black/20 inset-0 w-full h-full z-20 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            <nav
                ref={sidebarRef}
                className={`absolute transition-all ${openClass} md:relative md:left-0 flex flex-col z-30 min-w-[17.5rem] bg-white md:shadow-sidebar pt-4 pb-12 gap-4 h-full`}
            >
                <SidebarHeader closeSideBar={closeSidebar} />
                <SidebarContent />
                <SidebarFooter />
            </nav>
        </>
    );
};
