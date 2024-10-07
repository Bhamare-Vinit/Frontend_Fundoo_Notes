import "./App.css";
import RoutingModule from "./router/Routers";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RoutingModule />
      </div>
    </Provider>
  );
}

export default App;
