import { Component, inject } from "@angular/core";
import { ModalController } from "@ionic/angular/standalone";
import { ProfileInfoComponent } from "../profiles/profile-info/profile-info.component";
import { AuthService } from "src/app/auth/auth.service";


@Component({
  selector: "app-account-layout",
  template: `
 <div class="flex overflow-hidden flex-col mx-auto w-full  max-w-[480px]">
      <div class="flex z-10 flex-col items-center mt-0 w-full">
      <div class="flex flex-col mt-6 max-w-full min-w-[343px]">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/592f7c987ddf4b1192796d8cb37d66a0/cca2398c7f99e71c5775c62ec0652f5e04fb94b04101320abbe85ee2f8f6bcd0?apiKey=592f7c987ddf4b1192796d8cb37d66a0&" alt="Profile avatar" class="object-contain self-center max-w-full  aspect-square w-[120px]" />
        <div class="flex flex-col mt-3 w-full">
          <div class="text-xl font-semibold leading-snug text-center text-blue-900">
            Nguyễn Hoàng Kim Khánh
          </div>
          <div class="flex gap-1 items-center self-center p-0.5 mt-1 text-xs font-medium leading-none text-white bg-blue-900 rounded-[1000px]">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/592f7c987ddf4b1192796d8cb37d66a0/5429b9b6293c84086550ca711e6b8b9d46200786f94b472c81abb5c3bf37c1c7?apiKey=592f7c987ddf4b1192796d8cb37d66a0&" alt="" class="object-contain shrink-0 self-stretch my-auto w-5 aspect-square" />
            <div class="self-stretch my-auto">410 điểm</div>
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/592f7c987ddf4b1192796d8cb37d66a0/a6db560c53bb854d3a6a4d4407ec1f944f64f7567d7e2e7ba0732a216f878159?apiKey=592f7c987ddf4b1192796d8cb37d66a0&" alt="" class="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
          </div>
        </div>
    </div>
    <div class="w-full p-3" > 
      <div class="flex flex-col mt-6 w-full">
      <div class="flex flex-col w-full">
        <div class="text-xs font-semibold leading-none text-gray-500">
          Thông tin của tôi
        </div>
        <div class="flex flex-col mt-2 w-full">
          <button class="flex gap-3 items-center px-3 py-3 w-full bg-white rounded-lg border-b border-solid border-b-gray-200 min-h-[60px]" tabindex="0">
            <div class="flex flex-1 shrink gap-3 items-center self-stretch my-auto basis-0 w-full">
              <div class="flex gap-2 items-center self-stretch p-2 my-auto w-9 h-9 bg-blue-50 rounded-lg">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/592f7c987ddf4b1192796d8cb37d66a0/143305debbd6f0a45c6a744272438add64a961c1b7c002cb8f59a315943c73d9?apiKey=592f7c987ddf4b1192796d8cb37d66a0&" alt="" class="object-contain w-5 aspect-square" />
              </div>
              <div class="flex flex-col flex-1 shrink justify-center self-stretch my-auto basis-4 w-full">
                <div class="text-sm font-medium leading-none text-gray-800">
                  Thông tin cá nhân
                </div>
                <div (click)="openModal()" class="flex gap-1 items-center w-full text-xs leading-none text-red-600">
                  <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/592f7c987ddf4b1192796d8cb37d66a0/9c87b5e11384ec10e1422a73bad6f8cea939f7ba1159118f8cdb52199b77f5ea?apiKey=592f7c987ddf4b1192796d8cb37d66a0&" alt="" class="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square" />
                  <div class="flex-1 shrink self-stretch my-auto basis-0">
                    Chưa xác thực danh tính
                  </div>
                </div>
              </div>
            </div>
          </button>
          <!-- Rest of settings items following same pattern -->
        </div>
      </div>
      <button (click)="requestLogin()" class="gap-2 self-stretch px-6 py-3.5 mt-6 w-full text-sm font-semibold leading-none text-center text-red-700 bg-white rounded-lg min-h-[48px]" tabindex="0">
       Đăng Nhập
      </button>
      <button class="gap-2 self-stretch px-6 py-3.5 mt-6 w-full text-sm font-semibold leading-none text-center text-red-700 bg-white rounded-lg min-h-[48px]" tabindex="0">
        Đăng xuất
      </button>
      <div class="mt-6 w-full text-sm leading-none text-center text-gray-400">
        Phiên bản 1.3.44
      </div>
    </div>
    </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `],
  standalone: true,
  imports: [
    ProfileInfoComponent,
    
  ]
})
export class AccountLayoutComponent {
  readonly auth = inject(AuthService);
  constructor(private modalCtrl: ModalController) {

  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ProfileInfoComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      debugger
    }
  }
  requestLogin() {
    this.auth.requestLogin();
  }
}