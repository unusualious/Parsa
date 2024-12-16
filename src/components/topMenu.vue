<template>
    <nav class="navbar navbar-expand-lg navbar-light text-white mb-5 p-3">
        <div class="container">
          <a class="navbar-brand" href="#">
            <img src="../assets/images/acbc581808e8dacaa8d6e0f8d564cfad.png" alt="">
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active text-white" aria-current="page" href="#">دسته بندی ها</a>
              </li>
              <li class="nav-item ">
                <a class="nav-link text-white" href="#">فیلم </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" href="#">سریال</a>
              </li>
              <li class="nav-item">
                <a class="nav-link  text-white" href="#" tabindex="-1" aria-disabled="true">بازیگران</a>
              </li>
              <li class="nav-item">
                <a class="nav-link  text-white" href="#" tabindex="-1" aria-disabled="true">جدیدترین دوبله ها</a>
              </li>
            </ul>
            <div v-if="isLoggedIn" class="user-info d-flex">
              <h5>{{ username }}</h5>
              <i class="pi pi-user mx-2"></i>
            </div>
            <Button  v-else @click="openDialog" label="ورود به حساب" />
  
          </div>
        </div>
      </nav>
      <Dialog v-model:visible="showDialog" modal maximizable  @hide="closeDialog" header="Login" :style="{ width: '50rem' }"> 
      <form class="text-center p-5" @submit.prevent="handleLogin">  
        <div class="field mb-4">  
          <label class="mx-3" for="username">Username</label>  
          <InputText id="username" v-model="username" required />  
        </div>  
        <div class="field mb-4">  
          <label class="mx-3" for="password">Password</label>  
          <InputText id="password" v-model="password" type="password" required />  
        </div>  
        <footer class="mt-5">  
          <Button type="submit" class="mx-3"  @click="login" label="تایید" />  
          <Button type="button" label="بستن" @click="closeDialog" class="p-button-secondary mx-3" />  
        </footer>  
      </form>  
    </Dialog>   
</template>

<script setup>
import LoginModal from './LoginModal.vue';  
import { ref } from 'vue';  
import axios from 'axios';  
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext'; 
import Button from 'primevue/button';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';

// Reactive data properties  
const username = ref('');  
const password = ref('');  
const token = ref('');
const isLoggedIn = ref(false);
// Method to close the modal  
const closeModal = () => {  
  showDialog.value = false;  
};  

const showDialog = ref(false);  

// Method to open the dialog  
const openDialog = () => {  
  showDialog.value = true;  
};  

// Method to handle successful login  
const handleSuccess = (data) => {  
  console.log('Login successful:', data);  
  // Handle success (e.g., save token, navigate, etc.)  
};  

// Method to handle login  
const login = async () => {  
  try {  
    const response = await axios.post('https://bots.mbhanife.com/api/mobix/login', {  
      username: username.value,  
      password: password.value,  
    });  
    if(response){
      token.value = response.data.token
      closeModal();  
      isLoggedIn.value = true
      showSuccess();
      pageData();
    }
  } catch (error) {  
    console.error('Error logging in:', error);  
    // You can add error handling here to inform the user  
  }  
};  

const pageData = async () =>{
  debugger
  try {  
    const response = await axios.get('https://bots.mbhanife.com/api/mobix', {  
      headers: {  
        Authorization: `Bearer ${token.value}` // Ensure "Bearer " is included  
      }  
    });  

    data.value = response.data;  
    toast.add({ severity: 'success', summary: 'Success', detail: 'Data fetched successfully!' });  
  } catch (err) {  
    console.error('Error fetching data:', err);  
    error.value = 'Failed to fetch data. Please try again.';  
    toast.add({ severity: 'error', summary: 'Error', detail: error.value });  
  }   
}

const toast = useToast();
debugger
const showSuccess = () => {
    toast.add({ severity: 'success', summary: 'تایید شد', detail: 'با موفقیت وارد شدید', life: 3000 });


};
</script>
<style lang="css">
.navbar{
    background-color: #242629;
    
}
.navbar-brand img{
    width:150px
}
</style>