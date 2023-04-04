import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export default class YoutubeService {
    apiKey: string = 'AIzaSyCFO3SczBlTdzFQpo0T6jGNnh8P0FEJ7aw';
    videoIds = [];

    constructor(public http: HttpClient) {}

    getVideoIdsFromPlaylistId(playlistId: string, pageToken?: string): Observable<any> {
        return this.getPlaylistItems(playlistId, null).pipe(
            map((res: any) => {
                if (!res.items || res.items?.length == 0) {
                    return this.videoIds;
                }

                res.items.forEach((item) => {
                    this.videoIds.push({
                        title: item.snippet.title,
                        videoId: item.snippet.resourceId.videoId,
                    });
                });

                if (res.nextPageToken) {
                    this.getVideoIdsFromPlaylistId(playlistId, res.nextPageToken);
                } else {
                    return this.videoIds;
                }
            }),
            map(() => {
                let result = this.videoIds;
                this.videoIds = [];
                return result;
            })
        );
    }

    getPlaylistItems(playlistId: string, pageToken?: string): Observable<any> {
        let url =
            'https://www.googleapis.com/youtube/v3/playlistItems?key=' +
            this.apiKey +
            '&part=snippet&maxResults=50&playlistId=' +
            playlistId;
        pageToken ? url.concat('&pageToken=' + pageToken) : null;
        return this.http.get(url).pipe(
            map((res: any) => {
                return res;
            })
        );
    }
}
