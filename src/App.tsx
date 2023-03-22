import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthContextProvider } from "./context/AuthContext";

// PAGES
import Login from "./pages/Login";
import AddEntities from "./pages/admin/AddEntities";
import Register from "./pages/admin/Register";
import Home from "./pages/Home";
import Storage from "./pages/Storage";
import Items from "./pages/Items";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <div className="app-wrapper font-mono">
        <Layout>
          <Routes>
            <Route index path="/" element={<ProtectedRoute page={Home} />} />
            <Route index path="/storage/:id" element={<Storage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add" element={<AddEntities />} />
            <Route path="/items" element={<Items />} />
          </Routes>
        </Layout>
      </div>
    </AuthContextProvider>
  );
};

export default App;