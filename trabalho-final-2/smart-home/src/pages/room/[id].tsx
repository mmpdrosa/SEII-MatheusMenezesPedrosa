import { getDatabase, onValue, ref, set } from 'firebase/database'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import { parseCookies } from 'nookies'
import { ArrowLeft, Lightbulb, Plugs } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../../contexts/AuthContext'
import {
  DevicesContainer,
  RoomContainer,
  SensorsContainer,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  SwitchContainer,
  SwitchRoot,
  SwitchThumb,
} from '../../styles/pages/room'

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

type DeviceType = {
  type?: 'light' | 'socket' | undefined
}

export default function RoomDashboard() {
  const [room, setRoom] = useState<Room | null>(null)

  const { user } = useContext(AuthContext)

  useEffect(() => {
    const { id: roomId } = Router.query

    const db = getDatabase()
    const roomRef = ref(db, `users/${user?.uid}/rooms/${roomId}`)
    onValue(roomRef, (snapshot) => {
      setRoom(snapshot.val())
    })
  }, [user])

  async function handleDevice(index: number, device: Device) {
    const { id: roomId } = Router.query
    const db = getDatabase()

    await set(ref(db, `users/${user?.uid}/rooms/${roomId}/devices/${index}`), {
      ...device,
    })
  }

  return (
    <>
      <Head>
        <title>{room?.name}</title>
      </Head>

      <RoomContainer>
        <header>
          <Link href={'/'} prefetch={false}>
            <ArrowLeft size={24} />
          </Link>

          <h1>{room?.name}</h1>
        </header>
        <SensorsContainer>
          {room?.sensors &&
            room.sensors.map((sensor) => {
              return (
                <div key={sensor.name}>
                  <h2>{sensor.name === 'temperature' && 'Temperatura'}</h2>
                  <strong>{sensor.value.toLocaleString('pt-br')} ℃</strong>
                </div>
              )
            })}
        </SensorsContainer>

        <DevicesContainer>
          {room?.devices &&
            room.devices.map((device, index) => {
              const deviceType = device.id.split('-')[0] as DeviceType

              return (
                <div key={device.id}>
                  {deviceType === String('light') && (
                    <Lightbulb size={32} weight="thin" />
                  )}
                  {deviceType === String('socket') && (
                    <Plugs size={32} weight="thin" />
                  )}

                  <strong>{device.name}</strong>

                  {device.type === 'digital' ? (
                    <SwitchContainer>
                      <label htmlFor="switch">
                        {room.devices[index].value ? 'ON' : 'OFF'}
                      </label>
                      <SwitchRoot
                        id="switch"
                        onCheckedChange={(checked) =>
                          handleDevice(index, {
                            ...room.devices[index],
                            value: checked,
                          })
                        }
                        checked={room.devices[index].value as boolean}
                      >
                        <SwitchThumb />
                      </SwitchRoot>
                    </SwitchContainer>
                  ) : (
                    <SliderRoot
                      value={[room.devices[index].value as number]}
                      max={100}
                      step={1}
                      aria-label="Intensity"
                      onValueChange={(value) =>
                        handleDevice(index, {
                          ...room.devices[index],
                          value: value[0],
                        })
                      }
                    >
                      <SliderTrack>
                        <SliderRange />
                      </SliderTrack>
                      <SliderThumb />
                    </SliderRoot>
                  )}
                </div>
              )
            })}
        </DevicesContainer>
      </RoomContainer>
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
