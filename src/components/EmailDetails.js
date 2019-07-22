import React, { Component } from 'react';

class EmailDetails extends Component {
    render() {
        if (!this.props.email) {
            return (
                <div className="email-content empty"></div>
            );
        }
        const date = `${this.props.email.date} · ${this.props.email.date}`;    
        const getDeleteButton = () => {
            if (this.props.email.mailinbox !== 'deleted') {
            return (
                <span onClick={ () => this.props.onDelete(this.props.email.id) } title="Eliminar" className="btn-action fa fa-trash-o"> Eliminar</span>
            );
            }
            return undefined;
        }
        const getNoReadButton = () => {
            if (this.props.email.mailinbox !== 'deleted') {
            return (
                <span onClick={ () => this.props.onNoRead(this.props.email.id) } title="Marcar como no leído" className="btn-action fa fa-envelope"> Marcar como no leído</span>
            );
            }
            return undefined;
        }
        const getSpamButton = () => {
            if (this.props.email.mailinbox !== 'spam') {
            return (
                <span onClick={ () => this.props.onSpam(this.props.email.id) } title="Marcar como correo no deseado" className="btn-action fa fa-ban"> Marcar como correo no deseado</span>
            );
            }
            return undefined;
        }
        return (
            <div className="email-content">
                <table>
                    <tbody>
                        <tr>
                            <td>{getDeleteButton()}</td>
                            <td>{getNoReadButton()}</td>
                            <td>{getSpamButton()}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="email-content__header">
                    <h3 className="email-content__subject">{this.props.email.subject}</h3>
                    
                    
                    <div className="email-content__time">{date}</div>
                    <div className="email-content__from">{this.props.email.from}</div>
                </div>
                <div className="email-content__message">{this.props.email.body}</div>
            </div>
        )
    }
};

export default EmailDetails;