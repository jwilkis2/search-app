import { Component, OnInit } from '@angular/core';
import { WikipediaService } from '../services/wikipedia.service';
import { GiphyService } from '../services/giphy.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchResults: string[];
  giphyResult: string = '';

  constructor(private wikipediaService: WikipediaService,
              private giphyService: GiphyService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  search(input: HTMLInputElement): void {
    this.wikipediaService.search(input.value)
      .then(results => this.searchResults = results);

    this.giphyService.search(input.value)
      .then(data => {
        this.giphyResult = data['data'][0]['images']['downsized']['url'];
        console.log(data['data']);
      });

  }

  clearSearch(input: HTMLInputElement): void {
    input.value = '';
    this.searchResults = [];
    this.giphyResult = '';
  }

  imageUrl() {
    return this.sanitizer.bypassSecurityTrustUrl(this.giphyResult);
  }

}
