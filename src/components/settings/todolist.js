import React from 'react';
import { Text, SafeAreaView, ScrollView, View, ImageBackground } from 'react-native';
import { SwipeableFlatList } from 'react-native-swipeable-flat-list';

import styles from './styles/todolist';

import topnav from '../../assets/topnav.png';
const Row = (item) => console.log(item) || <Text>{item.key}</Text>;

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
					<SwipeableFlatList
						data={this.data}
						renderItem={({ item }) => <Row style={{height:48}} item={item} />}
						style={styles.liststyle}
					/>
				</View>
			</SafeAreaView>
		);
	}
}

export default ToDoList;
