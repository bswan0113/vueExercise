<template>
    <div :class="$style.child">
        <h2>끼</h2>
    </div>
</template>

<script>
    export default {
        name:"Child3",
        created(){
            console.log(this.$style)
        }
    }
</script>

<style module>
.child{background-color: blanchedalmond; border: 1px solid black; margin: 1.5rem; padding: 1.0em;}
</style>