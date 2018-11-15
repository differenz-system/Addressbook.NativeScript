<template>
    <Page actionBarHidden="true">
        <ActionBar title="Login"/>
        <ScrollView>
            <StackLayout class="home-panel">
                <TextField v-model="username" name="username" data-vv-name="username" v-validate data-vv-rules="required" autocorrect="false" hint="Enter username" />
                <Label v-if="errors.has('username')" :text="errors.first('username')" class="error" />
                <TextField v-model="password" secure="true" name="password" data-vv-name="password" v-validate data-vv-rules="required"  autocorrect="false" hint="Enter password" />
                <Label v-if="errors.has('password')" :text="errors.first('password')" class="error" />
                <Button text="login" @tap="onButtonTap" />
            </StackLayout> 
        </ScrollView>
    </Page> 
</template>

<script>
import Dashboard from "./Dashboard";

export default {
  data() {
    return {
      password: "admin",
      username: "admin"
    };
  },
  methods: {
    onButtonTap() {
      console.log(this.username, this.password);
      // this.$validator.validateAll().then(result => {
      //   if (result) {
      if (!this.username.trim() && !this.password.trim()) {
        alert({
          title: "Error",
          message: "Please enter Username and Password",
          okButtonText: "Ok"
        }).then(() => {
          console.log("Alert dialog closed");
        });
      } else if (!this.username.trim()) {
        alert({
          title: "Error",
          message: "Please enter Username",
          okButtonText: "Ok"
        }).then(() => {
          console.log("Alert dialog closed");
        });
      } else if (!this.password.trim()) {
        alert({
          title: "Error",
          message: "Please enter Password",
          okButtonText: "Ok"
        }).then(() => {
          console.log("Alert dialog closed");
        });
      } else if (this.username == "admin" && this.password == "admin") {
        this.$navigateTo(Dashboard);
      } else {
        alert({
          title: "Error",
          message: "Invalid Username or Password",
          okButtonText: "Ok"
        }).then(() => {
          console.log("Alert dialog closed");
        });
      }
      // alert("Invalid Username or Password");
      // this.console.error('Invalid Username or Password');
      //   }
      // });
    }
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}

.home-panel {
  vertical-align: center;
  font-size: 20;
  margin: 15;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}

.error {
  color: red;
  font-size: 15;
}
</style>
