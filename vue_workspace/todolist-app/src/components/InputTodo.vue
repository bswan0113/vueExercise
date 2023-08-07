<template>
    <div>
        <div class="row mb-3">
            <div class="col">
                <div class="input-group">
                    <input type="text" class="form-control" id="msg" v-model.trim="todo" @keyup.enter="addTodoHandler"/>
                    <span class="btn btn-primary input-group-addon" @click="addTodoHandler">추가</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "InputTodo",
        data(){
            return{ todo : ""}
        },
        methods : {
            addTodoHandler(){
                if(this.todo.length>= 3){
                    this.emitter.emit("add-todo",this.todo)
                    this.todo="";
                }
            }
        }
    }
</script>

<style scoped>

</style>