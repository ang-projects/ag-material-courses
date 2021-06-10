import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CoursesCardListComponent} from "./courses-card-list/courses-card-list.component";
import {AboutComponent} from "./about/about.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent

  },
  {
    path: "courses",
    component: CoursesCardListComponent},
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "**",
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
