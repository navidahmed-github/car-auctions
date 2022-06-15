import { createContext, useState } from "react";

const WatchlistContext = createContext({
  watchlist: [],
  totalWatchlist: 0,
});

export function WatchlistContextProvider(props) {
  const [userWatchlist, setUserWatchlist] = useState([]);

  function addToWatchlistHandler(watchAuctionItem) {
    setUserWatchlist((prevUserWatchlist) => {
      return prevUserWatchlist.concat(watchAuctionItem);
    });
  }

  function removeFromWatchlistHandler(auctionItemID) {
    setUserWatchlist((prevUserWatchlist) => {
      return prevUserWatchlist.filter(
        (auctionItem) => auctionItem.id !== auctionItemID
      );
    });
  }

  function auctionItemInWatchlistHandler(auctionItemID) {
    return userWatchlist.some(
      (auctionItem) => auctionItem.id === auctionItemID
    );
  }

  const context = {
    watchlist: userWatchlist,
    totalWatchlist: userWatchlist.length,
    addToWatchlist: addToWatchlistHandler,
    removeFromWatchlist: removeFromWatchlistHandler,
    auctionItemInWatchlist: auctionItemInWatchlistHandler,
  };

  return (
    <WatchlistContext.Provider value={context}>
      {props.children}
    </WatchlistContext.Provider>
  );
}

export default WatchlistContext;
