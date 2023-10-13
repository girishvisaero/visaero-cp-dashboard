import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Divider,
  PasswordInput,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { hash } from "../../lib/utils";
import { loginService } from "../../services";
import { LoginFormSchema } from "../../validations/schema";

const LoginCard = ({ handleIsForgotPass }) => {
  const queryClient = useQueryClient();

  const theme = useMantineTheme();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "girish.chaudhari@visaero.com",
      password: "Smart@123",
    },
  });

  const { mutate, isLoading } = useMutation(loginService, {
    onSuccess: ({ data }) => {
      // console.log(data);
      if (data.data === "success") {
        queryClient.invalidateQueries("permissions");
        localStorage.setItem("session_id", data.dataobj?.session_id);
        localStorage.setItem("user_id", data.dataobj?._id);
        navigate("/");
      } else {
        notifications.show({
          title: "Error",
          color: "red",
          autoClose: 3000,
          message: data?.msg,
        });
      }
    },
    onError: () => {},
  });

  const onSubmit = async (data) => {
    let hash_pass = await hash(data.password);
    data.password = hash_pass;
    data.host = localStorage.getItem("host");
    mutate(data);
  };
  return (
    <Box
      bg="#fff"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      p={15}
      sx={{
        boxShadow: theme.shadows.md,
        borderRadius: theme.radius.sm,
        width: "100%",
      }}
    >
      <Text component="h1" size="2rem" m={0} align="center">
        Login
      </Text>
      <Divider my="sm" />
      <TextInput
        label="Enter Your Email"
        placeholder="Enter Your Email"
        withAsterisk
        error={errors.email && errors.email.message}
        mt="md"
        {...register("email")}
      />
      <PasswordInput
        label="Enter Your Password"
        placeholder="Enter Your Password"
        withAsterisk
        mt="md"
        error={errors.password && errors.password.message}
        {...register("password")}
      />
      <Text
        color="blue"
        align="end"
        my="sm"
        sx={{ textDecoration: "underline", cursor: "pointer" }}
        onClick={handleIsForgotPass}
      >
        Forgot Password?
      </Text>
      <Button loading={isLoading} type="submit" mt="md" fullWidth>
        Login
      </Button>
    </Box>
  );
};

export default LoginCard;
