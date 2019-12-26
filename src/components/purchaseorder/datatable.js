import React from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image,
	TextInput,
	FlatList,
	Dimensions
} from 'react-native';

import styles from './styles/filter';
import table from './styles/table';

import search from '../../assets/search.png';
import close from '../../assets/whiteclose.png';

import Data from './podata.json';

const Row = (props) => {
    console.log(props)
	return (
		<View style={table.row}>
			<Text style={table.text1}>{props.id}</Text>
            <Text style={table.text}>{props.rowdata.equipment}</Text>
            <Text style={table.text}>{props.rowdata.status}</Text>
		</View>
	);
};

class datatable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showsearch: false,
			activefilter: 'All',
			loadeddata: Data.slice(0, 20),
			start: 20
		};
	}

	filters = [ 'All', 'Active', 'Complete', 'Invoiced', 'Entered in QB' ];
	header = [ 'PO #', 'Equipment', 'Status' ];

	changesearch = () => {
		this.setState({ showsearch: !this.state.showsearch });
	};

	changefilter = (e, val) => {
		this.setState({
			activefilter: val
		});
    };
    
    addData = () => {
        let arr = [...this.state.loadeddata, Data.slice(this.state.start, this.state.start+20)]
        console.log(arr)
        this.setState({
            loadeddata: arr,
            start: this.state.start+20
        })
    }

	render() {
		return (
			<React.Fragment>
				<View style={styles.container}>
					<View style={styles.topbar}>
						{this.state.showsearch == false ? (
							<React.Fragment>
								<Text style={styles.navheading}>Purchase orders</Text>
								<TouchableOpacity activeOpacity={1} style={styles.searchcontainer} onPress={this.changesearch}>
									<Image source={search} style={styles.searchimage} />
								</TouchableOpacity>
							</React.Fragment>
						) : (
							<React.Fragment>
								<TextInput
									placeholder="Enter PO#"
									style={styles.searchbar}
									placeholderTextColor="#fff"
								/>
								<TouchableOpacity activeOpacity={1} style={styles.closeimagecontainer} onPress={this.changesearch}>
									<Image source={close} style={styles.closeimage} />
								</TouchableOpacity>
							</React.Fragment>
						)}
					</View>
					<ScrollView style={styles.filterbar} horizontal={true} showsHorizontalScrollIndicator={false}>
						{this.filters.map((item, i) => (
							<TouchableOpacity
								style={[
									this.state.activefilter == item ? styles.activefilter : styles.normalfilter,
									i == 0 ? styles.firstfilter : null
                                ]}
                                activeOpacity={1}
								key={i}
								onPress={(e) => this.changefilter(e, item)}
							>
								<Text
									style={
										this.state.activefilter == item ? styles.activefiltertext : styles.filtertext
									}
								>
									{item} (78)
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
					style={{ flex: 1, marginTop:5 }}
					data={this.state.loadeddata}
					renderItem={({ item }) => <Row id={item.id} rowdata={item} />}
					keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    // onEndReached={this.addData}
                    // onEndReachedThreshold={1}
				/>
			</React.Fragment>
		);
	}
}

export default datatable;
