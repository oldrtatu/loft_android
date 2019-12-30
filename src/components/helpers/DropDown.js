import React from 'react';
import { View, Text, TouchableOpacity, Animated, Image, ScrollView, TouchableHighlight } from 'react-native';

import drop from '../../assets/dropdown.png';

import style from './style';

class DropDown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
			loaded: false,
			dropdown: props.dropdown,
			showResults: false,
			animation: new Animated.Value(0)
		};
	}

	componentDidUpdate() {
		if (this.state.loaded == false) {
			this.setState({
				loaded: true,
				value: this.props.value
			});
		}
	}

	showDrop = () => {
        const suggestBoxHeight = this.state.dropdown.length *36;
        this.setState({showResults:true})

		Animated.timing(this.state.animation, {
			toValue: suggestBoxHeight,
			duration: 300
        }).start();
        
    };
    
    changeDrop = (value) => {
        this.setState({value}, ()=>{this.props.setValue(this.props.name,this.state.value)})
        Animated.timing(this.state.animation, {
			toValue: 0,
			duration: 300
        }).start();

        setTimeout(()=>this.setState({showResults:false}),400)
    }

	renderListItem(item) {
		return (
			<TouchableHighlight underlayColor="#507DF0" key={`searchlist${item}`} onPress={()=>this.changeDrop(item)}>
				<View style={style.listItem}>
					<Text style={style.listItemText}>{item}</Text>
				</View>
			</TouchableHighlight>
		);
	}

	render() {
		return (
			<TouchableOpacity activeOpacity={1} onPress={() => this.showDrop()}>
				<Text style={style.label}>{this.props.label}</Text>
				<Text style={style.input}>{this.state.value}</Text>
				<View style={style.dropbuttoncontainer}>
					<Image source={drop} style={style.image} />
				</View>
				{this.state.showResults && (
					<Animated.View style={[ style.dropdownoptions, { height: this.state.animation } ]}>
						<ScrollView>
							{this.state.dropdown.map((item) => {
								return this.renderListItem(item);
							})}
						</ScrollView>
					</Animated.View>
				)}
			</TouchableOpacity>
		);
	}
}

export default DropDown;
