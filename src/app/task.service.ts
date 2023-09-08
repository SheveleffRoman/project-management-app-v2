import { Injectable } from '@angular/core';

export interface Projects {
  projectName: string;
  boards: Board[];
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
  constructor() {}

  getProjects(): Projects[] {
    return this.projects;
  }

  addProject(projectName: string) {
    const newProject: Projects = {
      projectName: projectName,
      boards: [],
    };

    this.projects.push(newProject);
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

  deleteTask(projectName: string, boardName: string, id: number) {
    const project = this.projects.find((p) => p.projectName === projectName);

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

  updateProjectName(projectName: string, newName: string) {
    const project = this.projects.find((p) => p.projectName === projectName);

    if (project) {
      project.projectName = newName;
    }
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
}

// interface Task {
//   id: number;
//   name: string;
//   description: string;
// }

// interface Board {
//   boardName: string;
//   tasks: Task[];
// }

// interface Project {
//   projectName: string;
//   boards: Board[];
// }

// const projects = [
//   {
//     projectName: 'Project 1',
//     boards: [
//       {
//         boardName: 'To Do',
//         tasks: [
//           {
//             id: 1,
//             name: 'Brainstorming',
//             description: 'Brainstorming brings team members diverse experience into play.',
//           },
//           {
//             id: 2,
//             name: 'Research',
//             description: 'User research helps you to create an optimal product for users.',
//           },
//           {
//             id: 3,
//             name: 'Wireframes',
//             description: 'Low fidelity wireframes include the most basic content and visuals.',
//           },
//         ],
//       },
//       {
//         boardName: 'Done',
//         tasks: [
//           {
//             id: 1,
//             name: 'Columns',
//             description: 'Brainstorming brings team members diverse experience into play.',
//           },
//           {
//             id: 2,
//             name: 'Tasks',
//             description: 'User research helps you to create an optimal product for users.',
//           },
//         ],
//       },
//     ],
//   },
//   // Добавьте другие проекты, если необходимо
// ];

// addTask(projectName: string, boardName: string, task: TaskObj) {
//   const project = this.projects.find((p) => p.projectName === projectName);

//   if (project) {
//     const board = project.boards.find((b) => b.boardName === boardName);

//     if (board) {
//       // Генерируем уникальный ID для новой задачи (находим максимальный ID и добавляем 1)
//       const newId = Math.max(...board.tasks.map((t) => t.id), 0) + 1;

//       // Создаем новую задачу с указанными данными
//       const newTask = {
//         id: newId,
//         name: task.name,
//         description: task.description,
//       };

//       // Добавляем новую задачу в массив задач доски
//       board.tasks.push(newTask);
//     }
//   }
// }
