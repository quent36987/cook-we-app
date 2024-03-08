import {Router, UrlTree} from "@angular/router";
import {inject} from "@angular/core";
import { StorageService } from '@app/_services/storage.service';


export function IsLoginGuard(): boolean | UrlTree {
  const storage = inject(StorageService);
  const router = inject(Router);

  console.log('storage', storage)
  let isLog = storage.isLoggedIn();

  console.log('is log', isLog);

  return isLog ? true : router.createUrlTree(['/auth/login'], {
    queryParams: {
      redirectUrl: router.getCurrentNavigation()?.extractedUrl
    }
  });
}
