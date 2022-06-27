import { API } from 'homebridge';
import { ComputerVolumeAccessory } from './computerVolume';

export = (api: API) => {
  throw "shit";
  api.registerAccessory('ComputerVolume', ComputerVolumeAccessory);
};