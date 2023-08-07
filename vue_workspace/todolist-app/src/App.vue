<template>
    <div id="app" class="container">
        <div class="card card-body bg-light">
            <div class="title">:: Todolist App</div>
        </div>
        <div class="card card-default card-borderless">
            <div class="card-body">
                <InputTodo @add-todo="addTodo"/>
                <TodoList :todoList="todoList" @delete-todo="deleteTodo" @toggle-completed="ToggleCompleted"/>
            </div>
        </div>
    </div>
</template>

<script>
import InputTodo from './components/InputTodo.vue'
import TodoList from './components/TodoList.vue'
let ts = new Date().getTime()

    export default {
        name : "App",
        components: { InputTodo,TodoList },
        created(){
            this.emitter.on("add-todo",this.addTodo);
            this.emitter.on("delete-todo",this.deleteTodo);
            this.emitter.on("toggle-todo",this.ToggleCompleted);
        },
        data(){
            return{
                todoList:[
                    {id: ts, todo:"놀기",completed:false},
                    {id: ts+1, todo:"놀기",completed:false},
                    {id: ts+2, todo:"놀기",completed:false},
                    {id: ts+3, todo:"놀기",completed:false},
                ]
            }
        },
        methods:{
            addTodo(todo){
                if(todo.length>=2){
                    this.todoList.push({id : new Date().getTime(), todo: todo, completed:false})
                }
            },
            deleteTodo(id){
                let index = this.todoList.findIndex((item)=> id === item.id);
                this.todoList.splice(index,1);
            },
            ToggleCompleted(id){
                let index = this.todoList.findIndex((item)=>id===item.id);
                this.todoList[index].completed = !this.todoList[index].completed;
            }
        }
}       
</script>

<style scoped>

</style>