"use client";

import * as React from "react";
import axios from "axios";
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
import { ContentForm, InsertContentProps as Props } from "./InsertContent.type";

import cn from "./InsertContent.module.scss";

const InsertContent: React.FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContentForm>();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [prompt, setPrompt] = React.useState<string>("");

  const onSubmit: SubmitHandler<ContentForm> = async (data: ContentForm) => {
    try {
      const response = await axios.post("/api/content", {
        title: data.title,
        content: data.content,
        author: "66290619a7620126d1ab06bb",
      });
      // Handle successful response (replace with your logic)
      console.log("Content created successfully:", response.data);
    } catch (error) {
      debugger;
      console.error("Failed to create content:", error);
    }
  };

  // const askGuruSubmit = async (e: any) => {
  //   e.preventDefault();
  //   const res = await fetch("/api/openai", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ prompt }),
  //   });
  //   debugger;

  //   const data = await res.json();
  //   console.log(data, "Data");
  //   // setResponse(data.choices[0].text);
  // };

  const askGuruSubmit = async () => {
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });
      const data = await response.json();
      // setGeneratedText(data.text);
    } catch (error) {
      console.error("Error generating text:", error);
    }
  };

  return (
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
            />
            <FormLabel className={cn.formLabel}>Content</FormLabel>
            <TextField
              placeholder="Enter your content"
              variant="outlined"
              multiline
              rows={7}
              error={Boolean(errors.content)}
              helperText={errors.content?.message as string}
              {...register("content", { required: "Content is required" })}
              fullWidth
            />
            <Divider />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={10}>
                <TextField
                  variant="filled"
                  placeholder="How can I help you? Ask content guru !"
                  fullWidth
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={askGuruSubmit}
                >
                  Ask Guru
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 2 }}>
            <Button variant="contained" color="primary" type="submit">
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
  );
};

export default InsertContent;
