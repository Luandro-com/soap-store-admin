import App from '../components/App'
import { Query } from 'react-apollo'
import ORDERS from '../queries/orders.gql'
import OrderTable from '../components/OrderTable'

export default () => (
  <App>
    <Query query={ORDERS}>
      {({ loading: loadingOrders, error: errorOrders, data: dataOrders }) => {
        if (loadingOrders) return <h1>Loading</h1>
        if (errorOrders) {
          console.log(errorOrders)
          return <h1>Error</h1>
        }
        if (dataOrders && dataOrders.allOrders) {
          console.log('dataOrders', dataOrders)
          return (
            <div>
              {dataOrders.allOrders.length < 1 && <h3>Nenhuma ordem feita ainda...</h3>}
              <OrderTable orders={dataOrders.allOrders} />
            </div>
          )
        }
      }}
    </Query>
  </App>
)
