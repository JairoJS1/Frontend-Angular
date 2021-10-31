import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ComunesService {

  constructor(
    private router: Router
  ) { }

  forcedNavigate(comands: any, extras?: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(comands, extras));
  }
}
