import { Article } from "../../src/model/article/Article";
import { PosterArticle } from "../../src/model/article/PosterArticle";
import { RegularArticle } from "../../src/model/article/RegularArticle";
import { ArticleReviewerAllocator } from "../../src/model/session/helpers/ArticleReviewerAllocator";
import { ArticleValidator } from "../../src/model/session/helpers/ArticleValidator";
import { FixedCutSelector } from "../../src/model/session/helpers/FixedCutSelector";
import { BetterArticlesSelector } from "../../src/model/session/helpers/BetterArticlesSelector";
import { WorkshopSession } from "../../src/model/session/WorkshopSession";
import { User } from "../../src/model/user/User";


jest.mock('../../src/model/session/helpers/FixedCutSelector', () => {
    return {
        FixedCutSelector: jest.fn().mockImplementation(() => ({
            selectArticles: jest.fn()
        }))
    }
});

jest.mock('../../src/model/session/helpers/BetterArticlesSelector', () => {
    return {
        BetterArticlesSelector: jest.fn().mockImplementation(() => ({
            selectArticles: jest.fn()
        }))
    }
});

describe('WorkshopSession', () => {
    let session: WorkshopSession;
    let article1: Article;
    let article2: Article;
    let reviewers: User[];
    let receptionDeadline: Date;
    let articleValidator: ArticleValidator;
    let articleReviewerAllocator: ArticleReviewerAllocator;

    let fixedCutSelector: jest.Mocked<FixedCutSelector>;
    let betterArticlesSelector: jest.Mocked<BetterArticlesSelector>;

    beforeEach(() => {
        article1 = new PosterArticle('Poster', [new User('John', 'Doe', 'john@example.com', 'password')], new User('Jane', 'Doe', 'jane@example.com', 'password'), 'URL1', 'URL2');
        article2 = new RegularArticle('Regular', [new User('Alice', 'Smith', 'alice@example.com', 'password')], new User('Bob', 'Smith', 'bob@example.com', 'password'), 'URL3', 'Lorem ipsum');
        reviewers = [new User('Reviewer1', 'LastName1', 'reviewer1@example.com', 'password'), new User('Reviewer2', 'LastName2', 'reviewer2@example.com', 'password')];
        receptionDeadline = new Date('2024-12-31');
        articleValidator = new ArticleValidator();
        articleReviewerAllocator = new ArticleReviewerAllocator();
        session = new WorkshopSession('AI', [article1], receptionDeadline, articleValidator, articleReviewerAllocator);

        fixedCutSelector = new FixedCutSelector(40) as jest.Mocked<FixedCutSelector>;
        betterArticlesSelector = new BetterArticlesSelector(2) as jest.Mocked<BetterArticlesSelector>;

        session.setPosterArticleSelector(fixedCutSelector);
        session.setRegularArticleSelector(betterArticlesSelector);
    });

    test('constructor initializes attributes correctly', () => {
        expect(session.getTheme()).toBe('AI');
        expect(session.getArticles()).toEqual([article1]);
        expect(session.getReceptionDeadline()).toBe(receptionDeadline);
    });


    test("selects articles properly", () => {
        fixedCutSelector.selectArticles.mockReturnValueOnce([article1]);
        betterArticlesSelector.selectArticles.mockReturnValueOnce([article2]);
        session.selectArticles();

        expect(fixedCutSelector.selectArticles).toHaveBeenCalled();
        expect(betterArticlesSelector.selectArticles).toHaveBeenCalled();
    })





});