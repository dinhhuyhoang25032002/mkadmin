"use client";
import { useEffect } from "react";
import { useAuthStore, UserProps } from "~/store/auth/AuthStore";
import { useForm } from "react-hook-form";

import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { useToast } from "~/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import Image from "next/image";
import { SubmitUserInfoBody, SubmitUserInfoBodyType } from "~/types/Types";
import { handleUpdateUserInfo } from "~/services/Services";
import MainLayout from "~/components/main-layout";
import { useSWRPublic } from "~/hooks/useSWRCustom";
export default function Page() {
  const fullName = useAuthStore((state) => state.user.fullname) ?? "";
  const email = useAuthStore((state) => state.user.email) ?? "";
  const dateOfBirth = useAuthStore((state) => state.user.dateOfBirth) ?? "";
  const address = useAuthStore((state) => state.user.address) ?? "";
  const courseId = useAuthStore((state) => state.user.courses) ?? "";
  const { setUser, user } = useAuthStore();
  const { data, } = useSWRPublic(
    `courses/${courseId ? courseId[0] : ""}`
  );

  const nameCourse = data?.name ?? "";
  const description = data?.description ?? "";
  const price = data?.price ?? "";
  const image = data?.image ?? "";
  console.log("image", data, data?.image);
  const { toast } = useToast();

  const form = useForm<SubmitUserInfoBodyType>({
    resolver: zodResolver(SubmitUserInfoBody),
    defaultValues: {
      email: "",
      fullname: "",
      address: "",
      dateOfBirth: "",
    },
  });
  const onSubmit = async (values: SubmitUserInfoBodyType) => {
    const data = await handleUpdateUserInfo(values);
    if (data && data.status === 200) {
      const payload = data.payload as UserProps;
      const updatedUser: UserProps = {
        ...user,
        fullname: payload.fullname,
        address: payload.address,
        dateOfBirth: payload.dateOfBirth,
        email: payload.email,
        role: payload.role,
        _id: payload._id,
      };
      setUser(updatedUser);
      toast({
        title: "Cập nhật thông tin thành công",
      });
    }
  };

  useEffect(() => {
    form.reset({
      email: email || "",
      fullname: fullName || "",
      address: address || "",
      dateOfBirth: dateOfBirth || "",
    });
  }, [fullName, email, dateOfBirth, form, address]);

  return (
    <MainLayout>
      <div>
        <section className=" h-screen rounded-md  flex items-center justify-center gap-10">
          <div className="space-y-4 h-fit p-4 w-1/3 rounded-md shadow-2xl ">
            <div className=" flex justify-center">
              <span className="font-semibold uppercase">Thông tin cá nhân</span>
            </div>
            <div className="space-y-4 ">
              <div className="flex items-center gap-4">
                <span className="w-24">Email</span>
                <Input
                  value={email}
                  placeholder={email ? "" : "Bạn chưa có thông tin này"}
                  type="text"
                  disabled
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-24">Họ tên</span>
                <Input
                  value={fullName}
                  placeholder={fullName ? "" : "Bạn chưa có thông tin này"}
                  type="text"
                  disabled
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-24">Địa chỉ</span>
                <Input
                  value={address}
                  placeholder={address ? "" : "Bạn chưa có thông tin này"}
                  type="text"
                  disabled
                />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-24">Ngày sinh</span>
                <Input
                  value={dateOfBirth}
                  placeholder={dateOfBirth ? "" : "Bạn chưa có thông tin này"}
                  type="text"
                  disabled
                />
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger className="bg-blue-700 w-full p-3 rounded text-white">
                <span>Cập nhật</span>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Cập nhật thông tin cá nhân
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Hoàn thiện thông tin để tiếp tục
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Form {...form}>
                  <section className="space-y-4 bg-white h-fit rounded-md ">
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4 h-fit "
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Nhập email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="fullname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Họ tên</FormLabel>
                            <FormControl>
                              <Input placeholder="Nhập họ tên" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Địa chỉ</FormLabel>
                            <FormControl>
                              <Input placeholder="Nhập địa chỉ" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ngày sinh</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Nhập ngày sinh"
                                type="date"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <AlertDialogFooter className="flex flex-col gap-4">
                        <AlertDialogAction type="submit" className="space-y-4 ">
                          Cập nhật
                        </AlertDialogAction>
                        <AlertDialogCancel>Trở lại</AlertDialogCancel>
                      </AlertDialogFooter>
                    </form>
                  </section>
                </Form>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className=" w-[30%] flex rounded-md  p-4  flex-col text-center  shadow-2xl items-center space-y-4">
            <span className="font-semibold uppercase">Gói dịch vụ</span>
            <div>
              {image ? (
                <Image
                  src={image}
                  alt="User image"
                  width={300}
                  height={500}
                  className="border-[1px] border-blue-500 rounded-md"
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="flex flex-col gap-2 items-start px-7">
              <span>
                <span className="font-semibold">Tên gói cước:</span>{" "}
                {nameCourse}
              </span>
              <span className="text-start">
                <span className="font-semibold">Mô tả:</span> {description}
              </span>
              <span>
                <span className="font-semibold">Giá:</span> {price}
              </span>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
