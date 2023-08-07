<template>
    <div>
        <slot name="icon"></slot>
        <input type="checkbox" :value="id" :checked="checked"
        @change="$emit('check-changed',{id, checked: $event.target.checked})"> 
        <slot name="label"></slot>   
    </div>
</template>

<script>
    export default {
        name : "CheckBox",
        props:["id", "checked"]
    }
</script>

<style scoped>

</style>