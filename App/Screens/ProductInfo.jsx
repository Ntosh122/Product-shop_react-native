import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
  ToastAndroid
} from "react-native";
import React, { useEffect, useState } from "react";
import { Items } from "../Database/database";
import { COLORS } from "../../assets/constants";
import Entypo from "react-native-vector-icons/Entypo"
import Ionicons from "react-native-vector-icons/Ionicons";
 import AsyncStorage from '@react-native-async-storage/async-storage'
const ProductInfo = ({ route, navigation }) => {
  const { productID } = route.params;
  const [product, setProduct] = useState({});

  const width = Dimensions.get('window').width

  const scrollX = new Animated.Value(0)
  
  let position = Animated.divide(scrollX, width)
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });
  }, [navigation]);

  const getDataFromDB = async () => {
    for (let i = 0; i < Items.length; i++) {
      if (Items[i].id == productID) {
        await setProduct(Items[i]);
        return;
      }
    }
  };

  // add to cart
  const addToCart = async(id)=>{
    let itemArray = await AsyncStorage.getItem('cartItems')
    itemArray = JSON.parse(itemArray)
    if(itemArray){
      let array = itemArray
      array.push(id)

      try{
        await AsyncStorage.setItem('cartItems', JSON.stringify(array))
        ToastAndroid.show(
          'Item Add successfully to cart',
          ToastAndroid.SHORT
        );
        navigation.navigate("HomeScreen")
      }catch(error){
        return error
      }
    }
    else{
      let array = []
      array.push(id)
      try { 
        await AsyncStorage.setItem('cartItems', JSON.stringify(array))
      } catch (error) {
        return error
      }
    }
  }

  // product horizontal
  const renderProduct = ({item, index}) =>{
    return(
      <View style={{
        width:width,
        height:240,
        alignItems:'center',
        justifyContent:'center'
      }}>
        <Image source={item} style={{
          width:'100%',
          height:'100%',
          resizeMode:'contain'
        }}/>
      </View>
    )
  }
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.white,
        position: "relative",
      }}
    >
      <StatusBar
        backgroundColor={COLORS.backgroundLight}
        barStyle="dark-content"
      />
      <ScrollView>
        <View style={{
          width:'100%',
          backgroundColor:COLORS.backgroundLight,
          borderBottomRightRadius:20,
          borderBottomLeftRadius:20,
          position:'relative',
          justifyContent:'center',
          alignItems:'center',
          marginBottom:4
        }}>
          <View style={{
            width:'100%',
            flexDirection:'row',
            justifyContent:'space-between',
            paddingTop:16,
            paddingLeft:16
          }}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: COLORS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLORS.white,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <FlatList data={product.productImageList ? product.productImageList : null}
          horizontal
          renderItem={renderProduct}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0.8}
          snapToInterval={width}
          bounces={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x:scrollX}}}],
            {useNativeDriver:false}
          )}
          />
          <View style={{
            width:'100%',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            marginBottom:16,
            marginTop:32
          }}>
            {
              product.productImageList ? product.productImageList.map((data, index)=>{
                let opacity = position.interpolate({
                  inputRange:[index - 1, index, index + 1],
                  outputRange:[0.2, 1, 0.2],
                  extrapolate:'clamp'
                })
                return(
                  <Animated.View key={index} style={{
                    width:'16%',
                    height:2.4,
                    backgroundColor:COLORS.black,
                    opacity,
                    marginHorizontal:4,
                    borderRadius:100
                  }}>

                  </Animated.View>
                )
              }) : null
            }
          </View>
        </View>
        <View style={{
          paddingHorizontal:16,
          marginTop:6
        }}>
            <View style={{
              flexDirection:'row',
              alignItems:'center',
              marginVertical:14
            }}>
              <Entypo name='shopping-cart' style={{
                fontSize:18,
                color:COLORS.black,
                marginRight:6
              }}/>
              <Text style={{
                fontSize:12,
                color:COLORS.black
              }}>
                Shopping
              </Text>
            </View>
            <View style={{
              flexDirection:'row',
              marginVertical:4,
              alignItems:'center',
              justifyContent:'space-between'
            }}>
              <Text style={{
                fontSize:24,
                fontWeight:'600',
                letterSpacing:0.5,
                marginVertical: 4,
                maxWidth:'84%'
              }}>{product.productName}
              </Text>
              <Ionicons name="link-outline" style={{
                fontSize:24,
                color:COLORS.blue,
                backgroundColor:COLORS.blue + 10,
                padding:8,
                borderRadius:100
              }}/>
            </View>
            <Text style={{
              fontSize:14,
              color:COLORS.black,
              fontWeight:'400',
              letterSpacing:1,
              opacity:.5,
              lineHeight:20,
              maxWidth:'85%',
              marginBottom:18
            }}>
              {product.description}
            </Text>
            <Text style={{
              fontSize:14,
              color:COLORS.black,
              fontWeight:'400',
              letterSpacing:1,
              lineHeight:20,
              maxWidth:'85%',
              marginBottom:18
            }}>{product.features}</Text>
            <View style={{
              flexDirection:'row',
              alignItems:'center',
              justifyContent:'space-between',
              marginVertical:14,
              borderBottomColor:COLORS.backgroundLight,
              borderBottomWidth:1,
              paddingBottom:20
            }}>
              <View style={{
                flexDirection:'row',
                width:'80%',
                alignItems:'center'
              }}>
                <View style={{
                  color:COLORS.blue,
                  backgroundColor:COLORS.backgroundLight,
                  alignItems:'center',
                  justifyContent:'center',
                  padding:12,
                  borderRadius:100,
                  marginRight:10
                }}>
                  <Entypo name='location-pin' style={{
                    fontSize:16,
                    color:COLORS.blue
                  }}/>
                </View>
                <Text>Virginia Road, Johannesburg</Text>
              </View>
              <Entypo name='chevron-right' style={{
                fontSize:22,
                color:COLORS.backgroundDark
              }}/>
            </View>
            <View style={{
              paddingHorizontal:16
            }}>
              <Text style={{
                fontSize:18,
                fontWeight:'500',
                maxWidth:'85%',
                color:COLORS.black,
                marginBottom:4
              }}>&#82; {product.productPrice}.00
              </Text>
              <Text>Tax Rate 2%~ &#82;{product.productPrice / 20} (&#82; {product.productPrice + product.productPrice / 20})</Text>
            </View>
        </View>
      </ScrollView>
      <View style={{
        position:'absolute',
        bottom:10,
        height:'8%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
      }}>
        <TouchableOpacity onPress={()=>product.isAvailable ? addToCart(product.id) : null} style={{
          width:'86%',
          height:'90%',
          backgroundColor:COLORS.green,
          borderRadius:20,
          justifyContent:'center',
          alignItems:'center'
        }}>
          <Text style={{
            fontSize:12,
            fontWeight:'500',
            letterSpacing:1,
            color:COLORS.white,
            textTransform:"uppercase"
          }}>{product.isAvailable ? 'Add to cart' : 'Not Available'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductInfo;
