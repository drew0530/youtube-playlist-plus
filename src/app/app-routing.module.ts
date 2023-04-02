import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), YouTubePlayerModule, PlayerComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
