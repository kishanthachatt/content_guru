"use client";

import * as React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { FormLabel } from "@mui/material";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { showSnackbar } from "@/store/snackbar/snackbarSlice";
import { ContentForm, InsertContentProps as Props } from "./InsertContent.type";
import { EditorState, ContentState, convertToRaw, Modifier } from "draft-js";
import { Editor, ContentBlock } from "react-draft-wysiwyg";
import { stateToHTML } from "draft-js-export-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import cn from "./InsertContent.module.scss";

const InsertContent: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContentForm>();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [guruLoading, setGuruLoading] = React.useState<boolean>(false);
  const [prompt, setPrompt] = React.useState<string>("");
  const [promptMessage, setPromptMessage] = React.useState<string>("");
  const [promtDialog, setPromtDialog] = React.useState<boolean>(false);
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const onSubmit: SubmitHandler<ContentForm> = async (data: ContentForm) => {
    setLoading(true);
    const rawContentState = stateToHTML(editorState.getCurrentContent());
    try {
      const response = await axios.post(
        "/api/content",
        {
          title: data.title,
          content: rawContentState,
          author: session?.user.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: session?.user.accessToken,
          },
        }
      );
      if (response.status === 201) {
        router.push("/content");
        setLoading(false);
        dispatch(
          showSnackbar({ message: response.data.message, type: "success" })
        );
      }
    } catch (error) {
      dispatch(
        showSnackbar({ message: "Failed to create post!", type: "error" })
      );
      setLoading(false);
    }
  };

  const askGuruSubmit = async () => {
    setGuruLoading(true);
    try {
      const response = await axios.post(
        "/api/openai",
        {
          prompt: prompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: session?.user.accessToken,
          },
        }
      );
      if (response.status === 200) {
        setPromptMessage(response.data.message);
        setPromtDialog(true);
        setGuruLoading(false);
        setPrompt("");
        dispatch(
          showSnackbar({
            message: "Guru replied successfully",
            type: "success",
          })
        );
      }
    } catch (error) {
      setGuruLoading(false);
      dispatch(
        showSnackbar({
          message: "Sorry! Guru failed to reply",
          type: "error",
        })
      );
    }
  };

  const addGuruSuggestion = () => {
    const existingContentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const collapsedSelectionState = selectionState.merge({
      anchorOffset: selectionState.getEndOffset(),
      focusOffset: selectionState.getEndOffset(),
    });
    const newContentText = `\n<p> ${promptMessage}<p>`;
    const newContentState = Modifier.insertText(
      existingContentState,
      collapsedSelectionState,
      newContentText
    );
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "insert-characters"
    );
    setEditorState(newEditorState);
  };

  const onPromtAccept = () => {
    setPromtDialog(false);
    addGuruSuggestion();
    setPrompt("");
    setPromptMessage("");
  };

  const onPromtReject = () => {
    setPromtDialog(false);
    setPrompt("");
    setPromptMessage("");
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg" className={cn.insertContentContainer}>
        <Card variant="outlined" className={cn.insertContentCard}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className={cn.card}>
              <FormLabel className={cn.formLabel}>Title</FormLabel>
              <TextField
                variant="outlined"
                placeholder="Add a title"
                error={Boolean(errors.title)}
                helperText={errors.title?.message as string}
                {...register("title", { required: "Title is required" })}
                fullWidth
                disabled={guruLoading}
              />
              <FormLabel className={cn.formLabel}>Content</FormLabel>
              <Editor
                toolbar={{
                  options: [
                    "inline",
                    "fontFamily",
                    "list",
                    "textAlign",
                    "link",
                    "emoji",
                    "remove",
                    "history",
                  ],
                }}
                editorState={editorState}
                onEditorStateChange={setEditorState}
              />
              <Divider />
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={10}>
                  <TextField
                    variant="filled"
                    placeholder="How can I help you? Ask content guru !"
                    fullWidth
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={guruLoading}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={askGuruSubmit}
                  >
                    {guruLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Ask Guru"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                disabled={guruLoading}
                onClick={() => router.push("/content")}
                sx={{ width: "50%" }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={guruLoading}
                sx={{ width: "50%" }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Add my Content"
                )}
              </Button>
            </CardActions>
          </form>
        </Card>
      </Container>
      <Dialog open={promtDialog} onClose={onPromtReject}>
        <DialogTitle>{"Guru's suggestion about your content"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{promptMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onPromtReject}>Reject</Button>
          <Button onClick={onPromtAccept} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default InsertContent;
