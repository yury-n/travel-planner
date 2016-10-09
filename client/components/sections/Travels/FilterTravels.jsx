import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTravels } from '../../../actions';

class FilterTravels extends Component {

  handleSubmit(e) {
    e.preventDefault();

    const { forAuthUser } = this.props;

    this.props.fetchTravels(forAuthUser, this.refs.inputFromDate.value, this.refs.inputTillDate.value);
  }

  setFilterToNextMonth() {
    function firstDayOfMonth(year, month) {
        return (new Date(year + '-' + month + '-01')).toISOString().substring(0, 10);
    }
    function lastDayOfMonth(year, month) {
        return (new Date( (new Date(year + '-' + (month+1) + '-01')) - 1 )).toISOString().substring(0, 10);
    }
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // to 1-based
    const currentYear = today.getFullYear();
    const nextMonth = currentMonth == 12 ? 1 : currentMonth + 1;
    const nextMonthYear = currentMonth == 12 ? currentYear + 1 : currentYear;

    this.refs.inputFromDate.value = firstDayOfMonth(nextMonthYear, nextMonth);
    this.refs.inputTillDate.value = lastDayOfMonth(nextMonthYear, nextMonth);
  }

  render() {
    return (
      <div className="well clearfix hidden-print" style={{width: "412px", margin: "auto"}}>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <button type="button"
                  onClick={this.setFilterToNextMonth.bind(this)}
                  className="btn btn-default pull-left"
                  style={{marginRight: "5px"}}>
                  Next month
          </button>
          <div className="form-group pull-left" style={{width: "100px"}}>
            <input type="text" ref="inputFromDate" className="form-control" placeholder="from date" />
          </div>
          <div className="form-group pull-left" style={{width: "100px"}}>
            <input type="text" ref="inputTillDate" className="form-control" placeholder="till date" />
          </div>
          <button type="submit" className="btn btn-info pull-right">Filter</button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  {fetchTravels}
)(FilterTravels);
