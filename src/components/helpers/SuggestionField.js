import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	Dimensions,
	TextInput,
	FlatList,
	TouchableOpacity,
	ScrollView,
	Modal
} from 'react-native';

class SuggestionField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
			dropdowndata: props.dropdowndata,
			showResults: false,
			showvalues: [],
			height: 0,
			top: 0
		};
	}
	UNSAFE_componentWillReceiveProps(newprops) {
		this.setState({
			value: newprops.value,
			dropdowndata: newprops.dropdowndata
		});
	}

	startEditing = (e) => {
		this.setState({ showResults: true }, () => this.searchValue(this.state.value));
	};

	endEditing = () => {
		if(this.state.showvalues.length == 0){
			this.setState({ showResults: false });
		}
	};

	searchValue = (text) => {
		const list = [];
		let key = this.props.name;
		this.state.dropdowndata.forEach((item) => {
			if (item[key].toString().includes(text)) {
				list.push(item);
			}
		});
		this.setState({ showvalues: list, height: 35 * list.length });
	};

	setValue = (item) => {
		this.setState({
			showResults: false,
			value: item[this.props.name].toString()
		},()=>{this.props.getValue(item)});
	};

	render() {
		return (
			<React.Fragment>
				<View onLayout={(e) => this.setState({ top: e.nativeEvent.layout.y + e.nativeEvent.layout.height })}>
					<TextInput
						defaultValue={this.state.value}
						placeholder={this.props.placeholder}
						style={this.state.showResults ? styles.active : styles.inputfield}
						onTouchStart={(e) =>{ (this.props.editable) ? this.startEditing(e):null}}
						onBlur={() => this.endEditing()}
						onSubmitEditing={() => this.endEditing()}
						onChangeText={(text) => this.searchValue(text)}
						editable={this.props.editable}
					/>
					<Text style={styles.label}>{`${this.props.label}  `}</Text>
				</View>
				{/* <Modal animated={false} visible={this.state.showResults} transparent={true} > */}
				{this.state.showResults && (
					<ScrollView
						style={[ styles.dropdowncontainer, { height: this.state.height } ]}
					>
						{this.state.showvalues.map((item, i) => (
							<TouchableOpacity
								activeOpacity={1}
								key={i}
								style={styles.row}
								onPress={() => this.setValue(item)}
							>
								<Text style={styles.rowtext}>{item[this.props.name]}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
				)}
				{/* </Modal> */}
			</React.Fragment>
		);
	}
}

const styles = StyleSheet.create({
	inputfield: {
		flex: 1,
		paddingLeft: 15,
		color: '#131d4a',
		fontSize: 12,
		height: 55,
		borderWidth: 1,
		borderColor: 'rgba(230,230,230,0.6)',
		backgroundColor: 'rgba(230,230,230,0.6)',
		marginTop: 10,
		paddingTop: 20,
		width: Dimensions.get('window').width * 0.85,
		alignSelf: 'center'
	},
	active: {
		flex: 1,
		paddingLeft: 15,
		color: '#131d4a',
		fontSize: 12,
		height: 55,
		borderWidth: 1,
		borderLeftWidth: 3,
		backgroundColor: 'transparent',
		marginTop: 10,
		paddingTop: 20,
		width: Dimensions.get('window').width * 0.85,
		alignSelf: 'center',
		borderTopColor: 'rgba(230,230,230,0.6)',
		borderBottomColor: 'rgba(230,230,230,0.6)',
		borderRightColor: 'rgba(230,230,230,0.6)',
		borderLeftColor: '#5988FF'
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
	dropdowncontainer: {
		borderWidth: 1,
		maxHeight: 150,
		width: Dimensions.get('window').width * 0.85,
		alignSelf: 'center',
		backgroundColor: 'white',
		borderColor: 'lightgray',
		zIndex: 1
	},
	row: {
		borderColor: 'lightgray',
		height: 35,
		borderBottomWidth: 1,
		justifyContent: 'center'
	},
	rowtext: {
		fontSize: 12,
		color: '#131d4a',
		paddingLeft: 15
	}
});

export default SuggestionField;

