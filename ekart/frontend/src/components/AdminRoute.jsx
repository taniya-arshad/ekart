import Unauthorized from "../pages/Unauthorized";

function AdminRoute({ children }) {

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!token) {
    window.location.href = "/login";
    return null;
  }

  if (!storedUser) {
    window.location.href = "/login";
    return null;
  }

  const user = JSON.parse(storedUser);

  if (user.role !== "ADMIN") {
    return <Unauthorized />;
  }

  return children;
}

export default AdminRoute;