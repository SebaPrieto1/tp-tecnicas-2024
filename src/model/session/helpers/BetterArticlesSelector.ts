import { Article } from "../../article/Article";

export class BetterArticlesSelector {

    private scoreThreshold: number

    constructor(scoreThreshold: number) {
        this.scoreThreshold = scoreThreshold
    }

    public selectArticles(articles: Article[]): Article[] {
        return articles.filter(article =>
            article.getReviews().reduce((acc, review) => acc + review.getScore(), 0) > this.scoreThreshold
        )
    }
}