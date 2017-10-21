import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';

@Injectable()
export class WikipediaService {
    searchHistory: string[] = [];
    timestampHistory: string[] = [];

    constructor(private jsonp: Jsonp) {}

    search (term: string) {

        this.timestampHistory.push((new Date()).toLocaleString());
        this.searchHistory.push(term);

        let search = new URLSearchParams();
        search.set('action', 'opensearch');
        search.set('search', term);
        search.set('format', 'json');
        return this.jsonp.get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
            .toPromise()
            .then(
                (request) => request.json()[1]
            );
    }

    getSeachHistory(): string[] {
        return this.searchHistory;
    }

    getTimestampHistory(): string[] {
        return this.timestampHistory;
    }
}