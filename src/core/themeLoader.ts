export interface Config {
  version: string
}

class ThemeLoader {
  private config: Config | null = null

  public loadConfig = (config: Config) => {
    this.config = config
  }
}
