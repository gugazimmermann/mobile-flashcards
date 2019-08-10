import React from "react";
import { AsyncStorage } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

const QUIZ_KEY = "MobileFlashcards:quiz";

const registerForLocalNotificationsAsync = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    return false;
  }

  return true;
};

const sendLocalNotification = async () => {
  Notifications.cancelAllScheduledNotificationsAsync();

  const quizDates = await getQuizDate();
  let date = new Date();
  const today =
    date.getUTCDate() +
    "/" +
    (date.getUTCMonth() + 1) +
    "/" +
    date.getUTCFullYear();

  const findDate = quizDates.findIndex(d => d === today);
  let scheduleDate = new Date();
  if (findDate !== -1) {
    scheduleDate.setDate(scheduleDate.getDate() + 1);
  }
  scheduleDate.setHours(20);
  scheduleDate.setMinutes(0);
  scheduleDate.setSeconds(0);

  Notifications.scheduleLocalNotificationAsync(
    {
      title: "Answer a Quiz!",
      body: "👋 Don't forget to answer a quiz today!",
      ios: {
        sound: true
      },
      android: {
        sound: true,
        priority: "high",
        sticky: false,
        vibrate: true
      }
    },
    {
      time: scheduleDate,
      repeat: "day"
    }
  );
};

const handleNotification = () => {
  console.log("Notification received");
};

export const setLocalNotification = async () => {
  const register = await registerForLocalNotificationsAsync();
  if (register) {
    sendLocalNotification();
    Notifications.addListener(handleNotification);
  }
};

const getQuizDate = async () => {
  let quizDates = await AsyncStorage.getItem(QUIZ_KEY);
  return quizDates ? JSON.parse(quizDates) : [];
};

export async function setQuizDate(today) {
  let quizDates = await getQuizDate();
  quizDates.push(today);
  const uniqSet = new Set(quizDates);
  const dates = [...uniqSet];
  try {
    await AsyncStorage.setItem(QUIZ_KEY, JSON.stringify(dates));
    sendLocalNotification();
    return true;
  } catch (e) {
    alert(e);
    return false;
  }
}
