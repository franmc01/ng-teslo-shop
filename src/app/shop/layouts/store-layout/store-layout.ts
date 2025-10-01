import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: 'app-store-layout',
  imports: [RouterOutlet, Navbar],
  templateUrl: './store-layout.html',
  styleUrl: './store-layout.scss'
})
export class StoreLayout {

}
