import { User } from "../user/User";
import { Article } from "./Article";


export class RegularArticle extends Article {

    public abstract: string

    constructor(title: string, authors: User[], notifier: User, attachedFile: string, absctract: string) {
        super(title, authors, notifier, attachedFile);
        this.abstract = absctract;
    }


    public getAbstract(): string {
        return this.abstract
    }

    public setAbstract(abstract: string): void {
        this.abstract = abstract
    }

}