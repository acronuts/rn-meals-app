import React, { useEffect, useCallback } from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import DefaultText from "../components/DefaultText";
import CustomHeaderButton from "./../components/HeaderButton";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { toggleFav } from "../store/actions/meals";

const ListItem = (props) => {
  return (
    <View style={{ ...styles.listItem, ...props }}>
      <View style={styles.listInfo}>
        <Ionicons
          name="radio-button-on"
          size={8}
          style={{ marginTop: 6 }}
          color={colors.primaryColor}
        />
        <DefaultText style={{ marginHorizontal: 5 }}>
          {props.children}
        </DefaultText>
      </View>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const availableMeals = useSelector((state) => state.meals.meals);
  const mealId = props.navigation.getParam("mealId");
  const mealIsFavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );

  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavHandler = useCallback(() => {
    dispatch(toggleFav(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setParams({ toggle_fav: toggleFavHandler });
  }, [toggleFavHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: mealIsFavorite });
  }, [mealIsFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{selectedMeal.duration} min</DefaultText>
        <DefaultText
          style={{
            color: selectedMeal.complexity === "simple" ? "green" : "red",
          }}>
          {selectedMeal.complexity.toUpperCase()}
        </DefaultText>
        <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
      </View>
      <View style={styles.infoContainer}>
        <DefaultText>
          Gluten Free{" "}
          {selectedMeal.isGlutenFree ? (
            <Ionicons name="checkmark-sharp" size={16} color="green" />
          ) : (
            <Ionicons name="close-sharp" size={16} color="red" />
          )}
        </DefaultText>
        <DefaultText>
          Lactose Free{" "}
          {selectedMeal.isLactoseFree ? (
            <Ionicons name="checkmark-sharp" size={16} color="green" />
          ) : (
            <Ionicons name="close-sharp" size={16} color="red" />
          )}
        </DefaultText>
        <DefaultText>
          Vegan{" "}
          {selectedMeal.isVegan ? (
            <Ionicons name="checkmark-sharp" size={16} color="green" />
          ) : (
            <Ionicons name="close-sharp" size={16} color="red" />
          )}
        </DefaultText>
        <DefaultText>
          Vegetarian{" "}
          {selectedMeal.isVegetarian ? (
            <Ionicons name="checkmark-sharp" size={16} color="green" />
          ) : (
            <Ionicons name="close-sharp" size={16} color="red" />
          )}
        </DefaultText>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Ingredients</Text>
      </View>
      {selectedMeal.ingredients.map((ingredient) => (
        <ListItem key={ingredient} style={styles.listIngr}>
          {ingredient}
        </ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = (navigationData) => {
  // const mealId = navigationData.navigation.getParam("mealId");
  const mealTitle = navigationData.navigation.getParam("mealTitle");
  const toggleFavorite = navigationData.navigation.getParam("toggle_fav");
  const isFavorite = navigationData.navigation.getParam("isFav");
  // const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: 250,
  },
  details: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    backgroundColor: colors.accentColor2,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    textAlign: "center",
  },
  titleContainer: {
    // borderBottomColor: colors.accentColor2,
    // borderBottomWidth: 1,
    marginTop: 4,
  },
  listItem: {
    marginVertical: 6,
    marginHorizontal: 20,
  },
  listInfo: {
    flexDirection: "row",
    // alignItems: "center",
  },
  listIngr: {
    marginVertical: 2,
  },
  infoContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    borderColor: colors.accentColor2,
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
  },
});

export default MealDetailScreen;
