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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { RootState, useAppDispatch } from "@/store";
import { fetchPost } from "@/store/content/contentSlice";

import cn from "./ContentDetail.module.scss";
import axios from "axios";
import { showSnackbar } from "@/store/snackbar/snackbarSlice";
import { useSession } from "next-auth/react";

const ContentDetail: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data: session } = useSession();
  const { isContentLoading, currentPost } = useSelector(
    (state: RootState) => state.content
  );
  const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);

  React.useEffect(() => {
    dispatch(fetchPost(params.id as string));
  }, []);

  const onSubmitDelete = () => {
    setDeleteDialog(false);
    onDeleteConfirm();
  };

  const onBack = () => {
    setDeleteDialog(false);
  };

  const onDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`/api/content/?id=${params.id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: session?.user.accessToken,
        },
      });
      if (response.status === 200) {
        router.push("/content");
        dispatch(
          showSnackbar({ message: response.data.message, type: "success" })
        );
      }
    } catch (error) {
      dispatch(
        showSnackbar({ message: "Failed to delete post!", type: "error" })
      );
    }
  };

  return (
    <React.Fragment>
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
              <Button
                variant="contained"
                color="info"
                sx={{ width: "34%" }}
                onClick={() =>
                  router.push(`/content/edit-content/${params.id}`)
                }
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ width: "33%" }}
                onClick={() => setDeleteDialog(true)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        )}
      </Container>
      <Dialog open={deleteDialog} onClose={onBack}>
        <DialogContent>
          <DialogContentText>
            <Typography variant="h3">
              Are you sure, you want to delete the post?
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onBack} variant="outlined" sx={{ width: "20%" }}>
            Back
          </Button>
          <Button
            variant="contained"
            onClick={onSubmitDelete}
            autoFocus
            color="error"
            sx={{ width: "20%" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ContentDetail;
