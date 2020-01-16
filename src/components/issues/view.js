import React from 'react';
import { Text, ScrollView, TouchableOpacity, View, Image, ActivityIndicator, SafeAreaView } from 'react-native';

import viewstyle from './styles/issuesview';

import back from '../../assets/back.png';

class IssueView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rowdata: null
		};
	}
	componentDidMount() {
		this.setState({ rowdata: this.props.navigation.getParam('rowdata') });
	}

	goback = () => {
		this.props.navigation.goBack(null);
	};
	
	changedata = (data) => {
		this.setState({ rowdata:{...this.state.rowdata,...data}})
	}

	editdata = () => {
		this.props.navigation.navigate('Form', { rowdata: this.state.rowdata, changedata: this.changedata });
	};

	convertdate = (date) => {
		let monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
		let formatted = new Date(Date.parse(date));

		var hr = formatted.getHours();
		var min = formatted.getMinutes();
		var ampm = 'AM';
		if (hr > 12) {
			hr -= 12;
			ampm = 'PM';
		}
		formatted =
			monthNames[formatted.getMonth()] +
			' ' +
			formatted.getDate() +
			', ' +
			formatted.getFullYear() +
			' ' +
			hr +
			':' +
			min +
			' ' +
			ampm;
		return formatted;
	};

	render() {
		return this.state.rowdata != null ? (
			<React.Fragment>
				<SafeAreaView style={{backgroundColor:"#507df0"}} />
				<View style={viewstyle.topbar}>
					<TouchableOpacity activeOpacity={1} style={viewstyle.backcontainer} onPress={this.goback}>
						<Image source={back} style={viewstyle.backimage} />
					</TouchableOpacity>
					<Text style={viewstyle.heading}>Issue # - {this.state.rowdata.id}</Text>
				</View>
				<ScrollView showsVerticalScrollIndicator={false} style={viewstyle.restarea}>
					<View style={{height:15}}/>
					<View style={viewstyle.details}>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Title</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.title}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Unit number</Text>
							<Text style={viewstyle.righttext}>
								{this.state.rowdata[this.state.rowdata.equipmentType.toLowerCase()]['unitNo']}
							</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Division</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.division.name}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Category</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.category.name}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Equipment Type</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.equipmentType}</Text>
						</View>
					</View>
					<View style={viewstyle.separator} />
					<View style={viewstyle.details}>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Type</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.type}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Status</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.status}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>PO #</Text>
							<Text style={viewstyle.righttext}>
								{this.state.rowdata.po ? this.state.rowdata.po.id : '--'}
							</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Odometer</Text>
							<Text style={viewstyle.righttext}>{this.state.rowdata.odometer}</Text>
						</View>
					</View>
					<View style={viewstyle.separator} />
					<View style={viewstyle.details}>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Reported on</Text>
							<Text style={viewstyle.righttext}>{this.convertdate(this.state.rowdata.reportedOn)}</Text>
						</View>
						<View style={viewstyle.row}>
							<Text style={viewstyle.lefttext}>Posted on</Text>
							<Text style={viewstyle.righttext}>{this.convertdate(this.state.rowdata.postedOn)}</Text>
						</View>
						{this.state.rowdata.dueOn ? (
							<View style={viewstyle.row}>
								<Text style={viewstyle.lefttext}>Due on</Text>
								<Text style={viewstyle.righttext}>{this.convertdate(this.state.rowdata.dueOn)}</Text>
							</View>
						) : null}
						{this.state.rowdata.period ? (
							<View style={viewstyle.row}>
								<Text style={viewstyle.lefttext}>Period</Text>
								<Text style={viewstyle.righttext}>
									{this.state.rowdata.period + ' ' + this.state.rowdata.periodUnit}
								</Text>
							</View>
						) : null}
					</View>
					{this.state.rowdata.description ? (
						<React.Fragment>
							<View style={viewstyle.separator} />
							<View style={viewstyle.details}>
								<View style={viewstyle.paragraph}>
									<Text style={viewstyle.longtextheading}>Description</Text>
									<Text style={viewstyle.longtext}>{this.state.rowdata.description}</Text>
								</View>
							</View>
						</React.Fragment>
					) : null}
					{this.state.rowdata.typeDriverSide ? (
						<React.Fragment>
							<View style={viewstyle.separator} />
							<View style={viewstyle.details}>
								<View style={viewstyle.paragraph}>
									<Text style={viewstyle.longtextheading}>Driver side</Text>
									<View style={viewstyle.driverside}>
										{Object.keys(this.state.rowdata.typeDriverSide).map((item, i) => (
											<View style={viewstyle[this.state.rowdata.typeDriverSide[item]]} key={i}>
												{this.state.rowdata.typeDriverSide[item] ? (
													<Text style={viewstyle.fault}>{item}</Text>
												) : (
													<Text style={viewstyle.correct}>{`${item}`}</Text>
												)}
											</View>
										))}
									</View>
								</View>
							</View>
						</React.Fragment>
					) : null}
					{this.state.rowdata.typePassengerSide ? (
						<React.Fragment>
							<View style={viewstyle.separator} />
							<View style={viewstyle.details}>
								<View style={viewstyle.paragraph}>
									<Text style={viewstyle.longtextheading}>Passenger side</Text>
									<View style={viewstyle.driverside}>
										{Object.keys(this.state.rowdata.typePassengerSide).map((item, i) => (
											<View style={viewstyle[this.state.rowdata.typePassengerSide[item]]} key={i}>
												{this.state.rowdata.typePassengerSide[item] ? (
													<Text style={viewstyle.fault}>{item}</Text>
												) : (
													<Text style={viewstyle.correct}>{`${item}`}</Text>
												)}
											</View>
										))}
									</View>
								</View>
							</View>
						</React.Fragment>
					) : null}
				</ScrollView>
				<TouchableOpacity activeOpacity={1} style={viewstyle.editbutton} onPress={this.editdata}>
					<Text style={viewstyle.editbuttontext}>{`EDIT `}</Text>
				</TouchableOpacity>
			</React.Fragment>
		) : (
			<ActivityIndicator />
		);
	}
}

export default IssueView;
