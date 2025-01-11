"use client";

import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { HiXMark } from "react-icons/hi2";
import Link from "next/link";
import { MdLogout } from "react-icons/md";
import { handleLogout } from "~/services/Services";
import { IoCalculatorOutline } from "react-icons/io5";
import { FaAddressCard } from "react-icons/fa";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import { RxAvatar } from "react-icons/rx";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useAuthStore } from "~/store/auth/AuthStore";

export default function LeftContentHeader() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenTooltip, setOpenTooltip] = useState(false);
  const fullname = useAuthStore((state) => state.user.fullname);
  const isAuth = useAuthStore((state) => state.isAuth);
  const { setIsAuth, setUser } = useAuthStore();
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
  return (
    <div className="content-left w-[70%]  lg:w-[78%] flex justify-end  items-center h-full gap-3 sm:w-full sm:justify-between relative xs:w-full xs:justify-between  sm:px-5  xs:px-5">
      <div
        className="logo flex flex-col justify-center items-center w-5/12 h-[75px]
          sm:w-full sm:items-start xs:w-[60%] xs:items-start "
      >
        <Link href={"/"} className="cursor-pointer flex flex-col ">
          <span
            className="text-5xl xs:tracking-widest font-semibold text-center text-[#D32F2F] text-shadow-lg xs:text-4xl sm:text-4xl  "
            style={{
              textShadow:
                "rgb(106 109 129) 3px 0px 0px, rgba(0, 0, 0, 0) 4px -1px 10px, rgba(0, 0, 0, 0) 16px 1px 2px, rgba(115, 86, 86, 0) 22px 18px 30px",
            }}
          >
            MKAdmin
          </span>
          <span className="text-[#D32F2F] font-semibold text-xl text-center tracking-widest xs:tracking-normal">
            Digital Data Manage
          </span>
        </Link>
      </div>
      {isAuth === true ? (
        <div className=" gap-4 items-center sm:flex hidden xs:flex">
          <TooltipProvider delayDuration={100}>
            <Tooltip open={isOpenTooltip} onOpenChange={setOpenTooltip}>
              <TooltipTrigger
                onClick={() => setOpenTooltip(!isOpenTooltip)}
                className="xs:w-full sm:w-full"
              >
                <div className="flex justify-center items-center gap-2 cursor-pointer ">
                  <span className="xs:hidden">{fullname}</span>{" "}
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

                      <Link href="/products/dashboard">
                        <CommandItem className="flex items-center gap-2">
                          <IoCalculatorOutline />
                          Thông tin Thiết bị/Kit
                        </CommandItem>
                      </Link>
                      <Link onClick={handleLogoutPage} href="/auth">
                        <CommandItem className="flex items-center gap-2">
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
        </div>
      ) : (
        <div className="xs:flex sm:flex items-center justify-end gap-12 w-full hidden">
          <Link href={"/auth"}>
            <button className="px-5 py-2 rounded text-white bg-[#D32F2F] hover:transition-colors hover:duration-200 hover:ease-out hover:bg-[#1513be] shadow-2xl shadow-[#7A9598] lg:px-2">
              Đăng nhập 
            </button>
          </Link>
        </div>
      )}

      <div
        className="hidden sm:block xs:block cursor-pointer z-10 ml-1"
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <FiMenu className="text-2xl" />
      </div>

      <div
        className={`w-7/12 sm:flex-col xs:flex-col  xs:inline-flex flex text-lg font-medium justify-around items-center sm:justify-start sm:items-start xs:justify-start xs:items-start
              sm:bg-[#080544] xs:bg-[#080544] sm:text-[#1464cc] xs:text-[#1464cc]  sm:absolute xs:absolute sm:duration-200 xs:duration-200 sm:h-screen 
            sm:w-1/3 sm:z-20 xs:w-[45%] xs:z-20 xs:h-screen xs:right-0 xs:top-0 sm:right-0 sm:top-0 sm:transition-all xs:transition-all sm:ease-in xs:ease-in  ${
              isOpenMenu
                ? "sm:translate-x-0 xs:translate-x-0"
                : " sm:translate-x-full xs:translate-x-full"
            }`}
        //  data-aos="zoom-out"
      >
        <div
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          className=" px-4 pt-2 cursor-pointer hidden sm:flex sm:justify-end xs:text-white  xs:flex xs:justify-end w-full"
        >
          <HiXMark />
        </div>
        <Link href="/" className=" sm:w-full xs:w-full ">
          <span
            className="cursor-pointer hover:text-[#1464cc]  block  
              sm:px-3 sm:py-1 sm:border-b-[1px] xs:px-3 xs:py-1 xs:border-b-[1px] font-semibold xs:text-white"
          >
            Trang chủ
          </span>
        </Link>

        <Link href="/about" className=" sm:w-full xs:w-full">
          <span
            className="cursor-pointer hover:text-[#1464cc] flex font-semibold
              sm:px-3 sm:py-1 sm:border-b-[1px] xs:px-3 xs:py-1 xs:border-b-[1px] xs:text-white"
          >
            Giới thiệu
          </span>
        </Link>

        <Link href="/blog" className=" sm:w-full xs:w-full ">
          <span
            className="cursor-pointer xs:text-white hover:text-[#1464cc] font-semibold flex items-center gap-0.5 sm:pl-3 sm:border-b-[1px] sm:justify-between  xs:pl-3  xs:border-b-[1px] xs:justify-between"
            data-tooltip-id="my-blog"
          >
            Blog
          </span>
        </Link>

        <Link href="/contact" className=" sm:w-full xs:w-full ">
          <span className="cursor-pointer hover:text-[#1464cc] flex sm:pl-3 sm:border-b-[1px] sm:justify-between xs:border-b-[1px] xs:pl-3 font-semibold xs:text-white">
            Liên hệ
          </span>
        </Link>
      </div>
    </div>
  );
}
