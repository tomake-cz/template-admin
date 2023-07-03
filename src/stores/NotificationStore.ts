import json from '@/assets/app.json';

type Notification = Omit<(typeof json.notifications.states)[0], 'id'> & {
  id: string;
  message: string;
};

type NotificationType = 'success' | 'info' | 'error';

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([] as Notification[]);

  const NOTIFICATION_DURATION = 5000;

  const add = (type: NotificationType, message: string) => {
    const { getNotificationByType } = storeToRefs(useAppStore());

    const id = Math.random().toString(36);
    const notification = {
      ...getNotificationByType.value(type),
      id,
      message,
    };

    notifications.value.push(notification);

    setTimeout(() => {
      remove(id);
    }, NOTIFICATION_DURATION);
  };

  const remove = (id: string) => {
    const index = notifications.value.findIndex((n) => n.id === id);
    if (index === -1) return;
    notifications.value.splice(index, 1);
  };

  return {
    notifications,
    add,
    remove,
  };
});
