/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

class Sidebar extends Component {
    render(){
        let unreadCount = this.props.emails.reduce((previous, msg) => {
            if(msg.isReaded !== true) {
                return previous + 1;
            } else {
                return previous;
            }
        }, 0);   
        let spamCount = this.props.emails.reduce((previous, msg) => {
            if(msg.mailinbox === "spam") {
                return previous + 1;
            } else {
                return previous;
            }
        }, 0); 
        let deletedCount = this.props.emails.reduce((previous, msg) => {
            if(msg.mailinbox === "deleted") {
                return previous + 1;
            } else {
                return previous;
            }
        }, 0); 
        return (
            <div id="sidebar">
                <div className="sidebar__compose">
                    <a href="#" className="btn compose">
                        Inbox 
                    </a>
                </div>
                <ul className="sidebar__inboxes">
                    <li onClick={ () => this.props.setSidebarSection('inbox') }>
                        <a>
                            <span className="fa fa-inbox"></span>
                            <div className="cut">Bandeja de entrada</div>
                            <span className="item-count"> {unreadCount}</span>
                        </a>
                    </li>
                    <li onClick={ () => this.props.setSidebarSection('spam') }>
                        <a>
                            <span className="fa fa-ban"></span>
                            <div className="cut">Marcar como correo no deseado</div>
                            <span className="item-count"> {spamCount}</span>
                           
                        </a>
                    </li>
                    <li onClick={ () => this.props.setSidebarSection('deleted') }>
                        <a> 
                            <span className="fa fa-trash-o"></span>
                            <div className="cut">Eliminados</div>
                            <span className="item-count"> {deletedCount}</span>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}


export default Sidebar;