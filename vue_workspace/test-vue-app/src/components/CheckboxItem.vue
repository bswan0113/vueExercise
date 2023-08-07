<template>
    <div>
        <li>
            <input type="checkbox" :checked="checked">{{ id }} - {{ name }}
        </li>
    </div>
</template>

<script>
    export default {
        name:"CheckboxItem",
        props : {
            id : [Number, String],
            name : {
                validator(v){
                    return typeof(v) !== "string" ?
                    false :
                    v.trimEnd().length <= 4 ? true : false
                }
            },
            checked : {
                type : Boolean,
                required : false,
                default : false
            }
        },
    }
</script>

<style scoped>

</style>