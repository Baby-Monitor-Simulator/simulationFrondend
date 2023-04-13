const axios = require('axios').default;

// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then(function (response: any) {
    // handle success
    console.log(response);
  })
  .catch(function (error: any) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });



// Want to use async/await? Add the `async` keyword to your outer function/method.
// async function getUser() {
//   try {
//     const response = await axios.get('/user?ID=12345');
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
//}