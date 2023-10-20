import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';

export const adminGuard: CanActivateFn = (route) => {
  const authServices = inject(AuthService);
  const alert = inject(AlertifyService);
  return authServices.currentUser$.pipe(
    map((user)=>{
      if(user?.roles.includes("Admin") || user?.roles.includes("Moderator")){
        return true;
      }
      alert.error("can't enter this area !")
      return false;
    })
  )
};
