import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AllAuctionsPage from "./pages/AllAuctions";
import AuctionWatchlist from "./pages/AuctionWatchlist";
import NewAuctionPage from "./pages/NewAuction";

function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<AllAuctionsPage />}></Route>
        <Route path="/new-auction" element={<NewAuctionPage />}></Route>
        <Route path="/watch-list" element={<AuctionWatchlist />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
