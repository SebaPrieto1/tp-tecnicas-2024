import { User } from "../user/User";
import { Article } from "./Article";

export class PosterArticle extends Article {

    private aditionalFile: string

    constructor(title: string, authors: User[], notifier: User, attachedFile: string, aditionalFile: string) {
        super(title, authors, notifier, attachedFile);
        this.aditionalFile = aditionalFile;
    }


    public getAditionalFile(): string {
        return this.aditionalFile
    }

    public setAditionalFile(aditionalFile: string): void {
        this.aditionalFile = aditionalFile
    }

}