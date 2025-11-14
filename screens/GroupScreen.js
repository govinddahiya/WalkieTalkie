// screens/GroupScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
  Modal,
  Image,
  Switch,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GroupScreen = () => {
  const [activeTab, setActiveTab] = useState('myGroups');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Team Alpha',
      description: 'Work collaboration group',
      members: 8,
      online: 5,
      image: null,
      isPublic: true,
      createdBy: 'You',
      createdAt: '2024-01-15',
      membersList: [
        { id: 1, name: 'You', role: 'admin', online: true, avatar: 'Y' },
        { id: 2, name: 'Sarah Johnson', role: 'member', online: true, avatar: 'SJ' },
        { id: 3, name: 'Mike Chen', role: 'member', online: false, avatar: 'MC' },
        { id: 4, name: 'Emily Davis', role: 'member', online: true, avatar: 'ED' },
      ]
    },
    {
      id: 2,
      name: 'Family Chat',
      description: 'Family updates and coordination',
      members: 4,
      online: 2,
      image: null,
      isPublic: false,
      createdBy: 'You',
      createdAt: '2024-01-10',
      membersList: [
        { id: 1, name: 'You', role: 'admin', online: true, avatar: 'Y' },
        { id: 2, name: 'Mom', role: 'member', online: true, avatar: 'M' },
        { id: 3, name: 'Dad', role: 'member', online: false, avatar: 'D' },
        { id: 4, name: 'Sister', role: 'member', online: false, avatar: 'S' },
      ]
    },
    {
      id: 3,
      name: 'Gaming Squad',
      description: 'For gaming sessions and updates',
      members: 6,
      online: 3,
      image: null,
      isPublic: true,
      createdBy: 'Alex Rodriguez',
      createdAt: '2024-01-20',
      membersList: [
        { id: 1, name: 'Alex Rodriguez', role: 'admin', online: true, avatar: 'AR' },
        { id: 2, name: 'You', role: 'member', online: true, avatar: 'Y' },
        { id: 3, name: 'Tom Wilson', role: 'member', online: true, avatar: 'TW' },
      ]
    },
  ]);

  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    isPublic: true,
    members: [],
  });

  const suggestedContacts = [
    { id: 1, name: 'Sarah Johnson', selected: false, avatar: 'SJ' },
    { id: 2, name: 'Mike Chen', selected: false, avatar: 'MC' },
    { id: 3, name: 'Emily Davis', selected: false, avatar: 'ED' },
    { id: 4, name: 'Alex Rodriguez', selected: false, avatar: 'AR' },
    { id: 5, name: 'Lisa Wang', selected: false, avatar: 'LW' },
  ];

  const handleCreateGroup = () => {
    if (!newGroup.name.trim()) {
      Alert.alert('Error', 'Please enter a group name');
      return;
    }

    const group = {
      id: groups.length + 1,
      name: newGroup.name,
      description: newGroup.description,
      members: 1 + newGroup.members.length,
      online: 1,
      image: null,
      isPublic: newGroup.isPublic,
      createdBy: 'You',
      createdAt: new Date().toISOString().split('T')[0],
      membersList: [
        { id: 1, name: 'You', role: 'admin', online: true, avatar: 'Y' },
        ...newGroup.members.map(member => ({
          ...member,
          role: 'member',
          online: Math.random() > 0.5
        }))
      ]
    };

    setGroups([group, ...groups]);
    setNewGroup({ name: '', description: '', isPublic: true, members: [] });
    setShowCreateModal(false);
    Alert.alert('Success', `Group "${group.name}" created successfully!`);
  };

  const handleLeaveGroup = (group) => {
    Alert.alert(
      'Leave Group',
      `Are you sure you want to leave "${group.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: () => {
            setGroups(groups.filter(g => g.id !== group.id));
            setShowGroupDetails(false);
            Alert.alert('Left Group', `You left ${group.name}`);
          }
        }
      ]
    );
  };

  const handleDeleteGroup = (group) => {
    Alert.alert(
      'Delete Group',
      `Are you sure you want to delete "${group.name}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setGroups(groups.filter(g => g.id !== group.id));
            setShowGroupDetails(false);
            Alert.alert('Deleted', `Group "${group.name}" has been deleted`);
          }
        }
      ]
    );
  };

  const toggleContactSelection = (contact) => {
    setNewGroup(prev => {
      const isSelected = prev.members.some(m => m.id === contact.id);
      if (isSelected) {
        return {
          ...prev,
          members: prev.members.filter(m => m.id !== contact.id)
        };
      } else {
        return {
          ...prev,
          members: [...prev.members, { ...contact, selected: true }]
        };
      }
    });
  };

  const GroupItem = ({ group }) => (
    <TouchableOpacity 
      style={styles.groupItem}
      onPress={() => {
        setSelectedGroup(group);
        setShowGroupDetails(true);
      }}
    >
      <View style={styles.groupAvatar}>
        <Ionicons name="people" size={24} color="#FFFFFF" />
        <View style={styles.onlineBadge}>
          <Text style={styles.onlineBadgeText}>{group.online}</Text>
        </View>
      </View>
      
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{group.name}</Text>
        <Text style={styles.groupDescription}>{group.description}</Text>
        <View style={styles.groupMeta}>
          <Text style={styles.groupMembers}>{group.members} members</Text>
          <Text style={styles.groupType}>
            {group.isPublic ? 'Public' : 'Private'}
          </Text>
        </View>
      </View>
      
      <View style={styles.groupStatus}>
        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
      </View>
    </TouchableOpacity>
  );

  const MemberItem = ({ member, isAdmin }) => (
    <View style={styles.memberItem}>
      <View style={styles.memberAvatar}>
        <Text style={styles.memberAvatarText}>{member.avatar}</Text>
        {member.online && <View style={styles.memberOnlineIndicator} />}
      </View>
      
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>
          {member.name} {member.role === 'admin' && '(Admin)'}
        </Text>
        <Text style={styles.memberStatus}>
          {member.online ? 'Online' : 'Offline'}
        </Text>
      </View>
      
      {isAdmin && member.role !== 'admin' && (
        <TouchableOpacity style={styles.removeButton}>
          <Ionicons name="close" size={20} color="#FF3B30" />
        </TouchableOpacity>
      )}
    </View>
  );

  const ContactItem = ({ contact }) => {
    const isSelected = newGroup.members.some(m => m.id === contact.id);
    
    return (
      <TouchableOpacity 
        style={[styles.contactItem, isSelected && styles.contactItemSelected]}
        onPress={() => toggleContactSelection(contact)}
      >
        <View style={styles.contactAvatar}>
          <Text style={styles.contactAvatarText}>{contact.avatar}</Text>
        </View>
        
        <Text style={styles.contactName}>{contact.name}</Text>
        
        <View style={styles.contactSelection}>
          {isSelected ? (
            <Ionicons name="checkmark-circle" size={24} color="#007AFF" />
          ) : (
            <Ionicons name="ellipse-outline" size={24} color="#C7C7CC" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Groups</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Ionicons name="add" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search groups..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#8E8E93"
        />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'myGroups' && styles.activeTab]}
          onPress={() => setActiveTab('myGroups')}
        >
          <Text style={[styles.tabText, activeTab === 'myGroups' && styles.activeTabText]}>
            My Groups
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'discover' && styles.activeTab]}
          onPress={() => setActiveTab('discover')}
        >
          <Text style={[styles.tabText, activeTab === 'discover' && styles.activeTabText]}>
            Discover
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'invites' && styles.activeTab]}
          onPress={() => setActiveTab('invites')}
        >
          <Text style={[styles.tabText, activeTab === 'invites' && styles.activeTabText]}>
            Invites
          </Text>
        </TouchableOpacity>
      </View>

      {/* Groups List */}
      <FlatList
        data={groups.filter(group => 
          group.name.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        renderItem={({ item }) => <GroupItem group={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.groupsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color="#C7C7CC" />
            <Text style={styles.emptyStateTitle}>No groups found</Text>
            <Text style={styles.emptyStateText}>
              {searchQuery ? 'Try a different search' : 'Create your first group to get started'}
            </Text>
          </View>
        }
      />

      {/* Create Group Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowCreateModal(false)}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Create New Group</Text>
            <TouchableOpacity 
              style={styles.modalActionButton}
              onPress={handleCreateGroup}
            >
              <Text style={styles.modalActionText}>Create</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {/* Group Avatar */}
            <TouchableOpacity style={styles.avatarUpload}>
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="camera" size={32} color="#C7C7CC" />
                <Text style={styles.avatarText}>Add Photo</Text>
              </View>
            </TouchableOpacity>

            {/* Group Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Group Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter group name"
                value={newGroup.name}
                onChangeText={(text) => setNewGroup(prev => ({ ...prev, name: text }))}
                maxLength={50}
              />
            </View>

            {/* Group Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description (Optional)</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="What's this group about?"
                value={newGroup.description}
                onChangeText={(text) => setNewGroup(prev => ({ ...prev, description: text }))}
                multiline
                numberOfLines={3}
                maxLength={200}
              />
            </View>

            {/* Privacy Settings */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Group Type</Text>
              <View style={styles.privacyOptions}>
                <TouchableOpacity 
                  style={[styles.privacyOption, newGroup.isPublic && styles.privacyOptionActive]}
                  onPress={() => setNewGroup(prev => ({ ...prev, isPublic: true }))}
                >
                  <Ionicons 
                    name="globe" 
                    size={20} 
                    color={newGroup.isPublic ? "#007AFF" : "#8E8E93"} 
                  />
                  <Text style={[
                    styles.privacyOptionText,
                    newGroup.isPublic && styles.privacyOptionTextActive
                  ]}>
                    Public
                  </Text>
                  <Text style={styles.privacyOptionDescription}>
                    Anyone can find and join
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.privacyOption, !newGroup.isPublic && styles.privacyOptionActive]}
                  onPress={() => setNewGroup(prev => ({ ...prev, isPublic: false }))}
                >
                  <Ionicons 
                    name="lock-closed" 
                    size={20} 
                    color={!newGroup.isPublic ? "#007AFF" : "#8E8E93"} 
                  />
                  <Text style={[
                    styles.privacyOptionText,
                    !newGroup.isPublic && styles.privacyOptionTextActive
                  ]}>
                    Private
                  </Text>
                  <Text style={styles.privacyOptionDescription}>
                    Only invited members can join
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Add Members */}
            <View style={styles.inputGroup}>
              <View style={styles.membersHeader}>
                <Text style={styles.inputLabel}>Add Members</Text>
                <Text style={styles.membersCount}>
                  {newGroup.members.length} selected
                </Text>
              </View>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.selectedMembers}
              >
                {newGroup.members.map(member => (
                  <View key={member.id} style={styles.selectedMember}>
                    <View style={styles.selectedMemberAvatar}>
                      <Text style={styles.selectedMemberAvatarText}>
                        {member.avatar}
                      </Text>
                    </View>
                    <Text style={styles.selectedMemberName}>
                      {member.name.split(' ')[0]}
                    </Text>
                  </View>
                ))}
              </ScrollView>

              <Text style={styles.sectionTitle}>Suggested Contacts</Text>
              {suggestedContacts.map(contact => (
                <ContactItem key={contact.id} contact={contact} />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Group Details Modal */}
      <Modal
        visible={showGroupDetails}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowGroupDetails(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowGroupDetails(false)}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Group Info</Text>
            <View style={styles.modalActionButton} />
          </View>

          {selectedGroup && (
            <ScrollView style={styles.modalContent}>
              {/* Group Header */}
              <View style={styles.groupHeader}>
                <View style={styles.groupDetailAvatar}>
                  <Ionicons name="people" size={40} color="#FFFFFF" />
                </View>
                <Text style={styles.groupDetailName}>{selectedGroup.name}</Text>
                <Text style={styles.groupDetailDescription}>
                  {selectedGroup.description}
                </Text>
                <View style={styles.groupDetailMeta}>
                  <Text style={styles.groupDetailMembers}>
                    {selectedGroup.members} members • {selectedGroup.online} online
                  </Text>
                  <Text style={styles.groupDetailType}>
                    {selectedGroup.isPublic ? 'Public Group' : 'Private Group'}
                  </Text>
                </View>
              </View>

              {/* Quick Actions */}
              <View style={styles.quickActions}>
                <TouchableOpacity style={styles.quickAction}>
                  <Ionicons name="chatbubble" size={24} color="#007AFF" />
                  <Text style={styles.quickActionText}>Message</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.quickAction}>
                  <Ionicons name="call" size={24} color="#007AFF" />
                  <Text style={styles.quickActionText}>Voice Call</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.quickAction}
                  onPress={() => setShowInviteModal(true)}
                >
                  <Ionicons name="person-add" size={24} color="#007AFF" />
                  <Text style={styles.quickActionText}>Invite</Text>
                </TouchableOpacity>
              </View>

              {/* Members List */}
              <View style={styles.membersSection}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    Members ({selectedGroup.membersList.length})
                  </Text>
                  <TouchableOpacity>
                    <Text style={styles.seeAllText}>See All</Text>
                  </TouchableOpacity>
                </View>
                
                {selectedGroup.membersList.map(member => (
                  <MemberItem 
                    key={member.id} 
                    member={member}
                    isAdmin={selectedGroup.createdBy === 'You'}
                  />
                ))}
              </View>

              {/* Group Settings */}
              <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>Group Settings</Text>
                
                <TouchableOpacity style={styles.settingItem}>
                  <Ionicons name="notifications" size={22} color="#000" />
                  <Text style={styles.settingText}>Notifications</Text>
                  <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem}>
                  <Ionicons name="image" size={22} color="#000" />
                  <Text style={styles.settingText}>Media & Files</Text>
                  <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                {selectedGroup.createdBy === 'You' && (
                  <TouchableOpacity style={styles.settingItem}>
                    <Ionicons name="settings" size={22} color="#000" />
                    <Text style={styles.settingText}>Edit Group</Text>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                  </TouchableOpacity>
                )}
              </View>

              {/* Danger Zone */}
              <View style={styles.dangerSection}>
                {selectedGroup.createdBy === 'You' ? (
                  <TouchableOpacity 
                    style={[styles.dangerButton, styles.deleteButton]}
                    onPress={() => handleDeleteGroup(selectedGroup)}
                  >
                    <Ionicons name="trash" size={20} color="#FF3B30" />
                    <Text style={[styles.dangerButtonText, styles.deleteButtonText]}>
                      Delete Group
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity 
                    style={[styles.dangerButton, styles.leaveButton]}
                    onPress={() => handleLeaveGroup(selectedGroup)}
                  >
                    <Ionicons name="exit" size={20} color="#FF3B30" />
                    <Text style={[styles.dangerButtonText, styles.leaveButtonText]}>
                      Leave Group
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000000',
  },
  createButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
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
  groupsList: {
    padding: 20,
    paddingTop: 0,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  groupAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    position: 'relative',
  },
  onlineBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#4CD964',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
  },
  onlineBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 6,
  },
  groupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupMembers: {
    fontSize: 13,
    color: '#8E8E93',
    marginRight: 12,
  },
  groupType: {
    fontSize: 13,
    color: '#8E8E93',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  groupStatus: {
    padding: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  modalCloseButton: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  modalActionButton: {
    padding: 4,
  },
  modalActionText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#007AFF',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  avatarUpload: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderStyle: 'dashed',
  },
  avatarText: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
    color: '#000000',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  privacyOptions: {
    flexDirection: 'row',
    marginHorizontal: -6,
  },
  privacyOption: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 6,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#F2F2F7',
    backgroundColor: '#F8F9FA',
  },
  privacyOptionActive: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  privacyOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 8,
    marginBottom: 4,
  },
  privacyOptionTextActive: {
    color: '#007AFF',
  },
  privacyOptionDescription: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
  membersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  membersCount: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  selectedMembers: {
    marginBottom: 16,
  },
  selectedMember: {
    alignItems: 'center',
    marginRight: 16,
  },
  selectedMemberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  selectedMemberAvatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedMemberName: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  contactItemSelected: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginHorizontal: -8,
    paddingHorizontal: 8,
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactAvatarText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  contactName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  contactSelection: {
    padding: 4,
  },
  // Group Details Styles
  groupHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
    marginBottom: 20,
  },
  groupDetailAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  groupDetailName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  groupDetailDescription: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 20,
  },
  groupDetailMeta: {
    alignItems: 'center',
  },
  groupDetailMembers: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  groupDetailType: {
    fontSize: 14,
    color: '#8E8E93',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  quickAction: {
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
    marginTop: 8,
  },
  membersSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  memberAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  memberAvatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  memberOnlineIndicator: {
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
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 2,
  },
  memberStatus: {
    fontSize: 14,
    color: '#8E8E93',
  },
  removeButton: {
    padding: 8,
  },
  settingsSection: {
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginLeft: 12,
  },
  dangerSection: {
    marginBottom: 32,
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  leaveButton: {
    borderColor: '#FF3B30',
    backgroundColor: 'transparent',
  },
  deleteButton: {
    borderColor: '#FF3B30',
    backgroundColor: '#FF3B30',
  },
  dangerButtonText: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 8,
  },
  leaveButtonText: {
    color: '#FF3B30',
  },
  deleteButtonText: {
    color: '#FFFFFF',
  },
});

export default GroupScreen;