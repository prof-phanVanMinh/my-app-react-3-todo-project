
import {Component} from "react";

class TaskItem extends Component {

    onUpdateStatus=()=>{
        this.props.onUpdateStatus(this.props.task.id)
       /* console.log(this.props.task.id)*/
    }
    onEditItem=()=>{
        this.props.onEditItem(this.props.task.id);
        /*console.log(this.props.task.id);*/
    }
    onDeleteItem=()=>{
        this.props.onDeleteItem(this.props.task.id)
        /*console.log(this.props.task.id);*/
    }
    render() {
        let {task, index}=this.props
        return (
            <tr>
                <td>{index+1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span onClick={this.onUpdateStatus} className={task.status?'label label-danger':"label label-success"}>{task.status?'Kích hoạch':'Ẩn'}</span>
                </td>
                <td className="text-center">
                    <button onClick={this.onEditItem} type="button" className="btn btn-primary mr-5"><span
                        className="fa fa-pencil mr-5"/>Sửa
                    </button>
                    <button onClick={this.onDeleteItem} type="button" className="btn btn-danger"><span
                        className="fa fa-eraser mr-5"/>Xóa
                    </button>
                </td>
            </tr>
        )
    }
}

export default TaskItem;
