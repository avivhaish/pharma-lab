import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { AuthContextProvider } from "./context/AuthContext";

// PAGES
import Login from "./pages/Login";
import AddEntities from "./pages/admin/AddEntities";


const App = () => {
  return (
    <AuthContextProvider>
      <div className="app-wrapper">
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/add" element={<AddEntities />} />
          </Routes>
        </Layout>
      </div>
    </AuthContextProvider>
  );
};

export default App;
