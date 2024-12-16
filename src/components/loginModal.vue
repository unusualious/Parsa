<!-- src/components/LoginDialog.vue -->  
<template>  
    <Dialog v-model:visible="isVisible" modal @hide="closeDialog" header="Login">  
      <form @submit.prevent="handleLogin">  
        <div class="field">  
          <label for="username">Username</label>  
          <InputText id="username" v-model="username" required />  
        </div>  
        <div class="field">  
          <label for="password">Password</label>  
          <InputText id="password" v-model="password" type="password" required />  
        </div>  
        <footer>  
          <Button type="submit" label="Submit" />  
          <Button type="button" label="Close" @click="closeDialog" class="p-button-secondary" />  
        </footer>  
      </form>  
    </Dialog>  
  </template>  
  
  <script setup>  
  import { ref } from 'vue';  
  import Dialog from 'primevue/dialog';
  import InputText from 'primevue/inputtext'; 
  import Button from 'primevue/button';
  import axios from 'axios';  
  import { useToast } from "primevue/usetoast";
  const props = defineProps({  
    visible: {  
      type: Boolean,  
      required: true  
    }  
  });  
  
  const emit = defineEmits(['close', 'success']);  
  
  const isVisible = ref(props.visible);  
  const username = ref('');  
  const password = ref('');  
  
  const closeDialog = () => {  
    username.value = '';  
    password.value = '';  
    emit('close'); // Emit close event to parent  
  };  
  
  const handleLogin = async () => {  
    try {  
      const response = await axios.post('https://bots.mbhanife.com/api/mobix/login', {  
        username: username.value,  
        password: password.value  
      });  
      
      console.log(response.data); // Handle the response as needed  
      emit('success', response.data); // Emit success event with response data  
      closeDialog();  
      showSucces();
    } catch (error) {  
      console.error('Error logging in:', error);  
      // Add user feedback for error (optional)  
    }  
  };  


const toast = useToast();

const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'تایید شد', detail: 'با موفقیت وارد شدید', life: 3000 });
};

  </script>  
  
  <style scoped>  
  .field {  
    margin-bottom: 1rem;  
  }  
  </style>