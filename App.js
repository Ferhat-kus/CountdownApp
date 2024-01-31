import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CountdownApp = () => {
  const initialTime = { hours: 4, minutes: 2, seconds: 5 };
  const [time, setTime] = useState(initialTime);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;

    const updateTimer = () => {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newSeconds = prevTime.seconds - 1;
          const newMinutes = newSeconds < 0 ? prevTime.minutes - 1 : prevTime.minutes;
          const newHours = newMinutes < 0 ? prevTime.hours - 1 : prevTime.hours;

          if (newHours < 0) {
            clearInterval(interval);
            setIsTimeOver(true);
            setIsRunning(false);
            return initialTime;
          }

          return {
            hours: newHours,
            minutes: newMinutes >= 0 ? newMinutes : 59,
            seconds: newSeconds < 0 ? 59 : newSeconds,
          };
        });
      }, 1000);
    };

    if (isRunning) {
      updateTimer();
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {isTimeOver ? (
        <Text style={styles.timerText}>Süre Bitti!</Text>
      ) : (
        <Text style={styles.timerText}>
          {String(time.hours).padStart(2, '0')}:
          {String(time.minutes).padStart(2, '0')}:
          {String(time.seconds).padStart(2, '0')}
        </Text>
      )}

      <TouchableOpacity onPress={toggleTimer}>
        <Text style={styles.button}>{isRunning ? 'Duraklat' : 'Başlat'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 30,
    marginBottom: 20,
  },
  button: {
    fontSize: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default CountdownApp;
