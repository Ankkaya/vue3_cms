<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="account"
      :rules="phoneRules"
      label-width="65px"
      status-icon
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="account.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="code">
          <el-input v-model="account.code" />
          <el-button type="primary" class="code-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { defineComponent, reactive } from 'vue'
import { phoneRules } from '../config/phoneConfig'
export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      phone: '',
      code: ''
    })
    const loginAction = () => {
      console.log('手机号码登录...')
      store.dispatch('loginModule/phoneLoginAction', { ...account })
    }
    return {
      account,
      phoneRules,
      loginAction
    }
  }
})
</script>

<style scoped lang="less">
.code {
  display: flex;
  &-btn {
    margin-left: 5px;
  }
}
</style>
