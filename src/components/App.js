/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import './../css/App.css';
import json from './../data/mail-data.json';
import Sidebar from './Sidebar.js';
import EmailList from './EmailList.js';
import EmailDetails from './EmailDetails.js';

class App extends Component {
  state = {
    selectedEmailId: '',
    currentSection: '',
    emails: []
  }
  componentDidMount() {
    setInterval(() => {
      const res = JSON.parse(JSON.stringify(json));
      if(typeof this.state.emails != "undefined" && this.state.emails != null && this.state.emails.length != null && this.state.emails.length > 0) {
        const emails = res;
        let id = this.state.emails.length + 1;
        for (const email of emails) {
          email.id = id++;
          email.mailinbox = 'inbox';
        }
        console.log(emails);
        this.setState({
          emails: [...emails, ...this.state.emails ]
        });
      } else {
        let id = 1;
        for (const email of res) {
          email.id = id++;
          email.mailinbox = 'inbox';
        }
        this.setState({
          selectedEmailId: 0,
          currentSection: 'inbox',
          emails: res
        });
      }
    }, 90000); 
  }
  openEmail(id) {
    const emails = [...this.state.emails];
    const index = emails.findIndex(x => x.id === id);
    emails[index].isReaded = true;
    this.setState({
      selectedEmailId: id,
      emails 
    });
  }
  deleteMessage(id) {
    // Mark the message as 'deleted'
    const emails = [...this.state.emails];
    const index = emails.findIndex(x => x.id === id);
    emails[index].isReaded = true;
    emails[index].mailinbox = 'deleted';
    // Select the next message in the list
    let selectedEmailId = '';
    for (const email of emails) {
      if(email.mailinbox === this.state.currentSection) {
          selectedEmailId = email.id;
          break;
      }
    }
    this.setState({
      emails,
      selectedEmailId,
    });
  }
  noReadMessage(id) {
    // Mark the message as 'deleted'
    const emails = [...this.state.emails];
    const index = emails.findIndex(x => x.id === id);
    emails[index].isReaded = false;
    emails[index].mailinbox = 'inbox';
    // Select the next message in the list
    let selectedEmailId = '';
    for (const email of emails) {
      if(email.mailinbox === this.state.currentSection) {
          selectedEmailId = email.id;
          break;
      }
    }
    this.setState({
      emails,
      selectedEmailId 
    });
  }
  noSpamMessage(id) {
    // Mark the message as 'deleted'
    const emails = [...this.state.emails];
    const index = emails.findIndex(x => x.id === id);
    emails[index].isReaded = true;
    emails[index].mailinbox = 'spam';
    // Select the next message in the list
    let selectedEmailId = '';
    for (const email of emails) {
      if(email.mailinbox === this.state.currentSection) {
          selectedEmailId = email.id;
          break;
      }
    }
    this.setState({
      emails,
      selectedEmailId 
    });
  }
  setSidebarSection(section) {
    let selectedEmailId = this.state.selectedEmailId;
    if (section !== this.state.currentSection) {
      selectedEmailId = '';
    }
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