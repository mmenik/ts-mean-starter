import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService } from './core/services/layout.service';
import { AuthService } from './auth/services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

    constructor(
        private readonly layoutService: LayoutService,
        private readonly authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request);
        // console.log('Request:', request);
        // return next.handle(request)
        //     .pipe(
        //         tap(
        //             (event: HttpEvent<any>) => {
        //                 if (event instanceof HttpResponse) {
        //                     console.log('event:', event);
        //                 }
        //             },
        //             (err: any) => {
        //                 if (err instanceof HttpErrorResponse) {
        //                     if (err.status === 401) {
        //                         console.log('Unauthenticated redirect to login');
        //                         this.authService.logout();
        //                     }
        //                 }
        //             })
        //     );


        // .do(
        //     (event: HttpEvent<any>) => {
        //         if (event instanceof HttpResponse) {
        //             console.log('event:', event);
        //         }
        //     },
        //     (err: any) => {
        //         if (err instanceof HttpErrorResponse) {
        //             if (err.status === 401) {
        //                 console.log('Unauthenticated redirect to login');
        //                 this.authService.logout();
        //             }
        //         }
        //     });
    }

}
