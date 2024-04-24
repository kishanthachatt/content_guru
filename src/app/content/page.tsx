"use client";

import React from "react";
import Container from "@mui/material/Container";

import cn from "./content.module.scss";
import { InsertContent } from "@/contentguru-component/InsertContent";

const Content: React.FC = () => {
  return (
    <Container maxWidth="md" className={cn.contentContainer}>
      <InsertContent />
    </Container>
  );
};

export default Content;
