import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StatsCard = ({ title, value, icon, color = '#4A90E2', unit = '', onPress }) => {
  const iconMap = {
    '🏋️': '💪',
    '🔄': '↻', 
    '💪': '🏃',
    '📊': '📈',
    '⚖️': '⚡',
    '🏋️‍♂️': '🏋️',
    '📈': '↑',
  };

  const displayIcon = iconMap[icon] || icon;

  const CardContent = () => (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{displayIcon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.value}>
          {value}
          {unit && <Text style={styles.unit}> {unit}</Text>}
        </Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 12,
    borderLeftWidth: 4,
    marginHorizontal: 5,
    flex: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 4,
  },
  unit: {
    fontSize: 12,
    fontWeight: '400',
    color: '#7F8C8D',
  },
  title: {
    fontSize: 12,
    color: '#7F8C8D',
  },
});

export default StatsCard;