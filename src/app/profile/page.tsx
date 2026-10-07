"use client";

import { updateUser, useSession } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

const ProfilePage = () => {
  const { data: session, isPending, error, refetch } = useSession();

  const user = session?.user;

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    await updateUser({
      name: data.name,
    });
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }


  return (
    <div className="max-w-xl mx-auto mt-12 mb-20 bg-white p-8 md:p-10 rounded-3xl shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-gray-100">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">আপনার প্রোফাইল</h1>
        <p className="text-sm text-gray-500">আপনার ব্যক্তিগত তথ্য আপডেট করুন</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 mb-10">
        <div className="relative group">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-28 h-28 rounded-full shadow-md flex items-center justify-center border-4 border-white transition-transform duration-300 group-hover:scale-105">
                <span className="text-4xl font-medium">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
            </div>
          )}
          <div className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow-md border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col items-center mt-2">
          <h2 className="text-xl font-bold text-gray-800 whitespace-nowrap">
            {user.name}
          </h2>
          <p className="text-sm font-medium text-gray-500 whitespace-nowrap">
            {user.email}
          </p>
        </div>
      </div>

      <Form
        className="flex w-full flex-col gap-6"
        onSubmit={handleUpdateProfile}
      >
        <div className="space-y-6">
          <TextField
            isRequired
            name="name"
            type="text"
            className="flex flex-col gap-2"
            defaultValue={user.name || ""}
            validate={(value) => {
              if (value.trim().length < 2) {
                return "দয়া করে আপনার নাম লিখুন";
              }
              return null;
            }}
          >
            <Label className="text-sm font-bold text-gray-700">আপনার নাম</Label>
            <Input
              placeholder="আপনার নাম লিখুন"
              className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100/50 focus:border-[#cc0000] focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all text-base text-gray-900"
            />
            <FieldError className="text-xs text-red-500 font-medium mt-1" />
          </TextField>

          {/* <TextField
            isRequired
            name="email"
            type="email"
            className="flex flex-col gap-2"
            defaultValue={user.email || ""}
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "দয়া করে একটি বৈধ ইমেইল ঠিকানা লিখুন";
              }
              return null;
            }}
          >
            <Label className="text-sm font-bold text-gray-700">ইমেইল ঠিকানা</Label>
            <Input
              placeholder="example@email.com"
              className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100/50 focus:border-[#cc0000] focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all text-base text-gray-900"
            />
            <FieldError className="text-xs text-red-500 font-medium mt-1" />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            className="flex flex-col gap-2"
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
            <Label className="text-sm font-bold text-gray-700">নতুন পাসওয়ার্ড</Label>
            <Input
              placeholder="নতুন পাসওয়ার্ড দিন (ঐচ্ছিক)"
              className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100/50 focus:border-[#cc0000] focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all text-base text-gray-900"
            />
            <Description className="text-xs text-gray-400 mt-1">
              কমপক্ষে ৮ অক্ষর — ১টি বড় হাতের অক্ষর ও ১টি সংখ্যা থাকতে হবে
            </Description>
            <FieldError className="text-xs text-red-500 font-medium mt-1" />
          </TextField> */}
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            size="lg"
            className="w-full font-bold text-white rounded-xl bg-gradient-to-r from-[#cc0000] to-[#e60000] hover:from-[#b30000] hover:to-[#cc0000] shadow-lg shadow-red-900/20 hover:shadow-red-900/40 transition-all duration-300 active:scale-[0.98] py-6 text-lg"
          >
            সংরক্ষণ করুন
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProfilePage;
