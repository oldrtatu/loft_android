import React from 'react';
import { View, Text, ScrollView, TouchableHighlight, Animated, TextInput } from 'react-native';
import style from './style';

export default class SuggestionField extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchValue: props.value,
			showResults: false,
			results: [],
			animation: new Animated.Value(0),
			loaded: false
		};
	}

	componentDidUpdate() {
		if (this.state.loaded == false) {
			this.setState({
				searchValue: this.props.value,
				loaded: true
			});
        }
        if(this.props.override == true){
            this.setState({searchValue:''},()=>this.props.changeOverRide())
        }
	}

	changeSearchValue(searchValue) {
		const { startSuggestingFrom } = this.props;

		this.setState({ searchValue:searchValue.toString() }, () => {
			if (searchValue.length >= startSuggestingFrom) {
				this.search();
			} else if (searchValue.length == 0) {
				this.hideSuggestBox();
			}
		});
	}

	showSuggestBox() {
		const suggestBoxHeight = 130;

		Animated.timing(this.state.animation, {
			toValue: suggestBoxHeight,
			duration: 300
		}).start();
	}

	hideSuggestBox() {
		this.setState({ showResults: false });
	}

	PressSuggestItem = (value) => {
		if (value != 'result') {
			this.setState({ searchValue: value.toString() }, () => this.props.setValue(value,this.props.addfield));
			this.hideSuggestBox();
		} else {
			if (this.state.results.length > 0) {
				this.setState({ searchValue: this.state.results[0].toString() }, () => {
					this.props.setValue(this.state.searchValue,this.props.addfield);
				});
			} else {
				this.setState({ searchValue: '' }, () => {
					this.props.setValue('',this.props.addfield);
				});
			}

			this.hideSuggestBox();
		}
	};

	async search() {
		const { searchValue } = this.state;
		const { list } = this.props;
		const results = await this.searchField(searchValue, list, this.props.field);
		if (results.length > 0) {
			this.setState({ results, showResults: true }, () => {
				this.showSuggestBox();
			});
		}
	}

	async searchField(key, searchIndex, field) {
		const list = [];
		searchIndex.forEach((item) => {
			if (item[field].toString().includes(key)) {
				list.push(item);
			}
		});

		return list;
	}

	renderListItem(item) {
		return (
			<TouchableHighlight
				underlayColor="#507DF0"
				key={`searchlist${item[this.props.field]}`}
				onPress={() => this.PressSuggestItem(item[this.props.field])}
			>
				<View style={style.listItem}>
					<Text style={style.listItemText}>{item[this.props.field].toString()}</Text>
				</View>
			</TouchableHighlight>
		);
	}

	render() {
		const { results, showResults, searchValue, animation } = this.state;
		return (
			<View>
				<Text style={[style.label, { marginTop: 30 } ]}>{this.props.label}</Text>
				<TextInput
					style={[this.props.inputStyle, { marginTop: -25 } ]}
					onChangeText={(text) => this.changeSearchValue(text)}
					value={searchValue}
					placeholder={this.props.placeholder}
					onSubmitEditing={() => this.PressSuggestItem('result')}
				/>
				{showResults && (
					<Animated.View style={[ this.props.suggestBoxStyle, { height: animation } ]}>
						<ScrollView nestedScrollEnabled={true}>
							{results.map((item) => {
								return this.renderListItem(item);
							})}
						</ScrollView>
					</Animated.View>
				)}
			</View>
		);
	}
}
