import { Article } from "../../article/Article";

export interface ArticleSelector {
    selectArticles(articles: Article[]): Article[]
}