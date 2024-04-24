import React from "react";
import Image from "next/image";

import cn from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={cn.header}>
      <Image src="/logo.png" alt=" Logo" width={200} height={50} priority />
    </header>
  );
};

export default Header;
