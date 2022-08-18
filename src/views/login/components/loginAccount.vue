<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="account"
      :rules="accountRules"
      label-width="55px"
      status-icon
    >
      <el-form-item label="账户" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { accountRules } from '../config/accountConfig'
import { useStore } from 'vuex'
import LocalCache from '@/utils/cache'
export default defineComponent({
  setup() {
    const store = useStore()
    const ruleFormRef = ref<InstanceType<typeof ElForm>>()
    const account = reactive({
      name: LocalCache.getCache('loginInfo')
        ? LocalCache.getCache('loginInfo').name
        : '',
      password: LocalCache.getCache('loginInfo')
        ? LocalCache.getCache('loginInfo').password
        : ''
    })
    const loginAction = (isKeepPassword: boolean) => {
      ruleFormRef.value?.validate((valid) => {
        console.log(valid)
        if (valid) {
          if (isKeepPassword) {
            LocalCache.setCache('loginInfo', {
              name: account.name,
              password: account.password
            })
          } else {
            LocalCache.deleteCache('loginInfo')
          }
          store.dispatch('loginModule/accountLoginAction', { ...account })
          console.log('正式登录...')
        }
      })
    }
    return {
      account,
      accountRules,
      loginAction,
      ruleFormRef
    }
  }
})
</script>

<style scoped></style>
