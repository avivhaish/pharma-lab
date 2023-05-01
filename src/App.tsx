import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthContextProvider } from "./context/AuthContext";

// PAGES
import Login from "./pages/Login";
import AddEntities from "./pages/admin/AddEntities";
// import Register from "./pages/admin/Register";
import Home from "./pages/Home";
import Storage from "./pages/Storage";
import Profile from "./pages/Profile";
import Notifications from "./pages/admin/Notifications";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import Item from "./pages/Item";

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <div className="app-wrapper font-mono">
        <Layout>
          <Routes>
            <Route index path="/" element={<ProtectedRoute page={Home} />} />
            <Route path="/add" element={<ProtectedRoute page={AddEntities} />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<ProtectedRoute page={Register} />} /> */}
            <Route index path="/storage/:id" element={<Storage />} />
            <Route path="/item/:itemId" element={<ProtectedRoute page={Item} />} />
            <Route path="/profile" element={<ProtectedRoute page={Profile} />} />
            <Route path="/notifications" element={<ProtectedRoute page={Notifications} />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </Layout>
      </div>
    </AuthContextProvider>
  );
};

export default App;