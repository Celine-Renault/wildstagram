import React, { useState, useCallback } from "react";
import { Image, FlatList, StyleSheet } from "react-native";
// import {View, Image, StyleSheet, Text} from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";

export default function ImageScreen() {
	const [imagesURI, setImagesURI] = useState([]);
	useFocusEffect(
		// ce hook useFocusEffect déclanche l'action du montage du composant à chaque fois qu'on navigue sur l'écran
		useCallback(() => {
			(async () => {
				const images = await FileSystem.readDirectoryAsync(
					// cacheDirectory dossier des caches de mon app dans lequels sont enregistré les photos
					// fonction FileSystem.cacheDirectory pour lire le dossier dans un Hook useFocusEffect
					FileSystem.cacheDirectory + "ImageManipulator"
				);
				console.log("images", images);
				setImagesURI(images);
			})();
		}, [])
	);

	return imagesURI.length > 0 ? (
		// affichage d'une liste d'images, d'éléments de manière optimisées
		<FlatList
			data={imagesURI}
			keyExtractor={(imageURI) => imageURI}
			renderItem={(itemData) => {
				console.log("item", itemData);
				return (
					<Image
						style={styles.image}
						source={{
							uri:
								FileSystem.cacheDirectory + "ImageManipulator/" + itemData.item,
						}}
					/>
				);
			}}
		/>
	) : null;

	// lecture/affichage d'une photo avec le core components Images
	// return imagesURI.length > 0 ? (
	// 	<Image
	// 		style={{
	// 			flex: 1,
	// 			resizeMode: "cover",
	// 			height: 500,
	// 		}}
	// 		source={{
	// 			uri: FileSystem.cacheDirectory + "ImageManipulator/" + imagesURI[0],
	// 		}}
	// 	/>
	// ) : null;

	// return <Text>Image Screen</Text>;
	// lire le contenu du dossier cache de mon app qui contient les images
	// useFocusEffect(
	// 	useCallback(() => {
	// 		(async () => {
	// 			const cache = await FileSystem.readDirectoryAsync(
	// 				FileSystem.cacheDirectory
	// 			);
	// 			console.log("cache", cache);
	// 		})();
	// 	}, [])
	// );
}

const styles = StyleSheet.create({
	image: {
		resizeMode: "cover",
		height: 500,
	},
});
