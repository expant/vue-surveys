<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { addUserDataToLocalStorage } from '@/utils/userData'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { userSchema } from '@/schemas'
import BaseButton from '@/components/BaseButton.vue'

const authStore = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')

const signin = async () => {
  await authStore.auth({ email: email.value, password: password.value }, 'signin')
  addUserDataToLocalStorage(authStore)
  router.push('/')
  // const pathToUser = `${import.meta.env.VITE_FIREBASE_DB_USERS_URL}/${authStore.userInfo.userId}.json`
  // const response = await axios.get(pathToUser)
  // const username = Object.entries(response.data)[0][1].username
  // authStore.userInfo.username = username
}
</script>

<!-- TODO: Добавить возможность сброса пароля -->

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center gap-8 font-IBMPlexMono">
    <h2 class="text-2xl text-green-600">Авторизация</h2>
    <Form
      @submit="signin"
      :validation-schema="userSchema"
      class="relative flex flex-col gap-8 max-w-1/4 rounded-md p-5 bg-white border border-solid shadow-sm"
    >
      <div class="absolute right-5 top-5 text-sm text-red-500" v-if="authStore.error">
        {{ authStore.error }}
      </div>
      <div class="relative">
        <label class="inline-block mb-2">Email</label>
        <Field
          name="email"
          v-model="email"
          class="w-full text-lg px-2 py-2.5 border border-solid border-gray-200 rounded outline-none"
        />
        <ErrorMessage name="email" class="absolute left-2 top-[85px] text-sm text-red-500" />
      </div>

      <div class="relative">
        <label class="inline-block mb-2">Введите пароль 😅</label>
        <Field
          name="password"
          type="password"
          v-model="password"
          class="w-full text-lg px-2 py-2.5 border border-solid border-gray-200 rounded outline-none"
        />
        <ErrorMessage name="password" class="absolute left-2 top-[85px] text-sm text-red-500" />

        <div class="text-right">
          <router-link to="/password_reset" class="text-xs decoration-1"
            >Забыли пароль?</router-link
          >
        </div>
      </div>

      <div>
        <base-button :loading="authStore.loader">Войти</base-button>
        <div class="text-right mt-2">
          В первый раз тут?
          <router-link to="/signup" class="text-blue-500 hover:text-blue-600">
            Зарегистрироваться
          </router-link>
        </div>
      </div>
    </Form>
  </div>
</template>
