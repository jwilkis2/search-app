import { Component, OnInit } from '@angular/core';
import { WikipediaService } from '../services/wikipedia.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit {
  searchHistory: string[] = [];
  timestampHistory: string[] = [];

  constructor(private wikipediaService: WikipediaService) { }

  ngOnInit() {
    this.searchHistory = this.wikipediaService.getSeachHistory();
    this.timestampHistory = this.wikipediaService.getTimestampHistory();
  }

}
