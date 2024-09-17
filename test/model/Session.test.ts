

import { Article } from '../../src/model/article/Article';
import { PosterArticle } from '../../src/model/article/PosterArticle';
import { RegularArticle } from '../../src/model/article/RegularArticle';
import { Session } from '../../src/model/session/Session';
import { User } from '../../src/model/user/User';
import { ArticleValidator } from '../../src/model/session/helpers/ArticleValidator';
import { ArticleReviewerAllocator } from '../../src/model/session/helpers/ArticleReviewerAllocator';
import { ArticleStatus } from '../../src/model/article/ArticleStatus';
import { UserRol } from '../../src/model/user/UserRol';
import { FixedCutSelector } from '../../src/model/session/helpers/FixedCutSelector';


jest.mock('../../src/model/session/helpers/ArticleValidator', () => {
    return {
        ArticleValidator: jest.fn().mockImplementation(() => ({
            isValidArticle: jest.fn()
        }))
    }
});

jest.mock('../../src/model/session/helpers/ArticleReviewerAllocator', () => {
    return {
        ArticleReviewerAllocator: jest.fn().mockImplementation(() => ({
            allocateReviewers: jest.fn()
        }))
    }
});

describe('Session', () => {
    let session: Session;
    let article1: Article;
    let article2: Article;
    let receptionDeadline: Date;
    let user1: User
    let user2: User
    let articleValidator: jest.Mocked<ArticleValidator>;
    let articleReviewerAllocator: jest.Mocked<ArticleReviewerAllocator>;



    beforeEach(() => {
        user1 = new User('John', 'Doe', 'johndoe@example.com', 'ultrasecret');
        user2 = new User('Juan', 'Doe', 'juandoe@example.com', 'muysecreto');
        articleValidator = new ArticleValidator() as jest.Mocked<ArticleValidator>;
        articleReviewerAllocator = new ArticleReviewerAllocator() as jest.Mocked<ArticleReviewerAllocator>;



        article1 = new PosterArticle('Poster', [user1], user2, 'URL1', 'URL2');
        article2 = new RegularArticle('Regular', [user2], user1, 'URL1', 'Lorem ipsum');
        receptionDeadline = new Date('2024-12-31');
        session = new Session('IA', [article1, article2], receptionDeadline, articleValidator, articleReviewerAllocator);
    });


    test('constructor initializes attributes correctly', () => {
        expect(session.getTheme()).toBe('IA');
        expect(session.getArticles()).toEqual([article1, article2]);
        expect(session.getReceptionDeadline()).toBe(receptionDeadline);
    });



    test('recieveArticle adds a new article', () => {
        const article3 = new PosterArticle('Poster2', [user1], user2, 'URL1', 'URL2');
        articleValidator.isValidArticle.mockReturnValue(true)
        session.recieveArticle(article3);

        expect(articleValidator.isValidArticle).toHaveBeenCalledWith(article3)
        expect(session.getArticles()).toContain(article3);
        expect(article3.getStatus()).toBe(ArticleStatus.ACCEPTED);
    });



    test('recieveArticle rejects article when date limit exceeded', () => {
        session.setReceptionDeadline(new Date('2020-12-31'));
        const article3 = new PosterArticle('Poster2', [user1], user2, 'URL1', 'URL2');

        expect(() => { session.recieveArticle(article3) }).toThrow('The reception deadline has passed');
        expect(articleValidator.isValidArticle).not.toHaveBeenCalled();
        expect(session.getArticles()).not.toContain(article3);
        expect(article3.getStatus()).toBe(ArticleStatus.REJECTED);
    });



    test('recieveArticle rejects invalid articles', () => {
        const article3 = new PosterArticle('Poster2', [user1], user2, 'URL1', 'URL2');
        articleValidator.isValidArticle.mockReturnValue(false)


        expect(() => { session.recieveArticle(article3) }).toThrow('Invalid article');
        expect(articleValidator.isValidArticle).toHaveBeenCalled();
        expect(session.getArticles()).not.toContain(article3);
        expect(article3.getStatus()).toBe(ArticleStatus.REJECTED);
    });



    test('selection can not take place if any article lacks a review', () => {
        articleValidator.isValidArticle.mockReturnValue(true)
        session.setArticleSelector(new FixedCutSelector(40))

        const reviewer1 = new User('Reviewer', 'Doe', 'reviewer@example.com', 'ultrasecret');
        const reviewer2 = new User('Reviewer2', 'Doe', 'reviewer2@example.com', 'ultrasecret');
        const reviewer3 = new User('Reviewer3', 'Doe', 'reviewer2@example.com', 'ultrasecret');

        reviewer1.addRol(UserRol.REVIEWER)
        reviewer2.addRol(UserRol.REVIEWER)
        reviewer3.addRol(UserRol.REVIEWER)

        const article3 = new PosterArticle('Article3', [user1], user1, 'URL1', 'URL2')
        const article4 = new PosterArticle('Article4', [user1], user1, 'URL1', 'URL2')
        const article5 = new PosterArticle('Article5', [user1], user1, 'URL1', 'URL2')

        session.recieveArticle(article3);
        session.recieveArticle(article4);
        session.recieveArticle(article5);

        reviewer1.addArticleToReview(article3)
        reviewer1.addArticleToReview(article4)
        reviewer1.addArticleToReview(article5)

        reviewer2.addArticleToReview(article3)
        reviewer2.addArticleToReview(article4)
        reviewer2.addArticleToReview(article5)

        reviewer3.addArticleToReview(article3)
        reviewer3.addArticleToReview(article4)
        reviewer3.addArticleToReview(article5)

        reviewer1.addReviewToArticle(article3, 'good article', 2)
        reviewer1.addReviewToArticle(article4, 'regular article', 0)
        reviewer1.addReviewToArticle(article5, 'bad article', -2)

        reviewer2.addReviewToArticle(article3, 'good article', 1)
        reviewer2.addReviewToArticle(article4, 'really bad article', -3)
        reviewer2.addReviewToArticle(article5, 'regular article', 1)

        reviewer3.addReviewToArticle(article3, 'good article', 1)
        reviewer3.addReviewToArticle(article4, 'really bad article', -3)



        expect(() => { session.selectArticles(); }).toThrow('All articles must have at least 3 reviews');

    })



    test('selection can not take place if article selector is not defined', () => {
        expect(() => { session.selectArticles(); }).toThrow('Article selector not defined');
    })

});