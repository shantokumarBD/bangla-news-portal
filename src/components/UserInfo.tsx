"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { router } from "better-auth/api";
import Link from "next/link";
import toast from "react-hot-toast";

const UserInfo = () => {
  const { data: session, isPending, error, refetch } = useSession();

  const user = session?.user;

  const handleSignOut = async () => {
    toast.success("সফলভাবে লগ আউট হয়েছে!");
    await signOut();
    // window.location.reload();
  };

  return (
    <div className="">
      {user ? (
        <div className="flex items-center justify-end gap-3">
          {user.image && (
            <img
              src={user.image}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border border-gray-200"
            />
          )}
          <h2 className="text-sm md:text-base font-semibold text-gray-800 whitespace-nowrap">
            {user.name}
          </h2>
          <button
            onClick={handleSignOut}
            className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-red-500 text-red-500 font-semibold text-[10px] md:text-sm hover:bg-red-50 hover:shadow-sm transition-all duration-300 whitespace-nowrap"
          >
            লগ আউট
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-1 md:gap-3">
          <Link href={"/sign-in"}>
            <button className="px-2 py-1 md:px-6 md:py-2.5 rounded-full border border-gray-200 text-gray-600 font-semibold text-[10px] md:text-sm hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 whitespace-nowrap">
              সাইন ইন
            </button>
          </Link>
          <Link href={"/sign-up"}>
            <button className="px-2 py-1 md:px-6 md:py-2.5 rounded-full bg-gradient-brand text-white font-semibold text-[10px] md:text-sm hover:opacity-90 transition-all duration-300 whitespace-nowrap">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
