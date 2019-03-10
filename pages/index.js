import App from '../components/App'
import Typography from '@material-ui/core/Typography'
import ProfitPanel from '../components/ProfitPanel'

export default () => (
  <App>
    <article>
      <div>
        <h2>Vendas 24h</h2>
        <ProfitPanel />
      </div>
    </article>
  </App>
)
