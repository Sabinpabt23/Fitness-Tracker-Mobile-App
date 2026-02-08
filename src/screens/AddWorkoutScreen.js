import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

const EXERCISE_OPTIONS = [
  'Bench Press',
  'Squat',
  'Deadlift',
  'Shoulder Press',
  'Pull-ups',
  'Push-ups',
  'Bicep Curls',
  'Tricep Extensions',
  'Leg Press',
  'Crunches',
];

const AddWorkoutScreen = ({ onAddWorkout, onCancel }) => {
  const [exercise, setExercise] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = () => {
    // Validation
    if (!exercise.trim()) {
      Alert.alert('Error', 'Please select an exercise');
      return;
    }
    if (!sets || isNaN(sets) || parseInt(sets) <= 0) {
      Alert.alert('Error', 'Please enter valid number of sets');
      return;
    }
    if (!reps || isNaN(reps) || parseInt(reps) <= 0) {
      Alert.alert('Error', 'Please enter valid number of reps');
      return;
    }

    const workout = {
      exercise,
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: weight ? parseFloat(weight) : null,
    };

    onAddWorkout(workout);
    Alert.alert('Success', 'Workout added successfully!');
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add Workout</Text>
        <View style={{ width: 30 }} />
      </View>

      <View style={styles.form}>
        {/* Exercise Selection */}
        <Text style={styles.label}>Exercise *</Text>
        <View style={styles.exerciseGrid}>
          {EXERCISE_OPTIONS.map((ex) => (
            <TouchableOpacity
              key={ex}
              style={[
                styles.exerciseOption,
                exercise === ex && styles.exerciseOptionSelected,
              ]}
              onPress={() => setExercise(ex)}
            >
              <Text
                style={[
                  styles.exerciseText,
                  exercise === ex && styles.exerciseTextSelected,
                ]}
              >
                {ex}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Sets & Reps */}
        <View style={styles.row}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Sets *</Text>
            <TextInput
              style={styles.input}
              value={sets}
              onChangeText={setSets}
              placeholder="3"
              keyboardType="numeric"
              returnKeyType="next"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Reps *</Text>
            <TextInput
              style={styles.input}
              value={reps}
              onChangeText={setReps}
              placeholder="10"
              keyboardType="numeric"
              returnKeyType="next"
            />
          </View>
        </View>

        {/* Weight */}
        <Text style={styles.label}>Weight (kg) - Optional</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          placeholder="20"
          keyboardType="numeric"
          returnKeyType="done"
        />

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Save Workout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#4A90E2',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  form: {
    padding: 20,
    paddingTop: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  exerciseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 25,
  },
  exerciseOption: {
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  exerciseOptionSelected: {
    backgroundColor: '#4A90E2',
  },
  exerciseText: {
    color: '#666',
    fontSize: 14,
  },
  exerciseTextSelected: {
    color: 'white',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputGroup: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 16,
    marginRight: 10,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AddWorkoutScreen;