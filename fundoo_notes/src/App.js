import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Routers from "./router/Routers";

function App() {
  return (
    <div className="App">
      {/* <Routers/> */}
      {/* <Routers></Routers> */}
      <Login />
      {/* <Register /> */}
    </div>
  );
}

export default App;
