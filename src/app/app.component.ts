import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import YoutubeService from './services/youtube.service';
import { PlayerComponent } from './player/player.component';
import ThemeService from './theme.service';
import * as _ from 'lodash';
import { PlaylistComponent } from './playlist/playlist.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
    apiKey: string = 'AIzaSyCFO3SczBlTdzFQpo0T6jGNnh8P0FEJ7aw';
    title: string = 'youtube-playlist-tool';
    temp: any[] = [];
    videos: any[];
    currentIndex: number = 0;
    @ViewChild(PlayerComponent) playerComponent: PlayerComponent;
    @ViewChild(PlaylistComponent) playlistComponent: PlaylistComponent;

    constructor(public http: HttpClient, private youtubeService: YoutubeService, public themeService: ThemeService) {}

    ngAfterViewInit(): void {
        let playlistId = localStorage.getItem('playlistId');
        if (playlistId) {
            this.playlistComponent.playlistIdControl.setValue(playlistId)
            this.getPlaylistById(playlistId);
        }
    }

    getPlaylistById(playlistId: string): void {
        this.youtubeService.getVideoIdsFromPlaylistId(playlistId).subscribe((results) => {
            this.videos = _.shuffle(results);
            this.playVideo(this.videos[0].videoId);
        });
    }


    playVideo(videoId: string): void {
        this.playerComponent.playVideo(videoId);
    }
}
