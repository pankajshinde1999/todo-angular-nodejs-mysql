import { CanActivateFn } from '@angular/router';

export const logingaurdGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = localStorage.getItem('id') !== null;
  if (isLoggedIn) {
    return true; // User is logged in, allow access to the route
  } else {
    return false; // User is not logged in, deny access to the route
  }
};
