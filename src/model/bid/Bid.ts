
import { User } from "../user/User";
import { BidValue } from "./BidValue";

export class Bid {
    private bidder: User
    private bidValue: BidValue

    constructor(bidder: User, bidValue: BidValue) {
        this.bidder = bidder
        this.bidValue = bidValue
    }

    public getBidder(): User {
        return this.bidder
    }

    public setBidder(bidder: User): void {
        this.bidder = bidder
    }

    public getBidValue(): BidValue {
        return this.bidValue
    }

    public setBidValue(bidValue: BidValue): void {
        this.bidValue = bidValue
    }

}