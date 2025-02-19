"use client";
import { RxAvatar } from "react-icons/rx";
import { FaAddressCard } from "react-icons/fa";
import Link from "next/link";
import { IoCalculatorOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
// import { MdEditCalendar } from "react-icons/md";

import { handleLogout } from "~/services/Services";
import { useAuthStore } from "~/store/auth/AuthStore";


import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export default function RightContentHeader() {
  const { isAuth, setIsAuth, setUser, user } = useAuthStore();
  const handleLogoutPage = async () => {
    await handleLogout();
    const resetUser = {
      _id: "",
      email: "",
      fullname: "",
      role: "",
      address: "",
      dateOfBirth: "",
      accessToken: "",
      course: [],
    };
    setIsAuth(false);
    setUser(resetUser);
  };

//  console.log(isAuth);
  
  return (
    <div className="content-right w-[25%] lg:w-[22%] flex items-center justify-end text-lg font-medium gap-6 sm:hidden xs:hidden pr-6">
      {isAuth === true ? (
        <>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger className="xs:w-full sm:w-full">
                <div className="flex justify-center items-center gap-2 cursor-pointer ">
                  {user?.fullname}{" "}
                  <RxAvatar className="cursor-pointer text-2xl" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="px-0 py-0 bg-white ">
                <Command>
                  <CommandInput placeholder="Type a command or search..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                      <Link href={"/user-info"}>
                        <CommandItem className="flex items-center gap-2 cursor-pointer">
                          <FaAddressCard className="cursor-pointer " />
                          Thông tin cá nhân
                        </CommandItem>
                      </Link>
                      {/* 
                      <Link href="/products/courses/search-course">
                        <CommandItem className="flex items-center gap-2 cursor-pointer">
                          <MdEditCalendar />
                          Thông tin khóa học
                        </CommandItem>
                      </Link> */}
                      <Link href="/products/dashboard">
                        <CommandItem className="flex items-center gap-2 cursor-pointer">
                          <IoCalculatorOutline />
                          Thông tin Thiết bị/Kit
                        </CommandItem>
                      </Link>

                      <Link onClick={handleLogoutPage} href={"/auth"}>
                        <CommandItem className="flex items-center gap-2 cursor-pointer">
                          <MdLogout />
                          Đăng xuất
                        </CommandItem>
                      </Link>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      ) : (
        <div className="flex items-center justify-end gap-12 w-full ">
          <Link href={"/auth"}>
            <button className="px-5 py-2 rounded text-white bg-[#D32F2F] hover:transition-colors hover:duration-200 hover:ease-out hover:bg-[#1513be] shadow-2xl shadow-[#7A9598] lg:px-2">
              Đăng nhập
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
