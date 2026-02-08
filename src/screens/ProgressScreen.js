import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import StatsCard from '../components/StatsCard';

const ProgressScreen = ({ workouts }) => {
  const calculateStats = () => {
    const totalVolume = workouts.reduce((sum, workout) => {
      const weight = workout.weight || 1;
      return sum + (workout.sets * workout.reps * weight);
    }, 0);

    const uniqueExercises = [...new Set(workouts.map(w => w.exercise))].length;

    return {
      totalWorkouts: workouts.length,
      totalVolume: Math.round(totalVolume),
      uniqueExercises,
      avgSets: workouts.length > 0 
        ? (workouts.reduce((sum, w) => sum + w.sets, 0) / workouts.length).toFixed(1)
        : '0',
    };
  };

  const getTopExercises = () => {
    const counts = {};
    workouts.forEach(w => {
      counts[w.exercise] = (counts[w.exercise] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  };

  const stats = calculateStats();
  const topExercises = getTopExercises();

  // Interactive functions
  const showVolumeDetails = () => {
    Alert.alert(
      'Volume Analysis',
      `Total workout volume: ${stats.totalVolume} kg\n` +
      `This represents the total weight lifted across all workouts.`,
      [{ text: 'OK' }]
    );
  };

  const showExerciseAnalysis = () => {
    Alert.alert(
      'Exercise Analysis',
      `You've performed ${stats.uniqueExercises} different exercises.\n` +
      `Try to maintain variety in your workout routine!`,
      [{ text: 'OK' }]
    );
  };

  const showWorkoutTrends = () => {
    if (workouts.length === 0) {
      Alert.alert('No Data', 'Log some workouts to see trends!');
      return;
    }
    
    const workoutsByDay = {};
    workouts.forEach(w => {
      const day = new Date(w.timestamp).toLocaleDateString();
      workoutsByDay[day] = (workoutsByDay[day] || 0) + 1;
    });
    
    const mostActiveDay = Object.entries(workoutsByDay)
      .sort((a, b) => b[1] - a[1])[0];
    
    Alert.alert(
      'Workout Trends',
      `Most active day: ${mostActiveDay ? mostActiveDay[0] : 'N/A'}\n` +
      `Workouts on that day: ${mostActiveDay ? mostActiveDay[1] : 0}`,
      [{ text: 'OK' }]
    );
  };

  const showProgressReport = () => {
    if (workouts.length < 2) {
      Alert.alert('More Data Needed', 'Log at least 2 workouts to see progress!');
      return;
    }
    
    const sortedWorkouts = [...workouts].sort((a, b) => a.timestamp - b.timestamp);
    const firstWorkout = sortedWorkouts[0];
    const latestWorkout = sortedWorkouts[sortedWorkouts.length - 1];
    
    const progress = ((latestWorkout.sets * latestWorkout.reps) - 
                     (firstWorkout.sets * firstWorkout.reps)) / 
                     (firstWorkout.sets * firstWorkout.reps) * 100;
    
    Alert.alert(
      'Progress Report',
      `First workout: ${firstWorkout.exercise} (${firstWorkout.date})\n` +
      `Latest workout: ${latestWorkout.exercise} (${latestWorkout.date})\n` +
      `Progress: ${progress > 0 ? '+' : ''}${progress.toFixed(1)}%`,
      [{ text: 'Great!', style: 'cancel' }]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress Analytics</Text>
        <Text style={styles.subtitle}>Track Your Fitness Journey</Text>
      </View>

      {/* Interactive Stats Cards */}
      <View style={styles.statsGrid}>
        <StatsCard
          title="Total Workouts"
          value={stats.totalWorkouts}
          icon="📈"
          color="#4A90E2"
          onPress={showWorkoutTrends}
        />
        <StatsCard
          title="Total Volume"
          value={stats.totalVolume}
          icon="⚡"
          color="#50C878"
          unit="kg"
          onPress={showVolumeDetails}
        />
      </View>

      <View style={styles.statsGrid}>
        <StatsCard
          title="Exercises"
          value={stats.uniqueExercises}
          icon="🏋️"
          color="#FF6B6B"
          onPress={showExerciseAnalysis}
        />
        <StatsCard
          title="Avg Sets"
          value={stats.avgSets}
          icon="↑"
          color="#9B59B6"
          onPress={showProgressReport}
        />
      </View>

      {/* Quick Insights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Insights</Text>
        
        <TouchableOpacity 
          style={styles.insightCard}
          onPress={() => {
            if (topExercises.length > 0) {
              Alert.alert(
                'Top Exercise',
                `Your most frequent exercise is: ${topExercises[0][0]}\n` +
                `Performed ${topExercises[0][1]} times`,
                [{ text: 'OK' }]
              );
            }
          }}
        >
          <Text style={styles.insightIcon}>⭐</Text>
          <Text style={styles.insightText}>
            {topExercises.length > 0 
              ? `Most frequent: ${topExercises[0][0]}`
              : 'No exercise data'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.insightCard}
          onPress={() => {
            const totalWorkouts = workouts.length;
            const recommendation = totalWorkouts < 5 
              ? "Keep going! Consistency is key."
              : totalWorkouts < 10 
                ? "Great progress! Try increasing weights."
                : "Excellent consistency! Consider new exercises.";
            
            Alert.alert('Coach Recommendation', recommendation);
          }}
        >
          <Text style={styles.insightIcon}>💡</Text>
          <Text style={styles.insightText}>
            {workouts.length > 0 ? 'Personalized tips' : 'Start working out!'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Top Exercises */}
      {topExercises.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Most Frequent Exercises</Text>
          {topExercises.map(([name, count], index) => (
            <TouchableOpacity 
              key={name} 
              style={styles.exerciseRow}
              onPress={() => Alert.alert(name, `Performed ${count} times`)}
            >
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>#{index + 1}</Text>
              </View>
              <Text style={styles.exerciseName}>{name}</Text>
              <Text style={styles.exerciseCount}>{count} sessions</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Workout History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Workout History</Text>
        {workouts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No workouts recorded yet</Text>
          </View>
        ) : (
          workouts.slice().reverse().map(workout => (
            <TouchableOpacity 
              key={workout.id} 
              style={styles.historyItem}
              onPress={() => Alert.alert(
                workout.exercise,
                `${workout.sets} sets × ${workout.reps} reps\n` +
                `${workout.date}`
              )}
            >
              <Text style={styles.historyExercise}>{workout.exercise}</Text>
              <Text style={styles.historyDetails}>
                {workout.sets} sets × {workout.reps} reps
                {workout.weight ? ` × ${workout.weight}kg` : ''}
              </Text>
              <Text style={styles.historyDate}>{workout.date}</Text>
            </TouchableOpacity>
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
  statsGrid: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 0,
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  insightIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  insightText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  rankBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  rankText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  exerciseName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  exerciseCount: {
    color: '#666',
    fontWeight: '500',
  },
  historyItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  historyExercise: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  historyDetails: {
    fontSize: 14,
    color: '#666',
  },
  historyDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ProgressScreen;