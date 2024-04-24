"use client";

import React from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

import cn from "./Header.module.scss";

const Header: React.FC = () => {
  const { data: session } = useSession();
  const isAuthenticated: Boolean = session !== null && session?.user !== null;
  return (
    <header className={cn.header}>
      <Image src="/logo.png" alt=" Logo" width={200} height={50} priority />
      {isAuthenticated && (
        <div className={cn.profile}>
          <div className={cn.name}>
            <b>{session?.user.username}</b>
            <span onClick={() => signOut()}>Sign Out</span>
          </div>
          <div className={cn.image}>
            {session?.user.username.charAt(0).toUpperCase()}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
