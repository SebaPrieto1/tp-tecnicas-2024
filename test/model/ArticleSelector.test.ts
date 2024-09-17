import { Article } from "../../src/model/article/Article"
import { PosterArticle } from "../../src/model/article/PosterArticle"
import { RegularArticle } from "../../src/model/article/RegularArticle"
import { ArticleSelector } from "../../src/model/session/helpers/ArticleSelector"
import { BetterArticlesSelector } from "../../src/model/session/helpers/BetterArticlesSelector"
import { FixedCutSelector } from "../../src/model/session/helpers/FixedCutSelector"
import { User } from "../../src/model/user/User"
import { UserRol } from "../../src/model/user/UserRol"

describe('ArticleSelector', () => {
    let articleSelector: ArticleSelector
    let reviewer1: User
    let reviewer2: User

    let author: User

    let article1: Article
    let article2: Article
    let article3: Article
    let article4: Article
    let article5: Article


    beforeEach(() => {
        reviewer1 = new User('John', 'Doe', 'johndoe@example.com', '');
        reviewer1.addRol(UserRol.REVIEWER)

        reviewer2 = new User('Ema', 'Doe', 'emadoe@example.com', '')
        reviewer2.addRol(UserRol.REVIEWER)

        author = new User('Pedro', 'Doe', 'pepedoe@example.com', 'notasecret')

        article1 = new PosterArticle('Article1', [author], author, 'URL1', 'URL2')
        article2 = new PosterArticle('Article2', [author], author, 'URL1', 'URL2')
        article3 = new RegularArticle('Article3', [author], author, 'URL1', 'lorem')
        article4 = new RegularArticle('Article4', [author], author, 'URL1', 'ipsum')
        article5 = new RegularArticle('Article5', [author], author, 'URL1', 'dolor')

        reviewer1.addArticleToReview(article1)
        reviewer1.addArticleToReview(article2)
        reviewer1.addArticleToReview(article3)
        reviewer1.addArticleToReview(article4)
        reviewer1.addArticleToReview(article5)

        reviewer2.addArticleToReview(article1)
        reviewer2.addArticleToReview(article2)
        reviewer2.addArticleToReview(article3)
        reviewer2.addArticleToReview(article4)
        reviewer2.addArticleToReview(article5)

        reviewer1.addReviewToArticle(article1, 'good article', 2)
        reviewer1.addReviewToArticle(article2, 'regular article', 0)
        reviewer1.addReviewToArticle(article3, 'bad article', -2)
        reviewer1.addReviewToArticle(article4, 'very good article', 2)
        reviewer1.addReviewToArticle(article5, 'excelent article', 3)

        reviewer2.addReviewToArticle(article1, 'good article', 1)
        reviewer2.addReviewToArticle(article2, 'really bad article', -3)
        reviewer2.addReviewToArticle(article3, 'regular article', 1)
        reviewer2.addReviewToArticle(article4, 'very good article', 2)
        reviewer2.addReviewToArticle(article5, 'excelent article', 3)

    })

    test('fixedCut selects articles properly', () => {
        articleSelector = new FixedCutSelector(40)
        const articles = [article1, article2, article3, article4, article5]
        const selectedArticles = articleSelector.selectArticles(articles)

        expect(selectedArticles.length).toBe(2)
        expect(selectedArticles[0]).toBe(article5)
        expect(selectedArticles[1]).toBe(article4)
    })

    test('betterArticle selects articles properly', () => {
        articleSelector = new BetterArticlesSelector(1)
        const articles = [article1, article2, article3, article4, article5]
        const selectedArticles = articleSelector.selectArticles(articles)

        expect(selectedArticles.length).toBe(3)
        expect(selectedArticles.includes(article1)).toBe(true)
        expect(selectedArticles.includes(article4)).toBe(true)
        expect(selectedArticles.includes(article5)).toBe(true)

    })


})