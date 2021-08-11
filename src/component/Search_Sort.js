
import {Component} from "react";
import Search from "./Search";
import Sort from "./Sort";

class Search_Sort extends Component {
    render() {
        return (
            <div className="row mt-20">

                {/*Search*/}
                <Search onSearch={this.props.onSearch}/>

                {/*Sort*/}
                <Sort onSort={this.props.onSort} sortBy={this.props.sortBy} sortValue={this.props.sortValue}/>
                
            </div>
        )
    }
}

export default Search_Sort;
