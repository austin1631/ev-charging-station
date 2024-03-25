import { View, Text, Image, Dimensions, Pressable, ToastAndroid, Platform, Linking } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import GlobalApi from '../../Utils/GlobalApi';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { getFirestore } from "firebase/firestore";
import { app } from '../../Utils/FirebaseConfig';
import { doc, setDoc,deleteDoc  } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo';
export default function PlaceItem({ place, isFav, markedFav }) {
  const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
  const { user } = useUser();
  const db = getFirestore(app);
  /**
   * Used to save Fav on Click of Heart Icon
   * @param {*} place Place Object
   */
  const onSetFav = async (place) => {
    await setDoc(doc(db, "ev-fav-place", (place.id).toString()), {
      place: place,
      email: user?.primaryEmailAddress?.emailAddress
    }
    );
    markedFav()
    ToastAndroid.show('Fav Added!', ToastAndroid.TOP);
  }

  /**
   * Used to remove Fav from List
   * @param {*} placeId 
   */
  const onRemoveFav=async(placeId)=>{
    console.log(placeId)
     await deleteDoc(doc(db, "ev-fav-place", placeId.toString()));
     ToastAndroid.show('Fav Removed!', ToastAndroid.TOP);
     markedFav()
  }

  /**
   * On Direction Click Navigate to Google Map/Apple Map
   */
  const onDirectionClick=()=>{
    const url=Platform.select({
      ios:"maps:"+place.location.latitude+","+place?.location?.longitude+"?q="+place?.formattedAddress,
      android:"geo:"+place.location.latitude+","+place?.location?.longitude+"?q="+place?.formattedAddress,
    });

    Linking.openURL(url);
  }
  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        margin: 5,
        borderRadius: 10,
        width: Dimensions.get('screen').width * 0.9,
        marginHorizontal: 20
      }}
    >
      <LinearGradient
        colors={['transparent', '#ffffffff', '#ffffff']}
      >
      {!isFav?  <Pressable style={{
          position: 'absolute', right: 0,
          margin: 5
        }}
          onPress={() => onSetFav(place)}
        >
          <Ionicons name="heart-outline" size={30}
            color="white" />
        </Pressable>:
        <Pressable style={{
          position: 'absolute', right: 0,
          margin: 5
        }}
          onPress={() => onRemoveFav(place.id)}
        >
          <Ionicons name="heart-sharp" size={30}
            color="red" />
        </Pressable>}
        <Image source={
          place?.photos ?
            {
              uri: PLACE_PHOTO_BASE_URL + place?.photos[0]?.name +
                "/media?key=" + GlobalApi?.API_KEY + "&maxHeightPx=800&maxWidthPx=1200"
            }
            : require('./../../../assets/images/ev-charging.png')}
          style={{
            width: '100%', borderRadius: 10,
            height: 140, zIndex: -1
          }}
        />
        <View style={{ padding: 15 }}>
          <Text numberOfLines={1} style={{
            fontSize: 23,
            fontFamily: 'outfit-medium'
          }}>{place.displayName?.text}</Text>
          <Text style={{
            color: Colors.GRAY,
            fontFamily: 'outfit'
          }}>{place?.shortFormattedAddress}</Text>
          <View style={{
            display: 'flex', flexDirection: 'row',
            alignItems: 'center', justifyContent: 'space-between', marginTop: 15
          }}>
            <View style={{


            }}>
              <Text style={{
                fontFamily: 'outfit',
                color: Colors.GRAY,
                fontSize: 17
              }}>Connectors</Text>
              <Text style={{
                fontFamily: 'outfit-medium',
                fontSize: 20,
                marginTop: 2
              }}>{place?.evChargeOptions?.connectorCount} Points</Text>
            </View>
            <Pressable 
            onPress={()=>onDirectionClick()}
            style={{
              padding: 12, backgroundColor: Colors.PRIMARY,
              borderRadius: 6, paddingHorizontal: 14
            }}>
              <FontAwesome name="location-arrow"
                size={25} color="white" />
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}