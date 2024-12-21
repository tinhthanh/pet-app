import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {Location} from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class RoutersService {
  constructor(private router: Router) {
    console.log('init routers');
  }
  push(commands: any[], extras?: NavigationExtras): Promise<boolean> {
    return this.router.navigate(commands,extras )
  }
}

