"use client";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const nodeId = useAuthStore((state) => state.user.nodeId);

  const { setNode } = useAuthStore();
  const { toast } = useToast();

  const temperature = useAuthStore(
    (state) => state.user.nodeId?.[0].temperature ?? ""
  );
  const humidy = useAuthStore((state) => state.user.nodeId?.[0].humidy ?? "");
  const light = useAuthStore((state) => state.user.nodeId?.[0].light ?? "");

  const form = useForm<SubmitValueDeviceBodyType>({
    resolver: zodResolver(SubmitValueDeviceBody),
    defaultValues: {
      temperature: temperature,
      humidy: humidy,
      light: light,
      nodeId: "",
    },
  });
 
  const onSubmit = async (values: SubmitValueDeviceBodyType) => {
    const res = await (
      await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/users/add-value`, {
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

    if (res && res.status === "success") {
      setNode({
        _id: res.data._id,
        temperature: res.data.temperature,
        humidy: res.data.humidy,
        light: res.data.light,
      });
      toast({
        title: "Bạn đã thay đổi các giá trị thành công!",
      });
    }
    //console.log(res);
  };
  return (
    <Form {...form}>
      <section className="space-y-4 bg-white h-fit px-5 py-4 rounded-md xs:w-full">
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
                  <Select {...field} onValueChange={field.onChange} >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue  placeholder="Select a node" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {nodeId?.map((item, index) => (
                          <SelectItem value={item._id} key={item._id}>
                            node {index + 1}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4 xs:flex-col xs:w-full">
            <FormField
              control={form.control}
              name="temperature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhiệt độ (&deg;C)</FormLabel>
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
                  <FormLabel>Độ ẩm (&#37;)</FormLabel>
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
                  <FormLabel>Ánh sáng (&#37;)</FormLabel>
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
