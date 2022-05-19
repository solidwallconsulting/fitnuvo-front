import { Client } from "./client.model";
import { Trainer } from "./trainer.model";

export class Review  {
    review_id: number;
    stars:string;
    comment:string;
    status_report: number;
    client: Client = new Client();
    trainer: Trainer = new Trainer();
    date_review:Date;
}

