import './App.css';
import {Component} from "react";
import TaskForm from "./component/TaskForm";
import Search_Sort from "./component/Search_Sort";
import TaskList from "./component/TaskList";
import demo from "./training/demo";

class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            tasks : [],
            isDisplayForm: false,
            taskEditing:null,
            filter:{
                name: '',
                status: -1
            },
            keyword:'',

            sortBy: 'name',
            sortValue: 1
        }
    }
    onGenerateData=()=>{
        let tasks =[
            {
                id: this.generateID(),
                name: 'Hoc lap trinh',
                status: true
            },
            {
                id:this.generateID() ,
                name: 'Hoc boi',
                status: false
            },
            {
                id:this.generateID(),
                name:'Di ngu',
                status: true
            }
        ]
        localStorage.setItem('tasks', JSON.stringify(tasks));// gán dữ liệu vào localStorage dưới dạng JSON
    }
    /*phuong thuc componentWillMount chi chay khi f5 trinh duyet lan dau tien va duy nhat,
    */
    componentWillMount() {//tiến hành lấy dữ liệu từ localStorage và setState=> dữ liệu sẽ không mất khi f5, vì funtion này được gọi lần đầu tiên và duy nhất
        if(localStorage && localStorage.getItem('tasks')){
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
            tasks: tasks
            })
        }
    }

    s4(){
        return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
    }
    generateID(){
        return this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+
            this.s4()+'-'+this.s4()+''+this.s4()+'-'+this.s4()+'-'+this.s4();
    }
    onToggleForm=()=>{
        if(this.state.isDisplayForm && this.state.taskEditing!==null){
            this.setState({
                isDisPlayForm: true,
                taskEditing: null
            })
        }else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEditing: null
            })
        }
    }
    onCloseForm=()=>{
        this.setState({
            isDisplayForm : false
        })
    }

    onShowForm=()=>{
        this.setState({
            isDisplayForm:true
        })
    }
    onSubmit=(data)=>{
        let {tasks}= this.state;
        if(data.id==='') {
            data.id = this.generateID();
            tasks.push(data);
        }
        else {
            let index = this.findIndex(data.id);
            if(index!==-1){
                tasks[index]=data;
            }
        }
        this.setState({
            tasks: tasks
        })
        localStorage.setItem('tasks',JSON.stringify(tasks));
        /*console.log(data);*/
    }

    onUpdateStatus=(id)=>{
        /*console.log(id);*/
        let {tasks}=this.state;
        let index = this.findIndex(id);
        if(index!==-1){
            tasks[index].status =!tasks[index].status;
            this.setState({
                tasks: tasks
            })
            localStorage.setItem('tasks',JSON.stringify(tasks))
        }
    }
    findIndex=(id)=>{
        let result = -1;
        let {tasks} = this.state;
            tasks.forEach((task, index)=>{
                if(task.id===id){
                    result = index;
                }
            })
            return result;
    }

    onEditItem=(id)=>{
        let{tasks} = this.state;
        let index= this.findIndex(id);
        if(index!==-1){
            let taskEditing=tasks[index];
            this.setState({
                taskEditing:taskEditing
            })
            this.onShowForm();
        }
        /*console.log(id);*/
    }

    onDeleteItem=(id)=>{
        console.log(id);
        let{tasks}=this.state;
        let index = this.findIndex(id);
        if(index!==-1){
            tasks.splice(index,1);
            this.setState({
                tasks:tasks
            })
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.onCloseForm();
    }

    onFilter=(filterName, filterStatus)=>{
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                name: filterName,
                status: filterStatus
            }
        })
    }

    onSearch=(keyword)=>{
        this.setState({
            keyword:keyword
        })
       /* console.log(keyword)*/
    }

    onSort=(sortBy, sortValue)=>{
        this.setState({
            sortBy: sortBy,
            sortValue:sortValue
        })
}

    render() {
        let {tasks, isDisplayForm, taskEditing, filter, keyword, sortBy, sortValue} = this.state; // đây là cú pháp CS6 tương đương với var tasks = this.state.tasks
        let elementTaskForm = isDisplayForm?<TaskForm
                                                onSubmit={this.onSubmit}
                                                onCloseForm = {this.onCloseForm}
                                                task={taskEditing}
        />:'';
        if(filter){
            if(filter.name){
                tasks = tasks.filter((task)=>{
                    return task.name.toLowerCase().indexOf(filter.name)!==-1;
                });
            }
            tasks = tasks.filter((task)=>{
                if(filter.status===-1){
                    return task;
                }else{
                    return task.status=== (filter.status === 1);
                }
            })
        }
        if(keyword){
            tasks = tasks.filter((task)=>{
                return task.name.toLowerCase().indexOf(keyword)!==-1;
            });
        }

        if(sortBy==='name'){
            tasks.sort((a,b)=>{
                if(a.name>b.name) return sortValue;
                else if(a.name<b.name) return sortValue;
                else return 0;
            })
        }else if(sortBy==='status'){
            tasks.sort((a,b)=>{
                if(a.status>b.status) return sortValue;
                else if(a.status<b.status) return sortValue;
                else return 0;
            })
        }
        return (
            <div className="container fa-border mt-50">
                <div className="text-center">
                    <h1 className="font-arial">Quản lý công việc</h1>
                </div>
                    <div className="row mt-50">
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                            {/*Form*/}
                           {/*<TaskForm/>*/}
                            {elementTaskForm}
                        </div>
                        <div className={isDisplayForm?"col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-xs-12 col-sm12 col-md-12 col-lg-12"}>
                            <button className="btn btn-primary mr-5"  onClick={this.onToggleForm} type="button"><span className="fa fa-plus mr-5"/>Thêm
                                công
                                việc
                            </button>
                            <button className="btn btn-primary" type="button" onClick={this.onGenerateData}>Generate Data
                            </button>

                            {/*Search-Sort*/}
                                <Search_Sort onSearch={this.onSearch} onSort={this.onSort} sortBy={sortBy} sortValue={sortValue}/>
                            <div className="row mt-20">
                                {/*TaskList*/}
                                <TaskList tasks = {tasks}
                                          onUpdateStatus={this.onUpdateStatus}
                                          onEditItem={this.onEditItem}
                                          onDeleteItem={this.onDeleteItem}
                                          onFilter={this.onFilter}
                                />
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}
                export default App;
