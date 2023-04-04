import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
    @Input() videos: any[];
    @Input() currentIndex: number;
    @Output() playVideo = new EventEmitter<string>();
    @Output() getPlaylistById = new EventEmitter<string>();
    @Output() currentIndexChange = new EventEmitter<number>();
    public searchControl: UntypedFormControl = new UntypedFormControl(null);
    public playlistIdControl: UntypedFormControl = new UntypedFormControl(null);
    public selectedValues: number[];

    constructor() {}

    ngOnInit(): void {
      this.selectedValues = [this.currentIndex];
    }

    onShuffleClick() {
        localStorage.setItem('playlistId', this.playlistIdControl.value);
        this.getPlaylistById.emit(this.playlistIdControl.value);
    }

    onListItemClick(videoId: string) {
        this.playVideo.emit(videoId);
    }

    onNgModelChange(e) {
        this.currentIndex = e;
        this.currentIndexChange.emit();
    }
}
