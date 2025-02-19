import Logo from "~/components/custom/Logo";
import { MdPhone } from "react-icons/md";
import { GrMail } from "react-icons/gr";
import { IoLocation } from "react-icons/io5";
import { LuCopyright } from "react-icons/lu";
import { SiShopee } from "react-icons/si";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import Image from "next/image";
import logoZalo from "~/assets/logo/contact/Icon_of_Zalo.svg";
const SectionFooter = () => {
  return (
    <div className="body-section-footer bg-gradient-to-r from-[#080541] from-0% via-[#090979] via-58% to-[#06044a] to-100% px-20 py-14 border-t-2 border-[#48d6e9] lg:px-10 xs:px-4 z-10 xl:px-14 sm:px-10 ">
      <div className="content-section-footer">
        <div className="flex lg:flex-col text-white justify-around lg:px-0 sm:flex-col sm:gap-8 xs:flex-col xs:gap-6 xs:px-0 space-y-10">
          <div className="flex sm:flex-col w-[65%] justify-between lg:w-full sm:w-full xs:w-full xs:flex-col xs:gap-6 sm:gap-6">
            <div className="w-[56%] sm:w-full flex flex-col justify-between lg:w-[56%] lg:pr-2 xs:w-full">
              <div>
                <Logo color="white" />
                <div className="flex flex-col gap-8 text-justify">
                  <p className=" mt-3 lg:text-sm text-base font-normal  text-white flex flex-col  xs:w-[89%] ">
                    <span className="text-sm flex flex-col 2xl:w-[82%] lg:w-full xl:w-[90%]">
                      <span className=" text-lg  2xl:text-xl font-semibold xs:mb-3  2xl:mb-8 ">
                        CÔNG TY CỔ PHẦN CÔNG NGHỆ MKAdmin
                      </span>
                      <span className="2xl:text-lg lg:text-lg xl:text-base xl:mt-1  ">
                        Đơn vị cung cấp các sản phẩm & giải pháp toàn diện ứng
                        dụng công nghệ IoT nhằm quản lí giám sát từ xa , thông
                        qua cá nhân hoá, mọi lúc mọi nơi, phục vụ đa dạng như
                        cầu của mọi người trong thời đại số.
                      </span>
                    </span>
                  </p>
                </div>
              </div>
              <span className="flex items-center text-center text-sm font-normal text-white lg:hidden sm:hidden xs:hidden">
                <LuCopyright />
                <span className="text-sm font-normal text-white mr-1">
                  2024 Bản quyền thuộc về
                </span>
                <span className=" text-base font-semibold text-white">
                  MKAdmin
                </span>
              </span>
            </div>
            <div className="w-[45%] sm:w-full  flex flex-col gap-3  text-base font-normal text-white lg:w-[40%] xs:w-full 2xl:text-lg">
              <span className="text-lg font-semibold text-white mb-2  xs:mb-0">
                ĐỊA CHỈ
              </span>
              <span className="flex cursor-pointer hover:text-white items-center lg:text-lg gap-2">
                <MdPhone className="text-lg " />
                (+84) 86 574 6698
              </span>

              <span className="flex cursor-pointer hover:text-white items-center lg:text-lg gap-2">
                <GrMail className="text-lg" />
                mkadmin.user@gmail.com
              </span>
              <span className="flex cursor-pointer hover:text-white items-center lg:text-lg gap-2">
                <IoLocation className="text-lg " />
                QL6 P. Mộ Lao, Hà Đông, Hà Nội, Việt Nam
              </span>
              <div className="flex mt-7">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3725.28029825021!2d105.78630017525153!3d20.98139838940363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1zNjhhLzYgUGjhu5EgQW8gU2VuLCBN4buZIExhbywgSMOgIMSQw7RuZywgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1724994267750!5m2!1svi!2s"
                  width="300"
                  height="160"
                  style={{ borderWidth: "none", borderRadius: "6px" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-row-reverse w-[35%] justify-between lg:w-full sm:w-full xs:w-full  xs:flex-col xs:justify-between lg:gap-6 xs:gap-6">
            <div className="w-[40%]  flex flex-col text-base font-normal text-white gap-3  xs:w-full xs:flex-col">
              <span className="text-lg font-semibold text-white mb-2  xs:mb-0 uppercase">
                Khám phá
              </span>
              <div className="xs:flex-row w-full gap-2 flex flex-col justify-center">
                <div className="flex flex-col xs:w-1/2 gap-2 w-full 2xl:text-lg">
                  <span className="cursor-pointer hover:text-white lg:text-lg">
                    Giới thiệu
                  </span>
                  <span className="cursor-pointer hover:text-white lg:text-lg">
                    Blog
                  </span>
                  <span className="cursor-pointer hover:text-white lg:text-lg">
                    Hỗ trợ
                  </span>
                </div>
                <div className="flex flex-col xs:w-1/2 gap-2 w-full">
                  <span className="cursor-pointer hover:text-white lg:text-lg">
                    Liên hệ
                  </span>
                  <span className="cursor-pointer hover:text-white lg:text-lg">
                    Báo giá
                  </span>
                </div>
              </div>
            </div>
            <div className="w-[60%] lg:w-[56%] flex flex-col justify-between  text-base font-medium text-white xs:w-full xs:gap-6">
              <div className="gap-2 flex flex-col item 2xl:text-lg">
                <span className="text-lg font-semibold text-white mb-2  xs:mb-0 uppercase">
                  Dịch vụ
                </span>
                <span className="cursor-pointer lg:text-lg hover:text-white font-normal ">
                  Nền tảng thực hành số
                </span>
                <span className="cursor-pointer lg:text-lg  hover:text-white font-normal ">
                  Phần mềm CĐS Giáo dục
                </span>
                <span className="cursor-pointer lg:text-lg hover:text-white font-normal ">
                  Trợ giảng số AI
                </span>
                <span className="cursor-pointer lg:text-lg hover:text-white font-normal flex ">
                  Thiết bị thực hành thông minh
                </span>
                <span className="cursor-pointer lg:text-lg  hover:text-white font-normal flex ">
                  Khóa học thực hành trực tuyến
                </span>
              </div>
              <div className="flex items-center text-4xl rounded sm:hidden lg:hidden gap-7 lg:pr-8 lg:mt-6 xs:px-2  xs:justify-around ">
                <div className="bg-white rounded-md">
                  <FaFacebookSquare className="text-[#1877f2]" />
                </div>
                <div className="bg-white rounded-md">
                  <AiFillTikTok className="text-black" />
                </div>
                <div className="w-9 h-9">
                  <Image
                    src={logoZalo}
                    alt="logo-Zalo"
                    className="object-contain object-center w-full h-full"
                  />
                </div>
                <div className="bg-white rounded-md px-1 py-1 ">
                  <SiShopee className="text-[#fd5621] text-3xl" />
                </div>
              </div>
            </div>
          </div>
          <div className=" flex justify-between xl:hidden 2xl:hidden xs:justify-center">
            <span className="flex items-center text-center text-sm font-normal text-white ">
              <LuCopyright />
              <span className="text-sm font-normal text-white mr-1">
                2024 Bản quyền thuộc về
              </span>
              <span className=" text-base font-semibold text-white">
                OpenLAB
              </span>
            </span>
            <div className="flex justify-end items-center text-4xl rounded  gap-7 lg:pr-8 xs:hidden ">
              <div className="bg-white rounded-md">
                <FaFacebookSquare className="text-[#1877f2]" />
              </div>
              <div className="bg-white rounded-md">
                <AiFillTikTok className="text-black" />
              </div>
              <div>
                <Image
                  src={logoZalo}
                  alt="logo-Zalo"
                  className="w-9 h-9 object-contain object-center"
                />
              </div>
              <div className="bg-white rounded-md px-1 py-1 ">
                <SiShopee className="text-[#fd5621] text-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionFooter;
