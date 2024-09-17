let taskList=[]
const RANDOM_STRING_LENGTH = 6;
//getting data from the form and  adding it to the tasklist
addTask=(myform)=>{
    const formData=new FormData(myform);
    const task=formData.get("task")
    const hour = parseInt(formData.get("hour"));
    const id = getRandomUniqueID();
    const taskObj={
        id,
        task,
        hour,
        type: "good",
    
    };
    taskList.push(taskObj);
    displayList()
    myform.reset();
}
const displayList=()=>{
    const goodList=document.getElementById("goodlist")
    let goodListContent=""
    let goodIndex=0
    taskList.map((item, index)=>{
        if(item.type=="good"){
        goodIndex+=1;
        goodListContent+= `
        <tr>
        <th scope="row">${goodIndex}</th>
        <td>${item.task}</td>
        <td>${item.hour}hrs</td>
        <td class="text-end">
            <button type="button" class="btn btn-danger" onclick="deleteTask('${item.id}')"><i
                    class="fa-solid fa-trash"></i></button>

            <button type="button" class="btn btn-success" onclick="switchTask('${item.id}')"><i
                    class="fa-solid fa-arrow-right"></i></button>
        </td>
    </tr>
    
    `;

    }
    }
    )
    goodList.innerHTML=goodListContent;
    const totalHours=getTotalHours();
    const totalHourelement=document.getElementById("total-hours")
    totalHourelement.innerText=`The total hours allocated = ${totalHours} hours`

    
    const badList=document.getElementById("badlist")
    let badListContent=""
    let badIndex=0
    taskList.map((item, index)=>{
        if(item.type!="good"){
        badIndex+=1;
        badListContent+= `
        <tr>
        <th scope="row">${badIndex}</th>
        <td>${item.task}</td>
        <td>${item.hour}hrs</td>
        <td class="text-end">
        <button type="button" class="btn btn-warning" onclick="switchTask('${item.id}')"><i
                class="fa-solid fa-arrow-left"></i></button>
            <button type="button" class="btn btn-danger" onclick="deleteTask('${item.id}')"><i
                    class="fa-solid fa-trash"></i></button>

        </td>
    </tr>
    
    `;

    }
    }
    )
badList.innerHTML=badListContent;
let badHours=0;
badHours=getbadHours();
const badHourelement=document.getElementById("bad-hours")
badHourelement.innerText=`You could have saved = ${badHours} hours`

}
function getTotalHours()
{
let totalHours=taskList.reduce((acc,item)=>{
return acc+item.hour;
},0)
return totalHours;
}

function getbadHours()
{
let badHours=taskList.reduce((acc,item)=>{
if(item.type!="good"){
    return acc+item.hour;
}
else
{
    return 0;
}
},0)
return badHours;
}

const getRandomUniqueID = () => {
    let stringGenerator =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";

    for (let i = 0; i < RANDOM_STRING_LENGTH; i++) {
        let randomIndex = Math.floor(Math.random() * stringGenerator.length);
        randomString = randomString + stringGenerator[randomIndex];
    }

    return randomString;
};
const switchTask = (id) => {
    let task = taskList.find((task) => task.id == id);
    task.type = task.type == "good" ? "bad" : "good";

    displayList();
    // displayAlert("TASK SWITCHED");
};

const deleteTask=(id)=>{
    taskList=taskList.filter((item)=>item.id !== id)
    displayList();

}