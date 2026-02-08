import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import WorkoutCard from '../components/WorkoutCard';
import StatsCard from '../components/StatsCard';

const HomeScreen = ({ workouts, onDeleteWorkout, onNavigateToProgress }) => {
  const calculateStats = () => {
    return {
      totalWorkouts: workouts.length,
      totalSets: workouts.reduce((sum, w) => sum + w.sets, 0),
      totalReps: workouts.reduce((sum, w) => sum + w.reps, 0),
      avgWorkoutsPerWeek: workouts.length > 0 ? Math.round(workouts.length / 4) : 0,
    };
  };

  const stats = calculateStats();

  const handleDelete = (id, exercise) => {
    Alert.alert(
      'Delete Workout',
      `Delete "${exercise}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => onDeleteWorkout(id),
          style: 'destructive',
        },
      ]
    );
  };

  // Function to show workout history
  const showWorkoutHistory = () => {
    Alert.alert(
      'Workout History',
      `You have ${workouts.length} workouts logged.`,
      [{ text: 'OK' }]
    );
  };

  // Function to show detailed stats
  const showDetailedStats = () => {
    const totalVolume = workouts.reduce((sum, workout) => {
      const weight = workout.weight || 1;
      return sum + (workout.sets * workout.reps * weight);
    }, 0);
    
    Alert.alert(
      'Detailed Statistics',
      `Total Volume: ${Math.round(totalVolume)} kg\n` +
      `Average Sets per Workout: ${stats.avgWorkoutsPerWeek}\n` +
      `Unique Exercises: ${[...new Set(workouts.map(w => w.exercise))].length}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Fitness Tracker</Text>
        <Text style={styles.subtitle}>Track Your Progress</Text>
      </View>

      {/* Stats Cards - NOW CLICKABLE */}
      <View style={styles.statsRow}>
        <StatsCard
          title="Workouts"
          value={stats.totalWorkouts}
          icon="💪"
          color="#4A90E2"
          onPress={showWorkoutHistory}
        />
        <StatsCard
          title="Sets"
          value={stats.totalSets}
          icon="↻"
          color="#50C878"
          onPress={() => Alert.alert('Sets Info', `Total sets completed: ${stats.totalSets}`)}
        />
        <StatsCard
          title="Reps"
          value={stats.totalReps}
          icon="🏃"
          color="#FF6B6B"
          onPress={() => Alert.alert('Reps Info', `Total reps completed: ${stats.totalReps}`)}
        />
      </View>

      {/* Quick Action Cards */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        
        <View style={styles.actionCardsRow}>
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: '#4A90E2' }]}
            onPress={onNavigateToProgress}
          >
            <Text style={styles.actionIcon}>📊</Text>
            <Text style={styles.actionTitle}>View Progress</Text>
            <Text style={styles.actionSubtitle}>See analytics</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: '#50C878' }]}
            onPress={showDetailedStats}
          >
            <Text style={styles.actionIcon}>📈</Text>
            <Text style={styles.actionTitle}>Statistics</Text>
            <Text style={styles.actionSubtitle}>Detailed stats</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.actionCardsRow}>
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: '#FF6B6B' }]}
            onPress={showWorkoutHistory}
          >
            <Text style={styles.actionIcon}>📋</Text>
            <Text style={styles.actionTitle}>History</Text>
            <Text style={styles.actionSubtitle}>Past workouts</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: '#9B59B6' }]}
            onPress={() => Alert.alert('Coming Soon', 'Exercise library feature coming in next update!')}
          >
            <Text style={styles.actionIcon}>🏋️</Text>
            <Text style={styles.actionTitle}>Exercises</Text>
            <Text style={styles.actionSubtitle}>Library</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Workouts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          <TouchableOpacity onPress={showWorkoutHistory}>
            <Text style={styles.seeAllText}>See All →</Text>
          </TouchableOpacity>
        </View>
        
        {workouts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No workouts yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the + button to add your first workout
            </Text>
          </View>
        ) : (
          workouts.slice().reverse().slice(0, 3).map(workout => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onDelete={(id) => handleDelete(id, workout.exercise)}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    paddingBottom: 80,
  },
  header: {
    backgroundColor: '#4A90E2',
    padding: 25,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: -30,
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#4A90E2',
    fontWeight: '500',
  },
  actionCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  actionCard: {
    flex: 1,
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
    elevation: 3,
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
  },
  emptyState: {
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default HomeScreen;