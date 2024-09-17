import { StringUtils } from "../../../utils/StringUtils"
import { Article } from "../../article/Article"
import { RegularArticle } from "../../article/RegularArticle"


export class ArticleValidator {

    public isValidArticle(article: Article): boolean {
        let isValid: boolean = this.validTitle(article) && this.validAuthors(article) ?
            true : false

        if (article instanceof RegularArticle) {
            isValid = this.validAbstract(article) ?
                true : false
        }

        return isValid
    }

    private validAbstract(article: RegularArticle): Boolean {
        return StringUtils.countWords(article.getAbstract()) < 300
    }

    private validTitle(article: Article): Boolean {
        return !StringUtils.isEmpty(article.getTitle())
    }

    private validAuthors(article: Article): Boolean {
        return article.getAuthors().length > 0
    }

}