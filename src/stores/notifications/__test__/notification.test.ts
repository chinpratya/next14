import {
  notificationsStore,
  Notification,
} from '../notifications';

const notification = {
  id: '123',
  title: 'Hello World',
  type: 'info',
  message: 'This is a test notification',
} as Notification;

describe('notification store', () => {
  it('should show and dismiss notification', () => {
    // 1
    expect(
      notificationsStore.getState().notifications.length
      // @ts-ignore
    ).toBe(0);

    // 2
    notificationsStore
      .getState()
      .showNotification(notification);

    expect(
      notificationsStore.getState().notifications
      // @ts-ignore
    ).toContainEqual(notification);

    // 3
    notificationsStore
      .getState()
      .dismissNotification(notification.id);

    expect(
      notificationsStore.getState().notifications
      // @ts-ignore
    ).not.toContainEqual(notification);
  });
});
