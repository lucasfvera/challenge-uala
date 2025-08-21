import { SidebarContent } from "@/components/molecules/Sidebar/SidebarContent";
import { SidebarFooter } from "@/components/molecules/Sidebar/SidebarFooter";
import { SidebarHeader } from "@/components/molecules/Sidebar/SidebarHeader";

export const Sidebar = () => {
    return (
        <nav className="hidden md:flex flex-col z-10 min-w-[17.5rem] bg-white shadow-sidebar pt-4 pb-12 gap-4">
            <SidebarHeader />
            <SidebarContent />
            <SidebarFooter />
        </nav>
    );
};
