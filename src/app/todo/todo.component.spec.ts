import {TestBed, async, ComponentFixture, fakeAsync, inject, tick} from '@angular/core/testing';
import {TodoComponent} from "./todo.component";
import {AppModule} from "../app.module";
import {TodosService} from "../todos/todos.service";
import {Todos} from "../todos/todos.model";
import {MockBackend, MockConnection} from "@angular/http/testing";
import {BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend} from "@angular/http";
import {LoginService} from "../login/login.service";
import {User} from "../user/user.model";


describe('AppComponent', () => {

  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      imports: [
        AppModule

      ],
      providers: [
        {
          provide: Http,
          useFactory: (mockBackend: XHRBackend, options: BaseRequestOptions) => {return new Http(mockBackend, options);},
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the subscription', async(() => {
    expect(component).toBeTruthy();
  }));

  it('TodosService injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([TodosService], (injectService: TodosService) => {
      let testBedService = TestBed.get(TodosService);
      expect(injectService).toBe(testBedService);
    })
  );

  it('should ensure the isUpdating is false after cancelUpdating function', () => {
    expect(component.isUpdating).toEqual(false);
    component.isUpdating = true;
    component.cancelUpdating();
    expect(component.isUpdating).toEqual(false);
  });

  it('should ensure the isUpdating is true after updating function', () => {
    component.isUpdating = false;
    component.updating();
    fixture.detectChanges();
    expect(component.isUpdating).toEqual(true);
  });

  it('should ensure the subscription is undefined when component created', () => {
    expect(component.subscription).toEqual(undefined);
  });

  it('should ensure the subscription undefined after call ngOnDestroy method', () => {
    component.ngOnDestroy();
    expect(component.subscription).toEqual(undefined);
  });

  it('should ensure the subscription undefined after call ngOnInit method', () => {
    component.ngOnInit();
    expect(component.isUpdating).toEqual(false);
    expect(component.todo._id).toBeUndefined(true);
    expect(component.todo.status).toBeUndefined(true);
    expect(component.todo.description).toBeUndefined(true);
    expect(component.todo._v).toBeUndefined(true);
    expect(component.todo.author).toBeUndefined(true);
  });

  it("should ensure that updateItem method work with parameter and return correct value",
    async(inject([TodosService], (todoService: TodosService) => {
      let updatedItem = new Todos();
      updatedItem._id = "5757e6e41b0a244b256ac1d5";
      updatedItem.title ="Todo title";
      updatedItem.description = "Todo description";
      updatedItem.status="completed";
       //mockResponse = {"status":"success","data":};

      const mockResponse = {
        data: [
          {"__v":"0","_id":"5757e6e41b0a244b256ac1d5","title":"Todo title","description":"Todo description","status":"completed","author":"587c61662ee257006b150166"}
        ]
      }

      TestBed.get(MockBackend).connections.subscribe((connection: MockConnection) => {
        connection.mockRespond(new Response(new ResponseOptions({
          status:200,
          body: {
            items: [
              {"__v":"0","_id":"5757e6e41b0a244b256ac1d5","title":"Todo title","description":"Todo description","status":"completed","author":"587c61662ee257006b150166"}
            ]
          }
        }) ));
      });

      todoService.updateTodo(updatedItem).subscribe(
        response => {
          expect(response._body.items[0].__v).toEqual("0");
          expect(response._body.items[0]._id).toEqual("5757e6e41b0a244b256ac1d5");
          expect(response._body.items[0].title).toEqual("Todo title");
          expect(response._body.items[0].description).toBeDefined(true);
          expect(response._body.items[0].status).toEqual("completed");
          expect(response._body.items[0].author).toEqual("587c61662ee257006b150166");
          expect(response.ok).toEqual(true);
          expect(response.status).toEqual(200);

        }
      )
    })));

});
