<template>
    <Page>
        <ActionBar  :title="title" class="action-bar">
            <NavigationButton text="Go Back" 
            ios.systemIcon="9" ios.position="left"
            android.systemIcon="ic_menu_back"
            android.position="actionBar"
                @tap="onNavBtnTap" />
                <ActionItem ios.systemIcon="3" ios.position="right" android.systemIcon="ic_menu_save" @tap="saveContact" />
                <ActionItem ios.systemIcon="1" ios.position="right" android.systemIcon="ic_menu_close_clear_cancel" @tap="onCancel" />
        </ActionBar>
        <ScrollView>
            <StackLayout class="home-panel">
                <TextField v-model="contact.first_name" hint="Enter First Name" />
                <TextField v-model="contact.last_name" hint="Enter Last Name" />
                <TextField v-model="contact.mobile" hint="Enter Mobile No"  keyboardType="phone" maxLength="10" @textChange="checkMobile"/>
                <Label v-if="!invalidMobile" :text="(contact.mobile)?'Please enter valid mobile no':'Please enter mobile no'" class="error" />
                <TextField v-model="contact.email" hint="Enter Email Address" keyboardType="email" @textChange="checkEmail" />
                <Label v-if="!invalidEmail" :text="(contact.email)?'Please enter valid email address':'Please enter email address'" class="error" />
                <!-- <Button text="Save" @tap="saveContact" /> -->
            </StackLayout>
        </ScrollView>
    </Page> 
</template>

<script>
import Dashboard from "./Dashboard";
export default {
  props: {
    contact:{
      type: Object,
      default: function () {
        return {};
      }
    },
    title: {
      type: String,
      default: function () {
        return 'Contacts';
      }
    },
    is_edit:{
      type: Boolean,
      default: function () {
        return false;
      }
    },
    index: {
      type: Number,
      default: function () {
        return 0;
      }
    }
  },
  data() {
    return {
      tempContact : Object.assign({},this.contact),
      invalidEmail:true,
      invalidMobile:true
    };
  },
  methods: {
    onTap: function() {
      if(this.is_edit){
        let obj = {
          index:this.index,
          data: JSON.stringify(this.tempContact)
        }
        this.$store.commit("update", obj);
      }
      console.log("Back Tap");
    },
    onNavBtnTap() {
      this.$navigateBack();
    },

    saveContact() {
    if (this.contact && 
    !this.contact.first_name && 
    !this.contact.last_name && 
    !this.contact.mobile && 
    !this.contact.email) 
    {
        alert({
          title: "Error",
          message: "Please enter all the details",
          okButtonText: "Ok"
        }).then(() => {
          console.log("Alert dialog closed");
        });
      }
      else if (!this.contact.first_name.trim()) {
        alert({
          title: "Error",
          message: "Please enter first name",
          okButtonText: "Ok"
        }).then(() => {
          console.log("Alert dialog closed");
        });
      } 
      else if (!this.contact.last_name.trim()) {
        alert({
          title: "Error",
          message: "Please enter last name",
          okButtonText: "Ok"
        }).then(() => {
          console.log("Alert dialog closed");
        });
      }
      else if (!this.contact.mobile.trim()) {
        alert({
          title: "Error",
          message: "Please enter mobile no",
          okButtonText: "Ok"
        }).then(() => {
          console.log("Alert dialog closed");
        });
      }
      else if (!this.contact.email.trim()) {
        alert({
          title: "Error",
          message: "Please enter email address",
          okButtonText: "Ok"
        }).then(() => {
          console.log("Alert dialog closed");
        });
      }
      else {
        if(this.is_edit){
          let obj = {
            index:this.index,
            data: JSON.stringify(this.contact)
          }
          this.$store.commit("update", obj);
        } else {
          this.$store.commit("save", JSON.stringify(this.contact));
        }
        this.$navigateTo(Dashboard);
      }
    },
    onCancel(){
      console.log("Cancel Tap");
      if(this.is_edit){
        let obj = {
          index:this.index,
          data: JSON.stringify(this.tempContact)
        }
        this.$store.commit("update", obj);
      }
      this.$navigateBack();
    },
    checkMobile(){
      console.log("call function");
      this.invalidMobile = this.validateMobile(this.contact.mobile)
      console.log(this.invalidMobile); 
    },
    checkEmail(){
      console.log("call function");
      this.invalidEmail = this.validateEmail(this.contact.email)
      console.log(this.invalidEmail);
    },
    validateMobile(mobile){
       var re = /^\d{10}$/;
      return re.test(mobile);
    },
    validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email); 
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
  /* vertical-align: center; */
  font-size: 20;
  margin: 15;
}
.error {
  color: red;
  font-size: 15;
}
</style>
