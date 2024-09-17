import { Session } from "./session/Session"
import { User } from "./user/User"

export class Conference {

    private chairs: User[]
    private reviewers: User[] = []
    private authors: User[]
    private sessions: Session[]

    public constructor(chairs: User[], reviewers: User[], authors: User[], sessions: Session[]) {
        this.chairs = chairs
        this.reviewers = reviewers
        this.authors = authors
        this.sessions = sessions

    }

    public getChairs(): User[] {
        return this.chairs
    }

    public setChairs(chairs: User[]): void {
        this.chairs = chairs
    }

    public getReviewers(): User[] {
        return this.reviewers
    }

    public setReviewers(reviewers: User[]): void {
        this.reviewers = reviewers
    }

    public getAuthors(): User[] {
        return this.authors
    }

    public setAuthors(authors: User[]): void {
        this.authors = authors
    }

    public getSessions(): Session[] {
        return this.sessions
    }

    public setSessions(sessions: Session[]): void {
        this.sessions = sessions
    }

}