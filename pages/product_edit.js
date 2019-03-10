import React from 'react'
import Router from 'next/router'
import { Query, Mutation } from 'react-apollo'
import { withRouter } from 'next/router'

import SAVE_PRODUCT from '../queries/saveProduct.gql'
// import UPDATE_ISSUE from '../queries/issueUpdate.gql'
// import ISSUE from '../queries/issue.gql'
// import ALL_ISSUES_LOCAL from '../queries/allIssuesLocal.gql'
// import ISSUE_PUBLISH_CALL from '../queries/issuePublishCall.gql'
// import ISSUE_PUBLISH from '../queries/issuePublish.gql'

import ProductForm from '../components/forms/product'
import App from '../components/App'
import Loading from '../components/Loading'

const ProductEdit = ({ router: { query: { key } } }) => {
  return (
    <App>
      {!key && <Mutation mutation={SAVE_PRODUCT}>
        {(saveProduct, { error: errorSaveProduct, client: clientSaveProduct }) => {
          return (
            <ProductForm
              onSubmit={async (values) => {
                const res = await saveProduct({ variables: { input: values } })
                console.log('CREATE RES', res)
                if (errorSaveProduct) console.log('ERROR do something...', errorSaveProduct)
                // const { allIssues } = clientSaveProduct.cache.readQuery({ query: ALL_ISSUES_LOCAL})
                // clientSaveProduct.writeData({ data: {
                //   allIssues: Object.assign(allIssues, res.data.saveProduct)
                // }})
                Router.push('/products')
              }}
            />
          )
        }}
      </Mutation>}
      {/* {key && 
        <Query query={ISSUE} variables={{ issueKey: key }}>
          {({ loading: loadingIssue, error: errorIssue, data: dataIssue }) => {
            if (loadingIssue) return <Loading />
            return (
              <Mutation mutation={UPDATE_ISSUE}>
                {(updateIssue, { error: errorupdateIssue, client: clientUpdate }) => {
                  return (
                    <Mutation mutation={ISSUE_PUBLISH_CALL}>
                      {(publishIssueCall, { error: errorPublishCall, client: clientPublishCall }) => (
                        <Mutation mutation={ISSUE_PUBLISH}>
                          {(publishIssue, { error: errorPublish, client: clientPublish }) => (
                            <ProductForm
                              onSubmit={async (values) => {
                                // console.log('VALUES', values)
                                const res = await updateIssue({ variables: { input: values, issueId: dataIssue.issue.id } })
                                // console.log(res)
                                if (errorupdateIssue) console.log('ERROR do something...')
                                // const localData = clientUpdate.cache.readQuery({ query: ALL_ISSUES_LOCAL})
                                // console.log('Local', localData)
                                // clientUpdate.writeData({ data: {
                                //   issue: res.data.updateIssue
                                // }})
                                Router.push('/issues')
                              }}
                              issue={dataIssue.issue}
                              publishCall={publishIssueCall}
                              publish={publishIssue}
                            />
                          )}
                        </Mutation>
                      )}
                    </Mutation>
                  )
                }}
              </Mutation>
            )
          }}
        </Query>
      } */}
    </App>
  )
}

export default withRouter(ProductEdit)