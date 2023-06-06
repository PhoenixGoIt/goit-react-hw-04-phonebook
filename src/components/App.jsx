import { nanoid } from 'nanoid';
import React, {Component} from "react";
import {InFormName} from './InFormName/InFormName'
import { NumberInput } from "./NumberInput/NumberInput";
import { NameInput } from "./NameInput/NameInput";
import { AddBtn } from "./AddBtn/AddBtn";
import { ContactList } from './ContactList/ContactList';
import { FilterСontacts } from './FilterСontacts/FilterСontacts';

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
    name: '',
    number: ''
  }

  componentDidMount() {
    console.log('componentDidMount');
    const savedContacts = localStorage.getItem('contacts');
    console.log(savedContacts);
    if (savedContacts !== null) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    } else {
      this.setState({
        contacts: this.state.contacts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleChangeName = e => {
    this.setState({
      name: e
    })
  }

  handleChangeNumber = e => {
    this.setState({
      number: e
    })
  }

  handleSubmit = e => {
    const {name, number} = this.state
    e.preventDefault();

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (this.state.contacts.filter(contact =>  contact.number.trim() === newContact.number.trim()).length) {
      alert(`${newContact.number }: is already in contacts`)
      return
    }

    this.setState(({ contacts }) => {
      return {
        contacts: [newContact, ...contacts],
      };
    });
  }

    deleteContact = Id => {
      this.setState(prevState => {
        return {
          contacts: prevState.contacts.filter(
            contact => contact.id !== Id
          ),
        };
      });
    };

    changeFilter = e =>
    this.setState({ filter: e.target.value.toLowerCase() });

  getVisibleContacts = () =>
    this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

  render() {
    const { filter} = this.state
    return(
      <div>
      <h1>Phonebook</h1>
      <form onSubmit={this.handleSubmit}>
        <InFormName title='Name' />
          <NameInput onChange={this.handleChangeName} />
        <InFormName title='Number' />
          <NumberInput onChange={this.handleChangeNumber} />
          <AddBtn />
      </form>
      <h2>Contacts</h2>
      <FilterСontacts onChange={this.changeFilter}  filter={filter}/>
      <ContactList onClick={this.deleteContact}contacts={this.getVisibleContacts()}/>
      </div>
    )
}
}
//sdf