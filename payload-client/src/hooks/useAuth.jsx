import React, { useState } from "react";

function useAuth(email, password, cb) {
  const [loading, setLoading] = useState();
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [error, setError] = useState();

  return <div>useAuth</div>;
}

export default useAuth;
