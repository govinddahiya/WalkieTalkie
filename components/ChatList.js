// components/ChatList.js
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ChatItem from './ChatItem';

const ChatList = () => {
  // Chat data matching the design
  const chatItems = [
    { 
      id: 1, 
      name: 'Sarah K', 
      group: 'Team Alpha', 
      status: 'Road to Talk', 
      time: '402:3',
      unread: false
    },
    { 
      id: 2, 
      name: 'Sarah S', 
      status: 'Road to Talk', 
      time: '101:3',
      unread: false
    },
    { 
      id: 3, 
      name: 'Garah S', 
      status: 'Road to Talk', 
      time: '101:3',
      unread: false
    },
    { 
      id: 4, 
      name: 'Sechnats', 
      status: 'Road to Talk', 
      time: '88:2',
      unread: false
    },
  ];

  return (
    <ScrollView 
      style={styles.chatList}
      showsVerticalScrollIndicator={false}
    >
      {chatItems.map(item => (
        <ChatItem key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chatList: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ChatList;