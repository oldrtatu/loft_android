import React from 'react';
import {
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	View,
	Alert,
	Image,
	ScrollView,
	Modal,
	SafeAreaView,
	Platform
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import ImagePicker from 'react-native-image-picker';
import ImageView from 'react-native-image-viewing';
import DocumentPicker from 'react-native-document-picker';
import PDF from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';

import deleteimage from '../../assets/error.png';

const options = {
	title: 'Select images',
	storageOptions: {
		skipBackup: false,
		path: 'images'
	},
	allowsEditing: true
};

class AttachmentField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: [],
			height: 55,
			imageview: false,
			viewimage: '',
			source: '',
			pdfview: false
		};
	}

	chooseType = () => {
		Alert.alert(
			'Select attachment type',
			'',
			[
				{ text: 'Pick image', onPress: () => this.addimages() },
				{ text: 'Pick document', onPress: () => this.addDocuments() },
				{
					text: 'Cancel',
					style: 'cancel'
				}
			],
			{ cancelable: false }
		);
	};

	addDocuments = async () => {
		let results = await DocumentPicker.pickMultiple({ type: DocumentPicker.types.pdf,readContent:true }).catch((err) => {
			if (DocumentPicker.isCancel(err)) {
				Snackbar.show({
					title: 'Cancelled document picker',
					duration: Snackbar.LENGTH_SHORT,
					backgroundColor: '#D62246'
				});
				return;
			} else {
				return;
			}
		});
		if (results == undefined) {
			return;
		}
		for (const res of results) {
			let value = [ ...this.state.value ];
			let ob = { ...res };
			ob['new'] = true;
			value.push(ob);
			this.setState({ value, height: 55 + value.length * 35 },()=>this.props.sendfiles(this.state.value));
		}
	};

	deleteRow = (item) => {
		let value = [ ...this.state.value ];
		for (let i in value) {
			if (value[i]['name'] == item.name) {
				value.splice(i, 1);
				break;
			}
		}
		this.setState({ value, height: 55 + value.length * 35 });
	};

	viewRow = (item) => {
		let name = item.name.toLowerCase();
		if (name.includes('.png') || name.includes('.jpg') || name.includes('.jpeg')) {
			if (item.new) {
				this.setState({
					viewimage: [ { uri: item.uri } ],
					imageview: true
				});
			}
		} else if (name.includes('.pdf')) {
			if (item.new) {
				if (Platform.OS == 'ios') {
					RNFetchBlob.ios.openDocument(item.uri);
				} else if (Platform.OS == 'android') {
					const android = RNFetchBlob.android;
					android.actionViewIntent(item.uri, 'application/pdf');
				}
			}
		}
	};

	addimages = () => {
		ImagePicker.showImagePicker(options, async (res) => {
			let err = '';
			if (res.didCancel) {
				err = 'You cancelled image picking';
			} else if (res.error) {
				err = res.error;
			} else {
				let arr = [ ...this.state.value ];
				let ob = { ...res };
				ob['name'] = res.fileName;
				ob['new'] = true;
				arr.push(ob);
				this.setState({ value: arr, height: 55 + arr.length * 35 },()=>this.props.sendfiles(this.state.value));
			}
			if (err != '') {
				Snackbar.show({
					title: err,
					duration: Snackbar.LENGTH_SHORT,
					backgroundColor: '#D62246'
				});
			}
		});
	};

	render() {
		return (
			<View style={{ width: Dimensions.get('window').width * 0.85, alignSelf: 'center' }}>
				<TouchableOpacity
					activeOpacity={1}
					onPress={this.chooseType}
					style={{ width: Dimensions.get('window').width * 0.85, alignSelf: 'center', height: 50 }}
				>
					<Text style={styles.label}>Attachments</Text>
				</TouchableOpacity>
				<ScrollView style={[styles.value,{height:this.state.height}]} showsVerticalScrollIndicator={true}>
					{this.state.value.map((item, i) => (
						<View key={i} style={styles.attachmentrow}>
							<TouchableOpacity
								activeOpacity={1}
								onPress={() => this.viewRow(item)}
								style={styles.attachmentname}
							>
								<Text style={styles.name}>{item.name}</Text>
							</TouchableOpacity>
							<TouchableOpacity
								activeOpacity={1}
								style={styles.deletecontainer}
								onPress={() => this.deleteRow(item)}
							>
								<Image style={styles.deleteimage} source={deleteimage} />
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>
				<ImageView
					images={this.state.viewimage}
					imageIndex={0}
					visible={this.state.imageview}
					onRequestClose={() => this.setState({ imageview: false })}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	value: {
		flex: 1,
		paddingLeft: 15,
		color: '#131d4a',
		fontSize: 12,
		maxHeight: 100,
		minHeight:100,
		backgroundColor: 'rgba(230,230,230,0.6)',
		width: Dimensions.get('window').width * 0.85,
		alignSelf: 'center',
		position: 'absolute',
		top: 44.2,
		minHeight: 80
	},
	label: {
		fontSize: 12,
		fontWeight: '700',
		color: 'rgba(80,86,101,0.36)',
		width: Dimensions.get('window').width * 0.85,
		backgroundColor: 'rgba(230,230,230,0.6)',
		alignSelf: 'center',
		position: 'absolute',
		top: 14,
		paddingLeft: 15,
		paddingTop: 8,
		zIndex: 10,
		height: 30
	},
	attachmentrow: {
		height: 35,
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center'
	},
	attachmentname: {
		flex: 1
	},
	name: {
		color: '#131d4a',
		fontSize: 12
	},
	deletecontainer: {
		width: 30,
		height: 30,
		position: 'absolute',
		right: 10,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 1
	},
	deleteimage: {
		width: 15,
		height: 15,
		resizeMode: 'contain'
	},
	pdf: {
		flex: 1,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	},
	closebutton: {
		position: 'absolute',
		top: 50,
		right: 20,
		width: 80,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#D52246'
	},
	closetext: {
		fontSize: 12,
		color: '#fff'
	}
});

export default AttachmentField;
