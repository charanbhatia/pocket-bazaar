import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { RootStackParamList } from '../types';
import { useCart } from '../context/CartContext';
import { theme } from '../utils/theme';

// Import screens
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ProductList"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: theme.fontWeight.bold,
            fontSize: theme.fontSize.lg,
          },
          headerShadowVisible: true,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={({ navigation }) => ({
            title: 'Pocket Bazaar',
            headerRight: () => <HeaderCartButton navigation={navigation} />,
            headerLeft: () => <HeaderHistoryButton navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{
            title: 'Product Details',
          }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            title: 'Shopping Cart',
          }}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{
            title: 'Checkout',
          }}
        />
        <Stack.Screen
          name="OrderHistory"
          component={OrderHistoryScreen}
          options={{
            title: 'Order History',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HeaderCartButton: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <TouchableOpacity
      style={styles.headerButton}
      onPress={() => navigation.navigate('Cart')}
    >
      <Text style={styles.headerButtonText}>🛒</Text>
      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const HeaderHistoryButton: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.headerButton}
      onPress={() => navigation.navigate('OrderHistory')}
    >
      <Text style={styles.headerButtonText}>📦</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    marginHorizontal: theme.spacing.sm,
    position: 'relative',
  },
  headerButtonText: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    right: -8,
    top: -8,
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.full,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.bold,
  },
});

export default AppNavigator;

