// // screens/CallScreen.js
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
//   Switch,
//   StatusBar,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const CallScreen = () => {
//   const [isActive, setIsActive] = useState(true);
//   const [selectedFilter, setSelectedFilter] = useState('all');

//   // Mock call data
//   const recentCalls = [
//     {
//       id: 1,
//       name: 'Sarah K',
//       type: 'outgoing',
//       status: 'connected',
//       time: '2:30 PM',
//       duration: '5:24',
//       avatar: 'SK',
//       missed: false
//     },
//     {
//       id: 2,
//       name: 'Mike Johnson',
//       type: 'incoming',
//       status: 'missed',
//       time: '1:15 PM',
//       duration: '0:00',
//       avatar: 'MJ',
//       missed: true
//     },
//     {
//       id: 3,
//       name: 'Team Alpha',
//       type: 'group',
//       status: 'connected',
//       time: '12:45 PM',
//       duration: '12:34',
//       avatar: 'TA',
//       missed: false
//     },
//     {
//       id: 4,
//       name: 'Emily Davis',
//       type: 'incoming',
//       status: 'connected',
//       time: 'Yesterday',
//       duration: '3:15',
//       avatar: 'ED',
//       missed: false
//     },
//     {
//       id: 5,
//       name: 'Alex Chen',
//       type: 'outgoing',
//       status: 'missed',
//       time: 'Yesterday',
//       duration: '0:00',
//       avatar: 'AC',
//       missed: true
//     },
//   ];

//   const quickContacts = [
//     { id: 1, name: 'Sarah K', avatar: 'SK', online: true },
//     { id: 2, name: 'Mike J', avatar: 'MJ', online: false },
//     { id: 3, name: 'Emily D', avatar: 'ED', online: true },
//     { id: 4, name: 'Alex C', avatar: 'AC', online: true },
//   ];

//   const CallItem = ({ call }) => (
//     <TouchableOpacity style={styles.callItem}>
//       <View style={styles.avatarContainer}>
//         <Text style={[
//           styles.avatarText,
//           call.missed && styles.missedAvatar
//         ]}>
//           {call.avatar}
//         </Text>
//         <View style={[
//           styles.callTypeIndicator,
//           call.type === 'incoming' ? styles.incoming : styles.outgoing,
//           call.missed && styles.missed
//         ]}>
//           <Ionicons 
//             name={call.type === 'incoming' ? 'call-received' : 'call-made'} 
//             size={12} 
//             color="#fff" 
//           />
//         </View>
//       </View>
      
//       <View style={styles.callInfo}>
//         <Text style={[styles.callName, call.missed && styles.missedText]}>
//           {call.name}
//         </Text>
//         <View style={styles.callDetails}>
//           <Ionicons 
//             name={call.missed ? 'close-circle' : 'checkmark-circle'} 
//             size={14} 
//             color={call.missed ? '#ff3b30' : '#4cd964'} 
//           />
//           <Text style={[styles.callStatus, call.missed && styles.missedText]}>
//             {call.missed ? 'Missed' : call.duration}
//           </Text>
//         </View>
//       </View>
      
//       <Text style={styles.callTime}>{call.time}</Text>
      
//       <TouchableOpacity style={styles.callButton}>
//         <Ionicons name="call" size={20} color="#4a90e2" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   const QuickContact = ({ contact }) => (
//     <TouchableOpacity style={styles.quickContact}>
//       <View style={styles.quickAvatarContainer}>
//         <Text style={styles.quickAvatarText}>{contact.avatar}</Text>
//         {contact.online && <View style={styles.onlineIndicator} />}
//       </View>
//       <Text style={styles.quickName}>{contact.name}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <View>
//           <Text style={styles.headerTitle}>Calls</Text>
//           <Text style={styles.headerSubtitle}>
//             {isActive ? 'Available for calls' : 'Do Not Disturb'}
//           </Text>
//         </View>
        
//         <View style={styles.statusContainer}>
//           <Text style={styles.statusText}>
//             {isActive ? 'Active' : 'Inactive'}
//           </Text>
//           <Switch
//             value={isActive}
//             onValueChange={setIsActive}
//             trackColor={{ false: '#767577', true: '#4a90e2' }}
//             thumbColor={isActive ? '#fff' : '#f4f3f4'}
//             style={styles.switch}
//           />
//         </View>
//       </View>

//       {/* Quick Contacts */}
//       <View style={styles.quickContactsSection}>
//         <Text style={styles.sectionTitle}>Quick Connect</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           <View style={styles.quickContactsList}>
//             {quickContacts.map(contact => (
//               <QuickContact key={contact.id} contact={contact} />
//             ))}
//             <TouchableOpacity style={styles.addContact}>
//               <Ionicons name="add" size={24} color="#4a90e2" />
//               <Text style={styles.addContactText}>Add</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </View>

//       {/* Filter Tabs */}
//       <View style={styles.filterContainer}>
//         {['all', 'missed', 'outgoing', 'incoming'].map(filter => (
//           <TouchableOpacity
//             key={filter}
//             style={[
//               styles.filterTab,
//               selectedFilter === filter && styles.filterTabActive
//             ]}
//             onPress={() => setSelectedFilter(filter)}
//           >
//             <Text style={[
//               styles.filterText,
//               selectedFilter === filter && styles.filterTextActive
//             ]}>
//               {filter.charAt(0).toUpperCase() + filter.slice(1)}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Recent Calls List */}
//       <ScrollView style={styles.callsList}>
//         <Text style={styles.sectionTitle}>Recent Calls</Text>
        
//         {recentCalls
//           .filter(call => {
//             if (selectedFilter === 'all') return true;
//             if (selectedFilter === 'missed') return call.missed;
//             if (selectedFilter === 'outgoing') return call.type === 'outgoing';
//             if (selectedFilter === 'incoming') return call.type === 'incoming';
//             return true;
//           })
//           .map(call => (
//             <CallItem key={call.id} call={call} />
//           ))}
//       </ScrollView>

//       {/* Call Button */}
//       <View style={styles.fabContainer}>
//         <TouchableOpacity style={styles.fabButton}>
//           <Ionicons name="call" size={24} color="#fff" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   headerSubtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   statusText: {
//     fontSize: 14,
//     color: '#666',
//     marginRight: 8,
//     fontWeight: '500',
//   },
//   switch: {
//     transform: [{ scale: 0.8 }],
//   },
//   quickContactsSection: {
//     backgroundColor: '#fff',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     paddingHorizontal: 20,
//     marginBottom: 15,
//   },
//   quickContactsList: {
//     flexDirection: 'row',
//     paddingHorizontal: 15,
//   },
//   quickContact: {
//     alignItems: 'center',
//     marginRight: 20,
//   },
//   quickAvatarContainer: {
//     position: 'relative',
//     marginBottom: 8,
//   },
//   quickAvatarText: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#4a90e2',
//     textAlign: 'center',
//     lineHeight: 60,
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   onlineIndicator: {
//     position: 'absolute',
//     bottom: 2,
//     right: 2,
//     width: 14,
//     height: 14,
//     borderRadius: 7,
//     backgroundColor: '#4cd964',
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
//   quickName: {
//     fontSize: 12,
//     color: '#333',
//     fontWeight: '500',
//   },
//   addContact: {
//     alignItems: 'center',
//     marginRight: 20,
//   },
//   addContactText: {
//     fontSize: 12,
//     color: '#4a90e2',
//     fontWeight: '500',
//     marginTop: 8,
//   },
//   filterContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   filterTab: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     marginRight: 10,
//     backgroundColor: '#f0f0f0',
//   },
//   filterTabActive: {
//     backgroundColor: '#4a90e2',
//   },
//   filterText: {
//     fontSize: 14,
//     color: '#666',
//     fontWeight: '500',
//   },
//   filterTextActive: {
//     color: '#fff',
//   },
//   callsList: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   callItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f5f5f5',
//   },
//   avatarContainer: {
//     position: 'relative',
//     marginRight: 15,
//   },
//   avatarText: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#4a90e2',
//     textAlign: 'center',
//     lineHeight: 50,
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   missedAvatar: {
//     backgroundColor: '#ff3b30',
//   },
//   callTypeIndicator: {
//     position: 'absolute',
//     bottom: -2,
//     right: -2,
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   incoming: {
//     backgroundColor: '#4cd964',
//   },
//   outgoing: {
//     backgroundColor: '#007aff',
//   },
//   missed: {
//     backgroundColor: '#ff3b30',
//   },
//   callInfo: {
//     flex: 1,
//   },
//   callName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000',
//     marginBottom: 4,
//   },
//   callDetails: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   callStatus: {
//     fontSize: 14,
//     color: '#666',
//     marginLeft: 4,
//   },
//   missedText: {
//     color: '#ff3b30',
//   },
//   callTime: {
//     fontSize: 14,
//     color: '#666',
//     marginRight: 15,
//   },
//   callButton: {
//     padding: 8,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 20,
//   },
//   fabContainer: {
//     position: 'absolute',
//     bottom: 30,
//     right: 20,
//   },
//   fabButton: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#4a90e2',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 8,
//   },
// });

// export default CallScreen;


// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________



// screens/CallScreen.js
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   Switch,
//   StatusBar,
//   Alert,
//   TextInput,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const CallScreen = () => {
//   const [isActive, setIsActive] = useState(true);
//   const [selectedTab, setSelectedTab] = useState('call');
//   const [searchText, setSearchText] = useState('');

//   // Mock favorite contacts
//   const favoriteContacts = [
//     { id: 1, name: 'Sarah K', avatar: 'SK', online: true, lastSeen: '2 min ago' },
//     { id: 2, name: 'Mike Johnson', avatar: 'MJ', online: false, lastSeen: '1 hour ago' },
//     { id: 3, name: 'Emily Davis', avatar: 'ED', online: true, lastSeen: 'Online' },
//     { id: 4, name: 'Alex Chen', avatar: 'AC', online: true, lastSeen: '5 min ago' },
//   ];

//   // Mock voice messages
//   const voiceMessages = [
//     { id: 1, name: 'Team Alpha', duration: '2:34', time: '10:30 AM', unread: true },
//     { id: 2, name: 'Sarah K', duration: '1:45', time: '9:15 AM', unread: false },
//     { id: 3, name: 'Mike Johnson', duration: '0:45', time: 'Yesterday', unread: false },
//   ];

//   // Simulate call
//   const simulateCall = (contact) => {
//     Alert.alert(
//       `Calling ${contact.name}`,
//       'Connecting...',
//       [
//         {
//           text: 'End Call',
//           onPress: () => Alert.alert('Call Ended', `Call with ${contact.name} ended`),
//           style: 'destructive'
//         }
//       ]
//     );
//   };

//   // Simulate voice message playback
//   const playVoiceMessage = (message) => {
//     Alert.alert(
//       `Playing Voice Message`,
//       `From: ${message.name}\nDuration: ${message.duration}`,
//       [
//         {
//           text: 'Close',
//           style: 'cancel'
//         },
//         {
//           text: 'Reply',
//           onPress: () => setSelectedTab('call')
//         }
//       ]
//     );
//   };

//   const FavoriteContact = ({ contact }) => (
//     <TouchableOpacity 
//       style={styles.contactCard}
//       onPress={() => simulateCall(contact)}
//     >
//       <View style={styles.contactAvatar}>
//         <Text style={styles.avatarText}>{contact.avatar}</Text>
//         <View style={[
//           styles.statusIndicator,
//           contact.online ? styles.online : styles.offline
//         ]} />
//       </View>
//       <Text style={styles.contactName}>{contact.name}</Text>
//       <Text style={styles.contactStatus}>
//         {contact.online ? 'Online' : contact.lastSeen}
//       </Text>
//       <TouchableOpacity style={styles.callIcon}>
//         <Ionicons name="call" size={20} color="#4a90e2" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   const VoiceMessageItem = ({ message }) => (
//     <TouchableOpacity 
//       style={styles.messageCard}
//       onPress={() => playVoiceMessage(message)}
//     >
//       <View style={styles.messageIcon}>
//         <Ionicons 
//           name={message.unread ? "mic" : "mic-outline"} 
//           size={24} 
//           color={message.unread ? "#4a90e2" : "#666"} 
//         />
//       </View>
//       <View style={styles.messageInfo}>
//         <Text style={styles.messageName}>{message.name}</Text>
//         <Text style={styles.messageDuration}>{message.duration}</Text>
//       </View>
//       <View style={styles.messageMeta}>
//         <Text style={styles.messageTime}>{message.time}</Text>
//         {message.unread && <View style={styles.unreadBadge} />}
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.appTitle}>TALKI</Text>
//         <View style={styles.statusContainer}>
//           <Text style={styles.statusLabel}>
//             {isActive ? 'ACTIVE' : 'INACTIVE'}
//           </Text>
//           <Switch
//             value={isActive}
//             onValueChange={setIsActive}
//             trackColor={{ false: '#767577', true: '#4a90e2' }}
//             thumbColor={isActive ? '#fff' : '#f4f3f4'}
//           />
//         </View>
//       </View>

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search"
//           value={searchText}
//           onChangeText={setSearchText}
//           placeholderTextColor="#999"
//         />
//       </View>

//       {/* Tab Buttons */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity 
//           style={[styles.tab, selectedTab === 'call' && styles.tabActive]}
//           onPress={() => setSelectedTab('call')}
//         >
//           <Ionicons 
//             name="call" 
//             size={24} 
//             color={selectedTab === 'call' ? '#4a90e2' : '#666'} 
//           />
//           <Text style={[styles.tabText, selectedTab === 'call' && styles.tabTextActive]}>
//             Call
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={[styles.tab, selectedTab === 'favorite' && styles.tabActive]}
//           onPress={() => setSelectedTab('favorite')}
//         >
//           <Ionicons 
//             name="heart" 
//             size={24} 
//             color={selectedTab === 'favorite' ? '#4a90e2' : '#666'} 
//           />
//           <Text style={[styles.tabText, selectedTab === 'favorite' && styles.tabTextActive]}>
//             Favorite
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity 
//           style={[styles.tab, selectedTab === 'voice' && styles.tabActive]}
//           onPress={() => setSelectedTab('voice')}
//         >
//           <Ionicons 
//             name="mic" 
//             size={24} 
//             color={selectedTab === 'voice' ? '#4a90e2' : '#666'} 
//           />
//           <Text style={[styles.tabText, selectedTab === 'voice' && styles.tabTextActive]}>
//             Voice
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Content Area */}
//       <View style={styles.content}>
//         {selectedTab === 'call' && (
//           <View style={styles.tabContent}>
//             <Text style={styles.sectionTitle}>Recent Calls</Text>
//             <View style={styles.placeholderSection}>
//               <Ionicons name="call-outline" size={48} color="#ccc" />
//               <Text style={styles.placeholderText}>No recent calls</Text>
//               <Text style={styles.placeholderSubtext}>
//                 Your call history will appear here
//               </Text>
//             </View>
//           </View>
//         )}

//         {selectedTab === 'favorite' && (
//           <View style={styles.tabContent}>
//             <Text style={styles.sectionTitle}>Favorite Contacts</Text>
//             {favoriteContacts.map(contact => (
//               <FavoriteContact key={contact.id} contact={contact} />
//             ))}
//           </View>
//         )}

//         {selectedTab === 'voice' && (
//           <View style={styles.tabContent}>
//             <Text style={styles.sectionTitle}>Voice Messages</Text>
//             {voiceMessages.map(message => (
//               <VoiceMessageItem key={message.id} message={message} />
//             ))}
//           </View>
//         )}
//       </View>

//       {/* Push to Talk Button */}
//       <View style={styles.pushToTalkContainer}>
//         <TouchableOpacity 
//           style={styles.pushToTalkButton}
//           onPress={() => {
//             Alert.alert(
//               'Push to Talk',
//               'Hold the button to start recording voice message',
//               [{ text: 'OK' }]
//             );
//           }}
//         >
//           <Ionicons name="mic" size={32} color="#fff" />
//           <Text style={styles.pushToTalkText}>PUSH TO TALK</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   appTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#000',
//     letterSpacing: 1,
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   statusLabel: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#666',
//     marginRight: 8,
//     letterSpacing: 1,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     margin: 20,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     borderRadius: 25,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#000',
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     marginHorizontal: 20,
//     borderRadius: 15,
//     padding: 5,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   tab: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     borderRadius: 10,
//   },
//   tabActive: {
//     backgroundColor: '#4a90e2',
//   },
//   tabText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#666',
//     marginLeft: 8,
//   },
//   tabTextActive: {
//     color: '#fff',
//   },
//   content: {
//     flex: 1,
//     backgroundColor: '#fff',
//     margin: 20,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     overflow: 'hidden',
//   },
//   tabContent: {
//     flex: 1,
//     padding: 15,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 15,
//   },
//   placeholderSection: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   placeholderText: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 16,
//     fontWeight: '500',
//   },
//   placeholderSubtext: {
//     fontSize: 14,
//     color: '#999',
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   contactCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//     padding: 15,
//     borderRadius: 12,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   contactAvatar: {
//     position: 'relative',
//     marginRight: 12,
//   },
//   avatarText: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#4a90e2',
//     textAlign: 'center',
//     lineHeight: 50,
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   statusIndicator: {
//     position: 'absolute',
//     bottom: 2,
//     right: 2,
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
//   online: {
//     backgroundColor: '#4cd964',
//   },
//   offline: {
//     backgroundColor: '#ff3b30',
//   },
//   contactName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000',
//     flex: 1,
//   },
//   contactStatus: {
//     fontSize: 12,
//     color: '#666',
//     marginRight: 12,
//   },
//   callIcon: {
//     padding: 8,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 20,
//   },
//   messageCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//     padding: 15,
//     borderRadius: 12,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//   },
//   messageIcon: {
//     marginRight: 12,
//   },
//   messageInfo: {
//     flex: 1,
//   },
//   messageName: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000',
//     marginBottom: 4,
//   },
//   messageDuration: {
//     fontSize: 14,
//     color: '#666',
//   },
//   messageMeta: {
//     alignItems: 'flex-end',
//   },
//   messageTime: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 4,
//   },
//   unreadBadge: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#4a90e2',
//   },
//   pushToTalkContainer: {
//     padding: 20,
//     backgroundColor: '#fff',
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//   },
//   pushToTalkButton: {
//     backgroundColor: '#4a90e2',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 20,
//     borderRadius: 30,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 8,
//   },
//   pushToTalkText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 10,
//     letterSpacing: 1,
//   },
// });

// export default CallScreen;


// _________________________________472-960________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________


// screens/CallScreen.js
// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   StatusBar,
//   ScrollView,
//   Alert,
//   TextInput,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const CallScreen = () => {
//   const [activeTab, setActiveTab] = useState('recents');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSearching, setIsSearching] = useState(false);

//   // Clean, organized data
//   const recentCalls = [
//     { id: 1, name: 'Sarah Johnson', time: '2:30 PM', type: 'outgoing', duration: '5:24', missed: false },
//     { id: 2, name: 'Mike Chen', time: '1:15 PM', type: 'incoming', duration: '0:00', missed: true },
//     { id: 3, name: 'Team Alpha', time: '12:45 PM', type: 'group', duration: '12:34', missed: false },
//     { id: 4, name: 'Emily Davis', time: 'Yesterday', type: 'incoming', duration: '3:15', missed: false },
//   ];

//   const contacts = [
//     { id: 1, name: 'Sarah Johnson', status: 'Available' },
//     { id: 2, name: 'Mike Chen', status: 'In a meeting' },
//     { id: 3, name: 'Emily Davis', status: 'Available' },
//     { id: 4, name: 'Alex Rodriguez', status: 'Away' },
//     { id: 5, name: 'Team Beta', status: '3 online' },
//   ];

//   const favorites = [
//     { id: 1, name: 'Sarah Johnson', status: 'Frequent contact' },
//     { id: 2, name: 'Team Alpha', status: 'Work group' },
//     { id: 3, name: 'Emily Davis', status: 'Close friend' },
//   ];

//   const handleCall = (contact) => {
//     Alert.alert(
//       `Call ${contact.name}`,
//       'Would you like to make a voice call?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { 
//           text: 'Call', 
//           onPress: () => {
//             Alert.alert('Calling...', `Connecting to ${contact.name}`);
//           }
//         }
//       ]
//     );
//   };

//   const handleVoiceMessage = () => {
//     Alert.alert(
//       'Voice Message',
//       'Press and hold to record a voice message',
//       [{ text: 'OK' }]
//     );
//   };

//   const CallItem = ({ item }) => (
//     <TouchableOpacity 
//       style={styles.listItem}
//       onPress={() => handleCall(item)}
//     >
//       <View style={styles.avatar}>
//         <Ionicons 
//           name={item.missed ? "call-missed" : item.type === 'incoming' ? "call-received" : "call-made"} 
//           size={20} 
//           color={item.missed ? "#FF3B30" : item.type === 'incoming' ? "#4CD964" : "#007AFF"} 
//         />
//       </View>
      
//       <View style={styles.itemContent}>
//         <Text style={[styles.name, item.missed && styles.missedText]}>
//           {item.name}
//         </Text>
//         <Text style={styles.details}>
//           {item.missed ? 'Missed call' : `${item.duration} • ${item.time}`}
//         </Text>
//       </View>
      
//       <TouchableOpacity 
//         style={styles.callButton}
//         onPress={() => handleCall(item)}
//       >
//         <Ionicons name="call-outline" size={22} color="#007AFF" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   const ContactItem = ({ item }) => (
//     <TouchableOpacity 
//       style={styles.listItem}
//       onPress={() => handleCall(item)}
//     >
//       <View style={styles.avatar}>
//         <Text style={styles.avatarText}>
//           {item.name.split(' ').map(n => n[0]).join('')}
//         </Text>
//       </View>
      
//       <View style={styles.itemContent}>
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.details}>{item.status}</Text>
//       </View>
      
//       <TouchableOpacity 
//         style={styles.callButton}
//         onPress={() => handleCall(item)}
//       >
//         <Ionicons name="call-outline" size={22} color="#007AFF" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   const FavoriteItem = ({ item }) => (
//     <TouchableOpacity 
//       style={styles.favoriteItem}
//       onPress={() => handleCall(item)}
//     >
//       <View style={styles.favoriteAvatar}>
//         <Text style={styles.favoriteAvatarText}>
//           {item.name.split(' ').map(n => n[0]).join('')}
//         </Text>
//       </View>
//       <Text style={styles.favoriteName} numberOfLines={1}>
//         {item.name.split(' ')[0]}
//       </Text>
//     </TouchableOpacity>
//   );

//   const renderContent = () => {
//     if (activeTab === 'recents') {
//       return (
//         <View style={styles.content}>
//           <Text style={styles.sectionTitle}>Recent Calls</Text>
//           {recentCalls.map(item => (
//             <CallItem key={item.id} item={item} />
//           ))}
//         </View>
//       );
//     }

//     if (activeTab === 'contacts') {
//       const filteredContacts = contacts.filter(contact =>
//         contact.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//       return (
//         <View style={styles.content}>
//           <Text style={styles.sectionTitle}>Contacts</Text>
//           {filteredContacts.map(item => (
//             <ContactItem key={item.id} item={item} />
//           ))}
//         </View>
//       );
//     }

//     if (activeTab === 'favorites') {
//       return (
//         <View style={styles.content}>
//           <Text style={styles.sectionTitle}>Favorites</Text>
//           <View style={styles.favoritesGrid}>
//             {favorites.map(item => (
//               <FavoriteItem key={item.id} item={item} />
//             ))}
//           </View>
//         </View>
//       );
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.appTitle}>Calls</Text>
//         <TouchableOpacity 
//           style={styles.searchButton}
//           onPress={() => setIsSearching(!isSearching)}
//         >
//           <Ionicons name="search" size={22} color="#007AFF" />
//         </TouchableOpacity>
//       </View>

//       {/* Search Bar */}
//       {isSearching && (
//         <View style={styles.searchContainer}>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search contacts..."
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             autoFocus
//           />
//           <TouchableOpacity onPress={() => setIsSearching(false)}>
//             <Ionicons name="close" size={22} color="#8E8E93" />
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Tab Navigation */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity 
//           style={[styles.tab, activeTab === 'recents' && styles.activeTab]}
//           onPress={() => setActiveTab('recents')}
//         >
//           <Text style={[styles.tabText, activeTab === 'recents' && styles.activeTabText]}>
//             Recents
//           </Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={[styles.tab, activeTab === 'contacts' && styles.activeTab]}
//           onPress={() => setActiveTab('contacts')}
//         >
//           <Text style={[styles.tabText, activeTab === 'contacts' && styles.activeTabText]}>
//             Contacts
//           </Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={[styles.tab, activeTab === 'favorites' && styles.activeTab]}
//           onPress={() => setActiveTab('favorites')}
//         >
//           <Text style={[styles.tabText, activeTab === 'favorites' && styles.activeTabText]}>
//             Favorites
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Main Content */}
//       <ScrollView style={styles.scrollView}>
//         {renderContent()}
//       </ScrollView>

//       {/* Action Buttons */}
//       <View style={styles.actionContainer}>
//         <TouchableOpacity 
//           style={styles.voiceMessageButton}
//           onPress={handleVoiceMessage}
//         >
//           <Ionicons name="mic" size={24} color="#007AFF" />
//           <Text style={styles.voiceMessageText}>Voice Message</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={styles.newCallButton}
//           onPress={() => Alert.alert('New Call', 'Start a new call')}
//         >
//           <Ionicons name="call" size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 16,
//     backgroundColor: '#F8F9FA',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5EA',
//   },
//   appTitle: {
//     fontSize: 34,
//     fontWeight: '700',
//     color: '#000000',
//   },
//   searchButton: {
//     padding: 8,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     backgroundColor: '#F8F9FA',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5EA',
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#000000',
//     marginRight: 12,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#F8F9FA',
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5EA',
//   },
//   tab: {
//     paddingVertical: 16,
//     paddingHorizontal: 0,
//     marginRight: 32,
//     borderBottomWidth: 3,
//     borderBottomColor: 'transparent',
//   },
//   activeTab: {
//     borderBottomColor: '#007AFF',
//   },
//   tabText: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#8E8E93',
//   },
//   activeTabText: {
//     color: '#007AFF',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   content: {
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#000000',
//     marginBottom: 16,
//   },
//   listItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F2F2F7',
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#F2F2F7',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   avatarText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#007AFF',
//   },
//   itemContent: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#000000',
//     marginBottom: 2,
//   },
//   details: {
//     fontSize: 15,
//     color: '#8E8E93',
//   },
//   missedText: {
//     color: '#FF3B30',
//   },
//   callButton: {
//     padding: 8,
//   },
//   favoritesGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginHorizontal: -8,
//   },
//   favoriteItem: {
//     alignItems: 'center',
//     width: '33.333%',
//     padding: 8,
//     marginBottom: 16,
//   },
//   favoriteAvatar: {
//     width: 64,
//     height: 64,
//     borderRadius: 32,
//     backgroundColor: '#007AFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   favoriteAvatarText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   favoriteName: {
//     fontSize: 15,
//     fontWeight: '500',
//     color: '#000000',
//     textAlign: 'center',
//   },
//   actionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#F8F9FA',
//     borderTopWidth: 1,
//     borderTopColor: '#E5E5EA',
//   },
//   voiceMessageButton: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 16,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E5E5EA',
//     marginRight: 12,
//   },
//   voiceMessageText: {
//     fontSize: 17,
//     fontWeight: '600',
//     color: '#007AFF',
//     marginLeft: 8,
//   },
//   newCallButton: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     backgroundColor: '#007AFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#007AFF',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 4,
//   },
// });

// export default CallScreen;



// ____________________________________964-_____________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________
// _________________________________________________________________________________



// screens/CallScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
  TextInput,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const CallScreen = () => {
  const [activeTab, setActiveTab] = useState('recents');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showWalkieModal, setShowWalkieModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [activeStream, setActiveStream] = useState(null);

  const recordingTimerRef = useRef(null);

  // Clean, organized data
  const recentCalls = [
    { id: 1, name: 'Sarah Johnson', time: '2:30 PM', type: 'outgoing', duration: '5:24', missed: false },
    { id: 2, name: 'Mike Chen', time: '1:15 PM', type: 'incoming', duration: '0:00', missed: true },
    { id: 3, name: 'Team Alpha', time: '12:45 PM', type: 'group', duration: '12:34', missed: false },
  ];

  const contacts = [
    { id: 1, name: 'Sarah Johnson', status: 'Available' },
    { id: 2, name: 'Mike Chen', status: 'In a meeting' },
    { id: 3, name: 'Emily Davis', status: 'Available' },
  ];

  const favorites = [
    { id: 1, name: 'Sarah Johnson', status: 'Available', online: true, type: 'contact' },
    { id: 2, name: 'Team Alpha', status: '3 online', online: true, type: 'group' },
    { id: 3, name: 'Emily Davis', status: 'Available', online: true, type: 'contact' },
    { id: 4, name: 'Mike Chen', status: 'Busy', online: false, type: 'contact' },
  ];

  const groups = [
    { id: 1, name: 'Team Alpha', members: 5, online: 3, type: 'group' },
    { id: 2, name: 'Project Beta', members: 8, online: 5, type: 'group' },
    { id: 3, name: 'Family', members: 4, online: 2, type: 'group' },
    { id: 4, name: 'Friends', members: 6, online: 4, type: 'group' },
  ];

  // Voice Message Functions
  const startVoiceRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    const timer = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 30) {
          stopVoiceRecording();
          return 30;
        }
        return prev + 1;
      });
    }, 1000);

    recordingTimerRef.current = timer;
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
    
    if (recordingTime > 0) {
      setShowVoiceModal(true);
    } else {
      Alert.alert('Too Short', 'Please record for at least 1 second');
    }
  };

  const sendToContact = (contact) => {
    setShowVoiceModal(false);
    setSelectedContact(null);
    Alert.alert(
      'Voice Message Sent',
      `Your ${recordingTime}s voice message was sent to ${contact.name}`,
      [{ text: 'OK' }]
    );
    setRecordingTime(0);
  };

  // Walkie-Talkie Functions
  const startWalkieTalkie = () => {
    setShowWalkieModal(true);
  };

  const startTalking = (target) => {
    setIsTalking(true);
    setActiveStream(target);
    Alert.alert(
      'Live Stream Started',
      `You are now live streaming to ${target.name}`,
      [
        {
          text: 'Stop',
          onPress: stopTalking,
          style: 'destructive'
        }
      ]
    );
  };

  const stopTalking = () => {
    setIsTalking(false);
    if (activeStream) {
      Alert.alert('Stream Ended', `Live stream to ${activeStream.name} ended`);
    }
    setActiveStream(null);
  };

  const handleCall = (contact) => {
    Alert.alert(
      `Call ${contact.name}`,
      'Would you like to make a voice call?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Call', 
          onPress: () => Alert.alert('Calling...', `Connecting to ${contact.name}`)
        }
      ]
    );
  };

  const CallItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.listItem}
      onPress={() => handleCall(item)}
    >
      <View style={styles.avatar}>
        <Ionicons 
          name={item.missed ? "call-missed" : item.type === 'incoming' ? "call-received" : "call-made"} 
          size={20} 
          color={item.missed ? "#FF3B30" : item.type === 'incoming' ? "#4CD964" : "#007AFF"} 
        />
      </View>
      
      <View style={styles.itemContent}>
        <Text style={[styles.name, item.missed && styles.missedText]}>
          {item.name}
        </Text>
        <Text style={styles.details}>
          {item.missed ? 'Missed call' : `${item.duration} • ${item.time}`}
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.callButton}
        onPress={() => handleCall(item)}
      >
        <Ionicons name="call-outline" size={22} color="#007AFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const ContactItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.listItem}
      onPress={() => handleCall(item)}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.name.split(' ').map(n => n[0]).join('')}
        </Text>
      </View>
      
      <View style={styles.itemContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>{item.status}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.callButton}
        onPress={() => handleCall(item)}
      >
        <Ionicons name="call-outline" size={22} color="#007AFF" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const FavoriteItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.favoriteItem}
      onPress={() => handleCall(item)}
    >
      <View style={styles.favoriteAvatar}>
        <Ionicons 
          name={item.type === 'group' ? "people" : "person"} 
          size={20} 
          color="#FFFFFF" 
        />
        {item.online && <View style={styles.onlineIndicator} />}
      </View>
      <Text style={styles.favoriteName} numberOfLines={1}>
        {item.name.split(' ')[0]}
      </Text>
    </TouchableOpacity>
  );

  const VoiceContactItem = ({ item, isSelected, onSelect }) => (
    <TouchableOpacity 
      style={[
        styles.voiceContactItem,
        isSelected && styles.voiceContactItemSelected
      ]}
      onPress={() => onSelect(item)}
    >
      <View style={styles.voiceContactAvatar}>
        <Ionicons 
          name={item.type === 'group' ? "people" : "person"} 
          size={20} 
          color="#FFFFFF" 
        />
        {item.online && <View style={styles.voiceOnlineIndicator} />}
      </View>
      <Text style={styles.voiceContactName} numberOfLines={1}>
        {item.name.split(' ')[0]}
      </Text>
    </TouchableOpacity>
  );

  const WalkieContactItem = ({ item, isActive, onPress }) => (
    <TouchableOpacity 
      style={[
        styles.walkieContactItem,
        isActive && styles.walkieContactItemActive
      ]}
      onPress={() => onPress(item)}
    >
      <View style={styles.walkieContactAvatar}>
        <Ionicons 
          name={item.type === 'group' ? "people" : "person"} 
          size={24} 
          color="#FFFFFF" 
        />
        {item.online && <View style={styles.walkieOnlineIndicator} />}
      </View>
      <View style={styles.walkieContactInfo}>
        <Text style={styles.walkieContactName}>{item.name}</Text>
        <Text style={styles.walkieContactStatus}>
          {item.type === 'group' ? `${item.online || item.members} members` : item.status}
        </Text>
      </View>
      <View style={[
        styles.walkieStatus,
        isActive && styles.walkieStatusActive
      ]}>
        <Ionicons 
          name={isActive ? "radio-button-on" : "radio-button-off"} 
          size={20} 
          color={isActive ? "#4CD964" : "#C7C7CC"} 
        />
      </View>
    </TouchableOpacity>
  );

  const renderContent = () => {
    if (activeTab === 'recents') {
      return (
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Recent Calls</Text>
          {recentCalls.map(item => (
            <CallItem key={item.id} item={item} />
          ))}
        </View>
      );
    }

    if (activeTab === 'contacts') {
      const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return (
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Contacts</Text>
          {filteredContacts.map(item => (
            <ContactItem key={item.id} item={item} />
          ))}
        </View>
      );
    }

    if (activeTab === 'favorites') {
      return (
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Favorites</Text>
          <View style={styles.favoritesGrid}>
            {favorites.map(item => (
              <FavoriteItem key={item.id} item={item} />
            ))}
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>Calls</Text>
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={() => setIsSearching(!isSearching)}
        >
          <Ionicons name="search" size={22} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      {isSearching && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          <TouchableOpacity onPress={() => setIsSearching(false)}>
            <Ionicons name="close" size={22} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      )}

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'recents' && styles.activeTab]}
          onPress={() => setActiveTab('recents')}
        >
          <Text style={[styles.tabText, activeTab === 'recents' && styles.activeTabText]}>
            Recents
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'contacts' && styles.activeTab]}
          onPress={() => setActiveTab('contacts')}
        >
          <Text style={[styles.tabText, activeTab === 'contacts' && styles.activeTabText]}>
            Contacts
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'favorites' && styles.activeTab]}
          onPress={() => setActiveTab('favorites')}
        >
          <Text style={[styles.tabText, activeTab === 'favorites' && styles.activeTabText]}>
            Favorites
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.scrollView}>
        {renderContent()}
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={[
            styles.voiceMessageButton,
            isRecording && styles.recordingButton
          ]}
          onPressIn={startVoiceRecording}
          onPressOut={stopVoiceRecording}
          delayLongPress={100}
        >
          <Ionicons 
            name={isRecording ? "mic" : "mic-outline"} 
            size={24} 
            color={isRecording ? "#FFFFFF" : "#007AFF"} 
          />
          <Text style={[
            styles.voiceMessageText,
            isRecording && styles.recordingButtonText
          ]}>
            {isRecording ? `Recording... ${recordingTime}s` : 'Hold for Voice'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.walkieTalkieButton}
          onPress={startWalkieTalkie}
        >
          <Ionicons name="radio" size={24} color="#FFFFFF" />
          <Text style={styles.walkieTalkieText}>Walkie-Talkie</Text>
        </TouchableOpacity>
      </View>

      {/* Voice Message Modal */}
      <Modal
        visible={showVoiceModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowVoiceModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Send Voice Message</Text>
              <Text style={styles.modalSubtitle}>
                Select a contact to send your {recordingTime}s message
              </Text>
            </View>

            <View style={styles.voicePreview}>
              <View style={styles.voiceWave}>
                <View style={styles.voiceWaveBar} />
                <View style={styles.voiceWaveBar} />
                <View style={styles.voiceWaveBar} />
                <View style={styles.voiceWaveBar} />
                <View style={styles.voiceWaveBar} />
              </View>
              <Text style={styles.voiceDuration}>{recordingTime}s</Text>
              <TouchableOpacity style={styles.playButton}>
                <Ionicons name="play" size={20} color="#007AFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.contactsGrid}>
              <Text style={styles.contactsTitle}>Send To</Text>
              <View style={styles.contactsRow}>
                {favorites.slice(0, 3).map(contact => (
                  <VoiceContactItem 
                    key={contact.id}
                    item={contact}
                    isSelected={selectedContact?.id === contact.id}
                    onSelect={setSelectedContact}
                  />
                ))}
              </View>
              <View style={styles.contactsRow}>
                {favorites.slice(3, 6).map(contact => (
                  <VoiceContactItem 
                    key={contact.id}
                    item={contact}
                    isSelected={selectedContact?.id === contact.id}
                    onSelect={setSelectedContact}
                  />
                ))}
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowVoiceModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.sendButton,
                  !selectedContact && styles.sendButtonDisabled
                ]}
                onPress={() => selectedContact && sendToContact(selectedContact)}
                disabled={!selectedContact}
              >
                <Ionicons name="send" size={20} color="#FFFFFF" />
                <Text style={styles.sendButtonText}>
                  Send to {selectedContact?.name.split(' ')[0] || 'Contact'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Walkie-Talkie Modal */}
      <Modal
        visible={showWalkieModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowWalkieModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Walkie-Talkie</Text>
              <Text style={styles.modalSubtitle}>
                Select a contact or group to start live streaming
              </Text>
            </View>

            {/* Active Stream Indicator */}
            {activeStream && (
              <View style={styles.activeStreamIndicator}>
                <View style={styles.liveIndicator}>
                  <View style={styles.livePulse} />
                  <Text style={styles.liveText}>LIVE</Text>
                </View>
                <Text style={styles.streamingText}>
                  Streaming to {activeStream.name}
                </Text>
                <TouchableOpacity 
                  style={styles.stopStreamButton}
                  onPress={stopTalking}
                >
                  <Ionicons name="square" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            )}

            {/* Push to Talk Button */}
            <TouchableOpacity 
              style={[
                styles.pushToTalkButton,
                isTalking && styles.pushToTalkButtonActive
              ]}
              onPressIn={() => activeStream && startTalking(activeStream)}
              onPressOut={stopTalking}
              disabled={!activeStream}
            >
              <Ionicons 
                name={isTalking ? "mic" : "mic-outline"} 
                size={32} 
                color="#FFFFFF" 
              />
              <Text style={styles.pushToTalkText}>
                {isTalking ? 'Talking...' : 'Push to Talk'}
              </Text>
            </TouchableOpacity>

            {/* Tabs for Contacts and Groups */}
            <View style={styles.walkieTabs}>
              <TouchableOpacity 
                style={[styles.walkieTab, !selectedGroup && styles.walkieTabActive]}
                onPress={() => setSelectedGroup(null)}
              >
                <Text style={[
                  styles.walkieTabText,
                  !selectedGroup && styles.walkieTabTextActive
                ]}>
                  Favorite Contacts
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.walkieTab, selectedGroup && styles.walkieTabActive]}
                onPress={() => setSelectedGroup(true)}
              >
                <Text style={[
                  styles.walkieTabText,
                  selectedGroup && styles.walkieTabTextActive
                ]}>
                  Groups
                </Text>
              </TouchableOpacity>
            </View>

            {/* Contacts/Groups List */}
            <ScrollView style={styles.walkieList}>
              {!selectedGroup ? (
                // Favorite Contacts
                <View>
                  <Text style={styles.walkieSectionTitle}>Favorite Contacts</Text>
                  {favorites.filter(f => f.type === 'contact').map(contact => (
                    <WalkieContactItem 
                      key={contact.id}
                      item={contact}
                      isActive={activeStream?.id === contact.id}
                      onPress={(item) => setActiveStream(item)}
                    />
                  ))}
                </View>
              ) : (
                // Groups
                <View>
                  <Text style={styles.walkieSectionTitle}>Groups</Text>
                  {groups.map(group => (
                    <WalkieContactItem 
                      key={group.id}
                      item={group}
                      isActive={activeStream?.id === group.id}
                      onPress={(item) => setActiveStream(item)}
                    />
                  ))}
                </View>
              )}
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => {
                  setShowWalkieModal(false);
                  stopTalking();
                }}
              >
                <Text style={styles.cancelButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  appTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000000',
  },
  searchButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    marginRight: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 0,
    marginRight: 32,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#8E8E93',
  },
  activeTabText: {
    color: '#007AFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  itemContent: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  details: {
    fontSize: 15,
    color: '#8E8E93',
  },
  missedText: {
    color: '#FF3B30',
  },
  callButton: {
    padding: 8,
  },
  favoritesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  favoriteItem: {
    alignItems: 'center',
    width: '33.333%',
    padding: 8,
    marginBottom: 16,
  },
  favoriteAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CD964',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  favoriteName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  voiceMessageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginRight: 12,
  },
  recordingButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  voiceMessageText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 8,
  },
  recordingButtonText: {
    color: '#FFFFFF',
  },
  walkieTalkieButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#FF9500',
    borderRadius: 12,
    marginLeft: 12,
  },
  walkieTalkieText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    minHeight: height * 0.7,
    maxHeight: height * 0.9,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
  },
  voicePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  voiceWave: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  voiceWaveBar: {
    width: 3,
    height: 20,
    backgroundColor: '#007AFF',
    marginHorizontal: 2,
    borderRadius: 2,
  },
  voiceDuration: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginRight: 12,
  },
  playButton: {
    padding: 8,
  },
  contactsGrid: {
    marginBottom: 24,
  },
  contactsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  contactsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  voiceContactItem: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
  },
  voiceContactItemSelected: {
    backgroundColor: '#007AFF',
  },
  voiceContactAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  voiceOnlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CD964',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  voiceContactName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F2F2F7',
    marginRight: 12,
  },
  cancelButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#007AFF',
  },
  sendButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#007AFF',
  },
  sendButtonDisabled: {
    backgroundColor: '#C7C7CC',
  },
  sendButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  // Walkie-Talkie Specific Styles
  activeStreamIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CD964',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  livePulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    marginRight: 4,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FF3B30',
  },
  streamingText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  stopStreamButton: {
    padding: 8,
    backgroundColor: '#FF3B30',
    borderRadius: 6,
  },
  pushToTalkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    marginBottom: 20,
  },
  pushToTalkButtonActive: {
    backgroundColor: '#4CD964',
  },
  pushToTalkText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  walkieTabs: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  walkieTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  walkieTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  walkieTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  walkieTabTextActive: {
    color: '#007AFF',
  },
  walkieList: {
    flex: 1,
    marginBottom: 20,
  },
  walkieSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  walkieContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 8,
  },
  walkieContactItemActive: {
    backgroundColor: '#E3F2FD',
    borderColor: '#007AFF',
    borderWidth: 1,
  },
  walkieContactAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  walkieOnlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CD964',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  walkieContactInfo: {
    flex: 1,
  },
  walkieContactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  walkieContactStatus: {
    fontSize: 14,
    color: '#8E8E93',
  },
  walkieStatus: {
    padding: 4,
  },
  walkieStatusActive: {
    // Already handled by icon color
  },
});

export default CallScreen;