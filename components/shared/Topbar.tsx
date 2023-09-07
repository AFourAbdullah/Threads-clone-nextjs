import Image from "next/image";
import Link from "next/link";
import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
function TopBar() {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/logo.svg" width={28} height={28} alt="logo" />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  width={24}
                  height={24}
                  alt="logout"
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            elements: {
              organizationSwitcherTrigger: "px-4 py-2",
            },
          }}
        />
      </div>
    </nav>
  );
}
export default TopBar;