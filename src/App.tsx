import { Route, Routes } from "react-router-dom";

import BlogItemPage from "./pages/blog-item";
import SignInPage from "./pages/signin";
import ProtectedRoute from "./components/protected-route";

import BlogPage from "@/pages/blog";

function App() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <BlogPage />
          </ProtectedRoute>
        }
        path="/"
      />
      <Route element={<SignInPage />} path="/signin" />
      <Route
        element={
          <ProtectedRoute>
            <BlogItemPage />
          </ProtectedRoute>
        }
        path="/:blogId"
      />
    </Routes>
  );
}

export default App;
