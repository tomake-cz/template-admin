<script
  setup
  lang="ts"
  generic="ItemInput extends { id: number; clientId?: string } & Record<
  string,
  InputValue | null | undefined
>, Group extends ItemInput[]"
>
import { InputProps } from '~/types/input';

type Item = ItemInput & { id: number; clientId: string };

interface Props extends InputProps<Group | undefined> {
  id: string;
  loading: boolean;
  default: ItemInput;
  objectLabel?: string;
  includeIndex?: boolean;
}
const props = defineProps<Props>();

const group = ref([]) as Ref<Item[]>;
watch(
  () => props.value,
  (res) => {
    const temp = [...(res ?? (useInputStore().getGroupRaw(props.id) as Group))];
    group.value = temp.map((person) => {
      return {
        ...person,
        clientId:
          'clientId' in person
            ? (person.clientId as ReturnType<typeof useId>)
            : useId(),
      };
    });
  },
  { immediate: true },
);

// watch(
//   () => useInputStore().getGroupRaw(props.id),
//   (res) => {
//     if (!res) return;
//     group.value = res as Item[];
//   },
// );

const { removeGroup } = useInputStore();

const add = () => {
  group.value.push({
    ...props.default,
    clientId: useId(),
  } as Group[number] & { clientId: string });
};

const remove = (item: Item) => {
  group.value.splice(group.value.indexOf(item), 1);
  removeGroup(props.id, item.clientId);
};

const objectLabel = (i: number) => {
  if (!props.objectLabel) {
    return;
  }
  if (props.includeIndex) return `${i + 1}. ${props.objectLabel}`;
  return props.objectLabel;
};
</script>

<template>
  <AppInput :id="id" :label="label" type="group">
    <div class="flex flex-col gap-4">
      <client-only>
        <AppInputGroupObject
          v-for="(item, i) in group"
          :key="item.clientId"
          :label="objectLabel(i)"
          @remove="remove(item)"
        >
          <slot
            :id="(property: string) => useGroupId(id, property, item.clientId)"
            :item="item"
          />
        </AppInputGroupObject>
      </client-only>
      <AppInputGroupAdd @click="add()" />
    </div>
  </AppInput>
</template>
