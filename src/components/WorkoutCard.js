import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const WorkoutCard = ({ workout, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.exercise}>{workout.exercise}</Text>
        <TouchableOpacity onPress={() => onDelete(workout.id)} style={styles.deleteButton}>
          <Text style={styles.deleteText}>🗑️</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.details}>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Sets: </Text>
          {workout.sets}
        </Text>
        <Text style={styles.detailText}>
          <Text style={styles.detailLabel}>Reps: </Text>
          {workout.reps}
        </Text>
        {workout.weight && (
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Weight: </Text>
            {workout.weight} kg
          </Text>
        )}
      </View>
      
      <Text style={styles.date}>{workout.date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  exercise: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    flex: 1,
  },
  deleteButton: {
    padding: 4,
  },
  deleteText: {
    fontSize: 18,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#34495E',
    marginRight: 16,
    marginBottom: 4,
  },
  detailLabel: {
    fontWeight: '500',
    color: '#7F8C8D',
  },
  date: {
    fontSize: 12,
    color: '#95A5A6',
    fontStyle: 'italic',
  },
});

export default WorkoutCard;