<script lang="ts" setup>
function openManual(){
    document.getElementById('manual')!.style.display = 'block';
}
function closeManual(){
    document.getElementById("manual")!.style.display = "none";
}
</script>
<template>
    <div class="container">
        <v-row>
            <v-col md-9>
                <p>Babymonitor CTG Simulator</p>
            </v-col>
            <v-col md-3>
                <!--  <button class="manual-btn">{{ $t("message.manual")}}</button> -->
                <button class="manual-btn" :onclick="openManual()">{{ $t("message.manual")}}</button>
            </v-col>
        </v-row>
    </div>
<div class="popup">
    <h1>Test Title</h1>
    <p>Test tekst</p>
</div>

</template>

<style scoped>
.popup{
    display:none;
    max-width: 80vw;
    padding: 10px;
    position:fixed;
    bottom: 0;
    right: 15px;
    border: 3px;
    z-index: 9;
}

.container{
    margin: 15px;
    padding: 10px;
    width: 100%;
}
.manual-btn{
    float: right;
}
</style>