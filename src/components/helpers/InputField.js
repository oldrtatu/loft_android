import React from 'react';
import { StyleSheet, Text, TextInput, Dimensions } from 'react-native';


/**
 * @param label
 * @param placeholder
 * @param value
 * @param validationarray
 */
class InputField extends React.Component {
	constructor(props) {
        super(props);
        this.validationarray = props.validate
        this.state = {
            active: false,
            value:""
        }
    }
    
    componentDidMount(){
        this.setState({
            value: this.props.value
        })
    }

    endEditing = () => {
        this.setState({active:false})
    }

    checkInput = (text) => {
        this.setState({value:text})
    }


	render() {
        let props = this.props
		return (
			<React.Fragment>
                <TextInput 
                    style={(this.state.active)? styles.active : styles.input} 
                    placeholder={props.placeholder}
                    onTouchStart={()=>this.setState({active:true})}
                    onBlur={()=>this.endEditing()}
                    onChangeText={(text)=> this.checkInput(text)}
                    />
				<Text style={styles.label}>{props.label}</Text>
			</React.Fragment>
		);
	}
}

const styles = StyleSheet.create({
	label: {
		flex: 1,
		fontSize: 16,
		fontWeight: '500',
		color: 'rgba(80,86,101,0.36)',
		marginTop: -55,
        marginLeft: 20,
        marginBottom:40,
		width: Dimensions.get('window').width * 0.85,
		alignSelf: 'center'
	},
	input: {
		flex: 1,
		paddingLeft: 12,
		color: '#131d4a',
		fontSize: 15,
		height: 65,
		borderWidth: 1,
		borderColor: 'rgba(230,230,230,0.6)',
        backgroundColor: 'rgba(230,230,230,0.6)',
        marginTop:10,
		paddingTop: 30,
		width: Dimensions.get('window').width * 0.85,
		alignSelf: 'center'
    },
    active:{
        flex: 1,
		paddingLeft: 12,
		color: '#131d4a',
		fontSize: 15,
		height: 65,
		borderWidth: 1,
		borderColor: 'rgba(230,230,230,0.6)',
        backgroundColor: 'transparent',
        marginTop:10,
		paddingTop: 30,
		width: Dimensions.get('window').width * 0.85,
        alignSelf: 'center',
        borderLeftWidth:3,
        borderLeftColor:"#5988FF"
    }
});
export default InputField;
