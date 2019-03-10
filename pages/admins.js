import App from '../components/App'
import { Query } from 'react-apollo'
import ADMINS from '../queries/admins.gql'
import AdminTable from '../components/AdminTable'

export default () => (
  <App>
    <Query query={ADMINS}>
      {({ loading: loadingAdmins, error: errorAdmins, data: dataAdmins }) => {
        if (loadingAdmins) return <h1>Loading</h1>
        if (errorAdmins) {
          console.log(errorAdmins)
          return <h1>Error</h1>
        }
        console.log(dataAdmins)
        if (dataAdmins) return <AdminTable admins={dataAdmins.admins} />
      }}
    </Query>
  </App>
)
