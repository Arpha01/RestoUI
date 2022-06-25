import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export function handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.message);
    } else {
      console.error(
        `Error code: ${error.status}, ` +
        `body was: ${error.message}`);
    }
    return throwError(
      error.error);
  }