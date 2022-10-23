const employee={template:`
<div>

<button type="button"
class="btn btn-primary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
 Add Employee
</button>

<table class="table table-striped">
<thead>
    <tr>
        <th>Employee Id</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Hire Date</th>
        <th>Tasks</th>
        <th></th>
    </tr>
</thead>
<tbody>
    <tr v-for="emp in employees">
        <td>{{emp.EmployeeId}}</td>
        <td>{{emp.FirstName}}</td>
        <td>{{emp.LastName}}</td>
        <td>{{formatDate(emp.HireDate)}}</td>
        <td>{{emp.Tasks.length}}</td>
        <td>
            <button type="button"
            class="btn btn-light mr-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="editClick(emp)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>
            <button type="button" @click="deleteClick(emp.EmployeeId)"
            class="btn btn-light mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

        </td>
    </tr>
</tbody>
</thead>
</table>

<div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg modal-dialog-centered">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"
        aria-label="Close"></button>
    </div>

    <div class="modal-body">
    <div class="d-flex flex-row bd-highlight mb-3">
        <div class="p-2 w-50 bd-highlight">
          <p v-if="errors.length">
            <b class="text-danger">Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" class="text-danger">{{ error }}</li>
            </ul>
          </p>

            <div class="input-group mb-3">
                <span class="input-group-text">First Name</span>
                <input type="text" class="form-control" v-model="FirstName">
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text">Last Name</span>
                <input type="text" class="form-control" v-model="LastName">
            </div>

            <div class="input-group mb-3">
                <span class="input-group-text">Date Hired</span>
                <input type="date" class="form-control" v-model="HireDate">
            </div>

        </div>
        <div class="p-2 w-50 bd-highlight">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Start time</th>
                        <th>Deadline</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="task in tasks">
                        <td>{{task.TaskName}}</td>
                        <td>{{formatDate(task.StartTime)}}</td>
                        <td>{{formatDate(task.Deadline)}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
        <button type="button" @click="createClick()"
        v-if="EmployeeId==0" class="btn btn-primary">
        Create
        </button>
        <button type="button" @click="updateClick()"
        v-if="EmployeeId!=0" class="btn btn-primary">
        Update
        </button>

    </div>

</div>
</div>
</div>


</div>


`,

data(){
    return{
        tasks:[],
        employees:[],
        errors: [],
        modalTitle:"",
        EmployeeId:0,
        FirstName:"",
        LastName:"",
        HireDate: ""
    }
},
methods:{
    refreshData(){
        axios.get(variables.API_URL+"employees")
        .then((response)=>{
            this.employees=response.data;
        });
    },
    addClick(){
        this.modalTitle="Add Employee";
        this.EmployeeId=0;
        this.FirstName="";
        this.LastName = "";
        this.HireDate = new Date().toISOString().slice(0,10);
    },
    editClick(emp){
        this.modalTitle="Edit Employee";
        this.EmployeeId=emp.EmployeeId;
        this.FirstName=emp.FirstName;
        this.LastName = emp.LastName;
        this.HireDate = emp.HireDate.slice(0, 10);
        //this.HireDate = emp.HireDate;
        this.tasks = emp.Tasks;
    },
    validSubmit() {
        this.errors = [];
        if (this.FirstName == "")
            this.errors.push('First Name required.');
        if (this.LastName == "")
            this.errors.push('Last Name required.');
        if (this.HireDate == "")
            this.errors.push('Hire Date required.');

        return (this.errors.length == 0);
    },
    createClick(){
        if (!this.validSubmit())
            return false;

        axios.post(variables.API_URL + "employees", {
            FirstName:this.FirstName,
            LastName:this.LastName,
            HireDate:this.HireDate
        })
        .then((response)=>{
            this.refreshData();
            alert("Created");
        });
    },
    updateClick(){
        if (!this.validSubmit())
            return false;

        axios.put(variables.API_URL + "employees/" + this.EmployeeId, {
            EmployeeId:this.EmployeeId,
            FirstName:this.FirstName,
            LastName:this.LastName,
            HireDate:this.HireDate
        })
        .then((response)=>{
            this.refreshData();
           alert("Updated");
        });
    },
    deleteClick(id){
        if(!confirm("Are you sure?")){
            return;
        }
        axios.delete(variables.API_URL+"employees/"+id)
        .then((response)=>{
            this.refreshData();
            //alert(response.data);
        });

    },
    formatDate(data) {
        if (data != undefined)
            return new Date(data).toLocaleDateString();
        else
            return "N/A"
    }

},
mounted:function(){
    this.refreshData();
}

}