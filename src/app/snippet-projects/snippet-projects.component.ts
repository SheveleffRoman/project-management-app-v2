import { Component, OnInit } from '@angular/core';
import { Projects, ProjectsX, TaskService } from '../task.service';
import { FakeAuthService, User } from '../fake-auth.service';
import { Subscription, skipUntil } from 'rxjs';

@Component({
  selector: 'app-snippet-projects',
  templateUrl: './snippet-projects.component.html',
  styleUrls: ['./snippet-projects.component.scss'],
})
export class SnippetProjectsComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private authService: FakeAuthService
  ) {}

  snippets: ProjectsX[] = [];

  login: string | null = '';
  userData: User[] = [];
  options: string[] = [];
  owner: string = '';
  userId: string = '';
  selectedUser: string | undefined;
  projectsUpdatedSubscription: Subscription = Subscription.EMPTY;

  showForm: boolean = false;
  newProjectName: string = '';

  ngOnInit(): void {
    this.getSnippets();
    console.log(this.snippets)
    this.projectsUpdatedSubscription = this.taskService.getProjectsUpdated().subscribe(() => {
      // Здесь можно выполнить запрос на получение всех проектов заново
      this.snippets = [];
      this.getSnippets();
    });
  }

  getSnippets() {
    this.login = this.authService.getLogin();

    this.authService.getUserAll().subscribe(
      (users) => {
        this.userData = users;
        // console.log(this.userData);
        const user = users.find((user: any) => this.login === user.login);
        if (user) {
          this.userId = user._id;
          // Используйте отладочный метод для вывода информации
          this.debugInfo('User found:', user);
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

  openAddProjectForm() {
    this.newProjectName = '';
    this.showForm = true;
  }

  closeAddProjectForm() {
    this.newProjectName = '';
    this.showForm = false;
  }

  addProject() {
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
      boardData.users.push(this.selectedUser)
    }

    this.taskService.createProject(boardData).subscribe((response) => {
      if (response) {
        // После успешного создания проекта вызываем метод для обновления данных
        console.log(response);
      }
    });
    this.newProjectName = '';
    this.showForm = false;
  }
}
