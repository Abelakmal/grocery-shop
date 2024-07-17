import ReactDOM from "react-dom/client";
import "./index.css";
import { Routers } from "./routers/router.app.";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routers />
  </BrowserRouter>
);
