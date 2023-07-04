import React from "react";
import { Camera } from "expo-camera";
import { useRef } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";

export default function CameraScreen() {
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const cameraRef = useRef(null);
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
	return (
		<View style={styles.container}>
			<Camera style={styles.camera} ref={cameraRef}>
				<Button
					title="Take a picture"
					// onPress={() => console.log("Pressed")}
					// onPress={async () => {
					// 	const pictureMetadata = await cameraRef.current.takePictureAsync();
					// 	console.log("pictureMetadata", pictureMetadata);
					// }}
					onPress={async () => {
						const pictureMetadata = await cameraRef.current.takePictureAsync();
						console.log("pictureMetadata", pictureMetadata);
						console.log(
							// resizing picture
							// uri nom du fichier present dans le cache du telephone
							await ImageManipulator.manipulateAsync(pictureMetadata.uri, [
								{ resize: { width: 800 } },
							])
						);
					}}
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
