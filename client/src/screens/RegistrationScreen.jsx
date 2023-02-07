import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link as ReactLink } from "react-router-dom";import TextField from "../components/TextField";
import PasswordTextField from "../components/PasswordTextField";
import { register } from "../redux/actions/userActions";

const RegistrationScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;
  const redirect = "/products";
  const toast = useToast();
  const headingBr = useBreakpointValue({ base: "xs", md: "sm" });
  const boxBr = useBreakpointValue({ base: "transparent", md: "bg-surface" });

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toast({
        description: "Account created. Welcome to the shop.",
        status: "success",
        isClosable: true,
      });
    }
  }, [redirect, userInfo, navigate, toast, error]);

  return (
    <Formik
      initialValues={{ email: "", password: "", name: "", confirmPassword: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("A name is required."),
        email: Yup.string()
          .email("Invalid Email")
          .required("An email address is required."),
        password: Yup.string()
          .min(5, "Password is too short. Must contain at least 5 characters.")
          .required("A password is required."),
        confirmPassword: Yup.string()
          .min(5, "Password is too short. Must contain at least 5 characters.")
          .required("A password is required.")
          .oneOf([Yup.ref("password"), null], "Passwords must match."),
      })}
      onSubmit={(values) => {
        dispatch(register(values.name, values.email, values.password));
      }}
    >
      {(formik) => (
        <Container
          maxW="lg"
          py={{ base: "12", md: "24" }}
          px={{ base: "0", md: "8" }}
          minH="4xl"
        >
          <Stack spacing="8">
            <Stack spacing="6">
              <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                <Heading size={{ headingBr }}>Create an account.</Heading>
                <HStack spacing="1" justify="center">
                  <Text color="muted">Already a user?</Text>
                  <Button
                    as={ReactLink}
                    to="/login"
                    variant="link"
                    colorScheme="orange"
                  >
                    Sign in
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            <Box
              py={{ base: "0", md: "8" }}
              px={{ base: "4", md: "10" }}
              bg={{ boxBr }}
              boxShadow={{ base: "none", md: "xl" }}
            >
              <Stack spacing="6" as="form" onSubmit={formik.handleSubmit}>
                {error && (
                  <Alert
                    status="error"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                  >
                    <AlertIcon />
                    <AlertTitle>Oops! </AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing="5">
                  <FormControl>
                    <TextField
                      type="text"
                      name="name"
                      placeholder="Your first and last name."
                      label="Full name"
                    />
                    <TextField
                      type="text"
                      name="email"
                      placeholder="you@example.com"
                      label="Email"
                    />
                    <PasswordTextField
                      type="password"
                      name="password"
                      placeholder="Your password"
                      label="Password"
                    />
                    <PasswordTextField
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password."
                      label="Confirm your password"
                    />
                  </FormControl>
                </Stack>
                <Stack spacing="6">
                  <Button
                    colorScheme="orange"
                    size="lg"
                    fontSize="md"
                    isLoading={loading}
                    type="submit"
                  >
                    Sign up
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default RegistrationScreen;
