import { Achievement } from "./achievement.model";
import { Appointment } from "./appointment.model";
import { Certification } from "./certification.model";
import { Image } from "./image";
import { Review } from "./review.model";
import { Speciality } from "./speciality";

export class Trainer {
    trainer_id: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    home_adress: string;
    datebirth: Date;
    password: string;
    mobile_number: string;
    mobile_verified: string;
    aboutme: string;
    score_trainer: string;
    experience_trainer: string;
    price_trainer: number;
    photo_profil: string;
    is_activated: number;
    is_visible: number;
    trainer_reviews: Review[];
    trainer_specialities: Speciality[];
    trainer_images: Image[];
    trainer_certifications: Certification[];
    trainer_achievements: Achievement[];
    trainer_appointments: Appointment[];


}
