import { Article } from "../../article/Article"
import { BidValue } from "../../bid/BidValue"
import { User } from "../../user/User"


export class ArticleReviewerAllocator {

    public allocateReviewers(articles: Article[], reviewers: User[]): void {

        const totalReviews = 3 * articles.length
        const reviewsPerUser = Math.ceil(totalReviews / reviewers.length)
        const assignedArticles = []


        for (let article of articles) {
            const interesados = article.getBids().filter(bid => bid.getBidValue() == BidValue.INTERESADO).map(bid => bid.getBidder())
            const quizas = article.getBids().filter(bid => bid.getBidValue() == BidValue.QUIZAS).map(bid => bid.getBidder())
            const noInteresados = article.getBids().filter(bid => bid.getBidValue() == BidValue.NO_INTERESADO).map(bid => bid.getBidder())
            const sinOpinion = reviewers.filter(reviewer => !article.getBids().map(bid => bid.getBidder()).includes(reviewer))


            try {
                this.assign(article, interesados, reviewsPerUser)
                this.assign(article, quizas, reviewsPerUser)
                this.assign(article, sinOpinion, reviewsPerUser)
                this.assign(article, noInteresados, reviewsPerUser)

                while (article.getReviewers().length < 3) {
                    const randomArticle: Article = assignedArticles[Math.floor(Math.random() * assignedArticles.length)]
                    const randomReviewer: User = randomArticle.getReviewers()[Math.floor(Math.random() * randomArticle.getReviewers().length)]

                    const availableReviewers: User[] = reviewers.filter(reviewer => reviewer.getArticlesToReview().length < reviewsPerUser)
                    const randomAvailableReviewer: User = availableReviewers[Math.floor(Math.random() * availableReviewers.length)]


                    if (article.getReviewers().includes(randomReviewer) || randomArticle.getReviewers().includes(randomAvailableReviewer)) {
                        continue
                    }
                    randomArticle.removeReviewer(randomReviewer)
                    randomArticle.addReviewer(randomAvailableReviewer)

                    randomReviewer.removeArticleToReview(randomArticle)
                    randomReviewer.addArticleToReview(article)
                    article.addReviewer(randomReviewer)
                }

            } catch (error) {
                if (error instanceof Error && error.message == "Article already has 3 reviewers") {
                    assignedArticles.push(article)
                }
            }

            reviewers.sort((a, b) => a.getArticlesToReview().length - b.getArticlesToReview().length)
        }
    }

    private assign(article: Article, reviewers: User[], reviewsPerUser: number): void {
        reviewers.forEach(user => {
            if (user.getArticlesToReview().length < reviewsPerUser) {
                article.addReviewer(user)
                user.addArticleToReview(article)
            }
        })
    }

}