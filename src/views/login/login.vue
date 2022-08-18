<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './components/loginPanel.vue'

export default defineComponent({
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/img/login-bg.svg');
  background-size: contain;
}
</style>
