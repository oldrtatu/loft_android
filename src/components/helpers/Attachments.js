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
	Platform
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { GlobalContext } from '../../provider';
import { UIActivityIndicator } from 'react-native-indicators';

import { add_attachment } from '../../provider/updatedata';

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
			pdfview: false,
			uploading: false
		};
	}

	componentDidMount() {
		if (this.props.files != null) {
			this.setState({ value: [ ...this.props.files.split(',') ] }, () => console.log(this.state.value));
		}
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
		let results = await DocumentPicker.pickMultiple({
			type: DocumentPicker.types.pdf,
			readContent: true
		}).catch((err) => {
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

		this.setState({ uploading: true });
		for (const res of results) {
			this.setState({ uploading: true });
			let str = '';
			let form = new FormData();
			let data = { ...res };
			form.append('file', {
				name: data.name,
				type: data.type,
				uri: Platform.OS === 'android' ? data.uri : data.uri.replace('file://', '')
			});
			await add_attachment(this.props.context.url, this.props.context.token, form)
				.then((res) => {
					str = res.url;
					this.setState(
						{
							value: [ ...this.state.value, str ],
							height: 55 + (this.state.value.length + 1) * 35,
							uploading: false
						},
						() => this.props.sendfiles(this.state.value)
					);
				})
				.catch((err) => {
					Snackbar.show({
						title: err.message,
						backgroundColor: '#D62246',
						duration: Snackbar.LENGTH_SHORT
					});
				});
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
		let extension = item.substring(item.lastIndexOf('.') + 1, item.length);
		let name = item.substring(item.indexOf('Z') + 1, item.length);
		if (Platform.OS == 'android') {
			let path = `${RNFetchBlob.fs.dirs.DownloadDir}/${name}`;
			RNFetchBlob.config({
				addAndroidDownloads: {
					useDownloadManager: true,
					title: name,
					description: 'View document',
					mime: `application/${extension}`,
					mediaScannable: true,
					path: path,
					notification: true
				}
			})
				.fetch('GET', this.props.context.url + item, {
					Authorization: `Bearer ${this.props.context.token}`
				})
				.then((res) => {
					const android = RNFetchBlob.android;
					android.actionViewIntent(res.path(), `application/${extension}`);
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (Platform.OS == 'ios') {
			if (extension != 'pdf') {
				this.setState({
					source: item,
					imageview: true
				});
			} else {
				let path = `${RNFetchBlob.fs.dirs.DownloadDir}/${name}`;
				RNFetchBlob.config({
					path,
					overwrite: true
				})
					.fetch('GET', this.props.context.url + item, {
						Authorization: `Bearer ${this.props.context.token}`
					})
					.then((res) => {
						RNFetchBlob.ios.openDocument(res.path());
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	}

	addimages = async () => {
		ImagePicker.showImagePicker(options, async (res) => {
			let err = '';
			if (res.didCancel) {
				err = 'You cancelled image picking';
			} else if (res.error) {
				err = res.error;
			} else {
				this.setState({ uploading: true });
				let str = '';
				let form = new FormData();
				let data = { ...res };
				form.append('file', {
					name: data.fileName,
					type: data.type,
					uri: Platform.OS === 'android' ? data.uri : data.uri.replace('file://', '')
				});
				await add_attachment(this.props.context.url, this.props.context.token, form)
					.then((res) => {
						str = res.url;
						this.setState(
							{
								value: [ ...this.state.value, str ],
								height: 55 + (this.state.value.length + 1) * 35,
								uploading: false
							},
							() => this.props.sendfiles(this.state.value)
						);
					})
					.catch((err) => {
						Snackbar.show({
							title: err.message,
							backgroundColor: '#D62246',
							duration: Snackbar.LENGTH_SHORT
						});
					});
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
			<React.Fragment>
				<View style={{ width: Dimensions.get('window').width * 0.85, alignSelf: 'center' }}>
					<TouchableOpacity
						activeOpacity={1}
						onPress={this.chooseType}
						style={{ width: Dimensions.get('window').width * 0.85, alignSelf: 'center', height: 50 }}
					>
						<Text style={styles.label}>Attachments</Text>
					</TouchableOpacity>
					<ScrollView
						style={[ styles.value, { height: this.state.height } ]}
						showsVerticalScrollIndicator={true}
					>
						{this.state.value.map((item, i) => (
							<View key={i} style={styles.attachmentrow}>
								<TouchableOpacity
									activeOpacity={1}
									onPress={() => this.viewRow(item)}
									style={styles.attachmentname}
								>
									<Text style={styles.name}>
										{item.name ? item.name : item.replace('/uploads/', '')}
									</Text>
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
					<Modal visible={this.state.imageview} transparent={false} animated={true}>
						<Image
							source={{
								uri: this.props.context.url + this.state.source,
								headers: {
									Authorization: `Bearer ${this.props.context.token}`
								},
								method: 'GET'
							}}
							style={{
								width: Dimensions.get('window').width,
								resizeMode: 'contain',
								height: Dimensions.get('window').height
							}}
						/>
						<TouchableOpacity
							activeOpacity={0.5}
							style={{ position: 'absolute', top: 50, right: 0, height: 50, width: 50 }}
							onPress={() => this.setState({ imageview: false })}
						>
							<Image source={deleteimage} style={{ height: 15, width: 15, resizeMode: 'contain' }} />
						</TouchableOpacity>
					</Modal>
				</View>

				<Modal animated={false} visible={this.state.uploading} transparent={true}>
					<View
						style={{
							backgroundColor: '#000',
							width: Dimensions.get('window').width,
							height: Dimensions.get('window').height,
							opacity: 0.7
						}}
					/>
					<View
						style={{
							position: 'absolute',
							top: 0,
							justifyContent: 'center',
							width: Dimensions.get('window').width,
							height: Dimensions.get('window').height
						}}
					>
						<UIActivityIndicator color="#fff" size={50} />
					</View>
				</Modal>
			</React.Fragment>
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
		minHeight: 100,
		backgroundColor: 'rgba(230,230,230,0.6)',
		width: Dimensions.get('window').width * 0.85,
		alignSelf: 'center',
		marginTop: -6
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

const attachment = (props) => (
	<GlobalContext.Consumer>{(context) => <AttachmentField context={context} {...props} />}</GlobalContext.Consumer>
);

export default attachment;
