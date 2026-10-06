"use client";

import { signUp } from "@/lib/auth-client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { data: resData, error } = await signUp.email({
      name: data.name as string,
      email: data.email as string,
      password: data.password as string,
      image: data.image as string,
      callbackURL: "/sign-in",
    });

    if (!error) {
      toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!");
      router.push("/sign-in");
    } else {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে");
      console.error("Sign up failed:", error);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-[#f5f5f5] px-4 py-10 ">
      <div className="w-full max-w-[440px]">
        {/* Card */}
        <div
          className="relative overflow-hidden rounded-2xl bg-white"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
        >
          <div className="p-8 pt-7">
            {/* Header */}
            <div className="mb-7 text-center">
              <h1 className="text-2xl font-bold text-[#111111] tracking-tight">
                সাইন আপ করুন
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                নতুন অ্যাকাউন্ট তৈরি করুন
              </p>
            </div>

            <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
              <TextField
                isRequired
                name="name"
                type="text"
                className="flex flex-col gap-1.5"
                validate={(value) => {
                  if (value.trim().length < 2) {
                    return "দয়া করে আপনার নাম লিখুন";
                  }
                  return null;
                }}
              >
                <Label className="text-sm font-semibold text-[#222]">
                  আপনার নাম
                </Label>
                <Input
                  placeholder="আপনার নাম লিখুন"
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white focus:border-[#cc0000] focus:bg-white focus:outline-none transition-colors text-base text-[#222]"
                />
                <FieldError className="text-xs text-red-600 font-medium" />
              </TextField>

              <TextField
                isRequired
                name="email"
                type="email"
                className="flex flex-col gap-1.5"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "দয়া করে একটি বৈধ ইমেইল ঠিকানা লিখুন";
                  }

                  return null;
                }}
              >
                <Label className="text-sm font-semibold text-[#222]">
                  ইমেইল ঠিকানা
                </Label>
                <Input
                  placeholder="example@email.com"
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white focus:border-[#cc0000] focus:bg-white focus:outline-none transition-colors text-base text-[#222]"
                />
                <FieldError className="text-xs text-red-600 font-medium" />
              </TextField>

              <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                className="flex flex-col gap-1.5"
                validate={(value) => {
                  if (value.length < 8) {
                    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                  }
                  if (!/[A-Z]/.test(value)) {
                    return "পাসওয়ার্ডে অন্তত একটি বড় হাতের অক্ষর থাকতে হবে";
                  }
                  if (!/[0-9]/.test(value)) {
                    return "পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে";
                  }

                  return null;
                }}
              >
                <Label className="text-sm font-semibold text-[#222]">
                  পাসওয়ার্ড
                </Label>
                <Input
                  placeholder="আপনার পাসওয়ার্ড দিন"
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-white focus:border-[#cc0000] focus:bg-white focus:outline-none transition-colors text-base text-[#222]"
                />
                <Description className="text-xs text-gray-400">
                  কমপক্ষে ৮ অক্ষর — ১টি বড় হাতের অক্ষর ও ১টি সংখ্যা থাকতে হবে
                </Description>
                <FieldError className="text-xs text-red-600 font-medium" />
              </TextField>

              <div className="flex flex-col gap-3 mt-1">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full font-bold text-white rounded-lg bg-gradient-to-r from-[#111111] to-[#cc0000] hover:from-[#000] hover:to-[#ff3b3b] shadow-lg shadow-red-900/20 transition-all duration-200 active:scale-[0.98]"
                >
                  সাইন আপ করুন
                </Button>
              </div>
            </Form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">অথবা</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <p className="text-center text-sm text-gray-500">
              আগে থেকেই অ্যাকাউন্ট আছে?{" "}
              <Link
                href="/sign-in"
                className="font-bold text-[#cc0000] hover:text-[#ff3b3b] hover:underline transition-colors"
              >
                সাইন ইন করুন
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
