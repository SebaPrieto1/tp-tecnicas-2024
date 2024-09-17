import { Article } from "../article/Article";
import { PosterArticle } from "../article/PosterArticle";
import { RegularArticle } from "../article/RegularArticle";
import { User } from "../user/User";
import { ArticleReviewerAllocator } from "./helpers/ArticleReviewerAllocator";
import { ArticleSelector } from "./helpers/ArticleSelector";
import { ArticleValidator } from "./helpers/ArticleValidator";
import { Session } from "./Session";

export class WorkshopSession extends Session {

    private regularArticleSelector: ArticleSelector | undefined
    private posterArticleSelector: ArticleSelector | undefined

    constructor(
        theme: String,
        articles: Article[],
        receptionDeadline: Date,
        articleValidator: ArticleValidator,
        articleReviewerAllocator: ArticleReviewerAllocator,
    ) {
        super(theme, articles, receptionDeadline, articleValidator, articleReviewerAllocator)
    }


    public setRegularArticleSelector(selector: ArticleSelector): void {
        this.regularArticleSelector = selector
    }

    public setPosterArticleSelector(selector: ArticleSelector): void {
        this.posterArticleSelector = selector
    }

    public selectArticles(): Article[] {
        if (!this.regularArticleSelector || !this.posterArticleSelector) {
            throw new Error('Aricle selectors not set')
        }

        const regularArticles = this.articles.filter(article => article instanceof RegularArticle)
        const posterArticles = this.articles.filter(article => article instanceof PosterArticle)

        const selectedRegularArticles = this.regularArticleSelector.selectArticles(this.articles)
        const selectedPosterArticles = this.posterArticleSelector.selectArticles(this.articles)

        return [...selectedRegularArticles, ...selectedPosterArticles]
    }
}