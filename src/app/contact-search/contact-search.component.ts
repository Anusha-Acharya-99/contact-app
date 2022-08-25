import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.scss'],
})
export class ContactSearchComponent implements OnInit {
  contacts$!: Observable<Contact[]>;
  searchContacts: Contact[] = [];
  private searchTerms = new Subject<string>();
  constructor(private contactService: ContactService) {}

  @Output() event = new EventEmitter();

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.contacts$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.contactService.searchContacts(term))
    );
    // this.contacts$.subscribe((contacts) => console.log(contacts));
    this.contacts$.subscribe((contacts) => this.event.emit(contacts));
    // localStorage.setItem('search', this.contacts$);
  }

  ngDoCheck(): void {
    // this.event.emit(this.contacts$);
  }
}
