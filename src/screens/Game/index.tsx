import { useEffect, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { GameParams } from '../../@types/navigation';

import { styles } from './styles';
import { AdCard, AdCardProps, Background, Heading, DuoMatch } from '../../components';

import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png'


export function Game() {
  const [ads, setAds] = useState<AdCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState<string>('');

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  function handleGoBack() {
    navigation.goBack();
  }

  async function http<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return response.json();
  }
  

  async function getDiscordUserBy(adId: string) {
    const data = await http<{ discord: string }>(`http://192.168.0.184:3000/ads/${adId}/discord`);
    setDiscordDuoSelected(data.discord);
  }

  async function getAdsBy(gameId: string) {
    const data = await http<AdCardProps[]>(`http://192.168.0.184:3000/games/${gameId}/ads`);
    setAds(data);
  }

  useEffect(() => {
    getAdsBy(game.id)
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image 
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.rigth} />
        </View>

        <Image 
          style={styles.cover} 
          source={{ uri: game.bannerUrl }}
          resizeMode='cover'
        />

        <Heading 
          title={game.title}
          subtitle='Conecte-se e comece a jogar!'
        />

        <FlatList 
          data={ads}
          renderItem={({ item: ad }) => <AdCard data={ad} onConnect={async () => getDiscordUserBy(ad.id)} />}
          keyExtractor={ad => ad.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          contentContainerStyle={ads.length ? styles.contentList : styles.emptyListContent}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
        />
        <DuoMatch 
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}