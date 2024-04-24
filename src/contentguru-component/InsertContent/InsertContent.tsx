import * as React from "react";
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
import { ContentForm, InsertContentProps as Props } from "./InsertContent.type";

import cn from "./InsertContent.module.scss";

export function InsertContent(props: Props): React.ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContentForm>();

  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmit: SubmitHandler<ContentForm> = async (data: ContentForm) => {};

  return (
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
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="success" fullWidth>
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
  );
}
