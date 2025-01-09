"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useState } from "react";
import ControlDevice from "~/components/dashboard/ControlDevice";
import FormSubmit from "~/components/dashboard/FormSubmit";
import { useAuthStore } from "~/store/auth/AuthStore";

export default function Page() {
  const mode = [
    { value: "handler", title: "Thủ công" },
    { value: "auto", title: "Tự động" },
  ];
  const nodeId = useAuthStore((state) => state.user.nodeId);

  const [isMode, setMode] = useState("handler");

  return (
    <main className=" w-full">
      <div className="flex w-full space-y-5 flex-col xs:py-4 pb-10">
        <div className=" h-[100px] xs:h-fit xs:py-2 bg-green-300 flex justify-center items-center text-xl font-semibold">
          <span className="uppercase xs:text-base">
            Điều khiển các thiết bị
          </span>
        </div>
        <div className=" bg-blue-400 px-20 xs:p-5  py-10 flex flex-col gap-10 xs:gap-5 items-center justify-between rounded ">
          <span className="text-xl font-semibold uppercase xs:text-base">
            Thiết lập các thông số tối đa:
          </span>
          <div className="flex gap-10 w-full justify-center items-center">
            <FormSubmit />
          </div>
        </div>

        <div className=" boder-2 border-gray-700 flex flex-col justify-center items-center gap-10 xs:gap-5">
          <div className="flex justify-center items-center">
            <Select
              value={isMode}
              onValueChange={(value) => {
                setMode(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Thủ công" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {mode?.map((item, index) => (
                    <SelectItem value={item.value} key={index}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-10 xs:flex-col xs:px-4">
            {nodeId?.map((item, index) => {
              if (!item || !item._id) return null;
              return (
                <div key={index}>
                  <ControlDevice
                    isMode={isMode}
                    nodeId={item._id}
                    title={`node ${index + 1}`}
                    temperature={item.temperature}
                    humidy={item.humidy}
                    light={item.light}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
