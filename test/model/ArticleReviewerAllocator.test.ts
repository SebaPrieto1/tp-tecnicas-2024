import { Article } from "../../src/model/article/Article"
import { PosterArticle } from "../../src/model/article/PosterArticle"
import { BidValue } from "../../src/model/bid/BidValue"
import { ArticleReviewerAllocator } from "../../src/model/session/helpers/ArticleReviewerAllocator"
import { User } from "../../src/model/user/User"
import { UserRol } from "../../src/model/user/UserRol"

describe('ArticleReviewerAllocator', () => {

    let user1: User
    let user2: User
    let user3: User
    let user4: User
    let author: User

    let article1: Article
    let article2: Article
    let article3: Article
    let article4: Article
    let article5: Article

    let articleReviewerAllocator: ArticleReviewerAllocator

    beforeEach(() => {
        user1 = new User('John', 'Doe', 'johndoe@example.com', 'ultrasecret');
        user2 = new User('Pedro', 'Doe', 'pepedoe@example.com', 'notasecret')
        user3 = new User('Pablo', 'Doe', 'pablodoe@example.com', 'notasecret')
        user4 = new User('Daniel', 'Doe', 'danieldoe@example.com', 'notasecret')
        author = new User('Romeo', 'Doe', '', '')

        article1 = new PosterArticle('Article1', [author], author, 'URL1', 'URL2')
        article2 = new PosterArticle('Article2', [author], author, 'URL1', 'URL2')
        article3 = new PosterArticle('Article3', [author], author, 'URL1', 'URL2')
        article4 = new PosterArticle('Article4', [author], author, 'URL1', 'URL2')
        article5 = new PosterArticle('Article5', [author], author, 'URL1', 'URL2')

        articleReviewerAllocator = new ArticleReviewerAllocator()
    })



    test('allocateReviewers assigns reviewers properly no interest', () => {
        const articles = [article1, article2, article3]
        const reviewers = [user1, user2, user3]

        articleReviewerAllocator.allocateReviewers(articles, reviewers)

        expect(article1.getReviewers().length).toBe(3)
        expect(article2.getReviewers().length).toBe(3)
        expect(article3.getReviewers().length).toBe(3)
    })


    test('allocateReviewers assigns reviewers even when there are bids', () => {
        const articles = [article1, article2, article3, article4, article5]
        const reviewers = [user1, user2, user3, user4]

        user4.addRol(UserRol.REVIEWER)
        user3.addRol(UserRol.REVIEWER)
        user2.addRol(UserRol.REVIEWER)
        user1.addRol(UserRol.REVIEWER)

        user1.bidArticle(article1, BidValue.INTERESADO)
        user4.bidArticle(article1, BidValue.NO_INTERESADO)
        user4.bidArticle(article5, BidValue.NO_INTERESADO)
        user3.bidArticle(article1, BidValue.INTERESADO)
        user3.bidArticle(article2, BidValue.QUIZAS)
        user3.bidArticle(article4, BidValue.NO_INTERESADO)
        user3.bidArticle(article5, BidValue.NO_INTERESADO)


        articleReviewerAllocator.allocateReviewers(articles, reviewers)

        expect(article1.getReviewers().length).toBe(3)
        expect(article2.getReviewers().length).toBe(3)
        expect(article3.getReviewers().length).toBe(3)
        expect(article4.getReviewers().length).toBe(3)
        expect(article5.getReviewers().length).toBe(3)
        expect(
            user1.getArticlesToReview().length +
            user2.getArticlesToReview().length +
            user3.getArticlesToReview().length +
            user4.getArticlesToReview().length
        ).toBe(15)
    })





})
