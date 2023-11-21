<template>
    <h1 class="text-center" >Perfil de ususario</h1>
    <div class="text-center mb-5">
        <a-avatar :src="userStore.userData.photoURL" :size="150"></a-avatar>
    </div>
    
    <a-row>
    <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6}">
      <a-form 
      name="basicPerfil"
      autocomplete="off"
      layout="vertical"
      :model="userStore.userData"
      @finish="onFinish"
      >
        <a-form-item
        name="email"
        label="Tu correo (No modificable)"
        :rules="[{required: true, whitespace: true, type:'email', message: 'Ingresa un Email valido'}]">
          <a-input disabled v-model:value="userStore.userData.email"></a-input>
        </a-form-item >

        <a-form-item
        name="displayName"
        label="Ingresa su Nickname"
        :rules="[{required: true, whitespace: true, message: 'Ingresa un Nick valido'}]">
          <a-input v-model:value="userStore.userData.displayName"></a-input>
        </a-form-item >

        <a-upload
            v-model:file-list="fileList"
            list-type="picture"
            :before-upload="beforeUpload"
            :max-count="1"
            @change="handleChange"
            
        >
        <a-button >Subir foto perfil</a-button>
        </a-upload>

        <a-form-item class="mt-5">
          <a-button type="primary" html-type="submit" :disabled="userStore.loadingUser"
          :loading="userStore.loadingUser">Actualizar Información</a-button>
        </a-form-item>
    </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
import { ref } from 'vue';
import {useUserStore} from '../stores/user';
import {message} from 'ant-design-vue';

const userStore = useUserStore();
const fileList = ref([]);

const beforeUpload = (file) => {
    fileList.value = [...fileList.value, file];
    return false;
};

const handleRemove = file => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};

const handleChange = (info) => {
    //validar el tipo de imagen 
    if(info.file.status !== 'uploading'){
        //console.log(info.file);
        const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Solo imagenes PNG o JPG');
            handleRemove(info.file);
            return;
        }
        const isLt2M = info.file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Imagen Maximo 2MB!');
            handleRemove(info.file);
            return;
        }
    }
}

const onFinish = async() => {
    const error = await userStore.updateUser(userStore.userData.displayName);

    if(fileList.value[0]){
        const error = await userStore.updateImg(fileList.value[0]);
        if(error){
        return message.error('Problemas al subir tu imagen intentelo mas tarde');
    }
    message.success('Se actualizó tu imagen')
    }
    

    if(!error){
        return message.success('Se actualizó tu informacion displayName')
    }
    message.error('Ocurrio un error al actualizar el perfil')
};
</script>

<style>
.mb-5 {
    margin-bottom: 2rem;
}
.mt-5 {
    margin-top: 2rem;
}
</style>
