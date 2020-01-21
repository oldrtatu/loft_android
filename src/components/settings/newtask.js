import React from 'react';
import { Text, ScrollView, SafeAreaView, View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

import { GlobalContext } from '../../provider';
import { InputField, DropDown, TextArea,SuggestionField, AttachmentField } from '../helpers';

import back from '../../assets/back.png';
import { convertback } from '../helpers/convertdata';
class AddTask extends React.Component {
	constructor(props) {
		super(props);
		this.data = {
			issues: props.context.issuesdata ? convertback(props.context.issuesdata) : [],
			po: props.context.podata ? convertback(props.context.podata) : []
		};
		this.state = {
			addData: {
				name: '',
				taskType: 'GENERAL',
                description: '',
                relatedTo:''
			},
			addnew: false
		};
    }
    files = []

	goback = () => {
		this.props.navigation.goBack(null);
	};

	componentDidMount() {
		let addnew = this.props.navigation.getParam('addnew');
		console.log(addnew);
		if (!addnew) {
			this.setState({
				addData: { ...this.props.navigation.getParam('data') },
				addnew: false
			});
		} else {
			this.setState({ addnew });
		}
	}

	getValue = (key, value) => {
		let ob = { ...this.state.addData };
        ob[key] = value;
        if(key == 'taskType'){
            ob['relatedTo'] = ''
        }
		this.setState({ addData: ob });
    };
    
    sendfiles = (data) => {
		this.files = data;
	};
    
    getId= (item)=>{
        let ob = { ...this.state.addData };
		ob['relatedTo'] = item.id.toString();
		this.setState({ addData: ob });
    }
	render() {
		return (
			<React.Fragment>
				<SafeAreaView style={{ backgroundColor: '#507df0' }} />
				<View style={form.topbar}>
					<TouchableOpacity activeOpacity={1} style={form.backcontainer} onPress={this.goback}>
						<Image source={back} style={form.backimage} />
					</TouchableOpacity>
					<Text style={form.heading}>{this.state.addnew ? 'Add' : 'Edit'}</Text>
				</View>
				<ScrollView>
					<InputField
						placeholder="Enter task name"
						label="Task Name"
						value={this.state.addData.name}
						validate={[ 'empty' ]}
						name="name"
						getValue={this.getValue}
						editable={true}
					/>
					<DropDown
						label="Task type"
						name="taskType"
						value={this.state.addData.taskType}
						dropdown={[ 'GENERAL', 'ISSUES', 'PO' ]}
						getValue={this.getValue}
						disabled={false}
					/>
					<TextArea
						placeholder="Enter description"
						label="Description"
						value={this.state.addData.description}
						validate={[]}
						name="description"
						getValue={this.getValue}
						editable={true}
					/>
					{this.state.addData.taskType != 'GENERAL' && (
						<SuggestionField
							name="id"
							getValue={this.getId}
							placeholder={`Search ${this.state.addData.taskType}`}
							label={`${this.state.addData.taskType} Id`}
							value={this.state.addData.relatedTo}
							dropdowndata={this.data[this.state.addData.taskType.toLowerCase()]}
							editable={true}
						/>
					)}
                    <AttachmentField sendfiles={this.sendfiles} />
				</ScrollView>
			</React.Fragment>
		);
	}
}

const form = StyleSheet.create({
	topbar: {
		height: 110,
		backgroundColor: '#507df0',
		flexDirection: 'row'
	},
	backcontainer: {
		width: 70,
		height: 110,
		paddingVertical: 45,
		paddingHorizontal: 25,
		alignContent: 'center',
		alignSelf: 'flex-start'
	},
	backimage: {
		width: 18,
		height: 18,
		resizeMode: 'contain'
	},
	heading: {
		flex: 1,
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
		alignSelf: 'center',
		position: 'absolute',
		width: '100%',
		textAlign: 'center',
		zIndex: -1
	},
	nextbutton: {
		position: 'absolute',
		flex: 1,
		right: 18,
		paddingHorizontal: 10,
		alignSelf: 'center',
		paddingVertical: 10,
		textAlign: 'center'
	},
	mainform: {
		flex: 1,
		width: Dimensions.get('window').width,
		alignSelf: 'center'
	}
});

const addtask = (props) => (
	<GlobalContext.Consumer>{(context) => <AddTask context={context} {...props} />}</GlobalContext.Consumer>
);

export default addtask;
