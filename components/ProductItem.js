import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import toReal from '../lib/toReal'

const styles = {
  card: {
    width: 320,
    height: 400,
    margin: 7
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
}

function ProductItem(props) {
  const { classes, id, name, price, stockQuantity, variants, description, image } = props
  return (
    <Card className={classes.card}>
      <CardActionArea>
        {image && <CardMedia
          component="img"
          alt={name}
          className={classes.media}
          height="140"
          image={image}
          title={name}
        />}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography component="p">
            {description}
          </Typography>
          <Typography component="h6">
            {toReal(price)}
          </Typography>
          <Typography component="h6">
            Estoque: {stockQuantity}
          </Typography>
          <Typography component="h6">
            Varianções:
          </Typography>
          {variants.map(v => (
            <div key={v.id}>
              <p>{v.name}</p>
            </div>
          ))}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Editar
        </Button>
        <Button size="small" color="primary">
          Deletar
        </Button>
      </CardActions>
    </Card>
  )
}

ProductItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProductItem)

