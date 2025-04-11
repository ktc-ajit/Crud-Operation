let regForm = document.querySelector(".register-form");
let allInput = regForm.querySelectorAll("INPUT");
let allBtn = regForm.querySelectorAll("BUTTON");
let closeBtn = document.querySelector(".btn-close");
let regList = document.querySelector(".reg-list");
let addBtn = document.querySelector(".add-btn");
let allRegData = [];

if (localStorage.getItem("allRegData") != null) {
  allRegData = JSON.parse(localStorage.getItem("allRegData"));
}

regForm.onsubmit = (e) => {
  e.preventDefault();
  allRegData.push({
    name: allInput[0].value,
    email: allInput[1].value,
    dob: allInput[2].value,
    mobile: allInput[3].value,
    age: allInput[4].value,
  });
  localStorage.setItem("allRegData", JSON.stringify(allRegData));
  swal("Data Inserted", "successfully !", "success");
  closeBtn.click();
  regForm.reset("");
  getRegData();
};

const calculateAge = (dob) => {
  let birthDate = new Date(dob);
  let today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

allInput[2].addEventListener("change", () => {
  if (allInput[2].value) {
    allInput[4].value = calculateAge(allInput[2].value);
  }
});

const getRegData = () => {
  regList.innerHTML = "";
  allRegData.forEach((data, index) => {
    let dataStr = JSON.stringify(data);
    let finalData = dataStr.replace(/"/g, "'");
    regList.innerHTML += `
                   <tr>
                                     <td>${index + 1}</td>
                                     <td>${data.name}</td>
                                     <td>${data.email}</td>
                                     <td>${data.dob}</td>
                                     <td>${data.mobile}</td>
                                     <td>${data.age}</td>
                                     <td>
                                            <button data="${finalData}" index="${index}" class="edit-btn btn p-1 px-2 btn-primary">
                                            <i class="fa fa-edit"></i>
                                            </button>
                                            <button index="${index}" class="del-btn btn p-1 px-2 btn-danger">
                                            <i class="fa fa-trash"></i>
                                            </button>
                                    </td>
                         </tr>
       `;
  });
  action();
};

const action = () => {
  let allDelBtn = regList.querySelectorAll(".del-btn");
  for (let btn of allDelBtn) {
    btn.onclick = () => {
      let index = btn.getAttribute("index");
      allRegData.splice(index, 1);
      localStorage.setItem("allRegData", JSON.stringify(allRegData));
      getRegData();
    };
  }
  let allEditBtn = regList.querySelectorAll(".edit-btn");
  for (let btn of allEditBtn) {
    btn.onclick = () => {
      let index = btn.getAttribute("index");
      let dataStr = btn.getAttribute("data");
      let finalData = dataStr.replace(/'/g, '"');
      let data = JSON.parse(finalData);
      addBtn.click();
      allInput[0].value = data.name;
      allInput[1].value = data.email;
      allInput[2].value = data.dob;
      allInput[3].value = data.mobile;
      allInput[4].value = data.age;
      allInput[4].readOnly = true;
      allBtn[0].style.display = "inline-block";
      allBtn[0].disabled = false;
      allBtn[1].style.display = "none";

      allBtn[0].onclick = () => {
        allRegData[index] = {
          name: allInput[0].value,
          email: allInput[1].value,
          dob: allInput[2].value,
          mobile: allInput[3].value,
          age: allInput[4].value,
        };
        localStorage.setItem("allRegData", JSON.stringify(allRegData));
        swal("Data Updated", "successfully !", "success");
        closeBtn.click();
        regForm.reset("");
        getRegData();
      };
    };
  }
};
addBtn.onclick = () => {
  allBtn[0].style.display = "none";
  allBtn[1].style.display = "inline-block";
};

getRegData();
