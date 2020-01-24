import React from 'react';
import {
	Text,
	ScrollView,
	TouchableOpacity,
	View,
	Image,
	ActivityIndicator,
	Platform,
	Modal,
	SafeAreaView,
	Dimensions
} from 'react-native';

import viewstyle from '../purchaseorder/styles/poview';
import { GlobalContext } from '../../provider';
import RNFetchBlob from 'rn-fetch-blob';

import back from '../../assets/back.png';
import errorimage from '../../assets/error.png'

class ViewTask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rowdata: null,
			source: '',
			imageview: false
		};
	}

	componentDidMount() {
		this.setState({ rowdata: this.props.navigation.getParam('rowdata') });
	}

	goback = () => {
		this.props.navigation.goBack(null);
	};

	viewAttachment = (item) => {
		let extension = item.substring(item.lastIndexOf('.') + 1, item.length);
		let name = item.substring(item.indexOf('Z') + 1, item.length);
		if (Platform.OS == 'android') {
			let path = `${RNFetchBlob.fs.dirs.DownloadDir}/${name}`;
			if (extension != 'pdf') {
				this.setState({
					source: item,
					imageview: true
				});
			} else {
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
			}
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
	};

	render() {
		return this.state.rowdata != null ? (
			<React.Fragment>
				<SafeAreaView style={{ backgroundColor: '#507df0' }} />
				<View style={viewstyle.topbar}>
					<TouchableOpacity activeOpacity={1} style={viewstyle.backcontainer} onPress={this.goback}>
						<Image source={back} style={viewstyle.backimage} />
					</TouchableOpacity>
					<Text style={viewstyle.heading}>Task# - {this.state.rowdata.id}</Text>
				</View>
				<ScrollView style={viewstyle.restarea}>
					<View style={viewstyle.details}>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Task name</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.name}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Description</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.description}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Status</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.status}</Text>
						</View>
					</View>
					<View style={viewstyle.separator} />
					{this.state.rowdata.imageFile != '' ? (
						<React.Fragment>
							<View style={viewstyle.separator} />
							<View style={viewstyle.details}>
								<View style={viewstyle.paragraph}>
									<Text style={viewstyle.longtextheading}>Image files</Text>
									{this.state.rowdata.imageFile.split(',').map((item, i) => (
										<TouchableOpacity
											activeOpacity={0.5}
											onPress={() => this.viewAttachment(item)}
											key={i}
											style={viewstyle.attachments}
										>
											<Text style={viewstyle.attachmentsname}>
												{item.substring(item.indexOf('Z') + 1, item.length)}
											</Text>
										</TouchableOpacity>
									))}
								</View>
							</View>
						</React.Fragment>
					) : null}
					{this.state.rowdata.documentFile != '' ? (
						<React.Fragment>
							<View style={viewstyle.separator} />
							<View style={viewstyle.details}>
								<View style={viewstyle.paragraph}>
									<Text style={viewstyle.longtextheading}>Documents</Text>
									{this.state.rowdata.documentFile.split(',').map((item, i) => (
										<TouchableOpacity
											activeOpacity={0.5}
											onPress={() => this.viewAttachment(item)}
											key={i}
											style={viewstyle.attachments}
										>
											<Text style={viewstyle.attachmentsname}>
												{item.substring(item.indexOf('Z') + 1, item.length)}
											</Text>
										</TouchableOpacity>
									))}
								</View>
							</View>
						</React.Fragment>
					) : null}
					<View style={{ height: 80 }} />
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
						<Image source={errorimage} style={{ height: 25, width: 25, resizeMode: 'contain' }} />
					</TouchableOpacity>
				</Modal>
			</React.Fragment>
		) : (
			<ActivityIndicator />
		);
	}
}

const taskview = (props) => (
	<GlobalContext.Consumer>{(context) => <ViewTask context={context} {...props} />}</GlobalContext.Consumer>
);
export default taskview;
