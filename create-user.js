const options = {
  method: 'POST',
  headers: {accept: 'application/json', 'content-type': 'application/json'},
  body: JSON.stringify({
    firstName: 'Mina',
    lastName: 'Myoi',
    role: 'minari@gmal.com',
    email: 'Admin'
  })
};

fetch('https://api.fireblocks.io/v1/management/users', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));