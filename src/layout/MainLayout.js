import React from 'react';
import {View, StyleSheet} from 'react-native';
import Header from '../components/common/Header/Header';

export default function MainLayout({children}) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
