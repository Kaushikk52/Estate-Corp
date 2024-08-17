import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

export const adminrouteGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const database = inject(DatabaseService);

  if (typeof window !== 'undefined' && localStorage.getItem('token')) {
    const token = localStorage.getItem('token');

    const promise = new Promise<boolean>((resolve) => {
      database.postVerifyToken(token).subscribe((data: any) => {
        if (data.status === true) {
          resolve(true);
        } else {
          clearLocalStorage();
          resolve(false);
        }
      });
    });

    const isVerified = await promise;
    if (isVerified) {
      if (localStorage.getItem('userType') === 'isAdmin') {
        return true;
      }
    }
  }

  router.navigateByUrl('/login');
  clearLocalStorage();
  return false;
};

function clearLocalStorage() {
  localStorage.removeItem('token');
  localStorage.removeItem('userType');
  localStorage.removeItem('user');
  localStorage.removeItem('loginStatus');
}
