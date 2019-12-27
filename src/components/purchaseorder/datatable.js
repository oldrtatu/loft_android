import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, FlatList, Dimensions } from 'react-native';

import styles from './styles/filter';
import table from './styles/table';

import search from '../../assets/search.png';
import close from '../../assets/whiteclose.png';
import forward from '../../assets/forward.png';

import Data from './podata.json';

const Row = (props) => {
	return (
		<TouchableOpacity activeOpacity={1} style={table.row}>
			<Text style={table.text1}>{props.id}</Text>
			<Text style={table.text}>{props.rowdata.equipment}</Text>
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
			Active: 0,
			Complete: 0,
			Invoiced: 0,
			'Entered in QB': 0
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
	header = [ 'PO #', 'Equipment', 'Status' ];

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
					if (data[i].status == val && data[i].id.toString().indexOf(this.state.searchtext) > -1) {
						filteredarray.push(data[i]);
					}
				}
			} else {
				for (let i = 0; i < data.length; i++) {
					if (data[i].id.toString().indexOf(this.state.searchtext) > -1) {
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
					slicedarray[i].id.toString().indexOf(this.state.searchtext) > -1
				) {
					filteredarray.push(slicedarray[i]);
				}
			}
		} else {
			for (let i = 0; i < slicedarray.length; i++) {
				if (slicedarray[i].id.toString().indexOf(this.state.searchtext) > -1) {
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
				<View style={styles.container}>
					<View style={styles.topbar}>
						{this.state.showsearch == false ? (
							<React.Fragment>
								<Text style={styles.navheading}>Purchase orders</Text>
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
									placeholder="Enter PO#"
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
				<FlatList
					style={{ flex: 1, marginTop: 5 }}
					data={this.state.loadeddata}
					renderItem={({ item }) => <Row id={item.id} rowdata={item} />}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
					refreshing={this.state.refreshing}
					onEndReached={this.addData}
					onEndReachedThreshold={20}
				/>
			</React.Fragment>
		);
	}
}

export default datatable;
