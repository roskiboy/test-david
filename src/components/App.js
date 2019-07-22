/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './../css/App.css';
import json from './../data/mail-data.json';
import Sidebar from './Sidebar.js';
import EmailList from './EmailList.js';
import EmailDetails from './EmailDetails.js';

class App extends Component {
  //FIXME: Falta integrar localstorage en los state
  //TODO: Creación del state vacío
  state = {
    selectedEmailId: '',
    currentSection: '',
    emails: []
  }
  //TODO: Se cargan los elementos cada 90seg del json al state referenciandolo con el componentDiDMount
  componentDidMount() {
    setInterval(() => {
      const res = JSON.parse(JSON.stringify(json));
      if(typeof this.state.emails != "undefined" && this.state.emails != null && this.state.emails.length != null && this.state.emails.length > 0) {
        //TODO: Asignar id's unicos de cada email
        const emails = res;
        let id = this.state.emails.length + 1;
        for (const email of emails) {
          email.id = id++;
          email.mailinbox = 'inbox';
        }
        //TODO: Aplicar cambios al state
        this.setState({
          emails: [...emails, ...this.state.emails ]
        });
      } else {
        //TODO: Asignar id's unicos de cada email
        let id = 1;
        for (const email of res) {
          email.id = id++;
          email.mailinbox = 'inbox';
        }
        //TODO: Aplicar cambios al state
        this.setState({
          selectedEmailId: 0,
          currentSection: 'inbox',
          emails: res
        });
      }
    }, 90000); 
  }
  //TODO: Acción (onClick): Definir en el state el id del elemento seleccionado y marcar el mensaje como 'leído'
  openEmail(id) {
    const emails = [...this.state.emails];
    const index = emails.findIndex(x => x.id === id);
    emails[index].isReaded = true;
    //TODO: Aplicar cambios al state
    this.setState({
      selectedEmailId: id,
      emails 
    });
  }
  //TODO: Acción (onClick): Marcar el mensaje como 'eliminado'
  deleteMessage(id) {
    const emails = [...this.state.emails];
    const index = emails.findIndex(x => x.id === id);
    emails[index].isReaded = true;
    emails[index].mailinbox = 'deleted';
    //TODO: Seleccione el siguiente mensaje en la lista
    let selectedEmailId = '';
    for (const email of emails) {
      if(email.mailinbox === this.state.currentSection) {
          selectedEmailId = email.id;
          break;
      }
    }
    //TODO: Aplicar cambios al state
    this.setState({
      emails,
      selectedEmailId : ''
    });
  }
  //TODO: Acción (onClick): Marcar el mensaje como 'No leído'
  noReadMessage(id) {
    const emails = [...this.state.emails];
    const index = emails.findIndex(x => x.id === id);
    emails[index].isReaded = false;
    emails[index].mailinbox = 'inbox';
    //TODO: Seleccione el siguiente mensaje en la lista
    let selectedEmailId = '';
    for (const email of emails) {
      if(email.mailinbox === this.state.currentSection) {
          selectedEmailId = email.id;
          break;
      }
    }
    //TODO: Aplicar cambios al state
    this.setState({
      emails,
      selectedEmailId : ''
    });
  }
  //TODO: Acción (onClick): Marcar el mensaje como 'No deseado'
  noSpamMessage(id) {
    const emails = [...this.state.emails];  
    const index = emails.findIndex(x => x.id === id);
    emails[index].isReaded = true;
    emails[index].mailinbox = 'spam';
    //TODO: Seleccione el siguiente mensaje en la lista
    let selectedEmailId = '';
    for (const email of emails) {
      if(email.mailinbox === this.state.currentSection) {
          selectedEmailId = email.id;
          break;
      }
    }
    //TODO: Aplicar cambios al state
    this.setState({
      emails,
      selectedEmailId : '' 
    });
  }
  //TODO: Acción (onClick): Definir en el state el id del elemento seleccionado y en que sección se encuentra; "Inbox, Spam, Deleted"
  setSidebarSection(section) {
    let selectedEmailId = this.state.selectedEmailId;
    if (section !== this.state.currentSection) {
      selectedEmailId = '';
    }
    //TODO: Aplicar cambios al state
    this.setState({
      currentSection: section,
      selectedEmailId: selectedEmailId
    });
  }
  render() {
    const currentEmail = this.state.emails.find(x => x.id === this.state.selectedEmailId);
    return (
      <div>
        <Sidebar 
          emails = { this.state.emails }
          selectedEmailId = { this.state.selectedEmailId }
          currentSection = { this.state.currentSection }
          setSidebarSection = { (section) => this.setSidebarSection(section) }
        />
        <div className="inbox-container">
          <EmailList 
            emails = { this.state.emails.filter(x => x.mailinbox === this.state.currentSection) }
            onEmailSelected = { (id) => this.openEmail(id) }
            selectedEmailId = { this.state.selectedEmailId }
            currentSection = { this.state.currentSection }
          />
          <EmailDetails 
            email = { currentEmail }
            onDelete = { (id) => this.deleteMessage(id) }
            onNoRead = { (id) => this.noReadMessage(id) }
            onSpam = { (id) => this.noSpamMessage(id) }
          />
        </div>
      </div>
    )    
  }
} 

export default App;