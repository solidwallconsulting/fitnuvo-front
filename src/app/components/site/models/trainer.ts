import { Achievement } from "./achievement";
import { Certification } from "./certification";
import { Image } from "./image";
import { Review } from "./review";
import { Speciality } from "./speciality";

export interface Trainer {
    id: string;
    firstname: string;
    secondname: string;
    email: string;
    gender: string;
    adress: string;
    datebirth: Date;
    password: string;
    phone: string;
    mobile_verified: string;
    description: string;
    score_total: string;
    experience: string;
    price: number;
    photo_profil: string;
    is_activated: number;
    is_visible: number;
    reviews: Review[];
    specialities: Speciality[];
    images: Image[];
    certifications: Certification[];
    achievements: Achievement[];

}
