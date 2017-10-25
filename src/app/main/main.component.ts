import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  result;

  constructor(private http: Http) { }

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
    this.result.unshift(tempObj);
    event.target.parentElement.parentElement.style.display = 'none';
;  }


  remove(event): void {
    if (confirm('Are you sure ?')) {
      let findedIndex = this.result.findIndex((val, index, arr) => {
        return new Date(val.create_date).getTime() === new Date(event.target.parentElement.parentElement.querySelector('td').innerHTML).getTime();
      });
      this.result.splice(findedIndex, 1);
    }
  }
  ngOnInit() {
    this.http.get('../assets/json/tasks.json')
      .subscribe((data) => this.result = data.json(), (err) => console.log(err));
  }

}
