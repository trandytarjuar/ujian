import React, { Component } from 'react';
import { 
	View, 
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/Feather';
import { Wrapper, Header, Left, Right, Container, Space, H1, P, Btn, LabelIconInput } from '../utils';
import config from '../../config';
import auth from '@react-native-firebase/auth'

class Login extends Component {

    inputs = {};

    state = {
        email: '',
        password: '',
        secureEntry: true,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount(){
    
          
            
         
        }
        

    login() {
         auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          console.log('User account created & signed in!');
          this.props.navigation.navigate("Home");
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
          }
      
          Alert.alert("Failed",error.message);
        });
    }

    render() {
        return (
            
            <Wrapper>
                
                <Header>
                    <Left></Left>
                    <Right>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register',{nama:"test aja"})} style={[config.style.iconBtn, {marginRight: -10}]}>
                            <P>Sign Up</P>
                        </TouchableOpacity>
                    </Right>
                </Header>

                <Container>
                    <Space height={60} />
                    <H1>Welcome Back!</H1>
                    <P>Login back into your account</P>
                    
                    <View style={config.style.form}>
                        
                        <LabelIconInput 
                            label={'Email'}
                            icon={'user'}
                            placeholderTextColor={'#999999'}
                            onChangeText={(text) => this.setState({email: text})}
                            placeholder={'Enter your email'}
                            returnKeyType={"next"}
                            underlineColorAndroid={'transparent'}
                        />

                        <LabelIconInput 
                            label={'Password'}
                            icon={'lock'}
                            placeholderTextColor={'#999999'}
                            secureTextEntry={this.state.secureEntry}
                            onChangeText={(text) => this.setState({password: text})}
                            placeholder={'Enter your password'}
                            underlineColorAndroid={'transparent'}
                            afterInput={
                                <TouchableOpacity onPress={() => this.setState({secureEntry: !this.state.secureEntry})} style={{position: "absolute", right: 23, bottom: 7}}>
                                    <Icon name={this.state.secureEntry ? 'eye-off' : 'eye'} size={18} color={"#bcbcbc"} />
                                </TouchableOpacity>
                            }
                        />
                        
                        <Space />
                        
                        <Btn label={'Log In'} onPress={() => this.login()} />

                    </View>

                </Container>
                
            </Wrapper>
            
        );
    }
}

const styles = StyleSheet.create({
    form: {
        width: '75%',
        maxWidth: 400,
        minWidth: 200,
        alignSelf: 'center'
    },
    field: {
        marginTop: 25
    },
    labelWrapper: {
        flexDirection: 'row'
    },
    labelIconWrapper: {
        width: 23
    },
    labelText: {
        color: '#a7a6b4', 
        fontSize: 13.5 
    },
    labelIcon: {

    },
    input: {
        fontWeight: "bold", 
        fontSize: 16, 
        paddingLeft: 23, 
        paddingRight: 3, 
        paddingTop: 6, 
        paddingBottom: 4, 
        borderBottomWidth: 1, 
        borderBottomColor: '#bcbcbc'
    },
    btn: {
        height: 46,
        borderRadius: 23,
        backgroundColor: '#cc2122',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        flexDirection: 'row'
    },
    btnText: {
        fontWeight: 'bold',
        color: '#ffffff',
        fontSize: 18
    }
});

export default Login;