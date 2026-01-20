import { ScrollView, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { useUserStore } from '@/lib/user-store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Stack } from 'expo-router';
import ThemeToggle from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { WalletIcon } from 'lucide-react-native';

const SCREEN_OPTIONS = {
  title: 'Profile',
  headerRight: () => <ThemeToggle />,
};

export default function UserDetails() {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return (
      <View>
        <Text>User not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <ScrollView className="flex-1 pt-8" contentContainerStyle={{ alignItems: 'center', flex: 1 }}>
        <View className="relative mb-5">
          <Avatar
            alt={user.usual_full_name}
            className="h-28 w-28 overflow-visible border-2 border-cyan-500 shadow shadow-cyan-500">
            <View className="m-0.5 overflow-hidden rounded-full">
              <AvatarImage source={{ uri: user.image.link }} />
              <AvatarFallback>
                <Text>{user.usual_full_name[0]}</Text>
              </AvatarFallback>
            </View>
          </Avatar>
          <Badge className="absolute bottom-[-5px] right-0 bg-cyan-500">
            <Text>Level {user.cursus_users[1].level}</Text>
          </Badge>
        </View>
        <View className="items-center gap-1">
          <Text className="text-xl font-semibold">{user.usual_full_name}</Text>
          <Text className="text-xs text-gray-500">{user.email}</Text>
          <Text className="text-xs font-light text-gray-500">
            {user.campus[0].city}, {user.campus[0].country}
          </Text>
        </View>
        <Card className="w-48 items-center">
          <CardHeader>
            <Icon as={WalletIcon} size={24} color="cyan" className="shadow-sm shadow-cyan-500" />
          </CardHeader>
          <CardContent>
            <Text className="text-primary">{user.wallet}</Text>
          </CardContent>
        </Card>
      </ScrollView>
    </>
  );
}
