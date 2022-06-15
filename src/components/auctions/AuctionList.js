import AuctionItem from "./AuctionItem";
import classes from "./AuctionList.module.css";

function AuctionList(props) {
  return (
    <ul className={classes.list}>
      {props.auctionItems.length > 0 ? (
        props.auctionItems.map((auctionItem) => (
          <AuctionItem
            id={auctionItem.id}
            key={auctionItem.id}
            image={auctionItem.image}
            auctionTitle={auctionItem.auctionTitle}
            description={auctionItem.description}
            price={auctionItem.price}
          />
        ))
      ) : (
        <h3>No Auctions Here!</h3>
      )}
    </ul>
  );
}

export default AuctionList;
