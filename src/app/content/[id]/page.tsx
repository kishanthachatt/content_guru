"use client";

import React from "react";
import { useSelector } from "react-redux";
import { DateTime } from "luxon";
import { useParams, useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { RootState, useAppDispatch } from "@/store";
import { fetchPost } from "@/store/content/contentSlice";

import cn from "./ContentDetail.module.scss";

const ContentDetail: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isContentLoading, currentPost } = useSelector(
    (state: RootState) => state.content
  );

  React.useEffect(() => {
    dispatch(fetchPost(params.id as string));
  }, []);

  return (
    <Container maxWidth="lg" className={cn.contentDetailContainer}>
      {isContentLoading ? (
        <p>Loading...</p>
      ) : (
        <Card variant="outlined" className={cn.detailContentCard}>
          <CardHeader
            disableSpacing
            title={
              <Typography variant="h2">{currentPost.title ?? ""}</Typography>
            }
            subheader={
              <Typography variant="body2">
                {currentPost.createdTime !== "" &&
                  DateTime.fromISO(currentPost?.createdTime).toFormat(
                    "dd LLLL yyyy, cccc"
                  )}
              </Typography>
            }
          />

          <CardContent className={cn.cardContent}>
            <Typography variant="body1">
              {currentPost.content ?? "SORRY, NO CONTENT TO DISPLAY"}
            </Typography>
          </CardContent>
          <CardActions sx={{ paddingTop: "24px" }}>
            <Button
              variant="outlined"
              color="info"
              sx={{ width: "33%" }}
              onClick={() => router.push("/content")}
            >
              Back
            </Button>
            <Button variant="contained" color="error" sx={{ width: "34%" }}>
              Delete
            </Button>
            <Button variant="contained" color="info" sx={{ width: "33%" }}>
              Eidt
            </Button>
          </CardActions>
        </Card>
      )}
    </Container>
  );
};

export default ContentDetail;
