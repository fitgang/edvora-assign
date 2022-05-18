import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import User from '../components/User'
import Main from "../components/Main"

export async function getStaticProps(context) {

  // Get user from an external api
  const userObj = await fetch("https://assessment.api.vweb.app/user")
    .then(res => res.json())
    .catch(err => console.error(err));

  // Get rides for the user
  const ridesArr = await fetch("https://assessment.api.vweb.app/rides")
    .then(res => res.json())
    .catch(err => console.error(err));

  return {
    props: {
      user: userObj,
      rides: ridesArr
    }
  }
}

export default function Home(props) {

  const [user, setUser] = useState(props.user),
    [rides, setRides] = useState(props.rides);

  return (
    <>
      <Head>
        <title>Find Your Ride</title>
      </Head>

      <header className={styles.header}>
        <h1>edvora</h1>
        <User user={user} />
      </header>

      <Main user={user} rides={rides}/>
    </>
  )
}
