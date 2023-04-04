import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerComponent } from './player/player.component';
import YoutubeService from './services/youtube.service';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PlaylistComponent } from './playlist/playlist.component';
import ThemeService from './theme.service';

@NgModule({
    declarations: [AppComponent, PlayerComponent, PlaylistComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule
    ],
    providers: [YoutubeService, ThemeService],
    bootstrap: [AppComponent],
})
export class AppModule {}
