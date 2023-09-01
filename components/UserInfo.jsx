"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";

const UserInfo = () => {
  const { data: session } = useSession();
  console.log("sessionn ---> " + session);
  return (
    <div className="rounded-lg border px-6 py-5 transition border-neutral-700 hover:dark:bg-neutral-800/30">
      <Image
        src="/no-user-no-back.png"
        className="mb-3"
        alt="avatar"
        width={90}
        height={90}
      />
      <p className="text-md text-neutral-500 mb-1">
        Name : {session?.user?.fullname}
      </p>
      <p className="text-md text-neutral-500 mb-3">
        Email : {session?.user?.email}
      </p>
      <button
        onClick={() => signOut()}
        className="px-6 py-1 text-md rounded-sm self-center duration-200 border border-neutral-700 bg-neutral-700 hover:bg-transparent"
      >
        Logout
      </button>
    </div>
  );
};

export default UserInfo;
