import { Component, OnDestroy, OnInit } from '@angular/core';
import { Projects, ProjectsX, TaskService } from '../task.service';
import { FakeAuthService } from '../fake-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board-side-menu',
  templateUrl: './board-side-menu.component.html',
  styleUrls: ['./board-side-menu.component.scss'],
})
export class BoardSideMenuComponent implements OnInit, OnDestroy {
  constructor(
    private taskService: TaskService,
    private authService: FakeAuthService
  ) {}

  projects: ProjectsX[] = [];
  projectName!: string;
  userId: string = '';
  login: string | null = '';
  projectsUpdatedSubscription: Subscription = Subscription.EMPTY;


  ngOnInit(): void {
    this.getProjects();
    // console.log(this.projects);
    this.projectsUpdatedSubscription = this.taskService.getProjectsUpdated().subscribe(() => {
      // Здесь можно выполнить запрос на получение всех проектов заново
      this.projects = [];
      this.getProjects();
    });
  }

  ngOnDestroy() {
    // Не забудьте отписаться от подписки при уничтожении компонента
    this.projectsUpdatedSubscription.unsubscribe();
  }

  getProjects() {
    this.login = this.authService.getLogin();

    this.authService.getUserAll().subscribe(
      (users) => {
        const user = users.find((user: any) => this.login === user.login);
        if (user) {
          this.userId = user._id;
          // Используйте отладочный метод для вывода информации
          this.taskService.getSetProjects(this.userId).subscribe((set) => {
            // this.snippets = [];
            set.forEach((projectData: any) => {
              const project: ProjectsX = {
                _id: projectData._id,
                title: projectData.title,
                owner: '',
                users: [],
              };

              this.projects.push(project);
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
}
