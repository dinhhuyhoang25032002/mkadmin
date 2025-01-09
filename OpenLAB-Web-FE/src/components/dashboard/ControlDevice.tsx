"use client";
import { useEffect, useState } from "react";
import Light from "~/components/devices/Light";
import SwitchCustom from "~/components/devices/SwitchCustom";
import { PiFanDuotone } from "react-icons/pi";
import { database } from "~/configs/firebase.config";
import { useAuthStore } from "~/store/auth/AuthStore";
import { onValue, ref, set } from "firebase/database";
import moment from "moment";
import { BsFan } from "react-icons/bs";

type ControlDeviceProps = {
  nodeId: string;
  isMode: string;
  title: string;
  temperature: string;
  humidy: string;
  light: string;
};
export default function ControlDevice({
  nodeId,
  humidy,
  isMode,
  temperature,
  title,
  light,
}: ControlDeviceProps) {
  const { user } = useAuthStore();
  const [isOpenLight, setOpenLight] = useState(false);
  const [isOpenFan, setOpenFan] = useState(false);
  const [isOpenPump, setOpenPump] = useState(false);
  const { _id } = user;
  const [isLight, setLight] = useState();
  const [fan, setFan] = useState();
  const [pump, setPump] = useState();
  useEffect(() => {
    const refLight = `/${_id}/${nodeId}/light`;
    const dataRef = ref(database, refLight);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const value = snapshot.val();
      setOpenLight(value === 1);
      setLight(value);
    });

    return () => unsubscribe();
  }, [_id, nodeId, isMode]);

  useEffect(() => {
    const refFan = `/${_id}/${nodeId}/fan`;
    const dataRef = ref(database, refFan);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const value = snapshot.val();
      setOpenFan(value === 1);
      setFan(value);
    });

    return () => unsubscribe();
  }, [_id, nodeId, isMode]);

  useEffect(() => {
    const refPump = `/${_id}/${nodeId}/pump`;
    const dataRef = ref(database, refPump);
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const value = snapshot.val();
      setOpenPump(value === 1);
      setPump(value);
    });

    return () => unsubscribe();
  }, [_id, nodeId, isMode]);

  useEffect(() => {
    const date = moment().startOf("day").valueOf() / 1000;
    const urlTemperature = `/${_id}/${nodeId}/dailyTemperature/${date}/highestTemperature`;
    const dataRef = ref(database, urlTemperature);
    console.log(isMode);

    if (isMode === "handler") {
      return;
    }
    const autoHandle = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const refFan = `/${_id}/${nodeId}/fan`;
        const dataRef = ref(database, refFan);
        if (snapshot.val() >= parseFloat(temperature)) {
          set(dataRef, 1);
          setOpenFan(true);
        } else {
          set(dataRef, 0);
          setOpenFan(false);
        }
      }
    });
    return () => autoHandle();
  }, [nodeId, isMode, _id, temperature]);

  useEffect(() => {
    const date = moment().startOf("day").valueOf() / 1000;
    const urlTemperature = `/${_id}/${nodeId}/dailyLight/${date}/highestLight`;
    const dataRef = ref(database, urlTemperature);
    console.log(isMode);

    if (isMode === "handler") {
      return;
    }
    const autoHandle = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const refLight = `/${_id}/${nodeId}/light`;
        const dataRef = ref(database, refLight);
        if (snapshot.val() >= parseFloat(light)) {
          set(dataRef, 0);
          setOpenLight(false);
        } else {
          set(dataRef, 1);
          setOpenLight(true);
        }
      }
    });
    return () => autoHandle();
  }, [nodeId, isMode, _id, light]);

  useEffect(() => {
    const date = moment().startOf("day").valueOf() / 1000;
    const urlHumidy = `/${_id}/${nodeId}/dailyHumidy/${date}/highestHumidy`;
    const dataRef = ref(database, urlHumidy);
    console.log(isMode);

    if (isMode === "handler") {
      return;
    }
    const autoHandle = onValue(dataRef, (snapshot) => {
      if (snapshot.exists()) {
        const refPump = `/${_id}/${nodeId}/pump`;
        const dataRef = ref(database, refPump);
        if (snapshot.val() >= parseFloat(humidy)) {
          set(dataRef, 1);
          setOpenPump(true);
        } else {
          set(dataRef, 0);
          setOpenPump(false);
        }
      }
    });
    return () => autoHandle();
  }, [nodeId, isMode, _id, humidy]);

  const handleLightSwitch = async (value: boolean) => {
    const refLight = `/${_id}/${nodeId}/light`;
    const dataRef = ref(database, refLight);
    const firebaseValue = value ? 1 : 0;
    await set(dataRef, firebaseValue); // Update in Firebase
  };

  const handlePumpSwitch = async (value: boolean) => {
    const refPump = `/${_id}/${nodeId}/pump`;
    const dataRef = ref(database, refPump);
    const firebaseValue = value ? 1 : 0;
    await set(dataRef, firebaseValue); // Update in Firebase
  };

  // Handle switching Fan
  const handleFanSwitch = async (value: boolean) => {
    const refFan = `/${_id}/${nodeId}/fan`;
    const dataRef = ref(database, refFan);
    const firebaseValue = value ? 1 : 0;
    await set(dataRef, firebaseValue); // Update in Firebase
  };

  return (
    <div className="flex flex-col items-center justify-center text-center rounded space-y-5 xs:p-2 p-4 border-2 border-gray-700">
      <span className="text-xl font-semibold uppercase">{title}</span>
      <div className="flex gap-5 xs:gap-2">
        <div className="border-2 border-gray-700 space-y-4 h-fit xs:p-2 p-4 rounded">
          <Light led={isLight} />
          <SwitchCustom
            value={isOpenLight}
            onSwitchChange={handleLightSwitch}
            id={`${nodeId}light`}
          />
        </div>
        <div className="border-2 border-gray-700 space-y-4 h-fit xs:p-2 p-4 rounded">
          <div>
            <PiFanDuotone
              className={fan === 1 ? `animate-spin text-7xl ` : `text-7xl`}
            />
          </div>
          <SwitchCustom
            id={`${nodeId}fan`}
            onSwitchChange={handleFanSwitch}
            value={isOpenFan}
          />
        </div>
        <div className="border-2 border-gray-700 space-y-4 h-fit xs:p-2 p-4 rounded">
          <div className="border-[3px] border-black flex justify-center items-center h-[73px] rounded">
            <BsFan
              className={pump === 1 ? `animate-spin  text-5xl ` : `text-5xl`}
            />
          </div>
          <SwitchCustom
            id={`${nodeId}pump`}
            onSwitchChange={handlePumpSwitch}
            value={isOpenPump}
          />
        </div>
      </div>
    </div>
  );
}
