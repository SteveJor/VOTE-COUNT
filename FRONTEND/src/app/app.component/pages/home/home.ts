import { Component } from '@angular/core';
import { Minute } from '../../component/minute/minute';
import { Candidate } from '../../component/candidate/candidate';
import { RegionalRang } from '../../component/regional-rang/regional-rang';
import { About } from '../../component/about/about';
import { Contact } from '../../component/contact/contact';

@Component({
  selector: 'app-home',
  imports: [
    Minute,
    Candidate,
    RegionalRang,
    About,
    Contact,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
