"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { RootState, useAppDispatch } from "@/store";
import { fetchContents } from "@/store/content/contentSlice";
import { ContentCard } from "@/components/ContentCard";

import cn from "./content.module.scss";
import Loader from "@/components/Loader";

const Content: React.FC = () => {
  const { data, isContentLoading } = useSelector(
    (state: RootState) => state.content
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  React.useEffect(() => {
    dispatch(fetchContents());
  }, []);

  const onAddpostClick = () => {
    router.push("/content/insert-content");
  };

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
        <Button variant="contained" color="primary" onClick={onAddpostClick}>
          Add post
        </Button>
      </Box>
      <Divider />
      <Box pt={4} sx={{ height: "100%" }}>
        {isContentLoading ? (
          <Loader />
        ) : (
          <Grid container spacing={1.5} pb={5}>
            {data.contents
              ? data.contents.map((item, index) => (
                  <Grid item key={index} xs={12} md={6}>
                    <ContentCard
                      title={item.title}
                      content={item.content}
                      id={item._id}
                    />
                  </Grid>
                ))
              : ""}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Content;
