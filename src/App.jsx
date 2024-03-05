import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { NavBar } from "./components/NavBar";
import { ResponsiveNavBar } from "./components/ResponsiveNavBar";
import { SignUp } from "./pages/Signup";
import { Login } from "./pages/Login";
import { RequireAuth } from "./components/ProtectedRoute";
import { RequireAdmin } from "./components/AdminProtectedRoute";
import { Dogs } from "./pages/Dogs";
import { DogForm } from "./pages/DogForm";
import { DogList } from "./pages/DogList";
import { DogCardDetailed } from "./pages/DogCardDetailed";
import { Mapbox } from "./pages/Mapbox";
import { SignUpBackup } from "./pages/SignupBackup";
import { LoginBackup } from "./pages/LoginBackup";
import { AdoptionRequestForm } from "./pages/AdoptionRequestForm";
import { UpdateDogForm } from "./pages/UpdateDogForm";
import { PendingRequests } from "./pages/PendingRequests";
import { ApprovedRequests } from "./pages/ApprovedRequests";
import { RejectedRequests } from "./pages/RejectedRequests";
import { RequestAdminTable } from "./pages/RequestAdminTable";
import { Profile } from "./pages/Profile";
import { AdoptedDogList } from "./pages/AdoptedDogList";

export function App() {
  return (
    <Routes>
      <Route element={<ResponsiveNavBar />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/request-dog/:id" element={<AdoptionRequestForm />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<RequireAdmin />}>
          <Route path="/new-dog" element={<DogForm />} />
        </Route>

        <Route path="/dogs/pending" element={<DogList />} />
        <Route path="/dogs/adopted" element={<AdoptedDogList />} />
        <Route path="dog/:id" element={<DogCardDetailed />} />
        <Route path="/update-dog/:id" element={<UpdateDogForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mapbox" element={<Mapbox />} />
        <Route
          path="/adoption-requests/pending"
          element={<RequestAdminTable />}
        />
        <Route
          path="/adoption-requests/approved"
          element={<ApprovedRequests />}
        />
        <Route
          path="/adoption-requests/rejected"
          element={<RejectedRequests />}
        />
      </Route>
    </Routes>
  );
}
