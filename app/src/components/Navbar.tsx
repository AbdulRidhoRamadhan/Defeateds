import { ArrowRightIcon, HeartIcon } from "@heroicons/react/24/outline";
import { cookies } from "next/headers";
import Link from "next/link";
import LogoutButton from "./Logout";

export default function Navbar() {
  const isLoggedIn = cookies().get("Authorization")?.value ? true : false;

  return (
    <>
      <div className="flex-col bg-white px-4 sm:px-6 md:px-10 lg:px-10">
        <div className="text-center max-w-7xl sm:px-6 lg:px-8">
          <span className="text-md font-light text-black">
            Enjoy our great international shipping rates
          </span>
        </div>

        <nav className="flex flex-col sm:flex-row items-center justify-between py-4">
          <div className="flex items-center justify-between w-full sm:w-auto sm:justify-start">
            <div className="font-bold text-2xl flex items-center text-black justify-center sm:justify-start w-full sm:w-auto">
              <Link href="/">
                <img
                  src="https://undefeated.com/cdn/shop/t/92/assets/logo-combo.png?v=180616989015755798321731078717"
                  alt="Logo"
                  className="w-[200px] h-9 sm:w-[250px]"
                />
              </Link>
            </div>

            <div className="flex sm:flex space-x-6 pl-6 text-black text-xs">
              <Link href="/products" className="font-medium">
                SHOP
              </Link>
              <a href="#features" className="font-medium">
                FEATURES
              </a>
              <a href="#uactp" className="font-medium">
                UACTP
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="xl:flex items-center border-b border-black text-black sm:hidden md:flex">
              <input
                type="text"
                placeholder="SEARCH"
                className="text-xs py-1 outline-none bg-white"
              />
              <button>
                <span>
                  <ArrowRightIcon className="text-black w-4 h-4" />
                </span>
              </button>
            </div>

            <div className="flex items-center text-xs font-medium text-black">
              <span>INDONESIA (RP)</span>
            </div>

            <div className="flex items-center text-black">
              <Link href={"/wishlists"}>
                <HeartIcon className="text-black size-7" />
              </Link>
            </div>

            {isLoggedIn ? (
              <LogoutButton />
            ) : (
              <Link href="/login" className="text-black">
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
