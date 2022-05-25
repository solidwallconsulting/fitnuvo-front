import { Client } from "./client.model";
import { Trainer } from "./trainer.model";

export class Review {
    review_id?: number;
    comment?: string;
    date_review?: string;
    stars: number;
    status_report?: number;
    client: Client= new Client();
    trainer: Trainer= new Trainer();



}