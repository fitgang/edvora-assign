import Image from 'next/image'

export default function User(props) {
  return (
    <div className="user">
      <span className="username">
        {props.user.name}
      </span>
      <Image src={props.user.url} alt={props.user.name} width="75px" height="75px" className="userImage" />
    </div>
  )
}