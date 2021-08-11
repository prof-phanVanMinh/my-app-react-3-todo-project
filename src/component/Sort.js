
import {Component} from "react";

class Sort extends Component {

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps)
    }

    onClick=(sortBy, sortValue)=>{
        this.props.onSort(sortBy, sortValue)
    }

    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenu1"
                            aria-haspopup="true"
                            aria-expanded="true"
                            data-toggle="dropdown">Sắp xếp
                        <span className="caret"/>

                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={()=>this.onClick('name', 1)}>
                            <a role="button" className={this.props.sortBy==='name'&&this.props.sortValue===1?'sort-selected':''}>
                                <span className='fa fa-sort-alpha-asc pr-5'> Tên A-Z</span>
                            </a>
                        </li>
                        <li onClick={()=>this.onClick('name', -1)}>
                            <a role="button" className={this.props.sortBy==='name'&&this.props.sortValue===-1?'sort-selected':''}>
                                <span className='fa fa-sort-alpha-desc pr-5'> Tên Z-A</span>
                            </a>
                        </li>
                        <li className="divider"/>
                        <li onClick={()=>this.onClick('status', 1)}><a role="button" className={this.props.sortBy==='status'&& this.props.sortValue===1?'sort-selected':''}>Trạng thái kích hoạt</a></li>
                        <li onClick={()=> this.onClick('status', -1)}><a role="button" className={this.props.sortBy==='status'&&this.props.sortValue===-1?'sort-selected':''}>Trạng thái ẩn</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Sort;
