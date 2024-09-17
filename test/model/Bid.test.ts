import { Bid } from "../../src/model/bid/Bid";
import { BidValue } from "../../src/model/bid/BidValue";
import { User } from "../../src/model/user/User";


describe('Bid', () => {
    let bidder: User;
    let bidValue: BidValue;
    let bid: Bid;

    beforeEach(() => {
        bidder = new User('Bidder', 'LastName', 'bidder@example.com', 'password');
        bidValue = BidValue.INTERESADO
        bid = new Bid(bidder, bidValue);
    });

    test('constructor initializes attributes correctly', () => {
        expect(bid.getBidder()).toBe(bidder);
        expect(bid.getBidValue()).toBe(bidValue);
    });

    test('getBidder returns the bidder', () => {
        expect(bid.getBidder()).toBe(bidder);
    });

    test('setBidder sets the bidder', () => {
        const newBidder = new User('NewBidder', 'LastName', 'newbidder@example.com', 'password');
        bid.setBidder(newBidder);
        expect(bid.getBidder()).toBe(newBidder);
    });

    test('getBidValue returns the bid value', () => {
        expect(bid.getBidValue()).toBe(bidValue);
    });

    test('setBidValue sets the bid value', () => {
        const newBidValue = BidValue.QUIZAS
        bid.setBidValue(newBidValue);
        expect(bid.getBidValue()).toBe(newBidValue);
    });
});