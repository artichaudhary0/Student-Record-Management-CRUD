
let currentEditIndex = null;

document.addEventListener("DOMContentLoaded", displayRecords);

function getRecords() {
  const records = localStorage.getItem("records");
  return records ? JSON.parse(records) : [];
}

function displayRecords() {
  const recordList = document.getElementById("recordList");
  recordList.innerHTML = "";

  const records = getRecords();
  records.forEach((record, index) => {
    recordList.innerHTML += `
      <tr>
        <td>${record.name}</td>
        <td>${record.details}</td>
        <td>${new Date(record.date).toLocaleString()}</td>
        <td>
          <button onclick="loadRecord(${index})">Edit</button>
          <button onclick="deleteRecord(${index})">Delete</button>
        </td>
      </tr>`;
  });
}

function addRecord() {
  const nameInput = document.getElementById("name").value.trim();
  const detailsInput = document.getElementById("details").value.trim();

  if (!nameInput || !detailsInput) {
    alert("Both name and details are required.");
    return;
  }

  const newRecord = {
    id: generateUniqueId(),
    name: nameInput,
    details: detailsInput,
    date: new Date(),
  };

  const records = getRecords();
  records.push(newRecord);
  localStorage.setItem("records", JSON.stringify(records));

  clearForm();
  displayRecords();
}

function loadRecord(index) {
  const records = getRecords();
  const record = records[index];

  document.getElementById("name").value = record.name;
  document.getElementById("details").value = record.details;

  currentEditIndex = index;

  document.getElementById("addButton").style.display = "none";
  document.getElementById("updateButton").style.display = "inline";
}

function updateRecord() {
  const records = getRecords();

  records[currentEditIndex].name = document.getElementById("name").value.trim();
  records[currentEditIndex].details = document
    .getElementById("details")
    .value.trim();
  records[currentEditIndex].date = new Date();

  localStorage.setItem("records", JSON.stringify(records));

  clearForm();
  displayRecords();

  document.getElementById("addButton").style.display = "inline";
  document.getElementById("updateButton").style.display = "none";

  currentEditIndex = null;
}

function deleteRecord(index) {
  const records = getRecords();
  records.splice(index, 1);
  localStorage.setItem("records", JSON.stringify(records));
  displayRecords();
}

function searchRecords() {
  const query = document.getElementById("search").value.toLowerCase();
  const records = getRecords();
  const filteredRecords = records.filter((record) =>
    record.name.toLowerCase().includes(query)
  );

  const recordList = document.getElementById("recordList");
  recordList.innerHTML = "";

  filteredRecords.forEach((record, index) => {
    recordList.innerHTML += `
      <tr>
        <td>${record.name}</td>
        <td>${record.details}</td>
        <td>${new Date(record.date).toLocaleString()}</td>
        <td>
          <button onclick="loadRecord(${index})">Edit</button>
          <button onclick="deleteRecord(${index})">Delete</button>
        </td>
      </tr>`;
  });
}

function generateUniqueId() {
  return Math.floor(Math.random() * Date.now());
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("details").value = "";
}
