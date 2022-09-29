import React, { useEffect } from "react";
import { TouchableOpacity, FlatList, View, Image, Button, Text, Section, StyleSheet,ImageBackground } from "react-native";
import { FlatGrid } from 'react-native-super-grid';
import { useNavigation } from "@react-navigation/native";
import { getCases } from "../../../../../../Domain/Repositories/Firebase/Crud/read";

const Cases = () => {
  const navigation = useNavigation();

  const [productos, setProductos] = React.useState([]);

  useEffect(() => {
    try {
      getCases(setProductos);
    } catch (e) {
      alert(e);
    }
  }, []);

  const image = { uri: "https://media.idownloadblog.com/wp-content/uploads/2020/05/Vector-wave-iPhone-wallpaper-Arthur1992aS-iDownloadBlog-6-710x1536.png" };
  return (
    <ImageBackground source={image} resizeMode="cover" style={{flex:1}}>
    <View style={{flex: 1, backgroundColor: "transparent"}}>
      <View style={{ flex: 1, backgroundColor: `transparent`}}>
        <View style={{ flex: 1}}>
          {productos.length === 0 ? (
          <View style={{flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Esperando</Text>
          </View>
          ) : (
            <FlatGrid
            itemDimension={130}
              data={productos}
              
              spacing={10}
              keyExtractor={(x) => x.id}
              renderItem={(data) => (
                <View style={{flex:1, flexDirection: "column", backgroundColor: "#1583d7"}}>
  
                  <TouchableOpacity>
  
                    <View style={{flex:1, alignContent:"center", alignItems: "center"}}>
                      
                      <Text style={styles.itemName} >{data.item.imageurl}</Text>
                      <Text style={styles.itemName}>{data.item.name}</Text>
                      <Text style={styles.itemName} >{data.item.description}</Text>
                      
                    </View>
  
                  </TouchableOpacity>
  
  
                </View>
                )}
              style={{ marginTop: 10 }}
            />
          )}
        </View>
      </View>
  
    </View>
    </ImageBackground>
    );
  };
  
  
  
  const styles = StyleSheet.create({
    gridView: {
      marginTop: 10,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      padding: 10,
      height: 150,
    },
    itemName: {
      fontSize: 15,
      color: '#fff',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
  });
export default Cases;
