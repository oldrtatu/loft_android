import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

import back from '../../assets/back.png';

import styles from './style';

export default class Reports extends React.Component {
	constructor(props) {
		super(props);
	}

	goback = () => {
		this.props.navigation.goBack(null);
	};

	render() {
		return (
			<React.Fragment>
				<View style={styles.topbar}>
					<TouchableOpacity activeOpacity={1} style={styles.backcontainer} onPress={this.goback}>
						<Image source={back} style={styles.backimage} />
					</TouchableOpacity>
					<Text style={styles.heading}>Reports</Text>
				</View>
				<ScrollView style={{marginTop:-110}}>
					<View style={styles.card}>
						<View style={styles.cardheadingcontainer}>
							<Text style={styles.cardheading}>Assets</Text>
						</View>
						<View style={styles.cardData}>
							<View style={styles.cardData1}>
								<Text style={styles.cardDataheading}>Current month</Text>
								<Text style={styles.cardDatavalue}>$ 70,000 </Text>
							</View>
							<View style={styles.cardData1}>
								<Text style={styles.cardDataheading}>Previous month</Text>
								<Text style={styles.cardDatavalue}>$ 80,000 </Text>
							</View>
						</View>
						<LineChart
							data={{
								labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep' ],
								datasets: [
									{
										data: [
											Math.random() * 100,
											Math.random() * 100,
											Math.random() * 100,
											Math.random() * 100,
											Math.random() * 100,
											Math.random() * 100,
											Math.random() * 100,
											Math.random() * 100,
											Math.random() * 100
										]
									}
								]
							}}
							width={Dimensions.get('window').width * 0.8} // from react-native
							height={220}
							yAxisLabel={'$'}
							yAxisSuffix={'k'}
							chartConfig={{
								backgroundColor: '#507df0',
								backgroundGradientFrom: '#fff',
								backgroundGradientTo: '#fff',
								decimalPlaces: 2, // optional, defaults to 2dp
								color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
								labelColor: (opacity = 1) => `rgba(137,145, 165, ${opacity})`,
								style: {
									borderRadius: 16,
									backgroundColor: '#fff'
								},
								propsForDots: {
									r: '6',
									strokeWidth: '2',
									stroke: '#507df0'
								},
								propsForBackgroundLines: {
									stroke: '#e6e6e6'
								},
								strokeWidth: 1,
								stroke: '#507df0'
							}}
							style={{
								marginVertical: 8,
								width: Dimensions.get('window').width * 0.8,
								alignSelf: 'center',
								backgroundColor: '#ffffff'
							}}
						/>
					</View>
				</ScrollView>
			</React.Fragment>
		);
	}
}
