import Image from "next/image";
import UalaLogoImage from "@/assets/uala-isotipo-horizontal.svg";
import Link from "next/link";
import { PATHS } from "@/components/molecules/Sidebar/routes";

export const SidebarHeader = () => (
    <Link className="w-fit ml-4" href={PATHS.home}>
        <Image src={UalaLogoImage} alt="" />
    </Link>
);
