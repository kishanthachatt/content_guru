"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { RootState, useAppDispatch } from "@/store";

import cn from "./content.module.scss";
import { fetchContents } from "@/store/content/contentSlice";

const Content: React.FC = () => {
  const { data, isContentLoading } = useSelector(
    (state: RootState) => state.content
  );
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  React.useEffect(() => {
    dispatch(fetchContents());
  }, [dispatch]);

  console.log(data, "testing");
  return (
    <Container maxWidth="md" className={cn.contentContainer}>
      <Box
        component="header"
        p={3}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h2" color={"#2081b5"}>
          Posts
        </Typography>
        <Button variant="contained" color="primary">
          Add post
        </Button>
      </Box>
      <Divider />
      {isContentLoading ? <p>Loading...</p> : <p>content loaded</p>}
    </Container>
  );
};

export default Content;
