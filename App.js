import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import {Button} from 'primereact/button';
import {InputTextarea} from 'primereact/inputtextarea'
import {Dialog} from 'primereact/dialog';
import {InputMask} from 'primereact/inputmask';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './App.css';

class App extends Component {
    state = {
        message: '',
        balance: 20,
        visible: false,
        info: '',
        status:'',
        to:''
    };
    onSubmit = (e) => {
        if(this.state.balance > 0) {
            if (this.state.message !== '' && this.state.to == 10) {
                this.setState({
                    message: '',
                    info: 'Your Message Sent Successfully.',
                    balance: (this.state.balance - 1),
                    visible: true,
                    status: 'Success',
                    to: ''
                });
            }else if(this.state.message === ''){
                this.setState({info: 'Message Cant be Empty.', visible: true, status: 'Failed'});
            }
            else if(this.state.to != 10){
                this.setState({info: 'Recipient Cant be Empty.', visible: true, status: 'Failed'});
            }
        } else{
            this.setState({
                message: '',
                info: 'Message Balance Exhausted.',
                visible: true,
                status: 'Failure',
                to:''
            })
        }
    };

    onHide = (e) => {
        this.setState({visible: false});
    };
    onClear = (e) => {
        this.setState({message: '', to: ''});
    };
    onChange = (e) => {
        if(this.state.message.length >= 50){
            this.setState({message: this.state.message});
            this.setState({info: 'Word limit reached.', visible: true, status: 'Failed'});
        }
        else{
            this.setState({message: e.target.value});
        }

    };
  render() {
      const footer = (
          <div>
              <Button label="OK" icon="pi pi-check" onClick={this.onHide.bind()} />
          </div>
      );
    return (
        <div>
            <Navbar>
                <Navbar.Header >
                    <Navbar.Brand style={{ marginLeft: 20 }}>
                        <a href="/" style={{ fontSize: 25  }}>Cedar Project 2</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Nav>
                        <NavItem style={{fontSize: 20  }}>
                            Balance: {this.state.balance}
                        </NavItem>
                    </Nav>
                </Navbar.Header>
            </Navbar>
            <h3 style={{ marginLeft: 40}}>TO:</h3>
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-md-4">
                    <InputMask
                        mask="+99-9999999999"
                        value={this.state.to}
                        placeholder="+91-9999999999"
                        onChange={(e) => this.setState({to:  e.target.value})}
                        style={{ marginLeft: 50, marginRight: 50, marginTop: 10, width: window.innerWidth-100 ,fontSize: 20, fluid: true }}
                    >
                    </InputMask>
                </div>
                <h3 style={{ marginLeft: 40}}>Message:</h3>
            </div>
                <InputTextarea
                value={this.state.message}
                onChange={this.onChange.bind()}
                autoResize={true}
                rows={5}
                placeholder="Your message here..."
                style={{ marginLeft: 50, marginRight: 50, marginTop: 10 , resize: 'horizontal', width: window.innerWidth-100 ,fontSize: 20 }}
            />
            <div style={{
                display:'flex',
                justifyContent: 'flex-start',
                marginLeft: 50,
                marginTop:20
            }}>
                <h4>Words Left: {50 - this.state.message.length}</h4>
                </div>
            <div style={{
                display:'flex',
                justifyContent: 'flex-end',
                marginRight: 50,
                marginTop:20
            }}>
                <Dialog header={this.state.status} footer={footer} visible={this.state.visible} width="350px" modal={true} onHide={(e) => this.setState({visible: false})}>
                    {this.state.info}
                </Dialog>
            <Button
                label="Send"
                onClick={this.onSubmit.bind()}
                style={{marginLeft:10, fontSize: 20}}
            />
                <Button
                    label="Clear"
                    className="p-button-danger"
                    onClick={this.onClear.bind()}
                    style={{marginLeft:10, fontSize: 20}}
                />
            </div>
        </div>
    );
  }
}

export default App;
