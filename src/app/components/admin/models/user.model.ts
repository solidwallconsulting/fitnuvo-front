import { Role } from './role.model';

export class UserModel  {
  id: number;
  email: string;
  password: string;
  role: Role;
  datebirth:Date;
  adress:string;
  phone:string;
  pic : string;
  // personal information
  firstname: string;
  lastname: string;
  gender: string;
  // account information
  //language: string;
 ////communication: {
  //  email: boolean;
   // sms: boolean;
   //// };
  // email settings
/*  emailSettings?: {
    emailNotification: boolean;
    sendCopyToPersonalEmail: boolean;
    activityRelatesEmail: {
      youHaveNewNotifications: boolean;
      youAreSentADirectMessage: boolean;
      someoneAddsYouAsAsAConnection: boolean;
      uponNewOrder: boolean;
      newMembershipApproval: boolean;
      memberRegistration: boolean;
    };
    updatesFromKeenthemes: {
      newsAboutKeenthemesProductsAndFeatureUpdates: boolean;
      tipsOnGettingMoreOutOfKeen: boolean;
      thingsYouMissedSindeYouLastLoggedIntoKeen: boolean;
      newsAboutMetronicOnPartnerProductsAndOtherServices: boolean;
      tipsOnMetronicBusinessProducts: boolean;
    };
  };*/

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.id = user.id;
    this.email = user.email || '';
    this.password = user.password || '';
    this.datebirth = user.datebirth || '';
    this.pic = user.pic || '';
    this.firstname = user.firstname || '';
    this.lastname = user.lastname || '';
    this.phone = user.phone || '';
    this.adress = user.adress;
  }
}
