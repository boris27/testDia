import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

import { PagerService } from '../_services/index';

@Component({
  moduleId: module.id,
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  private allItems: any[];
  pager: any = {};
  pagedItems: any[];

  constructor(private http: Http, private  pagerService: PagerService) { }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }


  revealForm (event): void {
    event.target.parentElement.parentElement.querySelector('#popUpWindow').style.display = 'flex';
  }

  hidePopUp (event): void {
    if(event.target === document.querySelector('#popUpWindow')) {
      event.target.parentElement.querySelector('#popUpWindow').style.display = 'none';
      event.stopPropagation();
    }
  }

  add(event): void {
    let currentDate = new Date();
    let tempObj = {
      create_date: `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDay()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
      state: 0,
      estimate: event.target.parentElement.querySelector('input[name="estimate"]').value,
      title: event.target.parentElement.querySelector('input[name="title"]').value,
      description: event.target.parentElement.querySelector('textarea').value,
      priority: event.target.parentElement.querySelector('[name="priority"]').value
    };
    this.allItems.unshift(tempObj);
    this.setPage(1);
    this.http.post('somePhpPage.php', tempObj).subscribe(data => console.log(data), err => console.log(err));
    event.target.parentElement.parentElement.style.display = 'none';
; }

  remove(event): void {
    if (confirm('Are you sure ?')) {
      let findedIndex = this.allItems.findIndex((val, index, arr) => {
        return new Date(val.create_date).getTime() === new Date(event.target.parentElement.parentElement.querySelector('td').innerHTML).getTime();
      });
      this.allItems.splice(findedIndex, 1);
      this.http.post('somePhpPage.php', this.allItems[findedIndex]).subscribe(data => console.log(data), err => console.log(err));
      this.setPage((findedIndex/10) + 1);
    }
  }
  ngOnInit() {
    this.http.get('../assets/json/tasks.json')
      .subscribe((data) => {
        this.allItems = data.json();
        this.setPage(1);
      }, (err) => console.log(err)
      );
  }


}
