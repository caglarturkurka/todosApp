import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {AppModule} from "./app.module";
describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    });
  }));

  beforeEach(() => {
    // TestBed.createComponent means that which component we want to create for testing.
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    //expect is used to test which component, variable or etc.
    expect(component).toBeTruthy();
  });
});
