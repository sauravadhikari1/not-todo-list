let taskList=[]
//getting data from the form and  adding it to the tasklist
addTask=(myform)=>{
    const formData=new FormData(myform);
    const task=formData.get("task")
    const hour = parseInt(formData.get("hour"));
    const taskObj={
        id:"myid",
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
    goodList.innerHTML=goodListContent

}