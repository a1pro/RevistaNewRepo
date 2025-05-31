import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import IMAGES from '../../assets/images';
import VectorIcon from '../../components/VectorIcon';
import COLORS from '../../utils/Colors';
import {verticalScale} from '../../utils/Metrics';

const SUBCATEGORY_IMAGE_MAP: Record<string, any> = {
  toothpaste: IMAGES.paste1,
  toothbrushes: IMAGES.paste2,
  'teeth whitening': IMAGES.paste3,
  mouthwash: IMAGES.paste4,
  'mouth fresheners': IMAGES.paste5,
  "women's appliances": IMAGES.device,
  'body systems': IMAGES.device2,
  'facial devices': IMAGES.device3,
  'hair appliances': IMAGES.device4,
  'child care': IMAGES.mom2,
  "mother's care": IMAGES.mom1,
  sunscreen: IMAGES.sun1,
  tan: IMAGES.sun2,
  'mini perfume': IMAGES.perfume1,
  'hair mist': IMAGES.perfume2,
  'body perfumes': IMAGES.perfume3,
  'new perfumes': IMAGES.perfume4,
  'unisex perfumes': IMAGES.perfume5,
  'musk perfumes': IMAGES.perfume6,
  'oud perfumes': IMAGES.perfume7,
  "children's perfumes": IMAGES.perfume8,
  'perfume sets': IMAGES.perfume9,
  'men perfumes': IMAGES.perfume10,
  'air fresheners': IMAGES.home1,
  'scented candles and sticks': IMAGES.home2,
  'oud and incense': IMAGES.home3,
  'body moistuizers': IMAGES.body1,
  'body wash': IMAGES.body2,
  'bathing tools': IMAGES.body3,
  'body scrubs': IMAGES.body4,
  'body oils': IMAGES.body5,
  'body lightening': IMAGES.body6,
  deodorant: IMAGES.body7,
  'facial washes': IMAGES.face1,
  'moisturizing the face': IMAGES.face2,
  'face masks': IMAGES.face3,
  'facial scrub': IMAGES.face4,
  'facial care supplies': IMAGES.face5,
  'eye care': IMAGES.face6,
  'lip care': IMAGES.face7,
  'hand soap': IMAGES.hand1,
  'hand moisturizers': IMAGES.hand2,
  'hand care supplies': IMAGES.hand3,
  'moisturizing the feet': IMAGES.foot1,
  'foot care supplies': IMAGES.foot2,
  'sanitary pads': IMAGES.women1,
  'hair removal': IMAGES.women2,
  'beard care': IMAGES.men1,
  'shaving supplies': IMAGES.men2,
  razors: IMAGES.men3,
};

type Props = NativeStackScreenProps<RootStackParamList, 'SubCategories'>;

const SubCategories: React.FC<Props> = ({route, navigation}) => {
  const {category} = route.params;
  console.log('datacategory', category);

  const renderSubCategory = ({
    item,
  }: {
    item: {id: number; title: string; image?: string};
  }) => {
    const isDef = !item.image || item.image.endsWith('def.png');
    const staticImage =
      SUBCATEGORY_IMAGE_MAP[item.title.toLowerCase()] || IMAGES.revista;

    const imageSource = isDef ? staticImage : {uri: item.image};

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Details', {subCategory: item.title})
        }>
        <View style={styles.subCategory}>
          <Image source={imageSource} style={styles.subCategoryImage} />
          <Text style={styles.subCategoryText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Header with back button */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <VectorIcon
              size={24}
              type="AntDesign"
              name="left"
              color={COLORS.black}
            />
          </TouchableOpacity>
          <Text style={styles.header}>{category.title}</Text>
          <View style={styles.placeholder} />
        </View>

        <FlatList
          data={category.subCategories}
          keyExtractor={item => item.id.toString()}
          renderItem={renderSubCategory}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No subcategories available.</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f9f9f9'},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40, // Same width as back button to center the title
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  subCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 14,
    borderRadius: 10,
    elevation: 1,
  },
  subCategoryImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
    resizeMode: 'cover',
  },
  subCategoryText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 32,
    fontSize: 16,
  },
});

export default SubCategories;
