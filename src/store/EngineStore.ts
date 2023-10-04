import { makeAutoObservable } from "mobx";
import { Engine, LocalStorageProvider } from "@montagix/engine";

class EngineStore {
  engine: Engine = new Engine({
    resolution: [1080, 1920],
    storageProvider: new LocalStorageProvider(),
  });

  constructor() {
    makeAutoObservable(this);
  }

  getEngine() {
    return this.engine;
  }
}

export default new EngineStore();
