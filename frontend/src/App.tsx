import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import Reservation from "./pages/Reservation";
import Res from "./pages/Res";

const App = () => {
  return (
    <div className="m-0 p-0 box-border overflow-x-hidden text-black">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservation" element={<Reservation/>} />
          <Route path="/res" element={<Res/>} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Toaster /> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
