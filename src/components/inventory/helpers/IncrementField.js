import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';

import minus from '../../../assets/minus.png';
import plus from '../../../assets/plus.png';

import style from './style';

class IncrementField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value.toString() + ' ' + props.unit,
			unit: props.unit,
			loaded: false,
			intvalue: props.value
		};
	}

	componentDidUpdate() {
		if (this.state.loaded == false) {
			this.setState({
				intvalue: this.props.value,
				value: this.props.value.toString() + ' ' + this.state.unit,
				unit: this.props.unit,
				loaded: true
			});
		}
	}

	changeValue = (type) => {
		if (type == 'plus') {
			this.setState(
				{
					value: (parseInt(this.state.intvalue) + 1).toString() + ' ' + this.state.unit,
					intvalue: parseInt(this.state.intvalue) + 1
				},
				() => this.props.setNumbers(this.props.name, parseInt(this.state.intvalue))
			);
		} else if (this.state.value > 0) {
			this.setState(
				{
					value: (parseInt(this.state.intvalue) + 1).toString() + ' ' + this.state.unit,
					intvalue: parseInt(this.state.intvalue) + 1
				},
				() => this.props.setNumbers(this.props.name, parseInt(this.state.intvalue))
			);
		}
	};

	onSubmit = () => {
		if (this.state.value == '') {
			this.setState({ value: '0 ' + this.state.unit, intvalue: 0 }, () =>
				this.props.setNumbers(this.props.name, parseInt(this.state.intvalue))
			);
		} else {
			this.setState({ value: this.state.value + ' ' + this.state.unit });
		}
	};

	TouchStart = () => {
		this.setState({ value: this.state.value.replace(this.state.unit, '') });
	};

	changeText = (text) => {
		if (!text.includes(this.state.unit)) {
			this.setState({ value: text, intvalue: text != '' ? parseInt(text) : 0 }, () =>
				this.props.setNumbers(this.props.name, parseInt(this.state.intvalue))
			);
		}
	};

	render() {
		return (
			<View>
				<Text style={style.label}>{this.props.label}</Text>
				<TextInput
					style={style.input}
					editable={true}
					value={this.state.value}
					keyboardType="numeric"
					onChangeText={(text) => this.changeText(text)}
                    onSubmitEditing={() => this.onSubmit()}
                    onBlur={()=>this.onSubmit()}
					onTouchStart={() => this.TouchStart()}
				/>
				<TouchableOpacity
					activeOpacity={1}
					style={style.decrementbuttoncontainer}
					onPress={() => this.changeValue('minus')}
				>
					<Image source={minus} style={style.image} />
				</TouchableOpacity>
				<TouchableOpacity
					activeOpacity={1}
					style={style.incrementbuttoncontainer}
					onPress={() => this.changeValue('plus')}
				>
					<Image source={plus} style={style.image} />
				</TouchableOpacity>
			</View>
		);
	}
}

export default IncrementField;
