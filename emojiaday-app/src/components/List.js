import React, { Component } from 'react';
import axios from 'axios';
import Config from '../config';

export default class List extends Component {

    getEntries(){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        axios.get(`${Config.serviceUri}/api/entries/user`)
            .then(res => {
                console.log(res);
            })
            .catch(function (error) {
              console.log(error);
            });
    }

    render(){

        this.getEntries();

        return (
            <div>
                List of recent emojis...
            </div>
        )
    }
}