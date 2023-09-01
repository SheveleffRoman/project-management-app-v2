import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  
  tasks: Task[] = [
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
  ];

  constructor() {}

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  deleteTask(id: number) {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}
