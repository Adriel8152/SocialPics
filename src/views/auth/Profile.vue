<script setup lang="ts">
  import profileImg from '../../assets/profile-img.png';
  import { useRouter } from 'vue-router';
  import { useToken } from '../../utils/useToken';
  import { onMounted, ref } from 'vue';
  import { getDownloadURL, ref as refFirebase, uploadBytes } from 'firebase/storage';
  import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
  import { db, storage } from '../../../firebase/firestoreconfig';

	const router = useRouter();
	const { generateToken, decodeToken, saveToken } = useToken();

  const loadingPosts = ref(true);
  const pictures: any = ref([]);
  const newProfileImg: any = ref(null);


	const userData = decodeToken(window.localStorage.getItem("accessToken") || '');

  onMounted(async () => {
    const queryRef = query(collection(db, "posts"), where("userId", "==", userData.id));

    const querySnapshot = await getDocs(queryRef);

    querySnapshot.forEach((doc) => {
      const post = doc.data();
      
      pictures.value.push({path: post.picture, id: doc.id})
    });

    loadingPosts.value = false;
  });

  const openPostDetails = (id: string) => {
		router.push( {name: 'Post', params: { id: id } } );
	}

  const handleUploadProfileImg = async (event: any) => {
    if(event?.target?.files[0]) {
      newProfileImg.value = event.target.files[0];
      
      const storageRef = refFirebase(storage, 'images/' + newProfileImg.value.name);
      
      await uploadBytes(storageRef, newProfileImg.value);

      const profileImgPath = await getDownloadURL(storageRef);
      console.log(profileImgPath)

      const userRef = doc(db, "users", `${userData.id}`);
      
      await updateDoc(userRef, {
        profileImg: profileImgPath
      });

      const newToken = generateToken({
        ...userData,
        profileImg: profileImgPath,
      });

      saveToken(newToken);

      router.push('/profile');
    }
  }

</script>

<template>
  <div class="w-11/12 max-w-[1000px] shadow justify-center items-center pt-8">

    <div class="flex flex-col items-center justify-center gap-4 px-8">
      <span class="text-gray-500 text-3xl mb-2">Perfil</span>

      <div class="flex flex-row gap-3 items-center justify-start w-full">
        <label for="fileInput" class="flex relative">
          <input @change="handleUploadProfileImg" type="file" id="fileInput" class="absoltue top-0 left-0 w-full h-full z-20 hidden">
          <span class="absolute transition-opacity flex hover:opacity-100 opacity-0 top-0 left-0 w-12 justify-center items-center aspect-square rounded-full bg-opacity-80 bg-gray-800 cursor-pointer z-10"><i class="bi bi-pencil-fill text-xl text-gray-200"></i></span>
          <img class="w-12 aspect-square object-cover rounded-full" v-if="userData.profileImg !== ''" :src="userData.profileImg" />
		    	<img class="w-12 aspect-square object-cover rounded-full" v-if="userData.profileImg === ''" :src="profileImg" />
        </label>
        <span>{{ userData.username }}</span>
      </div>

      <hr class="w-full" />

      <div v-if="loadingPosts" class="grid grid-cols-3 gap-4 w-full">
        <div class="flex rounded-lg col-span-1 aspect-square animate-pulse bg-slate-400"></div>
        <div class="flex rounded-lg col-span-1 aspect-square animate-pulse bg-slate-400"></div>
      </div>
      
      <div v-if="!loadingPosts" class="grid grid-cols-3 gap-4 my-2 w-full">
        <template v-for="picture in pictures">
          <div @click="openPostDetails(picture.id)" class="flex rounded-lg col-span-1 h-full aspect-square object-cover space-x-4 overflow-hidden cursor-pointer">
            <img class="hover:scale-110 transition-all" :src="picture.path" />
          </div>
        </template>
			</div>

      <div class="text-gray-500 font-semibold" v-if="!loadingPosts && pictures.length === 0">
        Actualmente no tiene publicaciones para mostrar.
      </div>

    </div>
  </div>

</template>

<style scoped>
</style>
