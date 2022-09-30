export interface IPlugin {
  name: string
}

class PluginManager {
  private plugins: IPlugin[] = []

  public registerPlugin(plugin: IPlugin) {
    this.plugins.push(plugin)
  }
}
