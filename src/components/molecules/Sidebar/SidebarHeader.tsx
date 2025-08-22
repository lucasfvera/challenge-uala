import Image from "next/image";
import UalaLogoImage from "@/assets/uala-isotipo-horizontal.svg";
import Link from "next/link";
import { PATHS } from "@/components/molecules/Sidebar/routes";
import { CloseIcon } from "@/components/atoms/CloseIcon";

interface SidebarHeaderProps {
    closeSideBar: () => void;
}

export const SidebarHeader = ({ closeSideBar }: SidebarHeaderProps) => (
    <div className="flex w-full justify-between">
        <Link className="w-fit ml-4" href={PATHS.home}>
            <Image src={UalaLogoImage} alt="" />
        </Link>
        <button
            onClick={closeSideBar}
            className="mr-4 md:hidden cursor-pointer"
        >
            <CloseIcon />
        </button>
    </div>
);
