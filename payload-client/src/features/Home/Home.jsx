import React, { useEffect } from "react";
import { parseHtmlWithLatex } from "../../components/math/util/parseHtmlWithLatex";
import { XXXL } from "@edux-design/typography";
import { useUserContext } from "../../globals/context/User";

function Home() {
  const { currentUser } = useUserContext();

  useEffect(() => {
    console.log({ currentUser });
  }, [currentUser]);

  return (
    <div>
      <XXXL isBold>Hello World!</XXXL>
      Some math sdfg
      {parseHtmlWithLatex("$f(x) = y + x$")}
    </div>
  );
}

export default Home;
