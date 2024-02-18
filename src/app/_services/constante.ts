import { HttpHeaders } from '@angular/common/http';

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }),
};

export const API_URL = 'http://localhost:9001/api';

export const ENVIROMENT = {
  production: false,
}
