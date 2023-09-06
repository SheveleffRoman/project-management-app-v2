import { Injectable } from '@angular/core';

export interface Task {
  boardName: string;
  tasks: { id: number; name: string; description: string }[];
}

export interface TaskObj {
  id: number; 
  name: string; 
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  boards: Task[] = [
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
  ];

  constructor() {}

  getBoards(): Task[] {
    return this.boards;
  }

  getTasksByBoard(boardName: string): Task[] {
    return this.boards.filter((task) => task.boardName === boardName);
  }
  

  addTask(boardName: string, task: TaskObj) {
    const board = this.boards.find((board) => board.boardName === boardName);

    if (board) {
      // Генерируем уникальный ID для новой задачи (находим максимальный ID и добавляем 1)
      const newId = Math.max(...board.tasks.map((t) => t.id), 0) + 1;

      // Создаем новую задачу с указанными данными
      const newTask = {
        id: newId,
        name: task.name,
        description: task.description,
      };

      // Добавляем новую задачу в массив задач доски
      board.tasks.push(newTask);
    }
  }

  deleteTask(boardName: string, id: number) {
    const board = this.boards.find((task) => task.boardName === boardName);
  
    if (board) {
      const taskIndex = board.tasks.findIndex((task) => task.id === id);
  
      if (taskIndex !== -1) {
        board.tasks.splice(taskIndex, 1);
      }
    }
  }

  updateBoardName(boardName: string, newName: string) {
    const board = this.boards.find((board) => board.boardName === boardName);

    if (board) {
      board.boardName = newName;
    }
  }
  
}
