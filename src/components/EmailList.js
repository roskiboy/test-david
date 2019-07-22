import React, { Component } from 'react';
import EmailListItem from './EmailListItem.js';

class EmailList extends Component {
    render() {
        if(this.props.emails.length === 0) {
            return (
                <div className="email-list empty">La bandeja esta vacia.</div>
            )
        }
        return (
            <div className="email-list">
            { this.props.emails.map((email, index) => { 
                return(
                    <EmailListItem 
                        key = { index }
                        onEmailClicked = { (id) => this.props.onEmailSelected(id) }
                        email = { email }
                        selected = { this.props.selectedEmailId === email.id } 
                    />
                )
            }) }
            </div>
        )
    }
};

export default EmailList;