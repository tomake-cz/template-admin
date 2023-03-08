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

const getValues = () => {
  const inputs = document
    .querySelector('#mutations')
    ?.querySelectorAll('input');
  return [...(inputs ?? [])].map((input) => input.value);
};

const send = () => {
  const values = getValues();

  const { mutate, onDone, onError } = useMutation(mutation, {
    variables: {
      name: values[0],
      text: values[1],
      number: parseInt(values[2]),
    },
  });

  console.log(
    values[0],
    values[1],
    'number: ' + parseInt(values[2] + values[2]),
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
  <AppRecord id="mutations">
    <AppInputText
      label="Jméno"
      :value="result?.single?.name"
      name="name"
      :max-length="30"
    />
    <AppInputText
      label="Email"
      info="Zadejte váš email"
      :value="result?.single?.text"
      name="email"
      :max-length="30"
    />
    <AppInputText
      label="Číslo"
      :value="result?.single?.number"
      name="number"
      :max-length="10"
    />
    <AppButtonSend class="mt-3" @click="send" />
  </AppRecord>
</template>
