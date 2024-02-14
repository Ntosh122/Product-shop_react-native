import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS } from "../../assets/constants";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Items } from "../Database/database";
import { useFonts } from 'expo-font';


const HomeScreen = ({ navigation }) => {


  const [products, setProducts] = useState([]);
  const [accessory, setAccessory] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });
    return unsubscribe;
  }, [navigation]);

  // retrieve data from DB
  const getDataFromDB = () => {
    let productList = [];
    let accessoryList = [];
    for (let i = 0; i < Items.length; i++) {
      if (Items[i].category == "product") {
        productList.push(Items[i]);
      } else if (Items[i].category == "accessory") {
        accessoryList.push(Items[i]);
      }
    }

    setProducts(productList);
    setAccessory(accessoryList);
  };

  // reusable product card

  const ProductCard = ({ data }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductInfo", { productID: data.id })
        }
        style={{
          width: "48%",
          marginVertical: 14,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 100,
            borderRadius: 10,
            backgroundColor: COLORS.backgroundLight,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          {data.isOff ? (
            <View
              style={{
                position: "absolute",
                width: "20%",
                height: "20%",
                backgroundColor: COLORS.green,
                top: 0,
                left: 0,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: COLORS.white,
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                {data.offPercentage}%
              </Text>
            </View>
          ) : null}
          <Image
            source={data.productImage}
            style={{
              width: "80%",
              height: "80%",
              resizeMode: "contain",
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            marginBottom: 2,
          }}
        >
          {data.productName}
        </Text>
        {data.category === "accessory" ? (
          data.isAvailable ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLORS.green,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLORS.green,
                }}
              >
                Available
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLORS.red,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLORS.red,
                }}
              >
                UnAvailable
              </Text>
            </View>
          )
        ) : null}
        <Text>&#82; {data.productPrice}</Text>
      </TouchableOpacity>
    );
  };
  // Banner Card
  function renderProductCard() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 24,
          marginHorizontal: 24,
          borderRadius: 10,
          backgroundColor: COLORS.bannerBackground,
        }}
      >
        <View
          style={{
            width: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../../assets/images/products/bannerIcon.png")}
            style={{
              width: 80,
              height: 80,
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            paddingVertical: 12,
          }}
        >
          <Text
            style={{
              width: "70%",
              fontSize: 18,
              color: COLORS.black,
              fontWeight: "600",
            }}
          >
            Sweat & Water Resistant
          </Text>
          <Text>
            Beats Fit Pro offeres an IPX4 rating for sweat and resistance.
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: COLORS.black,
                fontWeight: "600",
                textDecorationLine: "underline",
                fontSize: 14,
              }}
            >
              Check out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  // Search Bar Rendering
  function renderSearchBar() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: 50,
          marginHorizontal: 24,
          paddingHorizontal: 12,
          // padding:16,
          borderRadius: 10,
          backgroundColor: COLORS.backgroundLight,
        }}
      >
        <Image
          source={require("./../../assets/images/products/search.png")}
          style={{
            width: 15,
            height: 15,
            tintColor: COLORS.backgroundMedium,
          }}
        />
        <TextInput
          style={{
            marginLeft: 12,
            fontSize: 16,
          }}
          placeholderTextColor={COLORS.backgroundMedium}
          placeholder="Search Products..."
        />
      </View>
    );
  }
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 16,
          }}
        >
          {/* Shooping Bag Butto */}
          <TouchableOpacity>
            <Entypo
              name="shopping-bag"
              style={{
                fontSize: 18,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLORS.backgroundLight,
              }}
            />
          </TouchableOpacity>

          {/* Cart Button*/}
          <TouchableOpacity onPress={()=>navigation.navigate('MyCart')}>
            <MaterialCommunityIcons
              name="cart"
              style={{
                fontSize: 18,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLORS.backgroundLight,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 10,
            padding: 16,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              color: COLORS.black,
              fontWeight: "600",
              letterSpacing: 1,
              marginBottom: 10
            }}
          >
            Black Audio Connect
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.black,
              fontWeight: "400",
              letterSpacing: 1,
              lineHeight: 24,
            }}
          >
            📍Audio Shop on Protea Glen Ext 2.
            {`\n`}Providing the best tech products and services
          </Text>
        </View>
        {renderSearchBar()}
        <View
          style={{
            padding: 16,
          }}
        >
          <View
            style={{
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: COLORS.black,
                  fontWeight: "600",
                  letterSpacing: 1,
                }}
              >
                Products
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.black,
                  fontWeight: "400",
                  marginLeft: 10,
                  opacity: 0.5,
                }}
              >
                20
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("AllProducts")}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.blue,
                  fontWeight: "400",
                }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {products.map((data) => {
              return <ProductCard data={data} key={data.id} />;
            })}
          </View>
        </View>
        {renderProductCard()}
        <View
          style={{
            padding: 16,
          }}
        >
          <View
            style={{
              padding: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: COLORS.black,
                  fontWeight: "600",
                  letterSpacing: 1,
                }}
              >
                Accessories
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.black,
                  fontWeight: "400",
                  marginLeft: 10,
                  opacity: 0.5,
                }}
              >
                78
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("AllAccessories")}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.blue,
                  fontWeight: "400",
                }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {accessory.map((data) => {
              return <ProductCard data={data} key={data.id} />;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
