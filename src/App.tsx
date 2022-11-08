import Header from "./components/Header";

const App = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "red", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1, backgroundColor: "gold", overflowX: "auto" }}>
        <div>
          hello from main
        </div>
      </main>
    </div>
  );
};

export default App;
