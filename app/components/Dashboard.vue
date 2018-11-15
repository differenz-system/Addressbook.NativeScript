<template>
    <Page>
        <ActionBar  title="Contacts" class="action-bar">
            <!-- <NavigationButton text="Go Back" 
            ios.systemIcon="9" ios.position="left"
            android.systemIcon="ic_menu_back"
            android.position="actionBar"
                @tap="onNavBtnTap" /> -->
            <ActionItem ios.systemIcon="4" android.systemIcon="ic_menu_add" ios.position="right" @tap="addContact" ></ActionItem>
        </ActionBar>
        <ScrollView> 
            <ListView class="list-group" for="(contact,index) in contactList" @itemTap="onItemTap"
                style="height:100%">
                <v-template>
                  <StackLayout orientation="horizontal" class="list-data">
                    <StackLayout class="list-text">
                        <Label :text="contact.first_name + ' ' + contact.last_name" class="list-text-heading" />
                        <Label :text="contact.mobile"  />
                        <Label :text="contact.email" />
                    </StackLayout>
                    <StackLayout orientation="horizontal" class="list-action-button">
                      <Image class="action-button" @tap="editContact(index)" src="~/assets/images/if_ic_mode_edit_48px_352547.png" stretch="none" />
                      <Image class="action-button" @tap="deleteContact(index)" src="~/assets/images/if_ic_delete_48px_352303.png" stretch="none" />
                    </StackLayout>
                  </StackLayout>
                </v-template>
            </ListView>

            <!-- <GridLayout orientation="vertical" rows="auto, *">
       <RadListView ref="listView"
                   for="item in itemList"
                   swipeActions="true"
                   @loaded="onLoaded"
                   @itemSwipeProgressStarted="onSwipeStarted">
        <v-template>
          <StackLayout class="item" orientation="vertical">
            <Label class="big" :text="item.name"></Label>
            <Label :text="item.description"></Label>
          </StackLayout>
        </v-template>

        <v-template name="itemswipe">
          <GridLayout columns="auto, *, auto" backgroundColor="White">
            <StackLayout id="mark-view" col="0" class="swipe-item left"
                         orientation="horizontal" @tap="onLeftSwipeClick">
              <Label text="mark" verticalAlignment="center" horizontalAlignment="center"/>
            </StackLayout>
            <StackLayout id="delete-view" col="2" class="swipe-item right"
                         orientation="horizontal" @tap="onRightSwipeClick">
              <Label text="delete" verticalAlignment="center" horizontalAlignment="center" />
            </StackLayout>
          </GridLayout>
        </v-template>
      </RadListView>
    </GridLayout> -->
             
         </ScrollView>
        
    </Page> 
</template>

<script>
import Contact from "./Createcontacts";
export default {
  data() {
    return {
      selectedObject: {},
      itemList: [
        {name: 'Item 1', description: 'Item 1 description'},
        {name: 'Item 2', description: 'Item 2 description'},
        {name: 'Item 3', description: 'Item 3 description'},
      ],
    };
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
      //  
    },
    onSwipeStarted ({ data, object }) {
      console.log(`Swipe started`);
      const swipeLimits = data.swipeLimits;
      const swipeView = object;
      const leftItem = swipeView.getViewById('mark-view');
      const rightItem = swipeView.getViewById('delete-view');
      swipeLimits.left = leftItem.getMeasuredWidth();
      swipeLimits.right = rightItem.getMeasuredWidth();
      swipeLimits.threshold = leftItem.getMeasuredWidth() / 2;
    },
    onLeftSwipeClick (event) {
      console.log('left action tapped');
      this.$refs.listView.notifySwipeToExecuteFinished();
    },
    onRightSwipeClick ({ object }) {
      console.log('right action tapped');
      // remove item
      this.itemList.splice(this.itemList.indexOf(object.bindingContext), 1);
      this.$refs.listView.notifySwipeToExecuteFinished();
    },
    onLoaded () {
      setTimeout(() => {
        this.itemList = getItemList(20);
      }, 0);
    }
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

.list-data .list-text {
  width:75%;
}

.list-data .list-text .list-text-heading {
  font-weight:bolder;
  font-size:20;
}

.list-data .list-action-button {
  width:25%;
  vertical-align: center;
  /* text-align:right;
  align-items:right; */
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-end;
}

.list-data .action-button{
  padding: 5;
  margin: 5;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
</style>
