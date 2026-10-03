import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Workouts from "./pages/Workouts";
import WorkoutDetails from "./pages/WorkoutDetails";
import ProtectedRoute from "./ProtectedRoutes";
import PublicRoute from "./PublicRoutes";
import Weight from "./pages/Weight";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/weight" element={<Weight />} />
        <Route path="/details/:id" element={<WorkoutDetails />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
