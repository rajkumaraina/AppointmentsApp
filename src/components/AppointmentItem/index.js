import './index.css'

const EachItem = props => {
  const {item, changeFavoriteImage} = props
  const {id, title, date, favorite} = item
  const favoriteImage = favorite ? (
    <img
      src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
      alt="star"
      className="startImg"
    />
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
      alt="star"
      className="startImg"
    />
  )

  const favoriteChange = () => {
    changeFavoriteImage(id)
  }
  return (
    <li className="appointmentItem">
      <div className="insideContent1">
        <p className="titleHeading">{title}</p>
        <button
          className="insideButton"
          onClick={favoriteChange}
          type="button"
          data-testid="star"
        >
          {favoriteImage}
        </button>
      </div>
      <p className="datePara">Date: {date}</p>
    </li>
  )
}
export default EachItem
