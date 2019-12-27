import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, FlatList, Dimensions, SafeAreaView } from 'react-native';

import styles from './styles/filter';
import table from './styles/table';

import search from '../../assets/search.png';
import close from '../../assets/whiteclose.png';
import forward from '../../assets/forward.png';

import Data from './inventorydata.json';

const Row = (props) => {
	return (
		<TouchableOpacity activeOpacity={1} style={table.row} onPress={() => props.viewRow(props.rowdata)}>
			<Text style={table.text1}>{props.rowdata.name}</Text>
			<Text style={table.text}>{props.rowdata.code}</Text>
			<Text style={table.text}>{props.rowdata.status}</Text>
			<Image source={forward} style={table.forward} />
		</TouchableOpacity>
	);
};

class datatable extends React.Component {
	constructor(props) {
		super(props);
		let filterobject = {
			All: Data.length,
			'In stock': 0,
			'Low in stock': 0,
			'Not available': 0
		};
		for (let j = 0; j < Data.length; j++) {
			filterobject[Data[j].status] += 1;
		}
		this.state = {
			showsearch: false,
			activefilter: 'All',
			loadeddata: Data.slice(0, 50),
			start: 50,
			refreshing: false,
			filters: filterobject,
			searchtext: ''
		};
	}

	viewRow = (rowdata) => {
		this.props.navigation.navigate('View',{rowdata})
	}

	header = [ 'Item name', 'Code', 'Status' ];

	changesearch = () => {
		this.setState({ showsearch: !this.state.showsearch});
	};

	applysearch = (val) => {
		this.setState({ searchtext: val.nativeEvent.text },()=>this.changefilter(null, this.state.activefilter, true));
	};

	changefilter = (e, val, search) => {
		if (val != this.state.activefilter || search == true) {
			this.setState({ refreshing: true, start: 50 });
			let data = Data.slice(0, 50);
			let filteredarray = [];
			if (val != 'All') {
				for (let i = 0; i < data.length; i++) {
					if (data[i].status == val && data[i].code.toString().indexOf(this.state.searchtext) > -1) {
						filteredarray.push(data[i]);
					}
				}
			} else {
				for (let i = 0; i < data.length; i++) {
					if (data[i].code.toString().indexOf(this.state.searchtext) > -1) {
						filteredarray.push(data[i]);
					}
				}
			}
			this.setState({
				activefilter: val,
				loadeddata: [ ...filteredarray ],
				refreshing: false
			});
		}
	};

	addData = () => {
		this.setState({ refreshing: true });
		let slicedarray = Data.slice(this.state.start, this.state.start + 50);
		let filteredarray = [];
		if (this.state.activefilter != 'All') {
			for (let i = 0; i < slicedarray.length; i++) {
				if (
					slicedarray[i].status == this.state.activefilter &&
					slicedarray[i].code.toString().indexOf(this.state.searchtext) > -1
				) {
					filteredarray.push(slicedarray[i]);
				}
			}
		} else {
			for (let i = 0; i < slicedarray.length; i++) {
				if (slicedarray[i].code.toString().indexOf(this.state.searchtext) > -1) {
					filteredarray.push(slicedarray[i]);
				}
			}
		}
		this.setState({
			loadeddata: [ ...this.state.loadeddata, ...filteredarray ],
			start: this.state.start + 50,
			refreshing: false
		});
	};

	render() {
		return (
			<React.Fragment>
				<SafeAreaView style={{backgroundColor:"#507df0"}}>
					<View style={styles.container}>
						<View style={styles.topbar}>
							{this.state.showsearch == false ? (
								<React.Fragment>
									<Text style={styles.navheading}>Inventory</Text>
									<TouchableOpacity
										activeOpacity={1}
										style={styles.searchcontainer}
										onPress={this.changesearch}
									>
										<Image source={search} style={styles.searchimage} />
									</TouchableOpacity>
								</React.Fragment>
							) : (
								<React.Fragment>
									<TextInput
										placeholder="Enter item code"
										style={styles.searchbar}
										placeholderTextColor="#fff"
										defaultValue={this.state.searchtext}
										onSubmitEditing={(e) => this.applysearch(e)}
									/>
									<TouchableOpacity
										activeOpacity={1}
										style={styles.closeimagecontainer}
										onPress={this.changesearch}
									>
										<Image source={close} style={styles.closeimage} />
									</TouchableOpacity>
								</React.Fragment>
							)}
						</View>
						<ScrollView style={styles.filterbar} horizontal={true} showsHorizontalScrollIndicator={false}>
							{Object.keys(this.state.filters).map((item, i) => (
								<TouchableOpacity
									style={[
										this.state.activefilter == item ? styles.activefilter : styles.normalfilter,
										i == 0 ? styles.firstfilter : null
									]}
									activeOpacity={1}
									key={i}
									onPress={(e) => this.changefilter(e, item, false)}
								>
									<Text
										style={
											this.state.activefilter == item ? styles.activefiltertext : styles.filtertext
										}
									>
										{item} ({this.state.filters[item]})
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
						<View style={table.tableheader}>
							{this.header.map((item, i) => (
								<Text style={i == 0 ? table.header1 : table.header}>{item}</Text>
							))}
							<TouchableOpacity style={table.addbutton}>
								<Text style={table.addtext}>+Add</Text>
							</TouchableOpacity>
						</View>
					</View>
				</SafeAreaView>
				<FlatList
					style={{ flex: 1, marginTop: 5 }}
					data={this.state.loadeddata}
					renderItem={({ item }) => <Row key={item.code} id={item.code} rowdata={item} viewRow={this.viewRow} />}
					keyExtractor={(item) => item.code.toString()}
					showsVerticalScrollIndicator={false}
					refreshing={this.state.refreshing}
					onEndReached={this.addData}
					onEndReachedThreshold={25}
				/>
			</React.Fragment>
		);
	}
}

export default datatable;
