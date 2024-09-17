import { Article } from "../../src/model/article/Article";
import { ArticleStatus } from "../../src/model/article/ArticleStatus";
import { PosterArticle } from "../../src/model/article/PosterArticle";
import { Bid } from "../../src/model/bid/Bid";
import { BidValue } from "../../src/model/bid/BidValue";
import { Review } from "../../src/model/review/Review";
import { User } from "../../src/model/user/User";


describe('Article', () => {
    let article: Article;
    let author1: User;
    let author2: User;
    let notifier: User;
    let reviewer1: User;
    let reviewer2: User;
    let reviewer3: User;
    let reviewer4: User;
    let review: Review;
    let bid: Bid;

    beforeEach(() => {
        author1 = new User('Author1', 'LastName1', 'author1@example.com', 'password');
        author2 = new User('Author2', 'LastName2', 'author2@example.com', 'password');
        notifier = new User('Notifier', 'LastName', 'notifier@example.com', 'password');
        reviewer1 = new User('Reviewer1', 'LastName1', 'reviewer1@example.com', 'password');
        reviewer2 = new User('Reviewer2', 'LastName2', 'reviewer2@example.com', 'password');
        reviewer3 = new User('Reviewer3', 'LastName3', 'reviewer3@example.com', 'password');
        reviewer4 = new User('Reviewer4', 'LastName4', 'reviewer4@example.com', 'password');
        review = new Review(reviewer1, 'Good article', 2);
        bid = new Bid(reviewer1, BidValue.INTERESADO);
        article = new PosterArticle('Test Title', [author1, author2], notifier, 'url1', 'url2');
    });

    test('constructor initializes attributes correctly', () => {
        expect(article.getTitle()).toBe('Test Title');
        expect(article.getAuthors()).toEqual([author1, author2]);
        expect(article.getNotifier()).toBe(notifier);
        expect(article.getAttachedFile()).toBe('url1');
        expect(article.getStatus()).toBe(ArticleStatus.PENDING);
        expect(article.getBids()).toEqual([]);
        expect(article.getReviewers()).toEqual([]);
        expect(article.getReviews()).toEqual([]);
    });

    test('getTitle and setTitle work correctly', () => {
        article.setTitle('New Title');
        expect(article.getTitle()).toBe('New Title');
    });

    test('getAuthors and setAuthors work correctly', () => {
        article.setAuthors([author1]);
        expect(article.getAuthors()).toEqual([author1]);
    });

    test('getNotifier and setNotifier work correctly', () => {
        const newNotifier = new User('NewNotifier', 'LastName', 'newnotifier@example.com', 'password');
        article.setNotifier(newNotifier);
        expect(article.getNotifier()).toBe(newNotifier);
    });

    test('getAttachedFile and setAttachedFile work correctly', () => {
        article.setAttachedFile('newFile.pdf');
        expect(article.getAttachedFile()).toBe('newFile.pdf');
    });

    test('getStatus and setStatus work correctly', () => {
        article.setStatus(ArticleStatus.ACCEPTED);
        expect(article.getStatus()).toBe(ArticleStatus.ACCEPTED);
    });

    test('addReview adds a review correctly', () => {
        article.addReview(review);
        expect(article.getReviews()).toContain(review);
    });

    test('addBid adds a bid correctly and replaces existing bid from the same bidder', () => {
        article.addBid(bid);
        expect(article.getBids()).toContain(bid);

        const newBid = new Bid(reviewer1, BidValue.INTERESADO);
        article.addBid(newBid);
        expect(article.getBids()).toContain(newBid);
        expect(article.getBids()).not.toContain(bid);
    });

    test('addReviewer adds a reviewer correctly', () => {
        article.addReviewer(reviewer1);
        expect(article.getReviewers()).toContain(reviewer1);
    });

    test('addReviewer throws error if reviewer already assigned', () => {
        article.addReviewer(reviewer1);
        expect(() => article.addReviewer(reviewer1)).toThrow('Reviewer already assigned');
    });

    test('addReviewer throws error if there are already 3 reviewers', () => {
        article.addReviewer(reviewer1);
        article.addReviewer(reviewer2);
        article.addReviewer(reviewer3);
        expect(() => article.addReviewer(reviewer4)).toThrow('Article already has 3 reviewers');
    });

    test('removeReviewer removes a reviewer correctly', () => {
        article.addReviewer(reviewer1);
        article.removeReviewer(reviewer1);
        expect(article.getReviewers()).not.toContain(reviewer1);
    });
});