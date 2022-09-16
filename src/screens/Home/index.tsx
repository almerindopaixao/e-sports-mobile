import { useEffect, useState } from 'react';
import { Image, FlatList, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import { Heading, GameCard, GameCardProps, Background } from '../../components';

import logoImg from '../../assets/logo-nlw-esports.png';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  async function fetchData() {
    const response = await fetch('http://192.168.0.184:3000/games');
    const data = await response.json();
    setGames(data);
  }

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl });
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderItem: ListRenderItem<GameCardProps> = ({ item: game }) => (
    <GameCard 
      data={game}
      onPress={() => handleOpenGame(game)}
    />
  );

  return (
    <Background>
      <SafeAreaView style={styles.container}>
          <Image source={logoImg} style={styles.logo} />

          <Heading 
              title='Encontre seu duo!'
              subtitle='Selecione o game que deseja jogar...'
          />

          <FlatList
              data={games}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={styles.contentList}
          />
      </SafeAreaView>
    </Background>
  );
}