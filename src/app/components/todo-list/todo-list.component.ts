import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../../model/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public todos: Todo[] = [];
  public previewsKey: String = '';
  public previewsOrder: String = '';
  constructor(private router: Router, private todoService: TodoService) {}

  ngOnInit() {
    this.loadAllTodoList();
  }
  loadAllTodoList() {
    this.todos = this.todoService.getAllTodos();
    this.todos.forEach((val) => {
      val['ratings'] = [];
      for (var i = 0; i < Number(val['rating']); i++) {
        val['ratings'].push(i)
      }
      // val['rating'] = Array(Number(val['rating'])).fill().map((x,i)=>i);
    })
  }

  onClickEditTodoDetail(id) {
    this.router.navigate(['/todo-detail'], { queryParams: { id: id } });
  }

  onClickAddTodo() {
    this.router.navigate(['/todo-detail']);
  }

  onClickTodoDelete(id) {
    this.todoService.deleteTodoDetail(id);
    this.loadAllTodoList();
  }

  onClickTodoCompleted(id) {
    this.todoService.completeTodoDetail(id);
    this.loadAllTodoList();
  }

  sort(key) {
    if (this.previewsKey == key) {
      this.previewsKey = key;
      if (this.previewsOrder == 'asc') {
        this.sortingInDescendingOrder(key);
        this.previewsOrder = 'desc';
      } else {
        this.sortingInAscendingOrder(key);
        this.previewsOrder = 'asc';
      }
    } else {
      this.previewsKey = key;
      this.previewsOrder = 'asc';
      this.sortingInAscendingOrder(key);
    }
  }

  sortingInAscendingOrder(key) {
    this.todos.sort(function(val1, val2) {
      if (val1[key] < val2[key]) return -1;
      else if (val1[key] > val2[key]) return 1;
      else return 0;
    })
  }

  sortingInDescendingOrder(key) {
    this.todos.sort(function(val1, val2) {
      if (val1[key] < val2[key]) return 1;
      else if (val1[key] > val2[key]) return -1;
      else return 0;
    })
  }

}
