<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { MainButton } from '../../components';
  import { ref } from 'vue';
  import { getDownloadURL, ref as refFirebase, uploadBytes } from 'firebase/storage';
  import { db, storage } from '../../../firebase/firestoreconfig';
  import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
  import { useToken } from '../../utils/useToken';

  const router = useRouter();
  const { decodeToken } = useToken();

  const description = ref('');

  const imagePreview: any = ref(null);
  const file: any = ref(null);
  const imgUrl = ref('');

  const previewImage = (event: any) => {
    file.value = event.target.files[0];
    if (file.value) {
      const reader = new FileReader();
      reader.onload = () => {
        imagePreview.value = reader.result;
      };

      reader.readAsDataURL(file.value);
    }
  }

  const handleSubmit = async () => {
    if (file.value) {
        const storageRef = refFirebase(storage, 'images/' + file.value.name);
        
        await uploadBytes(storageRef, file.value);

        imgUrl.value = await getDownloadURL(storageRef);

        const userData = decodeToken(window.localStorage.getItem("accessToken") || '');

        try {
          const postRef = await addDoc(collection(db, "posts"), {
            // comments: {},
            createdAt: serverTimestamp(), 
            description: description.value,
            userId: userData.id,
            // likes: 0,
            picture: imgUrl.value,
            userImg: userData.profileImg,
            username: userData.username,
          });

          const commentsRef = collection(postRef, "comments");
          await setDoc(doc(commentsRef), {});

          const likesRef = collection(postRef, "likes");
          await setDoc(doc(likesRef), {});



          router.push('/home');

        } catch(error) {
          console.log(error);
        }

        console.log('URL de la imagen:', imgUrl.value);
      } else {
        console.error('No se seleccionó ninguna imagen.');
      }
  }

</script>

<template>
  <div class="w-11/12 max-w-[1000px] shadow justify-center items-center pt-8">

    <div class="flex flex-col items-center justify-center gap-4 mb-8">
      <span class="text-gray-500 text-3xl mb-2">Detalles de publicación</span>
			<input type="file" @change="previewImage">
      <img v-if="imagePreview" class="w-11/12 max-w-80" :src="imagePreview" alt="Vista previa de la imagen">
			<textarea v-model="description" class="w-11/12 max-w-80 border border-gray-200 rounded-lg p-2" placeholder="Ingrese una descripción"></textarea>
      <MainButton @click="handleSubmit" name-color="coral" class="min-w-80">Crear publicación</MainButton>
      <MainButton @click="router.push('/home')" name-color="gray" class="min-w-80">Cancelar</MainButton>
    </div>
  </div>

</template>

<style scoped>
</style>
