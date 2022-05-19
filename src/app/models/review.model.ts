import { Client } from "./client.model";

export class Review {
    review_id?: number;
    comment?: string;
    date_review?: string;
    stars?: number;
    status_report?: number;
    client: Client= new Client();


}