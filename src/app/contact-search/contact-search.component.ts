import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Contact } from '../contact';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-search',
  templateUrl: './contact-search.component.html',
  styleUrls: ['./contact-search.component.scss'],
})
export class ContactSearchComponent implements OnInit {
  contacts$!: Observable<Contact[]>;
  term: string = '';
  private searchTerms = new Subject<string>();
  constructor(private contactService: ContactService, private router: Router) {}

  @Output() event = new EventEmitter();

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.contacts$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        this.term = term;
        return this.contactService.searchContacts(
          term,
          this.router.url.slice(1)
        );
      })
    );
    this.contacts$.subscribe((contacts) =>
      this.event.emit({ contacts, term: this.term })
    );
  }
}
