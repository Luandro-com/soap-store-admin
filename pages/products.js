import App from '../components/App'
import { Query } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import PRODUCTS from '../queries/products.gql'
import ProductItem from '../components/ProductItem'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Loading from '../components/Loading'

const styles = {
  fab: {
    position: 'fixed',
    right: '5%',
    bottom: '5%'
  },
}

const Products = ({ classes }) => (
  <App>
    <Query query={PRODUCTS}>
      {({ loading: loadingProducts, error: errorProducts, data: dataProducts }) => {
        if (loadingProducts) return <h1>Loading</h1>
        if (errorProducts) {
          console.log(errorProducts)
          return <h1>Error</h1>
        }
        if (dataProducts) {
          dataProducts
          return (
            <div className="productList">
              {dataProducts.products.map(p => <ProductItem key={p.id} {...p} />)}
              <Link href='/product_edit'>
                <Fab color="primary" aria-label="Add" className={classes.fab}>
                  <AddIcon />
                </Fab>
              </Link>
            </div>
          )
        }
      }}
    </Query>
    <style jsx>{`
      .productList {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-flow: row wrap;
      }
    `}</style>
  </App>
)

export default withStyles(styles)(Products)