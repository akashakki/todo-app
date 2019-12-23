import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Todo } from '../model/todo';

@Injectable()
export class TodoService {

  public todos: Todo[] = [];
  constructor() {}

  getAllTodos(): Todo[] {

    if (localStorage.getItem('localData') !== null) {
      this.todos = JSON.parse(localStorage.getItem('localData'));
    } else {
      var todoArrayData = [{
          id: 1,
          taskName: 'Task 1',
          status: 'Completed',
          rating: '5',
          date: '2019-12-23'
        },
        {
          id: 2,
          taskName: 'Task 2',
          status: 'Pending',
          rating: '2',
          date: '2019-12-19'
        }
      ];
      localStorage.setItem('localData', JSON.stringify(todoArrayData));
      this.todos = JSON.parse(localStorage.getItem('localData'));
    }
    return this.todos;
  }

  getTodoById(id: number): Todo {
    var todoArray = JSON.parse(localStorage.getItem('localData'));
    return todoArray
      .filter(todo => todo.id === id)
      .pop();
  }

  updateTodoById(todo): Todo {
    if (todo.id === 0) {
      var todoArray = JSON.parse(localStorage.getItem('localData'));
      var todoid = todoArray.length;
      todo.id = ++todoid;
      todo.status = 'Pending';
      todoArray.push(todo);
      localStorage.setItem('localData', JSON.stringify(todoArray));
    } else {
      var todoSaveArray = JSON.parse(localStorage.getItem('localData'));
      for (var i in todoSaveArray) {
        if (todoSaveArray[i].id === todo.id) {
          todoSaveArray[i] = todo;
          localStorage.setItem('localData', JSON.stringify(todoSaveArray));
        }
      }
    }
    return todo;
  }

  deleteTodoDetail(id) {
    var todoArray = JSON.parse(localStorage.getItem('localData'));
    for (var i in todoArray) {
      if (todoArray[i].id === id) {
        todoArray.splice(i, 1);
        localStorage.setItem('localData', JSON.stringify(todoArray));
      }
    }
  };
  completeTodoDetail(id) {
    var todoSaveArray = JSON.parse(localStorage.getItem('localData'));
    for (var i in todoSaveArray) {
      if (todoSaveArray[i].id === id) {
        todoSaveArray[i].status = 'Completed';
        localStorage.setItem('localData', JSON.stringify(todoSaveArray));
      }
    }
  };
}
