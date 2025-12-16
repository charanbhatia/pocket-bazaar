import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme } from '../utils/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const base = [styles.button];
    
    if (size === 'sm') base.push(styles.buttonSm);
    if (size === 'lg') base.push(styles.buttonLg);
    
    if (variant === 'primary') base.push(styles.buttonPrimary);
    if (variant === 'secondary') base.push(styles.buttonSecondary);
    if (variant === 'outline') base.push(styles.buttonOutline);
    
    if (disabled) base.push(styles.buttonDisabled);
    
    return StyleSheet.flatten([...base, style]);
  };

  const getTextStyle = (): TextStyle => {
    const base = [styles.buttonText];
    
    if (size === 'sm') base.push(styles.buttonTextSm);
    if (size === 'lg') base.push(styles.buttonTextLg);
    
    if (variant === 'primary') base.push(styles.buttonTextPrimary);
    if (variant === 'secondary') base.push(styles.buttonTextSecondary);
    if (variant === 'outline') base.push(styles.buttonTextOutline);
    
    return StyleSheet.flatten([...base, textStyle]);
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? theme.colors.primary : '#FFFFFF'} />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  buttonSm: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  buttonLg: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
  },
  buttonSecondary: {
    backgroundColor: theme.colors.secondary,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.border,
    opacity: 0.6,
  },
  buttonText: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
  },
  buttonTextSm: {
    fontSize: theme.fontSize.sm,
  },
  buttonTextLg: {
    fontSize: theme.fontSize.lg,
  },
  buttonTextPrimary: {
    color: '#FFFFFF',
  },
  buttonTextSecondary: {
    color: '#FFFFFF',
  },
  buttonTextOutline: {
    color: theme.colors.primary,
  },
});

