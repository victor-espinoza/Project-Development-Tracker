function displayProjectData(res) {
  let data = res.data;
  const ul = document.createElement('ul');
  for (let item of data ) {
    let li = document.createElement('li');
    li.textContent = item.name;
    ul.appendChild(li);
    document.body.appendChild(ul);
  }
}