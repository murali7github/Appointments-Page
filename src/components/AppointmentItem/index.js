// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, onChangeStarSymble} = props
  const {id, title, date, isStarActive} = eachAppointment

  const onChangeStar = () => {
    onChangeStarSymble(id)
  }
  return (
    <li>
      <div className="list-item">
        <div className="title-image-container">
          <p className="title-heading">{title}</p>
          <button type="button" className="star-button" onClick={onChangeStar}>
            {isStarActive ? (
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
                className="image-icon"
                alt="star"
                testid="star"
              />
            ) : (
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
                className="image-icon"
                alt="star"
                testid="star"
              />
            )}
          </button>
        </div>
        <p className="date-para">Date:{date}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
