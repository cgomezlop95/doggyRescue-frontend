import { Routes, Route } from "react-router-dom";
import { ResponsiveNavBar } from "./components/ResponsiveNavBar";
import { SignUp } from "./pages/Signup";
import { Login } from "./pages/Login";
import { RequireAuth } from "./components/ProtectedRoute";
import { RequireAdmin } from "./components/AdminProtectedRoute";
import { DogForm } from "./pages/DogForm";
import { DogList } from "./pages/DogList";
import { DogCardDetailed } from "./pages/DogCardDetailed";
import { Mapbox } from "./pages/Mapbox";
import { AdoptionRequestForm } from "./pages/AdoptionRequestForm";
import { UpdateDogForm } from "./pages/UpdateDogForm";
import { RequestAdminTable } from "./pages/RequestAdminTable";
import { Profile } from "./pages/Profile";
import { AdoptedDogList } from "./pages/AdoptedDogList";
import { RequestDetailed } from "./pages/RequestDetailed";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { UpdateUserForm } from "./pages/UpdateUserForm";
import { MyAdoptionRequests } from "./pages/MyAdoptionRequests";
import { MySingleAdoptionRequest } from "./pages/MySingleAdoptionRequest";

export function App() {
  return (
    <Routes>
      <Route element={<ResponsiveNavBar />}>
        <Route path="/" element={<DogList />} />
        <Route path="/dogs/adopted" element={<AdoptedDogList />} />
        <Route path="dog/:id" element={<DogCardDetailed />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mapbox" element={<Mapbox />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route element={<RequireAuth />}>
          <Route path="/request-dog/:id" element={<AdoptionRequestForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/update" element={<UpdateUserForm />} />
          <Route
            path="/my-adoption-requests"
            element={<MyAdoptionRequests />}
          ></Route>
          <Route
            path="/my-adoption-request/:id"
            element={<MySingleAdoptionRequest />}
          ></Route>
          <Route path="/update-dog/:id" element={<UpdateDogForm />} />
        </Route>

        <Route element={<RequireAdmin />}>
          <Route path="/new-dog" element={<DogForm />} />
          <Route path="/adoption-requests" element={<RequestAdminTable />} />
          <Route path="/adoption-request/:id" element={<RequestDetailed />} />
        </Route>
      </Route>
    </Routes>
  );
}
