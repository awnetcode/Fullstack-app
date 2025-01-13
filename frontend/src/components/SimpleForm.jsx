import React from 'react';

import '../styles/SimpleForm.css';

import Button from './items/Button';

class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      date: '',
      phone: '',
      license: ''
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  saveToServer = async () => {
    try {
      const response = await fetch('http://localhost:5000/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      });

      if (response.ok) {
        alert('Data saved successfully!');
      } else {
        alert('Failed to save data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving data.');
    }
  }

  render() {
    return (
      <div className='form-area'>
        <form className='application-form'>
            <input type="date" className='date-input' name='date' onChange={this.handleInputChange}/>
          <label>
            Imię:
            <input className='text-input' type="text" name="name" onChange={this.handleInputChange} />
          </label>
          <label>
            Email:
            <input className='text-input' type="text" name="email" onChange={this.handleInputChange} />
          </label>
          <label>
            Tel:
            <input className='text-input' type="text" name="phone" onChange={this.handleInputChange} />
          </label>
          <label>
            Nr prowadzącego:
            <input className='text-input license' type="text" name="license" onChange={this.handleInputChange} />
          </label>
        </form>
        <div className='result-area'>
          <h2>Your Input:</h2>
          <p>Imię: {this.state.name}</p>
          <p>Email: {this.state.email}</p>
          <p>Data: {this.state.date}</p>
          <p>Tel: {this.state.phone}</p>
          <p>Nr legitymacji: {this.state.license}</p>
        </div>
        <Button action={this.saveToServer} content={'Save to JSON'}/>
      </div>
    );
  }
}

export default SimpleForm;
