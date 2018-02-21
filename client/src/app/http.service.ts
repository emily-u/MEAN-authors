import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class HttpService {
    constructor(private _http: HttpClient){}

    addAuthor(newAuthor, callback){
        this._http.post("/authors", newAuthor).subscribe(
            (res) => {
                callback(res);
            }
        )
    }

    getAuthors(callback) {
        this._http.get("/authors").subscribe(
          (res) => {
            callback(res);
          })
        }

    deleteTask(deleteId, callback){
        this._http.delete('/authors/' + deleteId, {}).subscribe((resFromServer) => {
          callback(resFromServer);
        })
    }

    editAuthor(editId, edit_content, callback){
        console.log(editId);
        this._http.put('/authors/' + editId, edit_content).subscribe((resFromServer) => {
          callback(resFromServer);
        })
    }

}