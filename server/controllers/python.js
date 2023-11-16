const Axios = require('axios');

function compile(req, res) {
  let code = req.body.code;
  let language = 'py';
  let input = req.body.input;

  let data = {
    code: code,
    language: language,
    input: input,
  };
  console.log(data);
  let config = {
    method: 'post',
    url: 'https://api.codex.jaagrav.in',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
  //calling the code compilation API
  Axios(config)
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { compile };
