// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem/index'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: null,
    isStarred: false,
    starredList: [],
  }

  onClickAddButton = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarActive: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onClickUnstarredButton = () => {
    this.setState(prevState => ({
      starredList: prevState.appointmentsList.filter(eachOne => {
        if (eachOne.isStarActive === true) {
          return eachOne
        }
        return null
      }),
      isStarred: true,
    }))
  }

  onClickStarredButton = () => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList,
      isStarred: false,
    }))
  }

  onChangeStarSymble = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachOne => {
        if (id === eachOne.id) {
          return {...eachOne, isStarActive: !eachOne.isStarActive}
        }
        return eachOne
      }),
      starredList: prevState.appointmentsList.filter(eachOne => {
        if (eachOne.isStarActive === true) {
          return eachOne
        }
        return null
      }),
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    const dateFormat = format(
      new Date(event.target.value),
      'dd MMMM yyyy, EEEE',
    )
    this.setState({date: dateFormat})
  }

  render() {
    const {appointmentsList, title, date, isStarred, starredList} = this.state
    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="heading">Add Appointment</h1>
          <div className="image-form-container">
            <form onSubmit={this.onClickAddButton}>
              <div className="input-container">
                <label htmlFor="Title" className="label-element">
                  TITLE
                </label>
                <input
                  type="search"
                  id="Title"
                  placeholder="Title"
                  className="input-element"
                  value={title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="input-container">
                <label htmlFor="Date" className="label-element">
                  DATE
                </label>
                <input
                  type="date"
                  id="Date"
                  placeholder="dd/mm/yyy"
                  className="input-element"
                  value={date}
                  onChange={this.onChangeDate}
                />
              </div>
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image-element"
            />
          </div>
          <hr className="line-separator" />
          <div className="appointments-container">
            <div className="appointments-heading-container">
              <h1 className="appointments-heading">Appointments</h1>
              {isStarred ? (
                <button
                  type="button"
                  className="starred-button"
                  onClick={this.onClickStarredButton}
                >
                  Starred
                </button>
              ) : (
                <button
                  type="button"
                  className="un-starred-button"
                  onClick={this.onClickUnstarredButton}
                >
                  Starred
                </button>
              )}
            </div>
            <ul className="list-container">
              {isStarred
                ? starredList.map(eachAppointment => (
                    <AppointmentItem
                      eachAppointment={eachAppointment}
                      onChangeStarSymble={this.onChangeStarSymble}
                      key={eachAppointment.id}
                    />
                  ))
                : appointmentsList.map(eachAppointment => (
                    <AppointmentItem
                      eachAppointment={eachAppointment}
                      onChangeStarSymble={this.onChangeStarSymble}
                      key={eachAppointment.id}
                    />
                  ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
