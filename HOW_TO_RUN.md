# 🚀 How to Run Pocket Bazaar

## Quick Start Guide

### Step 1: Open Terminal in Project Directory
```bash
cd D:\internship\react-native\project\pocket-bazaar
```

### Step 2: Start Expo Development Server
```bash
npm start
```

This will:
- Start the Metro bundler
- Show you a QR code
- Give you options to open on different platforms

---

## 📱 Option 1: Test on Your Phone (EASIEST!)

### For Android:
1. Install **Expo Go** app from Google Play Store
2. Open Expo Go app
3. Tap "Scan QR Code"
4. Scan the QR code from your terminal
5. App will load on your phone! 🎉

### For iOS:
1. Install **Expo Go** app from App Store
2. Open your Camera app
3. Scan the QR code from terminal
4. Tap the notification to open in Expo Go
5. App will load on your phone! 🎉

**Download Expo Go:**
- Android: https://play.google.com/store/apps/details?id=host.exp.exponent
- iOS: https://apps.apple.com/app/expo-go/id982107779

---

## 💻 Option 2: Test on Emulator/Simulator

### For Android Emulator:
1. Make sure Android Studio is installed with an emulator
2. Start your Android emulator first
3. Run: `npm start`
4. Press **`a`** in the terminal
5. App opens in emulator automatically!

### For iOS Simulator (Mac only):
1. Make sure Xcode is installed
2. Run: `npm start`
3. Press **`i`** in the terminal
4. App opens in iOS Simulator automatically!

---

## 🌐 Option 3: Test on Web

```bash
npm start
```
Then press **`w`** in the terminal to open in your web browser.

*Note: Some features work better on mobile, but web works for testing!*

---

## 🎯 What You'll See When It Runs

1. **Metro bundler starts** (JavaScript bundler)
2. **QR code appears** in terminal
3. **Development server URL** is shown
4. **Options menu** with keyboard shortcuts:
   - Press `a` - Open on Android
   - Press `i` - Open on iOS
   - Press `w` - Open on Web
   - Press `r` - Reload app
   - Press `m` - Toggle menu

---

## ✅ Testing Your App

Once the app loads, test these features:

### 1. Browse Products 🛍️
- Scroll through product list
- See product images loading
- Try category filters at the top

### 2. View Product Details 🔍
- Tap any product
- See large product image
- Check price and ratings
- Tap "Add to Cart"

### 3. Shopping Cart 🛒
- Tap cart icon (🛒) in header
- See cart badge with item count
- Adjust quantities with +/- buttons
- Try removing items

### 4. Checkout 💳
- Tap "Proceed to Checkout"
- Fill in the form:
  - Name: Enter your name
  - Address: Enter a full address
  - Phone: Enter phone number
- Tap "Place Order"

### 5. Order History 📦
- Tap package icon (📦) in header
- See your orders
- Tap an order to expand
- See product images in order details

---

## 🔄 Common Commands

```bash
# Start development server
npm start

# Clear cache and restart (if you have issues)
npx expo start -c

# Install dependencies (if needed)
npm install

# Update Expo
npm install expo@latest

# Check for issues
npx expo-doctor
```

---

## 🐛 Troubleshooting

### "Command not found: expo"
```bash
npm install
npm start
```

### App won't load on phone?
- Make sure phone and computer are on same WiFi network
- Try scanning QR code again
- Restart Expo Go app

### Images not loading?
- Check internet connection
- FakeStore API requires internet
- Wait a few seconds for images to load

### Metro bundler error?
```bash
# Clear cache and restart
npx expo start -c
```

### Port already in use?
```bash
# Kill the process and restart
# Or Expo will suggest a different port
npm start
```

---

## 📸 Expected Behavior

### On First Load:
1. ✅ Splash screen appears
2. ✅ Product list loads with images
3. ✅ Category filters appear at top
4. ✅ Pull to refresh works

### When Adding to Cart:
1. ✅ Success alert shows
2. ✅ Cart badge updates
3. ✅ Product saved to cart

### When Checking Out:
1. ✅ Form validates input
2. ✅ Order saves to database
3. ✅ Success message shows
4. ✅ Cart clears automatically

---

## 🎉 You're All Set!

Your Pocket Bazaar app should now be running! 

**Pro Tip:** Use Expo Go on your phone for the best testing experience. It's the fastest way to see your app in action!

---

## 📱 Next Steps

After testing:
1. Try all the features
2. Test on different devices
3. Check order history
4. Test offline mode (cart still works!)
5. Review the code structure

**Need help?** Check the README.md for full documentation!

---

**Happy Testing! 🛍️✨**

