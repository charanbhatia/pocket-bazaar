# 🛍️ Pocket Bazaar - Mini E-Commerce App

A fully-featured e-commerce mobile application built with React Native (Expo), TypeScript, and Supabase. Shop from a variety of products with beautiful product images, manage your cart, checkout, and track your order history!

## ✨ Features

- 📱 **Product Listing**: Browse products with images and category filtering
- 🔍 **Product Details**: View detailed product information with large images and ratings
- 🛒 **Shopping Cart**: Add/remove items, adjust quantities with product thumbnails
- 💳 **Checkout**: Complete order form with validation
- 📦 **Order History**: View past orders with product images and detailed breakdowns
- 📸 **Image Support**: Full image integration across all screens
- 💾 **Data Persistence**: Cart and orders saved locally with AsyncStorage
- ☁️ **Cloud Backup**: Orders synced with Supabase database
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations

## 🏗️ Tech Stack

- **Frontend**: React Native (Expo)
- **Language**: TypeScript
- **Navigation**: React Navigation
- **API**: FakeStore API (with real product images)
- **Database**: Supabase
- **Storage**: AsyncStorage
- **HTTP Client**: Axios

## 📸 Image Features

### Product Images Throughout:
- ✅ **Product List**: Grid of product cards with images
- ✅ **Product Details**: Large hero images
- ✅ **Cart**: Product thumbnails (80x80px)
- ✅ **Order History**: Product images in order items (60x60px)
- ✅ All images from FakeStore API
- ✅ Proper sizing, scaling, and caching
- ✅ Loading states and error handling

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd pocket-bazaar
npm install
```

### 2. Setup Environment (Already Configured!)

Your `.env` file is ready with:
```env
EXPO_PUBLIC_SUPABASE_URL=https://enkbskbdsfzviecxcppi.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
EXPO_PUBLIC_FAKESTORE_API_URL=https://fakestoreapi.com
```

### 3. Setup Supabase Database

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to SQL Editor
3. Copy and paste the contents from `supabase/schema.sql`
4. Click "Run" to create the tables

### 4. Run the App

```bash
npm start
```

Then:
- Press **`a`** for Android emulator
- Press **`i`** for iOS simulator
- Scan QR code with **Expo Go** app on your phone

## 📱 Screens

### 1. Product List
- Display all products with images from FakeStore API
- Filter by category (All, Electronics, Jewelry, Men's & Women's Clothing)
- Pull-to-refresh functionality
- Smooth scrolling with product images

### 2. Product Details
- Large hero product image
- Full product information and description
- Ratings and reviews count
- Add to cart functionality
- Responsive image display

### 3. Shopping Cart
- View all cart items with thumbnails
- Increment/decrement quantity
- Remove items
- Real-time total calculation
- Product images persist
- Clear cart option

### 4. Checkout
- Customer information form
- Form validation (name, address, phone)
- Order summary with product images
- Place order functionality

### 5. Order History
- View all past orders
- Expandable order details with product images
- Product thumbnails in order items
- Order totals and dates
- Shipping information

## 🗂️ Project Structure

```
pocket-bazaar/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── ProductCard.tsx  # Product images
│   │   ├── CartItem.tsx     # Cart thumbnails
│   │   └── Loading.tsx
│   ├── config/              # Configuration files
│   │   └── supabase.ts      # Supabase client setup
│   ├── context/             # React Context providers
│   │   └── CartContext.tsx  # Cart state management
│   ├── navigation/          # Navigation setup
│   │   └── AppNavigator.tsx
│   ├── screens/             # App screens
│   │   ├── ProductListScreen.tsx      # Product images
│   │   ├── ProductDetailsScreen.tsx   # Hero images
│   │   ├── CartScreen.tsx             # Thumbnails
│   │   ├── CheckoutScreen.tsx
│   │   └── OrderHistoryScreen.tsx     # Order images
│   ├── services/            # API services
│   │   ├── api.ts           # FakeStore API (images)
│   │   └── orderService.ts  # Order management
│   ├── types/               # TypeScript types
│   │   ├── index.ts
│   │   └── env.d.ts
│   └── utils/               # Utility functions
│       └── theme.ts         # Theme configuration
├── supabase/
│   └── schema.sql           # Database schema
├── babel.config.js          # Babel configuration
├── App.tsx                  # Root component
└── package.json
```

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with purple gradient theme
- **Product Images**: High-quality images from FakeStore API
- **Smooth Animations**: Slide transitions between screens
- **Loading States**: Informative loading indicators
- **Error Handling**: User-friendly error messages
- **Responsive Layout**: Works on various screen sizes
- **Theme System**: Consistent colors and spacing
- **Shadow Effects**: Depth and hierarchy
- **Image Caching**: Optimized image loading
- **Empty States**: Helpful messages when lists are empty

## 🔧 Environment Variables

The app uses Expo's built-in environment variable support:

```env
EXPO_PUBLIC_SUPABASE_URL=your-supabase-project-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
EXPO_PUBLIC_FAKESTORE_API_URL=https://fakestoreapi.com
```

- Variables prefixed with `EXPO_PUBLIC_` are automatically loaded
- Accessible via `process.env.EXPO_PUBLIC_*`
- Configured in `src/config/supabase.ts` and `src/services/api.ts`

## 📊 Database Schema

### Orders Table
- `id`: UUID (Primary Key)
- `customer_name`: Text
- `customer_address`: Text
- `customer_phone`: Text
- `total_amount`: Decimal
- `order_date`: Timestamp
- `created_at`: Timestamp

### Order Items Table
- `id`: UUID (Primary Key)
- `order_id`: UUID (Foreign Key)
- `product_id`: Integer
- `product_title`: Text
- `product_price`: Decimal
- `product_image`: Text (**stores image URL**)
- `quantity`: Integer
- `subtotal`: Decimal
- `created_at`: Timestamp

## 🔒 Security

- Row Level Security (RLS) enabled on Supabase tables
- Environment variables for sensitive data
- API key protection
- Input validation and sanitization

## 🐛 Troubleshooting

### Supabase Connection Issues
- Verify your credentials in `.env`
- Check Supabase project status
- App will fallback to AsyncStorage automatically

### API Errors
- Ensure internet connectivity
- FakeStore API might have rate limits
- Check console for detailed error messages

### Images Not Loading
- Check internet connection
- FakeStore API images are external URLs
- React Native caches images automatically

### Build Errors
- Clear cache: `npx expo start -c`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

## 🚀 Deployment

### Test on Device

Install Expo Go app and scan the QR code when you run `npm start`

### Build for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios

# Build for both
eas build --platform all
```

## 📝 Key Features Checklist

✅ Product browsing with images  
✅ Category filtering  
✅ Product details with large images  
✅ Shopping cart with thumbnails  
✅ Cart persistence across app restarts  
✅ Checkout with form validation  
✅ Order placement  
✅ Order history with product images  
✅ Real-time price calculations  
✅ Pull-to-refresh  
✅ Loading states  
✅ Error handling  
✅ Offline support  
✅ Image caching  
✅ Cross-platform (iOS, Android)  

## 🎯 Future Enhancements

- User authentication
- Product search functionality
- Wishlist feature
- Payment gateway integration
- Push notifications
- Product reviews and ratings
- Image zoom and gallery
- Dark mode support
- Multi-language support
- Product image upload (for admin)

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer Notes

- **State Management**: React Context for cart, props for other data
- **Navigation**: React Navigation with TypeScript support
- **Styling**: StyleSheet with custom theme system
- **Images**: FakeStore API provides real product images
- **Data Flow**: Unidirectional data flow pattern
- **Error Boundaries**: Comprehensive error handling
- **Code Quality**: TypeScript for type safety
- **Image Handling**: React Native Image component with caching

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

**Built with ❤️ using React Native, TypeScript, and Expo**

**All features working including complete image integration! 📸✨**
