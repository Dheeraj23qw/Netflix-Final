import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Signup from "./component/signup";
import Signin from "./component/signin";
import First from "./component/first";
import Player from "./component/player"; 
import Movies from "../pages/movies";
import Tv from "../pages/Tv";
import Netflix from "../pages/Netflix";
import UserLiked from "./component/userLiked";
import Cart from "./component/cart";
import Cancel from "../pages/cancel";
import Success from "../pages/success";
import Moviehomepg from "../pages/moviehomepg";
function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/first" element={<First />} />
          <Route path="/player" element={<Player />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/" element={<Netflix />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/list" element={<UserLiked />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/success" element={<Success />} />
          <Route path="/moviepg" element={<Moviehomepg />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
