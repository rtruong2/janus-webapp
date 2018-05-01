import { Component, OnInit } from '@angular/core';
import { AssociateService } from '../../services/associates-service/associates-service';
import { Batch} from '../../models/batch.model';
import { Curriculum } from '../../models/curriculum.model';
import { RequestService } from '../../services/request-service/request.service';
import { Client } from '../../models/client.model';
import { ClientListService } from '../../services/client-list-service/client-list.service';
import { AutoUnsubscribe } from '../../decorators/auto-unsubscribe.decorator';
import { HydraTrainee } from '../../../../hydra-client/entities/HydraTrainee';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { CurriculumService } from '../../services/curriculum-service/curriculum.service';
import { MarketStatusService } from '../../services/market-status/market-status.service';
import { BatchService } from '../../services/batch-service/batch.service';
import { MarketingStatus } from '../../models/marketing-status.model';

/**
 * Component for the Associate List page
 * @author Alex, Xavier
 */
@AutoUnsubscribe
@Component({
  selector: 'app-associate-list',
  templateUrl: './associate-list.component.html',
  styleUrls: ['./associate-list.component.css']
})

export class AssociateListComponent implements OnInit {
  // our collection of associates and clients
  associates: HydraTrainee[];
  clients: Client[];
  marketingStatuses: MarketingStatus[];
  curriculums: Set<string>; // stored unique curriculums
  index: 0;

  // used for filtering
  searchByStatus: string = '';
  searchByClient: string = '';
  searchByText: string = '';
  searchByCurriculum: string = '';

  // status/client to be updated
  updateShow: boolean = false;
  updateStatus: string = '';
  updateClient: string = '';
  updated: boolean = false;

  // used for ordering of rows
  desc: boolean = false;
  sortedColumn: string = '';

  // user access data - controls what they can do in the app
  user: User;
  canUpdate: boolean = false;

  /**
   * Inject our services
   * @param associateService
   * @param rs
   */
  constructor(
    private associateService: AssociateService,// TfAssociate,
    private clientService: ClientListService,
    private curriculumnService: CurriculumService,
    private batchService: BatchService,
    private marketService : MarketStatusService,
    private rs: RequestService,
    private activated: ActivatedRoute
  ) {
    this.curriculums = new Set<string>();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user != null) {
      if (this.user.tfRoleId==1 || this.user.tfRoleId==2) {
        this.canUpdate = true; // let the user update data if user is admin or manager
      }
    }
    this.getAllAssociates(); // grab associates and clients from back end
    this.getClientNames();
    // if navigating to this page from clicking on a chart of a different page, set default filters
    let paramMap = this.activated.snapshot.paramMap;
    let CliOrCur = paramMap.get('CliOrCur');
    let name = paramMap.get('name');
    let mapping = paramMap.get('mapping');
    let status = paramMap.get('status');
    if (CliOrCur) {// if values passed in, search by values
      if (CliOrCur == 'client')
        this.searchByClient = name;
      else if (CliOrCur == 'curriculum')
        this.searchByCurriculum = name;
      this.searchByStatus = mapping.toUpperCase() + ': ' + status.toUpperCase();
    }
  }
  tempCurrId : number;
  newCurr : Curriculum;
  tempMarket: MarketingStatus;
  /**
   * Set our array of all associates
   */
  getAllAssociates() {
    let self = this;
    this.curriculumnService.getAllCurriculums().subscribe(items=>{
    });
    
    this.associateService.getAllAssociates().subscribe(data => {
      this.associates = data;
      
      this.marketService.getAllMarketingStatus().subscribe(marketData => {
        this.marketingStatuses = marketData;       
    })

      this.marketingStatuses = [];
     
      for (let associate of this.associates) {// get our curriculums from the associate
        if (associate.batch != null && associate.batch.batchId < 51 && associate.batch.batchId != 26) {
       this.batchService.getCurrIdById(associate.batch.batchId).subscribe(item => {
        this.tempCurrId = item;
          this.curriculumnService.getOneCurriculum(this.tempCurrId).subscribe(item2 => {
            this.newCurr = item2;
            this.curriculums.add(item2['curriculumName']);
       });
      });
    }
    }
      this.curriculums.delete('');
      this.curriculums.delete('null');
      self.sort('userId'); //sort associates by ID
    });
  }

  /**
   * Fetch the client names
   */
  getClientNames() {
    this.clientService.getAllClients().subscribe(data => {
      this.clients = data;
    });
  }

  /**
   * Sort the array of clients based on a given input.
   * @param property to be sorted by
   */
  sort(property) {
    this.desc = !this.desc;
    let direction;
    if (property !== this.sortedColumn || this.updated) //if clicking on new column sort ascending always, otherwise descending
      direction = 1;
    else direction = this.desc ? 1 : -1;

    this.sortedColumn = property; //current column being sorted
    if (this.updated)
      this.updated = false;

    //sort the elements
    this.associates.sort(function (a, b) {
      if (a[property] < b[property]) return -1 * direction;
      else if (a[property] > b[property]) return 1 * direction;
      else return 0;
    });
  }

  /**
   * Bulk edit feature to update associate's statuses and clients.
   */
  updateAssociates() {
    const trainees: HydraTrainee[] = [];
    const self = this;

    for (const trainee of this.associates) { // grab the checked ids
      const check = <HTMLInputElement>document.getElementById(trainee.userId.toString());
      if (check != null && check.checked) {
        if (this.updateStatus !== '') {
          trainee.marketingStatus = this.updateStatus;
        }
        if (this.updateClient !== '') {
          trainee.client = this.updateClient;
        }
        trainees.push(trainee);
      }
    }
    let count = 1;
    for (const trainee of trainees) {
      this.associateService.updateAssociate(trainee).subscribe(
        data => {
          if (count++ === trainees.length) {
            self.getAllAssociates();
            self.updated = true;
            this.updateStatus = '';
            this.updateClient = '';
          }
        }
      );
    }
  }
}