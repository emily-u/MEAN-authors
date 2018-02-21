import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-authors',
  templateUrl: './edit-authors.component.html',
  styleUrls: ['./edit-authors.component.css']
})
export class EditAuthorsComponent implements OnInit {
  authors;
  editAuthor = {
    name: "",
    author: ""
  };
  name: String;


  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) {
    
  }

  ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      console.log(params);
      this.editAuthor.name= params.get("authorname");
    })
    console.log("33333333", this.name);
  }
  

  editSubmit(){
    this._route.paramMap.subscribe(params => {
      
      this._httpService.editAuthor(params.get("id"), this.editAuthor, (resFromService) => {
        this._router.navigate(["/"]);
      }); 
    })
   
  }



}
