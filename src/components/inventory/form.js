import React from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { InputField, IncrementField, DropDown, SuggestionField, DatePicker, TextArea, Slidebutton } from '../helpers';
import { GlobalContext } from '../../provider';

import form from './styles/formstyle';

import back from '../../assets/back.png';
import Snackbar from 'react-native-snackbar';

class InventoryForm extends React.Component {
	constructor(props) {
		super(props);
		this.previousdata = JSON.parse(JSON.stringify(props.navigation.getParam('rowdata')));
		this.data = {
			item: props.context.itemdata ? props.context.itemdata : [],
			vendor: props.context.vendordata ? props.context.vendordata : []
		};
		this.state = {
			editdata: {
				name: '',
				item: { code: '', quantityUnit: '', name: '' },
				currentQuantity: '0',
				unit: '',
				status: '',
				vendor: { name: '' },
				checkDate: '',
				reorderAt: '',
				notes: '',
				costPerItem: '',
				costUnit: ''
			},
			reload: false
		};
	}

	addeddata = {};

	componentDidMount() {
		this.setState({ editdata: this.props.navigation.getParam('rowdata') });
	}

	goback = () => {
		this.props.navigation.goBack(null);
	};

	handleSubmit = () => {
		const { navigation } = this.props;
		let err = this.validateForm();
		if (err == '') {
			if (Object.keys(this.addeddata).length > 0) {
				this.addeddata['id'] = this.state.editdata.id;
				this.props.context.updatedata('/po/inventory', 'inventorydata', this.addeddata);
				navigation.goBack();
				navigation.state.params.changedata(this.addeddata);
			}
		} else {
			Snackbar.show({
				text: err,
				duration: Snackbar.LENGTH_SHORT,
				backgroundColor: '#D62246'
			});
			this.setState({ reload: true }, () => this.setState({ reload: false }));
		}
	};

	validateForm = () => {
		if (this.state.editdata.name == '') {
			return 'Enter item name';
		} else if (this.state.editdata.currentQuantity == '' || parseInt(this.state.editdata.currentQuantity) == 0) {
			return 'Enter current quantity';
		} else if (this.state.editdata.costPerItem == '' || parseInt(this.state.editdata.costPerItem) == 0) {
			return 'Enter cost per item';
		} else if (this.state.editdata.reorderAt == '' || parseInt(this.state.editdata.reorderAt) == 0) {
			return 'Enter re order at quantity';
		} else {
			return '';
		}
	};

	getValue = (key, value) => {
		let ob = { ...this.state.editdata };
		ob[key] = value;
		this.setState({ editdata: ob });
		if (value != this.previousdata[key]) {
			this.addeddata[key] = value;
		} else {
			delete this.addeddata[key];
		}
	};

	getVendor = (item) => {
		if (item == null || item == undefined || item == '') {
			this.addeddata['VendorId'] = null;
		} else {
			this.setState({ editdata: { ...this.state.editdata, vendor: item } });
		}
	};

	render() {
		return (
			<React.Fragment>
				<SafeAreaView style={{ backgroundColor: '#507df0' }} />
				<View style={form.topbar}>
					<TouchableOpacity activeOpacity={1} style={form.backcontainer} onPress={this.goback}>
						<Image source={back} style={form.backimage} />
					</TouchableOpacity>
					<Text style={form.heading}>{`Inventory # -${this.state.editdata.id}`}</Text>
				</View>
				<ScrollView style={form.mainform} nestedScrollEnabled={true}>
					<View style={{ height: 10 }} />
					<InputField
						placeholder="Enter inventory name"
						label="Inventory name"
						value={this.state.editdata.name}
						validate={[ 'empty' ]}
						name="name"
						getValue={this.getValue}
						editable={true}
					/>
					<InputField
						placeholder="Enter item name"
						label="Item name"
						value={this.state.editdata.item.name}
						validate={[ 'empty' ]}
						name="itemname"
						getValue={this.getValue}
						editable={false}
					/>
					<InputField
						placeholder="Enter item code"
						label="Item code"
						value={this.state.editdata.item.code}
						validate={[ 'empty' ]}
						name="itemcode"
						getValue={this.getValue}
						editable={false}
					/>
					<IncrementField
						label="Current Quantity"
						placeholder="Enter current quantity"
						value={this.state.editdata.currentQuantity.toString()}
						unit={this.state.editdata.item.quantityUnit}
						getValue={this.getValue}
						name="currentQuantity"
					/>
					<DropDown
						label="Status"
						name="status"
						value={this.state.editdata.status}
						dropdown={[ 'ACTIVE', 'INACTIVE' ]}
						getValue={this.getValue}
						disabled={false}
					/>
					<IncrementField
						label="Cost per item"
						placeholder="Cost per item"
						value={this.state.editdata.costPerItem.toString()}
						unit={this.state.editdata.costUnit}
						getValue={this.getValue}
						name="costPerItem"
					/>
					<SuggestionField
						name="name"
						getValue={this.getVendor}
						placeholder="Enter preferred vendor"
						label="Preferred vendor"
						value={this.state.editdata.vendor ? this.state.editdata.vendor.name : ''}
						dropdowndata={this.data.vendor}
						editable={true}
					/>
					<DatePicker
						label="Inventory check date"
						value={this.state.editdata.checkDate}
						name="checkDate"
						setValue={this.getValue}
						editable={true}
					/>
					<IncrementField
						label="Reorder at"
						placeholder="Reorder at quantity"
						value={this.state.editdata.reorderAt.toString()}
						unit={this.state.editdata.item.quantityUnit}
						getValue={this.getValue}
						name="reorderAt"
					/>
					<TextArea
						placeholder="Enter notes"
						label="Notes"
						value={this.state.editdata.notes}
						validate={[]}
						name="notes"
						getValue={this.getValue}
						editable={true}
					/>
					<View style={{ height: 70 }} />
				</ScrollView>
				<Slidebutton submit={this.handleSubmit} reload={this.state.reload} />
			</React.Fragment>
		);
	}
}

const inventoryform = (props) => (
	<GlobalContext.Consumer>{(context) => <InventoryForm context={context} {...props} />}</GlobalContext.Consumer>
);

export default inventoryform;
