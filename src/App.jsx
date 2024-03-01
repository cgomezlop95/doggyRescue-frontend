import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { NavBar } from "./components/NavBar";
import { SignUp } from "./pages/Signup";
import { Login } from "./pages/Login";
import { RequireAuth } from "./components/ProtectedRoute";
import { Dogs } from "./pages/Dogs";
import { DogForm } from "./pages/DogForm";
import { DogList } from "./pages/DogList";
import { DogCardDetailed } from "./pages/DogCardDetailed";
import { Mapbox } from "./pages/Mapbox";
import { SignUpBackup } from "./pages/SignupBackup";
import { LoginBackup } from "./pages/LoginBackup";
import { AdoptionRequestForm } from "./pages/AdoptionRequestForm";

export function App() {
  return (
    <Routes>
      <Route element={<NavBar />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Homepage />} />
        </Route>
        <Route path="/dogs/pending" element={<DogList />} />
        <Route path="dog/:id" element={<DogCardDetailed />} />
        <Route path="/dog/:id/request" element={<AdoptionRequestForm />} />
        <Route path="/new-dog" element={<DogForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mapbox" element={<Mapbox />} />
      </Route>
    </Routes>
  );
}
