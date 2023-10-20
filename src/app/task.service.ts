import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  ConfirmationDialogComponent,
  ConfirmationDialogData,
} from './confirmation-dialog/confirmation-dialog.component';
import {
  Observable,
  Subject,
  catchError,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';
import {
  TaskChangeDialogComponent,
  taskChangeData,
} from './task-change-dialog/task-change-dialog.component';
import { FakeAuthService } from './fake-auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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

export interface BoardX {
  _id?: string;
  title: string;
  order: number;
  Project?: string;
}

export interface BoardXOrder {
  _id: string;
  order: number;
}

export interface Task {
  id: number;
  name: string;
  description: string;
}

export interface TaskX {
  _id?: string;
  title: string;
  order: number;
  boardId?: string;
  columnId?: string;
  description: string;
  userId: string;
  users?: string[];
}

export interface UpdateTaskSet {
  _id: string | undefined;
  order: number;
  columnId: string | undefined;
}

export interface SetBoardsTasks {
  board: BoardX;
  tasks: TaskX[];
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://sheveleffroman-final-task-backend.onrender.com';

  private tokenKey: string | null = null;

  private projectUpdated$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private authService: FakeAuthService,
    private http: HttpClient,
    private network: MatSnackBar
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
    title: string,
    order: number,
    BoardId: string,
    description: string,
    userId: string,
    users: string[]
  ): Observable<TaskX> {
    const taskChangeDialogData: TaskX = {
      title,
      order,
      columnId: BoardId,
      description,
      userId,
      users,
    };
    const dialogRef = this.dialog.open(TaskChangeDialogComponent, {
      width: '400px',
      data: taskChangeDialogData,
    });
    return dialogRef.afterClosed();
  }

  //////////////////////////////////PROJECTS//////////////////////////////////

  getProjectsAll(): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http.get<any>(`${this.apiUrl}/boards`, requestOptions);
  }

  getSetProjects(id: string): Observable<any> {
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
          this.projectUpdated$.next();
        })
      );
  }

  updateProjectName(id: string, projectData: ProjectsX): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };
    return this.http
      .put<any>(`${this.apiUrl}/boards/${id}`, projectData, requestOptions)
      .pipe(tap(() => this.projectUpdated$.next()));
  }

  getProjectsUpdated(): Observable<void> {
    return this.projectUpdated$.asObservable();
  }

  deleteProject(id: string, projectName: string): Observable<any> {
    return this.showConfirmationDialog(
      'Delete file',
      `Would you like to delete ${projectName} project`
    ).pipe(
      switchMap((result: boolean) => {
        if (result) {
          this.tokenKey = this.authService.getToken();
          const headers = new HttpHeaders({
            accept: 'application/json',
            Authorization: `Bearer ${this.tokenKey}`,
          });
          const requestOptions = { headers: headers };
          return this.http
            .delete<any>(`${this.apiUrl}/boards/${id}`, requestOptions)
            .pipe(
              tap(() => {
                this.router.navigate(['/projects']),
                  this.projectUpdated$.next();
              })
            );
        } else {
          // Return some default value or handle the case where the user didn't confirm deletion.
          return of(null);
        }
      })
    );
  }

  //////////////////////////////////BOARDS//////////////////////////////////

  addBoard(boardId: string, column: BoardX): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http.post<any>(
      `${this.apiUrl}/boards/${boardId}/columns`,
      column,
      requestOptions
    );
  }

  getBoardsByProject(id: string): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http.get<any>(
      `${this.apiUrl}/boards/${id}/columns`,
      requestOptions
    );
  }

  deleteBoard(
    projectId: string,
    boardId: string,
    boardName: string
  ): Observable<any> {
    return this.showConfirmationDialog(
      'Delete file',
      ` Would you like to delete ${boardName} board`
    ).pipe(
      switchMap((result: boolean) => {
        if (result) {
          this.network.open('Deleting...', 'ok');
          this.tokenKey = this.authService.getToken();
          const headers = new HttpHeaders({
            accept: 'application/json',
            Authorization: `Bearer ${this.tokenKey}`,
          });
          const requestOptions = { headers: headers };
          return this.http
            .delete<any>(
              `${this.apiUrl}/boards/${projectId}/columns/${boardId}`,
              requestOptions
            )
            .pipe(
              tap(() => {
                //  this.projectAdded$.next();
                this.network.dismiss();
                this.network.open('Delete complete', 'ok', { duration: 1500 });

                console.log('Delete complete');
              })
            );
        } else {
          // Return some default value or handle the case where the user didn't confirm deletion.
          return of(null);
        }
      })
    );
  }

  updateBoardName(
    projectId: string,
    boardId: string,
    columnData: BoardX
  ): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http.put<any>(
      `${this.apiUrl}/boards/${projectId}/columns/${boardId}`,
      columnData,
      requestOptions
    );
  }

  updateBoardOrder(
    projectId: string,
    boardId: string,
    newData: BoardX
  ): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };
    return this.http.put<any>(
      `${this.apiUrl}/boards/${projectId}/columns/${boardId}`,
      newData,
      requestOptions
    );
  }

  //////////////////////////////////TASKS//////////////////////////////////

  getTasks(projectId: string, boardId: string): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };
    return this.http.get<any>(
      `${this.apiUrl}/boards/${projectId}/columns/${boardId}/tasks`,
      requestOptions
    );
  }

  getTasksByProject(projectId: string): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };
    return this.http.get<any>(
      `${this.apiUrl}/tasksSet/${projectId}`,
      requestOptions
    );
  }

  addTask(
    projectId: string,
    boardId: string,
    taskData: TaskX
  ): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    this.network.open('Create task...', 'ok')

    const requestOptions = { headers: headers };
    return this.http.post<any>(
      `${this.apiUrl}/boards/${projectId}/columns/${boardId}/tasks`,
      taskData,
      requestOptions
    ).pipe(
      tap(() => {
        this.network.dismiss();
        this.network.open('Create complete', 'ok', { duration: 1500 });
      })
    );
  }

  deleteTask(
    projectId: string,
    boardId: string,
    taskId: string,
    taskName: string
  ): Observable<any> {
    return this.showConfirmationDialog(
      'Delete file',
      ` Would you like to delete ${taskName} task`
    ).pipe(
      switchMap((result: boolean) => {
        if (result) {
          this.network.open('Deleting task...', 'ok')
          this.tokenKey = this.authService.getToken();
          const headers = new HttpHeaders({
            accept: 'application/json',
            Authorization: `Bearer ${this.tokenKey}`,
          });
          const requestOptions = { headers: headers };
          return this.http
            .delete<any>(
              `${this.apiUrl}/boards/${projectId}/columns/${boardId}/tasks/${taskId}`,
              requestOptions
            )
            .pipe(
              tap(() => {
                //  this.projectAdded$.next();
                this.network.dismiss();
                this.network.open('Delete complete', 'ok', { duration: 1500 });

                console.log('Delete complete');
              })
            );
        } else {
          // Return some default value or handle the case where the user didn't confirm deletion.
          return of(result);
        }
      })
    );
  }

  updateSetOfTasks(taskData: UpdateTaskSet[]): Observable<any> {
    this.tokenKey = this.authService.getToken();
    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.tokenKey}`,
    });
    const requestOptions = { headers: headers };

    return this.http
      .patch<any>(`${this.apiUrl}/tasksSet`, taskData, requestOptions)
      .pipe(
        catchError((error: any) => {
          // Здесь можно добавить логирование или обработку ошибок
          console.error('An error occurred:', error);

          // Возвращаем ошибку как Observable
          return throwError(() => new Error(error));
        })
      );
  }

  updateTask(taskData: TaskX): Observable<any> {
    // Открываем диалоговое окно
    const dialogRef = this.showTaskChangeDialog(
      taskData.title,
      taskData.order,
      taskData.columnId!,
      taskData.description,
      taskData.userId,
      taskData.users!
    );

    // Ожидаем закрытия диалогового окна и получаем результат
    return dialogRef.pipe(
      switchMap((newTask) => {
        if (newTask) {
          console.log(newTask);
          // Пользователь подтвердил обновление задачи
          this.tokenKey = this.authService.getToken();
          const headers = new HttpHeaders({
            accept: 'application/json',
            Authorization: `Bearer ${this.tokenKey}`,
          });
          const requestOptions = { headers: headers };

          return this.http
            .put<any>(
              `${this.apiUrl}/boards/${taskData.boardId}/columns/${taskData.columnId}/tasks/${taskData._id}`,
              newTask,
              requestOptions
            )
            .pipe
            // You can add more operators or handling here if needed
            // tap(() => {
            //   //  this.projectAdded$.next();
            //   console.log('Update complete');
            // })
            ();
        } else {
          // Return some default value or handle the case where the user didn't confirm the update.
          return of(null);
        }
      })
    );
  }
}
