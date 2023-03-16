<script lang="ts">

export default{
    name: 'NavBar',

    mounted(){

    },
    data(){

    },


}

</script>
<template>
    <div class="container">
        <v-navigation-drawer theme="dark">
        <v-list>
            <v-list-item title="Data importeren"><RouterLink to="/"></RouterLink></v-list-item>
            <v-list-item title="Data exporteren"></v-list-item>
            <v-divider></v-divider>
            <v-list-item title="Taal selecteren"></v-list-item>
        </v-list>
    </v-navigation-drawer>
    </div>



</template>

<style scoped>
    .container{
        width: 10%;
    }
</style>