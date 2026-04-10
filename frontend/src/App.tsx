import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Reservation from "./pages/Reservation";
import Menu from "./pages/Menu";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <div className="m-0 p-0 box-border overflow-x-hidden text-black">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservation" element={<Reservation/>} />
          <Route path="/menu" element={<Menu/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
