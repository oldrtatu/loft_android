import React from 'react';
import { View, Text, ScrollView, TouchableHighlight, Animated, TextInput } from 'react-native';
import { searchCode, searchName } from './searchProduct';
import style from './style';

export default class SuggestionSearchList extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchValue: props.value[0],
			showResults: false,
			results: [],
			animation: new Animated.Value(0),
			searchValue2: props.value[1],
			showResults2: false,
			field1: props.field1,
			field2: props.field2,
			results2: [],
			animation2: new Animated.Value(0),
			loaded: false
		};
	}

	componentDidUpdate(){
		if(this.state.loaded==false){
			this.setState({
				searchValue:this.props.value[0],
				searchValue2:this.props.value[1],
				loaded:true
			})
		}
	}

	changeSearchValue(searchValue, field) {
		const { startSuggestingFrom } = this.props;
		if (field == this.state.field1) {
			this.setState({ searchValue }, () => {
				if (searchValue.length >= startSuggestingFrom) {
					this.search(field);
				} else if (searchValue.length === 0) {
					this.hideSuggestBox(field);
				}
			});
		} else {
			this.setState({ searchValue2: searchValue }, () => {
				if (searchValue.length >= startSuggestingFrom) {
					this.search(field);
				} else if (searchValue.length === 0) {
					this.hideSuggestBox(field);
				}
			});
		}
	}

	showSuggestBox(field) {
		const suggestBoxHeight = 130;

		if (field == this.state.field1) {
			Animated.timing(this.state.animation, {
				toValue: suggestBoxHeight,
				duration: 300
			}).start();
		} else {
			Animated.timing(this.state.animation2, {
				toValue: suggestBoxHeight,
				duration: 300
			}).start();
		}
	}

	hideSuggestBox(field) {
		const suggestBoxHeight = 0;

		if (field == this.state.field1) {
			Animated.timing(this.state.animation, {
				toValue: suggestBoxHeight,
				duration: 300
			}).start();

			setTimeout(() => this.setState({ showResults: false }), 400);
		} else {
			Animated.timing(this.state.animation2, {
				toValue: suggestBoxHeight,
				duration: 300
			}).start();

			setTimeout(() => this.setState({ showResults2: false }), 400);
		}
	}

	PressSuggestItem = (field, value) => {
		if (field != 'result') {
			this.setState(
				{ searchValue: value[this.state.field1], searchValue2: value[this.state.field2].toString() },
				() => this.props.setItem(value)
			);
			this.hideSuggestBox(field);
		} else {
			if (value == this.state.field1) {
				if (this.state.results.length > 0) {
					this.setState(
						{
							searchValue: this.state.results[0][this.state.field1],
							searchValue2: this.state.results[0][this.state.field2].toString()
						},
						() => {
							let ob = {};
							ob[this.state.field1] = this.state.searchValue;
							ob[this.state.field2] = this.state.searchValue2;
							this.props.setItem(ob);
						}
					);
				} else {
					this.setState({ searchValue: '', searchValue2: '' }, () => {
						let ob = {};
						ob[this.state.field1] = this.state.searchValue;
						ob[this.state.field2] = this.state.searchValue2;
						this.props.setItem(ob);
					});
				}
			} else {
				if (this.state.results2.length > 0) {
					this.setState(
						{
							searchValue: this.state.results2[0][this.state.field1],
							searchValue2: this.state.results2[0][this.state.field2].toString()
						},
						() => {
							let ob = {};
							ob[this.state.field1] = this.state.searchValue;
							ob[this.state.field2] = this.state.searchValue2;
							this.props.setItem(ob);
						}
					);
				} else {
					this.setState({ searchValue: '', searchValue2: '' }, () => {
						let ob = {};
						ob[this.state.field1] = this.state.searchValue;
						ob[this.state.field2] = this.state.searchValue2;
						this.props.setItem(ob);
					});
				}
			}

			this.hideSuggestBox(value);
		}

		this.hideSuggestBox(field);
	};

	async search(field) {
		const { searchValue, searchValue2 } = this.state;
		const { list } = this.props;
		if (field == this.state.field1) {
			const results = await searchName(searchValue, list);
			if (results.length > 0) {
				this.setState({ results, showResults: true }, () => {
					this.showSuggestBox(field);
				});
			}
		} else {
			const results = await searchCode(searchValue2, list);
			if (results.length > 0) {
				this.setState({ results2: results, showResults2: true }, () => {
					this.showSuggestBox(field);
				});
			}
		}
	}

	renderListItem(item, field) {
		return (
			<TouchableHighlight
				underlayColor="#507DF0"
				key={`searchlist${item.code}`}
				onPress={() => this.PressSuggestItem(field, item)}
			>
				<View style={style.listItem}>
					<Text style={style.listItemText}>{item[field].toString()}</Text>
				</View>
			</TouchableHighlight>
		);
	}

	render() {
		const {
			results,
			showResults,
			searchValue,
			animation,
			results2,
			showResults2,
			searchValue2,
			animation2
		} = this.state;
		return (
			<View>
				<Text style={style.label}>{this.props.label[0]}</Text>
				<TextInput
					style={this.props.inputStyle}
					onChangeText={(text) => this.changeSearchValue(text, this.state.field1)}
					value={searchValue}
					placeholder={this.props.placeholder[0]}
					onSubmitEditing={() => this.PressSuggestItem('result', this.state.field1)}
				/>
				{showResults && (
					<Animated.View style={[ this.props.suggestBoxStyle, { height: animation } ]}>
						<ScrollView>
							{results.map((item) => {
								return this.renderListItem(item, this.state.field1);
							})}
						</ScrollView>
					</Animated.View>
				)}
				<Text style={style.label}>{this.props.label[1]}</Text>
				<TextInput
					style={this.props.inputStyle}
					onChangeText={(text) => this.changeSearchValue(text, this.state.field2)}
					value={searchValue2}
					placeholder={this.props.placeholder[1]}
					onSubmitEditing={() => this.PressSuggestItem('result', this.state.field2)}
				/>
				{showResults2 && (
					<Animated.View style={[ this.props.suggestBoxStyle, { height: animation2, marginTop: 160 } ]}>
						<ScrollView>
							{results2.map((item) => {
								return this.renderListItem(item, this.state.field2);
							})}
						</ScrollView>
					</Animated.View>
				)}
			</View>
		);
	}
}
