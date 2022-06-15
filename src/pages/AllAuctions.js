import { useEffect, useState } from "react";
import AuctionList from "../components/auctions/AuctionList";

function AllAuctionsPage() {
  const [isLoaded, setIsLoaded] = useState(0);
  const [loadedAuctions, setLoadedAuctions] = useState([]);

  useEffect(() => {
    fetch(
      "https://car-auctions-dcddb-default-rtdb.firebaseio.com/auctionItems.json"
    )
      .then((response) => {
        setIsLoaded(true);
        return response.json();
      })
      .then((data) => {
        const auctionItems = [];

        for (const key in data) {
          const auctionItem = {
            id: key,
            ...data[key],
          };
          auctionItems.push(auctionItem);
        }
        setLoadedAuctions(auctionItems);
      });
  });

  return (
    <section>
      <h1>{isLoaded ? "- Auction List -" : "...loading..."}</h1>
      <AuctionList auctionItems={loadedAuctions} />
    </section>
  );
}

export default AllAuctionsPage;
