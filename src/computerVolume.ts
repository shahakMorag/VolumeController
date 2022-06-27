import { API, Logging, AccessoryConfig, AccessoryPlugin, Service } from 'homebridge';

export class ComputerVolumeAccessory implements AccessoryPlugin {
  public Service;
  public volumeService;
  public Characteristic;
  public Volume;

  constructor(public readonly log: Logging,
        public readonly config: AccessoryConfig,
        public readonly api: API) {
    this.log = log;
    this.config = config;
    this.api = api;
    this.Volume = 0;

    this.Service = this.api.hap.Service;
    this.Characteristic = this.api.hap.Characteristic;

    // create a new Volume service
    this.volumeService = new this.Service(this.Service.Speaker);

    // create handlers for required characteristics
    this.volumeService.getCharacteristic(this.Characteristic.Volume)
      .onGet(this.handleVolumeGet.bind(this))
      .onSet(this.handleVolumeSet.bind(this));
  }

  getServices(): Service[] {
    return [this.volumeService];
  }

  /**
     * Handle requests to get the current value of the "Mute" characteristic
     */
  handleVolumeGet() {
    this.log.info('Triggered GET Volume,', this.Volume);

    return this.Volume;
  }

  /**
     * Handle requests to set the "Volume" characteristic
     */
  handleVolumeSet(value) {
    this.log.info('Triggered SET Volume:', value);
    if (value > 100 || value < 0) {
      this.log.warn('invalid value for volume:', value);
      return;
    }

    this.Volume = value;
  }
}