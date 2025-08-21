import { routes } from "@/components/molecules/Sidebar/routes";
import { SidebarLink } from "@/components/molecules/Sidebar/SidebarItem";

export const SidebarContent = () => {
    return (
        <div className="flex flex-col flex-1">
            <ul className="w-full">
                {routes.map((route, i) => (
                    <SidebarLink key={i} route={route} />
                ))}
            </ul>
        </div>
    );
};
