import { Component, HostListener, Input } from '@angular/core';
import { ProjectsX, TaskService } from '../task.service';
import { FakeAuthService, User } from '../fake-auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NewProjectAddFormComponent } from '../new-project-add-form/new-project-add-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss'],
})
export class SnippetComponent {
  constructor(
    private taskService: TaskService,
    private network: MatSnackBar,
  ) {}

  @Input() snippet!: ProjectsX;

  login: string | null = '';
  usersData: User[] = [];
  options: string[] = [];
  owner: string = '';
  userId: string = '';
  selectedUser: any;
  projectsUpdatedSubscription: Subscription = Subscription.EMPTY;

  showForm: boolean = false;
  newProjectName: string = '';
  openOptions: boolean = false;

  debugInfo(message: string, data: any): void {
    // console.log(message, data);
  }

  showOptions(event: MouseEvent) {
    const body = document.querySelector('body'); // костыль для закрытия других меню
    body?.click();
    event.stopPropagation();
    event.preventDefault();
    this.openOptions = true;
  }

  closeOptions() {
    this.openOptions = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.openOptions && !this.isClickInsideOptions(event)) {
      this.closeOptions();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeOptions();
    }
  }

  isClickInsideOptions(event: MouseEvent): boolean {
    const optionsElement = document.querySelector('.options-trigger');
    // использую !! для преобразования результата в логический тип.
    // Это гарантирует, что функция всегда вернет true или false, но не null.
    return !!optionsElement && optionsElement.contains(event.target as Node);
  }

  deleteProject() {

    this.taskService.deleteProject(this.snippet._id!, this.snippet.title).subscribe({
      next: () => {
        this.network.dismiss();
        this.network.open('Project delete', 'ok', {duration: 1500})
      },
      error: (error) => {
        console.error('Error deleting project:', error);
        this.network.dismiss();
        this.network.open('Something went wrong...', 'ok', { duration: 3000 });
      }
    });
  }
}
