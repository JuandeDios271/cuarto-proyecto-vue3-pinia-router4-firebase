<template>
  <h1 class="text-center">Login</h1>
  <a-row>
    <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6}">
      <a-form 
      name="basicLogin"
      autocomplete="off"
      layout="vertical"
      :model="formState"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      >
        <a-form-item
        name="email"
        label="Ingresa tu correo"
        :rules="[{required: true, whitespace: true, type:'email', message: 'Ingresa un Email valido'}]"
        >
          <a-input v-model:value="formState.email"></a-input>
        </a-form-item >

        <a-form-item 
        name="password"
        label="Ingresa tu contraseña"
        :rules="[{required: true, min: 6, whitespace: true, message: 'Ingresa una Contraseña con mínimo 6 carácteres'}]">
        <a-input-password v-model:value="formState.password"></a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser"
          :loading="userStore.loadingUser">Ingresar</a-button>
        </a-form-item>
    </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
import { reactive} from 'vue';
import{useUserStore} from '../stores/user';
import {message} from 'ant-design-vue';


const userStore = useUserStore();
const formState = reactive({
  email: 'juan3@test.com',
  password: '123123'
});


const onFinish = async(values) => {
  //console.log('Success:', values);
  const error = await userStore.loginUser(formState.email, formState.password);

  if(!error){
    return message.success("Bienvenido");
  }

  switch(error){

    case 'auth/invalid-login-credentials':
      message.error("Verifica Los datos ingresados");
      break;
    default:
    message.error("Falló desde Firebase Intentelo de nuevo");
      break;
  }
};

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

</script>