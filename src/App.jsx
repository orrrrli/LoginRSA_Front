import  { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [passwordEncrypted, setPassword] = useState('');
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [UserID, setLoginID] = useState('');
  const [UserPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState(null); // State to store user data
  const [showUserInfoModal, setShowUserInfoModal] = useState(false); // State to manage visibility of user info modal
  const handleLogin = async () => {
    try {
      const response = await fetch(`https://localhost:7114/api/Users?userId=${UserID}&password=${UserPassword}`);
      
      // Handle response
      if (response.ok) {
        console.log('Login successful');
        const userData = await response.json();
        setUser(userData); // Store user data in state
        setShowUserInfoModal(true); // Show user info modal
      } else {
        // Login failed
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleCreateUser = async () => {
    try {
      const response = await fetch('https://localhost:7114/api/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email, // Using newUserEmail state for email
          passwordEncrypted: passwordEncrypted, // Using newUserPassword state for passwordEncrypted
          d: 0 // Assuming 'd' always has a value of 0
        }),
      });
  
      // Handle response
      const data = await response.json();
      console.log('Create user response:', data);
  
      // Reset input fields
      setEmail('');
      setPassword('');
  
      // Close modal after creating user
      setShowCreateUserModal(false);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  
  
  


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="email"
          className="w-full mb-2 p-2 border border-gray-300 rounded"
          placeholder="User ID"
          value={UserID}
          onChange={(e) => setLoginID(e.target.value)}
        />
        <input
          type="password"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          placeholder="Password"
          value={UserPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="mt-2 px-4 text-blue-500"
          onClick={() => setShowCreateUserModal(true)}
        >
          Create User
        </button>
      </div>

      {showCreateUserModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Create User</h2>
            <input
              type="email"
              className="w-full mb-2 p-2 border border-gray-300 rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full mb-4 p-2 border border-gray-300 rounded"
              placeholder="Password"
              value={passwordEncrypted}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleCreateUser}
            >
              Create
            </button>
            <button
              className="ml-4 text-gray-500"
              onClick={() => setShowCreateUserModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {showUserInfoModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg m-4">
            <h2 className="text-xl font-bold mb-4">User Information</h2>
            <p>Email: {user.email}</p>
            <p>Password Encrypt: {user.passwordEncrypted}</p>
            <button
              className="text-gray-500"
              onClick={() => setShowUserInfoModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
