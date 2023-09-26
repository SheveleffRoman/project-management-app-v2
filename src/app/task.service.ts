import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData,
} from './confirmation-dialog/confirmation-dialog.component';
import { Observable, Subject, tap } from 'rxjs';
import { Router } from '@angular/router';
import {
  TaskChangeDialogComponent,
  taskChangeData,
} from './task-change-dialog/task-change-dialog.component';
import { FakeAuthService } from './fake-auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Projects {
  projectName: string;
  boards: Board[];
}

export interface ProjectsX {
  _id?: string;
  title: string;
  owner: string;
  users: string[];
}

export interface Board {
  boardName: string;
  tasks: { id: number; name: string; description: string }[];
}

export interface Task {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://sheveleffroman-final-task-backend.onrender.com';

  private tokenKey: string | null = null;

  private projectAdded$ = new Subject<void>();

  projects: Projects[] = [
    {
      projectName: 'Mobile App',
      boards: [
        {
          boardName: 'To Do',
          tasks: [
            {
              id: 1,
              name: 'Brainstorming',
              description:
                'Brainstorming brings team members diverse experience into play.',
            },
            {
              id: 2,
              name: 'Research',
              description:
                'User research helps you to create an optimal product for users.',
            },
            {
              id: 3,
              name: 'Wireframes',
              description:
                'Low fidelity wireframes include the most basic content and visuals.',
            },
          ],
        },
        {
          boardName: 'Done',
          tasks: [
            {
              id: 1,
              name: 'Columns',
              description:
                'Brainstorming brings team members diverse experience into play.',
            },
            {
              id: 2,
              name: 'Tasks',
              description:
                'User research helps you to create an optimal product for users.',
            },
          ],
        },
      ],
    },
    // Добавьте другие проекты, если необходимо
    {
      projectName: 'Website Redisign',
      boards: [
        {
          boardName: 'Done',
          tasks: [
            {
              id: 1,
              name: 'Columns',
              description:
                'Brainstorming brings team members diverse experience into play.',
            },
            {
              id: 2,
              name: 'Tasks',
              description:
                'User research helps you to create an optimal product for users.',
            },
          ],
        },
      ],
    },
  ];
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private authService: FakeAuthService,
    private http: HttpClient
  ) {}

  showConfirmationDialog(title: string, message: string): Observable<boolean> {
    const confirmDialogData: ConfirmationDialogData = {
      title,
      message,
      deleteProfile: false,
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: confirmDialogData,
    });

    return dialogRef.afterClosed().pipe(
      tap((result) => {
        console.log('Диалоговое окно закрыто, результат:', result);
      })
    );
  }

  showTaskChangeDialog(
    name: string,
    description: string
  ): Observable<taskChangeData> {
    const taskChangeDialogData: taskChangeData = { name, description };
    const dialogRef = this.dialog.open(TaskChangeDialogComponent, {
      width: '400px',
      data: taskChangeDialogData,
    });
    return dialogRef.afterClosed();
  }

  getProjects(): Projects[] {
    return this.projects;
  }

  getProjectsAll(): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http.get<any>(`${this.apiUrl}/boards`, requestOptions);
  }

  getSetBoards(id: string): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http.get<any>(`${this.apiUrl}/boardsSet/${id}`, requestOptions);
  }

  createProject(projectsData: ProjectsX): Observable<any> {
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http
      .post<any>(`${this.apiUrl}/boards`, projectsData, requestOptions)
      .pipe(
        // После успешного добавления проекта отправляем сигнал
        tap(() => {
          this.projectAdded$.next();
        })
      );
  }

  getProjectsUpdated(): Observable<void> {
    return this.projectAdded$.asObservable();
  }

  // onDataChange() {
  //   return this.dataUpdated.asObservable();
  // }

  // // Метод для вызова обновления данных
  // triggerDataUpdate() {
  //   this.dataUpdated.next();
  // }

  // addProject(projectName: string) {
  //   const newProject: Projects = {
  //     projectName: projectName,
  //     boards: [],
  //   };

  //   this.projects.push(newProject);
  // }

  deleteProject(projectName: string) {
    this.showConfirmationDialog(
      'Delete file',
      ` Would you like to delete ${projectName} project`
    ).subscribe((result: boolean) => {
      if (result) {
        // Если пользователь подтвердил удаление
        const projectIndex = this.projects.findIndex(
          (p) => p.projectName === projectName
        );
        if (projectIndex !== -1) {
          this.projects.splice(projectIndex, 1);
        }
        this.router.navigate(['/projects']);
      }
    });
  }

  updateProjectName(projectName: string, newName: string) {
    const project = this.projects.find((p) => p.projectName === projectName);

    if (project) {
      project.projectName = newName;
    }
  }

  getBoards(projectName: string): Board[] {
    const project = this.projects.find((p) => p.projectName === projectName);
    return project ? project.boards : [];
  }

  addBoard(projectName: string, newBoardName: string) {
    const project = this.projects.find((p) => p.projectName === projectName);

    if (project) {
      const existingBoard = project.boards.find(
        (b) => b.boardName === newBoardName
      );

      if (!existingBoard) {
        const newBoard: Board = {
          boardName: newBoardName,
          tasks: [],
        };

        project.boards.push(newBoard);
      }
    }
  }

  deleteBoard(projectName: string, boardName: string) {
    this.showConfirmationDialog(
      'Delete file',
      ` Would you like to delete ${boardName} board`
    ).subscribe((result: boolean) => {
      if (result) {
        // Если пользователь подтвердил удаление
        const projectIndex = this.projects.findIndex(
          (p) => p.projectName === projectName
        );

        if (projectIndex !== -1) {
          const project = this.projects[projectIndex];
          const boardIndex = project.boards.findIndex(
            (b) => b.boardName === boardName
          );

          if (boardIndex !== -1) {
            project.boards.splice(boardIndex, 1);
          }
        }
      }
    });
  }

  updateBoardName(projectName: string, boardName: string, newName: string) {
    const project = this.projects.find((p) => p.projectName === projectName);

    if (project) {
      const board = project.boards.find((b) => b.boardName === boardName);

      if (board) {
        board.boardName = newName;
      }
    }
  }

  getTasks(boardName: string): Task[] {
    const board = this.projects
      .flatMap((p) => p.boards)
      .find((b) => b.boardName === boardName);
    return board ? board.tasks : [];
  }

  addTask(projectName: string, boardName: string, task: Task) {
    const project = this.projects.find((p) => p.projectName === projectName);

    if (project) {
      const board = project.boards.find((b) => b.boardName === boardName);

      if (board) {
        const newId = Math.max(...board.tasks.map((t) => t.id), 0) + 1;
        const newTask = {
          id: newId,
          name: task.name,
          description: task.description,
        };
        board.tasks.push(newTask);
      }
    }
  }

  deleteTask(
    projectName: string,
    boardName: string,
    id: number,
    taskName: string
  ) {
    this.showConfirmationDialog(
      'Delete file',
      ` Would you like to delete ${taskName} task`
    ).subscribe((result: boolean) => {
      if (result) {
        // Если пользователь подтвердил удаление
        const project = this.projects.find(
          (p) => p.projectName === projectName
        );

        if (project) {
          const board = project.boards.find((b) => b.boardName === boardName);

          if (board) {
            const taskIndex = board.tasks.findIndex((t) => t.id === id);

            if (taskIndex !== -1) {
              board.tasks.splice(taskIndex, 1);
            }
          }
        }
      }
    });
  }

  updateTask(
    projectName: string,
    boardName: string,
    taskId: number,
    taskData: taskChangeData
  ) {
    // Открываем диалоговое окно
    const dialogRef = this.showTaskChangeDialog(
      taskData.name,
      taskData.description
    );

    // Ожидаем закрытия диалогового окна и получаем результат
    dialogRef.subscribe((result) => {
      if (result) {
        console.log(result);
        // Пользователь подтвердил обновление задачи
        const project = this.projects.find(
          (p) => p.projectName === projectName
        );

        if (project) {
          const board = project.boards.find((b) => b.boardName === boardName);

          if (board) {
            const task = board.tasks.find((t) => t.id === taskId);

            if (task) {
              // Обновляем данные задачи
              task.name = result.name;
              task.description = result.description;
            }
          }
        }
      }
    });
  }
}
