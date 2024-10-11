import React from "react";
import { useAuth } from "../auth/AuthProvider.js";

function ProtectedRoute({ allowedRoles, children }) {
  const { user } = useAuth();
  if (user === undefined) {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  if (
    user === null ||
    (!allowedRoles && allowedRoles.includes(user.roles[0]))
  ) {
    return <div>Permision denied</div>;
  }
  return children;
}

export default ProtectedRoute;
