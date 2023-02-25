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

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <div className="app-wrapper">
        <Layout>
          <Routes>
            <Route index path="/" element={<Home />} />
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