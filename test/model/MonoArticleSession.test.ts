import { PosterArticle } from "../../src/model/article/PosterArticle";
import { RegularArticle } from "../../src/model/article/RegularArticle";
import { ArticleReviewerAllocator } from "../../src/model/session/helpers/ArticleReviewerAllocator";
import { ArticleValidator } from "../../src/model/session/helpers/ArticleValidator";
import { MonoArticleSession } from "../../src/model/session/MonoArticleSession";
import { User } from "../../src/model/user/User";



describe('MonoArticleSession', () => {

    let session: MonoArticleSession<PosterArticle>;
    let article1: PosterArticle;
    let article2: RegularArticle;
    let reviewers: User[];
    let receptionDeadline: Date;
    let articleValidator: ArticleValidator;
    let articleReviewerAllocator: ArticleReviewerAllocator;

    beforeEach(() => {
        article1 = new PosterArticle('Poster', [new User('John', 'Doe', 'john@example.com', 'password')], new User('Jane', 'Doe', 'jane@example.com', 'password'), 'URL1', 'URL2');
        article2 = new RegularArticle('Regular', [new User('Alice', 'Smith', 'alice@example.com', 'password')], new User('Bob', 'Smith', 'bob@example.com', 'password'), 'URL3', 'Lorem ipsum');
        reviewers = [new User('Reviewer1', 'LastName1', 'reviewer1@example.com', 'password'), new User('Reviewer2', 'LastName2', 'reviewer2@example.com', 'password')];
        receptionDeadline = new Date('2024-12-31');
        articleValidator = new ArticleValidator();
        articleReviewerAllocator = new ArticleReviewerAllocator();
        session = new MonoArticleSession<PosterArticle>('AI', [article1], reviewers, receptionDeadline, articleValidator, articleReviewerAllocator, PosterArticle);
    });

    test('constructor initializes attributes correctly', () => {
        expect(session.getTheme()).toBe('AI');
        expect(session.getArticles()).toEqual([article1]);
        expect(session.getReceptionDeadline()).toBe(receptionDeadline);
    });

    test('recieveArticle accepts an article of the correct type', () => {
        session.recieveArticle(article1);
        expect(session.getArticles()).toContain(article1);
    });

    test('recieveArticle throws error for an article of incorrect type', () => {
        expect(() => session.recieveArticle(article2)).toThrow('Invalid article type');
    });
})