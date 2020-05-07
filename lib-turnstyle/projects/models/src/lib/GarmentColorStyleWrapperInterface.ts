import { ColorInterface } from './ColorInterface';
import { StyleInterface } from './StyleInterface';
import { GarmentInterface } from './GarmentInterface';

export interface GarmentColorStyleWrapperInterface {
    garment: GarmentInterface;
    colors: ColorInterface[];
    styles: StyleInterface[];
}