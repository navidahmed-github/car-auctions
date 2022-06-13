import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AllAuctions from "./pages/AllAuctionsPage";
import AucationWatchlist from "./pages/AuctionWatchlist";
import NewAuction from "./pages/NewAuction";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" exact>
          <AllAuctions />
        </Route>
        <Route path="/new-auction">
          <NewAuction />
        </Route>
        <Route path="/watch-list">
          <AucationWatchlist />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
