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
    const apiResponse = await axios.get('http://localhost:5000/sprints-overview', {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
    //format date fields to be in MM/DD/YYYY format instead of the default YYYY/MM/DD format of the DATE type
    formatDates(data, false);
  } catch (e) { console.log(e); }//console.log('Not Authorized to view page...'); }
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
    //format date fields to be in MM/DD/YYYY format instead of the default YYYY/MM/DD format of the DATE type
    formatDates(data, false);
  } catch (e) { console.log(e); }//console.log('Not Authorized to view page...'); }
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
    formatDates(data, false);
  } catch (e) { console.log(e); }//console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
  res.render('projectsOverview', { 
    title: "Projects Overview:", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});



//post project data
router.post("/create-task", requiresAuth(), async (req, res) => {
  const { token_type, access_token } = req.oidc.accessToken; 
  const data = req.body;
  //convert input dates into the required date format
  const startDate = moment(data.newStartDate).format("YYYY-MM-DD");
  const dueDate = moment(data.newDueDate).format("YYYY-MM-DD");
  //give the input dates default values if the converted dates are invalid
  data.newStartDate = (moment(startDate).isValid()) ? moment(startDate).toDate() : new Date();
  data.newDueDate = (moment(dueDate).isValid()) ? moment(dueDate).toDate() : moment(new Date()).add(7, 'D').toDate();
  //update status and name variables if needed
  data.newStatus = (data.newStatus) ? data.newStatus : 'In Progress';
  data.newName = (data.newName) ? data.newName : 'New Task';
  try {
    const apiResponse = await axios.post('http://localhost:5000/create-task', {data}, {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    const responseData = apiResponse.body;
    res.redirect("/tasks-overview");
    // res.redirect(url.format({
    //   pathname: "/tasks-overview",
    //   query: {
    //     sprintId : ,
    //   }
    // }));
  } catch (e) { console.log(e); } 
});


//create sprint data
router.get('/create-task', requiresAuth(), async (req, res) => {
  let data = {};
  //create default dates for the start/due date fields
  const curr_date = moment(new Date()).format('YYYY-MM-DD');
  const due_date = moment(curr_date).add(1, 'W').format('YYYY-MM-DD');
  const default_dates = { start_date: curr_date, due_date: due_date }
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
    data,
    default_dates
  });
});


router.get('/read-task', requiresAuth(), async (req, res) => {
  let data = {};
  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/read-task',  {
      params: { requested_task_id: req.query.task_id },
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
    //format date fields to be in MM/DD/YYYY format instead of the default YYYY/MM/DD format of the DATE type
    formatDates(data, false);
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
    //format date fields to be in MM/DD/YYYY format instead of the default YYYY/MM/DD format of the DATE type
    formatDates(data, true);
  } catch (e) { console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
  res.render('updateTask', { 
    title: "Update Task Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});

router.post('/delete-task', requiresAuth(), async (req, res) => {
  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.delete('http://localhost:5000/delete-task', {
      headers: { authorization: `${token_type} ${access_token}` },
      data: { delete_task_id: req.body.task_id }
    });
  } catch (e) { console.log(e); }
  res.redirect("/tasks-overview");
});

//post project data
router.post("/create-sprint", requiresAuth(), async (req, res) => {
  const { token_type, access_token } = req.oidc.accessToken; 
  const data = req.body;
  //convert input dates into the required date format
  const startDate = moment(data.newStartDate).format("YYYY-MM-DD");
  const dueDate = moment(data.newDueDate).format("YYYY-MM-DD");
  //give the input dates default values if the converted dates are invalid
  data.newStartDate = (moment(startDate).isValid()) ? moment(startDate).toDate() : new Date();
  data.newDueDate = (moment(dueDate).isValid()) ? moment(dueDate).toDate() : moment(new Date()).add(7, 'D').toDate();
  //update status and name variables if needed
  data.newStatus = (data.newStatus) ? data.newStatus : 'In Progress';
  data.newName = (data.newName) ? data.newName : 'New Sprint';
  try {
    const apiResponse = await axios.post('http://localhost:5000/create-sprint', {data}, {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    const responseData = apiResponse.body;
    res.redirect("/sprints-overview");
    // res.redirect(url.format({
    //   pathname: "/sprints-overview",
    //   query: {
    //     sprintId : ,
    //   }
    // }));
  } catch (e) { console.log(e); } 
});


//create sprint data
router.get('/create-sprint', requiresAuth(), async (req, res) => {
  let data = {};
  //create default dates for the start/due date fields
  const curr_date = moment(new Date()).format('YYYY-MM-DD');
  const due_date = moment(curr_date).add(1, 'W').format('YYYY-MM-DD');
  const default_dates = { start_date: curr_date, due_date: due_date }
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
    data,
    default_dates
  });
});


router.get('/read-sprint', requiresAuth(), async (req, res) => {
  let data = {};
  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.get('http://localhost:5000/read-sprint', {
      params: { requested_sprint_id: req.query.sprint_id },
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
    //format date fields to be in MM/DD/YYYY format instead of the default YYYY/MM/DD format of the DATE type
    formatDates(data, false);
  } catch (e) { console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
  // data.start_date = moment(data.start_date).format("MM-DD-YYYY");
  // data.due_date = moment(data.due_date).format("MM-DD-YYYY");
  console.log(data.due_date);
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
    //format date fields to be in MM/DD/YYYY format instead of the default YYYY/MM/DD format of the DATE type
    formatDates(data, true);
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
  //console.log(`${token_type}: ${access_token}`); 
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



router.post('/delete-sprint', requiresAuth(), async (req, res) => {
  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.delete('http://localhost:5000/delete-sprint', {
      headers: { authorization: `${token_type} ${access_token}` },
      data: { delete_sprint_id: req.body.sprint_id }
    });
  } catch (e) { console.log(e); }
  res.redirect("/sprints-overview");
});

 
router.post("/update-project-focus", requiresAuth(), async (req, res) => {
  const { token_type, access_token } = req.oidc.accessToken; 
  const data = req.body;
  const refererURL = req.headers.referer;
  try {
    const apiResponse = await axios.put('http://localhost:5000/update-project-focus', {data}, {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    res.redirect(refererURL); //redirect back to referer url
  } catch (e) { console.log(e); }
  
});

router.post("/update-sprint-focus", requiresAuth(), async (req, res) => {
  const { token_type, access_token } = req.oidc.accessToken; 
  const data = req.body;
  const refererURL = req.headers.referer;
  try {
    const apiResponse = await axios.put('http://localhost:5000/update-sprint-focus', {data}, {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    res.redirect(refererURL);
  } catch (e) { console.log(e); }
  
});


//create Project data
router.get('/create-project', requiresAuth(), async (req, res) => {
  let data = {};
  const curr_date = moment(new Date()).format('YYYY-MM-DD');
  const due_date = moment(curr_date).add(1, 'W').format('YYYY-MM-DD');
  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    await axios.get('http://localhost:5000/create-project', {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = {current_date: curr_date, due_date: due_date};
  } catch (e) { console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
  res.render('createProject', { 
    title: "Create Project Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});

//post project data
router.post("/create-project", requiresAuth(), async (req, res) => {
  const { token_type, access_token } = req.oidc.accessToken; 
  const data = req.body;
  //create default dates for the start/due date fields
  const startDate = moment(data.newStartDate).format("YYYY-MM-DD");
  const dueDate = moment(data.newDueDate).format("YYYY-MM-DD");
  //give the input dates default values if the converted dates are invalid
  data.newStartDate = (moment(startDate).isValid()) ? moment(startDate).toDate() : new Date();
  data.newDueDate = (moment(dueDate).isValid()) ? moment(dueDate).toDate() : moment(new Date()).add(1, 'M').toDate();
  //update status and name variables if needed
  data.newStatus = (data.newStatus) ? data.newStatus : 'In Progress';
  data.newName = (data.newName) ? data.newName : 'New Project';
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
      params: { requested_project_id: req.query.project_id, },
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
    //format date fields to be in MM/DD/YYYY format instead of the default YYYY/MM/DD format of the DATE type
    formatDates(data, false);
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
      params: { requested_project_id: req.query.project_id, },
      headers: { authorization: `${token_type} ${access_token}` }
    });
    data = apiResponse.data;
    //format date fields to be in MM/DD/YYYY format instead of the default YYYY/MM/DD format of the DATE type
    formatDates(data, true);
  } catch (e) { console.log('Not Authorized to view page...'); }
  //render the content after a successful api response
  res.render('updateProject', { 
    title: "Update Project Privilege Scoped Page", 
    isAuthenticated: req.oidc.isAuthenticated(),
    user: req.oidc.user,
    data
  });
});


router.post('/update-project', requiresAuth(), async (req, res) => {
  const { token_type, access_token } = req.oidc.accessToken; 
  const data = req.body;
  try {
    const apiResponse = await axios.patch('http://localhost:5000/update-project', {data}, {
      headers: { authorization: `${token_type} ${access_token}` }
    });
    const responseData = apiResponse.body;
    res.redirect("/projects-overview");
    // res.redirect(url.format({
    //   pathname: "/tasks-overview",
    //   query: {
    //     sprintId : ,
    //   }
    // }));
  } catch (e) { console.log(e); } 
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


router.post('/delete-project', requiresAuth(), async (req, res) => {
  const { token_type, access_token } = req.oidc.accessToken; 
  try {
    const apiResponse = await axios.delete('http://localhost:5000/delete-project', {
      headers: { authorization: `${token_type} ${access_token}` },
      data: { delete_project_id: req.body.project_id }
    });
  } catch (e) { console.log(e); }
  res.redirect("/projects-overview");
});


function formatDates(data, inputFieldFlag) {
  //format date fields to be in MM/DD/YYYY format instead of the default YYYY/MM/DD format of the DATE type
  data.forEach(item => {
    // moment(data.newStartDate).format("YYYY-MM-DD");
    if(inputFieldFlag) {
      item.start_date = moment(item.start_date).format("YYYY-MM-DD");
      item.due_date = moment(item.due_date).format("YYYY-MM-DD");
    }
    else {
      item.start_date = moment(item.start_date).format("MM/DD/YYYY");
      item.due_date = moment(item.due_date).format("MM/DD/YYYY");
    }
  });
}

module.exports = router;