import { Component } from "@angular/core";
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonNavLink, IonTitle, IonToolbar, ModalController } from "@ionic/angular/standalone";
interface ProfileData {
  name: string;
  phone: string;
  email: string;
  companyEmail: string;
  isVerified: boolean;
}

@Component({
  selector: "app-profile-info",
  template: `
 <ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
    </ion-buttons>
    <ion-title>Thông tin cá nhân</ion-title>
    <ion-buttons slot="end">
            <ion-button (click)="cancel()">Đóng</ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content  style="--background: #f2f6f9;">
    <div
      class="flex overflow-hidden flex-col mx-auto w-full  max-w-[480px]"
      role="main"
    >
      <header
        class="flex overflow-hidden relative flex-col w-full text-center bg-blue-50"
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/592f7c987ddf4b1192796d8cb37d66a0/789f07f0dec07778b849888e87c9da380be71e40d3c6a8dc941962b06d48a6a1?apiKey=592f7c987ddf4b1192796d8cb37d66a0&"
          class="object-contain absolute right-0 bottom-0 z-0 h-1 aspect-[90.91] w-[375px]"
          alt=""
        />
       
      
      </header>

      <main class="flex flex-col w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/592f7c987ddf4b1192796d8cb37d66a0/0ad413793d68442ec663932dc94ce81a1a3bfec2c6fd5a03eed33bf65328850c?apiKey=592f7c987ddf4b1192796d8cb37d66a0&"
          class="object-contain self-center mt-6 max-w-full aspect-square w-[120px]"
          alt="Profile avatar"
        />
        
        <section class="flex flex-col w-full">
          <div class="flex flex-col p-4 w-full">
            <h2 class="text-lg font-bold leading-none text-gray-800">
              Thông tin chung
            </h2>
            <div class="flex flex-col justify-center mt-4 w-full rounded-lg">
              <div class="text-sm font-medium leading-none text-gray-400">
                Họ và Tên
              </div>
              <div class="mt-1 text-base text-gray-800">
                Nguyễn Hoàng Kim Khánh
              </div>
            </div>
            <div class="flex flex-col justify-center mt-4 w-full rounded-lg">
              <div class="text-sm font-medium leading-none text-gray-400">
                Số điện thoại
              </div>
              <div class="mt-1 text-base text-gray-800">091712345</div>
            </div>
            <div
              class="flex flex-col justify-center mt-4 w-full whitespace-nowrap rounded-lg"
            >
              <div class="text-sm font-medium leading-none text-gray-400">
                Email
              </div>
              <div class="mt-1 text-base text-gray-800">khanhnhkgmail.com</div>
            </div>
            <div class="flex flex-col justify-center mt-4 w-full rounded-lg">
              <div class="text-sm font-medium leading-none text-gray-400">
                Email công ty
              </div>
              <div class="mt-1 text-base text-gray-800">--</div>
            </div>
          </div>
        </section>

        <section class="flex flex-col w-full leading-none">
          <div class="flex flex-col p-4 w-full">
            <div class="flex gap-2 items-center w-full">
              <h2
                class="flex-1 shrink self-stretch my-auto text-lg font-bold text-gray-800 basis-4"
              >
                Thông tin định danh
              </h2>
              <div
                class="gap-1 self-stretch px-2 py-0.5 my-auto text-xs font-medium text-yellow-700 bg-yellow-50 rounded-3xl"
                role="status"
              >
                Chưa xác thực
              </div>
            </div>
           
          </div>
        </section>
      </main>

      <footer class="flex flex-row justify-center items-center pt-2 w-full ">
        <button
          class="overflow-hidden gap-2 self-stretch px-5 py-3 max-w-full text-base font-medium text-center text-sky-500 bg-blue-50 rounded-xl w-[343px]"
          tabindex="0"
        >
          Cập nhật thông tin
        </button>
       
      </footer>
    </div>
    </ion-content>
  `,
  standalone: true,
  imports: [IonButtons,IonButton, IonBackButton, IonContent, IonTitle, IonNavLink, IonHeader, IonToolbar],
})
export class ProfileInfoComponent {
  profileData: ProfileData = {
    name: "Nguyễn Hoàng Kim Khánh",
    phone: "091712345",
    email: "khanhnhk@gmail.com",
    companyEmail: "--",
    isVerified: false
  };
  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}