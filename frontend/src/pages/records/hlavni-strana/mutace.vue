<script setup lang="ts">
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
type Query = {
  single: {
    id: string;
    name: string;
    text: string;
    number: number;
  };
};
const { result } = useQuery<Query>(query);

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

const send = () => {
  const values = useCurrentPageInputs();

  const { mutate, onDone, onError } = useMutation(mutation, {
    variables: {
      name: values.get('name'),
      text: values.get('email'),
      number: parseInt(values.get('number') as string),
    },
  });

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
  <AppRecord>
    <AppInputText
      id="name"
      label="Jméno"
      :value="result?.single?.name"
      :max-length="30"
    />
    <AppInputText
      id="email"
      label="Email"
      info="Zadejte váš email"
      :value="result?.single?.text"
      :max-length="30"
    />
    <AppInputText
      id="number"
      label="Číslo"
      :value="result?.single?.number"
      :max-length="10"
    />
    <AppButtonSend class="mt-3" @click="send" />
  </AppRecord>
</template>
