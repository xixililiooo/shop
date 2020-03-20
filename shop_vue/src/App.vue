<template>
  <div id="app">
    <keep-alive>
       <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*, *:before, *:after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}
</style>
