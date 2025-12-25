# ሙያPro (MuyaPro)

One Platform. All Technical Solutions.

## Overview
This is a React Native mobile application built with Expo for connecting customers with skilled technicians in Ethiopia.

## Features

### Customer Mode
- **Service Browsing**: Browse categories (IT, Electronics, Plumbing, etc.)
- **Service Request**: Create requests with photos, location, and preferred time.
- **Real-time Tracking**: Track technician status (Assigned -> Arrived -> Working -> Completed).
- **Chat**: Chat with assigned technicians.
- **History**: View past requests.

### Technician Mode
- **Job Board**: View new job requests.
- **Job Management**: Accept/Decline jobs and update status.
- **Earnings**: Track daily/weekly earnings.
- **Profile**: Manage skills and verification.

## Tech Stack
- **Framework**: React Native (Expo)
- **Navigation**: React Navigation (Stack)
- **Styling**: Custom Theme System (Ethiopian Colors)
- **State Management**: React Context API
- **Icons**: Ionicons

## Project Structure
- `src/components`: Reusable UI components (Button, Card, Input)
- `src/screens`: Application screens organized by flow
- `src/navigation`: Navigation configuration
- `src/context`: Global state management
- `src/theme`: Color palette and styling constants
- `src/assets`: Images and icons

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the app:
   ```bash
   npm start
   ```

3. Scan the QR code with Expo Go app on your phone.

## Color Palette
- **Primary**: Green (#2E7D32)
- **Secondary**: Yellow (#FBC02D)
- **Accent**: Red (#D32F2F)
