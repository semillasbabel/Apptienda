import React, { useEffect } from "react";
import { TouchableOpacity, View, Text, ActivityIndicator, Image,ImageBackground } from "react-native";
import { FlatGrid } from 'react-native-super-grid';
import { useNavigation } from "@react-navigation/native";
import { SearchesService } from "../../../domain/searches/service/searchService";
import { shopScreens } from "./Constants/keysShop"
import { AppImages } from "../../enums/appImages"
import { getDownloadURL, ref} from "firebase/storage"
import { storage } from "../../../data/firebaseConfig/config"
import { styles } from "./styles/productStyles"
import { getOfferts } from "../../../domain/searches/service/searches"

function Offerts(props){
  const navigation = useNavigation();
  const {searchType} = props;
  const [temp, setTemp] = React.useState([]);
  const [productos, setProductos] = React.useState([]);

  useEffect(() => {
    try {
      const manager = new SearchesService();
      switch (searchType) {

        case shopScreens.HomeScreen:
          manager.searchOfferts().search(setProductos);

        break;

        case shopScreens.FuentesPoderScreen:
          manager.SearchPowerSupply().search(setProductos);
        break;

        case shopScreens.GabineteScreen:
          manager.searchCases().search(setProductos);
        break;

        case shopScreens.MemoriasRamScreen:
          manager.SearchMemoryRam().search(setProductos);
        break;

        case shopScreens.ProcesadoresScreen:
          manager.SearchProcessors().search(setProductos);
        break;

        case shopScreens.AlmacenamientoScreen:
          manager.SearchStorage().search(setProductos);
        break;

        case shopScreens.VideoScreen:
          manager.SearchVideoCards().search(setProductos);
        break;

        case shopScreens.TarjetaMadreScreen:
          manager.SearchMotherboards().search(setProductos);
        break;

      }
    } catch (e) {
      alert(e);
    }
  }, []);


  // (async function () {
  //   if (temp[0] !== undefined) {
  //     if (productos.length === 0) {
  //       for (const data of temp) {
  //         const reference = ref(storage, `Productos/${data.imageurl}`);
  //         data.imageurl = await getDownloadURL(reference)
  //         .then((x)=>{return x;})
  //         .catch((e)=>{})
  //       }
  //       setProductos(temp);
  //     }
  //   }
  // })();

  
  return (
    <ImageBackground source={{uri: AppImages.backgroundImage.value}} resizeMode="cover" style={{flex:1}}>
    <View style={{flex: 1, backgroundColor: "transparent"}}>
      <View style={{ flex: 1, backgroundColor: `transparent`}}>
        <View style={{ flex: 1}}>
          {productos.length === 0 ? (
          <View style={{flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="white"/>
            <Text style={{color:"white", fontSize: 20}}>Cargando Productos</Text>
          </View>
          ) : (
            <View>
              <FlatGrid
            itemDimension={150}
              data={productos}
              
              spacing={10}
              keyExtractor={(x) => x.id}
              renderItem={(data) => (
                <View style={styles.cardSale}>

                  <TouchableOpacity onPress={()=>navigation.navigate("Details", {item: data.item})}>

                    <View style={{flex:1, alignContent:"center", alignItems: "center"}}>
                      
                    <Image source={{uri: data.item.imageurl}} style={{height: 150, width: 150, marginTop: 5}}/>

                      
                      <Text style={styles.textsale} >{data.item.name}</Text>
                      <Text style={styles.textsale}> Descripcion: {data.item.description}</Text>
                      <Text style={styles.textsale}> Stock: {data.item.amount}</Text>
                      <Text style={styles.textsale}> Precio: ¢ {data.item.price}</Text>

                    </View>

                  </TouchableOpacity>
  
  
                </View>
                )}
              style={{ marginTop: 10 }}
            />
            </View>
          )}
        </View>
      </View>
  
    </View>
    </ImageBackground>
    );
  }
  

export default Offerts;