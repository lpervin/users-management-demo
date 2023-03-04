import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PagerViewModel } from '../../state/models/PagerViewModel';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  constructor() { }
  @Input() pagerModel: PagerViewModel | undefined | null;
  @Output() GotoPageSelected = new EventEmitter<Number>();
  @Output() NextPageSelected = new EventEmitter<void>();
  @Output() PrevPageSelected = new EventEmitter<void>();
  @Output() NextPageRangeSelected = new EventEmitter<void>();
  @Output() PrevPageRangeSelected = new EventEmitter<void>();

  ngOnInit(): void {
  }

  goToPage(page: any){            
    this.GotoPageSelected.emit(page);
    return false;
}

NextPage(){
  this.NextPageSelected.emit();
  return false;
}


PrevPage(){
    this.PrevPageSelected.emit();
}

NextPageRange()
{
  this.NextPageRangeSelected.emit();
  return false;
}


PrevPageRange()
{
    this.PrevPageRangeSelected.emit();
    return false;
}

}
