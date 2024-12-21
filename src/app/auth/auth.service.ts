import { Injectable, signal } from '@angular/core';
import { UserRegister, VgAuthService } from 'vg-web-sdk';
import { ModalController } from '@ionic/angular/standalone';
import { FormCompileOnboardComponent } from '../forms/form-compile-onboard/form-compile-onboard.component';
import { jwtDecode } from "jwt-decode";
import {localStorageV, StoreKey } from 'vg-web-sdk';
import { Observable, from, tap } from 'rxjs';
export interface UserInfo extends UserRegister {
  // custom fields
}
@Injectable({
  providedIn: 'root'
})
export class AuthService  extends VgAuthService {
  private user = signal<UserInfo | null>(null);
  public rUser = this.user.asReadonly();
  constructor(private modalCtrl: ModalController) {
    super("AKfycbwjothv_MjUfNyuy2k0wqy-mJFSIoGAN3FnjRZ_f_uSHMwVPiyM8EoTlwnuuiKE9wTZOw")
    // TODO move to config
    console.log('auth init');
    const info = this.userInfo();
    if(info) {
      this.user.set(info);
    }
  }
    /**
   * Checks if the user is logged in.
   *
   * @return {boolean} true if the user is logged in, false otherwise
   */
  isLogin() {
    const token = localStorageV.getItem(StoreKey.jwt);
    if(token) {
      try {
      const data = jwtDecode(token);
      return !!data;
      } catch (error) {
        return false;
      }
    }
    return false;
  }
  signUp( displayName: string, email: string, password: string ) {
    const user: UserRegister = {
      id : '',
      displayName ,
      email : email.toLowerCase().trim() ,
      password,
      photoURL : ''
    } as UserRegister;
    return from(this.register(user)).pipe(
      tap((rs) => {
        if(rs.status === 200) {
          localStorageV.setItem(StoreKey.jwt, rs.data.access_token);
          const data = jwtDecode<UserInfo>(rs.data.access_token);
          const user: UserInfo = {
            id: data.id,
            displayName: data.displayName || '',
            email: data.email,
            password: '',
            phoneNumber: data.phoneNumber || '',
            photoURL: data.photoURL || ''
          }
          this.user.set(user);
          this.modalCtrl.dismiss();
        }
      })
    );
  }
  signIn(email: string, password: string) {
    return from(this.login(email.toLowerCase().trim(), password)).pipe(
      tap((rs) => {
        if(rs.status === 200) {
          localStorageV.setItem(StoreKey.jwt, rs.data.access_token);
          const data = jwtDecode<UserInfo>(rs.data.access_token);
          const user: UserInfo = {
            id: data.id,
            displayName: data.displayName || '',
            email: data.email,
            password: '',
            phoneNumber: data.phoneNumber || '',
            photoURL: data.photoURL || ''
          }
          this.user.set(user);
          this.modalCtrl.dismiss();
        }
      })
    );
  }
  close() {
    this.modalCtrl.dismiss();
  }
    /**
   * logout method removes the JWT from local storage and sets the user to null.
   *
   */
  logout(): void {
    localStorageV.removeItem(StoreKey.jwt);
    this.user.set(null);
  }
    /**
   * Retrieves user information from local storage and returns it, or null if no user is found.
   *
   * @return {UserInfo | null} The user information, or null if no user is found
   */
  userInfo(): UserInfo | null {
    const token = localStorageV.getItem(StoreKey.jwt);
    if(token) {
      const data = jwtDecode<UserInfo>(token);
      console.log(token);
      if(!data) {
        return null;
      }
      console.log(data);
      const user: UserInfo = {
        id: data.id,
        displayName: data.displayName || '',
        email: data.email,
        password: '',
        phoneNumber: data.phoneNumber || '',
        photoURL: data.photoURL || ''
      }
      return user;
    }
    return null
  }

  requestLogin() {
   this.modalCtrl.create({
      component: FormCompileOnboardComponent,
      cssClass: 'custom-popup',
      componentProps: {
        vgEvent: {
          emit: (data: any) => {
            console.log(data);
            this.modalCtrl.dismiss();
          }
        }
      }
    }).then( (modal) => {
      modal.present();
    });
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
}
