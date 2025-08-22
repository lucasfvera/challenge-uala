import Image from "next/image";
import Link from "next/link";
import AppStoreButton from "@/assets/AppStoreButton.svg";
import GooglePlayButton from "@/assets/GooglePlayButton.svg";

export const SidebarFooter = () => (
    <div className="flex flex-col items-center gap-6.5">
        <p className="text-title-md font-semibold">Descargá la app desde</p>
        <div className="flex flex-col gap-4">
            <Link href="#">
                <Image
                    src={AppStoreButton}
                    alt="Link to download the app on the app store"
                />
            </Link>
            <Link href="#">
                <Image
                    src={GooglePlayButton}
                    alt="Link to download the app on google play store"
                />
            </Link>
        </div>
    </div>
);
