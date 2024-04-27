"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { LoginForm } from "./login.interface";

import cn from "./login.module.scss";

const Login: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (session && session.user) {
      router.push("/content");
    }
  }, [session, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    setLoading(true);
    const result = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: true,
      callbackUrl: "/content",
    });
    setLoading(false);
  };

  return (
    <Container className={cn.loginContainer}>
      <Card variant="outlined" className={cn.loginCard}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Typography variant="h3" color={"#2081b5"}>
              Welcome to Content Guru
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              error={Boolean(errors.username)}
              helperText={errors.username?.message as string}
              {...register("username", { required: "Username is required" })}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              error={Boolean(errors.password)}
              helperText={errors.password?.message as string}
              {...register("password", { required: "Password is required" })}
            />
          </CardContent>
          <CardActions className={cn.loginCardAction}>
            <Button variant="contained" color="primary" type="submit">
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
