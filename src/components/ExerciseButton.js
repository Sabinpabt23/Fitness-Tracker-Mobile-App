import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ExerciseButton = ({ exercise, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.selectedButton]}
      onPress={onPress}
    >
      <Text style={[styles.text, isSelected && styles.selectedText]}>
        {exercise}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedButton: {
    backgroundColor: '#4A90E2',
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
});

export default ExerciseButton;