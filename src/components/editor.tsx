import Header from './header/header'
import Sidebar from './sidebar/sidebar'
import Background from './page/background'
import Page from './page/page'

const Editor = () => (
  <div style={{ width: '100%', height: '100%' }}>
    <Header />
    <Sidebar />
    <Background>
      <Page />
    </Background>
  </div>
)

export default Editor
