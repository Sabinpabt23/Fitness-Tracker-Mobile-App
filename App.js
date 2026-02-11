// App.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/screens/HomeScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import AddWorkoutScreen from './src/screens/AddWorkoutScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import TabBar from './src/components/TabBar';

// Global workouts data with user association
let workoutsData = [];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [workouts, setWorkouts] = useState([]);
  const [showAddScreen, setShowAddScreen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [userWorkouts, setUserWorkouts] = useState({});

  useEffect(() => {
    checkLoginStatus();
    loadUserWorkouts();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const user = await AsyncStorage.getItem('currentUser');
      if (user) {
        const parsedUser = JSON.parse(user);
        setCurrentUser(parsedUser);
        setIsLoggedIn(true);
        loadUserSpecificWorkouts(parsedUser.id);
      }
    } catch (error) {
      console.log('Error checking login status:', error);
    }
  };

  const loadUserWorkouts = async () => {
    try {
      const allWorkouts = await AsyncStorage.getItem('allWorkouts');
      if (allWorkouts) {
        setUserWorkouts(JSON.parse(allWorkouts));
      }
    } catch (error) {
      console.log('Error loading workouts:', error);
    }
  };

  const loadUserSpecificWorkouts = (userId) => {
    const userWorkoutList = userWorkouts[userId] || [];
    workoutsData = userWorkoutList;
    setWorkouts([...userWorkoutList]);
  };

  const handleLogin = async (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    setShowLogin(false);
    await AsyncStorage.setItem('currentUser', JSON.stringify(userData));
    loadUserSpecificWorkouts(userData.id);
  };

  const handleLogout = async () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    workoutsData = [];
    setWorkouts([]);
    await AsyncStorage.removeItem('currentUser');
  };

  const addWorkout = async (workout) => {
    if (!currentUser) return;

    const newWorkout = {
      ...workout,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
      timestamp: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
    };

    // Update user-specific workouts
    const updatedUserWorkouts = {
      ...userWorkouts,
      [currentUser.id]: [...(userWorkouts[currentUser.id] || []), newWorkout]
    };

    workoutsData = updatedUserWorkouts[currentUser.id];
    setWorkouts([...workoutsData]);
    setUserWorkouts(updatedUserWorkouts);
    
    // Save to AsyncStorage
    await AsyncStorage.setItem('allWorkouts', JSON.stringify(updatedUserWorkouts));
    
    setShowAddScreen(false);
    setActiveTab('home');
  };

  const deleteWorkout = async (id) => {
    if (!currentUser) return;

    const userWorkoutList = userWorkouts[currentUser.id] || [];
    const updatedList = userWorkoutList.filter(w => w.id !== id);
    
    const updatedUserWorkouts = {
      ...userWorkouts,
      [currentUser.id]: updatedList
    };

    workoutsData = updatedList;
    setWorkouts([...updatedList]);
    setUserWorkouts(updatedUserWorkouts);
    
    await AsyncStorage.setItem('allWorkouts', JSON.stringify(updatedUserWorkouts));
  };

  if (!isLoggedIn) {
    return showLogin ? (
      <LoginScreen 
        onLogin={handleLogin}
        onSignUpPress={() => setShowLogin(false)}
      />
    ) : (
      <SignUpScreen 
        onSignUp={handleLogin}
        onLoginPress={() => setShowLogin(true)}
      />
    );
  }

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
          currentUser={currentUser}
        />
      ) : activeTab === 'home' ? (
        <HomeScreen 
          workouts={workouts}
          onDeleteWorkout={deleteWorkout}
          onNavigateToProgress={() => setActiveTab('progress')}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      ) : activeTab === 'dashboard' ? (
        <DashboardScreen 
          workouts={workouts}
          currentUser={currentUser}
          onLogout={handleLogout}
          onNavigateToHome={() => setActiveTab('home')}
        />
      ) : (
        <ProgressScreen 
          workouts={workouts} 
          currentUser={currentUser}
        />
      )}

      {/* Tab Bar */}
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