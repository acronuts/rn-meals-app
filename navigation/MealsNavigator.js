import React from "react";
import { Platform, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "./../screens/CategoryMealsScreen";
import MealDetailScreen from "./../screens/MealDetailScreen";
import FavoritesScreen from "./../screens/FavortitesScreen";

import colors from "../constants/colors";
import FiltersScreen from "./../screens/FiltersScreen";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? colors.primaryColor : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerTitleAlign: "center",
  headerTintColor: Platform.OS === "android" ? "white" : colors.primaryColor,
};

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: {
        headerTitle: "Meal Categories",
      },
    },
    CategoryMeals: {
      screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: {
      screen: FavoritesScreen,
      navigationOptions: {
        headerTitle: "Your Favorites",
      },
    },
    MealDetail: MealDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-restaurant" size={22} color={tabInfo.tintColor} />
        );
      },
      tabBarColor: colors.primaryColor,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontFamily: "open-sans-bold" }}>Meals!</Text>
        ) : (
          "Meals!"
        ),
    },
  },
  Favorites: {
    screen: FavNavigator,
    navigationOptions: {
      tabBarLabel: "Favorites!",
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="ios-star" size={22} color={tabInfo.tintColor} />;
      },
      tabBarColor: colors.accentColor,
      tabBarLabel:
      Platform.OS === "android" ? (
        <Text style={{ fontFamily: "open-sans-bold" }}>Favorites!</Text>
      ) : (
        "Favorites!"
      ),
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: "white",
        shifting: true,
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            fontFamily: "open-sans-bold",
          },
          activeTintColor: colors.accentColor,
        },
      });

const FilterNavigator = createStackNavigator(
  {
    Filters: {
      screen: FiltersScreen,
      navigationOptions: { headerTitle: "Filter Meals" },
    },
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const MainNavigator = createDrawerNavigator(
  {
    MealsFav: {
      screen: MealsFavTabNavigator,
      navigationOptions: {
        drawerLabel: "Meals",
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="restaurant" size={22} color={tintColor} />
        ),
      },
    },
    Filters: {
      screen: FilterNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="options" size={26} color={tintColor} />
        ),
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: colors.accentColor,
      labelStyle: {
        fontFamily: "open-sans-bold",
        // paddingTop: 30,
      },
    },
  }
);

export default createAppContainer(MainNavigator);
