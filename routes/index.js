var express = require('express');
var router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const axios = require('axios');


router.get('/', (req, res) => {
  // console.log(req.oidc.isAuthenticated());
  res.render('index', { 
    title: "Express Demo For Beginners", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
  });
});


router.get('/sprints-overview', requiresAuth(), async (req, res) => {
  let data = {};
  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/read-sprint',  {
      headers: {
        authorization: `${token_type} ${access_token}`
      }
    });
    data = apiResponse.data;
  } catch (e) { }

  res.render('sprintsOverview', { 
    title: "Sprints Overview:", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});



router.get('/tasks-overview', requiresAuth(), async (req, res) => {
  let data = {};

  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/read-task', 
    {
      headers: {
        authorization: `${token_type} ${access_token}`
      }
    });
    data = apiResponse.data;
  } catch (e) { }



  res.render('tasksOverview', { 
    title: "Tasks Overview:", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});



router.get('/create-task', requiresAuth(), async (req, res) => {
  let data = {};

  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/create-task', 
    {
      headers: {
        authorization: `${token_type} ${access_token}`
      }
    });
    data = apiResponse.data;
  } catch (e) { 
    console.log('Not Authorized to view page...');
  }

  res.render('createTask', { 
    title: "Create Data Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});



router.get('/read-task', requiresAuth(), async (req, res) => {
  let data = {};

  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/read-task', 
    {
      headers: {
        authorization: `${token_type} ${access_token}`
      }
    });
    data = apiResponse.data;
  } catch (e) { 
    console.log('Not Authorized to view page...');
  }

  res.render('readTask', { 
    title: "Read Data Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});


router.get('/update-task', requiresAuth(), async (req, res) => {
  let data = {};

  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/update-task', 
    {
      headers: {
        authorization: `${token_type} ${access_token}`
      }
    });
    data = apiResponse.data;
  } catch (e) { }

  res.render('updateTask', { 
    title: "Update Data Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});


router.get('/delete-task', requiresAuth(), async (req, res) => {
  let data = {};

  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/delete-task', 
    {
      headers: {
        authorization: `${token_type} ${access_token}`
      }
    });
    data = apiResponse.data;
  } catch (e) { }

  res.render('deleteTask', { 
    title: "Delete Data Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});


//create sprint data
router.get('/create-sprint', requiresAuth(), async (req, res) => {
  let data = {};

  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/create-sprint', 
    {
      headers: {
        authorization: `${token_type} ${access_token}`
      }
    });
    data = apiResponse.data;
  } catch (e) { 
    console.log('Not Authorized to view page...');
  }

  res.render('createSprint', { 
    title: "Create Data Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});



router.get('/read-sprint', requiresAuth(), async (req, res) => {
  let data = {};

  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/read-sprint', 
    {
      headers: {
        authorization: `${token_type} ${access_token}`
      }
    });
    data = apiResponse.data;
  } catch (e) { 
    console.log('Not Authorized to view page...');
  }

  res.render('readSprint', { 
    title: "Read Data Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});


router.get('/update-sprint', requiresAuth(), async (req, res) => {
  let data = {};

  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/update-sprint', 
    {
      headers: {
        authorization: `${token_type} ${access_token}`
      }
    });
    data = apiResponse.data;
  } catch (e) { }

  res.render('updateSprint', { 
    title: "Update Data Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});


router.get('/delete-sprint', requiresAuth(), async (req, res) => {
  let data = {};

  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/delete-sprint', 
    {
      headers: {
        authorization: `${token_type} ${access_token}`
      }
    });
    data = apiResponse.data;
  } catch (e) { }

  res.render('deleteSprint', { 
    title: "Delete Data Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});



module.exports = router;