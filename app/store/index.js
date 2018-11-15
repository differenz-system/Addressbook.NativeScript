import Vue from 'nativescript-vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
       contact_list : [
           {
            first_name: "Pratik ",
            last_name: "Lochawala",
            mobile: "7698469126",
            email: "pratik@yopmail.com"
          },
          {
            first_name: "Daksh",
            last_name: "Sorathia",
            mobile: "8460780308",
            email: "Daksh@yopmail.com"
          }
       ],
    },
    mutations: {
        save(state, data) {
            state.contact_list.push(JSON.parse(data));
        },
        update (state,{ index, data }){
            console.log(index, data); 
            state.contact_list[index] = JSON.parse(data);
        },
        delete (state,index){
            console.log(index)
            state.contact_list.splice(index,1)
        }
    },
    getters: {},
});