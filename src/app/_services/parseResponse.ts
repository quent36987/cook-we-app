import { ZodType } from 'zod';
import { MonoTypeOperatorFunction, tap } from 'rxjs';
import { ENVIROMENT } from '@app/environments/environment';

export function parseResponse<T>(schema: ZodType): MonoTypeOperatorFunction<T> {
  return tap({
    next: (value: any) => {
      if (!ENVIROMENT.production) {
        // Throw in development so we're aware of the error
        schema.parse(value);
      } else {
        const parsed = schema.safeParse(value)
        if (!parsed.success) {
          // Log to service to be informed
          console.log(parsed.error, value);
        }
      }
    }
  })
}
