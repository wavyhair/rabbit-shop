/*
* @path: src/views/login/components
* @Autor:jiea
* @LastEditors: jiea
* Date: 2022-05-05 20:49
* @LastEditTime: 2022-05-10 20:12:54
* IDE:WebStorm
* @Description: ...
*/
<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin=false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin=true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <VeeForm ref="veeForm" class="form" :validation-schema="schema" v-slot="{errors}" autocapitalize="off" >
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field  v-model="form.account" :class="{error:errors.account}" name="account"  type="text" placeholder="请输入用户名或手机号"/>
          </div>
           <div v-if="errors.account" class="error"><i class="iconfont icon-warning" />{{errors.account}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field  v-model="form.password" :class="{error:errors.password}" name="password" type="password" placeholder="请输入密码"/>
          </div>
          <div v-if="errors.password" class="error"><i class="iconfont icon-warning" />{{errors.password}}</div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field  v-model="form.mobile" :class="{error:errors.mobile}" name="mobile" type="text" placeholder="请输入手机号"/>
          </div>
          <div v-if="errors.mobile" class="error"><i class="iconfont icon-warning" />{{errors.mobile}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field  v-model="form.code" name="code" type="password" placeholder="请输入验证码"/>
            <span class="code">发送验证码</span>
          </div>
          <div v-if="errors.code" class="error"><i class="iconfont icon-warning" />{{errors.code}}</div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
<!--          <XtxCheckBox v-model="form.isAgree"/>-->
          <Field as="XtxCheckBox" v-model="form.isAgree" name="isAgree"/>
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div v-if="errors.isAgree" class="error"><i class="iconfont icon-warning" />{{errors.isAgree}}</div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </VeeForm>
    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="">
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form as VeeForm, Field } from 'vee-validate'
import mySchema from '@/utils/vee-validateschema'
import { ref, reactive, watch } from 'vue'
// 是否短信登录
const isMsgLogin = ref(false)
// 表单实例
const veeForm = ref(null)
// 表单信息对象
const form = reactive({
  isAgree: true, // 是否同意
  account: null,
  password: null,
  mobile: null,
  code: null
})
/**
 * vee-validate 校验基本步骤
 * 1.导入 Form Field 组件 将 form 和 input 进行替换 需要加上 name 用来指定将来校验规则函数
 * 2.Field 需要进行数据绑定 字段名称最好和后台接口需要的一致
 * 3.定义 Field 的 name 属性指定的校验属性规则 Form 的 validation-schema 接受好的定义规则 规则是对象
 */
const schema = {
//  校验函数规则 返回 true 就是校验成功 返回一个字符串就是失败 字符串就是错误提示
  account: mySchema.account,
  password: mySchema.password,
  mobile: mySchema.mobile,
  code: mySchema.code,
  isAgree: mySchema.isAgree
}
// 清空校验信息
watch(isMsgLogin, () => {
  form.isAgree = true
  form.account = null
  form.password = null
  form.mobile = null
  form.code = null
  veeForm.value.resetForm()
})
// 登录方法
const login = async () => {
  const valid = await veeForm.value.validate()
  if (valid) {
    // 登录
  } else {
    throw Error('no')
  }
}
</script>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: @xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 40px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: @priceColor;
          }

          &.active, &:focus {
            border-color: @xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
