// src/screens/DashboardScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

const DashboardScreen = ({ workouts, currentUser, onLogout, onNavigateToHome }) => {
  const getWorkoutStats = () => {
    const thisWeek = workouts.filter(w => {
      const workoutDate = new Date(w.timestamp);
      const today = new Date();
      const weekAgo = new Date(today.setDate(today.getDate() - 7));
      return workoutDate >= weekAgo;
    });

    const totalVolume = workouts.reduce((sum, w) => 
      sum + (w.sets * w.reps * (w.weight || 1)), 0
    );

    return {
      totalWorkouts: workouts.length,
      thisWeek: thisWeek.length,
      totalVolume: Math.round(totalVolume),
      streak: calculateStreak(),
    };
  };

  const calculateStreak = () => {
    if (workouts.length === 0) return 0;
    
    const sorted = [...workouts].sort((a, b) => b.timestamp - a.timestamp);
    let streak = 1;
    let currentDate = new Date(sorted[0].timestamp);
    
    for (let i = 1; i < sorted.length; i++) {
      const prevDate = new Date(sorted[i].timestamp);
      const diffDays = Math.floor((currentDate - prevDate) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
        currentDate = prevDate;
      } else if (diffDays > 1) {
        break;
      }
    }
    
    return streak;
  };

  const stats = getWorkoutStats();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: onLogout, style: 'destructive' }
      ]
    );
  };

  const achievements = [
    { id: 1, title: 'First Workout', earned: workouts.length > 0, icon: '🎯' },
    { id: 2, title: '5 Workouts', earned: workouts.length >= 5, icon: '🌟' },
    { id: 3, title: '10 Workouts', earned: workouts.length >= 10, icon: '💪' },
    { id: 4, title: '3-Day Streak', earned: stats.streak >= 3, icon: '🔥' },
    { id: 5, title: '7-Day Streak', earned: stats.streak >= 7, icon: '⚡' },
    { id: 6, title: '1000kg Volume', earned: stats.totalVolume >= 1000, icon: '🏆' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{currentUser?.name || 'Athlete'}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>🚪</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileEmoji}>🏋️‍♂️</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{currentUser?.name || 'Athlete'}</Text>
          <Text style={styles.profileEmail}>{currentUser?.email || ''}</Text>
          <View style={styles.memberBadge}>
            <Text style={styles.memberText}>Premium Member</Text>
          </View>
        </View>
      </View>

      {/* Stats Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{stats.totalWorkouts}</Text>
            <Text style={styles.statLabel}>Total Workouts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{stats.thisWeek}</Text>
            <Text style={styles.statLabel}>This Week</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{stats.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsGrid}>
          {achievements.map(achievement => (
            <View key={achievement.id} style={styles.achievementCard}>
              <View style={[styles.achievementIcon, 
                achievement.earned && styles.achievementEarned]}>
                <Text style={styles.achievementEmoji}>{achievement.icon}</Text>
              </View>
              <Text style={[
                styles.achievementTitle,
                !achievement.earned && styles.achievementLocked
              ]}>
                {achievement.title}
              </Text>
              {achievement.earned && (
                <View style={styles.earnedBadge}>
                  <Text style={styles.earnedText}>✓</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#4A90E2' }]}
            onPress={onNavigateToHome}
          >
            <Text style={styles.actionIcon}>➕</Text>
            <Text style={styles.actionLabel}>Add Workout</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#50C878' }]}
            onPress={() => Alert.alert('Coming Soon', 'Workout plans feature coming soon!')}
          >
            <Text style={styles.actionIcon}>📋</Text>
            <Text style={styles.actionLabel}>Plans</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: '#FF6B6B' }]}
            onPress={() => Alert.alert('Settings', 'Profile settings coming soon!')}
          >
            <Text style={styles.actionIcon}>⚙️</Text>
            <Text style={styles.actionLabel}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {workouts.length === 0 ? (
          <View style={styles.emptyActivity}>
            <Text style={styles.emptyEmoji}>💪</Text>
            <Text style={styles.emptyText}>No workouts yet</Text>
            <Text style={styles.emptySubtext}>Start your fitness journey today!</Text>
          </View>
        ) : (
          workouts.slice().reverse().slice(0, 3).map(workout => (
            <View key={workout.id} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityEmoji}>🏋️</Text>
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityExercise}>{workout.exercise}</Text>
                <Text style={styles.activityDetails}>
                  {workout.sets} sets × {workout.reps} reps
                  {workout.weight ? ` × ${workout.weight}kg` : ''}
                </Text>
              </View>
              <Text style={styles.activityDate}>{workout.date}</Text>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  logoutButton: {
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 20,
  },
  profileCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
  profileIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  profileEmoji: {
    fontSize: 30,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  memberBadge: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  memberText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    position: 'relative',
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  achievementEarned: {
    backgroundColor: '#4A90E2',
  },
  achievementEmoji: {
    fontSize: 24,
  },
  achievementTitle: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  achievementLocked: {
    opacity: 0.5,
  },
  earnedBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#50C878',
    alignItems: 'center',
    justifyContent: 'center',
  },
  earnedText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  actionIcon: {
    fontSize: 24,
    color: 'white',
    marginBottom: 5,
  },
  actionLabel: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyActivity: {
    alignItems: 'center',
    padding: 30,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityEmoji: {
    fontSize: 20,
  },
  activityInfo: {
    flex: 1,
  },
  activityExercise: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  activityDetails: {
    fontSize: 14,
    color: '#666',
  },
  activityDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default DashboardScreen;