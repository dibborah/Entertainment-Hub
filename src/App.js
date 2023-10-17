import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router";
import "./App.css";
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav";
import { Container } from "@mui/material";
import Trending from "./pages/Trending/Trending";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="app">
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" Component={Trending} exact />
              <Route path="/movies" Component={Movies} />
              <Route path="/series" Component={Series} />
              <Route path="/search" Component={Search} />
            </Routes>
          </Container>
        </div>
        <SimpleBottomNavigation />
      </BrowserRouter>
    </>
  );
}

export default App;
