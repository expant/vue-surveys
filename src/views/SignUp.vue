<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseButton from '@/components/BaseButton.vue'

// TODO: Переписать валидацию на Vee Validate

// const username = ref('')
const authStore = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')

const signup = async () => {
  await authStore.auth({ email: email.value, password: password.value }, 'signup')
  router.push('/')
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col justify-center items-center gap-8 font-IBMPlexMono">
    <h2 class="text-2xl text-green-600">Регистрация</h2>
    <form
      @submit.prevent="signup"
      class="flex flex-col gap-6 max-w-1/4 rounded-md p-5 bg-white border border-solid shadow-sm"
    >
      <!-- <div>
        <label for="username" class="inline-block mb-2">Придумай ник</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          v-model="username"
          class="w-full text-lg px-2 py-2.5 border border-solid border-gray-200 rounded outline-none"
        />
      </div> -->
      <div v-if="authStore.error">
        <p class="text-red-500 text-xs">{{ authStore.error }}</p>
      </div>
      <div>
        <label for="email" class="inline-block mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          v-model="email"
          class="w-full text-base px-2 py-2.5 border border-solid border-gray-200 rounded outline-none"
        />
      </div>
      <div>
        <label for="password" class="inline-block mb-2">Введите пароль 😅</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          v-model="password"
          class="w-full text-base px-2 py-2.5 border border-solid border-gray-200 rounded outline-none"
        />
      </div>
      <div>
        <base-button :loading="authStore.loader">Зарегистрироваться</base-button>
        <div class="text-right mt-2">
          Уже зарегистрирован?
          <router-link to="/signin" class="text-blue-500 hover:text-blue-600"> Войти </router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
