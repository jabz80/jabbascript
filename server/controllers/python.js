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
      res.status(200).send(response.data);
    })
    .catch((error) => {
    });
}

module.exports = { compile };
