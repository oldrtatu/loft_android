import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	Dimensions,
	TextInput,
	TouchableOpacity,
	ScrollView
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
			top: 0,
			focus:false
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
		this.setState({ showResults: false });
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
			value: item[this.props.name].toString(),
			focus:true
		},()=>{this.props.getValue(item)});
	};

	render() {
		return (
			<View>
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
				{this.state.showResults && (
					<ScrollView
						style={[ styles.dropdowncontainer, { height: this.state.height } ]}
						keyboardShouldPersistTaps='always'
					>
						{this.state.showvalues.map((item, i) => (
							<View
								key={i}
								style={styles.row}
								onTouchStart={() => this.setValue(item)}	
							>
								<Text style={styles.rowtext}>{item[this.props.name]}</Text>
							</View>
						))}
					</ScrollView>
				)}
			</View>
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
		width: Dimensions.get('window').width * 0.85,
		alignSelf: 'center',
		position:'absolute',
		zIndex:1,
		top:15,
		paddingLeft:15
	},
	dropdowncontainer: {
		borderWidth: 1,
		maxHeight: 150,
		width: Dimensions.get('window').width * 0.85,
		alignSelf: 'center',
		backgroundColor: 'white',
		borderColor: 'lightgray',
		zIndex: 11,
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

