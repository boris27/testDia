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

  remove(event): void {
    let findedIndex = this.result.findIndex( (val, index, arr) => {
      return new Date(val.create_date).getTime() === new Date(event.target.parentElement.parentElement.querySelector('td').innerHTML).getTime();
    });
    this.result.splice(findedIndex, 1);
  }
  ngOnInit() {
    this.http.get('../assets/json/tasks.json')
      .subscribe((data) => this.result = data.json(), (err) => console.log(err));
  }

}
