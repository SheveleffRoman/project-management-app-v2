import { Component, OnInit } from '@angular/core';
import { Projects, ProjectsX, TaskService } from '../task.service';
import { FakeAuthService, User } from '../fake-auth.service';
import { Subscription, skipUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewProjectAddFormComponent } from '../new-project-add-form/new-project-add-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snippet-projects',
  templateUrl: './snippet-projects.component.html',
  styleUrls: ['./snippet-projects.component.scss'],
})
export class SnippetProjectsComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private authService: FakeAuthService,
    private dialog: MatDialog,
    private newtwork: MatSnackBar
  ) {}

  snippets: ProjectsX[] = [];

  login: string | null = '';
  usersData: User[] = [];
  options: string[] = [];
  owner: string = '';
  userId: string = '';
  selectedUser: any;
  projectsUpdatedSubscription: Subscription = Subscription.EMPTY;

  showForm: boolean = false;
  newProjectName: string = '';

  ngOnInit(): void {
    this.getSnippets();
    console.log(this.snippets);
    this.projectsUpdatedSubscription = this.taskService
      .getProjectsUpdated()
      .subscribe(() => {
        // Здесь можно выполнить запрос на получение всех проектов заново
        this.snippets = [];
        this.getSnippets();
      });
  }

  getSnippets() {
    this.login = this.authService.getLogin();

    this.authService.getUserAll().subscribe(
      (users) => {
        const user = users.find((user: any) => this.login === user.login);
        if (user) {
          this.userId = user._id;
          // отладочный метод для вывода информации
          this.debugInfo('User found:', user);
          this.usersData = users.filter((user: User) => user._id !== this.userId );
          // console.log(this.usersData);
          this.taskService.getSetProjects(this.userId).subscribe((set) => {
            // this.snippets = [];
            set.forEach((projectData: any) => {
              const project: ProjectsX = {
                _id: projectData._id,
                title: projectData.title,
                owner: projectData.owner,
                users: [],
              };

              this.snippets.push(project);
            });
          });
        }
      },
      (error) => {
        // Обработка ошибок и вывод информации
        this.debugInfo('Error occurred:', error);
      }
    );
  }

  debugInfo(message: string, data: any): void {
    // console.log(message, data);
  }

  // addProject() {
  //   this.taskService.addProject(this.newProjectName);
  //   this.newProjectName = '';
  //   this.showForm = false;
  // }

  // openAddProjectForm() {
  //   this.newProjectName = '';
  //   this.showForm = true;
  // }

  closeAddProjectForm() {
    this.newProjectName = '';
    this.showForm = false;
  }

  openAddProjectForm(): void {
    this.newProjectName = '';
    
    const dialogRef = this.dialog.open(NewProjectAddFormComponent, {
      width: '450px',
      data: this.usersData,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined && result.name) { // result не undefined и имеет свойство 'name'
        console.log('Новый проект добавлен', result);
        this.newProjectName = result.name;
        this.selectedUser = result.selectedUser;
        this.addProject();
      } else {
        console.log('Новый проект не добавлен', result);
      }
    });
    
    
  }
  

  addProject(): void {
    const title = this.newProjectName;

    // const ownerUser = this.userData.find((user) => user.login === this.login);

    this.owner = this.userId;

    // const selectedUsersIds = this.boardsData
    //   .get('selectedUsers')
    //   ?.value.map((selectedLogin: string) => {
    //     const user = this.userData.find((user) => user.login === selectedLogin);
    //     return user ? user._id : '';
    //   });

    const boardData: ProjectsX = {
      title: title,
      owner: this.owner,
      users: [],
    };

    if (this.selectedUser) {
      // console.log(this.selectedUser);
      boardData.users = this.selectedUser;
    }

    this.taskService.createProject(boardData).subscribe({
      next: (res) => {
        console.log('Task add complete',res)
        this.newtwork.open('Saved', 'ok', {duration: 1500});
      },
      error: (error) => {
        console.error('Error add task:', error);
        this.newtwork.open('Something went wrong...', 'ok', {duration: 3000});
      }
    })
    this.newProjectName = '';
    this.showForm = false;
  }
}
