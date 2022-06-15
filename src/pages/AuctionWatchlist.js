import { useContext } from "react";
import AuctionList from "../components/auctions/AuctionList";
import WatchlistContext from "../store/watchlist-context";

function AuctionWatchlist() {
  const watchlistCtx = useContext(WatchlistContext);

  return (
    <section>
      <h1>- Auction Watchlist -</h1>
      <AuctionList auctionItems={watchlistCtx.watchlist} />
    </section>
  );
}

export default AuctionWatchlist;
