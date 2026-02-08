import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import AddWorkoutScreen from './src/screens/AddWorkoutScreen';
import TabBar from './src/components/TabBar';

// Global workouts data
let workoutsData = [];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [workouts, setWorkouts] = useState([]);
  const [showAddScreen, setShowAddScreen] = useState(false);

  const addWorkout = (workout) => {
    const newWorkout = {
      ...workout,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
    };
    workoutsData.push(newWorkout);
    setWorkouts([...workoutsData]);
    setShowAddScreen(false);
    setActiveTab('home');
  };

  const deleteWorkout = (id) => {
    workoutsData = workoutsData.filter(w => w.id !== id);
    setWorkouts([...workoutsData]);
  };

  return (
    <View style={styles.container}>
      {/* Main Content */}
      {showAddScreen ? (
        <AddWorkoutScreen 
          onAddWorkout={addWorkout}
          onCancel={() => {
            setShowAddScreen(false);
            setActiveTab('home');
          }}
        />
      ) : activeTab === 'home' ? (
        <HomeScreen 
  workouts={workouts}
  onDeleteWorkout={deleteWorkout}
  onNavigateToProgress={() => setActiveTab('progress')}
/>
      ) : (
        <ProgressScreen workouts={workouts} />
      )}

      {/* Tab Bar (hidden when adding workout) */}
      {!showAddScreen && (
        <TabBar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onAddPress={() => setShowAddScreen(true)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
});