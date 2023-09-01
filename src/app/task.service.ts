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


// const boardsAndTasks = [
//   {
//     boardName: "Доска 1",
//     tasks: [
//       {
//         taskId: 1,
//         taskName: "Задача 1",
//         taskDescription: "Описание задачи 1",
//       },
//       {
//         taskId: 2,
//         taskName: "Задача 2",
//         taskDescription: "Описание задачи 2",
//       },
//     ],
//   },
//   {
//     boardName: "Доска 2",
//     tasks: [
//       {
//         taskId: 3,
//         taskName: "Задача 3",
//         taskDescription: "Описание задачи 3",
//       },
//       {
//         taskId: 4,
//         taskName: "Задача 4",
//         taskDescription: "Описание задачи 4",
//       },
//     ],
//   },
// ];


// updateBoardName(boardIndex: number, newName: string) {
//   if (boardIndex >= 0 && boardIndex < this.boardsAndTasks.length) {
//     this.boardsAndTasks[boardIndex].boardName = newName;
//   }
// }