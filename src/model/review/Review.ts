import { User } from "../user/User"
import { ReviewRange } from "./ReviewRange"

export class Review {
    private reviewer: User
    private review: string
    private score: ReviewRange

    constructor(reviewer: User, review: string, score: ReviewRange) {
        this.reviewer = reviewer
        this.review = review
        this.score = score
    }

    public getReviewer(): User {
        return this.reviewer
    }

    public setReviewer(reviewer: User): void {
        this.reviewer = reviewer
    }

    public getReview(): string {
        return this.review
    }

    public setReview(review: string): void {
        this.review = review
    }

    public getScore(): number {
        return this.score
    }

    public setScore(score: ReviewRange): void {
        this.score = score
    }

}