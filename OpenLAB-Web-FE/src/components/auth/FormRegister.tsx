"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { RegisterBody, RegisterBodyType } from "~/types/Types";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {  useState } from "react";
import { handleRegister } from "~/services/Services";
import { useToast } from "~/hooks/use-toast";

export default function RegisterForm() {
  const { toast } = useToast();
  const [isShowPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullname: "",
    },
  });
  async function onSubmit(values: RegisterBodyType) {
  //  console.log(values);
    const data = await handleRegister(
      values.email,
      values.password,
      values.fullname
    );

    if (data && data.status === 201) {
      const payload = data.payload as { status: number; message: string };
      if (payload) {
        if (payload.status === 400) {
          toast({
            title: payload.message,
            description: "Hãy thay đổi tên tài khoản",
          });
        } else {
          toast({
            title: payload.message,
            description: "Hãy đăng nhập để trải nghiệm những dịch vụ tuyệt vời",
          });
          form.reset();
         
        }
      }
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4  bg-white h-fit px-5 py-4 rounded-md"
      >
        <div className="flex flex-col text-center">
          <span className=" text-xl font-semibold">Đăng kí</span>
          <span className="">Hoàn thiện thông tin để tiếp tục</span>
        </div>
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder="Nhập họ và tên" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên tài khoản</FormLabel>
              <FormControl>
                <Input placeholder="Nhập email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <div className="relative ">
                  <Input
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    {...field}
                  />
                  {isShowPassword ? (
                    <AiOutlineEyeInvisible
                      className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!isShowPassword)}
                    />
                  ) : (
                    <AiOutlineEye
                      className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!isShowPassword)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập lại mật khẩu</FormLabel>
              <FormControl>
                <div className="relative ">
                  <Input
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    {...field}
                  />
                  {isShowPassword ? (
                    <AiOutlineEyeInvisible
                      className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!isShowPassword)}
                    />
                  ) : (
                    <AiOutlineEye
                      className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!isShowPassword)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-blue-700 w-full">
          Đăng kí
        </Button>
        <div className="text-sm font-medium w-full text-center">
          <span>Quay lại đăng nhập?</span>
          <span className="font-semibold ">Đăng nhập ngay</span>
        </div>
      </form>
    </Form>
  );
}
