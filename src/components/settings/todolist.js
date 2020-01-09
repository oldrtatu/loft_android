import React from 'react';
import { Text, SafeAreaView, ScrollView, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import styles from './styles/todolist';

import topnav from '../../assets/topnav.png';
import forward from '../../assets/forward.png';

class ToDoList extends React.Component {
	constructor(props) {
		super(props);
	}

	data = [ { key: 'Purchase Order' }, { key: 'Inventory' }, { key: 'Personal' } ];

	render() {
		return (
			<SafeAreaView style={{ backgroundColor: '#507df0', flex: 1 }}>
				<View style={{ flex: 1, backgroundColor: '#f6f7f9' }}>
					<View style={styles.containerStyle}>
						<View style={styles.topbar}>
							<ImageBackground source={topnav} style={styles.background}>
								<Text style={styles.username}>Hello! John Doe</Text>
								<Text style={styles.username}>Here is a list of things to do</Text>
							</ImageBackground>
						</View>
					</View>
					<SwipeListView
						data={this.data}
						renderItem={data => (
							<TouchableOpacity activeOpacity={1} style={styles.row}>
								<Text style={styles.text}>{data.item.key}</Text>
								<Image style={styles.forward} source={forward}></Image>
							</TouchableOpacity>
						)}
						style={styles.liststyle}
					/>
				</View>
			</SafeAreaView>
		);
	}
}

export default ToDoList;
