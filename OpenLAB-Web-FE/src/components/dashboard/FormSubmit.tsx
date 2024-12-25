"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  SubmitValueDeviceBodyType,
  SubmitValueDeviceBody,
} from "~/types/Types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useAuthStore } from "~/store/auth/AuthStore";
import { useToast } from "~/hooks/use-toast";
export default function FormSubmit() {
  const form = useForm<SubmitValueDeviceBodyType>({
    resolver: zodResolver(SubmitValueDeviceBody),
    defaultValues: {
      temperature: "",
      humidy: "",
      light: "",
      nodeId: "",
    },
  });
  const { user } = useAuthStore();
  const { nodeId } = user;
  const { toast } = useToast();
  const onSubmit = async (values: SubmitValueDeviceBodyType) => {
    console.log(values);

    const res = await (
      await fetch("https://localhost:3001/users/add-value", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          temperature: values.temperature,
          humidy: values.humidy,
          nodeId: values.nodeId,
          light: values.light,
        }),
      })
    ).json();
    if (res && res.success === true) {
      toast({
        title: "Bạn đã thay đổi các giá trị thành công!",
        // description: "Hãy đăng nhập để trải nghiệm những dịch vụ tuyệt vời",
       
      });
    }
    console.log(res);
  };
  return (
    <Form {...form}>
      <section className="space-y-4 bg-white h-fit px-5 py-4 rounded-md">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-fit py-4 flex flex-col justify-center items-center gap-4"
        >
          <FormField
            control={form.control}
            name="nodeId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select {...field} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a node" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {nodeId?.map((item, index) => (
                          <SelectItem value={item._id} key={index}>
                            node {index + 1}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="temperature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhiệt độ</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhiệt độ tối đa " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="humidy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Độ ẩm</FormLabel>
                  <FormControl>
                    <Input placeholder="Độ ẩm tối đa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="light"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ánh sáng</FormLabel>
                  <FormControl>
                    <Input placeholder="Ánh sáng tối đa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            variant="gooeyLeft"
            type="submit"
            className="bg-blue-700 w-full "
          >
            Submit
          </Button>
        </form>
      </section>
    </Form>
  );
}
