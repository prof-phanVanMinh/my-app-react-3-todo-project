
import {Component} from "react";
import TaskItem from "./TaskItem";

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state={
            filterName:'',
            filterStatus: -1
        }
    }

    onChangeFilter=(event)=>{
        let target= event.target;
        let name = target.name;
        let value = target.value;
        this.props.onFilter(
            name==='filterName'?value:this.state.filterName,
            name==='filterStatus'?value:this.state.filterStatus
        )
        this.setState({
            [name]:value
        })

    }

    render() {
        let{filterName, filterStatus}=this.state
        let {tasks}=this.props
        let element = tasks.map((task, index)=>{
            return (<TaskItem key={task.id} index={index} task={task}
                              onUpdateStatus={this.props.onUpdateStatus}
                              onEditItem={this.props.onEditItem}
                              onDeleteItem={this.props.onDeleteItem}
                />
            )
        })
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng thái</th>
                        <th className="text-center">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td/>
                        <td><input className="form-control" name="filterName" value={filterName} onChange={this.onChangeFilter}/></td>
                        <td>
                            <select name="filterStatus" className="form-control" value={filterStatus} onChange={this.onChangeFilter}>
                                <option value={-1}>Tất cả</option>
                                <option value={0}>Ẩn</option>
                                <option value={1}>Kích hoạt</option>
                            </select>
                        </td>
                        <td/>
                    </tr>

                    {/*TaskItem*/}
                    {element}

                    </tbody>
                </table>
            </div>
        )
    }
}

export default TaskList;
