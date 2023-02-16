<script setup lang="ts">
const query = gql`
  query getTests {
    tests {
      id
      name
      email
    }
  }
`;
type TestsResult = {
  tests: { id: string; name: string; email: string }[];
};
const { data } = await useAsyncQuery<TestsResult>(query);
</script>

<template>
  <div
    class="flex h-screen flex-col items-center justify-center bg-gray-500 text-gray-100"
  >
    <h1 class="m-5 font-custom text-5xl">Hello, you are on second page</h1>
    <p class="m-5 text-4xl">
      This page renders content of component with apollo query:
    </p>
    <NuxtLink to="/" class="text-xl font-medium underline hover:text-blue-300"
      >Back to index
    </NuxtLink>
    <br />
    <Tests v-if="data?.tests" :tests="data?.tests" />
  </div>
</template>
