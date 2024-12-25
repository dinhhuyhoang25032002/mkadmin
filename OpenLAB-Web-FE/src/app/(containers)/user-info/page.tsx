"use client";
import { useEffect } from "react";
import { useAuthStore } from "~/store/auth/AuthStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitUserInfoBody, SubmitUserInfoBodyType } from "~/types/Types";
export default function Page() {
  const  fullName  = useAuthStore((state) => state.user.fullname);
  const email = useAuthStore((state) => state.user.email);
  const dateOfBirth = useAuthStore((state) => state.user.dateOfBirth);
  const address = useAuthStore((state) => state.user.address);
 
  const form = useForm<SubmitUserInfoBodyType>({
    resolver: zodResolver(SubmitUserInfoBody),
    defaultValues: {
      email: "",
      fullName: "",
      address: "",
      dateOfBirth: "",
    },
  });

  return <div className="p-16">
    <div>
      <span>Họ và tên:
        
      </span>
      <span>Email:</span>
      <span>Ngày sinh:</span>
      <span>Địa chỉ:</span>
</div>
  </div>;
}
