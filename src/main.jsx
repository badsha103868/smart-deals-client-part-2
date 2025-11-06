import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./Layout/Root.jsx";
import Home from "./Components/Home/Home.jsx";
import AllProducts from "./AllProducts/AllProducts.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import Register from "./Components/Register/Register.jsx";
import MyProducts from "./Components/MyProducts/MyProducts.jsx";
import MyBids from "./Components/MyBids/MyBids.jsx";
import PrivateRoute from "./Context/PrivateRoute.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import CreateAProduct from "./Components/CreateAProduct/CreateAProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allProducts",
        Component: AllProducts,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/myProducts",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "/myBids",
        element: (
          <PrivateRoute>
            <MyBids></MyBids>
          </PrivateRoute>
        ),
      },
      
      {
        path: "/productDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        element: <PrivateRoute>
          <ProductDetails></ProductDetails>
        </PrivateRoute>,
      },
      {
        path: '/createAProduct',
        element: <PrivateRoute>
          <CreateAProduct></CreateAProduct>
        </PrivateRoute>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
