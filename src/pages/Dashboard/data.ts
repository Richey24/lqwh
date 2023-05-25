import { TankProps } from "./types";
import { faker } from '@faker-js/faker';
 
interface Tank {
    tankValue: any
}


function createRandomTankValue(): Tank {
     return {
       tankValue: faker.number.int({ min: 1, max: 100 }),
     };
}
   
const Tank = createRandomTankValue();

console.log( faker.number.int({ min: 1, max: 100 }))

export const tanks: TankProps[] = [
     {
          color: "#038aff",
          fillMaxValue: 20000,
          threshold: 2000,
          clName: "tank1",
          title: "Line 1",
          threshold: 2000,
          backFontColor: "#fe7968",
          fillValue: faker.number.int({ min: 1, max: 20000 }),
          type: "normal",
     },
     {
          color: "#038aff",
          fillMaxValue: 6000,
          threshold: 600,
          clName: "tank2",
          title: "Line 2",
          backFontColor: "#fe7968",
          fillValue: faker.number.int({ min: 1, max: 6000 }),
          type: "normal",
     },
     {
          color: "#038aff",
          fillMaxValue: 6000,
          threshold: 6000,
          clName: "tank3",
          title: "Line 3",
          backFontColor: "#fe7968",
          fillValue: faker.number.int({ min: 1, max:  6000}),
          type: "normal",
     },
     {
          color: "#038aff",
          fillMaxValue: 10000,
          threshold: 1000,
          clName: "tank4",
          title: "Line 4",
          backFontColor: "#fe7968",
          fillValue:  faker.number.int({ min: 1, max: 10000 }),
          type: "normal",
     },
     {
          color: "#038aff",
          fillMaxValue: 20000,
          threshold: 2000,
          clName: "tank5",
          title: "Line 5",
          backFontColor: "#fe7968",
          fillValue:  faker.number.int({ min: 1, max: 20000 }),
          type: "normal",
     },
     {
          color: "#038aff",
          fillMaxValue: 10000,
          threshold: 1000,
          clName: "tank6",
          title: "Line 6",
          backFontColor: "#fe7968",
          fillValue:  faker.number.int({ min: 1, max: 10000 }),
          type: "normal",
     },
     {
          color: "#038aff",
          fillMaxValue: 6000,
          threshold: 6000,
          clName: "tank7",
          title: "Line 7",
          backFontColor: "#fe7968",
          fillValue:  faker.number.int({ min: 1, max: 6000 }),
          type: "normal",
     },
     {
          color: "#038aff",
          fillMaxValue: 6000,
          threshold: 6000,
          clName: "tank8",
          title: "Line 8",
          backFontColor: "#fe7968",
          fillValue:  faker.number.int({ min: 1, max: 6000 }),
          type: "normal",
     },
     {
          color: "#038aff",
          fillMaxValue: 100,
          clName: "tank9",
          threshold: 10,
          title: "Line 9",
          backFontColor: "#fe7968",
          fillValue:  faker.number.int({ min: 1, max: 100 }),
          type: "normal",
     },
     {
          color: "#038aff",
          fillMaxValue: 20000,
          threshold: 2000,
          clName: "tank10",
          title: "Line 10",
          backFontColor: "#fe7968",
          fillValue:  faker.number.int({ min: 1, max: 20000 }),
          type: "normal",
     },
     {
          color: "#038aff",
          fillMaxValue: 20000,
          threshold: 2000,
          clName: "tank11",
          title: "Line 11",
          backFontColor: "#fe7968",
          fillValue:  faker.number.int({ min: 1, max: 20000 }),
          type: "normal",
     },
     {
          color: "#038aff",
          fillMaxValue: 10000,
          threshold: 1000,
          clName: "tank12",
          title: "Line 12",
          backFontColor: "#fe7968",
          fillValue:  faker.number.int({ min: 1, max: 10000 }),
          type: "normal",
     },
     {
          color: "#038aff",
          fillMaxValue: 2000,
          clName: "tank20",
          title: "T11",
          backFontColor: "#fe7968",
          fillValue:  faker.number.int({ min: 1, max: 20000 }),
          type: "premix",
          temperature: 55,
          threshold:100,
          minimumTemperature: 60,
          temperatureMsm: "celcius",
          temperatureColor: "#DC3545",
     },
     {
          color: "#038aff",
          fillMaxValue: 2000,
          clName: "tank21",
          title: "T11",
          threshold:100,
          backFontColor: "#fe7968",
          fillValue:  faker.number.int({ min: 1, max: 10000 }),
          type: "premix",
          temperature: 30,
          minimumTemperature: 5,
          temperatureMsm: "celcius",
          temperatureColor: "#DC3545",
     },
     {
          color: "#038aff",
          fillMaxValue: 2000,
          clName: "tank23",
          title: "T11",
          backFontColor: "#fe7968",
          fillValue:  faker.number.int({ min: 1, max: 2000 }),
          type: "premix",
          threshold:200,
          temperature: 15,
          minimumTemperature: 10,
          temperatureMsm: "celcius",
          temperatureColor: "#DC3545",
     },
     {
          color: "#038aff",
          fillMaxValue: 20000,
          threshold: 200,
          clName: "tank24",
          title: "T11",
          backFontColor: "#fe7968",
          fillValue:  faker.number.int({ min: 1, max: 20000 }),
          type: "mix",
          temperature: 45,
          minimumTemperature: 10,
          temperatureMsm: "celcius",
          temperatureColor: "#DC3545",
     },
     {
          color: "#038aff",
          fillMaxValue: 20000,
          threshold: 200,
          clName: "tank25",
          title: "T11",
          backFontColor: "#fe7968",
          fillValue:  faker.number.int({ min: 1, max: 20000 }),
          type: "mix",
          temperature: 13,
          minimumTemperature: 10,
          temperatureMsm: "celcius",
          temperatureColor: "#DC3545",
     },
     {
          color: "#038aff",
          fillMaxValue: 6000,
          threshold: 600,
          clName: "tank26",
          title: "T11",
          backFontColor: "#fe7968",
          fillValue:  faker.number.int({ min: 1, max: 6000 }),
          type: "mix",
          temperature: 22,
          minimumTemperature: 10,
          temperatureMsm: "celcius",
          temperatureColor: "#DC3545",
     },
];

export const tabs = ["Home", "Pre Mix/Mixing"];
