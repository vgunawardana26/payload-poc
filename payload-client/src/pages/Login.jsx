import React, { useEffect, useState } from "react";
import { useDeviceSizeContext } from "../globals/context/DeviceSizeContextProvider";
import { useAuthContext } from "../globals/auth/AuthProvider";
import clsx from "clsx";
import { Navigate, useNavigate } from "react-router-dom";
import auth from "../services/auth/authService";
import { Button } from "@edux-design/buttons";
import { Field, Label, Input } from "@edux-design/forms";
import { Chevron, Close, Eye, Eyehide } from "@edux-design/icons";
import { L, XL, XXL, XXXL } from "@edux-design/typography";
import { emailOnlySchema, validate, passwordOnlySchema } from "../schemas/auth";
import { Alert, Body, Title } from "@edux-design/alerts";

function Home() {
  const { isSmall, isMedium, isLarge } = useDeviceSizeContext();
  const { isLoggedIn, loading, setIsLoggedIn, currentUser, setCurrentUser } =
    useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const PAGE_CONTAINER_STYLES = clsx("flex", {
    "flex-col-reverse": isSmall,
    "flex-row": !isSmall,
  });

  const PANEL_ONE_STYLES = clsx(
    "bg-primary-700 flex flex-col justify-center items-center p-10",
    { "w-full h-[100dvh]": isSmall },
    { "w-[50%]": !isSmall }
  );

  const PANEL_TWO_STYLES = clsx(
    "h-[100dvh] flex flex-col justify-center items-center gap-5",
    { "w-full": isSmall },
    { "w-[50%]": !isSmall }
  );

  const handleSubmit = async () => {
    try {
      const res = await auth.login(email, password);
      if (res?.data?.user) {
        setCurrentUser(res.data);
        setIsLoggedIn(true);
        navigate("/home");
      } else {
        setError(res);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn && !loading) {
      navigate("/home");
    }
  }, [isLoggedIn, loading, navigate]);

  const emailValidity = validate(emailOnlySchema, { email });
  const passwordValidity = validate(passwordOnlySchema, { password });

  return (
    <>
      {!isLoggedIn && !loading && (
        <div className={PAGE_CONTAINER_STYLES}>
          <div className={PANEL_ONE_STYLES}>
            <XXL color="secondary" isBold>
              GO admin area.
            </XXL>
            <XXL isBold color="secondary">
              Manage product.
            </XXL>
            <XXL isBold color="secondary">
              Build content.
            </XXL>
            <XXL isBold color="secondary">
              View documentation.
            </XXL>
            <img src="pencil.svg" className="h-[200px] w-[400px]" />
          </div>
          <div className={PANEL_TWO_STYLES}>
            {/* SIGNIN FORM */}

            <div className="flex flex-col justifty-center items-center">
              <span>
                <div className="flex flex-col justify-center items-center">
                  <img src="logo.svg" className="h-[100px] w-[200px]" />
                </div>
                <L isBold tag="h1">
                  Sign in to OG Admin
                </L>
              </span>
            </div>
            {/* FORM */}
            <div className="w-[75%] space-y-2 max-w-[400px]">
              <div className="flex flex-col gap-8">
                <Field>
                  <Label hint={"required"}>Email</Label>
                  <Input
                    // startIcon={<Chevron />}
                    // endIcon={<Close />}
                    variant={"primary"}
                    clearable={true}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                <Field>
                  <Label hint={"required"}>Password</Label>
                  <Input
                    endIcon={
                      showPassword ? (
                        <Eyehide
                          className="cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <Eye
                          className="cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )
                    }
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Field>
              </div>
              <div className="mt-8">
                <Button
                  disabled={!emailValidity.success || !passwordValidity.success}
                  isStretched
                  onClick={() => handleSubmit()}
                >
                  Log in
                </Button>
                {error && (
                  <Alert type="error">
                    <Title>Error cobba</Title>
                    <Body>Shut up m8</Body>
                  </Alert>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
