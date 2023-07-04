import React from "react";
import { StyleSheet } from "react-native";
import CameraScreen from "./screens/CameraScreen.js";
import FeedScreen from "./screens/FeedScreen.js";
import ImagesScreen from "./screens/ImagesScreen.js";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		// <View style={styles.container}>
		// 	<Text>Open up App.js to start working on your app!</Text>
		// 	<Text>Céline</Text>
		// 	<FeedScreen></FeedScreen>
		// 	<ImagesScreen></ImagesScreen>
		// 	<StatusBar style="auto" />
		// </View>

		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === "Camera") {
							iconName = focused ? "camera" : "camera-outline";
						} else if (route.name === "Feed") {
							iconName = focused ? "image" : "image-outline";
						} else if (route.name === "Image") {
							iconName = focused ? "share-social" : "share-social-outline";
						}

						// You can return any component that you like here!
						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: "blue",
					tabBarInactiveTintColor: "gray",
				})}
			>
				<Tab.Screen
					name="Camera"
					component={CameraScreen}
					options={{ unmountOnBlur: true }}
				/>
				<Tab.Screen name="Feed" component={FeedScreen} />
				<Tab.Screen name="Image" component={ImagesScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
