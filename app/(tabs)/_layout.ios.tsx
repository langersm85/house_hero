
import React from 'react';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { colors } from '@/styles/commonStyles';
import { DynamicColorIOS } from 'react-native';

export default function TabLayout() {
  return (
    <NativeTabs
      tintColor={DynamicColorIOS({
        dark: colors.primary,
        light: colors.primary,
      })}
      iconColor={DynamicColorIOS({
        dark: colors.textSecondary,
        light: colors.textSecondary,
      })}
      labelStyle={{
        color: DynamicColorIOS({
          dark: colors.text,
          light: colors.text,
        }),
      }}
    >
      <NativeTabs.Trigger name="(home)">
        <Icon sf="house.fill" />
        <Label>Home</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="tasks">
        <Icon sf="list.bullet.clipboard.fill" />
        <Label>Tasks</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Icon sf="person.fill" />
        <Label>Profile</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
