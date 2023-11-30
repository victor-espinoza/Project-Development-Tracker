const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const axios = require('axios');
const moment = require('moment');


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
    const apiResponse = await axios.get('http://localhost:5000/sprints-overview',  {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
  } catch (e) { console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
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
    const apiResponse = await axios.get('http://localhost:5000/tasks-overview', {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
  } catch (e) { console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
  res.render('tasksOverview', { 
    title: "Tasks Overview:", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});


router.get('/projects-overview', requiresAuth(), async (req, res) => {
  let data = {};
  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/projects-overview', {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
    //format date fields to be in MM/DD/YYYY format instead of the default YYYY/MM/DD format of the DATE type
    data.forEach(item => {
      // moment(data.newStartDate).format("YYYY-MM-DD");
      item.start_date = moment(item.start_date).format("MM/DD/YYYY");
      item.due_date = moment(item.due_date).format("MM/DD/YYYY");
    });
  } catch (e) { console.log(e); }//console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
  res.render('projectsOverview', { 
    title: "Projects Overview:", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});


router.get('/create-task', requiresAuth(), async (req, res) => {
  let data = {};
  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/create-task', {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
  } catch (e) { console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
  res.render('createTask', { 
    title: "Create Task Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});


router.get('/read-task', requiresAuth(), async (req, res) => {
  let data = {};
  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/read-task',  {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
  } catch (e) { console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
  res.render('readTask', { 
    title: "Read Task Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});


router.get('/update-task', requiresAuth(), async (req, res) => {
  let data = {};
  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/update-task', {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
  } catch (e) { console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
  res.render('updateTask', { 
    title: "Update Task Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});


router.get('/delete-task', requiresAuth(), async (req, res) => {
  let data = {};
  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/delete-task', {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
  } catch (e) { }
  //render the content after a successful api response
  res.render('deleteTask', { 
    title: "Delete Task Privilege Scoped Page", 
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
    const apiResponse = await axios.get('http://localhost:5000/create-sprint', {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
  } catch (e) { console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
  res.render('createSprint', { 
    title: "Create Sprint Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});


router.get('/read-sprint', requiresAuth(), async (req, res) => {
  let data = {};
  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/read-sprint', {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
  } catch (e) { console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
  res.render('readSprint', { 
    title: "Read Sprint Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});


router.get('/update-sprint', requiresAuth(), async (req, res) => {
  let data = {};
  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/update-sprint', {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
  } catch (e) { console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
  res.render('updateSprint', { 
    title: "Update Sprint Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});



router.get('/delete-sprint', requiresAuth(), async (req, res) => {
  let data = {};
  const { token_type, access_token } = req.oidc.accessToken; 
  console.log(`${token_type}: ${access_token}`); 
  try {
    const apiResponse = await axios.get('http://localhost:5000/delete-sprint', {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
  } catch (e) { console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
  res.render('deleteSprint', { 
    title: "Delete Sprint Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});

 

//create Project data
router.get('/create-project', requiresAuth(), async (req, res) => {
  let data = {};
  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/create-project', {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
  } catch (e) { console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
  res.render('createProject', { 
    title: "Create Project Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});


router.post("/create-project", requiresAuth(), async (req, res) => {
  console.log("Posting Data Yo...");
  const { token_type, access_token } = req.oidc.accessToken; 
  const data = req.body;
  //convert input dates into the required date format
  const startDate = moment(data.newStartDate).format("YYYY-MM-DD");
  const dueDate = moment(data.newDueDate).format("YYYY-MM-DD");
  //give the input dates default values if the converted dates are invalid
  data.newStartDate = (moment(startDate).isValid()) ? moment(startDate).toDate() : new Date();
  data.newDueDate = (moment(dueDate).isValid()) ? moment(dueDate).toDate() : moment(new Date()).add(1, 'M').toDate();
  //update status and name variables if needed
  data.newStatus = (data.newStatus) ? data.newStatus : 'In Progress';
  data.newName = (data.newName) ? data.newName : 'New Project';
  console.log(data.newName);
  console.log(data.newStatus);
  console.log(data.newStartDate);
  console.log(data.newDueDate);
  try {
    const apiResponse = await axios.post('http://localhost:5000/create-project', {data}, {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    res.redirect("/projects-overview");
  } catch (e) { console.log(''); }
  
});

router.get('/read-project', requiresAuth(), async (req, res) => {
  let data = {};
  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/read-project', {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
  } catch (e) { console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
  res.render('readProject', { 
    title: "Read Project Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});


router.get('/update-project', requiresAuth(), async (req, res) => {
  let data = {};
  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/update-project', {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
  } catch (e) { console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
  res.render('updateProject', { 
    title: "Update Project Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});



router.get('/delete-project', requiresAuth(), async (req, res) => {
  let data = {};
  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/delete-project', {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
  } catch (e) { console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
  res.render('deleteProject', { 
    title: "Delete Project Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});



module.exports = router;