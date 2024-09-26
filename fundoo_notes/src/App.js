import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Routers from "./router/Routers";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Home />
      {/* <Routers /> */}
      {/* <Login /> */}
      {/* <Register></Register> */}
    </div>
  );
}

export default App;
