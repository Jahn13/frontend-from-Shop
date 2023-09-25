import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Login } from "../containers/login";
import { Products } from "../containers/products";
import { Brand } from "../containers/brands";
import { Category } from "../containers/categories";
import { LayoutShope } from "../layout";
import { useContext } from "react";
import { ProductContext } from "../context";
import { PreventDefault } from "../pages/PreventDefault";
import { Register } from "../containers/login/register";
import { User } from "../containers/users";

const AppRouter = () => {
  const { getTokenFromLocalStorage, getRoleFromLocalStorage } =
    useContext(ProductContext);
  const location = useLocation();

  const user = getTokenFromLocalStorage();
  const role = getRoleFromLocalStorage();

  return (
    <>
      <Routes>
        {!user ? (
          <>
            <Route index path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<PreventDefault />} />
          </>
        ) : null}
      </Routes>
      {user ? (
        <LayoutShope>
          <Routes>
            {role !== "moderador" ? (
              <>
                <Route index path="/users" element={<User />} />
                <Route path="/products" element={<Products />} />
                <Route path="/brands" element={<Brand />} />
                <Route path="/category" element={<Category />} />
                <Route path="*" element={<Navigate to="/users" />} />
              </>
            ) : (
              <>
                <Route path="/category" element={<Category />} />
                <Route path="*" element={<Navigate to="/category" />} />
              </>
            )}
          </Routes>
        </LayoutShope>
      ) : null}
    </>
  );
};

export { AppRouter };
