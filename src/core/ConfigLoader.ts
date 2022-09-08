export interface Config {
  version: string
}

class ConfigLoader {
  private config: Config | null = null

  public loadConfig = (config: Config) => {
    this.config = config
  }
}
