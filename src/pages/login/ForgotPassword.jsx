import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Divider,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { hash } from "../../lib/utils";
import { forgotPassword } from "../../services";
import { ForgotPassSchema } from "../../validations/schema";

const ForgotPassword = ({ handleIsForgotPass }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ForgotPassSchema),
    defaultValues: { email: "girish.chaudhari@visaero.com" },
  });

  const { mutate, isLoading } = useMutation(forgotPassword, {
    onSuccess: ({ data }) => {
      if (data.data === "success") {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
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
    data.host = "visaero";
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
      <Text component="h1" size="1.5rem" m={0} align="center">
        Reset Password
      </Text>
      <Divider my="sm" />
      <Text size={"sm"}>
        Enter the email associated with your account and we'll send an email
        with instructions to reset your password
      </Text>
      <TextInput
        label="Enter Your Email"
        placeholder="Enter Your Email"
        withAsterisk
        error={errors.email && errors.email.message}
        mt="md"
        {...register("email")}
      />

      <Button loading={isLoading} type="submit" mt="md" fullWidth>
        Submit
      </Button>
      <Text
        color="brand"
        sx={{ cursor: "pointer" }}
        onClick={handleIsForgotPass}
        align="center"
        fw={"bold"}
        fz={"sm"}
        py="sm"
      >
        Login
      </Text>
    </Box>
  );
};

export default ForgotPassword;
