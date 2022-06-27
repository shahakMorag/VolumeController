import { API } from 'homebridge';
import { ComputerVolumeAccessory } from './computerVolume';

export = (api: API) => {
  api.registerAccessory('ComputerVolume', ComputerVolumeAccessory);
};