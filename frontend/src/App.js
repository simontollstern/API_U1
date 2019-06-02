import React, { useState, Fragment } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [method, setMethod] = useState('GET');
  const [path, setPath] = useState('');
  const [query, setQuery] = useState('');
  const [id, setId] = useState('');
  const [selectedStudent, setSelectedStudent] = useState({});

  const updateMethod = (e) => {
    setMethod(e.target.value);
    setId('');
    setQuery('');
    if(e.target.value !== 'GET_QUERY'){
      setPath('');
    }else{
      setPath('?name=');
    }
  }

  const updateMethodPut = (studentId) => {
    setMethod('PUT');
    document.querySelector('input[type="radio"][value="PUT"]').checked = true;
    setId(studentId);
    setQuery('');
    setPath('');
    for(let student of students){
      if(student._id === studentId){
        setSelectedStudent(student);
      }
    }
  }

  const updateMethodDelete = (studentId) => {
    setMethod('DELETE');
    document.querySelector('input[type="radio"][value="DELETE"]').checked = true;
    setId(studentId);
    setQuery('');
    setPath('');
    for(let student in students){
      if(student._id === studentId){
        setSelectedStudent(student);
      }
    }
  }

  const updateQuery = (e) => {
    setQuery(encodeURIComponent(e.target.value));
  }

  const updateId = (e) => {
    setId(e.target.value);
  }

  let tempUserNew = {
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: '',
      city: ''
    }
  };
  const updateNewStudent = (e) =>{
    switch (e.target.name) {
      case 'name':
        tempUserNew.name = e.target.value;
        break;
      case 'email':
        tempUserNew.email = e.target.value;
        break;
      case 'street':
        tempUserNew.address.street = e.target.value;
        break;
      case 'zipCode':
        tempUserNew.address.zipCode = e.target.value;
        break;
      case 'city':
        tempUserNew.address.city = e.target.value;
        break;
      default:

    }
  }

  let tempUserExisting = selectedStudent;
  const updateExistingStudent = (e) =>{
    switch (e.target.name) {
      case 'name':
        tempUserExisting.name = e.target.value;
        break;
      case 'email':
        tempUserExisting.email = e.target.value;
        break;
      case 'street':
        tempUserExisting.address.street = e.target.value;
        break;
      case 'zipCode':
        tempUserExisting.address.zipCode = e.target.value;
        break;
      case 'city':
        tempUserExisting.address.city = e.target.value;
        break;
      default:

    }
  }

  const submit = (e) => {
    e.preventDefault();
    switch (method) {
      case 'GET':
        get();
        break;
      case 'GET_QUERY':
        getByQuery(query)
        break;
      case 'GET_ID':
        getById(id);
        break;
      case 'POST':
        post(tempUserNew);
        break;
      case 'PUT':
        put(tempUserExisting, id);
        break;
      case 'DELETE':
        deleteById(id);
        break;
      default:
        break;
    }
    let textFields = document.querySelectorAll('input[type="text"]'); // Bad practice in React whatever
    if(textFields.length > 0){
      for(let field of textFields){
        field.value = '';
      }
    }
  }

  const get = () => {
    fetch('http://localhost:3001/students/')
      .then(res => res.json())
      .then(data => setStudents(data));
  }

  const getByQuery = (query) => {
    fetch('http://localhost:3001/students/?name=' + query)
      .then(res => res.json())
      .then(data => setStudents([data]))
      .catch(() => setStudents([]));
  }

  const getById = (id) => {
    fetch('http://localhost:3001/students/' + id)
      .then(res => res.json())
      .then(data => setStudents([data]))
      .catch(() => setStudents([]));
  }

  const post = (student) => {
    fetch('http://localhost:3001/students/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(student)
    })
    .then(res => res.json())
    .then(() => get());
  }

  const put = (student, id) => {
    fetch('http://localhost:3001/students/' + id, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(student)
    })
    .then(res => res.json())
    .then(() => get())
    .catch(() => get());
  }

  const deleteById = (id) => {
    fetch('http://localhost:3001/students/' + id, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => get());
    setId('');
  }

  return (
    <div className="App">
      <div>
        <pre>
          <code>
            <div className="array">
              {'['}
                {students.map((student, index) => {
                  return <div key={index} className="object">
                    {'{'}<br/>
                  <div className="content">
                    <span className="property">_id</span>: '<span className="value">{student._id}</span>',<br/>
                    <span className="property">name</span>: '<span className="value">{student.name}</span>',<br/>
                    <span className="property">email</span>: '<span className="value">{student.email}</span>',<br/>
                    <span className="property">address</span>: {'{'}
                    <div className="address">
                      <span className="property">street</span>: '<span className="value">{student.address.street}</span>',<br/>
                      <span className="property">zipCode</span>: '<span className="value">{student.address.zipCode}</span>',<br/>
                      <span className="property">city</span>: '<span className="value">{student.address.city}</span>'<br/>
                    </div>
                    <span className="button edit" onClick={() => updateMethodPut(student._id)}>> EDIT</span><br/>
                    <span className="button delete" onClick={() => updateMethodDelete(student._id)}>> DELETE</span><br/>
                  </div>
                  {'}'}{index + 1 < students.length && ','}
                  </div>
                })}
              {']'}
            </div>
          </code>
        </pre>
      </div>
      <div>
        <div>
        <h1>bongbong</h1>
        <div className="url"><pre><code>localhost:3001/students/{path}{query}{id}</code></pre></div>
        <form onSubmit={submit}>
          <div>
            <label><input type="radio" name="method" onChange={updateMethod} value="GET" defaultChecked /> GET</label>
            <label><input type="radio" name="method" onChange={updateMethod} value="GET_QUERY" /> GET (Query)</label>
            <label><input type="radio" name="method" onChange={updateMethod} value="GET_ID" /> GET (Id)</label>
            <label><input type="radio" name="method" onChange={updateMethod} value="POST" /> POST</label>
            <label className="disabled"><input type="radio" name="method" onChange={updateMethod} value="PUT" disabled /> PUT</label>
            <label className="disabled"><input type="radio" name="method" onChange={updateMethod} value="DELETE" disabled /> DELETE</label>
          </div>

          {method === 'GET_QUERY' &&
            <label>
              QUERY
              <input type="text" name="query" onInput={updateQuery} />
            </label>
          }

          {method === 'GET_ID' &&
            <label>
              ID
              <input type="text" name="id" onInput={updateId} />
            </label>
          }

          {method === 'POST' &&
            <Fragment>
              <label>
                NAME
                <input type="text" name="name" onInput={updateNewStudent} />
              </label>
              <label>
                EMAIL
                <input type="text" name="email" onInput={updateNewStudent} />
              </label>
              <label>
                STREET
                <input type="text" name="street" onInput={updateNewStudent} />
              </label>
              <label>
                ZIP CODE
                <input type="text" name="zipCode" onInput={updateNewStudent} />
              </label>
              <label>
                CITY
                <input type="text" name="city" onInput={updateNewStudent} />
              </label>
            </Fragment>
          }

          {method === 'PUT' &&
            <Fragment>
              <label>
                NAME
                <input type="text" name="name" defaultValue={tempUserExisting.name} onInput={updateExistingStudent} />
              </label>
              <label>
                EMAIL
                <input type="text" name="email" defaultValue={tempUserExisting.email} onInput={updateExistingStudent} />
              </label>
              <label>
                STREET
                <input type="text" name="street" defaultValue={tempUserExisting.address.street} onInput={updateExistingStudent} />
              </label>
              <label>
                ZIP CODE
                <input type="text" name="zipCode" defaultValue={tempUserExisting.address.zipCode} onInput={updateExistingStudent} />
              </label>
              <label>
                CITY
                <input type="text" name="city" defaultValue={tempUserExisting.address.city} onInput={updateExistingStudent} />
              </label>
            </Fragment>
          }

          {method === 'DELETE' &&
            <p>Press 'OK' to confirm deletion</p>
          }

          <input type="submit" value="GO" />
        </form>
        </div>
      </div>
    </div>
  );
}

export default App;
