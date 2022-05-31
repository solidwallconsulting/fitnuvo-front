import { Achievement } from "./achievement.model";
import { Appointment } from "./appointment.model";
import { Certification } from "./certification.model";
import { Image } from "./image";
import { Review } from "./review.model";
import { Speciality } from "./speciality";

export class Trainer {
    trainer_id: string;
    email: string;
    first_name: string;
    last_name: string;
    is_confirmed?: number;
    member_since?: String;
    mobile_number?: String;
    photo_profil?: String;
    gender?: String;
    home_adress?: String;


}
