import { child, get, getDatabase, ref } from 'firebase/database'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import { parseCookies } from 'nookies'
import {
  CookingPot,
  Laptop,
  Monitor,
  Moon,
  Plus,
  SignOut,
} from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../contexts/AuthContext'
import {
  HomeContainer,
  HomeNav,
  RoomCard,
  RoomsContainer,
} from '../styles/pages/home'

type Device = {
  id: string
  name: string
  type: 'analog' | 'digital'
  value: boolean | number
}

type Sensor = {
  name: string
  value: number
}

type Room = {
  id: string
  name: string
  devices: Array<Device>
  sensors: Array<Sensor>
}

interface HomeData {
  homeName: string
  rooms: Array<Room>
}

type RoomType = {
  type?: 'bedroom' | 'kitchen' | 'livingRoom' | 'office' | undefined
}

export default function Home() {
  const { logOut, user } = useContext(AuthContext)

  const [homeInfo, setHomeInfo] = useState<HomeData | null>(null)

  useEffect(() => {
    if (!user) return

    const dbRef = ref(getDatabase())
    get(child(dbRef, `users/${user?.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setHomeInfo(snapshot.val())
        } else {
          setHomeInfo(null)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [user])

  function handleSignOut() {
    logOut()
    Router.push('/login')
  }

  return (
    <>
      <Head>
        <title>{homeInfo?.homeName}</title>
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
          {homeInfo &&
            homeInfo.rooms.map((room, index) => {
              const roomType = room.id.split('-')[0] as RoomType
              return (
                <RoomCard
                  key={room.id}
                  href={`/room/${index}`}
                  type={roomType}
                  prefetch={false}
                >
                  {roomType === String('bedroom') && (
                    <Moon size={24} weight="thin" />
                  )}
                  {roomType === String('kitchen') && (
                    <CookingPot size={24} weight="thin" />
                  )}
                  {roomType === String('livingRoom') && (
                    <Monitor size={24} weight="thin" />
                  )}
                  {roomType === String('office') && (
                    <Laptop size={24} weight="thin" />
                  )}

                  <span>{room.name}</span>
                </RoomCard>
              )
            })}
        </RoomsContainer>
      </HomeContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'smart-home.token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
