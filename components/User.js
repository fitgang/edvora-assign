import Image from 'next/image'

export default function User(props) {

  return (

    <div className="user">
      <span className="username">
        {props.user.name}
      </span>
      <Image src={props.user.url} alt={props.user.name} width="50px" height="50px" className="userImage" />
      <style jsx>{
      `
        .username {
        }
        .userImage{

        }
      `
      }</style>
    </div>
  )
}