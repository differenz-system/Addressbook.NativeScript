<template>
    <Page>
        <ActionBar  title="Contacts" class="action-bar">
            <ActionItem ios.systemIcon="4" android.systemIcon="ic_menu_add" ios.position="right" @tap="addContact" ></ActionItem>
        </ActionBar>
        <ScrollView> 
            <ListView class="list-group" for="(contact,index) in contactList" @itemTap="onItemTap"
                style="height:100%">
                <v-template>
                  <StackLayout orientation="horizontal" class="list-data">
                    
                      <WrapLayout>
                      <WrapLayout>
                      <StackLayout class="list-text" width="70%">
                          <Label :text="contact.first_name + ' ' + contact.last_name" class="list-text-heading" />
                          <Label :text="contact.mobile"  />
                          <Label :text="contact.email" />
                      </StackLayout>
                      </WrapLayout>
                      
                      <StackLayout orientation="horizontal"  class="list-action-button">
                        <WrapLayout>
                        <Image class="action-button" height="30"  @tap="editContact(index)" src="~/assets/images/if_ic_mode_edit_48px_352547.png" stretch="aspectFit" />
                        <Image class="action-button" height="30" @tap="deleteContact(index)" src="~/assets/images/if_ic_delete_48px_352303.png" stretch="aspectFit" />
                        </WrapLayout>
                      </StackLayout>
                      </WrapLayout>
                  </StackLayout>
                </v-template>
            </ListView>
         </ScrollView>
        
    </Page> 
</template>

<script>
import Contact from "./Createcontacts";
export default {
  data() {
    return {};
  },
  methods: {
    onItemTap: function(args) {
      console.log("Item with index: " + args.index + " tapped");
      this.editContact(args.index);
    },
    addContact() {
      this.$navigateTo(Contact,{
        props: {
          title: "Add Contact",
          contact: {
            first_name: "",
            last_name: "",
            mobile: "",
            email: ""
          },
          is_edit : false,
          index : 0,
        }
      });
    },
    editContact: function(index) {
      console.log("edit tapped");
      console.log(index);
      this.$navigateTo(Contact,{
        props: {
          title: "Update Contact",
          is_edit : true,
          contact :  this.$store.state.contact_list[index],
          index : index,
        }
      });
    },
    deleteContact:function(index){
      confirm({
        title: "confirm",
        message: "Are you sure you went to delete this contact?",
        okButtonText: "Ok",
        cancelButtonText: "Cancel"
      }).then(result => {
        if(result){
          this.$store.commit("delete", index);
        }
      });
    },
  },
  computed: {
    contactList(){
      return this.$store.state.contact_list
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
  margin: 5;
}
.list-data{
  margin: 5;
  padding:10;
}

.list-data .list-text .list-text-heading {
  font-weight:bolder;
  font-size:20;
}

.list-data .list-action-button {
  vertical-align: center;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
}

.list-data .action-button{
  margin: 5;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
</style>
