import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, FlatList, Dimensions, SafeAreaView } from 'react-native';
import {GlobalContext}  from '../../provider'
import {convertback} from '../helpers/convertdata'

import styles from './styles/filter';
import table from './styles/table';

import search from '../../assets/search.png';
import close from '../../assets/whiteclose.png';
import forward from '../../assets/forward.png';



const Row = (props) => {
	return (
		<TouchableOpacity activeOpacity={1} style={table.row} onPress={() => props.viewRow(props.rowdata,props.index)}>
			<Text style={table.text1}>{props.id}</Text>
			<Text style={table.text2}>{props.rowdata.title}</Text>
			<Text style={table.text}>{props.rowdata.status}</Text>
			<Image source={forward} style={table.forward} />
		</TouchableOpacity>
	);
};

let Data = []

class IssuesDataTable extends React.Component {
	constructor(props) {
		super(props);
		this.index = null
		Data = (props.context.issuesdata)? props.context.issuesdata : {}
		Data = convertback(Data)
		let filterobject = {
			ALL: Data.length,
			ASSIGNED: 0,
			OPEN: 0,
			DEFERRED: 0,
			CANCELLED:0,
			COMPLETE:0,
			INCOMPLETE:0
		};
		for (let j = 0; j < Data.length; j++) {
			filterobject[Data[j].status] += 1;
		}
		this.state = {
			showsearch: false,
			activefilter: 'ALL',
			loadeddata: Data.slice(0,50),
			start: 50,
			refreshing: false,
			filters: filterobject,
			searchtext: ''
		};
	}

	UNSAFE_componentWillReceiveProps(newprops){
		Data = convertback(newprops.context.issuesdata)
		this.setState({ refreshing: true, start: 50 });
		let data = Data.slice(0, 50);
		let filteredarray = [];
		if (this.state.activefilter != 'ALL') {
			for (let i = 0; i < data.length; i++) {
				if (data[i].status == this.state.activefilter && data[i].id.toString().indexOf(this.state.searchtext) > -1) {
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
			loadeddata: filteredarray,
			refreshing: false
		});
	}

	viewRow = (rowdata,index) => {
		this.index = index
		rowdata["index"] = index
		this.props.navigation.navigate('View',{rowdata,changeRow:this.changeRow})
	}

	changeRow = (data) => {
		this.setState({refreshing:true})
		let index = data.index

		let previousvalue = {...this.state.loadeddata[index]}
		let newvalue = {...data}

		let filters = {...this.state.filters}
		filters[previousvalue.status] -= 1
		filters[newvalue.status] += 1

		this.setState({refreshing:false,filters})
	}

	addNewIssue = () => {
		this.props.navigation.navigate('Form')
	}

	header = [ '#', 'Title', 'Status' ];

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
			if (val != 'ALL') {
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
		// this.setState({ refreshing: true });
		// let slicedarray = Data.slice(this.state.start, this.state.start + 50);
		// let filteredarray = [];
		// if (this.state.activefilter != 'ALL') {
		// 	for (let i = 0; i < slicedarray.length; i++) {
		// 		if (
		// 			slicedarray[i].status == this.state.activefilter &&
		// 			slicedarray[i].id.toString().indexOf(this.state.searchtext) > -1
		// 		) {
		// 			filteredarray.push(slicedarray[i]);
		// 		}
		// 	}
		// } else {
		// 	for (let i = 0; i < slicedarray.length; i++) {
		// 		if (slicedarray[i].id.toString().indexOf(this.state.searchtext) > -1) {
		// 			filteredarray.push(slicedarray[i]);
		// 		}
		// 	}
		// }
		// this.setState({
		// 	loadeddata: [ ...this.state.loadeddata, ...filteredarray ],
		// 	start: this.state.start + 50,
		// 	refreshing: false
		// });
	};

	render() {
		return (
			<React.Fragment>
				<SafeAreaView style={{backgroundColor:"#507df0"}}>
					<View style={styles.container}>
						<View style={styles.topbar}>
							{this.state.showsearch == false ? (
								<React.Fragment>
									<Text style={styles.navheading}>Issues</Text>
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
										placeholder="Enter Issue#"
										style={styles.searchbar}
										placeholderTextColor="rgba(255,255,255,0.6)"
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
								<Text key={i} style={i == 0 ? table.header1 : ((i == 1) ? table.header2 : table.header)}>{item}</Text>
							))}
							<TouchableOpacity style={table.addbutton} onPress={this.addNewIssue}>
								<Text style={table.addtext}>+Add</Text>
							</TouchableOpacity>
						</View>
					</View>
				</SafeAreaView>
				<FlatList
					style={{ flex: 1, paddingTop: 5 ,backgroundColor:"#F6F7F9" }}
					data={this.state.loadeddata}
					renderItem={({ item ,index}) => <Row key={item.id} id={item.id} rowdata={item} viewRow={this.viewRow} index={index} />}
					keyExtractor={(item) => item.id.toString()}
					showsVerticalScrollIndicator={false}
					refreshing={this.state.refreshing}
					onEndReached={this.addData}
					onEndReachedThreshold={25}
				/>
			</React.Fragment>
		);
	}
}

const datatable = (props) => (
	<GlobalContext.Consumer>{(context) => <IssuesDataTable context={context} {...props} />}</GlobalContext.Consumer>
);


export default datatable;
