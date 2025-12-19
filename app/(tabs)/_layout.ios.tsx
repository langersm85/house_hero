
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import SymbolView from 'expo-symbols';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const inactiveColor = colorScheme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: inactiveColor,
        tabBarIcon: ({ color, focused }) => {
          let symbol = '';
          if (route.name === '(home)') {
            symbol = focused ? 'house.fill' : 'house';
          } else if (route.name === 'profile') {
            symbol = focused ? 'person.fill' : 'person';
          } else if (route.name === 'tasks') {
            symbol = focused ? 'list.bullet.clipboard.fill' : 'list.bullet.clipboard';
          }
          return <SymbolView size={24} tintColor={color} name={symbol} />;
        },
      })}>
      <Tabs.Screen name="(home)" options={{ title: 'Home' }} />
      <Tabs.Screen name="tasks" options={{ title: 'Tasks' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
