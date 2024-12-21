import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MorphismAppComponent } from './morphism-app/morphism-app.component';
const UI_COMPONENTS = [
  MorphismAppComponent
 ];
@NgModule({
  imports: [CommonModule, ...UI_COMPONENTS],
  exports: [...UI_COMPONENTS],
})
export class GlassMorphismModule {}
