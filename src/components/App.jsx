import { useState } from 'react';
import { nanoid } from 'nanoid';
import { InFormName } from './InFormName/InFormName';
import { NumberInput } from './NumberInput/NumberInput';
import { NameInput } from './NameInput/NameInput';
import { AddBtn } from './AddBtn/AddBtn';
import { ContactList } from './ContactList/ContactList';
import { FilterСontacts } from './FilterСontacts/FilterСontacts';
import { useLocalStorage } from './hooks/hooks';

export function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeName = (e) => {
    setName(e);
  };

  const handleChangeNumber = (e) => {
    setNumber(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setName('');
    setNumber('');
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (contacts.filter((contact) => contact.number.trim() === newContact.number.trim()).length) {
      alert(`${newContact.number}: is already in contacts`);
      return;
    }

    setContacts((prevContacts) => [newContact, ...prevContacts]);
  };

  const deleteContact = (id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  const changeFilter = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const getVisibleContacts = () => {
    return contacts.filter((contact) => contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <InFormName  title="Name" />
        <NameInput value={name} onChange={handleChangeName} />
        <InFormName title="Number" />
        <NumberInput value={number} onChange={handleChangeNumber} />
        <AddBtn />
      </form>
      <h2>Contacts</h2>
      <FilterСontacts onChange={changeFilter} filter={filter} />
      <ContactList onClick={deleteContact} contacts={getVisibleContacts()} />
    </div>
  );
}
