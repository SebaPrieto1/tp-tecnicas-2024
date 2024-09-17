import { Bid } from "../bid/Bid";
import { Review } from "../review/Review";
import { User } from "../user/User";
import { ArticleStatus } from "./ArticleStatus";

export abstract class Article {

    protected title: string

    protected authors: User[]

    protected notifier: User

    protected attachedFile: string

    protected status: ArticleStatus = ArticleStatus.PENDING

    protected bids: Bid[] = []

    protected reviewers: User[] = []

    protected reviews: Review[] = []

    public constructor(title: string, authors: User[], notifier: User, attachedFile: string) {
        this.title = title
        this.authors = authors
        this.notifier = notifier
        this.attachedFile = attachedFile
    }

    public getTitle(): string {
        return this.title
    }

    public setTitle(title: string): void {
        this.title = title
    }

    public getAuthors(): User[] {
        return this.authors
    }

    public setAuthors(authors: User[]): void {
        this.authors = authors
    }

    public getNotifier(): User {
        return this.notifier
    }

    public setNotifier(notifier: User): void {
        this.notifier = notifier
    }

    public getAttachedFile(): string {
        return this.attachedFile
    }

    public setAttachedFile(attachedFile: string): void {
        this.attachedFile = attachedFile
    }

    public getStatus(): ArticleStatus {
        return this.status
    }

    public setStatus(status: ArticleStatus): void {
        this.status = status
    }

    public addReview(review: Review): void {
        this.reviews.push(review)
    }

    public getReviews(): Review[] {
        return this.reviews
    }

    public getBids(): Bid[] {
        return this.bids
    }

    public addBid(bid: Bid): void {
        if (this.bids.some(b => b.getBidder() === bid.getBidder())) {
            this.bids = this.bids.filter(b => b.getBidder() !== bid.getBidder())
        }
        this.bids.push(bid)
    }

    public addReviewer(reviewer: User): void {
        if (this.reviewers.includes(reviewer)) throw new Error("Reviewer already assigned")
        if (this.reviewers.length >= 3) throw new Error("Article already has 3 reviewers")
        this.reviewers.push(reviewer)
    }

    public removeReviewer(reviewer: User): void {
        this.reviewers = this.reviewers.filter(r => r !== reviewer)
    }

    public getReviewers(): User[] {
        return this.reviewers
    }


}