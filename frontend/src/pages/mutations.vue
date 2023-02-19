<script setup lang="ts">
import AppButtonSend from '../components/app/AppButtonSend.vue';

const query = gql`
  query getSingle {
    single {
      id
      name
      text
      number
    }
  }
`;
const { result, loading } = useQuery(query);

const mutation = gql`
  mutation updateSingle($name: String, $text: String, $number: Int) {
    updateSingle(name: $name, text: $text, number: $number) {
      code
      success
      message
      single {
        id
        name
        text
        number
      }
    }
  }
`;
const form = ref<HTMLElement | null>(null);
const send = () => {
  const { mutate, onDone, onError } = useMutation(mutation, {
    variables: {
      name: (
        form?.value?.querySelector('input[name="name"]') as HTMLInputElement
      )?.value,
      text: (
        form?.value?.querySelector('input[name="email"]') as HTMLInputElement
      )?.value,
      number: parseInt(
        (form?.value?.querySelector('input[name="number"]') as HTMLInputElement)
          ?.value,
      ),
    },
  });
  console.log(
    (form?.value?.querySelector('input[name="name"]') as HTMLInputElement)
      ?.value,
    (form?.value?.querySelector('input[name="email"]') as HTMLInputElement)
      ?.value,
    parseInt(
      (form?.value?.querySelector('input[name="number"]') as HTMLInputElement)
        ?.value,
    ),
  );
  mutate();
  onDone((data) => {
    console.log(data);
    alert(`Data byla úspěšně uložena`);
  });
  onError((error) => {
    console.log(error);
    alert(`Data se nepodařilo uložit`);
  });
};
</script>

<template>
  <div class="mt-20 flex flex-col items-center">
    <h1 class="mb-8 text-2xl font-bold">Mutations</h1>
    <form v-if="loading !== null && !loading" ref="form">
      <AppInputText text="Jméno" :value="result.single?.name" name="name" />
      <AppInputText text="Email" :value="result.single?.text" name="email" />
      <AppInputText text="Číslo" :value="result.single?.number" name="number" />
      <AppButtonSend class="mt-3" @click="send" />
    </form>
  </div>
</template>
