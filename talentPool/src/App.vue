<template>
  <div id="app">

    <router-view  v-if="isRouterAlive"/>
  </div>
</template>

<script>
	export default {
        name: 'App',
        provide () {                                              
            return {
                reload: this.reload                                              
            }
        },
        data() {
            return{
                isRouterAlive: true          
            }
        },
        methods: {
            reload () {
				console.log('刷新啦')
                this.isRouterAlive = false;            //先关闭，
                this.$nextTick(function () {
                    this.isRouterAlive = true;         //再打开
                }) 
            }
        }
    }

</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
      height: 100%;
      position: relative;
}

</style>
