export interface TankProps {
     number: number;
     color: string;
     fillMaxValue: number;
     title: string;
     fillValue: any;
     type?: string;
     temperature?: number;
     minimumTemperature?: number;
     temperatureMsm?: string;
     temperatureColor?: string;
     threshold: number;
     batchNumber?: number;
     style?: any;
     locationId?: number;
     id: number | string;
}
