import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';


export const authGuard: CanActivateFn = (route, state) => {
  const alert = inject(AlertifyService);
  const router = inject(Router)
  const user = localStorage.getItem('user');
  if(user) return true;
  else{
    alert.error('login first')
    router.navigate(['/home'])
    return false;
  }
};
