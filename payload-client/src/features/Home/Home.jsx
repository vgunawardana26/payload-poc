import React, { useEffect } from "react";
import { parseHtmlWithLatex } from "../../components/math/util/parseHtmlWithLatex";
import { XXL } from "@edux-design/typography";
import axios from "../../services/api/axios";
import { Button } from "@edux-design/buttons";
import { useAuthContext } from "../../globals/auth/AuthProvider";

function Home() {
  const { currentUser } = useAuthContext();

  const fetchFunction = () => {
    axios.get("/oauth/start").then((data) => console.log(data));
  };

  return (
    <div>
      <Button onClick={fetchFunction}>Click me</Button>
      <XXL isBold>Welcome back, {currentUser?.user.firstName}</XXL>

      {parseHtmlWithLatex("$f(x) = y + x$")}
    </div>
  );
}

export default Home;
