import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { NavBar } from "./components/NavBar";
import { SignUp } from "./pages/Signup";
import { Login } from "./pages/Login";
import { RequireAuth } from "./components/ProtectedRoute";
import { Dogs } from "./pages/Dogs";
import { DogForm } from "./pages/DogForm";

export function App() {
  return (
    <Routes>
      <Route element={<NavBar />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Homepage />} />
        </Route>
        <Route path="/dogs" element={<Dogs />} />
        <Route path="/new-dog" element={<DogForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
