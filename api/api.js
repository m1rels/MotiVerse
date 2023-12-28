// api.js
import { create } from 'apisauce';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from '../utility/logger';

const api = create({
  baseURL: 'https://zenquotes.io/api/',
});

export const getQuotes = async () => {
  try {
    const response = await api.get('random/');

    if (response.ok && response.data && response.data.length > 0) {
      const quotes = response.data;

      // Leere den AsyncStorage
      await AsyncStorage.clear();

      // Speichere das JSON-Array im AsyncStorage
      await AsyncStorage.setItem('quotes', JSON.stringify(quotes));

      console.log('Daten erfolgreich im AsyncStorage gespeichert:', quotes);
      return quotes;
    } else {
      logger.log('Fehler beim Abrufen der Daten:', response.problem);
      return null;
    }
  } catch (error) {
    logger.log('Fehler:', error);
    return null;
  }
};
