import { PosterArticle } from '../../src/model/article/PosterArticle';
import { RegularArticle } from '../../src/model/article/RegularArticle';
import { User } from '../../src/model/user/User';
import { ArticleValidator } from '../../src/model/session/helpers/ArticleValidator';
import fs from 'fs';


const invalidAbstract = fs.readFileSync('test/resources/invalidAbstract.txt', 'utf8');


describe('ArticleValidator', () => {

    let user: User
    let articleValidator: ArticleValidator;


    beforeEach(() => {
        user = new User('John', 'Doe', 'johndoe@example.com', 'ultrasecret');
        articleValidator = new ArticleValidator();
    });



    test('accept valid articles', () => {
        const regularArticle = new RegularArticle('Regular', [user], user, 'URL1', 'short abstract');
        const posterArticle = new PosterArticle('Poster', [user], user, 'URL1', 'URL2');
        expect(articleValidator.isValidArticle(regularArticle)).toBe(true);
        expect(articleValidator.isValidArticle(posterArticle)).toBe(true);
    });


    test('reject if invalid abstract', () => {
        const regularArticle = new RegularArticle('Regular', [user], user, 'URL1', invalidAbstract);
        expect(articleValidator.isValidArticle(regularArticle)).toBe(false);;
    });


    test('reject if invalid title', () => {
        const posterArticle = new PosterArticle('', [user], user, 'URL1', 'URL2');
        expect(articleValidator.isValidArticle(posterArticle)).toBe(false);;
    });


    test('reject if invalid author', () => {
        const posterArticle = new PosterArticle('Poster', [], user, 'URL1', 'URL2');
        expect(articleValidator.isValidArticle(posterArticle)).toBe(false);;
    });

});