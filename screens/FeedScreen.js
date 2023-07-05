import React, { useCallback, useState, useEffect } from "react";
import {
	FlatList,
	StyleSheet,
	Image,
	RefreshControl,
	ScrollView,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";

export default function FeedScreen() {
	const [serverImagesUrls, setServerImagesUrls] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		(async () => {
			// Par défaut, on met le refresh à `true`, pour indiquer que l'on est en train de rafraichir
			setRefreshing(true);

			if (serverImagesUrls.length > 0) {
				// On recharge la liste des images pour avoir les dernières
				try {
					const filesUrl = await axios.get(
						"https://wildstagram.nausicaa.wilders.dev/list"
					);

					// On met à jour la liste des images (dans le state)
					setServerImagesUrls(filesUrl.data);
				} catch (err) {
					// On pourrait aller plus loin
					// en cherchant à afficher des messages d'erreurs
					// par exemple, en ayant défini un state `error` au préalable
					// et en l'affichant dans le cas où elle est définie
					console.log("au dessus", err);

					setTimeout(() => {
						setRefreshing(false);
					}, 1000);
				}

				// On indique que le rafraichissement est terminé, en remettant le state à `false`
				setRefreshing(false);
			}
		})();
	});

	useFocusEffect(
		useCallback(() => {
			// je recupere les images
			(async () => {
				try {
					const filesUrl = await axios.get(
						"https://wildstagram.nausicaa.wilders.dev/list"
					);
					console.log("filesurls", filesUrl.data);
					setServerImagesUrls(filesUrl.data);
				} catch (err) {
					console.log("ici", err);
				}
			})();
		}, [])
	);

	// return <Text>Feed Screen</Text>;
	return serverImagesUrls.length > 0 ? (
		// <ScrollView

		// >
		<FlashList
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
			estimatedItemSize={200}
			data={serverImagesUrls}
			keyExtractor={(serverImagesUrls) => serverImagesUrls}
			renderItem={(itemData) => {
				console.log("item", itemData);
				return (
					<>
						<Image
							style={styles.image}
							source={{
								uri:
									"https://wildstagram.nausicaa.wilders.dev/files/" +
									itemData.item,
							}}
						/>
					</>
				);
			}}
		/>
	) : // <FlatList
	// 	// Le state indiquant que la liste est en train d'être rafraichie
	// 	// refreshing={refreshing}
	// 	// La fonction qui sera appelée lorsque l'on rafraichira la liste
	// 	// onRefresh={onRefresh}
	// 	data={serverImagesUrls}
	// 	keyExtractor={(serverImagesUrls) => serverImagesUrls}
	// 	renderItem={(itemData) => {
	// 		console.log("item", itemData);
	// 		return (
	// 			<>
	// 				<Image
	// 					style={styles.image}
	// 					source={{
	// 						uri:
	// 							"https://wildstagram.nausicaa.wilders.dev/files/" +
	// 							itemData.item,
	// 					}}
	// 				/>
	// 			</>
	// 		);
	// 	}}
	// />
	// </ScrollView>
	null;
}
const styles = StyleSheet.create({
	image: {
		resizeMode: "contain",
		height: 500,
	},
});
