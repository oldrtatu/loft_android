import React from 'react'
import { Text } from 'react-native'

class InventoryForm extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        console.log(this.props)
    }

    render(){
        return(
            <Text>Inventory form</Text>
        )
    }
}

export default InventoryForm