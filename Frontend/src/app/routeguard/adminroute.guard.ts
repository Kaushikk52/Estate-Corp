import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';

export const adminrouteGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const database = inject(DatabaseService);

  var promise = new Promise((res) => {
    // if (typeof localStorage !== 'undefined') {
    if (localStorage.getItem('token') !== 'undefined') {
      if (localStorage.getItem('token')) {
        database.postVerifyToken(localStorage.getItem('token')).subscribe((data: any) => {
          console.log('admin route gulared', data)
          if (data.status === true) {
            console.log('deepak in the admin router ')
            res(true)
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            localStorage.removeItem('user');
            localStorage.removeItem('loginStatus');
            res(false)
          }
        })
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('user');
        localStorage.removeItem('loginStatus');
        res(false)
      }
    }
  })

  var check = await promise
  if (check === true) {
    if (localStorage.getItem('userType') === 'isAdmin') {
      return true
    } else {
      router.navigateByUrl('/login')
      localStorage.removeItem('token')
      localStorage.removeItem('userType');
      localStorage.removeItem('user');
      localStorage.removeItem('loginStatus')
      return false
    }
  } else {
    router.navigateByUrl('/login');
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
    localStorage.removeItem('loginStatus')
    return false
  }
};
