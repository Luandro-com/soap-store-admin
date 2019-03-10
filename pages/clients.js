import App from '../components/App'
import { Query } from 'react-apollo'
import CUSTOMERS from '../queries/customers.gql'
import CustomerTable from '../components/CustomerTable'

export default () => (
  <App>
    <Query query={CUSTOMERS}>
      {({ loading: loadingCustomers, error: errorCustomers, data: dataCustomers }) => {
        if (loadingCustomers) return <h1>Loading</h1>
        if (errorCustomers) {
          console.log(errorCustomers)
          return <h1>Error</h1>
        }
        console.log(dataCustomers)
        if (dataCustomers) return <CustomerTable customers={dataCustomers.customers}  />
      }}
    </Query>
  </App>
)
