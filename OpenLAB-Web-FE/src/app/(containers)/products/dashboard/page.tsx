"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import moment from "moment";
import { ref, onValue, set, get } from "firebase/database";
import { LineChartComponent } from "~/components/dashboard/LineChart";
import { BarChartComponent } from "~/components/dashboard/BarChart";
import { database } from "~/configs/firebase.config";
import { nodeIdProps, useAuthStore } from "~/store/auth/AuthStore";
import { getAverage } from "~/utils/getAverage";

export default function DashboardParams() {
  const [temperatureHistory, setTemperatureHistory] = useState<string[]>([]);
  const [humidityHistory, setHumidityHistory] = useState<string[]>([]);
  const [lightHistory, setLightHistory] = useState<string[]>([]);
  const [highestTemperature, setHighestTemperature] = useState(0);
  const [highestHumidy, setHighestHumidy] = useState(0);
  const [highestLight, setHighestLight] = useState(0);
  const [timestampsTemperature, setTimestampsTemperature] = useState<string[]>(
    []
  );
  const [timestampsHumidity, setTimestampsHumidity] = useState<string[]>([]);
  const [timestampsLight, setTimestampsLight] = useState<string[]>([]);

  const _id = useAuthStore((state) => state.user._id);
  const email = useAuthStore((state) => state.user.email);
  const nodeId = useAuthStore((state) => state.user.nodeId);
  const [isNode, setNode] = useState(nodeId ? nodeId[0]?._id : "");
  const [timestampList, setTimestampList] = useState<Array<number>>([]);
  const [valueTemperatureOfWeek, setValueTemperatureOfDay] = useState<number[]>(
    []
  );
  const [valueHumidyOfWeek, setValueHumidyOfDay] = useState<number[]>([]);
  const [valueLightOfWeek, setValueLightOfDay] = useState<number[]>([]);
  useEffect(() => {
    if (!_id || !isNode) return;

    setTemperatureHistory([]);
    setLightHistory([]);
    setHumidityHistory([]);
    setTimestampsHumidity([]);
    setTimestampsTemperature([]);
    setTimestampsLight([]);
  }, [_id, isNode]);
  useEffect(() => {
    if (!_id || !isNode) return;
    const date = moment().startOf("day").valueOf() / 1000;

    const urlTemperature = `/${_id}/${isNode}/dailyTemperature/${date}/highestTemperature`;
    const dataRef = ref(database, urlTemperature);
    let maxTemperature = 0;
    console.log(date, urlTemperature);

    const urlMaxTemperature = `/${_id}/${isNode}/dailyTemperature/${date}/maxTemperature`;
    const dataRefMax = ref(database, urlMaxTemperature);
    const unsubscribe = onValue(dataRef, async (snapshot) => {
      if (!snapshot.exists()) return;
      const currentValue = snapshot.val();
      if (currentValue > maxTemperature) {
        maxTemperature = currentValue;
        set(dataRefMax, maxTemperature);
      }
      const now = new Date().toLocaleTimeString();
      setTimestampsTemperature((prev) => {
        const newTimestamps = [...prev, now];
        return newTimestamps.length >= 10
          ? newTimestamps.slice(1)
          : newTimestamps;
      });
      setTemperatureHistory((prev) => {
        const newHistory = [...prev, snapshot.val()];
        return newHistory.length >= 10 ? newHistory.slice(1) : newHistory;
      });
    });

    const unsubscribeMax = onValue(dataRefMax, (snapshot) => {
      if (snapshot.exists()) {
        setHighestTemperature(snapshot.val());
      }
    });
    return () => {
      unsubscribe();
      unsubscribeMax();
    };
  }, [_id, isNode]);

  useEffect(() => {
    let nameNode = 0;
    const sendNotification = async () => {
      const foundItem = nodeId?.find((item, index) => {
        nameNode = index + 1;
        return item._id === isNode;
      }) as nodeIdProps;
      if (!foundItem) return;
      const { temperature, humidy, light } = foundItem;
      if (temperatureHistory && temperatureHistory.length === 9) {
        const averageValue = getAverage(temperatureHistory);
        console.log("giá trị tb", averageValue);

        if (averageValue >= parseFloat(temperature)) {
          const data = await fetch(`/contact-mailer/notification`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              value: averageValue,
              nodeId: `Node ${nameNode}`,
              type: "Nhiệt độ",
            }),
          });
          console.log(data);
        }
      }

      if (humidityHistory && humidityHistory.length === 9) {
        const averageValue = getAverage(humidityHistory);
        if (averageValue >= parseFloat(humidy)) {
          await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/contact-mailer/notification`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              value: averageValue,
              nodeId: isNode,
              type: "Độ ẩm",
            }),
          });
        }
      }
      if (lightHistory && lightHistory.length === 9) {
        const averageValue = getAverage(lightHistory);
        if (averageValue >= parseFloat(light)) {
          await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/contact-mailer/notification`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              value: averageValue,
              nodeId: isNode,
              type: "Ánh sáng",
            }),
          });
        }
      }
    };
    sendNotification();
  }, [
    email,
    humidityHistory,
    isNode,
    lightHistory,
    nodeId,
    temperatureHistory,
  ]);

  useEffect(() => {
    if (!_id || !isNode) return;

    const date = moment().startOf("day").valueOf() / 1000;
    console.log(date);

    const urlHumidy = `/${_id}/${isNode}/dailyHumidy/${date}/highestHumidy`;
    const dataRef = ref(database, urlHumidy);
    let maxHumidy = 0;
    const urlMaxHumidy = `/${_id}/${isNode}/dailyHumidy/${date}/maxHumidy`;
    const dataRefMax = ref(database, urlMaxHumidy);
    const unsubscribe = onValue(dataRef, async (snapshot) => {
      if (!snapshot.exists()) return;
      const currentValue = snapshot.val();
      if (currentValue > maxHumidy) {
        maxHumidy = currentValue;
        set(dataRefMax, maxHumidy);
      }
      const now = new Date().toLocaleTimeString();
      setTimestampsHumidity((prev) => {
        const newTimestamps = [...prev, now];
        return newTimestamps.length >= 10
          ? newTimestamps.slice(1)
          : newTimestamps;
      });

      setHumidityHistory((prev) => {
        const newHistory = [...prev, snapshot.val()];
        return newHistory.length >= 10 ? newHistory.slice(1) : newHistory;
      });
    });
    const unsubscribeMax = onValue(dataRefMax, (snapshot) => {
      if (snapshot.exists()) {
        setHighestHumidy(snapshot.val());
      }
    });
    return () => {
      unsubscribe();
      unsubscribeMax();
    };
  }, [_id, isNode]);

  useEffect(() => {
    if (!_id || !isNode) return;

    const date = moment().startOf("day").valueOf() / 1000;

    const urlHumidy = `/${_id}/${isNode}/dailyLight/${date}/highestLight`;
    const dataRef = ref(database, urlHumidy);
    let maxLight = 0;
    const urlMaxLight = `/${_id}/${isNode}/dailyLight/${date}/maxLight`;
    const dataRefMaxLight = ref(database, urlMaxLight);
    const unsubscribe = onValue(dataRef, async (snapshot) => {
      if (!snapshot.exists()) return;
      const currentValue = snapshot.val();
      if (currentValue > maxLight) {
        maxLight = currentValue;
        set(dataRefMaxLight, maxLight);
      }
      const now = new Date().toLocaleTimeString();
      setTimestampsLight((prev) => {
        const newTimestamps = [...prev, now];
        return newTimestamps.length >= 10
          ? newTimestamps.slice(1)
          : newTimestamps;
      });

      setLightHistory((prev) => {
        const newHistory = [...prev, snapshot.val()];
        return newHistory.length >= 10 ? newHistory.slice(1) : newHistory;
      });
    });
    const unsubscribeMax = onValue(dataRefMaxLight, (snapshot) => {
      if (snapshot.exists()) {
        setHighestLight(snapshot.val());
      }
    });
    return () => {
      unsubscribe();
      unsubscribeMax();
    };
  }, [_id, isNode]);

  useEffect(() => {
    if (!_id || !isNode) return;
    const fetchData = async () => {
      const yesterday =
        moment().startOf("day").subtract(1, "day").valueOf() / 1000;
      const listTimestamp = Array.from(
        { length: 7 },
        (_, index) => yesterday - index * 86400
      );
      setTimestampList(listTimestamp);
      console.log(listTimestamp);
      const promisesTemperature = listTimestamp.map(async (item) => {
        const urlmaxTemperature = `/${_id}/${isNode}/dailyTemperature/${item}/maxTemperature`;
        const dataRef = ref(database, urlmaxTemperature);
        const snapshot = await get(dataRef);
        return snapshot.exists() ? snapshot.val() : null;
      });
      const promisesHumidy = listTimestamp.map(async (item) => {
        const urlmaxTemperature = `/${_id}/${isNode}/dailyHumidy/${item}/maxHumidy`;
        const dataRef = ref(database, urlmaxTemperature);
        const snapshot = await get(dataRef);
        console.log(snapshot.val());
        return snapshot.exists() ? snapshot.val() : null;
      });
      const promisesLight = listTimestamp.map(async (item) => {
        const urlmaxTemperature = `/${_id}/${isNode}/dailyLight/${item}/maxLight`;
        const dataRef = ref(database, urlmaxTemperature);
        const snapshot = await get(dataRef);
        console.log(snapshot.val());
        return snapshot.exists() ? snapshot.val() : null;
      });
      setValueTemperatureOfDay(await Promise.all(promisesTemperature));
      setValueHumidyOfDay(await Promise.all(promisesHumidy));
      setValueLightOfDay(await Promise.all(promisesLight));
    };
    // Gọi hàm fetchData
    fetchData().catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [_id, isNode]);

  return (
    <div className="w-full space-y-12 xs:space-y-6 flex flex-col justify-center items-center ">
      <div className="w-[80%] flex justify-end">
        <Select
          value={isNode}
          onValueChange={(value) => {
            setNode(value);
          }}
        >
          <SelectTrigger className="w-[180px] xs:w-[130px]">
            <SelectValue placeholder="Select a node" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {nodeId?.map((item, index) => (
                <SelectItem value={item._id} key={index}>
                  node {index + 1}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-[50%] xs:w-[95%] flex flex-col justify-center xs:space-y-6 items-center space-y-12">
        <div className=" w-full justify-center bg-red-100">
          <LineChartComponent
            highestValue={highestTemperature}
            title={"Nhiệt độ trung bình"}
            dataX={timestampsTemperature}
            dataY={temperatureHistory}
            unit="&deg;C"
          />
        </div>
        <div className="w-full justify-center">
          <LineChartComponent
            highestValue={highestHumidy}
            title={"Độ ẩm trung bình"}
            dataX={timestampsHumidity}
            dataY={humidityHistory}
            unit="&#37;"
          />
        </div>
        <div className="w-full justify-center">
          <LineChartComponent
            highestValue={highestLight}
            title={"Ánh sáng trung bình"}
            dataX={timestampsLight}
            dataY={lightHistory}
            unit="&#37;"
          />
        </div>
      </div>

      <div className="w-[50%] xs:w-[95%]">
        <BarChartComponent
          dataX={timestampList}
          dataHumidy={valueHumidyOfWeek}
          dataLight={valueLightOfWeek}
          dataTemperature={valueTemperatureOfWeek}
          title={"Biểu đồ dữ liệu các thông số trong 7 ngày"}
        />
      </div>
    </div>
  );
}
