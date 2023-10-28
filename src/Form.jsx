import React, { useState, useEffect } from 'react';

const Form = () => {
  // Define state variables to hold user input and user data from the backend
  const [name, setName] = useState(''); // State for user's name
  const [email, setEmail] = useState(''); // State for user's email
  const [users, setUsers] = useState([]); // State for storing user data from the backend

  // Use the `useEffect` hook to fetch users from the backend when the component loads
  useEffect(() => {
    fetch('http://localhost:3001/user') // Send a GET request to fetch user data
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => setUsers(data)) // Set the retrieved user data in the state
      .catch((error) => console.error('Error fetching users:', error)); // Handle errors if any
  }, []); // The empty array [] as the second argument means this effect runs only once on component mount

  // Define a function to add a new user
  const addUser = () => {
    fetch('http://localhost:3001/user', {
      method: 'POST', // Send a POST request to add a new user
      headers: {
        'Content-Type': 'application/json', // Set the request header for JSON data
      },
      body: JSON.stringify({ name, email }), // Send the user's name and email as JSON data
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        console.log(data.message); // Log a message from the response
        // Optionally, you can also update the user list after adding a user
        fetch('http://localhost:3001/user') // Fetch the updated list of users
          .then((response) => response.json()) // Parse the response as JSON
          .then((data) => setUsers(data)) // Update the user list in the state
          .catch((error) => console.error('Error fetching users:', error)); // Handle errors if any
      })
      .catch((error) => console.error('Error adding user:', error)); // Handle errors if any
  };
  const deleteUser = (userId) => {
    fetch(`http://localhost:3001/user/${userId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the deleted user from the list of users
        const updatedUsers = users.filter((user) => user._id !== userId);
        setUsers(updatedUsers);
      })
      .catch((error) => console.error('Error deleting user:', error));
  };
        
        
     
  // Render the component
  return (
  
    <div>
      <form>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update the 'name' state on input change
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update the 'email' state on input change
        />
        <button type="button" onClick={addUser}>
          Submit
        </button>
      </form>

      <div>
        <h3>Users</h3>
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.name} - {user.email} 
            <button onClick={()=>deleteUser(user._id)}>delete</button></li>
           
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Form;
