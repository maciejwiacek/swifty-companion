import ThemeToggle from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { getClientToken, getUserDetails } from '@/lib/api';
import { useUserStore } from '@/lib/user-store';
import { router, Stack } from 'expo-router';
import { SearchIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { Image, View } from 'react-native';

const LOGO = {
  light: require('@/assets/images/logo-dark.png'),
  dark: require('@/assets/images/logo-light.png'),
};

const SCREEN_OPTIONS = {
  title: '',
  headerTransparent: true,
  headerRight: () => <ThemeToggle />,
};

export default function Screen() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { colorScheme } = useColorScheme();
  const setUser = useUserStore((state) => state.setUser);

  const searchUser = async () => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const token = await getClientToken();
      const user = await getUserDetails(username, token);

      setUser(user);
      setIsLoading(false);
      router.push({
        pathname: '/user-details',
      });
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
    }
  };

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    if (error) {
      setError(null);
    }
  };

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 items-center justify-center gap-8 p-4">
        <View className="items-center justify-center gap-4">
          <Image
            source={LOGO[colorScheme ?? 'light']}
            className="h-24 w-24 rounded-3xl"
            resizeMode="contain"
          />
          <View className="items-center justify-center">
            <Text className="text-2xl font-bold">Swifty Companion</Text>
            <Text className="text-sm text-muted-foreground">Search the 42 Network</Text>
          </View>
        </View>
        <Input
          placeholder="Search for a user"
          value={username}
          onChangeText={handleUsernameChange}
          className="h-16 rounded-full px-8"
          editable={!isLoading}
          autoCapitalize='none'
        />
        {error && <Text className="px-4 text-sm text-destructive">{error}</Text>}
        <Button size="primary" onPress={searchUser} className="gap-2" disabled={isLoading}>
          <Text className="text-lg font-bold">{isLoading ? 'Searching...' : 'Search'}</Text>
          {!isLoading && (
            <Icon
              as={SearchIcon}
              color={colorScheme === 'dark' ? 'black' : 'white'}
              size={16}
              strokeWidth={3}
            />
          )}
        </Button>
      </View>
    </>
  );
}
