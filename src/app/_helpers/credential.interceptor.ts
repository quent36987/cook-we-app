import { HttpInterceptorFn } from '@angular/common/http';

export const credentialInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    withCredentials: true,
  });

  return next(req);
};
