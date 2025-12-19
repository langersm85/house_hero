
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import TabBarIcon from '@/components/TabBarIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  // Use solid colors instead of semi-transparent to ensure visibility
  const inactiveColor = colorScheme === 'dark' ? '#8E8E93' : '#8E8E93';
  const activeColor = '#007AFF';

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarIcon: ({ color, focused }) => {
          // Always provide a fallback color to ensure icon is never transparent
          const resolvedColor = color || inactiveColor;
          
          let symbol = '';
          if (route.name === '(home)') {
            symbol = focused ? 'house.fill' : 'house';
          } else if (route.name === 'profile') {
            symbol = focused ? 'person.fill' : 'person';
          } else if (route.name === 'tasks') {
            symbol = focused ? 'list.bullet.clipboard.fill' : 'list.bullet.clipboard';
          }
          
          // Always return an icon, never conditional
          return <TabBarIcon name={symbol} color={resolvedColor} size={24} />;
        },
        // Remove excess padding from tab items
        tabBarItemStyle: {
          paddingHorizontal: 0,
        },
        // Reduce horizontal padding in the tab bar
        tabBarStyle: {
          paddingHorizontal: 8,
        },
      })}>
      <Tabs.Screen name="(home)" options={{ title: 'Home' }} />
      <Tabs.Screen name="tasks" options={{ title: 'Tasks' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
