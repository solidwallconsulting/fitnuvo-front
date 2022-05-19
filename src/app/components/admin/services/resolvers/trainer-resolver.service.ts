import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Trainer } from '../../models/trainer.model';
import { UsersService } from '../users.service';

@Injectable({
  providedIn: 'root'
})
export class TrainerResolverService implements Resolve<Trainer> {

  constructor(private service: UsersService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Trainer> | Promise<Trainer> | Trainer {
    const id = route.paramMap.get('id');
    
    return this.service.getTrainerByid(parseFloat(id)).pipe(map(value => {
      if (value) {
        return value;
      } else {
        this.router.navigate(['/main/produits']);
        return null;
      }
    }));
  }
}






