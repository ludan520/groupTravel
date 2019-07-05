<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="账号" v-model="form.nickname"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="手机" v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    // 确认密码
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "", // 登录用户名/手机
        password: "", // 登录密码
        checkPassword: "", // 确认密码
        nickname: "", // 确认密码
        captcha: "" // 手机验证码
      },
      // 表单规则
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        checkPassword: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
      // 确认密码
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      if (!this.form.username) {
        this.$confirm("手机号码不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      if (this.form.username.length !== 11) {
        this.$confirm("手机号码格式错误(数字或者位数错误)", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: this.form.username
        }
      }).then(res => {
        const { code } = res.data;
        this.$confirm(`验证码为:${code}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        this.form.captcha = code;
      });
    },

    // 注册
    handleRegSubmit() {
      // 表单的验证
      this.$refs.form.validate(valid => {
        if (valid) {
          const { checkPassword, ...props } = this.form;

          // 调用注册的接口
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: props
          })
            .then(res => {
              this.$store.commit("user/setUserInfo", res.data);
              // 跳转到首页
              setTimeout(() => {
                this.$router.replace("/");
              }, 1000);
            })
            .catch(error => {
              this.$message({
                showClose: true,
                message: "手机号码不是有效号码，请重新输入",
                type: "error"
              });
            });
        }
      });
    }
  }
};
</script>
<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
