import React, { useState } from "react";
import auth from "../services/auth/authService";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../globals/auth/AuthProvider";
import {
  Sidebar,
  SidebarHeader,
  SidebarSection,
  SidebarItem,
  SidebarFooter,
} from "@edux-design/chrome";
import { Code, Book, Settings, Gologo } from "@edux-design/icons";

function SingedIn() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuthContext();
  const [active, setActive] = useState("home");

  const handleLogout = async () => {
    try {
      const res = await auth.logout();
      if (res.status === 200) {
        setIsLoggedIn(false);
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Sidebar defaultExpanded={true}>
      <SidebarHeader logo={<Gologo className="w-[32px] h-[32px]" />} />

      <SidebarSection title="Main">
        <SidebarItem
          icon={<Code />}
          label="Home"
          active={active === "home"}
          onClick={() => setActive("home")}
        />
        <SidebarItem
          icon={<Book />}
          label="Library"
          active={active === "library"}
          onClick={() => setActive("library")}
        />
      </SidebarSection>

      <SidebarSection title="Settings">
        <SidebarItem
          icon={<Settings />}
          label="Preferences"
          active={active === "prefs"}
          onClick={() => setActive("prefs")}
        />
      </SidebarSection>

      <SidebarFooter>
        <div>
          Signed in page!
          <button
            onClick={handleLogout}
            className="border-2 border-primary-700 hover:bg-primary-400 hover:cursor-pointer"
          >
            Logout
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default SingedIn;
