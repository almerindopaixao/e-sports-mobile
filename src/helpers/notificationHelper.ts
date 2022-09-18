import * as Notifications from 'expo-notifications';


export class NotifiactionHelper {
    static async getPushNotificationToken() {
        const { granted } = await Notifications.getPermissionsAsync();

        if (!granted) await Notifications.requestPermissionsAsync();

        const pushToken = await Notifications.getExpoPushTokenAsync();
        console.log('Notification Token => ', pushToken.data);

        return pushToken.data;

    }
}