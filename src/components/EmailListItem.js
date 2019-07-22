import React, { Component } from 'react';

class EmailListItem extends Component {
    render() {
        let classes = "email-item";
        if (this.props.selected) {
            classes += " selected";
        }
        return (
            <div onClick={ () => this.props.onEmailClicked(this.props.email.id) } className={ classes }> 
                <div className="email-item__unread-dot" data-read={ this.props.email.isReaded }>{ this.props.email.isReaded }</div>
                <div className="email-item__subject truncate" data-read={ this.props.email.subject }>{ this.props.email.subject }</div>
                <div className="email-item__details">
                    <span className="email-item__from truncate cut2">{ this.props.email.body }</span>
                    <span className="email-item__time truncate">{ this.props.email.date }</span>
                </div>
            </div>
        )
    }
};

export default EmailListItem;