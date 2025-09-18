import React from "react";
import auth from "../services/auth/authService";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../globals/auth/AuthProvider";

function SingedIn() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuthContext();

  
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
    <div>
      Signed in page!
      <button
        onClick={handleLogout}
        className="border-2 border-primary-700 hover:bg-primary-400 hover:cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}

export default SingedIn;
