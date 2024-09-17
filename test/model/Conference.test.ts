import { Conference } from "../../src/model/Conference";
import { ArticleReviewerAllocator } from "../../src/model/session/helpers/ArticleReviewerAllocator";
import { ArticleValidator } from "../../src/model/session/helpers/ArticleValidator";
import { Session } from "../../src/model/session/Session";
import { User } from "../../src/model/user/User";


describe('Conference', () => {
    let conference: Conference;
    let chairs: User[];
    let reviewers: User[];
    let authors: User[];
    let sessions: Session[];

    beforeEach(() => {
        chairs = [new User('Chair1', 'LastName1', 'chair1@example.com', 'password')];
        reviewers = [new User('Reviewer1', 'LastName1', 'reviewer1@example.com', 'password')];
        authors = [new User('Author1', 'LastName1', 'author1@example.com', 'password')];
        sessions = [new Session('Session1', [], new Date('2024-12-31'), new ArticleValidator(), new ArticleReviewerAllocator())];
        conference = new Conference(chairs, reviewers, authors, sessions);
    });

    test('constructor initializes attributes correctly', () => {
        expect(conference.getChairs()).toBe(chairs);
        expect(conference.getReviewers()).toBe(reviewers);
        expect(conference.getAuthors()).toBe(authors);
        expect(conference.getSessions()).toBe(sessions);
    });

    test('setChairs sets the chairs properly', () => {
        const newChairs = [new User('Chair2', 'LastName2', 'chair2@example.com', 'password')];
        conference.setChairs(newChairs);
        expect(conference.getChairs()).toBe(newChairs);
    });


    test('setReviewers sets the reviewers properly', () => {
        const newReviewers = [new User('Reviewer2', 'LastName2', 'reviewer2@example.com', 'password')];
        conference.setReviewers(newReviewers);
        expect(conference.getReviewers()).toBe(newReviewers);
    });

    test('getAuthors returns the authors properly', () => {
        expect(conference.getAuthors()).toBe(authors);
    });

});