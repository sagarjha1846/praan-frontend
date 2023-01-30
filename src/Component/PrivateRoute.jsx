import { Navigate, Outlet, useLocation } from "react-router-dom";

export { PrivateRoute };

function PrivateRoute() {
  const location = useLocation(); // current location

  const userLogged = JSON.parse(localStorage.getItem("userLogged"));

  return userLogged ? (
    <Outlet />
  ) : (
    <Navigate
      to="/"
      replace
      state={{ from: location }} // <-- pass location in route state
    />
  );
}
