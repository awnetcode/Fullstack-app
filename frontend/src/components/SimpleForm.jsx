import React from 'react';

import '../styles/SimpleForm.css';

class SimpleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: ''
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
          <label>
            Name:
            <input className='text-input' type="text" name="name" onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Email:
            <input className='text-input' type="text" name="email" onChange={this.handleInputChange} />
          </label>
        </form>
        <div>
          <h2>Your Input:</h2>
          <p>Name: {this.state.name}</p>
          <p>Email: {this.state.email}</p>
        </div>
        <button onClick={this.saveToServer}>Save to JSON on Server</button>
      </div>
    );
  }
}

export default SimpleForm;
