import React from "react";
import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function CameraScreen() {
	const [type, setType] = useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();

	if (!permission) {
		return <View></View>;
		// return <Text>Vous n'avez pas la permission</Text>;
	}

	if (!permission.granted) {
		// return <View></View>;
		// alert("Permission for media access needed.");
		// return <Text>Vous n'avez pas la permission</Text>;
		return (
			<View style={styles.container}>
				<Text style={{ textAlign: "center" }}>
					We need your permission to show the camera
				</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	// function toggleCameraType() {
	// 	setType((current) =>
	// 		current === CameraType.back ? CameraType.front : CameraType.back
	// 	);
	// }

	return (
		<View style={styles.container}>
			<Camera style={styles.camera} type={type}>
				{/* <View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={toggleCameraType}>
						<Text style={styles.text}>Flip Camera</Text>
					</TouchableOpacity>
				</View> */}
				<Button
					title="Take a picture"
					onPress={() => console.log("Pressed")}
				></Button>
			</Camera>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#fff",
		// alignItems: "center",
		justifyContent: "center",
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {},
	button: {},
	text: {},
});
