import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown'

import back from '../../assets/back.png';

import styles from './style';

let months = [{
	value: 'Jan',
  }, {
	value: 'Feb',
  }, {
	value: 'Mar',
  }, {
	value: 'Apr',
  }, {
	value: 'May',
  }, {
	value: 'Jun',
  }, {
	value: 'Jul',
  }, {
	value: 'Aug',
  }, {
	value: 'Sep',
  }, {
	value: 'Oct',
  }, {
	value: 'Nov',
  }, {
	value: 'Dec',
  }]
let year = []

for(let i = 2000; i<= 2020 ;i++){
	let ob = {}
	ob["value"] = i
	year.push(ob)
}

export default class Reports extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected : 70000
		}
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
						<View style={styles.cardData}>
							<View style={styles.cardData1}>
								<Text style={styles.cardDataheading}>Selected month</Text>
								<Text style={styles.cardDatavalue}>$ {this.state.selected} </Text>
							</View>
							<View style={styles.cardData2}>
								<View style={{flex:1,paddingHorizontal:10}}>
									<Dropdown label="" value="Feb" data={months} /> 
								</View>
								<View style={{flex:1,paddingHorizontal:10}}>
									<Dropdown label="" value="2000" data={year} /> 
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
			</React.Fragment>
		);
	}
}
