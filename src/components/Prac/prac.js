// import React, { useState } from 'react';

// function UserProfile() {
//   const [name, setName] = useState('John Doe');
//   const [age, setAge] = useState(30);

//   return (
//     <div>
//       <h1>Profile</h1>
//       <p>Name: {name}</p>
//       <p>Age: {age}</p>
//       <button onClick={() => setName('Jane Doe')}>Change Name</button>
//       <button onClick={() => setAge(age + 1)}>Increase Age</button>
//     </div>
//   );
// }

// export default UserProfile;
import React, { useState } from 'react';

function UserProfile() {
  const [user, setUser] = useState({ name: 'John', age: 30 });

  const updateName = () => {
    setUser(prevUser => ({ ...prevUser, name: 'Jane' }));
  };

  const incrementAge = () => {
    setUser(prevUser => ({ ...prevUser, age: prevUser.age + 1 }));
  };

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <button onClick={updateName}>Change Name to Jane</button>
      <button onClick={incrementAge}>Increment Age</button>
    </div>
  );
}

export default UserProfile;

