import { Article } from "../article/Article"
import { ArticleStatus } from "../article/ArticleStatus"
import { ArticleValidator } from "../session/helpers/ArticleValidator"
import { User } from "../user/User"
import { ArticleReviewerAllocator } from "./helpers/ArticleReviewerAllocator"
import { ArticleSelector } from "./helpers/ArticleSelector"

export class Session {

    protected theme: String
    protected articles: Article[]
    protected receptionDeadline: Date
    protected articleValidator: ArticleValidator
    protected articleReviewerAllocator: ArticleReviewerAllocator
    protected articleSelector: ArticleSelector | undefined


    constructor(theme: String, articles: Article[], receptionDeadline: Date, articleValidator: ArticleValidator, articleReviewerAllocator: ArticleReviewerAllocator) {
        this.theme = theme
        this.articles = articles
        this.receptionDeadline = receptionDeadline
        this.articleValidator = articleValidator
        this.articleReviewerAllocator = articleReviewerAllocator
    }

    public recieveArticle(article: Article): void {
        if (this.receptionDeadline < new Date()) {
            article.setStatus(ArticleStatus.REJECTED)
            throw new Error('The reception deadline has passed')
        }

        if (!this.articleValidator.isValidArticle(article)) {
            article.setStatus(ArticleStatus.REJECTED)
            throw new Error('Invalid article')
        }

        article.setStatus(ArticleStatus.ACCEPTED)
        this.addArticle(article)
    }

    private addArticle(article: Article): void {
        const foundArticle = this.findArticle(article.getTitle())

        if (foundArticle) {
            this.articles = this.articles.filter(article => article.getTitle() !== foundArticle.getTitle())
        }

        this.articles.push(article)
    }

    private findArticle(articleTitle: string): Article | undefined {
        return this.articles.find(article => article.getTitle() === articleTitle)
    }

    public getTheme(): String {
        return this.theme
    }

    public setTheme(theme: String): void {
        this.theme = theme
    }

    public getArticles(): Article[] {
        return this.articles
    }

    public setArticles(articles: Article[]): void {
        this.articles = articles
    }

    public getReceptionDeadline(): Date {
        return this.receptionDeadline
    }

    public setReceptionDeadline(receptionDeadline: Date): void {
        this.receptionDeadline = receptionDeadline
    }

    public asignReviewers(reviewers: User[]): void {
        this.articleReviewerAllocator.allocateReviewers(this.articles, reviewers)
    }

    public setArticleSelector(articleSelector: ArticleSelector): void {
        this.articleSelector = articleSelector
    }

    public selectArticles(): Article[] {
        if (!this.articleSelector) throw new Error('Article selector not defined')
        if (this.articles.some(article => article.getReviews().length < 3)) throw new Error('All articles must have at least 3 reviews')
        return this.articleSelector.selectArticles(this.articles)
    }
}