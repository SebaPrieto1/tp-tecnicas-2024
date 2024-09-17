import { Article } from "../../article/Article"
import { ArticleSelector } from "./ArticleSelector"

export class FixedCutSelector implements ArticleSelector {
    private cutPercentaje: number

    public constructor(cutPercentaje: number) {
        this.cutPercentaje = cutPercentaje
    }

    public selectArticles(articles: Article[]): Article[] {
        const sortedArticles = this.sortBestArticles(articles)
        const cutIndex = Math.floor(sortedArticles.length * this.cutPercentaje / 100)
        return sortedArticles.slice(0, cutIndex)
    }

    private sortBestArticles(articles: Article[]): Article[] {
        return articles.sort((a, b) => b.getReviews().reduce((acc, review) => acc + review.getScore(), 0) - a.getReviews().reduce((acc, review) => acc + review.getScore(), 0))
    }
}