import { useState } from "react";
import "./App.css";
import contactsDB from "./contacts.json";

const contactsMinusFirst5 = contactsDB.slice(5);

function App() {
  const [contacts, setContacts] = useState(contactsDB.slice(0, 5));

  const handleAddContact = () => {
    if (!contactsMinusFirst5.length) return;

    const randomIndex = Math.floor(Math.random() * contactsMinusFirst5.length);
    const randomContact = contactsMinusFirst5.splice(randomIndex, 1)[0];

    console.log(contactsMinusFirst5, randomContact);
    setContacts([...contacts, randomContact]);
  };

  const handleSortByName = () => {
    const copy = [...contacts];
    copy.sort((a, b) => a.name.localeCompare(b.name));
    setContacts(copy);
  };

  const handleSortByPop = () => {
    const copy = [...contacts];
    copy.sort((a, b) => b.popularity - a.popularity);
    setContacts(copy);
  };

  const handleDelete = (id) => {
    const newList = contacts.filter((test) => test.id !== id);
    setContacts(newList);
  };

  return (
    <div className="App">
      <h1>Iron Contacts</h1>
      <button onClick={handleAddContact}>Add Random Contact</button>
      <button onClick={handleSortByName}>Sort By Name</button>
      <button onClick={handleSortByPop}>Sort By Popularity</button>

      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            return (
              <tr key={contact.id}>
                <td>
                  <img
                    src={contact.pictureUrl}
                    alt={contact.name}
                    className="pictures"
                  />
                </td>
                <td>{contact.name}</td>
                <td>{contact.popularity}</td>
                <td>{contact.wonOscar ? "🏆" : ""}</td>
                <td>{contact.wonEmmy ? "🏆" : ""}</td>
                <td>
                  <button onClick={() => handleDelete(contact.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
