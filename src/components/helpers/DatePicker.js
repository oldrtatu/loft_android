import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import calender from '../../assets/calender.png';
import style from './style';

class DatePicker extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
			show: false,
			mode: 'date',
			date: new Date(),
			loaded:false
		};
	}

	componentDidUpdate(){
		if(this.state.loaded == false){
			this.setState({
				value:this.props.value,
				loaded:true
			})
		}
	}

	setDate = (event, date) => {
		date = date || this.state.date;
		let value = date.getDate() + '-' + (date.getMonth()+1) + '-' + date.getFullYear()
		this.setState({
			show: Platform.OS === 'ios' ? true : false,
			date,
			value
		},()=>this.props.setValue(this.props.name,this.state.value));
	};

	show = () => {
		this.setState({
			show: true
		});
	};

	render() {
		return (
			<TouchableOpacity activeOpacity={1} onPress={this.show}>
				<Text style={[style.label,{marginTop:20}]}>{this.props.label}</Text>
				<Text style={[style.input,{marginTop:-25, paddingTop:35, marginBottom:10}]}>{this.state.value}</Text>
				<View style={style.dropbuttoncontainer}>
					<Image source={calender} style={[style.image,{marginTop:-20}]} />
				</View>
				{this.state.show && (
					<DateTimePicker
						value={this.state.date}
						mode='date'
						display="default"
						onChange={(e)=>this.setDate(e,this.state.date)}
					/>
				)}
			</TouchableOpacity>
		);
	}
}

export default DatePicker;
