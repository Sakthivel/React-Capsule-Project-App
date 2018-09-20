import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = {
  h1: {
    textAlign: 'center',
  },
  layout: {
    border: '1px solid darkblue',
    padding: '20px 20px 70px',
    backgroundColor: 'lightskyblue',
    marginTop: '20px',
    color: 'darkblue',
  },
};
class Login extends Component {
  constructor(props) {
    super();

    this.state = {
      username: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  onChange(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={4} />
        <Grid item xs={4} style={styles.layout}>
          <h1 style={styles.h1}>Talking App</h1>
          <form onSubmit={this.onSubmit.bind(this)}>
            <Typography variant="title" color="inherit">Sign In</Typography>
            <TextField
              id="name"
              label="Username"
              onChange={this.onChange.bind(this)}
              margin="normal"
              fullWidth
            />
            <Button
              onClick={this.onSubmit.bind(this)}
              variant="raised"
              fullWidth
              color="primary"
            >
                            Submit
            </Button>
          </form>
        </Grid>
        <Grid item xs={4} />
      </Grid>
    );
  }
}

export default Login;
