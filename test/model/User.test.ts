import { PosterArticle } from "../../src/model/article/PosterArticle"
import { BidValue } from "../../src/model/bid/BidValue"
import { User } from "../../src/model/user/User";
import { UserRol } from "../../src/model/user/UserRol";

describe('User', () => {

    let user: User
    let user2: User

    beforeEach(() => {
        user = new User('John', 'Doe', 'johndoe@example.com', 'ultrasecret');
        user2 = new User('Juan', 'Doe', 'johndoe@example.com', 'muysecret');
    })


    test('can not bid if not a reviewer', () => {
        const article = new PosterArticle('title', [user], user, 'URL1', 'URL2')
        expect(() => { user2.bidArticle(article, BidValue.INTERESADO) }).toThrow('Only reviewers can bid articles')
        expect(article.getBids().length).toBe(0)
    })


    test('can not bid for hes own article', () => {
        const article = new PosterArticle('title', [user], user, 'URL1', 'URL2')
        user.addRol(UserRol.REVIEWER)

        expect(() => { user.bidArticle(article, BidValue.INTERESADO) }).toThrow("Authors can't bid their own articles")
        expect(article.getBids().length).toBe(0)
    })


    test('should add bid corectly', () => {
        const article = new PosterArticle('title', [user], user, 'URL1', 'URL2')
        user2.addRol(UserRol.REVIEWER)

        user2.bidArticle(article, BidValue.INTERESADO)

        expect(article.getBids().length).toBe(1)
        expect(article.getBids()[0].getBidder()).toBe(user2)
    })


    test('should be able to update bid correctly', () => {
        const article = new PosterArticle('title', [user], user, 'URL1', 'URL2')
        user2.addRol(UserRol.REVIEWER)

        user2.bidArticle(article, BidValue.INTERESADO)
        user2.bidArticle(article, BidValue.QUIZAS)

        expect(article.getBids().length).toBe(1)
        expect(article.getBids()[0].getBidValue()).toBe(BidValue.QUIZAS)
    })


    test('should be able to review correctly', () => {

        const article = new PosterArticle('title', [user], user, 'URL1', 'URL2')
        user2.addRol(UserRol.REVIEWER)
        user2.addArticleToReview(article)
        user2.addReviewToArticle(article, 'good article', 3)

        expect(user2.getArticlesToReview().length).toBe(0)
        expect(user2.getReviewedArticles().length).toBe(1)
        expect(article.getReviews()[0].getReviewer()).toBe(user2)
        expect(article.getReviews()[0].getReview()).toBe('good article')

    })


    test("can't add review if article is not to review for user", () => {

        const article = new PosterArticle('title', [user], user, 'URL1', 'URL2')
        user2.addRol(UserRol.REVIEWER)

        expect(() => { user2.addReviewToArticle(article, 'good article', 3) }).toThrow("User can't review this article")
        expect(user2.getReviewedArticles().length).toBe(0)
        expect(article.getReviews().length).toBe(0)
    })


})