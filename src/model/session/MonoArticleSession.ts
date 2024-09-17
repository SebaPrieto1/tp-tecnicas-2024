import { Article } from "../article/Article"
import { PosterArticle } from "../article/PosterArticle"
import { User } from "../user/User"
import { ArticleReviewerAllocator } from "./helpers/ArticleReviewerAllocator"
import { ArticleValidator } from "./helpers/ArticleValidator"
import { Session } from "./Session"

export class MonoArticleSession<T> extends Session {

    private cls: { new(...args: any[]): T };

    constructor(
        theme: String,
        articles: PosterArticle[],
        reviewers: User[],
        receptionDeadline: Date,
        articleValidator: ArticleValidator,
        articleReviewerAllocator: ArticleReviewerAllocator,
        cls: { new(...args: any[]): T }
    ) {
        super(theme, articles, receptionDeadline, articleValidator, articleReviewerAllocator)
        this.cls = cls
    }

    public recieveArticle(article: Article): void {
        if (!(article instanceof this.cls)) {
            throw new Error('Invalid article type')
        }
        super.recieveArticle(article)
    }

}