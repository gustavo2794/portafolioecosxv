import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius, Spacing } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  bgColor?: string;
  borderColor?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  bgColor = Colors.card,
  borderColor = Colors.cardBorder,
}) => {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: bgColor, borderColor: borderColor },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    overflow: 'hidden',
  },
});
