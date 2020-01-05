import React from 'react'
import { Text } from 'react-native'

import styles from './styles/todolist'


class ToDoList extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Text>To do list</Text>
        )
    }
}

export default ToDoList