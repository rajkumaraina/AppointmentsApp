import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import './index.css'

import EachItem from '../AppointmentItem'

const initialAppointments = []

class Appointments extends Component {
  state = {
    appointmentsList: initialAppointments,
    title: '',
    date: '',
    isStar: true,
    dateValue: '',
    secondList: [],
  }

  changeFavoriteImage = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, favorite: !each.favorite}
        }
        return each
      }),
    }))
  }

  FormSubmit = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      favorite: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      dateValue: '',
      date: '',
      favorite: false,
    }))
  }

  titleChange = event => {
    this.setState({title: event.target.value})
  }

  dateChange = event => {
    const newDate = format(new Date(event.target.value), 'dd MMMM yyyy, EEEE')
    this.setState({
      date: newDate,
      dateValue: event.target.value,
    })
  }

  starChange = () => {
    const {appointmentsList, title, isStar, dateValue, secondList} = this.state
    this.setState({secondList: appointmentsList, isStar: !isStar})
    if (isStar === true) {
      this.setState({
        appointmentsList: appointmentsList.filter(
          each => each.favorite === true,
        ),
      })
    } else {
      this.setState({appointmentsList: secondList})
    }
  }

  render() {
    const {appointmentsList, title, isStar, dateValue} = this.state
    let buttonBackgroundClassName
    if (isStar === true) {
      buttonBackgroundClassName = 'startButton '
    } else {
      buttonBackgroundClassName = 'startButton secondStarButton'
    }

    return (
      <div className="mainContainer">
        <div className="insideContainer">
          <div className="topContainer">
            <div className="inputContainer">
              <h1 className="mainHeading">Add Appointment</h1>
              <form className="formElement" onSubmit={this.FormSubmit}>
                <label htmlFor="titleElement" className="title">
                  TITLE
                </label>
                <br />
                <input
                  id="titleElement"
                  className="inputTitle"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={this.titleChange}
                />
                <br />
                <label htmlFor="dateElement" className="title">
                  DATE
                </label>
                <br />
                <input
                  id="dateElement"
                  className="inputDate"
                  type="date"
                  placeholder="dd/mm/yyyy"
                  value={dateValue}
                  onChange={this.dateChange}
                />
                <button className="addButton" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="appointmentsImg"
              alt="appointments"
            />
          </div>
          <hr className="separator" />
          <div className="bottomContainer">
            <div className="starContainer">
              <h1 className="bottomHeading">Appointments</h1>
              <button
                className={buttonBackgroundClassName}
                type="button"
                onClick={this.starChange}
              >
                Starred
              </button>
            </div>
            <ul className="unordered">
              {appointmentsList.map(each => (
                <EachItem
                  item={each}
                  key={each.id}
                  changeFavoriteImage={this.changeFavoriteImage}
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
