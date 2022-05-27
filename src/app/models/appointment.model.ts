import { Trainer } from "./trainer.model";
import { Client } from "./client.model";

export class Appointment {
    appointment_id: number;
    appointment_date: string;
    appointment_start: string;
    appointment_end: string;
    appointment_datepayment?: string;
    appointment_amount?: string;
    appointment_status_payment?: string;
    appointment_repeat?: number;
    appointment_validation?: number;
    appointment_activity: string;
    appointment_client : Client= new Client();
    appointment_trainer : Trainer= new Trainer();



}