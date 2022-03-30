import "./App.scss";
import AppRouter from "./AppRouter";
import { AppState } from "../store/AppState";

function App() {
  return (
    <div className="App">
      <AppState>
        <AppRouter />
      </AppState>
    </div>
  );
}

export default App;
