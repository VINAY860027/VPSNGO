import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, SafeAreaView, Dimensions, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Component Imports
import AdminNotifications, { initialNotificationsData } from './AdminNotifications';
import AdminProfile from './AdminProfile';
import AcademicCalendar from './AcademicCalendar';
import AdminStudentProfiles from './AdminStudentProfiles';
import AdminLM from './AdminLM';


const { width: windowWidth } = Dimensions.get('window');

const CARD_GAP = 12;
const CONTENT_HORIZONTAL_PADDING = 15;
const BOTTOM_NAV_HEIGHT = 70;

const PRIMARY_COLOR = '#008080';
const SECONDARY_COLOR = '#e0f2f7';
const TERTIARY_COLOR = '#f8f8ff';
const TEXT_COLOR_DARK = '#333';
const TEXT_COLOR_MEDIUM = '#555';
const BORDER_COLOR = '#b2ebf2';


const AdminDashboard = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [userProfile, setUserProfile] = useState({
    name: 'Allu Arjun (Admin)',
    profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFjDq3OY2InCSeoESM7MRUF3Vh96I48yz2gA&s',
    class: 'Administration',
    studentId: 'ADM001',
    dob: '1985-07-15',
    gender: 'Female',
    email: 'AlluArjun@example.com',
    phone: '+91 98765 43210',
    address: '123, School Lane, Knowledge City, Hyderabad - 500081',
    rollNo: 'N/A',
    admissionDate: '2015-06-01',
  });

  const initialUnreadCount = initialNotificationsData.filter(n => !n.read).length;
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(initialUnreadCount);

  const allQuickAccessItems = [
    { id: 'qa0', title: 'LM', imageSource: 'https://cdn-icons-png.flaticon.com/128/15096/15096966.png', navigateToTab: 'AdminLM' },
    { id: 'qa1', title: 'Student Profiles', imageSource: 'https://cdn-icons-png.flaticon.com/128/2444/2444491.png', navigateToTab: 'AdminstudentProfiles' },
    { id: 'qa2', title: 'MI', imageSource: 'https://cdn-icons-png.flaticon.com/128/9195/9195955.png' },
    { id: 'qa3', title: 'Attendance', imageSource: 'https://cdn-icons-png.flaticon.com/128/10293/10293877.png' },
    { id: 'qa4', title: 'Syllabus', imageSource: 'https://cdn-icons-png.flaticon.com/128/4728/4728712.png' },
    { id: 'qa5', title: 'Time Table', imageSource: 'https://cdn-icons-png.flaticon.com/128/1254/1254275.png' },
    { id: 'qa6', title: 'Reports', imageSource: 'https://cdn-icons-png.flaticon.com/128/5369/5369986.png' },
    { id: 'qa7', title: 'Schedule', imageSource: 'https://cdn-icons-png.flaticon.com/128/4029/4029113.png' },
    { id: 'qa8', title: 'Digital Labs', imageSource: 'https://cdn-icons-png.flaticon.com/128/9562/9562280.png' },
    { id: 'qa9', title: 'Sports', imageSource: 'https://cdn-icons-png.flaticon.com/128/3429/3429456.png' },
    { id: 'qa10', title: 'PTM', imageSource: 'https://cdn-icons-png.flaticon.com/128/17588/17588666.png' },
    { id: 'qa11', title: 'Events', imageSource: 'https://cdn-icons-png.flaticon.com/128/16917/16917970.png' },
    { id: 'qa12', title: 'Health Info', imageSource: 'https://cdn-icons-png.flaticon.com/128/9441/9441727.png' },
    { id: 'qa13', title: 'Staff Management', imageSource: 'https://cdn-icons-png.flaticon.com/128/10692/10692138.png' },
    { id: 'qa14', title: 'Help Desk', imageSource: 'https://cdn-icons-png.flaticon.com/128/4840/4840332.png' },
  ];

  const handleLogout = () => {
    Alert.alert(
      "Logout", "Are you sure you want to log out?",
      [{ text: "Cancel", style: "cancel" }, {
        text: "Logout",
        onPress: () => {
          if (navigation && navigation.replace) {
            navigation.replace('HomeScreen');
          } else {
            Alert.alert("Logout", "Logout successful! (No navigation context)");
          }
        },
        style: "destructive"
      }], { cancelable: true }
    );
  };

  const handleUpdateProfile = (updatedProfile) => {
    setUserProfile(updatedProfile);
    Alert.alert('Profile Updated', 'Your profile details have been saved.');
  };

  const handleBellIconClick = () => setActiveTab('allNotifications');
  const handleUnreadCountChange = (count) => setUnreadNotificationsCount(count);

  const DashboardSectionCard = ({ title, imageSource, onPress }) => {
    return (
      <TouchableOpacity style={styles.dashboardCard} onPress={onPress}>
        <View style={styles.cardIconContainer}>
          <Image source={{ uri: imageSource }} style={styles.cardImage} />
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
      </TouchableOpacity>
    );
  };
  
  // === ADDED START: The missing ContentScreenHeader component definition ===
  const ContentScreenHeader = ({ title, onBack = () => setActiveTab('home') }) => (
    <View style={styles.contentHeader}>
      <TouchableOpacity onPress={onBack} style={styles.backButtonGlobal}>
        <MaterialIcons name="arrow-back" size={24} color={PRIMARY_COLOR} />
      </TouchableOpacity>
      <Text style={styles.contentHeaderTitle}>{title}</Text>
      <View style={{ width: 30 }} /> {/* Spacer for balance */}
    </View>
  );
  // === ADDED END ===

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <ScrollView
            style={styles.contentScrollView}
            contentContainerStyle={styles.contentScrollViewContainer}
          >
            <View style={styles.dashboardGrid}>
              {allQuickAccessItems.map(item => (
                <DashboardSectionCard
                  key={item.id}
                  title={item.title}
                  imageSource={item.imageSource}
                  onPress={() => {
                    if (item.navigateToTab) {
                      setActiveTab(item.navigateToTab);
                    } else {
                      Alert.alert(item.title, `Navigating to ${item.title}... (No specific tab action)`);
                    }
                  }}
                />
              ))}
            </View>
          </ScrollView>
        );
      case 'allNotifications':
        return (
          <>
            <ContentScreenHeader title="Notifications" />
            <AdminNotifications onUnreadCountChange={handleUnreadCountChange} />
          </>
        );
      case 'calendar':
        return <AcademicCalendar />;
      case 'AdminstudentProfiles':
        return (
          <AdminStudentProfiles
            onBackPress={() => setActiveTab('home')}
          />
        );
      case 'profile':
        return (
          <AdminProfile
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            onBackToDashboard={() => setActiveTab('home')}
          />
        );
      case 'AdminLM':
        return (
          <>
            <ContentScreenHeader title="Login Management" />
            <AdminLM />
          </>
        );
      default:
        return (
          <View style={styles.fallbackContent}>
            <Text style={styles.fallbackText}>Content for '{activeTab}' is not available.</Text>
            <TouchableOpacity onPress={() => setActiveTab('home')}>
              <Text style={styles.fallbackLink}>Go to Home</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {activeTab === 'home' && (
        <View style={styles.topBar}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: userProfile.profileImage }} style={styles.profileImage} />
            <View style={styles.profileTextContainer}>
              <Text style={styles.profileNameText}>{userProfile.name}</Text>
              <Text style={styles.profileRoleText}>{userProfile.class}</Text>
            </View>
          </View>
          <View style={styles.topBarActions}>
            <TouchableOpacity onPress={handleBellIconClick} style={styles.notificationBellContainer}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3602/3602145.png' }} style={styles.notificationBellIcon} />
              {unreadNotificationsCount > 0 && (
                <View style={styles.notificationCountBubble}>
                  <Text style={styles.notificationCountText}>{unreadNotificationsCount}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828479.png' }} style={styles.logoutIcon} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {renderContent()}

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('home')}>
          <Icon name="home" size={24} color={activeTab === 'home' ? PRIMARY_COLOR : TEXT_COLOR_MEDIUM} />
          <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('calendar')}>
          <Icon name="calendar" size={24} color={activeTab === 'calendar' ? PRIMARY_COLOR : TEXT_COLOR_MEDIUM} />
          <Text style={[styles.navText, activeTab === 'calendar' && styles.navTextActive]}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('profile')}>
          <Icon name="user" size={24} color={activeTab === 'profile' ? PRIMARY_COLOR : TEXT_COLOR_MEDIUM} />
          <Text style={[styles.navText, activeTab === 'profile' && styles.navTextActive]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: TERTIARY_COLOR,
  },
  topBar: {
    backgroundColor: SECONDARY_COLOR,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: PRIMARY_COLOR,
  },
  profileTextContainer: {
    marginLeft: 12,
  },
  profileNameText: {
    color: PRIMARY_COLOR,
    fontSize: 17,
    fontWeight: 'bold',
  },
  profileRoleText: {
    color: TEXT_COLOR_MEDIUM,
    fontSize: 13,
  },
  topBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBellContainer: {
    position: 'relative',
    padding: 8,
    marginRight: 5,
  },
  notificationBellIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: PRIMARY_COLOR,
  },
  notificationCountBubble: {
    position: 'absolute',
    top: 3,
    right: 3,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  notificationCountText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 8,
  },
  logoutIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: PRIMARY_COLOR,
  },
  // === ADDED START: The missing styles for the ContentScreenHeader ===
  contentHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 15, paddingVertical: 12, backgroundColor: SECONDARY_COLOR,
    borderBottomWidth: 1, borderBottomColor: BORDER_COLOR,
  },
  backButtonGlobal: {
    padding: 5,
  },
  contentHeaderTitle: {
    fontSize: 18, fontWeight: 'bold', color: PRIMARY_COLOR,
    textAlign: 'center', flex: 1,
  },
  // === ADDED END ===
  contentScrollView: {
    flex: 1,
  },
  contentScrollViewContainer: {
    paddingHorizontal: CONTENT_HORIZONTAL_PADDING,
    paddingTop: 15,
    paddingBottom: BOTTOM_NAV_HEIGHT + 20,
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dashboardCard: {
    width: (windowWidth - (CONTENT_HORIZONTAL_PADDING * 2) - (CARD_GAP * 2)) / 3,
    borderRadius: 12,
    paddingVertical: 15,
    marginBottom: CARD_GAP,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 110,
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.10,
    shadowRadius: 1.84,
    elevation: 2,
  },
  cardIconContainer: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardImage: {
    width: 38,
    height: 38,
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: TEXT_COLOR_DARK,
    textAlign: 'center',
    lineHeight: 14,
    paddingHorizontal: 4,
    marginTop: 'auto',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: SECONDARY_COLOR,
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    paddingBottom: Platform.OS === 'ios' ? 15 : 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5,
    minHeight: BOTTOM_NAV_HEIGHT,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  navText: {
    fontSize: 10,
    color: TEXT_COLOR_MEDIUM,
    marginTop: 3,
  },
  navTextActive: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  },
  fallbackContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fallbackText: {
    fontSize: 16,
    color: TEXT_COLOR_MEDIUM,
    textAlign: 'center',
    marginBottom: 10,
  },
  fallbackLink: {
    fontSize: 16,
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  }
});

export default AdminDashboard;