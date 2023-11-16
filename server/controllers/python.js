const Axios = require('axios');

async function compile(req, res) {
  try {
    let code = req.body.code;
    let language = 'py';
    let input = req.body.input;
    console.log(code);

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
    //calling the code compilation API using async/await
    const response = await Axios(config);
    res.send(response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error occurred while compiling the code.');
  }
}

module.exports = { compile };
