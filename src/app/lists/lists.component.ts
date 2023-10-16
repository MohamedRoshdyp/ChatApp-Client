import { Component, OnInit } from '@angular/core';
import { MembersService } from '../services/members.service';
import { Member } from '../models/member';
import { Pagination } from '../models/Pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {

  members!: Partial<Member[] | null>;
  Pridicate: string = 'liked';
  pageNumber: number = 1;
  pageSize: number = 8;
  pagination!: Pagination;
  constructor(private memberServices: MembersService) {

  }
  ngOnInit(): void {
    this.loadLikes();
  }


  loadLikes() {
    this.memberServices.getLikes(this.Pridicate, this.pageNumber, this.pageSize).subscribe({
      next: (res) => {
        this.members = res.result
        this.pagination = res.pagniation

      }
    })
  }
  pageChanged(event:any){
    this.pageNumber = event.page
    this.loadLikes();
  }
}
