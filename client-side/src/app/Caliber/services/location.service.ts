import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Location } from '../../entities/Location';

@Injectable()
export class LocationService {

  private dataSubject = new BehaviorSubject([]);

  locations$: Observable<any> = this.dataSubject.asObservable(); // this is how components should access the data if you want to cache it

  constructor( @Inject(Http) public http: Http) {
  }

  getAll() {
    this.http.get(environment.context + 'all/location/all/', { withCredentials: true })
    .map(
      resp => resp.json(), // map the resp so all subscribers just get the body of the request as a js object
      // err => // can have the error mapped for all subscribers if you want also
    )
      .subscribe(
      resp => {
        this.dataSubject.next(resp);
      },
      err => {
        // handle the error however you want
      }
      );
  }


  updateLocation(trainer: Location) {
    this.http.put('http://localhost:8080/vp/location/update', trainer, { withCredentials: true })
      .map(
      resp => resp.json(),
    )
      .subscribe(
      resp => {
        console.log('updated Trainer successfully');
        this.getAll();
      },
      err => {
        console.log('err getting tiers ' + err);
      }
      );
  }

  deleteLocation(location: Location) {
    location.active = false;

    this.http.delete(environment.context + '/vp/location/delete',
      { withCredentials: true, body: location }).map(
      resp => resp.json(),
    )
      .subscribe(
      resp => {
      },
      err => {
        // handle the error however you want
      }
      );
  }
}
