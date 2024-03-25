import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../Utils/Colors'
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo';
import { app } from '../../Utils/FirebaseConfig';
import PlaceItem from '../HomeScreen/PlaceItem';

export default function FavoriteScreen() {
  const db = getFirestore(app);
  const { user } = useUser();
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasFavorites, setHasFavorites] = useState(false); // New state variable

  useEffect(() => {
    user && getFav();
  }, [user])

  /**
   * Get All Fav List list of places from firebase
   */
  const getFav = async () => {
    setLoading(true)
    setFavList([])
    const q = query(collection(db, "ev-fav-place"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress));
    const querySnapshot = await getDocs(q);
    const tempList = [];
    querySnapshot.forEach((doc) => {
      tempList.push(doc.data());
    });
    setFavList(tempList);
    setHasFavorites(tempList.length > 0); // Update hasFavorites state
    setLoading(false);
  }

  const refreshFavorites = () => {
    getFav();
  }

  return (
    <View style={{marginBottom:80}}>
      <Text style={{
        padding: 10, fontFamily: 'outfit-medium',
        fontSize: 30
      }}>My Favorite
        <Text style={{ color: Colors.PRIMARY }}> Place</Text></Text>

      {/* Display loading indicator if loading */}
      {loading ? (
        <View style={{
          height: '100%',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-evenly'
        }}>
          <ActivityIndicator
            size={'large'}
            color={Colors.PRIMARY}
          />
          <Text style={{ fontFamily: 'outfit', marginTop: 5 }}>Loading...</Text>
        </View>
      ) : null}

      {/* Display "You have not added anything" if no favorites */}
      {!hasFavorites && !loading ? (
        <View style={{ alignItems: 'center', marginVertical:80 }}>
          <Image source={require("../../../assets/images/nothing.png")}
          style={{height:120, width:120}}
          />
          <Text style={{ fontFamily: 'outfit-bold', textAlign: 'center', fontSize:20 }}>
            You Don't Have Any Favorites
          </Text>
          <TouchableOpacity onPress={refreshFavorites}>
            <Text style={{ fontFamily: 'outfit', color: Colors.PRIMARY, marginTop: 10, fontSize:16 }}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {/* Display FlatList if there are favorite items */}
      {hasFavorites ? (
        <FlatList
          data={favList}
          onRefresh={() => getFav()}
          refreshing={loading}
          style={{ paddingBottom: 200 }}
          renderItem={({ item, index }) => (
            <PlaceItem place={item.place} isFav={true} markedFav={() => getFav()} />
          )}
        />
      ) : null}

      <View style={{ marginBottom: 200, height: 200 }}></View>
    </View>
  )
}
