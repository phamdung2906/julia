/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useAuth } from "../Contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!user) navigate("/login");
    },
    [user, navigate],
  );
  if (!user) return <p>You need to login first...</p>;
  return <div>{children}</div>;
}

export default ProtectedRoute;
