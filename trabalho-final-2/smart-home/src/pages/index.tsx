import { GetServerSideProps } from "next"
import Head from "next/head"
import Router from "next/router"
import { parseCookies } from "nookies"
import { Monitor, Plus, SignOut } from "phosphor-react"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { child, get, getDatabase, ref } from 'firebase/database'

import { HomeContainer, HomeNav, Room, RoomsContainer } from "../styles/pages/home"

type Device = {
  id: string
  name: string
  type: 'analog' | 'digital'
  value: boolean | number
}

type Sensor = {
  name: string,
  value: number
}

type Room = {
  id: string
  name: string
  devices: Array<Device>
  sensors: Array<Sensor>
}

interface HomeInfo {
  homeName: string
  rooms: Array<Room>
}

type RoomType = {
  type?: "bedroom" | "kitchen" | "office" | "livingRoom" | undefined
}

export default function Home() {
  const { logOut, user } = useContext(AuthContext)

  const [homeInfo, setHomeInfo] = useState<HomeInfo | null>(null)

  useEffect(() => {
    if (!user) return

    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${user?.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setHomeInfo(snapshot.val())
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [user])

  function handleCreateRoom() {}

  function handleSignOut() {
    logOut()
    Router.push('/login')
  }

  return (
    <>
      <Head>
        <title>{user?.email}</title>
      </Head>

      <HomeContainer>
        <header>
          <h1>{homeInfo?.homeName}</h1>

          <HomeNav>
            <button>
              <Plus size={24} weight="bold" />
            </button>
            <button onClick={handleSignOut}>
              <SignOut size={24} weight="fill" />
            </button>
          </HomeNav>
        </header>

        <RoomsContainer>
          {homeInfo && homeInfo.rooms.map((room, index) => {
            const roomType = room.id.split('-')[0] as RoomType
            return (
              <Room 
                key={room.id} 
                href={`/room/${index}`} 
                type={roomType} 
                prefetch={false}
              >
                <Monitor size={24} weight="thin" />

                <span>{room.name}</span>
              </Room>
            )
          })}
        </RoomsContainer>
      </HomeContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['smart-home.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
