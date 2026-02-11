import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const TabBar = ({ activeTab, onTabChange, onAddPress }) => {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'home' && styles.activeTab]}
        onPress={() => onTabChange('home')}
      >
        <Text style={[styles.tabIcon, activeTab === 'home' && styles.activeTabIcon]}>
          🏠
        </Text>
        <Text style={[styles.tabText, activeTab === 'home' && styles.activeTabText]}>
          Home
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'dashboard' && styles.activeTab]}
        onPress={() => onTabChange('dashboard')}
      >
        <Text style={[styles.tabIcon, activeTab === 'dashboard' && styles.activeTabIcon]}>
          📊
        </Text>
        <Text style={[styles.tabText, activeTab === 'dashboard' && styles.activeTabText]}>
          Dashboard
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'progress' && styles.activeTab]}
        onPress={() => onTabChange('progress')}
      >
        <Text style={[styles.tabIcon, activeTab === 'progress' && styles.activeTabIcon]}>
          📈
        </Text>
        <Text style={[styles.tabText, activeTab === 'progress' && styles.activeTabText]}>
          Progress
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'profile' && styles.activeTab]}
        onPress={() => onTabChange('profile')}
      >
        <Text style={[styles.tabIcon, activeTab === 'profile' && styles.activeTabIcon]}>
          👤
        </Text>
        <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    height: 80,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#F0F7FF',
  },
  tabIcon: {
    fontSize: 22,
    color: '#999',
    marginBottom: 2,
  },
  activeTabIcon: {
    color: '#4A90E2',
  },
  tabText: {
    fontSize: 11,
    color: '#999',
  },
  activeTabText: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    left: width / 2 - 35,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderWidth: 3,
    borderColor: 'white',
  },
  addButtonText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TabBar;