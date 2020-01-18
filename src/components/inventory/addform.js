import React from 'react'
import { Text, View, TouchableOpacity, Image, ScrollView, Switch, SafeAreaView, Platform } from 'react-native';

import form from './styles/formstyle';

import { Slidebutton, DropDown, DatePicker, InputField, SuggestionField, TextArea,IncrementField } from '../helpers';
import { GlobalContext } from '../../provider';

import Snackbar from 'react-native-snackbar';

import back from '../../assets/back.png';

class AddForm extends React.Component {
    constructor(props){
        super(props)
        this.data = {
			item: props.context.itemdata ? props.context.itemdata : [],
			vendor: props.context.vendordata ? props.context.vendordata : []
        };
		this.state = {
			editdata: {
				name: '',
				item: { code: '', quantityUnit: '', name:'' },
				currentQuantity: '0',
				unit: '',
				status: 'ACTIVE',
				vendor: { name: '' },
				checkDate: '',
				reorderAt: '0',
				notes: '',
				costPerItem:'0',
				costUnit:'CAD'
			},
			reload:false
		};
    }

    goback = () => {
		this.props.navigation.goBack(null);
    };
    
    validateForm = () => {
		if(this.state.editdata.name == ''){
			return "Enter item name"
		}else if(this.state.editdata.item.name == ''){
			return "Select item"
		}else if(this.state.editdata.currentQuantity == '' || parseInt(this.state.editdata.currentQuantity) == 0){
			return "Enter current quantity"
		}else if(this.state.editdata.costPerItem == '' || parseInt(this.state.editdata.costPerItem) == 0){
			return "Enter cost per item"
		}else if(this.state.editdata.reorderAt == '' || parseInt(this.state.editdata.reorderAt) == 0){
			return "Enter re order at quantity"
		}else if(this.state.editdata.checkDate == ''){
			return "Select check date"
		}else{
			return ''
		}
    }
    
    handleSubmit = () => {
		const { navigation } = this.props;
		let err = this.validateForm()
		if(err == ''){
            let addeddata = {...this.state.editdata}
            addeddata["itemId"] = this.state.editdata.item.id

            if(this.state.editdata.vendor.name != ''){
                addeddata["vendorId"] = this.state.editdata.vendor.id
			}
			
            if(this.state.editdata.notes == ''){
                delete addeddata.notes
            }
            this.props.context.adddata('/po/inventory', 'inventorydata', addeddata);
            this.props.navigation.goBack();
		}else{
			Snackbar.show({
				title:err,
				duration:Snackbar.LENGTH_SHORT,
				backgroundColor:"#D62246"
			})
			this.setState({reload:true},()=>this.setState({reload:false}))
		}
    };
    getValue = (key, value) => {
		let ob = { ...this.state.editdata };
		ob[key] = value;
		this.setState({ editdata: ob });
	};

	getVendor = (item) => {
		this.setState({ editdata: { ...this.state.editdata, vendor: item } });
    };
    getItem = (item) => {
		this.setState({ editdata: { ...this.state.editdata, item } });
	};

    render(){
        return(
            <React.Fragment>
				<SafeAreaView style={{ backgroundColor: '#507df0' }} />
				<View style={form.topbar}>
					<TouchableOpacity activeOpacity={1} style={form.backcontainer} onPress={this.goback}>
						<Image source={back} style={form.backimage} />
					</TouchableOpacity>
					<Text style={form.heading}>{`Add inventory`}</Text>
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
					<SuggestionField
						name="name"
						getValue={this.getItem}
						placeholder="Enter item name"
						label="Item name"
						value={this.state.editdata.item.name}
						dropdowndata={this.data.item}
						editable={true}
					/>
					<SuggestionField
						name="code"
						getValue={this.getItem}
						placeholder="Enter item code"
						label="Item code"
						value={this.state.editdata.item.code}
						dropdowndata={this.data.item}
						editable={true}
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
					<DropDown
						label="Cost Unit"
						name="costUnit"
						value={this.state.editdata.costUnit}
						dropdown={[ 'CAD', 'USD' ]}
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
						value={this.state.editdata.vendor.name}
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
					<View style={{height:70}}/>
                </ScrollView>
				<Slidebutton submit={this.handleSubmit} reload={this.state.reload} />
            </React.Fragment>
        )
    }
}


const inventoryform = (props) => (
	<GlobalContext.Consumer>{(context) => <AddForm context={context} {...props} />}</GlobalContext.Consumer>
);

export default inventoryform;