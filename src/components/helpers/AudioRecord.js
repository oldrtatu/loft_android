import React from 'react';
import AudioRecord from 'react-native-audio-record';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import microphone from '../../assets/microphone.png';

class Audio extends React.Component {
	constructor(props) {
		super(props);
	}

	recordAudio = async () => {
		const options = {
			sampleRate: 16000, // default 44100
			channels: 1, // 1 or 2, default 1
			bitsPerSample: 16, // 8 or 16, default 16
			audioSource: 6, // android only (see below)
			wavFile: 'test.wav' // default 'audio.wav'
		};
		AudioRecord.init(options);
		AudioRecord.start();
		audioFile = await AudioRecord.stop();
		console.log(audioFile);
		AudioRecord.on('data', (data) => {
			// base64-encoded audio data chunks
			console.log(data);
		});
	};
	render() {
		return (
			<React.Fragment>
				<TouchableOpacity
					activeOpacity={1}
					onPress={this.recordAudio}
					style={{ width: Dimensions.get('window').width * 0.85, alignSelf: 'center' }}
				>
					<Text style={styles.value}>{''}</Text>
					<Text style={styles.label}>Add audio</Text>
					<View style={styles.dropbuttoncontainer}>
						<Image source={microphone} style={styles.image} />
					</View>
				</TouchableOpacity>
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
		height: 55,
		borderWidth: 1,
		borderColor: 'rgba(230,230,230,0.6)',
		backgroundColor: 'rgba(230,230,230,0.6)',
		marginTop: 10,
		paddingTop: 25,
		width: Dimensions.get('window').width * 0.85,
		alignSelf: 'center'
	},
	label: {
		flex: 1,
		fontSize: 12,
		fontWeight: '700',
		color: 'rgba(80,86,101,0.36)',
		marginTop: -47,
		marginLeft: 30,
		width: Dimensions.get('window').width * 0.85,
		alignSelf: 'center',
		marginBottom: 33
	},
	dropbuttoncontainer: {
		position: 'absolute',
		right: 17,
		top: 30
	},
	image: {
		width: 15,
		height: 15,
		resizeMode: 'contain'
	},
	datepicker: {
		position: 'absolute',
		top: 100,
		height: 100
	}
});

export default Audio;
