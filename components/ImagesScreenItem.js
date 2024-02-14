import { Image, StyleSheet, Button, View } from "react-native";
import singleFileUploader from "single-file-uploader";
import Constants from "expo-constants";
import * as FileSystem from "expo-file-system";

export default function ImagesScreenItem({
	itemData,
	imagesURI,
	setImagesURI,
}) {
	return (
		<>
			<Image
				style={styles.image}
				source={{
					uri: FileSystem.documentDirectory + "photos/" + itemData.item,
				}}
			/>
			{/* ajout bouton pour telepcharger un fichier */}
			<View style={styles.layoutButton}>
				<Button
					title="Upload"
					onPress={async () => {
						try {
							await singleFileUploader({
								distantUrl: "https://wildstagram.nausicaa.wilders.dev/upload",
								expectedStatusCode: 201,
								filename: itemData.item,
								filetype: "image/jpeg",
								formDataName: "fileData",
								localUri:
									FileSystem.documentDirectory + "photos/" + itemData.item,
								token: Constants.expoConfig.extra.token,
							});
							alert("Uploaded");
						} catch (err) {
							alert("Error");
						}
					}}
				/>
				{/* ajout bouton pour supprimer un fichier */}
				<Button
					title="Delete"
					onPress={async () => {
						await FileSystem.deleteAsync(
							FileSystem.documentDirectory + "photos/" + itemData.item
						);
						// Mettre à jour la liste des images

						setImagesURI(
							// On met à jour la liste, en filtrant l'image qui vient d'être supprimée
							// imageURI = ["image1.png","image2.png","image3.png"]
							// Imaginons qu'on vient de supprimer image2.png
							// On filtre imagesURI, pour se débarasser de l'objet qui contient image2.png
							imagesURI.filter((imageURI) => imageURI !== itemData.item)
						);
					}}
				/>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	image: {
		resizeMode: "cover",
		height: 500,
	},
	layoutButton: {
		flexDirection: "row",
		justifyContent: "center",
	},
});
