// import { Article } from "../article/Article"
import { Article } from "../article/Article"
import { Bid } from "../bid/Bid"
import { BidValue } from "../bid/BidValue"
import { Review } from "../review/Review"
import { ReviewRange } from "../review/ReviewRange"
import { UserRol } from "./UserRol"

export class User {

    private name: String
    private surname: String
    private email: String
    private password: String
    private rols: UserRol[] = []
    private articlesToReview: Article[] = []
    private reviewedArticles: Article[] = []

    constructor(name: String, surname: String, email: String, password: String) {
        this.name = name
        this.surname = surname
        this.email = email
        this.password = password
    }

    public getName(): String {
        return this.name
    }

    public setName(name: String): void {
        this.name = name
    }

    public getSurname(): String {
        return this.surname
    }

    public setSurname(surname: String): void {
        this.surname = surname
    }

    public getEmail(): String {
        return this.email
    }

    public setEmail(email: String): void {
        this.email = email
    }

    public getPassword(): String {
        return this.password
    }

    public setPassword(password: String): void {
        this.password = password
    }

    public addRol(rol: UserRol): void {
        if (this.rols.includes(rol)) throw new Error("User already has this rol")
        this.rols.push(rol)
    }

    public getRols(): UserRol[] {
        return this.rols
    }

    public getArticlesToReview(): Article[] {
        return this.articlesToReview
    }

    public addArticleToReview(article: Article): void {
        if (this.articlesToReview.includes(article)) throw new Error("Article already assigned")
        this.articlesToReview.push(article)
    }

    public removeArticleToReview(article: Article): void {
        this.articlesToReview = this.articlesToReview.filter(a => a !== article)
    }

    private hasRol(rol: UserRol): boolean {
        return this.rols.includes(rol)
    }

    public bidArticle(article: Article, bidValue: BidValue): void {
        if (!this.hasRol(UserRol.REVIEWER)) throw new Error("Only reviewers can bid articles")
        if (article.getAuthors().includes(this)) throw new Error("Authors can't bid their own articles")
        article.addBid(new Bid(this, bidValue))
    }


    public addReviewToArticle(article: Article, reviewDescription: string, reviewValue: ReviewRange,): void {
        if (!this.hasRol(UserRol.REVIEWER)) throw new Error("Only reviewers can review articles")
        if (!this.articlesToReview.includes(article)) throw new Error("User can't review this article")
        article.addReview(new Review(this, reviewDescription, reviewValue))
        this.articlesToReview = this.articlesToReview.filter(a => a !== article)
        this.reviewedArticles.push(article)
    }

    public getReviewedArticles(): Article[] {
        return this.reviewedArticles
    }


}