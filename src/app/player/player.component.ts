import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import * as YouTubePlayer from 'youtube-player';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
    @Input() videos: any[];
    @Input() currentIndex: number;
    @Output() currentIndexChange = new EventEmitter<number>();
    public videoSizeControl: UntypedFormControl = new UntypedFormControl(null);
    public playerSize = [
        { height: 240, width: 426 },
        { height: 360, width: 480 },
        { height: 480, width: 640 },
        { height: 720, width: 960 },
        { height: 1080, width: 1920 },
    ];
    public player;

    constructor() {}

    ngOnInit() {
        this.player = YouTubePlayer('player', {
            videoId: 'qFn3uh1EcpA',
            width: 426,
            height: 240,
        });
        this.videoSizeControl.setValue(this.playerSize[0]);
        this.player.on('stateChange', (event) => {
            if (event.data == 0) {
                this.nextVideo();
            }
        });
    }

    playVideo(videoId: string) {
        this.player.loadVideoById(videoId).then(() => this.player.playVideo());
    }

    onPlayerSizeChange() {
        this.player.setSize(this.videoSizeControl.value.width, this.videoSizeControl.value.height);
    }

    previousVideo() {
        if (this.currentIndex == 0) this.currentIndex = this.videos.length;
        this.playVideo(this.videos[this.currentIndex - 1].videoId);
        this.currentIndex -= 1;
        this.currentIndexChange.emit(this.currentIndex);
    }

    nextVideo() {
        if (this.currentIndex == this.videos.length - 1) this.currentIndex = 0;
        this.playVideo(this.videos[this.currentIndex + 1].videoId);
        this.currentIndex += 1;
        this.currentIndexChange.emit(this.currentIndex);
    }
}
