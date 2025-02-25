import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Avatar, IconButton, Menu } from 'react-native-paper';
import { stories, posts } from '../fakeData';
import { LinearGradient } from 'expo-linear-gradient';
import { Image as RNImage } from 'react-native';
import kingOfRoads from '../../assets/fakeUserAvatar/kingOfRoads.png';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';

const HomeScreen = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const renderStoryRing = ({ children }) => (
    <LinearGradient
      colors={['#FF3366', '#FF9933', '#FF3366']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.storyRing}
    >
      <View style={styles.storyImageContainer}>
        {children}
      </View>
    </LinearGradient>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent={true} />
      
      {/* Header */}
      <View style={styles.header}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu} style={styles.logoContainer}>
              <Text style={styles.logo}>MotoSocial</Text>
            </TouchableOpacity>
          }
          style={styles.menu}
        >
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigation.navigate('Settings');
            }}
            title="Paramètres"
          />
          <Menu.Item
            onPress={() => {
              closeMenu();
              navigation.navigate('Favorites');
            }}
            title="Favoris"
          />
        </Menu>
        <View style={styles.headerIcons}>
        <IconButton
            icon="plus-box-outline"
            size={24}
            color="#262626"
            onPress={() => navigation.navigate('AddRide')} // Naviguer vers la page de création de sortie
          />
          <IconButton icon="heart-outline" size={24} color="#262626" />
          <IconButton icon="facebook-messenger" size={24} color="#262626" />
        </View>
      </View>

      {/* Stories */}
      <ScrollView
        horizontal
        style={styles.stories}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storiesContent}
      >
        {/* Your Story */}
        <TouchableOpacity style={styles.story}>
          <View style={styles.yourStoryContainer}>
            <Avatar.Image
              size={64}
              source={kingOfRoads}
              style={styles.storyImage}
            />
            <View style={styles.addStoryButton}>
              <Text style={styles.plusIcon}>+</Text>
            </View>
          </View>
          <Text style={styles.storyUsername}>Your Story</Text>
        </TouchableOpacity>

        {/* Other Stories */}
        {stories.map((story) => (
          <TouchableOpacity key={story.id} style={styles.story}>
            {renderStoryRing({
              children: (
                <Avatar.Image
                  size={64}
                  source={RNImage.resolveAssetSource(story.image)}
                  style={styles.storyImage}
                />
              ),
            })}
            <Text style={styles.storyUsername} numberOfLines={1}>
              {story.username}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Feed */}
      <ScrollView style={styles.feed}>
        {posts.map((post) => (
          <View key={post.id} style={styles.post}>
            <View style={styles.postHeader}>
              <View style={styles.postHeaderLeft}>
                <Avatar.Image
                  size={40}
                  source={RNImage.resolveAssetSource(post.avatar)}
                  style={styles.postAvatar}
                />
                <Text style={styles.postUsername}>{post.username}</Text>
              </View>
              <IconButton icon="dots-vertical" size={20} color="#262626" />
            </View>

            <Image
              source={post.image}
              style={styles.postImage}
              resizeMode="cover"
            />

            <View style={styles.postActions}>
              <View style={styles.postActionsLeft}>
                <IconButton icon="heart-outline" size={26} color="#262626" />
                <IconButton icon="comment-outline" size={26} color="#262626" />
                <IconButton icon="send-outline" size={26} color="#262626" />
              </View>
              <IconButton icon="bookmark-outline" size={26} color="#262626" />
            </View>

            <View style={styles.postContent}>
              <Text style={styles.likesCount}>{post.likes.toLocaleString()} likes</Text>
              <View style={styles.captionContainer}>
                <Text style={styles.postUsername}>{post.username}</Text>
                <Text style={styles.postDescription}> {post.description}</Text>
              </View>
              <Text style={styles.viewComments}>
                View all {post.comments} comments
              </Text>
              <Text style={styles.timeAgo}>2 HOURS AGO</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 35,
  },
  header: {
    height: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    zIndex: 1000,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif-medium',
    fontSize: 25,
    fontWeight: '500',
  },
  menu: {
    marginTop: 50,
    zIndex: 1000,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  stories: {
    height: 13,
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
    marginTop: -220,
    marginBottom: -220,
  },
  storiesContent: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  story: {
    width: 72,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  storyRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImageContainer: {
    backgroundColor: 'white',
    borderRadius: 34,
    padding: 2,
  },
  yourStoryContainer: {
    position: 'relative',
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addStoryButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0095F6',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  plusIcon: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  storyUsername: {
    marginTop: 4,
    fontSize: 12,
    color: '#262626',
    textAlign: 'center',
    width: 64,
  },
  feed: {
    flex: 1,
    marginTop: 0,
  },
  post: {
    marginBottom: 8,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  postHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  postUsername: {
    fontWeight: '600',
    fontSize: 13,
    color: '#262626',
    marginLeft: 5,
  },
  postImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  postActionsLeft: {
    flexDirection: 'row',
  },
  postContent: {
    paddingHorizontal: 15,
  },
  likesCount: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 6,
  },
  captionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postDescription: {
    fontSize: 14,
    color: '#262626',
  },
  viewComments: {
    color: '#8E8E8E',
    fontSize: 14,
    marginTop: 6,
  },
  timeAgo: {
    fontSize: 10,
    color: '#8E8E8E',
    marginTop: 6,
    textTransform: 'uppercase',
  },
});

export default HomeScreen; 