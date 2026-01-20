import { ScrollView, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { useUserStore } from '@/lib/user-store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Stack } from 'expo-router';
import ThemeToggle from '@/components/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { CheckCheckIcon, CheckCircleIcon, CircleCheckIcon, CircleXIcon, MapPinIcon, PinIcon, ShieldCheck, StarHalfIcon, StarIcon, WalletIcon } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SCREEN_OPTIONS = {
  title: 'Profile',
  headerRight: () => <ThemeToggle />,
};

export default function UserDetails() {
  const user = useUserStore((state) => state.user);
  const [tabsValue, setTabsValue] = useState<'finished' | 'failed'>('finished');

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
      <ScrollView className="flex-1" contentContainerClassName="items-center pb-8" nestedScrollEnabled showsVerticalScrollIndicator={false}>
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
          <View className="flex-row items-center gap-1">
            <Icon as={MapPinIcon} size={16} color="gray" className="shadow-sm shadow-gray-500" />
            <Text className="text-xs font-light text-gray-500">
              {user.campus[0].city}, {user.campus[0].country}
            </Text>
          </View>
        </View>
        <View className='flex-row gap-4 mx-4 mt-8'>
          <Card className="items-center w-1/2 flex-1">
            <CardHeader>
              <Icon as={WalletIcon} size={24} color="cyan" className="shadow-sm shadow-cyan-500" />
            </CardHeader>
            <CardContent className='items-center'>
              <Text className="text-primary">{user.wallet}</Text>
              <Text className="text-xs font-light text-gray-500">Wallet</Text>
            </CardContent>
          </Card>
          <Card className="items-center w-1/2 flex-1">
            <CardHeader>
              <Icon as={ShieldCheck} size={24} color="cyan" className="shadow-sm shadow-cyan-500" />
            </CardHeader>
            <CardContent className='items-center'>
              <Text className="text-primary">{user.correction_point}</Text>
              <Text className="text-xs font-light text-gray-500">Evaluation Points</Text>
            </CardContent>
          </Card>
        </View>
        <View>
          <View className='w-full flex-row items-center justify-between px-4 mt-8'>
            <Text className="text-xl font-semibold">Skills</Text>
            <Button variant='ghost'>
              <Text className='text-cyan-500'>VIEW ALL</Text>
            </Button>
          </View>
        </View>
        <View className='w-full px-4 mt-8'>
          <Text className="text-xl font-semibold">Projects</Text>
          <Tabs value={tabsValue} onValueChange={(value) => setTabsValue(value as 'finished' | 'failed')}>
            <TabsList className='mt-4'>
              <TabsTrigger value="finished">
                <Text>Completed</Text></TabsTrigger>
              <TabsTrigger value="failed"><Text>Failed</Text></TabsTrigger>
            </TabsList>
            <TabsContent value="finished" className='w-full items-center'>
              <View className='w-full gap-4'>
                {user.projects_users.filter(project => project.status === 'finished' && project.final_mark > 0).map(project => (
                  <Card key={project.id}>
                    <CardContent className='flex-row items-center px-4 py-3'>
                      <View className='size-10 rounded-md bg-cyan-500/20 items-center justify-center mr-4'>
                        <Icon as={project.final_mark > 100 ? StarIcon : CircleCheckIcon} size={24} color="cyan" />
                      </View>
                      <View className='flex-1 mr-4'>
                        <Text className='text-sm font-semibold' numberOfLines={0}>{project.project.name}</Text>
                        <Text className='text-xs font-light text-gray-500'>{project.status.toUpperCase()}</Text>
                      </View>
                      <View className='items-end'>
                        <Text className='font-semibold text-cyan-500'>{project.final_mark}</Text>
                      </View>
                    </CardContent>
                  </Card>
                ))}
              </View>
            </TabsContent>
            <TabsContent value="failed">
              <View className='w-full gap-4'>
                {user.projects_users.filter(project => project.status === 'finished' && project.final_mark === 0).map(project => (
                  <Card key={project.id}>
                    <CardContent className='flex-row items-center px-4 py-3'>
                      <View className='size-10 rounded-md bg-red-500/20 items-center justify-center mr-4'>
                        <Icon as={CircleXIcon} size={24} color="red" />
                      </View>
                      <View className='flex-1 mr-4'>
                        <Text className='text-sm font-semibold' numberOfLines={0}>{project.project.name}</Text>
                        <Text className='text-xs font-light text-gray-500'>{'failed'.toUpperCase()}</Text>
                      </View>
                      <View className='items-end'>
                        <Text className='font-semibold text-red-500'>{project.final_mark}</Text>
                      </View>
                    </CardContent>
                  </Card>
                ))}
              </View>
            </TabsContent>
          </Tabs>
        </View>
      </ScrollView >
    </>
  );
}
