import {Component} from "react";

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id:'',
            name: '',
            status: false
        }
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }
    onChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        if(name==='status'){
            value = event.target.value === 'true';
        }
        this.setState({
            [name]: value
        })
    }
    onSubmit=(event)=>{
        event.preventDefault();//để loại bỏ event submit mặc định của button 'lưu lại'
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
    }

    onClear=()=>{
        this.setState({
            name:'',
            status:false
        })
    }
    componentWillMount() {
        if(this.props.task){
            this.setState({
                id:this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            })
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps && nextProps.task){
            this.setState({
                id:nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            })
        }else if(!nextProps.task){
            this.setState({
                id:'',
                name:'',
                status: false
            })
        }
    }

    render() {
        let {id} = this.state;
        return (
            <div className="panel panel-success">
                <div className="panel-heading">
                    <h3 className="panel-title">{id!=='' ?  'Sửa công việc':'Thêm công việc'}
                        <span className="fa fa-times-circle right cursor" onClick={this.onCloseForm}/>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <lable>Name:</lable>
                            <input className="form-control"
                                   name="name"
                                   type="text"
                                   value={this.state.name}
                                   onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <lable>Status:</lable>
                            <select name="status"
                                    className="form-control"
                                    value={this.state.status}
                                    onChange={this.onChange}
                            >
                                <option value={true}>Kích hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-success mr-5"><span
                                className="fa fa-save mr-5"/>Lưu lại
                            </button>
                            <button type="button" className="btn btn-danger" onClick={this.onClear}><span
                                className="fa fa-close mr-5"/>Hủy
                                bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    )
    }
    }

    export default TaskForm;
