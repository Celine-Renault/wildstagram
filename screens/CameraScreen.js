import React from "react";
import { Camera } from "expo-camera";
import { useRef } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

export default function CameraScreen() {
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const cameraRef = useRef(null);

	const onPress = async () => {
		if (!cameraRef.current) {
			console.log("Error while taking picture");
			return;
		}

		// On prend la photo.
		const pictureMetadata = await cameraRef.current.takePictureAsync();

		// On la redimensionne.
		const resizedImageMetadata = await ImageManipulator.manipulateAsync(
			pictureMetadata.uri,
			[{ resize: { width: 800 } }],
			{ base64: true } // Nécessaire pour contourner un bug d'Expo Go / ImageManipulator.
		);

		// On l'enregistre dans le dossier photos.
		try {
			// On vérifie si le dossier photos existe dans le dossier où l'on peut écrire.
			const photosMetadata = await FileSystem.getInfoAsync(
				FileSystem.documentDirectory + "photos"
			);

			// S'il n'existe pas, on le crée.
			if (photosMetadata.exists === false) {
				await FileSystem.makeDirectoryAsync(
					FileSystem.documentDirectory + "photos"
				);
			}

			// On sauvegarde le fichier base64 dans le dossier photos.
			await FileSystem.writeAsStringAsync(
				FileSystem.documentDirectory +
					"photos/" +
					resizedImageMetadata.uri.split("/").at(-1), // On récupère le nom du fichier original en faisant un split sur le nom du fichier et en prenant le dernier élément du tableau.
				resizedImageMetadata.base64,
				{ encoding: FileSystem.EncodingType.Base64 }
			);
		} catch (err) {}
	};

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
					onPress={onPress}
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
