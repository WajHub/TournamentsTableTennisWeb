import React from "react";
import { useAuth } from "../providers/AuthProvider.jsx";

function ProtectedRoute({ allowedRoles, children }) {
  const { user } = useAuth();
  if (user === undefined) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  if (
    user === null ||
    (!allowedRoles && allowedRoles.includes(user.roles[0]))
  ) {
    return <div>Permission denied</div>;
  }
  return children;
}

export default ProtectedRoute;
