/* eslint-disable arrow-body-style */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TodoService } from '../shared/todo.service';
import { TodoStore } from '../state/state';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
})
export class AddTodoPage implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private todoStore: TodoStore,
    private ts: TodoService,
    private router: Router,
    public toastController: ToastController) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
  createTodo(){
    this.ts.addTodo(this.form.controls.title.value, this.form.controls.description.value).subscribe({
      next: (res) => {
        // console.log('this is response',res);
        this.presentToast();
        this.todoStore.update(state => {
          return {
            todos: [
              ...state.todos,
              res
            ]
          };
        });
      },
      error: (err) => {
        console.log('error block', err);
      },
      complete: () => {
        this.router.navigateByUrl('/');
      }
    });
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your Todo has been saved.',
      duration: 2000,
      color: 'dark',
    });
    toast.present();
  }
}
