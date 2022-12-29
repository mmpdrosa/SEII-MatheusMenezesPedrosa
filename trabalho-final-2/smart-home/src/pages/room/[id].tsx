import { getDatabase, onValue, ref, set, update } from "firebase/database";
import { GetServerSideProps } from "next"
import Link from "next/link";
import Router from "next/router";
import { parseCookies } from "nookies"
import { ArrowLeft, Lightbulb } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { 
  RoomContainer, 
  DevicesContainer, 
  SensorsContainer,
  SwitchContainer, 
  SwitchRoot,
  SwitchThumb,
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb
} from "../../styles/pages/room";

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

export default function Room() {
  const [room, setRoom] = useState<Room | null>(null)

  const { user } = useContext(AuthContext)
  
  useEffect(() => {
    const { 'id': roomId } = Router.query

    const db = getDatabase();
    const roomRef = ref(db, `users/${user?.uid}/rooms/${roomId}`);
    onValue(roomRef, (snapshot) => {
      setRoom(snapshot.val())
    });
  }, [user])

  async function handleDevice(index: number, device: Device) {
    const { 'id': roomId } = Router.query
    const db = getDatabase();    

    await set(ref(db, `users/${user?.uid}/rooms/${roomId}/devices/${index}`), {
      ...device
    })
  }

  return (
    <RoomContainer>
      <header>
        <Link href={'/'} prefetch={false}>
          <ArrowLeft size={24} />
        </Link>

        <h1>{room?.name}</h1>
      </header>
      <SensorsContainer>
        {room?.sensors && room.sensors.map((sensor) => {
          return (
            <div key={sensor.name}>
              <h2>{sensor.name}</h2>
              <strong>{sensor.value}</strong>
            </div>
          )
        })}
      </SensorsContainer>

      <DevicesContainer>
        {room?.devices && room.devices.map((device, index) => {
          return (
            <div key={device.id}>
              <Lightbulb size={32} />

              <strong>{device.name}</strong>

              {device.type === 'digital' ? (
                <SwitchContainer>
                  <label htmlFor="switch">
                    {room.devices[index].value ? 'ON' : 'OFF'}
                  </label>
                  <SwitchRoot 
                    id="switch" 
                    onCheckedChange={(checked) => handleDevice(index, { ...room.devices[index], value: checked })}
                    checked={room.devices[index].value as boolean}
                  >
                    <SwitchThumb />
                  </SwitchRoot>
                </SwitchContainer>
              ) : (
                <SliderRoot 
                  value={[room.devices[index].value as number]}
                  max={100} step={1} 
                  aria-label="Intensity"
                  onValueChange={(value) => handleDevice(index, { ...room.devices[index], value: value[0] })}
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