import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { theme } from '../utils/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

interface FormErrors {
  customerName?: string;
  customerAddress?: string;
  customerPhone?: string;
}

const CheckoutScreen: React.FC<Props> = ({ navigation }) => {
  const { cart, getTotalPrice, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const totalPrice = getTotalPrice();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!customerName.trim()) {
      newErrors.customerName = 'Name is required';
    } else if (customerName.trim().length < 2) {
      newErrors.customerName = 'Name must be at least 2 characters';
    }

    if (!customerAddress.trim()) {
      newErrors.customerAddress = 'Address is required';
    } else if (customerAddress.trim().length < 10) {
      newErrors.customerAddress = 'Please enter a complete address';
    }

    if (!customerPhone.trim()) {
      newErrors.customerPhone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(customerPhone)) {
      newErrors.customerPhone = 'Please enter a valid phone number';
    } else if (customerPhone.replace(/\D/g, '').length < 10) {
      newErrors.customerPhone = 'Phone number must be at least 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill in all fields correctly');
      return;
    }

    setLoading(true);
    try {
      const orderId = await createOrder(
        {
          customerName: customerName.trim(),
          customerAddress: customerAddress.trim(),
          customerPhone: customerPhone.trim(),
        },
        cart,
        totalPrice
      );

      clearCart();

      Alert.alert(
        'Order Placed Successfully! 🎉',
        `Your order #${orderId.substring(0, 8)} has been placed successfully.`,
        [
          {
            text: 'View Orders',
            onPress: () => navigation.replace('OrderHistory'),
          },
          {
            text: 'Continue Shopping',
            onPress: () => navigation.navigate('ProductList'),
          },
        ]
      );
    } catch (error) {
      console.error('Order error:', error);
      Alert.alert(
        'Order Failed',
        'Failed to place order. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📦 Order Summary</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Items</Text>
                <Text style={styles.summaryValue}>{cart.length}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${totalPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryFree}>FREE</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${totalPrice.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📝 Shipping Information</Text>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={customerName}
              onChangeText={(text) => {
                setCustomerName(text);
                if (errors.customerName) {
                  setErrors({ ...errors, customerName: undefined });
                }
              }}
              error={errors.customerName}
              autoCapitalize="words"
            />
            <Input
              label="Delivery Address"
              placeholder="Enter your complete address"
              value={customerAddress}
              onChangeText={(text) => {
                setCustomerAddress(text);
                if (errors.customerAddress) {
                  setErrors({ ...errors, customerAddress: undefined });
                }
              }}
              error={errors.customerAddress}
              multiline
              numberOfLines={3}
              style={styles.addressInput}
            />
            <Input
              label="Phone Number"
              placeholder="Enter your phone number"
              value={customerPhone}
              onChangeText={(text) => {
                setCustomerPhone(text);
                if (errors.customerPhone) {
                  setErrors({ ...errors, customerPhone: undefined });
                }
              }}
              error={errors.customerPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <Text style={styles.infoText}>
              Your order will be processed and shipped within 2-3 business days.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={loading ? 'Processing...' : 'Place Order'}
          onPress={handleSubmitOrder}
          loading={loading}
          size="lg"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  summaryCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  summaryLabel: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
  },
  summaryValue: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  summaryFree: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.success,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.md,
  },
  totalLabel: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  totalValue: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.primary,
  },
  addressInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#E6F7FF',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 24,
    marginRight: theme.spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: theme.fontSize.sm,
    color: '#1890FF',
    lineHeight: 20,
  },
  footer: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    ...theme.shadows.lg,
  },
});

export default CheckoutScreen;

